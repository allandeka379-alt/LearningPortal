// W3b: ZIMSEC Paper 2 exam-format items (20 marks): (1) full sole trader statements from a trial balance with
// adjustments; (2) departmental income statement with apportionment and a closure decision.
import { concept, P, money, sum, r2, check, ZIM } from "../lib.mjs";
import { soleTrader, departmental, apportion, TERMS, table, U, fmt } from "../tables/w3b-lib.mjs";

const withCapital = (rows) => {
  const d = sum(rows.map((r) => r[1] ?? 0));
  const c = sum(rows.map((r) => r[2] ?? 0));
  if (d - c <= 0) throw new Error("capital would be negative");
  return [...rows, ["Capital", null, r2(d - c), "capital"]];
};

concept("acc.statements.adjusted-statements", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // -------------------------------------------------------------------------------------------------------------
  // Item 1: Tatenda Moyo, Gweru hardware: full statements from a trial balance with adjustments (ZIMSEC terms)
  {
    const rows = withCapital([
      ["Sales", null, 184600, "revenue"], ["Sales returns", 2350, null, "salesReturns"], ["Purchases", 121480, null, "purchases"], ["Purchases returns", null, 1920, "purchReturns"],
      ["Carriage inwards", 1640, null, "carriageIn"], ["Stock at 1 January 2025", 15730, null, "openInv"],
      ["Wages", 18900, null, "expense"], ["Rates", 3600, null, "expense"], ["Insurance", 2280, null, "expense"], ["Electricity", 2870, null, "expense"], ["Carriage outwards", 1450, null, "expense"],
      ["Bad debts", 595, null, "badDebts"], ["Rent received", null, 4200, "income"],
      ["Motor vehicles", 36000, null, "nca"], ["Provision for depreciation: motor vehicles", null, 14720, "accdep:Motor vehicles"],
      ["Fixtures and fittings", 14800, null, "nca"], ["Provision for depreciation: fixtures and fittings", null, 5920, "accdep:Fixtures and fittings"],
      ["Trade receivables (debtors)", 16800, null, "receivables"], ["Provision for doubtful debts", null, 520, "allowance"],
      ["Bank", 4365, null, "current"], ["Cash", 425, null, "current"], ["Trade payables (creditors)", null, 12740, "payables"], ["Drawings", 14600, null, "drawings"],
    ]);
    const depMV = r2((36000 - 14720) * 0.2), depFF = r2(14800 * 0.1);
    const newProv = r2((16800 - 800) * 0.05);
    const st = soleTrader({
      name: "Tatenda Moyo", terms: TERMS.ZIM, revenueLabel: "Sales", rows,
      adj: { closeInv: 17460, dep: { "Motor vehicles": depMV, "Fixtures and fittings": depFF }, accrued: [["Wages", 685]], prepaid: [["Rates", 265]], writeOff: 800, allowance: newProv, goodsDrawn: 900, incomeDue: [["Rent received", 375]] },
    });
    const f = st.figures;
    check("prov", newProv, 800);
    const cap = rows.at(-1)[2];
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
      concepts: ["acc.statements.adjusted-statements", "acc.statements.income-statement", "acc.statements.financial-position"],
      stem: `Tatenda Moyo owns a hardware shop in Gweru. His trial balance at 31 December 2025 was:\n\n${st.tb.md}\n\nAdditional information at 31 December 2025:\n\n1. Stock was valued at ${money(17460)}.\n2. Motor vehicles are depreciated at 20% per annum on the reducing balance; fixtures and fittings at 10% per annum on cost.\n3. Wages of ${money(685)} were owing and rates of ${money(265)} were prepaid.\n4. A debt of ${money(800)} is to be written off as bad. The provision for doubtful debts is to be 5% of the remaining debtors.\n5. Tatenda took goods costing ${money(840)} for his own use.\n6. Rent receivable of ${money(375)} for December 2025 had not been received.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: st.is.cos, wrong: [r2(st.is.cos + 840)], stem: "Calculate the cost of sales.", explanation: `15,730 + 121,480 + 1,640 − 1,920 − 840 (goods taken) − 17,460 = ${fmt(st.is.cos)}. Forgetting the goods taken gives ${fmt(r2(st.is.cos + 840))}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: st.is.gp, stem: "Calculate the gross profit.", explanation: `Net sales 184,600 − 2,350 = ${fmt(st.is.netRev)}; − ${fmt(st.is.cos)} = ${fmt(st.is.gp)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: f.allowChange, wrong: [newProv], stem: "Calculate the increase in the provision for doubtful debts.", explanation: `5% × (16,800 − 800) = ${fmt(newProv)}; increase ${fmt(newProv)} − 520 = ${fmt(f.allowChange)}.` }),
        P.num({ label: "(d)", marks: 4, kind: "money", value: st.is.np, wrong: [r2(st.is.np - 375), r2(st.is.np + f.allowChange - newProv)], stem: "Calculate the net profit for the year ended 31 December 2025.", explanation: `Other income: rent received ${fmt(f.otherIncome[0][1])}. Expenses: ${f.expenses.map(([l, a]) => `${l.toLowerCase()} ${fmt(a)}`).join("; ")}; total ${fmt(st.is.totExp)}. Net profit ${fmt(st.is.gp)} + ${fmt(st.is.totOther)} − ${fmt(st.is.totExp)} = ${fmt(st.is.np)}.` }),
        P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare Tatenda's statement of financial position at 31 December 2025.", points: [
          "Correct heading with date",
          `Motor vehicles 36,000 − ${fmt(r2(14720 + depMV))} = ${fmt(r2(36000 - 14720 - depMV))}`,
          `Fixtures and fittings 14,800 − ${fmt(r2(5920 + depFF))} = ${fmt(r2(14800 - 5920 - depFF))}`,
          `Stock 17,460; debtors 16,000 less provision ${fmt(newProv)}`,
          "Prepaid rates 265 and accrued rent receivable 375 as current assets; bank 4,365 and cash 425",
          `Creditors 12,740 and accrued wages 685; working capital ${fmt(st.sofp.wc)}`,
          `Drawings 14,600 + 840 = ${fmt(f.drawings)}`,
          `Capital ${fmt(cap)} + net profit (own figure) − drawings = ${fmt(st.sofp.closing)}, agreeing with net assets`,
        ], modelAnswer: st.sofp.md, explanation: "Each note appears once in each statement." }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: st.sofp.wc, wrong: [r2(st.sofp.wc - 265 - 375)], stem: "Calculate the working capital at 31 December 2025.", explanation: `Current assets ${fmt(st.sofp.totCA)} − current liabilities ${fmt(st.sofp.totCL)} = ${fmt(st.sofp.wc)}.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Name the accounting concept that requires a provision for doubtful debts and explain it.", points: ["Prudence", "Losses that are likely are provided for / assets are not overstated and profits not overstated"], modelAnswer: "Prudence: the accounts must not overstate assets or profit, so a likely loss from debtors who may not pay is provided for now.", explanation: "Prudence (conservatism)." }),
      ],
      hints: ["Tick each note twice: once in the income statement and once in the statement of financial position.", "Goods taken by the owner reduce purchases and increase drawings."],
      explanation: `Model answers:\n\n${st.is.md}\n\n${st.sofp.md}`,
    });
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 2: Thandeka Ndlovu, Bulawayo clothing and footwear store: departmental accounts
  {
    const rev = [126000, 54000];
    const staff = [5, 3], area = [640, 360];
    const rent = r2(15200 + 400);
    const d = {
      name: "Thandeka Ndlovu", depts: ["Clothing", "Footwear"],
      revenue: rev, openInv: [11400, 6350], purchases: [84700, 39100], closeInv: [12900, 6800],
      expenses: [
        ["Sales staff wages", apportion(28800, staff)],
        ["Rent and rates", apportion(rent, area)],
        ["Advertising", apportion(3600, rev)],
        ["Electricity", apportion(4700, area)],
        ["Depreciation of fittings", apportion(r2(17000 * 0.1), [1, 1])],
      ],
    };
    const s = departmental(d);
    const F = 1;
    const saved = r2(d.expenses[0][1][F] + d.expenses[2][1][F]);
    const fall = r2(s.gp[F] - saved);
    check("footwear loss", s.np[F] < 0 ? 1 : 0, 1);
    const stim = table(["Item", `Clothing ${U}`, `Footwear ${U}`], [["Sales", 126000, 54000], ["Stock at 1 January 2025", 11400, 6350], ["Purchases", 84700, 39100], ["Stock at 31 December 2025", 12900, 6800]]);
    const marg = (s.gp[0] / rev[0]) * 100;
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
      concepts: ["acc.statements.departmental"],
      stem: `Thandeka Ndlovu runs a store in Bulawayo with two departments, Clothing and Footwear. For the year ended 31 December 2025:\n\n${stim}\n\nExpenses for the whole store were: sales staff wages ${money(28800)}; rent and rates ${money(15200)}; advertising ${money(3600)}; electricity ${money(4700)}. Additional information:\n\n1. Rent of ${money(400)} was owing at 31 December 2025.\n2. Fittings costing ${money(17000)} are depreciated at 10% per annum on cost, shared equally.\n3. Bases of apportionment: wages by number of staff (Clothing 5, Footwear 3); rent and rates and electricity by floor area (Clothing 640 m², Footwear 360 m²); advertising in proportion to sales.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: d.expenses[1][1][0], wrong: [r2(15200 * 0.64)], stem: "Calculate the rent and rates charged to the Clothing department.", explanation: `(15,200 + 400) × 640 ÷ 1,000 = ${fmt(d.expenses[1][1][0])}. Forgetting the accrual gives ${fmt(r2(15200 * 0.64))}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: s.gp[F], wrong: [r2(54000 - 39100)], stem: "Calculate the gross profit of the Footwear department.", explanation: `Cost of sales 6,350 + 39,100 − 6,800 = ${fmt(s.cos[F])}; 54,000 − ${fmt(s.cos[F])} = ${fmt(s.gp[F])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s.np[0], stem: "Calculate the net profit of the Clothing department.", explanation: `Gross profit ${fmt(s.gp[0])} − expenses ${fmt(s.te[0])} = ${fmt(s.np[0])}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: -s.np[F], stem: "Calculate the net loss of the Footwear department (enter the amount of the loss).", explanation: `Gross profit ${fmt(s.gp[F])} − expenses ${fmt(s.te[F])} = loss of ${fmt(-s.np[F])}.` }),
        P.num({ label: "(e)", marks: 1, kind: "money", value: s.totals.np, stem: "Calculate the net profit of the store as a whole.", explanation: `${fmt(s.np[0])} − ${fmt(-s.np[F])} = ${fmt(s.totals.np)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "pct", value: marg, wrong: [r2((s.gp[0] / s.cos[0]) * 100)], stem: "Calculate the gross profit margin of the Clothing department to one decimal place.", explanation: `${fmt(s.gp[0])} ÷ 126,000 × 100 = ${marg.toFixed(1)}%. Dividing by cost of sales gives the mark-up instead.` }),
        P.manual({ label: "(g)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the departmental income statement for the year ended 31 December 2025 in columnar form, with a total column.", points: ["Heading and Clothing / Footwear / Total columns", `Cost of sales ${fmt(s.cos[0])} and ${fmt(s.cos[F])}`, `Gross profit ${fmt(s.gp[0])} and ${fmt(s.gp[F])}`, "Wages and advertising correctly apportioned", "Rent (with accrual), electricity and depreciation correctly apportioned", `Net profit ${fmt(s.np[0])}, net loss (${fmt(-s.np[F])}), total ${fmt(s.totals.np)}`], modelAnswer: s.md, explanation: "Every column adds down and every row adds across." }),
        P.manual({ label: "(h)", marks: 3, stem: "Thandeka wants to close the Footwear department. Its staff and advertising costs would be saved; rent, electricity and depreciation would continue. Advise her, with a calculation.", points: [`Costs saved ${fmt(saved)} (wages ${fmt(d.expenses[0][1][F])} + advertising ${fmt(d.expenses[2][1][F])})`, `Gross profit lost ${fmt(s.gp[F])}, so total net profit would fall by ${fmt(fall)}`, "Advice: keep Footwear open (or improve its margin / reduce its costs)"], modelAnswer: `Closing Footwear saves only ${fmt(saved)} but loses gross profit of ${fmt(s.gp[F])}, so the store's net profit would fall by ${fmt(fall)} to ${fmt(r2(s.totals.np - fall))}. She should keep it open and try to raise its margin.`, explanation: "Compare gross profit lost with costs saved." }),
      ],
      hints: ["Add the rent owing before apportioning.", "Shared costs that continue after closure are not saved."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }
});
