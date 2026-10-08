import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard, authLinkClassName } from "@/components/auth/AuthCard";
import { ResendCodeForm, VerifyCodeForm } from "@/components/auth/CodeForms";
import { readAuthFlowCookie } from "@/server/auth/flow-cookie";
import { maskIdentifier } from "@/server/auth/identifiers";
import { resendCodeAction, verifyCodeAction } from "./actions";

export const metadata: Metadata = { title: "Enter your code", robots: { index: false, follow: false } };

/**
 * One-time-code entry for email verification and code sign-in (codes go by email). The pending flow (which address,
 * which purpose) comes from a sealed cookie; only its masked form is shown. A flow from before accounts became
 * email-based (an SMS flow) counts as expired.
 */
export default async function VerifyPage() {
  const flow = await readAuthFlowCookie();
  if (flow === null || flow.channel !== "EMAIL") redirect("/login?error=flow_expired");
  if (flow.purpose === "PASSWORD_RESET") redirect("/reset-password");

  const masked = maskIdentifier(flow.target);
  const title = flow.purpose === "LOGIN_OTP" ? "Enter your sign-in code" : "Check your email";
  const description =
    flow.purpose === "LOGIN_OTP" ? (
      <p>
        If <strong className="font-semibold text-text">{masked}</strong> has an account, we&apos;ve emailed it a 6-digit
        code. It expires in 10 minutes. Check your spam folder if it hasn&apos;t arrived.
      </p>
    ) : (
      <p>
        We emailed a 6-digit code to <strong className="font-semibold text-text">{masked}</strong>. Enter it to confirm
        it&apos;s yours. It expires in 10 minutes. Check your spam folder if it hasn&apos;t arrived.
      </p>
    );

  return (
    <AuthCard
      title={title}
      description={description}
      footer={
        <p>
          Wrong email address?{" "}
          <Link href={flow.purpose === "LOGIN_OTP" ? "/login?mode=code" : "/register"} className={authLinkClassName}>
            Start again
          </Link>
        </p>
      }
    >
      <VerifyCodeForm action={verifyCodeAction} />
      <ResendCodeForm action={resendCodeAction} sentAt={flow.sentAt} />
    </AuthCard>
  );
}
