import { Link } from "react-router-dom";
import facebookLogo from "../assets/img/facebook-logo.webp";
import instagramLogo from "../assets/img/instagram-logo.webp";
import youtubeLogo from "../assets/img/youtube-logo.webp";
import xLogo from "../assets/img/x-logo.webp";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-teal-50">
      <div className="flex items-center justify-between px-[10%] max-2xl:px-[5%] max-lg:h-auto max-lg:flex-col">
        <nav
          aria-label="Social media"
          className="flex w-120 flex-wrap items-center justify-between max-lg:w-full max-lg:py-10"
        >
          <a
            href="http://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img
              src={facebookLogo}
              className="mr-4 h-24 w-24 hover:brightness-125"
              alt="Facebook logo"
            />
          </a>
          <a
            href="http://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              src={instagramLogo}
              className="mx-4 h-20 w-20 hover:brightness-125"
              alt="Instagram logo"
            />
          </a>
          <a
            href="http://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img
              src={youtubeLogo}
              className="mx-4 h-24 w-24 hover:brightness-125"
              alt="YouTube logo"
            />
          </a>
          <a
            href="http://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <img
              src={xLogo}
              className="h-24 w-24 hover:brightness-200"
              alt="X logo"
            />
          </a>
        </nav>
        <div className="ml-15 flex w-3/5 justify-between py-10 max-lg:ml-0 max-lg:w-full">
          <section
            className="mr-20 flex h-64 flex-col justify-between"
            aria-labelledby="features-title"
          >
            <h3 id="features-title" className="mb-4 text-5xl">
              Features
            </h3>
            <ul className="flex h-45 list-disc flex-col justify-between pl-5 text-xl font-light">
              <li>3 years warranty</li>
              <li>30-days free return</li>
              <li>Repair service</li>
              <li>Expert advice</li>
              <li>Satisfaction guarantee</li>
            </ul>
          </section>
          <section
            className="flex h-64 flex-col justify-between pr-[10%]"
            aria-labelledby="company-title"
          >
            <h3 id="company-title" className="mb-4 text-5xl">
              Company
            </h3>
            <ul className="flex h-45 flex-col justify-between text-2xl font-light">
              <li className="hover:text-teal-400">
                <Link to="/about">About us</Link>
              </li>
              <li className="hover:text-teal-400">
                <Link to="/shipping">Shipping Fees</Link>
              </li>
              <li className="hover:text-teal-400">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="hover:text-teal-400">
                <Link to="/services">Services</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="w-full border-t border-teal-700 px-[10%] py-4 text-sm text-neutral-400 max-2xl:px-[5%]">
        © {new Date().getFullYear()} Guitar-Shop. All rights reserved.
      </div>
    </footer>
  );
}
