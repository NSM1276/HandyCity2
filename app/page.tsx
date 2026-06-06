import data from "@/data.json";
import type { SiteData } from "@/lib/types";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BrandLogos from "@/components/BrandLogos";
import Leistungen from "@/components/Leistungen";
import Reparaturservice from "@/components/Reparaturservice";
import Kostenrechner from "@/components/Kostenrechner";
import Katalog from "@/components/Katalog";
import Bewertungen from "@/components/Bewertungen";
import FAQ from "@/components/FAQ";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

const siteData = data as SiteData;

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <BrandLogos />
      <Leistungen />
      <Reparaturservice />
      <Kostenrechner />
      <Katalog produkte={siteData.produkte} />
      <Bewertungen />
      <FAQ />
      <Kontakt />
      <Footer />
    </main>
  );
}
