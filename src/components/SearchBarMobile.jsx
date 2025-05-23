import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "./utils/SearchContext";
import { Search } from "lucide-react";

export default function SearchBarMobile() {
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
    if (location.pathname === "/products") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className="absolute z-10 mt-24 flex h-24 w-full items-center justify-center bg-teal-50 shadow-md lg:hidden">
      <form
        onSubmit={handleSearch}
        className="flex h-12 w-[90%] justify-between rounded-4xl bg-gray-200 pl-8"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xl font-light focus:outline-none"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="flex h-12 w-16 items-center justify-center rounded-4xl hover:cursor-pointer hover:bg-teal-100"
        >
          <Search className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
}
