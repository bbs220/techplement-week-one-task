import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hi mom");
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT} 🚀`);
});
