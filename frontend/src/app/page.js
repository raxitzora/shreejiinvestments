
import Hero from "@/components/HomePageComps/Hero";
import ChooseUs from "@/components/HomePageComps/ChooseUs";
import FinanceScan from "@/components/HomePageComps/FinanceScan";
import AboutUs from "@/components/HomePageComps/AboutUs";
import Service from "@/components/HomePageComps/Service";
import InvestorCorner from "@/components/HomePageComps/InvestorCorner";
import Contact from "@/components/HomePageComps/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FinanceScan />
      <ChooseUs />
      <AboutUs />
      <Service />
      <InvestorCorner />
      <Contact />
    </main>
  );
}
