# HireLoop — A Smarter, Connected Hiring Journey

HireLoop is a two-sided hiring platform that adapts to candidate career stages (students, senior professionals, and career-break returners) while providing recruiters with AI-ranked candidates and one unified workflow from application to hire.

## Repository Structure

```
hireloop/
├── frontend/                     # React + Vite + Tailwind CSS
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # UI Components (common & feature-specific)
│   │   │   └── common/           # Button, Card, Badge, Modal, etc.
│   │   ├── context/              # Auth & Global application state
│   │   ├── data/                 # Realistic sample datasets
│   │   ├── pages/                # Marketing & App views
│   │   ├── services/             # API client & AI integration
│   │   ├── App.jsx               # Main application router/entry
│   │   ├── index.css             # Tailwind setup & Google Fonts
│   │   └── main.jsx              # React DOM mounting
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/                      # FastAPI (Python)
│   ├── app/
│   │   ├── api/                  # Versioned API routes & endpoints
│   │   ├── core/                 # Config, security, and JWT tokens
│   │   ├── db/                   # Database session and migrations
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── schemas/              # Pydantic validation schemas
│   │   ├── services/             # AI matching, ranking & coaching logic
│   │   └── main.py               # FastAPI entrypoint & middleware
│   ├── .env.example              # Environment variables template
│   └── requirements.txt          # Python dependencies
├── .gitignore
└── README.md
```

## Quick Start

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### 2. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # On Windows (or source venv/bin/activate on Unix)
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
API runs at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.
