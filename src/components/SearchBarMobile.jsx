import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { Search } from "lucide-react";

export default function SearchBarMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    console.log(location.pathname);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    if (location.pathname === "/products") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="absolute z-10 mt-24 flex h-24 w-full items-center justify-center bg-[rgba(240,253,250,0.75)] shadow-md lg:hidden">
      <form
        onSubmit={handleSearch}
        role="search"
        className="mx-4 flex h-12 w-full justify-between rounded-4xl bg-gray-200 pl-8"
      >
        <label htmlFor="mobile-search-input" className="sr-only">
          Search products or services
        </label>
        <input
          id="mobile-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xl font-light focus:outline-none"
          placeholder="Search..."
          aria-label="Search products or services"
        />
        <button
          type="submit"
          className="flex h-12 w-16 items-center justify-center rounded-4xl hover:cursor-pointer hover:bg-teal-100"
          aria-label="Submit search"
        >
          <Search className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}
