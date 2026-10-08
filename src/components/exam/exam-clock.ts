/**
 * The exam room's countdown (§13 "time remaining"), as a small external store for `useSyncExternalStore`.
 *
 * - The server is authoritative: the store only ever counts down to deadlines it received from the server, using the
 *   offset between the server clock (`serverNowMs`) and this device's clock. `sync()` replaces the clock (on focus,
 *   when the page becomes visible again, after saves) and re-estimates the offset from the request's round trip.
 * - Before the store is subscribed (server render and hydration) the snapshot is the server's own, so the remaining
 *   time is rendered on the server and hydration never mismatches.
 * - Warnings at 10, 5 and 1 minute(s) are produced ONCE per deadline as a plain sentence for a polite live region
 *   (never every second). Papers announce "Time is up for <paper>." when their own clock runs out.
 * - `onTimeUp` fires once when the whole attempt must be submitted (`timeUpDue`), including right after loading a
 *   page whose time has already run out; it fires again only after a `sync()` that re-opened the time.
 *
 * Two snapshots: `getTick()` changes every second (the timer display); `getPhase()` changes only when a paper starts,
 * finishes or runs out, or time is up, so the rest of the room does not re-render every second.
 */
import {
  activeDeadline,
  deadlineKey,
  sectionStatus,
  spokenDuration,
  timeUpDue,
  type ActiveDeadline,
  type SectionStatus,
} from "./exam-model";
import type { ExamClock } from "./types";

/** Remaining-time thresholds (seconds) announced in the live region: 10, 5 and 1 minute(s). */
export const TIME_WARNING_SECONDS = [600, 300, 60] as const;

/**
 * The threshold to announce now, given the thresholds already announced for this deadline. When several are crossed
 * at once (a page opened with 4 minutes left) only the lowest is announced. Nothing is announced at zero (time-up
 * has its own message).
 */
export function dueWarning(remainingSeconds: number, announced: ReadonlySet<number>): { threshold: number | null; announced: Set<number> } {
  const next = new Set(announced);
  let threshold: number | null = null;
  for (const limit of TIME_WARNING_SECONDS) {
    if (remainingSeconds > limit) continue;
    if (remainingSeconds > 0 && !next.has(limit)) threshold = limit;
    next.add(limit);
  }
  return { threshold, announced: next };
}

/** "5 minutes left." at the threshold, "Less than 5 minutes left." when the page was opened later than that. */
export function warningMessage(threshold: number, remainingSeconds: number, label: string | null): string {
  const minutes = Math.round(threshold / 60);
  const amount = `${minutes} minute${minutes === 1 ? "" : "s"}`;
  const exact = remainingSeconds >= threshold - 2;
  const sentence = exact ? `${amount} left.` : `Less than ${amount} left.`;
  return label ? `${label}: ${sentence}` : sentence;
}

export interface ClockTick {
  /** Estimated server time (ms). */
  nowMs: number;
  /** The deadline the countdown shows, if any. */
  active: ActiveDeadline | null;
  /** Whole seconds left on `active` (rounded up), null when nothing is timed right now. */
  remainingSeconds: number | null;
  /** Latest sentence for the polite live region ("" before the first one). */
  announcement: string;
}

export interface ClockPhase {
  clock: ExamClock;
  /** Status of each paper at the last transition. */
  statuses: Readonly<Record<number, SectionStatus>>;
  /** The overall deadline has passed: every answer is locked. */
  attemptTimeUp: boolean;
  /** The attempt must be submitted because time is up (overall, or every timed paper is over). */
  timeUpDue: boolean;
}

export interface ExamClockHandlers {
  onTimeUp?: () => void;
  onSectionTimeUp?: (sectionNumber: number) => void;
}

export interface ExamClockStoreOptions {
  /** Paper titles, for announcements ("Paper 1: 5 minutes left."). */
  sectionTitles?: Readonly<Record<number, string>>;
  /** Tick interval while subscribed (default 250 ms; the snapshot only changes when the second changes). */
  tickMs?: number;
  /** This device's clock (tests inject a fake). */
  deviceNow?: () => number;
}

function phaseOf(clock: ExamClock, nowMs: number): ClockPhase {
  const statuses: Record<number, SectionStatus> = {};
  for (const section of clock.sections) statuses[section.sectionNumber] = sectionStatus(section, nowMs);
  return {
    clock,
    statuses,
    attemptTimeUp: clock.deadlineMs !== null && nowMs >= clock.deadlineMs,
    timeUpDue: clock.open && timeUpDue(clock, nowMs),
  };
}

function samePhase(a: ClockPhase, b: ClockPhase): boolean {
  if (a.clock !== b.clock || a.attemptTimeUp !== b.attemptTimeUp || a.timeUpDue !== b.timeUpDue) return false;
  const keys = Object.keys(a.statuses);
  return keys.length === Object.keys(b.statuses).length && keys.every((key) => a.statuses[Number(key)] === b.statuses[Number(key)]);
}

function remainingOf(active: ActiveDeadline | null, nowMs: number): number | null {
  return active ? Math.max(0, Math.ceil((active.deadlineMs - nowMs) / 1000)) : null;
}

export class ExamClockStore {
  private clock: ExamClock;
  private offsetMs: number | null = null;
  private tick: ClockTick;
  private phase: ClockPhase;
  private readonly initialTick: ClockTick;
  private readonly initialPhase: ClockPhase;
  private readonly listeners = new Set<() => void>();
  private interval: ReturnType<typeof setInterval> | null = null;
  private readonly announced = new Map<string, Set<number>>();
  private timeUpSignalled = false;
  private pendingTimeUp = false;
  private readonly pendingSections: number[] = [];
  private handlers: ExamClockHandlers = {};
  private readonly titles: Readonly<Record<number, string>>;
  private readonly tickMs: number;
  private readonly deviceNow: () => number;

  constructor(initial: ExamClock, options: ExamClockStoreOptions = {}) {
    this.clock = initial;
    this.titles = options.sectionTitles ?? {};
    this.tickMs = options.tickMs ?? 250;
    this.deviceNow = options.deviceNow ?? (() => Date.now());
    const active = activeDeadline(initial, initial.serverNowMs);
    this.initialTick = { nowMs: initial.serverNowMs, active, remainingSeconds: remainingOf(active, initial.serverNowMs), announcement: "" };
    this.initialPhase = phaseOf(initial, initial.serverNowMs);
    this.tick = this.initialTick;
    this.phase = this.initialPhase;
  }

  // --- useSyncExternalStore -----------------------------------------------------------------------------------------

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    if (this.listeners.size === 1) this.start();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.stop();
    };
  };

  getTick = (): ClockTick => this.tick;
  getServerTick = (): ClockTick => this.initialTick;
  getPhase = (): ClockPhase => this.phase;
  getServerPhase = (): ClockPhase => this.initialPhase;

  // --- commands -----------------------------------------------------------------------------------------------------

  /** Registers what happens at time-up; a time-up observed before registration is delivered now. */
  setHandlers(handlers: ExamClockHandlers): void {
    this.handlers = handlers;
    this.deliver();
  }

  /** The server's clock as estimated on this device (for "saved at" timestamps of offline answers). */
  serverNow(): number {
    return this.deviceNow() + (this.offsetMs ?? this.clock.serverNowMs - this.deviceNow());
  }

  /** The current clock (latest server snapshot). */
  current(): ExamClock {
    return this.clock;
  }

  /**
   * Adopts a fresh server clock. With the request's send/receive times (device clock) the offset is estimated from
   * the round trip's midpoint; without them, from now.
   */
  sync(clock: ExamClock, timing: { sentAtMs?: number; receivedAtMs?: number } = {}): void {
    const reference =
      timing.sentAtMs !== undefined && timing.receivedAtMs !== undefined ? (timing.sentAtMs + timing.receivedAtMs) / 2 : this.deviceNow();
    this.offsetMs = clock.serverNowMs - reference;
    this.clock = clock;
    if (!(clock.open && timeUpDue(clock, this.serverNow()))) this.timeUpSignalled = false;
    this.update(true);
  }

  /** Lighter sync from an autosave reply (overall deadline + server time only; paper clocks unchanged). */
  syncDeadline(serverNowMs: number, deadlineMs: number | null, timing: { sentAtMs?: number; receivedAtMs?: number } = {}): void {
    if (deadlineMs === this.clock.deadlineMs) {
      // Same deadline: only refine the offset (no new clock object, so the room does not re-render).
      const reference =
        timing.sentAtMs !== undefined && timing.receivedAtMs !== undefined ? (timing.sentAtMs + timing.receivedAtMs) / 2 : this.deviceNow();
      this.offsetMs = serverNowMs - reference;
      this.update(false);
      return;
    }
    this.sync({ ...this.clock, serverNowMs, deadlineMs }, timing);
  }

  // --- internals ----------------------------------------------------------------------------------------------------

  private start(): void {
    if (this.offsetMs === null) this.offsetMs = this.clock.serverNowMs - this.deviceNow();
    this.update(false);
    this.interval = setInterval(() => this.update(false), this.tickMs);
  }

  private stop(): void {
    if (this.interval !== null) clearInterval(this.interval);
    this.interval = null;
  }

  private emit(): void {
    for (const listener of [...this.listeners]) listener();
  }

  private deliver(): void {
    if (this.pendingSections.length > 0 && this.handlers.onSectionTimeUp) {
      for (const sectionNumber of this.pendingSections.splice(0)) this.handlers.onSectionTimeUp(sectionNumber);
    }
    if (this.pendingTimeUp && this.handlers.onTimeUp) {
      this.pendingTimeUp = false;
      this.handlers.onTimeUp();
    }
  }

  private update(force: boolean): void {
    const nowMs = this.serverNow();
    const active = activeDeadline(this.clock, nowMs);
    const remaining = remainingOf(active, nowMs);
    let announcement = this.tick.announcement;

    if (active && remaining !== null && remaining > 0) {
      const key = deadlineKey(active);
      const warning = dueWarning(remaining, this.announced.get(key) ?? new Set());
      this.announced.set(key, warning.announced);
      if (warning.threshold !== null) {
        const label = active.scope === "SECTION" ? (this.titles[active.sectionNumber] ?? null) : null;
        announcement = warningMessage(warning.threshold, remaining, label);
      }
    }

    const phase = phaseOf(this.clock, nowMs);
    for (const section of this.clock.sections) {
      const before = this.phase.statuses[section.sectionNumber];
      if (before === "RUNNING" && phase.statuses[section.sectionNumber] === "TIME_UP") {
        const title = this.titles[section.sectionNumber];
        announcement = title ? `Time is up for ${title}.` : "Time is up for this paper.";
        this.pendingSections.push(section.sectionNumber);
      }
    }
    if (phase.timeUpDue && !this.timeUpSignalled) {
      this.timeUpSignalled = true;
      this.pendingTimeUp = true;
      announcement = "Time is up. Your answers are being submitted.";
    }

    const tickChanged =
      force ||
      remaining !== this.tick.remainingSeconds ||
      announcement !== this.tick.announcement ||
      active?.deadlineMs !== this.tick.active?.deadlineMs ||
      Math.floor(nowMs / 1000) !== Math.floor(this.tick.nowMs / 1000);
    const phaseChanged = !samePhase(phase, this.phase);
    if (tickChanged) this.tick = { nowMs, active, remainingSeconds: remaining, announcement };
    if (phaseChanged) this.phase = phase;
    if (tickChanged || phaseChanged) this.emit();
    this.deliver();
  }
}

/** Screen-reader text for the countdown ("12 minutes 5 seconds remaining"). */
export function remainingText(remainingSeconds: number): string {
  return remainingSeconds <= 0 ? "Time is up" : `${spokenDuration(remainingSeconds)} remaining`;
}
