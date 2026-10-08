"use server";

import { revalidatePath } from "next/cache";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { fail, normalizeError, ok, type ActionResult } from "@/server/lib/errors";
import { createShareableResult, renewShareLink, revokeShareableResult, type CreatedShare } from "@/server/sharing/service";
import type { ShareLinkData } from "./types";

/**
 * Share-link Server Actions (§46), used by the share buttons on exam results, achievements and the streak card.
 * Thin: re-check the student, call the sharing service (which validates and authorises), map errors to ActionResult.
 * Kept next to the share components so every page can hand them to `ShareButton` (like admin/step-up-actions).
 */

function toData(share: CreatedShare): ShareLinkData {
  return {
    shareId: share.shareId,
    url: share.url,
    headline: share.headline,
    message: share.message,
    whatsappHref: share.whatsappHref,
    expiresAt: share.expiresAt.toISOString(),
  };
}

function failure(error: unknown, operation: string) {
  const normalized = normalizeError(error, { operation });
  return fail(normalized.code, normalized.message, normalized.fieldErrors);
}

/** Creates a share link for one of the student's own results. */
export async function createShareAction(request: unknown): Promise<ActionResult<ShareLinkData>> {
  try {
    const actor = await requireOnboardedStudentForAction();
    const share = await createShareableResult(actor, request);
    revalidatePath("/app/achievements");
    return ok(toData(share));
  } catch (error) {
    return failure(error, "share.create");
  }
}

/** New link for an existing share ("copy the link again"); the previous link stops working. */
export async function renewShareAction(shareId: unknown): Promise<ActionResult<ShareLinkData>> {
  try {
    const actor = await requireOnboardedStudentForAction();
    return ok(toData(await renewShareLink(actor, typeof shareId === "string" ? shareId : "")));
  } catch (error) {
    return failure(error, "share.renew");
  }
}

/** Turns a share link off. */
export async function revokeShareAction(shareId: unknown): Promise<ActionResult<{ message: string }>> {
  try {
    const actor = await requireOnboardedStudentForAction();
    const { revoked } = await revokeShareableResult(actor, typeof shareId === "string" ? shareId : "");
    revalidatePath("/app/achievements");
    return ok({ message: revoked ? "Link turned off. It no longer opens." : "This link was already off." });
  } catch (error) {
    return failure(error, "share.revoke");
  }
}
