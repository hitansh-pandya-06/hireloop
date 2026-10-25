"""HireLoop FastAPI Application Entrypoint."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import SessionLocal
from app.db.init_db import init_db
from app.api.endpoints.auth import router as auth_router
from app.api.endpoints.jobs import router as jobs_router
from app.api.endpoints.applications import router as applications_router
from app.api.endpoints.notifications import router as notifications_router
from app.api.endpoints.ai import router as ai_router

app = FastAPI(
    title="HireLoop API",
    description="A Smarter, Connected Hiring Journey Backend API. Connects candidates at different career stages with forward-thinking recruiters.",
    version="1.0.0",
)

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    """Ensure database tables and initial realistic seed data are loaded on server startup."""
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()


# Mount versioned API routers
app.include_router(auth_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")
app.include_router(applications_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")
app.include_router(ai_router, prefix="/api")


@app.get("/")
def root():
    return {
        "app": "HireLoop API",
        "tagline": "A Smarter, Connected Hiring Journey",
        "status": "online",
        "version": "1.0.0",
        "docs_url": "/docs",
        "core_tables": [
            "users",
            "candidate_profiles",
            "recruiter_profiles",
            "jobs",
            "applications",
            "notifications",
            "hr_sessions",
            "interview_practice_sessions",
        ],
    }


@app.get("/api/health")
def health_check():
    return {"status": "ok", "database": "connected"}
