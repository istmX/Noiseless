from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.agent.pipeline import run_agent_pipeline

router = APIRouter(prefix="/internal", tags=["internal"])

@router.post("/run-watch/{watch_id}", response_model=dict)
async def trigger_run_watch(
    watch_id: str,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """
    Manually triggers the background intelligence agent pipeline for a specific watch.
    Runs asynchronously in the background.
    """
    # Enqueue pipeline run as a FastAPI background task to prevent blocking the request
    background_tasks.add_task(run_agent_pipeline, watch_id, db)
    return {
        "data": {
            "watchId": watch_id,
            "status": "triggered"
        }
    }
