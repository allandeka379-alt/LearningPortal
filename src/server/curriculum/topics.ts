import "server-only";
import type { CognitiveSkill, Prisma, TopicKind } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { ancestorIdsFromPath, buildTopicTree, PUBLISHED_SYLLABUS_STATUSES, type TopicTreeNode } from "./core";

/**
 * Topic trees of syllabus versions (§3, ARCHITECTURE §4.2): one self-referential tree per version, any depth, with a
 * materialised `path` (ancestor ids + own id) and `depth`. Student-facing reads only see PUBLISHED versions (any
 * non-DRAFT status, so a student pinned to an older version keeps its tree, §26); the CMS passes `includeDraft`.
 */

export const TOPIC_SELECT = {
  id: true,
  syllabusId: true,
  parentId: true,
  kind: true,
  depth: true,
  path: true,
  sortOrder: true,
  code: true,
  name: true,
  slug: true,
  description: true,
  publicSummary: true,
  metaTitle: true,
  metaDescription: true,
  isPublic: true,
  isOptional: true,
  optionGroup: true,
  examYearFrom: true,
  examYearTo: true,
  estimatedStudyMinutes: true,
} as const satisfies Prisma.TopicSelect;

export type TopicRow = Prisma.TopicGetPayload<{ select: typeof TOPIC_SELECT }>;
export type TopicNode = TopicTreeNode<TopicRow>;

export interface TopicReadOptions {
  /** Also read DRAFT versions (CMS only). Default false. */
  includeDraft?: boolean;
  /** Only nodes with `isPublic` (public SEO pages, §44); a non-public node hides its subtree. Default false. */
  publicOnly?: boolean;
  client?: DbClient;
}

function syllabusFilter(includeDraft: boolean | undefined): Prisma.SyllabusWhereInput {
  return includeDraft ? {} : { status: { in: [...PUBLISHED_SYLLABUS_STATUSES] } };
}

/**
 * The ordered, nested topic tree of a syllabus version (sections → topics → subtopics, whatever depth the board
 * uses). Returns null when the version does not exist or is a DRAFT (unless `includeDraft`).
 */
export async function getTopicTree(syllabusId: string, options: TopicReadOptions = {}): Promise<TopicNode[] | null> {
  const client = options.client ?? db;
  const syllabus = await client.syllabus.findFirst({
    where: { id: syllabusId, ...syllabusFilter(options.includeDraft) },
    select: { id: true },
  });
  if (!syllabus) return null;
  const rows = await client.topic.findMany({
    where: { syllabusId, ...(options.publicOnly ? { isPublic: true } : {}) },
    select: TOPIC_SELECT,
    orderBy: [{ path: "asc" }],
  });
  return buildTopicTree(rows);
}

export interface TopicObjective {
  id: string;
  code: string | null;
  statement: string;
  cognitiveSkill: CognitiveSkill | null;
}

/** A topic page: the node, its breadcrumb, its direct children and its learning objectives. */
export interface TopicDetail {
  topic: TopicRow;
  /** Root first, excluding the topic itself. */
  ancestors: Pick<TopicRow, "id" | "kind" | "name" | "slug" | "code" | "depth">[];
  children: Pick<TopicRow, "id" | "kind" | "name" | "slug" | "code" | "sortOrder" | "isPublic" | "isOptional">[];
  objectives: TopicObjective[];
}

async function topicDetail(client: DbClient, topic: TopicRow, publicOnly: boolean): Promise<TopicDetail | null> {
  const ancestorIds = ancestorIdsFromPath(topic.path);
  const [ancestorRows, children, objectives] = await Promise.all([
    ancestorIds.length > 0
      ? client.topic.findMany({
          where: { id: { in: ancestorIds }, syllabusId: topic.syllabusId },
          select: { id: true, kind: true, name: true, slug: true, code: true, depth: true, isPublic: true },
        })
      : Promise.resolve([]),
    client.topic.findMany({
      where: { parentId: topic.id, syllabusId: topic.syllabusId, ...(publicOnly ? { isPublic: true } : {}) },
      select: { id: true, kind: true, name: true, slug: true, code: true, sortOrder: true, isPublic: true, isOptional: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    client.learningObjective.findMany({
      where: { topicId: topic.id },
      select: { id: true, code: true, statement: true, cognitiveSkill: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    }),
  ]);
  // A public page is never reachable through a non-public ancestor.
  if (publicOnly && ancestorRows.some((a) => !a.isPublic)) return null;
  const ancestors = ancestorRows
    .sort((a, b) => a.depth - b.depth)
    .map((a) => ({ id: a.id, kind: a.kind, name: a.name, slug: a.slug, code: a.code, depth: a.depth }));
  return { topic, ancestors, children, objectives };
}

/**
 * A topic node by its slug within one syllabus version (slugs are unique per version and stable across versions).
 * Null when not found, when the version is a DRAFT (unless `includeDraft`), or when `publicOnly` and the node or one
 * of its ancestors is not public.
 */
export async function getTopicBySlug(syllabusId: string, slug: string, options: TopicReadOptions = {}): Promise<TopicDetail | null> {
  const client = options.client ?? db;
  const topic = await client.topic.findFirst({
    where: {
      syllabusId,
      slug,
      syllabus: syllabusFilter(options.includeDraft),
      ...(options.publicOnly ? { isPublic: true } : {}),
    },
    select: TOPIC_SELECT,
  });
  if (!topic) return null;
  return topicDetail(client, topic, options.publicOnly ?? false);
}

/** A topic node by id (published versions only unless `includeDraft`). */
export async function getTopicById(topicId: string, options: TopicReadOptions = {}): Promise<TopicDetail | null> {
  const client = options.client ?? db;
  const topic = await client.topic.findFirst({
    where: { id: topicId, syllabus: syllabusFilter(options.includeDraft), ...(options.publicOnly ? { isPublic: true } : {}) },
    select: TOPIC_SELECT,
  });
  if (!topic) return null;
  return topicDetail(client, topic, options.publicOnly ?? false);
}

/**
 * Ids of a topic and all of its descendants (subtree via the materialised path), e.g. to expand "practice this
 * topic" into the exact topic ids that `candidatePool` / `QuestionTopic` filters match. The topic itself comes first,
 * then descendants by depth and sibling order.
 */
export async function getTopicSubtreeIds(topicId: string, client: DbClient = db): Promise<string[]> {
  const topic = await client.topic.findUnique({ where: { id: topicId }, select: { id: true, path: true, syllabusId: true } });
  if (!topic) return [];
  const descendants = await client.topic.findMany({
    where: { syllabusId: topic.syllabusId, path: { startsWith: `${topic.path}/` } },
    select: { id: true },
    orderBy: [{ depth: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  return [topic.id, ...descendants.map((d) => d.id)];
}

/** TOPIC-kind nodes of a version in tree order (what dashboards list, ARCHITECTURE §4.6: select by kind, not depth). */
export async function listTopicsOfKind(syllabusId: string, kind: TopicKind, options: TopicReadOptions = {}): Promise<TopicRow[] | null> {
  const tree = await getTopicTree(syllabusId, options);
  if (!tree) return null;
  const out: TopicRow[] = [];
  const visit = (nodes: readonly TopicNode[]): void => {
    for (const { children, ...node } of nodes) {
      if (node.kind === kind) out.push(node);
      visit(children);
    }
  };
  visit(tree);
  return out;
}
