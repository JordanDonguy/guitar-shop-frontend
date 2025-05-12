import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../components/utils/api";
import Markdown from "react-markdown";
import AddToCart from "../components/AddToCart";

export default function SingleProduct() {
    const { id } = useParams();
    const [productInfos, setProductInfos] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // This scrolls the page to the top when selecting a product from Products.jsx
    }, [id]);

    useEffect(() => {
        fetch(`${BASE_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => setProductInfos(data.product))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="font-sans pt-[140px] px-[10%] bg-gray-100 mb-30">
            {/* SECTION 1 */}
            <div className="flex mb-10 shadow-lg rounded-xl">
                <div className="inline-flex justify-center w-full bg-teal-50 rounded-xl">
                    <img
                        src={productInfos.image_url2}
                        alt={productInfos.name}
                        className="max-h-[80vh] w-[70%] object-contain bg-white rounded-l-xl"
                    />

                    <div className="flex-1 w-[30%] pl-5 pt-15 border-l border-teal-200">
                        <h1 className="text-4xl font-bold pb-5">{productInfos.brand}</h1>
                        <h1 className="text-2xl pb-10">{productInfos.name}</h1>

                        <div
                            className={`text-xl my-2 pb-5 ${productInfos.stock > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {productInfos.stock > 0 ? '● Available' : '● Out of Stock'}
                        </div>

                        <div className="text-4xl my-2 pb-10">
                            ${Number(productInfos.price).toFixed(2)}
                        </div>

                        <AddToCart 
                        product_id={productInfos.id} 
                        brand={productInfos.brand} 
                        name={productInfos.name} 
                        image_url={productInfos.image_url} 
                        price={productInfos.price} />
                    </div>
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="flex flex-col items-center  my-24 mb-10 mx-auto leading-relaxed bg-teal-50 shadow-lg rounded-xl">
                <h2 className="text-4xl font-semibold p-10 text-center ">Description</h2>
                <div className="prose-lg px-[5%] py-5">
                    <Markdown>{productInfos.description}</Markdown>
                </div>
                 <iframe
                        src={productInfos.video_url}
                        frameBorder="0"
                        allowFullScreen
                        className="w-[90%] h-200 my-5 mb-15 rounded-xl shadow-xl"
                    ></iframe>
            </div>

            {/* SECTION 3 */}
            <div className="flex flex-col items-center w-full my-24">
           
                <div className="bg-teal-50 w-full flex justify-center border-x border-teal-400 bg-teal-50 shadow-lg">
                   
                </div>
            </div>
        </div>
    )
}
