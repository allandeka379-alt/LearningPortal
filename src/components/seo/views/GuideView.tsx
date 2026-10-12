import { Clock } from "lucide-react";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { LessonAttributionFooter } from "@/components/lessons/LessonAttributionFooter";
import { Badge } from "@/components/ui/Badge";
import { formatCount } from "@/lib/format";
import type { GuidePage } from "@/server/seo/guides";
import { guideCrumbs, guideJsonLd, guideScopeLabel, toBreadcrumbItems, type SiteContext } from "@/server/seo/page-seo";
import { CtaBand } from "../CtaBand";
import { CurriculumHero } from "../CurriculumHero";
import { IndependenceNote } from "../IndependenceNote";
import { JsonLd } from "../JsonLd";
import { PUBLIC_ROUTES } from "../routes";

/**
 * Public guide / article page (§44 "study guides and articles"): a lesson whose access tier is PUBLIC, rendered in
 * full with its licensing footer (§27). Server component.
 */
export function GuideView({ data, site }: { data: GuidePage; site: SiteContext }) {
  const scopeLabel = guideScopeLabel(data);
  const { lesson } = data;
  return (
    <>
      <JsonLd data={guideJsonLd(data, site)} />
      <CurriculumHero
        breadcrumbs={toBreadcrumbItems(guideCrumbs(data))}
        eyebrow={`${scopeLabel} · ${lesson.kind === "ARTICLE" ? "Article" : "Study guide"}`}
        title={lesson.title}
        lead={lesson.summary ?? undefined}
        meta={
          <>
            <Badge tone="primary">Free to read</Badge>
            <Badge tone="neutral" icon={<Clock aria-hidden="true" />}>
              {formatCount(lesson.estimatedMinutes, "min read", "min read")}
            </Badge>
            {lesson.isDemo && <Badge tone="info">Demo data</Badge>}
          </>
        }
      />
      <Container size="reading" className="py-10 sm:py-12">
        <article lang={lesson.languageCode} aria-label={lesson.title}>
          <RichContent html={data.html} />
          <LessonAttributionFooter attribution={data.attribution} className="mt-10" />
        </article>
        {data.path && <IndependenceNote boardName={data.path.board.name} className="mt-8 text-xs text-muted" />}
      </Container>
      <CtaBand
        title="Keep going: practise what you just read."
        description="Practice questions with instant marking, mock exams and a study plan built around your exam date."
        primary={{ href: PUBLIC_ROUTES.register, label: "Start learning" }}
        secondary={{ href: PUBLIC_ROUTES.pricing, label: "See plans" }}
      />
    </>
  );
}
