import { useState, useEffect } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { BASE_URL } from "./utils/api";
import DelayedMount from "./utils/DelayedMount";

export default function Filter({
  onFilterChange,
  priceMax,
  FilterVisibility,
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
      className={`w-1/5 max-xl:w-[90%] ${FilterVisibility ? `max-xl:fixed` : `max-xl:hidden`} z-10 max-xl:rounded-xl max-xl:border max-xl:bg-[rgba(230,230,230,0.9)] max-xl:p-10`}
    >
      <div className="xl:bg-white p-2 sticky top-[140px] h-[80vh] border-r-2 border-teal-400 max-xl:h-[50vh] max-xl:border-none">
        <div className="flex h-full flex-col overflow-hidden">

          <div className="absolute right-0 top-0 hidden max-xl:flex items-center justify-between">
            <button
              onClick={toggleFilterVisibility}
              className="rounded-lg border px-2 text-3xl hover:cursor-pointer hover:text-teal-600"
            >
              X
            </button>
          </div>

          <div className="fade-in scrollbar-hide flex-1 overflow-y-auto mr-10">
            {/* Categories Section */}
            <div className="max-xl:w-fit ">
              <h4
                className="text-xl font-light hover:cursor-pointer hover:text-teal-600 "
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
                    <span className="pl-2 text-lg">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Section */}
            <div className="max-xl:w-fit">
              <h4
                className="pt-10 text-xl font-light hover:cursor-pointer hover:text-teal-600"
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
                    <span className="pl-2 text-lg">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <h4
              className="pt-10 text-xl font-light hover:cursor-pointer hover:text-teal-600 max-xl:w-fit"
              onClick={() => setPriceVisible(!isPriceVisible)}
            >
              {isPriceVisible ? "↓" : "→"} Price
            </h4>
            <div
              className="pt-2 w-full"
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
