import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../components/utils/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../components/utils/api";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { toast } from "react-toastify";


const CheckoutForm = () => {
  const { user, loadingAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { total_price } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setExpiry(value);
  };

  const handleExpiryBlur = () => {
    const value = expiry.replace(/\D/g, "");
    if (value.length === 2) {
      setExpiry(`${value}/`);
    }
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithCsrf(`${BASE_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify({ cardNumber, expiry, cvv, total_price, user }),
      });
      if (response.ok) {
        const result = await response.json();
        navigate("/user/orders", {
          state: { toastMessage: "🎉 Thank you! Your order was successful." },
        });
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message || "Something went wrong"}`, {
          position: "bottom-center",
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      navigate("/auth/login");
    }
    if (!total_price) {
      navigate("/cart");
    }
  }, [user, total_price, navigate, loadingAuth]);

  return (
    <div className="fade-in flex min-h-screen items-center justify-center bg-gray-100 p-4 pt-[100px]">
      <Helmet>
        <title>Checkout | Guitar Shop</title>
      </Helmet>
      <form
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
        onSubmit={handleCheckout}
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Payment Details
        </h2>

        <div className="mb-4 text-right text-sm text-gray-400">
          Accepted: 💳 💰 🧾
        </div>

        <div className="pb-5 text-right text-2xl font-light">
          Total price :{" "}
          <span className="font-semibold">$ {total_price.toFixed(2)}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="mb-2 block text-gray-700">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expiry" className="mb-2 block text-gray-700">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cvv" className="mb-2 block text-gray-700">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <input type="hidden" name="total_price" value={total_price} />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-3 text-white transition hover:cursor-pointer hover:bg-blue-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
