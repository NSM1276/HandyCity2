"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ADDRESS } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

// ─── 1. Text Scramble ────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "!@#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(text: string, delay = 300) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const total = text.length * 3;
    let timeoutId: ReturnType<typeof setTimeout>;

    timeoutId = setTimeout(() => {
      const iv = setInterval(() => {
        frame++;
        const revealed = Math.floor((frame / total) * text.length);
        setOutput(
          text
            .split("")
            .map((ch, i) =>
              ch === " "
                ? " "
                : i < revealed
                ? ch
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            )
            .join("")
        );
        if (frame >= total) {
          clearInterval(iv);
          setOutput(text);
        }
      }, 35);
      return () => clearInterval(iv);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  return output;
}

// ─── 2. Typewriter ───────────────────────────────────────────────────────────
const REPAIR_TYPES = [
  "Display-Reparatur",
  "Akku-Tausch",
  "Ladebuchse",
  "Wasserschaden",
  "Zubehör",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = REPAIR_TYPES[idx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === target) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % REPAIR_TYPES.length);
    } else {
      timer = setTimeout(
        () =>
          setText(
            deleting ? text.slice(0, -1) : target.slice(0, text.length + 1)
          ),
        deleting ? 40 : 75
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  return (
    <>
      <span className="text-white">{text}</span>
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-accent align-middle" />
    </>
  );
}

// ─── 3. Spotlight Canvas ─────────────────────────────────────────────────────
function Spotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -500, y: -500 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const section = canvas.parentElement!;

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    section.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x, y } = pos.current;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 420);
      g.addColorStop(0, "rgba(227,0,0,0.08)");
      g.addColorStop(0.45, "rgba(227,0,0,0.03)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2]"
    />
  );
}

// ─── 4. Floating Particles ───────────────────────────────────────────────────
interface Dot {
  x: number;
  y: number;
  r: number;
  speed: number;
  life: number;
  maxLife: number;
  alpha: number;
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const section = canvas.parentElement!;
    let rafId: number;

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const N = 45;
    const dots: Dot[] = Array.from({ length: N }, () => ({
      x: Math.random() * section.clientWidth,
      y: Math.random() * section.clientHeight,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.35 + 0.08,
      life: Math.random() * 300,
      maxLife: 250 + Math.random() * 250,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.y -= d.speed;
        d.life++;
        const t = d.life / d.maxLife;
        const a = d.alpha * Math.sin(t * Math.PI);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227,0,0,${a.toFixed(3)})`;
        ctx.fill();
        if (d.life >= d.maxLife || d.y < -10) {
          d.x = Math.random() * canvas.width;
          d.y = canvas.height + 10;
          d.life = 0;
          d.maxLife = 250 + Math.random() * 250;
          d.speed = Math.random() * 0.35 + 0.08;
          d.alpha = Math.random() * 0.35 + 0.05;
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}

// ─── 5. Animated Gradient Blobs ──────────────────────────────────────────────
function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(227,0,0,0.13) 0%, transparent 70%)",
          top: -260,
          left: -180,
          filter: "blur(64px)",
        }}
        animate={{ x: [0, 55, -35, 0], y: [0, 45, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(180,0,0,0.09) 0%, transparent 70%)",
          bottom: -130,
          right: "8%",
          filter: "blur(52px)",
        }}
        animate={{ x: [0, -45, 28, 0], y: [0, -35, 45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─── 6. Magnetic Button ──────────────────────────────────────────────────────
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.sqrt(dx * dx + dy * dy) < 110) {
      x.set(dx * 0.38);
      y.set(dy * 0.38);
    }
  };

  return (
    <motion.div
      ref={wrapRef}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const scrambledH1 = useScramble("Defektes Handy?", 350);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#0A0A0A]">
      {/* Base background image + overlays */}
      <div className="absolute inset-0">
        <Image
          src="/hero-deconstructed-phone.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Special effects layers */}
      <GradientBlobs />
      <Particles />
      <Spotlight />

      {/* Content — z-10 sits above all effect layers */}
      <div className="relative z-10 mx-auto w-full max-w-content px-6 py-20">
        <div className="max-w-[640px]">
          {/* 7. Staggered entrance animations */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            Express Reparatur · Wien Meidling
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {scrambledH1}
            <br />
            <span className="text-accent">Wir reparieren es.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 text-lg leading-relaxed text-neutral-300 md:text-xl"
          >
            <Typewriter /> — schnell, fair und professionell.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-1 text-sm text-neutral-500"
          >
            {ADDRESS}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticWrap>
              <a
                href={waLink(
                  "Hallo Handy City 2, ich möchte eine Reparatur anfragen:"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-red-700"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Per WhatsApp anfragen
              </a>
            </MagneticWrap>
            <a
              href="#kostenrechner"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Preise berechnen
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-sm text-neutral-400"
          >
            {["Kein Termin nötig", "Transparente Preise", "Heute noch fertig"].map(
              (t) => (
                <div key={t} className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 shrink-0 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t}
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex animate-bounce flex-col items-center text-white/30">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
