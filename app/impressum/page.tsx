import Link from "next/link";

export const metadata = {
  title: "Impressum — Handy City 2",
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-dark px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-white">Impressum</h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-300">
          <section>
            <h2 className="text-base font-semibold text-white">
              Angaben gemäß § 5 ECG (E-Commerce-Gesetz)
            </h2>
            <p className="mt-3">
              <span className="font-semibold text-neutral-200">Khesrau Sadat e.U</span>
              <br />
              Inhaber: Khesrau Sadat
              <br />
              Meidlinger Hauptstraße 72
              <br />
              1120 Wien
              <br />
              Österreich
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">Kontakt</h2>
            <p className="mt-3">
              Telefon:{" "}
              <a href="tel:+436644936374" className="text-accent hover:underline">
                +43 664 4936374
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:madona1210wien@gmail.com"
                className="text-accent hover:underline"
              >
                madona1210wien@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              Unternehmensgegenstand
            </h2>
            <p className="mt-3">
              Einzelhandel (Handel und Reparatur von Mobiltelefonen und Zubehör)
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              Unternehmensregistrierung
            </h2>
            <p className="mt-3">
              Rechtsform: Einzelunternehmer (e.U.)
              <br />
              Umsatzsteuer-Identifikationsnummer (UID): ATU69482106
              <br />
              Wirtschaftskammer Wien — Sparte Handel
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              Aufsichtsbehörde / Gewerbebehörde
            </h2>
            <p className="mt-3">
              Magistrat der Stadt Wien
              <br />
              Wirtschaftskammer Wien, Stubenring 8–10, 1010 Wien
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              Anwendbare Rechtsvorschriften
            </h2>
            <p className="mt-3">
              Gewerbeordnung (GewO 1994); zugänglich unter{" "}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              Haftungsausschluss
            </h2>
            <p className="mt-3">
              Alle Angaben auf dieser Website wurden sorgfältig geprüft. Wir
              übernehmen jedoch keine Haftung für die Richtigkeit, Vollständigkeit
              und Aktualität der bereitgestellten Informationen. Für den Inhalt
              verlinkter externer Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
          </section>

          <p className="border-t border-dark-border pt-4 text-xs text-neutral-500">
            Stand: Juni 2025
          </p>
        </div>
      </div>
    </main>
  );
}
