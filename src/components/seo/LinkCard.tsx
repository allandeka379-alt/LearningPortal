import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface LinkCardProps {
  href: string;
  title: ReactNode;
  /** Small line above the title (e.g. a syllabus code). */
  kicker?: ReactNode;
  description?: ReactNode;
  /** Bottom row: badges, real counts. */
  footer?: ReactNode;
  titleAs?: "h3" | "h4";
  className?: string;
}

/**
 * A whole-card link (stretched title link, so there is exactly one accessible target per card) for catalogue grids:
 * qualifications, subjects, guides. Rendered as a list item: wrap a set in `<ul role="list">`. Server component.
 */
export function LinkCard({ href, title, kicker, description, footer, titleAs = "h3", className }: LinkCardProps) {
  const Title = titleAs;
  return (
    <Card as="li" interactive className={cn("flex min-h-full flex-col p-4 sm:p-5", className)}>
      {kicker && <p className="mb-1 text-xs font-semibold tracking-wide text-muted uppercase">{kicker}</p>}
      <Title className="text-base font-semibold text-text">
        <Link href={href} className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-card">
          {title}
        </Link>
      </Title>
      {description && <p className="mt-1.5 line-clamp-3 text-sm text-muted">{description}</p>}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted">{footer}</div>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
      </div>
    </Card>
  );
}
