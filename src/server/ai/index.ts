import "server-only";
import { isFeatureEnabled } from "@/server/features";
import { enqueueBudgetAlert } from "./budget-alert";
import { getAnthropicTransport } from "./client";
import { loadAiConfig } from "./config";
import { createAiGateway, type AiGateway } from "./gateway";
import { DbUsageMeter } from "./meter-db";
import { DbResponseCache } from "./response-cache-db";

/**
 * Default production wiring of the AI gateway: Setting-backed config (60 s cache), Postgres metering and response
 * cache, the SDK transport resolved at call time (null without ANTHROPIC_API_KEY -> "AI is not configured") and the
 * once-a-day SUPER_ADMIN alert when the daily budget refuses a call (./budget-alert.ts).
 * Services (tutor, solver, WhatsApp, marking jobs) take an `AiGateway` parameter and default to this one, so tests can
 * inject `createAiGateway({ transport: fake, ... })`.
 */

let gateway: AiGateway | null = null;

export function getAiGateway(): AiGateway {
  gateway ??= createAiGateway({
    // Owner decision 2026-10-07: `features.ai` (default off) gates every model call first (ARCHITECTURE §3.14).
    featureEnabled: () => isFeatureEnabled("ai"),
    transport: () => getAnthropicTransport(),
    config: () => loadAiConfig(),
    meter: new DbUsageMeter(),
    responseCache: new DbResponseCache(),
    onBudgetExceeded: (event) => enqueueBudgetAlert(event),
  });
  return gateway;
}

export { AI_NOT_CONFIGURED_MESSAGE, AI_SWITCHED_OFF_MESSAGE, createAiGateway, isAiNotConfigured, isAiOff, isAiSwitchedOff } from "./gateway";
export type {
  AiBudgetExceededEvent,
  AiCallInput,
  AiCallMeta,
  AiGateway,
  AiGatewayDeps,
  AiStreamInput,
  AiStructuredInput,
  AiStructuredResult,
  AiTextResult,
} from "./gateway";
