// W3a: ZIMSEC Paper 2 exam-format item (20 marks): provision for depreciation and disposal accounts with a prepaid
// expense adjustment and the adjusted net profit.
import { concept, P, tAccount, sum, r2, check, ZIM } from "../lib.mjs";
import { table } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.disposal", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  // Farai Moyo, transport operator, Bulawayo. Straight line 20% on cost; full year in the year of purchase, none in
  // the year of disposal.
  const rate = 20;
  const costOpen = 84000;
  const sold = { cost: 26000, years: 2, proceeds: 14600 }; // bought 1 January 2023: 2023 and 2024 charged
  const others = { cost: costOpen - sold.cost, years: 2 }; // also bought in 2023
  const yrCharge = (c) => r2((c * rate) / 100);
  const accSold = r2(yrCharge(sold.cost) * sold.years);
  const accOthers = r2(yrCharge(others.cost) * others.years);
  const provOpen = r2(accSold + accOthers);
  check("provOpen", provOpen, 33600);
  const newVeh = 33750;
  const costClose = r2(costOpen - sold.cost + newVeh);
  const dep25 = yrCharge(costClose);
  check("dep25", dep25, 18350);
  const provClose = r2(provOpen - accSold + dep25);
  check("provClose", provClose, 41550);
  const nbvSold = r2(sold.cost - accSold);
  const loss = r2(nbvSold - sold.proceeds);
  check("loss", loss, 1000);
  const motorPaid = 4560;
  const insurance = 2280; // paid 1 April 2025 for the year to 31 March 2026
  const prepaid = r2((insurance * 3) / 12);
  const motorExp = r2(motorPaid - prepaid);
  check("motorExp", motorExp, 3990);
  const draft = 41350;
  const np = r2(draft - dep25 - loss + prepaid);
  check("np", np, 22570);
  const provTotal = sum([provOpen, dep25]);

  const disposal = tAccount("Disposal of motor vehicle account", [["1 Jul 2025", "Motor vehicles", sold.cost]], [["1 Jul 2025", "Provision for depreciation", accSold], ["1 Jul 2025", "Bank", sold.proceeds], ["31 Dec 2025", "Income statement (loss)", loss]]);
  const prov = tAccount("Provision for depreciation: motor vehicles account", [["1 Jul 2025", "Disposal", accSold]], [["1 Jan 2025", "Balance b/d", provOpen], ["31 Dec 2025", "Income statement", dep25]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  check("prov table", sum([accSold, provClose]), provTotal);

  const info = table(["Balances at 1 January 2025", "US\\$"], [["Motor vehicles at cost", costOpen], ["Provision for depreciation: motor vehicles", provOpen]]);

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.adjustments.disposal", "acc.adjustments.depreciation-accounts", "acc.adjustments.depreciation-methods", "acc.adjustments.accrued-prepaid-expenses"],
    stem: `Farai Moyo runs a transport business in Bulawayo. His financial year ends on 31 December.\n\n${info}\n\nAdditional information:\n\n1. Motor vehicles are depreciated at 20% per annum on cost (straight-line method). A full year's depreciation is charged in the year of purchase and none in the year of disposal.\n2. On 1 July 2025 a lorry bought on 1 January 2023 for US\\$${f(sold.cost)} was sold for US\\$${f(sold.proceeds)}, received by cheque.\n3. On 1 September 2025 a new lorry was bought for US\\$${f(newVeh)}, paid by cheque.\n4. Motor expenses paid during 2025 were US\\$${f(motorPaid)}. This includes insurance of US\\$${f(insurance)} paid on 1 April 2025 for the year ending 31 March 2026.\n5. The draft net profit for 2025 was US\\$${f(draft)}. It was calculated after charging the full US\\$${f(motorPaid)} of motor expenses, but before any depreciation for 2025 and before recording the disposal.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: accSold, wrong: [r2(yrCharge(sold.cost) * 3), r2(yrCharge(sold.cost) * 2.5)], stem: "Calculate the provision for depreciation on the lorry sold, up to the date of disposal.", explanation: `20% × ${f(sold.cost)} = ${f(yrCharge(sold.cost))} a year for 2023 and 2024 (none in 2025, the year of disposal): 2 × ${f(yrCharge(sold.cost))} = ${f(accSold)}. Charging a full year for 2025 as well gives ${f(r2(yrCharge(sold.cost) * 3))}; charging half a year for 2025 gives ${f(r2(yrCharge(sold.cost) * 2.5))}.` }),
      P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal of motor vehicle account.", points: [`Debit: Motor vehicles ${f(sold.cost)} (cost transferred)`, `Credit: Provision for depreciation ${f(accSold)} (own figure)`, `Credit: Bank ${f(sold.proceeds)}`, `Credit: Income statement, loss on disposal ${f(loss)} (own figure)`, `Dates and equal totals of ${f(sold.cost)}`], modelAnswer: disposal, explanation: `Net book value ${f(nbvSold)} − proceeds ${f(sold.proceeds)} = loss ${f(loss)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: dep25, wrong: [yrCharge(costOpen + newVeh), yrCharge(costOpen - sold.cost)], stem: "Calculate the depreciation on motor vehicles for the year ended 31 December 2025.", explanation: `Vehicles held at 31 December 2025: ${f(costOpen)} − ${f(sold.cost)} + ${f(newVeh)} = ${f(costClose)}. 20% × ${f(costClose)} = ${f(dep25)} (full year on the new lorry, none on the lorry sold). Including the lorry sold gives ${f(yrCharge(costOpen + newVeh))}; leaving out the new lorry gives ${f(yrCharge(costOpen - sold.cost))}.` }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for depreciation: motor vehicles account for the year ended 31 December 2025.", points: [`Credit: Balance b/d ${f(provOpen)} on 1 January 2025`, `Debit: Disposal ${f(accSold)} (own figure)`, `Credit: Income statement ${f(dep25)} (own figure)`, `Debit: Balance c/d ${f(provClose)} and equal totals of ${f(provTotal)}`, `Balance b/d ${f(provClose)} on 1 January 2026`], modelAnswer: prov, explanation: `${f(provOpen)} − ${f(accSold)} + ${f(dep25)} = ${f(provClose)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: motorExp, wrong: [motorPaid, r2(motorPaid + prepaid)], stem: "Calculate the motor expenses to be charged in the income statement for 2025.", explanation: `Prepaid insurance: 3/12 × ${f(insurance)} = ${f(prepaid)} (January to March 2026). ${f(motorPaid)} − ${f(prepaid)} = ${f(motorExp)}.` }),
      P.num({ label: "(f)", marks: 3, kind: "money", value: np, wrong: [r2(draft - dep25 - loss - prepaid), r2(draft - dep25 + prepaid)], stem: "Calculate the adjusted net profit for the year ended 31 December 2025.", explanation: `${f(draft)} − depreciation ${f(dep25)} − loss on disposal ${f(loss)} + prepaid insurance ${f(prepaid)} = ${f(np)}. The prepayment is added back because it had been charged as an expense.` }),
    ],
    hints: ["Under this policy the lorry sold is depreciated for 2023 and 2024 only.", "The prepayment reduces the expense, so it increases profit."],
    explanation: `Provision on lorry sold ${f(accSold)}; loss on disposal ${f(loss)}; depreciation 2025 ${f(dep25)}; closing provision ${f(provClose)}; motor expenses ${f(motorExp)}; adjusted net profit ${f(np)}. Net book value of motor vehicles at 31 December 2025: ${f(costClose)} − ${f(provClose)} = ${f(r2(costClose - provClose))}.`,
  });
});
