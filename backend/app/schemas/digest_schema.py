from pydantic import BaseModel
from datetime import datetime

class DigestBase(BaseModel):
    watchId: str
    summary: str

class DigestCreate(DigestBase):
    pass

class DigestResponse(DigestBase):
    id: str
    sentAt: datetime

    class Config:
        from_attributes = True
