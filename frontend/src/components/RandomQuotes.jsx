import { useState, useEffect } from "react";
import axios from "axios";

const RandomQuotes = () => {
  const [quote, setQuote] = useState("");

  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/quotes");
      const randomIndex = Math.floor(Math.random() * res.data.quotes.length);
      const selectedQuote = res.data.quotes[randomIndex];
      setQuote(selectedQuote.text);
      setAuthor(selectedQuote.author);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{quote}</div>
          <div>{author}</div>
          <button onClick={fetchQuote}>Get New Quote</button>
        </div>
      )}
    </div>
  );
};

export default RandomQuotes;
