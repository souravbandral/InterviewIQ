# InterviewIQ

### AI-Powered Interview Preparation Platform

InterviewIQ is a full-stack AI-powered interview preparation platform designed to help students and job seekers prepare for technical interviews through resume analysis, AI mock interviews, performance evaluation, and company-wise coding practice.

## 🚀 Live Demo

https://interviewiq-bice.vercel.app

## ✨ Features

- 📄 **AI Resume Analysis**
  - Upload your PDF resume
  - Analyze resume content
  - Generate Resume and ATS scores

- 🎤 **AI Mock Interviews**
  - Resume-based interview questions
  - Select target role
  - Choose interview difficulty
  - Choose number of questions
  - Voice-based answer support

- 🤖 **AI Answer Evaluation**
  - Technical evaluation
  - Communication evaluation
  - Confidence evaluation
  - Grammar evaluation
  - Problem-solving evaluation
  - Overall interview score

- 📊 **Interview Reports**
  - Detailed performance report
  - AI-generated verdict
  - Strengths and weaknesses
  - Improvement suggestions

- 🕒 **Interview History**
  - Track previous mock interviews
  - View previous scores
  - Open complete interview reports
  - Account-specific interview history

- 💻 **Company Coding Practice**
  - Google
  - Amazon
  - Microsoft
  - Meta
  - Adobe
  - TCS
  - Infosys
  - Wipro
  - Accenture
  - Cognizant

- 🔐 **User Authentication**
  - User signup
  - User login
  - Account-specific interview data

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript
- Framer Motion
- React Icons

### Backend

- Python
- FastAPI
- PostgreSQL
- PDFPlumber

### AI

- Groq API

### Deployment

- Vercel

## 🏗️ Project Structure

```text
InterviewIQ/
│
├── backend/
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── .gitignore
```

## 🔄 How InterviewIQ Works

```text
User
  ↓
Signup / Login
  ↓
Dashboard
  ↓
Upload Resume
  ↓
AI Resume Analysis
  ↓
Select Target Role & Difficulty
  ↓
AI Mock Interview
  ↓
Answer Questions
  ↓
AI Evaluation
  ↓
Interview Report
  ↓
Interview History
```

## 🎯 Main Use Case

InterviewIQ is built for students and job seekers who want to:

- Practice technical interviews
- Improve communication skills
- Analyze and improve their resumes
- Understand their interview performance
- Practice company-specific coding problems
- Track their interview preparation progress

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/souravbandral/InterviewIQ.git
cd InterviewIQ
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

Open another terminal:

```bash
cd backend
pip install -r requirements.txt
```

Run the FastAPI backend according to your local configuration.

## 🔑 Environment Variables

API keys and other sensitive credentials should be stored in environment variables and should **not** be committed to GitHub.

Example:

```env
GROQ_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

## 🌐 Deployment

The frontend and backend are deployed using Vercel.

### Frontend

https://interviewiq-bice.vercel.app

### Backend

https://interviewiq-backend.vercel.app

## 📌 Future Improvements

- Real-time interview analytics
- More company-specific coding questions
- Advanced ATS recommendations
- Personalized interview preparation plans
- Improved interview performance visualization
- Additional authentication and cloud data persistence

## 👨‍💻 Author

**Sourav Bandral**

B.Tech Computer Science & Engineering

GitHub: https://github.com/souravbandral

---

⭐ If you find InterviewIQ interesting, consider giving the repository a star!
