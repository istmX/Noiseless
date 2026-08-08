import uuid
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from app.database import get_db
from app.models.watch import Watch
from app.schemas.watch_schema import WatchCreate, WatchResponse, WatchUpdate
from app.services.vector_store import vector_store_service
from app.scheduler import scheduler_manager

router = APIRouter(prefix="/watches", tags=["watches"])

async def get_user_id(x_user_id: str = Header(None, alias="X-User-Id")) -> str:
    """Dependency to retrieve user ID from request headers."""
    if not x_user_id:
        # Fallback to demo user if header is missing in dev mode
        return "demo-user-id"
    return x_user_id

@router.post("", response_model=dict)
async def create_watch(watch_in: WatchCreate, db: AsyncSession = Depends(get_db)):
    # Generate ID for watch matching cuid/string format
    watch_id = f"wt_{uuid.uuid4().hex[:20]}"
    
    db_watch = Watch(
        id=watch_id,
        userId=watch_in.userId,
        topic=watch_in.topic,
        searchQueries=watch_in.searchQueries,
        frequency=watch_in.frequency,
        significanceThreshold=watch_in.significanceThreshold,
        notificationEmail=watch_in.notificationEmail,
        notificationSlackWebhook=watch_in.notificationSlackWebhook,
        active=watch_in.active
    )
    
    db.add(db_watch)
    await db.commit()
    await db.refresh(db_watch)
    
    # Initialize Qdrant collection for this watch
    try:
        vector_store_service.ensure_collection(watch_id)
    except Exception as e:
        print(f"Error creating Qdrant collection for watch {watch_id}: {e}")
        
    # Register background task in scheduler
    scheduler_manager.add_watch_job(db_watch)
    
    return {"data": WatchResponse.model_validate(db_watch).model_dump(mode="json")}

@router.get("", response_model=dict)
async def list_watches(db: AsyncSession = Depends(get_db), user_id: str = Depends(get_user_id)):
    result = await db.execute(select(Watch).filter(Watch.userId == user_id))
    watches = result.scalars().all()
    return {"data": [WatchResponse.model_validate(w).model_dump(mode="json") for w in watches]}

@router.patch("/{watch_id}", response_model=dict)
async def update_watch(watch_id: str, watch_in: WatchUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Watch).filter(Watch.id == watch_id))
    watch = result.scalar_one_or_none()
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")
        
    update_data = watch_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(watch, key, value)
        
    await db.commit()
    await db.refresh(watch)
    
    # Update scheduler configuration for this watch
    scheduler_manager.update_watch_job(watch)
    
    return {"data": WatchResponse.model_validate(watch).model_dump(mode="json")}

@router.delete("/{watch_id}", response_model=dict)
async def delete_watch(watch_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Watch).filter(Watch.id == watch_id))
    watch = result.scalar_one_or_none()
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")
        
    await db.delete(watch)
    await db.commit()
    
    # Delete vector collection from Qdrant
    try:
        vector_store_service.delete_collection(watch_id)
    except Exception as e:
        print(f"Error deleting Qdrant collection: {e}")
        
    # Remove from background scheduler
    scheduler_manager.remove_watch_job(watch_id)
    
    return {"data": {"id": watch_id}}
