import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createStudent } from "../../../tests/factories/index";
import { purgeExpiredSessions, purgeExpiredVerificationCodes } from "./jobs";
import { otpCodeHash } from "./otp";
import { createSession } from "./sessions";
import { testMeta } from "./testing";

const DAY = 24 * 60 * 60_000;

describe("auth housekeeping", () => {
  it("deletes sessions that ended more than 30 days ago, keeps recent ones", async () => {
    const { user } = await createStudent();
    const ancient = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 200 * DAY) });
    const recentlyExpired = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", now: new Date(Date.now() - 40 * DAY) });
    const active = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    const revokedLongAgo = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
    await db.session.update({ where: { id: revokedLongAgo.session.id }, data: { revokedAt: new Date(Date.now() - 31 * DAY), revokedReason: "logout" } });

    expect(await purgeExpiredSessions({ userId: user.id })).toBe(2);
    const remaining = await db.session.findMany({ where: { userId: user.id }, select: { id: true } });
    expect(remaining.map((row) => row.id).sort()).toEqual([recentlyExpired.session.id, active.session.id].sort());
    expect(ancient.session.id).not.toBe(active.session.id);
  });

  it("deletes one-time codes 24 hours after they expired", async () => {
    const { user } = await createStudent();
    const target = user.emailNormalized!;
    const make = (createdAgoMs: number, ttlMs: number) =>
      db.verificationCode.create({
        data: {
          purpose: "LOGIN_OTP",
          channel: "EMAIL",
          target,
          userId: user.id,
          codeHash: otpCodeHash("LOGIN_OTP", target, "123456"),
          createdAt: new Date(Date.now() - createdAgoMs),
          expiresAt: new Date(Date.now() - createdAgoMs + ttlMs),
        },
      });
    await make(3 * DAY, 10 * 60_000);
    const recent = await make(60 * 60_000, 10 * 60_000);
    expect(await purgeExpiredVerificationCodes({ userId: user.id })).toBe(1);
    const left = await db.verificationCode.findMany({ where: { userId: user.id }, select: { id: true } });
    expect(left.map((row) => row.id)).toEqual([recent.id]);
  });
});
