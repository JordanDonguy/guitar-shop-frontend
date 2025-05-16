import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";

export default function UserProfile() {
  const { user, setUser, loadingAuth } = useAuth();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWithCsrf(`${BASE_URL}/user`)
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setCountries(data.countries);
      })
      .catch((err) => {
        console.error("Auth error:", err);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedUser = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      postal_code: formData.get("postal_code"),
      country: formData.get("country"),
    };

    try {
      const response = await fetchWithCsrf(`${BASE_URL}/user/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      toast.success("Your profile has been updated !", {
        position: "bottom-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Could not update user profile", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  }

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-fit w-full justify-center">
      <Helmet>
        <title>User Profile | Guitar Shop</title>
      </Helmet>
      <div className="w-3/4 rounded-2xl bg-white p-10 pb-15 shadow-lg max-xl:ml-15 max-xl:w-full max-lg:ml-0">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  defaultValue={user.first_name}
                  required
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  defaultValue={user.last_name}
                  required
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-1">
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
                  defaultValue={user.email}
                  required
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  defaultValue={user.phone_number}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              Address
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  defaultValue={user.street}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={user.city}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  defaultValue={user.state}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  defaultValue={user.postal_code}
                  className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={user.country || ""}
                  onChange={(e) =>
                    setUser({ ...user, country: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border bg-white px-4 py-2 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {!user.country && (
                    <option value="" disabled>
                      -- Select a country --
                    </option>
                  )}
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
