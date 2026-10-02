"use client";

import type { BinShape } from "@/lib/bag-fit";
import { cn } from "@/lib/utils";

interface BinPreviewProps {
  shape: BinShape;
  widthCm: number | null;
  depthCm: number | null;
  heightCm: number | null;
  className?: string;
}

export function BinPreview({
  shape,
  widthCm,
  depthCm,
  heightCm,
  className,
}: BinPreviewProps) {
  const hasAny = widthCm !== null || depthCm !== null || heightCm !== null;
  const w = widthCm ?? 30;
  const d = depthCm ?? (shape === "round" ? widthCm ?? 30 : 25);
  const h = heightCm ?? 40;
  const maxDim = Math.max(w, d, h, 1);
  const scale = 120 / maxDim;
  const drawW = Math.max(36, w * scale);
  const drawD = Math.max(28, d * scale * 0.55);
  const drawH = Math.max(48, h * scale);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl bg-mist/60 px-4 py-6",
        !hasAny && "opacity-70",
        className,
      )}
      aria-hidden
    >
      <svg
        width={Math.max(160, drawW + 48)}
        height={drawH + drawD + 36}
        viewBox={`0 0 ${Math.max(160, drawW + 48)} ${drawH + drawD + 36}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="binFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f8f5" />
            <stop offset="100%" stopColor="#d5e4dc" />
          </linearGradient>
        </defs>
        {shape === "round" ? (
          <g transform={`translate(${(Math.max(160, drawW + 48) - drawW) / 2}, 12)`}>
            <ellipse
              cx={drawW / 2}
              cy={drawH + drawD * 0.35}
              rx={drawW / 2}
              ry={drawD * 0.45}
              fill="#1f4d3d"
              opacity="0.1"
            />
            <path
              d={`M0 ${drawD * 0.5} L0 ${drawH} Q${drawW / 2} ${drawH + drawD * 0.55} ${drawW} ${drawH} L${drawW} ${drawD * 0.5} Z`}
              fill="url(#binFace)"
              stroke="#1f4d3d"
              strokeWidth="2"
            />
            <ellipse
              cx={drawW / 2}
              cy={drawD * 0.5}
              rx={drawW / 2}
              ry={drawD * 0.45}
              fill="#e7efea"
              stroke="#1f4d3d"
              strokeWidth="2"
            />
            <ellipse
              cx={drawW / 2}
              cy={drawD * 0.5}
              rx={drawW * 0.38}
              ry={drawD * 0.28}
              fill="#3f7a62"
              opacity="0.25"
            />
          </g>
        ) : (
          <g
            transform={`translate(${(Math.max(160, drawW + 48) - drawW - drawD * 0.4) / 2}, 12)`}
          >
            <polygon
              points={`0,${drawD * 0.55} ${drawW},${drawD * 0.55} ${drawW},${drawH + drawD * 0.55} 0,${drawH + drawD * 0.55}`}
              fill="url(#binFace)"
              stroke="#1f4d3d"
              strokeWidth="2"
            />
            <polygon
              points={`${drawW},${drawD * 0.55} ${drawW + drawD * 0.45},${drawD * 0.15} ${drawW + drawD * 0.45},${drawH + drawD * 0.15} ${drawW},${drawH + drawD * 0.55}`}
              fill="#cfe0d6"
              stroke="#1f4d3d"
              strokeWidth="2"
            />
            <polygon
              points={`0,${drawD * 0.55} ${drawD * 0.45},${drawD * 0.15} ${drawW + drawD * 0.45},${drawD * 0.15} ${drawW},${drawD * 0.55}`}
              fill="#e7efea"
              stroke="#1f4d3d"
              strokeWidth="2"
            />
            <polygon
              points={`${drawD * 0.2},${drawD * 0.28} ${drawW - drawD * 0.05},${drawD * 0.28} ${drawW + drawD * 0.2},${drawD * 0.05} ${drawD * 0.45},${drawD * 0.05}`}
              fill="#3f7a62"
              opacity="0.22"
            />
          </g>
        )}
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {!hasAny
          ? "寸法を入れると形が変わります"
          : shape === "round"
            ? `直径 ${widthCm ?? "—"}cm · 高さ ${heightCm ?? "—"}cm`
            : `${widthCm ?? "—"} × ${depthCm ?? "—"} × ${heightCm ?? "—"} cm`}
      </p>
    </div>
  );
}
