import "server-only";
import { Prisma, type MediaPurpose } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { withAiScope } from "@/server/lib/db-context";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { getStorage, type StorageDriver } from "@/server/lib/storage";
import { deleteAssetObjects } from "./retention";

/**
 * `accounts.deleteUser` (ARCHITECTURE §4.13; privacy notice "When you delete your account ..."): run by the privacy
 * worker once the 14-day grace period of a DELETION request is over (./privacy.ts). Users are never hard-deleted: the
 * row stays (payments, audit entries and learning history keep their foreign keys) but nothing identifies the person.
 *
 * - Uploads: solver photos, answer attachments and the avatar are marked DELETED and their stored objects removed.
 * - AI: every conversation (and, by cascade, message) is deleted under `withAiScope("system")` (row-level security).
 * - Deleted: sessions, OAuth links, verification codes, push subscriptions, parent links, channel identities (their
 *   messages keep metadata only), notifications, pending invitations to the person's contact, share cards, leaderboard
 *   entries.
 * - Blanked: testimonials (unpublished, quote / name erased, consent withdrawn), personal flashcards (archived, text
 *   erased), Student / Teacher free text.
 * - Anonymised: Profile (names, username, avatar, birth year, marketing opt-ins) and User (email, phone, username,
 *   contact phone and password removed; `status = DELETED`).
 * - Kept, attached to the anonymised id: attempts, mastery, progress, plans, XP, payments, subscriptions, memberships
 *   (set REMOVED; the database cascade ends class memberships and teaching).
 *
 * Idempotent: running it again on a DELETED user finds nothing left to remove.
 */

/** Uploads that are personal data of their uploader (never shared content). */
export const PERSONAL_MEDIA_PURPOSES: readonly MediaPurpose[] = ["SOLVER_UPLOAD", "ANSWER_ATTACHMENT", "AVATAR"];

const TX_OPTIONS = { maxWait: 15_000, timeout: 120_000 } as const;
const DELETED_TESTIMONIAL_NAME = "Deleted account";

export interface DeleteUserResult {
  mediaAssets: number;
  aiConversations: number;
}

export async function deleteUserAccount(
  userId: string,
  options: { now?: Date; storage?: StorageDriver; privacyRequestId?: string | null } = {},
): Promise<DeleteUserResult> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  const user = await db.user.findUnique({ where: { id: userId }, select: { id: true, emailNormalized: true, phoneE164: true } });
  if (!user) throw AppError.notFound("Account not found.");

  // 1. Personal uploads: objects first (a failure leaves the row for a retry), then the rows are marked DELETED.
  const uploads = await db.mediaAsset.findMany({
    where: { uploadedById: userId, purpose: { in: [...PERSONAL_MEDIA_PURPOSES] }, status: { not: "DELETED" } },
    select: { id: true, storageKey: true, variants: true },
  });
  const removed = await deleteAssetObjects(uploads, storage);
  if (removed.deletedIds.length < uploads.length) {
    throw new AppError("INTERNAL", "Some uploads could not be removed from storage.");
  }
  if (uploads.length > 0) {
    await db.mediaAsset.updateMany({ where: { id: { in: uploads.map((u) => u.id) }, status: { not: "DELETED" } }, data: { status: "DELETED", deletedAt: now } });
  }

  // 2. AI conversations and messages (row-level security: only the system scope may delete another user's rows).
  const ai = await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { userId } }), TX_OPTIONS);

  // 3. Everything else, atomically with the anonymisation and its audit entry.
  const contacts = [user.emailNormalized, user.phoneE164].filter((value): value is string => value !== null);
  await db.$transaction(async (tx) => {
    await tx.session.deleteMany({ where: { userId } });
    await tx.oAuthAccount.deleteMany({ where: { userId } });
    await tx.verificationCode.deleteMany({ where: { OR: [{ userId }, ...(contacts.length > 0 ? [{ target: { in: contacts } }] : [])] } });
    await tx.pushSubscription.deleteMany({ where: { userId } });
    await tx.notification.deleteMany({ where: { userId } });
    await tx.shareableResult.deleteMany({ where: { userId } });
    await tx.leaderboardEntry.deleteMany({ where: { userId } });
    await tx.parentStudentLink.deleteMany({ where: { OR: [{ parentUserId: userId }, { studentUserId: userId }] } });

    const identities = await tx.channelIdentity.findMany({ where: { userId }, select: { id: true } });
    if (identities.length > 0) {
      const identityIds = identities.map((identity) => identity.id);
      await tx.channelMessage.updateMany({
        where: { identityId: { in: identityIds }, OR: [{ body: { not: null } }, { payload: { not: Prisma.DbNull } }] },
        data: { body: null, payload: Prisma.DbNull, bodyPurgedAt: now },
      });
      await tx.channelIdentity.deleteMany({ where: { id: { in: identityIds } } });
    }

    if (contacts.length > 0) {
      await tx.invitation.deleteMany({ where: { target: { in: contacts }, acceptedAt: null } });
    }
    await tx.invitation.updateMany({ where: { acceptedByUserId: userId, target: { not: null } }, data: { target: null } });

    await tx.testimonial.updateMany({
      where: { userId },
      data: { isPublished: false, publishedAt: null, quote: "", displayName: DELETED_TESTIMONIAL_NAME, descriptor: null, photoMediaId: null, consentWithdrawnAt: now },
    });
    await tx.flashcard.updateMany({
      where: { ownerUserId: userId },
      data: { front: "", back: "", notes: null, renderedHtml: Prisma.DbNull, status: "ARCHIVED", archivedAt: now },
    });

    await tx.schoolMember.updateMany({ where: { userId, status: { not: "REMOVED" } }, data: { status: "REMOVED", removedAt: now } });
    await tx.classMember.updateMany({ where: { userId, status: { not: "REMOVED" } }, data: { status: "REMOVED", removedAt: now } });

    await tx.student.updateMany({ where: { userId }, data: { declaredSchoolName: null } });
    await tx.teacher.updateMany({ where: { userId }, data: { title: null, bio: null } });
    await tx.profile.updateMany({
      where: { userId },
      data: {
        firstName: null,
        lastName: null,
        displayName: null,
        username: null,
        avatarAssetId: null,
        birthYear: null,
        leaderboardOptIn: false,
        marketingEmailOptInAt: null,
        marketingSmsOptInAt: null,
        marketingWhatsappOptInAt: null,
      },
    });
    await tx.user.update({
      where: { id: userId },
      data: {
        emailNormalized: null,
        emailVerifiedAt: null,
        phoneE164: null,
        phoneVerifiedAt: null,
        loginUsername: null,
        contactPhoneE164: null,
        passwordHash: null,
        passwordMustChange: false,
        status: "DELETED",
        statusReason: "Deleted at the account holder's request",
        statusChangedAt: now,
        deletedAt: now,
      },
    });
    await auditInTx(tx, {
      actorUserId: null,
      action: AUDIT_ACTIONS.PRIVACY_DELETION_COMPLETE,
      entityType: "User",
      entityId: userId,
      targetUserId: userId,
      metadata: { privacyRequestId: options.privacyRequestId ?? null, mediaAssets: uploads.length, aiConversations: ai.count },
    });
  }, TX_OPTIONS);

  return { mediaAssets: uploads.length, aiConversations: ai.count };
}
