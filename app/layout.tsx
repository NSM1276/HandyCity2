import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handy City 2 — Express Reparatur · Ankauf · Verkauf · Zubehör | 1120 Wien",
  description:
    "Handy City 2 in Wien Meidling: Express Handy-Reparatur, Ankauf, Verkauf und Zubehör. Meidlinger Hauptstraße 29, 1120 Wien.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
