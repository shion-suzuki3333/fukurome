import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-[#f4f8f5]/90">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark className="size-7" />
            <p className="font-display text-lg text-ink">フクロメ</p>
          </div>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            ゴミ箱の寸法から、合うゴミ袋の目安を判定します。
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
          aria-label="フッター"
        >
          <Link href="/guide" className="hover:text-ink">
            測り方ガイド
          </Link>
          <Link href="/articles/gomi-bukuro-size" className="hover:text-ink">
            選び方の記事
          </Link>
          <Link href="/disclaimer" className="hover:text-ink">
            免責事項
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            プライバシー
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/50">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} フクロメ · 袋寸法の目安です。自治体指定袋を優先。計算は端末内のみ。
        </p>
      </div>
    </footer>
  );
}
