// W3a: company.cash-flow-operating
import { concept, P, table, check, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc, heading, grid } from "../tables/w3a-lib.mjs";
import { cfModel } from "../tables/w3a-models.mjs";

concept("aacc.company.cash-flow-operating", { file: "company/cash-flow-operating", keyPrefix: "company.cash-flow-operating" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the indirect method, why is depreciation added back to profit before tax?",
    ok: ["It reduced profit but did not use any cash", "Correct: it is a non-cash expense."],
    bad: [["It is a cash receipt from customers", "Depreciation is not a receipt of any kind."], ["It increases the bank balance at the year end", "Depreciation has no effect on the bank balance."], ["It is paid to the supplier at the year end", "No payment is made for depreciation."]],
    explanation: "Depreciation spreads the cost of an asset over its life; the cash left when the asset was bought, so it is added back.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An increase in inventory during the year is treated in the reconciliation of profit before tax to cash as:",
    ok: ["a deduction, because cash was tied up in stock", "Correct: more cash has been spent on inventory."],
    bad: [["an addition, because assets have increased", "More inventory means less cash."], ["an addition, because profit is higher", "Inventory does not change profit in this adjustment."], ["no adjustment, because inventory is not cash", "Changes in working capital are always adjusted."]],
    explanation: "An increase in inventory means that cash was used to buy goods that have not yet been sold, so it is deducted.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "An increase in trade payables during the year is treated in the reconciliation as:",
    ok: ["an addition, because cash was kept in the business", "Correct: suppliers have financed part of the purchases."],
    bad: [["a deduction, because liabilities have increased", "More payables means cash was retained."], ["an addition to profit before tax in the statement of profit or loss", "It is an adjustment in the cash flow statement only."], ["a deduction, because suppliers have been paid", "A rise in payables means suppliers have not been paid."]],
    explanation: "Paying suppliers later keeps cash in the business, so an increase in payables is added.",
  });
  const p4 = 46500, d4 = 9300, l4 = 1200, f4 = 2100;
  const bw = r2(p4 + d4 + l4 + f4);
  chk(bw, 59100);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Profit before tax was ${money(p4)} after charging depreciation of ${money(d4)}, finance costs of ${money(f4)} and a loss on disposal of ${money(l4)}. What is the operating profit before working capital changes?`,
    ok: [money(bw), "Correct: 46,500 + 9,300 + 1,200 + 2,100."],
    bad: [[money(r2(p4 + d4 - l4 + f4)), "The loss on disposal has been deducted instead of added back."], [money(r2(p4 + d4 + l4)), "The finance costs have not been added back."], [money(r2(p4 - d4 + l4 + f4)), "Depreciation has been deducted instead of added back."]],
    hints: ["All three items reduced profit but are not operating cash flows."],
    explanation: "46,500 + 9,300 + 1,200 + 2,100 = 59,100.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A profit on disposal of a non-current asset is shown in the reconciliation of profit before tax to cash generated from operations as:",
    ok: ["a deduction, with the proceeds shown in investing activities", "Correct: the cash is an investing flow."],
    bad: [["an addition, with the proceeds shown in operating activities", "A profit is removed because it is not an operating cash flow."], ["a deduction, with the proceeds shown in financing activities", "Sale of an asset is an investing activity."], ["no adjustment, because disposals do not affect cash", "The proceeds are a cash inflow in investing activities."]],
    hints: ["Where are the sale proceeds shown?"],
    explanation: "The profit is deducted from profit before tax so that it is not counted twice; the proceeds appear in investing activities.",
  });
  const inv = 3400, rec = 5800, pay = 2200;
  const wcNet = r2(inv - rec + pay);
  chk(wcNet, -200);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `During the year inventory fell by ${money(inv)}, trade receivables rose by ${money(rec)} and trade payables rose by ${money(pay)}. What is the net effect of the working capital changes on cash?`,
    ok: ["A decrease of US\\$200", "Correct: +3,400 - 5,800 + 2,200."],
    bad: [["An increase of US\\$200", "The receivables increase is larger than the other two changes combined."], ["A decrease of US\\$11,400", "All three changes have been deducted."], ["An increase of US\\$11,400", "All three changes have been added."]],
    hints: ["Release of cash is positive, tying up cash is negative."],
    explanation: "Inventory fall +3,400; receivables rise -5,800; payables rise +2,200; total -200.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company's profit before tax was US\\$40,000 but cash generated from operations was only US\\$12,000. Which is the most likely explanation?",
    ok: ["Inventory and receivables rose sharply", "Correct: profit was recorded but cash was tied up."],
    bad: [["Depreciation was too high", "Depreciation is added back, so it would raise cash generated, not lower it."], ["Trade payables increased by a large amount", "That would increase cash generated."], ["A profit on disposal was made", "A profit on disposal is deducted but is not the main reason."]],
    hints: ["Which changes absorb cash?"],
    explanation: "Growth in inventory and receivables ties up cash, so profit converts to cash only in part.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Tax payable was US\\$4,800 at the start of the year and US\\$6,300 at the end. The tax charge for the year was US\\$13,100. How much tax was paid?",
    ok: [money(r2(4800 + 13100 - 6300)), "Correct: 4,800 + 13,100 - 6,300."],
    bad: [[money(13100), "The charge is not the cash paid."], [money(r2(13100 + 6300 - 4800)), "The opening and closing balances have been reversed."], [money(r2(13100 + 4800 + 6300)), "The closing payable has been added instead of deducted."]],
    hints: ["Build the tax payable account."],
    explanation: "Tax paid = opening payable + charge - closing payable = 4,800 + 13,100 - 6,300 = 11,600.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A loss on the disposal of a non-current asset is added back to profit before tax when calculating cash generated from operations.", answer: true, explanation: "True. The loss reduced profit but is not an operating cash flow; the proceeds appear in investing activities." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Dividends paid are deducted in arriving at cash generated from operations.", answer: false, hints: ["Which activity do dividends belong to?"], explanation: "False. Dividends paid are a financing cash flow and are not part of cash generated from operations." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to its adjustment when reconciling profit before tax to cash generated from operations.",
    pairs: ["Depreciation charge", "Increase in trade receivables", "Profit on disposal of equipment", "Increase in trade payables"],
    right: ["Add back", "Deduct (cash tied up)", "Deduct", "Add (cash retained)"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Non-cash expenses are added back, increases in working capital assets are deducted, profits on disposal are deducted and increases in payables are added.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the order of the statement.",
    template: "Interest paid and tax paid are deducted {{blank:a}} cash generated from operations. Dividends paid are shown in {{blank:b}} activities.",
    blanks: [
      { id: "a", accepted: ["after"], choices: ["before", "after"] },
      { id: "b", accepted: ["financing"], choices: ["operating", "investing", "financing"] },
    ],
    explanation: "Cash generated from operations is before interest and tax paid; dividends paid are a financing flow.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the method of presenting operating cash flows that starts with profit before tax.",
    accepted: ["indirect method", "the indirect method", "indirect"],
    explanation: "The indirect method starts with profit and adjusts it; the direct method lists cash receipts and payments.",
  });

  // numerical
  const pbt1 = 38900, dep1 = 7600, fin1 = 1850, inv1 = 4100, rec1 = 2900, pay1 = 1300;
  const cg1 = r2(pbt1 + dep1 + fin1 - inv1 - rec1 + pay1);
  chk(cg1, 42650);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cg1, calculator: true, wrong: [r2(pbt1 + dep1 + fin1), r2(pbt1 - dep1 + fin1 - inv1 - rec1 + pay1)],
    stem: `Profit before tax was ${money(pbt1)} after charging depreciation of ${money(dep1)} and finance costs of ${money(fin1)}. Inventory rose by ${money(inv1)}, trade receivables rose by ${money(rec1)} and trade payables rose by ${money(pay1)}. Calculate cash generated from operations.`,
    hints: ["Add back depreciation and finance costs, then adjust for working capital."],
    explanation: "38,900 + 7,600 + 1,850 - 4,100 - 2,900 + 1,300 = 42,650. Ignoring the working capital changes gives 48,350.",
  });
  const ro = 21700, rc = 26900, dv = 6400, pt = 9500;
  const pat = r2(rc - ro + dv), tx = 8700, tp0 = 3300, tp1 = 2900;
  const taxPaid = r2(tp0 + tx - tp1);
  chk(taxPaid, 9100);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: taxPaid, calculator: true, wrong: [tx, r2(tp0 + tx + tp1)],
    stem: `Income tax payable was ${money(tp0)} at the start of the year and ${money(tp1)} at the end. The income tax expense for the year was ${money(tx)}. Calculate the income tax paid.`,
    hints: ["Opening payable + charge - closing payable."],
    explanation: "3,300 + 8,700 - 2,900 = 9,100. Using the charge gives 8,700.",
  });
  void pat; void pt;
  const rO = 33400, rC = 41250, dPaid = 9800;
  const profY = r2(rC - rO + dPaid);
  chk(profY, 17650);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: profY, calculator: true, daily: true, wrong: [r2(rC - rO), r2(rC - rO - dPaid)],
    stem: `Retained earnings were ${money(rO)} at the start of the year and ${money(rC)} at the end. Dividends paid were ${money(dPaid)}. Calculate the profit for the year.`,
    explanation: "Profit for the year = 41,250 - 33,400 + 9,800 = 17,650. Using only the change in retained earnings gives 7,850.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company can make a profit and still have a falling bank balance.",
    points: ["Profit includes sales made on credit, and the cash has not yet been received", "Cash may be used to buy non-current assets, pay loans, tax and dividends, none of which reduces profit before tax"],
    modelAnswer: "Credit sales are in profit but not yet in the bank. Cash may also go on new assets, loan repayments, tax and dividends, which do not reduce profit before tax.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how an increase in trade receivables affects the cash generated from operations.",
    points: ["Sales are recorded in profit when made, but the cash is received only when customers pay", "An increase in receivables means that less cash was received than the sales recorded", "It is therefore deducted from profit before tax in the reconciliation"],
    modelAnswer: "Sales appear in profit when made, but if receivables rise, customers have not yet paid for part of them. Less cash has been received than profit suggests, so the increase is deducted.",
    hints: ["Compare the cash received with the sales recorded."],
    explanation: "One mark for each step of the argument.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company reports a profit before tax of US\\$80,000 but cash generated from operations of US\\$15,000. Suggest reasons and advise the directors.",
    points: ["Large increases in inventory and trade receivables tie up cash", "Fewer purchases may have been paid for late; if payables fell, cash left the business", "Because profit includes unpaid sales, the company may find it hard to pay its own bills", "Advice: tighten credit control, reduce excess inventory and negotiate longer supplier terms"].map((p) => p.replace("US$", "US\\$")),
    modelAnswer: "The most likely causes are large rises in inventory and receivables, and a fall in payables. The company may struggle to pay its bills. The directors should collect receivables faster, reduce inventory and ask suppliers for longer credit.",
    hints: ["Which three working capital items could absorb the cash?"],
    explanation: "One mark each for two causes, the consequence and the advice.",
  });

  // Structured 1 (10 marks)
  const A = { pbt: 63400, dep: 18750, fin: 4200, profDisp: 2350, inv: 6450, rec: 3150, pay: 1900, taxPaid: 16700 };
  const aBw = r2(A.pbt + A.dep + A.fin - A.profDisp);
  const aWc = r2(-A.inv + A.rec + A.pay);
  const aCg = r2(aBw + aWc);
  const aNet = r2(aCg - A.fin - A.taxPaid);
  chk(aCg, 63400 + 18750 + 4200 - 2350 - 6450 + 3150 + 1900);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Zaka Maize Mills Ltd made a profit before tax of US\\$${fmt(A.pbt)} for the year ended 31 December 2025, after charging depreciation of US\\$${fmt(A.dep)} and finance costs of US\\$${fmt(A.fin)} (paid in full) and after crediting a profit of US\\$${fmt(A.profDisp)} on the disposal of a machine. During the year inventory rose by US\\$${fmt(A.inv)}, trade receivables fell by US\\$${fmt(A.rec)} and trade payables rose by US\\$${fmt(A.pay)}. Income tax paid was US\\$${fmt(A.taxPaid)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: aBw, wrong: [r2(A.pbt + A.dep + A.fin + A.profDisp), r2(A.pbt + A.dep - A.profDisp)], stem: "Calculate the operating profit before working capital changes.", explanation: `${fmt(A.pbt)} + ${fmt(A.dep)} + ${fmt(A.fin)} - ${fmt(A.profDisp)} = ${fmt(aBw)}. The profit on disposal is deducted.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: aWc, wrong: [r2(A.inv + A.rec + A.pay), r2(-A.inv - A.rec + A.pay)], stem: "Calculate the net effect of the working capital changes on cash. Enter a decrease as a negative number.", explanation: `-${fmt(A.inv)} + ${fmt(A.rec)} + ${fmt(A.pay)} = ${fmt(aWc)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: aCg, wrong: [aBw, r2(aBw - aWc)], stem: "Calculate the cash generated from operations.", explanation: `${fmt(aBw)} + (${fmt(aWc)}) = ${fmt(aCg)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: aNet, wrong: [r2(aCg - A.taxPaid), r2(aCg + A.fin - A.taxPaid)], stem: "Calculate the net cash from operating activities.", explanation: `${fmt(aCg)} - interest ${fmt(A.fin)} - tax ${fmt(A.taxPaid)} = ${fmt(aNet)}.` }),
    ],
    hints: ["A profit on disposal is deducted.", "Interest and tax paid come after cash generated from operations."],
    explanation: "This item tests the reconciliation of profit before tax to net operating cash.",
  });

  // Structured 2 (16 marks): derive from two statements of financial position
  const dB = {
    name: "Shamva Fisheries Ltd",
    open: { cost: 180000, accDep: 62000, inv: 26500, rec: 19800, bank: 8200, pay: 14600, taxPay: 6800, sc: 90000, prem: 15000, loan: 40000 },
    y: { pbt: 52600, intExp: 3200, dep: 16900, disp: { cost: 20000, accDep: 12600, proceeds: 5200 }, add: 42500, dInv: 4300, dRec: -2100, dPay: 3100, tax: 13200, taxPaid: 12150, divPaid: 8400, issue: { nominal: 10000, premium: 4000 }, loanChange: -12000 },
  };
  const mB = cfModel(dB);
  const patB = r2(mB.c.ret - mB.retOpen + dB.y.divPaid);
  const taxB = r2(mB.c.taxPay - dB.open.taxPay + dB.y.taxPaid);
  const pbtB = r2(patB + taxB);
  chk(pbtB, dB.y.pbt);
  chk(mB.dispProfit, -2200);
  const opB = grid([["Profit before tax", null, pbtB], ["Depreciation", null, dB.y.dep], ["Loss on disposal of non-current assets", null, 2200], ["Finance costs", null, dB.y.intExp], ["Operating profit before working capital changes", null, mB.beforeWc], ["Increase in inventory", null, -dB.y.dInv], ["Decrease in trade receivables", null, -dB.y.dRec], ["Increase in trade payables", null, dB.y.dPay], ["**Cash generated from operations**", null, mB.cashGen], ["Interest paid", null, -dB.y.intExp], ["Income tax paid", null, -dB.y.taxPaid], ["**Net cash from operating activities**", null, mB.netOp]]);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The statements of financial position of Shamva Fisheries Ltd at 31 December 2024 and 31 December 2025 are below.\n\n${mB.sofpOpen}\n\n${mB.sofpClose}\n\nFurther information: dividends paid ${money(dB.y.divPaid)}; income tax paid ${money(dB.y.taxPaid)}; interest of ${money(dB.y.intExp)} was charged and paid in full; depreciation charged ${money(dB.y.dep)}; equipment which cost ${money(20000)} with accumulated depreciation of ${money(12600)} was sold for ${money(5200)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: patB, wrong: [r2(mB.c.ret - mB.retOpen), r2(mB.c.ret - mB.retOpen - dB.y.divPaid)], stem: "Calculate the profit for the year.", explanation: `${fmt(mB.c.ret)} - ${fmt(mB.retOpen)} + dividends ${fmt(dB.y.divPaid)} = ${fmt(patB)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: taxB, wrong: [dB.y.taxPaid, r2(dB.y.taxPaid + dB.open.taxPay)], stem: "Calculate the income tax expense for the year.", explanation: `Tax paid ${fmt(dB.y.taxPaid)} + closing payable ${fmt(mB.c.taxPay)} - opening payable ${fmt(dB.open.taxPay)} = ${fmt(taxB)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: pbtB, wrong: [patB, r2(patB + dB.y.taxPaid)], stem: "Calculate the profit before tax.", explanation: `${fmt(patB)} + ${fmt(taxB)} = ${fmt(pbtB)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: mB.cashGen, wrong: [mB.beforeWc, r2(mB.cashGen - 2 * 2200)], stem: "Calculate the cash generated from operations.", explanation: `Operating profit before working capital changes ${fmt(mB.beforeWc)} (${fmt(pbtB)} + ${fmt(dB.y.dep)} + loss ${fmt(2200)} + finance costs ${fmt(dB.y.intExp)}) plus working capital ${fmt(mB.wc)} = ${fmt(mB.cashGen)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: mB.netOp, wrong: [r2(mB.cashGen - dB.y.taxPaid), mB.cashGen], stem: "Calculate the net cash from operating activities.", explanation: `${fmt(mB.cashGen)} - ${fmt(dB.y.intExp)} - ${fmt(dB.y.taxPaid)} = ${fmt(mB.netOp)}.` }),
      P.manual({ label: "(f)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the operating activities section of the statement of cash flows for the year ended 31 December 2025.", points: ["Starts from profit before tax with depreciation, the loss on disposal and finance costs added back", `Working capital changes in the correct direction, giving cash generated from operations ${fmt(mB.cashGen)}`, `Interest paid and tax paid deducted to give net cash from operating activities ${fmt(mB.netOp)}`], modelAnswer: opB, explanation: "One mark for each section; allow follow-through." }),
      P.manual({ label: "(g)", marks: 2, stem: `Profit before tax was US\\$${fmt(pbtB)} but net cash from operating activities was US\\$${fmt(mB.netOp)}. Comment.`, points: [`Net operating cash is ${fmt(r2(mB.netOp - pbtB))} compared with profit before tax, mainly because tax and interest were paid and inventory rose`, "Depreciation and the loss on disposal do not use cash, so the figures are not far apart; the company converts its profit into cash reasonably well"], modelAnswer: `Net cash from operations is close to profit before tax. Tax and interest were paid and inventory rose, but depreciation was added back, so the company converts profit into cash reasonably well.`, explanation: "One mark for the comparison with a reason and one for a judgement." }),
    ],
    hints: ["Derive the profit for the year first.", "A loss on disposal is added back."],
    explanation: "This item derives profit before tax and cash generated from operations from two statements of financial position.",
  });
  void check; void sum; void table; void heading;

  b.card("DEFINITION", "What is **cash generated from operations**?", "Cash produced by trading before interest and tax paid; starts from profit before tax adjusted for non-cash items and working capital changes.");
  b.card("FORMULA", "Tax paid", "Opening tax payable + tax charge for the year - closing tax payable.");
  b.card("FACT", "Adjustments for non-cash items", "Add back depreciation and losses on disposal; deduct profits on disposal; add back finance costs and deduct interest income.");
  b.card("FACT", "Working capital direction", "Increase in inventory or receivables: deduct. Increase in payables: add. Decreases are the opposite.");
  b.card("FORMULA", "Profit for the year from retained earnings", "Closing retained earnings - opening retained earnings + dividends.");
  b.card("CONCEPT", "Why profit and cash differ", "Depreciation is not a cash flow, credit sales are profit before cash, and cash is also used for assets, loans, tax and dividends.");
  b.card("DEFINITION", "What is the **indirect method**?", "Start with profit before tax and adjust for non-cash items and working capital to reach cash from operations.");
  b.card("FACT", "Where do interest paid and tax paid appear?", "Deducted after cash generated from operations, to give net cash from operating activities.");
  b.card("FACT", "Where do dividends paid appear?", "In financing activities; they are never part of cash generated from operations.");
});
