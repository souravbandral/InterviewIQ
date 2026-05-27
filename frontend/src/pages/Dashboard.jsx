import { useState, useRef } from "react";
function Dashboard() {
const [file, setFile] = useState(null);
const fileInputRef = useRef(null);
const handleUpload = async () => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "http://127.0.0.1:8000/upload-resume",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);

};
  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold">
        Welcome To InterviewIQ 🚀
      </h1>

      <p className="text-gray-400 mt-4 text-lg">
        Your AI-powered interview preparation dashboard
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-semibold">
            Resume Upload
          </h2>
      <label className="cursor-pointer">

  <div className="bg-gray-800 border border-gray-600 p-4 rounded-xl text-white font-semibold">

    {file ? file.name : "Choose Resume File"}

  </div>

  <input
    type="file"
    ref={fileInputRef}
    onChange={(e) => setFile(e.target.files[0])}
    className="hidden"
  />

</label>

<div className="flex gap-4 mt-4">

  <button
    onClick={handleUpload}
    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
  >
    Upload Resume
  </button>

  <button
    onClick={() => {
      setFile(null);
      fileInputRef.current.value = "";
    }}
    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
  >
    Remove File
  </button>

</div>
          <p className="text-gray-400 mt-3">
            Upload your resume for AI analysis
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-semibold">
            Mock Interview
          </h2>

          <p className="text-gray-400 mt-3">
            Practice AI-generated interview questions
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-semibold">
            Performance Analytics
          </h2>

          <p className="text-gray-400 mt-3">
            Track your interview performance
          </p>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;