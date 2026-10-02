/**
 * ゴミ箱×ゴミ袋の適合判定（端末内完結）。
 * 寸法は日本の家庭用ポリ袋の一般的な目安。メーカー・自治体指定で差が出るため判定は概算。
 */

export type BinShape = "rect" | "round";

export type FitStatus = "best" | "ok" | "tight" | "short" | "small" | "oversized";

export interface BagSpec {
  id: string;
  liters: number;
  /** 平置きの横幅 cm（マチなし想定の一般値） */
  flatWidthCm: number;
  /** 平置きの縦 cm */
  flatHeightCm: number;
  label: string;
  useHint: string;
}

export interface BinInput {
  shape: BinShape;
  /** 角型: 長辺 cm / 丸型: 直径 cm */
  widthCm: number;
  /** 角型のみ: 短辺 cm */
  depthCm?: number;
  /** 内寸の高さ cm */
  heightCm: number;
}

export interface FitResult {
  bag: BagSpec;
  status: FitStatus;
  rimDiffCm: number;
  heightDiffCm: number;
  bagMouthCm: number;
  binRimCm: number;
  reasons: string[];
  score: number;
}

/** 寸法表の最終レビュー日（四半期ごとの見直し対象） */
export const SPECS_REVIEWED_AT = "2026-10-01";

export const SPECS_SOURCE_NOTE =
  "マチなし平袋の一般的な寸法の目安です。特定メーカーの数値ではありません。";

/** 一般的な家庭用ゴミ袋の目安寸法（cm） */
export const BAG_SPECS: BagSpec[] = [
  {
    id: "10l",
    liters: 10,
    flatWidthCm: 40,
    flatHeightCm: 50,
    label: "10L",
    useHint: "卓上・サニタリー向け",
  },
  {
    id: "20l",
    liters: 20,
    flatWidthCm: 52,
    flatHeightCm: 60,
    label: "20L",
    useHint: "小型キッチン・洗面所",
  },
  {
    id: "30l",
    liters: 30,
    flatWidthCm: 50,
    flatHeightCm: 70,
    label: "30L",
    useHint: "一人暮らしの定番",
  },
  {
    id: "45l",
    liters: 45,
    flatWidthCm: 65,
    flatHeightCm: 80,
    label: "45L",
    useHint: "家庭用の標準サイズ",
  },
  {
    id: "70l",
    liters: 70,
    flatWidthCm: 80,
    flatHeightCm: 90,
    label: "70L",
    useHint: "大型・屋外向け",
  },
  {
    id: "90l",
    liters: 90,
    flatWidthCm: 90,
    flatHeightCm: 100,
    label: "90L",
    useHint: "業務寄り・大量廃棄",
  },
];

const MIN_CM = 5;
const MAX_CM = 200;

/** 口周り余裕の推奨帯（cm） */
const RIM_IDEAL_MIN = 5;
const RIM_IDEAL_MAX = 12;
const RIM_OK_MIN = 2;
const RIM_OK_MAX = 18;
const RIM_TIGHT_MIN = 0;

/** 高さ余裕の推奨帯（cm）— 縁への折り返し用 */
const HEIGHT_IDEAL_MIN = 10;
const HEIGHT_IDEAL_MAX = 20;
const HEIGHT_OK_MIN = 6;
const HEIGHT_TIGHT_MIN = 2;

export function clampCm(value: number): number {
  if (!Number.isFinite(value)) return MIN_CM;
  return Math.min(MAX_CM, Math.max(MIN_CM, value));
}

export function parseCmInput(raw: string): number | null {
  const inspected = inspectCmInput(raw);
  return inspected.value;
}

/** 入力欄のフィードバック用。表示値と計算値のズレを検出する */
export function inspectCmInput(raw: string): {
  value: number | null;
  clamped: boolean;
  empty: boolean;
} {
  const normalized = raw.replace(/[^\d.]/g, "");
  if (!normalized || normalized === ".") {
    return { value: null, clamped: false, empty: true };
  }
  const n = Number(normalized);
  if (!Number.isFinite(n)) {
    return { value: null, clamped: false, empty: false };
  }
  const clamped = clampCm(n);
  return {
    value: clamped,
    clamped: clamped !== n,
    empty: false,
  };
}

/** ゴミ箱の口周り（縁一周）cm */
export function binRimCm(bin: BinInput): number {
  if (bin.shape === "round") {
    return Math.PI * clampCm(bin.widthCm);
  }
  const w = clampCm(bin.widthCm);
  const d = clampCm(bin.depthCm ?? bin.widthCm);
  return 2 * (w + d);
}

/**
 * 平袋を開いたときの口周り概算。
 * マチなし平袋は口周り ≒ 横幅 × 2。
 */
export function bagMouthCm(bag: BagSpec): number {
  return bag.flatWidthCm * 2;
}

export function evaluateFit(bin: BinInput, bag: BagSpec): FitResult {
  const rim = binRimCm(bin);
  const mouth = bagMouthCm(bag);
  const height = clampCm(bin.heightCm);
  const rimDiff = mouth - rim;
  const heightDiff = bag.flatHeightCm - height;

  const reasons: string[] = [];
  let status: FitStatus = "ok";
  let score = 100;

  if (rimDiff < RIM_TIGHT_MIN) {
    status = "small";
    score -= 80 + Math.abs(rimDiff);
    reasons.push(
      `口まわりが約${Math.abs(Math.round(rimDiff))}cm足りません。縁に掛けにくく、すき間からゴミが落ちやすいです。`,
    );
  } else if (rimDiff < RIM_OK_MIN) {
    status = "tight";
    score -= 35;
    reasons.push(
      `口まわりの余裕は約${Math.round(rimDiff)}cm。少しきつめです。`,
    );
  } else if (rimDiff > RIM_OK_MAX) {
    status = "oversized";
    score -= 25 + (rimDiff - RIM_OK_MAX) * 0.5;
    reasons.push(
      `口まわりに約${Math.round(rimDiff)}cmの余裕。掛けられますがだぶつきやすいです。`,
    );
  } else if (rimDiff >= RIM_IDEAL_MIN && rimDiff <= RIM_IDEAL_MAX) {
    reasons.push(
      `口まわりの余裕は約${Math.round(rimDiff)}cm。縁に掛けやすい目安です。`,
    );
    score += 10;
  } else {
    reasons.push(`口まわりの余裕は約${Math.round(rimDiff)}cmです。`);
  }

  if (heightDiff < HEIGHT_TIGHT_MIN) {
    if (status !== "small") status = "short";
    score -= 50 + Math.abs(heightDiff);
    reasons.push(
      `高さが約${Math.abs(Math.round(heightDiff))}cm足りません。縁まで届きません。`,
    );
  } else if (heightDiff < HEIGHT_OK_MIN) {
    if (status === "ok") status = "tight";
    score -= 20;
    reasons.push(
      `高さの余裕は約${Math.round(heightDiff)}cm。折り返しが浅くなりがちです。`,
    );
  } else if (heightDiff > 35) {
    score -= 8;
    reasons.push(
      `高さに約${Math.round(heightDiff)}cmの余裕があります。余った分は折り返せます。`,
    );
  } else if (
    heightDiff >= HEIGHT_IDEAL_MIN &&
    heightDiff <= HEIGHT_IDEAL_MAX
  ) {
    reasons.push(
      `高さの余裕は約${Math.round(heightDiff)}cm。折り返しにちょうどよい目安です。`,
    );
    score += 8;
  } else {
    reasons.push(`高さの余裕は約${Math.round(heightDiff)}cmです。`);
  }

  if (
    status === "ok" &&
    rimDiff >= RIM_IDEAL_MIN &&
    rimDiff <= RIM_IDEAL_MAX &&
    heightDiff >= HEIGHT_IDEAL_MIN &&
    heightDiff <= HEIGHT_IDEAL_MAX
  ) {
    status = "best";
    score += 15;
  }

  return {
    bag,
    status,
    rimDiffCm: rimDiff,
    heightDiffCm: heightDiff,
    bagMouthCm: mouth,
    binRimCm: rim,
    reasons,
    score: Math.round(score),
  };
}

export function rankBags(bin: BinInput): FitResult[] {
  return BAG_SPECS.map((bag) => evaluateFit(bin, bag)).sort(
    (a, b) => b.score - a.score,
  );
}

export function statusLabel(status: FitStatus): string {
  switch (status) {
    case "best":
      return "ぴったり目安";
    case "ok":
      return "使える";
    case "tight":
      return "ギリギリ";
    case "short":
      return "高さ不足";
    case "small":
      return "口が小さい";
    case "oversized":
      return "だぶつき気味";
  }
}

export function formatResultSummary(
  bin: BinInput,
  results: FitResult[],
): string {
  const shape = bin.shape === "round" ? "丸型" : "角型";
  const rim = Math.round(binRimCm(bin));
  const best = results.filter(
    (r) => r.status === "best" || r.status === "ok",
  );
  const lines = [
    `【フクロメ】ゴミ箱×ゴミ袋の適合結果`,
    `形状: ${shape}`,
    bin.shape === "round"
      ? `直径 ${clampCm(bin.widthCm)}cm / 高さ ${clampCm(bin.heightCm)}cm`
      : `口 ${clampCm(bin.widthCm)}×${clampCm(bin.depthCm ?? 0)}cm / 高さ ${clampCm(bin.heightCm)}cm`,
    `口周り: 約${rim}cm`,
    "",
    best.length
      ? `おすすめ: ${best.map((r) => r.bag.label).join("、")}`
      : "おすすめサイズが見つかりませんでした。寸法を見直してください。",
    "",
    ...results.map(
      (r) =>
        `${r.bag.label}: ${statusLabel(r.status)}（口余裕${Math.round(r.rimDiffCm)}cm / 高さ余裕${Math.round(r.heightDiffCm)}cm）`,
    ),
    "",
    "※一般的な袋寸法の目安です。自治体指定袋やメーカー寸法を優先してください。",
    `寸法表レビュー: ${SPECS_REVIEWED_AT}`,
  ];
  return lines.join("\n");
}

/** URL / sessionStorage 用の安全なシリアライズ */
export function serializeBinQuery(bin: {
  shape: BinShape;
  width: string;
  depth: string;
  height: string;
}): string {
  const params = new URLSearchParams();
  params.set("shape", bin.shape === "round" ? "round" : "rect");
  if (bin.width) params.set("w", bin.width.replace(/[^\d.]/g, "").slice(0, 6));
  if (bin.shape === "rect" && bin.depth) {
    params.set("d", bin.depth.replace(/[^\d.]/g, "").slice(0, 6));
  }
  if (bin.height) params.set("h", bin.height.replace(/[^\d.]/g, "").slice(0, 6));
  return params.toString();
}

export function parseBinQuery(search: string): {
  shape: BinShape;
  width: string;
  depth: string;
  height: string;
} | null {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const shapeRaw = params.get("shape");
  const w = params.get("w");
  const h = params.get("h");
  if (!shapeRaw || !w || !h) return null;
  const shape: BinShape = shapeRaw === "round" ? "round" : "rect";
  return {
    shape,
    width: w.replace(/[^\d.]/g, "").slice(0, 6),
    depth: (params.get("d") ?? "").replace(/[^\d.]/g, "").slice(0, 6),
    height: h.replace(/[^\d.]/g, "").slice(0, 6),
  };
}
