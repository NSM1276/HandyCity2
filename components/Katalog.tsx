"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Produkt } from "@/lib/types";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

// ─── Brand icons (tabs) ───────────────────────────────────────────────────────

function AppleLogo({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`h-[32px] w-[32px] md:h-[60px] md:w-[60px] transition-colors ${active ? "text-neutral-900" : "text-neutral-400"}`} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function SamsungLogo({ active }: { active: boolean }) {
  return (
    <span className={`text-[11px] md:text-[17px] font-black tracking-[0.15em] transition-colors ${active ? "text-[#1428A0]" : "text-neutral-400"}`}>
      SAMSUNG
    </span>
  );
}

function XiaomiLogo({ active }: { active: boolean }) {
  return (
    <span className={`flex h-[32px] w-[32px] md:h-[46px] md:w-[46px] items-center justify-center rounded-[7px] md:rounded-[10px] text-[13px] md:text-[18px] font-black transition-colors ${active ? "bg-[#FF6900] text-white" : "bg-neutral-200 text-neutral-500"}`}>
      MI
    </span>
  );
}

function ZubehoerLogo({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`h-[32px] w-[32px] md:h-[60px] md:w-[60px] transition-colors ${active ? "text-neutral-900" : "text-neutral-400"}`} aria-hidden="true">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

// ─── Brand placeholder (shown when no photo) ─────────────────────────────────

function BrandPlaceholder({ marke, kategorie }: { marke?: string; kategorie: string }) {
  if (marke === "apple") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-100 to-neutral-200">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-neutral-400" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      </div>
    );
  }
  if (marke === "samsung") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <span className="text-2xl font-black tracking-[0.15em] text-[#1428A0]/50">
          SAMSUNG
        </span>
      </div>
    );
  }
  if (marke === "xiaomi") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <span className="flex h-16 w-16 items-center justify-center rounded-[14px] bg-[#FF6900]/20 text-2xl font-black text-[#FF6900]">
          MI
        </span>
      </div>
    );
  }
  // Zubehör
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 text-neutral-400" aria-hidden="true">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────

type TabKey = "apple" | "samsung" | "xiaomi" | "zubehoer";

const TABS: { key: TabKey; label: string }[] = [
  { key: "apple",    label: "Apple" },
  { key: "samsung",  label: "Samsung" },
  { key: "xiaomi",   label: "Xiaomi" },
  { key: "zubehoer", label: "Zubehör" },
];

function TabIcon({ tabKey, active }: { tabKey: TabKey; active: boolean }) {
  if (tabKey === "apple")    return <AppleLogo active={active} />;
  if (tabKey === "samsung")  return <SamsungLogo active={active} />;
  if (tabKey === "xiaomi")   return <XiaomiLogo active={active} />;
  return <ZubehoerLogo active={active} />;
}

// ─── Component ────────────────────────────────────────────────────────────────

const APPLE_INITIAL = 4;

export default function Katalog({ produkte }: { produkte: Produkt[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("apple");
  const [expanded, setExpanded] = useState(false);

  const sichtbar = produkte.filter((p) => !p.hidden);

  const counts: Record<TabKey, number> = {
    apple:    sichtbar.filter((p) => p.marke === "apple").length,
    samsung:  sichtbar.filter((p) => p.marke === "samsung").length,
    xiaomi:   sichtbar.filter((p) => p.marke === "xiaomi").length,
    zubehoer: sichtbar.filter((p) => p.kategorie === "zubehoer").length,
  };

  const gefiltert =
    activeTab === "zubehoer"
      ? sichtbar.filter((p) => p.kategorie === "zubehoer")
      : sichtbar.filter((p) => p.marke === activeTab);

  const visible     = expanded ? gefiltert : gefiltert.slice(0, APPLE_INITIAL);
  const hasMore     = gefiltert.length > APPLE_INITIAL;
  const hiddenCount = gefiltert.length - APPLE_INITIAL;

  const handleTab = (key: TabKey) => {
    setActiveTab(key);
    setExpanded(false);
  };

  return (
    <section id="katalog" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Geräte & Zubehör
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            Unser Katalog
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {sichtbar.length} Artikel verfügbar
          </p>
        </div>

        {/* Brand tabs — icons only */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 pt-1 px-4 justify-start md:justify-center md:overflow-visible md:pb-0 md:pt-0 md:px-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTab(tab.key)}
                type="button"
                title={tab.label}
                aria-label={tab.label}
                className={`relative flex h-[61px] min-w-[61px] shrink-0 items-center justify-center rounded-2xl px-3 transition-all duration-200 md:h-[88px] md:min-w-[88px] md:px-5 ${
                  isActive
                    ? "bg-white shadow-lg shadow-neutral-200 ring-1 ring-neutral-200 scale-105"
                    : "bg-surface hover:bg-neutral-100"
                }`}
              >
                <TabIcon tabKey={tab.key} active={isActive} />
                <span className={`absolute right-0.5 top-0.5 md:-right-1.5 md:-top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none ${
                  isActive ? "bg-accent text-white" : "bg-neutral-300 text-neutral-600"
                }`}>
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: horizontal swipe */}
        <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:hidden" style={{ scrollbarWidth: "none" }}>
          {gefiltert.map((p) => (
            <div
              key={p.id}
              className="w-[200px] shrink-0 snap-start group flex flex-col overflow-hidden rounded-2xl bg-surface"
            >
              <div className="relative aspect-square overflow-hidden">
                {p.bild ? (
                  <Image
                    src={p.bild}
                    alt={p.name}
                    fill
                    sizes="200px"
                    className="object-contain p-4"
                  />
                ) : (
                  <BrandPlaceholder marke={p.marke} kategorie={p.kategorie} />
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-sm font-semibold leading-snug text-neutral-800">{p.name}</h3>
                <div className="mt-auto pt-2">
                  <p className="text-lg font-black text-accent">{p.preis} €</p>
                  <a
                    href={waLink(`Hallo, ich interessiere mich für: ${p.name} (${p.preis} €). Ist es verfügbar?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-dark px-3 py-2 text-xs font-semibold text-white"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    Anfragen
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid with expand/collapse */}
        <div className="mt-10 hidden md:grid grid-cols-3 gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  delay: i >= APPLE_INITIAL ? (i - APPLE_INITIAL) * 0.04 : 0,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  {p.bild ? (
                    <Image
                      src={p.bild}
                      alt={p.name}
                      fill
                      sizes="280px"
                      className="object-contain p-4 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <BrandPlaceholder marke={p.marke} kategorie={p.kategorie} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold leading-snug text-neutral-800">{p.name}</h3>
                  <div className="mt-auto pt-3">
                    <p className="text-xl font-black text-accent">{p.preis} €</p>
                    <a
                      href={waLink(`Hallo, ich interessiere mich für: ${p.name} (${p.preis} €). Ist es verfügbar?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-dark px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Anfragen
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Desktop expand / collapse */}
        {hasMore && (
          <div className="mt-10 hidden md:flex flex-col items-center gap-3">
            {!expanded && (
              <p className="text-sm text-neutral-400">+ {hiddenCount} weitere Artikel</p>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              type="button"
              className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-7 py-3 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-accent hover:text-accent"
            >
              {expanded ? "Weniger anzeigen" : `Alle ${gefiltert.length} anzeigen`}
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
