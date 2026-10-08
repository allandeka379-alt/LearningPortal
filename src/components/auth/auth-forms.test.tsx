import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ResendCodeForm, ResetPasswordForm, VerifyCodeForm } from "./CodeForms";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import type { AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { CodeLoginForm, PasswordLoginForm } from "./LoginForms";
import { RegisterForm } from "./RegisterForm";

/**
 * Server-rendered markup checks for the auth forms (labels, autocomplete hints, required fields, hidden `next`).
 * Rendered with react-dom/server in the node environment: the server HTML is what users on slow connections see
 * first, and it must work before hydration.
 */

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const noop: AuthFormAction = async () => null;

function markupOf(node: ReactNode): string {
  return renderToStaticMarkup(<>{node}</>);
}

/** The opening tag of the element whose `id` is referenced by the `<label for>` with `labelText`. */
function controlFor(markup: string, labelText: string): string {
  const label = new RegExp(`<label[^>]*for="([^"]+)"[^>]*>(?:(?!</label>).)*${labelText}`, "s").exec(markup);
  if (!label?.[1]) throw new Error(`no label "${labelText}"`);
  const control = new RegExp(`<(input|select|textarea)[^>]*id="${label[1]}"[^>]*>`).exec(markup);
  if (!control) throw new Error(`no control for "${labelText}"`);
  return control[0];
}

describe("RegisterForm", () => {
  it("labels every control and asks students for an optional birth year", () => {
    const markup = markupOf(<RegisterForm action={noop} initialRole="STUDENT" next="/app" />);
    expect(markup).toContain("<fieldset");
    expect(markup).toMatch(/<legend[^>]*>I&#x27;m signing up as/);
    const studentRadio = /<input[^>]*type="radio"[^>]*value="STUDENT"[^>]*>/.exec(markup)?.[0] ?? "";
    expect(studentRadio).toContain('name="role"');
    expect(studentRadio).toContain('checked=""');
    expect(controlFor(markup, "First name")).toMatch(/autoComplete="given-name"|autocomplete="given-name"/i);
    // Email-based accounts (owner decision 2026-10-07): an email address confirmed by an emailed code; no phone.
    const identifier = controlFor(markup, "Email address");
    expect(identifier).toMatch(/name="identifier"/);
    expect(identifier).toMatch(/type="email"/);
    expect(identifier).toMatch(/autocomplete="email"/i);
    expect(markup).toContain("email you a 6-digit code");
    expect(markup).not.toMatch(/SMS|mobile|phone number/i);
    expect(controlFor(markup, "Password")).toMatch(/autocomplete="new-password"/i);
    expect(controlFor(markup, "Year of birth")).toMatch(/inputmode="numeric"/i);
    const terms = /<input[^>]*type="checkbox"[^>]*>/.exec(markup)?.[0] ?? "";
    expect(terms).toContain('name="acceptTerms"');
    expect(terms).toContain('required=""');
    expect(markup).toContain('href="/legal/terms"');
    expect(markup).toMatch(/<input type="hidden" name="next" value="\/app"\/>/);
  });

  it("does not ask parents or teachers for a birth year", () => {
    expect(markupOf(<RegisterForm action={noop} initialRole="PARENT" next={null} />)).not.toContain("Year of birth");
    expect(markupOf(<RegisterForm action={noop} initialRole="TEACHER" next={null} />)).not.toContain("Year of birth");
  });
});

describe("login and code forms", () => {
  it("password form: autocomplete hints, reset link, no hidden next when absent", () => {
    const markup = markupOf(<PasswordLoginForm action={noop} next={null} />);
    expect(controlFor(markup, "Email address or username")).toMatch(/autocomplete="username"/i);
    expect(markup).not.toMatch(/SMS|mobile|phone/i);
    expect(controlFor(markup, "Password")).toMatch(/autocomplete="current-password"/i);
    expect(markup).toContain('href="/forgot-password"');
    expect(markup).not.toContain('name="next"');
    expect(markup).toMatch(/<button[^>]*type="submit"/);
  });

  it("code forms use one-time-code autofill and a numeric keyboard", () => {
    const code = controlFor(markupOf(<VerifyCodeForm action={noop} />), "6-digit code");
    expect(code).toMatch(/autocomplete="one-time-code"/i);
    expect(code).toMatch(/inputmode="numeric"/i);
    const reset = markupOf(<ResetPasswordForm action={noop} />);
    expect(controlFor(reset, "New password")).toMatch(/autocomplete="new-password"/i);
    const codeLogin = markupOf(<CodeLoginForm action={noop} next="/parent" />);
    expect(codeLogin).toContain('value="/parent"');
    expect(controlFor(codeLogin, "Email address")).toMatch(/type="email"/);
    expect(codeLogin).toContain("email you a 6-digit sign-in code");
    expect(codeLogin).not.toMatch(/SMS/);
    const forgot = markupOf(<ForgotPasswordForm action={noop} />);
    expect(controlFor(forgot, "Email address")).toMatch(/autocomplete="email"/i);
    expect(forgot).not.toMatch(/SMS|mobile/i);
  });

  it("change-email form asks for the new address and the current password, never a phone", () => {
    const markup = markupOf(<ChangeEmailForm action={noop} doneHref="/app" />);
    expect(controlFor(markup, "New email address")).toMatch(/type="email"/);
    expect(controlFor(markup, "Current password")).toMatch(/autocomplete="current-password"/i);
    expect(markup).toMatch(/<input type="hidden" name="step" value="request"\/>/);
    expect(markup).not.toMatch(/SMS|phone/i);
  });

  it("resend button starts disabled during the cooldown (server render)", () => {
    expect(markupOf(<ResendCodeForm action={noop} sentAt={Date.now()} />)).toMatch(/<button[^>]*disabled=""[^>]*>.*Send a new code in 60s/s);
  });

  it("form status uses live-region roles", () => {
    expect(markupOf(<FormStatus state={{ ok: false, error: { code: "X", message: "Nope" } }} />)).toMatch(/role="alert"[^>]*>.*Nope/s);
    expect(markupOf(<FormStatus state={{ ok: true, data: { message: "Sent" } }} />)).toMatch(/role="status"[^>]*>.*Sent/s);
    expect(markupOf(<FormStatus state={null} />)).toBe("");
  });
});
