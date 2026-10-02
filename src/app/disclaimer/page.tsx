import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免責事項",
  description:
    "フクロメの判定結果は一般的な袋寸法に基づく概算です。自治体指定袋やメーカー表記を優先してください。",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-leaf-deep">
        <Link href="/" className="hover:underline">
          フクロメ
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        免責事項
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        免責事項
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">最終更新: 2026-10-01</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          フクロメが示す適合結果は、日本の家庭用ポリ袋でよく見られる平置き寸法を基にした
          <strong className="font-medium text-ink">概算の目安</strong>
          です。実際の製品寸法・厚み・マチの有無・伸縮性によって結果は変わります。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            自治体の指定ゴミ袋がある場合は、指定袋の表記とルールを最優先してください。
          </li>
          <li>
            購入前に、パッケージに印刷された実寸（またはメーカー公式の寸法表）を確認してください。
          </li>
          <li>
            本ツールの利用により生じた購入ミス・損害について、運営者は責任を負いません。
          </li>
          <li>
            医療廃棄物や特別管理が必要なゴミの取扱いには対応していません。
          </li>
        </ul>
        <p>
          判定ロジックや袋寸法表は改善のため予告なく更新されることがあります。重要な判断は、実物の試し掛けと公式情報に基づいてください。
        </p>
        <Link
          href="/#checker"
          className="inline-flex text-leaf-deep underline-offset-2 hover:underline"
        >
          チェッカーに戻る
        </Link>
      </div>
    </div>
  );
}
