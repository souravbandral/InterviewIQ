function ActionCard({
  title,
  description,
  buttonText,
  buttonColor,
  onClick,
  disabled = false,
  children,
}) {
  return (
    <div
      className="
        bg-gray-900
        rounded-2xl
        p-6
        border
        border-gray-800
        shadow-lg
        hover:border-blue-500
        transition-all
        duration-300
      "
    >
      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="text-gray-400 mt-3">
        {description}
      </p>

      {/* Extra Content */}
      {children && (
        <div className="mt-5">
          {children}
        </div>
      )}

      <button
        onClick={onClick}
        disabled={disabled}
        className={`mt-6 w-full py-3 rounded-xl font-semibold transition duration-300 ${
          disabled
            ? "bg-gray-700 cursor-not-allowed text-gray-400"
            : `${buttonColor} hover:scale-105`
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ActionCard;