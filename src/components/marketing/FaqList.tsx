import { ChevronDown } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { PublicFaqItem } from "@/server/marketing/faq";

export interface FaqListProps {
  items: readonly PublicFaqItem[];
  /** Heading level of each question in the page outline. */
  headingLevel?: "h3" | "h4";
  className?: string;
}

/**
 * FAQ accordion with native `<details>`: keyboard and screen-reader accessible, works without JavaScript and ships
 * none. Answers are CMS Markdown rendered and sanitised on the server.
 */
export function FaqList({ items, headingLevel = "h3", className }: FaqListProps) {
  if (items.length === 0) return null;
  const Heading = headingLevel;
  return (
    <ul className={cn("divide-y divide-border rounded-card border border-border bg-surface", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <details className="group">
            <summary className="flex min-h-14 list-none items-center justify-between gap-4 px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden">
              <Heading className="text-base font-semibold text-text">
                {item.question}
                {item.isDemo && (
                  <Badge tone="warning" size="sm" className="ml-2 align-middle">
                    Demo content
                  </Badge>
                )}
              </Heading>
              <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-5 sm:px-5">
              <RichContent html={item.answerHtml} className="text-sm" />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
