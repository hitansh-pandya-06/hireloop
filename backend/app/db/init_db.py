"""Database initialization and realistic seed data generator."""
from sqlalchemy.orm import Session
from app.db.session import engine, SessionLocal, Base
from app.models import (
    User,
    CandidateProfile,
    RecruiterProfile,
    Job,
    Application,
    Notification,
    HRSession,
    InterviewPracticeSession,
)
from app.core.security import get_password_hash


def init_db(db: Session) -> None:
    """Create all tables and seed initial demo data if empty."""
    Base.metadata.create_all(bind=engine)

    # Check if already seeded
    if db.query(User).first():
        return

    # 1. Create Demo Candidate User (Elena Rostova - Returner)
    cand_user = User(
        email="elena.rostova@hireloop.demo",
        hashed_password=get_password_hash("password123"),
        name="Elena Rostova",
        role="candidate",
    )
    db.add(cand_user)
    db.flush()

    cand_profile = CandidateProfile(
        user_id=cand_user.id,
        career_stage="returner",
        break_duration="3 years (2021 - 2024)",
        break_activities="Full-time family caregiving, open-source React contributions, Next.js 15 & Tailwind deep dives",
        headline="Senior React & Design Systems Specialist",
        bio="6 years of lead frontend experience before career break. Deep passion for accessible component architectures, modern React performance, and team mentorship.",
        skills="React 19, TypeScript, Tailwind CSS, Next.js, Design Systems, State Machines, Accessibility",
        experience_years=6,
        preferred_locations="Remote",
        portfolio_url="https://github.com/elena-rostova-demo",
        github_url="https://github.com/elena-rostova-demo",
    )
    db.add(cand_profile)

    # 2. Create Demo Recruiter User (Sarah Vance - Cloudscale)
    rec_user = User(
        email="sarah.vance@cloudscale.demo",
        hashed_password=get_password_hash("password123"),
        name="Sarah Vance",
        role="recruiter",
    )
    db.add(rec_user)
    db.flush()

    rec_profile = RecruiterProfile(
        user_id=rec_user.id,
        company_name="Cloudscale Systems",
        company_size="50-200",
        company_type="Direct Employer",
        industry="Cloud Infrastructure & DevOps",
        website_url="https://cloudscale.example.com",
    )
    db.add(rec_profile)
    db.flush()

    # 3. Seed Realistic Jobs
    job1 = Job(
        recruiter_id=rec_profile.id,
        title="Senior Full-Stack Engineer",
        company="Cloudscale Systems",
        location="Remote (US / Canada)",
        workplace_type="Remote",
        salary_range="$165,000 - $195,000",
        stage_focus="Returner-Friendly",
        skills="React 19, Python, FastAPI, PostgreSQL, System Design",
        description="We are scaling our core telemetry engine. We seek a seasoned engineer who values code craftsmanship, clean architecture, and team mentorship. We actively welcome returning engineers with non-linear career trajectories.",
        requirements="4+ years of production experience in React and modern Python/Go; experience with async APIs and distributed systems.",
    )
    job2 = Job(
        recruiter_id=rec_profile.id,
        title="Junior Frontend Developer",
        company="Linear",
        location="Remote",
        workplace_type="Remote",
        salary_range="$95,000 - $115,000",
        stage_focus="Student-Friendly",
        skills="React, TypeScript, CSS Animation, WebSockets",
        description="Join our product experience team building high-speed desktop-class web applications. Fresh grads with exceptional personal project portfolios and high design sensitivity are encouraged to apply.",
        requirements="Demonstrated mastery of React components, clean JavaScript/TypeScript, and attention to micro-interactions.",
    )
    job3 = Job(
        recruiter_id=rec_profile.id,
        title="Principal Infrastructure Architect",
        company="Datadog",
        location="New York, NY (Hybrid)",
        workplace_type="Hybrid",
        salary_range="$220,000 - $265,000",
        stage_focus="Senior-Level",
        skills="Distributed Systems, Kubernetes, Go, High-Throughput Pipelines",
        description="Architect next-generation observability pipelines processing 100M+ events per second. High autonomy, strategic executive partnership, and team scaling.",
        requirements="8+ years building enterprise distributed platforms with stringent 99.999% SLA availability guarantees.",
    )
    db.add_all([job1, job2, job3])
    db.flush()

    # 4. Seed Live HR Sessions
    session1 = HRSession(
        title="Navigating Technical Interviews After a Career Break",
        description="Practical strategies for framing your career pause with confidence and showcasing modern technical currency.",
        host_name="Marcus Sterling",
        host_role="Head of Engineering Talent",
        company="Cloudflare",
        session_date="Tomorrow, 4:00 PM EST",
        duration_minutes=45,
        category="Career Returners",
        total_spots=50,
        spots_left=8,
        attendees_count=42,
    )
    session2 = HRSession(
        title="Breaking Into Tech: Standout Portfolios for Grads",
        description="What recruiters actually look for in GitHub repos and capstone demos when you lack 3 years on a resume.",
        host_name="Aisha Al-Mansoor",
        host_role="Senior Tech Recruiter",
        company="Notion",
        session_date="Thursday, 2:00 PM EST",
        duration_minutes=60,
        category="Students & Grads",
        total_spots=100,
        spots_left=14,
        attendees_count=86,
    )
    db.add_all([session1, session2])

    # 5. Seed Sample Application for Elena
    app1 = Application(
        candidate_id=cand_profile.id,
        job_id=job1.id,
        status="shortlisted",
        ai_score=96,
        ai_rationale="Strong match across React 19, TypeScript, and distributed architecture. Caregiving break is backed by verifiable open-source design system contributions. Exceptional leadership and culture match.",
    )
    db.add(app1)

    # 6. Seed Sample Notification
    notif = Notification(
        user_id=cand_user.id,
        title="Application Shortlisted!",
        message="Exciting news! Cloudscale Systems has shortlisted you for Senior Full-Stack Engineer. Interview invitation has been queued.",
        notification_type="status_update",
    )
    db.add(notif)

    db.commit()


if __name__ == "__main__":
    db = SessionLocal()
    init_db(db)
    db.close()
    print("HireLoop database initialized successfully with all 8 tables and seed data!")
