/**
 * Active reading time for lesson progress (§6 daily target, §19 streaks). Pure: the tracker component feeds it clock
 * readings and interaction events; nothing here touches the DOM or the network. The server still caps every report
 * against its own clock (`creditableSeconds` in src/server/lessons/core.ts), so this only decides what to CLAIM.
 *
 * Time counts while the page is visible AND the student interacted (scroll, key, pointer, touch) within
 * {@link IDLE_AFTER_MS}. Gaps between ticks longer than {@link MAX_TICK_GAP_MS} (a sleeping phone, a frozen tab) count
 * only up to that cap.
 */

/** How often the tracker samples the clock. */
export const TICK_INTERVAL_MS = 5_000;
/** How often accumulated time is reported to the server. */
export const HEARTBEAT_INTERVAL_MS = 30_000;
/** No interaction for this long: the student is assumed away and time stops counting. */
export const IDLE_AFTER_MS = 120_000;
/** Longest gap between two ticks that is counted in full. */
export const MAX_TICK_GAP_MS = 2 * TICK_INTERVAL_MS;
/** Largest amount kept pending when reports fail (the server would not credit more in one report anyway). */
export const MAX_PENDING_MS = 120_000;

export interface ReadingClock {
  /** Counted milliseconds not yet reported. */
  pendingMs: number;
  /** Time of the previous tick while counting; null when paused (hidden page, idle, just started). */
  lastTickAt: number | null;
  lastInteractionAt: number;
}

export function startClock(now: number): ReadingClock {
  return { pendingMs: 0, lastTickAt: now, lastInteractionAt: now };
}

/** Records an interaction (the student is active). Resumes counting from now when paused. */
export function interact(clock: ReadingClock, now: number): ReadingClock {
  return { ...clock, lastInteractionAt: now, lastTickAt: clock.lastTickAt ?? now };
}

/**
 * Samples the clock. Counts the time since the previous tick when the page is visible and the student is active;
 * otherwise pauses (the next counted interval starts at the next interaction / visible tick).
 */
export function tick(clock: ReadingClock, now: number, visible: boolean): ReadingClock {
  const active = visible && now - clock.lastInteractionAt <= IDLE_AFTER_MS;
  if (!active) return { ...clock, lastTickAt: null };
  if (clock.lastTickAt === null) return { ...clock, lastTickAt: now };
  const gap = Math.max(0, Math.min(now - clock.lastTickAt, MAX_TICK_GAP_MS));
  return { ...clock, pendingMs: Math.min(MAX_PENDING_MS, clock.pendingMs + gap), lastTickAt: now };
}

/** Whole seconds ready to report, and the clock with them removed (the sub-second remainder stays pending). */
export function takeSeconds(clock: ReadingClock): { seconds: number; clock: ReadingClock } {
  const seconds = Math.floor(clock.pendingMs / 1000);
  return { seconds, clock: { ...clock, pendingMs: clock.pendingMs - seconds * 1000 } };
}

/** Puts seconds that could not be reported back (bounded by {@link MAX_PENDING_MS}). */
export function restoreSeconds(clock: ReadingClock, seconds: number): ReadingClock {
  return { ...clock, pendingMs: Math.min(MAX_PENDING_MS, clock.pendingMs + Math.max(0, seconds) * 1000) };
}

/** Error codes after which the tracker stops reporting for this page view (retrying cannot succeed). */
export const TERMINAL_ERROR_CODES: ReadonlySet<string> = new Set(["UNAUTHENTICATED", "FORBIDDEN", "NOT_FOUND", "ENTITLEMENT_REQUIRED", "VALIDATION"]);
