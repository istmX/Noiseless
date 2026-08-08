from fastapi import APIRouter, BackgroundTasks
from app.database import AsyncSessionLocal
from app.agent.pipeline import run_agent_pipeline

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
    Runs asynchronously in the background.
    """
    # Enqueue pipeline run as a FastAPI background task to prevent blocking the request
    background_tasks.add_task(_run_pipeline_in_background, watch_id)
    return {
        "data": {
            "watchId": watch_id,
            "status": "triggered"
        }
    }
