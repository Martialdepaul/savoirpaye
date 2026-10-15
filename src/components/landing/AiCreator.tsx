"use client";

import { useState } from "react";
import { Sparkles, Check, FileText, ListChecks, Megaphone } from "lucide-react";

const outline = [
  "Module 1 : Les bases de la vente en ligne",
  "Module 2 : Choisir et présenter son produit",
  "Module 3 : Encaisser par Mobile Money",
  "Module 4 : Fidéliser ses premiers clients",
];

export default function AiCreator() {
  const [topic, setTopic] = useState("Lancer son e-commerce depuis Abidjan");
  const [shown, setShown] = useState(true);

  return (
    <section id="createur-ia" className="px-5 pb-20 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[20px] border border-ai/15 bg-ai-light p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ai ring-1 ring-ai/20">
            <Sparkles size={14} /> Créateur IA
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold sm:text-4xl">Votre cours prend forme en quelques minutes.</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            Décrivez votre sujet. L'IA propose le plan, rédige les leçons et les quiz, puis prépare votre page de vente. Vous gardez la main sur chaque mot.
          </p>
          <ul className="mt-6 space-y-3">
            {[[ListChecks, "Plan de cours structuré en modules"], [FileText, "Leçons et quiz rédigés pour vous"], [Megaphone, "Page de vente prête à publier"]].map(([Icon, t]) => {
              const I = Icon as typeof Sparkles;
              return (
                <li key={t as string} className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white text-ai ring-1 ring-ai/15"><I size={16} /></span>
                  {t as string}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-card border border-ai/15 bg-white p-5 shadow-soft">
          <label htmlFor="topic" className="text-sm font-semibold">Sujet de votre cours</label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2 w-full rounded-btn border border-line bg-page px-3.5 py-3 text-[15px] outline-none focus:border-ai focus:ring-2 focus:ring-ai/20"
          />
          <button
            onClick={() => setShown(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-btn bg-ai px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Sparkles size={17} /> Générer le plan avec l'IA
          </button>
          {shown && (
            <div className="mt-5 rounded-xl bg-ai-light p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ai">Plan proposé</div>
              <ul className="mt-3 space-y-2.5">
                {outline.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-ai" /> {o}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
