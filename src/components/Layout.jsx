import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/img/loading.gif";

const Layout = () => {
  return (
    <div className="flex flex-col justify-between">
      <header className="max-md:pb-[95px]">
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
        <main className="min-h-screen flex-grow">
          <Outlet />
        </main>
      </Suspense>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Layout;
