"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroIllustration } from "@/components/hero-illustration";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(88vh,720px)] overflow-hidden">
      <HeroIllustration />
      <div className="relative z-10 mx-auto flex min-h-[min(88vh,720px)] w-full max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
        <motion.p
          className="font-display text-[clamp(3rem,10vw,5.5rem)] leading-[0.95] tracking-tight text-ink"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          フクロメ
        </motion.p>
        <motion.h1
          className="mt-5 max-w-md text-balance text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          ゴミ箱に合うゴミ袋、
          <span className="text-leaf-deep">寸法でわかる</span>
        </motion.h1>
        <motion.p
          className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:max-w-md sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
        >
          口まわりと高さを入れるだけ。10L〜90Lの目安がすぐわかります。
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
        >
          <Link
            href="#checker"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:bg-primary/85 active:translate-y-px"
          >
            寸法を入れて判定する
          </Link>
          <Link
            href="#presets"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-transparent px-5 text-sm font-medium text-leaf-deep underline-offset-4 hover:underline sm:border-border sm:bg-card/70 sm:no-underline sm:hover:bg-mist sm:hover:no-underline"
          >
            まず試す（プリセットあり）
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
