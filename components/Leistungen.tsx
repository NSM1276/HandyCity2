"use client";

import { motion } from "framer-motion";
import {
  DisplayIcon,
  BatteryIcon,
  ChargingIcon,
  SparklesIcon,
  ShopIcon,
  PackageIcon,
  LaptopIcon,
} from "./icons";

const SERVICES = [
  {
    Icon: DisplayIcon,
    titel: "Display-Reparatur",
    text: "Gebrochenes Display oder Glas? Wir tauschen es schnell aus – für Apple, Samsung, Xiaomi und viele weitere Marken. Oft in unter 30 Minuten fertig.",
  },
  {
    Icon: BatteryIcon,
    titel: "Akku-Tausch",
    text: "Merklich kürzere Laufzeit? Ein neuer Akku gibt deinem Gerät ein zweites Leben. Schnell, sauber und für alle gängigen Modelle verfügbar.",
  },
  {
    Icon: ChargingIcon,
    titel: "Ladebuchse & Anschlüsse",
    text: "Handy lädt nicht mehr richtig? Wir reparieren defekte USB-C-, Lightning- und Micro-USB-Anschlüsse. Diagnose bei uns immer kostenlos.",
  },
  {
    Icon: SparklesIcon,
    titel: "Reinigung & Wasserschaden",
    text: "Verstopfte Lautsprecher, Feuchtigkeitsschäden oder einfach gründliche Pflege – wir bringen dein Gerät wieder in Top-Zustand.",
  },
  {
    Icon: ShopIcon,
    titel: "Ankauf & Verkauf",
    text: "Du möchtest dein altes Gerät verkaufen? Wir zahlen faire Preise und sofort bar. Geprüfte Gebrauchtgeräte gibt es bei uns ebenfalls zu kaufen.",
  },
  {
    Icon: PackageIcon,
    titel: "Zubehör",
    text: "Cases, Panzerglas, Kabel, Ladegeräte, Power Banks und mehr – alles für dein Smartphone direkt bei uns im Shop erhältlich.",
  },
  {
    Icon: LaptopIcon,
    titel: "Laptop & Mac Reparatur",
    text: "Display, Akku, Tastatur, Ladeanschluss oder Wasserschaden – wir reparieren Laptops und MacBooks aller gängigen Marken schnell und zuverlässig.",
  },
];

export default function Leistungen() {
  return (
    <section id="leistungen" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">

        <div className="text-center">
          <p className="shimmer-text text-sm font-semibold uppercase tracking-widest">
            Unsere Services
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Alles rund ums Handy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Schnell, transparent und zuverlässig — kein Termin nötig. Komm einfach vorbei.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {SERVICES.map(({ Icon, titel, text }, i) => (
            <motion.div
              key={titel}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
              className={`group flex gap-5 rounded-2xl border border-dark-border bg-dark-card p-5 transition-[border-color,box-shadow] hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5${i === SERVICES.length - 1 && SERVICES.length % 2 !== 0 ? " sm:col-span-2" : ""}`}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-200 group-hover:bg-accent/20">
                <Icon className="h-6 w-6 text-accent" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-bold text-white">{titel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
