import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import SiteShell from "../../components/site/SiteShell";
import PageHero from "../../components/site/PageHero";
import ContactForm from "../../components/site/ContactForm";
import { contactChannels, offices } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Contact · Savoirpay",
  description: "Une question ? L'équipe Savoirpay vous répond sur WhatsApp, par e-mail ou par téléphone.",
};

export default function ContactPage() {
  return (
    <SiteShell cta={false}>
      <PageHero
        eyebrow="Contact"
        title={<>Parlons de <span className="text-gold">votre projet</span></>}
        text="Une question sur la plateforme, les paiements ou un partenariat ? Notre équipe vous répond rapidement."
      />
      <section className="bg-page">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-5 lg:grid-cols-[1fr_1.5fr] lg:gap-12 lg:py-20">
          <div className="min-w-0 space-y-4">
            {contactChannels.map((c) => (
              <div key={c.title} className="flex gap-4 rounded-card border border-line bg-white p-5 shadow-soft">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary"><c.icon size={20} /></span>
                <div className="min-w-0">
                  <div className="text-sm text-ink-2">{c.title}</div>
                  <div className="break-words font-heading text-lg font-bold">{c.value}</div>
                  <p className="mt-1 text-sm text-ink-2">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="rounded-card bg-forest p-5 text-white">
              <div className="font-heading font-bold">Nos bureaux</div>
              <ul className="mt-3 space-y-2">
                {offices.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-white/80"><MapPin size={15} className="text-gold" /> {o}</li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
