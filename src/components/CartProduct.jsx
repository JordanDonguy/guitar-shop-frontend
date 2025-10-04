import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { BASE_URL } from "../utils/api";
import { fetchWithCsrf } from "../utils/fetchWithCsrf";

export default function CartProduct({
  product,
  cartId,
  updateFinalPrice,
  handleQuantityChange,
  updateLocalCart,
}) {
  const { user } = useAuth();

  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.quantity * product.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productId = formData.get("productId");
    const quantity = Number(formData.get("quantity"));

    try {
      const response = await fetchWithCsrf(`${BASE_URL}/cart/updateQuantity`, {
        method: "POST",
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to update cart");
      const newQuantity = productQuantity + Number(quantity);
      setProductQuantity(newQuantity);
      setPrice(product.price * newQuantity);
      updateFinalPrice(Number(product.price), quantity);
      handleQuantityChange(productId, newQuantity);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClick = (productId, quantity) => {
    updateLocalCart(productId, quantity);
    const newQuantity = productQuantity + Number(quantity);
    setProductQuantity(newQuantity);
    setPrice(product.price * newQuantity);
  };

  return (
    <div
      key={product.productId}
      className="fade-in my-5 flex items-center rounded-xl border-2 border-neutral-300 shadow-md"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-fit w-60 rounded-l-xl bg-white object-cover p-5"
      />
      <div className="ml-6 flex min-h-60 flex-col justify-between py-2">
        <Link
          to={`/products/${product.productId}`}
          className="border-y border-transparent hover:border-teal-400 hover:bg-teal-50"
        >
          <h2 className="pb-2 text-2xl font-medium">{product.brandName}</h2>
          <h3 className="text-xl font-light max-md:text-lg max-md:font-normal">
            {product.productName}
          </h3>
        </Link>
        <div>
          <div className="flex w-30 items-center justify-between gap-2 rounded-xl border bg-white text-xl">
            {!user ? (
              <>
                <button
                  type="button"
                  className="rounded-l-xl border-r px-3 py-1 hover:cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOnClick(product.productId, -1)}
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  -
                </button>
                <span className="w-1/3 text-center" aria-live="polite">
                  {productQuantity}
                </span>
                <button
                  type="button"
                  className="rounded-r-xl border-l px-3 py-1 hover:cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOnClick(product.productId, 1)}
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  +
                </button>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmit} id={`remove-one-${product.id}`}>
                  <input
                    type="hidden"
                    name="productId"
                    value={product.productId}
                  />
                  <input type="hidden" name="cart_id" value={cartId} />
                  <input type="hidden" name="quantity" value="-1" />
                  <button
                    type="submit"
                    className="rounded-l-xl border-r px-3 py-1 hover:cursor-pointer hover:bg-gray-200"
                    aria-label={`Remove one ${product.name} from cart`}
                  >
                    -
                  </button>
                </form>
                <span className="w-1/3 text-center" aria-live="polite">
                  {productQuantity}
                </span>
                <form onSubmit={handleSubmit} id={`add-one-${product.id}`}>
                  <input
                    type="hidden"
                    name="productId"
                    value={product.productId}
                  />
                  <input type="hidden" name="cart_id" value={cartId} />
                  <input type="hidden" name="quantity" value="1" />
                  <button
                    type="submit"
                    className="rounded-r-xl border-l px-3 py-1 hover:cursor-pointer hover:bg-gray-200"
                    aria-label={`Add one ${product.name} to cart`}
                  >
                    +
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="mt-4 text-3xl font-medium" aria-live="polite">
            $ {price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
