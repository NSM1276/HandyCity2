import data from "@/data.json";
import type { SiteData } from "@/lib/types";
import Hero from "@/components/Hero";
import ScrollPhone from "@/components/ScrollPhone";
import BrandLogos from "@/components/BrandLogos";
import Leistungen from "@/components/Leistungen";
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
      <ScrollPhone />
      <BrandLogos />
      <Leistungen />
      <Kostenrechner preise={siteData.reparaturPreise} />
      <Katalog produkte={siteData.produkte} />
      <Bewertungen />
      <FAQ />
      <Kontakt />
      <Footer />
    </main>
  );
}
