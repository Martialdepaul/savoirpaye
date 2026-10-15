export default function Logo({ className = "text-[22px]" }: { className?: string }) {
  return (
    <a href="#top" aria-label="savoirpay, accueil" className={`font-heading font-extrabold tracking-tight ${className}`}>
      <span className="text-ink">savoir</span>
      <span className="text-gold">pay</span>
    </a>
  );
}
