import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import { useSearch } from "../components/utils/SearchContext";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";
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

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term),
    );
    setSearchedProducts(filtered);
  }, [searchTerm, products]);

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

  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    const sorted = [...searchedProducts].sort((a, b) => {
      return sortOrder === "desc" ? a.price - b.price : b.price - a.price;
    });
    setSearchedProducts(sorted);
  };

  const renderProductList = () => {
    if (searchedProducts.length === 0) {
      return (
        <p className="w-full text-2xl text-center text-gray-600">
          No products match your search...
        </p>
      );
    }

    return searchedProducts.map((product) => (
      <article
        key={product.id}
        className="fade-in mb-10 flex rounded-xl border-2 border-neutral-300 shadow-sm"
      >
        <img
          src={product.image_url}
          alt={`${product.brand} ${product.name}`}
          className="h-auto w-100 rounded-l-xl bg-white object-contain px-20 max-2xl:w-70 max-2xl:px-3 max-lg:py-3 max-md:w-60 max-md:px-0 max-md:py-0"
        />

        <section className="flex flex-col justify-between py-2 pl-10 max-lg:pl-5">
          <Link
            to={`/products/${product.id}`}
            className="mr-5 border-y border-transparent hover:border-teal-400 hover:bg-teal-50"
          >
            <h3 className="pb-4 text-3xl max-lg:pb-2">{product.brand}</h3>
            <h4 className="max-w-[90%] text-2xl font-light max-md:text-xl">
              {product.name}
            </h4>
          </Link>

          <div className="flex items-end pr-15 max-md:pr-0">
            <div className="flex flex-col pr-10 max-md:pr-5">
              {product.stock > 0 ? (
                <span className="text-2xl text-green-600">● Available</span>
              ) : (
                <span className="text-xl text-red-600">● Out of Stock</span>
              )}
              <span className="pt-4 text-3xl font-medium">${product.price}</span>
            </div>

            <AddToCart
              product_id={product.id}
              brand={product.brand}
              name={product.name}
              image_url={product.image_url}
              price={product.price}
            />
          </div>
        </section>
      </article>
    ));
  };

  return (
    <section
      aria-labelledby="products-title"
      className="max-xl:pt-[140px] max-lg:pt-60"
    >
      <Helmet>
        <title>Products | Guitar Shop</title>
      </Helmet>

      {/* Hidden main title for accessibility */}
      <h1 id="products-title" className="sr-only">Product Catalog</h1>

      {/* Desktop filter header */}
      <div className="mx-[10%] mb-10 flex justify-between border-b-2 border-neutral-300 pt-[140px] pb-2 max-2xl:mx-[5%] max-xl:hidden max-lg:mx-0">
        <h2 className="text-4xl">Filters</h2>
        <button
          onClick={handleSort}
          className="text-2xl font-light hover:cursor-pointer hover:text-neutral-500"
        >
          Order by: {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>

      <div className="fade-in mb-20 flex-col items-center max-xl:flex">
        {/* Mobile filter & sort controls */}
        <div className="mb-10 flex h-fit w-[90%] rounded-lg border-2 border-teal-600 p-1 xl:hidden">
          <button
            onClick={toggleFilterVisibility}
            className="w-1/2 border-r-2 border-teal-400 text-center text-2xl hover:text-neutral-500"
          >
            Filter
          </button>
          <button
            onClick={handleSort}
            className="w-1/2 text-center text-2xl hover:text-neutral-500"
          >
            Order by: {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>

        <div className="flex min-h-[100vh] justify-between px-[10%] max-2xl:px-[5%]">
          {/* Filter Sidebar */}
          {!loading && (
            <Filter
              priceMax={priceMax}
              onFilterChange={handleFilterChange}
              filterVisibility={filterVisibility}
              toggleFilterVisibility={toggleFilterVisibility}
            />
          )}

          {/* Product List Section */}
          <section
            aria-label="Product Results"
            className={`flex w-full flex-col pl-20 filter max-xl:pl-0 ${blurBackground && "blur"} xl:blur-none`}
          >
            {loadingProducts ? (
              <div className="flex w-full justify-center">
                <img src={loadingGif} alt="Loading products..." />
              </div>
            ) : (
              renderProductList()
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
