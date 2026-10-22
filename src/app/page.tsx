import SiteShell from "../components/site/SiteShell";
import Hero from "../components/landing/Hero";
import PaymentStrip from "../components/landing/PaymentStrip";
import Testimonials from "../components/landing/Testimonials";

// Accueil volontairement court : chaque sujet a sa propre page (fonctionnalités, tarifs, ressources…)
export default function LandingPage() {
  return (
    <SiteShell>
      <Hero />
      <PaymentStrip />
      <Testimonials />
    </SiteShell>
  );
}
