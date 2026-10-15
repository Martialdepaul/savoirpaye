import { fcfa, topProducts } from "../../lib/dashboard-data";

export default function TopProducts() {
  const max = Math.max(...topProducts.map((p) => p.revenue));
  return (
    <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold">Meilleurs produits</h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-medium text-primary hover:underline">Voir tout</a>
      </div>
      <ul className="space-y-4">
        {topProducts.map((p, i) => (
          <li key={p.name}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="num flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-bold text-primary">{i + 1}</span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-ink-2">{p.type} · <span className="num">{p.sales}</span> ventes</div>
                </div>
              </div>
              <div className="num shrink-0 text-sm font-semibold text-gold-ink">{fcfa(p.revenue)}</div>
            </div>
            <div className="ml-10 mt-2 h-1.5 rounded-full bg-page">
              <div className="h-full rounded-full bg-primary/70" style={{ width: `${(p.revenue / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
