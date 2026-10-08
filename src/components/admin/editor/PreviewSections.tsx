import { RichContent } from "@/components/content/RichContent";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { WarningList } from "./WarningList";

/**
 * Read-only rendering of an item's markdown fields exactly as students see them (review page, revision snapshots),
 * with each field's authoring warnings. Server component.
 */
export function PreviewSections({
  sections,
  emptyLabel = "Nothing to preview.",
}: {
  sections: readonly { label: string; html: SanitizedHtml; inline: boolean; warnings: readonly ContentWarning[] }[];
  emptyLabel?: string;
}) {
  if (sections.length === 0) return <p className="text-sm text-muted">{emptyLabel}</p>;
  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <section key={`${section.label}-${index}`} aria-label={section.label} className="space-y-2">
          <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">{section.label}</h3>
          <div className="rounded-control border border-border bg-surface p-4">
            <RichContent html={section.html} inline={section.inline} />
          </div>
          <WarningList warnings={section.warnings} title={`${section.label}: warnings`} />
        </section>
      ))}
    </div>
  );
}
