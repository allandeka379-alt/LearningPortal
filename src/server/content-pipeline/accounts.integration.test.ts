import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { publisherEmail, resolveApprover, resolveAuthor, resolveSystemPublisher, SYSTEM_APPROVER } from "./accounts";

/**
 * The system publisher (owner decision 2026-10-12: no human review, no superuser needed to publish): a password-less
 * ADMIN account, separate from the pipeline author so four-eyes still holds, created once and never usable to sign in.
 */
describe("system publisher account", () => {
  it("`--approver system` resolves to one password-less ADMIN account that is never the pipeline author", async () => {
    const first = await resolveApprover(db, SYSTEM_APPROVER);
    const again = await resolveApprover(db, publisherEmail());
    expect(again.actor.userId).toBe(first.actor.userId);
    expect(first.isSystem).toBe(true);
    expect(first.actor.roles).toEqual(["ADMIN"]);

    const row = await db.user.findUniqueOrThrow({ where: { id: first.actor.userId }, select: { passwordHash: true, roles: true, emailNormalized: true } });
    expect(row.passwordHash).toBeNull();
    expect(row.roles).not.toContain("SUPER_ADMIN");
    expect(row.emailNormalized?.endsWith(".invalid")).toBe(true);

    const author = await resolveAuthor(db);
    expect(author.actor.userId).not.toBe(first.actor.userId);
  });

  it("refuses to act once someone has given the publisher account a password", async () => {
    const publisher = await resolveSystemPublisher(db);
    await db.user.update({ where: { id: publisher.actor.userId }, data: { passwordHash: "argon2id$placeholder" } });
    try {
      const error = await resolveSystemPublisher(db).then(
        () => null,
        (e: unknown) => e,
      );
      expect(isAppError(error) && error.code).toBe("FORBIDDEN");
    } finally {
      await db.user.update({ where: { id: publisher.actor.userId }, data: { passwordHash: null } });
    }
  });
});
