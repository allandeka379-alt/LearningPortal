import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard, AuthDivider, authLinkClassName } from "@/components/auth/AuthCard";
import { AUTH_PAGE_ERRORS } from "@/components/auth/form-state";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { CodeLoginForm, PasswordLoginForm } from "@/components/auth/LoginForms";
import { Alert } from "@/components/ui/Alert";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/cn";
import { getActor } from "@/server/auth/actor";
import { isGoogleLoginEnabled } from "@/server/auth/google";
import { postLoginPath, safeNextPath } from "@/server/auth/redirects";
import { firstParam, type PageSearchParams } from "../_lib/search-params";
import { loginAction, requestLoginCodeAction } from "./actions";

export const metadata: Metadata = { title: "Sign in" };

/**
 * Sign in with a password or a one-time code (§33). Signed-in visitors go straight to their area. Accounts are
 * email-based (owner decision 2026-10-07): email or school username + password, or a code sent by email.
 */
export default async function LoginPage({ searchParams }: { searchParams: PageSearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const actor = await getActor();
  if (actor !== null) redirect(postLoginPath(actor, next));

  const mode = firstParam(params.mode) === "code" ? "code" : "password";
  const errorCode = firstParam(params.error);
  const pageError = errorCode ? AUTH_PAGE_ERRORS[errorCode] : undefined;
  const nextQuery = next ? `&next=${encodeURIComponent(next)}` : "";
  const registerHref = next ? `/register?next=${encodeURIComponent(next)}` : "/register";

  return (
    <AuthCard
      title={`Sign in to ${APP_NAME}`}
      description="Welcome back. Pick up where you left off."
      footer={
        <p>
          New here?{" "}
          <Link href={registerHref} className={authLinkClassName}>
            Create a free account
          </Link>
        </p>
      }
    >
      {pageError && (
        <Alert tone="danger" role="alert">
          {pageError}
        </Alert>
      )}
      <nav aria-label="Sign-in method" className="grid grid-cols-2 gap-1 rounded-control bg-subtle p-1">
        {(
          [
            { key: "password", label: "Password", href: `/login?mode=password${nextQuery}` },
            { key: "code", label: "Email me a code", href: `/login?mode=code${nextQuery}` },
          ] as const
        ).map((item) => (
          <Link
            key={item.key}
            href={item.href}
            replace
            scroll={false}
            aria-current={mode === item.key ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center justify-center rounded-control px-3 text-center text-sm font-semibold transition-colors",
              mode === item.key ? "bg-surface text-text shadow-xs" : "text-muted hover:text-text",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {mode === "password" ? (
        <PasswordLoginForm action={loginAction} next={next} />
      ) : (
        <CodeLoginForm action={requestLoginCodeAction} next={next} />
      )}
      {isGoogleLoginEnabled() && (
        <>
          <AuthDivider />
          <GoogleSignInButton next={next} />
        </>
      )}
    </AuthCard>
  );
}
