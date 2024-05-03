import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// better remove this later for prod
app.use(cors());

app.get("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await response.json();
    const quote = {
      q: data[0].q,
      a: data[0].a,
    };
    res.status(200).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} 🚀`);
});
