import { useEffect, useState } from "react";
import axios from "axios";

const RandomQuotes = () => {
  const [quote, setQuote] = useState({ q: "", a: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/quote");
        setQuote(res.data);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{quote.q}</div>
          <div>{quote.a}</div>
        </div>
      )}
    </div>
  );
};

export default RandomQuotes;
