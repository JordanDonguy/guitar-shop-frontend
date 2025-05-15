import { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [hasShadow, setHasShadow] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  // Make shadow appear only after scrolled down 95px on mobile view
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 95);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    fetchWithCsrf(`${BASE_URL}/auth/logout`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  // toggle menu visibility on mobile view when pressing hamburger menu button
  const toggleMenuVisibility = () => {
    if (menuVisibility) {
      setMenuVisibility(false);
    } else {
      setMenuVisibility(true);
    }
  };

  return (
    <div>
      <nav
        className={`fixed z-20 flex h-[100px] w-full items-center justify-between bg-[rgba(240,253,250,0.75)] px-[10%] backdrop-blur-sm max-2xl:px-[5%] md:shadow-md ${hasShadow ? "max-md:shadow-md" : ""}`}
      >
        <Link
          to="/"
          className="flex w-[110px] items-center justify-between max-xl:w-[60px]"
        >
          <img src={logo} className="h-[50px] w-[50px]" alt="shop logo" />
          <h1 className="w-[50px] text-lg max-xl:hidden">Guitar Shop</h1>
        </Link>
        <ul className="flex w-1/3 justify-between px-[1vw] text-xl font-light max-xl:w-2/5 max-lg:hidden">
          <li>
            <Link to="/" className="hover:text-teal-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-teal-600">
              Products
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-teal-600">
              Services
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:text-teal-600">
              Contact
            </Link>
          </li>
        </ul>
        <SearchBar />
        <div className="flex w-50 justify-between max-lg:w-60">
          <Link to="/cart" className="filter">
            <ShoppingCart className="duration:100 h-[40px] w-[40px] transition hover:text-teal-600" />
          </Link>
          <button
            onClick={toggleMenuVisibility}
            className="hidden filter hover:cursor-pointer max-lg:block"
          >
            <Menu className="duration:100 h-[45px] w-[45px] transition hover:text-teal-600" />
          </button>
          {/* Conditionally render Login, My Profile, and Logout links */}
          {user ? (
            <Link to="/user/user-profile" className="">
              <User className="duration:100 h-[40px] w-[40px] transition hover:text-teal-600" />
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="flex h-11 w-25 items-center justify-center rounded-4xl border-1 border-black text-xl font-light hover:bg-teal-200"
            >
              Login
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="hover:cursor-pointer">
              <LogOut className="duration:100 h-[40px] w-[40px] transition hover:text-teal-600" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
      <SearchBarMobile />
      {/* Mobile Navigation Menu */}
      <div
        className={`fixed ${menuVisibility ? "block" : "hidden"} z-10 h-1/2 w-full bg-[rgba(240,253,250,0.75)] pt-[120px] shadow-md backdrop-blur-sm`}
      >
        <button
          onClick={toggleMenuVisibility}
          className="ml-[5%] rounded-lg border px-4 py-2"
        >
          X
        </button>
        <ul className="flex h-full flex-col items-center justify-evenly px-[1vw] pb-10 text-xl font-light">
          <li>
            <Link
              to="/"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
