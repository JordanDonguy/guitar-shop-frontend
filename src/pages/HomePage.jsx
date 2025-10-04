import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import NewsletterForm from "../components/NewsletterForm";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const type = params.get("type");

    if (status === "success" && type === "register") {
      toast.success("🎉 Welcome! Your account has been created.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
    if (status === "success" && type === "login") {
      toast.success("Hey there, you're back! Great to see you again 🎸", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }

    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        position: "bottom-center",
        autoClose: 5000,
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  return (
    <div className="flex w-full flex-col items-center">
      <Helmet>
        <title>Homepage | Guitar Shop</title>
        <meta
          name="description"
          content="Discover premium guitars, accessories, and gear at Guitar-Shop. Find your perfect instrument with expert advice. Shop today and play like a pro!"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="fade-in flex h-screen w-full pt-20 shadow-sm max-lg:h-fit max-lg:pt-55 max-lg:pb-10 max-md:max-h-screen">
        <div className="flex w-full flex-col justify-between pt-5 pb-10 pl-[10%] max-2xl:pl-[9%] max-xl:w-4/6 max-xl:justify-around max-xl:px-[5%] max-lg:w-full max-lg:items-center max-lg:p-0">
          <h1 className="text-8xl/30 text-shadow-lg max-2xl:w-[90%] max-2xl:text-7xl/24 max-xl:text-6xl/18 max-lg:text-center">
            Find the guitar you’ve always wanted
          </h1>
          <div className="hidden w-[80%] items-center justify-center bg-neutral-200 max-lg:flex max-lg:h-2/5 max-lg:w-full max-md:mb-5 max-md:h-1/3">
            <img
              src="/img/guitar-homepage.webp"
              alt="guitar"
              width={320}
              height={560}
              loading="eager"
              className="h-auto w-80 rotate-[90deg] py-10 max-lg:py-0 max-md:w-60"
              style={{
                filter: "drop-shadow(15px 8px 5px rgba(139, 143, 143, 0.5))",
              }}
            />
          </div>
          <p className="w-2xl text-4xl/15 font-light text-shadow-lg max-2xl:w-140 max-2xl:text-3xl/13 max-xl:w-120 max-lg:w-auto max-lg:px-[5%] max-lg:text-center max-md:text-3xl/10">
            Explore our selection of electric and acoustic guitars, amps,
            effects and all the accessories and home-studio gear that you’re
            dreaming of!
          </p>
          <Link
            to="/products"
            className="flex h-20 w-80 items-center justify-center rounded-full border border-black bg-teal-50 text-3xl shadow-md hover:border-2 hover:bg-teal-200 max-2xl:h-15 max-xl:h-20 max-md:mt-7 xl:mt-4"
          >
            Explore now
          </Link>
        </div>
        <div className="flex w-[90%] items-center justify-center bg-neutral-200 max-xl:w-full max-lg:hidden">
          <img
            src="/img/guitar-homepage.webp"
            alt="guitar"
            loading="eager"
            className="h-full py-10 pr-24 max-2xl:pr-0 max-xl:h-[95%]"
            style={{
              filter: "drop-shadow(30px 20px 5px rgba(139, 143, 143, 0.5))",
            }}
          />
        </div>
      </section>

      {/* Hottest Products Section */}
      <section className="fade-in flex flex-col items-center md:px-[5%]">
        <h2 className="mt-20 mb-25 pl-12 text-6xl max-lg:mt-15 max-lg:pl-0 max-md:mt-10 2xl:mt-15">
          Hottest products
        </h2>
        <div className="flex justify-center text-shadow-lg max-lg:flex-col">
          {/* Product Card 1 */}
          <article className="flex h-160 w-1/3 flex-col items-center justify-between border-r-2 border-teal-200 max-lg:mb-10 max-lg:h-fit max-lg:w-full max-lg:flex-row max-lg:justify-start max-lg:border-none">
            <img
              src="/img/e-guitar.webp"
              alt="PRS Electric Guitar"
              className="max-w-100 max-xl:w-80 max-lg:w-70"
              style={{
                filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))",
              }}
            />
            <Link
              to="/products/11"
              className="flex h-[30%] flex-col items-center justify-between rounded-l-xl pt-5 outline-teal-200 hover:bg-neutral-200 hover:outline max-lg:h-40 max-lg:rounded-xl max-lg:pt-0"
            >
              <h3 className="text-3xl font-medium">PRS</h3>
              <p className="w-[60%] text-center text-2xl max-xl:w-5/6 max-lg:w-[90%]">
                John Mayer Silver Sky Electric Guitar Tungsten
              </p>
              <span className="text-3xl font-bold">$ 2749</span>
            </Link>
          </article>

          {/* Product Card 2 */}
          <article className="flex h-160 w-1/3 flex-col items-center justify-between border-r-2 border-teal-200 max-lg:mb-10 max-lg:h-fit max-lg:w-full max-lg:flex-row max-lg:justify-start max-lg:border-y max-lg:border-r-0 max-lg:py-10">
            <img
              src="/img/amp.webp"
              alt="Tone King Amp"
              className="max-w-100 px-10 pt-5 pb-5 max-xl:w-80 max-lg:w-70"
              style={{
                filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))",
              }}
            />
            <Link
              to="/products/45"
              className="flex h-[30%] flex-col items-center justify-between pt-5 outline-teal-200 hover:bg-neutral-200 hover:outline max-lg:h-40 max-lg:rounded-xl max-lg:pt-0"
            >
              <h3 className="text-3xl font-medium">Tone King</h3>
              <p className="w-[60%] text-center text-2xl max-xl:w-5/6 max-lg:w-[90%]">
                Imperial MKII 20W 1x12 Tube Guitar Combo Amp
              </p>
              <span className="text-3xl font-bold">$ 2695</span>
            </Link>
          </article>

          {/* Product Card 3 */}
          <article className="flex h-160 w-1/3 flex-col items-center justify-between max-lg:h-fit max-lg:w-full max-lg:flex-row max-lg:justify-start max-lg:border-b max-lg:border-teal-200 max-lg:pb-10">
            <img
              src="/img/a-guitar.webp"
              alt="Martin Acoustic Guitar"
              className="max-w-100 max-xl:w-80 max-lg:w-70"
              style={{
                filter: "drop-shadow(-12px 6px 10px rgba(0, 0, 0, 0.5))",
              }}
            />
            <Link
              to="/products/18"
              className="flex h-[30%] w-full flex-col items-center justify-between rounded-r-xl pt-5 outline-teal-200 hover:bg-neutral-200 hover:outline max-lg:h-40 max-lg:rounded-xl max-lg:pt-0"
            >
              <h3 className="text-3xl font-medium">Martin</h3>
              <p className="w-[60%] text-center text-2xl max-xl:w-5/6 max-lg:w-[90%]">
                Special D Classic Dreadnought Acoustic
              </p>
              <span className="text-3xl font-bold">$ 889</span>
            </Link>
          </article>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="flex flex-col items-center">
        <h2 className="my-25 pl-12 text-6xl max-lg:pl-0">Feedback Corner</h2>
        {[
          {
            quote: "Absolutely blown away by the tone and build quality.",
            text: `I ordered the Fender Player Strat and it arrived in perfect
condition, set up and ready to go. Super fast shipping and the
customer support was top-notch. Will definitely buy again!`,
            author: "— Liam R., Nashville, TN",
          },
          {
            quote: "Excellent customer service for picky players.",
            text: `I had a few questions about neck profiles and pickup configs — their
support team knew their stuff. Ended up with a Gretsch hollow body
that fits my style perfectly.`,
            author: "— Sophia M., Portland, OR",
          },
          {
            quote: "Beginner-friendly and trustworthy.",
            text: `As a total beginner, I wasn’t sure what to buy. Their live chat
helped me pick the perfect starter bundle. Got my acoustic guitar in
3 days and I’ve been practicing daily since!`,
            author: "— Derek S., Austin, TX",
          },
        ].map(({ quote, text, author }, i) => (
          <blockquote
            key={i}
            className={`w-[75%] py-8 text-center text-2xl max-lg:w-[90%] max-md:w-full max-md:px-4 ${i < 2 ? "border-b-2 border-teal-200" : ""}`}
          >
            ⭐️⭐️⭐️⭐️⭐️
            <p className="font-medium">“{quote}”</p>
            <p>{text}</p>
            <p className="font-bold">{author}</p>
          </blockquote>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="flex w-full flex-col items-center bg-neutral-200 px-[10%] pb-30 max-2xl:px-[5%] max-md:px-4">
        <h2 className="my-25 pl-10 text-6xl max-lg:pl-0">Newsletter</h2>
        <div className="flex w-full items-center justify-evenly max-xl:flex-col">
          <div className="flex max-xl:mb-20">
            <img
              src="/img/newsletter.webp"
              className="h-auto w-80 max-lg:hidden"
              alt="newsletter"
            />
            <div className="hidden w-120 flex-col items-center justify-center pl-20 text-center max-xl:flex max-lg:mx-4 max-lg:w-full max-lg:pl-0">
              <p className="pb-5 text-4xl">Stay in Tune With the Latest Gear</p>
              <p className="text-2xl">
                Subscribe to our newsletter and be the first to know about
                exclusive deals, new arrivals, and guitar tips straight from the
                pros. No spam — just great tone in your inbox.
              </p>
            </div>
          </div>
          <div className="w-120 px-10 text-center max-xl:hidden">
            <p className="pb-5 text-4xl">Stay in Tune With the Latest Gear</p>
            <p className="text-2xl">
              Subscribe to our newsletter and be the first to know about
              exclusive deals, new arrivals, and guitar tips straight from the
              pros. No spam — just great tone in your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
