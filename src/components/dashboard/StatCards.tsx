import { TrendingUp, TrendingDown, Banknote, ShoppingCart, ClipboardList, UserPlus } from "lucide-react";
import { fcfa, statsByPeriod, type PeriodId } from "../../lib/dashboard-data";

export default function StatCards({ period }: { period: PeriodId }) {
  const s = statsByPeriod[period];
  const cards = [
    { label: "Chiffre d'affaires", value: fcfa(s.revenue).replace(/\s*FCFA$/, ""), d: s.d[0], icon: Banknote, money: true },
    { label: "Ventes", value: String(s.sales), d: s.d[1], icon: ShoppingCart },
    { label: "Commandes", value: String(s.orders), d: s.d[2], icon: ClipboardList },
    { label: "Nouveaux clients", value: String(s.clients), d: s.d[3], icon: UserPlus },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {cards.map((c) => {
        const up = c.d >= 0;
        return (
          <div key={c.label} className="min-w-0 rounded-card border border-line bg-white p-4 shadow-soft sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[13px] text-ink-2">{c.label}</span>
              <span className="hidden size-8 shrink-0 items-center min-[360px]:flex justify-center rounded-lg bg-primary-light text-primary"><c.icon size={16} /></span>
            </div>
            <div className={`num mt-3 font-heading font-extrabold sm:text-2xl ${c.money ? "text-lg text-gold-ink min-[400px]:text-xl" : "text-xl"}`}>
              <span className="whitespace-nowrap">{c.value}</span>{c.money && <> <span className="text-sm font-bold">FCFA</span></>}
            </div>
            <div className={`num mt-2 flex flex-wrap items-center gap-x-1 text-xs font-semibold ${up ? "text-success" : "text-danger"}`}>
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {up ? "+" : "−"}{Math.abs(c.d).toString().replace(".", ",")}&nbsp;%
              </span>
              <span className="font-normal text-ink-2">vs période préc.</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
