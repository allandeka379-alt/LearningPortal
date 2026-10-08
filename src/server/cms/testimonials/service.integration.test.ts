import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { isDisplayableTestimonial } from "@/server/marketing/testimonials";
import { createStudent, createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import {
  createTestimonial,
  getTestimonial,
  listTestimonials,
  publishTestimonial,
  testimonialPublishBlocker,
  unpublishTestimonial,
  updateTestimonial,
  WITHDRAWN_DISPLAY_NAME,
  withdrawTestimonialConsent,
} from "./service";

/** Testimonial CMS against Postgres (Testimonial_publish_chk / _quote_chk / _demo_chk) and the public display rule. */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

const NOW = new Date("2026-10-07T10:00:00Z");
const CONSENT = "2026-10-01T09:30";

const base = {
  displayName: "Tariro M.",
  descriptor: "Form 4 student, Bulawayo",
  quote: "The daily questions kept me practising every evening.",
  consentRecordedAt: CONSENT,
  consentMethod: "signed_form" as const,
  consentEvidenceRef: "consent-form-0042",
};

async function displayable(id: string): Promise<boolean> {
  return isDisplayableTestimonial(await db.testimonial.findUniqueOrThrow({ where: { id } }));
}

describe("testimonial CMS (integration)", () => {
  it("records consent on create (unpublished, audited without names) and publishes an adult's testimonial", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const created = await createTestimonial(editor, { ...base, sortOrder: "3" }, null, NOW);
    const row = await db.testimonial.findUniqueOrThrow({ where: { id: created.id } });
    expect(row).toMatchObject({
      isPublished: false,
      isDemo: false,
      consentMethod: "signed_form",
      consentRecordedById: editor.userId,
      consentEvidenceRef: "consent-form-0042",
      authorIsMinor: false,
      sortOrder: 3,
    });
    // 09:30 on the platform clock (Africa/Harare, UTC+2).
    expect(row.consentRecordedAt.toISOString()).toBe("2026-10-01T07:30:00.000Z");

    expect(await publishTestimonial(editor, { testimonialId: created.id }, null, NOW)).toEqual({ id: created.id, changed: true });
    expect(await displayable(created.id)).toBe(true);
    expect((await publishTestimonial(editor, { testimonialId: created.id }, null, NOW)).changed).toBe(false);

    const audit = await db.auditLog.findMany({ where: { entityType: "Testimonial", entityId: created.id }, select: { action: true, after: true } });
    expect(audit.map((a) => a.action).sort()).toEqual(["testimonial.create", "testimonial.publish"]);
    expect(JSON.stringify(audit)).not.toContain("Tariro");
    expect(JSON.stringify(audit)).not.toContain("daily questions");

    const detail = await getTestimonial(editor, created.id);
    expect(detail).toMatchObject({ state: "published", quote: base.quote, consentRecordedBy: { id: editor.userId }, publishBlocker: null });

    expect(await unpublishTestimonial(editor, { testimonialId: created.id, reason: "Campaign ended" })).toEqual({ id: created.id, changed: true });
    expect(await displayable(created.id)).toBe(false);
    expect((await unpublishTestimonial(editor, { testimonialId: created.id })).changed).toBe(false);
  });

  it("requires guardian consent for minors (and detects a minor student's linked account)", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const { user: minor } = await createStudent({ student: { isMinor: true } });
    await expect(createTestimonial(editor, { ...base, userId: minor.id }, null, NOW)).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { authorIsMinor: expect.any(Array) } });

    const created = await createTestimonial(editor, { ...base, userId: minor.id, authorIsMinor: true }, null, NOW);
    const detail = await getTestimonial(editor, created.id);
    expect(detail.publishBlocker).toMatch(/guardian/);
    await expect(publishTestimonial(editor, { testimonialId: created.id }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });

    await updateTestimonial(editor, { ...base, userId: minor.id, authorIsMinor: true, guardianConsentRecordedAt: "2026-10-02T08:00", testimonialId: created.id, expectedUpdatedAt: detail.updatedAt.toISOString() }, null, NOW);
    await publishTestimonial(editor, { testimonialId: created.id }, null, NOW);
    expect(await displayable(created.id)).toBe(true);

    // While published, guardian consent cannot be removed.
    const published = await getTestimonial(editor, created.id);
    await expect(
      updateTestimonial(editor, { ...base, userId: minor.id, authorIsMinor: true, testimonialId: created.id, expectedUpdatedAt: published.updatedAt.toISOString() }, null, NOW),
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("validates consent dates, links and the photo", async () => {
    const editor = await actorWith(["ADMIN"]);
    await expect(createTestimonial(editor, { ...base, consentRecordedAt: "2026-12-01T09:00" }, null, NOW)).rejects.toMatchObject({ fieldErrors: { consentRecordedAt: expect.any(Array) } });
    await expect(createTestimonial(editor, { ...base, consentRecordedAt: "" }, null, NOW)).rejects.toMatchObject({ fieldErrors: { consentRecordedAt: expect.any(Array) } });
    await expect(createTestimonial(editor, { ...base, consentMethod: "hearsay" as never }, null, NOW)).rejects.toMatchObject({ fieldErrors: { consentMethod: expect.any(Array) } });
    await expect(createTestimonial(editor, { ...base, quote: "  " }, null, NOW)).rejects.toMatchObject({ fieldErrors: { quote: expect.any(Array) } });
    await expect(createTestimonial(editor, { ...base, userId: "01a10000-0000-7000-8000-000000000000" }, null, NOW)).rejects.toMatchObject({ fieldErrors: { userId: expect.any(Array) } });
    await expect(createTestimonial(editor, { ...base, photoMediaId: "01a10000-0000-7000-8000-000000000000" }, null, NOW)).rejects.toMatchObject({
      fieldErrors: { photoMediaId: expect.any(Array) },
    });
  });

  it("never publishes demo rows", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const demo = await db.testimonial.create({
      data: { displayName: "Demo Student", quote: "Placeholder quote.", consentRecordedAt: NOW, consentMethod: "in_app_checkbox", isDemo: true },
    });
    await expect(publishTestimonial(editor, { testimonialId: demo.id }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT", message: "Demo testimonials can never be published." });
    expect(testimonialPublishBlocker({ ...demo })).toBe("Demo testimonials can never be published.");
    expect((await db.testimonial.findUniqueOrThrow({ where: { id: demo.id } })).isPublished).toBe(false);
  });

  it("withdrawing consent unpublishes and erases the testimonial for good", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const created = await createTestimonial(editor, base, null, NOW);
    await publishTestimonial(editor, { testimonialId: created.id }, null, NOW);
    expect(await withdrawTestimonialConsent(editor, { testimonialId: created.id, reason: "Asked by email" }, null, NOW)).toEqual({ id: created.id, changed: true });
    const row = await db.testimonial.findUniqueOrThrow({ where: { id: created.id } });
    expect(row).toMatchObject({ isPublished: false, publishedAt: null, quote: "", displayName: WITHDRAWN_DISPLAY_NAME, descriptor: null, photoMediaId: null });
    expect(row.consentWithdrawnAt?.toISOString()).toBe(NOW.toISOString());
    expect(row.consentEvidenceRef).toBe("consent-form-0042");
    expect(await displayable(created.id)).toBe(false);

    await expect(publishTestimonial(editor, { testimonialId: created.id }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });
    const detail = await getTestimonial(editor, created.id);
    expect(detail.state).toBe("withdrawn");
    await expect(updateTestimonial(editor, { ...base, testimonialId: created.id, expectedUpdatedAt: detail.updatedAt.toISOString() }, null, NOW)).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await withdrawTestimonialConsent(editor, { testimonialId: created.id }, null, NOW)).changed).toBe(false);
    expect(await db.auditLog.count({ where: { entityType: "Testimonial", entityId: created.id, action: "testimonial.consent_withdraw" } })).toBe(1);
  });

  it("lists by state with cursor pagination and refuses non-editors", async () => {
    const editor = await actorWith(["CONTENT_EDITOR"]);
    const ids: string[] = [];
    for (let i = 0; i < 3; i += 1) ids.push((await createTestimonial(editor, base, null, NOW)).id);
    await withdrawTestimonialConsent(editor, { testimonialId: ids[0] as string }, null, NOW);
    const first = await listTestimonials(editor, { state: "unpublished", limit: 1 });
    expect(first.items).toHaveLength(1);
    expect(first.nextCursor).not.toBeNull();
    const withdrawn = await listTestimonials(editor, { state: "withdrawn", limit: 100 });
    expect(withdrawn.items.map((item) => item.id)).toContain(ids[0]);
    expect(withdrawn.items.every((item) => item.state === "withdrawn")).toBe(true);

    const student = await actorWith(["STUDENT"]);
    await expect(listTestimonials(student)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(createTestimonial(student, base, null, NOW)).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
