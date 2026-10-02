# フクロメを本番公開する（Vercel）

いちばん簡単なのは **GitHub に置いて Vercel で公開**。無料枠で足りる。

## 本番 URL（確認済み）

| 項目 | 値 |
|------|-----|
| Production | `https://fukurome.vercel.app` |
| GitHub | https://github.com/shion-suzuki3333/fukurome |
| homepage | リポジトリに `https://fukurome.vercel.app` 設定済み |

---

## 手順

### 1. コードを GitHub に置く

まだ GitHub に無い場合:

- Cursor の **Create repo** から公開リポジトリを作る  
  または GitHub で `fukurome` など名前を付けて New repository → この `main` を push

### 2. Vercel で Import

1. [https://vercel.com/new](https://vercel.com/new) を開く
2. GitHub 連携 → リポジトリを選ぶ
3. Framework Preset は **Next.js** のまま
4. **Environment Variables** に追加:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://fukurome.vercel.app`（末尾スラッシュなし） |

未設定でも `VERCEL_PROJECT_PRODUCTION_URL` へフォールバックする実装あり。明示設定を推奨。

5. **Deploy**

### 3. URL が決まったら SITE_URL を入れる（または更新）

1. Vercel → Project → Settings → Environment Variables
2. `NEXT_PUBLIC_SITE_URL` = `https://fukurome.vercel.app`（末尾スラッシュなし）
3. Production / Preview / Development の必要な環境にチェック
4. **Redeploy**（Deployments → 最新の ⋯ → Redeploy。Cache はクリア推奨）

これで sitemap / canonical / OGP が正しいドメインになる。

確認コマンド:

```bash
curl -sS https://fukurome.vercel.app/sitemap.xml | head
# <loc>https://fukurome.vercel.app</loc> であること（localhost でない）
```

### 4. 動作確認

- [x] トップでプリセット「キッチン中」→ 45L が出る（本番で確認済み）
- [ ] `/guide` `/privacy` `/disclaimer` が開ける
- [ ] スマホ幅でも結果まで辿れる
- [ ] sitemap / canonical が `https://fukurome.vercel.app`（SITE_URL 設定後）

### 5. （任意）独自ドメイン

Vercel → Settings → Domains で自分のドメインを追加。  
追加したら `NEXT_PUBLIC_SITE_URL` もそのドメインに更新して Redeploy。

### 6. 公開後すぐやること

1. [Google Search Console](https://search.google.com/search-console) にプロパティ追加  
   - 方式: **URL プレフィックス** → `https://fukurome.vercel.app`
   - 所有権確認: HTML タグ / DNS / Google Analytics など任意
2. 左メニュー **Sitemaps** → `https://fukurome.vercel.app/sitemap.xml` を送信  
   ※ canonical が localhost のままなら送信しない（SITE_URL 設定→Redeploy 後に）
3. プロモは `docs/promotion-playbook.md` の文面で開始
4. AdSense は人が少し来てから申請（結果下1枠のみ。結果カードはアフィリエイト化しない）

---

## うまくいかないとき

| 症状 | 対処 |
|------|------|
| Build failed | ローカルで `npm run build` が通るか確認 |
| 日本語フォントが変 | 本番は Google Fonts 読み込み。CSP を変えていなければ通常OK |
| sitemap が localhost | `NEXT_PUBLIC_SITE_URL` 未設定 → 設定して Redeploy（または最新コードの Vercel フォールバック） |
| 広告を後で足す | `docs/adsense.md`。CSP に Google ドメイン追加が必要 |

---

## このリポジトリ側の前提

- `npm run build` が通ること（確認済み）
- 秘密情報なし（APIキー不要）
- ポート固定は本番では不要（Vercel が面倒を見る）
