import "server-only";
import { recommendationHref } from "@/components/dashboard/links";
import { masteryBandFromScore } from "@/lib/mastery-band";
import { getGradeSchemeById } from "@/server/curriculum/grades";
import type { DbClient } from "@/server/db";
import { readAttemptAnalysis, type AttemptAnalysisJson } from "./policy";
import type { AttemptResult, RecommendationView } from "./types";

/**
 * Results of a closed attempt (§12 "You scored 68%. Strong areas … Weak areas … Recommended study"; §52 performance
 * report) from the stored columns and `analysis` document, with topic names, lesson titles, links and the grade
 * ESTIMATE's scheme name and disclaimer resolved in two small queries.
 */

/** In-app link of a stored recommendation (adaptive practice for practice links: `recommendationHref`). */
function hrefFor(rec: AttemptAnalysisJson["recommendations"][number], subjectId: string): string {
  return recommendationHref({ kind: rec.kind, topicId: rec.topicId, lessonId: rec.lessonId ?? null, questionCount: rec.questionCount ?? null }, subjectId);
}

/** The results of an attempt, or null when it does not exist. Callers check ownership first. */
export async function loadAttemptResult(client: DbClient, attemptId: string): Promise<AttemptResult | null> {
  const row = await client.assessmentAttempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      subjectId: true,
      mode: true,
      status: true,
      submittedAt: true,
      submitReason: true,
      totalMarks: true,
      marksAwarded: true,
      percentage: true,
      pendingReviewCount: true,
      answeredCount: true,
      correctCount: true,
      questionCount: true,
      gradeEstimate: true,
      gradeIsPass: true,
      gradeSchemeId: true,
      analysis: true,
    },
  });
  if (!row) return null;
  const analysis = readAttemptAnalysis(row.analysis);
  const topicIds = [...new Set([...(analysis?.byTopic.map((t) => t.topicId) ?? []), ...(analysis?.recommendations.map((r) => r.topicId) ?? [])])];
  const lessonIds = [...new Set(analysis?.recommendations.flatMap((r) => (r.lessonId ? [r.lessonId] : [])) ?? [])];
  const [topics, lessons, scheme] = await Promise.all([
    topicIds.length ? client.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, name: true } }) : Promise.resolve([]),
    lessonIds.length ? client.lesson.findMany({ where: { id: { in: lessonIds } }, select: { id: true, title: true } }) : Promise.resolve([]),
    row.gradeEstimate && row.gradeSchemeId ? getGradeSchemeById(row.gradeSchemeId) : Promise.resolve(null),
  ]);
  const topicName = new Map(topics.map((t) => [t.id, t.name]));
  const lessonTitle = new Map(lessons.map((l) => [l.id, l.title]));

  const recommendations: RecommendationView[] = (analysis?.recommendations ?? []).map((rec) => ({
    kind: rec.kind,
    topicId: rec.topicId,
    topicName: topicName.get(rec.topicId) ?? null,
    lessonId: rec.lessonId ?? null,
    lessonTitle: rec.lessonId ? (lessonTitle.get(rec.lessonId) ?? null) : null,
    questionCount: rec.questionCount ?? null,
    reason: rec.reason,
    href: hrefFor(rec, row.subjectId),
  }));

  return {
    attemptId: row.id,
    mode: row.mode,
    status: row.status,
    submittedAt: row.submittedAt,
    submitReason: row.submitReason,
    score: {
      marksAwarded: row.marksAwarded ?? 0,
      totalMarks: row.totalMarks ?? 0,
      percentage: row.percentage,
      isProvisional: row.status === "AWAITING_MARKING" || row.pendingReviewCount > 0,
      pendingReviewCount: row.pendingReviewCount,
      answeredCount: row.answeredCount,
      correctCount: row.correctCount,
      questionCount: row.questionCount,
    },
    grade:
      row.gradeEstimate && row.gradeSchemeId && row.gradeIsPass !== null
        ? {
            grade: row.gradeEstimate,
            isPass: row.gradeIsPass,
            isEstimate: true,
            schemeId: row.gradeSchemeId,
            schemeName: scheme?.name ?? "",
            disclaimer: scheme?.disclaimer ?? null,
          }
        : null,
    topics: (analysis?.byTopic ?? []).map((t) => ({
      topicId: t.topicId,
      topicName: topicName.get(t.topicId) ?? null,
      marksAwarded: t.marksAwarded,
      marksAvailable: t.marksAvailable,
      percent: t.percent,
      band: masteryBandFromScore(t.percent),
    })),
    strongTopicIds: analysis?.strongTopicIds ?? [],
    weakTopicIds: analysis?.weakTopicIds ?? [],
    recommendations,
    analysis,
  };
}
