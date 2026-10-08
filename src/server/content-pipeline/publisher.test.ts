import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createCurriculumChain, createUser, uniqueSuffix } from "../../../tests/factories";
import { pipelineEmail } from "./accounts";
import { importContent } from "./import";
import { publishContentFromPipeline, DEFAULT_ATTESTATION } from "./publisher";
import { editJson, fixtureFiles, removeTree, tempRoot, writeTree } from "./testing";

/**
 * Integration tests of `content:publish`: the approver's attestation (audited), four-eyes when enforced (the author can
 * never approve their own import) and when not, dry runs, approver checks and dependency order (syllabus versions
 * before the tests built on them).
 */

const roots: string[] = [];
afterAll(() => roots.forEach(removeTree));

async function importedFixture() {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
  const family = `p${uniqueSuffix()}-o`;
  const root = tempRoot("publish");
  roots.push(root);
  writeTree(root, fixtureFiles({ family, subjects: [{ board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug }] }));
  const author = await createUser({ roles: ["CONTENT_EDITOR"] });
  const authorEmail = author.user.emailNormalized as string;
  const report = await importContent({ repoRoot: root, families: [family], authorEmail, cacheDir: null });
  expect(report.items.filter((i) => i.outcome === "error")).toEqual([]);
  return { chain, family, root, author, authorEmail };
}

async function statuses(family: string): Promise<string[]> {
  const where = { externalRef: { startsWith: `content:${family}:` } };
  const rows = [
    ...(await db.question.findMany({ where, select: { status: true } })),
    ...(await db.lesson.findMany({ where, select: { status: true } })),
    ...(await db.flashcard.findMany({ where, select: { status: true } })),
    ...(await db.assessment.findMany({ where, select: { status: true } })),
  ];
  return [...new Set(rows.map((r) => r.status))].sort();
}

describe("content:publish", () => {
  it("lists what would be published on a dry run and changes nothing", async () => {
    const { family, root, authorEmail } = await importedFixture();
    const admin = await createUser({ roles: ["ADMIN"] });
    const report = await publishContentFromPipeline({ repoRoot: root, approverEmail: admin.user.emailNormalized as string, families: [family], authorEmail, dryRun: true });
    expect(report.items).toHaveLength(8);
    expect(report.items.every((i) => i.outcome === "would-publish")).toBe(true);
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["would-publish"]);
    expect(await statuses(family)).toEqual(["IN_REVIEW"]);
  }, 180_000);

  it("with four-eyes enforced, refuses to let the author approve their own import", async () => {
    const { family, root, authorEmail } = await importedFixture();
    const report = await publishContentFromPipeline({ repoRoot: root, approverEmail: authorEmail, families: [family], authorEmail, requireFourEyes: true });
    expect(report.items.length).toBeGreaterThan(0);
    expect(report.items.every((i) => i.outcome === "error")).toBe(true);
    expect(report.items.find((i) => i.type === "QUESTION")?.message).toMatch(/Another editor must approve/);
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["skipped"]);
    expect(await statuses(family)).toEqual(["IN_REVIEW"]);
  }, 180_000);

  it("without four-eyes, the database does not stop an author approving (production always enforces it)", async () => {
    const { family, root, authorEmail } = await importedFixture();
    const report = await publishContentFromPipeline({ repoRoot: root, approverEmail: authorEmail, families: [family], authorEmail });
    const byType = (type: string) => report.items.filter((i) => i.type === type).map((i) => i.outcome);
    expect(byType("QUESTION").every((o) => o === "published")).toBe(true);
    // An editor cannot publish the syllabus version, so the test built on it cannot be published either.
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["skipped"]);
    expect(byType("ASSESSMENT")).toEqual(["error"]);
  }, 180_000);

  it("approves and publishes as the approver, in dependency order, and audits the attestation", async () => {
    const { family, root, authorEmail, author, chain } = await importedFixture();
    const admin = await createUser({ roles: ["ADMIN"] });
    const note = "Solved every question and checked answers, notation and originality (test).";
    const report = await publishContentFromPipeline({ repoRoot: root, approverEmail: admin.user.emailNormalized as string, families: [family], authorEmail, note, requireFourEyes: true, catalogue: false });
    expect(report.syllabi.map((s) => s.outcome)).toEqual(["published"]);
    expect(report.items.map((i) => [i.type, i.outcome])).toEqual([
      ...Array.from({ length: 4 }, () => ["QUESTION", "published"]),
      ...Array.from({ length: 2 }, () => ["FLASHCARD", "published"]),
      ["LESSON", "published"],
      ["ASSESSMENT", "published"],
    ]);
    expect(await statuses(family)).toEqual(["PUBLISHED"]);

    const q = await db.question.findFirstOrThrow({ where: { externalRef: { startsWith: `content:${family}:` } }, select: { id: true, approvedById: true, createdById: true, reviewNotes: true } });
    expect(q).toMatchObject({ approvedById: admin.user.id, createdById: author.user.id, reviewNotes: note });
    const revision = await db.contentRevision.findFirstOrThrow({ where: { entityType: "QUESTION", entityId: q.id }, select: { revision: true, approvedById: true, aiGenerated: true } });
    expect(revision).toEqual({ revision: 1, approvedById: admin.user.id, aiGenerated: true });

    const approvals = await db.auditLog.count({ where: { action: "content.approve", actorUserId: admin.user.id } });
    expect(approvals).toBe(8);
    const summary = await db.auditLog.findFirstOrThrow({ where: { action: "content.publish", entityType: "ContentPipeline", actorUserId: admin.user.id }, select: { metadata: true } });
    expect(summary.metadata).toMatchObject({ operation: "content.pipeline_publish", attestation: note, families: [family], published: 8, failed: 0, syllabiPublished: 1 });
    const version = await db.syllabus.findFirstOrThrow({ where: { subjectId: chain.subject.id, versionLabel: "2030-2032" }, select: { status: true, publishedById: true } });
    expect(version).toEqual({ status: "CURRENT", publishedById: admin.user.id });

    // Nothing is left: a second run publishes nothing.
    const again = await publishContentFromPipeline({ repoRoot: root, approverEmail: admin.user.emailNormalized as string, families: [family], authorEmail });
    expect(again.items).toEqual([]);
    expect(DEFAULT_ATTESTATION).toMatch(/§41/);
  }, 240_000);

  it("refuses to publish a version as CURRENT over a CURRENT version that takes effect later (no stranded students)", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const family = `p${uniqueSuffix()}-o`;
    const root = tempRoot("publish-rollback");
    roots.push(root);
    const files = fixtureFiles({ family, subjects: [{ board: chain.examBoard.slug, qualification: chain.qualification.slug, subject: chain.subject.slug }] });
    const syllabusFile = Object.keys(files).find((file) => file.startsWith("content/syllabi/")) as string;
    // The chain's CURRENT version takes effect on 2026-01-01; this file claims an earlier start.
    editJson<Record<string, unknown>>(files, syllabusFile, (syllabus) => {
      syllabus.effectiveFrom = "2020-01-01";
    });
    writeTree(root, files);
    const author = await createUser({ roles: ["CONTENT_EDITOR"] });
    const authorEmail = author.user.emailNormalized as string;
    const admin = await createUser({ roles: ["ADMIN"] });
    const adminEmail = admin.user.emailNormalized as string;

    const imported = await importContent({ repoRoot: root, families: [family], authorEmail, cacheDir: null, approverEmail: adminEmail });
    expect(imported.syllabi.find((s) => s.outcome === "conflict")?.message).toMatch(/takes effect later \(2026-01-01\)/);
    const published = await publishContentFromPipeline({ repoRoot: root, approverEmail: adminEmail, families: [family], authorEmail, catalogue: false, dryRun: true });
    expect(published.syllabi.map((s) => s.outcome)).toEqual(["error"]);

    const versions = await db.syllabus.findMany({ where: { subjectId: chain.subject.id }, select: { versionLabel: true, status: true }, orderBy: { versionLabel: "asc" } });
    expect(versions.map((v) => v.status).sort()).toEqual(["CURRENT", "DRAFT"]);
  }, 180_000);

  it("only accepts a person with review and publish permissions, never the pipeline account", async () => {
    const { family, root } = await importedFixture();
    const student = await createUser({ roles: ["STUDENT"] });
    for (const approverEmail of [student.user.emailNormalized as string, pipelineEmail()]) {
      try {
        await publishContentFromPipeline({ repoRoot: root, approverEmail, families: [family] });
        expect.unreachable("approver accepted");
      } catch (error) {
        expect(isAppError(error) ? error.code : null).toMatch(/FORBIDDEN|NOT_FOUND/);
      }
    }
  }, 180_000);
});
