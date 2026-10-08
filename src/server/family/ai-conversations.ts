import "server-only";
import { z } from "zod";
import type { AiConversationMode, AiMessageRole } from "@/generated/prisma/client";
import { getParentAiAccessEnabled } from "@/server/cms/settings/catalogue";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, audit } from "@/server/lib/audit";
import { withAiScope } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { assertParent, type FamilyActor, type FamilyRequestMeta } from "./common";
import { studentIdSchema } from "./schemas";

/**
 * A linked parent reading a child's AI tutor / solver conversations (§21 "do not expose private student AI
 * conversations unless explicitly designed and consented to"). Three independent gates, ALL required:
 *
 * 1. the platform switch `privacy.parentAiAccess.enabled` (default OFF; checked HERE, the database policy cannot);
 * 2. an ACTIVE link from this parent whose student gave the separate AI consent (`canViewAiConversations`);
 * 3. Postgres row-level security: queries run in `withAiScope("parent", parentId)`, whose policy re-checks the link and
 *    the flag on every row, so a bug in (2) still cannot leak a conversation.
 *
 * Teachers and school admins have no path here at all. Solver photos are never shown (only "a photo was attached").
 * Each read writes an audit entry (`student.view`, reason stated) so the student's consent is traceable.
 */

export const AI_CONVERSATION_PAGE_SIZE = 20;
const MAX_MESSAGES = 200;
const NOT_AVAILABLE = "These conversations aren't available.";
const VIEW_REASON = "Linked parent read AI conversations shared by the student (separate student consent)";

export interface ParentAiAccessOptions {
  isParentAiAccessEnabled?: () => Promise<boolean>;
}

async function assertAiAccess(actor: FamilyActor, studentUserId: unknown, options: ParentAiAccessOptions): Promise<{ studentUserId: string; linkId: string }> {
  assertParent(actor);
  const parsed = studentIdSchema.safeParse(studentUserId);
  if (!parsed.success) throw AppError.notFound(NOT_AVAILABLE);
  const enabled = await (options.isParentAiAccessEnabled ?? getParentAiAccessEnabled)();
  if (!enabled) throw AppError.notFound(NOT_AVAILABLE);
  const link = await db.parentStudentLink.findFirst({
    where: { parentUserId: actor.userId, studentUserId: parsed.data, status: "ACTIVE", canViewAiConversations: true },
    select: { id: true },
  });
  if (!link) throw AppError.notFound(NOT_AVAILABLE);
  return { studentUserId: parsed.data, linkId: link.id };
}

/** True when the parent may open the child's shared AI conversations right now (all three gates but RLS). */
export async function canParentReadAiConversations(
  actor: FamilyActor,
  studentUserId: string,
  options: ParentAiAccessOptions = {},
): Promise<boolean> {
  try {
    await assertAiAccess(actor, studentUserId, options);
    return true;
  } catch (error) {
    if (error instanceof AppError && (error.code === "NOT_FOUND" || error.code === "FORBIDDEN")) return false;
    throw error;
  }
}

export interface ParentAiConversationSummary {
  id: string;
  mode: AiConversationMode;
  title: string | null;
  subjectName: string | null;
  messageCount: number;
  lastMessageAt: Date | null;
  createdAt: Date;
}

const cursorSchema = z.object({ t: z.number().int(), id: z.uuid() });

function encodeCursor(row: { lastMessageAt: Date; id: string }): string {
  return Buffer.from(JSON.stringify({ t: row.lastMessageAt.getTime(), id: row.id })).toString("base64url");
}

function decodeCursor(cursor: string): { at: Date; id: string } {
  try {
    const parsed = cursorSchema.parse(JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")));
    return { at: new Date(parsed.t), id: parsed.id };
  } catch {
    throw new AppError("BAD_REQUEST", "Invalid page cursor.");
  }
}

/** The child's shared conversations, most recent first (keyset pagination). */
export async function listChildAiConversations(
  actor: FamilyActor,
  studentUserId: unknown,
  input: { cursor?: string | null } = {},
  meta?: FamilyRequestMeta | null,
  options: ParentAiAccessOptions = {},
): Promise<{ items: ParentAiConversationSummary[]; nextCursor: string | null }> {
  const access = await assertAiAccess(actor, studentUserId, options);
  const after = input.cursor ? decodeCursor(input.cursor) : null;
  const rows = await withAiScope("parent", actor.userId, (tx) =>
    tx.aiConversation.findMany({
      where: {
        userId: access.studentUserId,
        // Archived by the student = tidied away: not shown. Conversations without a message have nothing to read.
        status: { in: ["ACTIVE", "LOCKED"] },
        lastMessageAt: { not: null },
        ...(after
          ? {
              OR: [
                { lastMessageAt: { lt: after.at } },
                { lastMessageAt: after.at, id: { lt: after.id } },
              ],
            }
          : {}),
      },
      // AiConversation(userId, status, lastMessageAt) index.
      orderBy: [{ lastMessageAt: "desc" }, { id: "desc" }],
      take: AI_CONVERSATION_PAGE_SIZE + 1,
      select: {
        id: true,
        mode: true,
        title: true,
        messageCount: true,
        lastMessageAt: true,
        createdAt: true,
        subject: { select: { name: true } },
      },
    }),
  );
  const page = rows.slice(0, AI_CONVERSATION_PAGE_SIZE);
  const last = page[page.length - 1];
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.STUDENT_VIEW,
    entityType: "AiConversation",
    targetUserId: access.studentUserId,
    reason: VIEW_REASON,
    metadata: { linkId: access.linkId, view: "list", count: page.length },
    request: meta ?? null,
  });
  return {
    items: page.map((row) => ({
      id: row.id,
      mode: row.mode,
      title: row.title,
      subjectName: row.subject?.name ?? null,
      messageCount: row.messageCount,
      lastMessageAt: row.lastMessageAt,
      createdAt: row.createdAt,
    })),
    nextCursor:
      rows.length > AI_CONVERSATION_PAGE_SIZE && last?.lastMessageAt ? encodeCursor({ lastMessageAt: last.lastMessageAt, id: last.id }) : null,
  };
}

export interface ParentAiConversationView {
  id: string;
  mode: AiConversationMode;
  title: string | null;
  subjectName: string | null;
  messages: {
    id: string;
    role: AiMessageRole;
    /** Plain text; `null` when the content was removed by the 12-month retention purge. */
    content: string | null;
    hasPhoto: boolean;
    createdAt: Date;
  }[];
  /** More than {@link MAX_MESSAGES} turns: only the latest are shown. */
  truncated: boolean;
}

/** One shared conversation with its latest turns (oldest first). NOT_FOUND unless every gate passes. */
export async function getChildAiConversation(
  actor: FamilyActor,
  studentUserId: unknown,
  conversationId: unknown,
  meta?: FamilyRequestMeta | null,
  options: ParentAiAccessOptions = {},
): Promise<ParentAiConversationView> {
  const access = await assertAiAccess(actor, studentUserId, options);
  const id = z.uuid().safeParse(conversationId);
  if (!id.success) throw AppError.notFound(NOT_AVAILABLE);
  const result = await withAiScope("parent", actor.userId, async (tx) => {
    const conversation = await tx.aiConversation.findFirst({
      where: { id: id.data, userId: access.studentUserId },
      select: { id: true, mode: true, title: true, status: true, subject: { select: { name: true } } },
    });
    if (!conversation || conversation.status === "ARCHIVED") return null;
    // AiMessage(conversationId, createdAt) index; newest first, reversed below.
    const messages = await tx.aiMessage.findMany({
      where: { conversationId: conversation.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: MAX_MESSAGES + 1,
      select: { id: true, role: true, content: true, contentPurgedAt: true, attachmentAssetId: true, createdAt: true },
    });
    return { conversation, messages };
  });
  if (result === null) throw AppError.notFound(NOT_AVAILABLE);
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: AUDIT_ACTIONS.STUDENT_VIEW,
    entityType: "AiConversation",
    entityId: result.conversation.id,
    targetUserId: access.studentUserId,
    reason: VIEW_REASON,
    metadata: { linkId: access.linkId, view: "conversation" },
    request: meta ?? null,
  });
  const truncated = result.messages.length > MAX_MESSAGES;
  return {
    id: result.conversation.id,
    mode: result.conversation.mode,
    title: result.conversation.title,
    subjectName: result.conversation.subject?.name ?? null,
    truncated,
    messages: result.messages
      .slice(0, MAX_MESSAGES)
      .reverse()
      .map((message) => ({
        id: message.id,
        role: message.role,
        content: message.contentPurgedAt !== null ? null : message.content,
        hasPhoto: message.attachmentAssetId !== null,
        createdAt: message.createdAt,
      })),
  };
}
