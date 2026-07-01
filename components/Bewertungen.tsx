"use client";

import { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { StarIcon } from "./icons";
import { GOOGLE_REVIEWS_URL } from "@/lib/config";

const BEWERTUNGEN = [
  {
    name: "Najeeb Ayobi",
    initials: "NA",
    color: "bg-orange-500",
    photo: "/najeeb.png",
    text: "Meine Handy wurde schnell wie möglich repariert. iPhone 16 Pro Max Display Tausch in 10 min – sehr top!",
    featured: true,
  },
  {
    name: "Annemarie Korbei",
    initials: "AK",
    color: "bg-rose-500",
    text: "Super Service, faire Preise. Hatte keine Zeit mein Telefon wieder abzuholen, wurde mir vom Chef nach Hause geliefert. Danke jeder Zeit wieder. LG",
    featured: false,
  },
  {
    name: "E Talic",
    initials: "ET",
    color: "bg-violet-500",
    text: "Ich habe mein Handy in diesem shop reparieren lassen der Service was sehr freundlich und der preis war günstig ich bin sehr zufrieden und kann den Shop weiterempfehlen 👍",
    featured: false,
  },
  {
    name: "Thierno Yayay",
    initials: "TY",
    color: "bg-blue-500",
    text: "Ich habe in diesem Laden ein Handy gekauft. Der Preis war gut und der Verkäufer sehr höflich. Ich bin mit dem Service zufrieden.",
    featured: false,
  },
  {
    name: "Olivia Mikulska",
    initials: "OM",
    color: "bg-emerald-500",
    text: "Der Handyverkäufer ist freundlich und hilft den Kunden. In seinem Laden gibt es gute Handys zu einem günstigen Preis.",
    featured: false,
  },
  {
    name: "Zahlo Tezab",
    initials: "ZT",
    color: "bg-amber-500",
    text: "Ich bin Tourist und mein Handy wurde sehr schnell und perfekt repariert.",
    featured: false,
  },
  {
    name: "Ut Long Dang",
    initials: "UD",
    color: "bg-cyan-500",
    text: "Großer Store, viel los, sehr gut sortiert. Schnelle und freundliche Bedienung.",
    featured: false,
  },
];

type Review = (typeof BEWERTUNGEN)[number];

const FEATURED = BEWERTUNGEN.find((b) => b.featured)!;
const GRID = BEWERTUNGEN.filter((b) => !b.featured);

// ─── Rotating border for featured card ───────────────────────────────────────
function BeamBorder() {
  const rotation = useMotionValue(0);

  useAnimationFrame((t) => {
    rotation.set((t * 0.06) % 360);
  });

  const background = useTransform(
    rotation,
    (r) =>
      `conic-gradient(from ${r}deg at 50% 50%, transparent 0%, transparent 78%, #D4AF37 85%, rgba(212,175,55,0.45) 90%, transparent 95%)`
  );

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{ background }}
    />
  );
}

// ─── 9. Draggable swipe card (top of stack) ──────────────────────────────────
function TopSwipeCard({
  review,
  onSwipe,
}: {
  review: Review;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-6, 0, 6]);

  return (
    <motion.figure
      style={{ x, rotate, zIndex: 10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (
          Math.abs(info.offset.x) > 80 ||
          Math.abs(info.velocity.x) > 350
        ) {
          onSwipe();
        }
      }}
      className="absolute inset-0 cursor-grab select-none overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-5 active:cursor-grabbing"
    >
      <span className="absolute right-4 top-2 select-none text-5xl font-black leading-none text-white/5">
        "
      </span>
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="mt-3 line-clamp-4 text-sm leading-relaxed text-neutral-300">
        "{review.text}"
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {"photo" in review && review.photo ? (
          <img
            src={review.photo}
            alt={review.name}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-accent/30"
          />
        ) : (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${review.color}`}
          >
            {review.initials}
          </div>
        )}
        <span className="text-sm font-semibold text-white">{review.name}</span>
      </figcaption>
    </motion.figure>
  );
}

function SwipeStack({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0);

  const handleSwipe = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <div className="relative mt-5 sm:hidden">
      {/* Shadow depth cards */}
      <div className="relative h-[210px]">
        {[2, 1].map((offset) => {
          const idx = (current + offset) % reviews.length;
          return (
            <motion.div
              key={`${reviews[idx].name}-${current}`}
              className="absolute inset-x-0 origin-top rounded-2xl border border-dark-border bg-dark-card"
              animate={{
                top: offset * 12,
                scale: 1 - offset * 0.04,
                opacity: 1 - offset * 0.3,
                zIndex: 3 - offset,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          );
        })}

        <AnimatePresence mode="wait">
          <TopSwipeCard
            key={`${current}-${reviews[current].name}`}
            review={reviews[current]}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex justify-center gap-1.5">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Rezension ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-accent" : "w-1.5 bg-dark-border"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-neutral-600">
        Wischen zum nächsten →
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Bewertungen() {
  return (
    <section id="bewertungen" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest shimmer-text">
            Kundenrezensionen
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Das sagen die Kunden über uns
          </h2>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-neutral-400 underline underline-offset-4 transition hover:text-white"
          >
            Alle Google-Rezensionen ansehen →
          </a>
        </div>

        {/* Featured review with BeamBorder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative mt-12 rounded-2xl p-px"
        >
          <BeamBorder />
          <figure className="relative z-10 rounded-[15px] bg-[#161616] p-8">
            <div className="flex items-center gap-4">
              {"photo" in FEATURED && FEATURED.photo ? (
                <img
                  src={FEATURED.photo}
                  alt={FEATURED.name}
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-accent/40"
                />
              ) : (
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${FEATURED.color}`}
                >
                  {FEATURED.initials}
                </div>
              )}
              <div>
                <figcaption className="font-semibold text-white">
                  {FEATURED.name}
                </figcaption>
                {"badge" in FEATURED && FEATURED.badge && (
                  <p className="text-xs text-neutral-500">{FEATURED.badge}</p>
                )}
                <div className="mt-0.5 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <span className="ml-auto select-none text-6xl font-black leading-none text-white/5">
                "
              </span>
            </div>
            <blockquote className="mt-5 text-lg leading-relaxed text-neutral-300">
              "{FEATURED.text}"
            </blockquote>
          </figure>
        </motion.div>

        {/* Mobile: draggable swipe stack */}
        <SwipeStack reviews={GRID} />

        {/* Desktop: staggered grid */}
        <div className="mt-5 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {GRID.map((b, i) => (
            <motion.figure
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6 transition-[border-color] hover:border-accent/20"
            >
              <span className="absolute right-4 top-2 select-none text-5xl font-black leading-none text-white/5">
                "
              </span>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-300">
                "{b.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {"photo" in b && b.photo ? (
                  <img
                    src={b.photo}
                    alt={b.name}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-accent/30"
                  />
                ) : (
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${b.color}`}
                  >
                    {b.initials}
                  </div>
                )}
                <span className="text-sm font-semibold text-white">
                  {b.name}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
