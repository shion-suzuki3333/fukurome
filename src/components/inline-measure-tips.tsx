"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function InlineMeasureTips() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/70 bg-mist/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <Ruler className="size-4 text-leaf-deep" aria-hidden />
          測り方のポイント
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-t border-border/60 px-3.5 py-3 text-sm leading-relaxed text-muted-foreground">
              <li>袋を掛ける口の内側を測る（外側ではない）</li>
              <li>角型は長辺・短辺、丸型は直径。高さは底から縁まで</li>
              <li>フタ付きは、フタではなく開口部の内側</li>
            </ul>
            <p className="border-t border-border/60 px-3.5 py-2.5 text-xs text-muted-foreground">
              詳しい図解は{" "}
              <Link
                href="/guide"
                className="text-leaf-deep underline-offset-2 hover:underline"
              >
                測り方ガイド
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
