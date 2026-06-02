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

export const ADDRESS = "Meidlinger Hauptstraße 29, 1120 Wien";

// Öffnungszeiten — eine Zeile pro Eintrag.
export const OPENING_HOURS: { tag: string; zeit: string }[] = [
  { tag: "Montag – Freitag", zeit: "09:00 – 18:30" }, // TODO: echte Zeiten
  { tag: "Samstag", zeit: "09:00 – 17:00" },
  { tag: "Sonntag", zeit: "Geschlossen" },
];

// Google-Maps-Embed-URL für die Adresse (iframe src).
// So ersetzen: Google Maps öffnen -> Teilen -> "Karte einbetten" -> src kopieren.
export const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Meidlinger%20Hauptstra%C3%9Fe%2029%2C%201120%20Wien&output=embed";

// Link zur Google-Rezensionen-Seite des Shops.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.at/maps/place/Handy+City+2+%7C+Express+Reparaturen+Service/@48.1761255,16.3272415,17z/data=!4m8!3m7!1s0x476da90068407881:0xd256b3634a99b26e!8m2!3d48.176122!4d16.3298164!9m1!1b1!16s%2Fg%2F11mzybpmgj";

// E-Mail-Adresse für das Kontaktformular.
export const CONTACT_EMAIL = "email@placeholder.com"; // TODO: echte E-Mail-Adresse eintragen

// Social-Media-Links — Platzhalter, später ersetzen.
export const INSTAGRAM_URL = "#"; // TODO: Instagram-Link
export const FACEBOOK_URL = "#"; // TODO: Facebook-Link
export const TIKTOK_URL = "#"; // TODO: TikTok-Link
