"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Download, ExternalLink, Eye, FileText, GraduationCap, Menu, PlayCircle, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import type { CatalogLesson, CatalogProduct } from "@/lib/catalog";
import { embedUrl } from "@/lib/video";
import { saveProgress } from "@/app/actions/learning";

type Flat = { lesson: CatalogLesson; moduleTitle: string };

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-4 break-words leading-relaxed text-ink">
      {text.split(/\n{2,}/).map((p, i) => <p key={i} className="whitespace-pre-line">{p}</p>)}
    </div>
  );
}

function Lesson({ l }: { l: CatalogLesson }) {
  if (l.kind === "Texte") {
    return <div className="rounded-card border border-line bg-white p-5 sm:p-8">{l.content ? <Paragraphs text={l.content} /> : <p className="text-ink-2">Le contenu de cette leçon n'est pas encore disponible.</p>}</div>;
  }
  if (!l.url) return <div className="flex aspect-video items-center justify-center rounded-card bg-ink px-6 text-center text-sm text-white/70">La vidéo de cette leçon n'est pas encore disponible.</div>;
  const embed = embedUrl(l.url);
  return embed ? (
    <div className="aspect-video overflow-hidden rounded-card bg-ink"><iframe src={embed} title={l.title} className="size-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>
  ) : (
    <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-card bg-ink px-6 text-center">
      <PlayCircle size={48} className="text-white/60" />
      <a href={l.url} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-btn bg-white px-5 font-semibold text-ink"><ExternalLink size={16} /> Ouvrir la vidéo</a>
    </div>
  );
}

export default function Player({ product: p, initialCompleted, isSeller }: { product: CatalogProduct; initialCompleted: string[]; isSeller: boolean }) {
  const all = useMemo<Flat[]>(() => p.modules.flatMap((m) => m.lessons.map((lesson) => ({ lesson, moduleTitle: m.title }))), [p.modules]);
  const [done, setDone] = useState(() => new Set(initialCompleted));
  const [index, setIndex] = useState(() => Math.max(0, all.findIndex((x) => !initialCompleted.includes(x.lesson.id))));
  const [drawer, setDrawer] = useState(false);

  const header = (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:px-6">
      <Link href={isSeller ? `/dashboard/produits/${p.id}/modifier` : "/dashboard/mes-formations"} className="flex min-h-11 items-center gap-1.5 px-1 text-sm font-medium text-ink-2 hover:text-ink">
        <ChevronLeft size={18} /> {isSeller ? "Retour à l'éditeur" : "Mes achats"}
      </Link>
      <div className="hidden lg:block"><Logo /></div>
      {p.type === "Formation" && all.length > 0 ? (
        <button className="flex min-h-11 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-sm font-medium text-ink-2 hover:text-ink lg:hidden" onClick={() => setDrawer(true)}>
          <Menu size={17} /> Sommaire
        </button>
      ) : <span className="w-11 lg:hidden" />}
    </header>
  );
  const sellerNote = isSeller && (
    <p className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-center text-xs text-white"><Eye size={14} /> Aperçu vendeur : vous voyez ce que voient vos acheteurs.</p>
  );

  // Produit numérique : liste des fichiers
  if (p.type !== "Formation") {
    return (
      <div className="min-h-screen bg-page">
        {sellerNote}{header}
        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-8">
          <h1 className="break-words font-heading text-2xl font-extrabold sm:text-3xl">{p.name}</h1>
          <p className="mt-1 text-sm text-ink-2">par {p.seller.name}</p>
          <ul className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
            {p.files.length === 0 && <li className="p-6 text-center text-sm text-ink-2">Aucun fichier pour le moment.</li>}
            {p.files.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:flex-nowrap sm:px-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><FileText size={18} /></span>
                <span className="min-w-0 flex-1 break-words text-sm font-medium">{f.name}</span>
                <a href={f.url} target="_blank" rel="noopener" className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-btn bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover sm:w-auto">
                  <Download size={15} /> Télécharger
                </a>
              </li>
            ))}
          </ul>
          {p.description && <div className="mt-8"><Paragraphs text={p.description} /></div>}
        </main>
      </div>
    );
  }

  if (all.length === 0) {
    return <div className="min-h-screen bg-page">{sellerNote}{header}<p className="p-10 text-center text-ink-2">Cette formation n'a pas encore de leçon.</p></div>;
  }

  const current = all[index];
  const total = all.length;
  const pct = Math.round((done.size / total) * 100);

  const persist = (next: Set<string>) => {
    setDone(next);
    if (!isSeller) saveProgress(p.slug, [...next]).catch(() => {});
  };
  const markDone = () => {
    persist(new Set([...done, current.lesson.id]));
    if (index < total - 1) setIndex(index + 1);
  };
  const go = (i: number) => { setIndex(i); setDrawer(false); window.scrollTo({ top: 0 }); };

  const sidebar = (
    <div className="py-2">
      {p.modules.map((m) => (
        <div key={m.id}>
          <div className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-wide text-ink-2">{m.title}</div>
          {m.lessons.map((l) => {
            const i = all.findIndex((x) => x.lesson.id === l.id);
            const isCurrent = i === index;
            const isDone = done.has(l.id);
            return (
              <button key={l.id} onClick={() => go(i)} className={`flex min-h-11 w-full items-start gap-3 px-4 py-2.5 text-left transition-colors ${isCurrent ? "bg-primary-light" : "hover:bg-page"}`}>
                <span className="mt-0.5">{isDone ? <CheckCircle2 size={16} className="text-primary" /> : l.kind === "Texte" ? <FileText size={16} className="text-ink-2" /> : <PlayCircle size={16} className="text-ink-2" />}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block break-words text-sm leading-snug ${isCurrent ? "font-semibold text-primary" : "text-ink"}`}>{l.title}</span>
                  {l.duration && <span className="mt-0.5 block text-[11px] text-ink-2">{l.duration}</span>}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-page">
      {sellerNote}{header}
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-80 shrink-0 flex-col overflow-y-auto border-r border-line bg-white lg:flex">
          <div className="border-b border-line p-4">
            <h2 className="break-words font-heading text-sm font-bold">{p.name}</h2>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
            <p className="num mt-1.5 text-xs text-ink-2">{done.size} / {total} leçons terminées · {pct} %</p>
          </div>
          {sidebar}
        </aside>

        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Sommaire">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
            <div className="absolute inset-y-0 right-0 flex w-80 max-w-[90%] flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between gap-2 border-b border-line p-4">
                <div className="min-w-0">
                  <h2 className="truncate font-heading text-sm font-bold">{p.name}</h2>
                  <p className="num mt-0.5 text-xs text-ink-2">{done.size} / {total} leçons terminées</p>
                </div>
                <button onClick={() => setDrawer(false)} className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-page" aria-label="Fermer"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto">{sidebar}</div>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-2">{current.moduleTitle} · {current.lesson.kind === "Texte" ? "Lecture" : "Vidéo"}{current.lesson.duration ? ` · ${current.lesson.duration}` : ""}</p>
            <h1 className="mb-5 mt-1 break-words font-heading text-xl font-extrabold sm:text-2xl">{current.lesson.title}</h1>
            <Lesson l={current.lesson} />

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button onClick={() => go(index - 1)} disabled={index === 0}
                className="flex min-h-12 items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 text-sm font-medium text-ink-2 hover:text-ink disabled:opacity-40">
                <ChevronLeft size={17} /> Leçon précédente
              </button>
              {!done.has(current.lesson.id) ? (
                <button onClick={markDone} className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-primary px-6 font-bold text-white hover:bg-primary-hover">
                  <CheckCircle2 size={18} /> Marquer comme terminée
                </button>
              ) : index < total - 1 ? (
                <button onClick={() => go(index + 1)} className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-primary px-6 font-bold text-white hover:bg-primary-hover">
                  Leçon suivante <ChevronRight size={17} />
                </button>
              ) : (
                <div className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-primary-light px-6 font-bold text-primary">
                  <GraduationCap size={18} /> {done.size === total ? "Formation terminée !" : "Dernière leçon"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
