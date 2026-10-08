import { describe, expect, it } from "vitest";
import { createSession } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { createNotification } from "@/server/notifications/service";
import { createParent, createStudent } from "../../../../../tests/factories/index";
import { GET, POST } from "./route";

/** /app/notifications/feed: the header bell's count + recent items (GET) and mark-read (POST). */

const ORIGIN = new URL(getEnv().APP_URL).origin;
const URL_BASE = `${ORIGIN}/app/notifications/feed`;

async function signedIn(kind: "student" | "parent" = "student") {
  const { user } = kind === "student" ? await createStudent({ student: { isMinor: false } }) : await createParent();
  const session = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
  return { userId: user.id, cookie: `dz_session=${session.token}` };
}

async function body(response: Response) {
  return (await response.json()) as { data?: Record<string, unknown>; error?: { code: string } };
}

describe("GET /app/notifications/feed", () => {
  it("needs a signed-in student", async () => {
    expect((await GET(new Request(URL_BASE))).status).toBe(401);
    const parent = await signedIn("parent");
    expect((await GET(new Request(URL_BASE, { headers: { cookie: parent.cookie } }))).status).toBe(403);
  });

  it("returns the unread count, and the recent items on request, never cached", async () => {
    const { userId, cookie } = await signedIn();
    await createNotification(userId, { type: "studyplan.updated", title: "Your plan changed", body: "Algebra moved to Thursday.", data: { href: "/app/plan" } });
    const countOnly = await GET(new Request(`${URL_BASE}?items=0`, { headers: { cookie } }));
    expect(countOnly.status).toBe(200);
    expect(countOnly.headers.get("cache-control")).toBe("private, no-store");
    expect(await body(countOnly)).toEqual({ data: { unread: 1 } });

    const withItems = await body(await GET(new Request(`${URL_BASE}?items=1`, { headers: { cookie } })));
    expect(withItems.data).toMatchObject({ unread: 1, items: [{ title: "Your plan changed", href: "/app/plan", unread: true, category: "LEARNING" }] });
  });
});

describe("POST /app/notifications/feed", () => {
  it("marks the caller's own notifications read (same-origin only)", async () => {
    const { userId, cookie } = await signedIn();
    const mine = await createNotification(userId, { type: "system.notice", title: "Maintenance", body: "Short downtime tonight." });
    const other = await signedIn();
    const theirs = await createNotification(other.userId, { type: "system.notice", title: "Theirs", body: "Not yours." });

    const post = (payload: unknown, headers: Record<string, string> = { origin: ORIGIN }) =>
      POST(new Request(URL_BASE, { method: "POST", headers: { cookie, "content-type": "application/json", ...headers }, body: JSON.stringify(payload) }));

    expect((await post({ ids: [mine.id] }, { origin: "https://evil.example" })).status).toBe(403);
    expect((await post({ ids: ["nope"] })).status).toBe(422);

    const response = await post({ ids: [mine.id, theirs.id] });
    expect(response.status).toBe(200);
    expect(await body(response)).toEqual({ data: { updated: 1, unread: 0 } });
    expect((await db.notification.findUniqueOrThrow({ where: { id: theirs.id } })).readAt).toBeNull();

    await createNotification(userId, { type: "system.notice", title: "Another", body: "Another one." });
    expect(await body(await post({ all: true }))).toEqual({ data: { updated: 1, unread: 0 } });
  });
});
