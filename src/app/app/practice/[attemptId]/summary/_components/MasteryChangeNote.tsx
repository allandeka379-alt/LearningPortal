import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { MASTERY_BAND_LABELS, MASTERY_BANDS, type MasteryBand } from "@/lib/mastery-band";

/**
 * "Up from Developing" next to a topic on the session summary (§11 mastery band changes). The change is recorded on
 * the attempt by the server as the session is answered (`analysis.mastery`), so it shows on any device; nothing is
 * shown when the session changed nothing (or the band stayed the same) and the summary's "mastery now" stands alone.
 */
export function MasteryChangeNote({ change }: { change: { before: MasteryBand | null; after: MasteryBand } | null }) {
  if (!change) return null;
  if (change.before === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
        <Sparkles aria-hidden="true" className="size-3.5" />
        First practice in this topic
      </span>
    );
  }
  const before = MASTERY_BANDS.indexOf(change.before);
  const after = MASTERY_BANDS.indexOf(change.after);
  if (before === after) return null;
  const up = after > before;
  return (
    <span className={up ? "inline-flex items-center gap-1 text-xs font-semibold text-success-text" : "inline-flex items-center gap-1 text-xs font-semibold text-warning-text"}>
      {up ? <ArrowUpRight aria-hidden="true" className="size-3.5" /> : <ArrowDownRight aria-hidden="true" className="size-3.5" />}
      {up ? "Up" : "Down"} from {MASTERY_BAND_LABELS[change.before]}
    </span>
  );
}
