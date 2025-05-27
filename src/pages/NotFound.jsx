import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center pt-[140px]" role="main">
      <h1 className="pb-10 text-3xl">404 - Page Not Found</h1>
      <p className="text-xl font-light" role="alert" aria-live="polite">
        Sorry, we couldn&apos;t find what you&apos;re looking for.
      </p>
      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </main>
  );
}
