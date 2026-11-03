import Link from "next/link";
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
    <Link href={href} aria-label="Savoirpay, accueil" className={`inline-flex min-h-11 items-center gap-[.3em] font-heading font-extrabold tracking-tight ${className}`}>
      <LogoMark tone={tone} className="size-[1.45em] shrink-0 -translate-y-[.06em]" />
      <span>
        <span className={tone === "light" ? "text-white" : "text-primary"}>savoir</span>
        <span className="text-gold">pay</span>
      </span>
    </Link>
  );
}
