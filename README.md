# Handy City 2 — Website

Next.js 14 (App Router) Website für **Handy City 2**, Meidlinger Hauptstraße 72, 1120 Wien.
Express-Reparatur · Ankauf · Verkauf · Zubehör.

- **Frontend:** Next.js 14 + Tailwind CSS + Inter + Framer Motion
- **Datenbank:** `data.json` im GitHub-Repo (Single Source of Truth)
- **Bilder:** Vercel Blob
- **Admin-Panel:** `/manage` (passwortgeschützt)

So funktioniert das Bearbeiten: Im Admin-Panel `/manage` werden Produkte und Preise
geändert → beim Speichern committet eine API-Route die neue `data.json` ins GitHub-Repo
→ Vercel deployt automatisch neu → die Seite ist nach **~1–2 Minuten** aktualisiert.

---

## 1. Lokal starten

```bash
npm install
cp .env.local.example .env.local   # Werte ausfüllen (siehe unten)
npm run dev                         # http://localhost:3000
```

- Startseite: `http://localhost:3000`
- Admin-Panel: `http://localhost:3000/manage`

Für lokales Testen reicht in `.env.local` zunächst `ADMIN_PASSWORD`.
Speichern (GitHub-Commit) und Foto-Upload (Blob) funktionieren erst mit den echten
Tokens (siehe Schritt 3) — lokal greifen sie auf die Live-Dienste zu.

## 2. Kontaktdaten eintragen ⚠️

Vor dem Live-Gang die **Platzhalter** in [`lib/config.ts`](lib/config.ts) ersetzen:

| Variable | Bedeutung | Beispiel |
| --- | --- | --- |
| `WHATSAPP_NUMBER` | Nummer international, ohne `+`/Leerzeichen | `436641234567` |
| `PHONE` | Telefonnummer (Anzeige) | `+43 1 234 5678` |
| `CONTACT_EMAIL` | E-Mail-Adresse für Kontaktformular | `info@handycity2.at` |
| `INSTAGRAM_URL` | Instagram-Profil-Link | `https://instagram.com/...` |
| `FACEBOOK_URL` | Facebook-Seiten-Link | `https://facebook.com/...` |
| `TIKTOK_URL` | TikTok-Profil-Link | `https://tiktok.com/...` |
| `OPENING_HOURS` | Öffnungszeiten | siehe Datei |
| `MAPS_EMBED_SRC` | Google-Maps-Embed-URL | bereits auf Adresse 72 gesetzt |

## 3. Umgebungsvariablen

`.env.local` (lokal) bzw. Vercel → Project → Settings → Environment Variables:

```env
ADMIN_PASSWORD=dein_passwort
GITHUB_TOKEN=ghp_...
GITHUB_OWNER=dein-github-username
GITHUB_REPO=handy-city-2
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

- **GITHUB_TOKEN:** GitHub → Settings → Developer settings → *Fine-grained tokens*.
  Repo `handy-city-2` auswählen, Berechtigung **Contents: Read and write**.
- **BLOB_READ_WRITE_TOKEN:** wird in Schritt 5 automatisch erzeugt.

## 4. GitHub-Repo anlegen & pushen

```bash
git init
git add .
git commit -m "Initial commit: Handy City 2"
git branch -M main
git remote add origin https://github.com/<USER>/handy-city-2.git
git push -u origin main
```

`GITHUB_OWNER` = `<USER>`, `GITHUB_REPO` = `handy-city-2`.

## 5. Auf Vercel deployen

1. [vercel.com](https://vercel.com) → **Add New… → Project** → das GitHub-Repo importieren.
2. Framework wird als **Next.js** erkannt → **Deploy**.
3. **Vercel Blob anlegen:** Project → **Storage → Create → Blob**. Vercel legt dann
   `BLOB_READ_WRITE_TOKEN` automatisch als Env-Variable an.
4. Übrige Env-Variablen aus Schritt 3 unter **Settings → Environment Variables** eintragen
   (`ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`).
5. **Redeploy** auslösen, damit die Variablen greifen.

Fertig: Admin meldet sich auf `https://<deine-domain>/manage` an, ändert Daten →
Commit → Auto-Deploy → Seite nach ~1–2 Min aktuell.

---

## Projektstruktur

```text
app/
  page.tsx                Startseite (liest data.json)
  layout.tsx              Root Layout + SEO Metadata
  icon.tsx                Favicon 32×32 (Next.js ImageResponse)
  apple-icon.tsx          iOS Home-Screen-Icon 180×180
  opengraph-image.tsx     OG-Bild 1200×630 für WhatsApp/Telegram/Social
  robots.ts               robots.txt
  sitemap.ts              sitemap.xml
  manage/page.tsx         Admin-Panel (Produkte nach Kategorie gruppiert)
  datenschutz/page.tsx    Datenschutzerklärung
  impressum/page.tsx      Impressum
  api/
    auth/route.ts         Passwort-Prüfung
    save/route.ts         data.json → GitHub-Commit
    upload/route.ts       Foto → Vercel Blob
    contact/route.ts      Kontaktformular → E-Mail (Resend)
components/
  Hero.tsx                Titelbereich mit Typewriter-Effekt (svh-Viewport-Fix)
  Navbar.tsx              Sticky Navigation mit Scroll-Indikator
  Leistungen.tsx          Service-Karten mit Animationen
  Kostenrechner.tsx       Reparatur-Preisrechner (5 Reparaturarten)
  Katalog.tsx             Produkt-Katalog (20 Karten, Smartphones + Zubehör)
  BrandLogos.tsx          Marken-Chip-Leiste (Apple, Samsung, Xiaomi u.a.)
  Bewertungen.tsx         Google-Bewertungen (5,0 ★)
  Stats.tsx               Kennzahlen-Ticker
  FAQ.tsx                 Häufige Fragen (Accordion)
  Kontakt.tsx             Adresse, Öffnungszeiten, Google Maps, Kontaktformular
  Footer.tsx              Footer mit Social-Links
  icons.tsx               SVG-Icon-Sammlung (WhatsApp, etc.)
lib/
  config.ts               Kontaktdaten & Öffnungszeiten (Platzhalter ausfüllen)
  types.ts                TypeScript-Typen (Produkt, ReparaturPreis, SiteData)
  whatsapp.ts             wa.me-Link-Generator
  auth.ts                 Passwort-Verifikation
  compress.ts             Client-seitige Bildkomprimierung (<300 KB)
data.json                 Datenbank: 30 Reparaturmodelle + 20 Produkte
public/                   Bilder (.webp)
```

## Reparatur-Kostenrechner

3-stufige Auswahl: Marke → Modell → Reparaturart. Unterstützte Reparaturarten:

| Key | Anzeige |
| --- | --- |
| `display` | Display |
| `akku` | Akku |
| `charging` | Ladebuchse |
| `kamera` | Kamera |
| `rueckglas` | Rückglas |

Preise in `data.json` unter `reparaturPreise`. Je **10 Modelle** pro Marke:

- **Apple:** iPhone 16 Pro Max bis iPhone X/XR/XS
- **Samsung:** S25 Ultra bis Galaxy A14/M34
- **Xiaomi:** 14 Ultra bis Poco M5/M6

## Admin-Panel (`/manage`)

- **Produkte** werden nach Kategorie angezeigt: **Smartphones** und **Zubehör** getrennt
- Pro Produkt: Name, Preis und Foto bearbeiten; einzelne Karten ein-/ausblenden
- **Reparatur-Preise** in einer Tabelle je Marke (alle 5 Reparaturarten als Spalten)
- Fixe Anzahl: 20 Produkte, 30 Modelle — können nicht über das Panel hinzugefügt werden

## Animationen (Framer Motion)

Alle Sektionen nutzen `whileInView`-Animationen mit `once: true` (einmalig beim Einblenden).
Interaktive Elemente haben `whileHover` / `whileTap`-Feedback. `AnimatePresence` sorgt für
sanfte Ein-/Ausblend-Übergänge im Kostenrechner und Katalog-Filter.

Hero-Sektion verwendet `svh` (small viewport height) statt `vh`, damit die Seite auf
mobilen Geräten nicht springt, wenn die Browser-Adressleiste erscheint oder verschwindet.

## Hinweise

- **Produkte/Modelle hinzufügen oder löschen** ist im Admin-Panel bewusst nicht möglich
  (Scope). Dafür `data.json` direkt im Repo bearbeiten.
- Fotos werden vor dem Upload clientseitig per Canvas auf < 300 KB komprimiert
  ([`lib/compress.ts`](lib/compress.ts)).
- Favicon, Apple-Icon und OG-Bild werden zur Build-Zeit von Next.js als PNG generiert
  (`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`).
