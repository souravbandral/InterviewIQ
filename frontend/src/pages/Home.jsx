import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
          >
            <span className="text-white">Interview</span>
            <span className="text-blue-500">IQ</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-white transition">
              Home
            </a>

            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>

            <a href="#why-interviewiq" className="hover:text-white transition">
              Why InterviewIQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:block px-5 py-2.5 text-sm font-semibold text-gray-200 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-sm font-bold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative min-h-screen pt-28 flex items-center"
      >
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute top-40 right-0 w-[350px] h-[350px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-300 text-sm font-medium mb-7">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                AI-Powered Interview Preparation
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                Practice.
                <br />

                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Improve.
                </span>

                <br />

                Get Hired.
              </h1>

              <p className="mt-7 max-w-xl text-lg md:text-xl leading-8 text-gray-400">
                Turn your resume into realistic AI mock interviews,
                receive instant feedback, and prepare smarter for your
                next technical interview.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">

                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-lg shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1"
                >
                  Start Free Interview
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] font-semibold text-lg transition-all duration-300"
                >
                  Explore Features
                </a>

              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  ✓ Resume Analysis
                </span>

                <span className="flex items-center gap-2">
                  ✓ AI Mock Interviews
                </span>

                <span className="flex items-center gap-2">
                  ✓ Instant Feedback
                </span>
              </div>
            </div>

            {/* RIGHT - PRODUCT PREVIEW */}
            <div className="relative">

              <div className="absolute -inset-5 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 blur-3xl rounded-full" />

              <div className="relative rounded-3xl border border-white/10 bg-[#0d1426]/90 backdrop-blur-xl p-5 shadow-2xl">

                {/* Fake browser bar */}
                <div className="flex items-center gap-2 mb-5 px-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" />

                  <div className="ml-4 flex-1 h-7 rounded-lg bg-white/5 border border-white/5" />
                </div>

                {/* Interview header */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-600/15 to-purple-600/10 border border-white/10 p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">
                        AI Mock Interview
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        Software Engineer
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-2xl">
                      🎤
                    </div>

                  </div>

                  {/* Question */}
                  <div className="mt-7 rounded-2xl bg-[#080d1c] border border-white/10 p-5">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-blue-400">Question 03</span>
                      <span>•</span>
                      <span>Technical</span>
                    </div>

                    <p className="mt-4 text-lg font-semibold leading-7">
                      Explain the difference between an array and an ArrayList
                      in Java.
                    </p>

                    <div className="mt-5 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                    </div>

                  </div>

                  {/* AI feedback */}
                  <div className="mt-4 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                      <p className="text-xs text-gray-500">
                        Communication
                      </p>

                      <div className="mt-2 flex items-end gap-1">
                        <span className="text-2xl font-bold text-blue-400">
                          8.5
                        </span>
                        <span className="text-gray-500 text-sm mb-1">
                          /10
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                      <p className="text-xs text-gray-500">
                        Technical
                      </p>

                      <div className="mt-2 flex items-end gap-1">
                        <span className="text-2xl font-bold text-purple-400">
                          9.0
                        </span>
                        <span className="text-gray-500 text-sm mb-1">
                          /10
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Floating score */}
              <div className="absolute -left-8 bottom-12 hidden sm:block rounded-2xl border border-green-400/20 bg-[#0d1720]/95 backdrop-blur-xl p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">
                    📈
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Interview Score
                    </p>

                    <p className="text-xl font-bold text-green-400">
                      85/100
                    </p>
                  </div>

                </div>

              </div>

              {/* Floating AI */}
              <div className="absolute -right-6 top-16 hidden sm:block rounded-2xl border border-purple-400/20 bg-[#131022]/95 backdrop-blur-xl p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl">
                    🤖
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      AI Feedback
                    </p>

                    <p className="text-sm font-semibold text-purple-300">
                      Analysis Ready
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <p className="text-3xl font-black text-white">AI</p>
              <p className="mt-1 text-sm text-gray-500">
                Powered Interviews
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-blue-400">24/7</p>
              <p className="mt-1 text-sm text-gray-500">
                Practice Anytime
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-purple-400">10+</p>
              <p className="mt-1 text-sm text-gray-500">
                Top Companies
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-green-400">Instant</p>
              <p className="mt-1 text-sm text-gray-500">
                AI Feedback
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="relative py-28"
      >

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

          <div className="max-w-2xl mb-16">

            <p className="text-sm uppercase tracking-[0.25em] text-blue-400 font-bold">
              Everything you need
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black">
              Your personal
              <span className="text-blue-400"> AI interview coach.</span>
            </h2>

            <p className="mt-5 text-lg text-gray-400 leading-8">
              InterviewIQ combines resume analysis, AI interviews,
              performance evaluation and company preparation in one place.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Feature 1 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-blue-500/[0.06] hover:border-blue-400/30 p-7 transition-all duration-300 hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-2xl">
                📄
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Resume Analysis
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                Upload your resume and get AI-powered insights,
                ATS scoring and improvement suggestions.
              </p>

            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-purple-500/[0.06] hover:border-purple-400/30 p-7 transition-all duration-300 hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                🎤
              </div>

              <h3 className="mt-6 text-xl font-bold">
                AI Mock Interviews
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                Practice realistic interview questions generated
                according to your resume and target role.
              </p>

            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-green-500/[0.06] hover:border-green-400/30 p-7 transition-all duration-300 hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-2xl">
                📊
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Smart Feedback
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                Understand your technical skills, communication,
                confidence and problem-solving performance.
              </p>

            </div>

            {/* Feature 4 */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-orange-500/[0.06] hover:border-orange-400/30 p-7 transition-all duration-300 hover:-translate-y-2">

              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-2xl">
                💻
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Company Practice
              </h3>

              <p className="mt-3 text-gray-400 leading-7">
                Prepare with coding problems from companies
                such as Google, Amazon, Microsoft and Meta.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="py-28 bg-white/[0.02] border-y border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm uppercase tracking-[0.25em] text-purple-400 font-bold">
              Simple process
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black">
              From resume to interview-ready.
            </h2>

            <p className="mt-5 text-lg text-gray-400">
              Four simple steps to prepare smarter for your next interview.
            </p>

          </div>

          <div className="mt-16 grid md:grid-cols-4 gap-6">

            {[
              {
                number: "01",
                icon: "📄",
                title: "Upload Resume",
                text: "Upload your PDF resume to get started.",
              },
              {
                number: "02",
                icon: "🤖",
                title: "AI Analysis",
                text: "AI understands your skills and experience.",
              },
              {
                number: "03",
                icon: "🎤",
                title: "Take Interview",
                text: "Answer realistic questions based on your profile.",
              },
              {
                number: "04",
                icon: "📊",
                title: "Get Feedback",
                text: "Review your score and improve your weak areas.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-white/10 bg-[#0b1120] p-7"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-xl">
                    {step.icon}
                  </div>

                  <span className="text-sm font-black text-gray-600">
                    {step.number}
                  </span>

                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-400 leading-7">
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= WHY INTERVIEWIQ ================= */}
      <section
        id="why-interviewiq"
        className="py-28"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <p className="text-sm uppercase tracking-[0.25em] text-blue-400 font-bold">
                Why InterviewIQ?
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
                Prepare for the interview,
                <span className="text-blue-400">
                  {" "}not just the questions.
                </span>
              </h2>

              <p className="mt-6 text-lg text-gray-400 leading-8">
                InterviewIQ helps you understand how you actually perform
                during an interview — from technical knowledge to
                communication and confidence.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Resume-based interview questions",
                  "AI-powered answer evaluation",
                  "Detailed performance reports",
                  "Interview history and progress tracking",
                  "Company-specific coding preparation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <span className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-sm">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}

              </div>

            </div>

            {/* Score card */}
            <div className="relative">

              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />

              <div className="relative rounded-3xl border border-white/10 bg-[#0c1324] p-8">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Your Interview Performance
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      Latest Report
                    </h3>
                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-xs font-bold">
                    Completed
                  </span>

                </div>

                <div className="mt-8 flex items-center justify-center">

                  <div className="w-48 h-48 rounded-full border-[14px] border-blue-500/20 flex items-center justify-center relative">

                    <div className="absolute inset-0 rounded-full border-[14px] border-transparent border-t-blue-500 border-r-purple-500 rotate-45" />

                    <div className="text-center">
                      <p className="text-5xl font-black">
                        85
                      </p>

                      <p className="text-gray-500">
                        /100
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-sm text-gray-500">
                      Technical
                    </p>
                    <p className="mt-1 text-2xl font-bold text-blue-400">
                      9/10
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-sm text-gray-500">
                      Communication
                    </p>
                    <p className="mt-1 text-2xl font-bold text-purple-400">
                      8/10
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-sm text-gray-500">
                      Confidence
                    </p>
                    <p className="mt-1 text-2xl font-bold text-green-400">
                      8/10
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                    <p className="text-sm text-gray-500">
                      Problem Solving
                    </p>
                    <p className="mt-1 text-2xl font-bold text-orange-400">
                      9/10
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-purple-600/20 p-10 md:p-16 text-center">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-500/20 blur-[100px]" />

            <div className="relative">

              <div className="text-4xl mb-5">
                🚀
              </div>

              <h2 className="text-4xl md:text-5xl font-black">
                Ready to crack your next interview?
              </h2>

              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400 leading-8">
                Start practicing with InterviewIQ and turn your
                interview preparation into measurable progress.
              </p>

              <Link
                to="/signup"
                className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                Start Practicing
                <span>→</span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#030611]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <Link
                to="/"
                className="text-2xl font-extrabold"
              >
                <span>Interview</span>
                <span className="text-blue-500">IQ</span>
              </Link>

              <p className="mt-2 text-sm text-gray-500">
                AI-powered interview preparation platform.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">

              <a
                href="#home"
                className="hover:text-white transition"
              >
                Home
              </a>

              <a
                href="#features"
                className="hover:text-white transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="hover:text-white transition"
              >
                How It Works
              </a>

              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} InterviewIQ. Built for smarter interview preparation.
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;