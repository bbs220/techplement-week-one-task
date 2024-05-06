import { useState, useEffect } from "react";
import { GoDash } from "react-icons/go";
import { IoDiceSharp } from "react-icons/io5";
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
        <div className="relative w-full h-[500px] flex justify-center items-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="relative w-full h-[500px] flex justify-center items-center flex-col">
          <div className="text-center flex justify-center items-center flex-col">
            <div className="label text-2xl lg:text-4xl w-5/6">
              {/* weird utf8 hack since proper double quotation marks not easily available */}
              {"\u201c"} {quote} {"\u201d"}
            </div>
            <div className="flex justify-center items-center">
              <div className="label label-text text-base lg:text-2xl italic opacity-70">
                <GoDash /> {author}
              </div>
            </div>
          </div>
          <button
            className="btn absolute bottom-2 lg:bottom-6"
            onClick={fetchQuote}
          >
            Random Quote
            <IoDiceSharp className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomQuotes;
