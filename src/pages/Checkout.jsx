import { useState, useEffect } from 'react';
import { useAuth } from '../components/utils/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../components/utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = () => {
    const { user, loadingAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { total_price } = location.state || {};

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        setCardNumber(value);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
        }
        setExpiry(value);
    };

    const handleExpiryBlur = () => {
        const value = expiry.replace(/\D/g, '');
        if (value.length === 2) {
            setExpiry(`${value}/`);
        }
    };

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        setCvv(value);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ cardNumber, expiry, cvv, total_price, user }),
            });
            if (response.ok) {
                const result = await response.json();
                navigate("/user", {state: { toastMessage: '🎉 Thank you! Your order was successful.' }});
            } else {
                const error = await response.json();
                toast.error(`Error: ${error.message || 'Something went wrong'}`, {
                    position: "bottom-center",
                    autoClose: 4000,
                })
            };
        } catch (err) {
            console.error('Error adding item to cart:', err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (loadingAuth) return;
        if (!user) {
            navigate('/auth/login');
        };
        if (!total_price) {
            navigate('/cart')
        }
    }, [user, total_price, navigate, loadingAuth]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleCheckout}
            >
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Payment Details
                </h2>

                <div className="text-right text-sm text-gray-400 mb-4">
                    Accepted: 💳 💰 🧾
                </div>

                <div className="text-right text-2xl pb-5 font-light">
                    Total price : <span className="font-semibold">$ {total_price}</span>
                </div>

                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700 mb-2">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="expiry" className="block text-gray-700 mb-2">
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        required
                        value={expiry}
                        onChange={handleExpiryChange}
                        onBlur={handleExpiryBlur}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="cvv" className="block text-gray-700 mb-2">
                        CVV
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        required
                        value={cvv}
                        onChange={handleCvvChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <input type="hidden" name="total_price" value={total_price} />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Pay Now
                </button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default CheckoutForm;
