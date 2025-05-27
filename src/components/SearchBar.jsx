import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { Search } from "lucide-react";

export default function SearchBar() {
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
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex h-12 w-[25vw] justify-between rounded-4xl bg-gray-200 pl-8 max-lg:hidden max-lg:w-1/2"
    >
      <label htmlFor="search-input" className="sr-only">
        Search products or services
      </label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-lg font-light focus:outline-none"
        placeholder="Search..."
        aria-label="Search products or services"
      />
      <button
        type="submit"
        className="flex h-12 w-16 items-center justify-center rounded-4xl hover:cursor-pointer hover:bg-teal-100"
        aria-label="Submit search"
      >
        <Search />
      </button>
    </form>
  );
}
