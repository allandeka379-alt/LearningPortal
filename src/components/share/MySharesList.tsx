"use client";

import { Link2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { formatCount } from "@/lib/format";
import { ShareLinkActions } from "./ShareLinkActions";
import type { RenewShareAction, RevokeShareAction, ShareLinkData } from "./types";

export interface MyShareItem {
  shareId: string;
  headline: string;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
  /** Pre-formatted dates (server side, in the student's time zone). */
  createdOn: string;
  expiresOn: string;
  viewCount: number;
}

export interface MySharesListProps {
  shares: readonly MyShareItem[];
  renewAction: RenewShareAction;
  revokeAction: RevokeShareAction;
}

const STATUS: Record<MyShareItem["status"], { label: string; tone: "success" | "neutral" }> = {
  ACTIVE: { label: "Live", tone: "success" },
  EXPIRED: { label: "Expired", tone: "neutral" },
  REVOKED: { label: "Turned off", tone: "neutral" },
};

/**
 * The student's share links (§46) with their status and view counts. A live link can be turned off, or replaced by a
 * new link to copy again (links are shown only once, so "copy again" issues a new one and the old one stops working).
 */
export function MySharesList({ shares, renewAction, revokeAction }: MySharesListProps) {
  const [message, setMessage] = useState<string>("");
  const [renewed, setRenewed] = useState<ShareLinkData | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const run = (shareId: string, fn: () => Promise<void>) => {
    setPendingId(shareId);
    startTransition(async () => {
      await fn();
      setPendingId(null);
    });
  };

  const renew = (shareId: string) =>
    run(shareId, async () => {
      const result = await renewAction(shareId);
      if (result.ok) {
        setRenewed(result.data);
        setMessage("");
      } else {
        setMessage(result.error.message);
      }
    });

  const revoke = (shareId: string) =>
    run(shareId, async () => {
      const result = await revokeAction(shareId);
      setMessage(result.ok ? result.data.message : result.error.message);
    });

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-border">
        {shares.map((share) => {
          const status = STATUS[share.status];
          return (
            <li key={share.shareId} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-1">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-text">
                  <Link2 aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  <span className="min-w-0 break-words">{share.headline}</span>
                  <Badge tone={status.tone} size="sm">
                    {status.label}
                  </Badge>
                </p>
                <p className="text-xs text-muted">
                  Shared {share.createdOn} · {share.status === "ACTIVE" ? `works until ${share.expiresOn}` : `ended`} · {formatCount(share.viewCount, "view")}
                </p>
              </div>
              {share.status === "ACTIVE" && (
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" loading={pendingId === share.shareId} onClick={() => renew(share.shareId)}>
                    Get a new link
                  </Button>
                  <Button type="button" variant="ghost" size="sm" disabled={pendingId === share.shareId} onClick={() => revoke(share.shareId)}>
                    Turn off
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted">
        {message}
      </p>
      <Dialog
        open={renewed !== null}
        onOpenChange={(next) => {
          if (!next) setRenewed(null);
        }}
        title="Your new share link"
        description="The old link no longer opens. Send this one instead."
      >
        {renewed && <ShareLinkActions url={renewed.url} message={renewed.message} whatsappHref={renewed.whatsappHref} linkLabel="New share link" shareTitle={renewed.headline} />}
      </Dialog>
    </div>
  );
}
