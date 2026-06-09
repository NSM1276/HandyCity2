"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./icons";
import { waLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL } from "@/lib/config";

const THEMEN = [
  "Display-Reparatur",
  "Akku-Tausch",
  "Ladebuchse",
  "Reinigung",
  "Ankauf / Verkauf",
  "Zubehör",
  "Sonstiges",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Kontakt() {
  const [form, setForm] = useState({
    name: "",
    telefon: "",
    email: "",
    thema: "",
    nachricht: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Kontaktanfrage: ${form.thema} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nTelefon: ${form.telefon || "—"}\nE-Mail: ${form.email}\nAnliegen: ${form.thema}\n\nNachricht:\n${form.nachricht}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
    setForm({ name: "", telefon: "", email: "", thema: "", nachricht: "" });
  }

  const inputClass =
    "w-full rounded-xl border border-dark-border bg-[#1c1c1c] px-4 py-3 text-sm text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 placeholder:text-neutral-600";

  return (
    <section id="kontakt" className="bg-dark py-20 md:py-28">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: info */}
          <div>
            <p className="shimmer-text text-sm font-semibold uppercase tracking-widest">Kontakt</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Jetzt anfragen
            </h2>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              Schreib uns einfach — wir melden uns schnellstmöglich zurück.
              Oder komm direkt vorbei, kein Termin nötig.
            </p>

            <div className="mt-8 space-y-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Meidlinger Hauptstraße 72, 1120 Wien</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mo–Fr 09:00–18:30 · Sa 09:00–17:00</span>
              </div>
            </div>

            <a
              href={waLink("Hallo Handy City 2, ich möchte eine Anfrage stellen:")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Lieber per WhatsApp schreiben
            </a>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-dark-border bg-dark-card p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Nachricht gesendet!</h3>
                <p className="mt-2 text-sm text-neutral-400">
                  Wir melden uns so schnell wie möglich bei dir.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-accent underline underline-offset-4 hover:text-accent-dark"
                >
                  Neue Nachricht senden
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Vor- und Nachname"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                      Telefon
                    </label>
                    <input
                      name="telefon"
                      value={form.telefon}
                      onChange={handleChange}
                      placeholder="+43 000 000 000"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="deine@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    Anliegen
                  </label>
                  <div className="relative">
                    <select
                      name="thema"
                      value={form.thema}
                      onChange={handleChange}
                      required
                      title="Anliegen wählen"
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Anliegen auswählen…</option>
                      {THEMEN.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    Nachricht
                  </label>
                  <textarea
                    name="nachricht"
                    value={form.nachricht}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Beschreibe dein Anliegen…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-accent">
                    Fehler beim Senden. Bitte versuche es erneut oder schreib uns per WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent-dark disabled:opacity-60"
                >
                  {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
