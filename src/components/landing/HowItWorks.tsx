import { steps } from "../../lib/mock-data";

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Comment ça marche</h2>
        <p className="mt-3 text-lg text-ink-2">De l'idée à votre premier paiement, en quatre étapes.</p>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-card border border-line bg-white p-6 shadow-soft">
            <span className="num flex size-10 items-center justify-center rounded-full bg-primary-light font-heading text-lg font-bold text-primary">{i + 1}</span>
            <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
