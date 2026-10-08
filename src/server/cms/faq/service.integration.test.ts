import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { listPublishedFaqs } from "@/server/marketing/faq";
import { createUser, uniqueSuffix } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { normalizeCategoryInput } from "./schemas";
import { createFaqItem, deleteFaqItem, getFaqItem, listFaqItems, moveFaqItem, setFaqItemPublished, updateFaqItem } from "./service";

/**
 * FAQ CMS against Postgres (FaqItem_publish_chk) and the PUBLIC read model. Every test uses its own locale so the
 * shared database's other FAQ rows never interfere (the public reader filters by locale in SQL).
 */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

/** A unique, valid BCP-47-style locale such as "en-3f2a9c1e". */
function testLocale(): string {
  return `en-${uniqueSuffix().slice(0, 8)}`;
}

describe("FAQ CMS (integration)", () => {
  it("normalises categories in the schema", () => {
    expect(normalizeCategoryInput("  Study Tips ")).toBe("study-tips");
    expect(normalizeCategoryInput("exam__dates")).toBe("exam-dates");
  });

  it("creates unpublished entries, publishes them to the public site and unpublishes them again (audited)", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const locale = testLocale();
    const created = await createFaqItem(editor, { question: "How do I reset my password?", answer: "Use **Forgot password** on the sign-in page.", category: " Account ", locale });
    const row = await db.faqItem.findUniqueOrThrow({ where: { id: created.id } });
    expect(row).toMatchObject({ category: "account", locale, isPublished: false, publishedAt: null, isDemo: false, sortOrder: 10 });
    expect(await listPublishedFaqs({ locale })).toEqual([]);

    const published = await setFaqItemPublished(editor, { faqItemId: created.id }, true);
    expect(published).toMatchObject({ isPublished: true, changed: true });
    const publicItems = await listPublishedFaqs({ locale });
    expect(publicItems).toHaveLength(1);
    expect(publicItems[0]).toMatchObject({ id: created.id, category: "account" });
    expect(publicItems[0]?.answerHtml).toContain("<strong>Forgot password</strong>");
    expect((await setFaqItemPublished(editor, { faqItemId: created.id }, true)).changed).toBe(false);

    await setFaqItemPublished(editor, { faqItemId: created.id, reason: "Out of date" }, false);
    expect(await db.faqItem.findUniqueOrThrow({ where: { id: created.id }, select: { isPublished: true, publishedAt: true } })).toEqual({ isPublished: false, publishedAt: null });
    expect(await listPublishedFaqs({ locale })).toEqual([]);

    const actions = await db.auditLog.findMany({ where: { entityType: "FaqItem", entityId: created.id }, select: { action: true, actorUserId: true, reason: true } });
    expect(actions.map((a) => a.action).sort()).toEqual(["faq.create", "faq.publish", "faq.unpublish"]);
    expect(actions.every((a) => a.actorUserId === editor.userId)).toBe(true);
    expect(actions.find((a) => a.action === "faq.unpublish")?.reason).toBe("Out of date");

    const detail = await getFaqItem(editor, created.id);
    expect(detail.answerHtml).toContain("<strong>");
    expect(detail.audit.length).toBe(3);
  });

  it("refuses answers the public renderer cannot show, and invalid input", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const locale = testLocale();
    await expect(createFaqItem(editor, { question: "Picture?", answer: "![A chart](https://example.com/chart.png)", category: "general", locale })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { answer: expect.any(Array) },
    });
    await expect(createFaqItem(editor, { question: "Maths?", answer: "Broken $\\frac{1}{$ maths", category: "general", locale })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createFaqItem(editor, { question: "", answer: "x", category: "general", locale })).rejects.toMatchObject({ fieldErrors: { question: expect.any(Array) } });
    await expect(createFaqItem(editor, { question: "Why?", answer: "Because.", category: "!!", locale })).rejects.toMatchObject({ fieldErrors: { category: expect.any(Array) } });
    await expect(createFaqItem(editor, { question: "Why?", answer: "Because.", category: "general", locale: "English" })).rejects.toMatchObject({ fieldErrors: { locale: expect.any(Array) } });
    // Maths renders server-side and is fine.
    const ok = await createFaqItem(editor, { question: "Do you support maths?", answer: "Yes: $x^2 + 1$.", category: "general", locale });
    expect((await getFaqItem(editor, ok.id)).answerHtml).toContain("katex");
  });

  it("updates with optimistic concurrency and moves to the end of a new category", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const locale = testLocale();
    const a = await createFaqItem(editor, { question: "First?", answer: "One.", category: "general", locale });
    await createFaqItem(editor, { question: "In pricing?", answer: "Two.", category: "pricing", locale });
    const current = await db.faqItem.findUniqueOrThrow({ where: { id: a.id }, select: { updatedAt: true } });

    const result = await updateFaqItem(editor, { faqItemId: a.id, expectedUpdatedAt: current.updatedAt.toISOString(), question: "First, edited?", answer: "One.", category: "pricing", locale });
    expect(result.changed.sort()).toEqual(["category", "question", "sortOrder"]);
    expect(await db.faqItem.findUniqueOrThrow({ where: { id: a.id }, select: { category: true, sortOrder: true } })).toEqual({ category: "pricing", sortOrder: 20 });

    await expect(
      updateFaqItem(editor, { faqItemId: a.id, expectedUpdatedAt: current.updatedAt.toISOString(), question: "Stale", answer: "One.", category: "pricing", locale }),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    const fresh = await db.faqItem.findUniqueOrThrow({ where: { id: a.id }, select: { updatedAt: true } });
    expect((await updateFaqItem(editor, { faqItemId: a.id, expectedUpdatedAt: fresh.updatedAt.toISOString(), question: "First, edited?", answer: "One.", category: "pricing", locale })).changed).toEqual([]);
  });

  it("reorders within a category (renumbering ties) and the public order follows", async () => {
    const editor = await actorWith(["ADMIN"]);
    const locale = testLocale();
    const ids: string[] = [];
    for (const question of ["Q1?", "Q2?", "Q3?"]) {
      const created = await createFaqItem(editor, { question, answer: "A.", category: "exams", locale, sortOrder: "5" });
      ids.push(created.id);
      await setFaqItemPublished(editor, { faqItemId: created.id }, true);
    }
    const [q1, q2, q3] = ids as [string, string, string];
    expect(await moveFaqItem(editor, { faqItemId: q3, direction: "up" })).toEqual({ moved: true });
    expect((await listPublishedFaqs({ locale })).map((item) => item.id)).toEqual([q1, q3, q2]);
    expect(await moveFaqItem(editor, { faqItemId: q1, direction: "up" })).toEqual({ moved: false });
    await moveFaqItem(editor, { faqItemId: q1, direction: "down" });
    expect((await listPublishedFaqs({ locale })).map((item) => item.id)).toEqual([q3, q1, q2]);
    const rows = await db.faqItem.findMany({ where: { id: { in: ids } }, select: { id: true, sortOrder: true } });
    expect(new Map(rows.map((r) => [r.id, r.sortOrder]))).toEqual(new Map([[q3, 10], [q1, 20], [q2, 30]]));

    const list = await listFaqItems(editor, { locale });
    expect(list.groups).toHaveLength(1);
    expect(list.groups[0]?.items.map((item) => item.id)).toEqual([q3, q1, q2]);
    expect(list.locales).toContain(locale);
    expect((await listFaqItems(editor, { locale, state: "unpublished" })).groups).toEqual([]);
  });

  it("deletes only unpublished entries, and refuses non-editors", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const locale = testLocale();
    const created = await createFaqItem(editor, { question: "Delete me?", answer: "Yes.", category: "general", locale });
    await setFaqItemPublished(editor, { faqItemId: created.id }, true);
    await expect(deleteFaqItem(editor, { faqItemId: created.id })).rejects.toMatchObject({ code: "CONFLICT" });
    await setFaqItemPublished(editor, { faqItemId: created.id }, false);
    await deleteFaqItem(editor, { faqItemId: created.id, reason: "Duplicate" });
    expect(await db.faqItem.findUnique({ where: { id: created.id } })).toBeNull();
    expect(await db.auditLog.count({ where: { entityType: "FaqItem", entityId: created.id, action: "faq.delete" } })).toBe(1);
    await expect(getFaqItem(editor, created.id)).rejects.toMatchObject({ code: "NOT_FOUND" });

    const teacher = await actorWith(["TEACHER"]);
    await expect(listFaqItems(teacher)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createFaqItem(teacher, { question: "Q?", answer: "A.", category: "general", locale })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
