/**
 * Statische Kontaktdaten der Filiale.
 *
 * ⚠️ PLATZHALTER — bitte vor dem Deploy mit echten Daten ersetzen.
 * Diese Werte werden NICHT über das Admin-Panel bearbeitet.
 */

// WhatsApp-Nummer im internationalen Format OHNE "+" oder Leerzeichen.
// Beispiel Österreich: "436641234567"
export const WHATSAPP_NUMBER = "43XXXXXXXXX"; // TODO: echte WhatsApp-Nummer

// Telefonnummer wie sie angezeigt werden soll.
export const PHONE = "+43 XXX XXXXXXX"; // TODO: echte Telefonnummer

export const ADDRESS = "Meidlinger Hauptstraße 72, 1120 Wien";

// Öffnungszeiten — eine Zeile pro Eintrag.
export const OPENING_HOURS: { tag: string; zeit: string }[] = [
  { tag: "Montag – Freitag", zeit: "09:00 – 20:00" },
  { tag: "Samstag", zeit: "10:00 – 19:00" },
  { tag: "Sonntag", zeit: "Geschlossen" },
];

// Google-Maps-Embed-URL für die Adresse (iframe src).
// So ersetzen: Google Maps öffnen -> Teilen -> "Karte einbetten" -> src kopieren.
export const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Meidlinger%20Hauptstra%C3%9Fe%2072%2C%201120%20Wien&output=embed";

// Link zur Google-Rezensionen-Seite des Shops.
export const GOOGLE_REVIEWS_URL =
  "https://maps.app.goo.gl/Ly4Niuhgg1ZF7Xkd7";

// E-Mail-Adresse für das Kontaktformular.
export const CONTACT_EMAIL = "email@placeholder.com"; // TODO: echte E-Mail-Adresse eintragen

// Social-Media-Links — Platzhalter, später ersetzen.
export const INSTAGRAM_URL = "#"; // TODO: Instagram-Link
export const FACEBOOK_URL = "#"; // TODO: Facebook-Link
export const TIKTOK_URL = "#"; // TODO: TikTok-Link

// Wartungsmodus — true = Seite gesperrt, false = Seite normal
export const MAINTENANCE_MODE = true;
