import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "フクロメのプライバシーポリシー。適合判定の入力値は端末内で処理し、サーバーへ送信しません。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-leaf-deep">
        <Link href="/" className="hover:underline">
          フクロメ
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        プライバシー
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">最終更新: 2026-10-01</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base font-medium text-ink">基本方針</h2>
          <p>
            フクロメは、ゴミ箱の寸法からゴミ袋の適合目安を示すウェブツールです。適合判定に使う数値はブラウザ内だけで処理し、当サイトのサーバーへ送信する実装にはしていません。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-ink">収集しないもの</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>入力した寸法・形状のサーバー保存</li>
            <li>写真・ファイルのアップロード</li>
            <li>アカウント登録や連絡先の取得</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-ink">アクセス解析・広告</h2>
          <p>
            現状、第三者のアクセス解析や広告タグは埋め込んでいません。将来導入する場合は、本ページを更新し、Cookie
            等の利用目的を明示します。広告を載せる場合でも、適合計算そのものは端末内完結を維持する方針です。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-ink">外部リンク</h2>
          <p>
            当サイトから外部サイトへリンクする場合、リンク先のプライバシー慣行には責任を負いません。
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-medium text-ink">お問い合わせ</h2>
          <p>
            本ポリシーに関するお問い合わせは、リポジトリまたはサイト運営者の公開連絡先までご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}
