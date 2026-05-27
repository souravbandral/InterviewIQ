import { useState } from "react";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {

    const response = await fetch("http://127.0.0.1:8000/signup", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),

    });

    const data = await response.json();

    console.log(data);

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-gray-900 p-10 rounded-3xl border border-gray-800">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Start your AI interview preparation journey
        </p>

        {/* Name */}
        <div className="mt-8">

          <label className="text-gray-300">
            Full Name
          </label>

          <input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
/>

        </div>

        {/* Email */}
        <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
/>

        {/* Password */}
        <input
  type="password"
  placeholder="Create password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
/>

        {/* Signup Button */}
        
        <button
  onClick={handleSignup}
  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-lg font-semibold text-white"
>
  Create Account
</button>

      </div>

    </div>
  );
}

export default Signup;