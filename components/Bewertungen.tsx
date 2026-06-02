import { StarIcon } from "./icons";
import { GOOGLE_REVIEWS_URL } from "@/lib/config";

const BEWERTUNGEN = [
  {
    name: "Annemarie Korbei",
    initials: "AK",
    color: "bg-rose-500",
    text: "Super Service, faire Preise. Hatte keine Zeit mein Telefon wieder abzuholen, wurde mir vom Chef nach Hause geliefert. Danke jeder Zeit wieder. LG",
    featured: true,
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

const FEATURED = BEWERTUNGEN.find((b) => b.featured)!;
const GRID = BEWERTUNGEN.filter((b) => !b.featured);

export default function Bewertungen() {
  return (
    <section id="bewertungen" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
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

        {/* Featured review */}
        <figure className="mt-12 overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-8">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${FEATURED.color}`}>
              {FEATURED.initials}
            </div>
            <div>
              <figcaption className="font-semibold text-white">{FEATURED.name}</figcaption>
              <div className="mt-0.5 flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
            </div>
            <span className="ml-auto text-6xl font-black leading-none text-white/5 select-none">"</span>
          </div>
          <blockquote className="mt-5 text-lg leading-relaxed text-neutral-300">
            "{FEATURED.text}"
          </blockquote>
        </figure>

        {/* Grid reviews */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GRID.map((b) => (
            <figure
              key={b.name}
              className="relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6 transition hover:-translate-y-1 hover:border-accent/20"
            >
              <span className="absolute right-4 top-2 text-5xl font-black leading-none text-white/5 select-none">"</span>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-neutral-300">
                "{b.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${b.color}`}>
                  {b.initials}
                </div>
                <span className="text-sm font-semibold text-white">{b.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
