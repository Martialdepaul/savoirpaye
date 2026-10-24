import Link from "next/link";
import { Check, Clock, Users, ShieldCheck, Infinity as Inf, Award, PlayCircle, FileDown, Video, Download, Eye } from "lucide-react";
import Logo from "../ui/Logo";
import Stars from "./Stars";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import { fcfa } from "../../lib/dashboard-data";
import { checkoutUrl, seller, type CatalogProduct } from "../../lib/catalog";

const ctaLabel = (p: CatalogProduct) => (p.type === "Coaching" ? "Réserver ma séance" : "Acheter maintenant");
const priceNote = (p: CatalogProduct) =>
  p.type === "Coaching" ? "Paiement unique. Séance planifiée après l'achat." : p.type === "Produit numérique" ? "Paiement unique. Téléchargement immédiat." : "Paiement unique. Accès à vie.";

function Price({ p, large = false }: { p: CatalogProduct; large?: boolean }) {
  const off = p.comparePrice && p.comparePrice > p.price ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className={`num font-heading font-extrabold text-gold-ink ${large ? "text-4xl" : "text-xl"}`}>{fcfa(p.price)}</span>
      {off > 0 && (
        <>
          <span className={`num text-ink-2 line-through ${large ? "text-base" : "text-xs"}`}>{fcfa(p.comparePrice!)}</span>
          {large && <span className="rounded-full bg-[#ECF8EF] px-2 py-0.5 text-xs font-bold text-success">−{off} %</span>}
        </>
      )}
    </div>
  );
}

function BuyCard({ p }: { p: CatalogProduct }) {
  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-soft">
      <Price p={p} large />
      <p className="mt-1 text-sm text-ink-2">{priceNote(p)}</p>
      <Link href={checkoutUrl(p)} className="mt-5 block rounded-btn bg-primary py-3.5 text-center font-semibold text-white transition-colors hover:bg-primary-hover">
        {ctaLabel(p)}
      </Link>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-2"><ShieldCheck size={14} className="shrink-0 text-success" /> Remboursé sous 7 jours si le produit ne vous convient pas</p>
      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
        {p.includes.map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-primary" /> {t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SalesView({ product: p }: { product: CatalogProduct }) {
  const isDraft = p.status !== "En ligne";
  const audience = p.type === "Formation" ? "élèves" : "clients";

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      {isDraft && (
        <div role="status" className="flex items-center justify-center gap-2 bg-ink px-4 py-2.5 text-center text-sm text-white">
          <Eye size={16} className="shrink-0" /> Aperçu : ce produit est {p.status === "Brouillon" ? "en brouillon" : "archivé"} et n'est pas visible par vos clients.
        </div>
      )}
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <Link href="/connexion" className="-mr-3 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink">Connexion</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_360px] lg:gap-12 lg:py-12">
        <main className="min-w-0 space-y-12">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-primary">
              <img src={p.cover} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-semibold">
                {p.type === "Formation" ? <><PlayCircle size={17} className="text-primary" /> Formation en ligne</> : p.type === "Coaching" ? <><Video size={17} className="text-primary" /> Coaching en visio</> : <><FileDown size={17} className="text-primary" /> Produit numérique</>}
              </span>
            </div>

            <h1 className="mt-6 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{p.name}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-2">{p.subtitle}</p>

            <div className="num mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {p.reviewsCount > 0 && (
                <>
                  <span className="flex items-center gap-2 font-semibold">{String(p.rating).replace(".", ",")} <Stars value={p.rating} size={15} /></span>
                  <span className="text-ink-2">{p.reviewsCount} avis</span>
                </>
              )}
              {p.students > 0 && <span className="flex items-center gap-1.5 text-ink-2"><Users size={15} /> {p.students.toLocaleString("fr-FR")} {audience}</span>}
              {p.duration && <span className="flex items-center gap-1.5 text-ink-2"><Clock size={15} /> {p.duration}</span>}
              {p.coaching && <span className="flex items-center gap-1.5 text-ink-2"><Clock size={15} /> {p.coaching.duration}</span>}
            </div>

            <Link href={`/boutique/${seller.slug}`} className="mt-5 inline-flex items-center gap-3 rounded-btn py-1 pr-2 hover:bg-white">
              <img src="/images/team-1.jpg" alt="" className="size-11 rounded-full object-cover" />
              <span>
                <span className="block text-sm font-semibold">{seller.name}</span>
                <span className="block text-xs text-ink-2">{seller.role} · Voir la boutique</span>
              </span>
            </Link>
          </div>

          <section>
            <h2 className="font-heading text-2xl font-extrabold">{p.type === "Formation" ? "Ce que vous allez apprendre" : "Ce que vous obtenez"}</h2>
            <ul className="mt-5 grid gap-3 rounded-card border border-line bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6">
              {p.goals.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-primary" /> {g}</li>
              ))}
            </ul>
            {p.type === "Formation" && (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
                <span className="flex items-center gap-2"><Inf size={16} className="text-primary" /> Accès à vie</span>
                <span className="flex items-center gap-2"><Award size={16} className="text-primary" /> Certificat de réussite</span>
              </div>
            )}
          </section>

          {p.modules && p.modules.length > 0 && <Curriculum modules={p.modules} duration={p.duration} />}

          {p.files && p.files.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">Contenu du téléchargement</h2>
              <ul className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
                {p.files.map((f) => (
                  <li key={f.name} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><Download size={18} /></span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.name}</span>
                    <span className="num shrink-0 text-xs text-ink-2">{f.size}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-2">Le lien de téléchargement vous est envoyé par e-mail et par WhatsApp juste après le paiement.</p>
            </section>
          )}

          {p.coaching && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">Comment se déroule la séance</h2>
              <ol className="mt-5 space-y-3">
                {[
                  "Vous payez en ligne par Mobile Money ou carte.",
                  `Vous choisissez un créneau dans l'agenda de ${seller.name.split(" ")[0]}.`,
                  `Séance de ${p.coaching.duration}, format : ${p.coaching.format}.`,
                  "Vous recevez un compte rendu écrit avec votre plan d'action.",
                ].map((t, i) => (
                  <li key={t} className="flex items-start gap-3 rounded-card border border-line bg-white p-4 text-[15px] shadow-soft">
                    <span className="num flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">{i + 1}</span> {t}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {p.reviewsCount > 0 && <Reviews rating={p.rating} count={p.reviewsCount} items={p.reviews} label={audience} />}
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-6"><BuyCard p={p} /></div>
        </aside>
      </div>

      <div className="lg:hidden">
        <section aria-label="Achat" className="mx-auto max-w-6xl px-5 pb-8"><BuyCard p={p} /></section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-4 border-t border-line bg-white px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="min-w-0">
          <div className="text-xs text-ink-2">Paiement unique</div>
          <Price p={p} />
        </div>
        <Link href={checkoutUrl(p)} className="flex-1 rounded-btn bg-primary py-3.5 text-center font-semibold text-white hover:bg-primary-hover">{ctaLabel(p)}</Link>
      </div>
    </div>
  );
}
