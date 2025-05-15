import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import DelayedMount from "../components/utils/DelayedMount";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";
import { BASE_URL } from "../components/utils/api";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/utils/AuthContext";

export default function Products() {
  const BASE_URL = "http://localhost:3000";
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [priceMax, setPriceMax] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [FilterVisibility, setFilterVisibility] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  const [filter, setFilter] = useState({
    categoryIds: [],
    brandIds: [],
    priceRange: [0, priceMax],
  });

  // Fetch the max price of all products and set the filters
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const maxPrice = Math.max(
          ...data.products.map((product) => product.price),
        );
        setPriceMax(maxPrice);
        setFilter((prev) => ({ ...prev, priceRange: [0, maxPrice] }));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch products based on filter changes
  useEffect(() => {
    if (!filter || !priceMax) return;
    const params = new URLSearchParams();
    if (filter.categoryIds.length > 0) {
      filter.categoryIds.forEach((id) => params.append("categoryId", id));
    }
    if (filter.brandIds.length > 0) {
      filter.brandIds.forEach((id) => params.append("brandId", id));
    }
    if (filter.priceRange[0] > 0) {
      params.append("minPrice", filter.priceRange[0]);
    }
    if (filter.priceRange[1] < priceMax) {
      params.append("maxPrice", filter.priceRange[1]);
    }
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    fetch(`${BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoadingProducts(false);
      })
      .catch((err) => console.log(err));
  }, [filter, searchQuery]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleFilterVisibility = () => {
    if (FilterVisibility) {
      setFilterVisibility(false);
      setBlurBackground(false);
    } else {
      setFilterVisibility(true);
      setBlurBackground(true);
    }
  };

  const renderProducts = () => {
    if (products.length == 0)
      return <div className="text-2xl">No products match your search...</div>;

    return products.map((product) => (
      <div
        key={product.id}
        className="flex mb-10 rounded-xl border-2 border-neutral-300 shadow-sm"
      >
        <img
          src={product.image_url}
          alt="product image"
          className="h-auto w-100 rounded-l-xl bg-white object-contain px-20 max-2xl:w-70 max-2xl:px-5 max-lg:py-5"
        />
        <div className="flex flex-col justify-between py-2 pl-10 max-lg:pl-5">
          <Link
            className="mr-5 border-y border-transparent hover:border-teal-400 hover:bg-teal-50"
            to={`/products/${product.id}`}
          >
            <div>
              <h3 className="pb-4 text-3xl max-lg:pb-2">{product.brand}</h3>
              <h4 className="text-2xl font-light">{product.name}</h4>
            </div>
          </Link>
          <div className="flex items-end pr-15">
            <div className="flex flex-col pr-10">
              {product.stock > 0 ? (
                <span className="text-2xl text-green-600">● Available</span>
              ) : (
                <span className="text-xl text-red-600">● Out of Stock</span>
              )}
              <span className="pt-4 text-3xl font-medium">
                $ {product.price}
              </span>
            </div>
            <AddToCart
              product_id={product.id}
              brand={product.brand}
              name={product.name}
              image_url={product.image_url}
              price={product.price}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <DelayedMount daly={90}>
      <div className="fade-in mb-20 flex flex-col items-center pt-[140px]">
        <Helmet>
          <title>Products | Guitar Shop</title>
        </Helmet>
        <div className="mb-10 flex h-fit w-[90%] rounded-lg border-2 border-teal-600 p-1 xl:hidden">
          <button
            onClick={toggleFilterVisibility}
            className="w-1/2 border-r-2 border-teal-400 text-center text-2xl hover:cursor-pointer hover:text-neutral-500"
          >
            Filter
          </button>
        </div>
        <div className="flex min-h-[100vh] justify-between px-[10%] max-xl:px-[5%]">
          {/* Render Filter component only after priceMax is loaded */}
          {!loading && (
            <Filter
              priceMax={priceMax}
              onFilterChange={handleFilterChange}
              FilterVisibility={FilterVisibility}
              toggleFilterVisibility={toggleFilterVisibility}
            />
          )}
          <div
            className={`flex w-full flex-col pl-20 filter max-xl:pl-0 ${blurBackground && `blur`} xl:blur-none`}
          >
            {!loadingProducts && renderProducts()}
          </div>
        </div>
      </div>
    </DelayedMount>
  );
}
