import Link from "next/link";
import { Timestamp } from "@/components/admin/DetailParts";
import { humanizeEnum } from "@/components/admin/format";
import { buildHref } from "@/components/admin/search-params";
import type { AuditTrailEntry } from "@/server/cms/commerce/shared";

/**
 * Recent audit entries of a commerce record (who changed what, when, and why). Read-only; the full, filterable history
 * lives in /admin/audit. Server component.
 */
export function AuditTrail({
  entries,
  entityType,
  entityId,
  emptyText = "No changes recorded yet.",
}: {
  entries: readonly AuditTrailEntry[];
  entityType: string;
  entityId: string;
  emptyText?: string;
}) {
  return (
    <div className="space-y-3">
      {entries.length === 0 ? (
        <p className="text-sm text-muted">{emptyText}</p>
      ) : (
        <ol className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="border-l-2 border-border pl-3 text-sm">
              <p className="font-medium text-text">{humanizeEnum(entry.operation ?? entry.action)}</p>
              <p className="text-muted">
                <Timestamp value={entry.createdAt} /> · {entry.actorName ?? "System"}
                {entry.entityType !== entityType && <> · {humanizeEnum(entry.entityType)}</>}
              </p>
              {entry.reason && <p className="mt-0.5 break-words text-text">Reason: {entry.reason}</p>}
            </li>
          ))}
        </ol>
      )}
      <Link href={buildHref("/admin/audit", { entityType, entityId })} className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
        Full audit history
      </Link>
    </div>
  );
}
