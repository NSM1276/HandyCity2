import Image from "next/image";
import { ADDRESS, GOOGLE_REVIEWS_URL } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon, StarIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background image with strong dark overlay */}
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

      <div className="relative mx-auto w-full max-w-content px-6 py-20">
        <div className="max-w-[640px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Express Reparatur · Wien Meidling
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            Defektes Handy?
            <br />
            <span className="text-accent">Wir reparieren es.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-neutral-300 md:text-xl">
            Display · Akku · Ladebuchse — schnell, fair und professionell.
          </p>
          <p className="mt-1 text-sm text-neutral-500">{ADDRESS}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={waLink("Hallo Handy City 2, ich möchte eine Reparatur anfragen:")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Per WhatsApp anfragen
            </a>
            <a
              href="#kostenrechner"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Preise berechnen
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            {["Kein Termin nötig", "Transparente Preise", "Heute noch fertig"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex animate-bounce flex-col items-center text-white/30">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
