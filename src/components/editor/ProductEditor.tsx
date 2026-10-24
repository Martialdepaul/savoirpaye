"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AlertCircle, ArrowLeft, Check, Eye, FileDown, GraduationCap, ImagePlus, Loader2, Plus, Trash2, Upload, Video, X } from "lucide-react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import ModulesEditor from "./ModulesEditor";
import { useToast } from "../ui/Toast";
import { fcfa } from "../../lib/dashboard-data";
import { productUrl, slugify, type ProductStatus, type ProductType } from "../../lib/catalog";
import { formatSize, uid, validate, type Draft, type Errors } from "./types";

const COMMISSION = 0.05;
const MAX_COVER = 5 * 1024 * 1024;

const input = "mt-2 w-full rounded-btn border bg-white px-3.5 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm";
const types: { type: ProductType; icon: typeof GraduationCap; text: string }[] = [
  { type: "Formation", icon: GraduationCap, text: "Un cours en vidéo ou en texte, organisé en modules et leçons." },
  { type: "Produit numérique", icon: FileDown, text: "Des fichiers à télécharger : modèles, e-books, guides, packs." },
  { type: "Coaching", icon: Video, text: "Une séance individuelle en visio, réservée et payée en ligne." },
];
const statuses: { s: ProductStatus; text: string }[] = [
  { s: "Brouillon", text: "Visible par vous seul·e. Idéal pour préparer le contenu." },
  { s: "En ligne", text: "Votre page de vente est publique et les clients peuvent acheter." },
  { s: "Archivé", text: "Retiré de la vente. Les acheteurs gardent leur accès." },
];

function Card({ id, title, hint, children }: { id?: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-card border border-line bg-white p-4 shadow-soft sm:p-6">
      <h2 className="font-heading text-lg font-bold">{title}</h2>
      {hint && <p className="mt-1 text-sm text-ink-2">{hint}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const Err = ({ msg }: { msg?: string }) => (msg ? <p role="alert" className="mt-1.5 text-sm text-danger">{msg}</p> : null);

export function TypePicker({ onPick }: { onPick: (t: ProductType) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {types.map(({ type, icon: Icon, text }) => (
        <button key={type} type="button" onClick={() => onPick(type)}
          className="group flex flex-col items-start rounded-card border border-line bg-white p-5 text-left shadow-soft transition-colors hover:border-primary">
          <span className="flex size-11 items-center justify-center rounded-btn bg-primary-light text-primary"><Icon size={22} /></span>
          <span className="mt-4 font-heading text-base font-bold group-hover:text-primary">{type}</span>
          <span className="mt-1 text-sm leading-relaxed text-ink-2">{text}</span>
        </button>
      ))}
    </div>
  );
}

export default function ProductEditor({ initial, isNew }: { initial: Draft; isNew: boolean }) {
  const router = useRouter();
  const [d, setD] = useState<Draft>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [coverError, setCoverError] = useState("");
  const slugTouched = useRef(!isNew);
  const [toast, showToast] = useToast();

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setD((prev) => {
      const next = { ...prev, [k]: v };
      if (k === "name" && !slugTouched.current) next.slug = slugify(String(v));
      return next;
    });
    setDirty(true);
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // Prévient la perte de modifications non enregistrées
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const price = Number(d.price) || 0;
  const net = Math.round(price * (1 - COMMISSION));
  const publicPath = useMemo(() => productUrl({ slug: d.slug || "votre-produit", type: d.type }), [d.slug, d.type]);

  const pickCover = (f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return setCoverError("Choisissez une image (JPG, PNG ou WebP).");
    if (f.size > MAX_COVER) return setCoverError("L'image dépasse 5 Mo. Choisissez une image plus légère.");
    setCoverError("");
    set("cover", URL.createObjectURL(f));
  };

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    set("files", [...d.files, ...Array.from(list).map((f) => ({ id: uid("f"), name: f.name, size: formatSize(f.size) }))]);
    setErrors((e) => ({ ...e, content: undefined }));
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate(d);
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSaving(true);
    // Simulation de l'appel API, à remplacer par le back-end
    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      showToast(d.status === "En ligne" ? "Produit publié" : "Modifications enregistrées");
      if (isNew) setTimeout(() => router.push("/dashboard/produits"), 900);
    }, 700);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="min-h-screen">
      <Sidebar active="Produits" />
      <div className="lg:pl-64">
        <Topbar />
        <form onSubmit={save} noValidate className="mx-auto max-w-3xl space-y-5 px-4 pb-36 pt-6 sm:px-8">
          <div>
            <Link href="/dashboard/produits" className="-ml-1 inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={16} /> Produits</Link>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">{isNew ? `Nouveau : ${d.type.toLowerCase()}` : "Modifier le produit"}</h1>
            </div>
          </div>

          {errorCount > 0 && (
            <div role="alert" className="flex items-start gap-3 rounded-card border border-danger/30 bg-[#FCEDED] p-4 text-sm text-danger">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{errorCount === 1 ? "Un champ est à corriger" : `${errorCount} champs sont à corriger`} avant d'enregistrer.</p>
                <ul className="mt-1 list-disc pl-4">{Object.values(errors).filter(Boolean).map((m) => <li key={m}>{m}</li>)}</ul>
              </div>
            </div>
          )}

          <Card title="Informations">
            <div className="space-y-5">
              <div id="field-name">
                <label htmlFor="name" className="text-sm font-semibold">Titre <span className="text-danger">*</span></label>
                <input id="name" value={d.name} onChange={(e) => set("name", e.target.value)} maxLength={90} placeholder="Ex. : Maîtriser Excel en 7 jours"
                  aria-invalid={!!errors.name} className={`${input} ${errors.name ? "border-danger" : "border-line"}`} />
                <Err msg={errors.name} />
              </div>
              <div id="field-slug">
                <label htmlFor="slug" className="text-sm font-semibold">Adresse de la page</label>
                <div className={`mt-2 flex items-center overflow-hidden rounded-btn border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${errors.slug ? "border-danger" : "border-line"}`}>
                  <span className="hidden shrink-0 border-r border-line bg-page px-3 py-3 text-sm text-ink-2 sm:block">savoirpay.com{publicPath.replace(/[^/]+$/, "")}</span>
                  <input id="slug" value={d.slug} onChange={(e) => { slugTouched.current = true; set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")); }}
                    aria-invalid={!!errors.slug} aria-describedby="slug-hint" className="min-w-0 flex-1 px-3.5 py-3 text-base outline-none sm:text-sm" />
                </div>
                <p id="slug-hint" className="mt-1.5 break-all text-xs text-ink-2">savoirpay.com{publicPath}</p>
                <Err msg={errors.slug} />
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor="subtitle" className="text-sm font-semibold">Accroche</label>
                  <span className="num text-xs text-ink-2">{d.subtitle.length} / 160</span>
                </div>
                <textarea id="subtitle" rows={2} maxLength={160} value={d.subtitle} onChange={(e) => set("subtitle", e.target.value)}
                  placeholder="Une phrase qui donne envie : à qui s'adresse le produit et ce qu'il apporte." className={`${input} border-line`} />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-semibold">Description</label>
                <textarea id="description" rows={5} value={d.description} onChange={(e) => set("description", e.target.value)}
                  placeholder="Présentez votre produit en détail." className={`${input} border-line`} />
              </div>
            </div>
          </Card>

          <Card title="Image de couverture" hint="Format paysage 16:9 conseillé (1400 × 800 px), 5 Mo maximum.">
            {d.cover ? (
              <div className="relative overflow-hidden rounded-btn border border-line">
                <img src={d.cover} alt="Aperçu de la couverture" className="aspect-[16/9] w-full object-cover" />
                <div className="absolute right-2 top-2 flex gap-2">
                  <label className="flex min-h-10 cursor-pointer items-center gap-1.5 rounded-btn bg-white/95 px-3 text-sm font-semibold shadow-soft hover:bg-white">
                    <Upload size={15} /> Remplacer
                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickCover(e.target.files?.[0])} />
                  </label>
                  <button type="button" onClick={() => set("cover", "")} aria-label="Retirer l'image" className="flex size-10 items-center justify-center rounded-btn bg-white/95 text-danger shadow-soft hover:bg-white"><Trash2 size={16} /></button>
                </div>
              </div>
            ) : (
              <label className="flex aspect-[16/9] cursor-pointer flex-col items-center justify-center gap-2 rounded-btn border-2 border-dashed border-line bg-page px-4 text-center hover:border-primary">
                <ImagePlus size={30} className="text-ink-2" />
                <span className="font-semibold text-primary">Choisir une image</span>
                <span className="text-xs text-ink-2">JPG, PNG ou WebP</span>
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => pickCover(e.target.files?.[0])} />
              </label>
            )}
            <Err msg={coverError} />
          </Card>

          <Card title="Prix">
            <div className="grid gap-5 sm:grid-cols-2">
              <div id="field-price">
                <label htmlFor="price" className="text-sm font-semibold">Prix de vente <span className="text-danger">*</span></label>
                <div className="relative">
                  <input id="price" inputMode="numeric" value={d.price} onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))} placeholder="25000"
                    aria-invalid={!!errors.price} className={`${input} num pr-16 ${errors.price ? "border-danger" : "border-line"}`} />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 mt-1 -translate-y-1/2 text-sm font-semibold text-ink-2">FCFA</span>
                </div>
                <Err msg={errors.price} />
              </div>
              <div id="field-comparePrice">
                <label htmlFor="compare" className="text-sm font-semibold">Prix barré <span className="font-normal text-ink-2">(facultatif)</span></label>
                <div className="relative">
                  <input id="compare" inputMode="numeric" value={d.comparePrice} onChange={(e) => set("comparePrice", e.target.value.replace(/\D/g, ""))} placeholder="35000"
                    aria-invalid={!!errors.comparePrice} className={`${input} num pr-16 ${errors.comparePrice ? "border-danger" : "border-line"}`} />
                  <span className="pointer-events-none absolute right-3.5 top-1/2 mt-1 -translate-y-1/2 text-sm font-semibold text-ink-2">FCFA</span>
                </div>
                <Err msg={errors.comparePrice} />
              </div>
            </div>
            <p className="num mt-4 rounded-btn bg-gold-light px-4 py-3 text-sm text-gold-ink">
              {price > 0 ? <>Vous recevez <strong>{fcfa(net)}</strong> par vente, après la commission de {COMMISSION * 100} %.</> : "Laissez 0 pour proposer ce produit gratuitement."}
            </p>
          </Card>

          <div id="field-content" className="scroll-mt-24">
            {d.type === "Formation" && (
              <Card title="Programme" hint="Organisez votre formation en modules, puis ajoutez les leçons de chaque module.">
                <ModulesEditor modules={d.modules} onChange={(m) => { set("modules", m); setErrors((e) => ({ ...e, content: undefined })); }} />
                <Err msg={errors.content} />
              </Card>
            )}
            {d.type === "Produit numérique" && (
              <Card title="Fichiers à télécharger" hint="Vos acheteurs reçoivent un lien de téléchargement juste après le paiement.">
                <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-btn border-2 border-dashed border-line bg-page px-4 py-6 text-center hover:border-primary"
                  onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
                  <Upload size={26} className="text-ink-2" />
                  <span className="font-semibold text-primary">Ajouter des fichiers</span>
                  <span className="text-xs text-ink-2">PDF, ZIP, Word, Excel… 500 Mo maximum par fichier</span>
                  <input type="file" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                </label>
                {d.files.length > 0 && (
                  <ul className="mt-4 divide-y divide-line rounded-btn border border-line">
                    {d.files.map((f) => (
                      <li key={f.id} className="flex items-center gap-3 px-3 py-2">
                        <FileDown size={18} className="shrink-0 text-primary" />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.name}</span>
                        <span className="num shrink-0 text-xs text-ink-2">{f.size}</span>
                        <button type="button" onClick={() => set("files", d.files.filter((x) => x.id !== f.id))} aria-label={`Retirer ${f.name}`}
                          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-danger"><X size={16} /></button>
                      </li>
                    ))}
                  </ul>
                )}
                <Err msg={errors.content} />
              </Card>
            )}
            {d.type === "Coaching" && (
              <Card title="Séance" hint="Après l'achat, votre client vous contacte pour fixer le créneau.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cdur" className="text-sm font-semibold">Durée</label>
                    <select id="cdur" value={d.coachingDuration} onChange={(e) => set("coachingDuration", e.target.value)} className={`${input} border-line`}>
                      {["30 min", "45 min", "60 min", "90 min", "2 h"].map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cfmt" className="text-sm font-semibold">Format</label>
                    <select id="cfmt" value={d.coachingFormat} onChange={(e) => set("coachingFormat", e.target.value)} className={`${input} border-line`}>
                      {["Visio (Google Meet ou WhatsApp)", "Appel WhatsApp", "En présentiel"].map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div id="field-goals" className="scroll-mt-24">
            <Card title={d.type === "Formation" ? "Ce que vos élèves vont apprendre" : "Ce que vos clients obtiennent"} hint="3 à 6 points courts, affichés en haut de votre page de vente.">
              <ul className="space-y-2.5">
                {d.goals.map((g, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check size={17} className="shrink-0 text-primary" />
                    <label htmlFor={`goal-${i}`} className="sr-only">Point clé {i + 1}</label>
                    <input id={`goal-${i}`} value={g} onChange={(e) => set("goals", d.goals.map((x, j) => (j === i ? e.target.value : x)))} placeholder={`Point clé ${i + 1}`}
                      className="w-full rounded-btn border border-line bg-white px-3.5 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm" />
                    <button type="button" onClick={() => set("goals", d.goals.filter((_, j) => j !== i))} aria-label={`Supprimer le point clé ${i + 1}`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-danger"><Trash2 size={16} /></button>
                  </li>
                ))}
              </ul>
              {d.goals.length < 6 && (
                <button type="button" onClick={() => set("goals", [...d.goals, ""])} className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-btn px-3 text-sm font-semibold text-primary hover:bg-primary-light">
                  <Plus size={16} /> Ajouter un point
                </button>
              )}
              <Err msg={errors.goals} />
            </Card>
          </div>

          <Card title="Publication">
            <div role="radiogroup" aria-label="Statut du produit" className="grid gap-3 sm:grid-cols-3">
              {statuses.filter(({ s }) => !isNew || s !== "Archivé").map(({ s, text }) => (
                <button key={s} type="button" role="radio" aria-checked={d.status === s} onClick={() => set("status", s)}
                  className={`rounded-btn border p-4 text-left transition-colors ${d.status === s ? "border-primary bg-primary-light ring-1 ring-primary" : "border-line bg-white hover:border-primary/50"}`}>
                  <span className="flex items-center justify-between gap-2 font-semibold">
                    {s}
                    <span className={`flex size-5 items-center justify-center rounded-full border-2 ${d.status === s ? "border-primary bg-primary text-white" : "border-line"}`}>{d.status === s && <Check size={12} strokeWidth={3} />}</span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-2">{text}</span>
                </button>
              ))}
            </div>
          </Card>

          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:left-64">
            <div className="mx-auto flex max-w-3xl items-center gap-3 sm:px-4">
              <span className="hidden min-w-0 flex-1 truncate text-sm text-ink-2 sm:block">{dirty ? "Modifications non enregistrées" : "Tout est enregistré"}</span>
              {!isNew && (
                <a href={productUrl({ slug: initial.slug, type: initial.type })} target="_blank" rel="noopener"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 font-semibold text-ink hover:bg-page">
                  <Eye size={17} /> <span className="hidden min-[400px]:inline">Aperçu</span>
                </a>
              )}
              <button type="submit" disabled={saving} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover disabled:opacity-70 sm:flex-none">
                {saving ? <><Loader2 size={18} className="animate-spin" /> Enregistrement…</> : d.status === "En ligne" && initial.status !== "En ligne" ? "Publier" : "Enregistrer"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {toast}
    </div>
  );
}
