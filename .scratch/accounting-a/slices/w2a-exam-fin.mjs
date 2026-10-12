// W2a exam-format items: FIN25 (ZIMSEC Paper 3 problem solving; Cambridge Paper 3 financial accounting), apply to both boards
import { concept, P, EXAM, checkExam, table, check, sum, r2, fmt, money, chk, ratios, appropriation, goodwill } from "../lib.mjs";
import { colLedger, tAcct, approTable } from "../tables/w2a-lib.mjs";

concept("aacc.partnership.new-partner", { file: "exam/w2a-fin", keyPrefix: "exam.w2a-fin" }, (b) => {
  const PAPER = "ZIMSEC and Cambridge Paper 3";
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: admission of a partner with revaluation and goodwill
  const bf = { land: 150000, equip: 41500, inv: 32800, rec: 24700, bank: 18200, pay: 28800, T: 150000, N: 88400 };
  const aB = sum([bf.land, bf.equip, bf.inv, bf.rec, bf.bank]);
  check("A before", aB, bf.pay + bf.T + bf.N);
  const rv = { land: 21000, equip: -5500, inv: -1800, allow: -900 };
  const G = r2(rv.land + rv.equip + rv.inv + rv.allow);
  chk(G, 12800);
  const gw = 56000;
  const cash = 60000;
  const led = colLedger(
    "Partners' capital accounts",
    ["Tinashe", "Nyaradzo", "Kudzai"],
    [["Goodwill eliminated (4 : 3 : 1)", r2(gw / 2), r2((gw * 3) / 8), r2(gw / 8)]],
    [["Balance b/d", bf.T, bf.N, null], ["Revaluation profit (5 : 3)", r2((G * 5) / 8), r2((G * 3) / 8), null], ["Goodwill created (5 : 3)", r2((gw * 5) / 8), r2((gw * 3) / 8), null], ["Cash introduced", null, null, cash]],
    { cdDate: "1 Jul", bdDate: "1 Jul" },
  );
  chk(led.closing[0], 165000);
  chk(led.closing[1], 93200);
  chk(led.closing[2], 53000);
  const aA = r2(aB + G + cash);
  check("A after", aA, bf.pay + sum(led.closing));
  const caA = r2(bf.inv + rv.inv + (bf.rec + rv.allow) + bf.bank + cash);
  const cr = ratios.current(caA, bf.pay);
  const revT = tAcct(
    "Revaluation account",
    [["1 Jul", "Equipment", 5500], ["1 Jul", "Inventory", 1800], ["1 Jul", "Allowance for irrecoverable debts", 900], ["1 Jul", "Capital: Tinashe (5/8)", r2((G * 5) / 8)], ["1 Jul", "Capital: Nyaradzo (3/8)", r2((G * 3) / 8)]],
    [["1 Jul", "Land and buildings", 21000]],
    null,
  );
  const crBefore = ratios.current(sum([bf.inv, bf.rec, bf.bank]), bf.pay);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.partnership.new-partner", "aacc.partnership.goodwill", "aacc.partnership.revaluation"],
    stem: `Tinashe and Nyaradzo trade as a partnership selling farm equipment in Mutare. They share profits 5 : 3. On 1 July 2026 their statement of financial position showed: land and buildings ${money(bf.land)}; equipment ${money(bf.equip)}; inventory ${money(bf.inv)}; trade receivables ${money(bf.rec)}; bank ${money(bf.bank)}; trade payables ${money(bf.pay)}; capital accounts Tinashe ${money(bf.T)} and Nyaradzo ${money(bf.N)}.\n\nOn 1 July 2026 Kudzai was admitted as a partner and introduced ${money(cash)} in cash. The new profit-sharing ratio is Tinashe 4 : Nyaradzo 3 : Kudzai 1. The following were agreed.\n\n- Land and buildings are revalued to ${money(171000)}, equipment to ${money(36000)} and inventory to ${money(31000)}; the allowance for irrecoverable debts is to be ${money(900)} (there was no allowance before).\n- Goodwill is valued at ${money(gw)}. It is to be created and eliminated through the capital accounts and will not remain in the books.\n- The assets are shown at their revalued amounts.`,
    parts: checkExam(EXAM.FIN25, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: G, wrong: [21000, r2(21000 + 5500 + 1800 + 900)], stem: "Calculate the net revaluation profit.", explanation: "21,000 - 5,500 - 1,800 - 900 = 12,800." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(gw / 8), wrong: [gw, r2(gw / 4)], stem: "Calculate the amount of goodwill charged to Kudzai.", explanation: "1/8 × 56,000 = 7,000." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led.closing[0], wrong: [r2(bf.T + 8000), r2(bf.T + 8000 + 35000)], stem: "Calculate Tinashe's capital after the admission.", explanation: "150,000 + 8,000 (5/8 of 12,800) + 35,000 - 28,000 = 165,000." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: led.closing[1], wrong: [r2(bf.N + 4800), r2(bf.N + 4800 + 21000)], stem: "Calculate Nyaradzo's capital after the admission.", explanation: "88,400 + 4,800 + 21,000 - 21,000 = 93,200." }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: aA, wrong: [r2(aB + cash), r2(aB + G)], stem: "Calculate total assets after the admission.", explanation: `${fmt(aB)} + revaluation profit ${fmt(G)} + cash ${fmt(cash)} = ${fmt(aA)}.` }),
      P.num({ label: "(f)", marks: 2, kind: "ratio", value: cr, wrong: [r2(crBefore), r2(ratios.acidTest(caA, r2(bf.inv + rv.inv), bf.pay))], stem: "Calculate the current ratio after the admission, as x : 1 to two decimal places.", explanation: `Current assets: inventory 31,000 + receivables 23,800 + bank 78,200 = ${fmt(caA)}; current liabilities 28,800; ratio ${fmt(r2(cr))} : 1.` }),
      P.manual({ label: "(g)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Write up the partners' capital accounts on the admission of Kudzai.", points: ["Opening balances and cash introduced entered", "Revaluation profit credited 5 : 3", "Goodwill created 5 : 3 and eliminated 4 : 3 : 1", "Balances carried down correctly", "Kudzai's capital reduced by his share of goodwill"], modelAnswer: led.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(h)", marks: 4, stem: `Compare the current ratio before the admission (${fmt(r2(crBefore))} : 1) with the ratio after it, and evaluate whether Kudzai's admission has strengthened the business.`, points: [`The current ratio rises from ${fmt(r2(crBefore))} : 1 to ${fmt(r2(cr))} : 1 because the cash of 60,000 increases current assets`, "The business can now pay its creditors comfortably, and has more working capital for expansion", "But most of the improvement is idle cash; it should be invested to earn a return, and profit must now be shared with a third partner", "Judgement: the admission strengthens liquidity, but the benefit depends on how the cash is used and whether profits grow"], modelAnswer: `The current ratio improves from ${fmt(r2(crBefore))} : 1 to ${fmt(r2(cr))} : 1 because of the new cash, so liquidity is stronger. But the cash is idle until invested and profit is shared among three partners. The admission helps if the cash is used to grow profit.`, explanation: "One mark for each reasoned point; the last for a judgement." }),
    ]),
    hints: ["Revalue first, then deal with goodwill, then the cash.", "The current ratio uses current assets after the revaluation and the cash."],
    explanation: "This item tests revaluation, goodwill and cash on the admission of a partner, the capital accounts and an analysis of liquidity.",
  });
  void revT;

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: retirement
  const r0 = { prem: 120000, mach: 45000, inv: 26400, rec: 19800, bank: 31500, pay: 22700, R: 95000, T: 70000, M: 55000 };
  const aB2 = sum([r0.prem, r0.mach, r0.inv, r0.rec, r0.bank]);
  check("B before", aB2, r0.pay + r0.R + r0.T + r0.M);
  const G2 = r2(15000 - 4500 - 1200);
  chk(G2, 9300);
  const gw2 = 45000;
  const cash2 = 26500;
  const due = r2(r0.M + (G2 * 2) / 10 + (gw2 * 2) / 10);
  chk(due, 65860);
  const loan2 = r2(due - cash2);
  const led2 = colLedger(
    "Partners' capital accounts",
    ["Rufaro", "Tatenda", "Memory"],
    [["Goodwill eliminated (2 : 1)", r2((gw2 * 2) / 3), r2(gw2 / 3), null], ["Bank (cash paid)", null, null, cash2], ["Loan account", null, null, loan2]],
    [["Balance b/d", r0.R, r0.T, r0.M], ["Revaluation profit (5 : 3 : 2)", r2(G2 / 2), r2((G2 * 3) / 10), r2((G2 * 2) / 10)], ["Goodwill created (5 : 3 : 2)", r2(gw2 / 2), r2((gw2 * 3) / 10), r2((gw2 * 2) / 10)]],
  );
  chk(led2.closing[0], 92150);
  chk(led2.closing[1], 71290);
  const aA2 = r2(aB2 + G2 - cash2);
  check("B after", aA2, r0.pay + loan2 + led2.closing[0] + led2.closing[1]);
  const caA2 = r2(r0.inv - 1200 + r0.rec + (r0.bank - cash2));
  const cr2 = ratios.current(caA2, r0.pay);
  const crB2 = ratios.current(sum([r0.inv, r0.rec, r0.bank]), r0.pay);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.partnership.retirement", "aacc.partnership.goodwill", "aacc.partnership.revaluation"],
    stem: `Rufaro, Tatenda and Memory run a furniture-making partnership in Gweru. They share profits 5 : 3 : 2. Memory retires on 31 December 2026 and Rufaro and Tatenda will share profits 2 : 1. Their statement of financial position on that date showed: premises ${money(r0.prem)}; machinery ${money(r0.mach)}; inventory ${money(r0.inv)}; trade receivables ${money(r0.rec)}; bank ${money(r0.bank)}; trade payables ${money(r0.pay)}; capital accounts Rufaro ${money(r0.R)}, Tatenda ${money(r0.T)} and Memory ${money(r0.M)}.\n\nThe following were agreed.\n\n- Premises are revalued to ${money(135000)}, machinery to ${money(40500)} and inventory to ${money(25200)}.\n- Goodwill is valued at ${money(gw2)}; it is not to remain in the books.\n- Memory is paid ${money(cash2)} from the bank on 31 December 2026 and the balance is transferred to a loan account, repayable over three years.`,
    parts: checkExam(EXAM.FIN25, [
      P.num({ label: "(a)", marks: 3, kind: "money", value: due, wrong: [r0.M, r2(r0.M + gw2 / 5)], stem: "Calculate the total amount due to Memory.", explanation: `Capital 55,000 + 2/10 × revaluation profit 9,300 (1,860) + 2/10 × goodwill 45,000 (9,000) = ${fmt(due)}.` }),
      P.mcq({ label: "(b)", marks: 2, stem: "What is the gaining ratio of Rufaro to Tatenda?", options: [["5 : 1", "Correct: Rufaro gains 2/3 - 1/2 = 1/6 and Tatenda 1/3 - 3/10 = 1/30."], ["2 : 1", "That is their new profit-sharing ratio."], ["5 : 3", "That is their old ratio."], ["1 : 1", "Their gains are not equal."]], answer: "A", explanation: "In thirtieths the gains are 5 and 1, a ratio of 5 : 1." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: led2.closing[0], wrong: [r2(r0.R + 4650 + 22500), r2(r0.R + 4650)], stem: "Calculate Rufaro's capital after the retirement.", explanation: "95,000 + 4,650 + 22,500 - 30,000 = 92,150." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: loan2, wrong: [due, cash2], stem: "Calculate the balance transferred to Memory's loan account.", explanation: `${fmt(due)} - ${fmt(cash2)} = ${fmt(loan2)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: aA2, wrong: [r2(aB2 - cash2), r2(aB2 + G2)], stem: "Calculate total assets after the retirement.", explanation: `${fmt(aB2)} + ${fmt(G2)} - ${fmt(cash2)} = ${fmt(aA2)}.` }),
      P.num({ label: "(f)", marks: 2, kind: "ratio", value: cr2, wrong: [r2(crB2), r2(ratios.current(caA2, r2(r0.pay + loan2)))], stem: "Calculate the current ratio after the retirement, as x : 1 to two decimal places (the loan is not a current liability).", explanation: `Current assets 25,000 + 19,800 + ${fmt(r0.bank - cash2)} = ${fmt(caA2)}; current liabilities 22,700; ratio ${fmt(r2(cr2))} : 1.` }),
      P.manual({ label: "(g)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Write up the partners' capital accounts on the retirement of Memory.", points: ["Opening balances entered", "Revaluation profit credited 5 : 3 : 2", "Goodwill created 5 : 3 : 2", "Goodwill eliminated 2 : 1 in the continuing partners' accounts only", "Memory's account closed by the bank and the loan account", "Balances for Rufaro and Tatenda carried down correctly"], modelAnswer: led2.md, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(h)", marks: 5, stem: `The current ratio was ${fmt(r2(crB2))} : 1 before the retirement. Evaluate the effect of Memory's retirement on the liquidity of the business and advise the remaining partners.`, points: [`The current ratio falls from ${fmt(r2(crB2))} : 1 to ${fmt(r2(cr2))} : 1 because ${fmt(cash2)} of cash leaves the business`, "The ratio is still above 2 : 1, so short-term creditors can be paid", `The loan of ${fmt(loan2)} is repayable over three years, which will use cash in future years and reduce liquidity further`, "The loan keeps cash in the business now, which is better than paying the whole amount at once", "Advice: plan the repayments from future profits and keep enough cash, or negotiate a longer repayment period"], modelAnswer: `Liquidity falls because ${fmt(cash2)} of cash is paid out: the current ratio drops from ${fmt(r2(crB2))} : 1 to ${fmt(r2(cr2))} : 1, which is still adequate. The loan of ${fmt(loan2)} will need repaying over three years, so they should budget for it or negotiate a longer period.`, explanation: "One mark for each reasoned point using the figures." }),
    ]),
    hints: ["Revalue, create goodwill for all three, eliminate it among the continuing partners.", "The loan is a non-current liability."],
    explanation: "This item tests the retirement of a partner with revaluation, goodwill, cash and a loan, and an analysis of liquidity.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: mid-year admission and the appropriation account
  const specs = (P0) => [
    { months: 7, partners: [{ name: "Anesu", salary: 0, capital: 53000, share: 3 }, { name: "Blessing", salary: 9360, capital: 37000, share: 2 }] },
    { months: 5, partners: [{ name: "Anesu", capital: 53000, share: 2 }, { name: "Blessing", salary: 9360, capital: 37000, share: 2 }, { name: "Cleopas", capital: 33000, share: 1 }] },
  ].map((p) => {
    const f = p.months / 12;
    const pr = r2(P0 * f);
    const calc = appropriation({ profit: pr, partners: p.partners.map((x) => ({ name: x.name, salary: (x.salary ?? 0) * f, capital: (x.capital ?? 0) * f, interestOnCapitalPct: 6, share: x.share })) });
    return { ...p, f, profit: pr, calc };
  });
  let P0 = 0;
  for (let p = 118020; p < 121000; p += 60) {
    const s = specs(p);
    if (s.every((x) => x.calc.lines.every((l) => Math.abs(l.residualShare - Math.round(l.residualShare)) < 1e-9)) && s.every((x) => Math.abs(x.calc.residual - Math.round(x.calc.residual)) < 1e-9)) {
      P0 = p;
      break;
    }
  }
  if (!P0) throw new Error("no clean FIN25 item 3");
  const sp = specs(P0);
  const tot = [r2(sp[0].calc.lines[0].total + sp[1].calc.lines[0].total), r2(sp[0].calc.lines[1].total + sp[1].calc.lines[1].total), r2(sp[1].calc.lines[2].total)];
  check("item 3 total", sum(tot), P0);
  const openCur = [2480, 1150];
  const drawings = [11200, 9400, 3800];
  const blessClose = r2(openCur[1] + tot[1] - drawings[1]);
  const revenue3 = 412500;
  const pm3 = ratios.profitMargin(P0, revenue3);
  const rowsM = [
    ["**Profit (7 months : 5 months)**", sp[0].profit, sp[1].profit, P0],
    ["Salary: Blessing (9,360 a year)", sp[0].calc.lines[1].salary, sp[1].calc.lines[1].salary, r2(sp[0].calc.lines[1].salary + sp[1].calc.lines[1].salary)],
    ["Interest on capital: Anesu", sp[0].calc.lines[0].interestOnCapital, sp[1].calc.lines[0].interestOnCapital, r2(sp[0].calc.lines[0].interestOnCapital + sp[1].calc.lines[0].interestOnCapital)],
    ["Interest on capital: Blessing", sp[0].calc.lines[1].interestOnCapital, sp[1].calc.lines[1].interestOnCapital, r2(sp[0].calc.lines[1].interestOnCapital + sp[1].calc.lines[1].interestOnCapital)],
    ["Interest on capital: Cleopas", "", sp[1].calc.lines[2].interestOnCapital, sp[1].calc.lines[2].interestOnCapital],
    ["**Residual profit**", sp[0].calc.residual, sp[1].calc.residual, r2(sp[0].calc.residual + sp[1].calc.residual)],
    ["Share: Anesu", sp[0].calc.lines[0].residualShare, sp[1].calc.lines[0].residualShare, r2(sp[0].calc.lines[0].residualShare + sp[1].calc.lines[0].residualShare)],
    ["Share: Blessing", sp[0].calc.lines[1].residualShare, sp[1].calc.lines[1].residualShare, r2(sp[0].calc.lines[1].residualShare + sp[1].calc.lines[1].residualShare)],
    ["Share: Cleopas", "", sp[1].calc.lines[2].residualShare, sp[1].calc.lines[2].residualShare],
    ["**Total: Anesu**", sp[0].calc.lines[0].total, sp[1].calc.lines[0].total, tot[0]],
    ["**Total: Blessing**", sp[0].calc.lines[1].total, sp[1].calc.lines[1].total, tot[1]],
    ["**Total: Cleopas**", "", sp[1].calc.lines[2].total, tot[2]],
  ];
  const model3 = table(["Appropriation account, year ended 31 December 2026", "1 Jan to 31 Jul", "1 Aug to 31 Dec", "Year"], rowsM, ["l", "r", "r", "r"]);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.FIN25.skill, secs: EXAM.FIN25.secs, calculator: true, paper: PAPER,
    concepts: ["aacc.partnership.mid-year-changes", "aacc.partnership.accounts", "aacc.ratios.profitability"],
    stem: `Anesu and Blessing own a bakery in Masvingo and share profits 3 : 2. Blessing receives a salary of ${money(9360)} a year. Interest on capital is 6% a year. Capital accounts are fixed at ${money(53000)} (Anesu) and ${money(37000)} (Blessing). On 1 August 2026 Cleopas joined the partnership, bringing capital of ${money(33000)}. From that date the profit-sharing ratio is Anesu 2 : Blessing 2 : Cleopas 1; Blessing's salary and the interest rate are unchanged.\n\nRevenue for the year ended 31 December 2026 was ${money(revenue3)} and profit for the year was ${money(P0)}, earned evenly through the year. Current account balances at 1 January 2026 were Anesu ${money(openCur[0])} credit and Blessing ${money(openCur[1])} credit. Drawings for the year were Anesu ${money(drawings[0])}, Blessing ${money(drawings[1])} and Cleopas ${money(drawings[2])}.`,
    parts: checkExam(EXAM.FIN25, [
      P.num({ label: "(a)", marks: 2, kind: "money", value: sp[1].profit, wrong: [sp[0].profit, P0], stem: "Calculate the profit for the period 1 August to 31 December.", explanation: `5/12 × ${fmt(P0)} = ${fmt(sp[1].profit)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: sp[0].calc.residual, wrong: [sp[0].profit, r2(sp[0].calc.residual + sp[0].calc.lines[1].salary)], stem: "Calculate the residual profit for the period 1 January to 31 July.", explanation: `Profit ${fmt(sp[0].profit)}; salary ${fmt(sp[0].calc.lines[1].salary)}; interest ${fmt(sp[0].calc.lines[0].interestOnCapital)} + ${fmt(sp[0].calc.lines[1].interestOnCapital)}; residual ${fmt(sp[0].calc.residual)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: sp[1].calc.residual, wrong: [sp[1].profit, r2(sp[1].calc.residual + sp[1].calc.lines[2].interestOnCapital)], stem: "Calculate the residual profit for the period 1 August to 31 December.", explanation: `Profit ${fmt(sp[1].profit)}; salary ${fmt(sp[1].calc.lines[1].salary)}; interest ${fmt(sp[1].calc.lines[0].interestOnCapital)} + ${fmt(sp[1].calc.lines[1].interestOnCapital)} + ${fmt(sp[1].calc.lines[2].interestOnCapital)}; residual ${fmt(sp[1].calc.residual)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: tot[0], wrong: [sp[1].calc.lines[0].total, r2(tot[0] - sp[0].calc.lines[0].interestOnCapital)], stem: "Calculate Anesu's total profit appropriated for the year.", explanation: `Period 1: ${fmt(sp[0].calc.lines[0].total)}; period 2: ${fmt(sp[1].calc.lines[0].total)}; total ${fmt(tot[0])}.` }),
      P.num({ label: "(e)", marks: 3, kind: "money", value: tot[2], wrong: [sp[1].calc.lines[2].residualShare, r2(tot[2] * 12 / 5)], stem: "Calculate Cleopas's total profit appropriated for the year.", explanation: `Interest ${fmt(sp[1].calc.lines[2].interestOnCapital)} + 1/5 × ${fmt(sp[1].calc.residual)} (${fmt(sp[1].calc.lines[2].residualShare)}) = ${fmt(tot[2])}.` }),
      P.num({ label: "(f)", marks: 3, kind: "money", value: blessClose, wrong: [r2(blessClose + drawings[1]), r2(openCur[1] + sp[1].calc.lines[1].total - drawings[1])], stem: "Calculate the balance on Blessing's current account at 31 December 2026 (credit).", explanation: `${fmt(openCur[1])} + ${fmt(tot[1])} - ${fmt(drawings[1])} = ${fmt(blessClose)}.` }),
      P.num({ label: "(g)", marks: 2, kind: "pct", value: pm3, wrong: [r2(ratios.markUp(P0, revenue3 - P0)), r2((P0 / (53000 + 37000 + 33000)) * 100)], stem: "Calculate the profit margin (profit for the year ÷ revenue × 100) to one decimal place.", explanation: `${fmt(P0)} ÷ ${fmt(revenue3)} × 100 = ${fmt(r2(pm3))}%.` }),
      P.manual({ label: "(h)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year in two columns.", points: ["Profit apportioned 7/12 and 5/12", "Salary and interest on capital apportioned for each partner, Cleopas for five months only", "Residual shared 3 : 2 and then 2 : 2 : 1", "Total for each partner for the year agreeing with the profit"], modelAnswer: model3, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(i)", marks: 2, stem: `Cleopas drew ${money(drawings[2])} in five months. Comment on whether this level of drawings is sustainable.`, points: [`He was appropriated ${fmt(tot[2])} for five months and drew ${fmt(drawings[2])}, so his current account is ${tot[2] >= drawings[2] ? "in credit" : "overdrawn"}`, "Drawings should not continue to exceed the profit he earns, or the business will have to fund them from capital"], modelAnswer: `He earned ${fmt(tot[2])} and drew ${fmt(drawings[2])}, so his drawings ${tot[2] >= drawings[2] ? "are covered by his share of profit and are sustainable" : "exceed his share and are not sustainable"}.`, explanation: "One mark for the comparison and one for the judgement." }),
    ]),
    hints: ["Apportion the profit 7/12 and 5/12.", "Interest and salary are apportioned for the months each partner had that status."],
    explanation: "This item tests a two-period appropriation account for a partnership that admits a partner during the year, with current accounts and a ratio.",
  });
  void goodwill;
  void approTable;
});
