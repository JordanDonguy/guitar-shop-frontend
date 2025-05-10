import { useState, useEffect } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import { BASE_URL } from './utils/api';

export default function Filter({ onFilterChange, priceMax }) {
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
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
                setBrands(data.brands);
            })
            .catch(err => console.log(err));
    }, []);

    // Trigger filter change in parent component
    useEffect(() => {
        onFilterChange({ categoryIds, brandIds, priceRange });
    }, [categoryIds, brandIds, priceRange]);

    // Handle checkbox changes
    const categoryCheckboxChange = (e, categoryId) => {
        if (e.target.checked) {
            setCategoryIds(prev => [...prev, categoryId]);
        } else {
            setCategoryIds(prev => prev.filter(id => id !== categoryId));
        }
    };

    const brandCheckboxChange = (e, brandId) => {
        if (e.target.checked) {
            setBrandIds(prev => [...prev, brandId]);
        } else {
            setBrandIds(prev => prev.filter(id => id !== brandId));
        }
    };

    return (
        <div class="w-1/5">
            <div class="sticky top-[140px] h-[80vh] border-r-2 border-teal-400">
                <div class="flex flex-col h-full overflow-hidden">
                    <h3 class="text-4xl pb-5">Filters</h3>
                    <div class="flex-1 overflow-y-auto scrollbar-hide pr-2">
                        {/* Categories Section */}
                        <h4
                            class="text-xl font-light pt-10 hover:text-teal-600 hover:cursor-pointer"
                            onClick={() => setCategoriesVisible(!isCategoriesVisible)}
                        >
                            {isCategoriesVisible ? '↓' : '→'} Categories
                        </h4>
                        <div class="pt-2" style={{ display: isCategoriesVisible ? 'block' : 'none' }}>
                            {categories.map(category => (
                                <label key={category.id} class="flex items-center pb-2 group hover:cursor-pointer hover:text-teal-600">
                                    <input
                                        type="checkbox"
                                        id={category.id}
                                        name={category.name}
                                        class="hidden peer"
                                        onChange={e => categoryCheckboxChange(e, category.id)}
                                        checked={categoryIds.includes(category.id)}
                                    />
                                    <div class="w-5 h-5 rounded border border-gray-400 group-hover:bg-teal-200 peer-checked:bg-teal-400 transition-colors"></div>
                                    <span class="text-lg pl-2">{category.name}</span>
                                </label>
                            ))}
                        </div>

                        {/* Brands Section */}
                        <h4
                            class="text-xl font-light pt-10 hover:text-teal-600 hover:cursor-pointer"
                            onClick={() => setBrandsVisible(!isBrandsVisible)}
                        >
                            {isBrandsVisible ? '↓' : '→'} Brands
                        </h4>
                        <div class="pt-2" style={{ display: isBrandsVisible ? 'block' : 'none' }}>
                            {brands.map(brand => (
                                <label key={brand.id} class="flex items-center pb-2 group hover:cursor-pointer hover:text-teal-600">
                                    <input
                                        type="checkbox"
                                        id={brand.id}
                                        name={brand.name}
                                        class="hidden peer"
                                        onChange={e => brandCheckboxChange(e, brand.id)}
                                        checked={brandIds.includes(brand.id)}
                                    />
                                    <div class="w-5 h-5 rounded border border-gray-400 group-hover:bg-teal-200 peer-checked:bg-teal-400 transition-colors"></div>
                                    <span class="text-lg pl-2">{brand.name}</span>
                                </label>
                            ))}
                        </div>

                        {/* Price Range */}
                        <h4
                            class="text-xl font-light pt-10 hover:text-teal-600 hover:cursor-pointer"
                            onClick={() => setPriceVisible(!isPriceVisible)}
                        >
                            {isPriceVisible ? '↓' : '→'} Price
                        </h4>
                        <div class="pt-2" style={{ display: isPriceVisible ? 'block' : 'none' }}>
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
