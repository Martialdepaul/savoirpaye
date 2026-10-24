import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Logo from "../ui/Logo";

export type LegalSection = { id: string; title: string; body: ReactNode };

const pages = [
  { href: "/cgu", label: "Conditions d'utilisation" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export default function LegalPage({ title, updated, intro, sections, current }: { title: string; updated: string; intro: ReactNode; sections: LegalSection[]; current: string }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Logo />
          <Link href="/" className="-mr-3 inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-ink-2 hover:text-ink"><ArrowLeft size={15} /> Accueil</Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        <nav aria-label="Documents légaux" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1">
          {pages.map((p) => (
            <Link key={p.href} href={p.href} aria-current={p.href === current ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold ${p.href === current ? "border-primary bg-primary text-white" : "border-line bg-white text-ink-2 hover:text-ink"}`}>
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          <aside className="hidden lg:block">
            <nav aria-label="Sommaire" className="sticky top-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-2">Sommaire</p>
              <ol className="mt-3 space-y-1 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}><a href={`#${s.id}`} className="block rounded-lg px-2 py-1.5 text-ink-2 hover:bg-white hover:text-ink">{i + 1}. {s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0">
            <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-ink-2">Dernière mise à jour : {updated}</p>
            <div className="mt-6 text-[15px] leading-relaxed text-ink-2">{intro}</div>

            <details className="mt-6 rounded-card border border-line bg-white p-4 lg:hidden">
              <summary className="min-h-6 cursor-pointer font-semibold">Sommaire</summary>
              <ol className="mt-3 space-y-1 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}><a href={`#${s.id}`} className="block py-2 text-ink-2 hover:text-ink">{i + 1}. {s.title}</a></li>
                ))}
              </ol>
            </details>

            <div className="mt-8 space-y-10">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-6">
                  <h2 className="font-heading text-xl font-bold">{i + 1}. {s.title}</h2>
                  <div className="legal mt-3 space-y-3 text-[15px] leading-relaxed text-ink-2">{s.body}</div>
                </section>
              ))}
            </div>

            <p className="mt-12 rounded-card border border-line bg-white p-5 text-sm text-ink-2">
              Une question sur ce document ? Écrivez-nous à <a href="mailto:juridique@savoirpay.com" className="font-semibold text-primary hover:underline">juridique@savoirpay.com</a>.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
