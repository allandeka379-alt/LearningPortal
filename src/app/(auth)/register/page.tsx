import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard, AuthDivider, authLinkClassName } from "@/components/auth/AuthCard";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { RegisterForm, type RegisterRole } from "@/components/auth/RegisterForm";
import { APP_NAME } from "@/lib/config";
import { getActor } from "@/server/auth/actor";
import { isGoogleLoginEnabled } from "@/server/auth/google";
import { postLoginPath, safeNextPath } from "@/server/auth/redirects";
import { firstParam, type PageSearchParams } from "../_lib/search-params";
import { registerAction } from "./actions";

export const metadata: Metadata = { title: "Create an account" };

function roleParam(value: string | undefined): RegisterRole {
  const upper = value?.toUpperCase();
  return upper === "PARENT" || upper === "TEACHER" ? upper : "STUDENT";
}

/**
 * Self-registration for students (default), parents and teachers (§33). Staff and school admins are invited.
 * Email-based (owner decision 2026-10-07): an email address confirmed with a code sent by email.
 */
export default async function RegisterPage({ searchParams }: { searchParams: PageSearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const actor = await getActor();
  if (actor !== null) redirect(postLoginPath(actor, next));
  const role = roleParam(firstParam(params.role));
  const loginHref = next ? `/login?next=${encodeURIComponent(next)}` : "/login";

  return (
    <AuthCard
      title="Create your account"
      description={`Join ${APP_NAME}. It takes about a minute.`}
      footer={
        <p>
          Already have an account?{" "}
          <Link href={loginHref} className={authLinkClassName}>
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm action={registerAction} initialRole={role} next={next} />
      {isGoogleLoginEnabled() && (
        <>
          <AuthDivider />
          <GoogleSignInButton next={next} role={role} label="Sign up with Google" />
          <p className="text-sm text-muted">
            By continuing with Google you agree to the{" "}
            <Link href="/legal/terms" className={authLinkClassName}>
              Terms of Use
            </Link>{" "}
            and the{" "}
            <Link href="/legal/privacy" className={authLinkClassName}>
              Privacy Notice
            </Link>
            .
          </p>
        </>
      )}
    </AuthCard>
  );
}
