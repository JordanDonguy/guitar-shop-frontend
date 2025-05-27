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
import logo from "../assets/img/logo.png";

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

  return (
    <header role="banner" aria-label="Primary site navigation">
      <nav
        className={`fixed z-20 flex h-24 w-screen items-center justify-between bg-[rgba(240,253,250,0.75)] px-[10%] backdrop-blur-sm max-2xl:px-[5%] lg:shadow-md ${hasShadow ? "max-lg:shadow-md" : ""}`}
      >
        <NavLink
          to="/"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0 });
            }
          }}
          className="flex w-28 items-center justify-between max-xl:w-16"
        >
          <img
            src={logo}
            className="h-12 w-12 max-md:h-15 max-md:w-15"
            alt="shop logo"
          />
          <h1 className="w-12 text-lg max-xl:hidden">Guitar Shop</h1>
        </NavLink>

        <ul className="flex w-1/3 justify-between px-[1vw] text-xl font-light max-xl:w-2/5 max-lg:hidden">
          <li>
            <NavLink
              to="/"
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0 });
                }
              }}
              className={({ isActive }) =>
                `py-1 hover:text-teal-600 ${isActive ? "border-b-2 text-neutral-400" : ""} border-teal-400`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                if (location.pathname === "/products") {
                  window.scrollTo({ top: 0 });
                }
              }}
              to="/products"
              className={({ isActive }) =>
                `py-1 hover:text-teal-600 ${isActive ? "border-b-2 text-neutral-400" : ""} border-teal-400`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="py-1 hover:text-teal-600">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="py-1 hover:text-teal-600">
              Contact
            </NavLink>
          </li>
        </ul>

        <SearchBar />
        <div className="flex w-50 items-center justify-between max-lg:w-fit md:w-fit">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `rounded-xl border-2 p-2 filter ${isActive ? "border-teal-400 bg-teal-100 max-lg:mr-4" : "border-transparent max-lg:mr-4"
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
            <Menu className="duration:100 h-11 w-11 transition hover:text-teal-600 max-lg:mr-4" />
          </button>

          {user ? (
            <NavLink
              to="/user/profile"
              className={
                location.pathname.startsWith("/user")
                  ? "rounded-xl border-2 border-teal-400 bg-teal-100 p-2 filter max-lg:mr-4"
                  : "border-2 border-transparent p-2 filter max-lg:mr-4"
              }
              aria-current={location.pathname.startsWith("/user") ? "page" : undefined}
            >
              <User className="duration:100 h-10 w-10 transition hover:text-teal-600" />
            </NavLink>
          ) : (
            <NavLink
              to="/auth/login"
              className={({ isActive }) =>
                `m-2 flex h-11 w-25 items-center justify-center rounded-4xl border-1 border-black text-xl font-light hover:border-2 hover:bg-teal-200 ${isActive ? "border-2 bg-teal-200" : ""
                } max-lg:h-12 max-lg:w-30 max-lg:border-2 max-lg:font-medium max-md:border-1`
              }
            >
              Login
            </NavLink>
          )}
          {user ? (
            <button onClick={handleLogout} className="p-2 hover:cursor-pointer" aria-label="Log out">
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
        className={`fixed top-24 left-0 z-10 w-full bg-[rgba(240,253,250,0.95)] shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out ${menuVisibility ? "max-h-1/2 opacity-100" : "max-h-0 overflow-hidden opacity-0"
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
          <li>
            <NavLink
              to="/"
              onClick={toggleMenuVisibility}
              className={({ isActive }) =>
                `border-y-2 py-1 filter ${isActive ? "border-teal-400" : "border-transparent"} hover:text-teal-600`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={toggleMenuVisibility}
              className={({ isActive }) =>
                `border-y-2 py-1 filter ${isActive ? "border-teal-400" : "border-transparent"} hover:text-teal-600`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="#"
              onClick={toggleMenuVisibility}
              className="hover:text-teal-600"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
