import express from "express";
import cors from "cors";

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
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} 🚀`);
});

const quotesCache = {};

async function fetchAndCacheQuotes() {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    const data = await response.json();
    const quotes = data.map((quote) => ({ text: quote.q, author: quote.a }));

    quotesCache.quotes = quotes;

    console.log("Quotes fetched and cached");
  } catch (error) {
    console.error("Failed to fetch and cache quotes:", error);
  }
}

fetchAndCacheQuotes();

// Schedule fetchAndCacheQuotes to run every 3 hours
setInterval(fetchAndCacheQuotes, 3 * 60 * 60 * 1000);

app.get("/api/quotes", async (req, res) => {
  try {
    const author = req.query.author;
    let quotesToSend = quotesCache.quotes;

    if (author) {
      quotesToSend = quotesCache.quotes.filter((quote) =>
        quote.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (quotesToSend) {
      console.log("Quotes served from cache");
      res.status(200).json({
        message: "Quotes fetched successfully",
        quotes: quotesToSend,
      });
    } else {
      throw new Error("No quotes in cache");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});
