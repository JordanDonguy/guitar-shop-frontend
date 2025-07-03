import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { BASE_URL } from "../components/utils/api";
import DelayedMount from "../components/utils/DelayedMount";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { LayoutContext } from "../components/Layout";
import CartProduct from "../components/CartProduct";

export default function Cart() {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const { handleAddressButton } = useContext(LayoutContext);

  const [guestCart, setGuestCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setGuestCart(storedCart);
    } else {
      fetchWithCsrf(`${BASE_URL}/cart/?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setFinalPrice(data.final_price);
          setCartId(data.cart_id);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setProducts((prev) => prev.filter((p) => p.product_id != productId));
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === productId ? { ...p, quantity: newQuantity } : p,
        ),
      );
    }
  };

  const updateFinalPrice = (productPrice, productQuantity) => {
    setFinalPrice(
      (prevFinalPrice) => prevFinalPrice + productPrice * productQuantity,
    );
  };

  const updateLocalCart = (itemId, delta) => {
    let cart = [...guestCart];
    const index = cart.findIndex((item) => item.product_id === itemId);
    if (index !== -1) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setGuestCart(cart);
    }
  };

  const guestTotal = guestCart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  const finalPriceFormatted = Number(finalPrice || 0).toFixed(2);
  const guestTotalFormatted = Number(guestTotal || 0).toFixed(2);

  function handleCheckoutClick() {
    if (!user) return navigate("/login");
    if (!user.street) return handleAddressButton();
    if (finalPrice === 0) {
      toast("🛒 Your cart is empty !", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }
    return navigate("/checkout", { state: { total_price: finalPrice } });
  }

  return (
    <div className="fade-in mx-auto min-h-screen w-1/2 pt-30 max-xl:w-3/4 max-lg:min-h-fit max-lg:w-full max-lg:px-4 max-lg:pt-55">
      <Helmet>
        <title>Cart | Guitar Shop</title>
         <meta
          name="description"
          content="View and manage the items in your cart at Guitar-Shop. Update quantities, remove products, and proceed to secure checkout."
        />
      </Helmet>

      <section aria-labelledby="cart-heading">
        <h1
          id="cart-heading"
          className="mb-8 w-full border-b-2 border-neutral-300 pb-6 text-center text-4xl font-bold"
        >
          My Cart
        </h1>

        {user ? (
          <>
            <DelayedMount delay={300}>
              {products.map((product) => (
                <CartProduct
                  key={product.id}
                  product={product}
                  cartId={cartId}
                  updateFinalPrice={updateFinalPrice}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </DelayedMount>

            {products.length < 1 && (
              <p className="text-xl" role="status">
                Your cart is empty.
              </p>
            )}

            <div className="my-12 flex w-full items-center justify-between">
              <div className="text-2xl font-light">
                Total price:{" "}
                <span className="font-semibold">$ {finalPriceFormatted}</span>
              </div>
            </div>

            <div className="mb-12">
              {!user.street && (
                <div className="mb-10 text-lg">
                  → You don&apos;t have a shipping address yet. Please create
                  one before checking out by clicking{" "}
                  <button
                    type="button"
                    onClick={handleAddressButton}
                    className="text-blue-600 hover:cursor-pointer hover:text-blue-800"
                  >
                    here
                  </button>
                  .
                </div>
              )}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full rounded-lg bg-green-700 px-6 py-3 text-lg text-white transition hover:cursor-pointer hover:bg-green-500"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              {guestCart.length > 0 ? (
                guestCart.map((product) => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    updateLocalCart={updateLocalCart}
                  />
                ))
              ) : (
                <p className="text-xl" role="status">
                  Your cart is empty.
                </p>
              )}
            </div>

            <div className="my-12 flex items-center justify-between">
              <div className="text-3xl font-light">
                Total price:{" "}
                <span className="font-semibold">$ {guestTotalFormatted}</span>
              </div>
            </div>

            <div className="mb-12">
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full rounded-lg bg-green-700 px-6 py-3 text-lg text-white transition hover:cursor-pointer hover:bg-green-500"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
