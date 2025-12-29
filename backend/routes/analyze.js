import { getAISuggestions } from "../services/aiService.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const resumePath = req.file.path;

    const dataBuffer = fs.readFileSync(resumePath);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    let aiSuggestions = null;

try {
  aiSuggestions = await getAISuggestions(
    resumeText.slice(0, 2000),
    jobDescription
  );
} catch (err) {
  console.error("AI failed:", err.message);
}


const stopWords = [
  "the","and","a","to","of","in","for","with","on","at","by","an","is","are","we","you"
];


const jdWords = jobDescription
  .toLowerCase()
  .split(/\W+/)
  .filter(word => word.length > 2 && !stopWords.includes(word));

const resumeWords = resumeText
  .toLowerCase()
  .split(/\W+/)
  .filter(word => word.length > 2 && !stopWords.includes(word));

  const commonWords = [...new Set(
  jdWords.filter(word => resumeWords.includes(word))
)];


const matchScore = jdWords.length
  ? Math.min(Math.round((commonWords.length / jdWords.length) * 100), 100)
  : 0;



//     const jdWords = jobDescription.toLowerCase().split(/\W+/);
// const resumeWords = resumeText.toLowerCase().split(/\W+/);

// const commonWords = jdWords.filter(word =>
//   resumeWords.includes(word)
// );

// const matchScore = Math.min(
//   Math.round((commonWords.length / jdWords.length) * 100),
//   100
// );

res.json({
  success: true,
  matchScore,
  matchedKeywords: [...new Set(commonWords)].slice(0, 20),
  aiSuggestions
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

export default router;
