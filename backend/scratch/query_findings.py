import asyncio
from sqlalchemy.future import select
from app.database import AsyncSessionLocal
from app.models.watch import Watch
from app.models.finding import Finding
from app.models.digest import Digest
from app.models.user import User

async def main():
    watch_id = "cmsl8su6z0000rv67twwux1qk"
    async with AsyncSessionLocal() as session:
        # Get findings
        findings_res = await session.execute(select(Finding).filter(Finding.watchId == watch_id))
        findings = findings_res.scalars().all()
        print(f"Total findings for GTA Vi: {len(findings)}")
        for f in findings:
            print(f"Finding: ID={f.id}, Title={f.title[:40]}, Score={f.score}, CreatedAt={f.createdAt}")

        # Get digests
        digests_res = await session.execute(select(Digest).filter(Digest.watchId == watch_id))
        digests = digests_res.scalars().all()
        print(f"\nTotal digests for GTA Vi: {len(digests)}")
        for d in digests:
            print(f"Digest: ID={d.id}, Summary={d.summary[:100]}..., SentAt={d.sentAt}")

if __name__ == "__main__":
    asyncio.run(main())
