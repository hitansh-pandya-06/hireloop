"""All 8 HireLoop SQLAlchemy Database Models."""
from app.models.user import User
from app.models.candidate import CandidateProfile
from app.models.recruiter import RecruiterProfile
from app.models.job import Job
from app.models.application import Application
from app.models.notification import Notification
from app.models.hr_session import HRSession
from app.models.interview import InterviewPracticeSession

__all__ = [
    "User",
    "CandidateProfile",
    "RecruiterProfile",
    "Job",
    "Application",
    "Notification",
    "HRSession",
    "InterviewPracticeSession",
]
