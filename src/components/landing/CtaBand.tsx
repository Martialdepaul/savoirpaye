import { ArrowRight, Wallet, TrendingUp } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-mint">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.4fr_0.6fr] lg:py-20">
        {/* Photo + notification de vente */}
        <div className="relative mx-auto w-full max-w-[340px]">
          <img src="/images/cta-creatrice.jpg" alt="Une créatrice avec un casque, souriante devant son ordinateur" className="aspect-[4/3] w-full rounded-[24px] object-cover shadow-lift" />
          <div aria-hidden className="absolute -top-4 -left-3 flex items-center gap-2 rounded-card bg-forest px-3.5 py-2.5 text-white shadow-lift">
            <Wallet size={15} className="text-gold" />
            <span className="num text-xs font-semibold">1 248 500 FCFA <span className="inline-flex items-center gap-0.5 text-gold"><TrendingUp size={12} /> +18 %</span></span>
          </div>
          <div aria-hidden className="floatin absolute -bottom-5 -right-3 rounded-card bg-white px-4 py-3 text-sm shadow-lift">
            <div className="text-[11px] text-ink-2">À l'instant</div>
            <div className="num font-semibold">Nouvelle vente : <span className="text-success">+25 000</span></div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Prêt à transformer votre expertise en revenu ?</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-primary sm:text-4xl">Rejoignez des milliers de créateurs qui ont déjà choisi Savoirpay !</h2>
          <p className="mt-3 text-ink-2">Créez votre compte maintenant et commencez à vendre en quelques minutes.</p>
          <a href="/inscription" className="mt-7 inline-flex items-center gap-2 rounded-btn bg-gold px-6 py-3.5 font-bold text-forest transition-colors hover:bg-gold-hover">
            Créer mon compte gratuitement <ArrowRight size={18} />
          </a>
        </div>

        <p aria-hidden className="hidden rotate-[-6deg] text-center font-hand text-3xl leading-tight text-primary lg:block">
          Votre savoir<br />a de la valeur !
        </p>
      </div>
    </section>
  );
}
