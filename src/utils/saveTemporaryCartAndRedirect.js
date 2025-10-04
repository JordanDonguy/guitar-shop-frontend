import { toast } from "react-toastify";
import { fetchWithCsrf } from "./fetchWithCsrf";
import { BASE_URL } from "./api";

export async function saveTemporaryCartAndRedirect(cart, redirectUrl) {
  try {
    const response = await fetchWithCsrf(`${BASE_URL}/cart/saveTemporaryCart`, {
      method: "POST",
      body: JSON.stringify({ temporaryCart: cart }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      console.error("Cart save failed:", error);
      toast.error(error || "Failed to save temporary cart", {
        position: "bottom-center",
        autoClose: 4000,
      });
      return;
    }

    localStorage.removeItem("cart");
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error in saveTemporaryCartAndRedirect:", error);
    toast.error("Something went wrong while saving your cart.", {
      position: "bottom-center",
      autoClose: 4000,
    });
  }
}
