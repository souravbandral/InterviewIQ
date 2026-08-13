import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Interview() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [finishingInterview, setFinishingInterview] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // ==========================================
  // GENERATE QUESTIONS
  // ==========================================

  useEffect(() => {
    generateQuestions();
  }, []);

  // ==========================================
  // SPEECH TRANSCRIPT
  // ==========================================

  useEffect(() => {
    if (listening) {
      setAnswer(transcript);
    }
  }, [transcript, listening]);

  // ==========================================
  // TIMER
  // ==========================================

  useEffect(() => {
    if (questions.length === 0) return;

    if (timeLeft === 0) {
      saveAnswerAndNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, questions]);

  // ==========================================
  // GENERATE QUESTIONS
  // ==========================================

  const generateQuestions = async () => {
    try {
      setLoadingQuestions(true);

      const setup = JSON.parse(
        localStorage.getItem("interviewSetup") || "{}"
      );

      const questionCount = setup.questionCount || 10;
      const role = setup.role || "Software Engineer";
      const difficulty = setup.difficulty || "Medium";

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/generate-questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question_count: questionCount,
            role: role,
            difficulty: difficulty,
          }),
        }
      );

      const data = await response.json();

      console.log("QUESTION RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Question generation failed"
        );
      }

      let questionArray = [];

      if (Array.isArray(data.questions)) {
        questionArray = data.questions;
      } else if (typeof data.questions === "string") {
        questionArray = data.questions
          .split("\n")
          .map((q) => q.trim())
          .filter((q) => q !== "");
      }

      questionArray = questionArray
        .map((q) =>
          q.replace(/^(\d+[\.\)]|\-\s*)/, "").trim()
        )
        .filter((q) => q.length > 0);

      if (questionArray.length === 0) {
        throw new Error("No questions received.");
      }

      setQuestions(questionArray);
      setCurrentQuestionIndex(0);
      setTimeLeft(60);
    } catch (error) {
      console.error("QUESTION ERROR:", error);
      alert("Unable to generate questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  // ==========================================
  // SAVE CURRENT ANSWER
  // ==========================================

  const saveCurrentAnswer = () => {
    return {
      question: questions[currentQuestionIndex],
      answer: answer.trim() || "No answer provided.",
    };
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

  const saveAnswerAndNext = () => {
  const currentAnswer = {
    question: questions[currentQuestionIndex],
    answer: answer.trim(),
  };

  console.log("SAVING ANSWER:", currentAnswer);

  if (!currentAnswer.answer) {
    alert("Please answer the question before continuing.");
    return;
  }

  const updatedInterviewData = [
    ...interviewData,
    currentAnswer,
  ];

  setInterviewData(updatedInterviewData);

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);

    setAnswer("");
    resetTranscript();
    setTimeLeft(60);
  } else {
    finishInterview(updatedInterviewData);
  }
};

  // ==========================================
  // FINISH INTERVIEW
  // ==========================================

  const finishInterview = async (finalInterviewData) => {
    try {
      setFinishingInterview(true);

      const setup = JSON.parse(
        localStorage.getItem("interviewSetup") || "{}"
      );

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/final-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interview: finalInterviewData,
            role:
              setup.role || "Software Engineer",
            difficulty:
              setup.difficulty || "Medium",
          }),
        }
      );

      const data = await response.json();

      console.log("FINAL REPORT:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Final report failed"
        );
      }

      localStorage.setItem(
        "finalReport",
        JSON.stringify(data.report)
      );

      localStorage.setItem(
        "lastInterview",
        JSON.stringify(finalInterviewData)
      );

      navigate("/results");
    } catch (error) {
      console.error("FINAL REPORT ERROR:", error);
      alert(
        "Unable to generate final interview report."
      );
    } finally {
      setFinishingInterview(false);
    }
  };

  // ==========================================
  // SPEECH
  // ==========================================

  const startListening = () => {
    resetTranscript();
    setAnswer("");

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loadingQuestions) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Generating AI Questions...
        </h1>
      </div>
    );
  }

  // ==========================================
  // SPEECH SUPPORT
  // ==========================================

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">
          Speech Recognition is not supported
          in this browser.
        </h1>
      </div>
    );
  }

  // ==========================================
  // FINISHING
  // ==========================================

  if (finishingInterview) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-5xl mb-6">
          🤖
        </div>

        <h1 className="text-4xl font-bold">
          Analyzing Your Interview...
        </h1>

        <p className="text-gray-400 mt-4">
          AI is reviewing all your answers.
        </p>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        AI Mock Interview
      </h1>

      <div className="mt-8 bg-gray-900 p-8 rounded-2xl">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Question {currentQuestionIndex + 1} /{" "}
            {questions.length}
          </h2>

          <div
            className={`px-5 py-3 rounded-xl text-xl font-bold ${
              timeLeft <= 10
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            ⏰ {timeLeft}s
          </div>

        </div>

        {/* QUESTION */}

        <div className="mt-8">

          <p className="text-xl leading-9">
            {questions[currentQuestionIndex]}
          </p>

        </div>

        {/* ANSWER */}

        <textarea
          rows="8"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder="Write your answer..."
          className="w-full mt-8 bg-gray-800 rounded-xl p-5 text-white outline-none border border-gray-700 focus:border-blue-500 resize-none"
        />

        {/* SPEECH BUTTONS */}

        <div className="flex flex-wrap gap-4 mt-6">

          <button
            onClick={startListening}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white font-semibold"
          >
            🎤 Start Recording
          </button>

          <button
            onClick={stopListening}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold"
          >
            ⏹ Stop Recording
          </button>

          {listening && (
            <div className="flex items-center text-green-400 font-semibold">
              🎙 Listening...
            </div>
          )}

        </div>

        {/* SUBMIT / NEXT */}

        <button
          onClick={saveAnswerAndNext}
          className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
        >
          {currentQuestionIndex <
          questions.length - 1
            ? "Next Question"
            : "Finish Interview"}
        </button>

      </div>

    </div>
  );
}

export default Interview;