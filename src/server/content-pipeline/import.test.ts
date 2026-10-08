import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createCurriculumChain, createUser, uniqueSuffix, type CurriculumChain } from "../../../tests/factories";
import { importContent, type ImportReport } from "./import";
import { itemExternalRef } from "./keys";
import { publishContentFromPipeline } from "./publisher";
import { ORIGINAL_SOURCE_SLUG } from "./sources";
import { editJson, fixtureFiles, removeTree, tempRoot, writeTree, type FileMap } from "./testing";

/**
 * Integration tests (test database, app role) of `content:import`: syllabus versions and topic trees from files,
 * items created as AI-generated drafts in review, tagging of one item across two boards' syllabi through concept keys,
 * idempotent re-imports, in-place updates of drafts and the published-content conflict path (draft copies).
 */

type Json = Record<string, unknown>;

let chainA: CurriculumChain;
let chainB: CurriculumChain;
let family: string;
let root: string;
let files: FileMap;
let authorId: string;
let authorEmail: string;
let approverEmail: string;

const refOf = (key: string) => itemExternalRef(family, key);
const questionFile = () => `content/subjects/${family}/questions/algebra/equations.json`;
const subjectRef = (chain: CurriculumChain) => ({ board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug });

async function runImport(): Promise<ImportReport> {
  writeTree(root, files);
  return importContent({ repoRoot: root, families: [family], authorEmail, cacheDir: null, today: "2026-10-07" });
}

function outcome(report: ImportReport, key: string): string | undefined {
  return report.items.find((item) => item.key === key)?.outcome;
}

beforeAll(async () => {
  chainA = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  chainB = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  family = `t${uniqueSuffix()}-o`;
  root = tempRoot("import");
  files = fixtureFiles({ family, prefix: "tm", subjects: [subjectRef(chainA), subjectRef(chainB)] });
  const author = await createUser({ roles: ["CONTENT_EDITOR"] });
  const approver = await createUser({ roles: ["ADMIN"] });
  authorId = author.user.id;
  authorEmail = author.user.emailNormalized as string;
  approverEmail = approver.user.emailNormalized as string;
});

afterAll(() => removeTree(root));

describe("content:import", () => {
  it("creates DRAFT syllabus versions and in-review, AI-generated items tagged across both syllabi", async () => {
    const report = await runImport();
    expect(report.aborted).toBe(false);
    expect(report.items.filter((i) => i.outcome === "error")).toEqual([]);
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["created", "created"]);
    expect(report.counts.QUESTION.created).toBe(4);
    expect(report.counts.LESSON.created).toBe(1);
    expect(report.counts.FLASHCARD.created).toBe(2);
    expect(report.counts.ASSESSMENT.created).toBe(2);

    const versions = await db.syllabus.findMany({ where: { subjectId: { in: [chainA.subject.id, chainB.subject.id] }, versionLabel: "2030-2032" }, select: { id: true, subjectId: true, status: true, copyrightStatus: true, source: { select: { type: true } } } });
    expect(versions).toHaveLength(2);
    expect(versions.every((v) => v.status === "DRAFT" && v.copyrightStatus === "OWNED" && v.source?.type === "OFFICIAL_SYLLABUS")).toBe(true);
    const versionA = versions.find((v) => v.subjectId === chainA.subject.id)?.id as string;
    const versionB = versions.find((v) => v.subjectId === chainB.subject.id)?.id as string;
    const keyed = await db.topic.findMany({ where: { syllabusId: versionA }, select: { contentKey: true, kind: true } });
    expect(keyed.map((t) => t.contentKey).sort()).toEqual(["algebra", "algebra.linear", "algebra.quadratic", "geometry"]);

    const source = await db.contentSource.findUniqueOrThrow({ where: { slug: ORIGINAL_SOURCE_SLUG }, select: { id: true } });
    const q1 = await db.question.findUniqueOrThrow({
      where: { externalRef: refOf("linear.q01") },
      select: { id: true, status: true, aiGenerated: true, createdById: true, copyrightStatus: true, sourceId: true, author: true, isDailyEligible: true, accessTier: true, subjectId: true, topics: { select: { syllabusId: true, isPrimary: true, topic: { select: { contentKey: true } } } } },
    });
    expect(q1).toMatchObject({ status: "IN_REVIEW", aiGenerated: true, createdById: authorId, copyrightStatus: "OWNED", sourceId: source.id, author: "Content team", isDailyEligible: true, accessTier: "FREE", subjectId: chainA.subject.id });
    // One question, tagged to the matching topic of BOTH boards' syllabi through its concept key.
    expect(q1.topics.map((t) => [t.syllabusId, t.topic.contentKey, t.isPrimary]).sort()).toEqual(
      [
        [versionA, "algebra.linear", true],
        [versionB, "algebra.linear", true],
      ].sort(),
    );

    const structured = await db.question.findUniqueOrThrow({ where: { externalRef: refOf("quadratic.q01") }, select: { parts: { select: { aiGenerated: true, partLabel: true, status: true } } } });
    expect(structured.parts.map((p) => [p.partLabel, p.aiGenerated, p.status]).sort()).toEqual([
      ["(a)", true, "IN_REVIEW"],
      ["(b)", true, "IN_REVIEW"],
    ]);

    const lesson = await db.lesson.findUniqueOrThrow({
      where: { externalRef: refOf("linear.solving") },
      select: { status: true, accessTier: true, bodyHtml: true, licenceCode: true, topics: { select: { isPrimary: true, topic: { select: { syllabusId: true } } } }, objectives: { select: { objective: { select: { code: true, topic: { select: { syllabusId: true } } } } } } },
    });
    expect(lesson.status).toBe("IN_REVIEW");
    expect(lesson.accessTier).toBe("FREE");
    expect(lesson.licenceCode).toBe("PROPRIETARY");
    expect(lesson.bodyHtml).toContain("cx-");
    expect(lesson.topics.filter((t) => t.isPrimary).map((t) => t.topic.syllabusId)).toEqual([versionA]);
    expect(lesson.topics).toHaveLength(2);
    expect(lesson.objectives.map((o) => [o.objective.code, o.objective.topic.syllabusId])).toEqual([["1.1.1", versionA]]);

    const tests = await db.assessment.findMany({
      where: { externalRef: { startsWith: `content:${family}:` } },
      select: { syllabusId: true, status: true, assembly: true, sections: { select: { rules: { select: { topic: { select: { syllabusId: true, contentKey: true } } } } } } },
    });
    expect(tests.map((t) => t.syllabusId).sort()).toEqual([versionA, versionB].sort());
    for (const test of tests) {
      expect(test).toMatchObject({ status: "IN_REVIEW", assembly: "BLUEPRINT" });
      expect(test.sections[0]?.rules[0]?.topic).toEqual({ syllabusId: test.syllabusId, contentKey: "algebra.linear" });
    }
  }, 180_000);

  it("changes nothing when the files are imported again", async () => {
    const report = await runImport();
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["unchanged", "unchanged"]);
    const changed = report.items.filter((i) => i.outcome !== "unchanged");
    expect(changed).toEqual([]);
  }, 180_000);

  it("updates drafts in place and resubmits them", async () => {
    editJson<Json[]>(files, questionFile(), (list) => {
      const q = list.find((item) => item.key === "linear.q02") as Json;
      q.stem = "Solve $5x - 7 = 18$ for $x$.";
    });
    const report = await runImport();
    expect(outcome(report, "linear.q02")).toBe("updated");
    expect(report.items.filter((i) => i.outcome !== "unchanged").map((i) => i.key)).toEqual(["linear.q02"]);
    const q2 = await db.question.findUniqueOrThrow({ where: { externalRef: refOf("linear.q02") }, select: { stem: true, status: true, revision: true } });
    expect(q2).toEqual({ stem: "Solve $5x - 7 = 18$ for $x$.", status: "IN_REVIEW", revision: 1 });
  }, 180_000);

  it("never changes published content in place: a changed file becomes a draft copy for review", async () => {
    const published = await publishContentFromPipeline({ repoRoot: root, approverEmail, families: [family], authorEmail, catalogue: false });
    expect(published.items.filter((i) => i.outcome === "error")).toEqual([]);
    expect(published.syllabi.map((s) => s.outcome)).toEqual(["published", "published"]);

    editJson<Json[]>(files, questionFile(), (list) => {
      const q = list.find((item) => item.key === "linear.q01") as Json;
      q.explanation = "Subtract 3 from both sides, then divide both sides by 2: $x = 4$.";
    });
    const conflict = await runImport();
    expect(outcome(conflict, "linear.q01")).toBe("conflict");
    expect(conflict.counts.QUESTION.conflict).toBe(1);

    const live = await db.question.findUniqueOrThrow({
      where: { externalRef: refOf("linear.q01") },
      select: { id: true, status: true, revision: true, explanation: true, pendingDraft: { select: { status: true, explanation: true, revision: true, createdById: true, aiGenerated: true, externalRef: true } } },
    });
    expect(live).toMatchObject({ status: "PUBLISHED", revision: 1, explanation: "Subtract 3, then divide by 2: $x = 4$." });
    expect(live.pendingDraft).toEqual({
      status: "IN_REVIEW",
      explanation: "Subtract 3 from both sides, then divide both sides by 2: $x = 4$.",
      revision: 2,
      createdById: authorId,
      aiGenerated: true,
      externalRef: null,
    });

    // Importing again: the pending draft copy already matches the file.
    const again = await runImport();
    expect(outcome(again, "linear.q01")).toBe("unchanged");
    expect(again.items.filter((i) => i.outcome !== "unchanged")).toEqual([]);
  }, 300_000);

  it("re-tags published items in place (tags are metadata) and reports frozen syllabus changes as conflicts", async () => {
    editJson<Json[]>(files, questionFile(), (list) => {
      const q = list.find((item) => item.key === "linear.q03") as Json;
      q.applies = [`${chainA.examBoard.slug}`];
    });
    const syllabusFile = `content/syllabi/${chainB.examBoard.slug}/${chainB.qualification.slug}/${chainB.subject.slug}/2030-2032.json`;
    editJson<Json>(files, syllabusFile, (s) => {
      (s.topics as Json[]).push({ key: "statistics", name: "Statistics" });
    });
    const report = await runImport();
    expect(outcome(report, "linear.q03")).toBe("retagged");
    const tags = await db.questionTopic.findMany({ where: { question: { externalRef: refOf("linear.q03") } }, select: { subjectId: true } });
    expect(tags.map((t) => t.subjectId)).toEqual([chainA.subject.id]);
    const live = await db.question.findUniqueOrThrow({ where: { externalRef: refOf("linear.q03") }, select: { revision: true, status: true } });
    expect(live).toEqual({ revision: 1, status: "PUBLISHED" });
    const syllabus = report.syllabi.find((s) => s.path.startsWith(chainB.examBoard.slug));
    expect(syllabus?.outcome).toBe("conflict");
    expect(syllabus?.message).toMatch(/frozen/);
  }, 300_000);

  it("refuses to import content that fails validation", async () => {
    editJson<Json[]>(files, questionFile(), (list) => {
      (list[0] as Json).modelResponse = { type: "MULTIPLE_CHOICE", optionKeys: ["D"] };
    });
    const report = await runImport();
    expect(report.aborted).toBe(true);
    expect(report.validation.errorCount).toBeGreaterThan(0);
    expect(report.items).toEqual([]);
  }, 120_000);
});
