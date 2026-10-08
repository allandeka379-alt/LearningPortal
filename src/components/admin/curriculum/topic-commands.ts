/**
 * Commands the topic tree editor sends to its Server Action (`runTopicCommand` in
 * src/app/admin/syllabuses/actions.ts). Isomorphic types only: the server validates every payload again with the
 * curriculum services' Zod schemas and re-checks permissions.
 */

export type TopicCommand =
  | { type: "add"; syllabusId: string; input: { syllabusId: string; parentId: string | null; name: string; code?: string | null; kind?: string | null } }
  | { type: "update"; syllabusId: string; input: Record<string, unknown> }
  | { type: "correct"; syllabusId: string; input: Record<string, unknown> }
  | { type: "move"; syllabusId: string; input: { id: string; direction: "up" | "down" } }
  | { type: "shift"; syllabusId: string; input: { id: string; operation: "indent" | "outdent" } }
  | { type: "reparent"; syllabusId: string; input: { id: string; parentId: string | null } }
  | { type: "delete"; syllabusId: string; input: { id: string } }
  | { type: "objective.add"; syllabusId: string; input: { topicId: string; statement: string; code?: string | null; cognitiveSkill?: string | null } }
  | { type: "objective.update"; syllabusId: string; input: { id: string; statement: string; code?: string | null; cognitiveSkill?: string | null } }
  | { type: "objective.move"; syllabusId: string; input: { id: string; direction: "up" | "down" } }
  | { type: "objective.delete"; syllabusId: string; input: { id: string } }
  | { type: "outline.preview"; syllabusId: string; input: Record<string, unknown> }
  | { type: "outline.import"; syllabusId: string; input: Record<string, unknown> };

export type TopicCommandType = TopicCommand["type"];

/** Read-back of a pasted outline (mirrors `OutlinePreview` from the service). */
export interface OutlinePreviewView {
  ok: boolean;
  topicCount: number;
  objectiveCount: number;
  depth: number;
  errors: { line: number; message: string }[];
  preview: { depth: number; kind: string; code: string | null; name: string; objectives: number }[];
}
