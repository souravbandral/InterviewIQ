import os
import json
import re

from groq import Groq
import pdfplumber

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import SessionLocal
from database import engine
import models


# =========================================================
# DATABASE
# =========================================================

models.Base.metadata.create_all(bind=engine)


# =========================================================
# APP
# =========================================================

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://interviewiq-bice.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# GROQ
# =========================================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY environment variable is not set.")

client = Groq(
    api_key=GROQ_API_KEY
) if GROQ_API_KEY else None


MODEL_NAME = "llama-3.3-70b-versatile"


# =========================================================
# TEMPORARY RESUME STORAGE
# =========================================================

resume_text = ""


# =========================================================
# HELPER
# =========================================================

def require_ai():

    if client is None:
        raise Exception(
            "GROQ_API_KEY is not configured. "
            "Set the GROQ_API_KEY environment variable."
        )


def clean_json_response(text):

    """
    Removes markdown code fences if Groq returns JSON
    inside ```json ... ```
    """

    text = text.strip()

    text = re.sub(
        r"^```json\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"^```\s*",
        "",
        text
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    return text.strip()


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "InterviewIQ Backend Running"
    }


# =========================================================
# MODELS
# =========================================================

class SignupData(BaseModel):

    name: str
    email: str
    password: str


class LoginData(BaseModel):

    email: str
    password: str


class AnswerData(BaseModel):

    question: str
    answer: str


class InterviewSetup(BaseModel):

    role: str = "Software Engineer"
    difficulty: str = "Medium"
    question_count: int = 10


class FinalReportData(BaseModel):

    interview: list


# =========================================================
# SIGNUP
# =========================================================

@app.post("/signup")
def signup(user: SignupData):

    db = SessionLocal()

    try:

        existing_user = db.query(models.User).filter(
            models.User.email == user.email
        ).first()

        if existing_user:

            return {
                "success": False,
                "message": "Email already registered"
            }

        new_user = models.User(
            name=user.name,
            email=user.email,
            password=user.password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "success": True,
            "message": "Account Created Successfully"
        }

    except Exception as e:

        db.rollback()

        return {
            "success": False,
            "message": str(e)
        }

    finally:

        db.close()


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(user: LoginData):

    db = SessionLocal()

    try:

        existing_user = db.query(models.User).filter(
            models.User.email == user.email
        ).first()

        if not existing_user:

            return {
                "success": False,
                "message": "User Not Found"
            }

        if existing_user.password != user.password:

            return {
                "success": False,
                "message": "Incorrect Password"
            }

        return {
            "success": True,
            "message": "Login Successful"
        }

    finally:

        db.close()


# =========================================================
# RESUME UPLOAD
# =========================================================

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    global resume_text

    print("UPLOAD API HIT")

    # Check PDF
    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Only PDF resumes are supported."
        }

    text = ""

    try:
        # Read PDF directly from uploaded file
        with pdfplumber.open(file.file) as pdf:

            for page in pdf.pages:

                extracted = page.extract_text()

                if extracted:
                    text += extracted + "\n"

    except Exception as e:

        print("PDF ERROR:", str(e))

        return {
            "success": False,
            "message": f"Unable to read PDF: {str(e)}"
        }

    # Store extracted resume text
    resume_text = text.strip()

    if not resume_text:

        return {
            "success": False,
            "message": "Could not extract text from resume."
        }

    print("========== RESUME ==========")
    print(resume_text[:500])
    print("========== END ==========")

    return {
        "success": True,
        "message": "Resume Uploaded Successfully",
        "resume_text": resume_text
    }


# =========================================================
# RESUME ANALYSIS
# =========================================================

@app.post("/analyze-resume")
def analyze_resume():

    global resume_text

    if not resume_text:

        try:

            with open(
                "resume.txt",
                "r",
                encoding="utf-8"
            ) as f:

                resume_text = f.read()

        except FileNotFoundError:

            return {
                "success": False,
                "message": "Please upload a resume first."
            }

    require_ai()

    prompt = f"""
You are an expert ATS resume evaluator and technical recruiter.

Analyze the following resume.

RESUME:
{resume_text}

Return ONLY valid JSON.

Use exactly this structure:

{{
  "resume_score": 0,
  "ats_score": 0,
  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],
  "weaknesses": [
    "weakness 1",
    "weakness 2",
    "weakness 3"
  ],
  "missing_skills": [
    "skill 1",
    "skill 2",
    "skill 3"
  ],
  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ],
  "suitable_roles": [
    "role 1",
    "role 2",
    "role 3"
  ]
}}

Rules:

- Resume score should be from 0 to 100.
- ATS score should be from 0 to 100.
- Analyze only information supported by the resume.
- Do not invent experience.
- Missing skills should be useful skills for the candidate's likely target roles.
- Keep each list to a maximum of 5 items.
"""

    try:

        chat_completion = client.chat.completions.create(

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            model=MODEL_NAME,

            temperature=0.2
        )

        raw_response = (
            chat_completion
            .choices[0]
            .message
            .content
        )

        cleaned = clean_json_response(raw_response)

        analysis = json.loads(cleaned)

        return {

            "success": True,

            "analysis": analysis
        }

    except Exception as e:

        print("Resume Analysis Error:", e)

        return {

            "success": False,

            "message": "Unable to analyze resume.",

            "error": str(e)
        }


# =========================================================
# GENERATE INTERVIEW QUESTIONS
# =========================================================

@app.post("/generate-questions")
def generate_questions(
    setup: InterviewSetup | None = None
):

    global resume_text

    if setup is None:

        setup = InterviewSetup()

    if not resume_text:

        try:

            with open(
                "resume.txt",
                "r",
                encoding="utf-8"
            ) as f:

                resume_text = f.read()

        except FileNotFoundError:

            return {

                "success": False,

                "message": "Please upload a resume first."
            }

    require_ai()

    allowed_counts = [5, 10, 15]

    if setup.question_count not in allowed_counts:

        return {

            "success": False,

            "message": "Question count must be 5, 10, or 15."
        }

    prompt = f"""
You are conducting a professional technical interview.

Candidate Resume:
{resume_text}

Interview Role:
{setup.role}

Difficulty:
{setup.difficulty}

Generate exactly {setup.question_count} interview questions.

IMPORTANT:

- Questions must be strongly related to the candidate's resume.
- Ask about skills, technologies, projects, education,
  internships and certifications mentioned in the resume.
- Include project-specific questions when projects exist.
- Questions should match the selected role.
- Difficulty must match {setup.difficulty}.
- Do not give answers.
- Do not give feedback.
- Do not add headings.
- Do not number the questions.
- One question per line.
"""

    try:

        chat_completion = client.chat.completions.create(

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            model=MODEL_NAME,

            temperature=0.5
        )

        raw_questions = (
            chat_completion
            .choices[0]
            .message
            .content
        )

        question_array = [

            q.strip()

            for q in raw_questions.split("\n")

            if q.strip()
        ]

        question_array = [

            re.sub(
                r"^[\-\*\d\.\)\s]+",
                "",
                q
            ).strip()

            for q in question_array
        ]

        question_array = [

            q for q in question_array

            if q
        ]

        question_array = question_array[
            :setup.question_count
        ]

        return {

            "success": True,

            "questions": question_array,

            "role": setup.role,

            "difficulty": setup.difficulty,

            "question_count": len(question_array)
        }

    except Exception as e:

        print("Question Generation Error:", e)

        return {

            "success": False,

            "message": "Unable to generate questions.",

            "error": str(e)
        }


# =========================================================
# TEST AI
# =========================================================

@app.get("/test-ai")
def test_ai():

    require_ai()

    chat_completion = client.chat.completions.create(

        messages=[
            {
                "role": "user",
                "content": "Say hello in one sentence."
            }
        ],

        model=MODEL_NAME
    )

    return {

        "result":
        chat_completion
        .choices[0]
        .message
        .content
    }


# =========================================================
# FINAL INTERVIEW REPORT
# =========================================================

@app.post("/final-report")
def final_report(data: FinalReportData):

    require_ai()

    if not data.interview:
        return {
            "success": False,
            "message": "No interview answers were provided."
        }

    interview_data = ""

    for index, item in enumerate(data.interview, start=1):

        question = item.get("question", "")
        answer = item.get("answer", "")

        interview_data += f"""
QUESTION {index}:
{question}

CANDIDATE ANSWER:
{answer}

-------------------------
"""

    prompt = f"""
You are a senior technical interviewer.

Analyze the candidate's COMPLETE mock interview.

This is the FINAL interview report.

INTERVIEW DATA:

{interview_data}

Return ONLY valid JSON.

Use EXACTLY this structure:

{{
  "overall_score": 0,
  "communication_score": 0,
  "technical_score": 0,
  "confidence_score": 0,
  "grammar_score": 0,
  "problem_solving_score": 0,

  "strengths": [
    "strength 1",
    "strength 2",
    "strength 3"
  ],

  "weaknesses": [
    "weakness 1",
    "weakness 2",
    "weakness 3"
  ],

  "improvement_plan": [
    "improvement 1",
    "improvement 2",
    "improvement 3"
  ],

  "recommended_topics": [
    "topic 1",
    "topic 2",
    "topic 3"
  ],

  "question_analysis": [
    {{
      "question_number": 1,
      "score": 0,
      "what_was_good": "",
      "what_to_improve": "",
      "model_answer": ""
    }}
  ],

  "final_verdict": ""
}}

IMPORTANT RULES:

1. Analyze EVERY question.
2. Keep the question order exactly the same.
3. question_number must start from 1.
4. Score for each question must be 0-10.
5. Category scores must be 0-10.
6. overall_score must be 0-100.
7. Do NOT invent candidate answers.
8. Be honest and constructive.
9. model_answer must be a strong concise answer to that exact question.
10. Do NOT return the candidate's question or answer inside question_analysis.
11. Keep explanations concise.
"""

    try:

        chat_completion = client.chat.completions.create(

            messages=[
                {
                    "role": "system",
                    "content": "You are a strict but helpful senior technical interviewer."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            model=MODEL_NAME,

            temperature=0.2
        )

        raw_response = (
            chat_completion
            .choices[0]
            .message
            .content
        )

        cleaned = clean_json_response(raw_response)

        report = json.loads(cleaned)

        # ==========================================
        # RESTORE ACTUAL QUESTIONS AND ANSWERS
        # ==========================================

        ai_analysis = report.get(
            "question_analysis",
            []
        )

        final_analysis = []

        for index, item in enumerate(
            data.interview,
            start=1
        ):

            question = item.get(
                "question",
                ""
            )

            answer = item.get(
                "answer",
                ""
            )

            ai_item = {}

            if index - 1 < len(ai_analysis):
                ai_item = ai_analysis[index - 1]

            final_analysis.append({

                "question_number": index,

                "question": question,

                "answer": answer,

                "score": ai_item.get(
                    "score",
                    0
                ),

                "what_was_good": ai_item.get(
                    "what_was_good",
                    "No feedback available."
                ),

                "what_to_improve": ai_item.get(
                    "what_to_improve",
                    "No improvement feedback available."
                ),

                "model_answer": ai_item.get(
                    "model_answer",
                    "No model answer available."
                )
            })

        report["question_analysis"] = final_analysis

        return {
            "success": True,
            "report": report
        }

    except Exception as e:

        print(
            "Final Report Error:",
            e
        )

        return {
            "success": False,
            "message": "Unable to generate final report.",
            "error": str(e)
        }
class AnswerRequest(BaseModel):
    question: str
    answer: str



@app.post("/evaluate-answer")

def evaluate_answer(data: AnswerRequest):

    if not client:
        return {
            "feedback": "Groq API is not configured."
        }

    try:

        prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Question:
{data.question}

Candidate Answer:
{data.answer}

Give concise feedback in exactly this format:

Score: X/10
Strength: ...
Improvement: ...
Model Answer: ...

Be honest and evaluate the actual answer.
"""

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert technical interviewer."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=500
        )

        feedback = response.choices[0].message.content

        return {
            "feedback": feedback
        }

    except Exception as e:

        print("EVALUATION ERROR:", e)

        return {
            "feedback": "Unable to evaluate answer."
        }
 