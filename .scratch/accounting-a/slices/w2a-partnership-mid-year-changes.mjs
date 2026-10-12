// W2a: partnership.mid-year-changes
import { concept, P, table, r2, fmt, money, chk, check, sum, appropriation } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

/** Two-period appropriation: periods [{ months, partners: [{ name, salary (annual), capital, intPct, share }] }]; profit accrues evenly over 12 months. */
function twoPeriod(profit, periods) {
  const res = periods.map((p) => {
    const f = p.months / 12;
    const pr = r2(profit * f);
    const calc = appropriation({
      profit: pr,
      partners: p.partners.map((x) => ({ name: x.name, salary: (x.salary ?? 0) * f, capital: (x.capital ?? 0) * f, interestOnCapitalPct: x.intPct ?? 0, share: x.share })),
    });
    return { ...p, profit: pr, calc };
  });
  return res;
}
const nice = (n) => Math.abs(n - Math.round(n)) < 1e-9;

concept("aacc.partnership.mid-year-changes", { file: "partnership/mid-year-changes", keyPrefix: "partnership.mid-year-changes" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "When a partnership changes during the year, the profit for the year is normally divided between the two periods:",
    ok: ["in proportion to the number of months in each period", "Correct: time apportionment, unless separate profits are given."],
    bad: [["equally between the two periods of the year", "The periods are not usually equal in length."], ["in the new profit-sharing ratio", "The ratio decides how a period's profit is shared, not how profit is divided between periods."], ["by the partners' capital balances", "Capital does not determine the time split."]],
    explanation: "Profit is time-apportioned unless the question gives profit for each period.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The financial year ends on 31 December. A new partner is admitted on 1 April. How many months are in the period before and after the change?",
    ok: ["3 months before and 9 months after", "Correct: January to March, then April to December."],
    bad: [["4 months before and 8 months after", "April belongs to the later period."], ["9 months before and 3 months after", "These are the periods for a change on 1 October."], ["6 months before and 6 months after", "That is a change on 1 July."]],
    explanation: "From 1 January to 31 March is three months; from 1 April to 31 December is nine.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A partner's salary is US\\$12,000 a year. What is the salary for the five months before a change in the partnership?",
    ok: ["US\\$5,000", "Correct: 12,000 × 5/12."],
    bad: [["US\\$12,000", "The full year's salary has been used."], ["US\\$7,000", "This is the salary for the other seven months."], ["US\\$2,400", "This is a division by five, not by twelve months."]],
    explanation: "12,000 × 5 ÷ 12 = 5,000.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A new partner joins on 1 July with capital of US\\$20,000. Interest on capital is 6% a year and the year ends on 31 December. What interest is credited to him for the year?",
    ok: ["US\\$600", "Correct: 6% × 20,000 × 6/12."],
    bad: [["US\\$1,200", "This is the interest for a full year."], ["US\\$100", "The rate has been applied for one month only."], ["US\\$300", "Only three months have been used."]],
    hints: ["He is a partner for six months."],
    explanation: "20,000 × 6% × 6/12 = 600.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Profit for the year to 31 December is US\\$72,000, earned evenly. A partner leaves on 31 August. What is the profit for the period from 1 September to 31 December?",
    ok: ["US\\$24,000", "Correct: 4/12 × 72,000."],
    bad: [["US\\$48,000", "This is the profit for the first eight months."], ["US\\$36,000", "Half the profit has been used."], ["US\\$18,000", "Three months have been used, not four."]],
    hints: ["Count September to December."],
    explanation: "The later period is four months, so 4/12 × 72,000 = 24,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A partnership has fixed capital accounts. Goodwill is created and eliminated when a partner joins in the middle of the year. Where are the entries made?",
    ok: ["In the partners' current accounts", "Correct: fixed capitals do not change."],
    bad: [["In the partners' capital accounts", "That would alter the fixed capital."], ["In the appropriation account", "Goodwill is not an appropriation of profit."], ["In the statement of profit or loss", "Goodwill adjustments are between the partners."]],
    hints: ["Capital is fixed."],
    explanation: "With fixed capitals all adjustments pass through the current accounts.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A business trades mostly in the first six months of the year, and the question states that profit to the change date was US\\$55,000 out of a total of US\\$65,000. What should the accountant do?",
    ok: ["Use US\\$55,000 and US\\$10,000 for the two periods", "Correct: the stated profits replace the time apportionment."],
    bad: [["Apportion US\\$65,000 evenly by months", "Even apportionment applies only if no other information is given."], ["Share all US\\$65,000 in the old ratio", "The new ratio applies to the later period's profit."], ["Ignore the profit for the first period", "Both periods' profits are shared."]],
    hints: ["Which information does the question give?"],
    explanation: "When separate profits are given, use them; time apportionment is the default.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A partner joins on 1 October. Which statement about the year's appropriation account is correct?",
    ok: ["The new partner has interest and profit for the last three months only", "Correct: his entitlement starts on the date of joining."],
    bad: [["The new partner shares in the profit for the whole of the year", "He was not a partner before 1 October."], ["The new partner receives interest on capital for twelve months", "Interest runs only from admission."], ["The old ratio applies to the whole year", "The new ratio applies from 1 October."]],
    hints: ["Think about when he became a partner."],
    explanation: "A new partner's rights run from the date of admission.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a year with a change in the profit-sharing ratio, the residual profit of each period is shared in the ratio that applied during that period.", answer: true, explanation: "True. Each period has its own residual and ratio." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Interest on capital for a partner who retires on 31 March is calculated for the full year.", answer: false, hints: ["Count the months he was a partner."], explanation: "False. It is calculated only for the three months to 31 March." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "For a year ended 31 December, match each change date to the number of months in the period after the change.",
    pairs: ["1 April", "1 July", "1 October", "1 February"],
    right: ["9", "6", "3", "11"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Months from the change date to 31 December: 9, 6, 3 and 11.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "A salary of US\\$24,000 a year for four months is {{blank:a}}, found by multiplying by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["8000", "8,000"], marks: 1 },
      { id: "b", accepted: ["4/12", "4 / 12", "one third", "1/3"], marks: 1 },
    ],
    explanation: "24,000 × 4/12 = 8,000.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to dividing a year's figure between periods in proportion to the months in each?",
    accepted: ["time apportionment", "apportionment", "time apportioning", "time-apportionment"],
    explanation: "Time apportionment divides a figure by the months in each period.",
  });

  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2((69000 * 5) / 12), daily: true, calculator: true, wrong: [69000, r2((69000 * 7) / 12)],
    stem: `Profit for the year ended 31 December is ${money(69000)}, earned evenly. A partner joins on 1 August. Calculate the profit for the period from 1 August to 31 December.`,
    explanation: "5/12 × 69,000 = 28,750. The first seven months earn 40,250.",
  });
  const sal = r2((9600 * 7) / 12 + (12000 * 5) / 12);
  chk(sal, 10600);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: sal, calculator: true, wrong: [12000, 9600],
    stem: `A partner's salary was ${money(9600)} a year for the first seven months of the year and ${money(12000)} a year for the last five months. Calculate the salary credited for the year.`,
    hints: ["Apportion each salary by the months."],
    explanation: "9,600 × 7/12 = 5,600; 12,000 × 5/12 = 5,000; total 10,600.",
  });
  const ic = r2(30000 * 0.05 * (4 / 12) + 42000 * 0.05 * (8 / 12));
  chk(ic, 1900);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ic, calculator: true, wrong: [r2(42000 * 0.05), r2(30000 * 0.05)],
    stem: `A partner's capital was ${money(30000)} for the first four months of the year and ${money(42000)} for the last eight months. Interest on capital is 5% a year. Calculate the interest for the year.`,
    hints: ["Two periods with different capital."],
    explanation: "30,000 × 5% × 4/12 = 500; 42,000 × 5% × 8/12 = 1,400; total 1,900.",
  });
  const per = twoPeriod(60000, [
    { months: 4, partners: [{ name: "A", salary: 0, capital: 36000, intPct: 5, share: 1 }, { name: "B", capital: 18000, intPct: 5, share: 1 }] },
    { months: 8, partners: [{ name: "A", capital: 36000, intPct: 5, share: 3 }, { name: "B", capital: 18000, intPct: 5, share: 2 }] },
  ]);
  const aTot = r2(per[0].calc.lines[0].total + per[1].calc.lines[0].total);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: aTot, calculator: true, wrong: [per[0].calc.lines[0].total, r2(aTot - per[0].calc.lines[0].interestOnCapital)],
    stem: `Partners A and B have fixed capitals of ${money(36000)} and ${money(18000)} and are allowed 5% interest on capital. Profit for the year is ${money(60000)}, earned evenly. For the first four months they shared the residual profit equally; for the last eight months the ratio was 3 : 2. Calculate A's total share of profit (interest plus residual) for the year.`,
    hints: ["Treat the periods separately: profit 20,000 and 40,000.", "Interest for 4 and 8 months."],
    explanation: `Period 1: profit 20,000; interest 600 + 300 = 900; residual 19,100 shared equally gives A 9,550, so A receives ${fmt(per[0].calc.lines[0].total)}. Period 2: profit 40,000; interest 1,200 + 600 = 1,800; residual 38,200 shared 3 : 2 gives A 22,920, so A receives ${fmt(per[1].calc.lines[0].total)}. Total ${fmt(aTot)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why profit is time-apportioned when a partner joins during the year.",
    points: ["The new partner is entitled to profit only for the period after he joined", "The old ratio applies to the earlier period and the new ratio to the later period, so profit must be split between them"],
    modelAnswer: "The new partner was not a partner before he joined, so he can share only the profit of the later period. Each period has its own ratio, so the profit is divided between the periods by months.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three items that must be time-apportioned in a two-period appropriation account.",
    points: ["Profit for the year", "Partners' salaries", "Interest on capital (for a partner who joins or leaves, or whose capital changes)"],
    modelAnswer: "Profit for the year, the partners' salaries and the interest on capital.",
    hints: ["Think of the items in the appropriation account."],
    explanation: "One mark each; interest on drawings is also acceptable.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The partners assume that profit accrued evenly, but 70% of the year's sales were made before the new partner joined. Evaluate this assumption and advise them.",
    points: ["Even apportionment would give the new partner a larger share than his period's profit justified", "Using the actual profit for each period is fairer if reliable records exist", "A cut-off statement of profit at the change date costs time but removes the dispute", "Advice: prepare accounts to the change date and share each period's actual profit"],
    modelAnswer: "Assuming even profit would give the new partner too much, because most of the profit was earned earlier. If records exist the actual profit to the change date should be used. They should prepare accounts to that date.",
    hints: ["Which period earned more?"],
    explanation: "One mark for each reasoned point.",
  });

  // Structured 1 (10 marks)
  let spec1 = null;
  for (let p = 83010; p < 85500; p += 3) {
    const per1 = twoPeriod(p, [
      { months: 8, partners: [{ name: "Sipho", capital: 39000, intPct: 6, share: 3 }, { name: "Thandeka", salary: 5400, capital: 27000, intPct: 6, share: 2 }] },
      { months: 4, partners: [{ name: "Sipho", capital: 39000, intPct: 6, share: 3 }, { name: "Thandeka", salary: 5400, capital: 27000, intPct: 6, share: 2 }, { name: "Chipo", capital: 21000, intPct: 6, share: 1 }] },
    ]);
    const ok = per1.every((x) => nice(x.calc.residual) && x.calc.lines.every((l) => nice(l.residualShare)) );
    if (ok && p % 12 === 0) { spec1 = { p, per1 }; break; }
  }
  if (!spec1) throw new Error("no clean S1");
  const { p: prof1, per1 } = spec1;
  const sTot = r2(per1[0].calc.lines[0].total + per1[1].calc.lines[0].total);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho and Thandeka are in partnership with fixed capitals of ${money(39000)} and ${money(27000)}. Interest on capital is 6% a year and Thandeka receives a salary of ${money(5400)} a year. Residual profits are shared 3 : 2. On 1 September 2026 Chipo is admitted with capital of ${money(21000)}. From then profits are shared 3 : 2 : 1 and the other terms are unchanged. The profit for the year ended 31 December 2026 was ${money(prof1)}, earned evenly.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: per1[1].profit, wrong: [per1[0].profit, prof1], stem: "Calculate the profit for the period 1 September to 31 December.", explanation: `4/12 × ${fmt(prof1)} = ${fmt(per1[1].profit)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: per1[0].calc.residual, wrong: [per1[0].profit, r2(per1[0].profit - per1[0].calc.lines[1].salary)], stem: "Calculate the residual profit for the period 1 January to 31 August.", explanation: `Profit ${fmt(per1[0].profit)}; salary ${fmt(per1[0].calc.lines[1].salary)}; interest ${fmt(per1[0].calc.lines[0].interestOnCapital)} + ${fmt(per1[0].calc.lines[1].interestOnCapital)}; residual = ${fmt(per1[0].calc.residual)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: per1[1].calc.residual, wrong: [per1[1].profit, r2(per1[1].calc.residual - per1[1].calc.lines[2].interestOnCapital)], stem: "Calculate the residual profit for the period 1 September to 31 December.", explanation: `Profit ${fmt(per1[1].profit)}; salary ${fmt(per1[1].calc.lines[1].salary)}; interest ${fmt(per1[1].calc.lines[0].interestOnCapital)} + ${fmt(per1[1].calc.lines[1].interestOnCapital)} + ${fmt(per1[1].calc.lines[2].interestOnCapital)}; residual = ${fmt(per1[1].calc.residual)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: sTot, wrong: [per1[1].calc.lines[0].total, r2(sTot - per1[0].calc.lines[0].residualShare)], stem: "Calculate Sipho's total share of profit for the year (interest and residual).", explanation: `Period 1: interest ${fmt(per1[0].calc.lines[0].interestOnCapital)} + share ${fmt(per1[0].calc.lines[0].residualShare)}; period 2: interest ${fmt(per1[1].calc.lines[0].interestOnCapital)} + share ${fmt(per1[1].calc.lines[0].residualShare)}; total ${fmt(sTot)}.` }),
    ],
    hints: ["Apportion profit 8/12 and 4/12.", "Interest and salary are apportioned too."],
    explanation: "This item tests the two-period appropriation of a partnership that admits a partner.",
  });

  // Structured 2 (16 marks): retirement mid-year
  let spec2 = null;
  for (let p = 78000; p < 80000; p += 2) {
    const per2 = twoPeriod(p, [
      { months: 6, partners: [{ name: "Nyasha", capital: 50000, intPct: 4, share: 3 }, { name: "Farai", salary: 6600, capital: 40000, intPct: 4, share: 2 }, { name: "Chipo", capital: 22000, intPct: 4, share: 1 }] },
      { months: 6, partners: [{ name: "Nyasha", capital: 50000, intPct: 4, share: 1 }, { name: "Farai", salary: 6600, capital: 40000, intPct: 4, share: 1 }] },
    ]);
    const ok = per2.every((x) => nice(x.calc.residual) && x.calc.lines.every((l) => nice(l.residualShare)));
    if (ok) { spec2 = { p, per2 }; break; }
  }
  if (!spec2) throw new Error("no clean S2");
  const { p: prof2, per2 } = spec2;
  const nTot = r2(per2[0].calc.lines[0].total + per2[1].calc.lines[0].total);
  const cTot = per2[0].calc.lines[2].total;
  const rows = [
    ["**Profit (6 months each)**", per2[0].profit, per2[1].profit, prof2],
    ["Salary: Farai", per2[0].calc.lines[1].salary, per2[1].calc.lines[1].salary, r2(per2[0].calc.lines[1].salary + per2[1].calc.lines[1].salary)],
    ["Interest on capital: Nyasha", per2[0].calc.lines[0].interestOnCapital, per2[1].calc.lines[0].interestOnCapital, r2(per2[0].calc.lines[0].interestOnCapital + per2[1].calc.lines[0].interestOnCapital)],
    ["Interest on capital: Farai", per2[0].calc.lines[1].interestOnCapital, per2[1].calc.lines[1].interestOnCapital, r2(per2[0].calc.lines[1].interestOnCapital + per2[1].calc.lines[1].interestOnCapital)],
    ["Interest on capital: Chipo", per2[0].calc.lines[2].interestOnCapital, "", per2[0].calc.lines[2].interestOnCapital],
    ["**Residual profit**", per2[0].calc.residual, per2[1].calc.residual, r2(per2[0].calc.residual + per2[1].calc.residual)],
    ["Share: Nyasha", per2[0].calc.lines[0].residualShare, per2[1].calc.lines[0].residualShare, r2(per2[0].calc.lines[0].residualShare + per2[1].calc.lines[0].residualShare)],
    ["Share: Farai", per2[0].calc.lines[1].residualShare, per2[1].calc.lines[1].residualShare, r2(per2[0].calc.lines[1].residualShare + per2[1].calc.lines[1].residualShare)],
    ["Share: Chipo", per2[0].calc.lines[2].residualShare, "", per2[0].calc.lines[2].residualShare],
  ];
  const model = table(["Appropriation account, year ended 31 December 2026", "1 Jan to 30 Jun", "1 Jul to 31 Dec", "Year"], rows, ["l", "r", "r", "r"]);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Nyasha, Farai and Chipo are partners with fixed capitals of ${money(50000)}, ${money(40000)} and ${money(22000)}. Interest on capital is 4% a year and Farai receives a salary of ${money(6600)} a year. Residual profits are shared 3 : 2 : 1. Chipo retires on 30 June 2026. From 1 July Nyasha and Farai share residual profits equally and the other terms are unchanged. Profit for the year ended 31 December 2026 was ${money(prof2)}, earned evenly.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: per2[0].calc.residual, wrong: [per2[0].profit, r2(per2[0].calc.residual + per2[0].calc.lines[2].interestOnCapital)], stem: "Calculate the residual profit for the six months to 30 June.", explanation: `Profit ${fmt(per2[0].profit)}; salary ${fmt(per2[0].calc.lines[1].salary)}; interest ${fmt(per2[0].calc.lines[0].interestOnCapital)} + ${fmt(per2[0].calc.lines[1].interestOnCapital)} + ${fmt(per2[0].calc.lines[2].interestOnCapital)}; residual ${fmt(per2[0].calc.residual)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: cTot, wrong: [per2[0].calc.lines[2].residualShare, r2(cTot * 2)], stem: "Calculate Chipo's total share of profit for the six months (interest plus residual).", explanation: `Interest ${fmt(per2[0].calc.lines[2].interestOnCapital)} + 1/6 × ${fmt(per2[0].calc.residual)} = ${fmt(cTot)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: per2[1].calc.residual, wrong: [per2[1].profit, r2(per2[1].calc.residual - per2[1].calc.lines[1].interestOnCapital)], stem: "Calculate the residual profit for the six months to 31 December.", explanation: `Profit ${fmt(per2[1].profit)}; salary ${fmt(per2[1].calc.lines[1].salary)}; interest ${fmt(per2[1].calc.lines[0].interestOnCapital)} + ${fmt(per2[1].calc.lines[1].interestOnCapital)}; residual ${fmt(per2[1].calc.residual)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: nTot, wrong: [per2[0].calc.lines[0].total, r2(nTot - per2[0].calc.lines[0].interestOnCapital)], stem: "Calculate Nyasha's total share of profit for the year.", explanation: `Period 1: ${fmt(per2[0].calc.lines[0].total)}; period 2: ${fmt(per2[1].calc.lines[0].total)}; total ${fmt(nTot)}.` }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year in two columns.", points: ["Headings with the two periods and the profit apportioned", "Salary and interest on capital for each partner and period, Chipo for six months only", "Residual shared 3 : 2 : 1 and then equally, with totals agreeing"], modelAnswer: model, explanation: "One mark per point; follow-through allowed." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why Chipo receives no interest on capital for the second period.", points: ["He ceased to be a partner on 30 June", "Interest on capital is an appropriation for partners, so it stops when he leaves"], modelAnswer: "Chipo retired on 30 June, so after that date he is not a partner and has no right to interest on capital or a profit share.", explanation: "One mark each." }),
    ],
    hints: ["Divide the profit 6/12 each.", "Chipo shares only the first period; after that the ratio is 1 : 1."],
    explanation: "This item tests a two-period appropriation account in which a partner retires during the year.",
  });
  void check;
  void sum;

  b.card("DEFINITION", "What is **time apportionment**?", "Dividing a figure for the year between periods in proportion to the months in each.");
  b.card("FACT", "Mid-year change: profit", "Time-apportion profit by months unless the question gives separate profits for each period.");
  b.card("FACT", "Mid-year change: salary and interest", "Apportion each salary and each interest on capital by the months for which the terms applied.");
  b.card("FACT", "New partner's entitlement", "Interest and profit share run only from the date of admission.");
  b.card("FACT", "Residual profit in a year with a change", "Share each period's residual in the ratio of that period; do not combine first.");
  b.card("FACT", "Goodwill with fixed capitals", "Entries are made in the partners' current accounts at the date of the change.");
  b.card("CONCEPT", "Why count the months carefully?", "Every apportioned figure depends on the number of months in each period.");
  b.card("FORMULA", "Interest on capital for part of a year", "Capital × rate × months ÷ 12.");
  b.card("CONCEPT", "Assumption when profit is not given by period", "State that profit accrued evenly through the year.");
});
