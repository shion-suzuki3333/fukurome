# 運用メモ（低運用・四半期メンテ）

## 公開前チェック

1. `NEXT_PUBLIC_SITE_URL` を本番オリジンに設定（sitemap / canonical / JSON-LD）
2. `npm run build && npm test`
3. CSP に広告ドメインを足す場合は最小許可のみ（`docs/adsense.md`）

## 四半期レビュー（袋寸法表）

- 対象: `src/lib/bag-fit.ts` の `BAG_SPECS` / `SPECS_REVIEWED_AT`
- 手順:
  1. 主要メーカー（2〜3）の家庭用 10–90L 平置き寸法を公式 or 実測で確認
  2. 差分が口周り ±3cm 超なら表を更新し `SPECS_REVIEWED_AT` を当日に
  3. `npm test` の代表ケース（キッチン中→45L）が通ることを確認
- 自治体指定袋は個別対応しない（免責で一般目安と明示）

## セキュリティ方針の維持

- 寸法データのサーバー送信を追加しない
- ファイルアップロードを追加しない
- 判定ロジックはクライアント完結のまま

## 収益

- 広告は結果下・記事末尾のみ（`docs/adsense.md`）
- 結果をアフィリエイト商品に差し替えない
