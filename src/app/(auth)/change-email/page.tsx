import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { ChangeEmailForm } from "@/components/auth/ChangeEmailForm";
import { getActor } from "@/server/auth/actor";
import { maskIdentifier } from "@/server/auth/identifiers";
import { LOGIN_PATH, postLoginPath } from "@/server/auth/redirects";
import { db } from "@/server/db";
import { changeEmailAction } from "./actions";

export const metadata: Metadata = { title: "Change your email address", robots: { index: false, follow: false } };

/**
 * Change (or add) the account email address (§33; owner decision 2026-10-07: accounts are email-based). Any signed-in
 * user; the new address is confirmed with a code emailed to it, and the old address gets a security notice.
 */
export default async function ChangeEmailPage() {
  const actor = await getActor();
  if (actor === null) redirect(`${LOGIN_PATH}?next=${encodeURIComponent("/change-email")}`);
  if (actor.passwordMustChange === true) redirect("/change-password");
  const user = await db.user.findUnique({ where: { id: actor.userId }, select: { emailNormalized: true, emailVerifiedAt: true } });
  const current = user?.emailNormalized ?? null;

  return (
    <AuthCard
      title={current ? "Change your email address" : "Add an email address"}
      description={
        <p>
          {current
            ? `Your account uses ${maskIdentifier(current)}${user?.emailVerifiedAt ? "" : " (not confirmed yet)"}. `
            : "Your account has no email address yet. With one you can sign in with a code and reset your own password. "}
          We never show your email to other users.
        </p>
      }
    >
      <ChangeEmailForm action={changeEmailAction} doneHref={postLoginPath(actor, null)} />
    </AuthCard>
  );
}
