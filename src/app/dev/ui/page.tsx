import {
  ArrowRight,
  BookOpen,
  CircleQuestionMark,
  Download,
  Flame,
  Inbox,
  Plus,
  Search,
  Target,
  Trash,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FontScaleSwitcher, ThemeSwitcher } from "@/components/layout/PreferenceSwitchers";
import { MAIN_CONTENT_ID } from "@/components/layout/SkipLink";
import { Alert, Callout } from "@/components/ui/Alert";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, type BadgeAppearance, type BadgeTone } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button, ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { CountdownPill } from "@/components/ui/CountdownPill";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Kbd } from "@/components/ui/Kbd";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { Pagination } from "@/components/ui/Pagination";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Radio, RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { Sheet, SheetClose } from "@/components/ui/Sheet";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { StatTile } from "@/components/ui/StatTile";
import { Switch } from "@/components/ui/Switch";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import { Tag } from "@/components/ui/Tag";
import { Textarea } from "@/components/ui/Textarea";
import { Tooltip } from "@/components/ui/Tooltip";
import { formatDuration, formatPercent, formatRelativeDays } from "@/lib/format";
import { MASTERY_BANDS, MASTERY_BAND_LABELS, MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import {
  ControlledDialogDemo,
  ControlledSwitchDemo,
  DropdownMenuDemo,
  RemovableTagsDemo,
  ToastDemo,
} from "./_components/client-demos";
import { Caption, ShowcaseSection, Specimen } from "./_components/showcase";

export const metadata: Metadata = { title: "Design system" };

const SECTIONS = [
  { id: "foundations", label: "Foundations" },
  { id: "brand", label: "Brand" },
  { id: "buttons", label: "Buttons" },
  { id: "forms", label: "Forms" },
  { id: "feedback", label: "Feedback" },
  { id: "data-display", label: "Data display" },
  { id: "mastery", label: "Mastery" },
  { id: "navigation", label: "Navigation" },
  { id: "overlays", label: "Overlays" },
  { id: "tables", label: "Tables & empty states" },
  { id: "layout", label: "Layout" },
] as const;

const RAMPS = {
  zambezi: ["#eef9fc", "#daf2f8", "#bae3f0", "#91ccdf", "#65adc5", "#3b8da7", "#117089", "#135568", "#0c3d4c", "#092e39", "#051d25"],
  msasa: ["#fef6ea", "#feeace", "#fdd5a4", "#f8b975", "#ed9d49", "#d9822a", "#bc661e", "#9f501c", "#803f1b", "#643118", "#3c1c0f"],
  granite: ["#f8f6f3", "#f0ede9", "#e2dfdb", "#cdcac5", "#a4a19c", "#83807b", "#696661", "#4f4d48", "#393632", "#25221f", "#1c1a17"],
} as const;
const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

const SEMANTIC_SURFACES = ["bg", "surface", "surface-raised", "subtle", "track", "border", "border-strong", "overlay"] as const;
const SEMANTIC_ROLES = [
  ["primary", "on-primary"],
  ["primary-soft", "on-primary-soft"],
  ["accent", "on-accent"],
  ["accent-soft", "on-accent-soft"],
  ["success", "on-success"],
  ["success-soft", "success-text"],
  ["warning", "on-warning"],
  ["warning-soft", "warning-text"],
  ["danger", "on-danger"],
  ["danger-soft", "danger-text"],
  ["info-soft", "info-text"],
  ["surface", "accent-text"],
] as const;

const TYPE_SCALE = [
  ["text-6xl", "3.75rem"],
  ["text-5xl", "3rem"],
  ["text-4xl", "2.25rem"],
  ["text-3xl", "1.875rem"],
  ["text-2xl", "1.5rem"],
  ["text-xl", "1.25rem"],
  ["text-lg", "1.125rem"],
  ["text-base", "1rem"],
  ["text-sm", "0.875rem"],
  ["text-xs", "0.75rem"],
] as const;

const BUTTON_VARIANTS: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "danger", "accent"];
const BUTTON_SIZES: ButtonSize[] = ["sm", "md", "lg"];
const BADGE_TONES: BadgeTone[] = ["neutral", "primary", "accent", "success", "warning", "danger", "info"];
const BADGE_APPEARANCES: BadgeAppearance[] = ["soft", "solid", "outline"];

interface SampleExam {
  id: string;
  title: string;
  subject: string;
  daysAgo: number;
  durationMinutes: number;
  score: number | null;
  status: "Marked" | "In progress";
}

const SAMPLE_EXAMS: SampleExam[] = [
  { id: "1", title: "Paper 1 practice", subject: "Mathematics", daysAgo: 2, durationMinutes: 150, score: 72, status: "Marked" },
  { id: "2", title: "Paper 2 practice", subject: "Combined Science", daysAgo: 6, durationMinutes: 120, score: 38, status: "Marked" },
  { id: "3", title: "Comprehension drill", subject: "English Language", daysAgo: 0, durationMinutes: 45, score: null, status: "In progress" },
];

const EXAM_COLUMNS: DataTableColumn<SampleExam>[] = [
  { key: "title", header: "Exam", primary: true, cell: (row) => row.title },
  { key: "subject", header: "Subject", cell: (row) => row.subject },
  { key: "when", header: "Taken", cell: (row) => formatRelativeDays(-row.daysAgo) },
  { key: "duration", header: "Duration", hideOnMobile: true, cell: (row) => formatDuration(row.durationMinutes) },
  {
    key: "score",
    header: "Score",
    align: "end",
    cell: (row) => <span className="tabular-nums">{formatPercent(row.score)}</span>,
  },
  {
    key: "status",
    header: "Status",
    align: "end",
    cell: (row) => <Badge tone={row.status === "Marked" ? "success" : "info"}>{row.status}</Badge>,
  },
];

function ThemeSample() {
  return (
    <div className="space-y-3 rounded-card border border-border bg-surface p-4">
      <p className="font-semibold text-text">Quadratic equations</p>
      <p className="text-sm text-muted">Muted supporting text on a surface.</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="accent">
          Accent
        </Button>
        <Badge tone="success">Correct</Badge>
        <MasteryBadge score={34} />
      </div>
      <ProgressBar label="Syllabus progress" value={64} size="sm" />
      <a href="#foundations" className="text-sm font-medium text-primary underline underline-offset-4">
        Link text
      </a>
    </div>
  );
}

/**
 * Dev-only design-system showcase: every token and component in all variants, with theme and text-size switches.
 * This page is how the lead verifies the design system visually. Sample values are for visual checks only.
 */
export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="pb-24">
      <div className="border-b border-border bg-surface">
        <Container className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 py-6">
          <div>
            <Logo size="sm" />
            <PageHeader
              className="pb-0 sm:pt-4"
              title="Design system"
              description="Tokens, typography and components. Sample values on this page are for visual verification only."
              eyebrow="Developer preview"
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <ThemeSwitcher />
            <FontScaleSwitcher />
          </div>
        </Container>
      </div>

      <Container className="mt-8 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Showcase sections" className="mb-8 lg:mb-0">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-6 lg:flex-col lg:gap-0.5">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-9 items-center rounded-control px-3 text-sm text-muted hover:bg-subtle hover:text-text max-lg:border max-lg:border-border"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-14">
          {/* ------------------------------------------------------------------ Foundations */}
          <ShowcaseSection
            id="foundations"
            title="Foundations"
            description="Brand ramps, semantic tokens (what components use), type scale, radii, shadows."
          >
            <Specimen title="Light and dark side by side" note="Theme islands: data-theme on any element.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div data-theme="light" className="rounded-card bg-bg p-3 text-text">
                  <ThemeSample />
                </div>
                <div data-theme="dark" className="rounded-card bg-bg p-3 text-text">
                  <ThemeSample />
                </div>
              </div>
            </Specimen>

            <Specimen title="Brand ramps" note="Static palette. Components should not use these directly — use semantic tokens.">
              <div className="space-y-5">
                {Object.entries(RAMPS).map(([name, hexes]) => (
                  <div key={name}>
                    <p className="mb-2 text-sm font-semibold text-text capitalize">{name}</p>
                    <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                      {hexes.map((hex, i) => (
                        <div key={hex}>
                          <div
                            className="h-10 rounded-md border border-border"
                            style={{ background: `var(--color-${name}-${STEPS[i]})` }}
                          />
                          <Caption>
                            {STEPS[i]}
                            <br />
                            {hex}
                          </Caption>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Specimen>

            <Specimen title="Semantic tokens" note="These switch with the theme. Pairs show fill + the text token meant for it.">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SEMANTIC_SURFACES.map((token) => (
                  <div key={token}>
                    <div className="h-12 rounded-md border border-border" style={{ background: `var(--color-${token})` }} />
                    <Caption>--color-{token}</Caption>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SEMANTIC_ROLES.map(([fill, text]) => (
                  <div
                    key={`${fill}-${text}`}
                    className="rounded-md border border-border px-3 py-2.5 text-sm font-semibold"
                    style={{ background: `var(--color-${fill})`, color: `var(--color-${text})` }}
                  >
                    {text} on {fill}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <span className="text-text">text</span>
                <span className="text-muted">muted</span>
                <span className="text-primary">primary</span>
                <span className="text-accent-text">accent-text</span>
                <span className="text-success-text">success-text</span>
                <span className="text-warning-text">warning-text</span>
                <span className="text-danger-text">danger-text</span>
              </div>
            </Specimen>

            <Specimen
              title="Contrast (WCAG AA)"
              note="Computed ratios for the main pairs; the full table is in the comment at the top of globals.css."
            >
              <ul className="grid grid-cols-1 gap-1 text-sm text-muted sm:grid-cols-2">
                <li>Light text on bg — 14.67 : 1</li>
                <li>Dark text on bg — 16.10 : 1</li>
                <li>Light muted on surface — 5.72 : 1</li>
                <li>Dark muted on surface — 6.15 : 1</li>
                <li>Light on-primary on primary — 8.31 : 1</li>
                <li>Dark on-primary on primary — 9.85 : 1</li>
                <li>Light on-accent on accent — 5.93 : 1</li>
                <li>Control border on surface — 3.93 : 1 (UI ≥ 3)</li>
              </ul>
            </Specimen>

            <Specimen title="Type scale" note="Plus Jakarta Sans (variable), rem-based so it follows the text-size preference.">
              <div className="space-y-3">
                {TYPE_SCALE.map(([cls, rem]) => (
                  <div key={cls} className="flex items-baseline gap-4">
                    <span className="w-24 shrink-0 font-mono text-xs text-muted">
                      {cls}
                      <br />
                      {rem}
                    </span>
                    <span className={`${cls} min-w-0 truncate font-semibold text-text`}>Master your exams</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-lg text-text">
                <span className="font-light">Light 300</span>
                <span className="font-normal">Regular 400</span>
                <span className="font-medium">Medium 500</span>
                <span className="font-semibold">Semibold 600</span>
                <span className="font-bold">Bold 700</span>
                <span className="font-extrabold">Extrabold 800</span>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-semibold text-text tabular-nums">01:11:09</p>
                  <Caption>tabular-nums (timers, stats)</Caption>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-text">01:11:09</p>
                  <Caption>proportional (default)</Caption>
                </div>
              </div>
            </Specimen>

            <Specimen title="Radii and shadows">
              <div className="flex flex-wrap gap-4">
                {[
                  ["rounded-md", "rounded-md"],
                  ["rounded-control", "rounded-control"],
                  ["rounded-card", "rounded-card"],
                  ["rounded-full", "rounded-full"],
                ].map(([cls, label]) => (
                  <div key={cls} className="text-center">
                    <div className={`size-16 border border-border-strong bg-subtle ${cls}`} />
                    <Caption>{label}</Caption>
                  </div>
                ))}
                {["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"].map((cls) => (
                  <div key={cls} className="text-center">
                    <div className={`size-16 rounded-card border border-border bg-surface ${cls}`} />
                    <Caption>{cls}</Caption>
                  </div>
                ))}
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Brand */}
          <ShowcaseSection id="brand" title="Brand" description="Wordmark from APP_NAME; chevron mark and motif after the Great Zimbabwe walls.">
            <Specimen title="Logo">
              <div className="flex flex-wrap items-center gap-8">
                <Logo size="sm" />
                <Logo />
                <Logo size="lg" />
                <Logo markVariant="mono" />
                <span className="flex items-center gap-3 text-primary">
                  <LogoMark />
                  <LogoMark variant="mono" />
                  <LogoMark variant="mono" className="size-12 text-accent" />
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Logo wordmarkHidden /> (wordmark visually hidden)
                </span>
              </div>
            </Specimen>
            <Specimen title="ChevronPattern" note="Use sparingly: one band or field per view.">
              <div className="space-y-6">
                {(["muted", "primary", "accent"] as const).map((tone) => (
                  <div key={tone}>
                    <ChevronPattern variant="band" tone={tone} />
                    <Caption>band · {tone}</Caption>
                  </div>
                ))}
                <div className="rounded-card bg-primary p-3">
                  <ChevronPattern variant="band" tone="inverse" opacity={0.4} />
                  <p className="mt-1 font-mono text-xs text-on-primary">band · inverse on primary</p>
                </div>
                <div>
                  <div className="relative h-40 overflow-hidden rounded-card border border-border bg-bg">
                    <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" />
                    <p className="relative p-4 text-sm font-medium text-text">Field (default opacity 0.12)</p>
                  </div>
                  <Caption>field · primary</Caption>
                </div>
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Buttons */}
          <ShowcaseSection id="buttons" title="Buttons" description="md is 44px (touch target); sm (36px) is for dense desktop UI.">
            <Specimen title="Variants × sizes">
              <div className="space-y-4">
                {BUTTON_SIZES.map((size) => (
                  <div key={size} className="flex flex-wrap items-center gap-3">
                    <span className="w-8 font-mono text-xs text-muted">{size}</span>
                    {BUTTON_VARIANTS.map((variant) => (
                      <Button key={variant} variant={variant} size={size}>
                        {variant[0]?.toUpperCase()}
                        {variant.slice(1)}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen title="States and icons">
              <div className="flex flex-wrap items-center gap-3">
                <Button iconStart={<Plus aria-hidden="true" />}>Add subject</Button>
                <Button variant="secondary" iconEnd={<ArrowRight aria-hidden="true" />}>
                  Continue
                </Button>
                <Button loading>Saving</Button>
                <Button variant="outline" loading loadingText="Submitting…">
                  Submit
                </Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled outline
                </Button>
                <ButtonLink href="#buttons" variant="outline" iconStart={<BookOpen aria-hidden="true" />}>
                  ButtonLink
                </ButtonLink>
                <ButtonLink href="#buttons" variant="accent">
                  Start practising
                </ButtonLink>
              </div>
              <div className="mt-4 max-w-xs">
                <Button fullWidth>Full width</Button>
              </div>
            </Specimen>
            <Specimen title="IconButton" note="aria-label is required by the type.">
              <div className="flex flex-wrap items-center gap-3">
                {BUTTON_SIZES.map((size) => (
                  <IconButton key={size} size={size} aria-label={`Search (${size})`} icon={<Search aria-hidden="true" />} />
                ))}
                <IconButton variant="outline" aria-label="Download" icon={<Download aria-hidden="true" />} />
                <IconButton variant="primary" aria-label="Add" icon={<Plus aria-hidden="true" />} />
                <IconButton variant="danger" aria-label="Delete" icon={<Trash aria-hidden="true" />} />
                <IconButton variant="secondary" aria-label="Close" icon={<X aria-hidden="true" />} disabled />
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Forms */}
          <ShowcaseSection id="forms" title="Forms" description="Field wires label, hint and errors (aria-describedby / aria-invalid).">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Specimen title="Text inputs">
                <div className="space-y-5">
                  <Field label="Email" hint="We'll send a verification code.">
                    <Input type="email" name="email" autoComplete="email" placeholder="you@example.com" />
                  </Field>
                  <Field label="Phone number" error="Enter a valid Zimbabwean mobile number.">
                    <Input type="tel" name="phone" defaultValue="0771" />
                  </Field>
                  <Field label="Password" error={["At least 10 characters.", "Include a number."]}>
                    <Input type="password" name="password" defaultValue="short" />
                  </Field>
                  <Field label="Search topics" labelHidden>
                    <Input type="search" placeholder="Search topics" startIcon={<Search />} />
                  </Field>
                  <Field label="School" optional>
                    <Input name="school" />
                  </Field>
                  <Field label="Disabled">
                    <Input disabled defaultValue="Read only value" />
                  </Field>
                </div>
              </Specimen>
              <Specimen title="Textarea and select">
                <div className="space-y-5">
                  <Field label="Your question" hint="Describe what you're stuck on.">
                    <Textarea name="question" />
                  </Field>
                  <Field label="Examination board">
                    <Select
                      name="board"
                      placeholder="Choose a board"
                      defaultValue=""
                      options={[
                        { value: "zimsec", label: "ZIMSEC" },
                        { value: "cambridge", label: "Cambridge" },
                      ]}
                    />
                  </Field>
                  <Field label="Level" error="Choose a level.">
                    <Select name="level" placeholder="Choose a level" defaultValue="" options={[{ value: "o", label: "O-Level" }]} />
                  </Field>
                </div>
              </Specimen>
              <Specimen title="Checkbox and switch">
                <Checkbox name="terms" label="Email me weekly progress" description="Sent on Sundays. Unsubscribe any time." />
                <Checkbox name="checked" label="Checked by default" defaultChecked />
                <Checkbox name="disabled" label="Disabled" disabled />
                <div className="mt-2 border-t border-border pt-2">
                  <Switch name="reminders" label="Study reminders" description="Uncontrolled, defaultChecked." defaultChecked />
                  <ControlledSwitchDemo />
                  <Switch label="Disabled switch" disabled />
                </div>
              </Specimen>
              <Specimen title="Radio groups">
                <div className="space-y-6">
                  <RadioGroup
                    legend="Current ability"
                    name="ability"
                    defaultValue="intermediate"
                    options={[
                      { value: "beginner", label: "Beginner" },
                      { value: "intermediate", label: "Intermediate" },
                      { value: "advanced", label: "Advanced", description: "Exam-level questions from the start." },
                    ]}
                  />
                  <RadioGroup
                    legend="Target grade"
                    name="grade"
                    orientation="horizontal"
                    hint="Optional."
                    options={["A", "B", "C"].map((g) => ({ value: g, label: g }))}
                    error="Pick a target grade or skip."
                  />
                  <RadioGroup legend="Custom children" name="custom">
                    <Radio name="custom" value="one" label="Radio passed as a child" />
                    <Radio name="custom" value="two" label="Disabled radio" disabled />
                  </RadioGroup>
                </div>
              </Specimen>
            </div>
            <Specimen title="Card radios (onboarding)" note="Checked state via :has(:checked) — no JavaScript.">
              <RadioGroup
                legend="Examination board"
                name="board-card"
                appearance="card"
                defaultValue="zimsec"
                options={[
                  { value: "zimsec", label: "ZIMSEC", description: "Sample description for the first option." },
                  { value: "cambridge", label: "Cambridge", description: "Sample description for the second option." },
                ]}
              />
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Feedback */}
          <ShowcaseSection id="feedback" title="Feedback" description="Alerts, callouts, toasts, loading states and progress.">
            <Specimen title="Alerts">
              <div className="space-y-3">
                <Alert tone="info" title="Information">
                  Neutral system information.
                </Alert>
                <Alert tone="success" title="Correct">
                  Success colours are reserved for marking and status.
                </Alert>
                <Alert tone="warning" title="Connection is slow">
                  Some images are hidden to save data.
                </Alert>
                <Alert tone="danger" title="We couldn't save your answers" action={<Button size="sm" variant="outline">Try again</Button>}>
                  Check your connection and try again.
                </Alert>
                <Alert tone="neutral">Neutral alert without a title.</Alert>
              </div>
            </Specimen>
            <Specimen title="Callouts (lesson content)">
              <div className="space-y-3">
                <Callout tone="accent" title="Exam tip">
                  Show every step of your working — method marks are awarded even when the final answer is wrong.
                </Callout>
                <Callout tone="warning" title="Common mistake">
                  Forgetting the ± when taking a square root.
                </Callout>
                <Callout tone="info" icon={false}>
                  A callout without an icon.
                </Callout>
              </div>
            </Specimen>
            <Specimen title="Toasts" note="Polite live region; pause on hover/focus; max three visible.">
              <ToastDemo />
            </Specimen>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Specimen title="Spinner and skeleton">
                <div className="flex items-center gap-4 text-primary">
                  <Spinner size="sm" />
                  <Spinner />
                  <Spinner size="lg" />
                  <span className="text-muted">
                    <Spinner label="Loading questions" />
                  </span>
                </div>
                <div className="mt-5 space-y-3" aria-busy="true">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <SkeletonText lines={3} />
                </div>
              </Specimen>
              <Specimen title="ProgressBar">
                <div className="space-y-4">
                  <ProgressBar label="Syllabus progress" value={64} />
                  <ProgressBar label="Topics completed" value={12} max={30} valueText="12 of 30 topics" tone="success" />
                  <ProgressBar label="Daily target" value={30} max={45} valueText={`${formatDuration(30)} of ${formatDuration(45)}`} tone="accent" size="lg" />
                  <ProgressBar label="Unknown progress" value={null} />
                  <ProgressBar label="Label hidden, value hidden" labelHidden showValue={false} value={40} size="sm" />
                </div>
              </Specimen>
            </div>
            <Specimen title="ProgressRing">
              <div className="flex flex-wrap items-center gap-6">
                <ProgressRing label="Accuracy" value={82} size="sm" />
                <ProgressRing label="Accuracy" value={64} />
                <ProgressRing label="Syllabus" value={41} size="lg" tone="accent" />
                <ProgressRing label="Questions" value={18} max={20} valueText="18 of 20" size="lg" tone="success">
                  18/20
                </ProgressRing>
                <ProgressRing label="Unknown" value={null} size="lg" />
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Data display */}
          <ShowcaseSection id="data-display" title="Data display">
            <Specimen title="StatTile" note="null renders an em dash with “No data yet” for screen readers — never a fake value.">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatTile label="Questions attempted" value={1250} icon={<Target aria-hidden="true" />} delta={{ value: "+86", direction: "up", label: "this week" }} />
                <StatTile label="Accuracy" value={formatPercent(74)} delta={{ value: "3%", direction: "down", label: "vs last week" }} />
                <StatTile label="Avg. time per question" value="48" unit="s" delta={{ value: "6 s", direction: "down", sentiment: "positive", label: "faster" }} />
                <StatTile label="Mock exam average" value={null} hint="Take a mock exam to see this." />
              </div>
            </Specimen>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Specimen title="Badge" bodyClassName="space-y-3">
                {BADGE_APPEARANCES.map((appearance) => (
                  <div key={appearance} className="flex flex-wrap gap-2">
                    {BADGE_TONES.map((tone) => (
                      <Badge key={tone} tone={tone} appearance={appearance}>
                        {tone}
                      </Badge>
                    ))}
                  </div>
                ))}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent" icon={<Flame aria-hidden="true" />}>
                    12-day streak
                  </Badge>
                  <Badge size="sm">Small</Badge>
                </div>
              </Specimen>
              <Specimen title="Tag" bodyClassName="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Tag>Algebra</Tag>
                  <Tag href="#data-display">Linked tag</Tag>
                  <Tag icon={<BookOpen aria-hidden="true" />}>With icon</Tag>
                </div>
                <RemovableTagsDemo />
              </Specimen>
              <Specimen title="CountdownPill" note="Days are computed in server code; null or negative renders nothing.">
                <div className="flex flex-wrap items-center gap-3">
                  <CountdownPill days={126} />
                  <CountdownPill days={1} />
                  <CountdownPill days={0} />
                  <CountdownPill days={126} event="your sample exam session" showLabel href="#data-display" />
                </div>
              </Specimen>
              <Specimen title="Avatar, Kbd, Tooltip">
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar name="Tendai Moyo" size="sm" />
                  <Avatar name="Rumbidzai Chipo Ncube" />
                  <Avatar name="Nyasha" size="lg" />
                  <Avatar name="" />
                </div>
                <p className="mt-4 text-sm text-muted">
                  Flag a question <Kbd>F</Kbd>, next <Kbd>→</Kbd>, close <Kbd>Esc</Kbd>
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Tooltip content="Marks awarded for method, not just the answer">
                    <IconButton variant="outline" aria-label="About method marks" icon={<CircleQuestionMark aria-hidden="true" />} />
                  </Tooltip>
                  <Tooltip content="Tooltip below" side="bottom">
                    <Button variant="ghost" size="sm">
                      Hover or focus me
                    </Button>
                  </Tooltip>
                </div>
              </Specimen>
            </div>
            <Specimen title="Card">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader title="Default card" description="Header with action" action={<Badge tone="primary">New</Badge>} />
                  <CardBody className="text-sm text-muted">Body content.</CardBody>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      Action
                    </Button>
                  </CardFooter>
                </Card>
                <Card variant="flat">
                  <CardHeader title="Flat card" />
                  <CardBody className="text-sm text-muted">No shadow.</CardBody>
                </Card>
                <Card variant="sunken" interactive>
                  <CardBody>
                    <Link href="#data-display" className="font-semibold text-text after:absolute after:inset-0">
                      Interactive (stretched link)
                    </Link>
                    <p className="mt-1 text-sm text-muted">Whole card is clickable; one tab stop.</p>
                  </CardBody>
                </Card>
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Mastery */}
          <ShowcaseSection
            id="mastery"
            title="Mastery"
            description="Bands from §11. Label text always shown; weak topics get an amber marker."
          >
            <Specimen title="MasteryBadge">
              <div className="flex flex-wrap items-center gap-2">
                {MASTERY_BANDS.map((band) => (
                  <MasteryBadge key={band} band={band} />
                ))}
                <MasteryBadge score={null} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {MASTERY_BANDS.map((band) => (
                  <MasteryBadge key={band} score={MASTERY_BAND_MIN_SCORE[band] + 2} showScore size="sm" />
                ))}
              </div>
              <Caption>
                {MASTERY_BANDS.map((band) => `${MASTERY_BAND_LABELS[band]} ≥ ${MASTERY_BAND_MIN_SCORE[band]}`).join(" · ")}
              </Caption>
            </Specimen>
            <Specimen title="MasteryBar">
              <div className="max-w-xl space-y-4">
                <MasteryBar label="Algebra" score={82} href="#mastery" />
                <MasteryBar label="Geometry" score={64} />
                <MasteryBar label="Statistics" score={41} />
                <MasteryBar label="Trigonometry" score={91} />
                <MasteryBar label="Calculus" score={32} />
                <MasteryBar label="Vectors" score={null} />
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Navigation */}
          <ShowcaseSection id="navigation" title="Navigation">
            <Specimen title="Tabs" note="←/→ move and select, Home/End jump. Panels stay mounted.">
              <Tabs defaultValue="topics">
                <TabList aria-label="Subject views">
                  <Tab value="topics">Topics</Tab>
                  <Tab value="practice">Practice</Tab>
                  <Tab value="tests">Recent tests</Tab>
                  <Tab value="disabled" disabled>
                    Disabled
                  </Tab>
                </TabList>
                <TabPanel value="topics">
                  <p className="text-sm text-muted">Topics panel (server-rendered content).</p>
                </TabPanel>
                <TabPanel value="practice">
                  <p className="text-sm text-muted">Practice panel.</p>
                </TabPanel>
                <TabPanel value="tests">
                  <p className="text-sm text-muted">Recent tests panel.</p>
                </TabPanel>
                <TabPanel value="disabled">
                  <p className="text-sm text-muted">Unreachable.</p>
                </TabPanel>
              </Tabs>
              <Tabs defaultValue="week" variant="pills" className="mt-6 max-w-sm">
                <TabList aria-label="Period">
                  <Tab value="week">This week</Tab>
                  <Tab value="month">This month</Tab>
                  <Tab value="all">All time</Tab>
                </TabList>
                <TabPanel value="week">
                  <p className="text-sm text-muted">Pills variant: week.</p>
                </TabPanel>
                <TabPanel value="month">
                  <p className="text-sm text-muted">Pills variant: month.</p>
                </TabPanel>
                <TabPanel value="all">
                  <p className="text-sm text-muted">Pills variant: all time.</p>
                </TabPanel>
              </Tabs>
            </Specimen>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Specimen title="Breadcrumbs">
                <Breadcrumbs
                  items={[
                    { label: "Subjects", href: "#navigation" },
                    { label: "Mathematics", href: "#navigation" },
                    { label: "Algebra", href: "#navigation" },
                    { label: "Solving quadratic equations by completing the square" },
                  ]}
                />
              </Specimen>
              <Specimen title="DropdownMenu" note="↓/↑, Home/End, type-ahead, Esc returns focus.">
                <DropdownMenuDemo />
              </Specimen>
            </div>
            <Specimen title="Pagination" note="Link-based prev/next (cursor friendly).">
              <div className="space-y-4">
                <Pagination prevHref="#navigation" nextHref="#navigation" summary="Showing 21–40" />
                <Pagination nextHref="#navigation" label="First page example" />
                <Pagination prevHref="#navigation" label="Last page example" />
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Overlays */}
          <ShowcaseSection id="overlays" title="Overlays" description="Native <dialog>: focus trap, Esc, inert background; focus returns to the opener.">
            <Specimen title="Dialog">
              <div className="flex flex-wrap gap-3">
                <Dialog
                  title="Leave this exam?"
                  description="Your answers so far are saved. The timer keeps running."
                  trigger={<Button variant="outline">Uncontrolled dialog</Button>}
                  footer={
                    <>
                      <DialogClose>Keep going</DialogClose>
                      <DialogClose variant="danger">Leave exam</DialogClose>
                    </>
                  }
                >
                  <p className="text-sm text-muted">Opened from a Server Component via the trigger prop.</p>
                </Dialog>
                <Dialog
                  role="alertdialog"
                  size="sm"
                  title="Delete study plan?"
                  description="This can't be undone."
                  trigger={<Button variant="danger">Alert dialog</Button>}
                  footer={
                    <>
                      <DialogClose>Cancel</DialogClose>
                      <DialogClose variant="danger">Delete</DialogClose>
                    </>
                  }
                />
                <ControlledDialogDemo />
                <Dialog title="Long content" trigger={<Button variant="ghost">Scrolling dialog</Button>}>
                  <div className="space-y-3 text-sm text-muted">
                    {Array.from({ length: 30 }, (_, i) => (
                      <p key={i}>Paragraph {i + 1} — the body scrolls while the header and footer stay put.</p>
                    ))}
                  </div>
                </Dialog>
              </div>
            </Specimen>
            <Specimen title="Sheet" note="auto = bottom sheet below 1024px, right panel above.">
              <div className="flex flex-wrap gap-3">
                {(["auto", "bottom", "left", "right"] as const).map((side) => (
                  <Sheet
                    key={side}
                    side={side}
                    title={`Sheet (${side})`}
                    description="Filters, mobile navigation, secondary detail."
                    trigger={<Button variant="outline">Sheet: {side}</Button>}
                    footer={<SheetClose variant="primary">Apply</SheetClose>}
                  >
                    <div className="space-y-4">
                      <Checkbox name={`f-${side}-1`} label="Only unanswered questions" />
                      <Checkbox name={`f-${side}-2`} label="Include past papers" />
                    </div>
                  </Sheet>
                ))}
              </div>
            </Specimen>
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Tables & empty states */}
          <ShowcaseSection id="tables" title="Tables & empty states" description="DataTable is a table from md, stacked cards below — one DOM.">
            <DataTable caption="Recent mock exams (sample data)" columns={EXAM_COLUMNS} rows={SAMPLE_EXAMS} rowKey={(row) => row.id} />
            <DataTable
              caption="Empty table"
              columns={EXAM_COLUMNS}
              rows={[]}
              rowKey={(row) => row.id}
              empty={
                <EmptyState
                  motif
                  icon={<Inbox aria-hidden="true" />}
                  title="No mock exams yet"
                  description="Your results will appear here after your first mock exam."
                  action={<ButtonLink href="#tables">Take a mock exam</ButtonLink>}
                />
              }
            />
            <EmptyState title="Plain empty state" titleAs="h3" description="Inside an existing card, without the border." appearance="plain" />
          </ShowcaseSection>

          {/* ------------------------------------------------------------------ Layout */}
          <ShowcaseSection id="layout" title="Layout" description="PageHeader, Container widths and the shells.">
            <Specimen title="PageHeader">
              <PageHeader
                className="pt-0 sm:pt-0"
                breadcrumbs={[{ label: "Subjects", href: "#layout" }, { label: "Mathematics" }]}
                eyebrow="ZIMSEC · O-Level"
                title="Mathematics"
                description="Syllabus 4004 (sample)."
                actions={
                  <>
                    <Button variant="outline">Study plan</Button>
                    <Button>Practise</Button>
                  </>
                }
              />
            </Specimen>
            <Specimen title="Container sizes" bodyClassName="space-y-2 px-0 sm:px-0">
              {(["reading", "default", "wide"] as const).map((size) => (
                <Container key={size} size={size}>
                  <div className="rounded-md bg-primary-soft px-3 py-2 font-mono text-xs text-on-primary-soft">{size}</div>
                </Container>
              ))}
            </Specimen>
            <Specimen title="Shells">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/dev/shell/app" variant="outline">
                  App shell
                </ButtonLink>
                <ButtonLink href="/dev/shell/admin" variant="outline">
                  Admin shell
                </ButtonLink>
                <ButtonLink href="/dev/shell/marketing" variant="outline">
                  Marketing shell
                </ButtonLink>
              </div>
            </Specimen>
          </ShowcaseSection>
        </div>
      </Container>
    </main>
  );
}
