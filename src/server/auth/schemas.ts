import { z } from "zod";

/**
 * Input schemas for the authentication flows (Server Actions, `/api/v1/auth/*`). Pure Zod: validation messages are
 * user-facing. Field names match the form controls so `fieldErrors` map one-to-one onto the forms.
 *
 * Identifiers and passwords are only shape-checked here; ./flows normalises identifiers (./identifiers) and applies
 * the password policy with the account's own email (./password-policy). Accounts are email-based (owner decision
 * 2026-10-07): a phone number is never a sign-in identifier.
 */

/** Roles a person may choose at self-registration. School admins and staff are invited, never self-registered. */
export const SELF_SERVICE_ROLES = ["STUDENT", "PARENT", "TEACHER"] as const;
export type SelfServiceRole = (typeof SELF_SERVICE_ROLES)[number];

/**
 * Purposes a pending code flow can have on the web. New flows are always email (`EMAIL_VERIFY`, `LOGIN_OTP`,
 * `PASSWORD_RESET`); `PHONE_VERIFY` / `SMS` still parse so a flow sealed before accounts became email-based is
 * reported as expired instead of failing to read.
 */
export const AUTH_FLOW_PURPOSES = ["EMAIL_VERIFY", "PHONE_VERIFY", "LOGIN_OTP", "PASSWORD_RESET"] as const;
export type AuthFlowPurpose = (typeof AUTH_FLOW_PURPOSES)[number];

/** Upper bound for raw password input (the policy allows 128 code points; this only bounds request size). */
const MAX_PASSWORD_INPUT = 1024;

const identifierField = (message: string) => z.string({ error: message }).trim().min(1, message).max(254, message);

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Use ${max} characters or fewer.`)
    .optional()
    .transform((value) => (value ? value : null));

const nextField = z.string().max(2048).optional().nullable();

/** The current calendar year (birth-year bounds). */
function currentYear(): number {
  return new Date().getUTCFullYear();
}

export const registerSchema = z.object({
  role: z.enum(SELF_SERVICE_ROLES, { error: "Choose who you are signing up as." }).default("STUDENT"),
  firstName: z
    .string({ error: "Enter your first name." })
    .trim()
    .min(1, "Enter your first name.")
    .max(100, "Use 100 characters or fewer."),
  lastName: optionalText(100),
  identifier: identifierField("Enter your email address."),
  password: z.string({ error: "Choose a password." }).min(1, "Choose a password.").max(MAX_PASSWORD_INPUT),
  /** Students only, optional (data minimisation: never a full date of birth, ARCHITECTURE §5.12). */
  birthYear: z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? undefined : value),
    z.coerce
      .number({ error: "Enter a valid year of birth." })
      .int("Enter a valid year of birth.")
      .refine((year) => year >= currentYear() - 100 && year <= currentYear() - 5, "Enter a valid year of birth.")
      .optional(),
  ),
  acceptTerms: z.literal(true, { error: "Please accept the Terms of Use and Privacy Notice to continue." }),
  next: nextField,
  /** Invite code from the referral landing cookie (/r/[code], §46); attribution never blocks registration. */
  referralCode: z.string().max(40).optional(),
});
export type RegisterInput = z.input<typeof registerSchema>;

export const passwordLoginSchema = z.object({
  identifier: identifierField("Enter your email address or username."),
  password: z.string({ error: "Enter your password." }).min(1, "Enter your password.").max(MAX_PASSWORD_INPUT),
  next: nextField,
});
export type PasswordLoginInput = z.input<typeof passwordLoginSchema>;

export const otpRequestSchema = z.object({
  identifier: identifierField("Enter the email address on your account."),
  next: nextField,
});
export type OtpRequestInput = z.input<typeof otpRequestSchema>;

export const codeSchema = z
  .string({ error: "Enter the 6-digit code." })
  .transform((value) => value.replace(/\s+/g, ""))
  .pipe(z.string().regex(/^\d{6}$/, "Enter the 6-digit code."));

export const verifyCodeSchema = z.object({ code: codeSchema });

export const resetPasswordSchema = z
  .object({
    code: codeSchema,
    password: z.string({ error: "Choose a new password." }).min(1, "Choose a new password.").max(MAX_PASSWORD_INPUT),
    confirmPassword: z.string({ error: "Type the new password again." }).max(MAX_PASSWORD_INPUT),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    error: "The two passwords don't match.",
  });

/** Step-up re-authentication (ARCHITECTURE §5.1): the current password again. */
export const reauthenticateSchema = z.object({
  password: z.string({ error: "Enter your password." }).min(1, "Enter your password.").max(MAX_PASSWORD_INPUT),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ error: "Enter your current password." }).min(1, "Enter your current password.").max(MAX_PASSWORD_INPUT),
    password: z.string({ error: "Choose a new password." }).min(1, "Choose a new password.").max(MAX_PASSWORD_INPUT),
    confirmPassword: z.string().max(MAX_PASSWORD_INPUT),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    error: "The two passwords don't match.",
  });

/** A pending one-time-code step (kept sealed in the auth-flow cookie on the web; held by the client on the API). */
export const authFlowSchema = z.object({
  purpose: z.enum(AUTH_FLOW_PURPOSES),
  channel: z.enum(["EMAIL", "SMS"]),
  /** Normalised email address. Never put it in a URL or a log. */
  target: z.string().min(3).max(254),
  /** Validated post-login path, if any. */
  next: z.string().max(2048).nullable(),
  /** When the last code was (or would have been) sent, epoch ms: drives the resend countdown. */
  sentAt: z.number().int().nonnegative(),
  /**
   * Email verification flows: proof that the holder of this flow chose (registration) or entered (password
   * sign-in) the account's CURRENT password, as a keyed hash of the user id and password hash (./flows). Verifying a
   * never-verified account through a flow without a matching binding discards that password. Always 64 hex chars
   * (random when no password was set), so flows look alike whether or not an account exists.
   */
  binding: z
    .string()
    .regex(/^[0-9a-f]{64}$/)
    .optional(),
});
export type AuthFlow = z.output<typeof authFlowSchema>;

/** Change email, step 1 (signed in): the new address and the current password. */
export const emailChangeRequestSchema = z.object({
  email: identifierField("Enter your new email address."),
  currentPassword: z.string({ error: "Enter your current password." }).min(1, "Enter your current password.").max(MAX_PASSWORD_INPUT),
});

/** Change email, step 2: the address from step 1 and the code emailed to it. */
export const emailChangeConfirmSchema = z.object({
  email: identifierField("Your code request has expired. Please start again."),
  code: codeSchema,
});
