import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "45L袋がゴミ箱に合わないときのチェックリスト",
  description:
    "家庭用の定番45Lが縁に掛からない・だぶつく原因は口まわりか高さ。測り直しポイントを整理します。",
};

export default function Article45LPage() {
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
        45Lなのに合わない——先に疑うべき2点
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">更新: 2026-10-01</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          日本の家庭用ゴミ箱でいちばんよく選ばれるのが45L帯です。それでも「入らない」「すぐ外れる」「だぶつく」が起きます。容量の数字より、口まわりと高さの不一致を疑ってください。
        </p>

        <h2 className="font-display text-xl text-ink">1. 口が足りない</h2>
        <p>
          角型で口が広い（例: 35×30cm）場合、縁一周が約130cmになります。袋の平置き幅が狭い45Lだと口が足りず、角が浮きます。対処は一回り大きい70Lを試すか、口の小さいゴミ箱に替えることです。
        </p>

        <h2 className="font-display text-xl text-ink">2. 高さが足りない</h2>
        <p>
          袋の縦がゴミ箱の内寸より短いと、縁への折り返しができません。深いキッチンペールでは45Lでも高さ不足になり得ます。
        </p>

        <h2 className="font-display text-xl text-ink">測り直してから買い直す</h2>
        <p>
          外側の見た目やフタ寸法ではなく、袋を掛ける内側を測ります。フクロメに入れると、45L以外の候補（使える / だぶつき / 不足）が一覧になります。
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/#checker"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          寸法を入れて見直す
        </Link>
        <Link
          href="/articles/gomi-bukuro-size"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-ink hover:bg-mist"
        >
          サイズの基礎記事
        </Link>
      </div>
    </article>
  );
}
