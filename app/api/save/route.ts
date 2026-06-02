import { NextResponse } from "next/server";
import { checkPassword } from "@/lib/auth";
import type { SiteData } from "@/lib/types";

const FILE_PATH = "data.json";

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (!checkPassword(body?.password)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const data = body?.data as SiteData | undefined;
  if (!data || !data.reparaturPreise || !Array.isArray(data.produkte)) {
    return NextResponse.json(
      { ok: false, error: "Ungültige Daten" },
      { status: 400 },
    );
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  if (!token || !owner || !repo) {
    return NextResponse.json(
      { ok: false, error: "GitHub-Konfiguration fehlt" },
      { status: 500 },
    );
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`;
  const headers = githubHeaders(token);

  // 1. Aktuelle Datei holen, um den SHA zu bekommen.
  const getRes = await fetch(url, { headers, cache: "no-store" });
  if (!getRes.ok) {
    const txt = await getRes.text();
    return NextResponse.json(
      { ok: false, error: `GitHub GET fehlgeschlagen: ${getRes.status} ${txt}` },
      { status: 502 },
    );
  }
  const current = (await getRes.json()) as { sha: string };

  // 2. Neuen Inhalt committen.
  const content = `${JSON.stringify(data, null, 2)}\n`;
  const encoded = Buffer.from(content, "utf-8").toString("base64");

  const putRes = await fetch(url, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "chore: update data.json via admin panel",
      content: encoded,
      sha: current.sha,
    }),
  });

  if (!putRes.ok) {
    const txt = await putRes.text();
    return NextResponse.json(
      { ok: false, error: `GitHub PUT fehlgeschlagen: ${putRes.status} ${txt}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
