"""Table 7: hr_sessions
Plain words explanation:
Stores the live Ask-Me-Anything (AMA) and portfolio review sessions
hosted by real hiring managers and talent leaders.
Tracks topic, host company, scheduled time, duration, and seat availability.
"""
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from app.db.session import Base


class HRSession(Base):
    __tablename__ = "hr_sessions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    
    host_name = Column(String(120), nullable=False)
    host_role = Column(String(120), nullable=False)
    company = Column(String(120), nullable=False)
    
    session_date = Column(String(100), nullable=False) # e.g. "Tomorrow, 4:00 PM EST"
    duration_minutes = Column(Integer, default=45)
    category = Column(String(50), default="Career Returners")
    
    total_spots = Column(Integer, default=50)
    spots_left = Column(Integer, default=12)
    attendees_count = Column(Integer, default=38)
    meeting_link = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
