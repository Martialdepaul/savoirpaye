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
    <a href={href} aria-label="savoirpay, accueil" className={`font-heading font-extrabold tracking-tight ${className}`}>
      <span className={tone === "light" ? "text-white" : "text-primary"}>savoir</span>
      <span className="text-gold">pay</span>
    </a>
  );
}
