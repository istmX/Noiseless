from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.database import get_db
from app.models.digest import Digest

router = APIRouter(prefix="/watches", tags=["digests"])

@router.get("/{watch_id}/digests", response_model=dict)
async def list_digests(
    watch_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    offset = (page - 1) * limit
    
    # Get total count
    count_result = await db.execute(
        select(Digest).filter(Digest.watchId == watch_id)
    )
    total = len(count_result.scalars().all())

    # Get paginated results
    result = await db.execute(
        select(Digest)
        .filter(Digest.watchId == watch_id)
        .order_by(desc(Digest.sentAt))
        .offset(offset)
        .limit(limit)
    )
    digests = result.scalars().all()
    
    return {
        "data": digests,
        "meta": {
            "page": page,
            "limit": limit,
            "total": total
        }
    }
