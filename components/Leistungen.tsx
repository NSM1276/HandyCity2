"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  DisplayIcon,
  BatteryIcon,
  ChargingIcon,
  SparklesIcon,
  ShopIcon,
  PackageIcon,
} from "./icons";

const SERVICES = [
  {
    Icon: DisplayIcon,
    nr: "01",
    titel: "Display-Reparatur",
    punkte: [
      "Apple, Samsung, Xiaomi und mehr",
      "Original & kompatible Ersatzteile",
      "Ab 30 Minuten fertig",
    ],
  },
  {
    Icon: BatteryIcon,
    nr: "02",
    titel: "Akku-Tausch",
    punkte: [
      "Merklich kürzere Laufzeit?",
      "Schneller Akkutausch vor Ort",
      "Für alle gängigen Modelle",
    ],
  },
  {
    Icon: ChargingIcon,
    nr: "03",
    titel: "Ladebuchse",
    punkte: [
      "Handy lädt nicht mehr?",
      "USB-C, Lightning, Micro-USB",
      "Diagnose kostenlos",
    ],
  },
  {
    Icon: SparklesIcon,
    nr: "04",
    titel: "Reinigung & Pflege",
    punkte: [
      "Verstopfter Lautsprecher?",
      "Professionelle Gerätereinigung",
      "Feuchtigkeitsschäden behandeln",
    ],
  },
  {
    Icon: ShopIcon,
    nr: "05",
    titel: "Ankauf & Verkauf",
    punkte: [
      "Faire Preise für dein Altgerät",
      "Geprüfte Gebrauchtgeräte",
      "Sofortige Barauszahlung",
    ],
  },
  {
    Icon: PackageIcon,
    nr: "06",
    titel: "Zubehör",
    punkte: [
      "Cases, Panzerglas, Kabel",
      "Ladegeräte & Power Banks",
      "Kopfhörer & Gadgets",
    ],
  },
];

// ─── 8. 3D Tilt Card ─────────────────────────────────────────────────────────
function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="h-full [perspective:900px]">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={onMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Leistungen() {
  return (
    <section id="leistungen" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest shimmer-text">
            Unsere Services
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Handy Reparaturen und mehr…
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Schnell, transparent und zuverlässig — kein Termin nötig. Komm einfach vorbei.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, nr, titel, punkte }, i) => (
            <motion.div
              key={nr}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.07,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <TiltCard className="group h-full rounded-2xl border border-dark-border bg-dark-card p-6 transition-[border-color,box-shadow] hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="select-none text-3xl font-black text-neutral-800">
                    {nr}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white">
                  {titel}
                </h3>

                <ul className="mt-3 space-y-1.5">
                  {punkte.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm text-neutral-400"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
