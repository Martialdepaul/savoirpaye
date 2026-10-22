import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fcfa, periods, revenueSeries, type PeriodId } from "../../lib/dashboard-data";

export default function RevenueChart({ period }: { period: PeriodId }) {
  const data = useMemo(() => revenueSeries(Number(period)), [period]);
  const label = periods.find((p) => p.id === period)!.label;
  return (
    <section className="rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-heading text-lg font-bold">Revenus</h2>
        <span className="text-sm text-ink-2">{label}</span>
      </div>
      <div className="h-64 w-full sm:h-72" role="img" aria-label={`Courbe des revenus sur ${label}`}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5A524" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#F5A524" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E3EBE7" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#52615A", fontSize: 12 }} minTickGap={32} />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#52615A", fontSize: 12 }}
              tickFormatter={(v) => `${Math.round(v / 1000)} k`}
            />
            <Tooltip
              cursor={{ stroke: "#F5A524", strokeWidth: 1 }}
              formatter={(v) => [fcfa(Number(v)), "Revenus"]}
              contentStyle={{ borderRadius: 10, border: "1px solid #E3EBE7", boxShadow: "none", fontSize: 13 }}
            />
            <Area type="monotone" dataKey="value" stroke="#F5A524" strokeWidth={2.5} fill="url(#gold)" activeDot={{ r: 5, fill: "#F5A524", stroke: "#fff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
