import { NextResponse } from "next/server";
import { checkPassword } from "@/lib/auth";

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
  const { oldPassword, newPassword } = body ?? {};

  if (!checkPassword(oldPassword)) {
    return NextResponse.json({ ok: false, error: "Altes Passwort ist falsch" }, { status: 401 });
  }

  if (typeof newPassword !== "string" || newPassword.length < 6) {
    return NextResponse.json({ ok: false, error: "Neues Passwort zu kurz (min. 6 Zeichen)" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  if (!token || !owner || !repo) {
    return NextResponse.json({ ok: false, error: "GitHub-Konfiguration fehlt" }, { status: 500 });
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`;
  const headers = githubHeaders(token);

  const getRes = await fetch(url, { headers, cache: "no-store" });
  if (!getRes.ok) {
    return NextResponse.json({ ok: false, error: "GitHub GET fehlgeschlagen" }, { status: 502 });
  }
  const current = await getRes.json() as { sha: string; content: string };

  const data = JSON.parse(Buffer.from(current.content, "base64").toString("utf-8"));
  data.adminPassword = newPassword;

  const encoded = Buffer.from(`${JSON.stringify(data, null, 2)}\n`, "utf-8").toString("base64");

  const putRes = await fetch(url, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "chore: update admin password via admin panel",
      content: encoded,
      sha: current.sha,
    }),
  });

  if (!putRes.ok) {
    return NextResponse.json({ ok: false, error: "GitHub PUT fehlgeschlagen" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
