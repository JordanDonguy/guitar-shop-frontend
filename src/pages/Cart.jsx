import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";

export default function Cart() {
  const { user, loadingAuth } = useAuth();
  const [guestCart, setGuestCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="fade-in mx-auto w-1/2 pt-[140px] max-xl:w-3/4 max-lg:w-[90%]">
      <Helmet>
        <title>Cart | Guitar Shop</title>
      </Helmet>
      {user ? (
        <>
          {products.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              cartId={cartId}
              updateFinalPrice={updateFinalPrice}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
          <div className="my-12 flex w-full items-center justify-between">
            <div className="text-2xl font-light">
              Total price :{" "}
              <span className="font-semibold">
                $ {Number(finalPriceFormatted || 0).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mb-12">
            <Link
              to={user ? "/checkout" : "/auth/login"}
              state={{ total_price: finalPrice }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-green-700 px-6 py-3 text-lg text-white hover:cursor-pointer hover:bg-green-500"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            {guestCart && guestCart.length > 0 ? (
              guestCart.map((product) => (
                <CartProduct
                  key={product.product_id}
                  product={product}
                  updateLocalCart={updateLocalCart}
                />
              ))
            ) : (
              <h2 className="text-xl">Your cart is empty.</h2>
            )}
          </div>
          <div className="my-12 flex items-center justify-between">
            <div className="text-3xl font-light">
              Total price :{" "}
              <span className="font-semibold">$ {guestTotalFormatted}</span>
            </div>
          </div>
          <div className="mb-12">
            <Link to={user ? "/checkout" : "/auth/login"}>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-700 px-6 py-3 text-lg text-white hover:cursor-pointer hover:bg-green-500"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
