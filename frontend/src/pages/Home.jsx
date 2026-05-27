import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {

  useEffect(() => {

    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });

  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-16 py-6 border-b border-gray-800">
        
        <h1 className="text-3xl font-bold text-blue-500">
          InterviewIQ
        </h1>

        <div className="flex items-center gap-8 text-lg">

  <Link to="/" className="hover:text-blue-400">
    Home
  </Link>

  <button className="hover:text-blue-400">
    Features
  </button>

  <Link to="/login" className="hover:text-blue-400">
    Login
  </Link>

  <Link to="/signup" className="hover:text-blue-400">
    Signup
  </Link>

</div>
      </nav>


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-6xl font-extrabold leading-tight">
          AI Powered <span className="text-blue-500">Interview</span>
          <br />
          Intelligence Platform
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Practice resume-based AI interviews, improve communication,
          analyze your resume, and prepare for real recruiter interactions.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="px-8 py-4 bg-blue-600 rounded-2xl text-lg hover:bg-blue-700 transition">
            Start Interview
          </button>

          <button className="px-8 py-4 border border-gray-600 rounded-2xl text-lg hover:border-blue-500 transition">
            Learn More
          </button>

        </div>
      </div>

    {/* Features Section */}

<div className="px-10 py-24 bg-gray-950">

  <h2 className="text-4xl font-bold text-center mb-16">
    Platform Features
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold text-blue-400">
        AI Resume Analysis
      </h3>

      <p className="mt-4 text-gray-400">
        Analyze ATS score, technical skills, project quality,
        and get personalized improvement suggestions.
      </p>
    </div>


    <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold text-blue-400">
        AI Mock Interviews
      </h3>

      <p className="mt-4 text-gray-400">
        Experience realistic resume-based interviews with
        intelligent AI follow-up questioning.
      </p>
    </div>


    <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500 hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold text-blue-400">
        Performance Reports
      </h3>

      <p className="mt-4 text-gray-400">
        Get detailed analytics on communication,
        technical skills, confidence, and improvements.
      </p>
    </div>

  </div>
</div>
</div>
  );
}

export default App;