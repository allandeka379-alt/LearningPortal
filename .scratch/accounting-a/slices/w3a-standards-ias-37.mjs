// W3a: standards.ias-37 (Cambridge only: tagged automatically)
import { concept, P, table, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const CLS = (right) => [
  ["Recognise a provision", right === 0 ? "Correct: all three conditions are met." : "The conditions for a provision are not all met."],
  ["Disclose as a contingent liability", right === 1 ? "Correct: possible, not probable." : "This applies only when an outflow is possible but not probable."],
  ["Disclose as a contingent asset", right === 2 ? "Correct: an inflow is probable, not virtually certain." : "This applies only to a probable inflow."],
  ["No entry and no disclosure", right === 3 ? "Correct: the chance is remote." : "The item is not remote, so it cannot be ignored."],
];

concept("aacc.standards.ias-37", { file: "standards/ias-37", keyPrefix: "standards.ias-37" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these must be present before a provision is recognised?",
    ok: ["A present obligation arising from a past event", "Correct: this is the first condition."],
    bad: [["A decision by the board to spend money in the future", "A plan alone is not an obligation."], ["A guarantee that the amount will be paid in cash", "The outflow need only be probable."], ["Approval from the auditors", "The auditors do not approve provisions."]],
    explanation: "The conditions are a present obligation from a past event, a probable outflow and a reliable estimate.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A court claim against a company is possible but not probable to succeed. How is it treated?",
    ok: ["Disclosed as a contingent liability", "Correct: possible obligations are disclosed."],
    bad: [["Recognised as a provision", "A provision needs a probable outflow."], ["Ignored completely", "It is not remote, so it is disclosed."], ["Recognised as a contingent asset", "It is a possible loss, not a possible gain."]],
    explanation: "A possible (not probable) obligation is a contingent liability and is disclosed in a note.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "When may a contingent asset be recognised as an asset?",
    ok: ["When its realisation is virtually certain", "Correct: it is then no longer contingent."],
    bad: [["When its realisation is probable", "A probable inflow is disclosed only."], ["When its realisation is possible", "A possible inflow is not even disclosed."], ["When the directors are optimistic", "Optimism is not evidence."]],
    explanation: "Prudence requires that a gain be recognised only when it is virtually certain.",
  });
  const n1 = 2500, r1 = 3, c1 = 85;
  const p1 = r2(n1 * (r1 / 100) * c1);
  chk(p1, 6375);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company sold ${n1.toLocaleString("en-GB")} appliances with a one-year guarantee. It expects ${r1}% to need repair at an average cost of ${money(c1)}. What provision should be recognised?`,
    ok: [money(p1), "Correct: 2,500 × 3% × 85."],
    bad: [[money(r2(n1 * c1)), "This assumes that every appliance needs repair."], [money(r2(n1 * (r1 / 100))), "The cost per repair has been left out."], [money(r2(c1 * r1)), "The number of appliances has been ignored."]],
    hints: ["Number sold × proportion needing repair × average cost."],
    explanation: "Expected repairs = 2,500 × 3% = 75 appliances; 75 × 85 = 6,375.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In December the board decided to close a branch in the following year but told nobody and prepared no detailed plan. What is recognised at the year end?",
    ok: ["No provision, because no obligation has been created", "Correct: there is no valid expectation in those affected."],
    bad: [["A provision for the full cost of the closure", "A decision alone does not create an obligation."], ["A provision for the future operating losses of the branch", "Future operating losses are never provided for."], ["A contingent asset", "The closure is a cost, not a gain."]],
    hints: ["Has anyone been told, and is there a detailed plan?"],
    explanation: "A restructuring provision requires a detailed formal plan and a valid expectation in those affected, for example by announcement.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these is NOT provided for under IAS 37?",
    ok: ["Operating losses expected in future years", "Correct: there is no present obligation."],
    bad: [["Repairs under a guarantee for goods already sold", "The sale is the past event, so a provision is needed."], ["Redundancy costs after an announced closure", "A constructive obligation exists."], ["Damages that the court will probably award against the company", "The obligation is probable and measurable."]],
    hints: ["Is there a past event creating an obligation?"],
    explanation: "Future operating losses do not arise from a past event, so no provision is made.",
  });
  const op = 8200, used = 6900, tg = 7400;
  const top = r2(tg - (op - used));
  chk(top, 6100);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `A provision of ${money(op)} was brought forward. During the year ${money(used)} of costs were charged against it. The provision needed at the year end is ${money(tg)}. What is charged to the statement of profit or loss for the year?`,
    ok: [money(top), "Correct: 7,400 - (8,200 - 6,900)."],
    bad: [[money(tg), "The balance left after the costs used has been ignored."], [money(r2(op - used)), "This is the part of the old provision that is left, not the charge."], [money(r2(tg + used)), "The costs used have been added instead of deducting the balance left."]],
    hints: ["Remaining provision after the costs = opening - used."],
    explanation: "After using 6,900, 1,300 remains. To reach 7,400 a charge of 6,100 is needed.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company expects to pay US\\$30,000 damages in a lawsuit that it will probably lose. Its insurer has confirmed that it will reimburse US\\$12,000. How is this shown?",
    ok: ["A US\\$30,000 provision and a US\\$12,000 receivable", "Correct: the reimbursement is a separate asset when virtually certain."],
    bad: [["A US\\$18,000 provision and no receivable", "The provision and the reimbursement are not netted."], ["A provision of US\\$12,000 for the uninsured part", "The company is liable for the whole claim."], ["A contingent liability of US\\$30,000 only", "The loss is probable, so a provision is needed."]],
    hints: ["Is the reimbursement certain, and may it be offset?"],
    explanation: "The full obligation is provided for; a virtually certain reimbursement is recognised as a separate asset, not netted against the provision.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A provision may be made for losses that the business expects to incur in future years of operation.", answer: false, explanation: "False. Future operating losses do not arise from a past event, so no provision is made." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A contingent liability whose chance of occurring is remote is disclosed in a note.", answer: false, hints: ["Disclosure is required unless the chance is remote."], explanation: "False. If the chance is remote, nothing is recognised or disclosed." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation to its treatment under IAS 37.",
    pairs: ["A court claim that the company will probably lose, reliably estimated", "A claim that might succeed but is less than probable", "A probable gain from a claim made by the company", "A claim with only a remote chance of success"],
    right: ["Recognise a provision", "Disclose as a contingent liability", "Disclose as a contingent asset", "No entry and no disclosure"],
    rightIndex: [0, 1, 2, 3],
    explanation: "The treatment depends on the likelihood of an outflow or inflow and on whether the amount can be estimated.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the entry to record a provision for guarantee repairs.",
    template: "Debit: {{blank:a}}. Credit: provision for {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["warranty expense"], choices: ["warranty expense", "cash at bank", "sales revenue"] },
      { id: "b", accepted: ["warranty claims"], choices: ["warranty claims", "irrecoverable debts", "depreciation"] },
    ],
    explanation: "The expense is charged to profit or loss and the provision is a liability.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the standard that deals with provisions, contingent liabilities and contingent assets.",
    accepted: ["ias 37", "ias37", "ias 37 provisions contingent liabilities and contingent assets", "international accounting standard 37"],
    explanation: "IAS 37 covers all three.",
  });

  // numerical
  const sold = 4800, pct = 2, avg = 64;
  const pv = r2(sold * (pct / 100) * avg);
  chk(pv, 6144);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: pv, calculator: true, wrong: [r2(sold * avg), r2(sold * (pct / 100))],
    stem: `A company sold ${sold.toLocaleString("en-GB")} items with a six-month guarantee. Experience suggests that ${pct}% will need repair at an average cost of ${money(avg)}. Calculate the provision to be recognised.`,
    hints: ["Expected repairs × average cost."],
    explanation: "4,800 × 2% = 96 items; 96 × 64 = 6,144.",
  });
  const op2 = 5300, us2 = 4150, tg2 = 5900;
  const top2 = r2(tg2 - (op2 - us2));
  chk(top2, 4750);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: top2, calculator: true, wrong: [tg2, r2(tg2 - op2)],
    stem: `The balance on a provision at the start of the year was ${money(op2)}. Costs of ${money(us2)} were charged against it. At the end of the year it must stand at ${money(tg2)}. Calculate the charge to profit or loss for the year.`,
    hints: ["What is left of the old provision?"],
    explanation: "5,300 - 4,150 = 1,150 left; 5,900 - 1,150 = 4,750 is charged. Taking only the change in the balance gives 600.",
  });
  const cl = 24800, ins = 9500;
  const net = r2(cl - ins);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", value: cl, daily: false, calculator: true, wrong: [net, ins],
    stem: `A company will probably have to pay damages of ${money(cl)}. An insurer has confirmed in writing that it will reimburse ${money(ins)}, so the reimbursement is virtually certain. State the amount of the provision recognised in the statement of financial position.`,
    hints: ["The reimbursement is shown as a separate asset."],
    explanation: "The provision is the full 24,800; the 9,500 reimbursement is a separate asset. The net 15,300 is not used.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State the three conditions that must be met before a provision is recognised.",
    points: ["A present obligation arising from a past event", "A probable outflow of economic benefits and a reliable estimate of the amount"],
    modelAnswer: "There must be a present obligation from a past event, a probable outflow of economic benefits and a reliable estimate of the amount.",
    explanation: "One mark for the obligation and one for probable outflow with a reliable estimate (both needed).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between a provision and a contingent liability.",
    points: ["A provision is a liability of uncertain timing or amount that is recognised because the outflow is probable and can be estimated", "A contingent liability is a possible obligation, or a present one that is not probable or cannot be measured reliably", "A provision is recorded in the statements; a contingent liability is only disclosed in a note"],
    modelAnswer: "A provision is recognised because an outflow is probable and measurable. A contingent liability is only possible, or cannot be measured, so it is not recognised and is disclosed in a note.",
    hints: ["Compare how probable the outflow is."],
    explanation: "One mark each for the two definitions and the difference in treatment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a company may not make a provision for losses it expects to make in future years.",
    points: ["A provision needs a present obligation from a past event", "Future operating losses depend on future events, so there is no obligation at the year end", "Recognising them would create a liability that does not exist and would allow profit to be manipulated"],
    modelAnswer: "There is no present obligation arising from a past event for future operating losses. Recognising them would create a liability that does not exist and could be used to smooth profit.",
    hints: ["Which condition for a provision is missing?"],
    explanation: "One mark each for the missing obligation, the dependence on future events and the risk of manipulation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The directors of a company have a profitable year and wish to create a large provision for 'general business risks' so that next year's profit will look higher when it is released. Evaluate their proposal.",
    points: ["A general provision does not meet the conditions: there is no present obligation from a past event", "Creating it would understate this year's profit and overstate next year's, which misleads users", "IAS 37 forbids smoothing profit in this way; any existing obligations should be provided for, and risks may be described in the notes", "Judgement: reject the proposal and provide only for obligations that exist"],
    modelAnswer: "A general provision for business risks does not meet the IAS 37 conditions, as no obligation exists. It would understate this year's profit and overstate next year's. The directors should provide only for real obligations and describe other risks in the notes.",
    hints: ["What past event creates the obligation?"],
    explanation: "One mark each for the missing conditions, the effect on profit, the rule and a judgement.",
  });

  // Structured 1 (10 marks)
  const A = { sold: 3000, pct: 2.5, avg: 96, op: 7200, used: 6350, tg: 7800 };
  const pa = r2(A.sold * (A.pct / 100) * A.avg);
  chk(pa, 7200);
  const topA = r2(A.tg - (A.op - A.used));
  chk(topA, 6950);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chitungwiza Appliances Ltd sold ${A.sold.toLocaleString("en-GB")} fridges in 2025, each with a one-year guarantee. The company expects ${A.pct}% to need repair at an average cost of US\\$${fmt(A.avg)}. During 2026 repairs of US\\$${fmt(A.used)} were charged against the provision. At 31 December 2026 the provision must be US\\$${fmt(A.tg)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: pa, wrong: [r2(A.sold * A.avg), r2(A.sold * (A.pct / 100))], stem: "Calculate the provision at 31 December 2025.", explanation: `${fmt(A.sold)} × ${A.pct}% = 75 fridges; 75 × ${fmt(A.avg)} = ${fmt(pa)}.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which account is debited when the provision is created?", options: [["Warranty expense", "Correct: the cost is charged to profit or loss."], ["Provision for warranty claims", "That is the credit side."], ["Cash at bank", "No cash is paid when the provision is made."], ["Share capital", "The provision has no effect on share capital."]], answer: "A", explanation: "Dr warranty expense, Cr provision." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: topA, wrong: [A.tg, r2(A.tg - A.op)], stem: "Calculate the charge to the statement of profit or loss for 2026.", explanation: `${fmt(A.op)} - ${fmt(A.used)} = ${fmt(r2(A.op - A.used))} left; ${fmt(A.tg)} - ${fmt(r2(A.op - A.used))} = ${fmt(topA)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the provision is a liability.", points: ["The sale of the fridges is a past event that created an obligation to repair them", "An outflow is probable and the amount can be estimated from experience"], modelAnswer: "The sale created an obligation to repair faulty fridges. Repairs are probable and can be estimated, so a liability exists.", explanation: "One mark for the obligation and one for probable and measurable." }),
      P.manual({ label: "(e)", marks: 2, stem: "State two effects of failing to make the provision in 2025.", points: ["Profit for 2025 would be overstated", "Liabilities and equity (retained earnings) would be misstated, and the cost would fall into 2026"], modelAnswer: "Profit in 2025 would be overstated, and liabilities would be understated, with the cost falling in 2026.", explanation: "One mark for each effect." }),
    ],
    hints: ["Number sold × percentage × average cost.", "Only the increase needed is charged."],
    explanation: "This item tests a warranty provision and its adjustment.",
  });

  // Structured 2 (14 marks)
  const S = [
    { t: "A product liability claim of US\\$31,500 is expected to be lost; the lawyers say the outflow is probable and the amount is reliable.", ans: 0, why: "Probable and measurable." },
    { t: "A tax authority disputes US\\$22,400 of tax. The advisers say that the company may lose, but it is less likely than not.", ans: 1, why: "Possible, not probable." },
    { t: "The company guaranteed a supplier's loan of US\\$40,000. The supplier is financially sound and a default is remote.", ans: 3, why: "Remote." },
    { t: "The company has sued a customer for US\\$16,000. Its lawyers say that success is probable but not yet certain.", ans: 2, why: "Probable inflow only." },
    { t: "In November the board announced to all staff a detailed plan to close the Mutare branch, with redundancy payments of US\\$11,800.", ans: 0, why: "Constructive obligation." },
  ];
  const provT = r2(31500 + 11800);
  const clT = 22400;
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `The directors of Mukombe Traders Ltd are preparing the statements at 31 December 2025. The following situations exist.\n\n${S.map((s, i) => `${i + 1}. ${s.t.split("US$").join("US\\$")}`).join("\n")}`,
    parts: [
      ...S.map((s, i) => P.mcq({ label: `(${String.fromCharCode(97 + i)})`, marks: 1, stem: `State the treatment of situation ${i + 1}.`, options: CLS(s.ans), answer: ["A", "B", "C", "D"][s.ans], explanation: s.why })),
      P.num({ label: "(f)", marks: 2, kind: "money", value: provT, wrong: [31500, r2(provT + clT)], stem: "Calculate the total of the provisions recognised.", explanation: `${fmt(31500)} + ${fmt(11800)} = ${fmt(provT)}.` }),
      P.num({ label: "(g)", marks: 2, kind: "money", value: clT, wrong: [r2(clT + 40000), 16000], stem: "State the total of the contingent liabilities that are disclosed in a note.", explanation: "Only situation 2 is a disclosed contingent liability: 22,400. Situation 3 is remote." }),
      P.manual({ label: "(h)", marks: 2, stem: "Explain why the closure of the branch gives rise to a provision although the branch is still open.", points: ["The announcement of a detailed plan created a valid expectation in the staff, a constructive obligation from a past event", "The redundancy payments are probable and can be estimated"], modelAnswer: "The detailed announcement to staff created a constructive obligation. The redundancy payments are probable and measurable, so a provision is needed even though the branch has not yet closed.", explanation: "One mark for the constructive obligation and one for probable and measurable." }),
      P.manual({ label: "(i)", marks: 3, stem: "Advise the directors why situation 4 should not be shown as an asset, and what they should do instead.", points: ["A contingent asset is recognised only when realisation is virtually certain", "Recognising a probable gain would breach prudence and overstate profit if the claim failed", "They should disclose the claim in a note as a contingent asset, because the inflow is probable"], modelAnswer: "A contingent asset is recognised only when virtually certain. Recognising a probable gain would be imprudent and could overstate profit. The directors should disclose the claim in a note.", explanation: "One mark for each point." }),
    ],
    hints: ["Classify as probable, possible or remote first.", "A probable gain is disclosed, not recognised."],
    explanation: "This item tests the classification and treatment of uncertain obligations and possible gains.",
  });
  void sum; void table;

  b.card("DEFINITION", "What is a **provision**?", "A liability of uncertain timing or amount, recognised when there is a present obligation from a past event, a probable outflow and a reliable estimate.");
  b.card("FACT", "Decision rule for uncertain obligations", "Probable and measurable: provision. Possible: disclose a contingent liability. Remote: do nothing.");
  b.card("DEFINITION", "What is a **contingent asset**?", "A possible asset from a past event that depends on an uncertain future event; disclosed if probable, recognised only when virtually certain.");
  b.card("DEFINITION", "What is a **constructive obligation**?", "An obligation created by the company's own actions, for example an announced plan that creates a valid expectation in those affected.");
  b.card("FORMULA", "Warranty provision", "Number sold × proportion expected to need repair × average cost of repair.");
  b.card("FACT", "Entry for a provision", "Debit expense (for example warranty expense), credit provision (current liabilities).");
  b.card("FACT", "Adjusting a provision", "Charge costs incurred against the provision, then charge or credit profit or loss with the difference needed to reach the new estimate.");
  b.card("FACT", "What is not provided for", "Future operating losses and general business risks: no present obligation from a past event.");
  b.card("CONCEPT", "Restructuring provisions", "Only after a detailed formal plan has been announced or begun; the provision includes direct costs only, such as redundancy payments.");
});
