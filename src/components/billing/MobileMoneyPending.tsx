"use client";

import { CircleCheck, CircleX, Clock, RefreshCw, Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import type { PaymentStatusCheck, PaymentStatusView } from "./checkout-state";

/** How often the waiting screen reads the payment status. */
export const STATUS_POLL_INTERVAL_MS = 4_000;
/** Mobile-money prompts expire on the phone after a few minutes: stop waiting after this and explain. */
export const STATUS_POLL_TIMEOUT_MS = 3 * 60_000;
/** Every Nth check also asks the provider (a server-side poll), in case a webhook was lost. */
export const PROVIDER_POLL_EVERY = 4;

export interface MobileMoneyPendingProps {
  paymentId: string;
  instructions: string;
  methodLabel: string;
  maskedMsisdn: string | null;
  resultHref: string;
  /** Development only: link to the sandbox page that approves the simulated prompt. */
  sandboxHref?: string | null;
  /** Server Action reading the payment's status (`refresh` also asks the provider). */
  check: PaymentStatusCheck;
  /** Back to the checkout form (new attempt, same or other method). */
  onRetry: () => void;
  /** Navigation after success (tests); default a full page load so every part of the app sees the new plan. */
  navigate?: (href: string) => void;
  intervalMs?: number;
  timeoutMs?: number;
  providerPollEvery?: number;
}

type Phase =
  | { kind: "waiting" }
  | { kind: "success" }
  | { kind: "failed"; message: string }
  | { kind: "timeout"; stillPending: boolean };

/**
 * "Check your phone to approve" (§32, EcoCash / OneMoney through Paynow): shows the provider's instructions and the
 * masked wallet number, then reads the payment status every {@link STATUS_POLL_INTERVAL_MS} (only a verified webhook
 * or a server-side provider poll ever changes it). Success opens the result page; a decline shows why with a retry;
 * after {@link STATUS_POLL_TIMEOUT_MS} it stops and explains what to do. Status changes are announced politely.
 */
export function MobileMoneyPending({
  paymentId,
  instructions,
  methodLabel,
  maskedMsisdn,
  resultHref,
  sandboxHref = null,
  check,
  onRetry,
  navigate,
  intervalMs = STATUS_POLL_INTERVAL_MS,
  timeoutMs = STATUS_POLL_TIMEOUT_MS,
  providerPollEvery = PROVIDER_POLL_EVERY,
}: MobileMoneyPendingProps) {
  const [phase, setPhase] = useState<Phase>({ kind: "waiting" });
  const [checking, setChecking] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const go = navigate ?? ((href: string) => window.location.assign(href));
  const goRef = useRef(go);

  useEffect(() => {
    goRef.current = go;
  });

  // The form was replaced by this screen: move focus here so keyboard and screen-reader users follow.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  /** Applies a status; returns true when waiting is over. */
  const applyRef = useRef((view: PaymentStatusView): boolean => {
    if (view.status === "SUCCESSFUL") {
      setPhase({ kind: "success" });
      goRef.current(view.resultHref);
      return true;
    }
    if (view.status === "PENDING") return false;
    setPhase({ kind: "failed", message: view.message ?? "This payment didn't go through." });
    return true;
  });

  useEffect(() => {
    if (phase.kind !== "waiting") return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = Date.now();
    let tick = 0;
    const schedule = () => {
      timer = setTimeout(async () => {
        if (cancelled) return;
        tick += 1;
        const result = await check(paymentId, { refresh: tick % providerPollEvery === 0 }).catch(() => null);
        if (cancelled) return;
        if (result?.ok && applyRef.current(result.data)) return;
        if (Date.now() - startedAt >= timeoutMs) {
          setPhase({ kind: "timeout", stillPending: false });
          return;
        }
        schedule();
      }, intervalMs);
    };
    schedule();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [phase.kind, paymentId, check, intervalMs, timeoutMs, providerPollEvery]);

  const checkNow = async () => {
    setChecking(true);
    const result = await check(paymentId, { refresh: true }).catch(() => null);
    setChecking(false);
    if (result?.ok && applyRef.current(result.data)) return;
    setPhase({ kind: "timeout", stillPending: true });
  };

  const status =
    phase.kind === "waiting"
      ? `Waiting for you to approve the payment on your phone.`
      : phase.kind === "success"
        ? "Payment confirmed. Opening your receipt…"
        : phase.kind === "failed"
          ? `The payment didn't go through. ${phase.message}`
          : phase.stillPending
            ? "Still waiting for confirmation."
            : "We haven't had confirmation yet.";

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6"
        >
          {phase.kind === "success" ? <CircleCheck /> : phase.kind === "failed" ? <CircleX /> : phase.kind === "timeout" ? <Clock /> : <Smartphone />}
        </span>
        <div className="min-w-0 space-y-1">
          <h2 ref={headingRef} tabIndex={-1} className="text-lg font-semibold text-text focus-visible:outline-offset-4">
            {phase.kind === "failed" ? "Payment not completed" : phase.kind === "success" ? "Payment received" : "Check your phone to approve"}
          </h2>
          <p className="text-sm text-muted">
            {methodLabel}
            {maskedMsisdn ? ` · ${maskedMsisdn}` : ""}
          </p>
        </div>
      </div>

      {(phase.kind === "waiting" || phase.kind === "timeout") && (
        <div className="rounded-card border border-border bg-subtle p-4 text-sm leading-relaxed text-text">
          <p>{instructions}</p>
          <p className="mt-2 text-muted">Enter your PIN on your phone to approve. Don&rsquo;t close this page; it updates by itself.</p>
          {sandboxHref && (
            <p className="mt-2">
              <Link href={sandboxHref} className="font-semibold text-primary underline-offset-2 hover:underline">
                Open the test payment page to approve or decline
              </Link>
            </p>
          )}
        </div>
      )}

      <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-muted">
        {phase.kind === "waiting" && <Spinner size="sm" />}
        <span>{status}</span>
      </p>

      {phase.kind === "timeout" && (
        <Alert tone="neutral" title="What to do now">
          <ul className="list-disc space-y-1 pl-5">
            <li>If you approved the payment, confirmation can take a few minutes. Check the payment status page.</li>
            <li>If no prompt arrived, check the number and that the phone is on, then try again.</li>
            <li>Nothing is charged unless you approve it on your phone.</li>
          </ul>
        </Alert>
      )}

      {phase.kind === "failed" && (
        <Alert tone="danger" role="alert">
          {phase.message}
        </Alert>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {phase.kind === "timeout" && (
          <Button onClick={checkNow} loading={checking} loadingText="Checking…" iconStart={<RefreshCw aria-hidden="true" />}>
            Check again
          </Button>
        )}
        {(phase.kind === "failed" || phase.kind === "timeout") && (
          <Button variant={phase.kind === "failed" ? "primary" : "outline"} onClick={onRetry}>
            Try again
          </Button>
        )}
        {phase.kind !== "success" && (
          <ButtonLink href={resultHref} variant="ghost">
            View payment status
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
