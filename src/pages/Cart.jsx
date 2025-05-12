import { useEffect, useState } from "react";
import { BASE_URL } from "../components/utils/api";
import { useAuth } from "../components/utils/AuthContext";
import CartProduct from "../components/CartProduct";

export default function Cart() {
    const { user, setUser } = useAuth();
    const [guestCart, setGuestCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [cartId, setCartId] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (!user) {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setGuestCart(storedCart);
        } else {
            fetch(`${BASE_URL}/cart/?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data.products);
                    setFinalPrice(data.final_price);
                    setCartId(data.cart_id)
                })
                .catch(err => console.log(err))
        };
    }, [user]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            setProducts(prev => prev.filter(p => p.product_id != productId));
        } else {
            setProducts(prev =>
                prev.map(p => p.product_id === productId ? { ...p, quantity: newQuantity } : p)
            );
        }
    }

    const updateFinalPrice = (productPrice, productQuantity) => {
        setFinalPrice(prevFinalPrice => prevFinalPrice + productPrice * productQuantity);
    }

    const updateLocalCart = (itemId, delta) => {
        let cart = [...guestCart];
        const index = cart.findIndex(item => item.product_id === itemId);
        if (index !== -1) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            setGuestCart(cart);

        }
    };

    const addOne = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const product_id = formData.get('product_id');

        try {
            const response = await fetch(`${BASE_URL}/cart/addOne`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id,
                    cart_id: cartId
                })
            });

            if (!response.ok) throw new Error('Failed to update cart');
        } catch (err) {
            console.error(err);
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
        <div className="w-1/2 mx-auto pt-[140px]">
            {user ? (
                <>
                    {products.map(product => 
                    <CartProduct 
                    key={product.id} 
                    product={product} 
                    cartId={cartId} 
                    updateFinalPrice={updateFinalPrice} 
                    handleQuantityChange={handleQuantityChange}
                    />)}
                    <div className="flex justify-between items-center my-12 w-full">
                        <div className="text-2xl font-light">Total price : <span className="font-semibold">$ {Number(finalPriceFormatted || 0).toFixed(2)}</span></div>
                    </div>
                    <div className="mb-12">
                        <form action="/checkout/initiate" method="POST">
                            <input type="hidden" name="cart_id" value={cartId} />
                            <input type="hidden" name="total_price" value={Number(finalPriceFormatted || 0).toFixed(2)} />
                            <button
                                type="submit"
                                className="bg-green-700 hover:bg-green-500 hover:cursor-pointer text-white px-6 py-3 rounded-lg text-lg w-full"
                            >
                                Checkout
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        {guestCart && guestCart.length > 0 ? (
                            guestCart.map(product => <CartProduct key={product.product_id} product={product} updateLocalCart={updateLocalCart} />)
                        ) : (
                            <h2 className="text-xl">Your cart is empty.</h2>
                        )}
                    </div>
                    <div className="flex justify-between items-center my-12">
                        <div className="text-3xl font-light">Total price : <span className="font-semibold">$ {guestTotalFormatted}</span></div>
                    </div>
                    <div className="mb-12">
                        <form action="/checkout" method="GET">
                            <input type="hidden" name="checkout" />
                            <button
                                type="submit"
                                className="bg-green-700 hover:bg-green-500 hover:cursor-pointer text-white px-6 py-3 rounded-lg text-lg w-full"
                            >
                                Checkout
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
