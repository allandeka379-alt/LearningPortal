import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard, authLinkClassName } from "@/components/auth/AuthCard";
import { ResendCodeForm, ResetPasswordForm } from "@/components/auth/CodeForms";
import { readAuthFlowCookie } from "@/server/auth/flow-cookie";
import { maskIdentifier } from "@/server/auth/identifiers";
import { resendCodeAction } from "../verify/actions";
import { resetPasswordAction } from "./actions";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false, follow: false } };

/** Forgot password, step 2 (§33): code + new password. Every other session is signed out. */
export default async function ResetPasswordPage() {
  const flow = await readAuthFlowCookie();
  if (flow === null || flow.purpose !== "PASSWORD_RESET" || flow.channel !== "EMAIL") redirect("/forgot-password");

  return (
    <AuthCard
      title="Choose a new password"
      description={
        <p>
          If <strong className="font-semibold text-text">{maskIdentifier(flow.target)}</strong> has an account,
          we&apos;ve emailed it a 6-digit code. It expires in 10 minutes. Setting a new password signs you out on every
          other device.
        </p>
      }
      footer={
        <p>
          Wrong email address?{" "}
          <Link href="/forgot-password" className={authLinkClassName}>
            Start again
          </Link>
        </p>
      }
    >
      <ResetPasswordForm action={resetPasswordAction} />
      <ResendCodeForm action={resendCodeAction} sentAt={flow.sentAt} />
    </AuthCard>
  );
}
