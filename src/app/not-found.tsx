import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-display text-5xl text-leaf/50">404</p>
      <h1 className="mt-2 font-display text-2xl tracking-tight text-ink">
        ページが見つかりません
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        リンクが古いいか、アドレスの打ち間違いの可能性があります。
      </p>
      <Link
        href="/#checker"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/85"
      >
        適合チェッカーへ戻る
      </Link>
    </div>
  );
}
