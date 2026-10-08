import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";

export interface LegalSection {
  /** Fragment id, e.g. "your-rights". */
  id: string;
  heading: string;
  content: ReactNode;
}

export interface LegalDocumentProps {
  title: string;
  /** One-paragraph plain-language summary shown under the title. */
  summary: ReactNode;
  /** Version label of the draft, e.g. "Draft 0.1 (October 2026)". */
  version: string;
  sections: readonly LegalSection[];
}

/** Banner text required on every legal template until counsel has reviewed it. */
export const LEGAL_DRAFT_BANNER = "Draft — requires legal review before launch";

/**
 * Layout for the legal templates (/legal/privacy, /legal/terms, /legal/cookies): a prominent DRAFT banner, a table of
 * contents and numbered sections. The text is UI copy versioned in the repository (ARCHITECTURE §3.3). It is informative
 * only and NOT legal advice; it must be reviewed against Zimbabwe's Cyber and Data Protection Act [Chapter 12:07] and its
 * regulations before launch.
 */
export function LegalDocument({ title, summary, version, sections }: LegalDocumentProps) {
  return (
    <Container size="reading" className="pb-16 sm:pb-20">
      <div role="note" className="mt-6 flex gap-3 rounded-card border-2 border-warning/60 bg-warning-soft p-4 sm:p-5">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-warning-text" />
        <div>
          <p className="text-base font-bold text-warning-text">{LEGAL_DRAFT_BANNER}</p>
          <p className="mt-1 text-sm text-text">
            This is a working template, not a final policy and not legal advice. Text in [square brackets] must be completed,
            and the whole document must be checked by a qualified legal practitioner before the platform launches.
          </p>
        </div>
      </div>

      <PageHeader title={title} description={summary} eyebrow={version} />

      <nav aria-labelledby="legal-contents" className="rounded-card border border-border bg-surface p-5">
        <h2 id="legal-contents" className="text-sm font-semibold tracking-wide text-muted uppercase">
          Contents
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="inline-flex min-h-11 items-center text-primary pointer-fine:min-h-9 underline-offset-4 hover:underline">
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className="text-xl font-bold tracking-tight text-text">
              {index + 1}. {section.heading}
            </h2>
            <div className="legal-prose mt-3 space-y-3 text-base leading-relaxed text-text [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-5 [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_table]:w-full [&_td]:border-t [&_td]:border-border [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top [&_th]:py-2 [&_th]:pr-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-muted [&_ul]:list-disc [&_ul]:pl-5">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
