import { describe, expect, it } from "vitest";
import type { CognitiveSkill } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { createAssessment, createCurriculumChain, createQuestion, createUser, type QuestionContext } from "../../../tests/factories/index";
import { planAssessment } from "./selection";

/**
 * planAssessment honours every blueprint rule filter the admin builder validates (src/server/cms/assessments/service.ts
 * `ruleCandidates`): learning objective, cognitive skill, marks per question and exam style, on top of topic,
 * difficulty and type. Each test builds its own subject, so the candidate pools contain only its fixtures.
 */

/**
 * A CURRENT syllabus version (a PUBLISHED assessment may not target a DRAFT one, and a current version's objectives are
 * fixed, so they are created with it): one root topic, one subtopic and two learning objectives.
 */
async function questionContext(): Promise<QuestionContext & { objectiveIds: string[] }> {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, objectivesPerSubtopic: 2, lessonsPerTopic: 0 });
  return { subjectId: chain.subject.id, syllabusId: chain.syllabus.id, topicIds: chain.topics.map((topic) => topic.id), objectiveIds: chain.objectiveIds };
}

async function question(
  context: QuestionContext,
  spec: { marks: number; skill: CognitiveSkill; examStyle?: boolean; objectiveId?: string },
): Promise<string> {
  const created = await createQuestion("NUMERICAL", { context, marks: spec.marks, isExamStyle: spec.examStyle ?? false });
  // Skill and objective tags are metadata (not revisioned content), so they can be set on the published question.
  await db.question.update({ where: { id: created.id }, data: { cognitiveSkill: spec.skill } });
  if (spec.objectiveId) await db.questionObjective.create({ data: { questionId: created.id, objectiveId: spec.objectiveId } });
  return created.id;
}

describe("planAssessment blueprint rules", () => {
  it("draws only questions matching the rule's objective, cognitive skill, marks per question and exam style", async () => {
    const context = await questionContext();
    const objective = { id: context.objectiveIds[0] as string };
    const recallOneMark = await question(context, { marks: 1, skill: "RECALL" });
    const applyExam = await question(context, { marks: 2, skill: "APPLICATION", examStyle: true });
    const applyExamObjective = await question(context, { marks: 2, skill: "APPLICATION", examStyle: true, objectiveId: objective.id });
    const recallObjective = await question(context, { marks: 2, skill: "RECALL", objectiveId: objective.id });
    const applyNotExam = await question(context, { marks: 2, skill: "APPLICATION" });

    const assessment = await createAssessment({
      subjectId: context.subjectId,
      syllabusId: context.syllabusId,
      kind: "MOCK_EXAM",
      assembly: "BLUEPRINT",
      sections: [
        { questionIds: [], rules: [{ questionCount: 1, objectiveId: objective.id, cognitiveSkill: "RECALL" }] },
        { questionIds: [], rules: [{ questionCount: 1, marksPerQuestion: 1 }] },
        { questionIds: [], rules: [{ questionCount: 3, marksPerQuestion: 2, cognitiveSkill: "APPLICATION", examStyleOnly: true }] },
      ],
    });

    const plan = await planAssessment(db, {
      assessmentId: assessment.id,
      subjectId: context.subjectId,
      fallbackSyllabusId: context.syllabusId,
      userId: (await createUser()).user.id,
      seed: "blueprint-filters",
      accessTier: null,
      tenancy: undefined,
    });

    const bySection = (n: number) => plan.slots.filter((slot) => slot.sectionNumber === n).map((slot) => slot.questionId);
    expect(bySection(1)).toEqual([recallObjective]);
    expect(bySection(2)).toEqual([recallOneMark]);
    expect(bySection(3).sort()).toEqual([applyExam, applyExamObjective].sort());
    expect(plan.slots.map((slot) => slot.questionId)).not.toContain(applyNotExam);
    // The third rule asked for 3 two-mark exam-style application questions; only 2 exist.
    expect(plan.shortfall).toBe(1);
    expect(plan.assembly).toBe("BLUEPRINT");
  });

  it("finds nothing for an objective no question is tagged with (no fallback to the wider pool)", async () => {
    const context = await questionContext();
    const [tagged, untagged] = context.objectiveIds as [string, string];
    await question(context, { marks: 1, skill: "RECALL", objectiveId: tagged });
    const objective = { id: untagged };
    const assessment = await createAssessment({
      subjectId: context.subjectId,
      syllabusId: context.syllabusId,
      kind: "TOPIC_TEST",
      assembly: "BLUEPRINT",
      sections: [{ questionIds: [], rules: [{ questionCount: 2, objectiveId: objective.id }] }],
    });
    const plan = await planAssessment(db, {
      assessmentId: assessment.id,
      subjectId: context.subjectId,
      fallbackSyllabusId: context.syllabusId,
      userId: (await createUser()).user.id,
      seed: "objective-empty",
      accessTier: null,
      tenancy: undefined,
    });
    expect(plan.slots).toEqual([]);
    expect(plan.shortfall).toBe(2);
  });
});
