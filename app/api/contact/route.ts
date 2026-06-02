import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, telefon, email, thema, nachricht } = body;

    if (!name || !email || !thema || !nachricht) {
      return NextResponse.json({ ok: false, error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    // If RESEND_API_KEY is configured, send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Handy City 2 Website <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          reply_to: email,
          subject: `Kontaktanfrage: ${thema} — ${name}`,
          text: [
            `Name: ${name}`,
            `Telefon: ${telefon || "—"}`,
            `E-Mail: ${email}`,
            `Anliegen: ${thema}`,
            "",
            `Nachricht:`,
            nachricht,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ ok: false, error: "E-Mail konnte nicht gesendet werden" }, { status: 500 });
      }
    } else {
      // No email service configured yet — log to console (dev/placeholder mode)
      console.log("📬 Kontaktanfrage (kein RESEND_API_KEY konfiguriert):", {
        name, telefon, email, thema, nachricht,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "Interner Fehler" }, { status: 500 });
  }
}
