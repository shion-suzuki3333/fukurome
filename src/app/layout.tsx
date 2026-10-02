import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "フクロメ — ゴミ箱に合うゴミ袋チェッカー",
    template: "%s · フクロメ",
  },
  description:
    "ゴミ箱の寸法から合うゴミ袋の目安を判定。測り方ガイド付き。",
  applicationName: "フクロメ",
  keywords: [
    "ゴミ袋",
    "ゴミ箱",
    "サイズ",
    "何リットル",
    "適合",
    "チェッカー",
    "測り方",
  ],
  robots: { index: true, follow: true },
  verification: {
    google: "kFxOMSSCiHp-Aqp5taCF4kzLfVxkuY1D84PMiB0ZAGA",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "フクロメ — ゴミ箱に合うゴミ袋チェッカー",
    description:
      "寸法を入れるだけで、合うゴミ袋の目安がわかります。",
    locale: "ja_JP",
    type: "website",
    siteName: "フクロメ",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "フクロメ — ゴミ箱に合うゴミ袋チェッカー",
    description: "寸法を入れるだけで、合うゴミ袋の目安がわかります。",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3f32",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${zenMaru.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
