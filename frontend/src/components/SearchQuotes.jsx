import { IoSearch } from "react-icons/io5";

const SearchQuotes = () => {
  return (
    <div className="w-full h-60 flex justify-center items-center flex-col gap-x-2">
      <div className="mb-8 label text-sm text-center md:text-xl">
        Search quotes via the Author{"'"}s name
      </div>
      <div className="flex justify-center items-center gap-2">
        <label className="input input-bordered flex items-center">
          <input
            type="text"
            className="grow text-sm md:text-xl"
            placeholder="Search quotes..."
          />
        </label>
        <button className="btn">
          <IoSearch className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SearchQuotes;
