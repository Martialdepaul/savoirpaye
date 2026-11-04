"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

export const DEMO = { src: "/videos/savoirpay-demo.mp4", poster: "/videos/savoirpay-demo.jpg", duration: "1 min 30" };

function Player({ autoPlay = false }: { autoPlay?: boolean }) {
  return (
    <video
      src={DEMO.src}
      poster={DEMO.poster}
      controls
      autoPlay={autoPlay}
      playsInline
      preload={autoPlay ? "auto" : "none"}
      className="aspect-video w-full rounded-card bg-forest object-contain"
    >
      Votre navigateur ne lit pas cette vidéo. <a href={DEMO.src}>Télécharger la démo</a>.
    </video>
  );
}

/** Bouton « Voir la démo » qui ouvre la vidéo dans une fenêtre */
export function DemoButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <span className="flex size-6 items-center justify-center rounded-full bg-white text-forest"><Play size={12} fill="currentColor" /></span>
        Voir la démo
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Vidéo de démonstration de Savoirpay" className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <p className="font-heading font-bold">Savoirpay en {DEMO.duration}</p>
              <button ref={close} type="button" onClick={() => setOpen(false)} aria-label="Fermer la vidéo" className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <X size={20} />
              </button>
            </div>
            <Player autoPlay />
          </div>
        </div>
      )}
    </>
  );
}

/** Vidéo intégrée dans la page (page « Comment ça marche ») */
export default function DemoVideo() {
  return (
    <section id="demo" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-5 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Démo vidéo</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Savoirpay en {DEMO.duration}</h2>
        <p className="mt-3 max-w-2xl text-ink-2">Inscription, création de la boutique, cours généré par l'IA, achat en Mobile Money et retrait des gains : tout le parcours, en conditions réelles.</p>
        <div className="mt-8 shadow-lift"><Player /></div>
      </div>
    </section>
  );
}
