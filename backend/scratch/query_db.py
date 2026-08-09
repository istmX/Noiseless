import asyncio
from sqlalchemy.future import select
from app.database import AsyncSessionLocal
from app.models.watch import Watch
from app.models.user import User
from app.models.finding import Finding
from app.models.digest import Digest

async def main():
    async with AsyncSessionLocal() as session:
        watches_res = await session.execute(select(Watch))
        watches = watches_res.scalars().all()
        print(f"Total watches: {len(watches)}")
        for w in watches:
            print(f"Watch: ID={w.id}, Topic={w.topic}, active={w.active}, runInProgress={w.runInProgress}, lastRunAt={w.lastRunAt}")
            print(f"  notificationEmail={w.notificationEmail}")
            print(f"  notificationSlackWebhook={w.notificationSlackWebhook}")
            print(f"  userId={w.userId}")
            
        users_res = await session.execute(select(User))
        users = users_res.scalars().all()
        print(f"\nTotal users: {len(users)}")
        for u in users:
            print(f"User: ID={u.id}, Email={u.email}, Tier={u.tier}, Tokens={u.tokensBalance}")

if __name__ == "__main__":
    asyncio.run(main())
