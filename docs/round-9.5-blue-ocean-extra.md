# Round 9.5 — 追加海外調査メモ

調査日: 2026-10-01  
目的: 「他にも調べて」への回答。偽青空を切り、残ギャップだけ残す。

## 調べて埋まった案（採用しない）

| 海外パターン | JP競合例 | 理由 |
|---|---|---|
| Meeting cost timer (burnrate.live) | moldspoon / MeetingBurn / ToolkitsLab | 飽和 |
| Shareable URL countdown (timer.new系) | benriya-tools / ラッコ / tools-navi | 飽和 |
| llms.txt generator | yamada-tools / Auspia / Meev | 飽和 |
| Dimensional / chargeable weight | Niceggie / CargoPicks | 飽和 |
| Cron explainer | てもとツール / 手軽屋 | 飽和 |
| GraphQL schema diff | Encode64 日本語ページ | 埋まり |
| Token / LLM pricing calc | temoto / ZeroTool | 鮮度戦争＋飽和 |
| Semantic JSON/YAML diff | EasyTools / DiffSnap | 飽和 |
| robots/sitemap checker | Devryo / サイト採点くん | 飽和 |
| Invoice T-number check digit | accent-web / ToolkitsLab | 飽和 |
| UUID v7 | Devryo / Torinoa / tools-navi | 飽和 |
| Business day (JP holidays) | tools-navi / curythm | 飽和 |
| Docker Compose / GHA / Webhook HMAC | Toolsbase / IO Tools | 飽和 |
| Timezone meeting planner | WorldClock.jp | 飽和 |
| JWT / HAR / Cert / CSP | jwt.io JP + 多数ローカル | 飽和 |

## 残ったギャップ

### 1. B9-1 OpenAPI 破壊的変更 diff（推奨）
- 海外: [oasdiff.com/diff](https://www.oasdiff.com/diff)（EN）。`--lang` は en/ru/pt-BR のみ
- JP: OpenAPI「検証」はアサリツールズ等あり。破壊分類＋日本語説明の専用無料サイトは未確認
- 需要: Apidog/企業ブログで oasdiff CI 解説が継続
- 適合: クライアント完結・固定ルール・ガイドSEO

### 2. B9.5-1 Protobuf 破壊diff
- 海外: Buf CLI、tool.ren（EN inspector）
- JP: Encode64 が構文検証のみ。破壊比較のJP貼付UIなし
- 母数は OpenAPI より小さいがギャップは明確

### 3. B9.5-2 Terraform plan 可視化（ブラウザ貼付）
- 海外: Nife / Elysia / A2Z 等（EN）
- JP: tfviz 等のCLI/OSS紹介はあるが、plan.json 貼付のJP AdSense型が薄い
- 機微データ → 「送信ゼロ」訴求が強い。IaC層がターゲット

### 4. B9.5-3 AsyncAPI 破壊diff
- 海外: CodeRifts、@asyncapi/diff
- JP製品なしだが、検索母数がかなり小さい

## 結論
追加調査でも **B9-1 が最もバランスが良い**。次点は Protobuf 破壊diff と Terraform plan 可視化。AsyncAPI は青空だが母数不足で見送り推奨。
