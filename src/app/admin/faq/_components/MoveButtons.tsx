"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { IconButton } from "@/components/ui/IconButton";
import { useToast } from "@/components/ui/Toast";

/**
 * "Move up" / "Move down" for one FAQ entry within its category (keyboard and touch operable, 44px targets). Each
 * button submits the move action; failures are announced as a toast and the list refreshes on success.
 */
export function MoveButtons({ action, faqItemId, label, isFirst, isLast }: { action: AdminFormAction<unknown>; faqItemId: string; label: string; isFirst: boolean; isLast: boolean }) {
  const [state, formAction, pending] = useActionState<AdminActionState<unknown>, FormData>(action, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<AdminActionState>(null);

  useEffect(() => {
    if (state === null || handled.current === state) return;
    handled.current = state;
    if (state.ok) router.refresh();
    else toast({ title: state.error.message, tone: "danger" });
  }, [state, router, toast]);

  return (
    <form action={formAction} className="flex gap-1">
      <input type="hidden" name="faqItemId" value={faqItemId} />
      <IconButton type="submit" name="direction" value="up" size="sm" variant="ghost" icon={<ArrowUp aria-hidden="true" />} aria-label={`Move “${label}” up`} disabled={pending || isFirst} />
      <IconButton
        type="submit"
        name="direction"
        value="down"
        size="sm"
        variant="ghost"
        icon={<ArrowDown aria-hidden="true" />}
        aria-label={`Move “${label}” down`}
        disabled={pending || isLast}
      />
    </form>
  );
}
