"use client";

import { useState } from "react";
import { Clock, Search } from "lucide-react";
import { articles, categories } from "../../lib/site-data";

export default function ArticleList() {
  const [cat, setCat] = useState("Tous");
  const [q, setQ] = useState("");
  const list = articles.filter(
    (a) => (cat === "Tous" || a.category === cat) && (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase()),
  );
  const [featured, ...rest] = list;

  return (
    <section className="bg-page">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Catégories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat === c ? "bg-primary text-white" : "border border-line bg-white text-ink-2 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Rechercher un article</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un article…"
              className="w-full rounded-btn border border-line bg-white py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </label>
        </div>

        {!featured && <p className="mt-12 text-center text-ink-2">Aucun article ne correspond à votre recherche.</p>}

        {featured && (
          <a href={`/ressources/${featured.slug}`} className="group mt-8 grid overflow-hidden rounded-card border border-line bg-white shadow-soft md:grid-cols-2">
            <div className="overflow-hidden">
              <img src={featured.image} alt="" className="aspect-[16/10] size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="w-fit rounded-full bg-gold-light px-3 py-1 text-xs font-bold text-gold-ink">{featured.category}</span>
              <h2 className="mt-4 font-heading text-2xl font-extrabold group-hover:text-primary sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={featured.author.photo} alt="" className="size-10 rounded-full object-cover" />
                <div className="text-sm">
                  <div className="font-semibold">{featured.author.name}</div>
                  <div className="flex items-center gap-1.5 text-ink-2">{featured.date} · <Clock size={13} /> {featured.readTime}</div>
                </div>
              </div>
            </div>
          </a>
        )}

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug}>
              <a href={`/ressources/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-shadow hover:shadow-lift">
                <div className="overflow-hidden">
                  <img src={a.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{a.category}</span>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug group-hover:text-primary">{a.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-2">{a.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-ink-2">{a.date} · <Clock size={12} /> {a.readTime}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
