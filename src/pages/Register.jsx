import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [countries, setCountries] = useState();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch(`${BASE_URL}/auth/register`)
      .then((res) => res.json())
      .then((data) => setCountries(data.countries))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="fade-in flex justify-center pt-[140px] max-lg:pt-60">
      <Helmet>
        <title>Register | Guitar Shop</title>
      </Helmet>
      <div className="mb-20 w-full max-w-xl rounded-2xl bg-white p-8 shadow-md max-lg:max-w-[90%]">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Create an Account
        </h1>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700 max-lg:text-lg">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 max-lg:space-y-4 sm:grid-cols-2"
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
            />
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
            />
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
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              required
              value={formData.phone_number}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
            {fieldErrors.phone_number && (
              <p className="text-sm text-red-500">{fieldErrors.phone_number}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              required
              value={formData.street}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
          </div>
          <div>
            <label
              htmlFor="postal_code"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              required
              value={formData.postal_code}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 max-lg:text-lg"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-lg border bg-white px-4 py-2 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none max-lg:text-lg"
            >
              <option value="">-- Select a country --</option>
              {countries &&
                countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
            </select>
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
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700 max-lg:rounded-xl max-lg:py-4 max-lg:text-2xl"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 max-lg:mt-8 max-lg:text-lg">
          Already have an account ?&nbsp;
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
