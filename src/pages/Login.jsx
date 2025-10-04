import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { LayoutContext } from "../components/Layout";
import { BASE_URL } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { fetchWithCsrf } from "../utils/fetchWithCsrf";
import { saveTemporaryCartAndRedirect } from "../utils/saveTemporaryCartAndRedirect";

export default function Login() {
  const { fetchUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleEmailButton } = useContext(LayoutContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [temporaryCart, setTemporaryCart] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const cart = localStorage.getItem("cart") || "[]";
    setTemporaryCart(cart);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "error") {
      toast.error(
        "Oops! We couldn’t log you in with Google. Please use the login or register form instead.",
        {
          position: "bottom-center",
          autoClose: 7000,
        },
      );
    }

    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        position: "bottom-center",
        autoClose: 5000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, []);

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
        navigate("/", {
          state: {
            toastMessage: "Hey there, you're back! Great to see you again 🎸",
          },
        });
        localStorage.removeItem("cart");
        setTemporaryCart("");
      } else {
        if (data.errors) {
          const formattedErrors = {};
          data.errors.forEach((err) => {
            formattedErrors[err.field] = err.msg;
          });
          setFieldErrors(formattedErrors);
        } else {
          setErrorMessage(data.error || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <div className="fade-in mt-8 flex min-h-screen items-center justify-center p-6 max-lg:mt-60 max-lg:mb-15 max-lg:min-h-fit max-lg:p-0 max-md:mt-50 max-md:mb-5 max-md:py-10">
      <Helmet>
        <title>Login | Guitar Shop</title>
        <meta
          name="description"
          content="Log in to your Guitar-Shop account to view orders, manage your profile, and enjoy a personalized shopping experience."
        />
      </Helmet>

      <section
        className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-md max-lg:mx-4 max-lg:max-w-full"
        aria-labelledby="login-heading"
      >
        <h1
          id="login-heading"
          className="mb-6 text-center text-3xl font-bold text-gray-800"
        >
          Login
        </h1>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700 max-lg:text-lg"
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          id="login-form"
          className="space-y-4 max-lg:space-y-8"
          noValidate
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
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
              aria-required="true"
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
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
              aria-required="true"
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
            {fieldErrors.password && (
              <p
                id="password-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <input
            type="hidden"
            name="temporaryCart"
            value={temporaryCart}
            id="temporary-cart"
          />

          <button
            type="submit"
            className="h-14 w-full rounded-full bg-blue-600 px-4 font-semibold text-white transition hover:cursor-pointer hover:bg-blue-700 max-lg:h-16 max-lg:text-2xl"
          >
            Login
          </button>

          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                saveTemporaryCartAndRedirect(
                  temporaryCart,
                  `${BASE_URL}/auth/google`,
                );
              }
            }}
            onClick={() =>
              saveTemporaryCartAndRedirect(
                temporaryCart,
                `${BASE_URL}/auth/google`,
              )
            }
            className="flex h-14 w-full items-center rounded-full border px-4 transition hover:cursor-pointer hover:bg-gray-200 max-lg:h-16 max-lg:text-2xl"
            aria-label="Continue with Google"
          >
            <img
              src="/img/google-logo.webp"
              alt=""
              className="w-10"
              aria-hidden="true"
            />
            <span className="mr-10 w-full text-center font-semibold text-gray-700">
              Continue with Google
            </span>
          </div>
        </form>

        <p className="my-4 pt-2 text-center text-sm text-gray-600 max-lg:my-6 max-lg:text-lg">
          <button
            onClick={handleEmailButton}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            Forgot password?
          </button>
        </p>

        <p className="text-center text-sm text-gray-600 max-lg:text-lg">
          Don’t have an account?&nbsp;
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
}
