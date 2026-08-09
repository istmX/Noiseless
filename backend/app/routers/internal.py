from fastapi import APIRouter, BackgroundTasks, HTTPException
from app.database import AsyncSessionLocal
from app.agent.pipeline import run_agent_pipeline
from sqlalchemy.future import select
from app.models.watch import Watch
from datetime import datetime, timezone

router = APIRouter(prefix="/internal", tags=["internal"])

async def _run_pipeline_in_background(watch_id: str):
    """Executes the pipeline job in the background with a fresh database session."""
    async with AsyncSessionLocal() as session:
        try:
            await run_agent_pipeline(watch_id, session)
        except Exception as e:
            print(f"Error in background task execution for watch {watch_id}: {e}")

@router.post("/run-watch/{watch_id}", response_model=dict)
async def trigger_run_watch(
    watch_id: str,
    background_tasks: BackgroundTasks
):
    """
    Manually triggers the background intelligence agent pipeline for a specific watch.
    Runs after validating execution locks.
    """
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Watch).filter(Watch.id == watch_id))
        watch = result.scalar_one_or_none()
        if not watch:
            raise HTTPException(status_code=404, detail="Watch not found")
        
        if watch.runInProgress:
            raise HTTPException(status_code=409, detail="A watch execution is already in progress.")
            
        if watch.lastRunAt:
            time_diff = datetime.now(timezone.utc) - watch.lastRunAt.replace(tzinfo=timezone.utc)
            if time_diff.total_seconds() < 900: # 15 minutes
                raise HTTPException(
                    status_code=429,
                    detail="This watch was executed recently. Please wait 15 minutes between manual run triggers."
                )

    # Enqueue pipeline run as a FastAPI background task to prevent blocking the request
    background_tasks.add_task(_run_pipeline_in_background, watch_id)
    return {
        "data": {
            "watchId": watch_id,
            "status": "triggered"
        }
    }
