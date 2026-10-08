"use client";

import { Share2 } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { cn } from "@/lib/cn";
import { ShareLinkActions } from "./ShareLinkActions";
import type { CreateShareAction, RevokeShareAction, ShareLinkData, ShareNameChoice, ShareRequest } from "./types";

export interface ShareButtonProps {
  /** What to share; the name choice is added here. */
  request: ShareRequest;
  createAction: CreateShareAction;
  /** Lets the student turn the new link off straight away. */
  revokeAction?: RevokeShareAction;
  label?: string;
  /** Plain words for what the card shows, e.g. "your score, the subject and the level". */
  shows: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Accessible name when the visible label is generic ("Share" on a badge list). */
  ariaLabel?: string;
}

const NAME_OPTIONS: readonly { value: ShareNameChoice; label: string; description: string }[] = [
  { value: "NONE", label: "No name", description: "The card doesn't say who you are." },
  { value: "FIRST_NAME", label: "First name", description: "Only your first name, never your surname." },
  { value: "USERNAME", label: "Username", description: "Your public username." },
];

function formatExpiry(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * "Share" for a result, streak or badge (§46). Opens a dialog: the student chooses whether a name appears, then gets
 * a private link (shown once) to send on WhatsApp, through the phone's share sheet or by copying. The public card never
 * shows a surname, school, contact details or answers, and the link can be turned off at once.
 */
export function ShareButton({ request, createAction, revokeAction, label = "Share", shows, variant = "outline", size = "md", ariaLabel }: ShareButtonProps) {
  const nameGroupId = useId();
  const [open, setOpen] = useState(false);
  const [nameMode, setNameMode] = useState<ShareNameChoice>("NONE");
  const [link, setLink] = useState<ShareLinkData | null>(null);
  const [message, setMessage] = useState<{ tone: "error" | "info"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // A fresh start next time: the link was shown once and is not kept in the page.
      setLink(null);
      setMessage(null);
    }
  };

  const create = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await createAction({ ...request, nameMode });
      if (result.ok) setLink(result.data);
      else setMessage({ tone: "error", text: result.error.fieldErrors?.nameMode?.[0] ?? result.error.message });
    });
  };

  const revoke = () => {
    if (!link || !revokeAction) return;
    startTransition(async () => {
      const result = await revokeAction(link.shareId);
      if (result.ok) {
        setLink(null);
        setMessage({ tone: "info", text: result.data.message });
      } else {
        setMessage({ tone: "error", text: result.error.message });
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={link ? "Your share link is ready" : "Share"}
      description={link ? undefined : `Your card shows ${shows}. It never shows your surname, school, contact details or answers.`}
      trigger={
        <Button type="button" variant={variant} size={size} iconStart={<Share2 aria-hidden="true" />} aria-label={ariaLabel}>
          {label}
        </Button>
      }
    >
      <div className="space-y-4">
        {link ? (
          <>
            <div className="space-y-1">
              <p className="text-base font-semibold text-text">{link.headline}</p>
              <p className="text-sm text-muted">
                Anyone with this link can see this card. It stops working on {formatExpiry(link.expiresAt)}, or when you turn it off.
              </p>
            </div>
            <ShareLinkActions url={link.url} message={link.message} whatsappHref={link.whatsappHref} linkLabel="Your share link" shareTitle={link.headline} />
            {revokeAction && (
              <Button type="button" variant="ghost" size="sm" loading={pending} loadingText="Turning off…" onClick={revoke}>
                Turn this link off
              </Button>
            )}
          </>
        ) : (
          <>
            <RadioGroup
              legend="Name on the card"
              name={nameGroupId}
              value={nameMode}
              onValueChange={(value) => setNameMode(value as ShareNameChoice)}
              options={NAME_OPTIONS}
            />
            <Button type="button" loading={pending} loadingText="Creating link…" onClick={create}>
              Create share link
            </Button>
          </>
        )}
        <p role="status" aria-live="polite" className={cn("min-h-5 text-sm", message?.tone === "error" ? "text-danger-text" : "text-muted")}>
          {message?.text}
        </p>
      </div>
    </Dialog>
  );
}
