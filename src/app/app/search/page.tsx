import { Info, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppliedFilterChips, type FilterChip } from "@/components/search/AppliedFilterChips";
import { FILTER_KIND_LABELS, searchTab } from "@/components/search/config";
import { searchHref, type SearchPageState } from "@/components/search/links";
import { SearchCombobox } from "@/components/search/SearchCombobox";
import { SearchEmptyState, type SearchSuggestionLink } from "@/components/search/SearchEmptyState";
import { SearchResultList } from "@/components/search/SearchResultList";
import { SearchTypeTabs, tabCount } from "@/components/search/SearchTypeTabs";
import { shouldShowSubjectFilter, SubjectFilter, type SubjectFilterOption } from "@/components/search/SubjectFilter";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { formatNumber } from "@/lib/format";
import type { Actor } from "@/server/auth/actor";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { rateLimit } from "@/server/lib/rate-limit";
import type { SearchViewer } from "@/server/search/presentation";
import { search, type SearchResponse } from "@/server/search/query";
import { parseSearchPageParams } from "./_lib/params";
import { SEARCH_RATE_LIMITED_MESSAGE, searchRateLimit } from "./_lib/rate-limit";
import { buildStudentSearchContext } from "./_lib/viewer";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Results per page (cursor pagination, rule 11). */
const PAGE_SIZE = 20;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { q } = parseSearchPageParams(await searchParams);
  return { title: q ? `“${q.slice(0, 60)}” · Search` : "Search" };
}

type SearchOutcome =
  | { kind: "idle" }
  | { kind: "too-short" }
  | { kind: "rate-limited" }
  | { kind: "expired" }
  | { kind: "results"; response: SearchResponse };

async function runSearch(actor: Actor, state: SearchPageState, viewer: SearchViewer): Promise<SearchOutcome> {
  if (state.q === "" && state.subjectId === null) return { kind: "idle" };
  if (state.q.length < 2 && state.subjectId === null) return { kind: "too-short" };
  const limit = await rateLimit(searchRateLimit(actor.userId, null));
  if (!limit.allowed) return { kind: "rate-limited" };
  const types = searchTab(state.type).types;
  try {
    const response = await search(
      {
        q: state.q,
        filters: { ...(state.subjectId ? { subjectId: state.subjectId } : {}), ...(types ? { types: [...types] } : {}) },
        limit: PAGE_SIZE,
        detect: state.detect,
        ...(state.cursor ? { cursor: state.cursor } : {}),
      },
      viewer,
    );
    return { kind: "results", response };
  } catch (error) {
    // A cursor from another query, an old deploy or an edited link: start the results again.
    if (isAppError(error) && error.code === "VALIDATION" && state.cursor !== null) return { kind: "expired" };
    throw error;
  }
}

function filterChips(
  state: SearchPageState,
  response: SearchResponse,
  subjectNames: ReadonlyMap<string, string>,
  subjectFilterShown: boolean,
): FilterChip[] {
  const chips: FilterChip[] = [];
  for (const filter of response.appliedFilters) {
    if (filter.source === "detected") {
      chips.push({
        key: `detected:${filter.kind}:${filter.matchedText}`,
        kindLabel: FILTER_KIND_LABELS[filter.kind],
        label: filter.label,
        removeHref: searchHref({ ...state, q: filter.removeQuery, cursor: null }),
        detected: true,
      });
    } else if (filter.kind === "subject") {
      const id = filter.ids[0] ?? "";
      // One of the student's subjects is already marked in the subject filter row.
      if (subjectFilterShown && subjectNames.has(id)) continue;
      chips.push({
        key: "explicit:subject",
        kindLabel: FILTER_KIND_LABELS.subject,
        label: subjectNames.get(id) ?? "Selected subject",
        removeHref: searchHref({ ...state, subjectId: null, cursor: null }),
        detected: false,
      });
    }
    // The type filter is shown by the result-type links.
  }
  return chips;
}

/**
 * Global search (§28; ARCHITECTURE §3.3 `/app/search`, §3.9): lessons, questions, flashcards, mock exams, study packs
 * and topics in one ranked list, with result-type links and counts, removable chips for what the search understood
 * (board, level, subject, syllabus code), locked teasers for premium items (§31), cursor pagination and an honest
 * empty state. Signed-in students only; results are personalised (premium access, enrolled-subject boost).
 */
export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const state = parseSearchPageParams(await searchParams);
  const actor = await requireOnboardedStudent({ next: searchHref(state) });
  const context = await buildStudentSearchContext(actor);
  const outcome = await runSearch(actor, state, context.viewer);
  const subjectNames = new Map(context.subjects.map((subject) => [subject.id, subject.name]));
  const subjectLinks: SearchSuggestionLink[] = context.subjects.map((subject) => ({
    key: subject.id,
    label: subject.name,
    href: `/app/subjects/${subject.id}`,
  }));

  const hiddenFields: Record<string, string> = {};
  if (state.type !== "all") hiddenFields.type = state.type;
  if (state.subjectId) hiddenFields.subjectId = state.subjectId;

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        title="Search"
        description="Lessons, questions, flashcards, mock exams, study packs and topics."
        className="pb-0"
      />

      <SearchCombobox
        key={`${state.q}|${state.type}|${state.subjectId ?? ""}`}
        defaultValue={state.q}
        label="Search for a topic, lesson or question"
        labelHidden
        hiddenFields={hiddenFields}
        variant="page"
      />

      {outcome.kind === "idle" && (
        <Card variant="sunken">
          <CardBody className="space-y-4">
            <p className="text-sm text-muted">
              Try a topic (&ldquo;quadratic equations&rdquo;), a subject with a level (&ldquo;o level biology&rdquo;) or a syllabus code. We
              recognise exam boards, levels and subjects in what you type.
            </p>
            {context.subjects.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-text">Browse within one of your subjects</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {context.subjects.map((subject) => (
                    <li key={subject.id}>
                      <Link
                        href={searchHref({ subjectId: subject.id })}
                        className="relative inline-flex min-h-9 items-center rounded-full border border-border bg-surface px-3 text-sm text-text transition-colors after:absolute after:inset-x-0 after:-inset-y-1 hover:border-border-strong hover:bg-subtle"
                      >
                        {subject.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {outcome.kind === "too-short" && (
        <Alert tone="neutral" title="Type a little more">
          Search needs at least two letters.
        </Alert>
      )}

      {outcome.kind === "rate-limited" && (
        <Alert tone="warning" role="alert" title="Too many searches">
          {SEARCH_RATE_LIMITED_MESSAGE}
        </Alert>
      )}

      {outcome.kind === "expired" && (
        <Alert
          tone="info"
          title="These results have changed"
          action={
            <ButtonLink href={searchHref({ ...state, cursor: null })} variant="outline" size="sm">
              Show the first results
            </ButtonLink>
          }
        >
          This page of results is no longer available. Please start from the first page.
        </Alert>
      )}

      {outcome.kind === "results" && (
        <SearchResults
          state={state}
          response={outcome.response}
          subjects={context.subjects}
          subjectNames={subjectNames}
          subjectLinks={subjectLinks}
        />
      )}
    </Container>
  );
}

function SearchResults({
  state,
  response,
  subjects,
  subjectNames,
  subjectLinks,
}: {
  state: SearchPageState;
  response: SearchResponse;
  subjects: readonly SubjectFilterOption[];
  subjectNames: ReadonlyMap<string, string>;
  subjectLinks: readonly SearchSuggestionLink[];
}) {
  const subjectFilterShown = shouldShowSubjectFilter(subjects, state.subjectId);
  const chips = filterChips(state, response, subjectNames, subjectFilterShown);
  const hasDetected = chips.some((chip) => chip.detected);
  const tab = searchTab(state.type);
  const allCount = tabCount(response.facets, null);
  const totalLabel = `${formatNumber(response.total)}${response.totalIsLowerBound ? "+" : ""}`;
  const resultWord = response.total === 1 ? "result" : "results";
  const queryLabel = state.q ? `“${state.q}”` : "";

  const widen: SearchSuggestionLink[] = [];
  if (state.type !== "all" && allCount > 0) widen.push({ key: "all-types", label: `All result types (${formatNumber(allCount)})`, href: searchHref({ ...state, type: "all", cursor: null }) });
  if (state.subjectId) widen.push({ key: "all-subjects", label: "Search all subjects", href: searchHref({ ...state, subjectId: null, cursor: null }) });
  if (hasDetected) widen.push({ key: "exact", label: "Search my exact words", href: searchHref({ ...state, detect: false, cursor: null }) });

  return (
    <section aria-labelledby="search-results-heading" className="space-y-4">
      <h2 id="search-results-heading" className="sr-only">
        Results
      </h2>

      <AppliedFilterChips chips={chips} />
      <SubjectFilter subjects={subjects} activeId={state.subjectId} hrefFor={(subjectId) => searchHref({ ...state, subjectId, cursor: null })} />

      {response.relaxed && (
        <Alert tone="info" icon={<Info aria-hidden="true" />}>
          Nothing matched the board, level or subject in your search, so these results come from every subject.
        </Alert>
      )}
      {hasDetected && (
        <p className="text-sm text-muted">
          Not what you meant?{" "}
          <Link href={searchHref({ ...state, detect: false, cursor: null })} className="font-semibold text-primary underline-offset-2 hover:underline">
            Search your exact words instead
          </Link>
        </p>
      )}
      {!state.detect && state.q !== "" && (
        <p className="text-sm text-muted">
          Showing results for your exact words.{" "}
          <Link href={searchHref({ ...state, detect: true, cursor: null })} className="font-semibold text-primary underline-offset-2 hover:underline">
            Recognise subjects and levels again
          </Link>
        </p>
      )}

      <SearchTypeTabs
        active={state.type}
        facets={response.facets}
        countsAreLowerBounds={response.totalIsLowerBound}
        hrefFor={(key) => searchHref({ ...state, type: key, cursor: null })}
      />

      {response.items.length === 0 ? (
        <SearchEmptyState
          query={state.q}
          widen={widen}
          subjects={subjectLinks}
          action={
            state.q === "" ? undefined : (
              <ButtonLink href="/app/subjects" variant="outline" iconStart={<Search aria-hidden="true" />}>
                Browse subjects
              </ButtonLink>
            )
          }
        />
      ) : (
        <>
          <p className="text-sm text-muted" role="status">
            {state.cursor ? "More results" : `${totalLabel} ${resultWord}`}
            {queryLabel && ` for ${queryLabel}`}
            {state.subjectId && subjectNames.has(state.subjectId) ? ` in ${subjectNames.get(state.subjectId)}` : ""}
            {tab.key !== "all" && ` · ${tab.label}`}
          </p>
          <SearchResultList items={response.items} label={`Search results${queryLabel ? ` for ${queryLabel}` : ""}`} />
          <Pagination
            label="Search results pages"
            prevHref={state.cursor ? searchHref({ ...state, cursor: null }) : null}
            nextHref={response.nextCursor ? searchHref({ ...state, cursor: response.nextCursor }) : null}
            prevLabel="First results"
            nextLabel="More results"
          />
        </>
      )}
    </section>
  );
}
