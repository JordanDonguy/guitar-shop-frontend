import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { BASE_URL } from "../components/utils/api";
import { toast } from "react-toastify";
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
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    if (loadingAuth) return;
    window.scrollTo(0, 0);
    fetchWithCsrf(`${BASE_URL}/orders/`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, loadingAuth]);

  useEffect(() => {
    let toastShown = false;
    if (location.state?.toastMessage && !toastShown) {
      toastShown = true;
      toast.success(location.state.toastMessage, {
        position: "bottom-center",
        autoClose: 5000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, []);

  function renderOrders() {
    if (orders.length == 0)
      return <div className="text-xl">No orders found... </div>;
    return orders.map((order) => (
      <Order
        key={order.id}
        order_id={order.id}
        created_at={order.created_at}
        total_price={order.total_price}
        first_name={order.first_name}
        last_name={order.last_name}
      />
    ));
  }

  return (
    <div className="flex w-full justify-center">
      <Helmet>
        <title>Orders | Guitar Shop</title>
      </Helmet>
      <div className="h-fit w-3/4 rounded-2xl bg-white p-10 shadow-lg max-xl:ml-15 max-xl:w-full max-lg:ml-0">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          My Orders
        </h1>
        <div>{!loading && renderOrders()}</div>
      </div>
    </div>
  );
}
