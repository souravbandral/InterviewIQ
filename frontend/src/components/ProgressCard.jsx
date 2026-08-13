import { motion } from "framer-motion";

function ProgressCard({ progress = 65 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          Today's Progress
        </h2>

        <span className="text-blue-400 font-semibold text-lg">
          {progress}%
        </span>
      </div>

      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400"
        />
      </div>

      <p className="text-gray-400 mt-4">
        Keep practicing every day to improve your interview performance.
      </p>
    </motion.div>
  );
}

export default ProgressCard;