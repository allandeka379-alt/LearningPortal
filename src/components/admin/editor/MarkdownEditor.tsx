"use client";

import { Bold, Eye, Heading2, Italic, List, ListOrdered, PenLine, Radical, Sigma, Table } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, useTransition, type KeyboardEvent, type ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Field } from "@/components/ui/Field";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/cn";
import type { ContentBlockType } from "@/lib/content/blocks";
import {
  BLOCK_TOOLBAR,
  insertContentBlock,
  insertDisplayMath,
  insertHeading,
  insertList,
  insertParagraph,
  insertTable,
  offsetOfLine,
  wrapSelection,
  type TextEdit,
} from "./insert";
import { MediaPicker } from "./MediaPicker";
import type { MediaSearchAction, PreviewAction, PreviewMode, PreviewPayload } from "./types";
import { WarningList } from "./WarningList";

/**
 * Markdown + LaTeX + content-block editor with a live, SERVER-rendered preview (the exact pipeline students see:
 * sanitised HTML, KaTeX, resolved images) and the renderer's authoring warnings. Side by side from `lg`; a
 * Write / Preview switch on smaller screens. The preview refreshes 600 ms after typing stops; stale responses are
 * ignored. The textarea is a normal form field (`name`), so it submits with the enclosing form.
 */

export interface MarkdownEditorProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: ReactNode;
  error?: readonly string[] | string | null;
  required?: boolean;
  optional?: boolean;
  previewAction: PreviewAction;
  mode?: PreviewMode;
  rows?: number;
  /** Content-block insert menu (lessons, explanations). */
  blocks?: boolean;
  mediaSearchAction?: MediaSearchAction;
  maxLength?: number;
  /** Notifies the parent of every change (e.g. to track unsaved edits). */
  onValueChange?: (value: string) => void;
  /** Stack the preview under the editor even on wide screens (short fields such as flashcard sides). */
  stacked?: boolean;
}

const PREVIEW_DELAY_MS = 600;

export function MarkdownEditor({
  name,
  label,
  defaultValue,
  hint,
  error,
  required,
  optional,
  previewAction,
  mode = "lesson",
  rows = 18,
  blocks = true,
  mediaSearchAction,
  maxLength,
  onValueChange,
  stacked = false,
}: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState<PreviewPayload | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [view, setView] = useState<"write" | "preview">("write");
  const [pending, startTransition] = useTransition();
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const ticket = useRef(0);
  const previewId = useId();

  // Debounced server render; only the newest response is applied.
  useEffect(() => {
    const current = ++ticket.current;
    if (value.trim() === "") return;
    const timer = setTimeout(() => {
      startTransition(async () => {
        const result = await previewAction(value, mode);
        if (current !== ticket.current) return;
        if (result?.ok) {
          setPreview(result.data);
          setPreviewError(null);
        } else {
          setPreviewError(result?.error.message ?? "The preview could not be rendered.");
        }
      });
    }, PREVIEW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [value, mode, previewAction]);

  const update = useCallback(
    (next: string) => {
      setValue(next);
      onValueChange?.(next);
    },
    [onValueChange],
  );

  const apply = useCallback(
    (edit: (value: string, start: number, end: number) => TextEdit) => {
      const element = textarea.current;
      const start = element?.selectionStart ?? value.length;
      const end = element?.selectionEnd ?? value.length;
      const result = edit(value, start, end);
      update(result.value);
      requestAnimationFrame(() => {
        if (!element) return;
        element.focus();
        element.setSelectionRange(result.selectionStart, result.selectionEnd);
      });
    },
    [value, update],
  );

  const jumpToLine = useCallback(
    (line: number) => {
      setView("write");
      const element = textarea.current;
      if (!element) return;
      const offset = offsetOfLine(value, line);
      const lineEnd = value.indexOf("\n", offset);
      requestAnimationFrame(() => {
        element.focus();
        element.setSelectionRange(offset, lineEnd === -1 ? value.length : lineEnd);
      });
    },
    [value],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === "b") {
      event.preventDefault();
      apply((v, s, e) => wrapSelection(v, s, e, "**", "**", "bold text"));
    } else if (key === "i") {
      event.preventDefault();
      apply((v, s, e) => wrapSelection(v, s, e, "*", "*", "italic text"));
    }
  };

  const tool = (labelText: string, icon: ReactNode, onClick: () => void, title?: string) => (
    <button
      type="button"
      onClick={onClick}
      title={title ?? labelText}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-control px-2 text-sm text-text hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&_svg]:size-4"
    >
      {icon}
      <span className="sr-only sm:not-sr-only sm:text-xs">{labelText}</span>
    </button>
  );

  // An emptied editor shows the empty state, not the last preview.
  const shown = value.trim() === "" ? null : preview;
  const shownError = value.trim() === "" ? null : previewError;
  const warnings = shown?.warnings ?? [];

  return (
    <Field label={label} hint={hint} error={error} required={required} optional={optional}>
      {(control) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 lg:hidden" role="group" aria-label={`${label}: view`}>
            <div className="inline-flex rounded-control border border-border p-0.5">
              {(["write", "preview"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => setView(option)}
                  className={cn(
                    "inline-flex min-h-9 items-center gap-1.5 rounded-control px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&_svg]:size-4",
                    view === option ? "bg-primary-soft text-on-primary-soft" : "text-muted hover:text-text",
                  )}
                >
                  {option === "write" ? <PenLine aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  {option === "write" ? "Write" : "Preview"}
                </button>
              ))}
            </div>
            {warnings.length > 0 && <span className="text-xs font-medium text-warning-text">{warnings.length} warning{warnings.length === 1 ? "" : "s"}</span>}
          </div>

          <div className={cn("grid gap-4", !stacked && "lg:grid-cols-2")}>
            <div className={cn("min-w-0 space-y-2", view !== "write" && "hidden lg:block")}>
              <div role="group" aria-label={`${label}: formatting`} className="flex flex-wrap items-center gap-0.5 rounded-control border border-border bg-subtle p-1">
                {tool("Bold", <Bold aria-hidden="true" />, () => apply((v, s, e) => wrapSelection(v, s, e, "**", "**", "bold text")), "Bold (Ctrl+B)")}
                {tool("Italic", <Italic aria-hidden="true" />, () => apply((v, s, e) => wrapSelection(v, s, e, "*", "*", "italic text")), "Italic (Ctrl+I)")}
                {mode === "lesson" && tool("Heading", <Heading2 aria-hidden="true" />, () => apply((v, s, e) => insertHeading(v, s, e, 2)))}
                {mode !== "inline" && tool("List", <List aria-hidden="true" />, () => apply((v, s, e) => insertList(v, s, e, false)))}
                {mode !== "inline" && tool("Numbered", <ListOrdered aria-hidden="true" />, () => apply((v, s, e) => insertList(v, s, e, true)))}
                {tool("Maths", <Sigma aria-hidden="true" />, () => apply((v, s, e) => wrapSelection(v, s, e, "$", "$", "x^2")), "Inline maths ($…$)")}
                {mode !== "inline" && tool("Display maths", <Radical aria-hidden="true" />, () => apply(insertDisplayMath), "Display maths ($$…$$)")}
                {mode !== "inline" && tool("Table", <Table aria-hidden="true" />, () => apply(insertTable))}
                {mediaSearchAction && mode !== "inline" && (
                  <MediaPicker searchAction={mediaSearchAction} onPick={(pick) => apply((v, s, e) => insertParagraph(v, s, e, pick.snippet))} />
                )}
                {blocks && mode !== "inline" && (
                  <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
                    <span className="sr-only sm:not-sr-only">Insert block</span>
                    <select
                      value=""
                      onChange={(event) => {
                        const type = event.target.value as ContentBlockType;
                        if (type) apply((v, s, e) => insertContentBlock(v, s, e, type));
                      }}
                      className="min-h-9 rounded-control border border-border bg-surface px-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      aria-label="Insert a content block"
                    >
                      <option value="">Block…</option>
                      {BLOCK_TOOLBAR.map((block) => (
                        <option key={block.type} value={block.type}>
                          {block.label}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
              <textarea
                // Not natively `required`: the textarea may be hidden behind the Preview switch on phones, where
                // native validation could not focus it. The server validates instead.
                id={control.id}
                aria-describedby={control["aria-describedby"]}
                aria-invalid={control["aria-invalid"]}
                ref={textarea}
                name={name}
                value={value}
                onChange={(event) => update(event.target.value)}
                onKeyDown={onKeyDown}
                rows={rows}
                maxLength={maxLength}
                spellCheck
                aria-controls={previewId}
                className="block w-full resize-y rounded-control border border-border-strong bg-surface px-3.5 py-3 font-mono text-sm leading-relaxed text-text focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus aria-invalid:border-danger"
              />
            </div>

            <div className={cn("min-w-0 space-y-3", view !== "preview" && "hidden lg:block")}>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-semibold tracking-wide uppercase">Preview</span>
                <span aria-live="polite" className="flex items-center gap-1.5">
                  {pending ? (
                    <>
                      <Spinner size="sm" /> Updating…
                    </>
                  ) : shown ? (
                    warnings.length > 0 ? `${warnings.length} warning${warnings.length === 1 ? "" : "s"}` : "No warnings"
                  ) : null}
                </span>
              </div>
              <div
                id={previewId}
                className={cn(
                  "min-h-24 overflow-auto rounded-control border border-border bg-surface p-4",
                  !stacked && "lg:max-h-[70vh]",
                  pending && "opacity-70",
                )}
              >
                {shownError ? (
                  <p className="text-sm text-danger-text">{shownError}</p>
                ) : shown ? (
                  <RichContent html={shown.html} inline={mode === "inline"} />
                ) : (
                  <p className="text-sm text-muted">{value.trim() === "" ? "Start writing to see the preview." : "Rendering…"}</p>
                )}
              </div>
              <WarningList warnings={warnings} onJump={jumpToLine} />
            </div>
          </div>
        </div>
      )}
    </Field>
  );
}
