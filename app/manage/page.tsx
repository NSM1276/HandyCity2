"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import initialData from "@/data.json";
import type { Reparaturart, SiteData } from "@/lib/types";
import { compressImage } from "@/lib/compress";

const REPARATUR_LABELS: Record<Reparaturart, string> = {
  display: "Display",
  akku: "Akku",
  charging: "Ladebuchse",
  kamera: "Kamera",
  rueckglas: "Rückglas",
};

function clone(data: SiteData): SiteData {
  return JSON.parse(JSON.stringify(data));
}

export default function ManagePage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_auth") === "1";
    }
    return false;
  });
  const [loginError, setLoginError] = useState("");

  const [data, setData] = useState<SiteData>(() => clone(initialData as SiteData));
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const [pwOld, setPwOld] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin_auth", "1");
      setLoggedIn(true);
    } else {
      setLoginError("Falsches Passwort.");
    }
  }

  function toggleHidden(id: number) {
    setData((d) => ({
      ...d,
      produkte: d.produkte.map((p) =>
        p.id === id ? { ...p, hidden: !p.hidden } : p,
      ),
    }));
  }

  function updateProdukt(id: number, patch: Partial<{ name: string; preis: number; bild: string }>) {
    setData((d) => ({
      ...d,
      produkte: d.produkte.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }

  function updatePreis(
    marke: string,
    modell: string,
    art: Reparaturart,
    wert: number,
  ) {
    setData((d) => {
      const next = clone(d);
      next.reparaturPreise[marke][modell][art] = wert;
      return next;
    });
  }

  async function handleImage(id: number, file: File) {
    setUploadingId(id);
    setSaveMsg("");
    try {
      const compressed = await compressImage(file);
      const form = new FormData();
      form.append("password", password);
      form.append("file", compressed);
      const current = data.produkte.find((p) => p.id === id)?.bild;
      if (current) form.append("oldUrl", current);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Upload fehlgeschlagen");
      }
      updateProdukt(id, { bild: json.url });
      setSaveMsg("Foto hochgeladen. Nicht vergessen: „Speichern“ klicken.");
    } catch (err) {
      setSaveMsg(`Fehler beim Upload: ${(err as Error).message}`);
    } finally {
      setUploadingId(null);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Speichern fehlgeschlagen");
      }
      setSaveMsg("Gespeichert ✓ — Änderungen sind in ~1–2 Min live.");
    } catch (err) {
      setSaveMsg(`Fehler: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg("");
    if (pwNew !== pwConfirm) { setPwMsg("Passwörter stimmen nicht überein."); return; }
    if (pwNew.length < 6) { setPwMsg("Neues Passwort muss mindestens 6 Zeichen haben."); return; }
    setPwSaving(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword: pwOld, newPassword: pwNew }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Fehler");
      setPwMsg("✓ Passwort geändert — in ~1–2 Min aktiv.");
      setPwOld(""); setPwNew(""); setPwConfirm("");
      setPassword(pwNew);
    } catch (err) {
      setPwMsg(`Fehler: ${(err as Error).message}`);
    } finally {
      setPwSaving(false);
    }
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-2xl font-bold">Admin-Login</h1>
          <p className="mt-1 text-sm text-neutral-500">Handy City 2 · Verwaltung</p>
          <div className="relative mt-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              autoFocus
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-12 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              tabIndex={-1}
              aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {loginError && (
            <p className="mt-2 text-sm text-accent">{loginError}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-accent px-4 py-3 font-semibold text-white transition hover:bg-accent-dark"
          >
            Anmelden
          </button>
        </form>
      </main>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <main className="min-h-screen bg-surface pb-32">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold">Handy City 2 — Verwaltung</h1>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className="hidden text-sm text-neutral-600 sm:inline">
                {saveMsg}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              Website ansehen ↗
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
            >
              {saving ? "Speichert…" : "Speichern"}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("admin_auth"); setLoggedIn(false); setPassword(""); setSaveMsg(""); }}
              className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-500 transition hover:bg-neutral-100"
              title="Abmelden"
            >
              Abmelden
            </button>
          </div>
        </div>
        {saveMsg && (
          <p className="px-6 pb-3 text-sm text-neutral-600 sm:hidden">{saveMsg}</p>
        )}
      </header>

      <div className="mx-auto max-w-content space-y-12 px-6 py-10">
        {/* Block 1 — Produkte */}
        <section>
          <h2 className="text-xl font-bold">Produkte ({data.produkte.length})</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Name, Preis und Foto bearbeiten. Fotos werden automatisch komprimiert.
          </p>

          {(["smartphone", "zubehoer"] as const).map((kat) => {
            const gruppe = data.produkte.filter((p) => p.kategorie === kat);
            return (
              <div key={kat} className="mt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                  {kat === "smartphone" ? "Smartphones" : "Zubehör"}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gruppe.map((p) => (
                    <div
                      key={p.id}
                      className={`rounded-2xl border p-4 transition ${p.hidden ? "border-neutral-200 bg-neutral-50 opacity-50" : "border-neutral-200 bg-white"}`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-neutral-400">#{p.id}</span>
                        <button
                          type="button"
                          onClick={() => toggleHidden(p.id)}
                          className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${p.hidden ? "bg-neutral-200 text-neutral-600 hover:bg-neutral-300" : "bg-red-50 text-accent hover:bg-red-100"}`}
                        >
                          {p.hidden ? "Einblenden" : "Ausblenden"}
                        </button>
                      </div>
                      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-surface">
                        <Image
                          src={p.bild || "/placeholder-phone.webp"}
                          alt={p.name}
                          fill
                          sizes="200px"
                          className="object-contain p-2"
                        />
                      </div>
                      <label className="block text-xs font-medium text-neutral-500">Name</label>
                      <input
                        className={inputClass}
                        value={p.name}
                        placeholder="Produktname"
                        onChange={(e) => updateProdukt(p.id, { name: e.target.value })}
                      />
                      <label className="mt-2 block text-xs font-medium text-neutral-500">Preis (€)</label>
                      <input
                        type="number"
                        min={0}
                        className={inputClass}
                        value={p.preis}
                        placeholder="0"
                        onChange={(e) => updateProdukt(p.id, { preis: Number(e.target.value) })}
                      />
                      <label className="mt-3 block">
                        <span className="text-xs font-medium text-neutral-500">Foto ersetzen</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingId === p.id}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleImage(p.id, f);
                            e.target.value = "";
                          }}
                          className="mt-1 block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-white"
                        />
                      </label>
                      {uploadingId === p.id && (
                        <p className="mt-1 text-xs text-neutral-500">Lädt hoch…</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Block 0 — Passwort ändern */}
        <section>
          <h2 className="text-xl font-bold">Passwort ändern</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Neues Passwort wird nach ~1–2 Minuten aktiv.
          </p>
          <form onSubmit={handleChangePassword} className="mt-6 max-w-sm space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Altes Passwort</label>
              <input
                type="password"
                value={pwOld}
                onChange={(e) => setPwOld(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Neues Passwort</label>
              <input
                type="password"
                value={pwNew}
                onChange={(e) => setPwNew(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Neues Passwort bestätigen</label>
              <input
                type="password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                required
                className={inputClass}
              />
            </div>
            {pwMsg && (
              <p className={`text-sm ${pwMsg.startsWith("✓") ? "text-green-600" : "text-accent"}`}>
                {pwMsg}
              </p>
            )}
            <button
              type="submit"
              disabled={pwSaving}
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
            >
              {pwSaving ? "Wird gespeichert…" : "Passwort ändern"}
            </button>
          </form>
        </section>

        {/* Block 2 — Kostenrechner */}
        <section>
          <h2 className="text-xl font-bold">Reparatur-Preise</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Preise je Modell für alle 5 Reparaturarten.
          </p>
          <div className="mt-6 space-y-8">
            {Object.entries(data.reparaturPreise).map(([marke, modelle]) => (
              <div key={marke}>
                <h3 className="mb-3 font-semibold text-accent">{marke}</h3>
                <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 text-left text-xs uppercase text-neutral-500">
                        <th className="p-3">Modell</th>
                        <th className="p-3">Display</th>
                        <th className="p-3">Akku</th>
                        <th className="p-3">Ladebuchse</th>
                        <th className="p-3">Kamera</th>
                        <th className="p-3">Rückglas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(modelle).map(([modell, preise]) => (
                        <tr
                          key={modell}
                          className="border-b border-neutral-100 last:border-0"
                        >
                          <td className="p-3 font-medium">{modell}</td>
                          {(["display", "akku", "charging", "kamera", "rueckglas"] as Reparaturart[]).map(
                            (art) => (
                              <td key={art} className="p-3">
                                <input
                                  type="number"
                                  min={0}
                                  aria-label={`${modell} ${REPARATUR_LABELS[art]}`}
                                  className="w-20 rounded-lg border border-neutral-300 px-2 py-1.5 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                  value={preise[art]}
                                  onChange={(e) =>
                                    updatePreis(marke, modell, art, Number(e.target.value))
                                  }
                                />
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
