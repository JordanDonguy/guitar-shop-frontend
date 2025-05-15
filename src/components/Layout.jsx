import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <header className="max-md:pb-[95px]">
        <Navbar />
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
