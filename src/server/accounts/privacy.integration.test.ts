import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { withAiScope, withUserContext } from "@/server/lib/db-context";
import { isAppError } from "@/server/lib/errors";
import { generateStorageKey, LocalDriver } from "@/server/lib/storage";
import {
  createCurriculumChain,
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  linkParent,
  uniqueEmail,
  uniquePhone,
} from "../../../tests/factories/index";
import {
  cancelAccountDeletion,
  DELETION_GRACE_DAYS,
  getPrivacyOverview,
  openDataExport,
  processDuePrivacyRequests,
  requestAccountDeletion,
  requestDataExport,
  runDataExport,
  type PrivacyActor,
} from "./privacy";
import { purgeExpiredAiMessageContent, purgeExpiredSolverPhotos } from "./retention";

/**
 * PRIV-02 regression: the privacy notice promised solver photos kept 30 days, AI message text 12 months, account
 * deletion after a 14-day grace period and a download of your data, but none of it existed: minors' exercise-book
 * photos and tutor chats were kept forever and nobody could erase or export them. Runs against the test database as
 * app_rw (row-level security on AI tables is real) with a temporary local storage root.
 */

const DAY_MS = 86_400_000;
let storageRoot: string;
let storage: LocalDriver;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-privacy-"));
  storage = new LocalDriver(storageRoot);
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

async function solverPhoto(userId: string, createdAt: Date) {
  const key = generateStorageKey("solver", "png", createdAt);
  await storage.put(key, new Uint8Array([1, 2, 3]), "image/png");
  const asset = await db.mediaAsset.create({
    data: {
      storageKey: key,
      mimeType: "image/png",
      byteSize: 3,
      checksumSha256: sha256Hex(key),
      purpose: "SOLVER_UPLOAD",
      visibility: "OWNER_ONLY",
      status: "READY",
      uploadedById: userId,
      createdAt,
    },
    select: { id: true },
  });
  return { id: asset.id, key };
}

async function conversation(userId: string, at: Date, text: string, attachmentAssetId: string | null = null): Promise<string> {
  const row = await withUserContext(userId, (tx) =>
    tx.aiConversation.create({
      data: {
        userId,
        mode: "SOLVER",
        title: text.slice(0, 40),
        summary: `The student wrote: ${text}`,
        createdAt: at,
        lastMessageAt: at,
        messages: {
          create: [
            { role: "USER", content: text, attachmentAssetId, createdAt: at },
            { role: "ASSISTANT", content: "Let's work through it step by step.", createdAt: at },
          ],
        },
      },
      select: { id: true },
    }),
  );
  return row.id;
}

function actorOf(userId: string): PrivacyActor {
  return { userId, roles: ["STUDENT"] };
}

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${String(error)}`;
  }
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

describe("retention purges", () => {
  // Fixtures are dated in early 2020, before anything else in the shared test database, so the purges (which act on
  // every expired row) only ever reach rows of this test.
  it("delete solver photos after 30 days and AI message text after 12 months, and nothing newer", async () => {
    const { user } = await createStudent({ firstName: "Tendai" });
    const now = new Date("2020-03-01T00:00:00.000Z");
    const expiredPhoto = await solverPhoto(user.id, new Date("2020-01-10T00:00:00.000Z"));
    const recentPhoto = await solverPhoto(user.id, new Date("2020-02-20T00:00:00.000Z"));

    const photos = await purgeExpiredSolverPhotos({ now, storage });
    expect(photos.assets).toBeGreaterThanOrEqual(1);
    expect(await db.mediaAsset.findUnique({ where: { id: expiredPhoto.id }, select: { status: true, deletedAt: true } })).toEqual({ status: "DELETED", deletedAt: now });
    expect(await storage.exists(expiredPhoto.key)).toBe(false);
    expect(await db.mediaAsset.findUnique({ where: { id: recentPhoto.id }, select: { status: true } })).toEqual({ status: "READY" });
    expect(await storage.exists(recentPhoto.key)).toBe(true);

    const oldId = await conversation(user.id, new Date("2019-01-05T00:00:00.000Z"), "I am Tendai from Harare High, form 3B: solve 2x + 3 = 7");
    const recentId = await conversation(user.id, new Date("2020-02-01T00:00:00.000Z"), "What is a mole?");
    const ai = await purgeExpiredAiMessageContent({ now });
    expect(ai.messages).toBeGreaterThanOrEqual(2);

    const [old, recent] = await withAiScope("system", null, (tx) =>
      Promise.all(
        [oldId, recentId].map((id) =>
          tx.aiConversation.findUniqueOrThrow({
            where: { id },
            select: { title: true, summary: true, messages: { select: { content: true, contentPurgedAt: true } } },
          }),
        ),
      ),
    );
    expect(old).toMatchObject({ title: null, summary: null });
    expect(old?.messages).toEqual([
      { content: "", contentPurgedAt: now },
      { content: "", contentPurgedAt: now },
    ]);
    expect(recent?.title).toBe("What is a mole?");
    expect(recent?.messages.every((message) => message.contentPurgedAt === null && message.content !== "")).toBe(true);
  });
});

describe("account deletion", () => {
  it("is scheduled 14 days out, can be cancelled, and then erases the person while keeping anonymised history", async () => {
    const parent = await createParent();
    const email = uniqueEmail("delete-me");
    const phone = uniquePhone();
    const { user } = await createStudent({ firstName: "Tendai", lastName: "Moyo", email, phone });
    await linkParent({ parentUserId: parent.user.id, studentUserId: user.id });
    // Everything else the account holds that names or reaches the person.
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, objectivesPerSubtopic: 0, lessonsPerTopic: 0 });
    const card = await db.flashcard.create({
      data: { subjectId: chain.subject.id, ownerUserId: user.id, cardType: "DEFINITION", front: "Tendai's card", back: "Mine", languageCode: "en", accessTier: "PREMIUM", status: "PUBLISHED", publishedAt: new Date(), createdById: user.id },
      select: { id: true },
    });
    const { school } = await createSchool();
    await createSchoolMember({ schoolId: school.id, userId: user.id, role: "STUDENT" });
    const identity = await db.channelIdentity.create({ data: { userId: user.id, channel: "WHATSAPP", externalId: phone, verifiedAt: new Date(), linkedAt: new Date() }, select: { id: true } });
    const inbound = await db.channelMessage.create({
      data: { identityId: identity.id, channel: "WHATSAPP", direction: "INBOUND", status: "PROCESSED", contentClass: "STANDARD", externalMessageId: `wamid.${randomUUID()}`, messageType: "text", body: "Hi, it's Tendai" },
      select: { id: true },
    });
    await db.notification.create({ data: { userId: user.id, type: "test.notice", category: "ACCOUNT", title: "Hello Tendai", body: "Welcome" } });
    await db.verificationCode.create({
      data: { purpose: "PHONE_VERIFY", channel: "SMS", target: phone, userId: user.id, codeHash: sha256Hex(randomUUID()), expiresAt: new Date(Date.now() + DAY_MS) },
    });
    const testimonial = await db.testimonial.create({
      data: { userId: user.id, displayName: "Tendai M.", quote: "It helped me pass.", consentRecordedAt: new Date(), consentMethod: "written form" },
      select: { id: true },
    });
    await db.session.create({
      data: { tokenHash: sha256Hex(randomUUID()), userId: user.id, kind: "WEB", authMethod: "PASSWORD", lastSeenAt: new Date(), expiresAt: new Date(Date.now() + DAY_MS) },
    });
    const photo = await solverPhoto(user.id, new Date());
    await conversation(user.id, new Date(), "My teacher at Harare High is ...", photo.id);
    const actor = actorOf(user.id);
    const t0 = new Date();

    expect(await codeOf(requestAccountDeletion(actor, { confirmed: false }))).toBe("VALIDATION");
    const first = await requestAccountDeletion(actor, { confirmed: true }, null, t0);
    expect(first.scheduledFor.getTime() - t0.getTime()).toBe(DELETION_GRACE_DAYS * DAY_MS);
    expect(await codeOf(requestAccountDeletion(actor, { confirmed: true }))).toBe("CONFLICT");
    expect((await getPrivacyOverview(actor)).deletion?.id).toBe(first.id);

    // Not due yet: nothing happens. Then the student changes their mind.
    await processDuePrivacyRequests({ now: new Date(t0.getTime() + (DELETION_GRACE_DAYS - 1) * DAY_MS), storage });
    expect((await db.user.findUniqueOrThrow({ where: { id: user.id } })).status).toBe("ACTIVE");
    await cancelAccountDeletion(actor);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id: first.id }, select: { status: true } })).toEqual({ status: "CANCELLED" });
    expect(await codeOf(cancelAccountDeletion(actor))).toBe("NOT_FOUND");

    // Asked again; once the grace period is over the sweep erases the account.
    const second = await requestAccountDeletion(actor, { confirmed: true }, null, t0);
    const sweep = await processDuePrivacyRequests({ now: new Date(t0.getTime() + DELETION_GRACE_DAYS * DAY_MS + 60_000), storage });
    expect(sweep.deleted).toBeGreaterThanOrEqual(1);

    const erased = await db.user.findUniqueOrThrow({
      where: { id: user.id },
      select: { status: true, deletedAt: true, emailNormalized: true, phoneE164: true, loginUsername: true, passwordHash: true, profile: { select: { firstName: true, lastName: true, displayName: true } } },
    });
    expect(erased).toMatchObject({ status: "DELETED", emailNormalized: null, phoneE164: null, loginUsername: null, passwordHash: null, profile: { firstName: null, lastName: null, displayName: null } });
    expect(erased.deletedAt).not.toBeNull();
    expect(await db.session.count({ where: { userId: user.id } })).toBe(0);
    expect(await db.parentStudentLink.count({ where: { studentUserId: user.id } })).toBe(0);
    expect(await db.mediaAsset.findUnique({ where: { id: photo.id }, select: { status: true } })).toEqual({ status: "DELETED" });
    expect(await storage.exists(photo.key)).toBe(false);
    expect(await withAiScope("system", null, (tx) => tx.aiConversation.count({ where: { userId: user.id } }))).toBe(0);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id: second.id }, select: { status: true } })).toEqual({ status: "COMPLETED" });
    expect(await db.auditLog.count({ where: { action: "privacy.deletion.complete", targetUserId: user.id } })).toBe(1);
    expect(await db.flashcard.findUniqueOrThrow({ where: { id: card.id }, select: { front: true, back: true, status: true } })).toEqual({ front: "", back: "", status: "ARCHIVED" });
    expect(await db.schoolMember.findFirstOrThrow({ where: { schoolId: school.id, userId: user.id }, select: { status: true } })).toEqual({ status: "REMOVED" });
    expect(await db.channelIdentity.count({ where: { id: identity.id } })).toBe(0);
    expect(await db.channelMessage.findUniqueOrThrow({ where: { id: inbound.id }, select: { body: true, identityId: true } })).toEqual({ body: null, identityId: null });
    expect(await db.notification.count({ where: { userId: user.id } })).toBe(0);
    expect(await db.verificationCode.count({ where: { OR: [{ userId: user.id }, { target: phone }] } })).toBe(0);
    expect(await db.testimonial.findUniqueOrThrow({ where: { id: testimonial.id }, select: { quote: true, isPublished: true, displayName: true } })).toEqual({
      quote: "",
      isPublished: false,
      displayName: "Deleted account",
    });
    // The row (learning history's anchor) stays.
    expect(await db.student.count({ where: { userId: user.id } })).toBe(1);
  });
});

describe("data export", () => {
  it("builds a JSON copy of the account's own data, downloadable by its owner only until it expires", async () => {
    const email = uniqueEmail("export-me");
    const { user } = await createStudent({ firstName: "Rudo", email });
    const other = await createStudent();
    await conversation(user.id, new Date(), "How do I balance this equation?");
    const actor = actorOf(user.id);
    const now = new Date();

    const { id } = await requestDataExport(actor, null, now);
    expect(await codeOf(requestDataExport(actor, null, now))).toBe("CONFLICT");
    expect(await db.job.count({ where: { dedupeKey: `export:${id}` } })).toBe(1);
    expect((await getPrivacyOverview(actor, now)).export).toMatchObject({ id, status: "REQUESTED", downloadable: false });

    expect(await runDataExport(id, { now, storage })).toEqual({ status: "completed" });
    expect(await runDataExport(id, { now, storage })).toEqual({ status: "skipped" });
    expect((await getPrivacyOverview(actor, now)).export).toMatchObject({ id, status: "COMPLETED", downloadable: true });

    const file = await openDataExport(actor, id, { now, storage });
    const document = JSON.parse(await readAll(file.stream)) as { account: { email: string }; profile: { firstName: string }; aiConversations: { messages: { content: string }[] }[] };
    expect(document.account.email).toBe(email);
    expect(document.profile.firstName).toBe("Rudo");
    expect(document.aiConversations[0]?.messages[0]?.content).toBe("How do I balance this equation?");

    // Nobody else can download it, and it disappears once expired.
    expect(await codeOf(openDataExport(actorOf(other.user.id), id, { now, storage }))).toBe("NOT_FOUND");
    expect(await codeOf(openDataExport(actor, "not-a-uuid", { now, storage }))).toBe("NOT_FOUND");
    const later = new Date(now.getTime() + 8 * DAY_MS);
    expect(await codeOf(openDataExport(actor, id, { now: later, storage }))).toBe("NOT_FOUND");
    const key = (await db.privacyRequest.findUniqueOrThrow({ where: { id }, select: { exportStorageKey: true } })).exportStorageKey!;
    expect(await storage.exists(key)).toBe(true);
    await processDuePrivacyRequests({ now: later, storage });
    expect(await storage.exists(key)).toBe(false);
    expect(await db.privacyRequest.findUniqueOrThrow({ where: { id }, select: { exportStorageKey: true } })).toEqual({ exportStorageKey: null });
  });
});
