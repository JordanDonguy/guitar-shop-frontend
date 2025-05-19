import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { BASE_URL } from "./utils/api";
import loadingGif from "../assets/img/loading.gif";

export default function Order({
  order_id,
  created_at,
  total_price,
  first_name,
  last_name,
}) {
  const date = new Date(created_at);
  const [itemsVisible, setItemsVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short", // May
    day: "numeric", // 13
    year: "numeric", // 2025
  }).format(date);

  function renderItems() {
    return items.map((item) => (
      <div
        key={item.id}
        className="my-5 flex h-40 rounded-lg border border-teal-300 bg-teal-50"
      >
        <img
          src={item.image_url}
          className="w-40 rounded-l-lg border-r border-teal-200 bg-white p-2"
        />
        <div className="flex flex-col justify-between py-2 pl-4">
          <Link to={`/products/${item.id}`} className="hover:underline">
            <div className="text-xl font-medium">{item.brand_name}</div>
            <div className="font-regular text-lg">{item.name}</div>
          </Link>
          <div>
            <div>Quantity : {item.quantity}</div>
            <div className="text-xl font-semibold">
              $ {item.quantity * item.unit_price}
            </div>
          </div>
        </div>
      </div>
    ));
  }

  async function toggleItemsVisible() {
    if (!itemsVisible) {
      setLoading(true);
      try {
        const response = await fetchWithCsrf(`${BASE_URL}/orders/items?order_id=${order_id}`);
        const data = await response.json();
        setItems(data.items);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    }
    setItemsVisible((prev) => !prev);
  }



  return (
    <div className="mb-10 rounded-lg border-2 border-neutral-300 p-4 shadow-lg">
      <div className="flex justify-between">
        <div>
          <div className="text-lg">
            Order passed on :{" "}
            <span className="font-semibold">{formattedDate}</span>
          </div>
          <div className="text-lg">
            Price : $ <span className="font-bold">{total_price}</span>
          </div>
          <button
            onClick={toggleItemsVisible}
            className="mt-5 rounded-2xl px-2 py-1 text-lg shadow-md outline outline-teal-600 hover:cursor-pointer hover:bg-neutral-100 hover:outline-2"
          >
            {!itemsVisible ? "→" : "↓"} Items
          </button>
        </div>
        <div className="text-lg">
          Order passed by :{" "}
          <span className="font-semibold">
            {first_name} {last_name}
          </span>
        </div>
      </div>
      <div>{loading && <div className="flex w-full justify-center"><img src={loadingGif} /></div>}</div>
      <div>{itemsVisible && renderItems()}</div>
    </div>
  );
}
