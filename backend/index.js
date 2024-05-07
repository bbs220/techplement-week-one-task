import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database/connectToDB.js";
import quoteModel from "./models/quoteModel.js";
import { insertQuotes } from "./database/insertQuotesIntoDB.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// change to this later for prod
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     optionsSuccessStatus: 200,
//     methods: ["GET"],
//     allowedHeaders: ["Content-Type", "application/json"],
//   })
// );

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server listening at port ${PORT} 🚀`);
  await insertQuotes();
});

app.get("/api/quotes", async (req, res) => {
  try {
    // Check if the author query parameter is provided
    if (req.query.author) {
      // Filter quotes by author
      const quotes = await quoteModel.find({
        a: { $regex: req.query.author, $options: "i" },
      });
      res.status(200).json(quotes);
    } else {
      // If no author query parameter, return all quotes
      const quotes = await quoteModel.find({});
      res.status(200).json(quotes);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes" });
  }
});
