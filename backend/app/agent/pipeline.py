import uuid
from datetime import datetime, timezone
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.watch import Watch
from app.models.finding import Finding
from app.models.digest import Digest
from app.services.search import search_service
from app.services.embeddings import embedding_service
from app.services.vector_store import vector_store_service
from app.services.llm import llm_scoring_service
from app.services.digest import digest_service
from app.services.notifications import notification_service
from app.agent.rate_limiter import rate_limiter

async def run_agent_pipeline(watch_id: str, db: AsyncSession):
    """
    Executes the full agent pipeline for a specific watch:
    Search -> Embed -> Dedup -> Score -> Store -> Notify
    """
    # 1. Fetch Watch from Database
    result = await db.execute(select(Watch).filter(Watch.id == watch_id))
    watch = result.scalar_one_or_none()
    if not watch or not watch.active:
        return

    # Check user tokens balance and subscription tier constraints
    from app.models.user import User
    user_result = await db.execute(select(User).filter(User.id == watch.userId))
    user = user_result.scalar_one_or_none()
    if not user:
        print(f"User owner of Watch {watch_id} not found, aborting.")
        return

    # 1. Enforce tier restrictions: hourly watches require premium tier
    if watch.frequency == "hourly" and user.tier == "FREE":
        print(f"User {user.id} is on FREE tier but Watch {watch_id} has hourly frequency. Deactivating watch.")
        watch.active = False
        await db.commit()
        return

    # 2. Enforce token limits: require at least 10 tokens to execute
    if user.tokensBalance < 10:
        print(f"User {user.id} has insufficient tokens ({user.tokensBalance}), deactivating watch and sending alert.")
        watch.active = False
        await db.commit()
        # Dispatch depletion alert to watch notification channels or fallback to user email
        recipient = watch.notificationEmail or user.email
        await notification_service.send_token_depletion_alert(
            recipient_email=recipient,
            webhook_url=watch.notificationSlackWebhook,
            topic=watch.topic,
            watch_id=watch.id
        )
        return


    # Idempotency lock & rate limit check
    if watch.runInProgress:
        print(f"Watch {watch_id} run in progress, skipping.")
        return

    if not rate_limiter.check_rate_limit(watch_id, watch.frequency):
        print(f"Watch {watch_id} hit rate limit, skipping.")
        return

    # Set lock
    watch.runInProgress = True
    watch.lastRunAt = datetime.now(timezone.utc)
    await db.commit()

    try:
        new_findings = []
        highest_score_vector = None
        highest_score = 0

        # 2. Iterate through search queries
        for query in watch.searchQueries:
            results = await search_service.search_query(query)
            for res in results:
                url = res.get("url", "")
                title = res.get("title", "")
                content = res.get("content", "")

                if not url or not content:
                    continue

                # Generate embedding
                vector = await embedding_service.get_embedding_async(content)

                # Query Qdrant for deduplication
                matches = vector_store_service.query_similarity(watch.id, vector, limit=1)
                is_duplicate = False
                if matches:
                    top_match = matches[0]
                    # Cosine similarity above 0.88 threshold is a duplicate
                    if top_match.score > 0.88:
                        is_duplicate = True

                if is_duplicate:
                    continue

                # Score significance
                score_data = await llm_scoring_service.score_finding(watch.topic, title, content)
                score = score_data.get("score", 1)

                # Store finding only if score reaches threshold
                if score >= watch.significanceThreshold:
                    finding_id = str(uuid.uuid4())
                    finding = Finding(
                        id=finding_id,
                        watchId=watch.id,
                        url=url,
                        title=title,
                        content=content,
                        score=score,
                        category=score_data.get("category", "General News"),
                        keyFact=score_data.get("keyFact", ""),
                        createdAt=datetime.now(timezone.utc)
                    )
                    db.add(finding)
                    new_findings.append(finding)

                    # Store embedding in Qdrant
                    payload = {
                        "url": url,
                        "title": title,
                        "content": content,
                        "score": score
                    }
                    vector_store_service.upsert_finding(watch.id, finding_id, vector, payload)

                    # Keep track of the most significant vector for digest generation
                    if score > highest_score:
                        highest_score = score
                        highest_score_vector = vector

        # 3. Compile Digest & Notify if we have new significant findings
        if new_findings and highest_score_vector:
            # Generate RAG digest
            summary = await digest_service.generate_digest(watch.topic, watch.id, highest_score_vector)
            
            digest_id = f"dg_{uuid.uuid4().hex[:20]}"
            digest = Digest(
                id=digest_id,
                watchId=watch.id,
                summary=summary,
                sentAt=datetime.now(timezone.utc)
            )
            db.add(digest)
            await db.commit()

            # Dispatch Notifications
            if watch.notificationSlackWebhook:
                await notification_service.send_slack_notification(
                    watch.notificationSlackWebhook,
                    watch.topic,
                    summary,
                    watch.id
                )
            if watch.notificationEmail:
                await notification_service.send_email_notification(
                    recipient_email=watch.notificationEmail,
                    topic=watch.topic,
                    digest_summary=summary,
                    watch_id=watch.id
                )

        # Successful completion of pipeline run: deduct tokens only if new findings were found
        if new_findings:
            user.tokensBalance = max(0, user.tokensBalance - 10)
            user.tokensUsed += 10
            await db.commit()
        else:
            print(f"No new findings found for watch {watch_id}. Skipping token deduction.")
            if watch.notificationEmail:
                try:
                    await notification_service.send_email_notification(
                        recipient_email=watch.notificationEmail,
                        topic=watch.topic,
                        digest_summary="No new changes detected for this watch since the last run. We will keep monitoring.",
                        watch_id=watch.id
                    )
                except Exception as email_err:
                    print(f"Failed to send no-changes email: {email_err}")
            await db.commit()

    except Exception as e:
        print(f"Error in pipeline run for watch {watch_id}: {e}")
        await db.rollback()
    finally:
        # Release lock
        watch.runInProgress = False
        await db.commit()
