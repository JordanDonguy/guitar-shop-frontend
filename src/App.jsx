import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserLayout from "./components/UserLayout";
import UserProfile from "./pages/UserProfile";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import CheckoutForm from "./pages/Checkout";
import { AuthProvider } from "./components/utils/AuthContext";
import { SearchProvider } from "./components/utils/SearchContext";

export default function App() {
  return (
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
              <Route path="user-profile" element={<UserProfile />}></Route>
              <Route path="orders" element={<Orders />}></Route>
            </Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<CheckoutForm />}></Route>
          </Route>
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}
