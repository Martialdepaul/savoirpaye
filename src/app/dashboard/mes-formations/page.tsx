import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, MessageCircle, PlayCircle } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import BottomNav from "@/components/dashboard/BottomNav";
import EmptyState from "@/components/dashboard/EmptyState";
import Cover from "@/components/sales/Cover";
import { getAccount } from "@/lib/account";
import { getLibrary } from "@/lib/learning";
import { lessonCount } from "@/lib/catalog";
import { formatDate } from "@/lib/dashboard-data";

export const metadata = { title: "Mes achats" };

export default async function MesAchatsPage() {
  const account = await getAccount();
  if (!account) redirect("/connexion?suite=/dashboard/mes-formations");
  const library = await getLibrary(account);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar />
        <main className="mx-auto max-w-5xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
          <div>
            <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Mes achats</h1>
            <p className="mt-1 text-sm text-ink-2">Les formations et produits achetés avec <strong className="break-all text-ink">{account.user.email}</strong>.</p>
          </div>

          {library.length === 0 ? (
            <EmptyState icon="learn" title="Aucun achat pour le moment"
              text={`Les formations et produits que vous achetez sur Savoirpay avec l'adresse ${account.user.email} apparaissent ici dès la confirmation du paiement.`} />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {library.map(({ product: p, purchasedAt, completed }) => {
                const total = lessonCount(p);
                const done = completed.length;
                const pct = total ? Math.round((done / total) * 100) : 0;
                const coaching = p.type === "Coaching";
                const wa = p.seller.phone ? `https://wa.me/${p.seller.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Bonjour, j'ai réservé « ${p.name} ». Quand pouvons-nous fixer la séance ?`)}` : "";
                const body = (
                  <>
                    <Cover src={p.cover} type={p.type} className="aspect-video w-full rounded-t-card" />
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <h2 className="break-words font-heading text-base font-bold leading-snug group-hover:text-primary">{p.name}</h2>
                      <p className="text-xs text-ink-2">par {p.seller.name} · acheté le {formatDate(new Date(purchasedAt))}</p>
                      {p.type === "Formation" && (
                        <div className="mt-auto space-y-1.5 pt-2">
                          <div className="flex items-center justify-between text-xs text-ink-2">
                            <span className="num">{done} / {total} leçon{total > 1 ? "s" : ""}</span>
                            <span className="num font-semibold">{pct} %</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                        </div>
                      )}
                      <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                        {p.type === "Formation" ? <><PlayCircle size={16} /> {pct === 0 ? "Commencer" : pct === 100 ? "Revoir" : "Continuer"}</>
                          : p.type === "Produit numérique" ? <><Download size={16} /> Télécharger les fichiers</>
                          : <><MessageCircle size={16} /> {wa ? `Contacter ${p.seller.name.split(" ")[0]} pour la séance` : "Le vendeur vous contacte"}</>}
                      </div>
                    </div>
                  </>
                );
                const cls = "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-shadow hover:shadow-[0_4px_20px_rgb(28_25_23/0.1)]";
                return (
                  <li key={p.id}>
                    {coaching ? (
                      wa ? <a href={wa} target="_blank" rel="noopener" className={cls}>{body}</a> : <div className={cls}>{body}</div>
                    ) : (
                      <Link href={`/dashboard/mes-formations/${p.slug}`} className={cls}>{body}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {account.shop && (
            <p className="text-sm text-ink-2">Pour voir vos propres produits comme vos acheteurs, ouvrez leur page de vente depuis <Link href="/dashboard/produits" className="font-semibold text-primary hover:underline">Produits</Link> (« Aperçu »), puis « Voir le contenu comme un acheteur ».</p>
          )}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
