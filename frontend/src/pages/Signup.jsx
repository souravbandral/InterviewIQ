import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const normalizedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: normalizedName,
            email: normalizedEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        /*
          Save the name entered during signup.
          Login.jsx will use this to show the real name
          instead of the email username.
        */

        localStorage.setItem(
          "signupName",
          normalizedName
        );

        localStorage.setItem(
          "signupEmail",
          normalizedEmail
        );

        navigate("/login");
      }
    } catch (error) {
      console.log("SIGNUP ERROR:", error);

      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
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

        {/* NAME */}

        <div className="mt-8">

          <label className="text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* EMAIL */}

        <div className="mt-5">

          <label className="text-gray-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* PASSWORD */}

        <div className="mt-5">

          <label className="text-gray-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* SIGNUP BUTTON */}

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full mt-8 transition p-4 rounded-xl text-lg font-semibold text-white ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </div>

    </div>
  );
}

export default Signup;