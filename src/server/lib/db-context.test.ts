import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { withAiScope, withUserContext } from "./db-context";

/**
 * Proves the database-level privacy guarantees hold for the application role (§21, §39):
 * the tests connect as app_rw (NOSUPERUSER NOBYPASSRLS), exactly like production.
 */

async function createUser(): Promise<string> {
  const user = await db.user.create({ data: { emailNormalized: `rls-${randomUUID()}@test.invalid` } });
  return user.id;
}

describe("database role", () => {
  it("connects as a role that cannot bypass row-level security", async () => {
    const rows = await db.$queryRaw<{ rolsuper: boolean; rolbypassrls: boolean }[]>`
      SELECT rolsuper, rolbypassrls FROM pg_roles WHERE rolname = current_user`;
    expect(rows[0]).toEqual({ rolsuper: false, rolbypassrls: false });
  });

  it("cannot rewrite audit history", async () => {
    const rows = await db.$queryRaw<{ can_update: boolean; can_delete: boolean }[]>`
      SELECT has_table_privilege(current_user, '"AuditLog"', 'UPDATE') AS can_update,
             has_table_privilege(current_user, '"AuditLog"', 'DELETE') AS can_delete`;
    expect(rows[0]).toEqual({ can_update: false, can_delete: false });
  });
});

describe("AI conversation row-level security", () => {
  const created: string[] = [];
  afterAll(async () => {
    // Conversations are cleaned up by their owners; users stay (no truncation in shared test DB).
    for (const id of created) {
      await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { id } }));
    }
  });

  it("only the owner sees their conversation; other contexts see nothing", async () => {
    const owner = await createUser();
    const other = await createUser();

    const conversation = await withUserContext(owner, (tx) =>
      tx.aiConversation.create({ data: { userId: owner, mode: "TUTOR" } }),
    );
    created.push(conversation.id);

    const asOwner = await withUserContext(owner, (tx) => tx.aiConversation.findMany({ where: { userId: owner } }));
    expect(asOwner.map((c) => c.id)).toEqual([conversation.id]);

    const asOther = await withUserContext(other, (tx) => tx.aiConversation.findMany({ where: { userId: owner } }));
    expect(asOther).toEqual([]);

    // No context at all (e.g. a careless admin/teacher query): invisible.
    const noContext = await db.aiConversation.findMany({ where: { userId: owner } });
    expect(noContext).toEqual([]);

    // Workers can read with the system scope.
    const asSystem = await withAiScope("system", null, (tx) => tx.aiConversation.count({ where: { userId: owner } }));
    expect(asSystem).toBe(1);
  });

  it("a user cannot create a conversation on someone else's behalf", async () => {
    const victim = await createUser();
    const attacker = await createUser();
    await expect(
      withUserContext(attacker, (tx) => tx.aiConversation.create({ data: { userId: victim, mode: "TUTOR" } })),
    ).rejects.toThrow();
  });
});
