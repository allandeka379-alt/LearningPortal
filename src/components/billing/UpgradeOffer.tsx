"use client";

import Link from "next/link";
import { createContext, useContext, type ReactNode } from "react";
import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { FALLBACK_UPGRADE_OFFER, GENERAL_UPGRADE_PATHS, OTHER_UPGRADE_LABEL, type UpgradeOffer } from "@/lib/billing/offer";

/**
 * Upgrade prompts (§31; owner decision 2026-10-07): every "not in your plan" prompt in the student area says
 * "Unlock everything for US$1" and goes straight to the one-off checkout. The label and link are built on the server
 * from the DATABASE price (`getUpgradeOffer`, src/server/billing/offer.ts) and provided once by the student layout, so
 * no prompt ever hard-codes an amount and client components need no data fetching.
 *
 * Outside the provider (or when nothing is on sale) the prompt falls back to "Get full access" on the in-app unlock page
 * (no free tier, 2026-10-12). A prompt that points somewhere else on purpose (e.g. `/schools` for school-only tools)
 * keeps its own link with a neutral label.
 */

const UpgradeOfferContext = createContext<UpgradeOffer | null>(null);

/** Provides the student area's upgrade offer (rendered by the /app layout). */
export function UpgradeOfferProvider({ offer, children }: { offer: UpgradeOffer | null; children: ReactNode }) {
  return <UpgradeOfferContext value={offer}>{children}</UpgradeOfferContext>;
}

/**
 * The offer an upgrade prompt shows. `fallbackHref` is the prompt's own upgrade path: the general one (`UPGRADE_PATH`,
 * /app/unlock, or the older "/pricing") is replaced by the one-off offer; any other path is kept with a neutral label.
 */
export function useUpgradeOffer(fallbackHref?: string): UpgradeOffer {
  const offer = useContext(UpgradeOfferContext);
  if (fallbackHref !== undefined && !GENERAL_UPGRADE_PATHS.includes(fallbackHref)) return { href: fallbackHref, label: OTHER_UPGRADE_LABEL };
  return offer ?? FALLBACK_UPGRADE_OFFER;
}

export interface UpgradeButtonProps {
  /** The prompt's own upgrade path (default: the general one, which becomes the one-off checkout). */
  fallbackHref?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** "Unlock everything for US$1" (or "Get full access") as a button link. */
export function UpgradeButton({ fallbackHref, variant, size, className }: UpgradeButtonProps) {
  const offer = useUpgradeOffer(fallbackHref);
  return (
    <ButtonLink href={offer.href} {...(variant ? { variant } : {})} {...(size ? { size } : {})} {...(className ? { className } : {})}>
      {offer.label}
    </ButtonLink>
  );
}

/** The same prompt as an inline text link. */
export function UpgradeLink({ fallbackHref, className }: { fallbackHref?: string; className?: string }) {
  const offer = useUpgradeOffer(fallbackHref);
  return (
    <Link href={offer.href} className={className}>
      {offer.label}
    </Link>
  );
}
