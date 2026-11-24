import Link from "next/link";
import { Check, Clock, Users, Infinity as Inf, PlayCircle, FileDown, Video, Download, Eye, Mail, Edit2, MessageCircle } from "lucide-react";
import Logo from "../ui/Logo";
import AccountLink from "../auth/AccountLink";
import Curriculum from "./Curriculum";
import Cover from "./Cover";
import { fcfa } from "../../lib/dashboard-data";
import { checkoutUrl, includesOf, type CatalogProduct } from "../../lib/catalog";

const ctaLabel = (p: CatalogProduct) => (p.price === 0 ? "Obtenir gratuitement" : p.type === "Coaching" ? "Réserver ma séance" : "Acheter maintenant");
const priceNote = (p: CatalogProduct) =>
  p.price === 0 ? "Gratuit. Accès envoyé par e-mail." :
  p.type === "Coaching" ? "Paiement unique. Séance planifiée après l'achat." : p.type === "Produit numérique" ? "Paiement unique. Fichiers envoyés par e-mail." : "Paiement unique. Accès à vie.";

function Price({ p, large = false }: { p: CatalogProduct; large?: boolean }) {
  const off = p.comparePrice && p.comparePrice > p.price ? Math.round((1 - p.price / p.comparePrice) * 100) : 0;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className={`num font-heading font-extrabold text-gold-ink ${large ? "text-4xl" : "text-xl"}`}>{p.price === 0 ? "Gratuit" : fcfa(p.price)}</span>
      {off > 0 && (
        <>
          <span className={`num text-ink-2 line-through ${large ? "text-base" : "text-xs"}`}>{fcfa(p.comparePrice!)}</span>
          {large && <span className="rounded-full bg-[#ECF8EF] px-2 py-0.5 text-xs font-bold text-success">−{off} %</span>}
        </>
      )}
    </div>
  );
}

function BuyCard({ p, disabled }: { p: CatalogProduct; disabled: boolean }) {
  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-soft">
      <Price p={p} large />
      <p className="mt-1 text-sm text-ink-2">{priceNote(p)}</p>
      {disabled ? (
        <span className="mt-5 block rounded-btn bg-line py-3.5 text-center font-semibold text-ink-2">Pas encore en vente</span>
      ) : (
        <Link href={checkoutUrl(p)} className="mt-5 block rounded-btn bg-primary py-3.5 text-center font-semibold text-white transition-colors hover:bg-primary-hover">{ctaLabel(p)}</Link>
      )}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-2"><Mail size={14} className="shrink-0 text-success" /> Votre accès vous est envoyé par e-mail</p>
      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
        {includesOf(p).map((t) => (
          <li key={t} className="flex items-start gap-2.5 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-primary" /> {t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SalesView({ product: p, isOwner = false }: { product: CatalogProduct; isOwner?: boolean }) {
  const isDraft = p.status !== "En ligne";
  const audience = p.type === "Formation" ? "élève" : "client";
  const s = p.seller;
  const sellerFirst = s.name.split(" ")[0];
  const initials = s.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      {isOwner && (
        <div role="status" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-ink px-4 py-2.5 text-center text-sm text-white">
          <span className="flex items-center gap-2"><Eye size={16} className="shrink-0" />
            {isDraft ? `Aperçu : ce produit est ${p.status === "Brouillon" ? "en brouillon" : "archivé"} et n'est pas visible par vos clients.` : "Vous voyez votre page de vente comme vos clients."}
          </span>
          <Link href={`/dashboard/produits/${p.id}/modifier`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold underline"><Edit2 size={14} /> Modifier</Link>
          {p.type !== "Coaching" && <Link href={`/dashboard/mes-formations/${p.slug}`} className="inline-flex min-h-11 items-center font-semibold text-gold underline">Voir le contenu comme un acheteur</Link>}
        </div>
      )}
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
          <Logo />
          <AccountLink />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-5 lg:grid-cols-[1fr_360px] lg:gap-12 lg:py-12">
        <main className="min-w-0 space-y-12">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-card bg-primary">
              <Cover src={p.cover} type={p.type} className="size-full" iconSize={56} />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-semibold">
                {p.type === "Formation" ? <><PlayCircle size={17} className="text-primary" /> Formation en ligne</> : p.type === "Coaching" ? <><Video size={17} className="text-primary" /> Coaching</> : <><FileDown size={17} className="text-primary" /> Produit numérique</>}
              </span>
            </div>

            <h1 className="mt-6 break-words font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{p.name}</h1>
            {p.subtitle && <p className="mt-3 text-lg leading-relaxed text-ink-2">{p.subtitle}</p>}

            <div className="num mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {p.sales > 0 && <span className="flex items-center gap-1.5 text-ink-2"><Users size={15} /> {p.sales.toLocaleString("fr-FR")} {audience}{p.sales > 1 ? "s" : ""}</span>}
              {p.coaching && <span className="flex items-center gap-1.5 text-ink-2"><Clock size={15} /> {p.coaching.duration}</span>}
            </div>

            <Link href={`/boutique/${s.shopSlug}`} className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-btn py-1 pr-2 hover:bg-white">
              {s.image ? <img src={s.image} alt="" referrerPolicy="no-referrer" className="size-11 rounded-full object-cover" />
                : <span className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-white">{initials}</span>}
              <span>
                <span className="block text-sm font-semibold">{s.name}</span>
                <span className="block text-xs text-ink-2">{s.shopName} · Voir la boutique</span>
              </span>
            </Link>
          </div>

          {p.goals.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">{p.type === "Formation" ? "Ce que vous allez apprendre" : "Ce que vous obtenez"}</h2>
              <ul className="mt-5 grid gap-3 rounded-card border border-line bg-white p-5 shadow-soft sm:grid-cols-2 sm:p-6">
                {p.goals.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-primary" /> {g}</li>
                ))}
              </ul>
              {p.type === "Formation" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-ink-2"><Inf size={16} className="text-primary" /> Accès à vie, sur téléphone et ordinateur</p>
              )}
            </section>
          )}

          {p.description && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">Description</h2>
              <div className="mt-4 whitespace-pre-line break-words leading-relaxed text-ink-2">{p.description}</div>
            </section>
          )}

          {p.modules.length > 0 && <Curriculum modules={p.modules} />}

          {p.files.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">Contenu du téléchargement</h2>
              <ul className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
                {p.files.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><Download size={18} /></span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.name}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-2">Les liens de téléchargement sont disponibles dans votre espace « Mes achats » dès la confirmation du paiement.</p>
            </section>
          )}

          {p.coaching && (
            <section>
              <h2 className="font-heading text-2xl font-extrabold">Comment se déroule la séance</h2>
              <ol className="mt-5 space-y-3">
                {[
                  p.price === 0 ? "Vous réservez gratuitement en ligne." : "Vous commandez en ligne et réglez par Mobile Money.",
                  `${sellerFirst} vous contacte${s.phone ? " sur WhatsApp" : ""} pour fixer la date de la séance.`,
                  `Séance de ${p.coaching.duration}, format : ${p.coaching.format}.`,
                ].map((t, i) => (
                  <li key={t} className="flex items-start gap-3 rounded-card border border-line bg-white p-4 text-[15px] shadow-soft">
                    <span className="num flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">{i + 1}</span> {t}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {s.phone && (
            <section className="rounded-card border border-line bg-white p-5 shadow-soft">
              <p className="font-semibold">Une question avant d'acheter ?</p>
              <a href={`https://wa.me/${s.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour, j'ai une question sur « ${p.name} ».`)}`} target="_blank" rel="noopener"
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-btn border border-line px-4 text-sm font-semibold hover:bg-page">
                <MessageCircle size={16} className="text-success" /> Écrire à {sellerFirst} sur WhatsApp
              </a>
            </section>
          )}
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-6"><BuyCard p={p} disabled={isDraft} /></div>
        </aside>
      </div>

      <div className="lg:hidden">
        <section aria-label="Achat" className="mx-auto max-w-6xl px-4 pb-8 sm:px-5"><BuyCard p={p} disabled={isDraft} /></section>
      </div>

      {!isDraft && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-4 border-t border-line bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 lg:hidden">
          <div className="min-w-0">
            <div className="text-xs text-ink-2">{p.price === 0 ? "Accès offert" : "Paiement unique"}</div>
            <Price p={p} />
          </div>
          <Link href={checkoutUrl(p)} className="flex min-h-12 flex-1 items-center justify-center rounded-btn bg-primary px-3 text-center font-semibold text-white hover:bg-primary-hover">{ctaLabel(p)}</Link>
        </div>
      )}
    </div>
  );
}
