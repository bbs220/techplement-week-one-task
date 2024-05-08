import { useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-hot-toast";

const SearchQuotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
      const response = await axios.get(
        `/api/quotes/search?author=${searchTerm}`
      );
      // Check if the response data is an array
      if (!Array.isArray(response.data)) {
        toast.error("Unexpected response format. Please try again.");
        return;
      }
      if (response.data.length === 0) {
        toast.error("No author or quote found");
      } else {
        setFilteredQuotes(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
      // Provide a more user-friendly error message if the error is due to network issues
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(
          "An error occurred while processing your request. Please try again."
        );
      }
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
              {/* weird hack for double quotation marks */}
              {"\u201c"} {quote.q} {"\u201d"}
            </p>
            <div className="flex justify-center items-center gap-x-4">
              <p className="label text-sm text-center italic opacity-70">
                <GoDash /> {quote.a}
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
