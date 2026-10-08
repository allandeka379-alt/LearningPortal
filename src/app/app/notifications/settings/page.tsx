import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MarketingConsentForm } from "@/components/notifications/MarketingConsentForm";
import { NotificationPreferencesForm } from "@/components/notifications/NotificationPreferencesForm";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getNotificationPreferences } from "@/server/notifications/preferences";
import { updateMarketingConsentAction, updateNotificationPreferencesAction } from "../actions";

export const metadata: Metadata = { title: "Notification settings" };

/**
 * Notification settings: study and streak reminders with the local reminder time (§6, §19), the weekly summary,
 * extra channels per kind of message (email, SMS or WhatsApp, each only while switched on; all off by default, so
 * notifications stay in the app; opt-in, quiet hours 21:00-06:00), and, separately, marketing consent.
 */
export default async function NotificationSettingsPage() {
  const actor = await requireOnboardedStudent({ next: "/app/notifications/settings" });
  const view = await getNotificationPreferences(actor);

  return (
    <Container size="reading" className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Notifications", href: "/app/notifications" }, { label: "Settings" }]}
        title="Notification settings"
        description="Choose your reminders and how we reach you."
        className="pb-0"
      />

      <Card as="section" aria-labelledby="notification-settings-reminders">
        <CardHeader titleAs="h2" title={<span id="notification-settings-reminders">Reminders and messages</span>} />
        <CardBody>
          <NotificationPreferencesForm
            reminders={view.reminders}
            dailyReminderTime={view.dailyReminderTime}
            reminderTimeOptions={view.reminderTimeOptions}
            channels={view.channels}
            available={view.available}
            offered={view.offered}
            quietHours={view.quietHours}
            action={updateNotificationPreferencesAction}
          />
        </CardBody>
      </Card>

      <Card as="section" aria-labelledby="notification-settings-marketing">
        <CardHeader
          titleAs="h2"
          title={<span id="notification-settings-marketing">News and offers</span>}
          description="Separate from your notifications above. Off unless you turn it on, and you can stop at any time."
        />
        <CardBody>
          <MarketingConsentForm consent={view.marketing} allowed={view.marketing.allowed} offered={view.offered} action={updateMarketingConsentAction} />
        </CardBody>
      </Card>
    </Container>
  );
}
