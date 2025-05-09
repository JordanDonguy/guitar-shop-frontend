import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

export default function App() {
    return (
      <div>
        <header>
          <Navbar />
        </header>

        <main>
          <HomePage />
        </main>
        
        <Footer />
      </div>
    )
  };
