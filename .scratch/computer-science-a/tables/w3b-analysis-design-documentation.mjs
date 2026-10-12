import { mdTable, chk } from "../lib.mjs";
// File design for a school fees system.
const fields = [
  ["LearnerID", "Text", 6, "Presence check; first letter L followed by 5 digits"],
  ["Surname", "Text", 25, "Presence check"],
  ["Form", "Text", 2, "Look-up check: 1A to 6C"],
  ["TermFee", "Currency", 8, "Range check: 0 to 1 000"],
  ["AmountPaid", "Currency", 8, "Range check: 0 to the term fee"],
  ["DatePaid", "Date", 10, "Format check: dd/mm/yyyy, not in the future"],
];
const recLen = fields.reduce((s, f) => s + f[2], 0);
chk(recLen, 59);
const learners = 1280;
const bytes = recLen * learners;
chk(bytes, 75520);
const kb = bytes / 1024;
chk(kb, 73.75, 1e-9);
// DFD described as a table of flows
const flows = [
  ["Parent", "Fee payment and receipt number", "1. Record payment"],
  ["1. Record payment", "Payment record", "D1 Fees file"],
  ["D1 Fees file", "Learner balance", "2. Produce statement"],
  ["2. Produce statement", "Fee statement", "Parent"],
  ["D1 Fees file", "Unpaid balances", "3. Produce arrears list"],
  ["3. Produce arrears list", "Arrears list", "Bursar"],
];
const processes = new Set(flows.flatMap((f) => [f[0], f[2]]).filter((x) => /^\d\./.test(x)));
chk(processes.size, 3);
export const snips = {
  fileDesign: mdTable(["Field", "Data type", "Size (bytes)", "Validation"], fields),
  flowTable: mdTable(["From", "Data flow", "To"], flows),
  recLen: String(recLen),
  learners: String(learners).replace(/(\d)(\d{3})$/, "$1 $2"),
  bytes: String(bytes).replace(/(\d{2})(\d{3})$/, "$1 $2"),
  kb: String(kb),
  nProcesses: String(processes.size),
};
if (process.argv[1].endsWith("w3b-analysis-design-documentation.mjs")) console.log(snips);
