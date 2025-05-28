import { Link } from "react-router-dom";

export default function Unsubscribed() {
  return (
    <div
      className="mb-30 flex flex-col items-center justify-center pt-60 max-lg:pt-60"
      role="main"
    >
      <h1 className="pb-10 text-3xl">You&apos;ve been unsubscribed 😢</h1>
      <section className="w-1/2 text-center text-xl font-light max-lg:w-3/4">
        <p className="pb-5">
          We&apos;re sorry to see you go, but your email has been successfully
          removed from the Guitar Shop newsletter.
        </p>
        <p className="pb-5">
          If it was a mistake or you change your mind later, you&apos;re always
          welcome back! Just visit our website to resubscribe and stay tuned for
          great deals, gear tips, and all things guitar. 🎸
        </p>
        <p>Until then, keep on rockin&apos;. 🤘</p>
      </section>
      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
