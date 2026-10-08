import { BookOpen, ClipboardList, FileQuestion, Layers, ListTree, Lock, Package, School } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SearchResultItem } from "@/server/search/query";
import type { SnippetSegment } from "@/server/search/presentation";
import { ENTITY_TYPE_LABELS, type SearchableEntityType } from "./config";
import { resultHref, UPGRADE_HREF } from "./links";

/** What the list needs from a search result (a subset of the service's `SearchResultItem`). */
export type SearchResultView = Pick<
  SearchResultItem,
  "id" | "entityType" | "entityId" | "title" | "subtitle" | "path" | "locked" | "lockReason" | "snippet"
>;

const TYPE_ICONS: Readonly<Record<SearchableEntityType, ReactNode>> = {
  SUBJECT: <School aria-hidden="true" />,
  TOPIC: <ListTree aria-hidden="true" />,
  LESSON: <BookOpen aria-hidden="true" />,
  QUESTION: <FileQuestion aria-hidden="true" />,
  FLASHCARD: <Layers aria-hidden="true" />,
  ASSESSMENT: <ClipboardList aria-hidden="true" />,
  STUDY_PACK: <Package aria-hidden="true" />,
};

/** A highlighted excerpt: matches are `<mark>` around TEXT (the service never returns HTML). */
export function Snippet({ segments }: { segments: readonly SnippetSegment[] }) {
  return (
    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
      {segments.map((segment, index) =>
        segment.match ? (
          <mark key={index} className="rounded-sm bg-accent-soft px-0.5 font-medium text-text">
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function ResultRow({ item }: { item: SearchResultView }) {
  const typeLabel = ENTITY_TYPE_LABELS[item.entityType];
  return (
    <li className="relative flex gap-3 border-b border-border px-1 py-4 last:border-b-0 sm:gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-control bg-primary-soft text-on-primary-soft [&_svg]:size-4.5"
      >
        {TYPE_ICONS[item.entityType]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-muted uppercase">
          <span>{typeLabel}</span>
          {item.locked && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-px text-on-accent-soft normal-case">
              <Lock aria-hidden="true" className="size-3" />
              Premium
            </span>
          )}
        </p>
        <h3 className="mt-1 text-base font-semibold text-text">
          {item.locked ? (
            <span>{item.title}</span>
          ) : (
            <Link
              href={resultHref(item)}
              className="rounded-sm underline-offset-2 after:absolute after:inset-0 hover:underline focus-visible:outline-offset-2"
            >
              {item.title}
            </Link>
          )}
        </h3>
        {item.subtitle && <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p>}
        {item.locked ? (
          <p className="mt-2 text-sm text-muted">
            Included with a paid plan or study pack.{" "}
            <Link
              href={UPGRADE_HREF}
              aria-label={`See plans to unlock ${item.title}`}
              className="relative z-10 font-semibold text-primary underline-offset-2 hover:underline"
            >
              See plans
            </Link>
          </p>
        ) : (
          item.snippet && <Snippet segments={item.snippet} />
        )}
      </div>
    </li>
  );
}

/**
 * Search results (§28): type, title (linking into the app), curriculum breadcrumb and a highlighted excerpt. Locked
 * premium items are teasers: title and context only, a "Premium" label and an upgrade link (§31; the service never
 * returns their text). Server component.
 */
export function SearchResultList({ items, label }: { items: readonly SearchResultView[]; label: string }) {
  return (
    <ul aria-label={label} className="rounded-card border border-border bg-surface px-3 sm:px-4">
      {items.map((item) => (
        <ResultRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
