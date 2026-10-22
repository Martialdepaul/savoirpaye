import { paymentMethods } from "../../lib/mock-data";

export default function PaymentStrip() {
  return (
    <section aria-label="Moyens de paiement" className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-8 lg:flex-row lg:justify-between">
        <p className="shrink-0 text-sm font-medium text-ink-2">Vos clients paient comme ils en ont l'habitude</p>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {paymentMethods.map((m) => (
            <li key={m.name} className="flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-2 text-sm font-semibold">
              <span className="size-2.5 rounded-full" style={{ background: m.color }} aria-hidden />
              {m.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
