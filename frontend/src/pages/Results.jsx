import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();

  const [report, setReport] = useState(null);

  const startNewInterview = () => {
    localStorage.setItem("interviewInProgress", "true");
    navigate("/interview");
  };

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

  useEffect(() => {
  try {
    let savedReport = localStorage.getItem(
      getUserKey("finalReport")
    );

    // Interview.jsx currently saves the newly generated report
    // to the temporary global key. Only read that key when a
    // fresh interview was explicitly started by this account.
    if (
      !savedReport &&
      localStorage.getItem("interviewInProgress") === "true"
    ) {
      savedReport = localStorage.getItem("finalReport");

      if (savedReport) {
        localStorage.setItem(
          getUserKey("finalReport"),
          savedReport
        );
      }
    }

    if (!savedReport) {
      return;
    }

    const parsedReport = JSON.parse(savedReport);

    setReport(parsedReport);

    localStorage.removeItem("interviewInProgress");

    const existingHistory = JSON.parse(
      localStorage.getItem(getUserKey("interviewHistory")) || "[]"
    );

    const interviewRecord = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      report: parsedReport,
    };

    const alreadySaved = existingHistory.some(
      (item) =>
        item.report?.overall_score ===
          parsedReport.overall_score &&
        JSON.stringify(item.report?.question_analysis) ===
          JSON.stringify(parsedReport.question_analysis)
    );

    if (!alreadySaved) {
      localStorage.setItem(
        getUserKey("interviewHistory"),
        JSON.stringify([
          interviewRecord,
          ...existingHistory,
        ])
      );
    }

  } catch (error) {
    console.error("Error loading/saving report:", error);
  }
}, []);

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          No Report Available
        </h1>

        <p className="text-gray-400 mb-8">
          Complete an interview first to generate your report.
        </p>

        <button
          onClick={startNewInterview}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
        >
          Start Interview
        </button>
      </div>
    );
  }

  const score = (value) => {
    if (value === undefined || value === null) {
      return 0;
    }

    return value;
  };

  const renderList = (items, emptyText) => {
    if (!items || items.length === 0) {
      return (
        <div className="bg-gray-800 p-5 rounded-xl text-gray-400">
          {emptyText}
        </div>
      );
    }

    return items.map((item, index) => (
      <div
        key={index}
        className="bg-gray-800 p-5 rounded-xl mb-4"
      >
        • {item}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto text-center">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-5xl font-bold">
          Interview Report
        </h1>

        <p className="text-gray-400 text-xl mt-4">
          Complete AI analysis of your mock interview
        </p>

      </div>


      {/* SCORE CARDS */}

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* OVERALL */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center md:col-span-2 lg:col-span-3">

          <h2 className="text-2xl font-bold">
            Overall Score
          </h2>

          <p className="text-7xl font-bold text-green-400 mt-6">
            {score(report.overall_score)}
            <span className="text-3xl text-gray-400">
              /100
            </span>
          </p>

        </div>


        {/* TECHNICAL */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center">

          <h2 className="text-2xl font-bold">
            Technical
          </h2>

          <p className="text-5xl font-bold text-yellow-400 mt-6">
            {score(report.technical_score)}
            <span className="text-2xl text-gray-400">
              /10
            </span>
          </p>

        </div>


        {/* COMMUNICATION */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center">

          <h2 className="text-2xl font-bold">
            Communication
          </h2>

          <p className="text-5xl font-bold text-blue-400 mt-6">
            {score(report.communication_score)}
            <span className="text-2xl text-gray-400">
              /10
            </span>
          </p>

        </div>


        {/* CONFIDENCE */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center">

          <h2 className="text-2xl font-bold">
            Confidence
          </h2>

          <p className="text-5xl font-bold text-purple-400 mt-6">
            {score(report.confidence_score)}
            <span className="text-2xl text-gray-400">
              /10
            </span>
          </p>

        </div>


        {/* GRAMMAR */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center">

          <h2 className="text-2xl font-bold">
            Grammar
          </h2>

          <p className="text-5xl font-bold text-pink-400 mt-6">
            {score(report.grammar_score)}
            <span className="text-2xl text-gray-400">
              /10
            </span>
          </p>

        </div>


        {/* PROBLEM SOLVING */}

        <div className="bg-gray-900 p-8 rounded-2xl text-center">

          <h2 className="text-2xl font-bold">
            Problem Solving
          </h2>

          <p className="text-5xl font-bold text-orange-400 mt-6">
            {score(report.problem_solving_score)}
            <span className="text-2xl text-gray-400">
              /10
            </span>
          </p>

        </div>

      </div>


      {/* FINAL VERDICT */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold mb-6">
            🧠 Overall Interview Analysis
          </h2>

          <div className="bg-gray-800 p-6 rounded-xl text-gray-200 leading-8">
            {report.final_verdict ||
              "No final verdict was generated."}
          </div>

        </div>

      </div>


      {/* STRENGTHS */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold text-green-400 mb-6">
            💪 Strengths
          </h2>

          {renderList(
            report.strengths,
            "No notable strengths were identified."
          )}

        </div>

      </div>


      {/* WEAKNESSES */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold text-red-400 mb-6">
            ⚠️ Weaknesses
          </h2>

          {renderList(
            report.weaknesses,
            "No major weaknesses were identified."
          )}

        </div>

      </div>


      {/* IMPROVEMENT PLAN */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold text-blue-400 mb-6">
            🚀 What You Should Improve
          </h2>

          {renderList(
            report.improvement_plan,
            "No improvement plan was generated."
          )}

        </div>

      </div>


      {/* RECOMMENDED TOPICS */}

      <div className="max-w-6xl mx-auto mt-10">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            📚 Recommended Topics
          </h2>

          {renderList(
            report.recommended_topics,
            "No recommended topics were generated."
          )}

        </div>

      </div>


      {/* QUESTION ANALYSIS */}

      <div className="max-w-6xl mx-auto mt-10">

        <h2 className="text-4xl font-bold mb-3">
          📋 Question-by-Question Analysis
        </h2>

        <p className="text-gray-400 mb-8">
          Detailed feedback for every answer you gave.
        </p>


        {report.question_analysis &&
        report.question_analysis.length > 0 ? (

          report.question_analysis.map(
            (item, index) => (

              <div
                key={index}
                className="bg-gray-900 p-8 rounded-2xl mb-8"
              >

                {/* QUESTION HEADER */}

                <div className="flex justify-between items-center mb-8">

                  <h3 className="text-3xl font-bold">
                    Question{" "}
                    {item.question_number || index + 1}
                  </h3>

                  <div className="bg-blue-600 px-6 py-3 rounded-xl text-xl font-bold">
                    {score(item.score)}/10
                  </div>

                </div>


                {/* QUESTION */}

                <div className="mb-8">

                  <h4 className="text-xl font-bold text-blue-400 mb-3">
                    Question
                  </h4>

                  <p className="text-lg leading-8 text-gray-200">
                    {item.question ||
                      "Question not available."}
                  </p>

                </div>


                {/* ANSWER */}

                <div className="mb-8">

                  <h4 className="text-xl font-bold text-purple-400 mb-3">
                    Your Answer
                  </h4>

                  <div className="bg-gray-800 p-6 rounded-xl text-gray-200 whitespace-pre-wrap">
                    {item.answer ||
                      "No answer was provided."}
                  </div>

                </div>


                {/* WHAT WENT WELL */}

                <div className="mb-8">

                  <h4 className="text-xl font-bold text-green-400 mb-3">
                    ✅ What You Did Well
                  </h4>

                  <p className="text-gray-200 leading-8">
                    {item.what_was_good ||
                      "No specific strengths identified."}
                  </p>

                </div>


                {/* IMPROVEMENT */}

                <div className="mb-8">

                  <h4 className="text-xl font-bold text-red-400 mb-3">
                    🔧 What You Should Improve
                  </h4>

                  <p className="text-gray-200 leading-8">
                    {item.what_to_improve ||
                      "No specific improvement identified."}
                  </p>

                </div>


                {/* MODEL ANSWER */}

                <div>

                  <h4 className="text-xl font-bold text-yellow-400 mb-3">
                    💡 Better / Model Answer
                  </h4>

                  <div className="bg-gray-800 p-6 rounded-xl text-gray-200 leading-8 whitespace-pre-wrap">
                    {item.model_answer ||
                      "No model answer available."}
                  </div>

                </div>

              </div>

            )
          )

        ) : (

          <div className="bg-gray-900 p-8 rounded-2xl text-gray-400">
            No question analysis available.
          </div>

        )}

      </div>


      {/* BUTTONS */}

      <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row gap-5 pb-16">

        <button
          onClick={startNewInterview}
          className="flex-1 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-xl font-semibold"
        >
          🎤 New Interview
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl font-semibold"
        >
          🏠 Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Results;