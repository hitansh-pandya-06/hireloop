"""Application Configuration Settings."""
import os
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "HireLoop API"
    ENVIRONMENT: str = "development"
    PORT: int = 8000

    # Database: Defaults to self-contained SQLite for instant zero-dependency local run,
    # or PostgreSQL in production via DATABASE_URL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "sqlite:///./hireloop.db"
    )

    # JWT Authentication
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "hireloop-development-secret-key-change-in-prod-98341"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # AI Configuration (OpenAI, Gemini, Anthropic)
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "gemini")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    # CORS
    ALLOWED_ORIGINS: str = os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    )

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()
