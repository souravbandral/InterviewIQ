from fastapi import UploadFile, File
from database import SessionLocal
from database import engine
import models

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "InterviewIQ Backend Running"
    }


class SignupData(BaseModel):
    name: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str


@app.post("/signup")
def signup(user: SignupData):

    db = SessionLocal()

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Saved In Database"
    }


@app.post("/login")
def login(user: LoginData):

    db = SessionLocal()

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not existing_user:

        return {
            "message": "User Not Found"
        }

    if existing_user.password != user.password:

        return {
            "message": "Incorrect Password"
        }

    return {
        "message": "Login Successful"
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    return {
        "filename": file.filename,
        "message": "Resume Uploaded Successfully"
    }