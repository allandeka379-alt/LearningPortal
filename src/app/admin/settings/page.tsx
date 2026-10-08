import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import { AdminSection, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { FEATURE_LABELS, FEATURE_NAMES, toFeatureFlags } from "@/lib/features";
import { getFeatures } from "@/server/features";
import { DEFAULT_XP_RULES } from "@/server/gamification/xp";
import { PLATFORM_SETTING_GROUPS, RATE_LIMIT_LABELS, rateLimitPresetDefaults } from "@/server/cms/settings/catalogue";
import { formatFxRates, formatMilestones, formatSmsPrefixes, WEEKDAYS, XP_DIFFICULTIES, XP_INTEGER_FIELDS } from "@/server/cms/settings/forms";
import { listPlatformSettings, type PlatformSettingView } from "@/server/cms/settings/service";
import { savePlatformSettingAction } from "./actions";

export const metadata = { title: "Settings" };

const DAY_LABELS: Readonly<Record<(typeof WEEKDAYS)[number], string>> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const XP_LABELS: Readonly<Record<(typeof XP_INTEGER_FIELDS)[number], string>> = {
  questionAnswered: "Any answered question",
  lessonCompleted: "Lesson completed",
  flashcardSession: "Flashcard session",
  flashcardSessionMinCards: "Cards needed for a session",
  mockExamCompleted: "Mock exam completed",
  dailyGoalMet: "Daily goal met",
  weeklyGoalMet: "Weekly goal met",
};

/**
 * /admin/settings — §36 Settings (SUPER_ADMIN): typed editors for the platform settings (study defaults, XP rules,
 * privacy switches, billing grace and term length, exchange rates for revenue reports, notification retention, the SMS
 * budget, rate limits), each with its description,
 * current version and last change. AI settings live on /admin/ai/settings. Every save is audited.
 */
export default async function AdminSettingsPage() {
  const actor = await requireAdminPage("settings.manage", { next: "/admin/settings" });
  const [settings, features] = await Promise.all([listPlatformSettings(actor), getFeatures()]);

  return (
    <Container size="wide">
      <PageHeader
        title="Settings"
        description={
          <>
            Platform values that change behaviour without a deploy. Saves apply on this server at once and everywhere within a minute, and are recorded in
            the <Link href="/admin/audit?entityType=Setting" className="font-medium text-primary underline-offset-4 hover:underline">audit log</Link>.
            {features.ai && (
              <>
                {" "}
                AI routing, limits and the kill switch are under{" "}
                <Link href="/admin/ai/settings" className="font-medium text-primary underline-offset-4 hover:underline">
                  AI settings
                </Link>
                .
              </>
            )}
          </>
        }
      />
      <div className="space-y-10">
        {PLATFORM_SETTING_GROUPS.map((group) => {
          const items = settings.filter((setting) => setting.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group} aria-labelledby={`settings-${group}`} className="space-y-4">
              <h2 id={`settings-${group}`} className="text-lg font-semibold text-text">
                {group}
              </h2>
              <div className="grid gap-6 xl:grid-cols-2">
                {items.map((setting) => (
                  <AdminSection
                    key={setting.key}
                    title={setting.label}
                    description={setting.description}
                    titleAs="h3"
                    className={setting.editor === "rateLimits" || setting.editor === "xp" ? "xl:col-span-2" : undefined}
                  >
                    <SettingMeta setting={setting} />
                    <div className="mt-4">
                      <SettingEditor setting={setting} />
                    </div>
                  </AdminSection>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}

function SettingMeta({ setting }: { setting: PlatformSettingView }) {
  return (
    <div className="space-y-2 text-sm text-muted">
      <p>
        <span className="font-mono text-xs">{setting.key}</span> ·{" "}
        {setting.isStored ? (
          <>
            version {setting.version}, changed{setting.updatedBy ? ` by ${setting.updatedBy}` : ""} <Timestamp value={setting.updatedAt} />
          </>
        ) : (
          "built-in default (never changed)"
        )}
      </p>
      {!setting.isValid && (
        <Alert tone="warning" icon={<AlertTriangle aria-hidden="true" />}>
          The stored value is invalid, so the built-in default is in force. Saving below replaces it.
        </Alert>
      )}
      {setting.help && <p>{setting.help}</p>}
    </div>
  );
}

function hidden(setting: PlatformSettingView): Record<string, string> {
  return { key: setting.key, expectedVersion: String(setting.version) };
}

function SettingEditor({ setting }: { setting: PlatformSettingView }) {
  switch (setting.editor) {
    case "smsBudget": {
      const value = setting.value as { dailyMax: number | null; allowedCountryPrefixes: string[] };
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save SMS budget" successAs="toast">
          <AdminField
            name="dailyMax"
            label="Most SMS per day (whole platform)"
            type="number"
            min={1}
            optional
            defaultValue={value.dailyMax}
            hint="Counted per day in Africa/Harare time, every kind of text message together."
          />
          <AdminField
            name="noCap"
            label="No daily maximum"
            type="checkbox"
            defaultChecked={value.dailyMax === null}
            description="Not recommended in production: nothing then limits SMS spend from a toll-fraud attack."
          />
          <AdminField
            name="allowedCountryPrefixes"
            label="Countries SMS may go to (international prefixes)"
            optional
            mono
            defaultValue={formatSmsPrefixes(value.allowedCountryPrefixes)}
            placeholder="+263"
            hint="Separate with commas, for example +263, +27. Empty means no SMS at all; users can still use email."
            maxLength={600}
          />
        </ActionForm>
      );
    }
    case "features": {
      const flags = toFeatureFlags(setting.value);
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save features" successAs="toast">
          {FEATURE_NAMES.map((name) => (
            <AdminField
              key={name}
              name={name}
              label={FEATURE_LABELS[name].label}
              type="checkbox"
              defaultChecked={flags[name]}
              description={`${flags[name] ? "Currently on." : "Currently off."} ${FEATURE_LABELS[name].description}`}
            />
          ))}
          <p className="text-sm text-muted">Saving asks for your password again and is recorded in the audit log.</p>
        </ActionForm>
      );
    }
    case "fxRates":
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save exchange rates" successAs="toast">
          <AdminField
            name="rates"
            label="Rates to US dollars (one currency per line)"
            type="textarea"
            rows={4}
            optional
            mono
            defaultValue={formatFxRates(setting.value as Record<string, { USD: number; asOf: string; source?: string }> | null)}
            placeholder="ZWG: 0.0373, 2026-10-01, RBZ interbank mid-rate"
            hint="Currency code: US dollars for ONE unit, the date of the rate, then the source. Empty = revenue per currency only."
          />
        </ActionForm>
      );
    case "boolean": {
      const on = setting.value === true;
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save" successAs="toast">
          <AdminField
            name="value"
            label={setting.onLabel ?? "On"}
            type="checkbox"
            defaultChecked={on}
            description={`Currently: ${on ? (setting.onLabel ?? "on") : (setting.offLabel ?? "off")}. Saving asks for your password again.`}
          />
        </ActionForm>
      );
    }
    case "integer":
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save" successAs="toast" className="max-w-sm">
          <AdminField
            name="value"
            label={setting.unit ? `Value (${setting.unit})` : "Value"}
            type="number"
            min={setting.min}
            max={setting.max}
            required
            defaultValue={typeof setting.value === "number" ? setting.value : null}
            hint={setting.min !== undefined && setting.max !== undefined ? `Between ${setting.min} and ${setting.max}.` : undefined}
          />
        </ActionForm>
      );
    case "retentionDays": {
      const days = (setting.value as { days?: number } | null)?.days ?? null;
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save" successAs="toast" className="max-w-sm">
          <AdminField name="days" label="Days" type="number" min={setting.min} max={setting.max} required defaultValue={days} hint={`Between ${setting.min ?? 7} and ${setting.max ?? 3650} days.`} />
        </ActionForm>
      );
    }
    case "studyDefaults": {
      const value = setting.value as { dailyGoalMinutes?: number; availability?: Partial<Record<(typeof WEEKDAYS)[number], number>> };
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save study defaults" successAs="toast" columns="two">
          <AdminField name="dailyGoalMinutes" label="Daily goal (minutes)" type="number" min={1} max={1440} required defaultValue={value.dailyGoalMinutes ?? null} wide />
          {WEEKDAYS.map((day) => (
            <AdminField key={day} name={`availability.${day}`} label={`${DAY_LABELS[day]} (minutes available)`} type="number" min={0} max={1440} required defaultValue={value.availability?.[day] ?? null} />
          ))}
        </ActionForm>
      );
    }
    case "xp": {
      const override = (setting.value ?? {}) as {
        correctAnswerByDifficulty?: Partial<Record<string, number>>;
        partialCreditFraction?: number;
        streakMilestones?: Record<string, number>;
      } & Partial<Record<(typeof XP_INTEGER_FIELDS)[number], number>>;
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save XP rules" successAs="toast" columns="two">
          <AdminField
            name="useDefaults"
            label="Use the built-in values for everything"
            type="checkbox"
            defaultChecked={setting.value === null}
            description="Ignores the fields below and stores no overrides."
            wide
          />
          {XP_INTEGER_FIELDS.map((field) => (
            <AdminField
              key={field}
              name={field}
              label={XP_LABELS[field]}
              type="number"
              min={0}
              optional
              defaultValue={override[field] ?? null}
              placeholder={`Built-in: ${DEFAULT_XP_RULES[field]}`}
            />
          ))}
          {XP_DIFFICULTIES.map((level) => (
            <AdminField
              key={level}
              name={`correctAnswerByDifficulty.${level}`}
              label={`Correct answer bonus, difficulty ${level}`}
              type="number"
              min={0}
              optional
              defaultValue={override.correctAnswerByDifficulty?.[String(level)] ?? null}
              placeholder={`Built-in: ${DEFAULT_XP_RULES.correctAnswerByDifficulty[level]}`}
            />
          ))}
          <AdminField
            name="partialCreditFraction"
            label="Share of the bonus for a partly correct answer (0-1)"
            optional
            defaultValue={override.partialCreditFraction ?? null}
            placeholder={`Built-in: ${DEFAULT_XP_RULES.partialCreditFraction}`}
            maxLength={8}
          />
          <AdminField
            name="streakMilestones"
            label="Streak milestones (days: XP, one per line)"
            type="textarea"
            rows={4}
            optional
            mono
            defaultValue={formatMilestones(override.streakMilestones)}
            placeholder={formatMilestones(DEFAULT_XP_RULES.streakMilestones)}
            hint="Empty = built-in milestones."
          />
        </ActionForm>
      );
    }
    case "rateLimits": {
      const overrides = (setting.value ?? {}) as Record<string, { limit: number; windowSeconds: number }>;
      const presets = Object.entries(rateLimitPresetDefaults());
      return (
        <ActionForm action={savePlatformSettingAction} hiddenFields={hidden(setting)} submitLabel="Save rate limits" successAs="toast">
          <div className="space-y-3">
            {presets.map(([name, rule]) => (
              <fieldset key={name} className="grid gap-3 rounded-control border border-border p-3 md:grid-cols-[minmax(0,1fr)_10rem_12rem] md:items-end">
                <legend className="sr-only">{RATE_LIMIT_LABELS[name] ?? name}</legend>
                <div className="text-sm">
                  <p className="font-medium text-text">{RATE_LIMIT_LABELS[name] ?? name}</p>
                  <p className="font-mono text-xs text-muted">
                    {name} · built-in {rule.limit} per {rule.windowSeconds}s
                  </p>
                </div>
                <AdminField name={`${name}.limit`} label="Requests allowed" type="number" min={1} optional defaultValue={overrides[name]?.limit ?? null} placeholder={String(rule.limit)} />
                <AdminField name={`${name}.windowSeconds`} label="Per window (seconds)" type="number" min={1} optional defaultValue={overrides[name]?.windowSeconds ?? null} placeholder={String(rule.windowSeconds)} />
              </fieldset>
            ))}
          </div>
        </ActionForm>
      );
    }
  }
}
