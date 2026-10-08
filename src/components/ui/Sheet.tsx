"use client";

import { cn } from "@/lib/cn";
import { ModalShell, type ModalBaseProps } from "./modal-shell";

export { DialogClose as SheetClose } from "./Dialog";

export type SheetSide = "auto" | "bottom" | "left" | "right";

const SIDE: Record<SheetSide, string> = {
  // Bottom sheet on phones/tablets (thumb-reachable), right-hand panel from the `lg` breakpoint.
  auto: cn(
    "mx-0 mt-auto mb-0 w-full max-w-none max-h-[85dvh] rounded-t-2xl open:animate-sheet-up",
    "lg:my-0 lg:mr-0 lg:ml-auto lg:h-dvh lg:max-h-none lg:w-[min(26rem,100%)] lg:rounded-none lg:rounded-l-2xl lg:open:animate-sheet-right",
  ),
  bottom: "mx-0 mt-auto mb-0 w-full max-w-none max-h-[85dvh] rounded-t-2xl open:animate-sheet-up",
  left: "my-0 mr-auto ml-0 h-dvh max-h-none w-[min(20rem,88vw)] max-w-none rounded-r-2xl open:animate-sheet-left",
  right: "my-0 mr-0 ml-auto h-dvh max-h-none w-[min(26rem,100%)] max-w-none rounded-l-2xl open:animate-sheet-right",
};

export interface SheetProps extends ModalBaseProps {
  side?: SheetSide;
  /** Close automatically when a link inside is followed (navigation menus). */
  closeOnLinkClick?: boolean;
}

/**
 * Edge-anchored modal panel on a native `<dialog>`: bottom sheet on mobile, side panel on desktop (`side="auto"`),
 * or pinned to one side. Used for mobile navigation, filters and secondary detail views.
 */
export function Sheet({ side = "auto", ...props }: SheetProps) {
  const hasHandle = side === "bottom" || side === "auto";
  return (
    <ModalShell
      {...props}
      dialogClassName={cn(SIDE[side], "pb-[env(safe-area-inset-bottom)]")}
      before={
        hasHandle ? (
          <div aria-hidden="true" className={cn("mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-border", side === "auto" && "lg:hidden")} />
        ) : undefined
      }
    />
  );
}
