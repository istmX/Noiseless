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
                    watch.notificationEmail,
                    watch.topic,
                    summary
                )

    except Exception as e:
        print(f"Error in pipeline run for watch {watch_id}: {e}")
        await db.rollback()
    finally:
        # Release lock
        watch.runInProgress = False
        await db.commit()
