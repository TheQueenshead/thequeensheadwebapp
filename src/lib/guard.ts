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
 *   TURNSTILE_HOSTNAMES             — optional, comma-separated domains the
 *                                     form may be submitted from. Defaults to
 *                                     the pub's live domain on the live site.
 */

const DEFAULT_LIVE_HOSTNAMES = [
  "thequeensheadlittlebury.co.uk",
  "www.thequeensheadlittlebury.co.uk",
];

function allowedHostnames(): string[] | null {
  const fromEnv = process.env.TURNSTILE_HOSTNAMES?.split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (fromEnv?.length) return fromEnv;
  // Preview and local builds can run on any address, so only the live
  // site is held to the default list.
  return isLive() ? DEFAULT_LIVE_HOSTNAMES : null;
}

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

/**
 * Returns true if the Turnstile token is valid (or captcha is off in dev).
 * Follows Cloudflare's siteverify checklist: server-side only, single-use
 * tokens, a timeout, and the result must match the expected form (action)
 * and the pub's own domain (hostname).
 */
export async function verifyCaptcha(
  token: string | undefined,
  ip: string,
  expectedAction?: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isLive()) throw new ConfigError("TURNSTILE_SECRET_KEY is not set");
    return true;
  }
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, signal: AbortSignal.timeout(10_000) },
  );
  if (!res.ok) throw new Error(`Turnstile verify failed: ${res.status}`);
  const json = (await res.json()) as {
    success: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  if (!json.success) return false;
  if (expectedAction && json.action !== expectedAction) return false;
  const hosts = allowedHostnames();
  if (hosts && !hosts.includes((json.hostname ?? "").toLowerCase())) return false;
  return true;
}
