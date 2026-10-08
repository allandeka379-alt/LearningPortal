import type { ReactNode } from "react";
import { formatLocalDate } from "@/components/student/format";
import { cn } from "@/lib/cn";
import type { LessonAttribution } from "@/server/lessons/core";

export interface LessonAttributionFooterProps {
  attribution: LessonAttribution;
  className?: string;
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-primary underline underline-offset-4">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Licensing and attribution of a lesson (§27 "source, author, copyright status, licence, publication date"). Every
 * value comes from the lesson row or its ContentSource; empty fields are left out. Server component.
 */
export function LessonAttributionFooter({ attribution, className }: LessonAttributionFooterProps) {
  const { statement, author, source, licence, originalUrl, publicationDate } = attribution;
  return (
    <footer className={cn("border-t border-border pt-5 text-sm text-muted", className)}>
      <h2 className="mb-1 text-sm font-semibold text-text">Source and licence</h2>
      <p>{statement}</p>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
        {author && (
          <>
            <dt className="font-medium text-text">Author</dt>
            <dd className="break-words">{author}</dd>
          </>
        )}
        {source && (
          <>
            <dt className="font-medium text-text">Source</dt>
            <dd className="break-words">
              {source.url ? <ExternalLink href={source.url}>{source.name}</ExternalLink> : source.name}
              {source.publisher && source.publisher !== source.name ? `, ${source.publisher}` : ""}
            </dd>
          </>
        )}
        {licence && (
          <>
            <dt className="font-medium text-text">Licence</dt>
            <dd className="break-words">{licence.url ? <ExternalLink href={licence.url}>{licence.code}</ExternalLink> : licence.code}</dd>
          </>
        )}
        {attribution.attribution && (
          <>
            <dt className="font-medium text-text">Attribution</dt>
            <dd className="break-words">{attribution.attribution}</dd>
          </>
        )}
        {publicationDate && (
          <>
            <dt className="font-medium text-text">Published</dt>
            <dd>{formatLocalDate(publicationDate)}</dd>
          </>
        )}
        {originalUrl && (
          <>
            <dt className="font-medium text-text">Original</dt>
            <dd className="break-all">
              <ExternalLink href={originalUrl}>View the original</ExternalLink>
            </dd>
          </>
        )}
      </dl>
    </footer>
  );
}
