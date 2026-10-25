"""Table 2: candidate_profiles
Plain words explanation:
Stores the personal and professional profile of a job seeker.
Crucially captures their 'career_stage' (student, senior professional, or career returner).
For returners, it stores the duration of their break and what they accomplished,
enabling HireLoop to frame their narrative positively rather than treating it as a red flag.
"""
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class CandidateProfile(Base):
    __tablename__ = "candidate_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    # Core stage personalization: 'student', 'senior', or 'returner'
    career_stage = Column(String(50), nullable=False, default="returner")
    
    # Career returner fields
    break_duration = Column(String(100), nullable=True)  # e.g., "3 years (2021 - 2024)"
    break_activities = Column(Text, nullable=True)        # e.g., "Full-time parent care, open-source React contributions"
    
    # Professional fields
    headline = Column(String(200), nullable=True)       # e.g., "Senior React & Design Systems Specialist"
    bio = Column(Text, nullable=True)
    skills = Column(Text, nullable=True)                # Comma-separated or JSON list of skills
    experience_years = Column(Integer, default=0)
    preferred_locations = Column(String(255), default="Remote")
    portfolio_url = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="candidate_profile")
    applications = relationship("Application", back_populates="candidate", cascade="all, delete-orphan")
    practice_sessions = relationship("InterviewPracticeSession", back_populates="candidate", cascade="all, delete-orphan")
