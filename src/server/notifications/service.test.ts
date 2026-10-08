import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createStudent, uniqueSuffix } from "../../../tests/factories/index";
import {
  categoryForType,
  countUnread,
  createNotification,
  listNotifications,
  markRead,
  notifyMany,
  purgeOldNotifications,
} from "./service";

const base = { type: "reminder.study", title: "Time to study", body: "Your daily goal is 45 minutes." } as const;

describe("categoryForType", () => {
  it("maps type prefixes", () => {
    expect(categoryForType("assignment.due")).toBe("ASSIGNMENT");
    expect(categoryForType("billing.renewal_reminder")).toBe("BILLING");
    expect(categoryForType("something.else")).toBe("SYSTEM");
  });
});

describe("createNotification", () => {
  it("creates a plain-text notification with defaults", async () => {
    const { user } = await createStudent();
    const n = await createNotification(user.id, { ...base, data: { href: "/app/study-plan" } });
    expect(n).toMatchObject({ userId: user.id, category: "REMINDER", channels: ["IN_APP"], readAt: null, data: { href: "/app/study-plan" } });
  });

  it("is idempotent per dedupe key", async () => {
    const { user } = await createStudent();
    const key = `remind:${uniqueSuffix()}`;
    const a = await createNotification(user.id, { ...base, dedupeKey: key });
    const b = await createNotification(user.id, { ...base, title: "Changed", dedupeKey: key });
    expect(b.id).toBe(a.id);
    expect(b.title).toBe("Time to study");
  });

  it("rejects off-site links, bad types and oversized text", async () => {
    const { user } = await createStudent();
    for (const input of [
      { ...base, data: { href: "https://evil.example/phish" } },
      { ...base, data: { href: "//evil.example" } },
      { ...base, type: "Bad Type" },
      { ...base, title: "x".repeat(201) },
      { ...base, body: "   " },
    ]) {
      const error = await createNotification(user.id, input).catch((e: unknown) => e);
      expect(isAppError(error) && error.code, JSON.stringify(input).slice(0, 80)).toBe("VALIDATION");
    }
  });
});

describe("notifyMany", () => {
  it("fans out in chunks and skips duplicates on retry", async () => {
    const users = await Promise.all([createStudent(), createStudent(), createStudent()]);
    const ids = users.map((u) => u.user.id);
    const input = { ...base, type: "announcement.new", dedupeKey: `announcement:${uniqueSuffix()}` };
    expect(await notifyMany([...ids, ids[0]!], input, { chunkSize: 2 })).toEqual({ created: 3 });
    expect(await notifyMany(ids, input, { chunkSize: 2 })).toEqual({ created: 0 });
    expect(await db.notification.count({ where: { userId: { in: ids }, dedupeKey: input.dedupeKey } })).toBe(3);
  });
});

describe("inbox", () => {
  it("pages newest first with a stable cursor and hides expired items", async () => {
    const { user } = await createStudent();
    const created: string[] = [];
    for (let i = 0; i < 5; i += 1) created.push((await createNotification(user.id, { ...base, title: `N${i}` })).id);
    await createNotification(user.id, { ...base, title: "expired", expiresAt: new Date(Date.now() - 60_000) });

    const seen: string[] = [];
    let cursor: string | null = null;
    let pages = 0;
    do {
      const page: Awaited<ReturnType<typeof listNotifications>> = await listNotifications(user.id, { limit: 2, cursor });
      seen.push(...page.items.map((item) => item.id));
      cursor = page.nextCursor;
      pages += 1;
    } while (cursor && pages < 10);
    expect(pages).toBe(3);
    expect(seen).toEqual([...created].reverse());

    const bad = await listNotifications(user.id, { cursor: "not-a-cursor" }).catch((e: unknown) => e);
    expect(isAppError(bad) && bad.code).toBe("BAD_REQUEST");
  });

  it("marks only the owner's notifications read", async () => {
    const owner = await createStudent();
    const other = await createStudent();
    const mine = await createNotification(owner.user.id, base);
    const theirs = await createNotification(other.user.id, base);
    await createNotification(owner.user.id, base);

    expect(await countUnread(owner.user.id)).toBe(2);
    expect(await markRead(owner.user.id, [mine.id, theirs.id, randomUUID()])).toEqual({ updated: 1 });
    expect(await countUnread(owner.user.id)).toBe(1);
    expect(await countUnread(other.user.id)).toBe(1);
    expect(await markRead(owner.user.id, "all")).toEqual({ updated: 1 });
    expect((await listNotifications(owner.user.id, { unreadOnly: true })).items).toEqual([]);

    const invalid = await markRead(owner.user.id, ["nope"]).catch((e: unknown) => e);
    expect(isAppError(invalid) && invalid.code).toBe("VALIDATION");
  });

  it("purges by age", async () => {
    const { user } = await createStudent();
    const old = await createNotification(user.id, base);
    const fresh = await createNotification(user.id, base);
    await db.$executeRaw`UPDATE "Notification" SET "createdAt" = now() - interval '400 days' WHERE "id" = ${old.id}::uuid`;
    expect(await purgeOldNotifications(180)).toBeGreaterThanOrEqual(1);
    expect(await db.notification.findUnique({ where: { id: old.id } })).toBeNull();
    expect(await db.notification.findUnique({ where: { id: fresh.id } })).not.toBeNull();
  });
});
