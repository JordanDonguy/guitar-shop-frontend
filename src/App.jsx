import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import { AuthProvider } from './components/utils/AuthContext';

export default function App() {
    return (
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/auth/login" element={<Login />} ></Route>
              <Route path="/auth/register" element={<Register />}></Route>
              <Route path="/user" element={<UserProfile />} ></Route>
              <Route path="/cart" element={<Cart />} ></Route>
            </Route>
          </Routes>
        </AuthProvider>
    )
  };
