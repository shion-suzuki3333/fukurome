import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { href: "/#checker", label: "判定する" },
  { href: "/guide", label: "測り方" },
  { href: "/articles", label: "記事" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-[#f4f8f5]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <BrandMark className="size-8 sm:size-9" />
          <span className="font-display text-xl tracking-tight text-ink sm:text-2xl">
            フクロメ
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="メイン">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-mist hover:text-ink sm:px-2.5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
