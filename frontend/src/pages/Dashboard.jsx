import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState(null);
  const [latestInterview, setLatestInterview] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);

  const [userName, setUserName] = useState("there");

  const [role, setRole] = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);

  const fileInputRef = useRef(null);

  // =====================================================
  // ACCOUNT-SCOPED STORAGE
  // =====================================================

  const getUserEmail = () => {
    return (
      localStorage.getItem("currentUserEmail") ||
      ""
    ).trim().toLowerCase();
  };

  const getUserKey = (key) => {
    const email = getUserEmail();

    if (!email) {
      return key;
    }

    return `${key}_${encodeURIComponent(email)}`;
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const parseStoredData = (value) => {
    if (!value) return null;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const getNumber = (value) => {
    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "string") {
      const match = value.match(/\d+(\.\d+)?/);
      return match ? Number(match[0]) : null;
    }

    return null;
  };

  // =====================================================
  // PARSE RESUME ANALYSIS
  // =====================================================

  const normalizeResumeAnalysis = (savedData) => {
    if (!savedData) return null;

    // Already an object
    if (typeof savedData === "object") {
      return savedData;
    }

    // Backend may return analysis as text
    if (typeof savedData === "string") {
      const result = {};

      const resumeMatch = savedData.match(
        /Resume Score\s*:\s*(\d+(?:\.\d+)?)\s*\/\s*100/i
      );

      const atsMatch = savedData.match(
        /ATS Score\s*:\s*(\d+(?:\.\d+)?)\s*\/\s*100/i
      );

      if (resumeMatch) {
        result.resume_score = Number(resumeMatch[1]);
      }

      if (atsMatch) {
        result.ats_score = Number(atsMatch[1]);
      }

      result.raw = savedData;

      return result;
    }

    return null;
  };

  // =====================================================
  // PARSE INTERVIEW REPORT
  // =====================================================

  const normalizeInterviewReport = (report) => {
    if (!report) return null;

    if (typeof report === "object") {
      return report;
    }

    if (typeof report === "string") {
      const result = {
        raw: report,
      };

      const overallMatch = report.match(
        /Overall Score\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*100/i
      );

      const technicalMatch = report.match(
        /Technical\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
      );

      const communicationMatch = report.match(
        /Communication\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
      );

      const confidenceMatch = report.match(
        /Confidence\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
      );

      const grammarMatch = report.match(
        /Grammar\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
      );

      const problemMatch = report.match(
        /Problem Solving\s*:?\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
      );

      if (overallMatch) {
        result.overall_score = Number(overallMatch[1]);
      }

      if (technicalMatch) {
        result.technical_score = Number(technicalMatch[1]);
      }

      if (communicationMatch) {
        result.communication_score = Number(
          communicationMatch[1]
        );
      }

      if (confidenceMatch) {
        result.confidence_score = Number(
          confidenceMatch[1]
        );
      }

      if (grammarMatch) {
        result.grammar_score = Number(grammarMatch[1]);
      }

      if (problemMatch) {
        result.problem_solving_score = Number(
          problemMatch[1]
        );
      }

      return result;
    }

    return null;
  };

  // =====================================================
  // LOAD USER NAME
  // =====================================================

  const loadUserName = () => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      try {
        const parsed = JSON.parse(currentUser);

        if (parsed?.name?.trim()) {
          return parsed.name.trim();
        }
      } catch {
        // Ignore malformed current user data.
      }
    }

    const email = getUserEmail();

    if (email) {
      return email.split("@")[0];
    }

    return "there";
  };

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  const loadDashboardData = () => {
    // -------------------------------
    // USER
    // -------------------------------

    setUserName(loadUserName());

    // -------------------------------
    // RESUME ANALYSIS
    // -------------------------------

    const savedAnalysis = localStorage.getItem(
      getUserKey("resumeAnalysis")
    );

    if (savedAnalysis) {
      const parsedAnalysis = parseStoredData(
        savedAnalysis
      );

      const normalizedAnalysis =
        normalizeResumeAnalysis(parsedAnalysis);

      setAnalysis(normalizedAnalysis);
      setResumeUploaded(true);
    }

    // -------------------------------
    // INTERVIEW HISTORY
    // -------------------------------

    try {
      const savedHistory = JSON.parse(
        localStorage.getItem(getUserKey("interviewHistory")) || "[]"
      );

      if (
        Array.isArray(savedHistory) &&
        savedHistory.length > 0
      ) {
        setInterviewHistory(savedHistory);
        const latest = savedHistory[0];

        const report = normalizeInterviewReport(
          latest?.report || latest
        );

        setLatestInterview({
          ...latest,
          report,
        });
      } else {
        setInterviewHistory([]);
        setLatestInterview(null);
      }
    } catch (error) {
      console.error(
        "Dashboard history loading error:",
        error
      );

      setLatestInterview(null);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =====================================================
  // UPLOAD + ANALYZE RESUME
  // =====================================================

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a resume.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Resume upload failed."
        );
        return;
      }

      setResumeUploaded(true);

      await analyzeResume();

      alert(
        "✅ Resume uploaded and analyzed successfully!"
      );
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      alert(
        "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ANALYZE RESUME
  // =====================================================

  const analyzeResume = async () => {
    try {
      setAnalyzing(true);

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/analyze-resume",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Resume analysis failed."
        );
        return;
      }

      const normalizedAnalysis =
        normalizeResumeAnalysis(
          data.analysis
        );

      setAnalysis(normalizedAnalysis);

      localStorage.setItem(
        getUserKey("resumeAnalysis"),
        JSON.stringify(normalizedAnalysis)
      );
    } catch (error) {
      console.error(
        "ANALYSIS ERROR:",
        error
      );

      alert(
        "Resume analysis failed."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // =====================================================
  // START INTERVIEW
  // =====================================================

  const startInterview = () => {
    if (!resumeUploaded && !analysis) {
      alert(
        "Please upload and analyze your resume first."
      );
      return;
    }

    const setup = {
      role,
      difficulty,
      questionCount,
    };

    localStorage.setItem(
      "interviewSetup",
      JSON.stringify(setup)
    );

    // Interview.jsx currently writes the fresh report to the
    // temporary global finalReport key. Mark this session so
    // Results.jsx can safely consume that fresh report and
    // immediately move it into the current user's storage.
    localStorage.setItem("interviewInProgress", "true");

    navigate("/interview");
  };

  // =====================================================
  // LATEST INTERVIEW SCORE
  // =====================================================

  const latestInterviewScore =
    getNumber(
      latestInterview?.report?.overall_score
    );

  /*
    IMPORTANT:

    Before any interview:
    show the Resume / ATS analysis scores.

    After an interview:
    both Dashboard cards show the latest
    interview's Overall Score.

    This is exactly what you requested.
  */

  const dashboardResumeScore =
    latestInterviewScore !== null
      ? latestInterviewScore
      : getNumber(
          analysis?.resume_score
        );

  const dashboardAtsScore =
    latestInterviewScore !== null
      ? latestInterviewScore
      : getNumber(
          analysis?.ats_score
        );

  const hasInterview =
    latestInterview !== null;

  // =====================================================
  // INTERVIEW DASHBOARD METRICS
  // =====================================================

  const interviewScores = interviewHistory
    .map((item) => {
      const report = normalizeInterviewReport(
        item?.report || item
      );
      return getNumber(report?.overall_score);
    })
    .filter((score) => score !== null);

  const interviewsTaken = interviewHistory.length;

  const averageInterviewScore =
    interviewScores.length > 0
      ? Math.round(
          interviewScores.reduce(
            (sum, score) => sum + score,
            0
          ) / interviewScores.length
        )
      : null;

  const interviewReadiness =
    latestInterviewScore === null
      ? null
      : latestInterviewScore >= 80
      ? "Excellent"
      : latestInterviewScore >= 60
      ? "Good"
      : latestInterviewScore >= 40
      ? "Needs Practice"
      : "Keep Practicing";

  // =====================================================
  // RESUME ANALYSIS DATA
  // =====================================================

  const strengths =
    analysis?.strengths || [];

  const weaknesses =
    analysis?.weaknesses || [];

  const missingSkills =
    analysis?.missing_skills || [];

  const improvements =
    analysis?.improvements || [];

  const suitableRoles =
    analysis?.suitable_roles || [];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#030712] text-white px-5 md:px-8 py-8 overflow-x-hidden">

      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-[1600px] mx-auto">

        {/* =================================================
            WELCOME HEADER
        ================================================= */}

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#111827] to-[#172554] p-7 md:p-10 shadow-2xl">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-purple-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-blue-400 font-semibold tracking-wide mb-2">
                INTERVIEWIQ
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">

                Welcome,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  {userName}
                </span>{" "}
                👋

              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Ready to crack your next interview?
              </p>

            </div>

            <div className="text-6xl md:text-7xl drop-shadow-2xl">
              👨‍💻
            </div>

          </div>

        </div>


        {/* =================================================
            DASHBOARD OVERVIEW
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

          {/* INTERVIEW READINESS */}
          <div className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#0d1b35] via-[#111827] to-[#102a43] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Interview Readiness</p>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-blue-400 mt-3">
                {interviewReadiness || "--"}
              </p>
              <p className="text-xs text-blue-300/70 mt-2">
                {latestInterviewScore !== null
                  ? `Based on your latest ${latestInterviewScore}/100 interview`
                  : "Complete an interview to get your readiness level"}
              </p>
            </div>
          </div>

          {/* INTERVIEWS TAKEN */}
          <div className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-[#1b1230] via-[#111827] to-[#24133d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Interviews Taken</p>
                <span className="text-2xl">🎤</span>
              </div>
              <p className="text-4xl font-extrabold text-purple-400 mt-3">
                {interviewsTaken}
              </p>
              <p className="text-xs text-purple-300/70 mt-2">
                Mock interviews completed
              </p>
            </div>
          </div>

          {/* AVERAGE SCORE */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#0d251e] via-[#111827] to-[#12362b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Average Interview Score</p>
                <span className="text-2xl">📈</span>
              </div>
              <p className="text-4xl font-extrabold text-emerald-400 mt-3">
                {averageInterviewScore !== null
                  ? `${averageInterviewScore}/100`
                  : "--"}
              </p>
              <p className="text-xs text-emerald-300/70 mt-2">
                {interviewScores.length > 0
                  ? "Across your completed interviews"
                  : "Your average will appear here"}
              </p>
            </div>
          </div>

        </div>

        {/* =================================================
            MAIN CARDS
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          {/* =================================================
              RESUME ANALYSIS
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] p-7 md:p-8 shadow-xl">

            <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-2xl">
                      📄
                    </div>

                    <h2 className="text-2xl font-bold">
                      Resume Analysis
                    </h2>

                  </div>

                  <p className="text-gray-400 mt-3">
                    Check your ATS score and improve your resume.
                  </p>

                </div>

                <div className="text-4xl">
                  🤖
                </div>

              </div>


              {/* FILE */}

              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
                onChange={(e) =>
                  setFile(
                    e.target.files?.[0] || null
                  )
                }
                className="hidden"
              />


              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="w-full mt-7 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/30 rounded-2xl p-4 transition-all duration-300 text-left"
              >

                <span className="text-gray-300">
                  📄{" "}
                  {file
                    ? file.name
                    : "Choose PDF Resume"}
                </span>

              </button>


              {/* UPLOAD */}

              <button
                onClick={handleUpload}
                disabled={
                  loading || analyzing
                }
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-2xl p-4 font-bold transition-all duration-300 shadow-lg shadow-blue-500/10"
              >

                {loading || analyzing
                  ? "🔄 Analyzing Resume..."
                  : "🚀 Upload & Analyze Resume"}

              </button>


              {/* RESUME SCORE PREVIEW */}

              {analysis && (
                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">

                    <p className="text-gray-400 text-sm">
                      Resume Score
                    </p>

                    <p className="text-3xl font-bold text-emerald-400 mt-2">
                      {getNumber(
                        analysis.resume_score
                      ) ?? "--"}
                      /100
                    </p>

                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-5">

                    <p className="text-gray-400 text-sm">
                      ATS Score
                    </p>

                    <p className="text-3xl font-bold text-cyan-400 mt-2">
                      {getNumber(
                        analysis.ats_score
                      ) ?? "--"}
                      /100
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>


          {/* =================================================
              INTERVIEW SETUP
          ================================================= */}

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#17132b] to-[#0b1220] p-7 md:p-8 shadow-xl">

            <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-400/20 flex items-center justify-center text-2xl">
                  🎤
                </div>

                <h2 className="text-2xl font-bold">
                  Start AI Mock Interview
                </h2>

              </div>

              <p className="text-gray-400 mt-3">
                Practice questions based on your resume.
              </p>


              {/* ROLE */}

              <div className="mt-6">

                <label className="font-semibold text-gray-300">
                  Target Role
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  className="w-full mt-2 bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/10 transition"
                >

                  <option className="bg-gray-900">
                    Software Engineer
                  </option>

                  <option className="bg-gray-900">
                    Java Developer
                  </option>

                  <option className="bg-gray-900">
                    Frontend Developer
                  </option>

                  <option className="bg-gray-900">
                    Backend Developer
                  </option>

                  <option className="bg-gray-900">
                    Python Developer
                  </option>

                  <option className="bg-gray-900">
                    Full Stack Developer
                  </option>

                  <option className="bg-gray-900">
                    Data Analyst
                  </option>

                </select>

              </div>


              {/* DIFFICULTY */}

              <div className="mt-5">

                <label className="font-semibold text-gray-300">
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/10 transition"
                >

                  <option className="bg-gray-900">
                    Easy
                  </option>

                  <option className="bg-gray-900">
                    Medium
                  </option>

                  <option className="bg-gray-900">
                    Hard
                  </option>

                </select>

              </div>


              {/* QUESTION COUNT */}

              <div className="mt-5">

                <label className="font-semibold text-gray-300">
                  Number of Questions
                </label>

                <div className="grid grid-cols-3 gap-3 mt-2">

                  {[5, 10, 15].map(
                    (count) => (

                      <button
                        key={count}
                        onClick={() =>
                          setQuestionCount(
                            count
                          )
                        }
                        className={`p-3 rounded-2xl font-bold transition-all duration-300 ${
                          questionCount === count
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20 scale-[1.02]"
                            : "bg-white/[0.05] border border-white/10 hover:bg-white/[0.09]"
                        }`}
                      >
                        {count}
                      </button>

                    )
                  )}

                </div>

              </div>


              {/* START */}

              <button
                onClick={startInterview}
                disabled={
                  !resumeUploaded &&
                  !analysis
                }
                className="w-full mt-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-400 disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed p-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-500/10"
              >
                🚀 Start AI Interview
              </button>

              {!resumeUploaded &&
                !analysis && (
                  <p className="text-gray-500 text-sm mt-3 text-center">
                    Upload your resume before starting the interview.
                  </p>
                )}

            </div>

          </div>

        </div>


        {/* =================================================
            AI RESUME ANALYSIS
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0b1220] p-7 md:p-8 mt-6">

          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="relative">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-2xl">
                🤖
              </div>

              <div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  AI Resume Analysis
                </h2>

                <p className="text-gray-400 mt-1">
                  Detailed analysis generated by InterviewIQ AI.
                </p>

              </div>

            </div>


            {/* LOADING */}

            {analyzing && (

              <div className="mt-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">

                <div className="flex items-center gap-3">

                  <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full" />

                  <p className="text-blue-400">
                    Analyzing your resume...
                  </p>

                </div>

              </div>

            )}


            {/* RESULTS */}

            {!analyzing && analysis && (

              <div className="mt-8">

                {/* SCORES */}

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">

                    <p className="text-gray-400">
                      Resume Score
                    </p>

                    <p className="text-5xl font-extrabold text-emerald-400 mt-3">
                      {getNumber(
                        analysis.resume_score
                      ) ?? "--"}
                      <span className="text-xl text-gray-500">
                        /100
                      </span>
                    </p>

                  </div>


                  <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6">

                    <p className="text-gray-400">
                      ATS Score
                    </p>

                    <p className="text-5xl font-extrabold text-cyan-400 mt-3">
                      {getNumber(
                        analysis.ats_score
                      ) ?? "--"}
                      <span className="text-xl text-gray-500">
                        /100
                      </span>
                    </p>

                  </div>

                </div>


                {/* TEXT ANALYSIS */}

                {analysis.raw && (
                  <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-2xl p-6">

                    <h3 className="text-xl font-bold mb-4">
                      📋 AI Analysis
                    </h3>

                    <pre className="whitespace-pre-wrap text-gray-300 leading-7">
                      {analysis.raw}
                    </pre>

                  </div>
                )}


                {/* STRENGTHS */}

                {strengths.length > 0 && (

                  <div className="mt-7">

                    <h3 className="text-xl font-bold text-emerald-400">
                      💪 Strengths
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 mt-4">

                      {strengths
                        .slice(0, 6)
                        .map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-white/[0.03] border border-emerald-500/10 rounded-xl p-4 text-gray-300"
                            >
                              ✓ {item}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                )}


                {/* WEAKNESSES */}

                {weaknesses.length > 0 && (

                  <div className="mt-7">

                    <h3 className="text-xl font-bold text-red-400">
                      ⚠️ Weaknesses
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 mt-4">

                      {weaknesses
                        .slice(0, 6)
                        .map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-white/[0.03] border border-red-500/10 rounded-xl p-4 text-gray-300"
                            >
                              • {item}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                )}


                {/* MISSING SKILLS */}

                {missingSkills.length > 0 && (

                  <div className="mt-7">

                    <h3 className="text-xl font-bold text-yellow-400">
                      🧠 Missing Skills
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 mt-4">

                      {missingSkills
                        .slice(0, 6)
                        .map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-white/[0.03] border border-yellow-500/10 rounded-xl p-4 text-gray-300"
                            >
                              ❌ {item}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                )}


                {/* IMPROVEMENTS */}

                {improvements.length > 0 && (

                  <div className="mt-7">

                    <h3 className="text-xl font-bold text-blue-400">
                      🚀 Improvements
                    </h3>

                    <div className="grid md:grid-cols-2 gap-3 mt-4">

                      {improvements
                        .slice(0, 6)
                        .map(
                          (item, index) => (

                            <div
                              key={index}
                              className="bg-white/[0.03] border border-blue-500/10 rounded-xl p-4 text-gray-300"
                            >
                              → {item}
                            </div>

                          )
                        )}

                    </div>

                  </div>

                )}


                {/* SUITABLE ROLES */}

                {suitableRoles.length > 0 && (

                  <div className="mt-7">

                    <h3 className="text-xl font-bold text-purple-400">
                      💼 Suitable Roles
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-4">

                      {suitableRoles
                        .slice(0, 10)
                        .map(
                          (roleName, index) => (

                            <span
                              key={index}
                              className="bg-purple-500/10 border border-purple-400/20 px-4 py-2 rounded-full text-purple-300"
                            >
                              {roleName}
                            </span>

                          )
                        )}

                    </div>

                  </div>

                )}

              </div>

            )}


            {/* EMPTY */}

            {!analyzing && !analysis && (

              <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-2xl p-8 text-center">

                <div className="text-5xl mb-4">
                  📄
                </div>

                <p className="text-gray-500">
                  Upload your resume to see your AI analysis.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* =================================================
            COMPANY CODING PRACTICE
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101827] via-[#0c1424] to-[#17102b] p-7 md:p-8 mt-6 shadow-xl">
          <div className="absolute -top-24 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl">
                    💻
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Company Coding Practice
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Prepare with coding problems for top companies.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/company-coding")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-5 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/10"
              >
                View All Problems →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Google", type: "MNC", icon: "🔵", color: "blue" },
                { name: "Amazon", type: "MNC", icon: "🟠", color: "orange" },
                { name: "Microsoft", type: "MNC", icon: "🪟", color: "cyan" },
                { name: "Meta", type: "MNC", icon: "∞", color: "indigo" },
                { name: "Adobe", type: "MNC", icon: "🔴", color: "red" },
                { name: "TCS", type: "Service-Based", icon: "🔷", color: "blue" },
                { name: "Infosys", type: "Service-Based", icon: "🟦", color: "cyan" },
                { name: "Wipro", type: "Service-Based", icon: "🌐", color: "purple" },
                { name: "Accenture", type: "Service-Based", icon: "✦", color: "violet" },
                { name: "Cognizant", type: "Service-Based", icon: "◆", color: "sky" },
              ].map((company) => (
                <button
                  key={company.name}
                  onClick={() =>
                    navigate(
                      `/company-coding?company=${encodeURIComponent(company.name)}`
                    )
                  }
                  className="group/company text-left bg-white/[0.035] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xl">
                      {company.icon}
                    </div>
                    <span className="text-gray-600 group-hover/company:text-gray-400 transition">→</span>
                  </div>
                  <h3 className="font-bold text-lg mt-4 group-hover/company:text-blue-300 transition">
                    {company.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {company.type}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* =================================================
            INTERVIEW HISTORY
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#17132b] to-[#0b1220] p-7 md:p-8 mt-6">

          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                  📊
                </div>

                <h2 className="text-2xl font-bold">
                  Interview History
                </h2>

              </div>

              <p className="text-gray-400 mt-3">
                Review your previous interview performance.
              </p>

              {latestInterviewScore !== null && (
                <p className="text-purple-300 mt-3">
                  Latest score:{" "}
                  <span className="font-bold">
                    {latestInterviewScore}/100
                  </span>
                </p>
              )}

            </div>


            <div className="flex flex-wrap gap-3">

              {hasInterview && (

                <button
                  onClick={() =>
                    navigate("/results")
                  }
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-purple-500/10"
                >
                  📊 View Last Report →
                </button>

              )}

              <button
                onClick={() =>
                  navigate("/history")
                }
                className="bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 px-6 py-3 rounded-xl font-bold transition-all duration-300"
              >
                📚 View All History →
              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="text-center text-gray-600 text-sm mt-8 pb-4">
          © 2026 InterviewIQ • AI Powered Interview Preparation
        </div>

      </div>

    </div>
  );
}

export default Dashboard;