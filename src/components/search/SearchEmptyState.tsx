import { SearchX } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";

export interface SearchSuggestionLink {
  key: string;
  label: string;
  href: string;
}

export interface SearchEmptyStateProps {
  query: string;
  /** Ways to widen the search that apply right now (remove a filter, all types, all subjects). */
  widen: readonly SearchSuggestionLink[];
  /** The student's own subjects (real enrolments), as places to browse instead. */
  subjects: readonly SearchSuggestionLink[];
  action?: ReactNode;
}

/**
 * "Nothing found" with useful next steps (§28): spelling and wording tips, links that widen the search, and the
 * student's own subjects. Never invents results or popular searches. Server component.
 */
export function SearchEmptyState({ query, widen, subjects, action }: SearchEmptyStateProps) {
  return (
    <EmptyState
      icon={<SearchX aria-hidden="true" />}
      title={query ? `No results for “${query}”` : "No results"}
      titleAs="h2"
      description={
        <div className="space-y-4 text-left">
          <ul className="list-disc space-y-1 pl-5">
            <li>Check the spelling, or try a shorter or more general phrase.</li>
            <li>Search for a topic name, e.g. a chapter from your syllabus.</li>
            <li>Syllabus codes work too, e.g. a subject&rsquo;s paper code.</li>
          </ul>
          {widen.length > 0 && (
            <div>
              <p className="font-medium text-text">Try a wider search</p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {widen.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-2 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {subjects.length > 0 && (
            <div>
              <p className="font-medium text-text">Or browse your subjects</p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {subjects.map((link) => (
                  <li key={link.key}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-2 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
      action={action}
    />
  );
}
