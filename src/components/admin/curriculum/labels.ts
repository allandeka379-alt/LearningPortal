import type { SelectOption } from "@/components/ui/Select";

/**
 * UI labels and select options for the curriculum admin (isomorphic, UI copy only — no curriculum content). Values
 * mirror the Prisma enums; the services validate them again.
 */

export const CATALOGUE_STATUS_LABEL: Readonly<Record<string, string>> = {
  HIDDEN: "Hidden",
  COMING_SOON: "Coming soon",
  AVAILABLE: "Available",
  RETIRED: "Retired",
};

export const CATALOGUE_STATUS_OPTIONS: readonly SelectOption[] = [
  { value: "HIDDEN", label: "Hidden (admin only)" },
  { value: "COMING_SOON", label: "Coming soon (listed, not enrollable)" },
  { value: "AVAILABLE", label: "Available (listed and enrollable)" },
  { value: "RETIRED", label: "Retired (no new enrolments)" },
];

export const CATALOGUE_STATUS_FILTER: readonly SelectOption[] = Object.entries(CATALOGUE_STATUS_LABEL).map(([value, label]) => ({ value, label }));

export const SYLLABUS_STATUS_FILTER: readonly SelectOption[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "CURRENT", label: "Current" },
  { value: "SUPERSEDED", label: "Superseded" },
  { value: "ARCHIVED", label: "Archived" },
];

export const COPYRIGHT_OPTIONS: readonly SelectOption[] = [
  { value: "UNVERIFIED", label: "Unverified (cannot be published)" },
  { value: "OWNED", label: "Owned (our own structure)" },
  { value: "LICENSED", label: "Licensed (agreement recorded on the source)" },
  { value: "PUBLIC_DOMAIN", label: "Public domain" },
  { value: "OPEN_LICENSE", label: "Open licence" },
];

export const COMPONENT_KIND_OPTIONS: readonly SelectOption[] = [
  { value: "WRITTEN", label: "Written" },
  { value: "MULTIPLE_CHOICE", label: "Multiple choice" },
  { value: "PRACTICAL", label: "Practical" },
  { value: "ALTERNATIVE_TO_PRACTICAL", label: "Alternative to practical" },
  { value: "COURSEWORK", label: "Coursework" },
  { value: "ORAL", label: "Oral" },
  { value: "LISTENING", label: "Listening" },
  { value: "PROJECT", label: "Project" },
];

export const CALCULATOR_OPTIONS: readonly SelectOption[] = [
  { value: "unspecified", label: "Not specified by the board" },
  { value: "yes", label: "Calculator allowed" },
  { value: "no", label: "No calculator" },
];

export const TOPIC_KIND_LABEL: Readonly<Record<string, string>> = {
  SECTION: "Section",
  TOPIC: "Topic",
  SUBTOPIC: "Subtopic",
};

export const TOPIC_KIND_OPTIONS: readonly SelectOption[] = [
  { value: "SECTION", label: "Section (groups topics, e.g. a paper or theme)" },
  { value: "TOPIC", label: "Topic (listed on dashboards)" },
  { value: "SUBTOPIC", label: "Subtopic (finest tagging level)" },
];

export const COGNITIVE_SKILL_OPTIONS: readonly SelectOption[] = [
  { value: "RECALL", label: "Recall" },
  { value: "UNDERSTANDING", label: "Understanding" },
  { value: "APPLICATION", label: "Application" },
  { value: "ANALYSIS", label: "Analysis" },
  { value: "EVALUATION", label: "Evaluation" },
  { value: "CREATION", label: "Creation" },
];

export const EXAM_SESSION_STATUS_FILTER: readonly SelectOption[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "ARCHIVED", label: "Archived" },
];

export const SOURCE_TYPE_LABEL: Readonly<Record<string, string>> = {
  ORIGINAL: "Original",
  LICENSED: "Licensed",
  PUBLIC_DOMAIN: "Public domain",
  OPEN_LICENSE: "Open licence",
  OFFICIAL_SYLLABUS: "Official syllabus",
  AI_GENERATED: "AI generated",
};

/** Content sources as select options ("Name (type)"). */
export function sourceOptions(sources: readonly { id: string; name: string; type: string }[]): SelectOption[] {
  return sources.map((source) => ({ value: source.id, label: `${source.name} (${SOURCE_TYPE_LABEL[source.type] ?? source.type})` }));
}

/** Ensures a currently selected id is offered even when it fell outside a bounded option list. */
export function withCurrent(options: SelectOption[], current: { id: string; label: string } | null | undefined): SelectOption[] {
  if (!current || options.some((option) => option.value === current.id)) return options;
  return [{ value: current.id, label: current.label }, ...options];
}
