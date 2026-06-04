import Link from "next/link";
import { ADDRESS, OPENING_HOURS, PHONE, MAPS_EMBED_SRC, GOOGLE_REVIEWS_URL, INSTAGRAM_URL, FACEBOOK_URL, TIKTOK_URL } from "@/lib/config";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon, GoogleIcon, InstagramIcon, FacebookIcon, TikTokIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-dark">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 border-t border-dark-border md:grid-cols-3">

        {/* Column 1: Logo + contact */}
        <div>
          <span className="logo-live">
            <img
              src="/handycity2logo.svg"
              alt="Handy City 2"
              width={200}
              height={52}
              className="h-auto w-[160px]"
            />
          </span>
          <p className="mt-5 text-sm leading-relaxed text-neutral-400">{ADDRESS}</p>
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="mt-2 block text-sm text-neutral-400 transition hover:text-white"
          >
            {PHONE}
          </a>
          <a
            href={waLink("Hallo Handy City 2, ich habe eine Frage:")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-dark"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Reviews"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border text-neutral-500 transition hover:border-neutral-600 hover:text-white"
            >
              <GoogleIcon className="h-5 w-5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border text-neutral-500 transition hover:border-neutral-600 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border text-neutral-500 transition hover:border-neutral-600 hover:text-white"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border text-neutral-500 transition hover:border-neutral-600 hover:text-white"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Opening hours */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Öffnungszeiten
          </h3>
          <ul className="mt-5 space-y-2.5">
            {OPENING_HOURS.map((o) => (
              <li key={o.tag} className="flex justify-between gap-4 text-sm">
                <span className="text-neutral-400">{o.tag}</span>
                <span className="font-medium text-white">{o.zeit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Map */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Standort
          </h3>
          <div className="mt-5 overflow-hidden rounded-2xl border border-dark-border">
            <iframe
              src={MAPS_EMBED_SRC}
              title="Standort Handy City 2"
              width="100%"
              height="220"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full grayscale"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border py-5">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 text-xs text-neutral-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Handy City 2 · {ADDRESS}</span>
          <div className="flex gap-5">
            <Link href="/impressum" className="transition hover:text-neutral-400">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition hover:text-neutral-400">
              Datenschutz
            </Link>
            <Link href="/manage" className="transition hover:text-neutral-400">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
