import { useState } from "react";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../components/utils/api";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchWithCsrf(`${BASE_URL}/contact`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          "Thanks for reaching out! We'll get back to you soon. 😎",
          {
            position: "bottom-center",
            autoClose: 4000,
          },
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Oops! Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="mx-auto mt-24 min-h-screen max-w-6xl p-6 max-lg:mt-55 max-lg:mb-8 max-lg:min-h-fit">
      <Helmet>
        <title>Contact | Guitar Shop</title>
      </Helmet>

      <h1 className="mb-16 text-center text-4xl font-bold max-lg:mb-8">
        Contact
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-4 max-md:text-center">
          <p className="text-xl">
            Have a question about a product or your order?<br></br>
            We&apos;re happy to help!<br></br>
            Reach out using the form or contact us directly.
          </p>

          <div>
            <h2 className="text-xl font-semibold">Our Location</h2>
            <p>Guitar-Shop</p>
            <p>1234 Sunset Blvd</p>
            <p>Los Angeles, CA</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Opening Hours</h2>
            <ul>
              <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 4:00 PM</li>
              <li className="text-gray-500">Sunday: Closed</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>guitarshop.contact@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-400 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="h-15 w-full rounded-full bg-black px-6 text-xl font-semibold text-white hover:cursor-pointer hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
