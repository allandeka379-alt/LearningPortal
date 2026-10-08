import "server-only";
import { z } from "zod";
import {
  Prisma,
  type ActivityChannel,
  type AiConversationMode,
  type AiIntent,
  type AiModelTier,
  type AssignmentAiHelp,
} from "@/generated/prisma/client";
import type { HintLevel } from "@/lib/ai/types";
import { withAiScope, withUserContext, type Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import type { AiTextResult } from "./gateway";

/**
 * Persistence of AI conversations and turns (ARCHITECTURE §4.9). `AiConversation` and `AiMessage` have FORCE ROW
 * LEVEL SECURITY: every query here runs inside `withUserContext(ownerId, ...)` (the student) or
 * `withAiScope("system", ...)` (workers such as the WhatsApp channel or account erasure). Without a context the
 * tables look empty and writes are refused by Postgres, so a wrong scope can never leak or plant a conversation.
 *
 * Message content is the student's text and the model's answer; metering columns come from the gateway result.
 */

export type AiWriteScope = { kind: "user"; userId: string } | { kind: "system" };

function inScope<T>(scope: AiWriteScope, fn: (tx: Tx) => Promise<T>): Promise<T> {
  return scope.kind === "user" ? withUserContext(scope.userId, fn) : withAiScope("system", null, fn);
}

export interface StartConversationInput {
  /** Owner (must equal the scope's user for user scopes; RLS enforces it). */
  userId: string;
  mode: AiConversationMode;
  channel?: ActivityChannel | undefined;
  subjectId?: string | null | undefined;
  topicId?: string | null | undefined;
  questionId?: string | null | undefined;
  assignmentId?: string | null | undefined;
  aiHelp?: AssignmentAiHelp | null | undefined;
  title?: string | null | undefined;
  modelTier?: AiModelTier | null | undefined;
  model?: string | null | undefined;
  promptVersion?: string | null | undefined;
  /** PII-free snapshot from `toContextSnapshot` (context.ts). */
  contextSnapshot?: Prisma.InputJsonObject | null | undefined;
}

export async function startConversation(scope: AiWriteScope, input: StartConversationInput): Promise<{ id: string }> {
  return inScope(scope, (tx) =>
    tx.aiConversation.create({
      data: {
        userId: input.userId,
        mode: input.mode,
        channel: input.channel ?? "WEB",
        subjectId: input.subjectId ?? null,
        topicId: input.topicId ?? null,
        questionId: input.questionId ?? null,
        assignmentId: input.assignmentId ?? null,
        aiHelp: input.aiHelp ?? null,
        title: input.title?.slice(0, 200) ?? null,
        modelTier: input.modelTier ?? null,
        model: input.model ?? null,
        promptVersion: input.promptVersion ?? null,
        ...(input.contextSnapshot ? { contextSnapshot: input.contextSnapshot } : {}),
      },
      select: { id: true },
    }),
  );
}

const hintLevelSchema = z.number().int().min(0).max(4);

export interface RecordExchangeInput {
  conversationId: string;
  user: {
    content: string;
    intent?: AiIntent | null | undefined;
    /** Client-generated id for retry idempotency (no double insert / double charge on a flaky network). */
    clientMessageId?: string | null | undefined;
    attachmentAssetId?: string | null | undefined;
    createdAt?: Date | undefined;
  };
  assistant: {
    result: AiTextResult;
    intent?: AiIntent | null | undefined;
    hintLevel?: HintLevel | null | undefined;
    createdAt?: Date | undefined;
  };
  /** Safeguarding signal (UNSAFE intent / refusal category): flags the conversation for break-glass review. */
  safetyCategory?: string | null | undefined;
}

export interface RecordedExchange {
  userMessageId: string;
  assistantMessageId: string | null;
  /** The clientMessageId was already recorded; nothing was written. */
  duplicate: boolean;
}

/**
 * Appends one student turn and the assistant's reply, and updates the conversation counters, in one transaction.
 * A conversation the scope cannot see (another user's, or none) -> NOT_FOUND.
 */
export async function recordExchange(scope: AiWriteScope, input: RecordExchangeInput): Promise<RecordedExchange> {
  const hintLevel = input.assistant.hintLevel ?? null;
  if (hintLevel !== null && !hintLevelSchema.safeParse(hintLevel).success) {
    throw AppError.validation({ hintLevel: ["Hint level must be an integer from 0 to 4."] });
  }
  const { result } = input.assistant;
  const now = input.assistant.createdAt ?? new Date();
  const userAt = input.user.createdAt ?? new Date(now.getTime() - 1);
  const clientMessageId = input.user.clientMessageId ?? null;
  const safetyCategory = input.safetyCategory ?? result.refusalCategory ?? null;

  return inScope(scope, async (tx) => {
    if (clientMessageId) {
      const existing = await tx.aiMessage.findUnique({
        where: { conversationId_clientMessageId: { conversationId: input.conversationId, clientMessageId } },
        select: { id: true },
      });
      if (existing) return { userMessageId: existing.id, assistantMessageId: null, duplicate: true };
    }

    // Update first: under RLS an invisible conversation matches zero rows, so nothing is inserted for it.
    const updated = await tx.aiConversation.updateMany({
      where: { id: input.conversationId },
      data: {
        messageCount: { increment: 2 },
        userMessageCount: { increment: 1 },
        inputTokens: { increment: result.usage.inputTokens },
        outputTokens: { increment: result.usage.outputTokens },
        cacheReadTokens: { increment: result.usage.cacheReadTokens },
        cacheWriteTokens: { increment: result.usage.cacheWriteTokens },
        costMicros: { increment: result.costMicros },
        lastMessageAt: now,
        ...(safetyCategory ? { safetyFlaggedAt: now, safetyCategory: safetyCategory.slice(0, 64) } : {}),
      },
    });
    if (updated.count !== 1) throw AppError.notFound("This conversation was not found.");

    const userMessage = await tx.aiMessage.create({
      data: {
        conversationId: input.conversationId,
        role: "USER",
        content: input.user.content,
        intent: input.user.intent ?? null,
        clientMessageId,
        attachmentAssetId: input.user.attachmentAssetId ?? null,
        createdAt: userAt,
      },
      select: { id: true },
    });
    const assistantMessage = await tx.aiMessage.create({
      data: {
        conversationId: input.conversationId,
        role: "ASSISTANT",
        status: result.status,
        intent: input.assistant.intent ?? null,
        hintLevel,
        content: result.text,
        model: result.servedByModel,
        tier: result.tier,
        promptVersion: result.promptVersion,
        servedByFallback: result.servedByFallback,
        inputTokens: result.usage.inputTokens,
        outputTokens: result.usage.outputTokens,
        cacheReadTokens: result.usage.cacheReadTokens,
        cacheWriteTokens: result.usage.cacheWriteTokens,
        costMicros: result.costMicros,
        latencyMs: result.latencyMs,
        stopReason: result.stopReason?.slice(0, 32) ?? null,
        cached: result.cached,
        cacheEntryId: result.cacheEntryId,
        createdAt: now,
      },
      select: { id: true },
    });
    return { userMessageId: userMessage.id, assistantMessageId: assistantMessage.id, duplicate: false };
  });
}
