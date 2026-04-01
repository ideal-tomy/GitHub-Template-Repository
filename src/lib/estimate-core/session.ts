import type { EstimateTemplateAnswers } from "@/lib/estimate-domain/default/estimate-pack";

const KEY = "next_motion_template_estimate_flow_v1";

export type EstimateTemplateFlowState = {
  answers: EstimateTemplateAnswers;
  result?: {
    estimateLoMan: number;
    estimateHiMan: number;
    summary: string;
  };
};

export function readEstimateTemplateFlow(): EstimateTemplateFlowState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EstimateTemplateFlowState;
  } catch {
    return null;
  }
}

export function writeEstimateTemplateFlow(state: EstimateTemplateFlowState): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
