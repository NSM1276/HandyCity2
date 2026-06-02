"use client";

import Image from "next/image";
import { useState } from "react";
import type { Kategorie, Produkt } from "@/lib/types";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type Filter = "alle" | Kategorie;

const TABS: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "smartphone", label: "Smartphones" },
  { key: "zubehoer", label: "Zubehör" },
];

export default function Katalog({ produkte }: { produkte: Produkt[] }) {
  const [filter, setFilter] = useState<Filter>("alle");

  const sichtbar = produkte.filter((p) => !p.hidden);
  const gefiltert =
    filter === "alle"
      ? sichtbar
      : sichtbar.filter((p) => p.kategorie === filter);

  return (
    <section id="katalog" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Geräte & Zubehör
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            Unser Katalog
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              type="button"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                filter === tab.key
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-surface text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {gefiltert.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                  src={p.bild || "/placeholder-phone.webp"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className="object-contain p-4 transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold leading-snug text-neutral-800">
                  {p.name}
                </h3>
                <div className="mt-auto pt-3">
                  <p className="text-xl font-black text-accent">{p.preis} €</p>
                  <a
                    href={waLink(
                      `Hallo, ich interessiere mich für: ${p.name} (${p.preis} €). Ist es verfügbar?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-dark px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Anfragen
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
