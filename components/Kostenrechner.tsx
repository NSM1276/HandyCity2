"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon, LaptopIcon } from "./icons";
import { PHONE } from "@/lib/config";

const MODELLE: Record<string, string[]> = {
  Apple: [
    "iPhone 16 Pro Max","iPhone 16 Pro","iPhone 16 Plus","iPhone 16",
    "iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15 Plus","iPhone 15",
    "iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14 Plus","iPhone 14",
    "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13 Mini","iPhone 13",
    "iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12 Mini","iPhone 12",
    "iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11",
    "iPhone Xs Max","iPhone Xs","iPhone Xr","iPhone X",
    "iPhone SE (2022)","iPhone SE (2020)",
  ],
  Samsung: [
    "Samsung Galaxy Z Flip 7","Samsung Galaxy Z Flip 7 FE","Samsung Galaxy Z Fold 7",
    "Samsung Galaxy Z Flip 6","Samsung Galaxy Z Fold 6",
    "Samsung Galaxy Z Flip 5","Samsung Galaxy Z Fold 5",
    "Samsung Galaxy Z Flip 4","Samsung Galaxy Z Fold 4",
    "Samsung Galaxy Z Flip 3","Samsung Galaxy Z Fold 3",
    "Samsung Galaxy Xcover 7","Samsung Galaxy Xcover 6","Samsung Galaxy Xcover 5","Samsung Galaxy Xcover 4S","Samsung Galaxy Xcover 4",
    "Samsung Galaxy S26 Ultra","Samsung Galaxy S26 Plus","Samsung Galaxy S26",
    "Samsung Galaxy S25 Ultra","Samsung Galaxy S25 Plus","Samsung Galaxy S25 Edge","Samsung Galaxy S25",
    "Samsung Galaxy S24 Ultra","Samsung Galaxy S24 Plus","Samsung Galaxy S24",
    "Samsung Galaxy S23 Ultra","Samsung Galaxy S23 Plus","Samsung Galaxy S23",
    "Samsung Galaxy S22 Ultra","Samsung Galaxy S22 Plus","Samsung Galaxy S22",
    "Samsung Galaxy S21 Ultra","Samsung Galaxy S21 Plus","Samsung Galaxy S21",
    "Samsung Galaxy S20 Ultra","Samsung Galaxy S20 Plus","Samsung Galaxy S20",
    "Samsung Galaxy S25 FE","Samsung Galaxy S24 FE","Samsung Galaxy S23 FE","Samsung Galaxy S21 FE","Samsung Galaxy S20 FE",
    "Samsung Galaxy S10 Plus","Samsung Galaxy S10 Lite","Samsung Galaxy S10e","Samsung Galaxy S10",
    "Samsung Galaxy Note 20 Ultra","Samsung Galaxy Note 20",
    "Samsung Galaxy Note 10+","Samsung Galaxy Note 10","Samsung Galaxy Note 10 Lite","Samsung Galaxy Note 9",
    "Samsung Galaxy A06s","Samsung Galaxy A05s","Samsung Galaxy A06","Samsung Galaxy A05",
    "Samsung Galaxy A04s","Samsung Galaxy A04","Samsung Galaxy A03","Samsung Galaxy A02","Samsung Galaxy A01",
    "Samsung Galaxy A12","Samsung Galaxy A11",
    "Samsung Galaxy A14","Samsung Galaxy A13",
    "Samsung Galaxy A17","Samsung Galaxy A16","Samsung Galaxy A15",
    "Samsung Galaxy A25","Samsung Galaxy A23","Samsung Galaxy A22","Samsung Galaxy A21","Samsung Galaxy A20",
    "Samsung Galaxy A32","Samsung Galaxy A31",
    "Samsung Galaxy A34","Samsung Galaxy A33",
    "Samsung Galaxy A37","Samsung Galaxy A36","Samsung Galaxy A35",
    "Samsung Galaxy A42","Samsung Galaxy A41","Samsung Galaxy A40",
    "Samsung Galaxy A53","Samsung Galaxy A52","Samsung Galaxy A51","Samsung Galaxy A50s","Samsung Galaxy A50",
    "Samsung Galaxy A57","Samsung Galaxy A56","Samsung Galaxy A55","Samsung Galaxy A54",
    "Samsung Galaxy A61",
    "Samsung Galaxy A71","Samsung Galaxy A70",
    "Samsung Galaxy A73","Samsung Galaxy A72",
    "Samsung Galaxy A81","Samsung Galaxy A80",
    "Samsung Galaxy A91","Samsung Galaxy A90",
  ],
  Huawei: [
    "Huawei P60 Pro","Huawei P60",
    "Huawei P50 Pro","Huawei P50","Huawei P50 Pocket",
    "Huawei P40 Pro+","Huawei P40 Pro","Huawei P40","Huawei P40 Lite","Huawei P40 Lite E",
    "Huawei P30 Pro","Huawei P30","Huawei P30 Lite","Huawei P30 Lite New Edition",
    "Huawei P20 Pro","Huawei P20","Huawei P20 Lite",
    "Huawei Mate 50 Pro","Huawei Mate 40 Pro","Huawei Mate 30 Pro","Huawei Mate 30",
    "Huawei Mate 20 Pro","Huawei Mate 20","Huawei Mate 20 Lite","Huawei Mate 10 Pro","Huawei Mate 10 Lite",
    "Huawei Nova 11","Huawei Nova 10 Pro","Huawei Nova 10","Huawei Nova 9","Huawei Nova 9 SE",
    "Huawei Nova 8i","Huawei Nova 7","Huawei Nova 5T",
    "Huawei P Smart 2021","Huawei P Smart 2020","Huawei P Smart 2019","Huawei P Smart+ 2019","Huawei P Smart Z",
    "Huawei Y7 (2019)","Huawei Y6 (2019)","Huawei Y5 (2019)","Huawei Y6p","Huawei Y5p",
  ],
  "Google Pixel": [
    "Google Pixel 10 XL","Google Pixel 10 Pro Fold","Google Pixel 10 Pro","Google Pixel 10",
    "Google Pixel 9 Pro XL","Google Pixel 9 Pro Fold","Google Pixel 9 Pro","Google Pixel 9","Google Pixel 9a",
    "Google Pixel 8 Pro","Google Pixel 8","Google Pixel 8a",
    "Google Pixel 7 Pro","Google Pixel 7a","Google Pixel 7",
    "Google Pixel 6 Pro","Google Pixel 6a","Google Pixel 6",
    "Google Pixel 5a 5G","Google Pixel 5 5G",
    "Google Pixel 4a 5G","Google Pixel 4 XL","Google Pixel 4a","Google Pixel 4",
    "Google Pixel 3a XL","Google Pixel 3a","Google Pixel 3 XL","Google Pixel 3",
    "Google Pixel 2","Google Pixel Fold",
  ],
  "Laptop / Mac": [
    "MacBook Air (M1 / M2 / M3)",
    "MacBook Pro 13\"",
    "MacBook Pro 14\"",
    "MacBook Pro 16\"",
    "Dell XPS 13 / 15",
    "Dell Inspiron 15 / 17",
    "Dell Latitude",
    "HP Pavilion 15",
    "HP EliteBook",
    "HP Spectre x360",
    "Lenovo ThinkPad X1",
    "Lenovo IdeaPad 5 / 15",
    "Lenovo Yoga",
    "Acer Aspire 5 / 7",
    "Acer Swift",
    "ASUS ZenBook",
    "ASUS VivoBook 15",
    "Microsoft Surface Pro",
    "Microsoft Surface Laptop",
    "Sonstiges Modell",
  ],
  Xiaomi: [
    "Xiaomi 15 Ultra","Xiaomi 15 Pro","Xiaomi 15",
    "Xiaomi 14 Ultra","Xiaomi 14 Pro","Xiaomi 14",
    "Xiaomi 13 Ultra","Xiaomi 13 Pro","Xiaomi 13","Xiaomi 13 Lite",
    "Xiaomi 12 Pro","Xiaomi 12","Xiaomi 12X","Xiaomi 12 Lite",
    "Xiaomi 11 Ultra","Xiaomi 11 Pro","Xiaomi 11","Xiaomi 11 Lite 5G NE","Xiaomi 11 Lite",
    "Xiaomi Mi 10T Pro","Xiaomi Mi 10T","Xiaomi Mi 10T Lite",
    "Xiaomi Mi 10 Pro","Xiaomi Mi 10","Xiaomi Mi 10 Lite",
    "Xiaomi Mi 9T Pro","Xiaomi Mi 9T","Xiaomi Mi 9","Xiaomi Mi 9 SE","Xiaomi Mi 9 Lite",
    "Redmi Note 13 Pro+","Redmi Note 13 Pro","Redmi Note 13",
    "Redmi Note 12 Pro+","Redmi Note 12 Pro","Redmi Note 12",
    "Redmi Note 11 Pro+","Redmi Note 11 Pro","Redmi Note 11S","Redmi Note 11",
    "Redmi Note 10 Pro","Redmi Note 10S","Redmi Note 10",
    "Redmi Note 9 Pro","Redmi Note 9S","Redmi Note 9",
    "Redmi Note 8 Pro","Redmi Note 8","Redmi Note 7",
    "POCO F6 Pro","POCO F6","POCO X6 Pro","POCO X6",
    "POCO F5 Pro","POCO F5","POCO X5 Pro","POCO X5",
    "POCO F4 GT","POCO F4","POCO X4 Pro","POCO F3","POCO X3 Pro","POCO X3 NFC",
  ],
};

const BRANDS = Object.keys(MODELLE);

function BrandLogo({ brand, selected }: { brand: string; selected: boolean }) {
  const cls = `transition-colors duration-200 ${selected ? "text-white" : "text-neutral-500"}`;

  if (brand === "Apple") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`h-9 w-9 ${cls}`} aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (brand === "Samsung") {
    return <span className={`text-xs font-black tracking-[0.18em] ${cls}`}>SAMSUNG</span>;
  }
  if (brand === "Huawei") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`h-8 w-8 ${cls}`} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    );
  }
  if (brand === "Google Pixel") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`h-8 w-8 ${cls}`} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.99H12v-2h3.17C14.6 16.35 13.37 17 12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.28 0 2.44.48 3.33 1.27l-1.42 1.42C13.39 9.27 12.72 9 12 9c-1.65 0-3 1.35-3 3s1.35 3 3 3c1.38 0 2.54-.94 2.89-2.21H12v-2h5.01v4.2z"/>
      </svg>
    );
  }
  if (brand === "Xiaomi") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6900] text-xs font-black text-white">
          MI
        </div>
        <span className={`text-xs font-bold ${cls}`}>Xiaomi</span>
      </div>
    );
  }
  if (brand === "Laptop / Mac") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <LaptopIcon className={`h-8 w-8 ${cls}`} />
        <span className={`text-[10px] font-bold ${cls}`}>Laptop / Mac</span>
      </div>
    );
  }
  return <span className={`text-sm font-bold ${cls}`}>{brand}</span>;
}

export default function Kostenrechner() {
  const [marke, setMarke] = useState("");
  const [modell, setModell] = useState("");

  function handleMarke(value: string) {
    setMarke(value);
    setModell("");
  }

  const modelle = marke ? MODELLE[marke] : [];
  const ready = marke && modell;

  const whatsappText = ready
    ? `Hallo, ich möchte eine Reparatur anfragen:\nGerät: ${modell}`
    : "";

  const selectClass =
    "w-full rounded-xl border border-dark-border bg-[#1c1c1c] px-4 py-3.5 text-base text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-30 appearance-none";

  return (
    <section id="kostenrechner" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
        >
          <p className="shimmer-text text-sm font-semibold uppercase tracking-widest">
            Schnell & unkompliziert
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Reparatur anfragen
          </h2>
          <p className="mt-4 text-neutral-400">
            Wähle dein Gerät und kontaktiere uns direkt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
        >

          {/* Step 1: Brand */}
          <div className="border-b border-dark-border p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">1</span>
              <span className="text-sm font-semibold text-neutral-300">Marke wählen</span>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {BRANDS.map((b) => (
                <motion.button
                  key={b}
                  type="button"
                  onClick={() => handleMarke(b)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-4 transition-colors duration-200 ${
                    marke === b
                      ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                      : "border-dark-border bg-[#1c1c1c] hover:border-neutral-600"
                  }`}
                >
                  {marke === b && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <BrandLogo brand={b} selected={marke === b} />
                  {b !== "Xiaomi" && b !== "Laptop / Mac" && (
                    <span className={`text-[10px] font-semibold leading-tight text-center transition-colors duration-200 ${marke === b ? "text-accent" : "text-neutral-500"}`}>
                      {b}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 2: Model */}
          <AnimatePresence>
            {marke && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="border-b border-dark-border p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">2</span>
                    <label className="text-sm font-semibold text-neutral-300">Modell wählen</label>
                  </div>
                  <div className="relative">
                    <select
                      className={selectClass}
                      value={modell}
                      onChange={(e) => setModell(e.target.value)}
                      title="Modell wählen"
                    >
                      <option value="">Modell wählen…</option>
                      {modelle.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA buttons */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {ready ? (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <a
                    href={waLink(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex flex-1 items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-semibold"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp schreiben
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-dark-border bg-[#1c1c1c] px-6 py-4 text-base font-semibold text-white transition hover:border-neutral-500 hover:bg-[#242424]"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Anrufen
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-dark-border bg-[#1a1a1a] px-6 py-5 text-center"
                >
                  <p className="text-sm text-neutral-600">
                    Wähle Marke und Modell, um fortzufahren.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
