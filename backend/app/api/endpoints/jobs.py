"""Job listing and creation endpoints."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models import Job, RecruiterProfile
from app.schemas.job import JobCreate, JobOut

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/", response_model=List[JobOut])
def list_jobs(
    stage: Optional[str] = Query(None, description="Filter by career stage focus"),
    search: Optional[str] = Query(None, description="Search keyword in title or skills"),
    db: Session = Depends(get_db),
):
    """Retrieve active jobs, optionally filtered by career stage orientation or search keywords."""
    query = db.query(Job).filter(Job.is_active == True)

    if stage and stage != "all":
        query = query.filter(Job.stage_focus.ilike(f"%{stage}%"))

    if search:
        query = query.filter(
            (Job.title.ilike(f"%{search}%"))
            | (Job.company.ilike(f"%{search}%"))
            | (Job.skills.ilike(f"%{search}%"))
        )

    return query.order_by(Job.created_at.desc()).all()


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    """Fetch single job details."""
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found.")
    return job


@router.post("/", response_model=JobOut)
def create_job(job_in: JobCreate, db: Session = Depends(get_db)):
    """Publish a new job requisition."""
    # Default to first recruiter for rapid onboarding
    recruiter = db.query(RecruiterProfile).first()
    if not recruiter:
        raise HTTPException(status_code=400, detail="No active recruiter profile available.")

    job = Job(
        recruiter_id=recruiter.id,
        title=job_in.title,
        company=job_in.company,
        location=job_in.location,
        workplace_type=job_in.workplace_type,
        salary_range=job_in.salary_range,
        description=job_in.description,
        requirements=job_in.requirements,
        skills=job_in.skills,
        stage_focus=job_in.stage_focus,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job
