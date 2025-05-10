import addToCart from "../assets/img/add-to-cart.png";

export default function AddToCart() {
    return (
        <form>
            <button type="submit" class="flex justify-center items-center w-60 p-2 border rounded-4xl shadow-md hover:bg-teal-100 hover:cursor-pointer">
                <img src={addToCart} class="w-10" />
                <span class="text-2xl pl-5">Add to cart</span>
            </button>
        </form>
    )
}
