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
      <header className="max-lg:pb-[95px]">
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
        <main className="min-h-screen flex-grow max-lg:min-h-fit">
          <Outlet />
        </main>
      </Suspense>

      <Footer />
      <ToastContainer className="max-lg:text-2xl" />
    </div>
  );
};

export default Layout;
