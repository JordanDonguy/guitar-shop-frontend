import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import googleLogo from "../assets/img/google-logo.png";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch(`${BASE_URL}/auth/register`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithCsrf(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const formattedErrors = {};
          data.errors.forEach((err) => {
            formattedErrors[err.field] = err.message || err.msg;
          });
          setFieldErrors(formattedErrors);
        } else {
          setError(data.error || "Something went wrong");
        }
        return; //
      }

      navigate("/auth/login", {
        state: { toastMessage: "🎉 Registration successful! Please log in." },
      });
    } catch (err) {
      setError("Something went wrong while processing your request");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="fade-in flex min-h-screen items-center justify-center pt-[140px] max-lg:min-h-fit max-lg:pt-60">
      <Helmet>
        <title>Register | Guitar Shop</title>
      </Helmet>
      <section
        className="mb-20 h-fit w-full max-w-xl rounded-2xl bg-white p-8 shadow-md max-lg:max-w-[90%]"
        aria-labelledby="register-heading"
      >
        <h1
          id="register-heading"
          className="mb-6 text-center text-3xl font-bold text-gray-800"
        >
          Create an Account
        </h1>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700 max-lg:text-lg"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 max-lg:space-y-4 sm:grid-cols-2"
          noValidate
        >
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
              aria-required="true"
              aria-describedby={
                fieldErrors.first_name ? "first-name-error" : undefined
              }
            />
            {fieldErrors.first_name && (
              <p
                id="first-name-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {fieldErrors.first_name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
              aria-required="true"
              aria-describedby={
                fieldErrors.last_name ? "last-name-error" : undefined
              }
            />
            {fieldErrors.last_name && (
              <p
                id="last-name-error"
                className="text-sm text-red-500"
                role="alert"
              >
                {fieldErrors.last_name}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
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
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
              aria-required="true"
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              required
              value={formData.phone_number}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
              aria-required="true"
              aria-describedby={
                fieldErrors.phone_number ? "phone-error" : undefined
              }
              pattern="^[0-9+\-\s()]*$"
            />
            {fieldErrors.phone_number && (
              <p id="phone-error" className="text-sm text-red-500" role="alert">
                {fieldErrors.phone_number}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
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
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
              aria-required="true"
              aria-describedby={
                fieldErrors.password ? "password-error" : undefined
              }
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

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="h-14 w-full rounded-full bg-blue-600 px-4 font-medium text-white transition hover:cursor-pointer hover:bg-blue-700 max-lg:h-16 max-lg:text-2xl"
            >
              Register
            </button>
          </div>

          <div
            className="mt-1 flex h-14 w-full items-center rounded-full border px-4 transition hover:cursor-pointer hover:bg-gray-200 max-lg:h-16 max-lg:text-2xl sm:col-span-2"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.location.href = "http://localhost:3000/auth/google";
              }
            }}
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/google")
            }
            aria-label="Continue with Google"
          >
            <img src={googleLogo} alt="" className="w-10" aria-hidden="true" />
            <a
              href="http://localhost:3000/auth/google"
              className="mr-10 w-full text-center font-semibold text-gray-700"
            >
              Continue with Google
            </a>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 max-lg:mt-8 max-lg:text-lg">
          Already have an account?&nbsp;
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
