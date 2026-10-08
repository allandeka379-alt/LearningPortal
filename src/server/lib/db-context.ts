import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/server/db";

/**
 * Transaction-local database context required by the raw-SQL guards (docs/ARCHITECTURE.md §4.4, §4.9).
 *
 * The app connects as a NOSUPERUSER NOBYPASSRLS role, so these settings are enforced by Postgres itself:
 * - `app.user_id`  — acting user; row-level security on AiConversation / AiMessage only shows that user's rows (§21).
 * - `app.ai_scope` — 'system' (workers: AI marking, account erasure), 'break_glass' (audited SUPER_ADMIN read-only
 *                    access; write an AuditLog row in the same transaction), 'parent' (a parent on an ACTIVE link whose
 *                    student granted AI-conversation consent).
 * - `app.content_publish` — id of the content root being published; unlocks its child rows (options, parts, items…)
 *                    for the publish merge. Set it ONLY inside the publish transaction.
 *
 * All settings use set_config(..., is_local = true): they vanish at COMMIT/ROLLBACK, which is safe behind
 * transaction-pooling poolers (PgBouncer). Never set them outside a transaction — they would be no-ops.
 */

export type Tx = Prisma.TransactionClient;
export type AiScope = "system" | "break_glass" | "parent";

type TxOptions = { maxWait?: number; timeout?: number; isolationLevel?: Prisma.TransactionIsolationLevel };

async function setLocal(tx: Tx, name: string, value: string): Promise<void> {
  await tx.$queryRaw`SELECT set_config(${name}, ${value}, true)`;
}

/** Run `fn` in a transaction acting as `userId` (required for every AI conversation/message query). */
export function withUserContext<T>(userId: string, fn: (tx: Tx) => Promise<T>, options?: TxOptions): Promise<T> {
  return db.$transaction(async (tx) => {
    await setLocal(tx, "app.user_id", userId);
    return fn(tx);
  }, options);
}

/**
 * Run `fn` with an elevated AI scope. `actorUserId` is required for 'parent' (the policy checks the parent's link) and
 * for 'break_glass' (callers must audit). 'system' is for background workers only.
 */
export function withAiScope<T>(
  scope: AiScope,
  actorUserId: string | null,
  fn: (tx: Tx) => Promise<T>,
  options?: TxOptions,
): Promise<T> {
  if ((scope === "parent" || scope === "break_glass") && !actorUserId) {
    throw new Error(`withAiScope('${scope}') requires an actorUserId`);
  }
  return db.$transaction(async (tx) => {
    await setLocal(tx, "app.ai_scope", scope);
    if (actorUserId) await setLocal(tx, "app.user_id", actorUserId);
    return fn(tx);
  }, options);
}

/** Inside a publish transaction: unlock the child rows of `rootId` for the publish merge (C1.5 child guard). */
export async function setContentPublishContext(tx: Tx, rootId: string): Promise<void> {
  await setLocal(tx, "app.content_publish", rootId);
}
