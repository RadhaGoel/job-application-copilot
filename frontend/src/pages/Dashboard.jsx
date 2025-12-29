import { useState } from "react";

const Dashboard = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);


  const handleAnalyze = async () => {
    console.log("Analyze button clicked");
  if (!jobDescription || !resume) {
    alert("Please add job description and resume");
    return;
  }

  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", resume);

  setLoading(true);

  const res = await fetch("https://job-application-copilot-jqqn.onrender.com/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  setResult(data);
  setLoading(false);

  setHistory(prev => [
  ...prev,
  {
    score: data.matchScore,
    time: new Date().toLocaleTimeString()
  }
]);

  alert("Data uploaded successfully ✅");
};

const missingSkills =
  result?.jdKeywords?.filter(
    (word) => !result.matchedKeywords.includes(word)
  ) || [];


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

      {result && (
  <div className="mt-8 p-6 border rounded-lg bg-white">
    <h2 className="text-xl font-semibold mb-2">
      Match Score: {result.matchScore}%
    </h2>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div
        className="bg-green-500 h-3 rounded-full transition-all"
        style={{ width: `${result.matchScore}%` }}
      ></div>
    </div>

    {/* Score Label */}
    <p className="mb-4 font-medium">
      {result.matchScore >= 75 && "Excellent Match"}
      {result.matchScore >= 50 && result.matchScore < 75 && "Good Match"}
      {result.matchScore >= 30 && result.matchScore < 50 && "Average Match"}
      {result.matchScore < 30 && "Low Match"}
    </p>

    <h3 className="font-semibold mb-2">Matched Skills:</h3>
    <ul className="list-disc ml-5 space-y-1">
      {result.matchedKeywords.map((word, i) => (
        <li key={i}>{word}</li>
      ))}
    </ul>

    {missingSkills.length > 0 && (
  <>
    <h3 className="font-semibold mt-4 mb-2 text-red-600">
      Missing Skills:
    </h3>
    <ul className="list-disc ml-5 space-y-1 text-red-500">
      {missingSkills.map((skill, i) => (
        <li key={i}>{skill}</li>
      ))}
    </ul>
  </>
)}

  </div>
)}

{result && (
  <div className="mt-6 p-4 border rounded bg-gray-50">
    <h3 className="font-semibold mb-2">
      Resume Improvement Suggestions
    </h3>
    <ul className="list-disc ml-5 space-y-1 text-gray-700">
      <li>Add more job-specific keywords</li>
      <li>Align resume projects with job requirements</li>
      <li>Highlight measurable achievements</li>
      <li>Include relevant tools and technologies</li>
    </ul>
  </div>
)}

{result?.aiSuggestions && (
  <div className="mt-6 p-4 border rounded bg-blue-50">
    <h3 className="font-semibold mb-2">
      AI Resume Suggestions
    </h3>
    <pre className="whitespace-pre-wrap text-sm text-gray-700">
      {result.aiSuggestions}
    </pre>
  </div>
)}



{history.length > 0 && (
  <div className="mt-10">
    <h2 className="text-xl font-semibold">Previous Analysis</h2>

    <ul className="mt-3 space-y-2">
      {history.map((item, i) => (
        <li
          key={i}
          className="border p-3 rounded flex justify-between"
        >
          <span>Match Score: {item.score}%</span>
          <span className="text-sm text-gray-500">
            {item.time}
          </span>
        </li>
      ))}
    </ul>
  </div>
)}



    </div>
  );
};

export default Dashboard;
