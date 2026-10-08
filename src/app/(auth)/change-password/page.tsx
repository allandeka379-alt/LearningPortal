import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getActor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { LOGIN_PATH, safeNextPath } from "@/server/auth/redirects";
import { firstParam, type PageSearchParams } from "../_lib/search-params";
import { changePasswordAction } from "./actions";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false, follow: false } };

/**
 * Change password (§33, §23 school-provisioned accounts). Every guarded page sends a user here while their password is
 * one their school set (`passwordMustChange`: roster import or a school-admin reset); other signed-in users may use it
 * to change their password. Saving signs out every other device.
 */
export default async function ChangePasswordPage({ searchParams }: { searchParams: PageSearchParams }) {
  const actor = await getActor();
  if (actor === null) redirect(LOGIN_PATH);
  const next = safeNextPath(firstParam((await searchParams).next));
  const forced = actor.passwordMustChange === true;
  // School-provisioned accounts accept the Terms of Use here, at their first own sign-in.
  const askTerms = forced && (await db.profile.findUnique({ where: { userId: actor.userId }, select: { termsAcceptedAt: true } }))?.termsAcceptedAt === null;

  return (
    <AuthCard
      title={forced ? "Choose your own password" : "Change your password"}
      description={
        forced ? (
          <p>
            Your school set the password you signed in with. Choose a new one that only you know before you continue.
            Saving it signs you out on every other device.
          </p>
        ) : (
          <p>Saving a new password signs you out on every other device.</p>
        )
      }
      footer={forced ? <LogoutButton variant="ghost" fullWidth>Not you? Sign out</LogoutButton> : undefined}
    >
      <ChangePasswordForm action={changePasswordAction} next={next} schoolSet={forced} askTerms={askTerms} />
    </AuthCard>
  );
}
