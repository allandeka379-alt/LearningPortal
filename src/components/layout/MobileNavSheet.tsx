"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { Sheet, type SheetSide } from "@/components/ui/Sheet";

export interface MobileNavSheetProps {
  /** Sheet title (also its accessible name), e.g. "Menu". */
  title: string;
  triggerLabel?: string;
  side?: SheetSide;
  /** Server-rendered navigation content. */
  children: ReactNode;
  className?: string;
}

/** Menu button + navigation sheet for small screens. Closes itself when a link inside is followed. */
export function MobileNavSheet({ title, triggerLabel = "Open menu", side = "left", children, className }: MobileNavSheetProps) {
  return (
    <Sheet
      title={title}
      side={side}
      closeOnLinkClick
      closeLabel="Close menu"
      trigger={<IconButton aria-label={triggerLabel} icon={<Menu aria-hidden="true" />} className={className} />}
    >
      {children}
    </Sheet>
  );
}
