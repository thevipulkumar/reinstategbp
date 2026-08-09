/**
 * In-memory fixed-window rate limiter, keyed by IP.
 *
 * Adequate for a low-traffic marketing form on a single region. It resets on
 * cold start and is not shared between serverless instances — if the form ever
 * comes under real abuse, swap this for Upstash Redis or Vercel KV. The call
 * signature is deliberately trivial to re-implement against either.
 */

type Window = { count: number; resetAt: number };

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

const windows = new Map<string, Window>();

function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Keep the map from growing without bound on a long-lived instance.
  if (windows.size > 5000) sweep(now);

  const existing = windows.get(ip);

  if (!existing || existing.resetAt <= now) {
    windows.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_PER_WINDOW - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > MAX_PER_WINDOW) {
    return { ok: false, remaining: 0, retryAfter };
  }

  return { ok: true, remaining: MAX_PER_WINDOW - existing.count, retryAfter };
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
