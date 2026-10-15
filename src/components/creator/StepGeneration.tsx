"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, CheckCircle2, BookOpen, PlayCircle, HelpCircle } from "lucide-react";
import type { CourseItem } from "../../lib/course-data";
import AiBlock from "./AiBlock";

const icons = { module: BookOpen, lesson: PlayCircle, quiz: HelpCircle };

export default function StepGeneration({ items, onDone }: { items: CourseItem[]; onDone: () => void }) {
  const [count, setCount] = useState(0);
  const end = useRef<HTMLDivElement>(null);
  const done = count >= items.length;

  useEffect(() => {
    if (done) { onDone(); return; }
    const t = setTimeout(() => setCount((c) => c + 1), 260);
    return () => clearTimeout(t);
  }, [count, done, onDone]);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [count]);

  const shown = items.slice(0, count);
  const modulesShown = shown.filter((i) => i.kind === "module").length;
  const totalModules = items.filter((i) => i.kind === "module").length;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 rounded-card border border-ai/20 bg-ai-light px-4 py-3">
        {done ? <CheckCircle2 size={20} className="shrink-0 text-ai" /> : <Loader2 size={20} className="shrink-0 animate-spin text-ai" />}
        <div className="text-sm">
          <div className="font-semibold text-ai">{done ? "Programme généré" : "L'IA rédige votre programme…"}</div>
          <div className="num text-ink-2">{modulesShown} module{modulesShown > 1 ? "s" : ""} sur {totalModules} · {shown.length} élément{shown.length > 1 ? "s" : ""}</div>
        </div>
      </div>

      <div className="space-y-2" aria-live="polite">
        {shown.map((it) => {
          const Icon = icons[it.kind];
          const isModule = it.kind === "module";
          return (
            <div key={it.id} className={`animate-[floatin_0.35s_both] ${isModule ? "pt-3" : "ml-4 sm:ml-8"}`}>
              <AiBlock label={isModule} className={isModule ? "" : "py-3"}>
                <div className="flex items-start gap-3">
                  <Icon size={isModule ? 20 : 17} className="mt-0.5 shrink-0 text-ai" />
                  <div className="min-w-0">
                    <div className={isModule ? "font-heading text-base font-bold" : "text-sm font-medium"}>{it.title}</div>
                    <div className="text-xs text-ink-2">{it.meta}{isModule && ` · ${it.summary}`}</div>
                  </div>
                </div>
              </AiBlock>
            </div>
          );
        })}
        {!done && (
          <div className="ml-4 flex items-center gap-2 py-2 text-sm text-ai sm:ml-8">
            <span className="size-2 animate-pulse rounded-full bg-ai" /> <span className="h-3 w-40 animate-pulse rounded bg-ai/15" />
          </div>
        )}
        <div ref={end} />
      </div>
    </div>
  );
}
