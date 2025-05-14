import { Outlet, Link } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      {/* Desktop */}
      <div className="mb-30 flex min-h-screen px-[10%] pt-[140px] max-lg:hidden">
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

      {/* Mobile */}
      <div className="mb-30 hidden min-h-screen px-[5%] pt-[140px] max-lg:flex max-lg:flex-col">
        <div className="mb-10 flex h-fit rounded-lg border-2 border-teal-600 p-1">
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
    </div>
  );
};

export default UserLayout;
