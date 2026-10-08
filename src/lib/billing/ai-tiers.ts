/**
 * AI model tiers an entitlement can allow (§40). Dependency-free so browser code (the admin entitlements editor) can
 * import it without `./entitlements`, whose Zod schemas would add ~90 kB gzip to the page.
 */
export const AI_MODEL_TIERS = ["FAST", "STANDARD", "DEEP"] as const;
export type AiModelTier = (typeof AI_MODEL_TIERS)[number];
