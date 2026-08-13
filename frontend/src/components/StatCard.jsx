function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
        bg-gray-900
        rounded-2xl
        p-6
        border
        border-gray-800
        hover:border-blue-500
        transition-all
        duration-300
        hover:scale-105
        shadow-lg
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;