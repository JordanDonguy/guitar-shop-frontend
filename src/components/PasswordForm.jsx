import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./utils/AuthContext";
import { fetchWithCsrf } from "./utils/fetchWithCsrf";
import { BASE_URL } from "./utils/api";

export default function PasswordForm({ handlePasswordButton }) {
  const { hasPassword, fetchUser } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    try {
      let res;

      if (!hasPassword) {
        res = await fetchWithCsrf(`${BASE_URL}/user/password`, {
          method: "POST",
          body: JSON.stringify({ newPassword }),
        });
      } else {
        res = await fetchWithCsrf(`${BASE_URL}/user/password`, {
          method: "PATCH",
          body: JSON.stringify({ currentPassword, newPassword }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      toast.success(
        hasPassword
          ? "Password successfully updated."
          : "Password created successfully.",
        {
          position: "bottom-center",
          autoClose: 4000,
        },
      );

      // update user infos
      fetchUser();
      // Close form
      handlePasswordButton();
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 rounded-xl border bg-neutral-100 p-10 shadow-lg max-lg:w-3/4 max-md:w-[90%]"
    >
      <h2 className="mb-4 text-2xl text-neutral-700">
        {hasPassword ? "Update Password" : "Create Password"}
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

      {hasPassword && (
        <div className="mb-4">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          autoComplete="new-password"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            handlePasswordButton();
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:cursor-pointer hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-700"
        >
          {hasPassword ? "Update Password" : "Create Password"}
        </button>
      </div>
    </form>
  );
}
