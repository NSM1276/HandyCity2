import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung — Handy City 2",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-dark px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Zurück zur Startseite
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold text-white">
          Datenschutzerklärung
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-300">
          <section>
            <h2 className="text-base font-semibold text-white">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              <span className="font-semibold text-neutral-200">
                Khesrau Sadat e.U
              </span>
              <br />
              Meidlinger Hauptstraße 72, 1120 Wien, Österreich
              <br />
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
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p className="mt-3">
              Wir erheben personenbezogene Daten nur, wenn Sie uns aktiv
              kontaktieren — über das Kontaktformular auf dieser Website oder per
              WhatsApp. Dabei können folgende Daten anfallen:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-neutral-400">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Inhalt Ihrer Nachricht</li>
            </ul>
            <p className="mt-3">
              Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage
              verwendet und nicht an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              3. Rechtsgrundlage der Verarbeitung
            </h2>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen) sowie
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Bearbeitung eingehender Kundenanfragen).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              4. Speicherdauer
            </h2>
            <p className="mt-3">
              Ihre Daten werden nur so lange gespeichert, wie es für die
              Bearbeitung Ihrer Anfrage erforderlich ist, bzw. solange gesetzliche
              Aufbewahrungspflichten bestehen. Sobald Ihr Anliegen abgeschlossen
              ist und keine gesetzliche Pflicht zur weiteren Aufbewahrung besteht,
              werden Ihre Daten gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">5. Google Maps</h2>
            <p className="mt-3">
              Diese Website bindet Google Maps ein. Anbieter ist Google Ireland
              Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden
              der Karte kann Google personenbezogene Daten (insbesondere
              IP-Adresse) erheben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO. Weitere Informationen:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Datenschutzerklärung
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              6. Ihre Rechte
            </h2>
            <p className="mt-3">
              Gemäß DSGVO stehen Ihnen folgende Rechte zu:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-neutral-400">
              <li>
                <span className="font-medium text-neutral-300">Auskunft</span> über
                die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)
              </li>
              <li>
                <span className="font-medium text-neutral-300">Berichtigung</span>{" "}
                unrichtiger Daten (Art. 16 DSGVO)
              </li>
              <li>
                <span className="font-medium text-neutral-300">Löschung</span> Ihrer
                Daten (Art. 17 DSGVO)
              </li>
              <li>
                <span className="font-medium text-neutral-300">
                  Einschränkung der Verarbeitung
                </span>{" "}
                (Art. 18 DSGVO)
              </li>
              <li>
                <span className="font-medium text-neutral-300">Widerspruch</span>{" "}
                gegen die Verarbeitung (Art. 21 DSGVO)
              </li>
              <li>
                <span className="font-medium text-neutral-300">
                  Datenübertragbarkeit
                </span>{" "}
                (Art. 20 DSGVO)
              </li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
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
              7. Beschwerderecht
            </h2>
            <p className="mt-3">
              Sie haben das Recht, bei der österreichischen Datenschutzbehörde
              Beschwerde einzulegen:
              <br />
              Datenschutzbehörde, Barichgasse 40–42, 1030 Wien
              <br />
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.dsb.gv.at
              </a>
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
