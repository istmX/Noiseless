from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base

class Digest(Base):
    __tablename__ = "Digest"

    id = Column(String, primary_key=True)
    watchId = Column(String, ForeignKey("Watch.id", ondelete="CASCADE"), nullable=False)
    summary = Column(String, nullable=False)
    sentAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    watch = relationship("Watch", back_populates="digests")
