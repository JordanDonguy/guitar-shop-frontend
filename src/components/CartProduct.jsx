import { useAuth } from "./utils/AuthContext";
import { useState } from "react";
import { BASE_URL } from "./utils/api";
import { Link } from "react-router-dom";

export default function CartProduct({product, cartId, updateFinalPrice, handleQuantityChange, updateLocalCart}) {
    const { user } = useAuth();
    const [productQuantity, setProductQuantity] = useState(product.quantity)
    const [price, setPrice] = useState(product.quantity * product.price)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const product_id = formData.get('product_id');
        const quantity = Number(formData.get('quantity'));

        try {
            const response = await fetch(`${BASE_URL}/cart/updateQuantity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id,
                    cart_id: cartId,
                    quantity
                })
            });

            if (!response.ok) throw new Error('Failed to update cart');
            const newQuantity = productQuantity + Number(quantity);
            setProductQuantity(newQuantity);
            setPrice(product.price * newQuantity);
            updateFinalPrice(Number(product.price), quantity);
            handleQuantityChange(product_id, newQuantity)
        } catch (err) {
            console.error(err);
        }
    };

    const handleOnClick = (product_id, quantity) => {
        updateLocalCart(product_id, quantity);
        const newQuantity = productQuantity + Number(quantity);
        setProductQuantity(newQuantity);
        setPrice(product.price * newQuantity)
    }

    return (
        <div key={product.product_id} className="flex items-center shadow-md rounded-xl border-2 border-neutral-300 my-5">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-60 h-full p-5 bg-white object-cover rounded-l-xl"
            />
            <div className="ml-6 flex flex-col justify-between h-56 py-2">
                
                <Link
                    to={`/products/${product.product_id}`}
                    className="border-y border-transparent hover:border-teal-400 hover:bg-teal-50"
                >
                    <h1 className="text-2xl font-medium pb-2">{product.brand}</h1>
                    <h1 className="text-xl font-light">{product.name}</h1>
                </Link>
                <div>
                    <div className="text-xl flex items-center justify-between w-30 gap-2 bg-white border rounded-xl">
                        {!user ? (
                            <>
                                <button
                                    className="px-3 py-1 rounded-l-xl border-r hover:bg-gray-200 hover:cursor-pointer"
                                    onClick={() => (
                                        handleOnClick(product.product_id, -1)
                                    )}
                                >
                                    -
                                </button>
                                <span className="w-1/3 text-center">{productQuantity}</span>
                                <button
                                    className="px-3 py-1 rounded-r-xl border-l hover:bg-gray-200 hover:cursor-pointer"
                                    onClick={() => handleOnClick(product.product_id, 1)}
                                >
                                    +
                                </button>
                            </>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit} id="remove-one-form">
                                    <input type="hidden" name="product_id" value={product.product_id} />
                                    <input type="hidden" name="cart_id" value={cartId} />
                                    <input type="hidden" name="quantity" value="-1" />
                                    <button type="submit" className="px-3 py-1 rounded-l-xl border-r hover:bg-gray-200 hover:cursor-pointer">-</button>
                                </form>
                                <span className="w-1/3 text-center">{productQuantity}</span>
                                <form onSubmit={handleSubmit} id="add-one-form">
                                    <input type="hidden" name="product_id" value={product.product_id} />
                                    <input type="hidden" name="cart_id" value={cartId} />
                                    <input type="hidden" name="quantity" value="1" />
                                    <button type="submit" className="px-3 py-1 rounded-r-xl border-l hover:bg-gray-200 hover:cursor-pointer">+</button>
                                </form>
                            </>
                        )}
                    </div>
                    <div className="text-3xl font-medium mt-4">
                      $ {price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}