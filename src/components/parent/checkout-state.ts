import type { ActionResult } from "@/server/lib/errors";

/** What the "Subscribe for this child" action returns to the checkout form. */
export type CheckoutOutcome =
  | { kind: "redirect"; url: string; paymentId: string }
  | { kind: "mobile"; instructions: string; paymentId: string; resultHref: string };

export type CheckoutFormState = ActionResult<CheckoutOutcome> | null;
export type CheckoutFormAction = (state: CheckoutFormState, formData: FormData) => Promise<CheckoutFormState>;

/**
 * Only navigate to http(s) URLs or app-relative paths (never `javascript:` or protocol-relative URLs), even though the
 * service already checked: defence in depth on the client.
 */
export function isSafeNavigation(url: string): boolean {
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
