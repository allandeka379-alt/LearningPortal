import { MessageSquareText } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqList } from "@/components/marketing/FaqList";
import { FinalCta } from "@/components/marketing/FinalCta";
import { EmptyState } from "@/components/ui/EmptyState";
import { SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import { getFeatures } from "@/server/features";
import { groupFaqs, listPublishedFaqs } from "@/server/marketing/faq";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  // No AI claim while AI features are switched off (`features.ai`, owner decision 2026-10-07).
  const { ai } = await getFeatures();
  return marketingMetadata({
    title: "Frequently asked questions",
    description: `Answers about studying for ZIMSEC and Cambridge exams, plans and payments, ${ai ? "the AI tutor, " : ""}schools and privacy.`,
    path: "/faq",
  });
}

/** /faq (§45): every published FAQ entry, grouped by category, as a no-JavaScript accordion. */
export default async function FaqPage() {
  const groups = groupFaqs(await listPublishedFaqs({ limit: 200 }));

  return (
    <>
      <Container size="reading" className="pb-12 sm:pb-16">
        <PageHeader title="Frequently asked questions" description="Can't find what you are looking for? Get in touch and we will help." />
        {groups.length === 0 ? (
          <EmptyState
            icon={<MessageSquareText aria-hidden="true" />}
            title="No questions published yet"
            description={SUPPORT_EMAIL_CONFIGURED ? `Questions? Email ${SUPPORT_EMAIL}.` : "Answers to common questions will appear here soon."}
          />
        ) : (
          <div className="space-y-10">
            {groups.map((group) => (
              <section key={group.category} aria-labelledby={group.anchor}>
                <h2 id={group.anchor} className="text-xl font-bold tracking-tight text-text">
                  {group.label}
                </h2>
                <FaqList items={group.items} className="mt-4" />
              </section>
            ))}
          </div>
        )}
        {SUPPORT_EMAIL_CONFIGURED && groups.length > 0 && (
          <p className="mt-10 text-sm text-muted">
            Still have a question? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        )}
      </Container>
      <FinalCta />
    </>
  );
}
