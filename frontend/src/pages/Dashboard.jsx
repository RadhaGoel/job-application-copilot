import { useState } from "react";

const Dashboard = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);

  const handleAnalyze = () => {
    if (!jobDescription || !resume) {
      alert("Please add job description and resume");
      return;
    }

    console.log("Job Description:", jobDescription);
    console.log("Resume File:", resume);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Job Application Analyzer
      </h2>

      <div className="mb-6">
        <label className="block font-medium mb-2">
          Job Description
        </label>
        <textarea
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full border rounded p-3 focus:outline-none focus:ring"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleAnalyze}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Analyze Job Match
      </button>
    </div>
  );
};

export default Dashboard;
