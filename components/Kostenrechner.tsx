"use client";

import { useMemo, useState } from "react";
import type { Reparaturart, ReparaturPreise } from "@/lib/types";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

const REPARATUR_LABELS: Record<Reparaturart, string> = {
  display: "Display",
  akku: "Akku",
  charging: "Ladebuchse",
};

const REPARATUR_ARTEN: Reparaturart[] = ["display", "akku", "charging"];

function BrandLogo({ brand, selected }: { brand: string; selected: boolean }) {
  if (brand === "Apple") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`h-9 w-9 transition ${selected ? "text-neutral-800" : "text-neutral-400"}`}
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (brand === "Samsung") {
    return (
      <span className={`text-xs font-black tracking-[0.18em] transition ${selected ? "text-neutral-800" : "text-neutral-400"}`}>
        SAMSUNG
      </span>
    );
  }
  if (brand === "Xiaomi") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6900] text-xs font-black text-white">
          MI
        </div>
        <span className={`text-xs font-bold transition ${selected ? "text-neutral-800" : "text-neutral-500"}`}>Xiaomi</span>
      </div>
    );
  }
  return <span className={`text-sm font-bold transition ${selected ? "text-neutral-800" : "text-neutral-500"}`}>{brand}</span>;
}

export default function Kostenrechner({ preise }: { preise: ReparaturPreise }) {
  const marken = useMemo(() => Object.keys(preise), [preise]);

  const [marke, setMarke] = useState("");
  const [modell, setModell] = useState("");
  const [art, setArt] = useState<Reparaturart | "">("");

  const modelle = marke ? Object.keys(preise[marke]) : [];
  const preis =
    marke && modell && art ? preise[marke]?.[modell]?.[art] : undefined;

  function handleMarke(value: string) {
    setMarke(value);
    setModell("");
    setArt("");
  }

  const whatsappText =
    marke && modell && art && preis !== undefined
      ? `Hallo, ich möchte eine Reparatur anfragen:\nGerät: ${marke} ${modell}\nReparatur: ${REPARATUR_LABELS[art]}\nGeschätzter Preis: ${preis} €`
      : "";

  const selectClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-base text-neutral-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-40 appearance-none";

  return (
    <section id="kostenrechner" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Preis sofort wissen
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Reparatur-Kostenrechner
          </h2>
          <p className="mt-4 text-neutral-400">
            Wähle dein Gerät und erhalte sofort einen Richtpreis.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">

          {/* Step 1: Brand selection with logo cards */}
          <div className="p-6 border-b border-neutral-100">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                1
              </span>
              <span className="text-sm font-semibold text-neutral-700">Marke wählen</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {marken.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMarke(m)}
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 px-4 py-5 transition hover:-translate-y-0.5 active:scale-95 ${
                    marke === m
                      ? "border-accent bg-red-50 shadow-lg shadow-accent/10"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
                  }`}
                >
                  {marke === m && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <BrandLogo brand={m} selected={marke === m} />
                  {m !== "Xiaomi" && (
                    <span className={`text-xs font-semibold transition ${marke === m ? "text-accent" : "text-neutral-500"}`}>
                      {m}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Steps 2 & 3: shown only after brand is selected */}
          {marke && (
            <div className="divide-y divide-neutral-100">

              {/* Step 2: Modell */}
              <div className="relative p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    2
                  </span>
                  <label className="text-sm font-semibold text-neutral-700">Modell</label>
                </div>
                <div className="relative">
                  <select
                    className={selectClass}
                    value={modell}
                    onChange={(e) => { setModell(e.target.value); setArt(""); }}
                    title="Modell wählen"
                  >
                    <option value="">Modell wählen…</option>
                    {modelle.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Step 3: Reparaturart */}
              <div className="relative p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition ${modell ? "bg-accent" : "bg-neutral-300"}`}>
                    3
                  </span>
                  <label className={`text-sm font-semibold transition ${modell ? "text-neutral-700" : "text-neutral-400"}`}>
                    Reparaturart
                  </label>
                </div>
                <div className="relative">
                  <select
                    className={selectClass}
                    value={art}
                    onChange={(e) => setArt(e.target.value as Reparaturart)}
                    disabled={!modell}
                    title="Reparaturart wählen"
                  >
                    <option value="">Reparatur wählen…</option>
                    {REPARATUR_ARTEN.map((a) => (
                      <option key={a} value={a}>{REPARATUR_LABELS[a]}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Result + WhatsApp button */}
          <div className="border-t border-neutral-100 p-6">
            {preis !== undefined ? (
              <div className="mb-5 rounded-xl bg-accent/10 border border-accent/20 px-6 py-5 text-center">
                <p className="text-sm text-neutral-500">
                  Richtpreis für {marke} {modell} — {REPARATUR_LABELS[art as Reparaturart]}
                </p>
                <p className="mt-1 text-4xl font-black text-accent">{preis} €</p>
              </div>
            ) : (
              <div className="mb-5 rounded-xl border border-neutral-100 bg-neutral-50 px-6 py-5 text-center">
                <p className="text-neutral-400 text-sm">
                  Wähle Marke, Modell und Reparaturart für den Preis.
                </p>
              </div>
            )}

            <a
              href={whatsappText ? waLink(whatsappText) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!whatsappText}
              className={`flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-semibold transition ${
                whatsappText
                  ? "bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent-dark"
                  : "pointer-events-none bg-neutral-800 text-neutral-600"
              }`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Reparatur via WhatsApp anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
