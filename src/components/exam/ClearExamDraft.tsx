"use client";

import { useEffect } from "react";
import { clearExamOutbox } from "./autosave";

/**
 * Removes the exam room's offline copy of unsent answers for a closed attempt (e.g. it was submitted automatically while
 * this device was offline): nothing more can be saved, so the copy must not linger in localStorage. Renders nothing.
 */
export function ClearExamDraft({ attemptId }: { attemptId: string }) {
  useEffect(() => {
    clearExamOutbox(attemptId);
  }, [attemptId]);
  return null;
}
