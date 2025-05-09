import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Products from './pages/Products';

export default function App() {
    return (
      <div>
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>

        <Footer />
      </div>
    )
  };
