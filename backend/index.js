import express from "express";
import path from "path";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database/connectToDB.js";
import quoteModel from "./models/quoteModel.js";
import { insertQuotes } from "./database/insertQuotesIntoDB.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());
// app.use(cors());

// random quotes route
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await quoteModel.find({});
    res.json(quotes);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
});

// search quotes route
app.get("/api/quotes/search", async (req, res) => {
  try {
    const { author } = req.query;
    if (!author || author.length < 3) {
      return res
        .status(400)
        .json({ message: "Author name must be at least 3 characters" });
    }

  
    // allowing to find quotes via author name 
    // typed names do not need to be case sensitive
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
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// for showing the build page from same origin
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at port ${PORT} 🚀`);
  await insertQuotes();

  // loop to keep fetching new quotes after few hours
  setInterval(async () => {
    await insertQuotes();
  }, 2 * 60 * 60 * 1000);
});
