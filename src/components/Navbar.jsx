import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import logo from "../assets/img/logo.webp";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
          navigate("/", {
            state: {
              toastMessage: "Thanks for stopping by! Come back anytime 🤘",
            },
          });
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

  // Configure an array of navItems
  const navItems = ["Products", "Services", "About", "Contact"];

  return (
    <header role="banner" aria-label="Primary site navigation">
      <nav
        className={`fixed z-20 flex h-24 w-full items-center justify-between bg-[rgba(240,253,250,0.75)] px-[10%] backdrop-blur-sm max-2xl:px-[5%] max-lg:px-4 lg:shadow-md ${hasShadow ? "max-lg:shadow-md" : ""}`}
      >
        <NavLink
          to="/"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex w-28 items-center justify-between max-xl:w-16"
        >
          <img
            src={logo}
            className="h-12 w-12 max-lg:h-15 max-lg:w-15"
            alt="shop logo"
          />
          <h1 className="w-12 text-lg max-xl:hidden">Guitar Shop</h1>
        </NavLink>

        <ul className="flex w-1/3 justify-between px-[1vw] text-xl font-light max-xl:w-2/5 max-lg:hidden">
          {navItems.map((item) => (
            <li key={item}>
              <NavLink
                onClick={() => {
                  if (location.pathname === `/${item}`) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                to={`/${item}`}
                className={({ isActive }) =>
                  `py-1 hover:text-teal-600 ${isActive ? "border-b-2 text-neutral-400" : ""} border-teal-400`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        <SearchBar />

        <div className="flex items-center justify-between space-x-2">
          <NavLink
            onClick={() => {
              if (location.pathname === "/cart") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            to="/cart"
            className={({ isActive }) =>
              `rounded-xl border-2 p-2 filter ${
                isActive ? "border-teal-400 bg-teal-100" : "border-transparent"
              }`
            }
          >
            <ShoppingCart className="duration:100 h-10 w-10 transition hover:text-teal-600 max-lg:mb-1" />
          </NavLink>
          <button
            onClick={toggleMenuVisibility}
            className="hidden p-2 filter hover:cursor-pointer max-lg:block"
            aria-label="Toggle mobile menu"
            aria-expanded={menuVisibility}
          >
            <Menu className="duration:100 h-11 w-11 transition hover:text-teal-600" />
          </button>

          {user ? (
            <NavLink
              onClick={() => {
                if (location.pathname === "/user/profile") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              to="/user/profile"
              className={
                location.pathname.startsWith("/user")
                  ? "rounded-xl border-2 border-teal-400 bg-teal-100 p-2 filter"
                  : "border-2 border-transparent p-2 filter"
              }
              aria-current={
                location.pathname.startsWith("/user") ? "page" : undefined
              }
            >
              <User className="duration:100 h-10 w-10 transition hover:text-teal-600" />
            </NavLink>
          ) : (
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `m-2 flex h-11 w-25 items-center justify-center rounded-4xl border-1 border-black text-xl font-light hover:border-2 hover:bg-teal-200 ${
                  isActive ? "border-2 bg-teal-200" : ""
                } max-lg:h-12 max-lg:w-30 max-lg:border-2 max-lg:font-medium max-md:border-1`
              }
            >
              Login
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:cursor-pointer"
              aria-label="Log out"
            >
              <LogOut className="duration:100 h-10 w-10 transition hover:text-teal-600" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </nav>

      <SearchBarMobile />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-24 left-0 z-10 w-full bg-[rgba(245,245,245,0.75)] backdrop-blur-sm transition-all duration-300 ease-in-out ${
          menuVisibility
            ? "z-20 max-h-1/2 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
        aria-hidden={!menuVisibility}
      >
        <button
          onClick={toggleMenuVisibility}
          className="absolute top-6 right-6 rounded-full border px-4 py-2 text-2xl font-semibold hover:bg-teal-200"
          aria-label="Close mobile menu"
        >
          ✕
        </button>

        <ul className="flex h-[50vh] flex-col items-center justify-evenly px-[1vw] pb-10 text-xl font-light max-lg:text-3xl">
          {navItems.map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item}`}
                onClick={toggleMenuVisibility}
                className={({ isActive }) =>
                  `border-y-2 py-1 filter ${isActive ? "border-teal-400" : "border-transparent"} hover:text-teal-600`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
