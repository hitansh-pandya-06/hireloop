"""Table 8: interview_practice_sessions
Plain words explanation:
Records practice sessions with the AI Interview Coach.
Captures the targeted company (e.g. Stripe, Cloudflare), role, question prompt,
candidate's response text, and the AI's objective score (0-100) and constructive feedback.
Helps candidates measure improvement before real interviews.
"""
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class InterviewPracticeSession(Base):
    __tablename__ = "interview_practice_sessions"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidate_profiles.id", ondelete="CASCADE"), nullable=False)
    
    target_company = Column(String(120), nullable=False)
    target_role = Column(String(120), nullable=False)
    career_stage = Column(String(50), nullable=False)
    
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    ai_score = Column(Integer, default=90)
    ai_feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    candidate = relationship("CandidateProfile", back_populates="practice_sessions")
