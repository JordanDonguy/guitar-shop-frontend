import { useState } from "react";
import { toast } from "react-toastify";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { BASE_URL } from "./utils/api";

export default function NewsletterForm({ onAboutPage }) {
  const [email, setEmail] = useState("");

  const handleNewsletterForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchWithCsrf(`${BASE_URL}/newsletter/subscribe`, {
        method: "POST",
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
    <form
      onSubmit={handleNewsletterForm}
      className={`flex min-w-sm flex-col items-center justify-between gap-8 max-xl:w-3/4 max-lg:w-full ${onAboutPage && "w-4xl flex-row max-xl:w-full max-lg:mt-6 max-lg:flex-col"}`}
    >
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-12 w-full rounded-lg border pl-5 text-lg"
      />
      <button
        type="submit"
        className="h-15 w-full rounded-4xl border bg-black text-xl text-teal-50 hover:cursor-pointer hover:bg-gray-800"
      >
        Subscribe now
      </button>
    </form>
  );
}
