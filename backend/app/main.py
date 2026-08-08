from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import watches, findings, digests, internal
from app.scheduler import scheduler_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize all active watch schedules on startup
    try:
        scheduler_manager.scheduler.start()
        await scheduler_manager.initialize_jobs()
        print("Scheduler initialized and active watch jobs registered.")
    except Exception as e:
        print(f"Failed to initialize scheduler: {e}")
    yield
    try:
        scheduler_manager.scheduler.shutdown()
        print("Scheduler shut down successfully.")
    except Exception as e:
        print(f"Error shutting down scheduler: {e}")

app = FastAPI(
    title="Noiseless Intelligence Agent API",
    description="Backend service and background pipeline orchestration.",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(watches.router)
app.include_router(findings.router)
app.include_router(digests.router)
app.include_router(internal.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "noiseless-api"}
