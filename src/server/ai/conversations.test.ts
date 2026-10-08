import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { withAiScope, withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { buildStudentContext, toContextSnapshot } from "./context";
import { recordExchange, startConversation } from "./conversations";
import type { AiTextResult } from "./gateway";

/**
 * AiConversation / AiMessage writes go through withUserContext / withAiScope and are enforced by Postgres row-level
 * security (the tests connect as app_rw, NOBYPASSRLS).
 */

const createdConversations: string[] = [];

async function createUser(): Promise<string> {
  const user = await db.user.create({ data: { emailNormalized: `ai-conv-${randomUUID()}@test.invalid` } });
  return user.id;
}

function assistantResult(patch: Partial<AiTextResult> = {}): AiTextResult {
  return {
    route: "tutor",
    feature: "TUTOR",
    tier: "STANDARD",
    model: "claude-sonnet-5-5",
    servedByModel: "claude-sonnet-5-5",
    servedByFallback: false,
    promptVersion: "tutor-test",
    usage: { inputTokens: 1200, outputTokens: 300, cacheReadTokens: 1500, cacheWriteTokens: 200 },
    costMicros: 6200,
    latencyMs: 850,
    stopReason: "end_turn",
    refusalCategory: null,
    cached: false,
    cacheEntryId: null,
    status: "COMPLETE",
    text: "Let's start: which two numbers multiply to $6$ and add to $-5$?",
    ...patch,
  };
}

afterAll(async () => {
  for (const id of createdConversations) {
    await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { id } }));
  }
});

describe("AI conversation persistence under RLS", () => {
  it("lets the owner start a conversation and record a metered exchange", async () => {
    const owner = await createUser();
    const snapshot = toContextSnapshot({ board: "ZIMSEC", qualification: "O-Level", subject: "Mathematics" }, new Date());
    const { id } = await startConversation(
      { kind: "user", userId: owner },
      { userId: owner, mode: "TUTOR", promptVersion: "tutor-test", contextSnapshot: snapshot },
    );
    createdConversations.push(id);

    const recorded = await recordExchange(
      { kind: "user", userId: owner },
      {
        conversationId: id,
        user: { content: "How do I factorise x^2 - 5x + 6?", intent: "TEACH", clientMessageId: "client-1" },
        assistant: { result: assistantResult(), intent: "TEACH", hintLevel: 0 },
      },
    );
    expect(recorded.duplicate).toBe(false);

    const { conversation, messages } = await withUserContext(owner, async (tx) => ({
      conversation: await tx.aiConversation.findUniqueOrThrow({ where: { id } }),
      messages: await tx.aiMessage.findMany({ where: { conversationId: id }, orderBy: { createdAt: "asc" } }),
    }));
    expect(conversation).toMatchObject({
      messageCount: 2,
      userMessageCount: 1,
      inputTokens: 1200,
      outputTokens: 300,
      cacheReadTokens: 1500,
      cacheWriteTokens: 200,
      costMicros: 6200,
    });
    expect(buildStudentContext({ board: "ZIMSEC", qualification: "O-Level", subject: "Mathematics" })).toContain("ZIMSEC");
    expect(messages.map((message) => message.role)).toEqual(["USER", "ASSISTANT"]);
    expect(messages[1]).toMatchObject({ hintLevel: 0, model: "claude-sonnet-5-5", costMicros: 6200, tier: "STANDARD" });

    // Invisible without a context (a careless admin/teacher query sees nothing).
    expect(await db.aiMessage.count({ where: { conversationId: id } })).toBe(0);
  });

  it("is idempotent on clientMessageId (no double insert or double count)", async () => {
    const owner = await createUser();
    const { id } = await startConversation({ kind: "user", userId: owner }, { userId: owner, mode: "SOLVER" });
    createdConversations.push(id);
    const exchange = {
      conversationId: id,
      user: { content: "Solve 2x + 4 = 10", clientMessageId: "retry-me" },
      assistant: { result: assistantResult() },
    };
    await recordExchange({ kind: "user", userId: owner }, exchange);
    const again = await recordExchange({ kind: "user", userId: owner }, exchange);
    expect(again.duplicate).toBe(true);
    const count = await withUserContext(owner, (tx) => tx.aiMessage.count({ where: { conversationId: id } }));
    expect(count).toBe(2);
  });

  it("refuses writes into another user's conversation (NOT_FOUND, nothing inserted)", async () => {
    const owner = await createUser();
    const attacker = await createUser();
    const { id } = await startConversation({ kind: "user", userId: owner }, { userId: owner, mode: "TUTOR" });
    createdConversations.push(id);

    const error = await recordExchange(
      { kind: "user", userId: attacker },
      { conversationId: id, user: { content: "planted" }, assistant: { result: assistantResult() } },
    ).catch((caught: unknown) => caught);
    expect(isAppError(error) && error.code).toBe("NOT_FOUND");

    const count = await withUserContext(owner, (tx) => tx.aiMessage.count({ where: { conversationId: id } }));
    expect(count).toBe(0);
  });

  it("refuses to start a conversation on someone else's behalf", async () => {
    const victim = await createUser();
    const attacker = await createUser();
    await expect(
      startConversation({ kind: "user", userId: attacker }, { userId: victim, mode: "TUTOR" }),
    ).rejects.toThrow();
  });

  it("lets workers write with the system scope and flags safety categories", async () => {
    const owner = await createUser();
    const { id } = await startConversation({ kind: "system" }, { userId: owner, mode: "TUTOR", channel: "WHATSAPP" });
    createdConversations.push(id);
    await recordExchange(
      { kind: "system" },
      {
        conversationId: id,
        user: { content: "..." },
        assistant: { result: assistantResult({ status: "REFUSED", text: "", refusalCategory: "general_harms" }) },
      },
    );
    const conversation = await withUserContext(owner, (tx) => tx.aiConversation.findUniqueOrThrow({ where: { id } }));
    expect(conversation.safetyCategory).toBe("general_harms");
    expect(conversation.safetyFlaggedAt).not.toBeNull();
  });

  it("rejects hint levels outside the 0..4 ladder before touching the database", async () => {
    const owner = await createUser();
    const error = await recordExchange(
      { kind: "user", userId: owner },
      {
        conversationId: randomUUID(),
        user: { content: "x" },
        assistant: { result: assistantResult(), hintLevel: 5 as unknown as 4 },
      },
    ).catch((caught: unknown) => caught);
    expect(isAppError(error) && error.code).toBe("VALIDATION");
  });
});
