// Diagram audit (owner request 2026-10-12: "review all areas that need diagrams to see if they are present").
// Scans every content family for:
//   A. MISSING  - text a student reads (lesson body, question stem / part stems / options) that points at a visual the
//                 student is supposed to see ("the diagram below", "Figure 2", "use the graph") while the item carries
//                 no image. In a question this makes it unanswerable as written.
//   B. DRAW     - tasks that ask the student to draw / sketch / plot (self-marked; hard on a phone).
//   C. WOULD-HELP - lessons on topics that are normally taught with a diagram (circuits, the heart, supply and demand,
//                 ray diagrams, logic gates ...) and have no image at all.
// Images count as present when the item has a Markdown image (`![...](media:...)`) or a `media` payload.
// Run: node .scratch/tools/diagram-audit.mjs [family ...] [--list] [--out .scratch/website/diagram-audit.md]
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const LIST = args.includes("--list");
const outIdx = args.indexOf("--out");
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;
const ROOT = "content/subjects";
const only = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--out");
const families = (only.length ? only : fs.readdirSync(ROOT)).filter((f) => fs.existsSync(path.join(ROOT, f)));

const VIS = "(?:diagram|figure(?!s)|graph|chart|map|photograph|photo|picture|drawing|image|sketch|illustration|circuit diagram|ray diagram|cartoon|poster|advertisement|histogram|bar chart|pie chart|flowchart|flow chart|network diagram|ER diagram|entity[- ]relationship diagram|cross-section|section diagram)";
const REF = [
  new RegExp(`\\b(?:the|this|that|these)\\s+${VIS}s?\\s+(?:below|above|opposite|shows?|showing|represents?|illustrates?|given|provided)\\b`, "i"),
  new RegExp(`\\b(?:in|on|from|using|use|study|look at|examine|refer to|see)\\s+(?:the\\s+)?${VIS}s?\\s+(?:below|above|provided|given)\\b`, "i"),
  new RegExp(`\\b(?:study|look at|examine|refer to|use|using|from|in|on)\\s+the\\s+${VIS}s?\\b(?!\\s+(?:you|that you|of your own))`, "i"),
  /\bfig(?:ure)?\.?\s*\d+(?:\.\d+)?\b/i,
  new RegExp(`\\b(?:shown|labelled|marked|drawn|plotted)\\s+(?:in|on) the ${VIS}\\b`, "i"),
  new RegExp(`\\bthe following ${VIS}\\b`, "i"),
  /\b(?:point|line|curve|region|part|structure|organ|component|label)s?\s+[A-H](?:\s*(?:,|and|to)\s*[A-H])*\s+(?:on|in)\s+the\s+(?:diagram|figure|graph|map)\b/i,
];
const DRAW = new RegExp(`\\b(?:draw|sketch|plot|construct|complete|label)\\b[^.?!]{0,60}\\b(?:${VIS}|graph|curve|axes|ray|field lines|circuit|triangle|locus|loci|histogram|ogive|cumulative frequency|scale drawing|isometric|net)\\b`, "i");
// Self-referential phrases that do not need an image ("a diagram you draw", "draw a diagram") are covered by DRAW.
const SELF = /\b(?:draw|sketch|your own|you draw|you would draw|you can draw)\b|described in words|image of God|in the image of|on (?:the|a) map represents/i;

/** The visual is supplied as data right after the reference (a Markdown table or a code block), so nothing is missing. */
function suppliedAsData(text, m) {
  const after = text.slice(m.index, m.index + m[0].length + 260);
  return /\n\s*\||```|described in words/i.test(after) || /\|[^|\n]+\|[^|\n]+\|/.test(after);
}

// Topics normally taught with a picture (per family subject area). A lesson whose title or headings match and that has
// no image lands in WOULD-HELP. Keep these specific: generic words ("structure", "process") are excluded on purpose.
const NEEDS = [
  /\bcircuit|resistors? in (?:series|parallel)|ammeter|voltmeter|logic gate|truth table|flip-?flop|half adder|full adder\b/i,
  /\bray diagram|lens(?:es)?\b|refraction|reflection|total internal reflection|optical fibre|mirror\b/i,
  /\bmagnetic field|field lines|electromagnet|motor effect|generator|transformer|solenoid\b/i,
  /\bwave(?:s|front)?\b|oscilloscope|interference|diffraction|stationary wave/i,
  /\bvectors?|forces? diagram|free-body|moments?\b|levers?\b|pulleys?\b|inclined plane|projectile/i,
  /\bheart|circulatory|blood vessels?|lungs?|alveol|digestive system|alimentary|kidney|nephron|neurone|reflex arc|eye\b|ear\b|brain\b|skeleton|joint|flower|leaf structure|root hair|xylem|phloem|stomata|cell structure|plant cell|animal cell|mitosis|meiosis|chromosome|DNA|food (?:chain|web)|nitrogen cycle|carbon cycle|water cycle|reproductive system/i,
  /\bapparatus|titration|distillation|chromatography|electrolysis|electrochemical cell|fractional|bonding|dot[- ]and[- ]cross|lattice|isomer|structural formula|reaction profile|energy level diagram|enthalpy (?:profile|diagram)|Maxwell|Boltzmann|orbital|hybridi[sz]/i,
  /\bgraphs?\b|gradient|straight line|quadratic|parabola|inequalit(?:y|ies)|linear programming|transformations?|vectors?|loci|locus|constructions?|bearings|angles?|triangles?|circles?|circle theorems|polygons?|similarity|congruen|trigonometr|mensuration|area|volume|nets|coordinate geometry|histogram|cumulative frequency|box plot|scatter|stem and leaf|pie chart|bar chart|venn diagram|tree diagram|matri(?:x|ces)|calculus|integration|differentiation|curve sketch|normal distribution/i,
  /\bmaps?\b|map reading|contour|grid reference|scale|cross-section|landforms?|river|meander|delta|coast|waves|tectonic|plate|volcan|earthquake|fold|fault|weathering|climate graph|weather instruments|pressure systems?|population pyramid|settlement pattern|land use|drainage/i,
  /\bsupply|demand|equilibrium price|elasticity|cost curves?|revenue curves?|market structure|monopol|production possibility|circular flow|aggregate|Phillips curve|Lorenz|break-?even|indifference/i,
  /\bbreak-?even|organisation(?:al)? chart|organi[sz]ation structure|span of control|chain of command|product life cycle|Boston matrix|critical path|network analysis|decision tree|marketing mix/i,
  /\bflowchart|flow chart|network topolog|star topology|bus topology|mesh topology|OSI|TCP\/IP model|von Neumann|fetch[- ]decode|register|binary tree|linked list|stack|queue|entity[- ]relationship|ER diagram|state[- ]transition|logic circuit|Karnaugh|data flow diagram|class diagram|UML/i,
  /\btimeline|campaign map|map of|battle\b|route of|empire\b|kingdom\b|territor/i,
  /\bsoil profile|soil texture triangle|crop rotation|farm layout|irrigation|parts of a|implement|tractor|livestock handling|poultry house|animal digestive/i,
  /\bledger|T-account|T account|trial balance layout|statement of financial position layout|manufacturing account/i,
];

// Whole words only: wrap each alternation so "ear" never matches "linear" and "osi" never matches "position".
for (let i = 0; i < NEEDS.length; i += 1) {
  const core = NEEDS[i].source.replace(/^\\b/, "").replace(/\\b$/, "");
  NEEDS[i] = new RegExp(String.raw`\b(?:` + core + String.raw`)s?\b`, "i");
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

/** Student-facing text of a question (stem, part stems, options, payload texts), not its explanations / mark scheme. */
function questionText(q) {
  const out = [q.stem ?? "", q.context ?? "", q.passage ?? ""];
  for (const o of q.options ?? []) out.push(o.content ?? "");
  for (const p of q.parts ?? []) {
    out.push(p.stem ?? "");
    for (const o of p.options ?? []) out.push(o.content ?? "");
  }
  return out.join("\n");
}
const hasImageText = (s) => /!\[[^\]]*\]\(media:/.test(s);
const hasImageQ = (q) => Boolean(q.payload?.media) || hasImageText(JSON.stringify(q)) || (q.parts ?? []).some((p) => p.payload?.media);
const firstMatch = (res, s) => {
  for (const r of res) {
    const m = r.exec(s);
    if (m) return m;
  }
  return null;
};
const snippet = (s, m) => s.slice(Math.max(0, m.index - 70), m.index + m[0].length + 50).replace(/\s+/g, " ").trim();

const report = [];
const totals = { families: 0, lessons: 0, lessonImages: 0, questions: 0, qImages: 0, missingQ: 0, missingL: 0, draw: 0, wouldHelp: 0, labelling: 0 };
for (const family of families) {
  const base = path.join(ROOT, family);
  const fam = { family, lessons: 0, lessonImages: 0, questions: 0, qImages: 0, labelling: 0, missingQ: [], missingL: [], draw: [], wouldHelp: [] };
  for (const file of walk(path.join(base, "lessons")).filter((f) => f.endsWith(".md"))) {
    const text = fs.readFileSync(file, "utf8");
    const body = text.replace(/^---[\s\S]*?\n---\n/, "");
    fam.lessons += 1;
    const img = hasImageText(text);
    if (img) fam.lessonImages += 1;
    const rel = path.relative(base, file).replace(/\\/g, "/");
    const title = /^title:\s*"?(.+?)"?\s*$/m.exec(text)?.[1] ?? rel;
    if (!img) {
      const m = firstMatch(REF, body);
      if (m && !SELF.test(snippet(body, m)) && !suppliedAsData(body, m)) fam.missingL.push({ where: rel, title, text: snippet(body, m) });
      const heads = [title, ...[...body.matchAll(/^#{1,4}\s+(.+)$/gm)].map((h) => h[1])].join(" | ");
      const need = NEEDS.find((r) => r.test(heads));
      if (need) fam.wouldHelp.push({ where: rel, title, why: need.exec(heads)[0] });
    }
  }
  for (const file of walk(path.join(base, "questions")).filter((f) => f.endsWith(".json"))) {
    let items;
    try {
      items = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      continue;
    }
    for (const q of Array.isArray(items) ? items : (items.questions ?? [])) {
      fam.questions += 1;
      if (q.type === "DIAGRAM_LABELLING") fam.labelling += 1;
      const img = hasImageQ(q);
      if (img) fam.qImages += 1;
      const text = questionText(q);
      const m = firstMatch(REF, text);
      if (!img && m && !SELF.test(snippet(text, m)) && !suppliedAsData(text, m)) fam.missingQ.push({ where: q.key, type: q.type, text: snippet(text, m) });
      const d = DRAW.exec(text);
      if (d) fam.draw.push({ where: q.key, type: q.type, text: snippet(text, d) });
    }
  }
  totals.families += 1;
  for (const k of ["lessons", "lessonImages", "questions", "qImages", "labelling"]) totals[k] += fam[k];
  totals.missingQ += fam.missingQ.length;
  totals.missingL += fam.missingL.length;
  totals.draw += fam.draw.length;
  totals.wouldHelp += fam.wouldHelp.length;
  report.push(fam);
}

const lines = [];
lines.push(`# Diagram audit (${new Date().toISOString().slice(0, 10)})`, "");
lines.push(
  `${totals.families} families: ${totals.lessons} lessons (${totals.lessonImages} with an image), ${totals.questions} questions (${totals.qImages} with an image, ${totals.labelling} diagram-labelling).`,
  "",
  `- **A. Missing visual in a question** (refers to a diagram/graph/map the student cannot see): **${totals.missingQ}**`,
  `- **A. Missing visual in a lesson** (refers to a diagram that is not there): **${totals.missingL}**`,
  `- **B. Drawing tasks** (student must draw / sketch / plot; self-marked): **${totals.draw}**`,
  `- **C. Lessons on diagram-heavy topics with no image**: **${totals.wouldHelp}**`,
  "",
  "| Family | Lessons (img) | Questions (img) | A: Q missing | A: lesson missing | B: draw | C: would help |",
  "|---|---|---|---|---|---|---|",
);
for (const f of report) {
  lines.push(`| ${f.family} | ${f.lessons} (${f.lessonImages}) | ${f.questions} (${f.qImages}) | ${f.missingQ.length} | ${f.missingL.length} | ${f.draw.length} | ${f.wouldHelp.length} |`);
}
if (LIST || OUT) {
  for (const f of report) {
    if (!f.missingQ.length && !f.missingL.length && !f.draw.length && !f.wouldHelp.length) continue;
    lines.push("", `## ${f.family}`);
    if (f.missingQ.length) {
      lines.push("", `### A. Questions that refer to a visual that is not there (${f.missingQ.length})`, "");
      for (const x of f.missingQ) lines.push(`- \`${x.where}\` (${x.type}): …${x.text}…`);
    }
    if (f.missingL.length) {
      lines.push("", `### A. Lessons that refer to a visual that is not there (${f.missingL.length})`, "");
      for (const x of f.missingL) lines.push(`- \`${x.where}\` — ${x.title}: …${x.text}…`);
    }
    if (f.draw.length) {
      lines.push("", `### B. Drawing tasks (${f.draw.length})`, "");
      for (const x of f.draw) lines.push(`- \`${x.where}\` (${x.type}): …${x.text}…`);
    }
    if (f.wouldHelp.length) {
      lines.push("", `### C. Lessons on diagram-heavy topics with no image (${f.wouldHelp.length})`, "");
      for (const x of f.wouldHelp) lines.push(`- \`${x.where}\` — ${x.title} (_${x.why}_)`);
    }
  }
}
const text = lines.join("\n") + "\n";
if (OUT) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, text);
  console.log(lines.slice(0, 12 + report.length).join("\n"));
  console.log(`\nFull list: ${OUT}`);
} else console.log(text);
