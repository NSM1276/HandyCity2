"use client";

import { motion } from "framer-motion";

const LEISTUNGEN = [
  "Datensicherung",
  "Software- & Firmwareupdates",
  "SIM-Karten-Slots",
  "Einschaltknopf",
  "Display- & Glastausch",
  "Akku- & Coverwechsel",
  "Kamerareparatur",
  "Mikrofon & Lautsprecher",
  "Wasserschaden",
];

export default function Reparaturservice() {
  return (
    <section className="bg-dark-card py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="shimmer-text text-sm font-semibold uppercase tracking-widest">
              Reparaturservice
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Professionelle Reparaturen in Wien Meidling
            </h2>
            <p className="mt-6 leading-relaxed text-neutral-400">
              Ob gebrochenes Display, leerer Akku oder Wasserschaden – bei Handy City 2
              bringen wir dein Gerät schnell und zuverlässig wieder zum Laufen.
              Reparieren ist oft die klügere und günstigere Alternative zum Neukauf.
            </p>
            <p className="mt-4 leading-relaxed text-neutral-400">
              Manchmal ist ein Schaden sofort sichtbar, manchmal liegt eine Fehlfunktion
              vor, die sich nicht leicht zuordnen lässt. In beiden Fällen helfen wir
              weiter – komm einfach ohne Termin vorbei.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold">
              <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="shimmer-text">Alle Reparaturen mit Garantie</span>
            </div>
          </motion.div>

          {/* Right: list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Unser Service umfasst
            </p>
            <ul className="space-y-3">
              {LEISTUNGEN.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark px-4 py-3 text-sm text-neutral-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <svg className="h-3 w-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
