from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base

class Finding(Base):
    __tablename__ = "Finding"

    id = Column(String, primary_key=True)
    watchId = Column(String, ForeignKey("Watch.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    keyFact = Column(String, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    watch = relationship("Watch", back_populates="findings")
