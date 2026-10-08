"use client";

import { useEffect, useEffectEvent, useRef, type MouseEvent, type RefObject } from "react";

let lockCount = 0;
let previousOverflow = "";

/** Reference-counted page scroll lock so stacked modals don't unlock each other. */
function lockScroll() {
  if (lockCount === 0) {
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) document.documentElement.style.overflow = previousOverflow;
}

export interface ModalDialogControls {
  ref: RefObject<HTMLDialogElement | null>;
  /** Attach to the `<dialog>`: closes when the backdrop (the dialog element itself, not its content) is clicked. */
  onBackdropClick: (event: MouseEvent<HTMLDialogElement>) => void;
}

/**
 * Drives a native `<dialog>` as a modal from a React `open` prop.
 *
 * Native `showModal()` gives us, for free: focus moved into the dialog, a focus trap, inert background, Escape to
 * close and correct top-layer stacking. On top of that this hook adds: focusing a `[data-autofocus]` element if
 * present, restoring focus to the opener on close, page scroll locking, and syncing native closes back to React via
 * `onClose`.
 *
 * Escape goes through React too: the native `cancel` event is prevented and turned into an `onClose` request, so an
 * owner that refuses to close (e.g. "Submit your exam?" while the submission is in flight) keeps the dialog open
 * instead of the browser closing it behind React's back (which hid its error message and dropped focus to the page).
 */
export function useModalDialog(open: boolean, onClose: () => void): ModalDialogControls {
  const ref = useRef<HTMLDialogElement>(null);
  const requestClose = useEffectEvent(() => onClose());

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    lockScroll();
    return () => {
      unlockScroll();
      if (dialog.open) dialog.close();
      if (opener?.isConnected) opener.focus();
    };
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // The close event is queued asynchronously; ignore it if the dialog was re-opened in the meantime
    // (e.g. React StrictMode's mount → unmount → mount in development).
    const handleClose = () => {
      if (!dialog.open) requestClose();
    };
    // Escape: let the owner decide. Closing then happens through the `open` prop (effect cleanup above).
    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose();
    };
    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, []);

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return { ref, onBackdropClick };
}
