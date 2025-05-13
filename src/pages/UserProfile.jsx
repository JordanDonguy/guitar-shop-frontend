import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { toast, ToastContainer } from 'react-toastify';

export default function UserProfile() {
    const { user, setUser, loadingAuth } = useAuth();
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
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

    useEffect(() => {
        if (loadingAuth) return
        if (!user) {
            navigate("/auth/login")
        }
    }, [user, loadingAuth]),

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage, {
                position: 'bottom-center',
                autoClose: 5000,
            });
        }
    }, [location.state]);


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const updatedUser = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            phone_number: formData.get('phone_number'),
            street: formData.get('street'),
            city: formData.get('city'),
            state: formData.get('state'),
            postal_code: formData.get('postal_code'),
            country: formData.get('country')
        };

        try {
            const response = await fetch(`${BASE_URL}/user/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            setSuccessMessage(data.message);
        } catch (error) {
            setErrorMessage('Could not update user profile');
        }
    };

    if (user === null) {
        return <div>Loading...</div>;
    };

    return (
        <div className="flex w-full justify-center pt-[140px] mb-30">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Profile</h1>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div classNameName="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div classNameName="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" id="first_name" name="first_name" defaultValue={user.first_name} required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" id="last_name" name="last_name" defaultValue={user.last_name} required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" defaultValue={user.email} required
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone_number" name="phone_number" defaultValue={user.phone_number}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Address</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                                <input type="text" id="street" name="street" defaultValue={user.street}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" id="city" name="city" defaultValue={user.city}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input type="text" id="state" name="state" defaultValue={user.state}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                <input type="text" id="postal_code" name="postal_code" defaultValue={user.postal_code}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                <select
                                    id="country"
                                    name="country"
                                    required
                                    value={user.country || ''}
                                    onChange={(e) => setUser({ ...user, country: e.target.value })}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg bg-white hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 hover:cursor-pointer transition">
                            Update Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
