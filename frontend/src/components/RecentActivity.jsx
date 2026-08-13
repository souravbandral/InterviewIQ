import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaChartLine,
  FaFileAlt,
  FaRobot,
  FaTrophy,
  FaCheckCircle,
  FaClock,
  FaArrowUp,
  FaPlayCircle,
  FaBook,
  FaBullseye,
  FaFire,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Sourav",
    role: "Software Engineer Aspirant",
    streak: 18,
    interviews: 24,
    resumeScore: 89,
    overallScore: 91,
  });

  const [stats] = useState([
    {
      title: "Mock Interviews",
      value: 24,
      icon: <FaRobot />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Resume Score",
      value: "89%",
      icon: <FaFileAlt />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Overall Rating",
      value: "91%",
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Achievements",
      value: 12,
      icon: <FaTrophy />,
      color: "from-yellow-500 to-orange-500",
    },
  ]);

  const recentActivities = [
    {
      title: "Completed Java DSA Interview",
      time: "2 Hours Ago",
      status: "Excellent",
    },
    {
      title: "Resume Analysis Completed",
      time: "Yesterday",
      status: "89% Score",
    },
    {
      title: "React Mock Interview",
      time: "2 Days Ago",
      status: "Good",
    },
    {
      title: "Behavioral Assessment",
      time: "3 Days Ago",
      status: "Completed",
    },
  ];

  const upcomingTasks = [
    "Complete System Design Mock",
    "Improve Resume Projects",
    "Practice HR Questions",
    "Solve 10 DSA Problems",
  ];

  useEffect(() => {
    document.title = "InterviewIQ Dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-b-3xl p-8 shadow-xl">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back, {user.name} 👋
            </h1>

            <p className="text-gray-200 mt-2">
              {user.role}
            </p>

            <div className="flex gap-6 mt-6 flex-wrap">

              <div className="bg-white/10 px-5 py-3 rounded-xl">
                <p className="text-sm text-gray-300">
                  Overall Score
                </p>

                <h2 className="text-2xl font-bold">
                  {user.overallScore}%
                </h2>
              </div>

              <div className="bg-white/10 px-5 py-3 rounded-xl">
                <p className="text-sm text-gray-300">
                  Interview Streak
                </p>

                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaFire className="text-orange-400" />
                  {user.streak} Days
                </h2>
              </div>

            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-8 md:mt-0"
          >
            <FaUserCircle className="text-[140px] text-white opacity-80" />
          </motion.div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className={`rounded-2xl p-6 bg-gradient-to-r ${item.color} shadow-lg`}
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm opacity-90">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="text-4xl opacity-90">
                  {item.icon}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* Performance + Quick Actions */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-slate-900 rounded-2xl p-6 shadow-lg lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Performance Summary
            </h2>

            <div className="space-y-6">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Technical Skills</span>
                  <span>92%</span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded-full">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Communication</span>
                  <span>85%</span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded-full">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Confidence</span>
                  <span>90%</span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded-full">
                  <div
                    className="bg-purple-500 h-3 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>

            </div>
          </motion.div>

          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <button className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl">
                <FaPlayCircle />
                Start Mock Interview
              </button>

              <button className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 transition p-4 rounded-xl">
                <FaFileAlt />
                Analyze Resume
              </button>

              <button className="w-full flex items-center gap-3 bg-purple-600 hover:bg-purple-700 transition p-4 rounded-xl">
                <FaBook />
                Practice Questions
              </button>

              <button className="w-full flex items-center gap-3 bg-orange-500 hover:bg-orange-600 transition p-4 rounded-xl">
                <FaBullseye />
                View Roadmap
              </button>

            </div>
          </div>
                  </div>

        {/* Recent Activity + Upcoming Tasks */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Recent Activity */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-slate-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-slate-700 pb-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 p-3 rounded-full">
                      <FaCheckCircle className="text-green-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {activity.title}
                      </h3>

                      <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                        <FaClock />
                        {activity.time}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm bg-slate-800 px-3 py-1 rounded-full">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-slate-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Upcoming Tasks
            </h2>

            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <FaArrowUp className="text-cyan-400" />
                    <span>{task}</span>
                  </div>

                  <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm transition">
                    Start
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Achievements */}

        <div className="mt-10 bg-slate-900 rounded-2xl p-6 shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">
            Achievements
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                title: "Java Master",
                icon: "☕",
                desc: "Completed 50 Java Questions",
              },
              {
                title: "Resume Pro",
                icon: "📄",
                desc: "Resume Score Above 85%",
              },
              {
                title: "Interview Hero",
                icon: "🎤",
                desc: "20 Mock Interviews",
              },
              {
                title: "Consistency",
                icon: "🔥",
                desc: "18 Day Streak",
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="bg-slate-800 rounded-xl p-5 text-center"
              >
                <div className="text-5xl mb-3">
                  {badge.icon}
                </div>

                <h3 className="font-bold text-lg">
                  {badge.title}
                </h3>

                <p className="text-gray-400 mt-2 text-sm">
                  {badge.desc}
                </p>
              </motion.div>
            ))}

          </div>

        </div>

        {/* Footer */}

        <div className="mt-12 text-center text-gray-400 border-t border-slate-800 pt-6">

          <p>
            © 2026 InterviewIQ • AI Powered Career Intelligence Platform
          </p>

          <p className="mt-2 text-sm">
            Practice • Improve • Get Hired 🚀
          </p>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;