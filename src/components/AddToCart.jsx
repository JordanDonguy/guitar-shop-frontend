import { useEffect } from "react";
import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import addToCart from "../assets/img/add-to-cart.png";
import { toast } from "react-toastify";

export default function AddToCart({
  product_id,
  brand,
  name,
  image_url,
  price,
}) {
  const { user } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    if (user) {
      try {
        const response = await fetchWithCsrf(`${BASE_URL}/cart/add`, {
          method: "POST",
          body: JSON.stringify({ product_id, user }),
        });
        const result = await response.json();
        toast.success("Item added to cart!", {
          position: "bottom-center",
          autoClose: 2000,
        });
      } catch (err) {
        console.error("Error adding item to cart:", err);
      }
    } else {
      try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = cart.findIndex((item) => item.product_id === product_id);

        if (index !== -1) {
          cart[index].quantity += 1;
        } else {
          // Add a new product structure (add other fields as needed)
          cart.push({
            product_id,
            quantity: 1,
            brand,
            name,
            image_url,
            price,
            // optionally include: name, image_url, price, etc.
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast("Item added to cart!", {
          position: "bottom-center",
          autoClose: 2000,
        });
      } catch (err) {
        console.error("Error adding to local cart:", err);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} id="add-to-cart-form">
      <button
        type="submit"
        className="flex w-60 items-center justify-center rounded-full border p-2 shadow-md hover:cursor-pointer hover:bg-teal-50 hover:outline max-lg:w-20 max-lg:h-20"
      >
        <img src={addToCart} className="w-10 max-lg:w-12" />
        <span className="pl-5 text-2xl max-lg:hidden">Add to cart</span>
      </button>

    </form>
  );
}
