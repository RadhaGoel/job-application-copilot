import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), (req, res) => {
  const jobDescription = req.body.jobDescription;
  const resumeFile = req.file;

  console.log("JD:", jobDescription);
  console.log("Resume:", resumeFile?.originalname);

  res.json({
    success: true,
    message: "Job data received successfully",
  });
});

export default router;
