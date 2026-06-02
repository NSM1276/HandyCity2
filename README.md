# Handy City 2 — Website

Next.js 14 (App Router) Website für **Handy City 2**, Meidlinger Hauptstraße 29, 1120 Wien.
Express-Reparatur · Ankauf · Verkauf · Zubehör.

- **Frontend:** Next.js 14 + Tailwind CSS + Inter
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
| `OPENING_HOURS` | Öffnungszeiten | siehe Datei |
| `MAPS_EMBED_SRC` | Google-Maps-Embed-URL | bereits auf die Adresse gesetzt |

## 3. Umgebungsvariablen

`.env.local` (lokal) bzw. Vercel → Project → Settings → Environment Variables:

```
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

```
app/
  page.tsx            Startseite (liest data.json)
  manage/page.tsx     Admin-Panel
  api/
    auth/route.ts     Passwort-Prüfung
    save/route.ts     data.json -> GitHub-Commit
    upload/route.ts   Foto -> Vercel Blob
components/            Hero, Leistungen, Kostenrechner, Katalog, Bewertungen, Footer
lib/                   config, types, whatsapp, auth, compress
data.json             Datenbank (Preise + 20 Produkte)
public/               Bilder (.webp)
```

## Hinweise

- **Produkte/Modelle hinzufügen oder löschen** ist im Admin-Panel bewusst nicht möglich
  (Scope). Dafür `data.json` direkt im Repo bearbeiten.
- Fotos werden vor dem Upload clientseitig per Canvas auf < 300 KB komprimiert
  ([`lib/compress.ts`](lib/compress.ts)).
