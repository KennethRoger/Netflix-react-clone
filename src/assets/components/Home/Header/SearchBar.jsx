import React, { useState } from "react";
import { debounce } from "lodash";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
  };

  const debouncedHandleChange = debounce(handleChange, 300);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={debouncedHandleChange}
        placeholder="Search for a movie..."
        className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}

export default SearchBar;
