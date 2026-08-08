from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    createdAt = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    watches = relationship("Watch", back_populates="user", cascade="all, delete-orphan")
