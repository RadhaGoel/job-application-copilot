import "dotenv/config";
import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
