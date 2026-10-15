import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import PaymentStrip from "../components/landing/PaymentStrip";
import HowItWorks from "../components/landing/HowItWorks";
import AiCreator from "../components/landing/AiCreator";
import Pricing from "../components/landing/Pricing";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PaymentStrip />
        <HowItWorks />
        <AiCreator />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
