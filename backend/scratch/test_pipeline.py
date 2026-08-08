import asyncio
import uuid
from sqlalchemy.future import select
from app.database import AsyncSessionLocal
from app.models.user import User
from app.models.watch import Watch
from app.models.finding import Finding
from app.models.digest import Digest
from app.agent.pipeline import run_agent_pipeline

async def test_full_pipeline():
    async with AsyncSessionLocal() as session:
        # 1. Ensure we have a user in the database to link the watch to
        user_result = await session.execute(select(User))
        user = user_result.scalar_one_or_none()
        
        if not user:
            print("No users found in database. Creating a dummy test user...")
            user = User(
                id=f"usr_{uuid.uuid4().hex[:20]}",
                email="test_analyst@noiseless.ai",
                name="Test Analyst",
                password="hashed_dummy_password" # Not used for logic tests
            )
            session.add(user)
            await session.commit()
            print(f"Created user: {user.name} ({user.id})")
        else:
            print(f"Found existing user: {user.name} ({user.id})")

        # 2. Check if we have a watch for testing
        watch_result = await session.execute(select(Watch).filter(Watch.topic == "AI Agent Technology Trends"))
        watch = watch_result.scalar_one_or_none()
        
        if not watch:
            print("Creating a new test watch...")
            watch = Watch(
                id=f"wt_{uuid.uuid4().hex[:20]}",
                userId=user.id,
                topic="AI Agent Technology Trends",
                searchQueries=["Next.js 16 AI", "LangChain Groq release", "Tavily search agentic"],
                frequency="daily",
                significanceThreshold=4,  # Low threshold so we catch matches easily in test
                active=True,
                notificationEmail="analyst@noiseless.ai",
                notificationSlackWebhook=None # Will fall back to SLACK_WEBHOOK_URL from .env
            )
            # Add webhook if present in settings/env
            from app.config import settings
            if settings.SLACK_WEBHOOK_URL:
                watch.notificationSlackWebhook = settings.SLACK_WEBHOOK_URL
                
            session.add(watch)
            await session.commit()
            print(f"Created watch: {watch.topic} ({watch.id})")
        else:
            print(f"Using existing watch: {watch.topic} ({watch.id})")
            # Ensure it uses the Slack webhook from .env
            from app.config import settings
            if settings.SLACK_WEBHOOK_URL and not watch.notificationSlackWebhook:
                watch.notificationSlackWebhook = settings.SLACK_WEBHOOK_URL
                session.add(watch)
                await session.commit()

        # 3. Reset lock state just in case
        watch.runInProgress = False
        await session.commit()

        # 4. Trigger the background pipeline
        print("\n--- Starting Background Agent Pipeline Run ---")
        print(f"Targeting Watch ID: {watch.id}")
        await run_agent_pipeline(watch.id, session)
        print("--- Background Agent Pipeline Run Completed ---\n")

        # 5. Check results in database
        findings_result = await session.execute(select(Finding).filter(Finding.watchId == watch.id))
        findings = findings_result.scalars().all()
        print(f"Total findings stored for this watch: {len(findings)}")
        for f in findings[-3:]: # Print last 3 findings
            print(f" - [{f.category}] (Score: {f.score}/10) {f.title}")
            print(f"   Key Fact: {f.keyFact}")

        digests_result = await session.execute(select(Digest).filter(Digest.watchId == watch.id))
        digests = digests_result.scalars().all()
        print(f"Total digests generated: {len(digests)}")
        if digests:
            print(f"Latest Digest Summary:\n{digests[-1].summary}")

if __name__ == "__main__":
    asyncio.run(test_full_pipeline())
