// W1b exam-format items: ZIMSEC Paper 2 (ZIM_P2_STRUCT, 25 marks): disposal accounts; suspense account and corrected profit.
import { concept, P, EXAM, checkExam, ZIM, money, fmt, check, chk, r2, sum, rd, table, tAccount, statement, journal } from "../lib.mjs";
import { U } from "../tables/w1b-lib.mjs";

concept("aacc.ledger.nca-disposal", { file: "exam/w1b-zimp2", keyPrefix: "exam.w1b-zimp2", applies: ZIM }, (b) => {
  // =====================================================================================================
  // Item 1: disposal of motor vehicles (part-exchange and credit sale). Year ended 30 June 2026.
  const rate = 0.2;
  const fleet = { A: [38000, 3], B: [33000, 2], C: [46000, 4], D: [50000, 1] }; // [cost, full years charged before 2025/26]
  const acc = Object.fromEntries(Object.entries(fleet).map(([k, [c, n]]) => [k, c * rate * n]));
  const cost0 = sum(Object.values(fleet).map((v) => v[0]));
  const prov0 = chk(sum(Object.values(acc)), 82800);
  const eCost = 62000, allowanceA = 16400, cashPaid = eCost - allowanceA, procB = 17400;
  const nbvA = fleet.A[0] - acc.A, nbvB = fleet.B[0] - acc.B;
  const profitA = chk(allowanceA - nbvA, 1200);
  const lossB = chk(nbvB - procB, 2400);
  const charge = chk((fleet.C[0] + fleet.D[0] + eCost) * rate, 31600);
  const costClose = cost0 - fleet.A[0] - fleet.B[0] + eCost;
  const provClose = chk(prov0 - acc.A - acc.B + charge, 78400);
  const nbvClose = chk(costClose - provClose, 79600);
  const dispA = tAccount("Disposal of vehicle A account",
    [["28 Feb 2026", "Motor vehicles", fleet.A[0]], ["30 Jun 2026", "Income statement (profit)", profitA]],
    [["28 Feb 2026", "Provision for depreciation", acc.A], ["28 Feb 2026", "Motor vehicles (trade-in allowance)", allowanceA]]);
  const dispB = tAccount("Disposal of vehicle B account",
    [["30 Apr 2026", "Motor vehicles", fleet.B[0]]],
    [["30 Apr 2026", "Provision for depreciation", acc.B], ["30 Apr 2026", "Mr Ndlovu", procB], ["30 Jun 2026", "Income statement (loss)", lossB]]);
  const provMd = tAccount("Provision for depreciation: motor vehicles account",
    [["28 Feb 2026", "Disposal of vehicle A", acc.A], ["30 Apr 2026", "Disposal of vehicle B", acc.B]],
    [["1 Jul 2025", "Balance b/d", prov0], ["30 Jun 2026", "Income statement", charge]], { cdDate: "30 Jun 2026", bdDate: "1 Jul 2026" });

  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, applies: EXAM.ZIM_P2_STRUCT.applies, calculator: true,
    paper: "ZIMSEC Paper 2", concepts: ["aacc.ledger.nca-disposal", "aacc.ledger.depreciation"],
    stem: `Chipo Haulage is a transport business in Gweru. Its financial year ends on 30 June. At 1 July 2025 the motor vehicles account showed a cost of ${money(cost0)} and the provision for depreciation account ${money(prov0)}. The vehicles then owned were:\n\n${table(["Vehicle", `Cost ${U}`, "Date bought"], [["A", fleet.A[0], "1 July 2022"], ["B", fleet.B[0], "1 July 2023"], ["C", fleet.C[0], "1 July 2021"], ["D", fleet.D[0], "1 July 2024"]], ["l", "r", "l"])}\n\nVehicles are depreciated at 20% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale.\n\nDuring the year ended 30 June 2026:\n- On 28 February 2026, vehicle A was traded in for a new vehicle E that cost ${money(eCost)}. The dealer allowed ${money(allowanceA)} for vehicle A and Chipo paid the balance of ${money(cashPaid)} by bank transfer.\n- On 30 April 2026, vehicle B was sold on credit to Mr Ndlovu for ${money(procB)}.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({ label: "(a)", stem: "Calculate the accumulated depreciation, at the date of disposal, on:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: acc.A, wrong: [r2(acc.A + fleet.A[0] * rate)], stem: "vehicle A", explanation: "Charged for 2022/23, 2023/24 and 2024/25: 3 × 7,600 = 22,800. None in the year of sale." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: acc.B, wrong: [r2(acc.B + fleet.B[0] * rate)], stem: "vehicle B", explanation: "Charged for 2023/24 and 2024/25: 2 × 6,600 = 13,200." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the profit or loss on disposal of:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: profitA, wrong: [r2(allowanceA - fleet.A[0])], stem: "vehicle A (give the amount of the profit)", explanation: "Net book value 38,000 − 22,800 = 15,200. The allowance is the proceeds: 16,400 − 15,200 = profit of 1,200." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: lossB, wrong: [r2(fleet.B[0] - procB)], stem: "vehicle B (give the amount of the loss)", explanation: "Net book value 33,000 − 13,200 = 19,800. Proceeds 17,400: loss of 2,400." }),
      ] }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal accounts for vehicle A and for vehicle B.", points: ["Vehicle A: debit motor vehicles 38,000", "Vehicle A: credit provision 22,800 and motor vehicles (allowance) 16,400", "Vehicle A: profit 1,200 transferred to the income statement, totals 39,200", "Vehicle B: debit motor vehicles 33,000", "Vehicle B: credit provision 13,200 and Mr Ndlovu 17,400", "Vehicle B: loss 2,400 transferred to the income statement, totals 33,000"], modelAnswer: `${dispA}\n\n${dispB}`, explanation: "Each account has cost on the debit side, depreciation and proceeds on the credit side, and the result as the balancing figure." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: charge, wrong: [r2((cost0 - fleet.A[0] - fleet.B[0]) * rate), r2((cost0 * rate))], stem: "Calculate the depreciation charge on motor vehicles for the year ended 30 June 2026.", explanation: "Vehicles A and B are sold, so no charge. C 9,200 + D 10,000 + E 12,400 (a full year on the new vehicle) = 31,600." }),
      P.group({ label: "(e)", stem: "Provision for depreciation and carrying amount", parts: [
      P.manual({ label: "(i)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for depreciation: motor vehicles account for the year ended 30 June 2026.", points: ["Credit: balance b/d 82,800", "Credit: income statement 31,600 (own figure)", "Debit: disposals of vehicles A (22,800) and B (13,200)", "Balance c/d 78,400 with totals agreeing and balance b/d on 1 July 2026"], modelAnswer: provMd, explanation: "The two vehicles sold are removed from the provision and the year's charge is added." }),
      P.num({ label: "(ii)", marks: 2, kind: "money", value: nbvClose, wrong: [r2(cost0 - prov0)], stem: "Calculate the net book value of motor vehicles at 30 June 2026.", explanation: "Cost 167,000 − 71,000 + 62,000 = 158,000. Provision 78,400. Net book value 79,600." }),
      ] }),
      P.manual({ label: "(f)", marks: 2, stem: "State where the profit on the disposal of vehicle A is shown in the income statement and what it suggests about earlier depreciation.", points: ["Added to gross profit as other income", "Earlier depreciation on the vehicle was too high (carrying amount was below the allowance)"], modelAnswer: "It is shown as other income (added to gross profit). It suggests that too much depreciation was charged in earlier years.", explanation: "A profit on disposal is other income and corrects over-depreciation." }),
    ]),
    hints: ["Remember that no depreciation is charged in the year of sale.", "The part-exchange allowance is treated as the proceeds of vehicle A.", "A loss on disposal is the credit balancing figure."],
    explanation: "This ZIMSEC Paper 2 style question combines disposal accounts for a part-exchange and a credit sale with the provision for depreciation and net book value.",
  });

  // =====================================================================================================
  // Item 2: suspense account and corrected net profit
  const E = { overcast: 1000, disc: 380, wagesTrue: 2450, wagesBooked: 2540, equip: 3600, comm: 560 };
  const wagesDiff = E.wagesBooked - E.wagesTrue; // 90 debit too high
  const susp0 = chk(E.overcast + E.disc - wagesDiff, 1290); // debit suspense
  const draftDr = 238460, draftCr = draftDr + susp0;
  const draftGP = 91300, draftNP = 38600, draftCA = 62400, draftCL = 34100;
  const corrGP = chk(draftGP - E.overcast + E.equip, 93900);
  const corrNP = chk(draftNP - E.overcast + wagesDiff + E.equip, 41290);
  const corrWC = chk(draftCA - (draftCL - E.disc), 28680);
  const j2 = journal([
    { date: "1", lines: [["Sales", E.overcast, null], ["Suspense", null, E.overcast]], narrative: "Sales account overcast by 1,000" },
    { date: "2", lines: [["Creditors: supplier", E.disc, null], ["Suspense", null, E.disc]], narrative: "Discount received credited but not debited to the supplier" },
    { date: "3", lines: [["Suspense", wagesDiff, null], ["Wages", null, wagesDiff]], narrative: "Wages of 2,450 posted as 2,540" },
    { date: "4", lines: [["Equipment", E.equip, null], ["Purchases", null, E.equip]], narrative: "Equipment wrongly debited to purchases" },
    { date: "5", lines: [["Rent received", E.comm, null], ["Commission received", null, E.comm]], narrative: "Commission received credited to rent received" },
  ]);
  const suspMd = tAccount("Suspense account",
    [["31 Dec", "Trial balance difference", susp0], ["31 Dec", "Wages", wagesDiff]],
    [["31 Dec", "Sales", E.overcast], ["31 Dec", "Creditors: supplier", E.disc]]);
  const typeChoices = ["addition error", "one-sided entry", "unequal amounts", "principle", "commission", "omission"];
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, applies: EXAM.ZIM_P2_STRUCT.applies, calculator: true,
    paper: "ZIMSEC Paper 2", concepts: ["aacc.verification.suspense", "aacc.verification.errors", "aacc.ledger.trial-balance"],
    stem: `The trial balance of Mutare Outfitters at 30 June 2025 did not agree. The debit column totalled ${money(draftDr)} and the credit column totalled ${money(draftCr)}. The difference was entered in a suspense account. The following errors were later found:\n\n1. The sales account was overcast by ${money(E.overcast)}.\n2. A discount received of ${money(E.disc)} was credited to the discount received account but no entry was made in the supplier's account.\n3. Wages of ${money(E.wagesTrue)} were posted to the wages account as ${money(E.wagesBooked)}; the bank account entry was correct.\n4. Equipment bought for ${money(E.equip)} was debited to the purchases account.\n5. Commission received of ${money(E.comm)} was credited to the rent received account.\n\nThe draft income statement showed gross profit of ${money(draftGP)} and net profit of ${money(draftNP)}. The draft statement of financial position showed current assets of ${money(draftCA)} and current liabilities of ${money(draftCL)}. Ignore depreciation.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({ label: "(a)", stem: "Suspense account entry", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: susp0, wrong: [draftCr], stem: "Calculate the amount entered in the suspense account.", explanation: "239,750 − 238,460 = 1,290." }),
        P.fib({ label: "(ii)", marks: 1, stem: "Complete the sentence.", template: "The suspense account was {{blank:s}}.", blanks: [{ id: "s", accepted: ["debited"], choices: ["debited", "credited"] }], explanation: "The debit column was lower than the credit column, so the suspense account was debited." }),
      ] }),
      P.fib({ label: "(b)", marks: 5, stem: "Identify the type of each error.", template: "Error 1: {{blank:e1}}. Error 2: {{blank:e2}}. Error 3: {{blank:e3}}. Error 4: {{blank:e4}}. Error 5: {{blank:e5}}.", blanks: ["addition error", "one-sided entry", "unequal amounts", "principle", "commission"].map((a, i) => ({ id: `e${i + 1}`, accepted: [a], choices: typeChoices })), explanation: "1 addition error; 2 one-sided entry (only the credit was made); 3 unequal debit and credit amounts; 4 principle (capital item treated as an expense); 5 commission (wrong account of the same class)." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct the five errors. Narratives are required.", points: ["Dr Sales 1,000, Cr Suspense 1,000", "Dr Creditors 380, Cr Suspense 380", "Dr Suspense 90, Cr Wages 90", "Dr Equipment 3,600, Cr Purchases 3,600", "Dr Rent received 560, Cr Commission received 560", "Narratives given for all five entries"], modelAnswer: j2, explanation: "Errors 1 to 3 upset the trial balance and are corrected through suspense; errors 4 and 5 are not." }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account.", points: ["Debit: trial balance difference 1,290 and wages 90", "Credit: sales 1,000 and creditors 380", "Totals agree at 1,380; the account is closed"], modelAnswer: suspMd, explanation: "The account balances after the errors are corrected." }),
      P.group({ label: "(e)", stem: "Corrected figures", parts: [
      P.num({ label: "(i)", marks: 2, kind: "money", value: corrGP, wrong: [draftGP - E.overcast - E.equip, draftGP], stem: "Calculate the corrected gross profit.", explanation: "Sales are lower by 1,000 and purchases lower by 3,600: 91,300 − 1,000 + 3,600 = 93,900." }),
      P.num({ label: "(ii)", marks: 3, kind: "money", value: corrNP, wrong: [draftNP, r2(draftNP - E.overcast - wagesDiff + E.equip)], stem: "Calculate the corrected net profit.", explanation: "38,600 − 1,000 (sales) + 90 (wages) + 3,600 (equipment) = 41,290. Errors 2 and 5 do not change profit." }),
      P.num({ label: "(iii)", marks: 2, kind: "money", value: corrWC, wrong: [draftCA - draftCL], stem: "Calculate the corrected working capital.", explanation: "Creditors fall by 380: current liabilities 33,720. Working capital = 62,400 − 33,720 = 28,680." }),
      ] }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why errors 4 and 5 were not revealed by the trial balance.", points: ["Error 4 was entered on the correct side of both accounts affected (debit purchases instead of debit equipment)", "Error 5 involved a debit and credit of equal amounts to the wrong accounts, so the totals still agreed"], modelAnswer: "Both errors involved the right amounts on the right sides, but in the wrong accounts, so total debits still equalled total credits.", explanation: "Errors of principle and commission leave the totals equal." }),
    ]),
    hints: ["Credits exceed debits, so suspense is debited.", "Only the errors that upset the trial balance go through suspense.", "Errors 2 and 5 do not change profit."],
    explanation: "This ZIMSEC Paper 2 style question uses a suspense account, correcting journals and the corrected profit and working capital.",
  });
});
