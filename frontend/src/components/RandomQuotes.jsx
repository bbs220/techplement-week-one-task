import { useState, useEffect } from "react";
import axios from "axios";
import { GoDash } from "react-icons/go";
import { IoDiceSharp } from "react-icons/io5";

const RandomQuotes = () => {
  const [quote, setQuote] = useState("");

  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // runs after it is called
  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/quotes");
      // double checks the data and length just so no empty array
      if (res.data && res.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.data.length);

        const selectedQuote = res.data[randomIndex];
        // sets quotes
        setQuote(selectedQuote.q);
        setAuthor(selectedQuote.a);
      } else {
        setQuote("");
        setAuthor("");
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // runs immediately
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
              {/* weird hack for double quotation marks */}
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
            onClick={() => fetchQuote()}
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
