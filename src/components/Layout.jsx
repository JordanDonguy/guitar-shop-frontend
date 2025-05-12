import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      
      <main className="min-h-200">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
