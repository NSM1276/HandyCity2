import Link from "next/link";
import { ADDRESS } from "@/lib/config";

export const metadata = {
  title: "Datenschutz — Handy City 2",
};

export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-accent hover:underline">← Zurück zur Startseite</Link>
      <h1 className="mt-6 text-3xl font-extrabold">Datenschutzerklärung</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
        <section>
          <h2 className="text-base font-semibold text-neutral-900">Verantwortlicher</h2>
          <p className="mt-2">
            Handy City 2<br />
            {ADDRESS}<br />
            Österreich
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900">Erhebung von Daten</h2>
          <p className="mt-2">
            Diese Website erhebt keine personenbezogenen Daten, außer wenn Sie uns über das Kontaktformular oder WhatsApp kontaktieren. Dabei erhobene Daten (Name, E-Mail, Telefon, Nachricht) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-neutral-900">Google Maps</h2>
          <p className="mt-2">
            Wir binden Google Maps auf dieser Website ein. Anbieter ist Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Beim Laden der Karte kann Google Daten erheben. Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Google Privacy Policy</a>.
          </p>
        </section>

        <p className="text-xs text-neutral-400">
          {/* TODO: Datenschutzerklärung gemäß DSGVO/österreichischem Recht vervollständigen */}
          Inhalt wird vervollständigt.
        </p>
      </div>
    </main>
  );
}
