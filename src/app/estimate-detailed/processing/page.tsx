"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readEstimateTemplateFlow, writeEstimateTemplateFlow } from "@/lib/estimate-core/session";

export default function EstimateDetailedProcessingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const flow = readEstimateTemplateFlow();
    if (!flow?.answers) {
      router.replace("/estimate-detailed");
      return;
    }

    const run = async () => {
      try {
        const res = await fetch("/api/estimate-detailed-template", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: flow.answers }),
        });
        const json = (await res.json()) as {
          estimateLoMan?: number;
          estimateHiMan?: number;
          summary?: string;
          error?: string;
        };
        if (!res.ok || json.estimateLoMan == null || json.estimateHiMan == null) {
          throw new Error(json.error ?? "failed");
        }
        writeEstimateTemplateFlow({
          ...flow,
          result: {
            estimateLoMan: json.estimateLoMan,
            estimateHiMan: json.estimateHiMan,
            summary: json.summary ?? "",
          },
        });
        setTimeout(() => router.replace("/estimate-detailed/result"), 1200);
      } catch (e) {
        setError(e instanceof Error ? e.message : "failed");
      }
    };

    void run();
  }, [router]);

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-14">
        <p className="text-red-600">処理に失敗しました: {error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-2xl font-bold">内容を整理しています…</h1>
      <p className="mt-3 text-black/70">フォーム回答をもとに、見積レンジを計算中です。</p>
    </main>
  );
}
