import type { MasteryBand } from "@/lib/mastery-band";

/** Fill + legible text colour per band (5-step primary ramp, see `--color-mastery-N` in globals.css). */
export const MASTERY_CHIP_CLASS: Readonly<Record<MasteryBand, string>> = {
  WEAK: "bg-mastery-1 text-on-mastery-1",
  DEVELOPING: "bg-mastery-2 text-on-mastery-2",
  COMPETENT: "bg-mastery-3 text-on-mastery-3",
  STRONG: "bg-mastery-4 text-on-mastery-4",
  MASTERED: "bg-mastery-5 text-on-mastery-5",
};

/** Bar fill per band. */
export const MASTERY_FILL_CLASS: Readonly<Record<MasteryBand, string>> = {
  WEAK: "bg-mastery-1",
  DEVELOPING: "bg-mastery-2",
  COMPETENT: "bg-mastery-3",
  STRONG: "bg-mastery-4",
  MASTERED: "bg-mastery-5",
};
