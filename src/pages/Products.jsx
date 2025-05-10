import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";
import { BASE_URL } from "../components/utils/api";
import { Link } from "react-router-dom";

export default function Products() {
    const BASE_URL = "http://localhost:3000";

    const [products, setProducts] = useState([]);
    const [priceMax, setPriceMax] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const [filter, setFilter] = useState({
        categoryIds: [],
        brandIds: [],
        priceRange: [0, priceMax],
    });

    useEffect(() => {
        fetch(`${BASE_URL}/products`)
            .then(res => res.json())
            .then(data => {
                const maxPrice = Math.max(...data.products.map(product => product.price));
                setPriceMax(maxPrice);
                setFilter(prev => ({ ...prev, priceRange: [0, maxPrice] }));
                setLoading(false); // Done loading
            })
            .catch(err => console.log(err));
    }, []);

    // Fetch products based on filter changes
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!filter || !priceMax) return;
        const params = new URLSearchParams();

        if (filter.categoryIds.length > 0) {
            filter.categoryIds.forEach(id => params.append('categoryId', id));
        }
        if (filter.brandIds.length > 0) {
            filter.brandIds.forEach(id => params.append('brandId', id));
        }
        if (filter.priceRange[0] > 0) {
            params.append('minPrice', filter.priceRange[0]);
        }
        if (filter.priceRange[1] < priceMax) {
            params.append('maxPrice', filter.priceRange[1]);
        }

        fetch(`${BASE_URL}/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(err => console.log(err));
    }, [filter]);

    const renderProducts = () => {
        return products.map(product => (
            <div key={product.id} class="flex mb-10 pl-10 p-5 bg-white rounded-xl shadow-sm">
                <img src={product.image_url} alt="product image" class="w-60 h-60" />
                <div class="flex flex-col justify-between pl-10 py-2">
                    <Link class="border-y border-transparent hover:border-teal-400 hover:bg-teal-50" to={`/products/${product.id}`}>
                        <div>
                            <h3 class="text-3xl pb-4">{product.brand}</h3>
                            <h4 class="text-2xl font-light">{product.name}</h4>
                        </div>
                    </Link>
                    <div class="flex items-end">
                        <div class="flex flex-col pr-10">
                            {product.stock > 0 ? (
                                <span class="text-green-600 text-2xl">● Available</span>
                            ) : (
                                <span class="text-red-600 text-xl">● Out of Stock</span>
                            )}
                            <span class="text-3xl font-medium pt-4">$ {product.price}</span>
                        </div>
                        <AddToCart />
                    </div>
                </div>
            </div>
        ));
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div class="flex justify-between pt-[140px] px-[10%] font-onest min-h-[100vh]">
            {/* Render Filter component only after priceMax is loaded */}
            {!loading && <Filter priceMax={priceMax} onFilterChange={handleFilterChange} />}
            <div class="flex flex-col pl-20 w-full">
                {renderProducts()}
            </div>
        </div>
    );
}
