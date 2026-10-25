"""Pydantic schemas for Job listings."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class JobBase(BaseModel):
    title: str
    company: str
    location: str = "Remote"
    workplace_type: str = "Remote"
    salary_range: Optional[str] = None
    description: str
    requirements: Optional[str] = None
    skills: Optional[str] = None
    stage_focus: str = "All Stages"


class JobCreate(JobBase):
    pass


class JobOut(JobBase):
    id: int
    recruiter_id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
