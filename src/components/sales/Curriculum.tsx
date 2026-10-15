"use client";

import { useState } from "react";
import { ChevronDown, Lock, PlayCircle, HelpCircle, X } from "lucide-react";
import { curriculum } from "../../lib/sales-data";

export default function Curriculum() {
  const [open, setOpen] = useState<number | null>(0);
  const [video, setVideo] = useState<string | null>(null);
  const lessonsTotal = curriculum.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <section id="programme">
      <h2 className="font-heading text-2xl font-extrabold">Programme de la formation</h2>
      <p className="num mt-1 text-sm text-ink-2">{curriculum.length} modules · {lessonsTotal} leçons · 4 h 20 de contenu</p>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
        {curriculum.map((m, i) => {
          const isOpen = open === i;
          return (
            <div key={m.title}>
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-page sm:px-5"
                >
                  <span className="num flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-[15px] font-bold">{m.title}</span>
                    <span className="num text-xs font-normal text-ink-2">{m.lessons.length} leçons + 1 quiz</span>
                  </span>
                  <ChevronDown size={18} className={`shrink-0 text-ink-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h3>
              {isOpen && (
                <ul className="border-t border-line bg-page/60">
                  {m.lessons.map((l) => (
                    <li key={l.title} className="flex items-center gap-3 px-4 py-3 pl-6 text-sm sm:px-5 sm:pl-[3.75rem]">
                      {l.preview ? <PlayCircle size={17} className="shrink-0 text-primary" /> : <Lock size={16} className="shrink-0 text-ink-2" />}
                      <span className="min-w-0 flex-1">{l.title}</span>
                      {l.preview ? (
                        <button onClick={() => setVideo(l.title)} className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary hover:bg-[#dff4ef]">
                          Aperçu gratuit
                        </button>
                      ) : (
                        <span className="num shrink-0 text-xs text-ink-2">{l.duration}</span>
                      )}
                    </li>
                  ))}
                  <li className="flex items-center gap-3 px-4 py-3 pl-6 text-sm text-ink-2 sm:px-5 sm:pl-[3.75rem]">
                    <HelpCircle size={17} className="shrink-0" /> {m.quiz}
                  </li>
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {video && (
        <div role="dialog" aria-modal="true" aria-label="Aperçu gratuit" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4" onClick={() => setVideo(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-card bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-primary">Aperçu gratuit</div>
                <div className="truncate font-heading font-bold">{video}</div>
              </div>
              <button onClick={() => setVideo(null)} aria-label="Fermer" className="flex size-9 items-center justify-center rounded-lg hover:bg-page"><X size={18} /></button>
            </div>
            <div className="flex aspect-video items-center justify-center bg-ink">
              <PlayCircle size={64} className="text-white/90" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
