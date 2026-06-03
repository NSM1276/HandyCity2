"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const STATS = [
  { end: 1000, suffix: "+", label: "Reparaturen", decimal: false },
  { end: 5, suffix: " Jahre", label: "Erfahrung", decimal: false },
  { end: 4.7, suffix: "★", label: "Google Rating", decimal: true },
  { end: 30, suffix: " Min", label: "Schnellreparatur", decimal: false },
] as const;

type Stat = (typeof STATS)[number];

function StatItem({
  stat,
  started,
  index,
}: {
  stat: Stat;
  started: boolean;
  index: number;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 52, damping: 20 });
  const [display, setDisplay] = useState(stat.decimal ? "0.0" : "0");

  useEffect(
    () =>
      spring.on("change", (v) => {
        setDisplay(stat.decimal ? v.toFixed(1) : Math.round(v).toString());
      }),
    [spring, stat.decimal]
  );

  useEffect(() => {
    if (started) {
      const id = setTimeout(
        () => motionVal.set(stat.end as number),
        index * 120
      );
      return () => clearTimeout(id);
    }
  }, [started, stat.end, motionVal, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <div className="flex items-baseline justify-center font-black text-white">
        <span className="tabular-nums text-4xl md:text-5xl">{display}</span>
        <span className="ml-1 text-2xl text-accent md:text-3xl">
          {stat.suffix}
        </span>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-b border-dark-border bg-dark py-14 md:py-16">
      <div className="mx-auto max-w-content px-6">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} started={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
