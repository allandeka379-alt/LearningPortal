import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { withAiScope, withUserContext } from "@/server/lib/db-context";
import { createClass, createParent, createSchool, createSchoolMember, createStudent, createTeacher, createUser, linkParent } from "../../../tests/factories/index";
import { canParentReadAiConversations, getChildAiConversation, listChildAiConversations } from "./ai-conversations";
import { revokeLink, setAiConversationAccess } from "./links";
import { actorOf, errorCodeOf, switchOff, switchOn } from "./testing";

/**
 * The parent AI-conversation path (§21): platform switch AND the student's separate consent AND row-level security.
 * Teachers and school admins never get a path. Runs as app_rw (NOBYPASSRLS), so the database policy is real.
 */

const created: string[] = [];

afterAll(async () => {
  for (const id of created) await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { id } }));
});

async function conversationFor(studentUserId: string, options: { title?: string; archived?: boolean; purged?: boolean } = {}) {
  const at = new Date();
  const id = await withUserContext(studentUserId, async (tx) => {
    const conversation = await tx.aiConversation.create({
      data: {
        userId: studentUserId,
        mode: "TUTOR",
        title: options.title ?? "Quadratic equations",
        status: options.archived ? "ARCHIVED" : "ACTIVE",
        messageCount: 2,
        userMessageCount: 1,
        lastMessageAt: at,
      },
      select: { id: true },
    });
    await tx.aiMessage.create({
      data: { conversationId: conversation.id, role: "USER", content: "How do I factorise x^2 - 5x + 6?", createdAt: at },
    });
    await tx.aiMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: options.purged ? "" : "Which two numbers multiply to 6 and add to -5?",
        contentPurgedAt: options.purged ? at : null,
        createdAt: new Date(at.getTime() + 1000),
      },
    });
    return conversation.id;
  });
  created.push(id);
  return id;
}

async function sharedWorld() {
  const student = (await createStudent()).user;
  const parent = (await createParent()).user;
  const { link } = await linkParent({ parentUserId: parent.id, studentUserId: student.id });
  const studentActor = await actorOf(student.id);
  const parentActor = await actorOf(parent.id);
  const conversationId = await conversationFor(student.id);
  return { student, parent, link, studentActor, parentActor, conversationId };
}

describe("parent access to a child's AI conversations", () => {
  it("is closed without the student's separate consent, even with the switch on", async () => {
    const { student, parentActor, conversationId } = await sharedWorld();
    expect(await canParentReadAiConversations(parentActor, student.id, { isParentAiAccessEnabled: switchOn })).toBe(false);
    expect(await errorCodeOf(listChildAiConversations(parentActor, student.id, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(getChildAiConversation(parentActor, student.id, conversationId, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
  });

  it("is closed while the platform switch is off, even with the student's consent", async () => {
    const { student, link, studentActor, parentActor } = await sharedWorld();
    await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    expect(await canParentReadAiConversations(parentActor, student.id, { isParentAiAccessEnabled: switchOff })).toBe(false);
    expect(await errorCodeOf(listChildAiConversations(parentActor, student.id, {}, null, { isParentAiAccessEnabled: switchOff }))).toBe("NOT_FOUND");
  });

  it("opens with switch + consent: lists and reads (no photos, purged text marked), and audits each read", async () => {
    const { student, parent, link, studentActor, parentActor, conversationId } = await sharedWorld();
    const archived = await conversationFor(student.id, { title: "Tidied away", archived: true });
    const purged = await conversationFor(student.id, { title: "Old one", purged: true });
    await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    expect(await canParentReadAiConversations(parentActor, student.id, { isParentAiAccessEnabled: switchOn })).toBe(true);

    const list = await listChildAiConversations(parentActor, student.id, {}, null, { isParentAiAccessEnabled: switchOn });
    expect(list.items.map((item) => item.id).sort()).toEqual([conversationId, purged].sort());
    expect(list.items.map((item) => item.id)).not.toContain(archived);
    expect(list.nextCursor).toBeNull();

    const view = await getChildAiConversation(parentActor, student.id, conversationId, null, { isParentAiAccessEnabled: switchOn });
    expect(view.messages.map((m) => m.role)).toEqual(["USER", "ASSISTANT"]);
    expect(view.messages[0]?.content).toBe("How do I factorise x^2 - 5x + 6?");
    expect(view.messages.every((m) => m.hasPhoto === false)).toBe(true);
    const purgedView = await getChildAiConversation(parentActor, student.id, purged, null, { isParentAiAccessEnabled: switchOn });
    expect(purgedView.messages[1]?.content).toBeNull();
    expect(await errorCodeOf(getChildAiConversation(parentActor, student.id, archived, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");

    const audits = await db.auditLog.findMany({ where: { actorUserId: parent.id, action: "student.view" } });
    expect(audits).toHaveLength(3); // list + two reads; the refused (archived) read is not a view
    expect(audits.every((row) => row.targetUserId === student.id && row.reason !== null)).toBe(true);
  });

  it("closes again the moment the student withdraws consent or the link is revoked", async () => {
    const { student, link, studentActor, parentActor, conversationId } = await sharedWorld();
    await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    await setAiConversationAccess(studentActor, { linkId: link.id, allow: false });
    expect(await errorCodeOf(getChildAiConversation(parentActor, student.id, conversationId, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");

    await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    await revokeLink(studentActor, { linkId: link.id });
    expect(await errorCodeOf(listChildAiConversations(parentActor, student.id, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
  });

  it("row-level security hides another student's conversation even from a consented parent", async () => {
    const { link, studentActor, parentActor, student } = await sharedWorld();
    await setAiConversationAccess(studentActor, { linkId: link.id, allow: true, confirmed: true }, null, { isParentAiAccessEnabled: switchOn });
    const stranger = (await createStudent()).user;
    const strangersConversation = await conversationFor(stranger.id);
    // Asking for the stranger's conversation under the consented child's id: not found.
    expect(await errorCodeOf(getChildAiConversation(parentActor, student.id, strangersConversation, null, { isParentAiAccessEnabled: switchOn }))).toBe("NOT_FOUND");
    // And directly through the parent scope, the database returns nothing.
    const visible = await withAiScope("parent", parentActor.userId, (tx) => tx.aiConversation.count({ where: { id: strangersConversation } }));
    expect(visible).toBe(0);
  });

  it("teachers and school admins have no path at all", async () => {
    const { student } = await sharedWorld();
    const teacher = (await createTeacher()).user;
    await createClass({ createdById: teacher.id, studentUserIds: [student.id] });
    expect(await errorCodeOf(listChildAiConversations(await actorOf(teacher.id), student.id, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");

    const { school } = await createSchool();
    const admin = (await createUser({ roles: [] })).user;
    await createSchoolMember({ schoolId: school.id, userId: admin.id, role: "SCHOOL_ADMIN" });
    expect(await errorCodeOf(listChildAiConversations(await actorOf(admin.id), student.id, {}, null, { isParentAiAccessEnabled: switchOn }))).toBe("FORBIDDEN");
  });
});
