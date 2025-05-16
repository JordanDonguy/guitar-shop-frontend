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
      navigate("/auth/login");
    }
  }, [user, loadingAuth, navigate]);

  if (isMobile) {
    return (
      <div className="fade-in mb-20 flex flex-col px-[5%] pt-[140px]">
        <div className="mb-10 flex overflow-hidden rounded-xl border-2 border-teal-600 shadow-md">
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
        </div>
        <Outlet />
      </div>
    );
  }

  // Desktop version
  return (
    <div className="fade-in mb-30 flex min-h-screen px-[10%] pt-[140px]">
      <div className="sticky top-[140px] flex h-[80vh] w-1/6 flex-col border-r-2 border-neutral-400 max-2xl:w-1/4">
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
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
