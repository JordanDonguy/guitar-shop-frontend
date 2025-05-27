import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import DelayedMount from "../components/utils/DelayedMount";
import AddToCart from "../components/AddToCart";
import Markdown from "react-markdown";
import loadingGif from "../assets/img/loading.gif";

export default function SingleProduct() {
  const { id } = useParams();

  const [productInfos, setProductInfos] = useState({});
  const [loading, setLoading] = useState(true);

  // Track loading for each image (desktop and mobile views)
  const [loadingImage1, setLoadingImage1] = useState(true);
  const [loadingImage2, setLoadingImage2] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLoadingImage1(true);
    setLoadingImage2(true);

    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductInfos(data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <main
          role="status"
          aria-live="polite"
          className="flex h-screen w-full items-center justify-center"
        >
          <img src={loadingGif} alt="Loading..." />
        </main>
      ) : (
        <main className="min-h-screen">
          <section className="fade-in mb-20 bg-gray-100 px-[10%] pt-[140px] max-2xl:px-[5%] max-lg:pt-60">
            <DelayedMount>
              <Helmet>
                <title>{`${productInfos.name}`} | Guitar Shop</title>
              </Helmet>

              {/* SECTION 1: Product overview */}
              <article
                aria-label={`Overview of ${productInfos.name} guitar`}
                className="fade-in mb-10 flex rounded-xl shadow-lg"
              >
                <div className="flex w-full justify-center rounded-xl bg-teal-50 max-lg:flex-col">
                  {/* Desktop image */}
                  {loadingImage2 && (
                    <div className="flex max-h-[75vh] w-[65%] items-center justify-center rounded-l-xl bg-white px-[2%] max-lg:hidden" aria-busy="true">
                      <img src={loadingGif} alt="Loading product image..." />
                    </div>
                  )}
                  <img
                    src={productInfos.image_url2}
                    alt={productInfos.name}
                    className={`max-h-[75vh] w-[65%] rounded-l-xl bg-white object-contain px-[2%] max-lg:hidden ${loadingImage2 ? "hidden" : ""
                      }`}
                    onLoad={() => setLoadingImage2(false)}
                    onError={() => setLoadingImage2(false)}
                  />

                  {/* Mobile image */}
                  {loadingImage1 && (
                    <div className="hidden h-110 w-full items-center justify-center rounded-l-xl bg-white px-[2%] py-5 max-lg:block" aria-busy="true">
                      <img src={loadingGif} alt="Loading product image..." />
                    </div>
                  )}
                  <img
                    src={productInfos.image_url}
                    alt={productInfos.name}
                    className={`hidden h-110 w-full rounded-l-xl bg-white object-contain px-[2%] py-5 max-lg:block ${loadingImage1 ? "hidden" : ""
                      }`}
                    onLoad={() => setLoadingImage1(false)}
                    onError={() => setLoadingImage1(false)}
                  />

                  {/* Product details */}
                  <div className="w-[30%] flex-1 border-l border-teal-200 pt-15 pl-5 max-lg:w-full max-lg:border-t max-lg:border-l-0 max-lg:pt-10">
                    <h1 className="pb-5 text-4xl font-bold">{productInfos.brand}</h1>
                    <h2 className="pb-10 text-2xl max-xl:pb-5">{productInfos.name}</h2>
                    <div className="items-end justify-between pr-5 max-lg:mb-10 max-lg:flex">
                      <div>
                        <p
                          className={`my-2 pb-5 text-xl ${productInfos.stock > 0 ? "text-green-600" : "text-red-600"
                            }`}
                          aria-live="polite"
                        >
                          {productInfos.stock > 0 ? "● Available" : "● Out of Stock"}
                        </p>
                        <p className="my-2 pb-7 text-4xl max-xl:pb-5 max-lg:my-0 max-lg:mr-15 max-lg:pb-0">
                          ${Number(productInfos.price).toFixed(2)}
                        </p>
                      </div>
                      <AddToCart
                        product_id={productInfos.id}
                        brand={productInfos.brand}
                        name={productInfos.name}
                        image_url={productInfos.image_url}
                        price={productInfos.price}
                      />
                    </div>
                  </div>
                </div>
              </article>

              {/* SECTION 2: Description and video */}
              <DelayedMount delay={100} isGif={false}>
                <section
                  aria-labelledby="product-description-title"
                  className="fade-in mx-auto my-24 mb-10 flex flex-col items-center rounded-xl bg-teal-50 leading-relaxed shadow-lg"
                >
                  <h3 id="product-description-title" className="p-10 text-center text-4xl font-semibold">
                    Description
                  </h3>
                  <article className="prose-lg px-[5%] py-5">
                    <Markdown>{productInfos.description}</Markdown>
                  </article>

                  {productInfos.video_url && (
                    <figure className="my-5 mb-15 aspect-16/9 w-[90%] rounded-xl shadow-xl">
                      <iframe
                        src={productInfos.video_url}
                        frameBorder="0"
                        allowFullScreen
                        title={`${productInfos.name} video`}
                        className="w-full h-full rounded-xl"
                      ></iframe>
                      <figcaption className="sr-only">{`Video showcasing the ${productInfos.name}`}</figcaption>
                    </figure>
                  )}
                </section>
              </DelayedMount>
            </DelayedMount>
          </section>
        </main>
      )}
    </div>
  );
}
