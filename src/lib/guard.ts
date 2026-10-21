/**
 * FORM PROTECTION
 * ------------------------------------------------------------------
 * Shared by /api/enquiry and /api/newsletter:
 *   - isLive()       — true on the real public site, where every
 *                      integration must be configured (no demo mode)
 *   - rateLimit()    — caps submissions per visitor IP
 *   - verifyCaptcha() — checks the Cloudflare Turnstile token
 *
 * Turnstile keys (free, from dash.cloudflare.com → Turnstile):
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY  — shown in the browser
 *   TURNSTILE_SECRET_KEY            — server only
 */

/**
 * On Vercel only the Production environment counts as live, so Preview
 * deployments can still run in demo mode for client review. Elsewhere
 * (e.g. `next start` on a server) any production build counts.
 */
export function isLive() {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === "production";
  return process.env.NODE_ENV === "production";
}

/** Thrown when the live site is missing a required setting. */
export class ConfigError extends Error {}

export function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Fixed-window limit, held in memory. Each serverless instance keeps its
 * own count, so this stops a single bot hammering the form but is not a
 * hard global cap — for that, add a rate-limit rule in Vercel → Firewall.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  // Keep the map from growing without bound
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

/** Returns true if the Turnstile token is valid (or captcha is off in dev). */
export async function verifyCaptcha(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isLive()) throw new ConfigError("TURNSTILE_SECRET_KEY is not set");
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  if (!res.ok) throw new Error(`Turnstile verify failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean };
  return json.success;
}
