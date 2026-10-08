"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "./button-styles";
import { ModalShell, type ModalBaseProps } from "./modal-shell";

const SIZES = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

export interface DialogProps extends ModalBaseProps {
  size?: keyof typeof SIZES;
}

/**
 * Centred modal dialog on a native `<dialog>` (focus trap, Escape, inert background and top-layer stacking are
 * native). Focus moves to the first focusable element, or to an element marked `data-autofocus`, and returns to
 * the opener on close.
 *
 * @example Uncontrolled, from a Server Component
 * <Dialog title="Leave the exam?" trigger={<Button variant="outline">Leave</Button>}
 *   footer={<><DialogClose>Keep going</DialogClose><Button variant="danger" type="submit" form="leave">Leave</Button></>}>
 *   Your answers so far are saved.
 * </Dialog>
 */
export function Dialog({ size = "md", ...props }: DialogProps) {
  return (
    <ModalShell
      {...props}
      dialogClassName={`m-auto w-[calc(100%-2rem)] ${SIZES[size]} max-h-[calc(100dvh-2rem)] rounded-card open:animate-dialog-in`}
    />
  );
}

export interface DialogCloseProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * A button that closes the nearest enclosing `Dialog`/`Sheet` (via the native `dialog.close()`, which syncs state
 * back through the dialog's `close` event). Works from Server Components because it needs no callback prop.
 */
export function DialogClose({ variant = "outline", size = "md", className, onClick, type = "button", ...props }: DialogCloseProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) event.currentTarget.closest("dialog")?.close();
      }}
      {...props}
    />
  );
}
