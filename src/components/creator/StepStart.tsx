"use client";

import { useRef, useState } from "react";
import { Lightbulb, FileUp, UploadCloud, FileText, X } from "lucide-react";
import { ideaExamples } from "../../lib/course-data";

type Props = {
  idea: string;
  setIdea: (v: string) => void;
  files: string[];
  setFiles: (f: string[]) => void;
};

export default function StepStart({ idea, setIdea, files, setFiles }: Props) {
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const ok = Array.from(list).filter((f) => /\.(pdf|docx)$/i.test(f.name)).map((f) => f.name);
    setFiles([...new Set([...files, ...ok])]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className={`rounded-card border bg-white p-5 shadow-soft sm:p-6 ${idea ? "border-ai" : "border-line"}`}>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-ai-light text-ai"><Lightbulb size={20} /></span>
          <h2 className="font-heading text-lg font-bold">Partir d'une idée</h2>
        </div>
        <label htmlFor="idea" className="mt-4 block text-sm text-ink-2">Décrivez le sujet de votre formation</label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={4}
          placeholder="Ex. : Apprendre à vendre ses produits sur WhatsApp Business"
          className="mt-2 w-full resize-none rounded-btn border border-line bg-page px-4 py-3 text-base outline-none focus:border-ai focus:ring-2 focus:ring-ai/20"
        />
        <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-2">Exemples</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ideaExamples.map((ex) => (
            <button
              key={ex}
              onClick={() => setIdea(ex)}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-left text-sm transition-colors hover:border-ai hover:bg-ai-light hover:text-ai"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-card border bg-white p-5 shadow-soft sm:p-6 ${files.length ? "border-ai" : "border-line"}`}>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-ai-light text-ai"><FileUp size={20} /></span>
          <h2 className="font-heading text-lg font-bold">Partir de mes documents</h2>
        </div>
        <p className="mt-4 text-sm text-ink-2">L'IA structure votre programme à partir de vos supports existants.</p>
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          className={`mt-3 flex flex-col items-center rounded-card border-2 border-dashed px-4 py-8 text-center transition-colors ${drag ? "border-ai bg-ai-light" : "border-line bg-page"}`}
        >
          <UploadCloud size={28} className="text-ai" />
          <p className="mt-3 text-sm font-medium">Glissez vos fichiers ici</p>
          <p className="mt-1 text-xs text-ink-2">PDF ou DOCX, 20 Mo maximum par fichier</p>
          <button onClick={() => input.current?.click()} className="mt-4 rounded-btn border border-line bg-white px-4 py-2.5 text-sm font-semibold hover:bg-ai-light hover:text-ai">
            Parcourir mes fichiers
          </button>
          <input ref={input} type="file" accept=".pdf,.docx" multiple hidden onChange={(e) => addFiles(e.target.files)} />
        </div>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-btn border border-line px-3 py-2.5 text-sm">
                <FileText size={16} className="shrink-0 text-ai" />
                <span className="min-w-0 flex-1 truncate">{f}</span>
                <button onClick={() => setFiles(files.filter((x) => x !== f))} aria-label={`Retirer ${f}`} className="text-ink-2 hover:text-danger"><X size={16} /></button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
