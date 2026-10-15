// W3a helper kit (not a slice: lives in tables/). Compact MCQ builder and shared level descriptors.
const mcCount = new WeakMap();
const mcLog = [];
if (typeof process !== "undefined") process.on("exit", () => {
  const u = mcLog.filter((x) => x.uniq).length;
  const cue = mcLog.filter((x) => x.cue);
  for (const x of cue) console.log("LENGTH CUE:", x.stem.slice(0, 90));
  const byFile = {};
  for (const x of mcLog) { byFile[x.f] ??= [0, 0]; byFile[x.f][0]++; if (x.uniq) byFile[x.f][1]++; }
  console.log("w3a unique-longest keys by file:", JSON.stringify(byFile), `total ${u}/${mcLog.length}`);
});
export const mc = (b, [d, skill], stem, key, bad, explanation, extra = {}) => {
  const n = mcCount.get(b) ?? 0;
  mcCount.set(b, n + 1);
  const pos = (n * 3 + 1) % 4;
  const options = [...bad];
  options.splice(pos, 0, key);
  const kl = key[0].length, dl = bad.map((x) => x[0].length);
  mcLog.push({ f: globalThis.__w3aFile ?? "?", stem, uniq: dl.every((x) => kl > x), cue: dl.every((x) => kl >= 1.3 * x && kl >= x + 12) });
  if (d < 2 && extra.daily) { extra = { ...extra }; delete extra.daily; }
  return b.mcq({ d, skill, stem, options, answer: "ABCD"[pos], explanation, ...extra });
};
export const LV4 = [
  [3, 4, 4, "Two-sided, applied and supported by a judgement."],
  [2, 2, 3, "Some development; limited judgement."],
  [1, 1, 1, "A simple statement."],
];
export const LV5 = [
  [3, 4, 5, "Both sides weighed using the data, with a supported judgement."],
  [2, 2, 3, "Some weighing of both sides with limited use of the data."],
  [1, 1, 1, "A simple statement with little application."],
];
export const LV6 = [
  [3, 5, 6, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 3, 4, "Some development of one side or limited use of the data."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV7 = [
  [3, 5, 7, "Two-sided, developed and applied to the data, with a justified judgement."],
  [2, 3, 4, "Some development of one side or limited use of the data."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV10 = [
  [3, 8, 10, "Two-sided, developed and applied to the question, with a supported judgement."],
  [2, 4, 7, "Some development and application; evaluation limited or judgement not supported."],
  [1, 1, 3, "Simple, undeveloped points with little application."],
];
export const LV12 = [
  [3, 9, 12, "Developed, balanced analysis applied to the question, with evaluation and a supported judgement."],
  [2, 5, 8, "Some analysis and application; evaluation limited or judgement not supported."],
  [1, 1, 4, "Simple, undeveloped points with little application."],
];
export const LV15 = [
  [3, 11, 15, "Two-sided, developed and applied analysis with a justified conclusion that answers the question."],
  [2, 6, 10, "Some analysis of one or both sides, limited application, a partial or unsupported conclusion."],
  [1, 1, 5, "Simple, undeveloped points with little or no explanation or conclusion."],
];
