import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import SiteShell from "../../../components/site/SiteShell";
import { articles } from "../../../lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return { title: a ? `${a.title} · Savoirpay` : "Article · Savoirpay", description: a?.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <SiteShell>
      <article>
        <header className="bg-forest-glow text-white">
          <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-5 lg:pt-14">
            <a href="/ressources" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/75 hover:text-white">
              <ArrowLeft size={16} /> Toutes les ressources
            </a>
            <span className="mt-6 block w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-forest">{article.category}</span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-4 text-lg text-white/80">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <img src={article.author.photo} alt="" className="size-11 rounded-full object-cover ring-2 ring-white/20" />
              <div className="text-sm">
                <div className="font-semibold">{article.author.name}</div>
                <div className="flex items-center gap-1.5 text-white/70">{article.date} · <Clock size={13} /> {article.readTime} de lecture</div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto -mt-16 max-w-4xl px-4 sm:px-5">
          <img src={article.image} alt="" className="aspect-[16/9] w-full rounded-[20px] object-cover shadow-lift" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-5 lg:py-16">
          <div className="space-y-6 text-[17px] leading-relaxed text-ink">
            {article.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="mb-3 mt-4 font-heading text-2xl font-bold">{b.h}</h2>}
                <p className={i === 0 ? "text-lg text-ink-2" : ""}>{b.p}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-card border border-line bg-mint p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-heading text-lg font-bold">Prêt à passer à l'action ?</div>
              <p className="text-sm text-ink-2">Créez votre boutique gratuitement et publiez votre premier produit aujourd'hui.</p>
            </div>
            <a href="/inscription" className="shrink-0 rounded-btn bg-gold px-5 py-3 text-center font-bold text-forest hover:bg-gold-hover">Commencer gratuitement</a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-ink-2">
            <span className="mr-1 flex items-center gap-2"><Share2 size={16} /> Partager :</span>
            {[
              ["WhatsApp", `https://wa.me/?text=${encodeURIComponent(`${article.title} https://savoirpaye.vercel.app/ressources/${article.slug}`)}`],
              ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://savoirpaye.vercel.app/ressources/${article.slug}`)}`],
              ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://savoirpaye.vercel.app/ressources/${article.slug}`)}`],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-medium text-ink hover:border-primary">{label}</a>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5">
          <h2 className="font-heading text-2xl font-extrabold">À lire aussi</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <a href={`/ressources/${a.slug}`} className="group block overflow-hidden rounded-card border border-line bg-white shadow-soft">
                  <img src={a.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{a.category}</span>
                    <h3 className="mt-2 font-heading text-base font-bold group-hover:text-primary">{a.title}</h3>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
