from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.database import get_db
from app.models.finding import Finding

router = APIRouter(prefix="/watches", tags=["findings"])

@router.get("/{watch_id}/findings", response_model=dict)
async def list_findings(
    watch_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    offset = (page - 1) * limit
    
    # Get total count
    count_result = await db.execute(
        select(Finding).filter(Finding.watchId == watch_id)
    )
    total = len(count_result.scalars().all())

    # Get paginated results
    result = await db.execute(
        select(Finding)
        .filter(Finding.watchId == watch_id)
        .order_by(desc(Finding.createdAt))
        .offset(offset)
        .limit(limit)
    )
    findings = result.scalars().all()
    
    return {
        "data": findings,
        "meta": {
            "page": page,
            "limit": limit,
            "total": total
        }
    }
