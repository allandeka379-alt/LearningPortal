// W3a: Cambridge 0452 Paper 2 exam-format item (20 marks): depreciation on a monthly basis, disposal account, an
// accrued expense, corrected profit for the year and an evaluation of the depreciation method.
import { concept, P, tAccount, r2, check, CAM } from "../lib.mjs";
import { table } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.disposal", { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  // Tatenda Printing, Harare. Straight line 10% a year on cost, charged monthly (month of purchase to month of sale).
  const rate = 10;
  const monthly = (c, m) => r2((((c * rate) / 100) * m) / 12);
  const costOpen = 52000;
  const accOpen = 18600;
  const printer = { cost: 8400, proceeds: 4850 }; // bought 1 July 2021, sold 31 March 2025
  const months = 6 + 36 + 3;
  const accPrinter = monthly(printer.cost, months);
  check("accPrinter", accPrinter, 3150);
  const perYear = r2((printer.cost * rate) / 100);
  const perMonth = r2(perYear / 12);
  const accPrinterWrong = monthly(printer.cost, 48); // four full years
  const newCost = 13200; // bought 1 October 2025
  const depOthers = monthly(costOpen - printer.cost, 12);
  const depSold = monthly(printer.cost, 3);
  const depNew = monthly(newCost, 3);
  const dep25 = r2(depOthers + depSold + depNew);
  check("dep25", dep25, 4900);
  const costClose = r2(costOpen - printer.cost + newCost);
  const accClose = r2(accOpen + dep25 - accPrinter);
  check("accClose", accClose, 20350);
  const nbv = r2(costClose - accClose);
  check("nbv", nbv, 36450);
  const nbvSold = r2(printer.cost - accPrinter);
  const loss = r2(nbvSold - printer.proceeds);
  check("loss", loss, 400);
  const paid = 2875;
  const owing = 365;
  const draft = 23780;
  const profit = r2(draft - dep25 - loss - owing);
  check("profit", profit, 18115);

  const disposal = tAccount("Disposal account", [["31 Mar 2025", "Equipment", printer.cost]], [["31 Mar 2025", "Accumulated depreciation", accPrinter], ["31 Mar 2025", "Bank", printer.proceeds], ["31 Dec 2025", "Statement of profit or loss", loss]]);
  const info = table(["Balances at 1 January 2025", "US\\$"], [["Equipment at cost", costOpen], ["Accumulated depreciation: equipment", accOpen]]);

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
    concepts: ["acc.adjustments.disposal", "acc.adjustments.depreciation-accounts", "acc.adjustments.depreciation-methods", "acc.adjustments.accrued-prepaid-expenses"],
    stem: `Tatenda owns a printing business in Harare. The financial year ends on 31 December.\n\n${info}\n\nAdditional information:\n\n1. Equipment is depreciated at 10% per annum on cost using the straight-line method, calculated monthly from the month of purchase up to the month of disposal.\n2. On 31 March 2025 a printer bought on 1 July 2021 for US\\$${f(printer.cost)} was sold for US\\$${f(printer.proceeds)}, paid into the bank.\n3. On 1 October 2025 a new printer costing US\\$${f(newCost)} was bought and paid for by bank transfer.\n4. Electricity of US\\$${f(paid)} was paid during the year. A further US\\$${f(owing)} was owing at 31 December 2025.\n5. The draft profit for the year was US\\$${f(draft)}. It was calculated before depreciation for 2025, before recording the disposal and before the electricity owing.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: accPrinter, wrong: [accPrinterWrong, r2(accPrinter - depSold)], stem: "Calculate the accumulated depreciation on the printer sold, up to the date of disposal.", explanation: `${f(perYear)} a year, so ${f(perMonth)} a month. July 2021 to March 2025 is 6 + 36 + 3 = ${months} months: ${months} × ${f(perMonth)} = ${f(accPrinter)}. Four full years gives ${f(accPrinterWrong)}; leaving out the three months of 2025 gives ${f(r2(accPrinter - depSold))}.` }),
      P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal account.", points: [`Debit: Equipment ${f(printer.cost)} (cost transferred)`, `Credit: Accumulated depreciation ${f(accPrinter)} (own figure)`, `Credit: Bank ${f(printer.proceeds)}`, `Credit: Statement of profit or loss, loss on disposal ${f(loss)} (own figure)`, `Dates and equal totals of ${f(printer.cost)}`], modelAnswer: disposal, explanation: `Net book value ${f(nbvSold)} − proceeds ${f(printer.proceeds)} = loss ${f(loss)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: dep25, wrong: [monthly(costClose, 12), r2(depOthers + depNew)], stem: "Calculate the total depreciation charge on equipment for the year ended 31 December 2025.", explanation: `Equipment kept all year: 10% × ${f(costOpen - printer.cost)} = ${f(depOthers)}. Printer sold: 3 months = ${f(depSold)}. New printer: 3 months (October to December) = ${f(depNew)}. Total ${f(dep25)}. 10% of the closing cost (${f(costClose)}) gives ${f(monthly(costClose, 12))}; leaving out the printer sold gives ${f(r2(depOthers + depNew))}.` }),
      P.num({ label: "(d)", marks: 4, kind: "money", value: profit, wrong: [r2(draft - dep25 - loss + owing), r2(draft - dep25 - owing)], stem: "Calculate the corrected profit for the year ended 31 December 2025.", explanation: `${f(draft)} − depreciation ${f(dep25)} − loss on disposal ${f(loss)} − electricity owing ${f(owing)} = ${f(profit)}. The accrued electricity is an extra expense (electricity for the year is ${f(paid)} + ${f(owing)} = ${f(paid + owing)}).` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: nbv, wrong: [r2(costClose - r2(accOpen + dep25))], stem: "Calculate the net book value of equipment in the statement of financial position at 31 December 2025.", explanation: `Cost ${f(costOpen)} − ${f(printer.cost)} + ${f(newCost)} = ${f(costClose)}. Accumulated depreciation ${f(accOpen)} + ${f(dep25)} − ${f(accPrinter)} = ${f(accClose)}. Net book value ${f(nbv)}. Forgetting to remove the printer's depreciation gives ${f(r2(costClose - r2(accOpen + dep25)))}.` }),
      P.manual({ label: "(f)", marks: 3, stem: "Tatenda is thinking of changing to the reducing-balance method for her printers because they lose most of their value in the first two years. Advise her whether she should make the change. Justify your answer.", points: ["For: reducing balance charges more in the early years, matching the faster fall in value and the higher early use", "Against: the consistency concept means methods should not be changed often; the change affects profit and comparison with earlier years", "Justified conclusion, e.g. change once if it gives a fairer view, then apply it consistently"], modelAnswer: "Reducing balance would match the pattern of the printers' loss in value, giving higher charges when they are new and more realistic book values. However, consistency means she should not switch methods often, and the change would lower profit in the early years and make comparisons with earlier years harder. She should change only if the new method gives a fairer view, and then keep using it.", explanation: "Give both sides and a justified conclusion." }),
    ],
    hints: ["Count the months carefully: depreciation runs from the month of purchase to the month of sale.", "Every adjustment in note 5 reduces the draft profit."],
    explanation: `Accumulated depreciation on printer sold ${f(accPrinter)}; loss on disposal ${f(loss)}; depreciation 2025 ${f(dep25)}; corrected profit ${f(profit)}; net book value ${f(nbv)}.`,
  });
});
