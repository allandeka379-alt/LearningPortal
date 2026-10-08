import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, authLinkClassName } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { requestPasswordResetAction } from "./actions";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false, follow: false } };

/** Forgot password, step 1 (§33): a reset code is sent by email. School username accounts reset through their school. */
export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Tell us the email address on your account and we'll email you a code to set a new password."
      footer={
        <>
          <p>
            Remembered it?{" "}
            <Link href="/login" className={authLinkClassName}>
              Sign in
            </Link>
          </p>
          <p>Signed up with a username from your school? Ask your school administrator to reset your password.</p>
        </>
      }
    >
      <ForgotPasswordForm action={requestPasswordResetAction} />
    </AuthCard>
  );
}
