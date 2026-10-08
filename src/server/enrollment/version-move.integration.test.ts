import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import type { SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { refreshSubjectProgress } from "@/server/progress/service";
import { createCurriculumChain } from "../../../tests/factories/curriculum";
import { createExamSession, createLearner, learnerActor } from "../../../tests/factories/learning";
import { uniqueSlug } from "../../../tests/factories/util";
import { enrolInSubjects, unenrol, updateEnrollment } from "./service";
import { getSyllabusUpgradeOffer, moveEnrollmentToCurrentSyllabus } from "./version-move";

/**
 * §26 "move to the newer syllabus version" against Postgres (pin guard trigger, composite FKs, CHECKs):
 *
 *   v1 (2019)          v2 (2023, clone of v1)        v3 (2026, clone of v2, CURRENT)
 *   T1 ─ A, B          T1' ─ A', B'                  T1'' ─ A'' (from A'), C'' (new)      B dropped
 *   T2 ─ O*, P*        T2' ─ O'*, P'*                T2'' ─ O'' (compulsory now), P''*
 *                                                    T3'' (new leaf topic)
 *   (* optional)       routes CORE (default) / EXTENDED in every version
 */

interface TopicSpec {
  key: string;
  parent?: string;
  origin?: string;
  optional?: boolean;
}

interface Version {
  id: string;
  topics: Map<string, string>;
  routes: Map<string, string>;
}

let subjectId: string;
let qualificationId: string;
let sourceId: string;
let v1: Version;
let v2: Version;
let v3: Version;

async function createVersion(input: {
  label: string;
  effectiveFrom: string;
  supersedes?: Version;
  topics: TopicSpec[];
  originOf?: Map<string, string>;
}): Promise<Version> {
  const syllabus = await db.syllabus.create({
    data: {
      subjectId,
      title: `Test syllabus ${input.label}`,
      versionLabel: input.label,
      effectiveFrom: new Date(`${input.effectiveFrom}T00:00:00.000Z`),
      supersedesId: input.supersedes?.id ?? null,
      sourceId,
      copyrightStatus: "OWNED",
    },
    select: { id: true },
  });
  const ids = new Map<string, string>();
  for (const spec of input.topics) ids.set(spec.key, randomUUID());
  const roots = input.topics.filter((spec) => !spec.parent);
  const children = input.topics.filter((spec) => spec.parent);
  const row = (spec: TopicSpec, index: number) => {
    const id = ids.get(spec.key)!;
    const parentId = spec.parent ? ids.get(spec.parent)! : null;
    const kind: TopicKind = spec.parent ? "SUBTOPIC" : "TOPIC";
    return {
      id,
      syllabusId: syllabus.id,
      parentId,
      originTopicId: spec.origin && input.supersedes ? (input.supersedes.topics.get(spec.origin) ?? null) : null,
      kind,
      depth: spec.parent ? 1 : 0,
      path: parentId ? `${parentId}/${id}` : id,
      sortOrder: index,
      name: `Topic ${spec.key}`,
      slug: uniqueSlug(`t-${spec.key.toLowerCase().replace(/[^a-z0-9]/g, "")}`),
      isOptional: spec.optional ?? false,
      optionGroup: spec.optional ? "Options" : null,
    };
  };
  await db.topic.createMany({ data: roots.map(row) });
  await db.topic.createMany({ data: children.map(row) });
  const routes = new Map<string, string>();
  for (const [index, code] of ["CORE", "EXTENDED"].entries()) {
    const route = await db.syllabusRoute.create({
      data: { syllabusId: syllabus.id, code, name: code, isDefault: code === "CORE", sortOrder: index },
      select: { id: true },
    });
    routes.set(code, route.id);
  }
  return { id: syllabus.id, topics: ids, routes };
}

async function publish(version: Version, status: SyllabusStatus): Promise<void> {
  await db.syllabus.update({ where: { id: version.id }, data: { status, publishedAt: new Date() } });
}

async function makeCurrent(next: Version, previous: Version): Promise<void> {
  await db.syllabus.update({ where: { id: previous.id }, data: { status: "SUPERSEDED" } });
  await publish(next, "CURRENT");
}

async function addMastery(userId: string, version: Version, key: string, score: number, attempted: number): Promise<void> {
  const band = score >= 90 ? "MASTERED" : score >= 75 ? "STRONG" : score >= 60 ? "COMPETENT" : score >= 40 ? "DEVELOPING" : "WEAK";
  await db.topicMastery.create({
    data: {
      userId,
      subjectId,
      syllabusId: version.id,
      topicId: version.topics.get(key)!,
      topicKind: "SUBTOPIC",
      topicDepth: 1,
      isLeaf: true,
      score,
      band,
      questionsAttempted: attempted,
      questionsCorrect: Math.floor(attempted / 2),
      marksAwarded: attempted,
      marksAvailable: attempted * 2,
      recentAccuracy: 0.5,
      firstPracticedAt: new Date("2025-03-01T08:00:00Z"),
      lastPracticedAt: new Date("2025-09-01T08:00:00Z"),
    },
  });
}

beforeAll(async () => {
  // A subject whose factory version stays DRAFT (structure only, never enrollable); the versions under test are ours.
  const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
  subjectId = chain.subject.id;
  qualificationId = chain.qualification.id;
  sourceId = chain.source.id;

  v1 = await createVersion({
    label: "2019-2022",
    effectiveFrom: "2019-01-01",
    topics: [{ key: "T1" }, { key: "A", parent: "T1" }, { key: "B", parent: "T1" }, { key: "T2" }, { key: "O", parent: "T2", optional: true }, { key: "P", parent: "T2", optional: true }],
  });
  await publish(v1, "CURRENT");
});

describe("moving an enrolment to the current syllabus version (§26)", () => {
  it("offers nothing while the student is on the current version", async () => {
    const { actor } = await createLearner();
    await enrolInSubjects(actor, { subjectIds: [subjectId] });
    expect(await getSyllabusUpgradeOffer(actor, subjectId)).toBeNull();
  });

  it("moves the pin, carries mastery through two versions of lineage, re-maps route and choices, keeps history, audits", async () => {
    const { userId, actor } = await createLearner();
    const [view] = await enrolInSubjects(actor, { subjectIds: [subjectId] });
    expect(view?.syllabus.id).toBe(v1.id);
    await updateEnrollment(actor, subjectId, { routeId: v1.routes.get("EXTENDED")! });
    const enrollment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId } } });
    await db.enrollmentTopicChoice.create({ data: { enrollmentId: enrollment.id, topicId: v1.topics.get("O")!, syllabusId: v1.id } });
    await addMastery(userId, v1, "A", 80, 10);
    await addMastery(userId, v1, "B", 30, 5);
    await addMastery(userId, v1, "O", 50, 4);
    await refreshSubjectProgress(db, userId, subjectId);
    const v1RowsBefore = await db.topicMastery.findMany({ where: { userId, syllabusId: v1.id }, orderBy: { topicId: "asc" } });
    expect(v1RowsBefore.length).toBe(5); // 3 leaves + 2 ancestor rollups

    // Two newer versions appear; v3 becomes CURRENT.
    v2 = await createVersion({
      label: "2023-2025",
      effectiveFrom: "2023-01-01",
      supersedes: v1,
      topics: [
        { key: "T1", origin: "T1" }, { key: "A", parent: "T1", origin: "A" }, { key: "B", parent: "T1", origin: "B" },
        { key: "T2", origin: "T2" }, { key: "O", parent: "T2", origin: "O", optional: true }, { key: "P", parent: "T2", origin: "P", optional: true },
      ],
    });
    await makeCurrent(v2, v1);
    v3 = await createVersion({
      label: "2026-2029",
      effectiveFrom: "2026-01-01",
      supersedes: v2,
      topics: [
        { key: "T1", origin: "T1" }, { key: "A", parent: "T1", origin: "A" }, { key: "C", parent: "T1" },
        { key: "T2", origin: "T2" }, { key: "O", parent: "T2", origin: "O" }, { key: "P", parent: "T2", origin: "P", optional: true },
        { key: "T3" },
      ],
    });
    await makeCurrent(v3, v2);

    // A target exam examined before the new version applies is flagged.
    const session = await createExamSession(qualificationId, { startsOn: "2025-11-02", name: "November 2025" });
    await updateEnrollment(actor, subjectId, { targetExamSessionId: session.id });

    const offer = await getSyllabusUpgradeOffer(actor, subjectId);
    expect(offer).toMatchObject({
      pinned: { id: v1.id, versionLabel: "2019-2022", status: "SUPERSEDED" },
      current: { id: v3.id, versionLabel: "2026-2029", effectiveFrom: "2026-01-01" },
      practisedTopics: 3,
      carriedTopics: 2, // A → A'' and O → O''; B has no descendant
      droppedChoices: 1, // O'' is compulsory in v3
      examWarning: { sessionName: "November 2025", startsOn: "2025-11-02", coveredByPinned: true },
    });

    // A stale form (wrong "from") is refused.
    await expect(moveEnrollmentToCurrentSyllabus(actor, { subjectId, fromSyllabusId: v2.id, toSyllabusId: v3.id })).rejects.toMatchObject({ code: "CONFLICT" });

    const now = new Date();
    const result = await moveEnrollmentToCurrentSyllabus(actor, { subjectId, fromSyllabusId: v1.id, toSyllabusId: v3.id }, { now });
    expect(result).toMatchObject({
      enrollmentId: enrollment.id,
      from: { id: v1.id, versionLabel: "2019-2022" },
      to: { id: v3.id, versionLabel: "2026-2029" },
      carriedTopics: 2,
      carriedChoices: 0,
      droppedChoices: 1,
      routeId: v3.routes.get("EXTENDED"),
    });

    const moved = await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrollment.id }, include: { topicChoices: true } });
    expect(moved.syllabusId).toBe(v3.id);
    expect(moved.routeId).toBe(v3.routes.get("EXTENDED"));
    expect(moved.syllabusPinnedAt.getTime()).toBeGreaterThan(enrollment.syllabusPinnedAt.getTime());
    expect(moved.topicChoices).toEqual([]);

    // Carried evidence on the descendant leaves; ancestors rolled up; new topics start fresh.
    const v3Rows = new Map((await db.topicMastery.findMany({ where: { userId, syllabusId: v3.id } })).map((row) => [row.topicId, row]));
    expect(v3Rows.get(v3.topics.get("A")!)).toMatchObject({ score: 80, band: "STRONG", questionsAttempted: 10, isLeaf: true, topicKind: "SUBTOPIC" });
    expect(v3Rows.get(v3.topics.get("O")!)).toMatchObject({ score: 50, band: "DEVELOPING", questionsAttempted: 4, isLeaf: true });
    expect(v3Rows.has(v3.topics.get("C")!)).toBe(false);
    expect(v3Rows.has(v3.topics.get("T3")!)).toBe(false);
    expect(v3Rows.get(v3.topics.get("T1")!)).toMatchObject({ isLeaf: false, questionsAttempted: 10 });

    // History of v1 untouched.
    const v1RowsAfter = await db.topicMastery.findMany({ where: { userId, syllabusId: v1.id }, orderBy: { topicId: "asc" } });
    expect(v1RowsAfter.map((r) => [r.topicId, r.score, r.questionsAttempted])).toEqual(v1RowsBefore.map((r) => [r.topicId, r.score, r.questionsAttempted]));

    // Progress is computed over the new version: leaves A'', C'', O'', P''(optional, not chosen: out of scope), T3''.
    const progress = await db.subjectProgress.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId } } });
    expect(progress).toMatchObject({ topicsTotal: 4, topicsStarted: 2, questionsAttempted: 14 });

    const auditRows = await db.auditLog.findMany({ where: { action: "enrollment.syllabus_move", entityId: enrollment.id } });
    expect(auditRows).toHaveLength(1);
    expect(auditRows[0]).toMatchObject({ actorUserId: userId, targetUserId: userId, entityType: "SubjectEnrollment" });
    expect(auditRows[0]!.metadata).toMatchObject({ subjectId, carriedTopics: 2, droppedChoices: 1 });

    // Done: no offer, and a resubmitted form is refused without a second move.
    expect(await getSyllabusUpgradeOffer(actor, subjectId)).toBeNull();
    await expect(moveEnrollmentToCurrentSyllabus(actor, { subjectId, fromSyllabusId: v1.id, toSyllabusId: v3.id })).rejects.toMatchObject({
      code: "CONFLICT",
      message: "You are already on this syllabus version.",
    });
  });

  it("carries a re-mappable optional choice and refuses dropped subjects, wrong targets and non-students", async () => {
    // Pinned to v2 directly (now SUPERSEDED): P' is chosen and stays optional in v3.
    const { userId, actor } = await createLearner();
    const enrollment = await db.subjectEnrollment.create({
      data: { userId, subjectId, syllabusId: v2.id, routeId: v2.routes.get("CORE")!, syllabusPinnedAt: new Date(Date.now() - 60_000) },
    });
    await db.enrollmentTopicChoice.create({ data: { enrollmentId: enrollment.id, topicId: v2.topics.get("P")!, syllabusId: v2.id } });

    await expect(moveEnrollmentToCurrentSyllabus(actor, { subjectId, fromSyllabusId: v2.id, toSyllabusId: v2.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(
      moveEnrollmentToCurrentSyllabus(learnerActor(userId, { roles: ["TEACHER"] }), { subjectId, fromSyllabusId: v2.id, toSyllabusId: v3.id }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(moveEnrollmentToCurrentSyllabus(actor, { subjectId: "nope", fromSyllabusId: v2.id, toSyllabusId: v3.id })).rejects.toMatchObject({ code: "VALIDATION" });

    const result = await moveEnrollmentToCurrentSyllabus(actor, { subjectId, fromSyllabusId: v2.id, toSyllabusId: v3.id });
    expect(result).toMatchObject({ carriedChoices: 1, droppedChoices: 0, carriedTopics: 0, routeId: v3.routes.get("CORE") });
    const choices = await db.enrollmentTopicChoice.findMany({ where: { enrollmentId: enrollment.id } });
    expect(choices.map((c) => [c.topicId, c.syllabusId])).toEqual([[v3.topics.get("P"), v3.id]]);

    // A dropped subject must be added back first.
    const other = await createLearner();
    await db.subjectEnrollment.create({ data: { userId: other.userId, subjectId, syllabusId: v2.id } });
    await unenrol(other.actor, subjectId);
    expect(await getSyllabusUpgradeOffer(other.actor, subjectId)).toBeNull();
    await expect(moveEnrollmentToCurrentSyllabus(other.actor, { subjectId, fromSyllabusId: v2.id, toSyllabusId: v3.id })).rejects.toMatchObject({ code: "CONFLICT" });

    // Not enrolled at all.
    const stranger = await createLearner();
    await expect(moveEnrollmentToCurrentSyllabus(stranger.actor, { subjectId, fromSyllabusId: v2.id, toSyllabusId: v3.id })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
