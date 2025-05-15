import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [temporaryCart, setTemporaryCart] = useState("");
  const navigate = useNavigate();

  const { fetchUser, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    const cart = localStorage.getItem("cart") || "[]";
    setTemporaryCart(cart);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchWithCsrf(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password, temporaryCart }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchUser();
        navigate("/");
        localStorage.removeItem("cart");
        setTemporaryCart("");
      } else {
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <div className="fade-in mb-30 flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Helmet>
        <title>Login | Guitar Shop</title>
      </Helmet>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>

        {errorMessage && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} id="login-form" className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <input
            type="hidden"
            name="temporaryCart"
            value={temporaryCart}
            id="temporary-cart"
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account ?&nbsp;
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
