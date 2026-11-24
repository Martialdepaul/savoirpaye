"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, FileText, Lock, PlayCircle, X } from "lucide-react";
import type { CatalogLesson, CatalogModule } from "../../lib/catalog";
import { embedUrl } from "../../lib/video";

export default function Curriculum({ modules }: { modules: CatalogModule[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [preview, setPreview] = useState<CatalogLesson | null>(null);
  const lessonsTotal = modules.reduce((n, m) => n + m.lessons.length, 0);
  const embed = preview?.kind === "Vidéo" ? embedUrl(preview.url) : null;

  return (
    <section id="programme">
      <h2 className="font-heading text-2xl font-extrabold">Programme de la formation</h2>
      <p className="num mt-1 text-sm text-ink-2">{modules.length} module{modules.length > 1 ? "s" : ""} · {lessonsTotal} leçon{lessonsTotal > 1 ? "s" : ""}</p>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
        {modules.map((m, i) => {
          const isOpen = open === i;
          return (
            <div key={m.id}>
              <h3>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-page sm:px-5">
                  <span className="num flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words font-heading text-[15px] font-bold">{m.title || `Module ${i + 1}`}</span>
                    <span className="num text-xs font-normal text-ink-2">{m.lessons.length} leçon{m.lessons.length > 1 ? "s" : ""}</span>
                  </span>
                  <ChevronDown size={18} className={`shrink-0 text-ink-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h3>
              {isOpen && (
                <ul className="border-t border-line bg-page/60">
                  {m.lessons.map((l) => {
                    const canPreview = l.preview && (l.url || l.content);
                    return (
                      <li key={l.id} className="flex items-center gap-3 px-4 py-3 pl-6 text-sm sm:px-5 sm:pl-[3.75rem]">
                        {canPreview ? (l.kind === "Texte" ? <FileText size={17} className="shrink-0 text-primary" /> : <PlayCircle size={17} className="shrink-0 text-primary" />) : <Lock size={16} className="shrink-0 text-ink-2" />}
                        <span className="min-w-0 flex-1 break-words">{l.title}</span>
                        {canPreview ? (
                          <button onClick={() => setPreview(l)} className="-my-1 min-h-11 shrink-0 rounded-full bg-primary-light px-3 text-xs font-semibold text-primary hover:bg-[#dff4ef]">Aperçu gratuit</button>
                        ) : (
                          l.duration && <span className="num shrink-0 text-xs text-ink-2">{l.duration}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {preview && (
        <div role="dialog" aria-modal="true" aria-label="Aperçu gratuit" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4" onClick={() => setPreview(null)}>
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-card bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-primary">Aperçu gratuit</div>
                <div className="truncate font-heading font-bold">{preview.title}</div>
              </div>
              <button onClick={() => setPreview(null)} aria-label="Fermer" className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-page"><X size={18} /></button>
            </div>
            {preview.kind === "Texte" ? (
              <div className="overflow-y-auto whitespace-pre-line border-t border-line px-5 py-4 leading-relaxed text-ink-2">{preview.content}</div>
            ) : embed ? (
              <div className="aspect-video bg-ink"><iframe src={embed} title={preview.title} className="size-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>
            ) : (
              <div className="border-t border-line p-6 text-center">
                <a href={preview.url} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-btn bg-primary px-5 font-semibold text-white hover:bg-primary-hover"><ExternalLink size={16} /> Ouvrir la vidéo</a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
