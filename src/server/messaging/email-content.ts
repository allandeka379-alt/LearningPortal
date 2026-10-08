import "server-only";

/**
 * Plain-text to HTML for transactional email (pure, provider-independent). Messages are authored as plain text
 * (OTP templates, notifications, invitations); the HTML part is the same words with paragraphs and clickable http(s)
 * links. Everything is escaped: no markup from the text ever reaches the HTML. No images, tracking pixels or remote
 * resources (low bandwidth, privacy).
 */

const HTML_ESCAPES: Readonly<Record<string, string>> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

const URL_PATTERN = /https?:\/\/[^\s<>"']+/g;
/** Punctuation that ends a sentence rather than the URL ("… at https://x.example/a."). */
const TRAILING_PUNCTUATION = /[.,;:!?)\]]+$/;

/** One line of text as HTML with escaped content and `<a>` for http(s) URLs. */
function lineToHtml(line: string): string {
  let html = "";
  let last = 0;
  for (const match of line.matchAll(URL_PATTERN)) {
    const start = match.index;
    let url = match[0];
    const trailing = TRAILING_PUNCTUATION.exec(url)?.[0] ?? "";
    if (trailing) url = url.slice(0, url.length - trailing.length);
    html += escapeHtml(line.slice(last, start));
    html += `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`;
    last = start + url.length;
  }
  return html + escapeHtml(line.slice(last));
}

/** HTML body for a plain-text message: blank lines separate paragraphs, single newlines become `<br>`. */
export function renderEmailHtml(text: string, options: { subject?: string; lang?: string } = {}): string {
  const paragraphs = text
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map((block) => `<p style="margin:0 0 16px">${block.split("\n").map(lineToHtml).join("<br>")}</p>`);
  const title = options.subject ? `<title>${escapeHtml(options.subject)}</title>` : "";
  return (
    `<!doctype html><html lang="${escapeHtml(options.lang ?? "en")}"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">${title}</head>` +
    `<body style="margin:0;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.5">` +
    `<div style="max-width:560px;margin:0 auto">${paragraphs.join("")}</div></body></html>`
  );
}
