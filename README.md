# Next.js Motion Template

ページ遷移クロスフェード、フェードイン、スタッガー、ポップアップ切替演出を最小構成で再利用するためのテンプレートです。

## 含まれるもの

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

よく使う例
Popupの中身をクロスフェード切替
<CrossfadeSwitch activeKey={step}>
  {step === "a" ? <StepA /> : <StepB />}
</CrossfadeSwitch>


CTAを700ms遅らせて表示
<DelayedReveal show={open} delayMs={700}>
  <button>次へ</button>
</DelayedReveal>


