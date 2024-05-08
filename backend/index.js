import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database/connectToDB.js";
import quoteModel from "./models/quoteModel.js";
import { insertQuotes } from "./database/insertQuotesIntoDB.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());

// Define your API routes here
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await quoteModel.find({});
    res.json(quotes);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
});

app.get("/api/quotes/search", async (req, res) => {
  try {
    const { author } = req.query;
    if (!author || author.length < 3) {
      return res
        .status(400)
        .json({ message: "Author name must be at least 3 characters" });
    }

    // Perform a case-insensitive search for quotes by a partial match of the author's name
    const quotes = await quoteModel.find({
      a: { $regex: new RegExp(author, "i") },
    });
    res.json(quotes);
  } catch (error) {
    console.error("Failed to search quotes:", error);
    res.status(500).json({ message: "Failed to search quotes" });
  }
});

// always keep the static and wildcard last in route so it doesn't interfere with other routes
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all route should be the last route defined
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at port ${PORT} 🚀`);
  await insertQuotes();

  setInterval(async () => {
    await insertQuotes();
  }, 2 * 60 * 60 * 1000);
});
