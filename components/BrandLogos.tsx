"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useInView } from "framer-motion";
import useMeasure from "react-use-measure";
import { GOOGLE_REVIEWS_URL } from "@/lib/config";
import { GoogleIcon, StarIcon } from "./icons";
import type { ReactNode } from "react";

type BrandChip = { key: string; content: ReactNode };

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-neutral-300" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const BRANDS: BrandChip[] = [
  {
    key: "apple",
    content: (
      <div className="flex items-center gap-2">
        <AppleIcon />
        <span className="text-sm font-semibold text-neutral-300">Apple</span>
      </div>
    ),
  },
  {
    key: "samsung",
    content: (
      <span className="text-sm font-black tracking-[0.15em] text-[#1428A0]">SAMSUNG</span>
    ),
  },
  {
    key: "xiaomi",
    content: (
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#FF6900] text-[10px] font-black text-white">MI</span>
        <span className="text-sm font-semibold text-neutral-300">Xiaomi</span>
      </div>
    ),
  },
  {
    key: "huawei",
    content: (
      <span className="text-sm font-black tracking-wider text-[#CF0A2C]">HUAWEI</span>
    ),
  },
  {
    key: "sony",
    content: (
      <span className="text-sm font-black tracking-[0.2em] text-neutral-300">SONY</span>
    ),
  },
  {
    key: "oppo",
    content: (
      <span className="text-sm font-black tracking-wider text-[#1D6FE8]">OPPO</span>
    ),
  },
  {
    key: "google-pixel",
    content: (
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-black">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#DB4437]">o</span>
          <span className="text-[#F4B400]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#0F9D58]">l</span>
          <span className="text-[#DB4437]">e</span>
        </span>
        <span className="text-sm font-semibold text-neutral-400">Pixel</span>
      </div>
    ),
  },
  {
    key: "nokia",
    content: (
      <span className="text-sm font-black tracking-wider text-[#124191]">NOKIA</span>
    ),
  },
  {
    key: "oneplus",
    content: (
      <div className="flex items-center gap-1.5">
        <span className="text-base font-black text-[#F5010C]">1+</span>
        <span className="text-sm font-semibold text-neutral-300">OnePlus</span>
      </div>
    ),
  },
  {
    key: "motorola",
    content: (
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5C2D91] text-[11px] font-black text-white">M</span>
        <span className="text-sm font-semibold text-neutral-300">Motorola</span>
      </div>
    ),
  },
];

function InfiniteSlider({ items }: { items: BrandChip[] }) {
  const [ref, { width }] = useMeasure();
  const x = useMotionValue(0);
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!width) return;
    const singleWidth = width / 2;
    const speed = hovering.current ? 8 : 40;
    const next = x.get() - (speed * delta) / 1000;
    x.set(next <= -singleWidth ? next + singleWidth : next);
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div
        ref={ref}
        className="flex w-max items-center gap-12"
        style={{ x }}
      >
        {items.map((brand) => (
          <div key={`a-${brand.key}`} className="shrink-0">
            {brand.content}
          </div>
        ))}
        {items.map((brand) => (
          <div key={`b-${brand.key}`} className="shrink-0">
            {brand.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AnimatedRating({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1500, bounce: 0 });
  const [display, setDisplay] = useState("0.0");

  useEffect(() => spring.on("change", (v) => setDisplay(v.toFixed(1))), [spring]);

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  return <span ref={ref}>{display}</span>;
}

export default function BrandLogos() {
  return (
    <section className="border-y border-dark-border bg-dark py-6">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">

          <div className="relative w-full overflow-hidden md:flex-1">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-dark to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-dark to-transparent" />
            <InfiniteSlider items={BRANDS} />
          </div>

          <div className="hidden h-12 w-px shrink-0 bg-dark-border md:block" />

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-3.5 rounded-2xl border border-dark-border bg-dark-card px-5 py-3.5 transition hover:border-neutral-600 hover:shadow-lg"
          >
            <GoogleIcon className="h-8 w-8" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Google Reviews
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xl font-black text-white">
                  <AnimatedRating value={5.0} />
                </span>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <p className="mt-0.5 text-xs text-neutral-500 transition group-hover:text-accent">
                Rezensionen ansehen →
              </p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
