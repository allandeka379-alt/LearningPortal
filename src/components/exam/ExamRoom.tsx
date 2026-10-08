"use client";

import { ArrowLeft, ArrowRight, Flag, LayoutGrid, ListChecks, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { QuestionView } from "@/components/questions/QuestionView";
import type { QuestionResponse } from "@/components/questions/types";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { IconButton } from "@/components/ui/IconButton";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/cn";
import { getBrowserOnline, subscribeToConnectivity } from "@/lib/pwa/browser";
import { ExamController, type ExamActions } from "./controller";
import { answerSummary, nextPosition, previousPosition, sectionStatus, sectionStatusLabel, type PositionLock, type SectionStatus } from "./exam-model";
import { ExamTimer } from "./ExamTimer";
import { shortcutFor, type ExamShortcut } from "./keyboard";
import { QuestionNavigator, type NavigatorGroup, type NavigatorItem } from "./QuestionNavigator";
import { ReviewScreen, type ReviewPaper } from "./ReviewScreen";
import { SaveStatus } from "./SaveStatus";
import { SectionGate } from "./SectionGate";
import { ShortcutHelp } from "./ShortcutHelp";
import { SubmitDialog } from "./SubmitDialog";
import type { ExamClock, ExamRoomData, ExamSubmitReason } from "./types";

export interface ExamRoomProps {
  /** Server-rendered room state (`getExamRoom`). */
  data: ExamRoomData;
  /** The exam Server Actions. */
  actions: ExamActions;
  /** Where "Save and leave" goes. */
  exitHref: string;
  /**
   * Where the student lands when the attempt closes (submitted, time up, or closed elsewhere). Default: the exam
   * results page. The diagnostic passes its report.
   */
  resultsHref?: string;
  /** What is being taken, in running text ("Submit your diagnostic?"). Default "exam". */
  noun?: string;
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting"; reason: ExamSubmitReason }
  /** Time is up but answers could not be saved yet (offline): retried when the connection returns. */
  | { kind: "waiting" }
  | { kind: "error"; reason: ExamSubmitReason; message: string }
  | { kind: "done" };

/** How often the countdown re-syncs with the server while the page is open (also on focus / visibility). */
const CLOCK_RESYNC_MS = 60_000;
const DESKTOP_QUERY = "(min-width: 64rem)";
const NAV_CURRENT_ID = "exam-navigator-current";
const serverOnline = () => true;

function lockFrom(attemptTimeUp: boolean, status: SectionStatus | undefined): PositionLock {
  if (attemptTimeUp) return "TIME_UP";
  if (status === "NOT_STARTED") return "NOT_STARTED";
  if (status === "FINISHED" || status === "TIME_UP") return "SECTION_CLOSED";
  return "OPEN";
}

/**
 * The exam room (§13): one client island over a server-rendered page. Minimal header (exam title, "Question n of N",
 * time remaining, Review), one question at a time with its mark allocation, flag, previous / next, a question grid
 * (side panel on desktop, bottom sheet on phones), a review screen and a confirmed submit.
 *
 * - Time: counted down towards the SERVER deadline, re-synced on focus, when the page becomes visible again, every
 *   minute and after every save; warnings at 10 / 5 / 1 minute(s) are announced politely; at zero the answers are
 *   saved and the exam is submitted (the server checks that time is really up).
 * - Answers: local first. Each change is shown at once and autosaved (debounced), retried when the connection drops
 *   and kept in localStorage for this attempt until the server confirms it. Answers the server refuses (time up,
 *   paper finished) are reported.
 * - Papers: a separately timed paper starts with its own Start button; one runs at a time; finishing it early locks
 *   its answers.
 * - Keyboard: N / P / F / Q / R (documented on the review screen), never while typing in an answer.
 */
export function ExamRoom({ data, actions, exitHref, resultsHref: resultsHrefProp, noun = "exam" }: ExamRoomProps) {
  const router = useRouter();
  const [controller] = useState(() => new ExamController(data, actions));
  const phase = useSyncExternalStore(controller.clock.subscribe, controller.clock.getPhase, controller.clock.getServerPhase);
  const { answers, status } = useSyncExternalStore(controller.answers.subscribe, controller.answers.getSnapshot, controller.answers.getServerSnapshot);
  const online = useSyncExternalStore(subscribeToConnectivity, getBrowserOnline, serverOnline);

  const total = data.questions.length;
  const [position, setPosition] = useState(data.startPosition);
  const [view, setView] = useState<"question" | "review">("question");
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });
  const [finishTarget, setFinishTarget] = useState<number | null>(null);
  const [sectionBusy, setSectionBusy] = useState(false);
  const [sectionError, setSectionError] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [focusRequest, setFocusRequest] = useState(0);

  const focusTarget = useRef<"question" | "review">("question");
  const paneRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef({ position: data.startPosition, since: 0, totals: new Map<number, number>() });
  const submitRef = useRef<SubmitState>(submit);
  const runSubmitRef = useRef<(reason: ExamSubmitReason) => Promise<void>>(async () => {});
  const shortcutRef = useRef<(action: ExamShortcut) => void>(() => {});

  const resultsHref = resultsHrefProp ?? `/app/exams/attempt/${data.attemptId}/results`;
  const sectionTitles: Record<number, string> = {};
  for (const section of data.sections) sectionTitles[section.sectionNumber] = section.title;
  const sectionOf = (sectionNumber: number | null) => (sectionNumber === null ? undefined : data.sections.find((s) => s.sectionNumber === sectionNumber));
  const lockOf = (sectionNumber: number | null) => lockFrom(phase.attemptTimeUp, sectionNumber === null ? undefined : phase.statuses[sectionNumber]);
  const runningNumber = Object.entries(phase.statuses).find(([, value]) => value === "RUNNING")?.[0];
  const runningSection = runningNumber === undefined ? undefined : sectionOf(Number(runningNumber));

  const busy = submit.kind === "submitting" || submit.kind === "done" || submit.kind === "waiting";
  const current = data.questions[position - 1];
  const currentSection = sectionOf(current?.sectionNumber ?? null);
  const lock = lockOf(current?.sectionNumber ?? null);
  const editable = !busy && lock === "OPEN";
  const answerOf = (p: number) => answers[p];
  const summary = answerSummary(
    data.questions.map((q) => ({ position: q.position, answered: (answerOf(q.position)?.response ?? null) !== null, flagged: answerOf(q.position)?.flagged ?? false })),
  );
  const prev = previousPosition(position, data.allowNavigation);
  const next = nextPosition(position, total);

  // ---------------------------------------------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------------------------------------------

  const requestFocus = (target: "question" | "review") => {
    focusTarget.current = target;
    setFocusRequest((n) => n + 1);
  };

  const accumulateTime = () => {
    const t = timeRef.current;
    const now = Date.now();
    if (t.since > 0) t.totals.set(t.position, (t.totals.get(t.position) ?? 0) + (now - t.since) / 1000);
    t.since = now;
  };

  const timeSpentOn = (p: number) => {
    const t = timeRef.current;
    return (t.totals.get(p) ?? 0) + (t.position === p && t.since > 0 ? (Date.now() - t.since) / 1000 : 0);
  };

  const goTo = (target: number) => {
    if (target < 1 || target > total) return;
    accumulateTime();
    timeRef.current.position = target;
    void controller.answers.flush();
    setPosition(target);
    setView("question");
    setNavigatorOpen(false);
    setSectionError(null);
    requestFocus("question");
  };

  const openReview = () => {
    if (!data.allowNavigation) return;
    void controller.answers.flush();
    setView("review");
    setNavigatorOpen(false);
    requestFocus("review");
  };

  const onAnswer = (response: QuestionResponse | null) => controller.answers.setResponse(position, response, timeSpentOn(position));

  const toggleFlag = () => {
    if (!editable || !data.allowNavigation) return;
    controller.answers.setFlag(position, !(answerOf(position)?.flagged ?? false));
  };

  const goToResults = (href: string) => {
    setSubmit({ kind: "done" });
    router.replace(href);
  };

  const runSubmit = async (reason: ExamSubmitReason) => {
    setSubmit({ kind: "submitting", reason });
    const outcome = await controller.submit(reason);
    switch (outcome.kind) {
      case "DONE":
        goToResults(outcome.href);
        return;
      case "NOT_DUE":
        setSubmit({ kind: "idle" });
        return;
      case "UNSAVED":
        setSubmit(
          reason === "TIME_UP"
            ? { kind: "waiting" }
            : { kind: "error", reason, message: "Some answers aren't saved yet. Check your connection and try again. Your answers are kept on this device." },
        );
        return;
      case "ERROR":
        setSubmit({ kind: "error", reason, message: outcome.message });
    }
  };

  const confirmSubmit = () => {
    if (submitRef.current.kind === "submitting" || submitRef.current.kind === "done") return;
    void runSubmit("STUDENT");
  };

  const startPaper = async (sectionNumber: number) => {
    setSectionBusy(true);
    setSectionError(null);
    const result = await controller.startSection(sectionNumber);
    setSectionBusy(false);
    if (!result.ok) {
      setSectionError(result.error.message);
      return;
    }
    setNotice(`${sectionTitles[sectionNumber] ?? "The paper"} has started.`);
    requestFocus("question");
  };

  const nextUnstartedAfter = (clock: ExamClock, sectionNumber: number) =>
    data.sections.find((s) => {
      const sectionClock = clock.sections.find((c) => c.sectionNumber === s.sectionNumber);
      return s.sectionNumber > sectionNumber && sectionClock !== undefined && sectionStatus(sectionClock, clock.serverNowMs) === "NOT_STARTED";
    });

  const confirmFinishPaper = async () => {
    if (finishTarget === null) return;
    const target = finishTarget;
    setSectionBusy(true);
    setSectionError(null);
    const result = await controller.finishSection(target);
    setSectionBusy(false);
    if (!result.ok) {
      setSectionError(result.error.message);
      return;
    }
    setFinishTarget(null);
    setNotice(`${sectionTitles[target] ?? "The paper"} is finished. Your answers in it are saved.`);
    const following = nextUnstartedAfter(result.data, target);
    if (following?.positions[0] !== undefined) goTo(following.positions[0]);
  };

  const leave = async () => {
    setLeaving(true);
    await controller.answers.drain();
    router.push(exitHref);
  };

  const onShortcut = (action: ExamShortcut) => {
    if (busy || confirmOpen || finishTarget !== null) return;
    switch (action) {
      case "next":
        if (view !== "question") return;
        if (next !== null) goTo(next);
        else if (data.allowNavigation) openReview();
        else setConfirmOpen(true);
        return;
      case "previous":
        if (view === "question" && prev !== null) goTo(prev);
        return;
      case "flag":
        if (view === "question") toggleFlag();
        return;
      case "review":
        openReview();
        return;
      case "questions":
        if (!data.allowNavigation) return;
        if (window.matchMedia(DESKTOP_QUERY).matches) document.getElementById(NAV_CURRENT_ID)?.focus();
        else setNavigatorOpen(true);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------
  // Effects: external stores, browser events, focus
  // ---------------------------------------------------------------------------------------------------------------

  // Latest handlers for the stores' callbacks and the global listeners (refs are written after render, never during).
  useEffect(() => {
    submitRef.current = submit;
    runSubmitRef.current = runSubmit;
    shortcutRef.current = onShortcut;
    controller.clock.setHandlers({
      onTimeUp: () => {
        const state = submitRef.current.kind;
        if (state === "submitting" || state === "done") return;
        setConfirmOpen(false);
        setNavigatorOpen(false);
        setFinishTarget(null);
        void runSubmitRef.current("TIME_UP");
      },
      onSectionTimeUp: () => {
        void controller.answers.flush();
      },
    });
    controller.answers.setHandlers({
      onRejected: (entry, error) => {
        setNotice(`Question ${entry.position}: ${error.message}`);
        if (error.code === "CONFLICT") {
          void controller.syncClock({ force: true }).then((outcome) => {
            if (outcome === "CLOSED") goToResults(resultsHref);
          });
        }
      },
    });
  });

  useEffect(() => {
    const store = controller.answers;
    store.restore();
    timeRef.current.since = Date.now();
    const sync = () => {
      void controller.syncClock().then((outcome) => {
        if (outcome !== "CLOSED") return;
        store.stop();
        store.clearStorage();
        router.replace(resultsHref);
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") void store.flush();
      else sync();
    };
    const onOnline = () => {
      void store.flush();
      sync();
      if (submitRef.current.kind === "waiting") void runSubmitRef.current("TIME_UP");
    };
    const onPageHide = () => void store.flush();
    const onKeyDown = (event: KeyboardEvent) => {
      const action = shortcutFor(event);
      if (!action || document.querySelector("dialog[open]")) return;
      event.preventDefault();
      shortcutRef.current(action);
    };
    const interval = window.setInterval(sync, CLOCK_RESYNC_MS);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("focus", sync);
    window.addEventListener("online", onOnline);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("focus", sync);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("pagehide", onPageHide);
      store.stop();
    };
  }, [controller, router, resultsHref]);

  // Move focus to the new question's (or the review screen's) heading after a navigation the student asked for.
  useEffect(() => {
    if (focusRequest === 0) return;
    const pane = paneRef.current;
    if (!pane) return;
    const heading = pane.querySelector<HTMLElement>(focusTarget.current === "review" ? "#review-heading" : "h2");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    pane.closest<HTMLElement>("[data-exam-scroll]")?.scrollTo({ top: 0 });
    heading.focus();
  }, [focusRequest]);

  // ---------------------------------------------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------------------------------------------

  const itemFor = (p: number, sectionNumber: number | null): NavigatorItem => {
    const itemLock = lockOf(sectionNumber);
    return {
      position: p,
      answered: (answerOf(p)?.response ?? null) !== null,
      flagged: answerOf(p)?.flagged ?? false,
      locked: itemLock === "NOT_STARTED" || itemLock === "SECTION_CLOSED",
    };
  };
  const unsectioned = data.questions.filter((q) => q.sectionNumber === null || !sectionOf(q.sectionNumber));
  const showGroups = data.sections.length > 1 || data.sections.some((s) => s.timeLimitSeconds !== null);
  const groups: NavigatorGroup[] = showGroups
    ? [
        ...data.sections.map((s) => ({
          key: `s${s.sectionNumber}`,
          title: s.title,
          statusLabel: sectionStatusLabel(phase.statuses[s.sectionNumber] ?? "UNTIMED", null),
          items: s.positions.map((p) => itemFor(p, s.sectionNumber)),
        })),
        ...(unsectioned.length > 0 ? [{ key: "other", title: "Other questions", statusLabel: "", items: unsectioned.map((q) => itemFor(q.position, null)) }] : []),
      ]
    : [{ key: "all", title: null, statusLabel: "", items: data.questions.map((q) => itemFor(q.position, q.sectionNumber)) }];

  const papers: ReviewPaper[] = data.sections.map((s) => {
    const sectionState = phase.statuses[s.sectionNumber] ?? "UNTIMED";
    const otherOpen = data.sections.some((o) => o.sectionNumber !== s.sectionNumber && o.timeLimitSeconds !== null && (phase.statuses[o.sectionNumber] === "NOT_STARTED" || phase.statuses[o.sectionNumber] === "RUNNING"));
    return {
      sectionNumber: s.sectionNumber,
      title: s.title,
      statusLabel: sectionStatusLabel(sectionState, null),
      answered: s.positions.filter((p) => (answerOf(p)?.response ?? null) !== null).length,
      total: s.positions.length,
      canFinish: sectionState === "RUNNING" && otherOpen,
      notStarted: sectionState === "NOT_STARTED",
      firstPosition: s.positions[0] ?? null,
    };
  });

  const flagged = answerOf(position)?.flagged ?? false;
  const flagButton =
    data.allowNavigation && current?.question ? (
      <Button
        variant={flagged ? "secondary" : "ghost"}
        aria-pressed={flagged}
        aria-keyshortcuts="F"
        onClick={toggleFlag}
        disabled={!editable}
        iconStart={<Flag aria-hidden="true" className={cn(flagged && "fill-current")} />}
      >
        {flagged ? "Flagged" : "Flag"}
      </Button>
    ) : null;

  const followingPaper = currentSection
    ? data.sections.find((s) => s.sectionNumber > currentSection.sectionNumber && (phase.statuses[s.sectionNumber] === "NOT_STARTED" || phase.statuses[s.sectionNumber] === "RUNNING"))
    : undefined;
  const currentStatus = currentSection ? phase.statuses[currentSection.sectionNumber] : undefined;

  const finalButton = data.allowNavigation ? (
    <Button onClick={openReview} iconEnd={<ListChecks aria-hidden="true" />} disabled={busy}>
      Review and submit
    </Button>
  ) : (
    <Button onClick={() => setConfirmOpen(true)} iconEnd={<Send aria-hidden="true" />} disabled={busy}>
      Submit {noun}
    </Button>
  );

  const saveStatus = <SaveStatus status={status} online={online} />;

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-surface pt-[env(safe-area-inset-top)]">
        {/* min-h, not h: at the largest text size (§43) the title wraps instead of being cut off on a phone. */}
        <div className="mx-auto flex min-h-16 w-full max-w-page items-center gap-2 px-4 py-1.5 sm:gap-3 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-xs font-medium break-words text-muted sm:text-sm">{data.title}</h1>
            <p className="text-sm font-semibold break-words text-text sm:text-base">
              {view === "review" ? "Review your answers" : `Question ${position} of ${total}`}
            </p>
          </div>
          <ExamTimer store={controller.clock} sectionTitles={sectionTitles} hasPaperTimers={data.sections.some((s) => s.timeLimitSeconds !== null)} />
          {data.allowNavigation && (
            <Button
              variant={view === "review" ? "secondary" : "outline"}
              onClick={view === "review" ? () => goTo(position) : openReview}
              aria-keyshortcuts={view === "review" ? undefined : "R"}
              iconStart={view === "review" ? <ArrowLeft aria-hidden="true" /> : <ListChecks aria-hidden="true" />}
              disabled={busy}
            >
              <span className="hidden sm:inline">{view === "review" ? "Questions" : "Review"}</span>
              <span className="sr-only sm:hidden">{view === "review" ? "Back to the questions" : "Review your answers"}</span>
            </Button>
          )}
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-page flex-1 gap-8 px-4 sm:px-6 lg:px-8">
        <div ref={paneRef} className="min-w-0 flex-1">
          {submit.kind === "submitting" && submit.reason === "TIME_UP" && (
            <Alert tone="warning" role="status" title="Time is up" className="mt-6">
              Saving and submitting your answers…
            </Alert>
          )}
          {submit.kind === "waiting" && (
            <Alert tone="warning" role="status" title="Time is up" className="mt-6">
              You&apos;re offline. Your answers are kept on this device and will be submitted as soon as you reconnect. Keep this page
              open.
            </Alert>
          )}
          {submit.kind === "error" && submit.reason === "TIME_UP" && (
            <Alert
              tone="danger"
              role="alert"
              title={`Your ${noun} couldn't be submitted`}
              className="mt-6"
              action={<Button onClick={() => void runSubmit("TIME_UP")}>Try again</Button>}
            >
              {submit.message}
            </Alert>
          )}

          {view === "review" ? (
            <ReviewScreen
              summary={summary}
              papers={papers}
              backPosition={position}
              onJump={goTo}
              onBack={() => goTo(position)}
              onSubmit={() => setConfirmOpen(true)}
              onFinishPaper={(sectionNumber) => setFinishTarget(sectionNumber)}
              onLeave={() => void leave()}
              leaving={leaving}
              submitDisabled={busy}
              saveStatus={saveStatus}
              navigator={<QuestionNavigator groups={groups} current={position} onJump={goTo} />}
              noun={noun}
            />
          ) : (
            <div className="mx-auto max-w-reading space-y-5 py-6">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                {currentSection && showGroups ? <p className="text-sm font-semibold text-primary">{currentSection.title}</p> : <span />}
                {saveStatus}
              </div>

              {!current ? (
                <Alert tone="warning">This question doesn&apos;t exist in this {noun}.</Alert>
              ) : lock === "NOT_STARTED" && currentSection && currentSection.timeLimitSeconds !== null ? (
                <SectionGate
                  title={currentSection.title}
                  questionCount={currentSection.positions.length}
                  marks={currentSection.marks}
                  timeLimitSeconds={currentSection.timeLimitSeconds}
                  blockedBy={runningSection ? { sectionNumber: runningSection.sectionNumber, title: runningSection.title } : null}
                  starting={sectionBusy}
                  error={sectionError}
                  onStart={() => void startPaper(currentSection.sectionNumber)}
                  onFinishRunning={(sectionNumber) => setFinishTarget(sectionNumber)}
                  onGoTo={(sectionNumber) => {
                    const first = sectionOf(sectionNumber)?.positions[0];
                    if (first !== undefined) goTo(first);
                  }}
                />
              ) : (
                <>
                  {lock === "SECTION_CLOSED" && currentSection && (
                    <Alert
                      tone="info"
                      title={currentStatus === "TIME_UP" ? `Time is up for ${currentSection.title}` : `You finished ${currentSection.title}`}
                      action={
                        followingPaper?.positions[0] !== undefined ? (
                          <Button variant="outline" onClick={() => goTo(followingPaper.positions[0] as number)}>
                            Go to {followingPaper.title}
                          </Button>
                        ) : undefined
                      }
                    >
                      Your answers in this paper are saved and can no longer be changed.
                    </Alert>
                  )}
                  {current.question ? (
                    <QuestionView
                      key={current.position}
                      question={current.question}
                      mode="exam"
                      response={answerOf(position)?.response ?? null}
                      onChange={editable ? onAnswer : undefined}
                      disabled={!editable}
                      heading={`Question ${position}`}
                      headingLevel={2}
                      headerAside={flagButton}
                    />
                  ) : (
                    <Alert tone="warning" title={`Question ${position} can't be shown`}>
                      It was withdrawn after this {noun} started. Move on to the next question.
                    </Alert>
                  )}
                </>
              )}

              <div className="hidden items-center justify-between gap-3 border-t border-border pt-5 lg:flex">
                <Button variant="outline" onClick={() => prev !== null && goTo(prev)} disabled={prev === null} iconStart={<ArrowLeft aria-hidden="true" />} aria-keyshortcuts="P">
                  Previous
                </Button>
                {next !== null ? (
                  <Button onClick={() => goTo(next)} iconEnd={<ArrowRight aria-hidden="true" />} aria-keyshortcuts="N">
                    Next question
                  </Button>
                ) : (
                  finalButton
                )}
              </div>
            </div>
          )}
        </div>

        {data.allowNavigation && (
          <aside aria-labelledby="exam-navigator-heading" className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-16 max-h-[calc(100dvh-4rem)] space-y-4 overflow-y-auto overscroll-contain px-1 py-6">
              <div>
                <h2 id="exam-navigator-heading" className="text-base font-semibold text-text">
                  Questions
                </h2>
                <p className="text-sm text-muted">
                  {summary.answered} of {total} answered{summary.flagged.length > 0 ? ` · ${summary.flagged.length} flagged` : ""}
                </p>
              </div>
              <QuestionNavigator groups={groups} current={position} onJump={goTo} currentButtonId={NAV_CURRENT_ID} />
              <Button variant="outline" fullWidth onClick={openReview} iconStart={<ListChecks aria-hidden="true" />} disabled={busy}>
                Review and submit
              </Button>
              {view === "question" && <ShortcutHelp />}
            </div>
          </aside>
        )}
      </div>

      {view === "question" && (
        <nav aria-label="Question navigation" className="sticky bottom-0 z-10 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
          <div className="mx-auto flex max-w-reading items-center gap-2 px-4 py-2">
            <IconButton
              variant="outline"
              aria-label="Previous question"
              aria-keyshortcuts="P"
              icon={<ArrowLeft aria-hidden="true" />}
              onClick={() => prev !== null && goTo(prev)}
              disabled={prev === null}
            />
            {data.allowNavigation ? (
              <Button
                variant="ghost"
                className="min-w-0 flex-1"
                onClick={() => setNavigatorOpen(true)}
                aria-haspopup="dialog"
                aria-keyshortcuts="Q"
                iconStart={<LayoutGrid aria-hidden="true" />}
              >
                <span aria-hidden="true" className="tabular-nums">
                  {summary.answered}/{total}
                </span>
                <span className="sr-only">
                  Questions: {summary.answered} of {total} answered. Open the question list.
                </span>
              </Button>
            ) : (
              <span className="flex-1" />
            )}
            {next !== null ? (
              <Button onClick={() => goTo(next)} iconEnd={<ArrowRight aria-hidden="true" />} aria-keyshortcuts="N">
                Next
              </Button>
            ) : data.allowNavigation ? (
              <Button onClick={openReview} iconEnd={<ListChecks aria-hidden="true" />} disabled={busy}>
                Review
              </Button>
            ) : (
              <Button onClick={() => setConfirmOpen(true)} iconEnd={<Send aria-hidden="true" />} disabled={busy}>
                Submit
              </Button>
            )}
          </div>
        </nav>
      )}

      {data.allowNavigation && (
        <Sheet open={navigatorOpen} onOpenChange={setNavigatorOpen} side="bottom" title="Questions" description={`${summary.answered} of ${total} answered`}>
          <QuestionNavigator groups={groups} current={position} onJump={goTo} />
          <Button variant="outline" fullWidth className="mt-5" onClick={openReview} iconStart={<ListChecks aria-hidden="true" />} disabled={busy}>
            Review and submit
          </Button>
        </Sheet>
      )}

      <SubmitDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          setConfirmOpen(open);
          if (!open && submit.kind === "error") setSubmit({ kind: "idle" });
        }}
        summary={summary}
        unsaved={status.unsaved}
        submitting={submit.kind === "submitting" || submit.kind === "done"}
        error={submit.kind === "error" && submit.reason === "STUDENT" ? submit.message : null}
        onConfirm={confirmSubmit}
        noun={noun}
      />

      <Dialog
        open={finishTarget !== null}
        onOpenChange={(open) => {
          if (!open && !sectionBusy) {
            setFinishTarget(null);
            setSectionError(null);
          }
        }}
        role="alertdialog"
        size="sm"
        title={`Finish ${finishTarget !== null ? (sectionTitles[finishTarget] ?? "this paper") : "this paper"}?`}
        footer={
          <>
            <DialogClose disabled={sectionBusy} data-autofocus>
              Keep working
            </DialogClose>
            <Button onClick={() => void confirmFinishPaper()} loading={sectionBusy} loadingText="Finishing…">
              Finish paper
            </Button>
          </>
        }
      >
        <div className="space-y-2 text-sm text-text">
          <p>You won&apos;t be able to change your answers in this paper afterwards. Its timer stops and you can start the next paper.</p>
          {finishTarget !== null && (
            <p>
              {papers.find((p) => p.sectionNumber === finishTarget)?.answered ?? 0} of {papers.find((p) => p.sectionNumber === finishTarget)?.total ?? 0}{" "}
              questions answered in this paper.
            </p>
          )}
          {sectionError && finishTarget !== null && (
            <p role="alert" className="font-medium text-danger-text">
              {sectionError}
            </p>
          )}
        </div>
      </Dialog>

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {notice}
      </p>
    </div>
  );
}
