import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

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
      const savedHistory = JSON.parse(
        localStorage.getItem(getUserKey("interviewHistory")) || "[]"
      );

      setHistory(Array.isArray(savedHistory) ? savedHistory : []);
    } catch (error) {
      console.error("History loading error:", error);
      setHistory([]);
    }
  }, []);

  const clearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all interview history?"
      )
    ) {
      localStorage.removeItem(getUserKey("interviewHistory"));
      setHistory([]);
    }
  };

  const viewReport = (report) => {
    localStorage.setItem(
      getUserKey("finalReport"),
      JSON.stringify(report)
    );
    navigate("/results");
  };

  const startNewInterview = () => {
    localStorage.setItem("interviewInProgress", "true");
    navigate("/interview");
  };

  const getScoreStatus = (score) => {
    if (score >= 80) {
      return {
        text: "Excellent",
        className: "text-green-400 bg-green-500/10 border-green-500/20",
      };
    }

    if (score >= 60) {
      return {
        text: "Good",
        className: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      };
    }

    if (score >= 40) {
      return {
        text: "Needs Improvement",
        className:
          "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      };
    }

    return {
      text: "Needs Practice",
      className: "text-red-400 bg-red-500/10 border-red-500/20",
    };
  };

  return (
    <div className="min-h-screen bg-black text-white px-5 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-400 hover:text-white mb-5 transition"
            >
              ← Back to Dashboard
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                📚
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Interview History
                </h1>

                <p className="text-gray-400 mt-2">
                  Review your previous AI mock interviews
                </p>
              </div>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-red-600/90 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition shadow-lg"
            >
              🗑️ Clear History
            </button>
          )}
        </div>

        {/* SUMMARY */}
        {history.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">
                Total Interviews
              </p>

              <p className="text-4xl font-bold mt-2 text-blue-400">
                {history.length}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">
                Average Score
              </p>

              <p className="text-4xl font-bold mt-2 text-green-400">
                {Math.round(
                  history.reduce(
                    (total, item) =>
                      total +
                      Number(
                        (item.report || item).overall_score || 0
                      ),
                    0
                  ) / history.length
                )}
                /100
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">
                Latest Interview
              </p>

              <p className="text-xl font-bold mt-3 text-purple-400">
                Interview #{history.length}
              </p>
            </div>

          </div>
        )}

        {/* EMPTY STATE */}
        {history.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 md:p-16 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-gray-800 flex items-center justify-center text-5xl mb-6">
              📭
            </div>

            <h2 className="text-3xl font-bold">
              No Interviews Yet
            </h2>

            <p className="text-gray-400 mt-3 max-w-md mx-auto">
              Complete your first AI mock interview and your
              performance report will appear here.
            </p>

            <button
              onClick={startNewInterview}
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition shadow-lg"
            >
              🎤 Start Your First Interview
            </button>

          </div>
        ) : (

          /* HISTORY LIST */
          <div className="space-y-6">

            {history.map((item, index) => {
              const report = item.report || item;

              const score = Number(report.overall_score || 0);

              const status = getScoreStatus(score);

              const date =
                item.date ||
                item.created_at ||
                new Date().toLocaleString();

              const questionCount =
                report.question_analysis?.length || 0;

              return (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-3xl p-6 md:p-8 transition"
                >

                  {/* TOP */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                        🎤
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-2xl font-bold">
                            Interview #{history.length - index}
                          </h2>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.className}`}
                          >
                            {status.text}
                          </span>

                        </div>

                        <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-400">

                          <span>
                            📅 {date}
                          </span>

                          <span>
                            ❓ {questionCount} Questions
                          </span>

                        </div>
                      </div>

                    </div>

                    {/* OVERALL SCORE */}
                    <div className="flex items-center gap-5">

                      <div className="text-right">
                        <p className="text-gray-400 text-sm">
                          Overall Score
                        </p>

                        <p className="text-4xl font-bold text-green-400">
                          {score}
                          <span className="text-lg text-gray-500">
                            /100
                          </span>
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-800 my-7" />

                  {/* CATEGORY SCORES */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="bg-gray-800/70 rounded-2xl p-5">
                      <p className="text-gray-400 text-sm">
                        Technical
                      </p>

                      <p className="text-2xl font-bold text-yellow-400 mt-2">
                        {report.technical_score ?? 0}
                        <span className="text-sm text-gray-500">
                          /10
                        </span>
                      </p>
                    </div>

                    <div className="bg-gray-800/70 rounded-2xl p-5">
                      <p className="text-gray-400 text-sm">
                        Communication
                      </p>

                      <p className="text-2xl font-bold text-blue-400 mt-2">
                        {report.communication_score ?? 0}
                        <span className="text-sm text-gray-500">
                          /10
                        </span>
                      </p>
                    </div>

                    <div className="bg-gray-800/70 rounded-2xl p-5">
                      <p className="text-gray-400 text-sm">
                        Confidence
                      </p>

                      <p className="text-2xl font-bold text-purple-400 mt-2">
                        {report.confidence_score ?? 0}
                        <span className="text-sm text-gray-500">
                          /10
                        </span>
                      </p>
                    </div>

                    <div className="bg-gray-800/70 rounded-2xl p-5">
                      <p className="text-gray-400 text-sm">
                        Problem Solving
                      </p>

                      <p className="text-2xl font-bold text-orange-400 mt-2">
                        {report.problem_solving_score ?? 0}
                        <span className="text-sm text-gray-500">
                          /10
                        </span>
                      </p>
                    </div>

                  </div>

                  {/* VERDICT */}
                  {report.final_verdict && (
                    <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-2xl p-5">

                      <p className="text-sm text-gray-400 mb-2">
                        🧠 AI Verdict
                      </p>

                      <p className="text-gray-200 leading-relaxed">
                        {report.final_verdict}
                      </p>

                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-3 mt-7">

                    <button
                      onClick={() => viewReport(report)}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
                    >
                      📊 View Full Report
                    </button>

                    <button
                      onClick={startNewInterview}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-xl font-semibold transition"
                    >
                      🔄 Practice Again
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <div className="flex flex-wrap gap-4 mt-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-7 py-3 rounded-xl font-semibold transition"
          >
            ← Dashboard
          </button>

          <button
            onClick={startNewInterview}
            className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
          >
            🎤 Start New Interview
          </button>

        </div>

      </div>
    </div>
  );
}

export default History;
