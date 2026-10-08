import "server-only";
import type { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import type { SanitizedHtml } from "@/lib/content/types";
import { renderContent } from "@/server/content/render";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { REVIEW_BLOCKING_WARNINGS } from "../review/provenance";
import { AUDIT_TRAIL_SELECT, toAuditTrailEntry, type AuditTrailEntry } from "../commerce/shared";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import {
  createFaqSchema,
  faqIdSchema,
  listFaqSchema,
  moveFaqSchema,
  updateFaqSchema,
  type CreateFaqInput,
  type ListFaqInput,
  type UpdateFaqInput,
} from "./schemas";

/**
 * FAQ CMS (§45; `content.publish`). FAQ entries feed /faq, the home page and the contextual blocks on /pricing
 * (categories "pricing"/"billing") and /schools ("schools"); the public read model is src/server/marketing/faq.ts and
 * shows PUBLISHED rows only (demo rows never in production).
 *
 * - Answers are Markdown rendered by the shared sanitising content pipeline, exactly as the public page renders them
 *   (no asset resolver: FAQ answers are text, lists, links and maths). Pipeline warnings that would break the public
 *   rendering (unresolved / external images, maths errors, unknown directives) are refused at save time; the rest are
 *   shown in the editor preview.
 * - Ordering is per (locale, category): `sortOrder`, then creation time, as on the public site. "Move up / down"
 *   renumbers the group in steps of 10 so later inserts fit between entries.
 * - Publish / unpublish set or clear `publishedAt` (FaqItem_publish_chk). Only unpublished entries can be deleted.
 * - Every write is audited in the same transaction (ids, category and flags only: never the answer text).
 */

export interface FaqListItem {
  id: string;
  question: string;
  category: string;
  locale: string;
  sortOrder: number;
  isPublished: boolean;
  publishedAt: Date | null;
  isDemo: boolean;
  updatedAt: Date;
}

export interface FaqGroupView {
  locale: string;
  category: string;
  items: FaqListItem[];
}

export interface FaqList {
  groups: FaqGroupView[];
  /** Distinct categories / locales in use (filters, the editor's suggestions). */
  categories: string[];
  locales: string[];
  /** More entries exist than the list shows (narrow it with the filters). */
  truncated: boolean;
}

export interface FaqDetail extends FaqListItem {
  answer: string;
  /** The answer as the public site renders it. */
  answerHtml: SanitizedHtml;
  /** Non-blocking pipeline notes for the editor. */
  warnings: string[];
  createdAt: Date;
  audit: AuditTrailEntry[];
}

const LIST_SELECT = {
  id: true,
  question: true,
  category: true,
  locale: true,
  sortOrder: true,
  isPublished: true,
  publishedAt: true,
  isDemo: true,
  updatedAt: true,
} as const satisfies Prisma.FaqItemSelect;

/** The admin list shows at most this many entries (the public site renders at most 200 per page). */
const MAX_LIST = 500;

function parse<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, result.error.issues[0]?.message);
  return result.data;
}

/** Renders an answer exactly as the public page does; blocking warnings become field errors. */
export function renderFaqAnswer(answer: string, id = "preview"): { html: SanitizedHtml; errors: string[]; warnings: string[] } {
  const rendered = renderContent(answer, { idPrefix: `faq-${id.slice(-8)}-`, baseHeadingLevel: 4 });
  const errors: string[] = [];
  const warnings: string[] = [];
  for (const warning of rendered.warnings) {
    const message = warning.line === undefined ? warning.message : `Line ${warning.line}: ${warning.message}`;
    (REVIEW_BLOCKING_WARNINGS.has(warning.code) ? errors : warnings).push(message);
  }
  return { html: rendered.html, errors, warnings };
}

function assertRenderable(answer: string): void {
  const { errors } = renderFaqAnswer(answer);
  if (errors.length > 0) {
    const fieldErrors: FieldErrors = { answer: errors };
    throw AppError.validation(fieldErrors, errors[0]);
  }
}

/** FAQ entries grouped by locale and category, in public order. */
export async function listFaqItems(actor: CmsActor, input: ListFaqInput = {}): Promise<FaqList> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(listFaqSchema, input);
  const where: Prisma.FaqItemWhereInput = {
    ...(data.category ? { category: data.category } : {}),
    ...(data.locale ? { locale: data.locale } : {}),
    ...(data.state ? { isPublished: data.state === "published" } : {}),
  };
  const [rows, categories, locales] = await Promise.all([
    db.faqItem.findMany({
      where,
      select: LIST_SELECT,
      orderBy: [{ locale: "asc" }, { category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      take: MAX_LIST + 1,
    }),
    db.faqItem.findMany({ distinct: ["category"], select: { category: true }, orderBy: { category: "asc" }, take: 200 }),
    db.faqItem.findMany({ distinct: ["locale"], select: { locale: true }, orderBy: { locale: "asc" }, take: 50 }),
  ]);
  const groups: FaqGroupView[] = [];
  for (const row of rows.slice(0, MAX_LIST)) {
    const last = groups[groups.length - 1];
    if (last && last.locale === row.locale && last.category === row.category) last.items.push(row);
    else groups.push({ locale: row.locale, category: row.category, items: [row] });
  }
  return { groups, categories: categories.map((c) => c.category), locales: locales.map((l) => l.locale), truncated: rows.length > MAX_LIST };
}

/** One entry with its rendered answer, editor warnings and recent audit trail. */
export async function getFaqItem(actor: CmsActor, faqItemId: string): Promise<FaqDetail> {
  assertCmsPermission(actor, "content.publish");
  const { faqItemId: id } = parse(faqIdSchema, { faqItemId });
  const [row, audit] = await Promise.all([
    db.faqItem.findUnique({ where: { id }, select: { ...LIST_SELECT, answer: true, createdAt: true } }),
    db.auditLog.findMany({ where: { entityType: "FaqItem", entityId: id }, select: AUDIT_TRAIL_SELECT, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);
  if (!row) throw AppError.notFound("FAQ entry not found.");
  const rendered = renderFaqAnswer(row.answer, row.id);
  return { ...row, answerHtml: rendered.html, warnings: [...rendered.errors, ...rendered.warnings], audit: audit.map(toAuditTrailEntry) };
}

async function nextSortOrder(client: Prisma.TransactionClient, category: string, locale: string): Promise<number> {
  const last = await client.faqItem.findFirst({ where: { category, locale }, select: { sortOrder: true }, orderBy: { sortOrder: "desc" } });
  return last ? Math.min(last.sortOrder + 10, 1_000_000) : 10;
}

function auditEntry(actor: CmsActor, action: AuditAction, faqItemId: string, extra: { before?: unknown; after?: unknown; metadata?: Record<string, unknown>; reason?: string | null; request: AuditRequestInfo | null }) {
  return {
    ...auditActorFields(infraActor(actor)),
    action,
    entityType: "FaqItem",
    entityId: faqItemId,
    ...extra,
  };
}

/** Creates an UNPUBLISHED entry (publish it separately after a read-through). */
export async function createFaqItem(actor: CmsActor, input: CreateFaqInput, request: AuditRequestInfo | null = null): Promise<{ id: string }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(createFaqSchema, input);
  assertRenderable(data.answer);
  return db.$transaction(async (tx) => {
    const sortOrder = data.sortOrder ?? (await nextSortOrder(tx, data.category, data.locale));
    const created = await tx.faqItem.create({
      data: { question: data.question, answer: data.answer, category: data.category, locale: data.locale, sortOrder, isPublished: false, isDemo: false },
      select: { id: true },
    });
    await auditInTx(tx, auditEntry(actor, AUDIT_ACTIONS.FAQ_CREATE, created.id, { after: { category: data.category, locale: data.locale, sortOrder }, request }));
    return created;
  });
}

/** Saves the text, category, locale and order (optimistic concurrency on `updatedAt`). Publication is unchanged. */
export async function updateFaqItem(actor: CmsActor, input: UpdateFaqInput, request: AuditRequestInfo | null = null): Promise<{ id: string; changed: string[] }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(updateFaqSchema, input);
  assertRenderable(data.answer);
  return db.$transaction(async (tx) => {
    const current = await tx.faqItem.findUnique({ where: { id: data.faqItemId }, select: { question: true, answer: true, category: true, locale: true, sortOrder: true, updatedAt: true } });
    if (!current) throw AppError.notFound("FAQ entry not found.");
    if (current.updatedAt.getTime() !== new Date(data.expectedUpdatedAt).getTime()) {
      throw AppError.conflict("This FAQ entry was changed by someone else. Reload the page to see the latest version.");
    }
    const moved = current.category !== data.category || current.locale !== data.locale;
    const sortOrder = data.sortOrder ?? (moved ? await nextSortOrder(tx, data.category, data.locale) : current.sortOrder);
    const next = { question: data.question, answer: data.answer, category: data.category, locale: data.locale, sortOrder };
    const changed = (Object.keys(next) as (keyof typeof next)[]).filter((key) => next[key] !== current[key]);
    if (changed.length === 0) return { id: data.faqItemId, changed };
    const updated = await tx.faqItem.updateMany({ where: { id: data.faqItemId, updatedAt: current.updatedAt }, data: next });
    if (updated.count !== 1) throw AppError.conflict("This FAQ entry was changed by someone else. Reload the page to see the latest version.");
    await auditInTx(
      tx,
      auditEntry(actor, AUDIT_ACTIONS.FAQ_UPDATE, data.faqItemId, {
        before: { category: current.category, locale: current.locale, sortOrder: current.sortOrder },
        after: { category: next.category, locale: next.locale, sortOrder: next.sortOrder },
        metadata: { changed },
        request,
      }),
    );
    return { id: data.faqItemId, changed };
  });
}

/** Publishes (shows on the public site) or unpublishes an entry. Idempotent. */
export async function setFaqItemPublished(
  actor: CmsActor,
  input: { faqItemId: string; reason?: string },
  published: boolean,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; isPublished: boolean; changed: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(faqIdSchema, input);
  return db.$transaction(async (tx) => {
    const current = await tx.faqItem.findUnique({ where: { id: data.faqItemId }, select: { isPublished: true, answer: true } });
    if (!current) throw AppError.notFound("FAQ entry not found.");
    if (current.isPublished === published) return { id: data.faqItemId, isPublished: published, changed: false };
    if (published) assertRenderable(current.answer);
    await tx.faqItem.update({ where: { id: data.faqItemId }, data: published ? { isPublished: true, publishedAt: now } : { isPublished: false, publishedAt: null } });
    await auditInTx(
      tx,
      auditEntry(actor, published ? AUDIT_ACTIONS.FAQ_PUBLISH : AUDIT_ACTIONS.FAQ_UNPUBLISH, data.faqItemId, {
        before: { isPublished: !published },
        after: { isPublished: published },
        reason: data.reason ?? null,
        request,
      }),
    );
    return { id: data.faqItemId, isPublished: published, changed: true };
  });
}

/** Moves an entry one place up or down within its (locale, category) group; renumbers the group 10, 20, 30… */
export async function moveFaqItem(actor: CmsActor, input: { faqItemId: string; direction: "up" | "down" }, request: AuditRequestInfo | null = null): Promise<{ moved: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(moveFaqSchema, input);
  return db.$transaction(async (tx) => {
    const item = await tx.faqItem.findUnique({ where: { id: data.faqItemId }, select: { category: true, locale: true } });
    if (!item) throw AppError.notFound("FAQ entry not found.");
    const group = await tx.faqItem.findMany({
      where: { category: item.category, locale: item.locale },
      select: { id: true, sortOrder: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      take: MAX_LIST,
    });
    const index = group.findIndex((row) => row.id === data.faqItemId);
    const target = data.direction === "up" ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= group.length) return { moved: false };
    const order = group.map((row) => row.id);
    [order[index], order[target]] = [order[target] as string, order[index] as string];
    const current = new Map(group.map((row) => [row.id, row.sortOrder]));
    for (const [position, id] of order.entries()) {
      const sortOrder = (position + 1) * 10;
      if (current.get(id) !== sortOrder) await tx.faqItem.update({ where: { id }, data: { sortOrder } });
    }
    await auditInTx(
      tx,
      auditEntry(actor, AUDIT_ACTIONS.FAQ_REORDER, data.faqItemId, { metadata: { direction: data.direction, category: item.category, locale: item.locale, position: target + 1 }, request }),
    );
    return { moved: true };
  });
}

/** Deletes an UNPUBLISHED entry (unpublish first). Nothing references FAQ entries. */
export async function deleteFaqItem(actor: CmsActor, input: { faqItemId: string; reason?: string }, request: AuditRequestInfo | null = null): Promise<{ id: string }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(faqIdSchema, input);
  return db.$transaction(async (tx) => {
    const current = await tx.faqItem.findUnique({ where: { id: data.faqItemId }, select: { isPublished: true, category: true, locale: true, isDemo: true } });
    if (!current) throw AppError.notFound("FAQ entry not found.");
    if (current.isPublished) throw AppError.conflict("Unpublish this FAQ entry before deleting it.");
    await tx.faqItem.delete({ where: { id: data.faqItemId } });
    await auditInTx(
      tx,
      auditEntry(actor, AUDIT_ACTIONS.FAQ_DELETE, data.faqItemId, { before: { category: current.category, locale: current.locale, isDemo: current.isDemo }, reason: data.reason ?? null, request }),
    );
    return { id: data.faqItemId };
  });
}
