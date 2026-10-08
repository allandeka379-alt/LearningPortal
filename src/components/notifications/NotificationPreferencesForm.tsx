"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { APP_NAME } from "@/lib/config";
import {
  channelFieldName,
  EDITABLE_CATEGORY_KEYS,
  EXTERNAL_CHANNEL_FIELD_KEYS,
  PREFERENCE_FIELDS,
  type EditableCategoryKey,
  type ExternalChannelFieldKey,
} from "./preference-fields";

export interface NotificationPreferencesFormProps {
  reminders: { study: boolean; streakAtRisk: boolean; weeklySummary: boolean };
  dailyReminderTime: string;
  reminderTimeOptions: readonly string[];
  channels: Record<EditableCategoryKey, Record<ExternalChannelFieldKey, boolean>>;
  /** Whether the student has a usable email / phone / linked WhatsApp. */
  available: Record<ExternalChannelFieldKey, boolean>;
  /**
   * Channels the platform offers right now (email, SMS and WhatsApp are each switched off by default). Channels not
   * offered are not shown; their stored choice is kept (hidden field) for when they come back. Default: all.
   */
  offered?: Record<ExternalChannelFieldKey, boolean>;
  quietHours: { start: string; end: string };
  action: FormAction;
}

const ALL_OFFERED: Record<ExternalChannelFieldKey, boolean> = { email: true, sms: true, whatsapp: true };

/** "email, SMS or WhatsApp" for the offered channels. */
function channelList(keys: readonly ExternalChannelFieldKey[]): string {
  const names = keys.map((key) => (key === "email" ? "email" : CHANNEL_COPY[key].label));
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}

const CATEGORY_COPY: Record<EditableCategoryKey, { legend: string; description: string }> = {
  REMINDER: { legend: "Study and streak reminders", description: "At most one a day, at your reminder time." },
  LEARNING: { legend: "Weekly summary", description: "Your last 7 days, every Sunday evening." },
  ANNOUNCEMENT: { legend: "Announcements", description: `From your school, your teachers and ${APP_NAME}.` },
};

const CHANNEL_COPY: Record<ExternalChannelFieldKey, { label: string; unavailable: string }> = {
  email: { label: "Email", unavailable: "Add and verify an email address to use email." },
  sms: { label: "SMS", unavailable: "Add a phone number to get text messages." },
  whatsapp: { label: "WhatsApp", unavailable: "Link your WhatsApp number to get WhatsApp messages." },
};

/**
 * Notification preferences (§6 study reminders, §19 streak reminders, weekly summary, §21 / §22 announcements):
 * which reminders to get and at what local time, and which extra channels (email, SMS, WhatsApp) each kind may use.
 * In-app notifications are always on. Channels the student cannot receive yet are shown disabled with the reason.
 */
export function NotificationPreferencesForm({
  reminders,
  dailyReminderTime,
  reminderTimeOptions,
  channels,
  available,
  offered = ALL_OFFERED,
  quietHours,
  action,
}: NotificationPreferencesFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const times = reminderTimeOptions.includes(dailyReminderTime) ? reminderTimeOptions : [...reminderTimeOptions, dailyReminderTime].sort();
  const shown = EXTERNAL_CHANNEL_FIELD_KEYS.filter((channel) => offered[channel]);
  const hidden = EXTERNAL_CHANNEL_FIELD_KEYS.filter((channel) => !offered[channel]);
  return (
    <form action={formAction} className="space-y-6">
      <fieldset className="space-y-1">
        <legend className="text-base font-semibold text-text">Reminders</legend>
        <Switch
          name={PREFERENCE_FIELDS.studyReminder}
          defaultChecked={reminders.study}
          label="Daily study reminder"
          description="If you haven't studied by your reminder time, we remind you once that day."
        />
        <Switch
          name={PREFERENCE_FIELDS.streakReminder}
          defaultChecked={reminders.streakAtRisk}
          label="Streak reminder"
          description="When your study streak is at risk, the reminder tells you how to keep it."
        />
        <Field
          label="Reminder time"
          hint="Your local time. Reminders are never sent at night."
          error={fieldErrorsOf(state, "dailyReminderTime")}
          className="py-2"
        >
          <Select name={PREFERENCE_FIELDS.reminderTime} defaultValue={dailyReminderTime} className="max-w-40">
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </Field>
        <Switch
          name={PREFERENCE_FIELDS.weeklySummary}
          defaultChecked={reminders.weeklySummary}
          label="Weekly summary"
          description="Study time, questions answered and your streak for the last 7 days, on Sunday evenings."
        />
      </fieldset>

      {shown.length === 0 ? (
        <div>
          <h3 className="text-base font-semibold text-text">Where we reach you</h3>
          <p className="mt-1 text-sm text-muted">Everything appears here in the app. We don&apos;t send notifications by email or text message at the moment.</p>
          {EDITABLE_CATEGORY_KEYS.flatMap((category) =>
            hidden.map((channel) =>
              channels[category][channel] ? <input key={`${category}-${channel}`} type="hidden" name={channelFieldName(category, channel)} value="on" /> : null,
            ),
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-text">Where we reach you</h3>
            <p className="mt-1 text-sm text-muted">
              Everything appears in the app. You can also get these by {channelList(shown)}. Messages are never sent
              between {quietHours.start} and {quietHours.end}; anything due then waits until morning.
            </p>
          </div>
          {EDITABLE_CATEGORY_KEYS.map((category) => (
            <fieldset key={category} className="rounded-card border border-border px-4 pt-3 pb-1">
              <legend className="px-1 text-sm font-semibold text-text">{CATEGORY_COPY[category].legend}</legend>
              <p className="text-sm text-muted">{CATEGORY_COPY[category].description}</p>
              {hidden.map((channel) =>
                channels[category][channel] ? <input key={channel} type="hidden" name={channelFieldName(category, channel)} value="on" /> : null,
              )}
              {shown.map((channel) => (
                <Checkbox
                  key={channel}
                  name={channelFieldName(category, channel)}
                  defaultChecked={channels[category][channel] && available[channel]}
                  disabled={!available[channel]}
                  label={CHANNEL_COPY[channel].label}
                  description={available[channel] ? undefined : CHANNEL_COPY[channel].unavailable}
                />
              ))}
            </fieldset>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          Save notification settings
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
