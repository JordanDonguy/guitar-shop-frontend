import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import { useSearch } from "../components/utils/SearchContext";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";
import { Link } from "react-router-dom";
import loadingGif from "../assets/img/loading.gif";

export default function Products() {
  const { searchTerm } = useSearch();

  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [priceMax, setPriceMax] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [filterVisibility, setFilterVisibility] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  const [sortOrder, setSortOrder] = useState("desc");

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

    fetch(`${BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setSearchedProducts(data.products);
        setLoadingProducts(false);
      })
      .catch((err) => console.log(err));
  }, [filter, priceMax]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleFilterVisibility = () => {
    if (filterVisibility) {
      setFilterVisibility(false);
      setBlurBackground(false);
    } else {
      setFilterVisibility(true);
      setBlurBackground(true);
    }
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term),
    );
    setSearchedProducts(filtered);
  }, [searchTerm, products]);

  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sorted = [...searchedProducts].sort((a, b) => {
      return sortOrder === "desc" ? a.price - b.price : b.price - a.price;
    });
    setSearchedProducts(sorted);
  };

  const renderProducts = () => {
    if (searchedProducts.length == 0)
      return (
        <div className="w-full text-2xl">No products match your search...</div>
      );

    return searchedProducts.map((product) => (
      <div
        key={product.id}
        className="fade-in mb-10 flex rounded-xl border-2 border-neutral-300 shadow-sm"
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
    <div className="max-xl:pt-[140px]">
      <div className="mx-[10%] mb-10 flex justify-between border-b-2 border-neutral-300 pt-[140px] pb-2 max-2xl:mx-[5%] max-xl:hidden">
        <h3 className="text-4xl">Filters</h3>
        <button
          onClick={handleSort}
          className="text-2xl font-light hover:cursor-pointer hover:text-neutral-500"
        >
          Order by : {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>
      <div className="fade-in mb-20 flex-col items-center max-xl:flex">
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
          <button
            onClick={handleSort}
            className="w-1/2 text-center text-2xl hover:cursor-pointer hover:text-neutral-500"
          >
            Order by : {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>
        <div className="flex min-h-[100vh] justify-between px-[10%] max-2xl:px-[5%]">
          {/* Render Filter component only after priceMax is loaded */}
          {!loading && (
            <Filter
              priceMax={priceMax}
              onFilterChange={handleFilterChange}
              filterVisibility={filterVisibility}
              toggleFilterVisibility={toggleFilterVisibility}
            />
          )}
          <div
            className={`flex w-full flex-col pl-20 filter max-xl:pl-0 ${blurBackground && `blur`} xl:blur-none`}
          >
            {loadingProducts && <div className="flex w-full justify-center"><img src={loadingGif} /></div>}
            {!loadingProducts && renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
}
