import Link from "next/link";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { FitChecker } from "@/components/fit-checker";
import { Hero } from "@/components/hero";
import { HomeJsonLd } from "@/components/json-ld";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <FaqJsonLd />
      <Hero />

      <div className="mx-auto w-full max-w-5xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <FitChecker />

        <section aria-labelledby="flow-title" className="space-y-6">
          <div>
            <h2
              id="flow-title"
              className="font-display text-2xl tracking-tight text-ink sm:text-3xl"
            >
              使い方は3ステップ
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              測る → 入れる → 買う。
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "口と高さを測る",
                body: "縁の内側を測ります。角型は長辺・短辺、丸型は直径。",
              },
              {
                n: "02",
                title: "寸法を入れる",
                body: "形状を選んでcmを入力。プリセットからも試せます。",
              },
              {
                n: "03",
                title: "合う袋を選ぶ",
                body: "第一候補を目安に、お店で確認して購入。",
              },
            ].map((item) => (
              <li key={item.n} className="relative pt-1">
                <span className="font-display text-4xl text-leaf/40">{item.n}</span>
                <h3 className="mt-1 text-base font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-title" className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="faq-title"
              className="font-display text-2xl tracking-tight text-ink"
            >
              よくある質問
            </h2>
            <Link
              href="/articles/gomi-bukuro-size"
              className="text-sm text-leaf-deep underline-offset-2 hover:underline"
            >
              選び方の記事を読む
            </Link>
          </div>
          <dl className="space-y-5">
            {[
              {
                q: "リットル表記だけで買って失敗するのはなぜ？",
                a: "同じ30Lでも、袋の寸法はメーカーごとに違います。口まわりと高さのバランスが大事で、容量だけでは合わないことがあります。",
              },
              {
                q: "自治体指定袋でも使えますか？",
                a: "目安にはできますが、指定袋の実寸を優先してください。フクロメは一般的な家庭用ポリ袋の概算です。",
              },
              {
                q: "マチ付き袋やボックス型は？",
                a: "いまはマチなし平袋の一般寸法で判定しています。マチ付きは口が広がりやすいので、ギリギリなら一回り大きいサイズが安心です。",
              },
            ].map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-ink">{item.q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
