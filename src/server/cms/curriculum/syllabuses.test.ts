import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { db } from "@/server/db";
import { createCurriculumChain, type CurriculumChain } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import {
  addComponent,
  addRoute,
  archiveSyllabusVersion,
  correctPublishedSyllabusVersion,
  createSyllabusVersion,
  deleteComponent,
  deleteDraftSyllabusVersion,
  deleteRoute,
  getNewVersionDefaults,
  getSyllabusVersion,
  listSyllabusVersions,
  makeSyllabusVersionCurrent,
  publishSyllabusVersion,
  updateComponent,
  updateDraftSyllabusVersion,
  updateRoute,
} from "./syllabuses";
import { auditOperations, auditRowsFor, staffActor, studentActor, withFourEyes } from "./testing";

let admin: CurriculumActor;
let otherAdmin: CurriculumActor;
let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [admin, otherAdmin, editor, student] = await Promise.all([staffActor("ADMIN"), staffActor("ADMIN"), staffActor("CONTENT_EDITOR"), studentActor()]);
});

/** Chain with a CURRENT version (2 topics × 2 subtopics, 1 objective each) plus a paper and a route on it. */
async function chainWithPapers(): Promise<CurriculumChain & { componentId: string; routeId: string }> {
  const chain = await createCurriculumChain({ objectivesPerSubtopic: 1, lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
  const componentId = randomUUID();
  const routeId = randomUUID();
  await db.syllabusComponent.create({ data: { id: componentId, syllabusId: chain.syllabus.id, code: "1", name: "Paper 1", durationMinutes: 90, weightingPercent: 50 } });
  await db.syllabusRoute.create({ data: { id: routeId, syllabusId: chain.syllabus.id, code: "CORE", name: "Core", isDefault: true } });
  await db.syllabusRouteComponent.create({ data: { routeId, componentId } });
  await db.topicComponent.create({ data: { topicId: chain.subtopics[0]!.id, componentId } });
  await db.syllabus.update({ where: { id: chain.syllabus.id }, data: { status: "CURRENT", publishedAt: new Date() } });
  return { ...chain, componentId, routeId };
}

function draftFields(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    versionLabel: `v-${randomUUID().slice(0, 8)}`,
    title: "Test syllabus",
    effectiveFrom: "2027-01-01",
    copyrightStatus: "OWNED",
    ...overrides,
  };
}

describe("creating versions", () => {
  it("forbids non-staff and validates input", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(createSyllabusVersion(student, { subjectId: chain.subject.id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listSyllabusVersions(student)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(
      createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "", title: "T", effectiveFrom: "2027-02-30", effectiveTo: "2026-01-01" }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { versionLabel: expect.any(Array), effectiveFrom: expect.any(Array) } });
    await expect(
      createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "2027", title: "T", effectiveFrom: "2027-01-01", effectiveTo: "2026-01-01" }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { effectiveTo: expect.any(Array) } });
  });

  it("lets an editor create an empty draft and refuses duplicate labels", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const input = { subjectId: chain.subject.id, versionLabel: "2028-2030", title: "New syllabus", effectiveFrom: "2028-01-01" };
    const { id, cloned } = await createSyllabusVersion(editor, input);
    expect(cloned).toBeNull();
    const version = await getSyllabusVersion(editor, id);
    expect(version).toMatchObject({ status: "DRAFT", copyrightStatus: "UNVERIFIED", effectiveFrom: "2028-01-01", supersedesId: null });
    expect(version.permissions).toMatchObject({ canEditStructure: true, canPublish: false, canDelete: true });
    expect(await auditOperations(id)).toEqual(["curriculum.syllabus.create"]);
    await expect(createSyllabusVersion(editor, input)).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { versionLabel: [expect.any(String)] } });
  });

  it("clones papers, routes, topics and objectives of the current version with lineage", async () => {
    const chain = await chainWithPapers();
    const defaults = await getNewVersionDefaults(editor, chain.subject.id);
    expect(defaults.defaultCloneFromId).toBe(chain.syllabus.id);
    const { id, cloned } = await createSyllabusVersion(editor, {
      subjectId: chain.subject.id,
      versionLabel: defaults.suggestedLabel,
      title: defaults.suggestedTitle,
      effectiveFrom: "2029-01-01",
      cloneFromId: defaults.defaultCloneFromId,
    });
    expect(cloned).toEqual({ topics: 6, objectives: 4, components: 1, routes: 1 });

    const draft = await db.syllabus.findUniqueOrThrow({ where: { id }, include: { components: true, routes: { include: { componentLinks: true } } } });
    expect(draft).toMatchObject({ status: "DRAFT", supersedesId: chain.syllabus.id, copyrightStatus: "UNVERIFIED", sourceId: chain.source.id, createdById: editor.userId });
    expect(draft.components).toMatchObject([{ code: "1", name: "Paper 1", durationMinutes: 90 }]);
    expect(draft.components[0]!.id).not.toBe(chain.componentId);
    expect(draft.routes).toMatchObject([{ code: "CORE", isDefault: true, componentLinks: [{ componentId: draft.components[0]!.id }] }]);

    const topics = await db.topic.findMany({ where: { syllabusId: id }, include: { componentLinks: true, objectives: true } });
    const originals = new Map([...chain.topics, ...chain.subtopics].map((topic) => [topic.id, topic]));
    for (const topic of topics) {
      const origin = originals.get(topic.originTopicId!);
      expect(origin).toBeDefined();
      expect(topic).toMatchObject({ slug: origin!.slug, name: origin!.name, kind: origin!.kind, depth: origin!.depth, sortOrder: origin!.sortOrder });
      expect(topic.path.endsWith(topic.id)).toBe(true);
      if (topic.parentId) expect(topic.path.startsWith(topics.find((t) => t.id === topic.parentId)!.path)).toBe(true);
    }
    const firstSub = topics.find((topic) => topic.originTopicId === chain.subtopics[0]!.id)!;
    expect(firstSub.componentLinks).toMatchObject([{ componentId: draft.components[0]!.id }]);
    expect(firstSub.objectives[0]?.originObjectiveId).toBe(chain.objectiveIds[0]);
    // The source version is untouched.
    expect(await db.topic.count({ where: { syllabusId: chain.syllabus.id } })).toBe(6);
    expect(await auditOperations(id)).toEqual(["curriculum.syllabus.clone"]);
  });

  it("refuses to clone another subject's version", async () => {
    const [a, b] = await Promise.all([createCurriculumChain({ lessonsPerTopic: 0 }), createCurriculumChain({ lessonsPerTopic: 0 })]);
    await expect(
      createSyllabusVersion(editor, { subjectId: a.subject.id, versionLabel: "x", title: "x", effectiveFrom: "2027-01-01", cloneFromId: b.syllabus.id }),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { cloneFromId: expect.any(Array) } });
  });
});

describe("editing", () => {
  it("edits drafts and only corrects wording of published versions", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const { id } = await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "draft", title: "Draft", effectiveFrom: "2027-01-01" });
    await updateDraftSyllabusVersion(editor, draftFields(id, { versionLabel: "renamed", sourceId: chain.source.id, sourceNotes: "Structure from the board's document" }));
    expect(await db.syllabus.findUniqueOrThrow({ where: { id } })).toMatchObject({ versionLabel: "renamed", copyrightStatus: "OWNED", sourceId: chain.source.id });

    await expect(updateDraftSyllabusVersion(editor, draftFields(chain.syllabus.id))).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(correctPublishedSyllabusVersion(editor, { id: chain.syllabus.id, title: "Typo fixed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await correctPublishedSyllabusVersion(admin, { id: chain.syllabus.id, title: "Typo fixed", overview: "An original overview." });
    expect(await db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } })).toMatchObject({ title: "Typo fixed", status: "CURRENT" });
    expect(await auditOperations(chain.syllabus.id)).toEqual(["curriculum.syllabus.correct"]);
  });

  it("rejects a grade scheme of another qualification", async () => {
    const [a, b] = await Promise.all([createCurriculumChain({ lessonsPerTopic: 0 }), createCurriculumChain({ lessonsPerTopic: 0 })]);
    const scheme = await db.gradeScheme.create({ data: { qualificationId: b.qualification.id, name: "Other", isActive: false } });
    const { id } = await createSyllabusVersion(editor, { subjectId: a.subject.id, versionLabel: "d", title: "D", effectiveFrom: "2027-01-01" });
    await expect(updateDraftSyllabusVersion(editor, draftFields(id, { gradeSchemeId: scheme.id }))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { gradeSchemeId: expect.any(Array) },
    });
  });
});

describe("publishing", () => {
  async function readyDraft(chain: CurriculumChain, actor: CurriculumActor): Promise<string> {
    const { id } = await createSyllabusVersion(actor, {
      subjectId: chain.subject.id,
      versionLabel: `next-${randomUUID().slice(0, 6)}`,
      title: "Next",
      effectiveFrom: "2027-01-01",
      cloneFromId: chain.syllabus.id,
    });
    return id;
  }

  it("needs an admin, cleared copyright and a source; the previous CURRENT becomes SUPERSEDED", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const id = await readyDraft(chain, editor);
    await expect(publishSyllabusVersion(editor, { id, mode: "CURRENT" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(publishSyllabusVersion(admin, { id, mode: "CURRENT" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { copyrightStatus: [expect.any(String)] },
    });
    expect((await getSyllabusVersion(admin, id)).publishProblems).toHaveProperty("copyrightStatus");
    await updateDraftSyllabusVersion(editor, draftFields(id, { sourceId: chain.source.id }));
    expect((await getSyllabusVersion(admin, id)).publishProblems).toEqual({});

    const result = await publishSyllabusVersion(admin, { id, mode: "CURRENT" });
    expect(result).toEqual({ id, status: "CURRENT", previous: { id: chain.syllabus.id, status: "SUPERSEDED" } });
    const [published, previous] = await Promise.all([
      db.syllabus.findUniqueOrThrow({ where: { id } }),
      db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } }),
    ]);
    expect(published).toMatchObject({ status: "CURRENT", publishedById: admin.userId });
    expect(published.publishedAt).toBeInstanceOf(Date);
    expect(previous.status).toBe("SUPERSEDED");
    const audit = await auditRowsFor(id);
    expect(audit.at(-1)).toMatchObject({ action: "syllabus.publish", actorUserId: admin.userId, entityType: "Syllabus" });
    await expect(publishSyllabusVersion(admin, { id, mode: "CURRENT" })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("enforces four-eyes: the creator cannot publish their own version when it is on", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const id = await readyDraft(chain, admin);
    await updateDraftSyllabusVersion(admin, draftFields(id, { sourceId: chain.source.id }));
    await expect(withFourEyes((context) => publishSyllabusVersion(admin, { id, mode: "CURRENT" }, context))).rejects.toMatchObject({
      code: "FORBIDDEN",
      message: expect.stringMatching(/four-eyes/),
    });
    expect((await db.syllabus.findUniqueOrThrow({ where: { id } })).status).toBe("DRAFT");
    await expect(withFourEyes((context) => publishSyllabusVersion(otherAdmin, { id, mode: "CURRENT" }, context))).resolves.toMatchObject({ status: "CURRENT" });
  });

  it("publishes UPCOMING versions only with a future start, then switches and archives", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const id = await readyDraft(chain, editor);
    await updateDraftSyllabusVersion(editor, draftFields(id, { sourceId: chain.source.id, effectiveFrom: "2020-01-01" }));
    await expect(publishSyllabusVersion(admin, { id, mode: "UPCOMING" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { mode: expect.any(Array) } });
    await updateDraftSyllabusVersion(editor, draftFields(id, { sourceId: chain.source.id, effectiveFrom: "2099-01-01" }));
    await expect(publishSyllabusVersion(admin, { id, mode: "UPCOMING" })).resolves.toMatchObject({ status: "UPCOMING", previous: null });
    expect((await db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } })).status).toBe("CURRENT");

    await expect(archiveSyllabusVersion(admin, { id: chain.syllabus.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(makeSyllabusVersionCurrent(editor, { id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(makeSyllabusVersionCurrent(admin, { id })).resolves.toMatchObject({ previous: { id: chain.syllabus.id, status: "SUPERSEDED" } });
    await expect(archiveSyllabusVersion(admin, { id: chain.syllabus.id })).resolves.toEqual({ id: chain.syllabus.id, pinnedEnrollments: 0 });
    const archived = await db.syllabus.findUniqueOrThrow({ where: { id: chain.syllabus.id } });
    expect(archived.status).toBe("ARCHIVED");
    expect(archived.archivedAt).toBeInstanceOf(Date);
    expect(await auditOperations(chain.syllabus.id)).toEqual(["curriculum.syllabus.archive"]);
    expect((await auditRowsFor(chain.syllabus.id))[0]?.action).toBe("syllabus.archive");
  });

  it("can archive the previous version straight away", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const id = await readyDraft(chain, editor);
    await updateDraftSyllabusVersion(editor, draftFields(id, { sourceId: chain.source.id }));
    await expect(publishSyllabusVersion(admin, { id, mode: "CURRENT", archivePrevious: "on" })).resolves.toMatchObject({
      previous: { id: chain.syllabus.id, status: "ARCHIVED" },
    });
  });

  it("refuses an empty tree", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const { id } = await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "empty", title: "E", effectiveFrom: "2027-01-01" });
    await updateDraftSyllabusVersion(editor, draftFields(id, { sourceId: chain.source.id }));
    await expect(publishSyllabusVersion(admin, { id, mode: "CURRENT" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { _form: [expect.stringMatching(/at least one topic/)] } });
  });
});

describe("deleting drafts", () => {
  it("deletes an untagged draft but never a published version", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const { id } = await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "throwaway", title: "T", effectiveFrom: "2027-01-01", cloneFromId: chain.syllabus.id });
    await expect(deleteDraftSyllabusVersion(student, { id })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(deleteDraftSyllabusVersion(editor, { id: chain.syllabus.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(deleteDraftSyllabusVersion(editor, { id })).resolves.toEqual({ subjectId: chain.subject.id });
    expect(await db.syllabus.findUnique({ where: { id } })).toBeNull();
    expect(await db.topic.count({ where: { syllabusId: id } })).toBe(0);
    expect((await auditRowsFor(id)).at(-1)).toMatchObject({ action: "syllabus.archive", metadata: { operation: "curriculum.syllabus.delete_draft" } });
  });

  it("refuses while content is tagged to the draft", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
    await db.lesson.create({
      data: { subjectId: chain.subject.id, kind: "LESSON", title: "Tagged", slug: `tagged-${randomUUID().slice(0, 8)}`, body: "x", topics: { create: { topicId: chain.topics[0]!.id, isPrimary: true } } },
    });
    await expect(deleteDraftSyllabusVersion(editor, { id: chain.syllabus.id })).rejects.toMatchObject({ code: "CONFLICT", message: expect.stringMatching(/tagged/) });
  });
});

describe("papers and routes", () => {
  it("edits papers and routes of drafts only", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    const { id } = await createSyllabusVersion(editor, { subjectId: chain.subject.id, versionLabel: "papers", title: "P", effectiveFrom: "2027-01-01" });
    const p1 = await addComponent(editor, { syllabusId: id, code: "1", name: "Paper 1", kind: "MULTIPLE_CHOICE", durationMinutes: "45", weightingPercent: "30", calculatorAllowed: "no" });
    const p2 = await addComponent(editor, { syllabusId: id, code: "2", name: "Paper 2", kind: "WRITTEN", calculatorAllowed: "unspecified" });
    await expect(addComponent(editor, { syllabusId: id, code: "1", name: "Dup", kind: "WRITTEN" })).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { code: [expect.any(String)] } });
    await expect(addComponent(editor, { syllabusId: id, code: "3", name: "Bad", kind: "WRITTEN", weightingPercent: "120" })).rejects.toMatchObject({ code: "VALIDATION" });
    await updateComponent(editor, { id: p2.id, code: "2", name: "Paper 2 (Extended)", kind: "WRITTEN", maxMarks: "130", calculatorAllowed: "yes" });
    expect(await db.syllabusComponent.findUniqueOrThrow({ where: { id: p2.id } })).toMatchObject({ name: "Paper 2 (Extended)", maxMarks: 130, calculatorAllowed: true });

    const core = await addRoute(editor, {
      syllabusId: id,
      code: "core",
      name: "Core",
      isDefault: "on",
      components: [{ componentId: p1.id, included: "on", isCompulsory: "on" }, { componentId: p2.id, included: "" }],
    });
    const extended = await addRoute(editor, { syllabusId: id, code: "EXTENDED", name: "Extended", isDefault: "on", components: [{ componentId: p2.id, included: "on", isCompulsory: "on" }] });
    const routes = await db.syllabusRoute.findMany({ where: { syllabusId: id }, include: { componentLinks: true }, orderBy: { code: "asc" } });
    expect(routes.map((route) => [route.code, route.isDefault, route.componentLinks.length])).toEqual([
      ["CORE", false, 1],
      ["EXTENDED", true, 1],
    ]);
    await updateRoute(editor, { id: core.id, code: "CORE", name: "Core", isDefault: "", components: [{ componentId: p1.id, included: "on", isCompulsory: "on" }, { componentId: p2.id, included: "on", isCompulsory: "", choiceGroup: "Either" }] });
    expect(await db.syllabusRouteComponent.count({ where: { routeId: core.id } })).toBe(2);
    await deleteRoute(editor, { id: extended.id });
    await deleteComponent(editor, { id: p2.id });
    expect(await db.syllabusRouteComponent.count({ where: { routeId: core.id } })).toBe(1);

    // Published versions are frozen.
    await expect(addComponent(editor, { syllabusId: chain.syllabus.id, code: "9", name: "Late", kind: "WRITTEN" })).rejects.toMatchObject({ code: "CONFLICT" });
    expect(await auditOperations(p1.id)).toEqual(["curriculum.component.create"]);
  });

  it("is backed by the database freeze on published versions", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    await expect(db.syllabusComponent.create({ data: { syllabusId: chain.syllabus.id, code: "X", name: "Sneaky" } })).rejects.toMatchObject({
      meta: { driverAdapterError: { cause: { originalMessage: expect.stringMatching(/immutable/) } } },
    });
  });
});
