import type { MediaOption } from "@/server/cms/questions/lookups";
import type { DefinitionDraft } from "../model";

/** Props shared by every per-type answer editor. */
export interface AnswerEditorProps {
  draft: DefinitionDraft;
  onChange: (patch: Partial<DefinitionDraft>) => void;
  /** Error path prefix: "" for the question itself, "parts.0." for part (a), "parts.1.parts.0." for (b)(i). */
  path: string;
  disabled?: boolean;
  /** Images the editor may pick (diagrams, option pictures). */
  media: readonly MediaOption[];
  /** Option keys never to re-use (the live question's keys, for a draft copy). */
  reservedKeys?: readonly string[];
}
