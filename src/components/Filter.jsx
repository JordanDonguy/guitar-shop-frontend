import { useState, useEffect } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { BASE_URL } from "./utils/api";

export default function Filter({
  onFilterChange,
  priceMax,
  filterVisibility,
  toggleFilterVisibility,
}) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brandIds, setBrandIds] = useState([]);
  const [priceRange, setPriceRange] = useState([0, priceMax]);

  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const [isBrandsVisible, setBrandsVisible] = useState(false);
  const [isPriceVisible, setPriceVisible] = useState(false);

  // Fetch categories and brands on mount
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
        setBrands(data.brands);
      })
      .catch((err) => console.log(err));
  }, []);

  // Trigger filter change in parent component
  useEffect(() => {
    onFilterChange({ categoryIds, brandIds, priceRange });
  }, [categoryIds, brandIds, priceRange]);

  // Handle checkbox changes
  const categoryCheckboxChange = (e, categoryId) => {
    if (e.target.checked) {
      setCategoryIds((prev) => [...prev, categoryId]);
    } else {
      setCategoryIds((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const brandCheckboxChange = (e, brandId) => {
    if (e.target.checked) {
      setBrandIds((prev) => [...prev, brandId]);
    } else {
      setBrandIds((prev) => prev.filter((id) => id !== brandId));
    }
  };

  return (
    <div
      className={`w-1/5 max-xl:w-[90%] ${filterVisibility ? `max-xl:fixed` : `max-xl:hidden`} z-10 max-xl:rounded-xl max-xl:border max-xl:bg-[rgba(230,230,230,0.9)] max-xl:p-10`}
    >
      <div className="sticky top-[140px] h-[80vh] rounded-r-xl border-neutral-300 p-2 max-xl:h-[50vh] max-xl:border-none xl:border-2 xl:bg-white xl:shadow-sm">
        <div className="flex h-full flex-col overflow-hidden">
          <div className="absolute top-0 right-0 hidden items-center justify-between max-xl:flex">
            <button
              onClick={toggleFilterVisibility}
              className="rounded-full border px-3 py-1 text-xl font-semibold hover:bg-neutral-300"
            >
              X
            </button>
          </div>

          <div className="fade-in scrollbar-hide mr-10 flex-1 overflow-y-auto">
            {/* Categories Section */}
            <div className="max-xl:w-fit">
              <h4
                className="text-xl font-light hover:cursor-pointer hover:text-teal-600 max-lg:text-3xl"
                onClick={() => setCategoriesVisible(!isCategoriesVisible)}
              >
                {isCategoriesVisible ? "↓" : "→"} Categories
              </h4>
              <div
                className="pt-2"
                style={{ display: isCategoriesVisible ? "block" : "none" }}
              >
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="group flex items-center pb-2 hover:cursor-pointer hover:text-teal-600"
                  >
                    <input
                      type="checkbox"
                      id={category.id}
                      name={category.name}
                      className="peer hidden"
                      onChange={(e) => categoryCheckboxChange(e, category.id)}
                      checked={categoryIds.includes(category.id)}
                    />
                    <div className="h-5 w-5 rounded border border-gray-400 transition-colors group-hover:bg-teal-200 peer-checked:bg-teal-400"></div>
                    <span className="pl-2 text-lg max-lg:text-2xl max-lg:pl-4">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Section */}
            <div className="max-xl:w-fit">
              <h4
                className="pt-10 text-xl font-light hover:cursor-pointer hover:text-teal-600 max-lg:text-3xl"
                onClick={() => setBrandsVisible(!isBrandsVisible)}
              >
                {isBrandsVisible ? "↓" : "→"} Brands
              </h4>
              <div
                className="pt-2"
                style={{ display: isBrandsVisible ? "block" : "none" }}
              >
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="group flex items-center pb-2 hover:cursor-pointer hover:text-teal-600"
                  >
                    <input
                      type="checkbox"
                      id={brand.id}
                      name={brand.name}
                      className="peer hidden"
                      onChange={(e) => brandCheckboxChange(e, brand.id)}
                      checked={brandIds.includes(brand.id)}
                    />
                    <div className="h-5 w-5 rounded border border-gray-400 transition-colors group-hover:bg-teal-200 peer-checked:bg-teal-400"></div>
                    <span className="pl-2 text-lg max-lg:text-2xl max-lg:pl-4">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <h4
              className="pt-10 text-xl font-light hover:cursor-pointer hover:text-teal-600 max-xl:w-fit max-lg:text-3xl"
              onClick={() => setPriceVisible(!isPriceVisible)}
            >
              {isPriceVisible ? "↓" : "→"} Price
            </h4>
            <div
              className="w-full pt-2"
              style={{ display: isPriceVisible ? "block" : "none" }}
            >
              <PriceRangeSlider
                min={0}
                max={priceMax}
                value={priceRange}
                onChange={setPriceRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
