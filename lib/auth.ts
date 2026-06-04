import siteData from "@/data.json";
import type { SiteData } from "./types";

/** Prüft das übergebene Passwort. Priorität: adminPassword in data.json → ADMIN_PASSWORD env var. */
export function checkPassword(password: unknown): boolean {
  const data = siteData as SiteData;
  const expected = data.adminPassword || process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return typeof password === "string" && password === expected;
}
