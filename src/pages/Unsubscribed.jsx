import { Link } from "react-router-dom"

export default function Unsubscribed() {
  return (
    <div className="flex flex-col items-center justify-center mb-30 pt-60 max-lg:pt-60" role="main">
      <h1 className="pb-10 text-3xl">You've been unsubscribed 😢</h1>
      <section className="text-xl font-light text-center w-1/2 max-lg:w-3/4">
        <p className="pb-5">
          We're sorry to see you go, but your email has been successfully removed from the Guitar Shop newsletter.
        </p>
        <p className="pb-5">
          If it was a mistake or you change your mind later, you're always welcome back! Just visit our website to
          resubscribe and stay tuned for great deals, gear tips, and all things guitar. 🎸
        </p>
        <p>Until then, keep on rockin'. 🤘</p>
      </section>
      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  )
}
