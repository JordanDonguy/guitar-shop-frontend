import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/img/loading.gif";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <header>
        <Navbar />
      </header>

      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <img src={loadingGif}></img>
            <img src={loadingGif}></img>
            <img src={loadingGif}></img>
            <img src={loadingGif}></img>
          </div>
        }
      >
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full flex-grow max-lg:max-w-screen">
            <Outlet />
          </div>
        </main>
      </Suspense>

      <Footer />
      <ToastContainer className="max-lg:text-2xl" />
    </div>
  );
};

export default Layout;
