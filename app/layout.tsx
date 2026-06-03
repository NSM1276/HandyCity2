import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MaintenancePage from "@/components/MaintenancePage";
import { MAINTENANCE_MODE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.handycity2.at";

export const metadata: Metadata = {
  title: "Handy City 2 — Express Reparatur · Ankauf · Verkauf · Zubehör | 1120 Wien",
  description:
    "Handy City 2 in Wien Meidling: Express Handy-Reparatur, Ankauf, Verkauf und Zubehör. Meidlinger Hauptstraße 72, 1120 Wien.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Handy City 2 — Express Reparatur | Wien Meidling",
    description:
      "Express Handy-Reparatur, Ankauf & Verkauf. Meidlinger Hauptstraße 72, 1120 Wien.",
    url: SITE_URL,
    siteName: "Handy City 2",
    locale: "de_AT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handy City 2 — Express Reparatur | Wien Meidling",
    description:
      "Express Handy-Reparatur, Ankauf & Verkauf. Meidlinger Hauptstraße 72, 1120 Wien.",
  },
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
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
