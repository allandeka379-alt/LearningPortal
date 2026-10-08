import { AlertTriangle, KeyRound, Power, PowerOff } from "lucide-react";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatMicrosUsd, humanizeEnum } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { notFoundUnlessFeature } from "@/server/features";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { formatNumber } from "@/lib/format";
import { hasPermission } from "@/server/auth/permissions";
import { microsToUsdString } from "@/server/cms/commerce/money";
import { getAiSettingsOverview, type AiEditableKey, type AiSettingsOverview } from "@/server/cms/settings/ai-settings";
import type { SettingRowView } from "@/server/cms/settings/service";
import { AiNav } from "../usage/_components/AiNav";
import { saveAiSettingAction } from "./actions";

export const metadata = { title: "AI settings" };

const ROUTE_DESCRIPTIONS: Readonly<Record<string, string>> = {
  intent: "Classifies what the student asks for (teach me, hint, answer).",
  tutor: "AI tutor conversations.",
  solver: "Question solver (typed or photographed).",
  solverHard: "Hard multi-step problems when a student escalates.",
  marking: "Marking of short and structured answers.",
  markingEssay: "Essay marking.",
  whatsapp: "WhatsApp micro-explanations.",
  contentGeneration: "Admin content drafts (always saved as drafts).",
};

const EXTRA_PRICE_ROWS = 2;

/**
 * /admin/ai/settings — §40 admin-configurable AI: kill switch, daily budget, model routing (tiers, routes, price
 * overrides), conversation limits and the AI-marking threshold. ADMIN sees everything read-only; SUPER_ADMIN edits
 * (kill switch and budget ask for the password again). Values are validated with the gateway's own schemas. Secrets
 * are never shown: only whether the API key is configured.
 */
export default async function AdminAiSettingsPage() {
  // AI is switched off (`features.ai`, owner decision 2026-10-07): the AI admin pages are a 404.
  await notFoundUnlessFeature("ai");
  const actor = await requireAdminPage("ai.admin", { minScope: "restricted", next: "/admin/ai/settings" });
  const overview = await getAiSettingsOverview(actor);
  const { config, rows, canEdit } = overview;
  const ceiling = config.budget.dailyCostCeilingMicros;
  const featureSwitches = Object.entries(overview.featureSwitches);

  return (
    <Container size="wide">
      <PageHeader
        title="AI settings"
        description="Routing, limits and the spend guard used by every AI call. Changes apply on this server at once and on every server within a minute. Every change is audited."
      />
      <AiNav current="/admin/ai/settings" showGeneration={hasPermission(actor, "ai.generate")} />
      <div className="space-y-6">
        {!canEdit && (
          <Alert tone="info" title="Read-only">
            Only a super admin can change AI settings. You can see the configuration and usage{overview.canEditKillSwitch ? ", and switch AI off or on with the kill switch" : ""}.
          </Alert>
        )}
        {overview.issues.length > 0 && (
          <Alert tone="danger" icon={<AlertTriangle aria-hidden="true" />} title="Some stored AI settings are invalid">
            <ul className="list-disc pl-5">
              {overview.issues.map((issue) => (
                <li key={issue.key}>
                  <span className="font-mono">{issue.key}</span>: {issue.message}
                </li>
              ))}
            </ul>
          </Alert>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Status">
            <KeyValueList
              columns={1}
              items={[
                {
                  label: "API key",
                  value: overview.apiKeyConfigured ? (
                    <Badge size="sm" tone="success">
                      Configured
                    </Badge>
                  ) : (
                    <span className="flex flex-wrap items-center gap-2">
                      <Badge size="sm" tone="warning" icon={<KeyRound aria-hidden="true" />}>
                        Not configured
                      </Badge>
                      <span className="text-muted">AI features answer &ldquo;AI is not configured&rdquo;. The key is set in the server environment, never here.</span>
                    </span>
                  ),
                },
                {
                  label: "AI features",
                  value: config.enabled ? (
                    <Badge size="sm" tone="success" icon={<Power aria-hidden="true" />}>
                      On
                    </Badge>
                  ) : (
                    <Badge size="sm" tone="danger" icon={<PowerOff aria-hidden="true" />}>
                      Off (kill switch)
                    </Badge>
                  ),
                },
                {
                  label: "Spent today",
                  value: `${formatMicrosUsd(overview.todaySpendMicros)}${ceiling === null ? "" : ` of ${formatMicrosUsd(ceiling)}`}`,
                },
              ]}
            />
          </AdminSection>

          <AdminSection title="Kill switch" description="Stops every AI feature (tutor, solver, marking, generation, WhatsApp) without a deploy.">
            <div className="space-y-3">
              <LastChanged row={rows["ai.enabled"]} />
              {featureSwitches.length > 0 && (
                <p className="text-sm text-muted">
                  Per-feature switches stored with it:{" "}
                  {featureSwitches.map(([feature, on]) => `${humanizeEnum(feature)} ${on ? "on" : "off"}`).join(", ")}. Saving here keeps only the global
                  switch.
                </p>
              )}
              {overview.canEditKillSwitch ? (
                <ConfirmAction
                  action={saveAiSettingAction}
                  fields={{ key: "ai.enabled", expectedVersion: String(rows["ai.enabled"].version), ...(config.enabled ? {} : { enabled: "on" }) }}
                  triggerLabel={config.enabled ? "Switch AI off" : "Switch AI on"}
                  triggerVariant={config.enabled ? "danger" : "primary"}
                  title={config.enabled ? "Switch off every AI feature?" : "Switch AI features back on?"}
                  description={
                    config.enabled
                      ? "Students immediately get “AI is temporarily unavailable”. Pending AI marking waits for human review."
                      : "AI features resume, within the daily budget and plan quotas."
                  }
                  confirmLabel={config.enabled ? "Switch AI off" : "Switch AI on"}
                  tone={config.enabled ? "danger" : "primary"}
                />
              ) : null}
            </div>
          </AdminSection>
        </div>

        <AdminSection title="Daily budget" description="Platform-wide AI spend ceiling per day (Africa/Harare). When today's metered spend passes it, AI pauses until tomorrow.">
          <LastChanged row={rows["ai.budget"]} />
          {canEdit ? (
            <ActionForm
              action={saveAiSettingAction}
              hiddenFields={{ key: "ai.budget", expectedVersion: String(rows["ai.budget"].version) }}
              submitLabel="Save budget"
              successAs="toast"
              className="mt-4 max-w-md"
            >
              <AdminField
                name="dailyCostCeilingUsd"
                label="Daily ceiling (USD)"
                required
                defaultValue={ceiling === null ? "" : microsToUsdString(ceiling)}
                hint={`Spent today: ${formatMicrosUsd(overview.todaySpendMicros)}. You will be asked for your password.`}
                maxLength={14}
              />
            </ActionForm>
          ) : (
            <p className="mt-3 text-sm text-text">{ceiling === null ? "No ceiling." : `${formatMicrosUsd(ceiling)} per day.`}</p>
          )}
        </AdminSection>

        <RoutingSection overview={overview} />

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminSection title="Conversation limits" description="Hard limits for every plan (plan quotas apply on top).">
            <LastChanged row={rows["ai.limits"]} />
            {canEdit ? (
              <ActionForm
                action={saveAiSettingAction}
                hiddenFields={{ key: "ai.limits", expectedVersion: String(rows["ai.limits"].version) }}
                submitLabel="Save limits"
                successAs="toast"
                columns="two"
                className="mt-4"
              >
                <AdminField name="maxTurnsPerConversation" label="Turns per conversation" type="number" min={1} max={10000} required defaultValue={config.limits.maxTurnsPerConversation} />
                <AdminField name="maxInputCharsPerMessage" label="Characters per message" type="number" min={1} max={200000} required defaultValue={config.limits.maxInputCharsPerMessage} />
                <AdminField name="maxImageBytes" label="Largest photo (bytes)" type="number" min={1} max={20000000} required defaultValue={config.limits.maxImageBytes} hint="5000000 = 5 MB." />
                <AdminField name="maxImagesPerMessage" label="Photos per message" type="number" min={0} max={4} required defaultValue={config.limits.maxImagesPerMessage} />
                <AdminField name="cacheTtlHours" label="Response cache lifetime (hours)" type="number" min={0} max={8760} required defaultValue={config.limits.cacheTtlHours} hint="0 turns the response cache off." />
                <AdminField
                  name="markingUnitsPerUserPerDay"
                  label="AI marking units per student per day"
                  type="number"
                  min={0}
                  max={1000000}
                  defaultValue={config.limits.markingUnitsPerUserPerDay ?? ""}
                  hint="1 unit per 3,000 characters of an answer (at most 10). Over it, answers go to human review. Empty = no limit."
                />
              </ActionForm>
            ) : (
              <KeyValueList
                className="mt-3"
                items={[
                  { label: "Turns per conversation", value: formatNumber(config.limits.maxTurnsPerConversation) },
                  { label: "Characters per message", value: formatNumber(config.limits.maxInputCharsPerMessage) },
                  { label: "Largest photo", value: `${formatNumber(config.limits.maxImageBytes)} bytes` },
                  { label: "Photos per message", value: formatNumber(config.limits.maxImagesPerMessage) },
                  { label: "Response cache lifetime", value: `${formatNumber(config.limits.cacheTtlHours)} hours` },
                  {
                    label: "AI marking units per student per day",
                    value: config.limits.markingUnitsPerUserPerDay === null ? "No limit" : formatNumber(config.limits.markingUnitsPerUserPerDay),
                  },
                ]}
              />
            )}
          </AdminSection>

          <AdminSection title="AI marking threshold" description="AI marks with lower confidence go to a teacher or reviewer instead of the student's score.">
            <LastChanged row={rows["ai.marking.minConfidence"]} />
            {canEdit ? (
              <ActionForm
                action={saveAiSettingAction}
                hiddenFields={{ key: "ai.marking.minConfidence", expectedVersion: String(rows["ai.marking.minConfidence"].version) }}
                submitLabel="Save threshold"
                successAs="toast"
                className="mt-4 max-w-md"
              >
                <AdminField name="minConfidence" label="Minimum confidence (0 to 1)" required defaultValue={String(config.marking.minConfidence)} hint="For example 0.75." maxLength={8} />
              </ActionForm>
            ) : (
              <p className="mt-3 text-sm text-text">{config.marking.minConfidence}</p>
            )}
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}

function LastChanged({ row }: { row: SettingRowView }) {
  if (!row.isStored) return <p className="text-sm text-muted">Using the built-in default (never changed).</p>;
  return (
    <p className="text-sm text-muted">
      {row.isValid ? "" : "The stored value is invalid, so the built-in default is in force. "}
      Version {row.version}, last changed{row.updatedBy ? ` by ${row.updatedBy}` : ""} <Timestamp value={row.updatedAt} />.
    </p>
  );
}

function RoutingSection({ overview }: { overview: AiSettingsOverview }) {
  const { config, rows, canEdit } = overview;
  const key: AiEditableKey = "ai.routing";
  const priceRows = Object.entries(config.routing.pricing);
  const effortOptions = overview.efforts.map((effort) => ({ value: effort, label: humanizeEnum(effort) }));
  const tierOptions = (["FAST", "STANDARD", "DEEP"] as const).map((tier) => ({ value: tier, label: humanizeEnum(tier) }));

  return (
    <AdminSection
      title="Model routing"
      description="Which model each tier uses, which tier each kind of request uses, and price overrides used for metering (USD per million tokens)."
    >
      <div className="space-y-6">
        <LastChanged row={rows[key]} />
        <DataTable
          caption="Models in use and their metering prices"
          captionHidden={false}
          rows={overview.tierModels}
          rowKey={(row) => row.tier}
          columns={[
            { key: "tier", header: "Tier", primary: true, cell: (row) => humanizeEnum(row.tier) },
            { key: "model", header: "Model", cell: (row) => <span className="font-mono text-xs">{row.model}</span> },
            {
              key: "family",
              header: "Request shape",
              cell: (row) =>
                row.family === "unknown" ? (
                  <Badge size="sm" tone="warning">
                    Unknown model: no effort or fallbacks
                  </Badge>
                ) : (
                  `${row.supportsEffort ? `Effort ${row.effort ?? "default"}` : "No effort setting"}`
                ),
            },
            {
              key: "price",
              header: "Price in / out",
              align: "end",
              cell: (row) => (
                <span className="tabular-nums">
                  ${row.price.inputPerMTok} / ${row.price.outputPerMTok}
                  <span className="block text-xs text-muted">
                    {row.priceSource === "override" ? "override" : row.priceSource === "default" ? "built-in" : "unknown model: highest known rate"}
                  </span>
                </span>
              ),
            },
          ]}
        />
        {canEdit ? (
          <ActionForm
            action={saveAiSettingAction}
            hiddenFields={{ key, expectedVersion: String(rows[key].version) }}
            submitLabel="Save routing"
            successAs="toast"
          >
            <fieldset className="space-y-3">
              <legend className="text-base font-semibold text-text">Tiers</legend>
              <p className="text-sm text-muted">Exact API model ids. Effort applies to models that support it; empty uses the model&rsquo;s default.</p>
              {(["FAST", "STANDARD", "DEEP"] as const).map((tier) => (
                <div key={tier} className="grid gap-3 rounded-control border border-border p-3 md:grid-cols-2">
                  <AdminField name={`tiers.${tier}.model`} label={`${humanizeEnum(tier)} model`} required mono maxLength={64} defaultValue={config.routing.tiers[tier].model} />
                  <AdminField
                    name={`tiers.${tier}.effort`}
                    label={`${humanizeEnum(tier)} effort`}
                    type="select"
                    options={effortOptions}
                    placeholder="Model default"
                    defaultValue={config.routing.tiers[tier].effort ?? ""}
                  />
                </div>
              ))}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-base font-semibold text-text">Routes</legend>
              <p className="text-sm text-muted">Output caps include thinking tokens. A route may cache generic answers only when it never sees student-specific context.</p>
              {overview.routeNames.map((name) => {
                const route = config.routing.routes[name];
                if (!route) return null;
                return (
                  <div key={name} className="rounded-control border border-border p-3">
                    <p className="font-mono text-sm font-semibold text-text">{name}</p>
                    {ROUTE_DESCRIPTIONS[name] && <p className="text-sm text-muted">{ROUTE_DESCRIPTIONS[name]}</p>}
                    <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <AdminField name={`routes.${name}.tier`} label="Tier" type="select" options={tierOptions} required defaultValue={route.tier} />
                      <AdminField name={`routes.${name}.maxTokens`} label="Max output tokens" type="number" min={16} max={128000} required defaultValue={route.maxTokens} />
                      <AdminField name={`routes.${name}.effort`} label="Effort override" type="select" options={effortOptions} placeholder="Tier default" defaultValue={route.effort ?? ""} />
                      <AdminField
                        name={`routes.${name}.timeoutSeconds`}
                        label="Timeout (seconds)"
                        type="number"
                        min={1}
                        max={600}
                        optional
                        defaultValue={route.timeoutMs === undefined ? null : Math.round(route.timeoutMs / 1000)}
                      />
                    </div>
                    <AdminField name={`routes.${name}.cacheable`} label="Cache generic answers" type="checkbox" defaultChecked={route.cacheable} />
                  </div>
                );
              })}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-base font-semibold text-text">Price overrides</legend>
              <p className="text-sm text-muted">
                USD per million tokens, used to meter spend when a price changes or a new model is added. Cache prices default to 0.1× and 1.25× the input
                price. Leave a new row empty to add nothing.
              </p>
              {[...priceRows.map(([model, price]) => ({ model, price })), ...Array.from({ length: EXTRA_PRICE_ROWS }, () => null)].map((row, index) => (
                <div key={row?.model ?? `new-${index}`} className="grid gap-3 rounded-control border border-border p-3 sm:grid-cols-2 xl:grid-cols-5">
                  <AdminField name={`pricing.${index}.model`} label="Model id" mono maxLength={64} optional={row === null} defaultValue={row?.model ?? ""} />
                  <AdminField name={`pricing.${index}.inputPerMTok`} label="Input" optional={row === null} defaultValue={row?.price.inputPerMTok ?? null} maxLength={12} />
                  <AdminField name={`pricing.${index}.outputPerMTok`} label="Output" optional={row === null} defaultValue={row?.price.outputPerMTok ?? null} maxLength={12} />
                  <AdminField name={`pricing.${index}.cacheReadPerMTok`} label="Cache read" optional defaultValue={row?.price.cacheReadPerMTok ?? null} maxLength={12} />
                  <AdminField name={`pricing.${index}.cacheWritePerMTok`} label="Cache write" optional defaultValue={row?.price.cacheWritePerMTok ?? null} maxLength={12} />
                  {row && <AdminField name={`pricing.${index}.remove`} label="Remove this override" type="checkbox" />}
                </div>
              ))}
            </fieldset>
          </ActionForm>
        ) : (
          <DataTable
            caption="Routes"
            captionHidden={false}
            rows={overview.routeNames.map((name) => ({ name, route: config.routing.routes[name] }))}
            rowKey={(row) => row.name}
            columns={[
              { key: "name", header: "Route", primary: true, cell: (row) => <span className="font-mono text-xs">{row.name}</span> },
              { key: "tier", header: "Tier", cell: (row) => humanizeEnum(row.route?.tier) },
              { key: "max", header: "Max tokens", align: "end", cell: (row) => formatNumber(row.route?.maxTokens) },
              { key: "effort", header: "Effort", cell: (row) => row.route?.effort ?? "Tier default" },
              { key: "cache", header: "Caches answers", cell: (row) => (row.route?.cacheable ? "Yes" : "No") },
            ]}
          />
        )}
      </div>
    </AdminSection>
  );
}
