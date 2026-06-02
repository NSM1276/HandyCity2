import { GOOGLE_REVIEWS_URL } from "@/lib/config";
import { GoogleIcon, StarIcon } from "./icons";

const BRANDS = [
  "Samsung", "Apple", "Xiaomi", "Huawei",
  "Sony", "Oppo", "Google Pixel", "Nokia",
  "OnePlus", "Motorola",
];

// doubled for seamless infinite loop
const DOUBLED = [...BRANDS, ...BRANDS];

export default function BrandLogos() {
  return (
    <section className="border-y border-neutral-100 bg-white py-8">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">

          {/* Scrolling brand marquee */}
          <div className="relative w-full overflow-hidden md:flex-1">
            <div className="flex animate-marquee items-center gap-14">
              {DOUBLED.map((brand, i) => (
                <span
                  key={i}
                  className="shrink-0 text-lg font-black uppercase tracking-tight text-neutral-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden h-14 w-px shrink-0 bg-neutral-200 md:block" />

          {/* Google Reviews widget */}
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-3.5 rounded-2xl border border-neutral-200 bg-surface px-5 py-3.5 transition hover:border-neutral-300 hover:shadow-lg"
          >
            <GoogleIcon className="h-8 w-8" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Google Reviews
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xl font-black text-neutral-900">4.7</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <p className="mt-0.5 text-xs text-neutral-400 group-hover:text-accent transition">
                Rezensionen ansehen →
              </p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
