/** Prüft das übergebene Passwort gegen ADMIN_PASSWORD (nur serverseitig). */
export function checkPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return typeof password === "string" && password === expected;
}
