import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import HomePage from "./pages/HomePage";
const Products = lazy(() => import("./pages/Products"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
import Login from "./pages/Login";
import Register from "./pages/Register";
const UserLayout = lazy(() => import("./components/UserLayout"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Orders = lazy(() => import("./pages/Orders"));
import Cart from "./pages/Cart";
const CheckoutForm = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
const ShippingFees = lazy(() => import("./pages/ShippingFees"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/user" element={<UserLayout />}>
                <Route path="profile" element={<UserProfile />}></Route>
                <Route path="orders" element={<Orders />}></Route>
              </Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<CheckoutForm />}></Route>
              <Route path="/unsubscribed" element={<Unsubscribed />}></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/services" element={<Services />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/shipping" element={<ShippingFees />}></Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}
