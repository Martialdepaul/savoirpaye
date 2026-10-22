// Pièces d'or : [cx, cy, r]. `inside` sont dans le crâne (masquées en partie par la tête), `over` débordent par-dessus.
const inside = [[18, 25], [29, 24], [40, 25]] as const;
const over = [[23.5, 16, 6.5], [34.5, 15.5, 6.5], [29, 7, 6.3], [6, 38, 4.6], [52, 24, 4.6]] as const;

function Coin({ cx, cy, r = 6.5 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#f5a524" stroke="#c97f0a" strokeWidth=".8" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="#c97f0a" strokeWidth="1.2" />
    </>
  );
}

// Symbole savoirpay : une tête de profil dont le savoir déborde en pièces d'or.
export default function LogoMark({ className = "size-8", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="28.7" cy="28.2" rx="18.6" ry="3.2" className={light ? "fill-white/30" : "fill-forest"} />
      {inside.map(([cx, cy]) => <Coin key={`${cx}-${cy}`} cx={cx} cy={cy} />)}
      <path
        className={light ? "fill-white" : "fill-primary"}
        d="M17 63L18.5 52C12.5 48 9.5 41 9.5 34C9.5 31 10 29 10.5 27.5C20 30 36 30 47 27C48.5 30 49.5 33 49.5 36L53.5 42.5C54.3 43.8 53.6 45 52.2 45.3L50.3 45.7L51 48.6C51.3 50 50.6 50.8 49.8 51L50.4 53.3C51 56 49 57.3 46 57L42.5 56.6L42 63Z"
      />
      {over.map(([cx, cy, r]) => <Coin key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
    </svg>
  );
}
