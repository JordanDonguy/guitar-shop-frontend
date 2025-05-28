import { useState } from "react";
import { toast } from "react-toastify";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { BASE_URL } from "./utils/api";

export default function EmailForm({ handleEmailButton }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetchWithCsrf(
        `${BASE_URL}/auth/reset-password/request`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      handleEmailButton();
      toast.success("Password reset link sent to your email", {
        position: "bottom-center",
        autoClose: 4000,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 rounded-xl border bg-neutral-100 p-10 shadow-lg max-lg:w-3/4 max-md:w-[90%]"
    >
      <h2 className="mb-4 text-2xl text-neutral-700">
        Enter the email associated with your account to receive a link to reset
        your password
      </h2>

      {error && (
        <div
          className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="new-email"
          placeholder="email@address.com"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            handleEmailButton();
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:cursor-pointer hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`rounded-lg px-4 py-2 text-white ${loading ? "bg-blue-500" : "bg-blue-600 hover:cursor-pointer hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Sending mail..." : "Reset my password"}
        </button>
      </div>
    </form>
  );
}
