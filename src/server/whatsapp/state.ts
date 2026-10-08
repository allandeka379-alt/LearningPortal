import "server-only";
import { z } from "zod";
import { Prisma, type ChannelConversationStateKind } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import type { AwaitingAnswer } from "./commands";

/**
 * Command state of one channel identity (`ChannelConversationState`, ARCHITECTURE §8 step 6). An AWAITING_ANSWER state
 * without its slot, or past `expiresAt`, is IDLE.
 *
 * `context` (Zod-validated; schema doc shape plus the answer format): `{ lastCommand?, optionKeys?, answerKind?,
 * optionCount?, multiple?, linkHelpAt? }`.
 */

/** How long a sent question waits for a typed answer (buttons on the message keep working afterwards). */
export const PENDING_ANSWER_TTL_MS = 6 * 3_600_000;

export const stateContextSchema = z.looseObject({
  lastCommand: z.string().max(32).optional(),
  optionKeys: z.array(z.string().max(16)).max(10).optional(),
  answerKind: z.enum(["choice", "boolean", "text"]).optional(),
  optionCount: z.number().int().min(0).max(10).optional(),
  multiple: z.boolean().optional(),
  /** Last time link instructions were sent to an unlinked number (throttle). */
  linkHelpAt: z.iso.datetime().optional(),
});
export type StateContext = z.output<typeof stateContextSchema>;

export interface ConversationState {
  kind: ChannelConversationStateKind;
  pending: { attemptId: string; position: number } | null;
  awaiting: AwaitingAnswer | null;
  context: StateContext;
}

const IDLE: ConversationState = { kind: "IDLE", pending: null, awaiting: null, context: {} };

/** The current state (expired / incomplete states read as IDLE, keeping the throttle fields). */
export async function loadConversationState(identityId: string, now: Date, client: DbClient = db): Promise<ConversationState> {
  const row = await client.channelConversationState.findUnique({
    where: { identityId },
    select: { state: true, pendingAttemptId: true, pendingPosition: true, context: true, expiresAt: true },
  });
  if (!row) return IDLE;
  const parsed = stateContextSchema.safeParse(row.context ?? {});
  const context = parsed.success ? parsed.data : {};
  const expired = row.expiresAt !== null && row.expiresAt.getTime() <= now.getTime();
  if (row.state !== "AWAITING_ANSWER" || expired || !row.pendingAttemptId || !row.pendingPosition || !context.answerKind) {
    return { ...IDLE, context: context.linkHelpAt ? { linkHelpAt: context.linkHelpAt } : {} };
  }
  return {
    kind: "AWAITING_ANSWER",
    pending: { attemptId: row.pendingAttemptId, position: row.pendingPosition },
    awaiting: { kind: context.answerKind, optionCount: context.optionCount ?? 0, multiple: context.multiple ?? false },
    context,
  };
}

export type StateUpdate =
  | { kind: "idle"; context?: StateContext }
  | { kind: "awaiting"; attemptId: string; position: number; awaiting: AwaitingAnswer; optionKeys: string[]; expiresAt: Date; lastCommand: string };

/** Writes the next state (upsert; one row per identity). */
export async function saveConversationState(client: DbClient, identityId: string, update: StateUpdate): Promise<void> {
  const data =
    update.kind === "idle"
      ? {
          state: "IDLE" as const,
          pendingAttemptId: null,
          pendingPosition: null,
          expiresAt: null,
          context: update.context && Object.keys(update.context).length > 0 ? (update.context as Prisma.InputJsonObject) : Prisma.DbNull,
        }
      : {
          state: "AWAITING_ANSWER" as const,
          pendingAttemptId: update.attemptId,
          pendingPosition: update.position,
          expiresAt: update.expiresAt,
          context: {
            lastCommand: update.lastCommand,
            optionKeys: update.optionKeys,
            answerKind: update.awaiting.kind,
            optionCount: update.awaiting.optionCount,
            multiple: update.awaiting.multiple,
          } satisfies StateContext as Prisma.InputJsonObject,
        };
  await client.channelConversationState.upsert({
    where: { identityId },
    create: { identityId, ...data },
    update: data,
  });
}
