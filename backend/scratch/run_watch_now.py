import asyncio
from app.database import AsyncSessionLocal
from app.agent.pipeline import run_agent_pipeline
from sqlalchemy.future import select
from app.models.watch import Watch
from app.models.user import User
from app.models.finding import Finding
from app.models.digest import Digest

async def main():
    watch_id = "cmsl8su6z0000rv67twwux1qk"
    print(f"Manually triggering pipeline for Watch: {watch_id}...")
    async with AsyncSessionLocal() as session:
        await run_agent_pipeline(watch_id, session)
    print("Done triggering pipeline!")

if __name__ == "__main__":
    asyncio.run(main())
