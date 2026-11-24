import Link from "next/link";
import { FileText, ListChecks, Sparkles, Wand2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = { title: "Créateur IA" };

const features = [
  { icon: ListChecks, title: "Plan de cours", text: "Modules et leçons proposés à partir de votre sujet et de votre public." },
  { icon: FileText, title: "Textes des leçons", text: "Un premier jet de chaque leçon, que vous relisez et adaptez." },
  { icon: Wand2, title: "Page de vente", text: "Accroche, description et points clés rédigés pour donner envie d'acheter." },
];

export default function CreateurIaPage() {
  return (
    <DashboardShell active="Créateur IA">
      <main className="mx-auto max-w-3xl space-y-6 px-4 pb-32 pt-6 sm:px-8 lg:pb-12">
        <section className="rounded-card border border-line bg-white p-6 text-center shadow-soft sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ai-light text-ai"><Sparkles size={26} /></span>
          <p className="mt-4 inline-flex rounded-full bg-ai-light px-3 py-1 text-xs font-bold text-ai">Bientôt disponible</p>
          <h1 className="mt-3 font-heading text-2xl font-extrabold sm:text-3xl">Le Créateur IA arrive</h1>
          <p className="mx-auto mt-2 max-w-lg leading-relaxed text-ink-2">
            Il vous aidera à préparer une formation en quelques minutes. En attendant, créez votre produit dans l'éditeur : il ne faut que quelques minutes pour publier une première version.
          </p>
          <Link href="/dashboard/produits/nouveau?type=formation" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover">
            Créer une formation
          </Link>
        </section>
        <ul className="grid gap-3 sm:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-card border border-line bg-white p-5 shadow-soft">
              <span className="flex size-10 items-center justify-center rounded-xl bg-ai-light text-ai"><f.icon size={19} /></span>
              <p className="mt-3 font-heading font-bold">{f.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.text}</p>
            </li>
          ))}
        </ul>
      </main>
    </DashboardShell>
  );
}
