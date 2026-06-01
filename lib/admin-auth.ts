import { createHmac } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET ?? "jp-admin-secret-2024-#";
export const COOKIE_NAME = "jp-admin-session";
const TTL_MS = 1000 * 60 * 60 * 24; // 24h

export function createSessionToken(username: string): string {
  const ts = Date.now().toString();
  const payload = `${username}|${ts}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}|${sig}`).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split("|");
    if (parts.length !== 3) return false;
    const [username, ts, sig] = parts;
    const payload = `${username}|${ts}`;
    const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
    if (sig !== expected) return false;
    return Date.now() - parseInt(ts) < TTL_MS;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return !!token && verifySessionToken(token);
}

export function checkCredentials(user: string, pass: string): boolean {
  const adminUser = process.env.ADMIN_USER ?? "julio";
  const adminPass = process.env.ADMIN_PASS ?? "pintor2024";
  return user === adminUser && pass === adminPass;
}
