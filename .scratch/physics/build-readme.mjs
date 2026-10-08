// Assembles content/subjects/physics-o/README.md from README.template.md, coverage.md and the DEV preview summary.
// Run: node .scratch/physics/build-readme.mjs
import fs from "node:fs";

const dir = ".scratch/physics";
const template = fs.readFileSync(`${dir}/README.template.md`, "utf8");
const coverage = fs
  .readFileSync(`${dir}/coverage.md`, "utf8")
  .replace(/<!-- facts[\s\S]*?-->\s*/, "")
  .trim()
  .replace(/^### /gm, "#### ")
  .replaceAll(
    "Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two topics), so topic rows can add up to more than the syllabus total.",
    "Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two\ntopics), so topic rows can add up to more than the syllabus total.",
  );

const smoke = [
  "- **Import:** the first run created both syllabus versions (65 ZIMSEC and 78 Cambridge topics) and 1,943 item rows",
  "  (1,186 questions, 92 lessons, 641 flashcards, 24 test rows) with 0 errors; the second run reported every row",
  "  unchanged. Two later edits (efficiency also tagged to ZIMSEC 4.1, and the practice exam's g value) went through the",
  "  normal draft-copy path and were re-published as revision 2; the final import reports that the database matches.",
  "- **Publish (DEV preview only):** `npm run content:publish -- --approver demo.admin@example.test --family physics-o`",
  "  with the note \"DEV PREVIEW ONLY … NOT a human review attestation (section 41)\" published both syllabus versions as",
  "  CURRENT and all 1,943 items (0 failed), and made both physics subjects AVAILABLE in the DEV catalogue.",
  "- **Smoke test** (`.scratch/physics/smoke.ts`: a fresh full-access student per board, using the real enrolment,",
  "  lesson, practice and exam services): 30 of 30 checks passed.",
  "  - ZIMSEC 2015-2022: the enrolment pins 2015-2022; the topic tree shows the 16 top-level topics (65 nodes); all 82",
  "    lessons tagged to ZIMSEC open unlocked and render; practice on 11.3 Current electricity and 10.2 Refraction drew",
  "    10 new questions each and marked all 20 model responses correct; all 12 topic tests are listed; the Electricity",
  "    topic test (15 questions, 20 marks, 25 minutes) and the practice exam (50 questions, 88 marks, 120 minutes)",
  "    started with their full blueprint and, answered with the model responses and submitted, earned every",
  "    automatically marked mark.",
  "  - Cambridge 2026-2028: the enrolment pins 2026-2028; the topic tree shows the 7 top-level topics (78 nodes); all 76",
  "    lessons render; practice on 3.2 Light and 5.2 Radioactivity marked 20 of 20 model responses correct; all 9 topic",
  "    tests are listed; the Waves topic test (14 questions, 20 marks, 25 minutes), Paper 2 (40 multiple-choice",
  "    questions, 45 minutes) and Paper 4 (17 structured questions, 80 marks, 75 minutes) started and earned every",
  "    automatically marked mark. Paper 2 drew only multiple-choice questions and Paper 4 only structured questions; in",
  "    the drawn Paper 4, 45 of the 80 marks were marked automatically and the rest are written answers that students",
  "    mark themselves.",
].join("\n");

const out = template.replace("{{COVERAGE}}", coverage).replace("{{SMOKE}}", smoke);
if (out.includes("{{")) throw new Error("unfilled placeholder");
fs.writeFileSync("content/subjects/physics-o/README.md", out);
console.log("wrote content/subjects/physics-o/README.md", out.length, "chars,", out.split("\n").length, "lines");
