import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchWithCsrf } from "../components/utils/fetchWithCsrf";
import { BASE_URL } from "../components/utils/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) return setError("Invalid or missing token.");
    if (password !== confirmPassword) return setError("Passwords don't match.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");

    try {
      setLoading(true);
      const res = await fetchWithCsrf(
        `${BASE_URL}/auth/reset-password/confirm`,
        {
          method: "POST",
          body: JSON.stringify({ password, token }),
        },
      );

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      navigate("/login", {
        state: {
          toastMessage: "Your password has been updated.",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border bg-white p-6 shadow-lg max-lg:mt-60 max-lg:mb-10">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Reset Your Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className={`mt-2 h-14 w-full rounded-full font-semibold text-white max-lg:h-16 ${loading ? "bg-blue-500" : "bg-blue-600 hover:cursor-pointer hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
