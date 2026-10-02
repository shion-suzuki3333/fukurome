# フクロメ

ゴミ箱の内寸から、合うゴミ袋のサイズ目安を判定するウェブツールです。

本番: [https://fukurome.vercel.app](https://fukurome.vercel.app)  
ローカル: [http://127.0.0.1:43123](http://127.0.0.1:43123)

## 機能

- 角型 / 丸型のゴミ箱寸法入力（プリセット付き）
- 10L〜90L の適合ランキング（口まわり・高さ）
- 第一候補のスポットライト表示
- 測り方ガイド（インライン要点 + 図解ページ）
- 結果テキスト / 共有リンクのコピー（sessionStorage で往復保持）
- 免責・プライバシー・SEO 記事

## 開発

```bash
npm install
npm run dev      # http://127.0.0.1:43123
npm test
npm run build
```

本番では `.env` に公開オリジンを設定してください（未設定でも Vercel では自動フォールバック）。

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://fukurome.vercel.app
```

## セキュリティ方針

- 適合判定はクライアントサイドのみ（`src/lib/bag-fit.ts`）
- 入力は数値に正規化し 5〜200cm にクランプ
- CSP / `X-Frame-Options` / `nosniff` / COOP 等（`next.config.ts`）
- ファイルアップロードなし

## 本番公開

手順は [docs/deploy.md](./docs/deploy.md)（Vercel 推奨）。

## ドキュメント

- [運用メモ](./docs/ops.md)
- [本番公開](./docs/deploy.md)
- [マーケティング & 収益化](./docs/marketing-monetization.md)
- [プロモーション手順（投稿文つき）](./docs/promotion-playbook.md)
- [セキュリティ再点検](./docs/security-audit.md)
- [AdSense 配置方針](./docs/adsense.md)
- [批判的評価](./docs/critique-report.md)

## スタック

Next.js（App Router）· TypeScript · Tailwind CSS · shadcn/ui · Framer Motion
