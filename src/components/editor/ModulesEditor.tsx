"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Film, Plus, Sparkles, Trash2, Upload, FileText } from "lucide-react";
import { emptyLesson, emptyModule, type EditorLesson, type EditorModule } from "./types";

const input = "w-full rounded-btn border border-line bg-white px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm";
const iconBtn = "flex size-10 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-page hover:text-ink disabled:pointer-events-none disabled:opacity-30";

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function LessonRow({ lesson: l, mi, li, count, onChange, onMove, onRemove }: {
  lesson: EditorLesson; mi: number; li: number; count: number;
  onChange: (l: EditorLesson) => void; onMove: (dir: -1 | 1) => void; onRemove: () => void;
}) {
  const id = `m${mi}-l${li}`;
  return (
    <li className="rounded-btn border border-line bg-page/60 p-3">
      <div className="flex items-center gap-2">
        <span className="num w-5 shrink-0 text-center text-xs font-bold text-ink-2">{li + 1}</span>
        <label htmlFor={`${id}-title`} className="sr-only">Titre de la leçon {li + 1}</label>
        <input id={`${id}-title`} value={l.title} onChange={(e) => onChange({ ...l, title: e.target.value })} placeholder="Titre de la leçon" className={input} />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-2 pl-7">
        <div className="flex rounded-btn border border-line bg-white p-0.5" role="radiogroup" aria-label="Format de la leçon">
          {(["Vidéo", "Texte"] as const).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={l.kind === k} onClick={() => onChange({ ...l, kind: k })}
              className={`flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${l.kind === k ? "bg-primary text-white" : "text-ink-2 hover:text-ink"}`}>
              {k === "Vidéo" ? <Film size={13} /> : <FileText size={13} />} {k}
            </button>
          ))}
        </div>
        <label htmlFor={`${id}-dur`} className="sr-only">Durée</label>
        <input id={`${id}-dur`} value={l.duration} onChange={(e) => onChange({ ...l, duration: e.target.value })} placeholder="Durée" className={`${input} w-24`} />
        <label className="flex min-h-10 cursor-pointer items-center gap-2 text-xs font-medium text-ink-2">
          <input type="checkbox" checked={l.preview} onChange={(e) => onChange({ ...l, preview: e.target.checked })} className="size-4 accent-[var(--color-primary)]" />
          Aperçu gratuit
        </label>
      </div>

      {l.kind === "Vidéo" && (
        <label className="ml-7 mt-2.5 flex min-h-11 cursor-pointer items-center gap-2 rounded-btn border border-dashed border-line bg-white px-3 text-sm text-ink-2 hover:border-primary hover:text-primary">
          <Upload size={15} className="shrink-0" />
          <span className="min-w-0 truncate">{l.file ?? "Importer la vidéo (MP4, 2 Go max.)"}</span>
          <input type="file" accept="video/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) onChange({ ...l, file: f.name }); }} />
        </label>
      )}

      <div className="mt-1 flex justify-end">
        <button type="button" onClick={() => onMove(-1)} disabled={li === 0} aria-label={`Monter la leçon ${li + 1}`} className={iconBtn}><ArrowUp size={16} /></button>
        <button type="button" onClick={() => onMove(1)} disabled={li === count - 1} aria-label={`Descendre la leçon ${li + 1}`} className={iconBtn}><ArrowDown size={16} /></button>
        <button type="button" onClick={onRemove} aria-label={`Supprimer la leçon ${li + 1}`} className={`${iconBtn} hover:text-danger`}><Trash2 size={16} /></button>
      </div>
    </li>
  );
}

export default function ModulesEditor({ modules, onChange }: { modules: EditorModule[]; onChange: (m: EditorModule[]) => void }) {
  // Seul le premier module est ouvert au départ, pour garder la page lisible
  const [open, setOpen] = useState<Set<string>>(() => new Set(modules.slice(0, 1).map((m) => m.id)));
  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const setModule = (i: number, m: EditorModule) => onChange(modules.map((x, j) => (j === i ? m : x)));
  const lessonsTotal = modules.reduce((n, m) => n + m.lessons.length, 0);

  const addModule = () => {
    const m = emptyModule();
    setOpen((s) => new Set(s).add(m.id));
    onChange([...modules, m]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="num text-sm text-ink-2">{modules.length} module{modules.length > 1 ? "s" : ""} · {lessonsTotal} leçon{lessonsTotal > 1 ? "s" : ""}</p>
        <Link href="/dashboard/createur-ia" className="inline-flex min-h-10 items-center gap-1.5 rounded-btn bg-ai-light px-3 text-sm font-semibold text-ai hover:bg-[#ebe8fd]">
          <Sparkles size={15} /> Générer le plan avec l'IA
        </Link>
      </div>

      <ol className="space-y-3">
        {modules.map((m, mi) => {
          const isOpen = open.has(m.id);
          return (
            <li key={m.id} className="rounded-card border border-line bg-white">
              <div className="flex items-center gap-1 p-2 sm:p-3">
                <button type="button" onClick={() => toggle(m.id)} aria-expanded={isOpen} aria-controls={`m${mi}-body`}
                  aria-label={`${isOpen ? "Replier" : "Déplier"} le module ${mi + 1}`} className={iconBtn}>
                  <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <span className="num flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{mi + 1}</span>
                <label htmlFor={`m${mi}-title`} className="sr-only">Titre du module {mi + 1}</label>
                <input id={`m${mi}-title`} value={m.title} onChange={(e) => setModule(mi, { ...m, title: e.target.value })} placeholder={`Titre du module ${mi + 1}`}
                  className={`${input} ml-1 min-w-0 font-semibold`} />
              </div>
              {!isOpen && (
                <button type="button" onClick={() => toggle(m.id)} className="num -mt-1 block min-h-10 w-full px-4 pb-2 text-left text-xs text-ink-2 hover:text-ink sm:pl-[5.25rem]">
                  {m.lessons.length} leçon{m.lessons.length > 1 ? "s" : ""} · Afficher
                </button>
              )}

              {isOpen && (
                <div id={`m${mi}-body`} className="border-t border-line p-3 sm:p-4">
                  <ul className="space-y-2.5">
                    {m.lessons.map((l, li) => (
                      <LessonRow
                        key={l.id}
                        lesson={l}
                        mi={mi}
                        li={li}
                        count={m.lessons.length}
                        onChange={(nl) => setModule(mi, { ...m, lessons: m.lessons.map((x, j) => (j === li ? nl : x)) })}
                        onMove={(dir) => setModule(mi, { ...m, lessons: move(m.lessons, li, li + dir) })}
                        onRemove={() => setModule(mi, { ...m, lessons: m.lessons.filter((_, j) => j !== li) })}
                      />
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => setModule(mi, { ...m, lessons: [...m.lessons, emptyLesson()] })}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-btn px-3 text-sm font-semibold text-primary hover:bg-primary-light">
                      <Plus size={16} /> Ajouter une leçon
                    </button>
                    <div className="flex">
                      <button type="button" onClick={() => onChange(move(modules, mi, mi - 1))} disabled={mi === 0} aria-label={`Monter le module ${mi + 1}`} className={iconBtn}><ArrowUp size={16} /></button>
                      <button type="button" onClick={() => onChange(move(modules, mi, mi + 1))} disabled={mi === modules.length - 1} aria-label={`Descendre le module ${mi + 1}`} className={iconBtn}><ArrowDown size={16} /></button>
                      <button type="button" onClick={() => onChange(modules.filter((_, j) => j !== mi))} disabled={modules.length === 1} aria-label={`Supprimer le module ${mi + 1}`} className={`${iconBtn} hover:text-danger`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <button type="button" onClick={addModule}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-card border border-dashed border-primary/50 text-sm font-semibold text-primary hover:bg-primary-light">
        <Plus size={17} /> Ajouter un module
      </button>
    </div>
  );
}
