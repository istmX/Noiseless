from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy.future import select
from app.database import AsyncSessionLocal
from app.models.watch import Watch

# Background wrapper to obtain a fresh database session
async def _execute_pipeline_job(watch_id: str):
    from app.agent.pipeline import run_agent_pipeline
    async with AsyncSessionLocal() as session:
        try:
            await run_agent_pipeline(watch_id, session)
        except Exception as e:
            print(f"Error in scheduler task wrapper for watch {watch_id}: {e}")

class SchedulerManager:
    def __init__(self):
        self.scheduler = AsyncIOScheduler()

    def _get_interval_kwargs(self, frequency: str) -> dict:
        freq = frequency.lower()
        if freq == "hourly":
            return {"hours": 1}
        elif freq == "daily":
            return {"days": 1}
        elif freq == "weekly":
            return {"weeks": 1}
        return {"days": 1} 

    def add_watch_job(self, watch: Watch):
        """Adds a watch background job to the scheduler."""
        if not watch.active:
            return

        interval_kwargs = self._get_interval_kwargs(watch.frequency)
        job_id = f"watch_job_{watch.id}"
        
        # Remove existing if any to prevent duplicates
        if self.scheduler.get_job(job_id):
            self.scheduler.remove_job(job_id)

        self.scheduler.add_job(
            _execute_pipeline_job,
            "interval",
            args=[watch.id],
            id=job_id,
            replace_existing=True,
            **interval_kwargs
        )

    def remove_watch_job(self, watch_id: str):
        """Removes a watch background job from the scheduler."""
        job_id = f"watch_job_{watch_id}"
        if self.scheduler.get_job(job_id):
            self.scheduler.remove_job(job_id)

    def update_watch_job(self, watch: Watch):
        """Updates scheduler state for a watch."""
        if not watch.active:
            self.remove_watch_job(watch.id)
        else:
            self.add_watch_job(watch)

    async def initialize_jobs(self):
        """Registers all active watches into the scheduler at startup."""
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(Watch).filter(Watch.active == True))
            watches = result.scalars().all()
            for watch in watches:
                self.add_watch_job(watch)

scheduler_manager = SchedulerManager()
