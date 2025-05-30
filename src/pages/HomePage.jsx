import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { BASE_URL } from "../components/utils/api";
import guitar from "../assets/img/guitar-homepage.png";
import eGuitar from "../assets/img/e-guitar.png";
import aGuitar from "../assets/img/a-guitar.png";
import amp from "../assets/img/amp.png";
import newsletter from "../assets/img/newsletter.png";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

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

  const handleNewsletterForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchWithCsrf(`${BASE_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        const emailError = data.errors.find((e) => e.field === "email");
        toast.error(emailError.msg, {
          position: "bottom-center",
          autoClose: 4000,
        });
        throw new Error("Network response was not ok");
      }

      toast.success("Thanks for subscribing to our newsletter! 😎", {
        position: "bottom-center",
        autoClose: 4000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Helmet>
        <title>Homepage | Guitar Shop</title>
      </Helmet>

      {/* Hero Section */}
      <section className="fade-in flex h-screen pt-[80px] shadow-lg max-lg:h-fit max-lg:pt-45">
        <div className="flex w-full flex-col justify-between pt-5 pb-10 pl-[10%] max-2xl:pl-[5%] max-xl:w-4/6 max-xl:justify-around max-lg:w-full max-lg:items-center max-lg:pl-0">
          <h1 className="text-8xl/30 text-shadow-lg max-2xl:text-8xl/25 max-xl:w-[90%] max-xl:text-6xl/18 max-lg:text-center">
            Find the guitar you’ve always wanted
          </h1>
          <div className="hidden w-[80%] items-center justify-center bg-neutral-200 max-lg:flex max-lg:h-2/5 max-lg:w-full max-md:h-1/3">
            <img
              src={guitar}
              alt="guitar"
              className="h-full py-10 max-xl:h-5/6 max-lg:h-auto max-lg:w-2/5 max-lg:rotate-[90deg] max-lg:py-0 max-md:w-60"
              style={{
                filter: "drop-shadow(15px 8px 5px rgba(139, 143, 143, 0.5))",
              }}
            />
          </div>
          <p className="w-170 text-4xl/15 font-light text-shadow-lg max-xl:w-140 max-lg:w-auto max-lg:px-[5%] max-lg:text-center max-md:text-3xl/10">
            Explore our selection of electric and acoustic guitars, amps,
            effects and all the accessories and home-studio gear that you’re
            dreaming of!
          </p>
          <Link
            to="/products"
            className="flex h-15 w-60 items-center justify-center rounded-full border border-black bg-teal-50 text-2xl shadow-lg hover:border-2 hover:bg-teal-200 max-lg:mb-5 max-lg:h-20 max-lg:w-80 max-lg:border-2 max-lg:text-3xl"
          >
            Explore now
          </Link>
        </div>
        <div className="flex w-[80%] items-center justify-center bg-neutral-200 max-lg:hidden">
          <img
            src={guitar}
            alt="guitar"
            className="h-full py-10 max-xl:h-5/6"
            style={{
              filter: "drop-shadow(30px 20px 5px rgba(139, 143, 143, 0.5))",
            }}
          />
        </div>
      </section>

      {/* Hottest Products Section */}
      <section className="fade-in flex flex-col items-center md:px-[5%]">
        <h2 className="my-25 pl-12 text-6xl max-lg:pl-0">Hottest products</h2>
        <div className="flex justify-center text-shadow-lg max-lg:flex-col">
          {/* Product Card 1 */}
          <article className="flex h-160 w-1/3 flex-col items-center justify-between border-r-2 border-teal-200 max-lg:mb-10 max-lg:h-fit max-lg:w-full max-lg:flex-row max-lg:justify-start max-lg:border-none">
            <img
              src={eGuitar}
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
              src={amp}
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
              src={aGuitar}
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
            className={`w-[75%] text-center text-2xl ${i < 2 ? "border-b-2 border-teal-200 pb-8" : "py-8"}`}
          >
            ⭐️⭐️⭐️⭐️⭐️
            <p className="font-medium">“{quote}”</p>
            <p>{text}</p>
            <p className="font-bold">{author}</p>
          </blockquote>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="flex w-full flex-col items-center bg-neutral-200 px-[10%] pb-30 max-2xl:px-[5%]">
        <h2 className="my-25 pl-10 text-6xl max-lg:pl-0">Newsletter</h2>
        <div className="flex w-full items-center justify-evenly max-xl:flex-col">
          <div className="flex max-xl:mb-20">
            <img
              src={newsletter}
              className="h-auto w-80 max-lg:hidden"
              alt="newsletter"
            />
            <div className="hidden w-120 flex-col items-center justify-center pl-20 text-center max-xl:flex max-lg:mx-[10%] max-lg:w-full max-lg:pl-0">
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
          <form
            onSubmit={handleNewsletterForm}
            className="flex h-40 flex-col justify-between"
          >
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="h-12 rounded-lg border pl-5 text-2xl"
            />
            <button
              type="submit"
              className="h-15 rounded-4xl border bg-black text-2xl text-teal-50 hover:cursor-pointer hover:bg-gray-800"
            >
              Subscribe now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
