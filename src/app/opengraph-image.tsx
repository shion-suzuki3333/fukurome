import { ImageResponse } from "next/og";

export const alt = "フクロメ — ゴミ箱に合うゴミ袋チェッカー";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * No external font fetch — avoids build-time supply-chain dependency
 * on third-party GitHub raw URLs. System sans is enough for OG crawl.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#e3efe8",
          color: "#0d1c16",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 520,
            height: 630,
            background: "#bfd9cc",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#1a3f32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#d7ebe1",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            袋
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2 }}>
            フクロメ
          </div>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            maxWidth: 720,
            lineHeight: 1.35,
            position: "relative",
          }}
        >
          ゴミ箱に合うゴミ袋、寸法でわかる
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 24,
            color: "#456356",
            maxWidth: 700,
            position: "relative",
          }}
        >
          口まわりと高さを入れて、10L〜90Lの目安を判定
        </div>
      </div>
    ),
    { ...size },
  );
}
