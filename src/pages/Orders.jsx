import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuth } from "../components/utils/AuthContext";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { BASE_URL } from "../components/utils/api";
import { toast } from "react-toastify";
import Order from "../components/Order";

export default function Orders() {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) {
      navigate("/login");
    }
  }, [user, loadingAuth, navigate]);

  useEffect(() => {
    if (loadingAuth) return;
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
        <meta
          name="description"
          content="View and track your Guitar-Shop orders and manage your purchase history with ease and security."
        />
      </Helmet>

      <section
        className="h-fit w-3/4 rounded-2xl bg-white p-10 shadow-lg max-2xl:ml-15 max-2xl:w-full max-lg:ml-0 max-md:p-3"
        aria-label="User Orders Section"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          My Orders
        </h1>

        {loading && (
          <div
            className="flex w-full justify-center"
            aria-live="polite"
            aria-busy="true"
          >
            <img src="/img/loading.gif" alt="Loading orders" />
          </div>
        )}

        <div>{!loading && renderOrders()}</div>
      </section>
    </div>
  );
}
