"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import type { PaymentStatusCheck } from "./checkout-state";

/** The result page re-checks a pending payment this often… */
export const RESULT_POLL_INTERVAL_MS = 5_000;
/** …for this long, then offers "Check again". */
export const RESULT_POLL_TIMEOUT_MS = 2 * 60_000;

export interface PaymentStatusWatcherProps {
  paymentId: string;
  check: PaymentStatusCheck;
  /** Re-render the page with the new status (tests); default `router.refresh()`. */
  onChange?: () => void;
  intervalMs?: number;
  timeoutMs?: number;
  /** Every Nth check also asks the provider. */
  providerPollEvery?: number;
}

/**
 * Keeps a PENDING result page up to date (§32): reads the status every few seconds and re-renders the page once it
 * changes (the server-rendered page shows the new state). Stops after a while with a "Check again" button, so a tab
 * left open does not poll forever. Announces what it is doing politely.
 */
export function PaymentStatusWatcher({
  paymentId,
  check,
  onChange,
  intervalMs = RESULT_POLL_INTERVAL_MS,
  timeoutMs = RESULT_POLL_TIMEOUT_MS,
  providerPollEvery = 3,
}: PaymentStatusWatcherProps) {
  const router = useRouter();
  const [watching, setWatching] = useState(true);
  const [round, setRound] = useState(0);
  const [checking, setChecking] = useState(false);
  const changedRef = useRef(onChange ?? (() => router.refresh()));

  useEffect(() => {
    changedRef.current = onChange ?? (() => router.refresh());
  });

  useEffect(() => {
    if (!watching) return;
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
        if (result?.ok && result.data.status !== "PENDING") {
          changedRef.current();
          return;
        }
        if (Date.now() - startedAt >= timeoutMs) {
          setWatching(false);
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
  }, [watching, round, paymentId, check, intervalMs, timeoutMs, providerPollEvery]);

  const checkNow = async () => {
    setChecking(true);
    const result = await check(paymentId, { refresh: true }).catch(() => null);
    setChecking(false);
    if (result?.ok && result.data.status !== "PENDING") {
      changedRef.current();
      return;
    }
    setWatching(true);
    setRound((value) => value + 1);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-muted">
        {watching && <Spinner size="sm" />}
        <span>{watching ? "Checking for confirmation. This page updates by itself." : "Still waiting for confirmation."}</span>
      </p>
      {!watching && (
        <Button variant="outline" onClick={checkNow} loading={checking} loadingText="Checking…" iconStart={<RefreshCw aria-hidden="true" />}>
          Check again
        </Button>
      )}
    </div>
  );
}
