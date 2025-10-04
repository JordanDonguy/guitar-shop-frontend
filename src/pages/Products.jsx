import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../utils/api";
import { useSearch } from "../contexts/SearchContext";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";

export default function Products() {
  const { searchTerm } = useSearch();

  const [products, setProducts] = useState([]);
  const [priceMax, setPriceMax] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);

  const [filterVisibility, setFilterVisibility] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  const [sortOrder, setSortOrder] = useState("desc");

  const [filter, setFilter] = useState({
    categoryIds: [],
    brandIds: [],
    priceRange: [0, priceMax],
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Get max price to init filter
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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Fetch products based on filters, search, and pagination
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
    if (searchTerm.trim() !== "") {
      params.append("search", searchTerm.trim());
    }

    params.append("sort", sortOrder);
    params.append("page", page);
    params.append("limit", limit);

    fetch(`${BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoadingProducts(false);
      })
      .catch((err) => console.log(err));
  }, [filter, priceMax, page, searchTerm, sortOrder]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    if (loadingProducts) return;
    if (products.length === 0) return setPage(0);
    setPage(1);
  }, [filter, searchTerm, sortOrder]);

  // Change the sort order and reset to page 1
  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleFilterVisibility = () => {
    setFilterVisibility((prev) => !prev);
    setBlurBackground((prev) => !prev);
  };

  const renderProductList = () => {
    if (products.length === 0) {
      return (
        <p className="w-full text-center text-2xl text-gray-600">
          No products match your search...
        </p>
      );
    }

    return products.map((product) => (
      <article
        key={product.id}
        className="fade-in mb-10 flex rounded-xl border-2 border-neutral-300 shadow-sm"
      >
        {loadingImage ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-w-100 items-center justify-center max-2xl:min-w-70 max-md:min-w-60"
          >
            <img src="/img/loading.gif" alt="Loading..." />
          </div>
        ) : (
          ""
        )}
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          onLoad={() => setLoadingImage(false)}
          className={`h-auto w-100 rounded-l-xl bg-white object-contain px-20 max-2xl:w-70 max-2xl:px-3 max-lg:py-3 max-md:w-60 max-md:px-0 max-md:py-0 ${
            loadingImage ? "hidden" : ""
          }`}
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
              <span className="pt-4 text-3xl font-medium">
                ${product.price}
              </span>
            </div>

            <AddToCart
              productId={product.id}
              brand={product.brand}
              name={product.name}
              imageUrl={product.imageUrl}
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
      className="fade-in min-h-screen max-xl:pt-[140px] max-lg:pt-60"
    >
      <Helmet>
        <title>Products | Guitar Shop</title>
        <meta
          name="description"
          content="Explore our wide selection of high-quality guitars and accessories at Guitar-Shop. Find the perfect instrument to match your style and skill level."
        />
      </Helmet>

      {/* Hidden main title for accessibility */}
      <h1 id="products-title" className="sr-only">
        Product Catalog
      </h1>

      {/* Desktop filter header */}
      <div className="mx-[10%] mb-10 flex justify-between border-b-2 border-neutral-300 pt-30 pb-2 max-2xl:mx-[5%] max-xl:hidden max-lg:mx-0">
        <h2 className="text-4xl">Filters</h2>
        <button
          onClick={handleSort}
          className="text-2xl font-light hover:cursor-pointer hover:text-neutral-500"
        >
          Order by: {sortOrder === "desc" ? "↓" : "↑"}
        </button>
      </div>

      <div className="fade-in mb-20 flex-col items-center px-[10%] max-2xl:px-[5%] max-xl:flex max-lg:px-4">
        {/* Mobile filter & sort controls */}
        <div className="mb-10 flex h-fit w-full rounded-lg border-2 border-teal-600 p-1 xl:hidden">
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

        <div className="flex min-h-[100vh] justify-between">
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
            className={`flex min-h-screen w-full flex-col pl-20 filter max-xl:pl-0 ${blurBackground && "blur"} xl:blur-none`}
          >
            {loadingProducts ? (
              <div className="flex w-full justify-center">
                <img src="/img/loading.gif" alt="Loading products..." />
              </div>
            ) : (
              renderProductList()
            )}

            {/* Pagination buttons */}
            {!loadingProducts && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className={`rounded border px-4 py-2 ${page > 1 && "hover:cursor-pointer hover:bg-teal-200"} disabled:opacity-50`}
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`rounded border px-4 py-2 ${page < totalPages && "hover:cursor-pointer hover:bg-teal-200"} disabled:opacity-50`}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
