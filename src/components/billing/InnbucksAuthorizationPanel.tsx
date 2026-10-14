import { ExternalLink } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface InnbucksAuthorizationPanelProps {
  instructions?: string | null;
  authorizationCode?: string | null;
  authorizationExpires?: string | null;
  deepLinkUrl?: string | null;
  className?: string;
}

/** Paynow InnBucks express checkout returns an authorization code, not a push prompt. */
export function InnbucksAuthorizationPanel({
  instructions,
  authorizationCode,
  authorizationExpires,
  deepLinkUrl,
  className,
}: InnbucksAuthorizationPanelProps) {
  return (
    <div className={cn("space-y-4 rounded-card border border-border bg-subtle p-4 text-sm leading-relaxed text-text", className)}>
      <div className="space-y-2">
        <p className="font-medium">Paynow generated an InnBucks authorization code.</p>
        {instructions && !authorizationCode ? <p>{instructions}</p> : null}
      </div>
      {authorizationCode ? (
        <div className="rounded-md border border-border bg-surface p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-normal text-muted">Authorization code</p>
          <p className="mt-1 break-words text-3xl font-bold tabular-nums text-text sm:text-4xl">{authorizationCode}</p>
          {authorizationExpires ? <p className="mt-2 text-sm text-muted">Expires at {authorizationExpires}</p> : null}
        </div>
      ) : null}
      <div className="space-y-2 text-muted">
        <p>Open the InnBucks app and authorize the payment with this code, or dial *569# and enter the code.</p>
        <p>After you authorize it, return here and check the payment status.</p>
      </div>
      {deepLinkUrl ? (
        <a href={deepLinkUrl} className={buttonStyles({ variant: "outline", size: "sm", className: "w-full sm:w-auto" })}>
          Open InnBucks app
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      ) : null}
    </div>
  );
}
