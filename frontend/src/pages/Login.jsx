import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail =
        email.trim().toLowerCase();

      const response = await fetch(
        "https://interviewiq-backend.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.message === "Login Successful"
      ) {

        /*
          Get the real name entered during signup.
        */

        const savedSignupName =
          localStorage.getItem("signupName");

        const savedSignupEmail =
          localStorage.getItem("signupEmail");

        let userName = "";

        /*
          Only use the saved name if it belongs
          to the account currently logging in.
        */

        if (
          savedSignupName &&
          savedSignupEmail &&
          savedSignupEmail.trim().toLowerCase() ===
            normalizedEmail
        ) {
          userName = savedSignupName.trim();
        }

        /*
          Fallback for older accounts where the
          signup name was not saved yet.
        */

        if (!userName) {
          userName =
            data?.name ||
            data?.username ||
            data?.user?.name ||
            normalizedEmail.split("@")[0] ||
            "User";
        }

        /*
          Store current logged-in account.
        */

        localStorage.setItem(
          "currentUserEmail",
          normalizedEmail
        );

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: normalizedEmail,
            name: userName,
          })
        );

        /*
          Preserve existing account-specific
          data migration.
        */

        if (
          !localStorage.getItem(
            "interviewIQ_user_data_migrated_v1"
          )
        ) {
          const userPrefix =
            encodeURIComponent(normalizedEmail);

          const oldHistory =
            localStorage.getItem(
              "interviewHistory"
            );

          const oldAnalysis =
            localStorage.getItem(
              "resumeAnalysis"
            );

          const oldReport =
            localStorage.getItem(
              "finalReport"
            );

          const oldLastInterview =
            localStorage.getItem(
              "lastInterview"
            );

          if (
            oldHistory &&
            !localStorage.getItem(
              `interviewHistory_${userPrefix}`
            )
          ) {
            localStorage.setItem(
              `interviewHistory_${userPrefix}`,
              oldHistory
            );
          }

          if (
            oldAnalysis &&
            !localStorage.getItem(
              `resumeAnalysis_${userPrefix}`
            )
          ) {
            localStorage.setItem(
              `resumeAnalysis_${userPrefix}`,
              oldAnalysis
            );
          }

          if (
            oldReport &&
            !localStorage.getItem(
              `finalReport_${userPrefix}`
            )
          ) {
            localStorage.setItem(
              `finalReport_${userPrefix}`,
              oldReport
            );
          }

          if (
            oldLastInterview &&
            !localStorage.getItem(
              `lastInterview_${userPrefix}`
            )
          ) {
            localStorage.setItem(
              `lastInterview_${userPrefix}`,
              oldLastInterview
            );
          }

          localStorage.setItem(
            "interviewIQ_user_data_migrated_v1",
            "true"
          );
        }

        alert("✅ Login Successful");

        navigate("/dashboard");

      } else {
        alert(
          data.message || "Login Failed"
        );
      }

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      alert(
        "Unable to connect to server."
      );

    } finally {
      setLoading(false);
    }
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

        {/* EMAIL */}

        <div className="mt-8">

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

        <div className="mt-6">

          <label className="text-gray-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full mt-2 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

        </div>

        {/* LOGIN */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-8 p-4 rounded-xl text-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        {/* SIGNUP */}

        <p className="text-center text-gray-400 mt-6">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;