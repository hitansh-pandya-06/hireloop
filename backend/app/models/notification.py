"""Table 6: notifications
Plain words explanation:
Guarantees the zero-ghosting policy across HireLoop.
Whenever a recruiter clicks 'Shortlist', 'Select', or 'Reject',
a clear, respectful notification is automatically recorded and sent
to the candidate's dashboard and inbox.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.session import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(50), default="status_update") # status_update, session_reminder, ai_coaching
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="notifications")
