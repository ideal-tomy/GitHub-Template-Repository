export const ESTIMATE_QUESTION_LABELS = {
  industry: "業種",
  summary: "いまいちばんやりたいこと・課題",
  budgetBand: "ご予算のイメージ",
} as const;

export type EstimateQuestionId = keyof typeof ESTIMATE_QUESTION_LABELS;

export function shouldAskEstimateQuestion(args: {
  questionId: EstimateQuestionId;
  prefilledQuestionIds?: Iterable<EstimateQuestionId>;
  answeredQuestionIds?: Iterable<EstimateQuestionId>;
}): boolean {
  const { questionId, prefilledQuestionIds, answeredQuestionIds } = args;
  if (prefilledQuestionIds) {
    for (const id of prefilledQuestionIds) {
      if (id === questionId) return false;
    }
  }
  if (answeredQuestionIds) {
    for (const id of answeredQuestionIds) {
      if (id === questionId) return false;
    }
  }
  return true;
}
