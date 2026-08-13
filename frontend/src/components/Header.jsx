function Header() {
  return (
    <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Ready to crack your next interview?
          </p>

        </div>

        <div className="text-right">

          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-3xl">
            👤
          </div>

          <p className="mt-3 text-gray-300">
            Sourav
          </p>

        </div>

      </div>

    </div>
  );
}

export default Header;