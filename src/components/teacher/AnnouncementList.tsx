import Link from "next/link";
import type { ReactNode } from "react";
import { formatDateTime } from "@/components/admin/format";
import { RichContent } from "@/components/content/RichContent";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ClassAnnouncementItem } from "@/server/teaching/announcements";

const STATE: Record<ClassAnnouncementItem["state"], { label: string; tone: "success" | "info" | "neutral" }> = {
  LIVE: { label: "Live", tone: "success" },
  SCHEDULED: { label: "Scheduled", tone: "info" },
  EXPIRED: { label: "Ended", tone: "neutral" },
};

export interface AnnouncementListProps {
  items: readonly (ClassAnnouncementItem & { classId?: string; className?: string })[];
  timeZone: string;
  /** Per-item actions (e.g. a withdraw button), rendered under the body. */
  renderActions?: (item: ClassAnnouncementItem & { classId?: string }) => ReactNode;
}

/** Announcements as cards: title, state, author and time, the sanitised body. Server component. */
export function AnnouncementList({ items, timeZone, renderActions }: AnnouncementListProps) {
  if (items.length === 0) return <EmptyState appearance="plain" titleAs="p" title="No announcements yet" />;
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-card border border-border bg-surface p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">
                {item.className && item.classId ? (
                  <>
                    <Link href={`/teacher/classes/${item.classId}/announcements`} className="hover:underline">
                      {item.className}
                    </Link>
                    {" · "}
                  </>
                ) : null}
                {item.author} · {formatDateTime(item.publishedAt, timeZone)}
              </p>
            </div>
            <span className="flex gap-1">
              {item.pinned && <Badge tone="accent">Pinned</Badge>}
              <Badge tone={STATE[item.state].tone}>{STATE[item.state].label}</Badge>
            </span>
          </div>
          <RichContent html={item.bodyHtml} className="mt-3" />
          {renderActions && <div className="mt-3">{renderActions(item)}</div>}
        </li>
      ))}
    </ul>
  );
}
