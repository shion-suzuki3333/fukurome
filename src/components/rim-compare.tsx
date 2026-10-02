"use client";

import type { FitResult } from "@/lib/bag-fit";

/** Simple visual: bin rim vs bag mouth lengths for the top pick */
export function RimCompare({ result }: { result: FitResult }) {
  const rim = Math.max(1, result.binRimCm);
  const mouth = Math.max(1, result.bagMouthCm);
  const max = Math.max(rim, mouth);
  const rimPct = Math.round((rim / max) * 100);
  const mouthPct = Math.round((mouth / max) * 100);

  return (
    <div
      className="mt-4 space-y-2 rounded-xl bg-primary-foreground/10 px-3 py-3"
      aria-label="口まわりの比較"
    >
      <p className="text-xs font-medium text-primary-foreground/80">
        口まわりの比較
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[0.7rem] text-primary-foreground/70">
            ゴミ箱
          </span>
          <div className="h-2 flex-1 rounded-full bg-primary-foreground/15">
            <div
              className="h-full rounded-full bg-primary-foreground/55"
              style={{ width: `${rimPct}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-[0.7rem] tabular-nums text-primary-foreground/80">
            {Math.round(rim)}cm
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[0.7rem] text-primary-foreground/70">
            袋の口
          </span>
          <div className="h-2 flex-1 rounded-full bg-primary-foreground/15">
            <div
              className="h-full rounded-full bg-primary-foreground"
              style={{ width: `${mouthPct}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-[0.7rem] tabular-nums text-primary-foreground/80">
            {Math.round(mouth)}cm
          </span>
        </div>
      </div>
    </div>
  );
}
