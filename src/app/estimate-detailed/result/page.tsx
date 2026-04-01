"use client";

import Link from "next/link";
import { readEstimateTemplateFlow } from "@/lib/estimate-core/session";

export default function EstimateDetailedResultPage() {
  const flow = readEstimateTemplateFlow();
  const result = flow?.result;

  if (!flow?.answers || !result) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-14">
        <p className="text-black/70">結果がありません。フォームからやり直してください。</p>
        <Link href="/estimate-detailed" className="mt-3 inline-block underline">
          フォームへ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-2xl font-bold">自動見積結果（デモ）</h1>
      <p className="mt-4 text-lg">
        約 <span className="font-semibold">{result.estimateLoMan}</span> 万円 〜{" "}
        <span className="font-semibold">{result.estimateHiMan}</span> 万円
      </p>
      <p className="mt-4 text-black/75">{result.summary}</p>
      <Link href="/estimate-detailed" className="mt-6 inline-block underline">
        もう一度試す
      </Link>
    </main>
  );
}
