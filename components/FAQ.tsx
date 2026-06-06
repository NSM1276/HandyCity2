"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Script from "next/script";

const FAQS = [
  {
    q: "Wie lange dauert eine Smartphone-Reparatur?",
    a: "Die meisten Reparaturen wie Display- oder Akkutausch erledigen wir innerhalb von 30–60 Minuten. Bei selteneren Ersatzteilen kann es 1–2 Werktage dauern.",
  },
  {
    q: "Muss ich einen Termin vereinbaren?",
    a: "Nein, kein Termin nötig! Komm einfach vorbei — Meidlinger Hauptstraße 72, 1120 Wien. Wir helfen dir sofort.",
  },
  {
    q: "Wie viel kostet eine Display- oder Akkureparatur?",
    a: "Der Preis hängt vom Modell ab. Nutze unseren Reparatur-Kostenrechner weiter oben auf der Seite für einen sofortigen Richtpreis.",
  },
  {
    q: "Gibt es eine Garantie auf Reparaturen?",
    a: "Ja, wir geben 3 Monate Garantie auf alle von uns durchgeführten Reparaturen und verbauten Ersatzteile.",
  },
  {
    q: "Kauft ihr auch gebrauchte Handys an?",
    a: "Ja! Wir kaufen gebrauchte Smartphones aller Marken zu fairen Preisen an. Bring dein Gerät einfach vorbei — wir bewerten es kostenlos und zahlen sofort bar.",
  },
  {
    q: "Was soll ich tun, wenn mein Handy Wasserschaden hat?",
    a: "Schalte das Gerät sofort aus, entferne wenn möglich die SIM-Karte und bring es so schnell wie möglich zu uns. Je früher wir es behandeln, desto höher die Erfolgschancen.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-dark py-20 md:py-28">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest shimmer-text">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Häufige Fragen — klar beantwortet
          </h2>
          <p className="mt-4 text-neutral-400">
            Kompakte Infos zu den meistgestellten Fragen unserer Kund:innen.
          </p>
        </div>

        <div className="mt-12 divide-y divide-dark-border rounded-2xl border border-dark-border overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-dark">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-dark-card"
              >
                <span className="font-semibold text-neutral-200">{faq.q}</span>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  open === i
                    ? "border-accent bg-accent text-white rotate-45"
                    : "border-neutral-300 text-neutral-400"
                }`}>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-neutral-400 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
