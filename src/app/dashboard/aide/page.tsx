"use client";

import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Search, PlayCircle } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { helpFaqs, helpTopics } from "@/lib/site-data";

export default function AidePage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const faqs = helpFaqs.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));

  return (
    <DashboardShell active="Centre d'aide">
      <main className="mx-auto max-w-5xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
        <section className="bg-forest-glow rounded-card px-5 py-8 text-white sm:px-8 sm:py-10">
          <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Comment pouvons-nous vous aider ?</h1>
          <label className="relative mt-5 block max-w-xl">
            <span className="sr-only">Rechercher dans l'aide</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Retraits, remboursement, domaine…"
              className="w-full rounded-btn bg-white py-3.5 pl-11 pr-4 text-[15px] text-ink outline-none focus:ring-2 focus:ring-gold"
            />
          </label>
        </section>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {helpTopics.map((t) => (
            <li key={t.title}>
              <button onClick={() => setQ(t.title.split(" ")[0])} className="flex h-full w-full flex-col items-start rounded-card border border-line bg-white p-4 text-left shadow-soft transition-shadow hover:shadow-lift sm:p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary"><t.icon size={19} /></span>
                <span className="mt-3 font-heading text-sm font-bold sm:text-base">{t.title}</span>
                <span className="mt-1 hidden text-sm text-ink-2 sm:block">{t.text}</span>
              </button>
            </li>
          ))}
        </ul>

        <section>
          <h2 className="font-heading text-xl font-bold">Questions fréquentes</h2>
          <div className="mt-4 divide-y divide-line rounded-card border border-line bg-white shadow-soft">
            {faqs.length === 0 && <p className="p-6 text-sm text-ink-2">Aucun résultat pour « {q} ». Écrivez-nous, nous vous répondons rapidement.</p>}
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold sm:p-5">
                  {f.q}
                  <ChevronDown size={18} className={`shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="px-4 pb-5 text-sm leading-relaxed text-ink-2 sm:px-5">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: MessageCircle, title: "WhatsApp", text: "Réponse en moins de 2 h", cta: "Écrire", href: "https://wa.me/221770000000", cls: "bg-[#25D366] text-white" },
            { icon: Mail, title: "E-mail", text: "support@savoirpay.com", cta: "Envoyer", href: "/contact", cls: "bg-primary text-white" },
            { icon: PlayCircle, title: "Tutoriels vidéo", text: "Prise en main en 10 min", cta: "Regarder", href: "/ressources", cls: "bg-gold text-forest" },
          ].map((c) => (
            <div key={c.title} className="flex min-w-0 items-center gap-3 rounded-card border border-line bg-white p-4 shadow-soft sm:gap-4 sm:p-5">
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${c.cls}`}><c.icon size={20} /></span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{c.title}</div>
                <div className="truncate text-sm text-ink-2">{c.text}</div>
              </div>
              <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="-mr-2 inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-primary hover:underline">{c.cta}</a>
            </div>
          ))}
        </section>
      </main>
    </DashboardShell>
  );
}
