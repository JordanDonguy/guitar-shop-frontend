import { Helmet } from "react-helmet";

export default function ShippingFees() {
  return (
    <div className="mx-auto max-w-4xl p-6 pt-30 max-lg:pt-55">
      <Helmet>
        <title>Shipping Fees | Guitar Shop</title>
        <meta
          name="description"
          content="Learn about our shipping fees, delivery options, and estimated times. Get your guitar delivered quickly and securely with Guitar-Shop."
        />
      </Helmet>

      <h1 className="mb-6 text-center text-4xl font-bold">Shipping Fees</h1>

      {/* Domestic Shipping */}
      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Domestic Shipping (USA)</h2>
        <p className="mb-4 text-gray-700">
          We ship from California and offer multiple options across the United
          States. All orders are processed within 1–2 business days.
        </p>

        <table className="mb-4 w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Service</th>
              <th className="p-3">Delivery Time</th>
              <th className="p-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Standard (UPS Ground)</td>
              <td className="p-3">3–5 business days</td>
              <td className="p-3">$15</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Expedited (2-Day)</td>
              <td className="p-3">2 business days</td>
              <td className="p-3">$30</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Next-Day Air</td>
              <td className="p-3">1 business day</td>
              <td className="p-3">$60</td>
            </tr>
          </tbody>
        </table>

        <p className="font-medium text-green-700">
          Free Standard Shipping on orders over $250!
        </p>
      </section>

      {/* International Shipping */}
      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">International Shipping</h2>
        <p className="mb-4 text-gray-700">
          We ship worldwide. Customs fees and import taxes are not included and
          must be paid by the recipient.
        </p>

        <table className="mb-4 w-full border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Region</th>
              <th className="p-3">Delivery Time</th>
              <th className="p-3">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Canada & Mexico</td>
              <td className="p-3">5–10 business days</td>
              <td className="p-3">$35</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Europe</td>
              <td className="p-3">7–14 business days</td>
              <td className="p-3">$45</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Asia & Oceania</td>
              <td className="p-3">10–20 business days</td>
              <td className="p-3">$55</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Additional Notes */}
      <section className="text-gray-700">
        <h2 className="mb-2 text-2xl font-semibold">Important Notes</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Guitars are shipped in padded, reinforced boxes to prevent damage
            during transit.
          </li>
          <li>Orders with multiple items may ship in separate packages.</li>
          <li>Tracking information is provided for all orders.</li>
          <li>
            Oversized items like amps may incur additional charges based on
            weight and location.
          </li>
          <li>
            We do not ship to PO Boxes or military addresses at this time.
          </li>
        </ul>
      </section>
    </div>
  );
}
