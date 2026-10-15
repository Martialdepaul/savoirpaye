"use client";

import { useState } from "react";
import { Check, Pencil, RefreshCw, Trash2, ChevronDown, BookOpen, PlayCircle, HelpCircle, CheckCheck, Save } from "lucide-react";
import type { CourseItem } from "../../lib/course-data";
import AiBlock from "./AiBlock";

type Item = CourseItem & { accepted: boolean; regenerated: boolean };
const icons = { module: BookOpen, lesson: PlayCircle, quiz: HelpCircle };

export const toReviewItems = (items: CourseItem[]): Item[] => items.map((i) => ({ ...i, accepted: false, regenerated: false }));

function Action({ icon: Icon, label, onClick, tone = "" }: { icon: typeof Check; label: string; onClick: () => void; tone?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-ai/15 bg-white px-2.5 py-1.5 text-xs font-semibold transition-colors hover:border-ai/40 ${tone || "text-ink"}`}
    >
      <Icon size={14} /> {label}
    </button>
  );
}

export default function StepReview({ title, items, setItems, onCreate }: { title: string; items: Item[]; setItems: (f: (p: Item[]) => Item[]) => void; onCreate: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ m0: true });
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const accepted = items.filter((i) => i.accepted).length;
  const modules = items.filter((i) => i.kind === "module");

  const patch = (id: string, p: Partial<Item>) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...p } : i)));
  const remove = (it: Item) => setItems((prev) => prev.filter((i) => (it.kind === "module" ? i.moduleId !== it.moduleId : i.id !== it.id)));
  const regenerate = (it: Item) => {
    setBusy(it.id);
    setTimeout(() => {
      patch(it.id, { title: it.alt, regenerated: true, accepted: false, alt: it.title });
      setBusy(null);
    }, 900);
  };

  const renderItem = (it: Item) => {
    const Icon = icons[it.kind];
    const isModule = it.kind === "module";
    const isEditing = editing === it.id;
    return (
      <AiBlock className={`${it.accepted ? "ring-1 ring-success/40" : ""} ${busy === it.id ? "opacity-60" : ""}`}>
        <div className="flex items-start gap-3">
          <Icon size={isModule ? 20 : 17} className="mt-0.5 shrink-0 text-ai" />
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <form
                onSubmit={(e) => { e.preventDefault(); if (draft.trim()) patch(it.id, { title: draft.trim() }); setEditing(null); }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="Modifier le titre" className="min-w-0 flex-1 rounded-btn border border-ai/40 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ai/20" />
                <div className="flex gap-2">
                  <button type="submit" className="rounded-btn bg-ai px-3.5 py-2 text-xs font-semibold text-white">Enregistrer</button>
                  <button type="button" onClick={() => setEditing(null)} className="rounded-btn border border-line bg-white px-3.5 py-2 text-xs font-semibold">Annuler</button>
                </div>
              </form>
            ) : (
              <div className={isModule ? "font-heading text-base font-bold" : "text-sm font-medium"}>
                {busy === it.id ? "Nouvelle version en cours…" : it.title}
              </div>
            )}
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-ink-2">
              <span>{it.meta}</span>
              {it.accepted && <span className="inline-flex items-center gap-1 font-semibold text-success"><Check size={12} /> Accepté</span>}
            </div>
          </div>
          {isModule && (
            <button onClick={() => setOpen({ ...open, [it.id]: !open[it.id] })} aria-expanded={!!open[it.id]} aria-label={open[it.id] ? "Réduire le module" : "Déplier le module"} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-2 hover:bg-white">
              <ChevronDown size={18} className={`transition-transform ${open[it.id] ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 sm:pl-8">
          <Action icon={Check} label={it.accepted ? "Annuler" : "Accepter"} tone={it.accepted ? "" : "text-success"} onClick={() => patch(it.id, { accepted: !it.accepted })} />
          <Action icon={Pencil} label="Modifier" onClick={() => { setEditing(it.id); setDraft(it.title); }} />
          <Action icon={RefreshCw} label="Régénérer" tone="text-ai" onClick={() => regenerate(it)} />
          <Action icon={Trash2} label="Supprimer" tone="text-danger" onClick={() => remove(it)} />
        </div>
      </AiBlock>
    );
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-heading text-lg font-bold">{title}</div>
          <div className="num mt-0.5 text-sm text-ink-2"><span className="font-semibold text-success">{accepted}</span> élément{accepted > 1 ? "s" : ""} validé{accepted > 1 ? "s" : ""} sur {items.length}</div>
        </div>
        <button onClick={() => setItems((p) => p.map((i) => ({ ...i, accepted: true })))} className="inline-flex items-center justify-center gap-2 rounded-btn border border-line px-4 py-2.5 text-sm font-semibold hover:bg-primary-light">
          <CheckCheck size={16} /> Tout accepter
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((m) => {
          const children = items.filter((i) => i.moduleId === m.moduleId && i.kind !== "module");
          return (
            <div key={m.id}>
              {renderItem(m)}
              {open[m.id] && (
                <div className="ml-3 mt-2 space-y-2 border-l border-line pl-3 sm:ml-6 sm:pl-5">
                  {children.map((c) => <div key={c.id}>{renderItem(c)}</div>)}
                </div>
              )}
              {!open[m.id] && <p className="num ml-4 mt-1.5 text-xs text-ink-2">{children.length} éléments dans ce module</p>}
            </div>
          );
        })}
        {modules.length === 0 && <p className="py-10 text-center text-ink-2">Tous les modules ont été supprimés.</p>}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onCreate}
          disabled={accepted === 0}
          className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-2 sm:w-auto"
        >
          <Save size={18} /> Créer la formation en brouillon
        </button>
      </div>
      {accepted === 0 && <p className="mt-2 text-right text-xs text-ink-2">Acceptez au moins un élément pour continuer.</p>}
    </div>
  );
}
