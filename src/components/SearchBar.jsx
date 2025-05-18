import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
    console.log(location.pathname);
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex h-12 w-[25vw] justify-between rounded-4xl bg-gray-200 pl-8 max-lg:hidden max-lg:w-1/2"
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
