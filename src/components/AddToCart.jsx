import { BASE_URL } from "./utils/api";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import addToCart from "../assets/img/add-to-cart.webp";
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
        await fetchWithCsrf(`${BASE_URL}/cart/add`, {
          method: "POST",
          body: JSON.stringify({ product_id, user }),
        });
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
          cart.push({
            product_id,
            quantity: 1,
            brand,
            name,
            image_url,
            price,
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
    <form onSubmit={handleSubmit} id={`add-to-cart-${product_id}`}>
      <button
        type="submit"
        aria-label={`Add product ${product_id} to cart`}
        className="flex w-60 items-center justify-center rounded-full border p-2 shadow-md hover:cursor-pointer hover:bg-teal-50 hover:outline max-lg:h-17 max-lg:w-17"
      >
        <img src={addToCart} className="w-10" alt="" aria-hidden="true" />
        <span className="pl-5 text-2xl max-lg:hidden">Add to cart</span>
      </button>
    </form>
  );
}
