import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className="px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
}
