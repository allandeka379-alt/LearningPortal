import { z } from "zod";
import { AiFeature } from "@/generated/prisma/client";
import type { AiCallStatus, AiStructuredFailure } from "@/lib/ai/types";
import { AI_MODEL_TIERS, type AiModelTier } from "@/lib/billing/entitlements";
import { DEFAULT_TIMEZONE, isValidTimeZone, localDateString, type LocalDate } from "@/lib/dates";
import { AppError, isAppError } from "@/server/lib/errors";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { configuredEffort, isFeatureEnabled, resolveRoute, type AiConfig, type AiRouteConfig } from "./config";
import type { QuotaReservation, UsageMeter } from "./meter";
import { addUsage, costMicros, resolveModelPrice, ZERO_USAGE, type PriceTable, type TokenUsage } from "./pricing";
import {
  base64DecodedBytes,
  buildWireRequest,
  IMAGE_MEDIA_TYPES,
  type ChatMessageInput,
  type ImageInput,
  type WireRequest,
} from "./request";
import { responseCacheKey, type ResponseCacheStore } from "./response-cache";
import {
  finalText,
  mapProviderError,
  servedByFallback,
  type AnthropicTransport,
  type TransportMessage,
} from "./transport";

/**
 * AI gateway (ARCHITECTURE §6.3): the one engine every AI feature calls (tutor, solver, WhatsApp, marking, intent,
 * content generation). Dependency-injected so it is fully testable with a fake transport.
 *
 * Pipeline per call:
 *  -1. platform feature flag     -> Setting `features.ai` (owner decision 2026-10-07, ARCHITECTURE §3.14): while it is
 *                                   off EVERY call is refused with AI_UNAVAILABLE reason "feature_off" before anything
 *                                   else (no transport, no quota reservation, no metering, no provider call)
 *   0. no API key                -> AppError AI_UNAVAILABLE "AI is not configured" (never fabricated output)
 *   1. validate input            -> VALIDATION / BAD_REQUEST (message length, image count/size/type, no prefill)
 *   2. kill switch               -> Setting ai.enabled (+ per-feature switch)
 *   3. global daily budget       -> sum of AiSpendDaily shards for the Harare day vs ai.budget (admin priority exempt);
 *                                   a refusal calls `onBudgetExceeded` (SUPER_ADMIN alert, ./budget-alert.ts)
 *   4. quota reservation         -> AiUsageDaily.reservedRequests vs the caller's plan limit (atomic)
 *   5. route + tier              -> ai.routing route, tier capped by the caller's entitlement (aiMaxModelTier)
 *   6. request builder           -> per model family (models.ts / request.ts)
 *   7. response cache            -> cacheable routes, generic questions only (response-cache.ts)
 *   8. call                      -> transport.create / stream / parse
 *   9. refusal / truncation      -> status REFUSED (text discarded) / TRUNCATED
 *  10. metering                  -> AiUsageDaily settle + tokens + cost, AiSpendDaily shard (meter.ts)
 *  11. structured log            -> ids, route, model, tokens, cost, latency; NEVER prompt or answer text
 * A failure before anything is billed releases the reservation; a completed, refused, truncated or aborted call is
 * metered (tokens were spent).
 *
 * The gateway does not persist conversations: callers store the returned text and metering on AiMessage through
 * `conversations.ts` (RLS-scoped).
 */

export const AI_NOT_CONFIGURED_MESSAGE = "AI is not configured";

/** True when `error` is the "no API key on this server" failure (callers switch to e.g. self-assessment). */
export function isAiNotConfigured(error: unknown): boolean {
  return isAppError(error) && error.code === "AI_UNAVAILABLE" && error.details?.reason === "not_configured";
}

export const AI_SWITCHED_OFF_MESSAGE = "AI features are switched off.";

/** True when `error` is the platform feature flag refusal (`features.ai` off): permanent until an admin switches AI on. */
export function isAiSwitchedOff(error: unknown): boolean {
  return isAppError(error) && error.code === "AI_UNAVAILABLE" && error.details?.reason === "feature_off";
}

/** No model can be called on this server right now for a lasting reason (no key, or AI switched off by the flag). */
export function isAiOff(error: unknown): boolean {
  return isAiNotConfigured(error) || isAiSwitchedOff(error);
}

export interface AiCallInput {
  /** Route key in Setting `ai.routing.routes` (e.g. "tutor", "solver", "intent", "marking"). */
  route: string;
  /** Metering / quota bucket. */
  feature: AiFeature;
  /** Acting user (ids only ever reach logs). */
  userId: string;
  /** Highest tier the caller's plan allows (`Entitlements.aiMaxModelTier`). */
  maxTier: AiModelTier;
  /**
   * Reserve quota against the caller's daily plan limit (`aiMessagesPerDay` / `aiSolverPerDay`; null = unlimited).
   * Omit for sub-calls of an already-reserved turn (intent classification) and system work (marking): those are
   * metered (tokens, cost, spend) but do not count as requests.
   */
  quota?: { dailyLimit: number | null; cost?: number } | undefined;
  /** The user's IANA time zone (Profile.timezone) for the quota day; default Africa/Harare. */
  timeZone?: string | undefined;
  /**
   * `stable`: byte-identical blocks (policy prompt, then the frozen student context), each cached.
   * `volatile`: per-turn guidance, delivered after every cache breakpoint.
   */
  system: { stable: string | readonly string[]; volatile?: string | undefined };
  /** Conversation in order; the last message must be the user's. */
  messages: readonly ChatMessageInput[];
  /** Base64 images for the final user message (solver photos). */
  images?: readonly ImageInput[] | undefined;
  /**
   * Untrusted reference material written by someone other than the student or the platform (a teacher's question as
   * a `<question_context>` block): sent as its own block at the start of the first user message, never in the system
   * prompt (request.ts). Not counted against the per-message input cap; a call with a reference is never cached.
   */
  reference?: string | undefined;
  /**
   * Response-cache key material for cacheable routes (the question itself is taken from the message). Only pass it for
   * generic questions with no student context.
   */
  cacheKey?: { level: string; subjectId?: string | null | undefined } | undefined;
  /** Prompt version stored with metering and part of the response-cache key (ARCHITECTURE §6.9). */
  promptVersion?: string | undefined;
  /** "admin" work (content generation) is exempt from the platform budget guard; it is still metered. */
  priority?: "normal" | "admin" | undefined;
  signal?: AbortSignal | undefined;
}

export interface AiStreamInput extends AiCallInput {
  onText: (delta: string) => void;
  /** A refusal fallback model took over mid-stream: discard the text received so far. */
  onRestart?: (() => void) | undefined;
}

export interface AiStructuredInput<T> extends AiCallInput {
  outputSchema: z.ZodType<T>;
}

export interface AiCallMeta {
  route: string;
  feature: AiFeature;
  tier: AiModelTier;
  /** Model the request was routed to. */
  model: string;
  /** Model that produced the returned message (differs when a refusal fallback served it). */
  servedByModel: string;
  servedByFallback: boolean;
  promptVersion: string | null;
  usage: TokenUsage;
  costMicros: number;
  latencyMs: number;
  stopReason: string | null;
  refusalCategory: string | null;
  cached: boolean;
  cacheEntryId: string | null;
}

export interface AiTextResult extends AiCallMeta {
  status: AiCallStatus;
  /** Markdown answer. Empty when REFUSED (the UI shows its own supportive message). */
  text: string;
}

export type AiStructuredResult<T> =
  | { ok: true; data: T; meta: AiCallMeta }
  | { ok: false; reason: AiStructuredFailure; meta: AiCallMeta };

export interface AiGateway {
  complete(input: AiCallInput): Promise<AiTextResult>;
  stream(input: AiStreamInput): Promise<AiTextResult>;
  structured<T>(input: AiStructuredInput<T>): Promise<AiStructuredResult<T>>;
  /** Current AI config (limits, marking threshold) for services that need it next to their calls. */
  getConfig(): Promise<AiConfig>;
}

export interface AiGatewayDeps {
  /**
   * Platform feature flag (`features.ai`). When it resolves false (or throws: fail closed) every call is refused with
   * AI_UNAVAILABLE reason "feature_off" before the transport, quota or meter is touched. Omitted = no flag (test
   * gateways); the production wiring (./index.ts) always passes it.
   */
  featureEnabled?: (() => boolean | Promise<boolean>) | undefined;
  /** `null` (or a provider returning null) = no API key: every call fails with "AI is not configured". */
  transport: AnthropicTransport | null | (() => AnthropicTransport | null);
  config: AiConfig | (() => Promise<AiConfig>);
  meter: UsageMeter;
  responseCache?: ResponseCacheStore | null | undefined;
  clock?: (() => Date) | undefined;
  logger?: Logger | undefined;
  /**
   * Called (fire-and-forget) whenever the daily budget refuses a call. The production wiring raises the once-a-day
   * SUPER_ADMIN alert; it must return quickly and never throw (errors are logged and swallowed here).
   */
  onBudgetExceeded?: ((event: AiBudgetExceededEvent) => unknown) | undefined;
}

/** The platform day's spend reached the `ai.budget` ceiling. Amounts in USD micro-dollars. */
export interface AiBudgetExceededEvent {
  platformDate: LocalDate;
  spentMicros: number;
  ceilingMicros: number;
}

// ---------------------------------------------------------------------------------------------------------------
// Input validation
// ---------------------------------------------------------------------------------------------------------------

const callInputSchema = z.object({
  route: z.string().min(1).max(64),
  feature: z.enum(AiFeature),
  userId: z.uuid(),
  maxTier: z.enum(AI_MODEL_TIERS),
  quota: z
    .object({ dailyLimit: z.number().int().min(0).nullable(), cost: z.number().int().min(1).max(10).default(1) })
    .optional(),
  timeZone: z.string().max(64).optional(),
  system: z.object({
    stable: z.union([z.string(), z.array(z.string()).max(4)]),
    volatile: z.string().max(4_000).optional(),
  }),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(200_000) }))
    .min(1)
    .max(200),
  images: z
    .array(z.object({ mediaType: z.enum(IMAGE_MEDIA_TYPES), data: z.string().regex(/^[A-Za-z0-9+/]+={0,2}$/) }))
    .max(4)
    .optional(),
  reference: z.string().max(8_000).optional(),
  cacheKey: z.object({ level: z.string().min(1).max(64), subjectId: z.uuid().nullable().optional() }).optional(),
  promptVersion: z.string().min(1).max(32).optional(),
  priority: z.enum(["normal", "admin"]).optional(),
});

type ParsedCallInput = z.output<typeof callInputSchema>;

/** Features whose last user message is text the student typed (the per-message input cap applies to them). */
const STUDENT_TYPED_FEATURES: ReadonlySet<AiFeature> = new Set<AiFeature>(["TUTOR", "SOLVER", "WHATSAPP"]);

function validateInput(raw: AiCallInput, config: AiConfig): ParsedCallInput {
  // Unknown keys (signal, callbacks) are stripped by the object schema.
  const parsed = callInputSchema.safeParse(raw);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "The AI request is invalid.");
  const input = parsed.data;

  const last = input.messages.at(-1);
  if (last?.role !== "user") {
    throw new AppError("BAD_REQUEST", "The AI request is invalid.", { details: { reason: "last message not user" } });
  }
  const { limits } = config;
  // The per-message cap is for what a STUDENT types (quota-reserved tutor / solver / WhatsApp calls). Prompts built by
  // services (marking, which reserves its own per-user units, intent sub-calls, content generation) carry their own caps.
  if (input.quota && STUDENT_TYPED_FEATURES.has(input.feature) && last.content.length > limits.maxInputCharsPerMessage) {
    throw AppError.validation(
      { message: [`Please keep your message under ${limits.maxInputCharsPerMessage} characters.`] },
      "Your message is too long.",
    );
  }
  const images = input.images ?? [];
  if (images.length > limits.maxImagesPerMessage) {
    throw AppError.validation(
      { images: [`You can attach up to ${limits.maxImagesPerMessage} image(s) per message.`] },
      "Too many images.",
    );
  }
  if (images.some((image) => base64DecodedBytes(image.data) > limits.maxImageBytes)) {
    throw AppError.validation({ images: ["This image is too large. Please upload a smaller photo."] }, "Image too large.");
  }
  return input;
}

// ---------------------------------------------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------------------------------------------

const TIER_RANK: Readonly<Record<AiModelTier, number>> = { FAST: 0, STANDARD: 1, DEEP: 2 };

/** The route's tier, lowered to the caller's entitlement when it is above it. */
export function capTier(requested: AiModelTier, maxTier: AiModelTier): AiModelTier {
  return TIER_RANK[requested] <= TIER_RANK[maxTier] ? requested : maxTier;
}

export interface MeteredUsage {
  usage: TokenUsage;
  costMicros: number;
  /** Models billed at the conservative unknown-model price (should be added to the pricing table). */
  unpricedModels: string[];
}

/**
 * Tokens and cost of a response. When the API reports per-attempt `usage.iterations` (server-side refusal fallback),
 * those are the billing source of truth (top-level usage covers only the attempt that produced the message) and
 * each attempt is priced at its own model's rate.
 */
export function meterMessage(message: TransportMessage, requestedModel: string, pricing: PriceTable): MeteredUsage {
  const fallbackModel = message.model || requestedModel;
  const entries = (message.usage.iterations ?? [])
    .filter((entry) => typeof entry.input_tokens === "number" || typeof entry.output_tokens === "number")
    .map((entry) => ({
      model: entry.model ?? fallbackModel,
      usage: {
        inputTokens: entry.input_tokens ?? 0,
        outputTokens: entry.output_tokens ?? 0,
        cacheReadTokens: entry.cache_read_input_tokens ?? 0,
        cacheWriteTokens: entry.cache_creation_input_tokens ?? 0,
      },
    }));
  if (entries.length === 0) {
    entries.push({
      model: fallbackModel,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        cacheReadTokens: message.usage.cache_read_input_tokens ?? 0,
        cacheWriteTokens: message.usage.cache_creation_input_tokens ?? 0,
      },
    });
  }
  let usage: TokenUsage = { ...ZERO_USAGE };
  let cost = 0;
  const unpriced = new Set<string>();
  for (const entry of entries) {
    usage = addUsage(usage, entry.usage);
    cost += costMicros(entry.model, entry.usage, pricing);
    if (!resolveModelPrice(entry.model, pricing).known) unpriced.add(entry.model);
  }
  return { usage, costMicros: cost, unpricedModels: [...unpriced] };
}

/** The metering part of a text result (structured results carry no text). */
export function toMeta(result: AiTextResult): AiCallMeta {
  return {
    route: result.route,
    feature: result.feature,
    tier: result.tier,
    model: result.model,
    servedByModel: result.servedByModel,
    servedByFallback: result.servedByFallback,
    promptVersion: result.promptVersion,
    usage: result.usage,
    costMicros: result.costMicros,
    latencyMs: result.latencyMs,
    stopReason: result.stopReason,
    refusalCategory: result.refusalCategory,
    cached: result.cached,
    cacheEntryId: result.cacheEntryId,
  };
}

/** Rough output-token estimate for text streamed before a client abort (the final usage never arrived). */
export function estimateTokensFromChars(chars: number): number {
  return Math.ceil(chars / 4);
}

// ---------------------------------------------------------------------------------------------------------------
// Gateway
// ---------------------------------------------------------------------------------------------------------------

interface PreparedCall {
  input: ParsedCallInput;
  signal: AbortSignal | undefined;
  transport: AnthropicTransport;
  config: AiConfig;
  route: AiRouteConfig;
  tier: AiModelTier;
  model: string;
  systemStable: string[];
  now: Date;
  userDate: LocalDate;
  platformDate: LocalDate;
  reservation: QuotaReservation | null;
  startedAt: number;
  /** Set when the call is response-cache eligible and missed. */
  cacheKey: string | null;
  /** The reservation has been settled (or released); the error path must not release it again. */
  settled: boolean;
}

export function createAiGateway(deps: AiGatewayDeps): AiGateway {
  const clock = deps.clock ?? (() => new Date());
  const log = (deps.logger ?? rootLogger).child({ module: "ai.gateway" });

  const resolveTransport = (): AnthropicTransport | null =>
    typeof deps.transport === "function" ? deps.transport() : deps.transport;
  const resolveConfig = async (): Promise<AiConfig> =>
    typeof deps.config === "function" ? deps.config() : deps.config;
  const notifyBudgetExceeded = (event: AiBudgetExceededEvent): void => {
    if (!deps.onBudgetExceeded) return;
    try {
      void Promise.resolve(deps.onBudgetExceeded(event)).catch((error: unknown) => log.error("AI budget alert hook failed", { err: error }));
    } catch (error) {
      log.error("AI budget alert hook failed", { err: error });
    }
  };

  async function assertFeatureOn(): Promise<void> {
    if (!deps.featureEnabled) return;
    let enabled = false;
    try {
      enabled = (await deps.featureEnabled()) === true;
    } catch (error) {
      log.error("AI feature flag unreadable; AI refused (fail closed)", { err: error });
    }
    if (!enabled) {
      throw new AppError("AI_UNAVAILABLE", AI_SWITCHED_OFF_MESSAGE, { details: { reason: "feature_off" } });
    }
  }

  async function prepare(raw: AiCallInput): Promise<PreparedCall> {
    // Defense in depth (ARCHITECTURE §3.14): the flag is checked before ANY other work, so a switched-off platform
    // never reaches the provider, reserves quota or writes metering, whatever route or job made the call.
    await assertFeatureOn();
    const transport = resolveTransport();
    if (!transport) {
      throw new AppError("AI_UNAVAILABLE", AI_NOT_CONFIGURED_MESSAGE, { details: { reason: "not_configured" } });
    }
    const config = await resolveConfig();
    const input = validateInput(raw, config);

    if (!isFeatureEnabled(config, input.feature)) {
      throw new AppError("AI_UNAVAILABLE", "AI help is switched off right now. Please try again later.", {
        details: { reason: "kill_switch", feature: input.feature },
      });
    }

    const route = resolveRoute(config, input.route);
    const tier = capTier(route.tier, input.maxTier);
    const model = config.routing.tiers[tier].model;

    const now = clock();
    const timeZone = input.timeZone && isValidTimeZone(input.timeZone) ? input.timeZone : DEFAULT_TIMEZONE;
    const userDate = localDateString(now, timeZone);
    const platformDate = localDateString(now, DEFAULT_TIMEZONE);

    const ceiling = config.budget.dailyCostCeilingMicros;
    if (ceiling !== null && input.priority !== "admin") {
      const spent = await deps.meter.getDailySpendMicros(platformDate);
      if (spent >= ceiling) {
        log.warn("AI daily budget reached; request refused", { platformDate, spentMicros: spent, ceilingMicros: ceiling });
        notifyBudgetExceeded({ platformDate, spentMicros: spent, ceilingMicros: ceiling });
        throw new AppError("AI_UNAVAILABLE", "AI help is paused for the rest of today. Please try again tomorrow.", {
          details: { reason: "budget", platformDate },
        });
      }
    }

    let reservation: QuotaReservation | null = null;
    if (input.quota) {
      const candidate: QuotaReservation = {
        userId: input.userId,
        date: userDate,
        feature: input.feature,
        cost: input.quota.cost,
      };
      const reserved = await deps.meter.reserve(candidate, input.quota.dailyLimit);
      if (!reserved) {
        throw new AppError("QUOTA_EXCEEDED", "You've used today's AI allowance. It resets tomorrow.", {
          details: { feature: input.feature, dailyLimit: input.quota.dailyLimit },
        });
      }
      reservation = candidate;
    }

    const stable = typeof input.system.stable === "string" ? [input.system.stable] : input.system.stable;
    return {
      input,
      signal: raw.signal,
      transport,
      config,
      route,
      tier,
      model,
      systemStable: stable.filter((block) => block.trim().length > 0),
      now,
      userDate,
      platformDate,
      reservation,
      startedAt: now.getTime(),
      cacheKey: null,
      settled: false,
    };
  }

  function buildRequest(call: PreparedCall, outputSchema?: z.ZodType): WireRequest {
    return buildWireRequest({
      model: call.model,
      maxTokens: call.route.maxTokens,
      effort: configuredEffort(call.config, call.route, call.tier),
      system: { stable: call.systemStable, volatile: call.input.system.volatile },
      messages: call.input.messages,
      images: call.input.images,
      reference: call.input.reference,
      outputSchema,
    });
  }

  function baseMeta(call: PreparedCall): AiCallMeta {
    return {
      route: call.input.route,
      feature: call.input.feature,
      tier: call.tier,
      model: call.model,
      servedByModel: call.model,
      servedByFallback: false,
      promptVersion: call.input.promptVersion ?? null,
      usage: { ...ZERO_USAGE },
      costMicros: 0,
      latencyMs: Math.max(0, clock().getTime() - call.startedAt),
      stopReason: null,
      refusalCategory: null,
      cached: false,
      cacheEntryId: null,
    };
  }

  async function record(call: PreparedCall, result: AiTextResult): Promise<void> {
    call.settled = true;
    const reservedCost = call.reservation?.cost ?? 0;
    try {
      await deps.meter.record({
        userId: call.input.userId,
        date: call.userDate,
        platformDate: call.platformDate,
        feature: call.input.feature,
        reservedCost,
        requests: reservedCost,
        cacheHit: result.cached,
        deepRequests: call.tier === "DEEP" ? reservedCost : 0,
        images: call.input.images?.length ?? 0,
        usage: result.usage,
        costMicros: result.costMicros,
      });
    } catch (error) {
      // The answer is still returned; ops reconcile from this log line (ids and numbers only).
      log.error("AI metering failed", {
        userId: call.input.userId,
        route: call.input.route,
        costMicros: result.costMicros,
        inputTokens: result.usage.inputTokens,
        outputTokens: result.usage.outputTokens,
        err: error,
      });
      if (call.reservation) await deps.meter.release(call.reservation).catch(() => undefined);
    }
  }

  function logCall(call: PreparedCall, result: AiTextResult): void {
    const fields = {
      route: result.route,
      feature: result.feature,
      tier: result.tier,
      model: result.model,
      servedByModel: result.servedByModel,
      servedByFallback: result.servedByFallback,
      userId: call.input.userId,
      status: result.status,
      stopReason: result.stopReason,
      refusalCategory: result.refusalCategory,
      inputTokens: result.usage.inputTokens,
      outputTokens: result.usage.outputTokens,
      cacheReadTokens: result.usage.cacheReadTokens,
      cacheWriteTokens: result.usage.cacheWriteTokens,
      costMicros: result.costMicros,
      latencyMs: result.latencyMs,
      cached: result.cached,
      promptVersion: result.promptVersion,
    };
    if (result.status === "REFUSED") log.warn("AI call refused", fields);
    else log.info("AI call", fields);
  }

  async function finish(
    call: PreparedCall,
    message: TransportMessage,
    options: { aborted: boolean; streamedChars: number },
  ): Promise<AiTextResult> {
    const metered = meterMessage(message, call.model, call.config.routing.pricing);
    if (metered.unpricedModels.length > 0) {
      log.error("AI model has no price; billed at the conservative default", { models: metered.unpricedModels });
    }
    let usage = metered.usage;
    let cost = metered.costMicros;
    if (options.aborted) {
      const estimated = estimateTokensFromChars(options.streamedChars);
      if (estimated > usage.outputTokens) {
        const extra: TokenUsage = { ...ZERO_USAGE, outputTokens: estimated - usage.outputTokens };
        usage = addUsage(usage, extra);
        cost += costMicros(message.model || call.model, extra, call.config.routing.pricing);
      }
    }
    const refused = message.stop_reason === "refusal";
    const status: AiCallStatus = options.aborted
      ? "ABORTED"
      : refused
        ? "REFUSED"
        : message.stop_reason === "max_tokens" || message.stop_reason === "model_context_window_exceeded"
          ? "TRUNCATED"
          : "COMPLETE";
    const result: AiTextResult = {
      ...baseMeta(call),
      servedByModel: message.model || call.model,
      servedByFallback: servedByFallback(message),
      usage,
      costMicros: cost,
      stopReason: message.stop_reason,
      refusalCategory: refused ? (message.stop_details?.category ?? null) : null,
      status,
      // A refusal's partial text is discarded; the UI shows its own supportive message.
      text: refused ? "" : finalText(message),
    };
    await record(call, result);
    logCall(call, result);
    return result;
  }

  function cacheEligible(call: PreparedCall): boolean {
    const { input } = call;
    return Boolean(
      deps.responseCache &&
        call.route.cacheable &&
        input.cacheKey &&
        !input.system.volatile?.trim() &&
        input.messages.length === 1 &&
        (input.images?.length ?? 0) === 0 &&
        !input.reference?.trim() &&
        call.config.limits.cacheTtlHours > 0,
    );
  }

  async function tryCache(call: PreparedCall): Promise<AiTextResult | null> {
    if (!cacheEligible(call) || !deps.responseCache || !call.input.cacheKey) return null;
    const key = responseCacheKey({
      model: call.model,
      promptVersion: call.input.promptVersion ?? "none",
      route: call.input.route,
      systemStable: call.systemStable,
      prompt: call.input.messages[0]?.content ?? "",
      level: call.input.cacheKey.level,
      subjectId: call.input.cacheKey.subjectId,
    });
    let hit: Awaited<ReturnType<ResponseCacheStore["get"]>> = null;
    try {
      hit = await deps.responseCache.get(key, call.now);
    } catch (error) {
      log.warn("AI response cache read failed", { err: error });
    }
    if (!hit) {
      call.cacheKey = key;
      return null;
    }
    const result: AiTextResult = {
      ...baseMeta(call),
      servedByModel: hit.model,
      stopReason: "end_turn",
      cached: true,
      cacheEntryId: hit.id,
      status: "COMPLETE",
      text: hit.response,
    };
    await record(call, result);
    logCall(call, result);
    return result;
  }

  async function writeCache(call: PreparedCall, result: AiTextResult): Promise<void> {
    if (!deps.responseCache || !call.cacheKey) return;
    if (result.status !== "COMPLETE" || result.servedByFallback || result.text.trim().length === 0) return;
    try {
      await deps.responseCache.put({
        cacheKey: call.cacheKey,
        feature: call.input.feature,
        model: result.servedByModel,
        promptVersion: call.input.promptVersion ?? "none",
        subjectId: call.input.cacheKey?.subjectId ?? null,
        response: result.text,
        usage: result.usage,
        costMicros: result.costMicros,
        expiresAt: new Date(call.now.getTime() + call.config.limits.cacheTtlHours * 3_600_000),
      });
    } catch (error) {
      log.warn("AI response cache write failed", { err: error });
    }
  }

  async function guarded<T>(call: PreparedCall, body: () => Promise<T>): Promise<T> {
    try {
      return await body();
    } catch (error) {
      if (call.reservation && !call.settled) {
        call.settled = true;
        await deps.meter.release(call.reservation).catch((releaseError: unknown) => {
          log.error("AI quota release failed", { userId: call.input.userId, err: releaseError });
        });
      }
      throw mapProviderError(error, log);
    }
  }

  return {
    getConfig: resolveConfig,

    async complete(input) {
      const call = await prepare(input);
      return guarded(call, async () => {
        const cached = await tryCache(call);
        if (cached) return cached;
        const message = await call.transport.create(buildRequest(call), {
          signal: call.signal,
          timeoutMs: call.route.timeoutMs,
        });
        const result = await finish(call, message, { aborted: false, streamedChars: 0 });
        await writeCache(call, result);
        return result;
      });
    },

    async stream(input) {
      const call = await prepare(input);
      return guarded(call, async () => {
        const cached = await tryCache(call);
        if (cached) {
          input.onText(cached.text);
          return cached;
        }
        // Internal controller: a failing consumer (closed SSE socket) stops the stream instead of losing the metering.
        const controller = new AbortController();
        const signal = call.signal ? AbortSignal.any([call.signal, controller.signal]) : controller.signal;
        let streamedChars = 0;
        let consumerFailed = false;
        const { message, aborted } = await call.transport.stream(buildRequest(call), {
          signal,
          timeoutMs: call.route.timeoutMs,
          onText: (delta) => {
            streamedChars += delta.length;
            if (consumerFailed) return;
            try {
              input.onText(delta);
            } catch {
              consumerFailed = true;
              controller.abort();
            }
          },
          onRestart: () => {
            try {
              input.onRestart?.();
            } catch {
              consumerFailed = true;
              controller.abort();
            }
          },
        });
        const result = await finish(call, message, { aborted: aborted || consumerFailed, streamedChars });
        if (result.status === "COMPLETE") await writeCache(call, result);
        return result;
      });
    },

    async structured<T>(input: AiStructuredInput<T>): Promise<AiStructuredResult<T>> {
      const { outputSchema, ...callInput } = input;
      const call = await prepare(callInput);
      return guarded(call, async () => {
        const { message, parsed, parseError } = await call.transport.parse(buildRequest(call, outputSchema), {
          signal: call.signal,
          timeoutMs: call.route.timeoutMs,
        });
        const result = await finish(call, message, { aborted: false, streamedChars: 0 });
        const meta = toMeta(result);
        if (result.status === "REFUSED") return { ok: false, reason: "REFUSED", meta };
        if (result.status === "TRUNCATED") return { ok: false, reason: "TRUNCATED", meta };
        const validated = parsed === null || parsed === undefined ? null : outputSchema.safeParse(parsed);
        if (!validated?.success) {
          log.warn("AI structured output invalid", {
            route: meta.route,
            model: meta.servedByModel,
            problem: parseError ?? "schema validation failed",
          });
          return { ok: false, reason: "INVALID_OUTPUT", meta };
        }
        return { ok: true, data: validated.data, meta };
      });
    },
  };
}
