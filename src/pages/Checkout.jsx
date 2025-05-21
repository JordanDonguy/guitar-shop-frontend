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

  const [loadingPaiement, setLoadingPaiement] = useState(false);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    // Add spaces every 4 digits
    value = value.replace(/(.{4})/g, "$1 ").trim();
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
    const rawCardNumber = cardNumber.replace(/\s/g, "");
    setLoadingPaiement(true);
    try {
      const response = await fetchWithCsrf(`${BASE_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify({ cardNumber: rawCardNumber, expiry, cvv }),
      });
      if (response.ok) {
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
      toast.error("Network or unexpected error. Please try again.", {
        position: "bottom-center",
        autoClose: 4000,
      });
    } finally {
      setLoadingPaiement(false);
    }
  };

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
    <div className="fade-in flex min-h-screen items-center justify-center p-4 pt-[100px] max-lg:min-h-fit max-lg:mt-[20%] max-lg:mb-0 max-lg:pt-0">
      <Helmet>
        <title>Checkout | Guitar Shop</title>
      </Helmet>
      <form
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg max-lg:max-w-[90%]"
        onSubmit={handleCheckout}
      >
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
          Payment Details
        </h2>

        <div className="mb-4 text-right text-sm text-gray-400 max-lg:text-lg">
          Accepted: 💳 💰 🧾
        </div>

        <div className="pb-5 text-right text-2xl font-light">
          Total price :{" "}
          <span className="font-semibold">$ {total_price.toFixed(2)}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="mb-2 block text-gray-700 max-lg:text-lg">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none max-lg:text-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expiry" className="mb-2 block text-gray-700 max-lg:text-lg">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none max-lg:text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cvv" className="mb-2 block text-gray-700 max-lg:text-lg">
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
            className="w-full rounded border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none max-lg:text-lg"
          />
        </div>

        <input type="hidden" name="total_price" value={total_price} />

        <button
          type="submit"
          disabled={loadingPaiement}
          className="w-full rounded bg-blue-600 py-3 text-white transition hover:cursor-pointer hover:bg-blue-700 max-lg:rounded-xl max-lg:py-4 max-lg:text-2xl"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
