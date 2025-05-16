import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
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
    }, [user, loadingAuth]);

  if (isMobile) {
    return (
      <div className="fade-in mb-20 px-[5%] pt-[140px] flex flex-col">
        <div className="mb-10 flex rounded-lg border-2 border-teal-600 p-1">
          <Link
            to="/user/user-profile"
            className="w-1/2 border-r-2 border-teal-400 text-center text-2xl hover:text-neutral-500"
          >
            User Profile
          </Link>
          <Link
            to="/user/orders"
            className="w-1/2 text-center text-2xl hover:text-neutral-500"
          >
            Orders
          </Link>
        </div>
        <Outlet />
      </div>
    );
  }

  // Desktop version
  return (
    <div className="fade-in mb-30 flex min-h-screen px-[10%] pt-[140px]">
      <div className="sticky top-[140px] flex h-[80vh] w-1/6 flex-col border-r-2 border-neutral-400 max-2xl:w-1/4">
        <Link
          to="/user/user-profile"
          className="mb-10 text-2xl hover:text-neutral-500"
        >
          → User Profile
        </Link>
        <Link to="/user/orders" className="text-2xl hover:text-neutral-500">
          → Orders
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
