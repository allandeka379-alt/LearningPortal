import type { BadgeTone } from "@/components/ui/Badge";
import type { PromoState } from "@/server/cms/commerce/schemas";

/** Badge copy for a promo code's state (UI copy; pure). */
export const PROMO_STATE_META: Readonly<Record<PromoState, { label: string; tone: BadgeTone; outline?: boolean }>> = {
  active: { label: "Active", tone: "success" },
  scheduled: { label: "Scheduled", tone: "info" },
  expired: { label: "Expired", tone: "neutral", outline: true },
  inactive: { label: "Inactive", tone: "neutral", outline: true },
};
