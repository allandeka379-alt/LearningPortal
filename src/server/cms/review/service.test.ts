import { describe, expect, it } from "vitest";
import { isAppError } from "@/server/lib/errors";
import { saveLesson } from "../lessons/service";
import { countInReview, getReviewDetail, getRevision, listReviewQueue, listRevisions, reviewCapabilities, reviewQueueCounts } from "./service";
import { clearedProvenance, contentChain, readyLesson, staffActor, studentActor, withFourEyes } from "./testing";
import { approveContent, publishContent, startEditingPublished, submitContent } from "./workflow";

/** Integration tests for the review queue, review detail (diff + preview + issues) and revision history. */

describe("review queue", () => {
  it("lists items in review oldest first, filtered to the viewer's own work, with own-work markers", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const first = await readyLesson(editor, chain);
    const second = await readyLesson(editor, chain);
    await submitContent(editor, { entityType: "LESSON", id: first.id });
    await submitContent(editor, { entityType: "LESSON", id: second.id });

    const page = await listReviewQueue(editor, { status: "IN_REVIEW", authored: "mine", limit: 1 });
    expect(page.items).toHaveLength(1);
    expect(page.items[0]).toMatchObject({ entityType: "LESSON", id: first.id, isOwnWork: true, status: "IN_REVIEW", subject: chain.subject.name });
    expect(page.nextCursor).not.toBeNull();
    const next = await listReviewQueue(editor, { status: "IN_REVIEW", authored: "mine", limit: 1, cursor: page.nextCursor ?? undefined });
    expect(next.items.map((i) => i.id)).toEqual([second.id]);

    const reviewer = await staffActor();
    const approved = await listReviewQueue(reviewer, { status: "APPROVED", type: "LESSON", authored: "mine" });
    expect(approved.items).toEqual([]);

    const counts = await reviewQueueCounts(editor);
    expect(counts.IN_REVIEW.LESSON).toBeGreaterThanOrEqual(2);
    // Sidebar badge: the IN_REVIEW total, counted on its own (other test files change the totals concurrently).
    const inReview = await countInReview(editor);
    expect(Number.isInteger(inReview) && inReview >= 2).toBe(true);
  });

  it("is staff-only and rejects tampered cursors", async () => {
    const [student, editor] = await Promise.all([studentActor(), staffActor()]);
    await expect(listReviewQueue(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(countInReview(student)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listReviewQueue(editor, { cursor: "not-a-cursor" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(reviewCapabilities(editor)).toEqual({ canDraft: true, canReview: true, canPublish: true, canArchive: true });
    expect(reviewCapabilities(student)).toEqual({ canDraft: false, canReview: false, canPublish: false, canArchive: false });
  });
});

describe("review detail and revisions", () => {
  it("shows a new item without a baseline, then a field-level diff of a draft copy against the published revision", async () => {
    const chain = await contentChain();
    const [editor, reviewer] = await Promise.all([staffActor(), staffActor()]);
    const { id } = await readyLesson(editor, chain);
    await submitContent(editor, { entityType: "LESSON", id });

    const fresh = await withFourEyes(async () => getReviewDetail(reviewer, "LESSON", id));
    expect(fresh).toMatchObject({ status: "IN_REVIEW", baselineRevision: null, diff: null, isOwnWork: false, issues: {} });
    expect(fresh.preview.map((section) => section.label)).toEqual(["Summary", "Body"]);
    expect(String(fresh.preview[1]?.html)).toContain("katex");
    expect((await getReviewDetail(editor, "LESSON", id)).isOwnWork).toBe(true);

    await approveContent(reviewer, { entityType: "LESSON", id, notes: "" });
    await publishContent(reviewer, { entityType: "LESSON", id, changeNote: "v1" });
    const copy = await startEditingPublished(editor, { entityType: "LESSON", id });
    const second = chain.topics[1];
    await saveLesson(editor, {
      id: copy.id,
      title: "Solving linear equations (revised)",
      kind: "LESSON",
      subjectId: chain.subject.id,
      summary: "How to solve one-step and two-step equations.",
      body: "## Method\n\nSolve $2x + 3 = 7$: subtract 3, then divide by 2, so $x = 2$.\n\nCheck: $2(2) + 3 = 7$.",
      estimatedMinutes: 12,
      accessTier: "FREE",
      topicIds: [chain.topics[0]?.id, second?.id],
      primaryTopicId: chain.topics[0]?.id,
      ...clearedProvenance(chain),
    });
    await submitContent(editor, { entityType: "LESSON", id: copy.id });

    const detail = await getReviewDetail(reviewer, "LESSON", copy.id);
    expect(detail).toMatchObject({ draftOfId: id, baselineRevision: 1, revision: 2 });
    const changed = new Map((detail.diff ?? []).map((entry) => [entry.path, entry]));
    expect(changed.get("lesson.title")).toMatchObject({ change: "changed", before: "Solving linear equations", after: "Solving linear equations (revised)" });
    expect(changed.get("lesson.body")?.lines?.some((line) => line.kind === "add" && line.text.includes("Check"))).toBe(true);
    // Topic tags are shown by name, not id.
    expect(changed.get("topics")?.after).toContain(second?.name ?? "missing");
    expect(changed.has("lesson.summary")).toBe(false);

    const live = await getReviewDetail(reviewer, "LESSON", id);
    expect(live.pendingDraft).toMatchObject({ id: copy.id, status: "IN_REVIEW" });

    await approveContent(reviewer, { entityType: "LESSON", id: copy.id, notes: "" });
    await publishContent(reviewer, { entityType: "LESSON", id: copy.id, changeNote: "Added a check step" });

    const history = await listRevisions(editor, "LESSON", id);
    expect(history.revisions.map((r) => [r.revision, r.changeNote])).toEqual([
      [2, "Added a check step"],
      [1, "v1"],
    ]);
    expect(history.revisions[0]).toMatchObject({ author: expect.any(String), approvedBy: expect.any(String) });

    const rev2 = await getRevision(editor, "LESSON", id, 2);
    expect(rev2.previousRevision).toBe(1);
    expect(rev2.diff?.some((entry) => entry.path === "lesson.title")).toBe(true);
    expect(rev2.preview.some((section) => String(section.html).includes("Check"))).toBe(true);
    const rev1 = await getRevision(editor, "LESSON", id, 1);
    expect(rev1).toMatchObject({ previousRevision: null, diff: null });
    await expect(getRevision(editor, "LESSON", id, 9)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("lists blocking issues for a draft and hides non-platform or unknown items", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const { id } = await readyLesson(editor, chain, { copyrightStatus: "UNVERIFIED" });
    const detail = await getReviewDetail(editor, "LESSON", id);
    expect(detail.issues.copyrightStatus?.length).toBeGreaterThan(0);
    try {
      await getReviewDetail(editor, "LESSON", "0199a000-0000-7000-8000-000000000000");
      throw new Error("expected NOT_FOUND");
    } catch (error) {
      expect(isAppError(error) && error.code).toBe("NOT_FOUND");
    }
  });
});
