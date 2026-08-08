from pydantic import BaseModel
from datetime import datetime

class FindingBase(BaseModel):
    watchId: str
    url: str
    title: str
    content: str
    score: int
    category: str
    keyFact: str

class FindingCreate(FindingBase):
    pass

class FindingResponse(FindingBase):
    id: str
    createdAt: datetime

    class Config:
        from_attributes = True
