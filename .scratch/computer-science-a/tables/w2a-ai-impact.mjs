import { mdTable, chk, round } from "../lib.mjs";
// hypothetical test of a speech-recognition app (invented classroom figures, not real measurements)
const groups = [{ name: "Group A (language with a great deal of training data)", train: 9000, tested: 100, correct: 92 }, { name: "Group B (language with little training data)", train: 1000, tested: 100, correct: 71 }];
const total = groups.reduce((s, g) => s + g.train, 0);
const rows = groups.map((g) => [g.name, g.train, `${round((100 * g.train) / total, 0)}%`, g.tested, g.correct, `${round((100 * g.correct) / g.tested, 0)}%`]);
chk(total, 10000); chk(round((100 * 92) / 100, 0), 92);
const overall = (92 + 71) / 200 * 100; chk(overall, 81.5);
export const snips = {
  biasTable: mdTable(["Speaker group", "Training recordings", "Share of training data", "Test recordings", "Correct", "Accuracy"], rows),
  overall: String(overall), gap: String(92 - 71),
  appTable: mdTable(["Application", "How AI is used", "A benefit", "A concern"], [
    ["Speech recognition", "Converts spoken words to text", "Hands-free control; access for users who cannot type", "May work poorly for accents or languages with little training data; recordings are personal data"],
    ["Image recognition in agriculture", "Identifies crop disease or pests from photographs", "Early warning for farmers with few advisers", "Wrong identification can lead to wrong treatment; needs local training images"],
    ["Image recognition in medicine", "Highlights possible disease in scans", "Helps a specialist to review more images", "Errors can harm patients; a person must stay responsible"],
    ["Recommendation", "Suggests items or videos from past behaviour", "Saves time finding content", "May trap users in a narrow range of content; uses personal data"],
    ["Robotics", "Machines that sense and act, e.g. in factories", "Safe, repeatable work in dangerous settings", "May replace workers; safety if it fails"],
    ["Translation", "Converts text between languages, including African languages", "Wider access to information", "Less accurate for languages with little written data"],
    ["Chatbots", "Answer customers' questions in writing or speech", "Available all day and at low cost", "May give wrong answers or fail to understand an upset customer"],
  ]),
};
if (process.argv[1].endsWith("w2a-ai-impact.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
