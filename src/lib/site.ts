type SiteUrlEnv = Record<string, string | undefined>;

/**
 * Public site origin for sitemap / canonical / JSON-LD.
 * Prefer NEXT_PUBLIC_SITE_URL. On Vercel, fall back to the project production URL
 * so a missing env var does not ship localhost into sitemap/canonical.
 */
export function resolveSiteUrl(env: SiteUrlEnv = process.env as SiteUrlEnv): string {
  const fromEnv = env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const vercelProduction =
    env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "") ||
    env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (vercelProduction) {
    return vercelProduction.startsWith("http")
      ? vercelProduction
      : `https://${vercelProduction}`;
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://127.0.0.1:43123";
}

export function getSiteUrl(): string {
  return resolveSiteUrl(process.env as SiteUrlEnv);
}

export const SITE_NAME = "フクロメ";
