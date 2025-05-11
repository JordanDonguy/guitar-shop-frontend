import { useState, useEffect } from "react";
import { BASE_URL } from "../components/utils/api";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/user`, {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) throw new Error('Not authenticated');
            return res.json();
        })
        .then(data => {
            setUser(data.user);
            setCountries(data.countries);
            setError(data.error)
        })
        .catch(err => {
            console.error('Auth error:', err);
        });
    }, []);

    function handleSubmit(e) {
        
    };

       if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <div class="flex w-full justify-center pt-[140px]">
            <div class="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
                <h1 class="text-3xl font-bold text-center mb-6 text-gray-800">My Profile</h1>
                {error && (
                    <div class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form class="space-y-6">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" id="first_name" name="first_name" defaultValue={user.first_name} required
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" id="last_name" name="last_name" defaultValue={user.last_name} required
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div class="sm:col-span-2">
                                <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" defaultValue={user.email} required
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div class="sm:col-span-2">
                                <label htmlFor="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone_number" name="phone_number" defaultValue={user.phone_number}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold text-gray-700 mb-4">Address</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="sm:col-span-2">
                                <label htmlFor="street" class="block text-sm font-medium text-gray-700">Street</label>
                                <input type="text" id="street" name="street" defaultValue={user.street}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="city" class="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" id="city" name="city" defaultValue={user.city}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="state" class="block text-sm font-medium text-gray-700">State</label>
                                <input type="text" id="state" name="state" defaultValue={user.state}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="postal_code" class="block text-sm font-medium text-gray-700">Postal Code</label>
                                <input type="text" id="postal_code" name="postal_code" defaultValue={user.postal_code}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="country" class="block text-sm font-medium text-gray-700">Country</label>
                                <select
                                    id="country"
                                    name="country"
                                    required
                                    defaultValue={user.country || ''}
                                    class="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <div class="pt-4">
                        <button type="submit"
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 hover:cursor-pointer transition">
                            Update Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
