import { Suspense, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
export const LayoutContext = createContext();
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddressForm from "./AddressForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/img/loading.gif";
import PasswordForm from "./PasswordForm";

export default function Layout() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [blur, setBlur] = useState(false);

  function handleAddressButton() {
    setShowAddressForm((prev) => !prev);
    setBlur((prev) => !prev);
  }

  function handlePasswordButton() {
    setShowPasswordForm((prev) => !prev);
    setBlur((prev) => !prev);
  }

  function getAddressForm() {
    window.scrollTo(0, 0);
    return (
      <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
        <AddressForm handleAddressButton={handleAddressButton} />
      </div>
    );
  }

  function getPasswordForm() {
    window.scrollTo(0, 0);
    return (
      <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
        <PasswordForm handlePasswordButton={handlePasswordButton} />
      </div>
    );
  }

  return (
    <LayoutContext.Provider
      value={{ handleAddressButton, handlePasswordButton }}
    >
      {showAddressForm && getAddressForm()}
      {showPasswordForm && getPasswordForm()}

      <div
        className={`flex min-h-screen flex-col justify-between ${blur ? "blur-md" : ""
          }`}
      >

        <Navbar />

        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center" role="alert" aria-live="assertive">
              <img src={loadingGif} alt="Loading animation 1" />
              <img src={loadingGif} alt="Loading animation 2" />
              <img src={loadingGif} alt="Loading animation 3" />
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
    </LayoutContext.Provider>
  );
};
