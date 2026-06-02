import Link from "next/link";
import { ADDRESS, PHONE } from "@/lib/config";

export const metadata = {
  title: "Impressum — Handy City 2",
};

export default function Impressum() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-accent hover:underline">← Zurück zur Startseite</Link>
      <h1 className="mt-6 text-3xl font-extrabold">Impressum</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
        <section>
          <h2 className="text-base font-semibold text-neutral-900">Angaben gemäß § 5 ECG</h2>
          <p className="mt-2">
            Handy City 2<br />
            {ADDRESS}<br />
            Österreich
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900">Kontakt</h2>
          <p className="mt-2">
            Telefon: {PHONE}<br />
            E-Mail: {/* TODO: E-Mail-Adresse eintragen */}email@placeholder.com
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900">Unternehmensgegenstand</h2>
          <p className="mt-2">
            Handel und Reparatur von Mobiltelefonen und Zubehör.
          </p>
        </section>

        <p className="text-xs text-neutral-400">
          {/* TODO: Weiteren Impressum-Inhalt gemäß österreichischem Recht ergänzen (UID, GISA-Zahl etc.) */}
          Inhalt wird vervollständigt.
        </p>
      </div>
    </main>
  );
}
