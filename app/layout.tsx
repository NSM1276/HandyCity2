import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MaintenancePage from "@/components/MaintenancePage";
import { MAINTENANCE_MODE } from "@/lib/config";
import CursorSpotlight from "@/components/CursorSpotlight";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.handycity2.at";

export const metadata: Metadata = {
  title: "Handy City 2 — Handy Reparatur Wien · iPhone · Samsung · Huawei | 1120 Wien Meidling",
  description:
    "Handy City 2 in Wien Meidling: Express Handy-Reparatur ohne Termin – iPhone, Samsung, Huawei, Xiaomi, Google Pixel. Display, Akku, Wasserschaden. Ankauf & Zubehör. Meidlinger Hauptstraße 72, 1120 Wien.",
  keywords: [
    "Handy Reparatur Wien",
    "Handy Reparatur Wien Meidling",
    "iPhone Reparatur Wien",
    "Samsung Reparatur Wien",
    "Display Reparatur Wien",
    "Akku tauschen Wien",
    "Handy City 2",
    "Smartphone Reparatur 1120",
    "Handy Ankauf Wien",
    "Laptop Reparatur Wien",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Handy City 2 — Express Handy Reparatur Wien Meidling",
    description:
      "Express Handy-Reparatur ohne Termin – iPhone, Samsung, Huawei & mehr. Display, Akku, Wasserschaden. Ankauf & Zubehör. Meidlinger Hauptstraße 72, 1120 Wien.",
    url: SITE_URL,
    siteName: "Handy City 2",
    locale: "de_AT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handy City 2 — Express Handy Reparatur Wien Meidling",
    description:
      "Express Handy-Reparatur ohne Termin – iPhone, Samsung, Huawei & mehr. Meidlinger Hauptstraße 72, 1120 Wien.",
  },
  other: {
    "geo.region": "AT-9",
    "geo.placename": "Wien Meidling",
    "geo.position": "48.1772;16.3335",
    "ICBM": "48.1772, 16.3335",
  },
};

// LocalBusiness + RepairShop structured data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectronicsStore"],
  name: "Handy City 2",
  image: `${SITE_URL}/logo.webp`,
  url: SITE_URL,
  telephone: "+43-664-4936374",
  email: "madona1210wien@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Meidlinger Hauptstraße 72",
    addressLocality: "Wien",
    addressRegion: "Wien",
    postalCode: "1120",
    addressCountry: "AT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.1772,
    longitude: 16.3335,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  description:
    "Handy City 2 in Wien Meidling bietet Express-Reparaturen für Smartphones und Laptops – ohne Termin. Spezialisiert auf Display-Tausch, Akku-Wechsel, Wasserschäden und mehr. Marken: Apple iPhone, Samsung Galaxy, Huawei, Xiaomi, Google Pixel. Auch Ankauf gebrauchter Geräte.",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  areaServed: {
    "@type": "City",
    name: "Wien",
  },
  hasMap: "https://maps.app.goo.gl/Ly4Niuhgg1ZF7Xkd7",
  sameAs: [
    "https://maps.app.goo.gl/Ly4Niuhgg1ZF7Xkd7",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return (
    <html lang="de" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans">
        <CursorSpotlight />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
