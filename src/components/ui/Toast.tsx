"use client";

import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ToastTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss (paused while hovered/focused). `null` keeps it until dismissed. */
  duration?: number | null;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

export interface ToastApi {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const DEFAULT_DURATION_MS = 6000;
const MAX_VISIBLE = 3;

const ToastContext = createContext<ToastApi | null>(null);

/**
 * Access the toast API from a client component:
 * `const { toast } = useToast(); toast({ title: "Saved", tone: "success" })`.
 * For results of Server Actions, prefer inline feedback (`Alert`/field errors); toasts are for transient
 * confirmations.
 */
export function useToast(): ToastApi {
  const api = use(ToastContext);
  if (!api) throw new Error("useToast() must be used inside <ToastProvider> (mounted in the root layout).");
  return api;
}

/** Provides `useToast()` and renders the polite live region. Mounted once in the root layout. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => setToasts((current) => current.filter((t) => t.id !== id)), []);
  const toast = useCallback((options: ToastOptions) => {
    counter.current += 1;
    const id = `toast-${counter.current}`;
    setToasts((current) => [...current, { ...options, id }].slice(-MAX_VISIBLE));
    return id;
  }, []);
  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext value={api}>
      {children}
      <section
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-0 bottom-[var(--toast-offset,0px)] z-50 flex justify-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:justify-end sm:px-6"
      >
        {/* The live region exists before any toast is added, so additions are announced reliably. */}
        <ol aria-live="polite" aria-relevant="additions" className="flex w-full max-w-sm flex-col gap-2">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </ol>
      </section>
    </ToastContext>
  );
}

const TONE_ICON: Record<ToastTone, ReactNode> = {
  neutral: null,
  info: <Info aria-hidden="true" className="text-info-text" />,
  success: <CircleCheck aria-hidden="true" className="text-success-text" />,
  warning: <TriangleAlert aria-hidden="true" className="text-warning-text" />,
  danger: <CircleAlert aria-hidden="true" className="text-danger-text" />,
};

function ToastItem({ toast, onDismiss }: { toast: ToastRecord; onDismiss: (id: string) => void }) {
  const [paused, setPaused] = useState(false);
  const duration = toast.duration === undefined ? DEFAULT_DURATION_MS : toast.duration;

  useEffect(() => {
    if (duration === null || paused) return;
    const timer = window.setTimeout(() => onDismiss(toast.id), duration);
    return () => window.clearTimeout(timer);
  }, [duration, paused, onDismiss, toast.id]);

  const icon = TONE_ICON[toast.tone ?? "neutral"];
  return (
    <li
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="pointer-events-auto flex animate-fade-in items-start gap-3 rounded-card border border-border bg-surface-raised p-4 text-sm shadow-lg"
    >
      {icon && <span className="mt-px shrink-0 [&_svg]:size-5">{icon}</span>}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-muted">{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className={cn(
          // 32px visual, 44px touch target (the ::after extends the hit area).
          "relative -mt-1.5 -mr-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors after:absolute after:-inset-1.5 hover:bg-subtle hover:text-text",
        )}
      >
        <X aria-hidden="true" className="size-4" />
        <span className="sr-only">Dismiss notification</span>
      </button>
    </li>
  );
}
