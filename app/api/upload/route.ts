import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { checkPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage" },
      { status: 400 },
    );
  }

  if (!checkPassword(form.get("password"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Keine Datei" },
      { status: 400 },
    );
  }

  // Vom Client wird bereits auf < 300 KB komprimiert; hier als Schutz erneut prüfen.
  if (file.size > 400 * 1024) {
    return NextResponse.json(
      { ok: false, error: "Datei zu groß (max. 300 KB)" },
      { status: 413 },
    );
  }

  if (process.env.ADMIN_LOCKED === "true") {
    return NextResponse.json({ ok: true, url: form.get("oldUrl") ?? "" });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Blob-Konfiguration fehlt" },
      { status: 500 },
    );
  }

  // Alten Blob löschen (falls vorhanden).
  const oldUrl = form.get("oldUrl");
  if (typeof oldUrl === "string" && oldUrl.includes(".blob.vercel-storage.com")) {
    await del(oldUrl, { token }).catch(() => {
      /* still möglich, dass der Blob bereits weg ist */
    });
  }

  const ext = file.type === "image/webp" ? "webp" : "jpg";
  const blob = await put(`produkte/${Date.now()}.${ext}`, file, {
    access: "public",
    token,
    contentType: file.type || "image/jpeg",
  });

  return NextResponse.json({ ok: true, url: blob.url });
}
