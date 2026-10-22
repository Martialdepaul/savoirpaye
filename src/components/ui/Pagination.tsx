"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Découpe une liste en pages. La page revient à 1 dès que `resetKey` change
 * (recherche, filtre…), et reste toujours dans les bornes si la liste rétrécit.
 */
export function usePagination<T>(items: T[], pageSize = 10, resetKey = "") {
  const [state, setState] = useState({ key: resetKey, page: 1 });
  const anchorRef = useRef<HTMLDivElement>(null);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const rawPage = state.key === resetKey ? state.page : 1;
  const page = Math.min(rawPage, pageCount);
  const start = (page - 1) * pageSize;

  const setPage = (p: number) => {
    setState({ key: resetKey, page: Math.min(Math.max(1, p), pageCount) });
    // Ramène le haut de la liste à l'écran si l'utilisateur l'a dépassé
    const el = anchorRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return {
    page,
    pageCount,
    setPage,
    anchorRef,
    pageItems: items.slice(start, start + pageSize),
    total: items.length,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
  };
}

// 1 … 4 5 6 … 12 : toujours la première, la dernière et les voisines de la page courante
function pageList(page: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  const lo = Math.max(2, Math.min(page - 1, count - 4));
  const hi = Math.min(count - 1, Math.max(page + 1, 5));
  // Une ellipse ne doit jamais cacher une seule page : on affiche alors le numéro
  if (lo > 3) pages.push("…");
  else if (lo === 3) pages.push(2);
  for (let i = lo; i <= hi; i++) pages.push(i);
  if (hi < count - 2) pages.push("…");
  else if (hi === count - 2) pages.push(count - 1);
  pages.push(count);
  return pages;
}

type Props = {
  page: number;
  pageCount: number;
  total: number;
  from: number;
  to: number;
  onChange: (page: number) => void;
  label?: string;
  className?: string;
};

export default function Pagination({ page, pageCount, total, from, to, onChange, label = "résultats", className = "" }: Props) {
  if (pageCount <= 1) return null;
  const arrow =
    "flex size-11 shrink-0 items-center justify-center rounded-btn border border-line bg-white text-ink-2 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-40 sm:size-10";

  return (
    <nav aria-label="Pagination" className={`flex flex-col items-center gap-3 sm:flex-row sm:justify-between ${className}`}>
      <p className="num text-sm text-ink-2" aria-live="polite">
        <span className="font-semibold text-ink">{from}–{to}</span> sur <span className="font-semibold text-ink">{total}</span> {label}
      </p>
      <div className="flex items-center gap-1.5">
        <button type="button" onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Page précédente" className={arrow}>
          <ChevronLeft size={18} />
        </button>

        <span className="num min-w-24 text-center text-sm font-medium text-ink sm:hidden">
          Page {page} / {pageCount}
        </span>

        <ul className="hidden items-center gap-1 sm:flex">
          {pageList(page, pageCount).map((p, i) =>
            p === "…" ? (
              <li key={`e${i}`} aria-hidden="true" className="w-6 text-center text-sm text-ink-2">…</li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => onChange(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  className={`num flex size-10 items-center justify-center rounded-btn text-sm font-semibold transition-colors ${
                    p === page ? "bg-primary text-white" : "text-ink-2 hover:bg-page hover:text-ink"
                  }`}
                >
                  {p}
                </button>
              </li>
            )
          )}
        </ul>

        <button type="button" onClick={() => onChange(page + 1)} disabled={page === pageCount} aria-label="Page suivante" className={arrow}>
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}
