import "server-only";
import { toPlainText } from "@/server/content/render";
import { latexToUnicode } from "./latex";

/**
 * Text projection of authored content for WhatsApp (ARCHITECTURE §3.10, §8): Markdown stripped through the content
 * pipeline's plain-text projection, inline / display maths converted to Unicode where simple. When something cannot
 * be shown faithfully as text (complex maths, images) `complex` is true and the caller adds a link to the app, where
 * the server-rendered version is shown.
 */

export interface WhatsAppText {
  text: string;
  /** The text lost something (complex maths or an image): link to the app. */
  complex: boolean;
}

const MATH = /\$\$([\s\S]+?)\$\$|(?<!\\)\$((?:\\.|[^$\\\n])+?)\$/g;
const PLACEHOLDER = /(\d+)/g;

/** Markdown + LaTeX source to WhatsApp-readable plain text. */
export function toWhatsAppText(source: string | null | undefined): WhatsAppText {
  if (!source || source.trim() === "") return { text: "", complex: false };
  let complex = false;
  const maths: string[] = [];
  const withPlaceholders = source.replace(MATH, (_match, display: string | undefined, inline: string | undefined) => {
    const latex = (display ?? inline ?? "").trim();
    const unicode = latexToUnicode(latex);
    if (unicode === null) complex = true;
    maths.push(unicode ?? latex);
    return `${maths.length - 1}`;
  });
  let plain: string;
  try {
    plain = toPlainText(withPlaceholders);
  } catch {
    plain = withPlaceholders.replace(/[*_#>`]/g, "");
  }
  if (/\[Image: [^\]]*\]/.test(plain) || /!\[[^\]]*\]\(/.test(withPlaceholders)) complex = true;
  const text = plain.replace(PLACEHOLDER, (_match, index: string) => maths[Number(index)] ?? "").trim();
  return { text, complex };
}

/** Single-line version (option labels, list rows). */
export function toWhatsAppLine(source: string | null | undefined): WhatsAppText {
  const result = toWhatsAppText(source);
  return { text: result.text.replace(/\s+/g, " ").trim(), complex: result.complex };
}

/**
 * Cuts text to at most `max` characters (code points), preferring a sentence end, then a word boundary, and marks the
 * cut with "…". Pure.
 */
export function truncateText(text: string, max: number): string {
  const chars = [...text];
  if (chars.length <= max) return text;
  const cut = chars.slice(0, Math.max(1, max - 1)).join("");
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "), cut.lastIndexOf("\n"));
  if (sentence >= cut.length * 0.6) return `${cut.slice(0, sentence + 1).trimEnd()}…`;
  const space = cut.lastIndexOf(" ");
  return `${(space >= cut.length * 0.5 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

/**
 * Makes model output WhatsApp-friendly (pure): Markdown bold / italics to WhatsApp `*bold*` / `_italic_`, headings to
 * bold lines, bullet markers to "•", inline LaTeX to Unicode (left as source when complex), extra blank lines removed.
 */
export function markdownToWhatsApp(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(MATH, (_match, display: string | undefined, inline: string | undefined) => {
      const latex = (display ?? inline ?? "").trim();
      return latexToUnicode(latex) ?? latex;
    })
    .replace(/^#{1,6}[ \t]+(.+)$/gm, "*$1*")
    .replace(/\*\*(.+?)\*\*/g, "*$1*")
    .replace(/__(.+?)__/g, "_$1_")
    .replace(/^[ \t]*[-*+][ \t]+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
