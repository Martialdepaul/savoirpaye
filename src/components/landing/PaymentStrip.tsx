import { paymentMethods } from "../../lib/mock-data";

export default function PaymentStrip() {
  return (
    <section id="paiements" className="scroll-mt-16 border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-center text-sm font-medium text-ink-2">Vos élèves paient comme ils en ont l'habitude</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {paymentMethods.map((m) => (
            <li key={m.name} className="flex items-center justify-center gap-2.5 rounded-btn border border-line bg-page px-3 py-3.5 text-sm font-semibold">
              <span className="size-2.5 rounded-full" style={{ background: m.color }} aria-hidden />
              {m.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
