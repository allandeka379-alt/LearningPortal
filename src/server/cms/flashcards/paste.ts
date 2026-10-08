/**
 * Parser for "bulk create flashcards from a 2-column paste" (§18, §25). Editors copy two (or three) columns from a
 * spreadsheet — Front, Back, optional Notes — which arrive as TAB-separated rows; cells containing tabs, line breaks or
 * quotes are wrapped in double quotes by Excel / Google Sheets / LibreOffice (RFC 4180 style, `""` = one quote). A
 * header row ("Front, Back…") is skipped. Pure: no I/O.
 */

export const MAX_PASTE_ROWS = 500;
export const MAX_CARD_SIDE_LENGTH = 5_000;

export interface PastedCard {
  front: string;
  back: string;
  notes: string | null;
  /** 1-based row number in the paste (for error messages). */
  row: number;
}

export interface PasteProblem {
  row: number;
  message: string;
}

export interface PasteResult {
  cards: PastedCard[];
  problems: PasteProblem[];
}

/** Splits tab-separated text into rows of cells, honouring double-quoted cells. */
export function splitTsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let atCellStart = true;
  const input = text.replace(/\r\n?/g, "\n");
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i] as string;
    if (quoted) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"' && atCellStart) {
      quoted = true;
      atCellStart = false;
      continue;
    }
    if (ch === "\t") {
      row.push(cell);
      cell = "";
      atCellStart = true;
      continue;
    }
    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      atCellStart = true;
      continue;
    }
    cell += ch;
    atCellStart = false;
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const HEADER_FRONT = /^(front|question|term|prompt|side ?a)$/i;
const HEADER_BACK = /^(back|answer|definition|meaning|side ?b)$/i;

/** Parses a pasted block into cards (+ row problems). Empty rows are ignored; at most {@link MAX_PASTE_ROWS} cards. */
export function parseFlashcardPaste(text: string): PasteResult {
  const rows = splitTsv(text);
  const cards: PastedCard[] = [];
  const problems: PasteProblem[] = [];
  rows.forEach((cells, index) => {
    const rowNumber = index + 1;
    const trimmed = cells.map((cell) => cell.trim());
    if (trimmed.every((cell) => cell === "")) return;
    if (index === 0 && HEADER_FRONT.test(trimmed[0] ?? "") && HEADER_BACK.test(trimmed[1] ?? "")) return;
    const [front = "", back = "", notes = "", ...rest] = trimmed;
    if (trimmed.length < 2 || front === "" || back === "") {
      problems.push({
        row: rowNumber,
        message:
          trimmed.length < 2
            ? "Only one column found. Paste two columns (front and back), e.g. copied from a spreadsheet."
            : front === ""
              ? "The front is empty."
              : "The back is empty.",
      });
      return;
    }
    if (rest.some((cell) => cell !== "")) {
      problems.push({ row: rowNumber, message: "Too many columns. Use Front, Back and (optionally) Notes." });
      return;
    }
    if (front.length > MAX_CARD_SIDE_LENGTH || back.length > MAX_CARD_SIDE_LENGTH || notes.length > MAX_CARD_SIDE_LENGTH) {
      problems.push({ row: rowNumber, message: `Keep each side under ${MAX_CARD_SIDE_LENGTH.toLocaleString("en")} characters.` });
      return;
    }
    cards.push({ front, back, notes: notes === "" ? null : notes, row: rowNumber });
  });
  if (cards.length > MAX_PASTE_ROWS) {
    problems.push({ row: cards[MAX_PASTE_ROWS]?.row ?? MAX_PASTE_ROWS + 1, message: `Paste at most ${MAX_PASTE_ROWS} cards at a time.` });
    return { cards: cards.slice(0, MAX_PASTE_ROWS), problems };
  }
  return { cards, problems };
}
