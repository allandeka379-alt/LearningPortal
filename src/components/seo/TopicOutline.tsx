import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import type { TopicOutlineNode } from "@/server/seo/pages";

/**
 * The public topic list of a subject's current syllabus version (§44): sections as group headings, topics as rows with
 * their public summary, subtopics as compact links. Any depth renders: every node below a topic is listed as a
 * subtopic link. Server component, no client JavaScript.
 */
export function TopicOutline({ nodes }: { nodes: readonly TopicOutlineNode[] }) {
  // Consecutive non-section roots are grouped into one list so the markup stays a clean list of lists.
  const groups: { section: TopicOutlineNode | null; topics: TopicOutlineNode[] }[] = [];
  for (const node of nodes) {
    if (node.kind === "SECTION") groups.push({ section: node, topics: node.children });
    else {
      const last = groups[groups.length - 1];
      if (last && last.section === null) last.topics.push(node);
      else groups.push({ section: null, topics: [node] });
    }
  }
  return (
    <div className="space-y-8">
      {groups.map((group, index) => (
        <div key={group.section?.id ?? `group-${index}`}>
          {group.section && <SectionHeading node={group.section} />}
          <TopicRows topics={group.topics} headingLevel={group.section ? "h4" : "h3"} />
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ node }: { node: TopicOutlineNode }) {
  return (
    <div className="mb-3 space-y-1">
      <h3 className="text-base font-semibold text-text">
        <Link href={node.href} className="-my-2.5 inline-flex min-h-11 items-center underline-offset-4 hover:underline">
          {node.code && <span className="mr-2 text-muted tabular-nums">{node.code}</span>}
          {node.name}
        </Link>
        {node.isOptional && (
          <Badge tone="neutral" size="sm" className="ml-2 align-middle">
            Optional
          </Badge>
        )}
      </h3>
      {node.summary && <p className="max-w-3xl text-sm text-muted">{node.summary}</p>}
    </div>
  );
}

function descendants(node: TopicOutlineNode): TopicOutlineNode[] {
  return node.children.flatMap((child) => [child, ...descendants(child)]);
}

function TopicRows({ topics, headingLevel }: { topics: readonly TopicOutlineNode[]; headingLevel: "h3" | "h4" }) {
  if (topics.length === 0) return null;
  const Heading = headingLevel;
  return (
    <ol role="list" className="divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
      {topics.map((topic) => {
        // A nested SECTION (rare) is listed like a topic; everything below a row is a subtopic link.
        const subtopics = descendants(topic);
        return (
          <li key={topic.id} className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              {topic.code && (
                <span className="mt-0.5 inline-flex min-w-9 shrink-0 justify-center rounded-control bg-primary-soft px-1.5 py-0.5 text-xs font-semibold text-on-primary-soft tabular-nums">
                  {topic.code}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <Heading className="text-base font-semibold text-text">
                  <Link href={topic.href} className="-my-2.5 inline-flex min-h-11 items-center underline-offset-4 hover:text-primary hover:underline">
                    {topic.name}
                  </Link>
                  {topic.isOptional && (
                    <Badge tone="neutral" size="sm" className="ml-2 align-middle">
                      Optional
                    </Badge>
                  )}
                </Heading>
                {topic.summary && <p className="mt-1 text-sm text-muted">{topic.summary}</p>}
                {subtopics.length > 0 && (
                  <ul role="list" aria-label={`Subtopics of ${topic.name}`} className="mt-3 flex flex-wrap gap-2">
                    {subtopics.map((subtopic) => (
                      <li key={subtopic.id} className="max-w-full">
                        <Tag href={subtopic.href}>{subtopic.code ? `${subtopic.code} ${subtopic.name}` : subtopic.name}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
