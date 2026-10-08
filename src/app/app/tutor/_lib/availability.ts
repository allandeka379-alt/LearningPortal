import type { TutorAvailability } from "@/components/tutor/TutorNotices";
import type { TutorStatus } from "@/server/tutor";

/** Which calm state the tutor pages show (not configured beats switched off beats plan). */
export function availabilityOf(status: Pick<TutorStatus, "configured" | "enabled" | "entitled">): TutorAvailability {
  if (!status.configured) return "not_configured";
  if (!status.enabled) return "disabled";
  if (!status.entitled) return "not_entitled";
  return "ready";
}
