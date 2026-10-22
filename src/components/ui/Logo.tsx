import LogoMark from "./LogoMark";

export default function Logo({
  className = "text-[22px]",
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string;
}) {
  return (
    <a href={href} aria-label="savoirpay, accueil" className={`inline-flex items-center gap-[.3em] font-heading font-extrabold tracking-tight ${className}`}>
      <LogoMark tone={tone} className="size-[1.45em] shrink-0 -translate-y-[.06em]" />
      <span>
        <span className={tone === "light" ? "text-white" : "text-primary"}>savoir</span>
        <span className="text-gold">pay</span>
      </span>
    </a>
  );
}
