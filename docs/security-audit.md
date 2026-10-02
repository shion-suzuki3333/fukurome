# フクロメ セキュリティ再点検（2026-10-01）

対象: クライアント完結の寸法判定ユーティリティ。攻撃面は意図的に狭い。

## 結論

**致命的な脆弱性は見当たらない。**  
サーバーにユーザー寸法を送らない設計が最大の防御。残るのは CSP の緩和余地と、XSS が万一入った場合の端末内データの扱い。

## 攻撃面マップ

| 面 | 状態 | 評価 |
|----|------|------|
| サーバー送信・認証 | なし | 強い |
| ファイルアップロード | なし | 強い |
| 入力 | 数字正規化 + 5–200cm クランプ | 強い |
| URL クエリ | shape/w/d/h のみ、桁制限 | 強い |
| sessionStorage | 長さ制限・digit sanitize 済み | 中〜強 |
| JSON-LD | `safeJsonLd` で `<>&` エスケープ | 強い |
| CSP | あり。`unsafe-inline` は Next 都合 | 中 |
| クリックジャッキング | `X-Frame-Options: DENY` + `frame-ancestors` | 強い |
| OG 画像生成 | 外部フォント fetch を廃止 | 改善済 |
| 依存 | 既知の謎依存 `cn` は除去済 | 良い |

## 残リスク（受容 or 将来）

1. **CSP `script-src 'unsafe-inline'`** — App Router / Next の一般的制約。nonce 化は将来課題。送信面が無いため影響は限定的。
2. **HSTS** — HTTPS 本番デプロイ後に CDN/ホスト側で付与。
3. **XSS が別経路で入った場合** — sessionStorage の寸法が読まれる可能性。機微情報ではないが、sanitize で被害を縮小済み。
4. **広告導入時** — CSP に Google ドメイン追加が必要。最小許可のみ（`docs/adsense.md`）。

## 実施した対策（本ラウンド）

- JSON-LD の script breakout 対策（`src/lib/safe-json-ld.ts`）
- sessionStorage のサイズ上限・型チェック・数字 sanitize
- OG の GitHub raw フォント取得を削除（サプライチェーン）
- `X-Permitted-Cross-Domain-Policies: none`
- Permissions-Policy に `interest-cohort=()` を追加

## 公開前チェック

- [ ] `NEXT_PUBLIC_SITE_URL` が本番オリジン
- [ ] HTTPS + HSTS（ホスト設定）
- [ ] 広告を入れるなら CSP を更新してから
- [ ] `npm audit` / `npm test` / `npm run build`
