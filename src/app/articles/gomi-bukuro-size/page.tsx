import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ゴミ袋のサイズの選び方 — リットルだけでは足りない理由",
  description:
    "ゴミ箱に合うゴミ袋は容量（L）だけでなく口まわりと高さで決まる。測り方と失敗しやすいパターンを解説します。",
};

export default function ArticlePage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-leaf-deep">
        <Link href="/" className="hover:underline">
          フクロメ
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        記事
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        ゴミ袋のサイズ、リットル表記だけで選ぶと失敗しやすい
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">更新: 2026-10-01</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          スーパーやドラッグストアで袋を選ぶとき、多くの人は「30L」「45L」の数字だけを見ます。ところが同じリットルでも、平置きの横幅・縦の長さはメーカーごとに差があります。ゴミ箱側も口の形と高さが違うため、「容量が合っているのに縁に掛からない」「余ってだぶつく」が起きます。
        </p>

        <h2 className="font-display text-xl text-ink">見るべきは2つだけ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong className="font-medium text-ink">口まわり</strong>
            — 角型なら長辺と短辺、丸型なら直径。袋の口が縁一周を覆えるか。
          </li>
          <li>
            <strong className="font-medium text-ink">高さ</strong>
            — 底から縁まで。折り返し用に数センチの余裕が必要。
          </li>
        </ol>

        <h2 className="font-display text-xl text-ink">よくある失敗パターン</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>フタ付きゴミ箱の外寸を測ってしまう</li>
          <li>一人暮らし向け30Lをキッチン中型に無理に使う</li>
          <li>自治体指定袋の実寸を確認せず一般袋の感覚で買う</li>
        </ul>

        <h2 className="font-display text-xl text-ink">先に寸法を入れてから買う</h2>
        <p>
          フクロメに寸法を入れると、10L〜90Lの目安がわかります。結果をコピーして、お店でリットルと平置き寸法を見比べてみてください。
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/#checker"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
        >
          寸法を入れて判定する
        </Link>
        <Link
          href="/guide"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-ink hover:bg-mist"
        >
          測り方ガイド
        </Link>
      </div>
    </article>
  );
}
