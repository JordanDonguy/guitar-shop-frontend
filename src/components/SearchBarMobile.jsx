import { useNavigate } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBarMobile() {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(value || "");
  };

  return (
    <div className="absolute z-10 mt-[95px] flex h-[95px] w-full items-center justify-center bg-teal-50 shadow-md md:hidden">
      <form
        onSubmit={handleSearch}
        className="flex h-12 w-[90%] justify-between rounded-4xl bg-gray-200 pl-8"
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
    </div>
  );
}
