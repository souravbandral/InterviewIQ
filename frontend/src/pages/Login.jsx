import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("http://127.0.0.1:8000/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),

    });

    const data = await response.json();

   console.log(data);

if (data.message === "Login Successful") {

  navigate("/dashboard");

}s

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 p-10 rounded-3xl border border-gray-800">

        <h1 className="text-4xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Login to continue your AI interview journey
        </p>

        {/* Email Input */}
        <div className="mt-8">

          <label className="text-gray-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* Password Input */}
        <div className="mt-6">

          <label className="text-gray-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-lg font-semibold text-white"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;