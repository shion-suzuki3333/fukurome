import { SITE_NAME, getSiteUrl } from "@/lib/site";
import { safeJsonLd } from "@/lib/safe-json-ld";

/** JSON-LD for the home WebApplication — no user data. */
export function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    inLanguage: "ja",
    description:
      "ゴミ箱の寸法から合うゴミ袋サイズの目安を判定するツール。",
    url: getSiteUrl(),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    privacyPolicy: `${getSiteUrl()}/privacy`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
