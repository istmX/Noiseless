from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime

class WatchBase(BaseModel):
    topic: str
    searchQueries: List[str]
    frequency: str
    significanceThreshold: int
    notificationEmail: Optional[str] = None
    notificationSlackWebhook: Optional[str] = None
    active: bool = True

class WatchCreate(WatchBase):
    userId: str

class WatchUpdate(BaseModel):
    topic: Optional[str] = None
    searchQueries: Optional[List[str]] = None
    frequency: Optional[str] = None
    significanceThreshold: Optional[int] = None
    notificationEmail: Optional[str] = None
    notificationSlackWebhook: Optional[str] = None
    active: Optional[bool] = None

class WatchResponse(WatchBase):
    id: str
    userId: str
    lastRunAt: Optional[datetime] = None
    runInProgress: bool
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True
