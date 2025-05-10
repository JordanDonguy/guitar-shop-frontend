import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Login from './pages/Login';

export default function App() {
    return (
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/auth/login" element={<Login />} ></Route>
            </Route>
          </Routes>
    )
  };
