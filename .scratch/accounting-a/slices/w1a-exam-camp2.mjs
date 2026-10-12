// W1a exam-format items: Cambridge Paper 2 questions 2 and 3 (15 marks each), EXAM.CAM_P2_SHORT
import { concept, P, EXAM, checkExam, CAM, table, check, sum, r2, fmt, money } from "../lib.mjs";

concept("aacc.ledger.accruals-prepayments", { file: "exam/w1a-camp2", keyPrefix: "exam.w1a-camp2", applies: CAM }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: accruals and allowances
  const ePaid = 5880;
  const eOpen = 560;
  const eClose = 610;
  const eExp = r2(ePaid - eOpen + eClose);
  check("eExp", eExp, 5930);
  const iOpen = 690;
  const iPaid = 2880;
  const iClose = r2((iPaid * 3) / 12);
  const iExp = r2(iOpen + iPaid - iClose);
  check("iClose", iClose, 720);
  check("iExp", iExp, 2850);
  const rRec = 4200;
  const rOpen = 340;
  const rClose = 470;
  const rInc = r2(rRec + rOpen - rClose);
  check("rInc", rInc, 4070);
  const recv = 52500;
  const wo = 1700;
  const remaining = r2(recv - wo);
  const allow = r2(remaining * 0.04);
  const allowOpen = 1850;
  const allowInc = r2(allow - allowOpen);
  const idExp = r2(wo + allowInc);
  check("remaining", remaining, 50800);
  check("allow", allow, 2032);
  check("allowInc", allowInc, 182);
  check("idExp", idExp, 1882);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, calculator: true, applies: CAM, paper: "Cambridge Paper 2",
    concepts: ["aacc.ledger.accruals-prepayments", "aacc.ledger.irrecoverable-debts"],
    stem: `Thandeka owns a trading business in Bulawayo. Her financial year ends on 31 December 2025.\n\n` + table(["", "Paid or received in 2025 (US\\$)", "At 1 January 2025", "At 31 December 2025"], [
      ["Electricity", ePaid, "560 owing", "610 owing"],
      ["Insurance (premium of US\\$2,880 paid on 1 April 2025 for twelve months)", iPaid, "690 prepaid", "to be calculated"],
      ["Rent received from a tenant", rRec, "340 received in advance", "470 received in advance"],
    ], ["l", "r", "l", "l"]) + `\n\nTrade receivables at 31 December 2025, before any adjustment, were ${money(recv)}. Irrecoverable debts of ${money(wo)} are to be written off. The allowance for irrecoverable debts is to be 4% of the remaining trade receivables. The allowance account had a balance of ${money(allowOpen)} at 1 January 2025.`,
    parts: checkExam(EXAM.CAM_P2_SHORT, [
      P.num({ label: "(a)", marks: 2, kind: "money", value: eExp, wrong: [r2(ePaid + eOpen - eClose), ePaid], stem: "Calculate the electricity expense for the year.", explanation: "5,880 - 560 + 610 = 5,930." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: iExp, wrong: [iPaid, r2(iOpen + iPaid)], stem: "Calculate the insurance expense for the year.", explanation: "Closing prepayment 2,880 × 3/12 = 720. Expense: 690 + 2,880 - 720 = 2,850." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rInc, wrong: [r2(rRec - rOpen + rClose), rRec], stem: "Calculate the rent received to be credited to the statement of profit or loss.", explanation: "4,200 + 340 - 470 = 4,070." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: allow, wrong: [r2(recv * 0.04)], stem: "Calculate the allowance for irrecoverable debts required at 31 December 2025.", explanation: "(52,500 - 1,700) × 4% = 2,032." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: idExp, wrong: [wo, allow], stem: "Calculate the total charge for irrecoverable debts in the statement of profit or loss (the write-off plus the increase in the allowance).", explanation: "Increase in the allowance: 2,032 - 1,850 = 182. Total: 1,700 + 182 = 1,882." }),
      P.mcq({ label: "(f)", marks: 1, stem: "Where is the rent received in advance at 31 December 2025 shown in the statement of financial position?", options: [["Current liabilities (other payables)", "Correct: it is an obligation to provide the tenant with future use."], ["Current assets (other receivables)", "It is an amount owed to the tenant in service, not an asset."], ["Capital", "It is not owner's capital."], ["Non-current assets (property, plant and equipment)", "It is not an asset."]], answer: "A", explanation: "Income received in advance is a current liability." }),
      P.manual({ label: "(g)", marks: 3, stem: "The bookkeeper suggests increasing the allowance rate from 4% to 8% 'to reduce the tax payable'. Evaluate this suggestion.", points: ["It would reduce profit by the extra allowance (about 2,032), so less tax would be paid, but only if the rate is justified", "The rate must reflect experience of customers failing to pay; a rate chosen to reduce tax is not prudent but biased and breaches integrity", "Recommend keeping 4% unless evidence supports a higher rate"], modelAnswer: "A higher allowance would reduce profit and tax, but the rate must be based on experience of customers who fail to pay. Changing it only to cut tax is biased and breaches integrity, so 4% should be kept unless there is evidence for a higher rate.", explanation: "A judgement based on prudence, evidence and integrity." }),
    ]),
    hints: ["Opening accruals are deducted and closing accruals added for an expense; the signs are reversed for income received in advance.", "Write off the irrecoverable debts before taking the 4%."],
    explanation: "This item tests accruals, prepayments, income received in advance and the allowance for irrecoverable debts.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: capital and revenue expenditure
  const draft = 38400;
  const overhaul = 6800;
  const paint = 1250;
  const legal = 900;
  const dep = r2(overhaul * 0.2);
  const corrected = r2(draft + overhaul - dep - paint + legal);
  const ncaChange = r2(overhaul - dep - paint + legal);
  check("dep", dep, 1360);
  check("corrected", corrected, 43490);
  check("ncaChange", ncaChange, 5090);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, calculator: true, applies: CAM, paper: "Cambridge Paper 2",
    concepts: ["aacc.ledger.capital-revenue"],
    stem: `The draft profit for the year of Sipho Transport, Masvingo, for the year ended 31 December 2025 was ${money(draft)}. The accountant then found three items that had been wrongly treated:\n\n1. An engine overhaul costing ${money(overhaul)} that extends the life of a lorry by three years was debited to repairs and maintenance.\n2. The painting of the depot walls, ${money(paint)}, was added to the cost of buildings.\n3. Legal fees of ${money(legal)} on the purchase of land were debited to legal expenses.\n\nVehicles are depreciated at 20% a year on cost, straight line, with a full year's charge in the year of an addition. No depreciation is charged on land or buildings.`,
    parts: checkExam(EXAM.CAM_P2_SHORT, [
      P.match({ label: "(a)", stem: "Classify each item as it should have been treated.", pairs: ["Item 1: engine overhaul", "Item 2: painting the walls", "Item 3: legal fees on buying land"], right: ["Capital expenditure", "Revenue expenditure"], rightIndex: [0, 1, 0], explanation: "The overhaul extends the lorry's life, so it is capital; painting maintains the depot, so it is revenue; legal fees on buying land are part of its cost, so they are capital." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: dep, wrong: [overhaul, r2(overhaul * 0.1)], stem: "Calculate the depreciation for the year on the engine overhaul.", explanation: "20% × 6,800 = 1,360." }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: corrected, wrong: [r2(draft + overhaul - paint + legal), r2(draft - overhaul + dep + paint - legal)], stem: "Calculate the correct profit for the year.", explanation: "38,400 + 6,800 (overhaul no longer an expense) - 1,360 (depreciation) - 1,250 (painting now an expense) + 900 (legal fees capitalised) = 43,490." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: ncaChange, wrong: [r2(overhaul + legal - paint), corrected], stem: "Calculate the net increase in non-current assets (carrying amount) after the corrections.", explanation: "Overhaul 6,800 less depreciation 1,360 = 5,440 added to vehicles; land +900; buildings -1,250. Net increase 5,440 + 900 - 1,250 = 5,090." }),
      P.manual({ label: "(e)", marks: 3, stem: "The owner says that the corrections are 'just bookkeeping' and do not matter because the cash paid was the same. Evaluate this view.", points: ["The cash is the same, but profit changes by 5,090 and assets by the same amount, which changes the picture shown to users", "Profit and asset values are used by lenders and for tax; misclassification may mislead them", "Correct classification also gives the right depreciation, spreading the cost over the life of the asset (matching)"], modelAnswer: "The cash paid is the same, but the corrections raise profit by US\\$5,090 and change the asset values, which affects what lenders and the tax authority see. Correct classification also spreads the cost of the assets over their lives through depreciation, so the view is wrong.", explanation: "Link the corrections to the effect on profit and assets and on users." }),
    ]),
    hints: ["Capital items charged as expenses raise profit when corrected; revenue items capitalised lower it.", "Charge depreciation on the capital amount of the overhaul only."],
    explanation: "This item tests capital and revenue expenditure and the correction of profit.",
  });
});
