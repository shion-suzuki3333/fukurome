import type { Metadata } from "next";
import Link from "next/link";
import { MeasureDiagram } from "@/components/measure-diagram";

export const metadata: Metadata = {
  title: "測り方ガイド",
  description:
    "ゴミ箱に合うゴミ袋を選ぶための、口まわり・高さの正しい測り方。角型・丸型のポイントを解説します。",
};

const steps = [
  {
    title: "メジャーを用意する",
    body: "布メジャーかコンベックスでOK。外側ではなく、袋を掛ける内側を測ります。",
  },
  {
    title: "口の形を確認する",
    body: "長方形・正方形なら角型、円なら丸型。楕円っぽいときは長径を直径として入れると安心です。",
  },
  {
    title: "口の寸法を測る",
    body: "角型は内側の長辺と短辺、丸型は内側の直径。ふちの厚みやフタのヒンジは含めません。",
  },
  {
    title: "高さを測る",
    body: "底の内側から縁の上端まで。底に突起があるときは、袋が載る面から測ります。",
  },
  {
    title: "フクロメで判定する",
    body: "形状と寸法を入れて結果を確認。「ぴったり目安」「使える」から選ぶのがおすすめです。",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-leaf-deep">
        <Link href="/" className="hover:underline">
          フクロメ
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        測り方
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        ゴミ箱の測り方ガイド
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        よくある失敗は「外側を測る」「高さだけで買う」の2つ。口まわりと高さをセットで測ると選びやすくなります。
      </p>

      <MeasureDiagram />

      <ol className="mt-10 space-y-8">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="font-display text-2xl text-leaf/50 tabular-nums"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-lg font-medium text-ink">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 space-y-3 rounded-2xl border border-border/80 bg-card/70 p-5">
        <h2 className="font-display text-xl text-ink">よくある測りミス</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>フタ付きで、フタの外寸を口の寸法にしてしまう</li>
          <li>底の凹凸を無視して高さを長く見積もる</li>
          <li>角が丸い四角を丸型扱いする（長辺・短辺の方が安全）</li>
        </ul>
      </section>

      <div className="mt-10">
        <Link
          href="/#checker"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
        >
          測れたら判定する
        </Link>
      </div>
    </div>
  );
}
