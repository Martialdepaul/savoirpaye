import { TrendingUp, TrendingDown, Banknote, ShoppingCart, ClipboardList, UserPlus } from "lucide-react";
import { fcfa, statsByPeriod, type PeriodId } from "../../lib/dashboard-data";

export default function StatCards({ period }: { period: PeriodId }) {
  const s = statsByPeriod[period];
  const cards = [
    { label: "Chiffre d'affaires", value: fcfa(s.revenue), d: s.d[0], icon: Banknote, money: true },
    { label: "Ventes", value: String(s.sales), d: s.d[1], icon: ShoppingCart },
    { label: "Commandes", value: String(s.orders), d: s.d[2], icon: ClipboardList },
    { label: "Nouveaux clients", value: String(s.clients), d: s.d[3], icon: UserPlus },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {cards.map((c) => {
        const up = c.d >= 0;
        return (
          <div key={c.label} className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink-2">{c.label}</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary-light text-primary"><c.icon size={16} /></span>
            </div>
            <div className={`num mt-3 font-heading text-xl font-extrabold sm:text-2xl ${c.money ? "text-gold-ink" : ""}`}>{c.value}</div>
            <div className={`num mt-2 flex items-center gap-1 text-xs font-semibold ${up ? "text-success" : "text-danger"}`}>
              {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {up ? "+" : "−"}{Math.abs(c.d).toString().replace(".", ",")} %
              <span className="ml-0.5 font-normal text-ink-2">vs période préc.</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
