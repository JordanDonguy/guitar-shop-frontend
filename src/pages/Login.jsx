import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../components/utils/api';
import { useAuth } from '../components/utils/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [temporaryCart, setTemporaryCart] = useState('');
  const navigate = useNavigate();

  const { fetchUser } = useAuth();

  useEffect(() => {
    // Load the cart from localStorage
    const cart = localStorage.getItem('cart') || '[]';
    setTemporaryCart(cart);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, temporaryCart }),
    });

    const data = await response.json();

    if (response.ok) {
      fetchUser();
      navigate('/'); 
    } else {
      setErrorMessage(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-6 mb-30">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} id="login-form" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input type="hidden" name="temporaryCart" value={temporaryCart} id="temporary-cart" />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition hover:cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
