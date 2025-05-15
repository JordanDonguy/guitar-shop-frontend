import { useNavigate } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(value || "");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-12 w-[25vw] justify-between rounded-4xl bg-gray-200 pl-8 max-lg:w-1/2 max-md:hidden"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-lg font-light focus:outline-none"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="flex h-12 w-16 items-center justify-center rounded-4xl hover:cursor-pointer hover:bg-teal-100"
      >
        <Search />
      </button>
    </form>
  );
}
