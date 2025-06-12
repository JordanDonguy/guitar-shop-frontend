import { Helmet } from "react-helmet";
import NewsletterForm from "../components/NewsletterForm";

export default function About() {
  return (
    <section className="fade-in mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-between px-4 pt-30 pb-10 max-2xl:pb-5 max-xl:items-start max-lg:pt-55 max-lg:pb-14 max-md:min-h-fit">
      <Helmet>
        <title>About | Guitar Shop</title>
      </Helmet>

      <h1 className="mb-4 w-full text-center text-4xl font-bold">About Us</h1>

      <img
        src="/img/about.webp"
        className="mb-4 h-100 w-full rounded-xl object-cover saturate-50 max-2xl:mb-5 max-2xl:h-80 max-lg:mt-6 max-lg:mb-10"
      />

      <p className="mb-2 text-center text-xl font-semibold max-xl:text-left max-md:pb-4">
        Welcome to Guitar Shop! We’re passionate about bringing quality
        instruments to musicians of all levels.
      </p>

      <p className="mb-2 text-center text-lg max-xl:text-left max-md:pb-2">
        Founded in 2023, our store is based in sunny California and offers a
        hand-picked selection of guitars, gear, and accessories.
      </p>

      <p className="text-center text-lg max-2xl:pb-4 max-xl:text-left">
        Be the first to know about exclusive deals, new arrivals, and guitar
        tips by subscribing to our newsletter!
      </p>

      <NewsletterForm onAboutPage={true} />
    </section>
  );
}
