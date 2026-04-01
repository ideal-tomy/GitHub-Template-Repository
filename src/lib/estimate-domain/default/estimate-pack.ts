import type { EstimateQuestionId } from "@/lib/estimate-core/question-model";

export type EstimateTemplateAnswers = Partial<Record<EstimateQuestionId, string>>;

export const ESTIMATE_TEMPLATE_OPTIONS = {
  industry: [
    { value: "manufacturing", label: "製造" },
    { value: "retail", label: "小売・サービス" },
    { value: "medical", label: "医療・福祉" },
    { value: "other", label: "その他" },
  ],
  budgetBand: [
    { value: "under100", label: "100万円未満" },
    { value: "100to300", label: "100〜300万円" },
    { value: "300to700", label: "300〜700万円" },
    { value: "700plus", label: "700万円以上" },
    { value: "unknown", label: "未定・相談したい" },
  ],
} as const;

export function estimateRangeFromAnswers(answers: EstimateTemplateAnswers): {
  estimateLoMan: number;
  estimateHiMan: number;
} {
  const summaryLen = (answers.summary ?? "").trim().length;
  const complexityBump = summaryLen >= 80 ? 80 : summaryLen >= 30 ? 40 : 20;

  const base = (() => {
    switch (answers.budgetBand) {
      case "under100":
        return { lo: 60, hi: 140 };
      case "100to300":
        return { lo: 120, hi: 320 };
      case "300to700":
        return { lo: 280, hi: 760 };
      case "700plus":
        return { lo: 680, hi: 1200 };
      default:
        return { lo: 120, hi: 420 };
    }
  })();

  return {
    estimateLoMan: Math.max(30, base.lo + Math.floor(complexityBump * 0.4)),
    estimateHiMan: Math.max(estimateRangeFloor(base.hi, base.lo), base.hi + complexityBump),
  };
}

function estimateRangeFloor(hi: number, lo: number): number {
  return Math.max(hi, lo + 60);
}
