import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";
import { useMediaQuery } from "./utils/useMediaQuery";

const UserLayout = () => {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      navigate("/login");
    }
  }, [user, loadingAuth, navigate]);

  return (
    <>
      {isMobile ? (
        // Mobile Version
        <div className="fade-in mb-20 flex min-h-screen flex-col px-4 pt-60">
          <nav
            aria-label="User account navigation"
            className="mb-10 flex overflow-hidden rounded-xl border-2 border-teal-600 shadow-md"
          >
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `w-1/2 py-3 text-center text-xl font-medium transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "bg-white hover:bg-teal-100"
                }`
              }
            >
              User Profile
            </NavLink>
            <NavLink
              to="/user/orders"
              className={({ isActive }) =>
                `w-1/2 py-3 text-center text-xl font-medium transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "bg-white hover:bg-teal-100"
                }`
              }
            >
              Orders
            </NavLink>
          </nav>
          <Outlet />
        </div>
      ) : (
        // Desktop version
        <div className="fade-in mb-30 flex min-h-screen px-[10%] pt-30 max-2xl:px-[5%]">
          <nav
            aria-label="User account navigation"
            className="sticky top-[140px] flex h-[80vh] w-1/6 flex-col border-r-2 border-neutral-400 max-2xl:w-1/4"
          >
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `mb-10 text-2xl hover:text-neutral-500 ${isActive ? "text-teal-500" : ""}`
              }
            >
              → User Profile
            </NavLink>
            <NavLink
              to="/user/orders"
              className={({ isActive }) =>
                `mb-10 text-2xl hover:text-neutral-500 ${isActive ? "text-teal-500" : ""}`
              }
            >
              → Orders
            </NavLink>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default UserLayout;
