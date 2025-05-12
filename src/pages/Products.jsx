import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import AddToCart from "../components/AddToCart";
import { BASE_URL } from "../components/utils/api";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../components/utils/AuthContext";

export default function Products() {
    const BASE_URL = "http://localhost:3000";
    const { user } = useAuth();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [priceMax, setPriceMax] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const [filter, setFilter] = useState({
        categoryIds: [],
        brandIds: [],
        priceRange: [0, priceMax],
    });

    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        window.scrollTo(0, 0);
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
        };
        if (searchQuery) {
            params.append('search', searchQuery);
        };


        fetch(`${BASE_URL}/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(err => console.log(err));
    }, [filter, searchQuery]);

    const renderProducts = () => {
        if (products.length == 0) return <div className="text-2xl">No products match your search...</div>
        return products.map(product => (
            <div key={product.id} className="flex mb-10 rounded-xl shadow-sm border-2 border-neutral-300">
                <img src={product.image_url} alt="product image" className="w-100 h-60 bg-white px-20 rounded-l-xl" />
                <div className="flex flex-col justify-between pl-10 py-2">
                    <Link className="border-y border-transparent hover:border-teal-400 hover:bg-teal-50" to={`/products/${product.id}`}>
                        <div>
                            <h3 className="text-3xl pb-4">{product.brand}</h3>
                            <h4 className="text-2xl font-light">{product.name}</h4>
                        </div>
                    </Link>
                    <div className="flex items-end">
                        <div className="flex flex-col pr-10">
                            {product.stock > 0 ? (
                                <span className="text-green-600 text-2xl">● Available</span>
                            ) : (
                                <span className="text-red-600 text-xl">● Out of Stock</span>
                            )}
                            <span className="text-3xl font-medium pt-4">$ {product.price}</span>
                        </div>
                        <AddToCart product_id={product.id} brand={product.brand} name={product.name} image_url={product.image_url} price={product.price} />
                    </div>
                </div>
            </div>
        ));
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div className="flex justify-between pt-[140px] px-[10%] font-onest min-h-[100vh]">
            {/* Render Filter component only after priceMax is loaded */}
            {!loading && <Filter priceMax={priceMax} onFilterChange={handleFilterChange} />}
            <div className="flex flex-col pl-20 w-full">
                {renderProducts()}
            </div>
        </div>
    );
}
