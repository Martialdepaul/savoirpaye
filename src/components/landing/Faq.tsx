"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../../lib/mock-data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
      <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">Questions fréquentes</h2>
      <div className="mt-10 divide-y divide-line rounded-card border border-line bg-white shadow-soft">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-base font-semibold sm:px-6"
                >
                  {f.q}
                  <Plus size={20} className={`shrink-0 text-primary transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <div id={`faq-${i}`} className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 leading-relaxed text-ink-2 sm:px-6">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
