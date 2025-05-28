import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/utils/ScrollToTop";
import { AuthProvider } from "./components/utils/AuthContext";
import { SearchProvider } from "./components/utils/SearchContext";
const HomePage = lazy(() => import("./pages/HomePage"));
const Products = lazy(() => import("./pages/Products"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserLayout = lazy(() => import("./components/UserLayout"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Orders = lazy(() => import("./pages/Orders"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckoutForm = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

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
              <Route path="/auth/login" element={<Login />}></Route>
              <Route path="/auth/register" element={<Register />}></Route>
              <Route path="/user" element={<UserLayout />}>
                <Route path="profile" element={<UserProfile />}></Route>
                <Route path="orders" element={<Orders />}></Route>
              </Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<CheckoutForm />}></Route>
              <Route path="/unsubscribed" element={<Unsubscribed />}></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}
