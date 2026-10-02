"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ClipboardCopy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BinPreview } from "@/components/bin-preview";
import { ResultList } from "@/components/result-list";
import { InlineMeasureTips } from "@/components/inline-measure-tips";
import {
  type BinShape,
  formatResultSummary,
  inspectCmInput,
  parseBinQuery,
  parseCmInput,
  rankBags,
  serializeBinQuery,
} from "@/lib/bag-fit";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Step = 1 | 2 | 3;

const STORAGE_KEY = "fukurome.bin.v1";

const PRESETS: {
  id: string;
  label: string;
  hint: string;
  shape: BinShape;
  width: string;
  depth?: string;
  height: string;
}[] = [
  {
    id: "desk",
    label: "卓上",
    hint: "18×14×22",
    shape: "rect",
    width: "18",
    depth: "14",
    height: "22",
  },
  {
    id: "kitchen-s",
    label: "キッチン小",
    hint: "26×22×40",
    shape: "rect",
    width: "26",
    depth: "22",
    height: "40",
  },
  {
    id: "kitchen-m",
    label: "キッチン中",
    hint: "32×28×50",
    shape: "rect",
    width: "32",
    depth: "28",
    height: "50",
  },
  {
    id: "round-bath",
    label: "丸型洗面",
    hint: "直径22×30",
    shape: "round",
    width: "22",
    height: "30",
  },
];

function ShapeIcon({ shape }: { shape: BinShape }) {
  if (shape === "round") {
    return (
      <svg viewBox="0 0 48 48" className="size-10" aria-hidden>
        <ellipse
          cx="24"
          cy="14"
          rx="14"
          ry="5"
          fill="#d7ebe1"
          stroke="#1a3f32"
          strokeWidth="1.8"
        />
        <path
          d="M10 14v18c0 4 6.5 7 14 7s14-3 14-7V14"
          fill="#f4f8f5"
          stroke="#1a3f32"
          strokeWidth="1.8"
        />
        <ellipse cx="24" cy="14" rx="9" ry="3" fill="#3f7a62" opacity="0.3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="size-10" aria-hidden>
      <path
        d="M12 16h18v22H12z"
        fill="#f4f8f5"
        stroke="#1a3f32"
        strokeWidth="1.8"
      />
      <path
        d="M30 16l6-4v22l-6 4z"
        fill="#cfe0d6"
        stroke="#1a3f32"
        strokeWidth="1.8"
      />
      <path
        d="M12 16l6-4h18l-6 4z"
        fill="#e7efea"
        stroke="#1a3f32"
        strokeWidth="1.8"
      />
      <path d="M16 14h12l3-2H19z" fill="#3f7a62" opacity="0.28" />
    </svg>
  );
}

function StepDots({ step }: { step: Step }) {
  const items = [
    { n: 1 as Step, label: "形状" },
    { n: 2 as Step, label: "寸法" },
    { n: 3 as Step, label: "結果" },
  ];
  return (
    <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="進行状況">
      {items.map((item, i) => (
        <li key={item.n} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors",
              step === item.n
                ? "bg-primary text-primary-foreground"
                : step > item.n
                  ? "bg-leaf/20 text-leaf-deep"
                  : "bg-mist text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "inline-flex size-4 items-center justify-center rounded-sm text-[0.65rem]",
                step === item.n
                  ? "bg-primary-foreground/20"
                  : "bg-background/50",
              )}
              aria-hidden
            >
              {item.n}
            </span>
            {item.label}
          </span>
          {i < items.length - 1 && (
            <span
              className={cn(
                "h-px w-3 sm:w-5",
                step > item.n ? "bg-leaf" : "bg-border",
              )}
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function FieldHint({
  raw,
  label,
}: {
  raw: string;
  label: string;
}) {
  const inspected = inspectCmInput(raw);
  if (inspected.empty || !inspected.clamped || inspected.value === null) {
    return null;
  }
  return (
    <p className="text-xs text-warn" role="status">
      {label}は {inspected.value}cm で計算します（5〜200cm）
    </p>
  );
}

export function FitChecker() {
  const [shape, setShape] = useState<BinShape>("rect");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [height, setHeight] = useState("");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(false);
  const [, startTransition] = useTransition();
  const resultsRef = useRef<HTMLDivElement>(null);
  const didInitialScroll = useRef(false);

  const widthCm = parseCmInput(width);
  const depthCm = parseCmInput(depth);
  const heightCm = parseCmInput(height);

  const canJudge =
    widthCm !== null &&
    heightCm !== null &&
    (shape === "round" || depthCm !== null);

  const step: Step = canJudge ? 3 : width || depth || height ? 2 : 1;

  const results = useMemo(() => {
    if (!canJudge || widthCm === null || heightCm === null) return [];
    return rankBags({
      shape,
      widthCm,
      depthCm: shape === "rect" ? (depthCm ?? undefined) : undefined,
      heightCm,
    });
  }, [canJudge, shape, widthCm, depthCm, heightCm]);

  const missingHint = (() => {
    if (canJudge) return null;
    if (shape === "round") {
      if (widthCm === null && heightCm === null) {
        return "直径と高さを入れると、下に結果が出ます。";
      }
      if (widthCm === null) return "直径を入力してください。";
      return "高さを入力してください。";
    }
    const miss: string[] = [];
    if (widthCm === null) miss.push("長辺");
    if (depthCm === null) miss.push("短辺");
    if (heightCm === null) miss.push("高さ");
    if (miss.length === 3) {
      return "寸法を入れるか、上のプリセットを選ぶとすぐ試せます。";
    }
    return `${miss.join("・")}を入力してください。`;
  })();

  // Restore from URL then sessionStorage
  useEffect(() => {
    try {
      const fromUrl = parseBinQuery(window.location.search);
      if (fromUrl) {
        setShape(fromUrl.shape);
        setWidth(fromUrl.width);
        setDepth(fromUrl.shape === "round" ? "" : fromUrl.depth);
        setHeight(fromUrl.height);
        const ready =
          parseCmInput(fromUrl.width) !== null &&
          parseCmInput(fromUrl.height) !== null &&
          (fromUrl.shape === "round" || parseCmInput(fromUrl.depth) !== null);
        if (ready) setPendingScroll(true);
        setHydrated(true);
        return;
      }
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        // Reject oversized / non-object payloads (storage XSS blast radius)
        if (raw.length > 500) throw new Error("storage too large");
        const parsed = JSON.parse(raw) as unknown;
        if (!parsed || typeof parsed !== "object") {
          throw new Error("invalid storage");
        }
        const obj = parsed as Record<string, unknown>;
        const shape: BinShape =
          obj.shape === "round" ? "round" : "rect";
        const sanitize = (v: unknown) =>
          typeof v === "string" ? v.replace(/[^\d.]/g, "").slice(0, 6) : "";
        setShape(shape);
        setWidth(sanitize(obj.width));
        setHeight(sanitize(obj.height));
        setDepth(shape === "round" ? "" : sanitize(obj.depth));
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Hash links (#checker / #results) should scroll after navigation
  useEffect(() => {
    if (!hydrated) return;
    const hash = window.location.hash.replace("#", "");
    if (hash === "checker" || hash === "results") {
      const id = hash === "results" ? "results" : "checker";
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [hydrated]);

  // Persist + sync shareable query (keep hash)
  useEffect(() => {
    if (!hydrated) return;
    const depthToStore = shape === "round" ? "" : depth;
    const payload = { shape, width, depth: depthToStore, height };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // private mode etc.
    }
    const q = serializeBinQuery({
      shape,
      width,
      depth: depthToStore,
      height,
    });
    const hash = window.location.hash || "";
    const next = `${window.location.pathname}${q ? `?${q}` : ""}${hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) {
      window.history.replaceState(null, "", next);
    }
  }, [shape, width, depth, height, hydrated]);

  // Scroll only after results are actually ready (fixes preset race)
  useEffect(() => {
    if (!pendingScroll || !canJudge || !results.length) return;
    const timer = window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setPendingScroll(false);
      if (!didInitialScroll.current) {
        didInitialScroll.current = true;
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pendingScroll, canJudge, results.length]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!linkCopied) return;
    const t = window.setTimeout(() => setLinkCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [linkCopied]);

  // Clear preset highlight when user edits manually
  function markManualEdit() {
    setActivePreset(null);
    setError(null);
  }

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    startTransition(() => {
      setShape(p.shape);
      setWidth(p.width);
      setDepth(p.depth ?? "");
      setHeight(p.height);
      setActivePreset(p.id);
      setError(null);
    });
    setPendingScroll(true);
  }

  function goJudge() {
    if (!canJudge) {
      setError(
        missingHint ??
          (shape === "round"
            ? "直径と高さを入力してください（5〜200cm）。"
            : "口の縦・横と高さを入力してください（5〜200cm）。"),
      );
      document.getElementById("width")?.focus();
      return;
    }
    setError(null);
    setPendingScroll(true);
  }

  function resetAll() {
    setShape("rect");
    setWidth("");
    setDepth("");
    setHeight("");
    setActivePreset(null);
    setError(null);
    setPendingScroll(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    window.history.replaceState(null, "", window.location.pathname);
    document.getElementById("checker")?.scrollIntoView({ behavior: "smooth" });
  }

  async function copySummary() {
    if (!canJudge || widthCm === null || heightCm === null) return;
    const text = formatResultSummary(
      {
        shape,
        widthCm,
        depthCm: shape === "rect" ? (depthCm ?? undefined) : undefined,
        heightCm,
      },
      results,
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setError("コピーできませんでした。手動で選択してコピーしてください。");
    }
  }

  async function copyShareLink() {
    const q = serializeBinQuery({
      shape,
      width,
      depth: shape === "round" ? "" : depth,
      height,
    });
    const url = `${window.location.origin}${window.location.pathname}${q ? `?${q}` : ""}#results`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
    } catch {
      setError("リンクをコピーできませんでした。");
    }
  }

  return (
    <section
      id="checker"
      className={cn(
        "scroll-mt-20 border-y border-border/80 bg-card/55 py-8 backdrop-blur-sm sm:rounded-3xl sm:border sm:px-7 sm:py-8",
        canJudge && "pb-24 sm:pb-8",
      )}
      aria-labelledby="checker-title"
    >
      <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-0">
        <div>
          <h2
            id="checker-title"
            className="font-display text-2xl tracking-tight text-ink sm:text-3xl"
          >
            適合チェッカー
          </h2>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            プリセットを選ぶか、寸法を入れるだけ。結果はその場で出ます。
          </p>
        </div>
        <StepDots step={step} />
      </div>

      <div className="mt-6 grid gap-6 px-4 lg:grid-cols-[1fr_220px] sm:px-0">
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink">
              1. ゴミ箱の形状
            </legend>
            <div className="grid grid-cols-2 gap-2.5">
              {(
                [
                  {
                    value: "rect" as const,
                    title: "角型",
                    desc: "長方形・正方形の口",
                  },
                  {
                    value: "round" as const,
                    title: "丸型",
                    desc: "円形の口",
                  },
                ] as const
              ).map((opt) => (
                <motion.button
                  key={opt.value}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShape(opt.value);
                    if (opt.value === "round") setDepth("");
                    markManualEdit();
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-3.5 text-left transition-all sm:px-4",
                    shape === opt.value
                      ? "border-primary bg-primary/5 ring-2 ring-primary/25"
                      : "border-border bg-background/60 hover:bg-mist/80",
                  )}
                  aria-pressed={shape === opt.value}
                >
                  <ShapeIcon shape={opt.value} />
                  <span>
                    <span className="block font-medium text-ink">
                      {opt.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {opt.desc}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </fieldset>

          <div id="presets" className="scroll-mt-24">
            <p className="mb-2 text-sm font-medium text-ink">
              よくあるサイズから試す
              <span className="ml-2 font-normal text-muted-foreground">
                （選ぶとすぐ結果）
              </span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className={cn(
                    "min-h-12 rounded-xl border px-3 py-2.5 text-left transition-colors",
                    activePreset === p.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-background/70 hover:border-leaf hover:bg-mist/70",
                  )}
                  aria-pressed={activePreset === p.id}
                >
                  <span className="block text-sm font-medium text-ink">
                    {p.label}
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] text-muted-foreground">
                    {p.hint} cm
                  </span>
                </button>
              ))}
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-ink">
              2. 寸法を入力（cm）
            </legend>

            <InlineMeasureTips />

            <div
              className={cn(
                "grid gap-3",
                shape === "rect" ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              <div className="space-y-1.5">
                <Label htmlFor="width">
                  {shape === "round" ? "直径" : "口の長辺"}
                </Label>
                <Input
                  id="width"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="例: 30"
                  className="h-12 text-base"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    markManualEdit();
                  }}
                  aria-describedby="dim-help"
                />
                <FieldHint
                  raw={width}
                  label={shape === "round" ? "直径" : "長辺"}
                />
              </div>
              {shape === "rect" && (
                <div className="space-y-1.5">
                  <Label htmlFor="depth">口の短辺</Label>
                  <Input
                    id="depth"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="例: 25"
                    className="h-12 text-base"
                    value={depth}
                    onChange={(e) => {
                      setDepth(e.target.value);
                      markManualEdit();
                    }}
                  />
                  <FieldHint raw={depth} label="短辺" />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="height">高さ（内寸）</Label>
                <Input
                  id="height"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="例: 45"
                  className="h-12 text-base"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    markManualEdit();
                  }}
                />
                <FieldHint raw={height} label="高さ" />
              </div>
            </div>
            <p id="dim-help" className="text-xs text-muted-foreground">
              {missingHint ?? "寸法を入れると、すぐ下に結果が出ます。"}
            </p>
          </fieldset>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="lg"
              className="h-12 px-6 text-sm"
              onClick={goJudge}
            >
              {canJudge ? "結果を見る" : "合う袋を判定する"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 px-4 text-sm"
              onClick={copySummary}
              disabled={!results.length}
            >
              {copied ? (
                <>
                  <Check data-icon="inline-start" />
                  コピー済み
                </>
              ) : (
                <>
                  <ClipboardCopy data-icon="inline-start" />
                  結果をコピー
                </>
              )}
            </Button>
            {(width || depth || height) && (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="h-12 px-3 text-sm text-muted-foreground"
                onClick={resetAll}
              >
                <RotateCcw data-icon="inline-start" />
                クリア
              </Button>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-destructive"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <BinPreview
          shape={shape}
          widthCm={widthCm}
          depthCm={shape === "round" ? null : depthCm}
          heightCm={heightCm}
          className="min-h-[220px] lg:sticky lg:top-24"
        />
      </div>

      <div
        id="results"
        ref={resultsRef}
        className="mt-8 scroll-mt-24 px-4 sm:px-0"
      >
        <AnimatePresence mode="wait">
          {canJudge && results.length > 0 ? (
            <motion.div
              key="results-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ResultList results={results} />
              <div className="mt-5 flex flex-col gap-3 rounded-xl bg-mist/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink">
                  お店では、リットル表記と平置き寸法を確認してみてください。
                </p>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={copySummary}
                    className="text-sm font-medium text-leaf-deep underline-offset-2 hover:underline"
                  >
                    {copied ? "メモコピー済み" : "買い物メモをコピー"}
                  </button>
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="text-sm font-medium text-leaf-deep underline-offset-2 hover:underline"
                  >
                    {linkCopied ? "リンクコピー済み" : "結果リンクをコピー"}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                ※ 一般的な袋の目安です。自治体指定袋やメーカー表記を優先してください。詳しくは
                <Link
                  href="/disclaimer"
                  className="mx-1 text-leaf-deep underline-offset-2 hover:underline"
                >
                  免責事項
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-border bg-mist/40 px-4 py-8 text-center"
            >
              <p className="text-sm text-muted-foreground">
                {missingHint ?? "寸法を入れると、ここに第一候補が出ます。"}
              </p>
              <button
                type="button"
                onClick={() => applyPreset("kitchen-m")}
                className="mt-3 text-sm font-medium text-leaf-deep underline-offset-2 hover:underline"
              >
                とりあえずキッチン中で試す
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: sticky path to results when inputs are ready */}
      {canJudge && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-[#f2f8f4]/95 p-3 backdrop-blur-md sm:hidden">
          <button
            type="button"
            onClick={goJudge}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
          >
            結果を見る
            {results[0] ? `（第一候補 ${results[0].bag.label}）` : ""}
          </button>
        </div>
      )}
    </section>
  );
}
