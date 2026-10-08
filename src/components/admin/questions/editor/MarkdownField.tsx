"use client";

import { Bold, Eye, Image as ImageIcon, Italic, Pencil, Sigma, SquareFunction } from "lucide-react";
import { createContext, use, useId, useState, useTransition, type ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { CONTENT_BLOCK_LABELS, CONTENT_BLOCK_TITLE_ATTRIBUTE, CONTENT_BLOCK_TYPES, type ContentBlockType } from "@/lib/content/blocks";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import type { ActionResult } from "@/server/lib/errors";
import { useErrors } from "./fields";

/**
 * Markdown + LaTeX field with the authoring toolbar of docs/CONTENT_AUTHORING.md (bold, italic, inline / display
 * maths, content blocks from the shared block list, asset images) and a server-rendered preview: the SAME content
 * pipeline students get (sanitised, KaTeX), with its authoring warnings listed under the preview.
 */

export interface MarkdownPreview {
  html: SanitizedHtml;
  warnings: ContentWarning[];
}

export type MarkdownPreviewAction = (input: { source: string; inline: boolean }) => Promise<ActionResult<MarkdownPreview>>;

const PreviewContext = createContext<MarkdownPreviewAction | null>(null);

export function MarkdownPreviewProvider({ action, children }: { action: MarkdownPreviewAction; children: ReactNode }) {
  return <PreviewContext value={action}>{children}</PreviewContext>;
}

function blockSnippet(type: ContentBlockType): string {
  const attribute = CONTENT_BLOCK_TITLE_ATTRIBUTE[type];
  const title = type === "worked-solution" ? `[Solve …]` : `{${attribute}="${CONTENT_BLOCK_LABELS[type]}"}`;
  return `\n:::${type}${title}\n${type === "worked-solution" ? "1. First step.\n2. Next step." : "Write here."}\n:::\n`;
}

export interface MarkdownFieldProps {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  path?: string;
  hint?: ReactNode;
  optional?: boolean;
  rows?: number;
  /** Inline fields (options, labels) are rendered as phrasing content: no blocks. */
  inline?: boolean;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export function MarkdownField({ label, value, onChange, path, hint, optional, rows = 4, inline = false, disabled = false, maxLength, placeholder }: MarkdownFieldProps) {
  const errors = useErrors(path);
  const preview = use(PreviewContext);
  const textareaId = useId();
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [result, setResult] = useState<MarkdownPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const blockSelectId = useId();

  const insert = (before: string, after = "", placeholderText = "") => {
    const area = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    const start = area?.selectionStart ?? value.length;
    const end = area?.selectionEnd ?? value.length;
    const selected = value.slice(start, end) || placeholderText;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => {
      if (!area) return;
      area.focus();
      area.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const showPreview = () => {
    setMode("preview");
    if (!preview) return;
    setPreviewError(null);
    startTransition(async () => {
      const response = await preview({ source: value, inline });
      if (response.ok) setResult(response.data);
      else setPreviewError(response.error.message);
    });
  };

  return (
    <Field id={textareaId} label={label} hint={hint} optional={optional} error={errors}>
      {(control) => (
        <div className="rounded-control border border-border">
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-subtle px-2 py-1" role="toolbar" aria-label="Formatting">
            <Button type="button" size="sm" variant="ghost" iconStart={<Bold aria-hidden="true" />} onClick={() => insert("**", "**", "bold text")} disabled={disabled || mode === "preview"}>
              <span className="sr-only">Bold</span>
            </Button>
            <Button type="button" size="sm" variant="ghost" iconStart={<Italic aria-hidden="true" />} onClick={() => insert("*", "*", "italic text")} disabled={disabled || mode === "preview"}>
              <span className="sr-only">Italic</span>
            </Button>
            <Button type="button" size="sm" variant="ghost" iconStart={<Sigma aria-hidden="true" />} onClick={() => insert("$", "$", "x^2")} disabled={disabled || mode === "preview"}>
              Maths
            </Button>
            {!inline && (
              <>
                <Button type="button" size="sm" variant="ghost" iconStart={<SquareFunction aria-hidden="true" />} onClick={() => insert("\n$$\n", "\n$$\n", "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}")} disabled={disabled || mode === "preview"}>
                  Display maths
                </Button>
                <label htmlFor={blockSelectId} className="sr-only">
                  Insert a content block
                </label>
                <select
                  id={blockSelectId}
                  className="min-h-9 rounded-control border border-border bg-surface px-2 text-sm text-text"
                  value=""
                  disabled={disabled || mode === "preview"}
                  onChange={(e) => {
                    const type = e.target.value as ContentBlockType;
                    if (CONTENT_BLOCK_TYPES.includes(type)) insert(blockSnippet(type));
                  }}
                >
                  <option value="">Insert block…</option>
                  {CONTENT_BLOCK_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {CONTENT_BLOCK_LABELS[type]}
                    </option>
                  ))}
                </select>
              </>
            )}
            <Button type="button" size="sm" variant="ghost" iconStart={<ImageIcon aria-hidden="true" />} onClick={() => insert("![", "](asset:PASTE-ASSET-ID)", "describe the image")} disabled={disabled || mode === "preview"}>
              Image
            </Button>
            <span className="ml-auto" />
            {mode === "write" ? (
              <Button type="button" size="sm" variant="outline" iconStart={<Eye aria-hidden="true" />} onClick={showPreview} disabled={!preview}>
                Preview
              </Button>
            ) : (
              <Button type="button" size="sm" variant="outline" iconStart={<Pencil aria-hidden="true" />} onClick={() => setMode("write")}>
                Write
              </Button>
            )}
          </div>
          {mode === "write" ? (
            <Textarea
              id={control.id}
              aria-describedby={control["aria-describedby"]}
              aria-invalid={control["aria-invalid"]}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={rows}
              disabled={disabled}
              maxLength={maxLength}
              placeholder={placeholder}
              className="rounded-none border-0 font-mono text-sm focus-visible:ring-inset"
            />
          ) : (
            <div className="space-y-3 p-3" aria-live="polite" aria-busy={pending}>
              {pending && <p className="text-sm text-muted">Rendering…</p>}
              {previewError && <p className="text-sm text-danger-text">{previewError}</p>}
              {!pending && result && (
                <>
                  {value.trim() === "" ? <p className="text-sm text-muted">Nothing to preview yet.</p> : <RichContent html={result.html} inline={inline} />}
                  {result.warnings.length > 0 && (
                    <ul className="space-y-1 rounded-control bg-warning-soft p-2 text-sm text-warning-text">
                      {result.warnings.map((warning, index) => (
                        <li key={`${warning.code}-${index}`}>
                          <span className="font-mono text-xs">{warning.code}</span> {warning.line !== undefined ? `(line ${warning.line}) ` : ""}
                          {warning.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Field>
  );
}
