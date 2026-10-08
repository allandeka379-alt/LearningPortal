import { buttonStyles } from "@/components/ui/button-styles";

export interface GoogleSignInButtonProps {
  /** Validated post-login path. */
  next?: string | null;
  /** Role for a NEW account created by this sign-in (sign-up page); existing accounts keep theirs. */
  role?: "STUDENT" | "PARENT" | "TEACHER";
  label?: string;
}

/**
 * "Continue with Google". A plain GET link (not a form): the CSP's `form-action 'self'` would block a form POST that
 * redirects to Google, and a link works without JavaScript. Render only when Google login is configured
 * (`isGoogleLoginEnabled()`).
 */
export function GoogleSignInButton({ next, role, label = "Continue with Google" }: GoogleSignInButtonProps) {
  const params = new URLSearchParams();
  if (next) params.set("next", next);
  if (role && role !== "STUDENT") params.set("role", role);
  const query = params.toString();
  return (
    <a
      href={`/api/auth/google/start${query ? `?${query}` : ""}`}
      className={buttonStyles({ variant: "outline", size: "lg", fullWidth: true })}
    >
      <GoogleMark />
      {label}
    </a>
  );
}

/** Google's "G" mark (brand colours are Google's, required by its sign-in branding guidelines). */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="size-5 shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
