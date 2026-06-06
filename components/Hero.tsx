"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { src: "/banner-slide-1.webp", alt: "iPhone 17 Lineup" },
  { src: "/banner-slide-2.webp", alt: "Smartphone Reparatur" },
  { src: "/banner-slide-3.webp", alt: "Samsung Galaxy" },
  { src: "/banner-slide-4.webp", alt: "Zubehör & Geräte" },
  { src: "/banner-slide-5.webp", alt: "Huawei P40 Pro" },
  { src: "/banner-slide-6.webp", alt: "Xiaomi" },
  { src: "/banner-slide-7.webp", alt: "Handy City 2" },
];

const AUTO_PLAY_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const prev = useCallback(() => {
    const idx = (current - 1 + SLIDES.length) % SLIDES.length;
    goTo(idx, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    const idx = (current + 1) % SLIDES.length;
    goTo(idx, 1);
  }, [current, goTo]);

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: "clamp(200px, 30vw, 400px)" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            fill
            priority={current === 0}
            className="object-contain"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <>
        <button
            onClick={prev}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-black/50 text-accent backdrop-blur-sm transition hover:bg-accent/20 md:left-5 md:h-12 md:w-12"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-black/50 text-accent backdrop-blur-sm transition hover:bg-accent/20 md:right-5 md:h-12 md:w-12"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
      </>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Folie ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-accent" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
      </div>
    </section>
  );
}
