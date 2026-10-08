/**
 * Exam-mode keyboard shortcuts (§13 navigation, §43 keyboard operation). Single letters, so they must never fire
 * while the student is typing: text fields, text areas, selects and contenteditable regions keep every key, as do
 * open dialogs and sheets, and any key combined with Ctrl / Alt / Cmd. Radio buttons and checkboxes do not consume
 * letters, so shortcuts still work after choosing an option. Pure apart from reading the event target.
 */

export type ExamShortcut = "next" | "previous" | "flag" | "review" | "questions";

export interface ExamShortcutHelp {
  /** The key as printed (`<Kbd>`). */
  key: string;
  action: ExamShortcut;
  description: string;
}

/** The documented shortcuts, in the order the help lists them. */
export const EXAM_SHORTCUTS: readonly ExamShortcutHelp[] = [
  { key: "N", action: "next", description: "Next question" },
  { key: "P", action: "previous", description: "Previous question" },
  { key: "F", action: "flag", description: "Flag or unflag this question for review" },
  { key: "Q", action: "questions", description: "Open the list of questions" },
  { key: "R", action: "review", description: "Review your answers and submit" },
];

const BY_KEY = new Map(EXAM_SHORTCUTS.map((shortcut) => [shortcut.key.toLowerCase(), shortcut.action]));

/** Input types that do not take typed text (letters do nothing in them). */
const NON_TEXT_INPUTS = new Set(["checkbox", "radio", "button", "submit", "reset", "range", "color", "file", "image"]);

/** True when key presses on `target` belong to the student's typing (or to an open dialog). */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!target || typeof (target as Element).closest !== "function") return false;
  const element = target as HTMLElement;
  if (element.closest("dialog")) return true;
  const tag = element.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT") return true;
  if (tag === "INPUT") return !NON_TEXT_INPUTS.has(((element as HTMLInputElement).type || "text").toLowerCase());
  if (element.isContentEditable) return true;
  return element.closest("[contenteditable=''], [contenteditable='true'], [role='textbox'], [role='combobox'], [role='spinbutton']") !== null;
}

export interface ShortcutEventLike {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  repeat?: boolean;
  isComposing?: boolean;
  defaultPrevented?: boolean;
  target: EventTarget | null;
}

/** The shortcut a key press triggers, or null when the key belongs to something else. */
export function shortcutFor(event: ShortcutEventLike): ExamShortcut | null {
  if (event.defaultPrevented || event.repeat || event.isComposing) return null;
  if (event.altKey || event.ctrlKey || event.metaKey) return null;
  if (event.key.length !== 1) return null;
  if (isTypingTarget(event.target)) return null;
  return BY_KEY.get(event.key.toLowerCase()) ?? null;
}

/** `aria-keyshortcuts` value for an action. */
export function ariaShortcut(action: ExamShortcut): string | undefined {
  return EXAM_SHORTCUTS.find((shortcut) => shortcut.action === action)?.key;
}
