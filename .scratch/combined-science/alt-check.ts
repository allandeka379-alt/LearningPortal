// Marks alternative correct answers (must score full marks) with the real engine, by substituting each one as the
// modelResponse and running the validator's question checks. Run:
//   npx tsx --conditions=react-server .scratch/combined-science/alt-check.ts
import { readFileSync } from "node:fs";
import { questionChecks } from "../../src/server/content-pipeline/item-checks";
import { questionSourceSchema } from "../../src/server/content-pipeline/schemas";

type Q = { key: string; type: string; modelResponse?: { type: string; parts?: Record<string, unknown> } & Record<string, unknown> } & Record<string, unknown>;
const load = (f: string): Q[] => JSON.parse(readFileSync(`content/subjects/combined-science-o/questions/${f}.json`, "utf8"));

// [file, question key, part label or null, response]
const CASES: [string, string, string | null, Record<string, unknown>][] = [
  ["physics/solar-heating", "physics.solar.q16", null, { type: "SHORT_ANSWER", text: "Radiation." }],
  ["physics/solar-heating", "physics.solar.q16", null, { type: "SHORT_ANSWER", text: "electromagnetic waves" }],
  ["physics/solar-heating", "physics.solar.q15", null, { type: "FILL_IN_THE_BLANK", blanks: [{ blankId: "a", text: "Dense" }, { blankId: "b", text: "Convection current" }] }],
  ["physics/solar-heating", "physics.solar.q20", "(a)", { type: "SHORT_ANSWER", text: "Convection currents" }],
  ["physics/solar-heating", "physics.solar.q20", "(a)", { type: "SHORT_ANSWER", text: "thermosyphon" }],
  ["physics/telecommunication", "physics.telecom.q09", null, { type: "FILL_IN_THE_BLANK", blanks: [{ blankId: "a", text: "Encoding" }, { blankId: "b", text: "Decoding." }] }],
  ["physics/telecommunication", "physics.telecom.q18", null, { type: "SHORT_ANSWER", text: "Total internal reflection." }],
  ["physics/telecommunication", "physics.telecom.q18", null, { type: "SHORT_ANSWER", text: "TIR" }],
  ["physics/telecommunication", "physics.telecom.q20", "(a)", { type: "SHORT_ANSWER", text: "The microphone." }],
  ["physics/telecommunication", "physics.telecom.q20", "(b)", { type: "SHORT_ANSWER", text: "Microwaves" }],
  ["physics/telecommunication", "physics.telecom.q20", "(b)", { type: "SHORT_ANSWER", text: "radio waves (electromagnetic)" }],
];

let fails = 0;
for (const [file, key, label, response] of CASES) {
  const q = load(file).find((x) => x.key === key);
  if (!q) throw new Error(`no ${key}`);
  const copy: Q = JSON.parse(JSON.stringify(q));
  if (label) copy.modelResponse = { ...(copy.modelResponse as object), type: "STRUCTURED", parts: { ...(copy.modelResponse?.parts ?? {}), [label]: response } } as Q["modelResponse"];
  else copy.modelResponse = response as Q["modelResponse"];
  const issues = questionChecks(questionSourceSchema.parse(copy) as never, { key, resolveMedia: () => null, resolveAsset: () => null } as never).filter((i) => i.code.startsWith("model-response"));
  const ok = issues.length === 0;
  if (!ok) fails += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${key}${label ?? ""} ${JSON.stringify(response)}${ok ? "" : "  " + issues.map((i) => i.message).join("; ")}`);
}
console.log(`${CASES.length - fails}/${CASES.length} alternative answers score full marks`);
process.exit(fails ? 1 : 0);
