"""Table 5: applications
Plain words explanation:
Tracks every application submitted by a candidate to a job opening.
Maintains the transparent lifecycle 'status':
  - 'applied'
  - 'under_review'
  - 'shortlisted'
  - 'selected'
  - 'rejected'
Also preserves the AI match score (e.g., 96%) and the 'why this match' rationale
so recruiters see objective evaluations and candidates receive transparent updates.
"""
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidate_profiles.id", ondelete="CASCADE"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    
    # Transparent workflow status
    status = Column(String(50), nullable=False, default="applied")
    
    # AI Evaluation & Ranking fields
    ai_score = Column(Integer, default=85)
    ai_rationale = Column(Text, nullable=True)
    candidate_notes = Column(Text, nullable=True)
    recruiter_notes = Column(Text, nullable=True)
    
    applied_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    candidate = relationship("CandidateProfile", back_populates="applications")
    job = relationship("Job", back_populates="applications")
