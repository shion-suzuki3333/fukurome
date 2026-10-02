/**
 * Public site origin for sitemap / canonical.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://fukurome.example).
 * Without it, sitemap falls back to the local dev origin — do not deploy like that.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://127.0.0.1:43123";
}

export const SITE_NAME = "フクロメ";
