"use client";

import { useEffect, useRef } from "react";
import type { ActionResult } from "@/server/lib/errors";
import {
  HEARTBEAT_INTERVAL_MS,
  TERMINAL_ERROR_CODES,
  TICK_INTERVAL_MS,
  interact,
  restoreSeconds,
  startClock,
  takeSeconds,
  tick,
  type ReadingClock,
} from "./activity";

export interface LessonActivityInput {
  lessonId: string;
  /** Active seconds since the previous report. */
  secondsSpent: number;
  /** The page was just opened. */
  view?: boolean;
}

export interface LessonActivityTrackerProps {
  lessonId: string;
  /** Records the time (a Server Action wrapping `markLessonProgress`). */
  record: (input: LessonActivityInput) => Promise<ActionResult<unknown>>;
}

/** Interactions that show the student is still reading. */
const ACTIVITY_EVENTS = ["scroll", "keydown", "pointerdown", "pointermove", "touchstart", "wheel"] as const;
/** Pointer moves fire constantly; one interaction per second is plenty. */
const INTERACTION_THROTTLE_MS = 1_000;

/**
 * Automatic lesson time tracking (§6 daily target, §19 streaks): reports a view when the lesson opens, then the
 * ACTIVE reading time (visible page, recent interaction; see ./activity) every 30 s and when the page is hidden.
 * Renders nothing. Failures are silent: a refused report is retried with the next heartbeat, and errors that cannot
 * succeed (locked lesson, signed out) stop the tracker for this page view.
 */
export function LessonActivityTracker({ lessonId, record }: LessonActivityTrackerProps) {
  const recordRef = useRef(record);
  useEffect(() => {
    recordRef.current = record;
  }, [record]);

  useEffect(() => {
    let clock: ReadingClock = startClock(Date.now());
    let stopped = false;
    let inFlight = false;
    let lastReportAt = Date.now();

    const send = async (secondsSpent: number, view: boolean) => {
      inFlight = true;
      try {
        const result = await recordRef.current({ lessonId, secondsSpent, ...(view ? { view: true } : {}) });
        if (!result.ok) {
          if (TERMINAL_ERROR_CODES.has(result.error.code)) stopped = true;
          else clock = restoreSeconds(clock, secondsSpent);
        }
      } catch {
        // Offline or a network error: keep the time for the next heartbeat.
        clock = restoreSeconds(clock, secondsSpent);
      } finally {
        inFlight = false;
      }
    };

    const report = () => {
      if (stopped || inFlight) return;
      const taken = takeSeconds(clock);
      if (taken.seconds <= 0) return;
      clock = taken.clock;
      lastReportAt = Date.now();
      void send(taken.seconds, false);
    };

    const onActivity = () => {
      const now = Date.now();
      if (now - clock.lastInteractionAt >= INTERACTION_THROTTLE_MS) clock = interact(clock, now);
    };

    const onVisibilityChange = () => {
      const now = Date.now();
      if (document.visibilityState === "hidden") {
        // Count the reading up to now, pause, and report before the tab may be frozen or closed.
        clock = { ...tick(clock, now, true), lastTickAt: null };
        report();
      } else {
        clock = interact(clock, now);
      }
    };

    const timer = window.setInterval(() => {
      const now = Date.now();
      clock = tick(clock, now, document.visibilityState === "visible");
      if (now - lastReportAt >= HEARTBEAT_INTERVAL_MS) report();
    }, TICK_INTERVAL_MS);

    void send(0, true);
    for (const type of ACTIVITY_EVENTS) window.addEventListener(type, onActivity, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", report);

    return () => {
      window.clearInterval(timer);
      for (const type of ACTIVITY_EVENTS) window.removeEventListener(type, onActivity);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", report);
      // Leaving the lesson (client navigation): report what was read since the last heartbeat.
      clock = tick(clock, Date.now(), document.visibilityState === "visible");
      report();
      stopped = true;
    };
  }, [lessonId]);

  return null;
}
