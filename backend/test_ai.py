import requests

try:
    r = requests.post(
        "http://127.0.0.1:8000/api/ai/interview-coach",
        json={
            "company": "CloudScale Systems",
            "role": "Frontend Engineer",
            "career_stage": "returner",
            "question": "Tell me about your career break.",
            "candidate_answer": "During my 18-month career pause for family caregiving, I maintained engineering acuity by shipping two full-stack React and TypeScript projects with CI/CD and 90 percent test coverage."
        }
    )
    print("STATUS:", r.status_code)
    print("RESPONSE:", r.json())

    r2 = requests.post(
        "http://127.0.0.1:8000/api/ai/match-jobs",
        json={
            "career_stage": "returner",
            "skills": "React, TypeScript, Tailwind CSS, GraphQL",
            "target_role": "Staff Frontend Engineer"
        }
    )
    print("MATCH STATUS:", r2.status_code)
    print("MATCHES COUNT:", len(r2.json().get("matches", [])))
    print("TOP MATCH:", r2.json().get("matches", [])[0] if r2.json().get("matches") else "None")
except Exception as e:
    print("ERROR:", e)
