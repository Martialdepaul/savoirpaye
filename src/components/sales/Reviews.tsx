import { ratingBars, type Review } from "../../lib/sales-data";
import Stars from "./Stars";

export default function Reviews({ rating, count, items = [], label = "élèves" }: { rating: number; count: number; items?: Review[]; label?: string }) {
  return (
    <section id="avis">
      <h2 className="font-heading text-2xl font-extrabold">Avis des {label}</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-[200px_1fr]">
        <div className="rounded-card border border-line bg-white p-5 text-center shadow-soft">
          <div className="num font-heading text-5xl font-extrabold">{String(rating).replace(".", ",")}</div>
          <div className="mt-2 flex justify-center"><Stars value={rating} size={18} /></div>
          <div className="num mt-2 text-sm text-ink-2">{count} avis</div>
        </div>
        {count >= 20 && (
        <ul className="space-y-2.5 self-center">
          {ratingBars.map(([n, pct]) => (
            <li key={n} className="num flex items-center gap-3 text-sm">
              <span className="w-16 shrink-0 whitespace-nowrap text-ink-2">{n} étoile{n > 1 ? "s" : ""}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></span>
              <span className="w-10 text-right text-ink-2">{pct} %</span>
            </li>
          ))}
        </ul>
        )}
      </div>
      {items.length > 0 && (
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((r) => (
          <li key={r.name} className="rounded-card border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-light font-heading text-sm font-bold text-primary">{r.name.split(" ").map((w) => w[0]).join("")}</span>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-ink-2">{r.city} · {r.date}</div>
              </div>
            </div>
            <div className="mt-3"><Stars value={r.rating} size={14} /></div>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.text}</p>
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}
