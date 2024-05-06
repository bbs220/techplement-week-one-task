import axios from "axios";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-hot-toast";

const SearchQuotes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [quotes, setQuotes] = useState([]);

  const [filteredQuotes, setFilteredQuotes] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (index) => {
    setFilteredQuotes(filteredQuotes.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (searchTerm.length < 3) {
      toast.error("Minimum 3 characters needed for searching");
      return;
    }

    try {
      const response = await axios.get(`/api/quotes?author=${searchTerm}`);
      if (response.data.quotes.length === 0) {
        toast.error("No author or quote found");
      } else {
        setQuotes(response.data.quotes);

        setFilteredQuotes(response.data.quotes);
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error);

      toast.error("Failed to fetch quotes");
    }
  };

  return (
    <div className="relative w-full max-h-fit min-h-fit flex justify-center items-center flex-col gap-x-2">
      <div className="mb-4 label text-sm text-center md:text-xl">
        Search various quotes via the Author{"'"}s name
      </div>
      <div className="flex justify-center items-center gap-2">
        <label className="input input-bordered flex items-center">
          <input
            type="text"
            className="grow text-sm md:text-xl"
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </label>
        <button className="btn" onClick={handleSearch}>
          <IoSearch className="text-xl" />
        </button>
      </div>
      <div className="mt-4 w-full h-full">
        {filteredQuotes.map((quote, index) => (
          <div
            key={index}
            className="p-1 rounded-lg flex justify-center items-center flex-col"
          >
            <p className="label text-wrap text-center">
              {"\u201c"} {quote.text} {"\u201d"}
            </p>
            <div className="flex justify-center items-center gap-x-4">
              <p className="label text-sm text-center italic opacity-70">
                <GoDash /> {quote.author}
              </p>
              <button
                className="btn btn-xs size-8 p-0"
                onClick={() => handleDelete(index)}
              >
                <TiDelete className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchQuotes;
