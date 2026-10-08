"use client";

import { X } from "lucide-react";
import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { IconButton } from "./IconButton";
import { useModalDialog } from "./use-modal-dialog";

type TriggerProps = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  "aria-haspopup"?: "dialog";
  "aria-expanded"?: boolean;
};

export interface ModalBaseProps {
  /** Controlled open state. Omit (and optionally pass `defaultOpen`) for uncontrolled use with `trigger`. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * The element that opens the modal in uncontrolled mode (a `Button` works, including from a Server Component).
   * It receives `onClick`, `aria-haspopup="dialog"` and `aria-expanded`.
   */
  trigger?: ReactElement<TriggerProps>;
  /** Required accessible title (`aria-labelledby`). Use `titleHidden` when the design has no visible title. */
  title: ReactNode;
  titleHidden?: boolean;
  description?: ReactNode;
  children?: ReactNode;
  /** Action row. Use `DialogClose` for cancel buttons so they work from Server Components too. */
  footer?: ReactNode;
  hideCloseButton?: boolean;
  closeLabel?: string;
  /** `alertdialog` for destructive confirmations ("Delete this study plan?"). */
  role?: "dialog" | "alertdialog";
}

interface ModalShellProps extends ModalBaseProps {
  dialogClassName: string;
  /** Rendered above the header (e.g. a bottom-sheet grab handle). */
  before?: ReactNode;
  /** Close when a link inside is activated (navigation menus inside sheets). */
  closeOnLinkClick?: boolean;
}

/** Internal: shared implementation of `Dialog` and `Sheet` on top of a native `<dialog>`. */
export function ModalShell({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  titleHidden = false,
  description,
  children,
  footer,
  hideCloseButton = false,
  closeLabel = "Close",
  role = "dialog",
  dialogClassName,
  before,
  closeOnLinkClick = false,
}: ModalShellProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const { ref, onBackdropClick } = useModalDialog(isOpen, () => setOpen(false));
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      {trigger && isValidElement(trigger)
        ? cloneElement(trigger, {
            "aria-haspopup": "dialog",
            "aria-expanded": isOpen,
            onClick: (event: MouseEvent<HTMLElement>) => {
              trigger.props.onClick?.(event);
              if (!event.defaultPrevented) setOpen(true);
            },
          })
        : null}
      <dialog
        ref={ref}
        role={role === "alertdialog" ? "alertdialog" : undefined}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(event) => {
          onBackdropClick(event);
          if (closeOnLinkClick && event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
        }}
        className={cn(
          "border border-border bg-surface-raised p-0 text-text shadow-lg backdrop:bg-overlay",
          dialogClassName,
        )}
      >
        <div className="flex h-full max-h-[inherit] min-h-0 flex-col">
          {before}
          <div className={cn("flex items-start justify-between gap-4 px-5 pt-5", titleHidden && "pt-3")}>
            <div className="min-w-0 space-y-1">
              <h2 id={titleId} className={cn("text-lg font-semibold text-text", titleHidden && "sr-only")}>
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className="text-sm text-muted">
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <IconButton
                aria-label={closeLabel}
                icon={<X aria-hidden="true" />}
                onClick={() => setOpen(false)}
                className="-mt-2 -mr-2"
              />
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
          {footer && (
            <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
              {footer}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
