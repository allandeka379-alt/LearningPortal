import { formatCount } from "@/lib/format";
import type { GuideLink } from "@/server/seo/guides";
import { LinkCard } from "./LinkCard";

/** Public guides and articles of a board, qualification or subject (PUBLIC lessons only). Server component. */
export function GuideList({ guides }: { guides: readonly GuideLink[] }) {
  if (guides.length === 0) return null;
  return (
    <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <LinkCard
          key={guide.id}
          href={guide.href}
          kicker={guide.kind === "ARTICLE" ? "Article" : "Study guide"}
          title={guide.title}
          description={guide.summary}
          footer={<span>{formatCount(guide.estimatedMinutes, "min read", "min read")}</span>}
        />
      ))}
    </ul>
  );
}
