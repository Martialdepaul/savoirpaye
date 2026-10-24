import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col px-5 py-6">
      <header className="mx-auto w-full max-w-5xl"><Logo /></header>
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center py-12 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary-light text-primary"><SearchX size={30} /></span>
        <p className="num mt-6 font-heading text-sm font-bold text-gold-ink">Erreur 404</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold">Page introuvable</h1>
        <p className="mt-3 leading-relaxed text-ink-2">Cette page n'existe pas ou a été déplacée. Le produit que vous cherchez n'est peut-être plus en vente.</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-btn bg-primary px-6 font-semibold text-white hover:bg-primary-hover"><ArrowLeft size={17} /> Retour à l'accueil</Link>
          <Link href="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-btn border border-line bg-white px-6 font-semibold hover:bg-page">Mon tableau de bord</Link>
        </div>
      </main>
    </div>
  );
}
