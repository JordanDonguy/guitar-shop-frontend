import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
    </div>
  );
};

export default Layout;
