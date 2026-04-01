"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ESTIMATE_QUESTION_LABELS,
  shouldAskEstimateQuestion,
  type EstimateQuestionId,
} from "@/lib/estimate-core/question-model";
import {
  ESTIMATE_TEMPLATE_OPTIONS,
  type EstimateTemplateAnswers,
} from "@/lib/estimate-domain/default/estimate-pack";
import { writeEstimateTemplateFlow } from "@/lib/estimate-core/session";

const QUESTION_IDS: EstimateQuestionId[] = ["industry", "summary", "budgetBand"];

export default function EstimateDetailedTemplatePage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-6 py-14">Loading...</main>}>
      <EstimateDetailedTemplatePageInner />
    </Suspense>
  );
}

function EstimateDetailedTemplatePageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const prefillIndustry = params.get("prefillIndustry");
  const prefilledQuestionIds = useMemo(
    () => (prefillIndustry ? (["industry"] as const) : []),
    [prefillIndustry]
  );
  const [answers, setAnswers] = useState<EstimateTemplateAnswers>({
    industry: prefillIndustry ?? "other",
    summary: "",
    budgetBand: "unknown",
  });

  const visibleQuestions = QUESTION_IDS.filter((id) =>
    shouldAskEstimateQuestion({ questionId: id, prefilledQuestionIds })
  );

  const canSubmit = (answers.summary ?? "").trim().length >= 8;

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-[2rem] font-bold text-black">自動見積テンプレ（デモ）</h1>
      <p className="mt-2 text-[1rem] text-black/70">
        Core/Domain分離の最小サンプルです。回答を保存して processing に進みます。
      </p>

      {prefillIndustry ? (
        <div className="mt-5 rounded-lg border border-black/10 bg-black/[0.02] p-3 text-sm">
          handoff済みのため「業種」は再質問しません（prefillIndustry: {prefillIndustry}）。
        </div>
      ) : null}

      <section className="mt-8 space-y-5">
        {visibleQuestions.includes("industry") ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-black">
              {ESTIMATE_QUESTION_LABELS.industry}
            </span>
            <select
              className="min-h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-[16px]"
              value={answers.industry ?? "other"}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, industry: e.target.value }))
              }
            >
              {ESTIMATE_TEMPLATE_OPTIONS.industry.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {visibleQuestions.includes("summary") ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-black">
              {ESTIMATE_QUESTION_LABELS.summary}
            </span>
            <textarea
              className="min-h-28 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[16px]"
              placeholder="例: 問い合わせ返信や作業管理をまとめて効率化したい"
              value={answers.summary ?? ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, summary: e.target.value }))
              }
            />
          </label>
        ) : null}

        {visibleQuestions.includes("budgetBand") ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-black">
              {ESTIMATE_QUESTION_LABELS.budgetBand}
            </span>
            <select
              className="min-h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-[16px]"
              value={answers.budgetBand ?? "unknown"}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, budgetBand: e.target.value }))
              }
            >
              {ESTIMATE_TEMPLATE_OPTIONS.budgetBand.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </section>

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => {
            writeEstimateTemplateFlow({ answers });
            router.push("/estimate-detailed/processing");
          }}
          className="rounded bg-black px-4 py-2 text-[14px] text-white disabled:opacity-40"
        >
          見積を開始
        </button>
      </div>
    </main>
  );
}
