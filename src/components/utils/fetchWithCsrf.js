import { BASE_URL } from "./api";

export const fetchWithCsrf = async (url, options = {}) => {
  try {
    // Get CSRF token
    const csrfRes = await fetch(`${BASE_URL}/csrf-token`, {
      credentials: "include",
    });

    if (!csrfRes.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    const { csrfToken } = await csrfRes.json();

    // Perform main request
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        "X-CSRF-Token": csrfToken,
      },
    });
  } catch (error) {
    console.error("fetchWithCsrf error:", error.message);
    throw error;
  }
};
