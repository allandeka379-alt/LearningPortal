/**
 * Form field names shared by the notification settings forms (client) and their Server Actions, plus the pure
 * FormData → service-input mapping. Switches and checkboxes submit a value only when ON, so presence means `true`.
 * The services validate the result with Zod; nothing here decides what is allowed.
 */

export const EDITABLE_CATEGORY_KEYS = ["REMINDER", "LEARNING", "ANNOUNCEMENT"] as const;
export type EditableCategoryKey = (typeof EDITABLE_CATEGORY_KEYS)[number];

export const EXTERNAL_CHANNEL_FIELD_KEYS = ["email", "sms", "whatsapp"] as const;
export type ExternalChannelFieldKey = (typeof EXTERNAL_CHANNEL_FIELD_KEYS)[number];

export const PREFERENCE_FIELDS = {
  studyReminder: "studyReminder",
  streakReminder: "streakReminder",
  weeklySummary: "weeklySummary",
  reminderTime: "dailyReminderTime",
} as const;

export const MARKETING_FIELDS: Readonly<Record<ExternalChannelFieldKey, string>> = {
  email: "marketingEmail",
  sms: "marketingSms",
  whatsapp: "marketingWhatsapp",
};

/** `channel.ANNOUNCEMENT.email` etc. */
export function channelFieldName(category: EditableCategoryKey, channel: ExternalChannelFieldKey): string {
  return `channel.${category}.${channel}`;
}

export interface PreferencesFormInput {
  reminders: { study: boolean; streakAtRisk: boolean; weeklySummary: boolean };
  dailyReminderTime: string;
  channels: Record<EditableCategoryKey, Record<ExternalChannelFieldKey, boolean>>;
}

/** Reads the notification settings form into the shape `updateNotificationPreferences` validates. Pure. */
export function preferencesInputFromForm(formData: FormData): PreferencesFormInput {
  const time = formData.get(PREFERENCE_FIELDS.reminderTime);
  const channels = {} as PreferencesFormInput["channels"];
  for (const category of EDITABLE_CATEGORY_KEYS) {
    channels[category] = { email: false, sms: false, whatsapp: false };
    for (const channel of EXTERNAL_CHANNEL_FIELD_KEYS) channels[category][channel] = formData.has(channelFieldName(category, channel));
  }
  return {
    reminders: {
      study: formData.has(PREFERENCE_FIELDS.studyReminder),
      streakAtRisk: formData.has(PREFERENCE_FIELDS.streakReminder),
      weeklySummary: formData.has(PREFERENCE_FIELDS.weeklySummary),
    },
    dailyReminderTime: typeof time === "string" ? time.trim() : "",
    channels,
  };
}

/** Reads the marketing consent form. Pure. */
export function marketingInputFromForm(formData: FormData): Record<ExternalChannelFieldKey, boolean> {
  return {
    email: formData.has(MARKETING_FIELDS.email),
    sms: formData.has(MARKETING_FIELDS.sms),
    whatsapp: formData.has(MARKETING_FIELDS.whatsapp),
  };
}
