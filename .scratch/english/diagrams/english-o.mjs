// english-language-o diagrams. Run from the repo root: node .scratch/english/diagrams/english-o.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lessonPath, wrap, nlines, card, stack, insertAfterBlock } from "./_h.mjs";
const { C } = D;
const FAM = "english-language-o";
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  insertAfterBlock(lessonPath(FAM, lesson), after, D.md(name, alt, cap));
};

// 1. composition routine with the one-hour time split (composition/planning-paragraphing.md)
{
  let b = D.text(20, 22, "A one-hour composition (minutes)", { weight: 700 });
  const segs = [["Planning", 5, C.fillAmber], ["Writing", 45, C.fillBlue], ["Checking", 10, C.fillGreen]];
  let x = 20; const W = 540;
  segs.forEach(([t, m, f]) => {
    const w = (m / 60) * W;
    b += D.rect(x, 34, w, 40, { fill: f, width: 1.6 });
    b += D.text(x + w / 2, 59, `${m}`, { anchor: "middle", weight: 700, size: 15 });
    x += w;
  });
  b += D.text(20 + (2.5 / 60) * W, 94, "Planning", { size: 13, weight: 700, anchor: "start" }) + D.text(20 + (5 / 60) * W + (22.5 / 60) * W, 94, "Writing", { size: 13, weight: 700, anchor: "middle" }) + D.text(20 + (50 / 60) * W + (5 / 60) * W, 94, "Checking", { size: 13, weight: 700, anchor: "middle" });
  const steps = [
    ["1  Analyse the title", "Underline key words: type of writing, topic, limits.", C.fillAmber],
    ["2  Plan", "Five or six paragraph headings with two or three details under each.", C.fillAmber],
    ["3  Write strong paragraphs", "Topic sentence, development, linking sentence; connectives; varied sentences; a conclusion that adds something.", C.fillBlue],
    ["4  Check", "Reread: tense slips, full stops, spelling, unclear sentences.", C.fillGreen],
  ];
  let y = 116;
  steps.forEach(([t, d, f], i) => {
    const c = card(20, y, 540, t, d, { fill: f, chars: 72 });
    b += c.svg;
    if (i < steps.length - 1) b += D.arrow(40, y + c.h, 40, y + c.h + 16, { width: 2 });
    y += c.h + 16;
  });
  const alt = "Routine for every composition: analyse the title, plan five or six paragraphs, write, then check; in a one-hour paper about 5 minutes go on planning, 45 on writing and 10 on checking.";
  await put("composition-routine-time-split", D.svg(580, y, b), alt, "Figure: analyse, plan, write, check, with a 5, 45 and 10 minute split for one hour", "composition/planning-paragraphing.md", "## Step 4: Check");
}

// 2. anatomy of a body paragraph (same lesson)
{
  const rows = [
    ["Topic sentence", "Small home gardens could do more for family budgets than most people realise.", C.fillAmber],
    ["Development: explanation", "A bed of covo, tomatoes and onions behind the kitchen needs little more than waste water and compost from food scraps.", C.fillBlue],
    ["Development: example", "My aunt in Chitungwiza stopped buying vegetables for most of the rainy season after she dug three beds along her fence.", C.fillBlue],
    ["Linking sentence", "However, gardens also bring problems that cannot be ignored.", C.fillGreen],
  ].map(([label, text, fill]) => ({ label: label.replace(": ", ":\n"), text, fill }));
  const { svg } = stack(rows.map((r) => ({ ...r, label: r.label })), { w: 580, labelW: 150, chars: 50, arrows: false, gap: 10 });
  const alt = "Anatomy of a body paragraph using the home-gardens example: a topic sentence stating the main idea, development with an explanation and an example, and a linking sentence (However, gardens also bring problems) that prepares the next paragraph.";
  await put("body-paragraph-anatomy", svg, alt, "Figure: the parts of a body paragraph (topic sentence, development, linking sentence)", "composition/planning-paragraphing.md", ":::example{title=\"An annotated body paragraph\"}");
}

// 3. register scale (functional/register.md)
{
  const cols = [
    ["Formal", C.fillBlue, ["Readers: head, official,\neditor, employer", "Words: request,\ninform, regret", "Contractions:\navoided (I am)", "Slang: never"]],
    ["Semi-formal", C.fillGrey, ["Readers: teacher you\nknow, club members", "Words: ask, tell,\nsorry", "Contractions:\nsome", "Slang: never"]],
    ["Informal", C.fillAmber, ["Readers: friend,\nsibling, cousin", "Words: catch up,\nsort out", "Contractions:\ncommon (I'm)", "Slang: very little\n(never u or gr8)"]],
  ];
  let b = D.arrow(20, 24, 560, 24, { width: 2, arrowStart: true }) + D.text(290, 14, "level of formality", { anchor: "middle", size: 13, fill: C.muted });
  cols.forEach(([t, f, items], i) => {
    const x = 20 + i * 184;
    b += D.rect(x, 40, 172, 280, { fill: f, r: 8, width: 1.6 }) + D.text(x + 86, 66, t, { anchor: "middle", weight: 700, size: 16 });
    items.forEach((it, k) => (b += D.text(x + 10, 96 + k * 55, it, { size: 13 })));
  });
  const alt = "Register scale from formal to informal: formal for head, officials and editors with precise words and no contractions; semi-formal for club members; informal for friends with everyday words and contractions; slang and text speak are never acceptable in an exam.";
  await put("register-scale", D.svg(580, 336, b), alt, "Figure: formal, semi-formal and informal register compared", "functional/register.md", "## The three registers compared");
  // GAP check
  const gap = [["G", "Genre", "report", C.fillBlue], ["A", "Audience", "the Head: formal, respectful", C.fillAmber], ["P", "Purpose", "to inform and recommend", C.fillGreen]];
  let g = D.text(20, 22, "Task: a report to the Head on the clean-up at Sakubva Market", { size: 13, fill: C.muted });
  gap.forEach(([l, t, d, f], i) => {
    const x = 20 + i * 184;
    g += D.rect(x, 36, 172, 100, { fill: f, r: 8, width: 1.6 }) + D.text(x + 12, 74, l, { size: 30, weight: 700 }) + D.text(x + 48, 66, t, { weight: 700 }) + D.text(x + 12, 100, wrap(d, 22), { size: 13 });
  });
  const alt2 = "The GAP check applied to a report to the Head: genre is report, audience is the Head so the language is formal and respectful, and purpose is to inform and recommend.";
  await put("register-gap-check", D.svg(580, 152, g), alt2, "Figure: reading a task for Genre, Audience and Purpose (GAP)", "functional/register.md", "Applying the GAP check");
}

// 4. formal letter layout (functional/formal-letter.md)
{
  const blocks = [
    ["1", "Your address (top right, no name)", 300, 380, 34, C.fillGrey],
    ["2", "Date in full: 14 March 2026", 300, 380, 30, C.fillGrey],
    ["3", "Recipient's title and address (left)", 40, 300, 46, C.fillGrey],
    ["4", "Salutation: Dear Sir / Madam / Mr Moyo", 40, 340, 30, C.fillAmber],
    ["5", "Subject line (bold): RE: specific problem", 40, 340, 30, C.fillAmber],
    ["6a", "Opening paragraph: purpose in the first sentence", 40, 440, 40, C.fillBlue],
    ["6b", "Details paragraphs: facts in logical order", 40, 440, 40, C.fillBlue],
    ["6c", "Closing paragraph: the action you want", 40, 440, 40, C.fillBlue],
    ["7", "Close: Yours faithfully / sincerely, signature, full name", 40, 440, 40, C.fillGreen],
  ];
  let b = D.rect(20, 10, 540, 448, { fill: "#ffffff", r: 4, width: 2 });
  let y = 22;
  blocks.forEach(([n, t, x0, w, h, f]) => {
    const x = n === "1" || n === "2" ? 560 - w - 10 + 0 : x0 + 10;
    const bx = n === "1" || n === "2" ? 560 - 10 - 250 : 30;
    const bw = n === "1" || n === "2" ? 250 : w;
    b += D.rect(bx, y, bw, h, { fill: f, r: 6, width: 1.4 }) + D.text(bx + 8, y + h / 2 + 5, `${n}  ${t}`, { size: 13 });
    y += h + 8;
  });
  const alt = "Layout of a formal letter in order: writer's address and date at top right, recipient's title and address on the left, salutation, bold subject line, opening paragraph stating the purpose, detail paragraphs, a closing paragraph asking for action, then the close, signature and full name.";
  await put("formal-letter-layout", D.svg(580, 470, b), alt, "Figure: the layout of a formal letter (schematic)", "functional/formal-letter.md", "## The layout");
}

// 5. report layout (functional/report.md)
{
  const rows = [
    ["1  Title", "states the subject in full"],
    ["2  To / From / Date", "recipient; writer with position; date"],
    ["3  Introduction / Terms of reference", "what was investigated and why"],
    ["4  Procedure / Method (optional)", "how the information was gathered"],
    ["5  Findings", "facts only, under sub-headings"],
    ["6  Conclusion", "a short overall judgement"],
    ["7  Recommendations", "numbered actions, each answering a finding"],
    ["8  Signature", "name and position"],
  ];
  let b = D.rect(20, 10, 540, rows.length * 52 + 14, { fill: "#ffffff", r: 4, width: 2 });
  rows.forEach(([t, d], i) => {
    const y = 20 + i * 52;
    b += D.rect(32, y, 516, 44, { fill: i === 4 ? C.fillBlue : i === 6 ? C.fillGreen : C.fillGrey, r: 6, width: 1.4 }) + D.text(42, y + 19, t, { weight: 700, size: 14 }) + D.text(42, y + 37, d, { size: 13, fill: C.muted });
  });
  const alt = "Layout of a report in order: title, To/From/Date, introduction or terms of reference, optional procedure, findings under sub-headings (facts only), conclusion, numbered recommendations and the signature with name and position.";
  await put("report-layout", D.svg(580, rows.length * 52 + 34, b), alt, "Figure: the eight parts of a report (schematic page)", "functional/report.md", "## The layout");
}

// 6. summary: selecting points (summary/selecting-points.md) and writing (summary/writing.md)
{
  const rows = [
    ["1  Dissect the\nquestion", "Underline the focus (advantages, problems, ways), whose or what, and the limits (paragraphs, words, time).", C.fillAmber],
    ["2  Read the whole\npassage once", "Read for the gist first; points are often scattered.", C.fillBlue],
    ["3  Underline only what\nanswers the focus", "Ask of each sentence: does this answer the question? Leave out examples, repetition and background.", C.fillBlue],
    ["4  One idea per\npoint", "Split a sentence that holds two points; join a point spread across two sentences.", C.fillBlue],
    ["5  Make numbered\nnotes", "Short notes in your own words, numbered so you can count your points.", C.fillGreen],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 170, chars: 50, gap: 24 });
  const alt = "Process for selecting summary points: dissect the question for focus, whose or what and limits; read the whole passage once; underline only what answers the focus; keep one idea per point; then make numbered notes in your own words.";
  await put("summary-selecting-process", svg, alt, "Figure: the five steps for selecting summary points", "summary/selecting-points.md", "## Step 1: dissect the question");
  const rows2 = [
    ["1  Start directly", "The first sentence should already contain a point; no introduction.", C.fillAmber],
    ["2  Use your own words", "Change the key words of each point; keep words with no simple equivalent.", C.fillBlue],
    ["3  Combine points", "Join points in one sentence using lists, relative clauses, participles and linking words.", C.fillBlue],
    ["4  Link logically", "Group related points and use connectives (also, because, so that, although).", C.fillBlue],
    ["5  Check length and\naccuracy", "Count words; cut words, not points; no opinions or examples.", C.fillGreen],
  ];
  const r2 = stack(rows2, { w: 580, labelW: 170, chars: 50, gap: 24 });
  const alt2 = "Process for writing up a summary: start directly with a point, use your own words, combine points into fluent sentences, link them logically in a paragraph, and check the word count and accuracy.";
  await put("summary-writing-process", r2.svg, alt2, "Figure: the five steps for writing a summary", "summary/writing.md", "## Step 1: start directly");
}

// 7. comprehension question types: inference and writer's craft (reading/inference.md, reading/writers-craft.md)
{
  const rows = [
    ["1  Clue", "She read the list twice; she hid her face; she stayed in the toilets until the bell.", C.fillAmber],
    ["2  Meaning of\nthe clue", "People hide their faces and avoid others when they are upset or embarrassed.", C.fillBlue],
    ["3  Inference", "Nyasha's results were probably disappointing.", C.fillBlue],
    ["4  Evidence", "She kept her face turned towards the wall and did not come out until the bell rang.", C.fillGreen],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 150, chars: 52, gap: 24 });
  const alt = "Inference method applied to Nyasha reading her results: the clues (read the list twice, hid her face, stayed in the toilets) mean she was upset, so the inference is that her results were probably disappointing, supported by the evidence that she kept her face turned towards the wall.";
  await put("inference-clue-chain", svg, alt, "Figure: clue, meaning, inference, evidence for the Nyasha extract", "reading/inference.md", ":::example{title=\"Clue, meaning, inference, evidence\"}");
  const rows2 = [
    ["1  Identify", "The word: swallowed.", C.fillAmber],
    ["2  Meaning in\ncontext", "The water covered the bridge completely.", C.fillBlue],
    ["3  Connotation", "A living creature swallows food: it suggests something hungry, powerful and final.", C.fillBlue],
    ["4  Effect on\nthe reader", "The flood seems a huge, greedy animal; the reader feels how quickly the bridge vanished and senses the danger.", C.fillGreen],
  ];
  const r2 = stack(rows2, { w: 580, labelW: 150, chars: 52, gap: 24 });
  const alt2 = "Writer's craft method applied to the word swallowed in the flood sentence: identify the word, give its meaning in context (covered completely), explain its connotation (hungry, powerful, final) and state the effect on the reader (a greedy animal, danger felt).";
  await put("writers-craft-word-chain", r2.svg, alt2, "Figure: identify, meaning, connotation, effect for the word swallowed", "reading/writers-craft.md", ":::example{title=\"Explaining one word choice\"}");
}
