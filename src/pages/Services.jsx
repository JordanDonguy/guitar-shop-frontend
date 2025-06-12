import { Helmet } from "react-helmet";

export default function Services() {
  return (
    <section className="fade-in mx-auto mt-30 max-w-6xl px-4 pb-10 max-lg:mt-55">
      <Helmet>
        <title>Services | Guitar Shop</title>
      </Helmet>
      <h1 className="mb-12 text-center text-4xl font-bold">Our Services</h1>
      <div className="space-y-24 max-lg:space-y-16">
        <article
          key="maintenance"
          className="flex flex-col items-center gap-8 md:flex-row md:items-start"
        >
          <img
            src="/img/maintenance.webp"
            alt="Guitar Maintenance"
            className="h-100 w-full rounded-lg object-cover shadow-md max-md:h-80 md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold max-md:text-center">
              Guitar Maintenance
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              Keep your guitar in top playing condition with our comprehensive
              maintenance services. Whether you&apos;re a beginner or a touring
              professional, a well-maintained instrument is key to great tone
              and performance. We offer full guitar setups including string
              changes, truss rod adjustments, intonation, and action
              fine-tuning. We&apos;ll make sure your neck is perfectly aligned,
              your frets are clean and polished, and your playability is smooth
              across all strings. Our goal is to bring out the best in your
              instrument so you can focus on what matters most: playing.
            </p>
          </div>
        </article>

        <article
          key="electronics"
          className="flex flex-col items-center gap-8 md:flex-row md:items-start"
        >
          <img
            src="/img/electronics.webp"
            alt="Electronics Upgrades & Maintenance"
            className="h-80 w-full rounded-lg object-cover shadow-md md:hidden md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold max-md:text-center">
              Electronics Upgrades & Maintenance
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              Unlock your guitar’s true potential with professional electronics
              upgrades and maintenance. From replacing worn-out output jacks and
              scratchy potentiometers to installing high-end pickups and custom
              wiring configurations, we’ve got you covered. Whether you’re
              looking to reduce noise, improve tonal clarity, or simply
              modernize your setup, we offer precise and clean soldering work
              that ensures reliability and great sound. Bring your guitar in for
              a consultation, and we&apos;ll help you dial in your dream tone.
            </p>
          </div>
          <img
            src="/img/electronics.webp"
            alt="Electronics Upgrades & Maintenance"
            className="h-100 w-full rounded-lg object-cover shadow-md max-md:hidden md:w-1/2"
          />
        </article>

        <article
          key="repair"
          className="flex flex-col items-center gap-8 md:flex-row md:items-start"
        >
          <img
            src="/img/repair.webp"
            alt="Guitar Repair"
            className="h-100 w-full rounded-lg object-cover shadow-md max-md:h-80 md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-semibold max-md:text-center">
              Guitar Repair
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              Accidents happen, but your guitar is in good hands. Our repair
              services include everything from cracked body restoration and
              finish touch-ups to full headstock re-glues and fretboard fixes.
              We use professional-grade adhesives, fillers, and finishing
              materials to ensure that the structural integrity and look of your
              instrument are restored. Whether it’s a minor chip or a major
              break, we’ll bring your guitar back to life with care and
              precision.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
