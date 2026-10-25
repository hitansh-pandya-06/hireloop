"""HireLoop AI Features API Endpoints.
Server-side endpoints for job matching, interview coaching, and applicant ranking.
"""
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.job import Job
from app.models.application import Application
from app.services.ai_service import ai_service

router = APIRouter(prefix="/ai", tags=["AI Intelligence Engine"])


class JobMatchRequest(BaseModel):
    career_stage: str = "returner"
    skills: str = "React, TypeScript, Node.js"
    target_role: Optional[str] = "Frontend Engineer"


class InterviewCoachRequest(BaseModel):
    company: str
    role: str
    career_stage: str = "returner"
    question: str
    candidate_answer: str


class RankApplicantsRequest(BaseModel):
    job_id: int


@router.post("/match-jobs")
def match_jobs(payload: JobMatchRequest, db: Session = Depends(get_db)):
    """
    Calculate career-stage and skill match percentages for all active jobs
    in the database against a candidate's profile.
    """
    db_jobs = db.query(Job).filter(Job.is_active == True).all()
    job_dicts = [
        {
            "id": j.id,
            "title": j.title,
            "company": j.company,
            "location": j.location,
            "skills": j.skills,
            "stage_focus": j.stage_focus,
            "salary_range": j.salary_range,
        }
        for j in db_jobs
    ]

    candidate_profile = {
        "career_stage": payload.career_stage,
        "skills": payload.skills,
        "target_role": payload.target_role,
    }

    scored = ai_service.score_jobs(candidate_profile, job_dicts)
    return {
        "candidate_stage": payload.career_stage,
        "total_jobs_evaluated": len(job_dicts),
        "matches": scored,
    }


@router.post("/interview-coach")
def interview_coach(payload: InterviewCoachRequest):
    """
    Evaluate candidate's interview answer with role-specific,
    company-aligned, and stage-tailored constructive feedback.
    """
    if not payload.candidate_answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")

    result = ai_service.evaluate_interview_answer(
        company=payload.company,
        role=payload.role,
        career_stage=payload.career_stage,
        question=payload.question,
        candidate_answer=payload.candidate_answer,
    )
    return result


@router.post("/rank-applicants")
def rank_job_applicants(payload: RankApplicantsRequest, db: Session = Depends(get_db)):
    """
    AI ranking for recruiter jobs: scores all applicants for a given job
    with clear, unbiased, skill-focused rationale.
    """
    job = db.query(Job).filter(Job.id == payload.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    apps = db.query(Application).filter(Application.job_id == job.id).all()
    applicants_list = [
        {
            "id": a.id,
            "candidate_name": a.candidate_name,
            "career_stage": a.career_stage,
            "status": a.status,
            "break_duration": a.break_duration,
        }
        for a in apps
    ]

    ranked = ai_service.rank_applicants(
        job={"id": job.id, "title": job.title, "company": job.company},
        applicants=applicants_list,
    )

    return {
        "job_id": job.id,
        "job_title": job.title,
        "total_applicants": len(applicants_list),
        "ranked_applicants": ranked,
    }
