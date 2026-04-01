import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="text-[2rem] font-bold text-black">About</h1>
      </FadeIn>

      <p className="mt-6 text-[1rem] text-black/80">
        ページ遷移アニメーション確認用の最小ページです。
      </p>

      <div className="mt-8">
        <Link href="/" className="text-[1rem] underline">
          Homeへ戻る
        </Link>
      </div>
    </main>
  );
}
