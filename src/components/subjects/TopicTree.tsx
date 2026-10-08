import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { formatCount } from "@/lib/format";

export interface TopicTreeNodeView {
  topicId: string;
  name: string;
  code: string | null;
  kind: "SECTION" | "TOPIC" | "SUBTOPIC";
  isOptional: boolean;
  score: number | null;
  questionsAttempted: number;
  children: readonly TopicTreeNodeView[];
}

export interface TopicTreeProps {
  subjectId: string;
  nodes: readonly TopicTreeNodeView[];
  /** Coverage per TOPIC node ("2 of 3 subtopics started"), from the subject dashboard read model. */
  coverage?: ReadonlyMap<string, { leavesStarted: number; leavesTotal: number }>;
}

function topicHref(subjectId: string, topicId: string): string {
  return `/app/subjects/${subjectId}/topics/${topicId}`;
}

function nodeLabel(node: TopicTreeNodeView): string {
  return node.code ? `${node.code} ${node.name}` : node.name;
}

function TopicRow({ subjectId, node, coverage }: { subjectId: string; node: TopicTreeNodeView; coverage?: TopicTreeProps["coverage"] }) {
  const cover = coverage?.get(node.topicId);
  return (
    <div>
      <MasteryBar label={nodeLabel(node)} score={node.score} href={topicHref(subjectId, node.topicId)} />
      {(node.isOptional || (cover && cover.leavesTotal > 1)) && (
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
          {node.isOptional && (
            <Badge tone="neutral" size="sm">
              Optional
            </Badge>
          )}
          {cover && cover.leavesTotal > 1 && (
            <span>
              {cover.leavesStarted} of {formatCount(cover.leavesTotal, "subtopic")} started
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Branch({ subjectId, node, coverage }: { subjectId: string; node: TopicTreeNodeView; coverage?: TopicTreeProps["coverage"] }) {
  if (node.kind === "SECTION") {
    return (
      <li className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">{nodeLabel(node)}</h3>
        {node.children.length > 0 && (
          <ul className="space-y-4">
            {node.children.map((child) => (
              <Branch key={child.topicId} subjectId={subjectId} node={child} coverage={coverage} />
            ))}
          </ul>
        )}
      </li>
    );
  }
  return (
    <li>
      <TopicRow subjectId={subjectId} node={node} coverage={coverage} />
      {node.children.length > 0 && (
        <details className="group mt-1.5">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-control text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
            <ChevronRight aria-hidden="true" className="size-4 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
            {formatCount(node.children.length, "subtopic")}
            <span className="sr-only"> in {node.name}</span>
          </summary>
          <ul className="mt-2 space-y-3 border-l-2 border-border pl-4">
            {node.children.map((child) => (
              <Branch key={child.topicId} subjectId={subjectId} node={child} coverage={coverage} />
            ))}
          </ul>
        </details>
      )}
    </li>
  );
}

/**
 * The pinned syllabus version's topic tree with a mastery bar on every node (§7 "topic progress", §11 bands written
 * as text next to the colour). Sections become group headings; subtopics fold away under their topic (native
 * `<details>`, keyboard operable, no JavaScript). Each name links to its topic page. Server component.
 */
export function TopicTree({ subjectId, nodes, coverage }: TopicTreeProps) {
  if (nodes.length === 0) {
    return <p className="text-sm text-muted">The topics of this syllabus have not been published yet.</p>;
  }
  return (
    <ul className="space-y-5">
      {nodes.map((node) => (
        <Branch key={node.topicId} subjectId={subjectId} node={node} coverage={coverage} />
      ))}
    </ul>
  );
}
