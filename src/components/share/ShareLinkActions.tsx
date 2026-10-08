"use client";

import { Copy, MessageCircle, Share2 } from "lucide-react";
import { useId, useState, useSyncExternalStore } from "react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const noSubscription = () => () => {};
const hasNativeShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";

export interface ShareLinkActionsProps {
  url: string;
  /** Message sent with the link (WhatsApp text, native share text). */
  message: string;
  whatsappHref: string;
  /** Accessible label of the read-only link field. */
  linkLabel?: string;
  /** Title for the native share sheet. */
  shareTitle?: string;
}

/**
 * The ways to pass a link on (§46): WhatsApp first (how Zimbabwean students share), the phone's own share sheet when the
 * browser has one, and copy. The link sits in a read-only field so it can also be selected by hand. Outcomes are
 * announced politely.
 */
export function ShareLinkActions({ url, message, whatsappHref, linkLabel = "Share link", shareTitle }: ShareLinkActionsProps) {
  const fieldId = useId();
  const [status, setStatus] = useState("");
  // Feature detection without a hydration mismatch: the server snapshot is "no share sheet".
  const canNativeShare = useSyncExternalStore(noSubscription, hasNativeShare, () => false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy isn't available here. Select the link and copy it.");
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: shareTitle ?? message, text: message, url });
      setStatus("");
    } catch {
      // Cancelled by the student, or unavailable: nothing to report.
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label htmlFor={fieldId} className="text-sm font-medium text-text">
          {linkLabel}
        </label>
        <Input id={fieldId} readOnly value={url} onFocus={(event) => event.currentTarget.select()} className="font-mono text-sm" />
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonStyles({ variant: "primary" })}>
          <MessageCircle aria-hidden="true" />
          Share on WhatsApp
        </a>
        {canNativeShare && (
          <Button type="button" variant="outline" iconStart={<Share2 aria-hidden="true" />} onClick={nativeShare}>
            More ways to share
          </Button>
        )}
        <Button type="button" variant="outline" iconStart={<Copy aria-hidden="true" />} onClick={copy}>
          Copy link
        </Button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted">
        {status}
      </p>
    </div>
  );
}
