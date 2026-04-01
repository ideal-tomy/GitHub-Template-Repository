import { estimateRangeFromAnswers } from "@/lib/estimate-domain/default/estimate-pack";

export async function POST(req: Request) {
  let body: { answers?: Record<string, string> };
  try {
    body = (await req.json()) as { answers?: Record<string, string> };
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const answers = body.answers ?? {};
  const summary = String(answers.summary ?? "").trim();
  if (summary.length < 8) {
    return new Response(JSON.stringify({ error: "summary too short" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const range = estimateRangeFromAnswers(answers);
  return Response.json({
    estimateLoMan: range.estimateLoMan,
    estimateHiMan: range.estimateHiMan,
    summary:
      "この金額はデモ用の自動算出です。実案件では要件確定後に前提をすり合わせます。",
  });
}
