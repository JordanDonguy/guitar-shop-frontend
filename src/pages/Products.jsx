import { useState, useEffect } from "react";
import addToCart from "../assets/img/add-to-cart.png";

export default function Products() {
    const base_URL = "http://localhost:3000";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [isCategoriesVisible, setCategoriesVisible] = useState(false);
    const [isBrandsVisible, setBrandsVisible] = useState(false);

    const [categoryIds, setCategoryIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [priceMin, setPriceMin] = useState(null);
    const [priceMax, setPriceMax] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams();

        if (categoryIds.length > 0) { categoryIds.forEach(id => params.append('categoryId', id)) }
        if (brandIds.length > 0) { brandIds.forEach(id => params.append('brandId', id)) }
        if (priceMin) params.append('priceMin', priceMin);
        if (priceMax) params.append('priceMax', priceMax);

        fetch(`${base_URL}/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setCategories(data.categories);
                setBrands(data.brands)
            })
            .catch(err => console.log(err));
    }, [categoryIds, brandIds, priceMin, priceMax]);

    // Render products cards
    function renderProducts() {
        return products.map(product =>
            <div key={product.id} class="flex mb-10 pl-10 p-5 bg-white rounded-xl shadow-sm">
                <img src={product.image_url} alt="product image" class="w-60 h-60" />
                <div class="flex flex-col justify-between pl-10 py-2">
                    <div>
                        <h3 class="text-3xl pb-4">{product.brand}</h3>
                        <h4 class="text-2xl font-light">{product.name}</h4>
                    </div>
                    <div class="flex items-end">
                        <div class="flex flex-col pr-10">
                            {product.stock > 0 ? (
                                <span className="text-green-600 text-2xl">● Available</span>
                            ) : (
                                <span className="text-red-600 text-xl">● Out of Stock</span>
                            )}
                            <span class="text-3xl font-medium pt-4">$ {product.price}</span>
                        </div>
                        <form>
                            <button type="submit" class="flex justify-center items-center w-60 p-2 border rounded-4xl shadow-md hover:bg-teal-100 hover:cursor-pointer">
                                <img src={addToCart} class="w-10" />
                                <span class="text-2xl pl-5">Add to cart</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };

    // Render categories filters
    function renderCategories() {
        return categories.map(category =>
            <label key={category.id} class="flex items-center pb-2 group hover:cursor-pointer hover:text-teal-600">
                <input type="checkbox" id={category.id} name={category.name} class="hidden peer"
                    onChange={(e) => categoryCheckboxChange(e, category.id)}
                    checked={categoryIds.includes(category.id)}
                />
                <div class="w-5 h-5 rounded border border-gray-400 group-hover:bg-teal-200 peer-checked:bg-teal-400 transition-colors"></div>
                <span class="text-lg pl-2">{category.name}</span>
            </label>
        )
    };

    function categoryCheckboxChange(e, categoryId) {
        if (e.target.checked) {
            setCategoryIds(prev => [...prev, categoryId]);
        } else {
            setCategoryIds(prev => prev.filter(id => id !== categoryId));
        }
    };

    function toggleCategories() {
        setCategoriesVisible((prevState) => !prevState);
    };


    // Render Brands filters
    function renderBrands() {
        return brands.map(brand =>
            <label key={brand.id} class="flex items-center pb-2 group hover:cursor-pointer hover:text-teal-600">
                <input type="checkbox" id={brand.id} name={brand.name} class="hidden peer"
                onChange={(e) => brandCheckboxChange(e, brand.id)}
                checked={brandIds.includes(brand.id)} 
                />
                <div class="w-5 h-5 rounded border border-gray-400 group-hover:bg-teal-200 peer-checked:bg-teal-400 transition-colors"></div>
                <span class="text-lg pl-2">{brand.name}</span>
            </label>
        )
    };

    function brandCheckboxChange(e, brandId) {
        if (e.target.checked) {
            setBrandIds(prev => [...prev, brandId]);
        } else {
            setBrandIds(prev => prev.filter(id => id !== brandId));
        }
    };

    function toggleBrands() {
        setBrandsVisible((prevState) => !prevState);
    };

    return (
        <div class="flex justify-between pt-[140px] px-[10%] font-onest">
            <div class="w-1/5">
                <div class="sticky top-[140px] h-[80vh] border-r-2 border-teal-400">
                    <div class="flex flex-col h-full overflow-hidden">
                        <h3 class="text-4xl pb-5">Filters</h3>

                        <div class="flex-1 overflow-y-auto scrollbar-hide pr-2">
                            <h4 class="text-xl font-light pt-10 hover:text-teal-600 hover:cursor-pointer" onClick={toggleCategories}>
                                {isCategoriesVisible ? "↓" : "→"} Categories
                            </h4>
                            <div class="pt-4" style={{ display: isCategoriesVisible ? 'block' : 'none' }}>
                                {renderCategories()}
                            </div>

                            <h4 class="text-xl font-light pt-10 hover:text-teal-600 hover:cursor-pointer" onClick={toggleBrands}>
                                {isBrandsVisible ? "↓" : "→"}  Brands
                            </h4>
                            <div class="pt-4" style={{ display: isBrandsVisible ? 'block' : 'none' }}>
                                {renderBrands()}
                            </div>

                            <h4 class="text-xl font-light pt-10">→ Price Range</h4>
                            <h4 class="text-xl font-light pt-10">→ Availability</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col pl-20 w-full">
                {renderProducts()}
            </div>
        </div>
    )
}
