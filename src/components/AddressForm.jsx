import { useState, useEffect } from "react";
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { toast } from "react-toastify";

export default function AddressForm({ handleAddressButton }) {
  const { setUser } = useAuth();

  const [countries, setCountries] = useState([]);
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data.countries))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await fetchWithCsrf(`${BASE_URL}/user/address`, {
        method: "POST",
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error("Failed to create address");
      }

      // Fetch new user infos and update user context
      const updatedUserRes = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
      });
      const updatedUserData = await updatedUserRes.json();
      setUser(updatedUserData.user);

      toast.success("Your address has been created!", {
        position: "bottom-center",
        autoClose: 3000,
      });

      // Close the form
      handleAddressButton();
    } catch (error) {
      console.log(error);
      toast.error("Could not create your address", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 rounded-xl border bg-neutral-100 p-10 shadow-lg max-lg:w-3/4 max-md:w-[90%]"
    >
      <button
        type="button"
        onClick={handleAddressButton}
        aria-label="Close address form"
        className="float-right rounded-full border px-3 py-1 text-xl font-semibold hover:cursor-pointer hover:bg-neutral-300"
      >
        X
      </button>

      <h2 className="text-2xl text-neutral-700 mb-6">Enter address details:</h2>

      <fieldset className="grid grid-cols-1 gap-4 space-y-6 border-0 p-0 m-0">
        <legend className="sr-only">Address Details</legend>

        <div>
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
            value={addressData.street}
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
            value={addressData.city}
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
            value={addressData.state}
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
            value={addressData.postal_code}
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
            value={addressData.country}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-lg border bg-white px-4 py-2 hover:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">-- Select a country --</option>
            {countries &&
              countries.map((country) => (
                <option key={country.code} value={country.code} className="text-xl">
                  {country.name}
                </option>
              ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-6 w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700 max-lg:rounded-xl max-lg:py-4 max-lg:text-2xl"
      >
        Create Address
      </button>
    </form>
  );
}
