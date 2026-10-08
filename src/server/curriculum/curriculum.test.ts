import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { estimateGrade } from "@/server/exams/scoring";
import { createCurriculumChain, createLessonForTopic, createStudent, ensureTestCountry, uniqueSlug, type CurriculumChain } from "../../../tests/factories/index";
import {
  countLessonsByTopic,
  getCountryByIsoCode,
  getExamSessions,
  getGradeScheme,
  getLessonBySlug,
  getSyllabusForEnrollment,
  getTopicBySlug,
  getTopicSubtreeIds,
  getTopicTree,
  listBoardsForCountry,
  listLessonsForTopic,
  listQualificationsByLevel,
  listSubjectsForQualification,
  listSyllabusVersions,
  listTopicsOfKind,
  resolveCurrentSyllabus,
  resolveCurriculumPath,
} from "./index";

/**
 * Integration tests for the curriculum read services (test database). Each test builds its own curriculum chain with
 * unique slugs and asserts only on rows it created.
 */

async function chain(options: Parameters<typeof createCurriculumChain>[0] = {}): Promise<CurriculumChain> {
  return createCurriculumChain({ topicCount: 2, subtopicsPerTopic: 2, lessonsPerTopic: 1, ...options });
}

/** Publishes a new version with its own topics: old CURRENT → SUPERSEDED, new → CURRENT (one transaction). */
async function publishNewVersion(c: CurriculumChain, topicNames: string[]): Promise<{ id: string; topicIds: string[] }> {
  const draft = await db.syllabus.create({
    data: {
      subjectId: c.subject.id,
      title: `${c.subject.name} v2`,
      versionLabel: "2028-2030",
      effectiveFrom: new Date("2028-01-01T00:00:00Z"),
      supersedesId: c.syllabus.id,
      sourceId: c.source.id,
      copyrightStatus: "OWNED",
    },
  });
  const topicIds: string[] = [];
  for (const [index, name] of topicNames.entries()) {
    const id = randomUUID();
    await db.topic.create({ data: { id, syllabusId: draft.id, kind: "TOPIC", depth: 0, path: id, sortOrder: index, name, slug: uniqueSlug(name) } });
    topicIds.push(id);
  }
  await db.$transaction([
    db.syllabus.update({ where: { id: c.syllabus.id }, data: { status: "SUPERSEDED", effectiveTo: new Date("2027-12-31T00:00:00Z") } }),
    db.syllabus.update({ where: { id: draft.id }, data: { status: "CURRENT", publishedAt: new Date() } }),
  ]);
  return { id: draft.id, topicIds };
}

describe("catalogue", () => {
  it("lists boards per country, qualifications grouped by level and subjects grouped by category", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    const country = await ensureTestCountry();

    const boards = await listBoardsForCountry(country.id);
    expect(boards.map((b) => b.id)).toContain(c.examBoard.id);
    expect(await getCountryByIsoCode("xt")).toMatchObject({ id: country.id, isoCode: "XT" });

    const groups = await listQualificationsByLevel({ countryId: country.id, examBoardIds: [c.examBoard.id] });
    expect(groups).toHaveLength(1);
    expect(groups[0]?.level.id).toBe(c.level.id);
    expect(groups[0]?.qualifications.map((q) => q.id)).toEqual([c.qualification.id]);
    expect(groups[0]?.qualifications[0]).toMatchObject({ isEnrollable: true, board: { id: c.examBoard.id } });

    const hidden = await db.subject.create({
      data: { qualificationId: c.qualification.id, categoryId: c.category.id, slug: uniqueSlug("hidden"), name: "Unverified subject", catalogueStatus: "HIDDEN" },
    });
    const soon = await db.subject.create({
      data: { qualificationId: c.qualification.id, categoryId: c.category.id, slug: uniqueSlug("soon"), name: "A coming subject", catalogueStatus: "COMING_SOON" },
    });
    const subjects = await listSubjectsForQualification(c.qualification.id);
    expect(subjects).toHaveLength(1);
    const listed = subjects[0]?.subjects ?? [];
    expect(listed.map((s) => s.id).sort()).toEqual([c.subject.id, soon.id].sort());
    expect(listed.find((s) => s.id === soon.id)?.isEnrollable).toBe(false);
    expect(listed.some((s) => s.id === hidden.id)).toBe(false);
  });

  it("hides boards that are not offered in a country", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    const other = await db.examBoard.create({ data: { slug: uniqueSlug("other"), code: uniqueSlug("O").slice(0, 30), name: "Other board", shortName: "OB", catalogueStatus: "AVAILABLE" } });
    const boards = await listBoardsForCountry(c.country.id);
    expect(boards.some((b) => b.id === other.id)).toBe(false);
  });
});

describe("syllabus versions and pinning (§26)", () => {
  it("keeps a student pinned to the older version, and resolves new enrolments to the right version", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    const { user } = await createStudent();
    await db.subjectEnrollment.create({ data: { userId: user.id, subjectId: c.subject.id, syllabusId: c.syllabus.id } });
    const v2 = await publishNewVersion(c, ["Reworked algebra", "New statistics"]);

    const pinned = await getSyllabusForEnrollment(user.id, c.subject.id);
    expect(pinned?.syllabus).toMatchObject({ id: c.syllabus.id, status: "SUPERSEDED", effectiveFrom: "2026-01-01", effectiveTo: "2027-12-31" });

    // The pinned student keeps seeing their version's topics, not the new version's.
    const tree = await getTopicTree(pinned?.syllabus.id ?? "");
    expect(tree?.map((t) => t.id)).toEqual(c.topics.map((t) => t.id));
    expect(tree?.[0]?.children.map((s) => s.id)).toEqual(c.subtopics.filter((s) => s.parentId === c.topics[0]?.id).map((s) => s.id));
    const v2Tree = await getTopicTree(v2.id);
    expect(v2Tree?.map((t) => t.name)).toEqual(["Reworked algebra", "New statistics"]);

    expect((await resolveCurrentSyllabus(c.subject.id))?.id).toBe(v2.id);
    expect((await resolveCurrentSyllabus(c.subject.id, "2027-06-01"))?.id).toBe(c.syllabus.id);
    expect((await resolveCurrentSyllabus(c.subject.id, new Date("2028-11-01T08:00:00Z")))?.id).toBe(v2.id);
    expect((await listSyllabusVersions(c.subject.id)).map((v) => v.id)).toEqual([v2.id, c.syllabus.id]);
    expect(await getSyllabusForEnrollment(user.id, randomUUID())).toBeNull();
  });

  it("never exposes DRAFT versions to student reads", async () => {
    const c = await chain({ lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
    expect(await getTopicTree(c.syllabus.id)).toBeNull();
    expect(await resolveCurrentSyllabus(c.subject.id)).toBeNull();
    expect(await getTopicBySlug(c.syllabus.id, c.topics[0]?.slug ?? "")).toBeNull();
    expect(await getTopicTree(c.syllabus.id, { includeDraft: true })).toHaveLength(2);
  });
});

describe("topics", () => {
  it("looks topics up by slug with breadcrumb, children and objectives", async () => {
    const c = await chain({ lessonsPerTopic: 0, objectivesPerSubtopic: 2 });
    const [topic] = c.topics;
    if (!topic) throw new Error("no topic");
    const detail = await getTopicBySlug(c.syllabus.id, topic.slug);
    expect(detail?.topic.id).toBe(topic.id);
    expect(detail?.ancestors).toEqual([]);
    expect(detail?.children.map((s) => s.id)).toEqual(c.subtopics.filter((s) => s.parentId === topic.id).map((s) => s.id));

    const sub = c.subtopics.find((s) => s.parentId === topic.id);
    if (!sub) throw new Error("no subtopic");
    const subDetail = await getTopicBySlug(c.syllabus.id, sub.slug);
    expect(subDetail?.ancestors.map((a) => a.id)).toEqual([topic.id]);
    expect(subDetail?.objectives).toHaveLength(2);

    expect(await getTopicSubtreeIds(topic.id)).toEqual([topic.id, ...c.subtopics.filter((s) => s.parentId === topic.id).map((s) => s.id)]);
    expect((await listTopicsOfKind(c.syllabus.id, "TOPIC"))?.map((t) => t.id)).toEqual(c.topics.map((t) => t.id));

    await db.topic.update({ where: { id: topic.id }, data: { isPublic: false } });
    expect(await getTopicBySlug(c.syllabus.id, sub.slug, { publicOnly: true })).toBeNull();
    expect((await getTopicTree(c.syllabus.id, { publicOnly: true }))?.map((t) => t.id)).toEqual([c.topics[1]?.id]);
  });
});

describe("lessons (published-only)", () => {
  it("lists only PUBLISHED lessons for a topic and filters by access tier", async () => {
    const c = await chain({ lessonsPerTopic: 2 });
    const [topic] = c.topics;
    if (!topic) throw new Error("no topic");
    const draft = await createLessonForTopic({ subjectId: c.subject.id, topicId: topic.id, title: "Unpublished lesson", status: "DRAFT", sortOrder: 5 });

    const lessons = await listLessonsForTopic(topic.id);
    const expected = c.lessons.filter((l) => c.lessonTopics.some((lt) => lt.lessonId === l.id && lt.topicId === topic.id));
    expect(lessons.map((l) => l.id)).toEqual(expected.map((l) => l.id));
    expect(lessons.every((l) => l.status === "PUBLISHED" && l.isPrimary)).toBe(true);
    expect(lessons[0]).not.toHaveProperty("body");

    expect((await listLessonsForTopic(topic.id, { publishedOnly: false })).map((l) => l.id)).toContain(draft.lesson.id);
    expect(await listLessonsForTopic(topic.id, { accessTiers: ["PUBLIC"] })).toEqual([]);
    expect((await countLessonsByTopic([topic.id])).get(topic.id)).toBe(2);
  });

  it("finds lessons by slug within their home subject, published only by default", async () => {
    const c = await chain({ lessonsPerTopic: 1 });
    const lesson = c.lessons[0];
    if (!lesson) throw new Error("no lesson");
    const page = await getLessonBySlug({ subjectId: c.subject.id, slug: lesson.slug });
    expect(page).toMatchObject({ id: lesson.id, body: lesson.body });
    expect(page?.topics.map((t) => t.topicId)).toContain(c.topics[0]?.id);
    expect(await getLessonBySlug({ subjectId: randomUUID(), slug: lesson.slug })).toBeNull();

    const draft = await createLessonForTopic({ subjectId: c.subject.id, topicId: c.topics[0]?.id ?? "", status: "DRAFT" });
    expect(await getLessonBySlug({ subjectId: c.subject.id, slug: draft.lesson.slug })).toBeNull();
    expect(await getLessonBySlug({ subjectId: c.subject.id, slug: draft.lesson.slug }, { publishedOnly: false })).toMatchObject({ id: draft.lesson.id });
  });
});

describe("public curriculum paths (§44)", () => {
  it("resolves /board/qualification/subject/topic to the CURRENT version and refuses hidden or non-public rows", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    const [topic] = c.topics;
    if (!topic) throw new Error("no topic");
    const path = await resolveCurriculumPath({ board: c.examBoard.slug, qualification: c.qualification.slug, subject: c.subject.slug, topic: topic.slug });
    expect(path).toMatchObject({
      board: { id: c.examBoard.id },
      qualification: { id: c.qualification.id, level: { id: c.level.id } },
      subject: { id: c.subject.id, isEnrollable: true },
      syllabus: { id: c.syllabus.id, status: "CURRENT" },
      topic: { topic: { id: topic.id } },
    });
    expect(await resolveCurriculumPath({ board: c.examBoard.slug })).toMatchObject({ qualification: null, subject: null });
    expect(await resolveCurriculumPath({ board: c.examBoard.slug, qualification: c.qualification.slug, subject: "no-such-subject" })).toBeNull();
    expect(await resolveCurriculumPath({ board: "admin" })).toBeNull();
    expect(await resolveCurriculumPath({ board: c.examBoard.slug, qualification: "Not A Slug" })).toBeNull();

    const hidden = await db.subject.create({
      data: { qualificationId: c.qualification.id, categoryId: c.category.id, slug: uniqueSlug("hidden"), name: "Hidden", catalogueStatus: "HIDDEN" },
    });
    expect(await resolveCurriculumPath({ board: c.examBoard.slug, qualification: c.qualification.slug, subject: hidden.slug })).toBeNull();
  });
});

describe("exam sessions and grade schemes", () => {
  it("returns published sessions that have not ended, in date order", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    const base = { qualificationId: c.qualification.id, isProvisional: true };
    await db.examSession.createMany({
      data: [
        { ...base, name: "Later", seriesCode: "2028-NOV", year: 2028, startsOn: new Date("2028-11-01T00:00:00Z"), endsOn: new Date("2028-11-30T00:00:00Z"), status: "PUBLISHED" },
        { ...base, name: "Sooner", seriesCode: "2027-JUN", year: 2027, startsOn: new Date("2027-06-01T00:00:00Z"), endsOn: new Date("2027-06-30T00:00:00Z"), status: "PUBLISHED" },
        { ...base, name: "Past", seriesCode: "2025-NOV", year: 2025, startsOn: new Date("2025-11-01T00:00:00Z"), endsOn: new Date("2025-11-30T00:00:00Z"), status: "PUBLISHED" },
        { ...base, name: "Draft", seriesCode: "2029-JUN", year: 2029, startsOn: new Date("2029-06-01T00:00:00Z"), endsOn: new Date("2029-06-30T00:00:00Z"), status: "DRAFT" },
      ],
    });
    const sessions = await getExamSessions(c.qualification.id, "2026-10-05");
    expect(sessions.map((s) => [s.name, s.startsOn, s.endsOn])).toEqual([
      ["Sooner", "2027-06-01", "2027-06-30"],
      ["Later", "2028-11-01", "2028-11-30"],
    ]);
    expect(sessions[0]).toMatchObject({ isProvisional: true, isDemo: false });
  });

  it("returns the default grade scheme with ordered numeric bands usable by estimateGrade", async () => {
    const c = await chain({ lessonsPerTopic: 0 });
    await db.gradeScheme.create({
      data: {
        qualificationId: c.qualification.id,
        name: "Test scheme (estimated)",
        isDefault: true,
        disclaimer: "Estimate only.",
        bands: {
          create: [
            { label: "U", minPercent: 0, sortOrder: 2, isPass: false },
            { label: "A", minPercent: 70, sortOrder: 0, isPass: true },
            { label: "C", minPercent: 50.5, sortOrder: 1, isPass: true },
          ],
        },
      },
    });
    const scheme = await getGradeScheme(c.qualification.id);
    expect(scheme).toMatchObject({ isEstimate: true, disclaimer: "Estimate only." });
    expect(scheme?.bands.map((b) => [b.grade, b.minPercent, b.isPass])).toEqual([
      ["A", 70, true],
      ["C", 50.5, true],
      ["U", 0, false],
    ]);
    expect(estimateGrade(55, scheme?.bands ?? [])).toBe("C");
  });
});
