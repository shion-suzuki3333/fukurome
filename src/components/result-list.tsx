"use client";

import { motion } from "framer-motion";
import type { FitResult, FitStatus } from "@/lib/bag-fit";
import { SPECS_REVIEWED_AT, statusLabel } from "@/lib/bag-fit";
import { RimCompare } from "@/components/rim-compare";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  FitStatus,
  { chip: string; bar: string }
> = {
  best: { chip: "bg-ok/15 text-ok", bar: "bg-ok" },
  ok: { chip: "bg-leaf/15 text-leaf-deep", bar: "bg-leaf" },
  tight: { chip: "bg-warn/15 text-warn", bar: "bg-warn" },
  short: { chip: "bg-destructive/10 text-destructive", bar: "bg-destructive" },
  small: { chip: "bg-destructive/10 text-destructive", bar: "bg-destructive" },
  oversized: {
    chip: "bg-muted text-muted-foreground",
    bar: "bg-muted-foreground/45",
  },
};

interface ResultListProps {
  results: FitResult[];
}

function isRecommended(status: FitStatus) {
  return status === "best" || status === "ok";
}

export function ResultList({ results }: ResultListProps) {
  if (!results.length) return null;

  const recommended = results.filter((r) => isRecommended(r.status));
  const others = results.filter((r) => !isRecommended(r.status));
  const hero = recommended[0] ?? results[0];
  const restRecommended = recommended.slice(1);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-xl text-ink sm:text-2xl">適合結果</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            まずはこのサイズがおすすめ。下にほかの候補もまとめています。
          </p>
      </div>

      {/* Spotlight: first recommended */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl bg-primary px-5 py-6 text-primary-foreground sm:px-7"
        aria-labelledby="hero-pick"
      >
        <p className="text-xs font-medium tracking-wide text-primary-foreground/75">
          第一候補
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p
              id="hero-pick"
              className="font-display text-5xl tracking-tight sm:text-6xl"
            >
              {hero.bag.label}
            </p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              {hero.bag.useHint}
            </p>
          </div>
          <span className="rounded-md bg-primary-foreground/15 px-2.5 py-1 text-sm font-medium">
            {statusLabel(hero.status)}
          </span>
        </div>
        <ul className="mt-4 max-w-xl space-y-1.5 text-sm leading-relaxed text-primary-foreground/85">
          {hero.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
        <RimCompare result={hero} />
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-primary-foreground/65">
          概算です。自治体指定袋・メーカー表記を優先（寸法表{" "}
          {SPECS_REVIEWED_AT}）
        </p>
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary-foreground/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 right-16 size-28 rounded-full bg-primary-foreground/8"
          aria-hidden
        />
      </motion.article>

      {restRecommended.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-ink">ほかに使えるサイズ</h4>
          <ul className="divide-y divide-border/70">
            {restRecommended.map((result, index) => (
              <ResultRow
                key={result.bag.id}
                result={result}
                index={index}
                compact
              />
            ))}
          </ul>
        </div>
      )}

      {others.length > 0 && (
        <details className="group rounded-xl border border-border/70 bg-mist/40 open:bg-card/40">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              合わない・余裕すぎるサイズ（{others.length}）
              <span className="text-xs font-normal text-muted-foreground group-open:hidden">
                開く
              </span>
              <span className="hidden text-xs font-normal text-muted-foreground group-open:inline">
                閉じる
              </span>
            </span>
          </summary>
          <ul className="divide-y divide-border/60 border-t border-border/60 px-4 pb-2">
            {others.map((result, index) => (
              <ResultRow
                key={result.bag.id}
                result={result}
                index={index}
                compact
              />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function ResultRow({
  result,
  index,
  compact,
}: {
  result: FitResult;
  index: number;
  compact?: boolean;
}) {
  const style = statusStyles[result.status];
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={cn("py-3.5", compact && "py-3")}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-ink">
            {result.bag.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {result.bag.useHint}
          </span>
        </div>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-xs font-medium",
            style.chip,
          )}
        >
          {statusLabel(result.status)}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-mist">
        <motion.div
          className={cn("h-full rounded-full", style.bar)}
          initial={{ width: 0 }}
          animate={{
            width: `${Math.max(8, Math.min(100, result.score))}%`,
          }}
          transition={{ duration: 0.45, delay: index * 0.04 }}
        />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {result.reasons[0]}
      </p>
    </motion.li>
  );
}
