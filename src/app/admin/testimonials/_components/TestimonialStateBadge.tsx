import { Badge } from "@/components/ui/Badge";
import type { TestimonialListItem } from "@/server/cms/testimonials/service";

/** Publication / consent state of a testimonial (text carries the meaning). Server-compatible. */
export function TestimonialStateBadge({ item, size = "sm" }: { item: Pick<TestimonialListItem, "state" | "publishBlocker">; size?: "sm" | "md" }) {
  if (item.state === "published") {
    return (
      <Badge size={size} tone="success">
        Published
      </Badge>
    );
  }
  if (item.state === "withdrawn") {
    return (
      <Badge size={size} tone="neutral" appearance="outline">
        Consent withdrawn
      </Badge>
    );
  }
  return (
    <Badge size={size} tone={item.publishBlocker ? "warning" : "neutral"} appearance={item.publishBlocker ? "soft" : "outline"}>
      {item.publishBlocker ? "Cannot be published yet" : "Not published"}
    </Badge>
  );
}
