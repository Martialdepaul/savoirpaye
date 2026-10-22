import MarketingLayout from "../components/landing/MarketingLayout";
import Hero from "../components/landing/Hero";
import PaymentStrip from "../components/landing/PaymentStrip";
import Explore from "../components/landing/Explore";

export default function LandingPage() {
  return (
    <MarketingLayout cta={false}>
      <Hero />
      <PaymentStrip />
      <Explore />
    </MarketingLayout>
  );
}
