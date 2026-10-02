import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "ゴミ袋の選び方・測り方・よくある失敗についての記事一覧。",
};

const ARTICLES = [
  {
    href: "/articles/gomi-bukuro-size",
    title: "ゴミ袋のサイズ、リットル表記だけで選ぶと失敗しやすい",
    blurb: "口まわりと高さが本命。容量だけでは足りない理由。",
  },
  {
    href: "/articles/45l-awanai",
    title: "45Lなのに合わない——先に疑うべき2点",
    blurb: "定番サイズが縁に掛からないときのチェックリスト。",
  },
];

export default function ArticlesIndexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm text-leaf-deep">
        <Link href="/" className="hover:underline">
          フクロメ
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        記事
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
        記事一覧
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        判定の前に読むと、測り方と買い方のミスが減ります。
      </p>
      <ul className="mt-10 space-y-6">
        {ARTICLES.map((a) => (
          <li key={a.href}>
            <Link href={a.href} className="group block">
              <h2 className="text-lg font-medium text-ink group-hover:text-leaf-deep">
                {a.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/#checker"
        className="mt-10 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/85"
      >
        判定ツールへ
      </Link>
    </div>
  );
}
