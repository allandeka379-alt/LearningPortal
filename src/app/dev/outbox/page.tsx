import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDevOutbox } from "@/server/messaging";

export const metadata: Metadata = { title: "Dev outbox", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/**
 * Development only: the messages the console messaging driver captured in this server process (newest first), so a
 * developer can finish sign-up, a code sign-in or a password reset locally (accounts are email-based; codes go by email,
 * which the console driver never really sends). 404 in production, where the console driver is refused anyway.
 */
export default function DevOutboxPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const messages = getDevOutbox();
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1}>
      <Container size="reading" className="space-y-4 py-10">
        <PageHeader
          title="Dev outbox"
          description="Messages captured by the console driver in this dev server (last 50, newest first). Nothing here was sent. Reload to refresh."
        />
        {messages.length === 0 ? (
          <EmptyState title="No messages yet" description="Register, ask for a sign-in code or reset a password, then reload this page." />
        ) : (
          <ul className="space-y-3">
            {messages.map((message) => (
              <li key={message.id}>
                <Card className="space-y-1 p-4">
                  <p className="text-sm text-muted">
                    {message.channel.toUpperCase()} to <span className="font-semibold text-text">{message.to}</span> · {message.tag} ·{" "}
                    {message.sentAt.toISOString()}
                  </p>
                  {message.subject && <p className="font-semibold text-text">{message.subject}</p>}
                  <p className="text-sm break-words whitespace-pre-wrap text-text">{message.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
