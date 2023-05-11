import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import readings from "./routes/readings.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/readings", readings);
app.get("/status", (_, res) => {
  res.send("API is running..");
});

app.listen(PORT, console.log(`Server running on port ${PORT}..`));
