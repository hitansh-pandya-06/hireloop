"""Pydantic schemas for authentication and user profiles."""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: str
    name: str
    role: str = "candidate"  # 'candidate' or 'recruiter'


class UserCreate(UserBase):
    password: str
    career_stage: Optional[str] = "returner"
    break_duration: Optional[str] = None
    break_activities: Optional[str] = None
    company_name: Optional[str] = None
    company_size: Optional[str] = "50-200"


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    career_stage: Optional[str] = None
    company: Optional[str] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ProfileUpdate(BaseModel):
    user_id: Optional[int] = None
    career_stage: Optional[str] = None
    headline: Optional[str] = None
    break_duration: Optional[str] = None
    break_activities: Optional[str] = None
    skills: Optional[str] = None
    preferred_locations: Optional[str] = None
    portfolio_url: Optional[str] = None
    github_url: Optional[str] = None
    company_name: Optional[str] = None
    company_size: Optional[str] = None

