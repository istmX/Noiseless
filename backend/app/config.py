import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., description="Postgres connection string")
    QDRANT_URL: str = Field(..., description="Qdrant API endpoint")
    QDRANT_API_KEY: str = Field(..., description="Qdrant API key")
    TAVILY_API_KEY: str = Field(..., description="Tavily API key")
    GROQ_API_KEY: str = Field(..., description="Groq API key")
    BREVO_API_KEY: str = Field("", description="Brevo API key for notifications")
    BREVO_SENDER_EMAIL: str = Field("aryanuchia54@gmail.com", description="Verified sender email for Brevo")
    SLACK_WEBHOOK_URL: str = Field("", description="Slack webhook URL")
    GEMINI_API_KEY: str = Field("", description="Gemini API key for fallback LLM")
    MISTRAL_API_KEY: str = Field("", description="Mistral API key for fallback LLM")
    FRONTEND_URL: str = Field("http://localhost:3000", description="Base URL of Next.js frontend")

    # Local settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
