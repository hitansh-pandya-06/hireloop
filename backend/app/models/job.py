"""Table 4: jobs
Plain words explanation:
Stores job listings published by recruiters.
Includes title, description, required skills, compensation range, and stage focus
(e.g., whether the hiring team explicitly welcomes career-returners or fresh graduates),
allowing HireLoop's AI match engine to calculate accurate candidate relevance scores.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    recruiter_id = Column(Integer, ForeignKey("recruiter_profiles.id", ondelete="CASCADE"), nullable=False)
    
    title = Column(String(200), nullable=False)
    company = Column(String(150), nullable=False)
    location = Column(String(100), default="Remote")
    workplace_type = Column(String(50), default="Remote")  # Remote, Hybrid, On-site
    salary_range = Column(String(100), nullable=True)      # e.g., "$160,000 - $190,000"
    
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=True)
    skills = Column(String(255), nullable=True)            # Comma-separated: "React, TypeScript, FastAPI"
    
    # Stage orientation
    stage_focus = Column(String(50), default="All Stages") # All Stages, Returner-Friendly, Student-Friendly, Senior-Level
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    recruiter = relationship("RecruiterProfile", back_populates="jobs")
    applications = relationship("Application", back_populates="job", cascade="all, delete-orphan")
