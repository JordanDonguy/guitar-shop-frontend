import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/utils/AuthContext";
import { BASE_URL } from "../components/utils/api";
import { toast, ToastContainer } from "react-toastify";
import Order from "../components/Order";

export default function Orders() {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, loadingAuth]);

  useEffect(() => {
    if (loadingAuth) return;
    window.scrollTo(0, 0);

    fetch(`${BASE_URL}/orders/?userId=${user.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []); // make sure it's an array
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // also stop loading on error
      });
  }, [user, loadingAuth]);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  }, [location.state]);

  function renderOrders() {
    if (orders.length == 0)
      return <div className="text-xl">No orders found... </div>;
    return orders.map((order) => (
      <Order
        key={order.id}
        created_at={order.created_at}
        total_price={order.total_price}
        first_name={order.first_name}
        last_name={order.last_name}
        items={order.items}
      />
    ));
  }

  return (
    <div className="mb-30 flex w-full justify-center">
      <Helmet>
        <title>Orders | Guitar Shop</title>
      </Helmet>
      <ToastContainer />
      <div className="w-3/4 rounded-2xl bg-white p-10 shadow-lg max-xl:ml-15 max-xl:w-full max-lg:ml-0">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          My Orders
        </h1>
        <div>{!loading && renderOrders()}</div>
      </div>
    </div>
  );
}
