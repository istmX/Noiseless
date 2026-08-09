from sqlalchemy import Column, String, Integer, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    avatarUrl = Column(String, nullable=True)
    tokensBalance = Column(Integer, default=500, nullable=False)
    tokensUsed = Column(Integer, default=0, nullable=False)
    tier = Column(String, default="FREE", nullable=False)
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    watches = relationship("Watch", back_populates="user", cascade="all, delete-orphan")

