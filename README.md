# Next.js Motion + Estimate Template

ページ遷移クロスフェードと、最小の自動見積フロー（form -> processing -> result）を含むテンプレートです。

## 含まれるもの

- Motion primitives
  - `PageTransition`, `FadeIn`, `PageContent`, `StaggerChildren`
  - `PopupShell`, `CrossfadeSwitch`, `DelayedReveal`
- Estimate template demo
  - `src/app/estimate-detailed/page.tsx`
  - `src/app/estimate-detailed/processing/page.tsx`
  - `src/app/estimate-detailed/result/page.tsx`
  - `src/app/api/estimate-detailed-template/route.ts`
- Core/Domainの最小分離例
  - `src/lib/estimate-core/*`
  - `src/lib/estimate-domain/default/*`

- Page Transition（クロスフェード）
- FadeIn
- Stagger 表示（`PageContent` / `StaggerChildren`）
- Popup Shell
- Popup 内コンテンツのクロスフェード切替（`CrossfadeSwitch`）
- 遅延CTA表示（`DelayedReveal`）
- デモページ（`/` と `/about`）

## 含まれないもの

- 業務ドメインロジック（見積・チャット・CMS 連携）
- APIキー依存の処理
- 本番データ

---

## 新案件での最初の5分手順

### 1. テンプレートから新規リポジトリを作る（GitHub）
1. `Use this template` をクリック
2. 新しいリポジトリ名を入力して作成

### 2. ローカルで起動
```bash
git clone <new-repo-url>
cd <new-repo-name>
npm install
npm run dev
npm run lint
npm run build
```

### 3. 動作確認（1分）
- `http://localhost:3000` を開く
- `/` で motion デモを確認
- `/estimate-detailed` で見積デモ（form -> processing -> result）を確認

### 4. 最初に編集する場所（2分）
- `src/app/layout.tsx`（metadata）
- `src/app/page.tsx`（トップ）
- `src/app/globals.css`（色・タイポ）
- `src/lib/estimate-domain/default/estimate-pack.ts`（見積ドメイン差し替え）

### 5. 不要デモを外す（1分）
- 不要なサンプル文言・画面を削除
- 案件固有コンポーネントへ置換

## Estimate導入の差し替えポイント

- 質問と選択肢: `src/lib/estimate-domain/default/estimate-pack.ts`
- 再質問判定（prefill/answered）: `src/lib/estimate-core/question-model.ts`
- APIロジック: `src/app/api/estimate-detailed-template/route.ts`
- セッション保持: `src/lib/estimate-core/session.ts`

## よく使う例

Popupの中身をクロスフェード切替:

```tsx
<CrossfadeSwitch activeKey={step}>
  {step === "a" ? <StepA /> : <StepB />}
</CrossfadeSwitch>
```

CTAを700ms遅らせて表示:

```tsx
<DelayedReveal show={open} delayMs={700}>
  <button>次へ</button>
</DelayedReveal>
```

## 開発コマンド

```bash
npm run dev
npm run lint
npm run build
```
