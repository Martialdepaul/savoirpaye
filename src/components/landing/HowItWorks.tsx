import { steps } from "../../lib/mock-data";

type Level = "h1" | "h2";

export default function HowItWorks({ level: H = "h2" }: { level?: Level }) {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-6xl px-5 py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl">
        <H className="font-heading text-3xl font-extrabold sm:text-4xl">Comment ça marche</H>
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
