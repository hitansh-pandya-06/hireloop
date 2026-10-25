"""Table 3: recruiter_profiles
Plain words explanation:
Stores the hiring company details for recruiters and talent teams.
Tracks company name, industry, team size, and verification status,
and connects to all job postings created by this recruiter.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class RecruiterProfile(Base):
    __tablename__ = "recruiter_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    company_name = Column(String(150), nullable=False)
    company_size = Column(String(50), default="50-200")       # Startup, SME, Enterprise
    company_type = Column(String(50), default="Direct Employer")  # Direct Employer, Agency
    industry = Column(String(100), default="Technology")
    website_url = Column(String(255), nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="recruiter_profile")
    jobs = relationship("Job", back_populates="recruiter", cascade="all, delete-orphan")
