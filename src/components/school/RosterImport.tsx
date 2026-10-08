"use client";

import { FileSpreadsheet, RotateCcw, Upload } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { ActionResult } from "@/server/lib/errors";
import type { CredentialSlip, RosterIssue, RosterOutcome, RosterRow } from "@/server/schools/core";
import { chunkRows, rosterRowForCommit } from "@/server/schools/roster-rows";
import { CredentialSlips } from "./CredentialSlips";
import { ROSTER_OUTCOME_META } from "./labels";

/** Dry-run result as the browser receives it. */
export interface RosterDryRunView {
  importId: string;
  format: "CSV" | "XLSX" | null;
  fileIssues: RosterIssue[];
  totals: Record<RosterOutcome, number>;
  rows: (RosterRow & { outcome: RosterOutcome; issues: RosterIssue[]; newClass: boolean })[];
  newClasses: string[];
}

export interface RosterChunkView {
  chunkIndex: number;
  results: { row: number; outcome: RosterOutcome; message: string | null }[];
  slips: CredentialSlip[];
  invitationsSent: number;
  invitationsUndelivered: number;
  classesCreated: string[];
}

export interface RosterCommitInput {
  importId: string;
  chunkIndex: number;
  rows: RosterRow[];
  guardianConsentCollected: boolean;
  createMissingClasses: boolean;
  academicYear: string;
}

export interface RosterImportProps {
  validateAction: (formData: FormData) => Promise<ActionResult<RosterDryRunView>>;
  commitAction: (input: RosterCommitInput) => Promise<ActionResult<RosterChunkView>>;
  schoolName: string;
  signInUrl: string;
  defaultAcademicYear: string;
  templateHref: string;
  maxFileBytes: number;
}

type Stage = "upload" | "review" | "importing" | "done";

const COMMITTABLE: readonly RosterOutcome[] = ["create", "invite", "existing"];

/**
 * Roster import wizard (§23): 1) upload a CSV / Excel file and get a DRY-RUN report (nothing is saved), 2) review every
 * row's outcome and problems, confirm guardian consent and class creation, 3) import in chunks of 50 with progress,
 * 4) print the one-time credential slips. A failed chunk stops the import with its message; chunks already saved stay
 * saved, and "Continue" resumes with the next one.
 */
export function RosterImport({ validateAction, commitAction, schoolName, signInUrl, defaultAcademicYear, templateHref, maxFileBytes }: RosterImportProps) {
  const [stage, setStage] = useState<Stage>("upload");
  const [pending, startTransition] = useTransition();
  const [dryRun, setDryRun] = useState<RosterDryRunView | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [onlyProblems, setOnlyProblems] = useState(true);
  const [consent, setConsent] = useState(false);
  const [createClasses, setCreateClasses] = useState(true);
  const [academicYear, setAcademicYear] = useState(defaultAcademicYear);
  const [chunksDone, setChunksDone] = useState(0);
  const [commitError, setCommitError] = useState<string | null>(null);
  const [results, setResults] = useState<RosterChunkView[]>([]);

  const toImport = useMemo(() => (dryRun ? dryRun.rows.filter((row) => COMMITTABLE.includes(row.outcome)) : []), [dryRun]);
  const chunks = useMemo(() => chunkRows(toImport), [toImport]);
  const slips = results.flatMap((result) => result.slips);

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("file");
    const file = input instanceof HTMLInputElement ? input.files?.[0] : undefined;
    if (!file || file.size === 0) {
      setUploadError("Choose a CSV or Excel file first.");
      return;
    }
    if (file.size > maxFileBytes) {
      setUploadError("The file is larger than 2 MB. Split the roster into smaller files (for example one per form).");
      return;
    }
    setUploadError(null);
    const formData = new FormData();
    formData.set("file", file, file.name);
    startTransition(async () => {
      const result = await validateAction(formData);
      if (!result.ok) {
        setUploadError(result.error.message);
        return;
      }
      setDryRun(result.data);
      setOnlyProblems(result.data.rows.some((row) => row.issues.length > 0));
      setStage("review");
    });
  }

  function importFrom(startChunk: number) {
    if (!dryRun) return;
    setCommitError(null);
    setStage("importing");
    startTransition(async () => {
      for (let index = startChunk; index < chunks.length; index += 1) {
        const chunk = chunks[index] ?? [];
        const result = await commitAction({
          importId: dryRun.importId,
          chunkIndex: index,
          rows: chunk.map(rosterRowForCommit),
          guardianConsentCollected: consent,
          createMissingClasses: createClasses,
          academicYear,
        });
        if (!result.ok && result.error.code !== "CONFLICT") {
          setCommitError(result.error.message);
          setChunksDone(index);
          return;
        }
        if (result.ok) setResults((previous) => [...previous, result.data]);
        setChunksDone(index + 1);
      }
      setStage("done");
    });
  }

  function reset() {
    setStage("upload");
    setDryRun(null);
    setResults([]);
    setChunksDone(0);
    setCommitError(null);
    setConsent(false);
  }

  if (stage === "upload") {
    return (
      <form onSubmit={check} method="post" encType="multipart/form-data" className="space-y-4" aria-describedby="roster-help">
        <div id="roster-help" className="space-y-2 text-sm text-muted">
          <p>
            Columns: <strong>First name</strong>, <strong>Last name</strong>, Form, Class, and optionally Email, Phone, Parent
            phone, Student number and Subjects (separated by semicolons). Up to 1,000 students per file.
          </p>
          <p>
            <Link href={templateHref} className="font-semibold text-primary underline-offset-4 hover:underline">
              Download the template (CSV)
            </Link>
          </p>
        </div>
        <Field label="Roster file" hint="CSV or Excel (.xlsx), at most 2 MB. Nothing is saved until you confirm the import." error={uploadError}>
          <Input type="file" name="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required />
        </Field>
        <Button type="submit" iconStart={<Upload aria-hidden="true" />} loading={pending} loadingText="Checking…">
          Check file
        </Button>
      </form>
    );
  }

  if (!dryRun) return null;
  const visibleRows = onlyProblems ? dryRun.rows.filter((row) => row.issues.length > 0 || row.outcome === "error") : dryRun.rows;
  const fileErrors = dryRun.fileIssues.filter((issue) => issue.severity === "error");

  return (
    <div className="space-y-6">
      {stage === "review" && (
        <>
          <section aria-labelledby="roster-summary" className="space-y-3">
            <h2 id="roster-summary" className="text-lg font-semibold text-text">
              Check before importing
            </h2>
            <ul className="flex flex-wrap gap-2" aria-label="Rows by outcome">
              {(Object.keys(dryRun.totals) as RosterOutcome[]).map((outcome) => (
                <li key={outcome}>
                  <Badge tone={ROSTER_OUTCOME_META[outcome]?.tone ?? "neutral"}>
                    {ROSTER_OUTCOME_META[outcome]?.label ?? outcome}: {dryRun.totals[outcome]}
                  </Badge>
                </li>
              ))}
            </ul>
            {dryRun.fileIssues.map((issue, index) => (
              <Alert key={index} tone={issue.severity === "error" ? "danger" : "warning"}>
                {issue.message}
              </Alert>
            ))}
            {dryRun.newClasses.length > 0 && (
              <Alert tone="info" title="New classes">
                {dryRun.newClasses.join(", ")} will be created (you can add teachers and a subject afterwards).
              </Alert>
            )}
          </section>

          {dryRun.rows.length > 0 && (
            <section aria-labelledby="roster-rows" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 id="roster-rows" className="text-base font-semibold text-text">
                  Rows {onlyProblems ? "that need attention" : ""}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setOnlyProblems((value) => !value)}>
                  {onlyProblems ? "Show all rows" : "Show only rows with notes"}
                </Button>
              </div>
              {visibleRows.length === 0 ? (
                <p className="text-sm text-muted">Every row looks good.</p>
              ) : (
                <ul className="divide-y divide-border rounded-card border border-border bg-surface">
                  {visibleRows.slice(0, 500).map((row) => (
                    <li key={row.row} className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-start sm:gap-4">
                      <span className="w-16 shrink-0 text-muted">Row {row.row}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-text">
                          {[row.firstName, row.lastName].filter(Boolean).join(" ") || "(no name)"}
                          {row.className && <span className="font-normal text-muted"> · {row.className}</span>}
                        </p>
                        {row.issues.length > 0 && (
                          <ul className="mt-1 space-y-0.5">
                            {row.issues.map((issue, index) => (
                              <li key={index} className={issue.severity === "error" ? "text-danger-text" : "text-muted"}>
                                {issue.message}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <Badge tone={ROSTER_OUTCOME_META[row.outcome]?.tone ?? "neutral"} className="self-start">
                        {ROSTER_OUTCOME_META[row.outcome]?.label ?? row.outcome}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
              {visibleRows.length > 500 && <p className="text-sm text-muted">Showing the first 500 rows.</p>}
            </section>
          )}

          {fileErrors.length === 0 && toImport.length > 0 && (
            <section aria-labelledby="roster-options" className="space-y-3 rounded-card border border-border bg-surface p-4">
              <h3 id="roster-options" className="text-base font-semibold text-text">
                Import options
              </h3>
              <Checkbox
                label="Our school has collected parent or guardian consent for these students"
                description="Records consent as collected by the school for new student accounts. Leave unticked if you have not: their parents can give consent later."
                checked={consent}
                onChange={(event) => setConsent(event.currentTarget.checked)}
              />
              {dryRun.newClasses.length > 0 && (
                <Checkbox
                  label="Create the new classes"
                  description="If unticked, students in unknown classes join the school without a class."
                  checked={createClasses}
                  onChange={(event) => setCreateClasses(event.currentTarget.checked)}
                />
              )}
              <Field label="Academic year for new classes" hint="For example 2026 or 2026/27." className="max-w-xs">
                <Input value={academicYear} onChange={(event) => setAcademicYear(event.currentTarget.value)} inputMode="numeric" maxLength={7} />
              </Field>
            </section>
          )}

          <div className="flex flex-wrap gap-2">
            {fileErrors.length === 0 && (
              <Button onClick={() => importFrom(0)} disabled={toImport.length === 0 || pending} iconStart={<FileSpreadsheet aria-hidden="true" />}>
                {toImport.length === 0 ? "Nothing to import" : `Import ${toImport.length} student${toImport.length === 1 ? "" : "s"}`}
              </Button>
            )}
            <Button variant="outline" onClick={reset} iconStart={<RotateCcw aria-hidden="true" />}>
              Choose another file
            </Button>
          </div>
        </>
      )}

      {(stage === "importing" || stage === "done") && (
        <section aria-labelledby="roster-progress" className="space-y-3">
          <h2 id="roster-progress" className="text-lg font-semibold text-text">
            {stage === "done" ? "Import finished" : "Importing…"}
          </h2>
          <ProgressBar
            label="Import progress"
            value={chunksDone}
            max={Math.max(chunks.length, 1)}
            valueText={`${Math.min(chunksDone * 50, toImport.length)} of ${toImport.length} rows`}
          />
          <div aria-live="polite" role="status" className="space-y-2">
            {commitError && (
              <Alert tone="danger" title="The import stopped" action={<Button size="sm" variant="outline" onClick={() => importFrom(chunksDone)}>Continue</Button>}>
                {commitError} Rows before this point were saved.
              </Alert>
            )}
            {stage === "done" && <ImportSummary results={results} />}
          </div>
        </section>
      )}

      <CredentialSlips slips={slips} schoolName={schoolName} signInUrl={signInUrl} />

      {stage === "done" && (
        <Button variant="outline" onClick={reset} iconStart={<RotateCcw aria-hidden="true" />}>
          Import another file
        </Button>
      )}
    </div>
  );
}

function ImportSummary({ results }: { results: readonly RosterChunkView[] }) {
  const rows = results.flatMap((result) => result.results);
  const count = (outcome: RosterOutcome) => rows.filter((row) => row.outcome === outcome).length;
  const classes = [...new Set(results.flatMap((result) => result.classesCreated))];
  const undelivered = results.reduce((sum, result) => sum + result.invitationsUndelivered, 0);
  const notImported = rows.filter((row) => row.outcome === "error" || row.outcome === "skip");
  return (
    <div className="space-y-2 text-sm">
      <Alert tone="success">
        {count("create")} new account{count("create") === 1 ? "" : "s"}, {count("invite")} invitation{count("invite") === 1 ? "" : "s"} sent,{" "}
        {count("existing")} already on the roster updated.
        {classes.length > 0 ? ` New classes: ${classes.join(", ")}.` : ""}
      </Alert>
      {undelivered > 0 && (
        <Alert tone="warning">
          {undelivered} invitation message(s) were not sent (we don&apos;t send text messages to phone numbers, or an email failed). On the
          Students page, &ldquo;Send again&rdquo; shows a new link you can share.
        </Alert>
      )}
      {notImported.length > 0 && (
        <Alert tone="warning" title={`${notImported.length} row(s) not imported`}>
          <ul className="list-disc space-y-0.5 pl-5">
            {notImported.slice(0, 20).map((row) => (
              <li key={row.row}>
                Row {row.row}: {row.message ?? "skipped"}
              </li>
            ))}
          </ul>
        </Alert>
      )}
    </div>
  );
}
