"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageContent, PageContentItem } from "@/components/motion/PageContent";
import { PopupShell } from "@/components/motion/PopupShell";
import { CrossfadeSwitch } from "@/components/motion/CrossfadeSwitch";
import { DelayedReveal } from "@/components/motion/DelayedReveal";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"a" | "b">("a");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="text-[2rem] font-bold text-black">Motion Template Demo</h1>
      </FadeIn>

      <PageContent className="mt-8 space-y-4">
        <PageContentItem className="rounded-lg border border-black/10 p-4">
          <p className="text-[1rem] text-black/80">
            このページは最小サンプルです。
          </p>
        </PageContentItem>
        <PageContentItem className="rounded-lg border border-black/10 p-4">
          <p className="text-[1rem] text-black/80">
            下のリンクで About へ遷移し、クロスフェードを確認できます。
          </p>
        </PageContentItem>
        <PageContentItem className="rounded-lg border border-black/10 p-4">
          <p className="text-[1rem] text-black/80">
            下のボタンで Popup の入れ替えクロスフェードと遅延CTA表示を確認できます。
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setStep("a");
                setOpen(true);
              }}
              className="rounded border border-black/15 px-3 py-2 text-[14px] text-black hover:bg-black/5"
            >
              Popupデモを開く
            </button>
          </div>
        </PageContentItem>
      </PageContent>

      <div className="mt-8">
        <div className="flex gap-4">
          <Link href="/about" className="text-[1rem] underline">
            Aboutへ
          </Link>
          <Link href="/estimate-detailed" className="text-[1rem] underline">
            見積デモへ
          </Link>
        </div>
      </div>

      <PopupShell open={open} onClose={() => setOpen(false)} title="Popup Motion Demo">
        <CrossfadeSwitch activeKey={step} className="min-h-20">
          {step === "a" ? (
            <div>
              <p className="text-[1rem] font-medium text-black">ステップ A</p>
              <p className="mt-1 text-[14px] text-black/75">
                まずは要点を確認し、次のアクションを提案します。
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[1rem] font-medium text-black">ステップ B</p>
              <p className="mt-1 text-[14px] text-black/75">
                条件に応じた補足情報を表示し、確定に進みます。
              </p>
            </div>
          )}
        </CrossfadeSwitch>

        <DelayedReveal show={open} delayMs={700} className="mt-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep((prev) => (prev === "a" ? "b" : "a"))}
              className="rounded border border-black/15 px-3 py-2 text-[14px] text-black hover:bg-black/5"
            >
              表示を切り替える
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded bg-black px-3 py-2 text-[14px] text-white hover:opacity-90"
            >
              完了
            </button>
          </div>
        </DelayedReveal>
      </PopupShell>
    </main>
  );
}
