"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const NAV_LINKS = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#kostenrechner", label: "Reparatur" },
  { href: "#katalog", label: "Katalog" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border bg-dark/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-3">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.webp"
            alt="Handy City 2"
            width={120}
            height={68}
            className="h-auto w-[100px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-400 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink("Hallo Handy City 2, ich möchte eine Reparatur anfragen:")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-dark md:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Jetzt anfragen
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:text-white md:hidden"
          aria-label="Menü öffnen"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-dark-border bg-dark px-6 pb-5 pt-3 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-neutral-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink("Hallo Handy City 2, ich möchte eine Reparatur anfragen:")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Jetzt anfragen
          </a>
        </div>
      )}
    </header>
  );
}
