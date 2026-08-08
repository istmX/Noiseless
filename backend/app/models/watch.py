from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from app.database import Base

class Watch(Base):
    __tablename__ = "Watch"

    id = Column(String, primary_key=True)
    userId = Column(String, ForeignKey("User.id", ondelete="CASCADE"), nullable=False)
    topic = Column(String, nullable=False)
    searchQueries = Column(ARRAY(String), nullable=False)
    frequency = Column(String, nullable=False)
    significanceThreshold = Column(Integer, nullable=False)
    notificationEmail = Column(String, nullable=True)
    notificationSlackWebhook = Column(String, nullable=True)
    active = Column(Boolean, default=True, nullable=False)
    lastRunAt = Column(DateTime(timezone=True), nullable=True)
    runInProgress = Column(Boolean, default=False, nullable=False)
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("User", back_populates="watches")
    findings = relationship("Finding", back_populates="watch", cascade="all, delete-orphan")
    digests = relationship("Digest", back_populates="watch", cascade="all, delete-orphan")
