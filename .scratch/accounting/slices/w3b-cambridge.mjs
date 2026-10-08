// W3b: Cambridge 0452 Paper 2 exam-format items (20 marks): (1) full sole trader statements from a trial balance with
// adjustments, ending with an advise part; (2) manufacturing account and statement of profit or loss, ending with a
// make-or-buy evaluation.
import { concept, P, money, sum, r2, check, CAM } from "../lib.mjs";
import { soleTrader, manufacturing, incomeStatement, TERMS, fmt } from "../tables/w3b-lib.mjs";
import { trialBalance } from "../lib.mjs";

const withCapital = (rows) => {
  const d = sum(rows.map((r) => r[1] ?? 0));
  const c = sum(rows.map((r) => r[2] ?? 0));
  if (d - c <= 0) throw new Error("capital would be negative");
  return [...rows, ["Capital", null, r2(d - c), "capital"]];
};

concept("acc.statements.adjusted-statements", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // -------------------------------------------------------------------------------------------------------------
  // Item 1: Rudo Sibanda, Harare stationery wholesaler
  {
    const K = { pr: 1270, ins: 1880, gen: 1415, disc: 845, eq: 23000, eqAcc: 9200, van: 28000, vanAcc: 12900, allow0: 395, loan: 6800, recv: 13900, wo: 580, prep: 355, adv: 280, gd: 765, inv: 13940, bank: 3870, pay: 10560, comm: 2700, intPaid: 480, bd: 430 };
    const rows = withCapital([
      ["Revenue", null, 142800, "revenue"], ["Sales returns", 1980, null, "salesReturns"], ["Purchases", 96350, null, "purchases"], ["Purchases returns", null, K.pr, "purchReturns"],
      ["Carriage inwards", 1120, null, "carriageIn"], ["Inventory at 1 January 2025", 12460, null, "openInv"],
      ["Wages", 15480, null, "expense"], ["Rent", 6600, null, "expense"], ["Insurance", K.ins, null, "expense"], ["Heating and lighting", 2340, null, "expense"], ["General expenses", K.gen, null, "expense"], ["Loan interest", K.intPaid, null, "expense"],
      ["Irrecoverable debts", K.bd, null, "badDebts"], ["Commission received", null, K.comm, "income"], ["Discount received", null, K.disc, "income"],
      ["Equipment", K.eq, null, "nca"], ["Accumulated depreciation: equipment", null, K.eqAcc, "accdep:Equipment"],
      ["Delivery van", K.van, null, "nca"], ["Accumulated depreciation: delivery van", null, K.vanAcc, "accdep:Delivery van"],
      ["Trade receivables", K.recv, null, "receivables"], ["Allowance for irrecoverable debts", null, K.allow0, "allowance"],
      ["Bank", K.bank, null, "current"], ["Trade payables", null, K.pay, "payables"], ["Loan (long-term)", null, K.loan, "loan"], ["Drawings", 12800, null, "drawings"],
    ]);
    const depE = r2(K.eq * 0.1), depV = r2((K.van - K.vanAcc) * 0.25);
    const intYear = r2(K.loan * 0.08);
    const intDue = r2(intYear - K.intPaid);
    const newAllow = r2((K.recv - K.wo) * 0.05);
    const st = soleTrader({
      name: "Rudo Sibanda", terms: TERMS.CAM, rows,
      adj: { closeInv: K.inv, dep: { Equipment: depE, "Delivery van": depV }, accrued: [["Loan interest", intDue]], prepaid: [["Insurance", K.prep]], incomeAdvance: [["Commission received", K.adv]], writeOff: K.wo, allowance: newAllow, goodsDrawn: K.gd },
    });
    const f = st.figures;
    const cr = st.sofp.totCA / st.sofp.totCL;
    const at = (st.sofp.totCA - K.inv) / st.sofp.totCL;
    const atAfter = (st.sofp.totCA - K.inv - K.bank) / (st.sofp.totCL + K.loan - K.bank);
    const exp = Object.fromEntries(f.expenses);
    const oth = Object.fromEntries(f.otherIncome);
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
      concepts: ["acc.statements.adjusted-statements", "acc.statements.income-statement", "acc.statements.financial-position"],
      stem: `Rudo Sibanda is a stationery wholesaler in Harare. Her trial balance at 31 December 2025 was:\n\n${st.tb.md}\n\nAdditional information at 31 December 2025:\n\n1. Inventory was valued at ${money(K.inv)}.\n2. Equipment is depreciated at 10% per annum on cost and the delivery van at 25% per annum on the reducing balance.\n3. The loan was taken out on 1 January 2025 at 8% interest per annum.\n4. Insurance of ${money(K.prep)} was prepaid. Commission received included ${money(K.adv)} for January 2026.\n5. A debt of ${money(K.wo)} is irrecoverable. The allowance for irrecoverable debts is to be 5% of the remaining trade receivables.\n6. Rudo took goods costing ${money(K.gd)} for her own use.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: st.is.gp, wrong: [r2(st.is.gp - K.gd)], stem: "Calculate the gross profit.", explanation: `Cost of sales 12,460 + 96,350 + 1,120 − ${fmt(K.pr)} − ${fmt(K.gd)} − ${fmt(K.inv)} = ${fmt(st.is.cos)}; gross profit (142,800 − 1,980) − ${fmt(st.is.cos)} = ${fmt(st.is.gp)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: f.allowChange, wrong: [newAllow], stem: "Calculate the increase in the allowance for irrecoverable debts.", explanation: `5% × (${fmt(K.recv)} − ${fmt(K.wo)}) = ${fmt(newAllow)}; increase ${fmt(newAllow)} − ${fmt(K.allow0)} = ${fmt(f.allowChange)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: st.is.np, wrong: [r2(st.is.np + intDue), r2(st.is.np + K.adv)], stem: "Calculate the profit for the year.", explanation: `Other income: commission ${fmt(K.comm)} − ${fmt(K.adv)} = ${fmt(oth["Commission received"])}; discount received ${fmt(K.disc)}. Expenses: loan interest ${fmt(K.intPaid)} + ${fmt(intDue)} = ${fmt(exp["Loan interest"])}; insurance ${fmt(K.ins)} − ${fmt(K.prep)} = ${fmt(exp.Insurance)}; irrecoverable debts ${fmt(K.bd)} + ${fmt(K.wo)} = ${fmt(exp["Irrecoverable debts"])}; allowance increase ${fmt(f.allowChange)}; depreciation ${fmt(depE)} + ${fmt(depV)}; plus wages, rent, heating and lighting and general expenses; total ${fmt(st.is.totExp)}. Profit ${fmt(st.is.gp)} + ${fmt(st.is.totOther)} − ${fmt(st.is.totExp)} = ${fmt(st.is.np)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: st.sofp.totCL, wrong: [K.pay], stem: "Calculate the total current liabilities at 31 December 2025.", explanation: `Trade payables ${fmt(K.pay)} + other payables: loan interest ${fmt(intDue)} + commission in advance ${fmt(K.adv)} = ${fmt(st.sofp.totCL)}. The loan is a non-current liability.` }),
        P.manual({ label: "(e)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare Rudo's statement of financial position at 31 December 2025.", points: [
          "Correct heading with date",
          `Equipment ${fmt(K.eq)} − ${fmt(r2(K.eqAcc + depE))}; delivery van ${fmt(K.van)} − ${fmt(r2(K.vanAcc + depV))}; total net book value ${fmt(st.sofp.totNbv)}`,
          `Inventory ${fmt(K.inv)}; trade receivables ${fmt(r2(K.recv - K.wo))} less allowance ${fmt(newAllow)}`,
          `Other receivables ${fmt(K.prep)} and bank ${fmt(K.bank)}`,
          `Current liabilities ${fmt(st.sofp.totCL)}; loan ${fmt(K.loan)} as a non-current liability`,
          `Drawings 12,800 + ${fmt(K.gd)} = ${fmt(f.drawings)}`,
          `Capital + profit (own figure) − drawings = ${fmt(st.sofp.closing)}, agreeing with net assets`,
        ], modelAnswer: st.sofp.md, explanation: "Every note is used in both statements." }),
        P.num({ label: "(f)", marks: 1, kind: "ratio", value: cr, stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `${fmt(st.sofp.totCA)} ÷ ${fmt(st.sofp.totCL)} = ${cr.toFixed(2)} : 1.` }),
        P.num({ label: "(g)", marks: 1, kind: "ratio", value: at, wrong: [r2(cr)], stem: "Calculate the acid test (liquid) ratio, as x : 1 to two decimal places.", explanation: `(${fmt(st.sofp.totCA)} − ${fmt(K.inv)}) ÷ ${fmt(st.sofp.totCL)} = ${at.toFixed(2)} : 1.` }),
        P.manual({ label: "(h)", marks: 3, stem: `Rudo's lender has offered her a small discount if she repays the whole loan of ${money(K.loan)} now. Advise Rudo whether she should do so. Justify your answer using figures from the statements.`, points: [`Bank balance ${fmt(K.bank)} is far less than ${fmt(K.loan)}: repayment would need an overdraft or the sale of assets`, `Paying with the whole bank balance plus an overdraft would cut the acid test from ${at.toFixed(2)} : 1 to about ${atAfter.toFixed(2)} : 1, leaving too little to pay trade payables of ${fmt(K.pay)}`, `Conclusion: do not repay now (or repay part later when receivables are collected); the interest of ${fmt(intYear)} a year is easily covered by a profit of ${fmt(st.is.np)}`], modelAnswer: `She should not repay the loan now. Her bank balance is only ${money(K.bank)}, about half of the ${money(K.loan)} needed, so she would have to use all her cash and borrow the rest on overdraft. Her acid test would fall from ${at.toFixed(2)} : 1 to about ${atAfter.toFixed(2)} : 1, and she could struggle to pay trade payables of ${money(K.pay)}. The interest of ${money(intYear)} a year is easily covered by her profit of ${money(st.is.np)}. She could repay part of the loan later, once more receivables have been collected.`, explanation: "Use liquidity figures and the interest cost." }),
      ],
      hints: ["Deal with every note twice.", "Interest for the full year is 8% of the loan; compare with the amount paid."],
      explanation: `Model answers:\n\n${st.is.md}\n\n${st.sofp.md}`,
    });
    check("acid after repayment", atAfter < 1 ? 1 : 0, 1);
  }

  // -------------------------------------------------------------------------------------------------------------
  // Item 2: Tatenda Zulu, Bulawayo leather school bags: manufacturing account and statement of profit or loss
  {
    const tbRows = [
      ["Revenue", null, 196500], ["Inventory of raw materials at 1 January 2025", 7240, null], ["Work in progress at 1 January 2025", 4860, null], ["Inventory of finished goods at 1 January 2025", 12350, null],
      ["Purchases of raw materials", 64780, null], ["Carriage inwards on raw materials", 1320, null], ["Direct wages", 43600, null], ["Factory supervisor's wages", 10400, null],
      ["Rent", 16800, null], ["Electricity", 8460, null], ["Office salaries", 18250, null], ["Selling expenses", 5940, null],
      ["Factory machinery", 45000, null], ["Accumulated depreciation: factory machinery", null, 13950], ["Office furniture", 8000, null], ["Accumulated depreciation: office furniture", null, 2000],
      ["Trade receivables", 19700, null], ["Trade payables", null, 11280], ["Bank", 6130, null], ["Drawings", 23500, null],
    ];
    const cap = r2(sum(tbRows.map((r) => r[1] ?? 0)) - sum(tbRows.map((r) => r[2] ?? 0)));
    tbRows.push(["Capital", null, cap]);
    const tb = trialBalance("Tatenda Zulu: Trial balance at 31 December 2025", tbRows);
    const rent = [r2((16800 * 2) / 3), r2(16800 / 3)];
    const elecAdj = r2(8460 + 540);
    const elec = [r2(elecAdj * 0.75), r2(elecAdj * 0.25)];
    const depM = r2(45000 * 0.2), depO = r2(8000 * 0.1);
    const m = manufacturing({ name: "Tatenda Zulu", rawOpen: 7240, rawPurch: 64780, rawCarriage: 1320, rawClose: 8110, directLabour: 43600, overheads: [["Factory supervisor's wages", 10400], ["Rent (2/3)", rent[0]], ["Electricity (3/4)", elec[0]], ["Depreciation: factory machinery", depM]], wipOpen: 4860, wipClose: 5240 });
    const is = incomeStatement({ name: "Tatenda Zulu", terms: TERMS.CAM, revenue: 196500, openInv: 12350, openInvLabel: "Opening inventory of finished goods", cos: [["Add: Production cost of goods completed", m.production]], closeInv: 13970, closeInvLabel: "Less: Closing inventory of finished goods", expenses: [["Office salaries", 18250], ["Rent (1/3)", rent[1]], ["Electricity (1/4)", elec[1]], ["Selling expenses", 5940], ["Depreciation: office furniture", depO]] });
    const units = 4000;
    const perUnit = m.production / units;
    const offer = 34;
    const fixedOH = r2(10400 + rent[0] + depM);
    const variable = r2(m.production - fixedOH) / units;
    if (!(offer < perUnit && offer > variable)) throw new Error(`offer ${offer} not between ${variable} and ${perUnit}`);
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
      concepts: ["acc.manufacturing.accounts", "acc.manufacturing.costs"],
      stem: `Tatenda Zulu makes leather school bags in Bulawayo. His trial balance at 31 December 2025 was:\n\n${tb.md}\n\nAdditional information at 31 December 2025:\n\n1. Inventories: raw materials ${money(8110)}; work in progress ${money(5240)}; finished goods ${money(13970)}.\n2. Rent is shared two-thirds factory, one-third office. Electricity is shared three-quarters factory, one-quarter office.\n3. Electricity of ${money(540)} was owing.\n4. Factory machinery is depreciated at 20% per annum on cost; office furniture at 10% per annum on cost.\n5. ${fmt(units)} bags were completed during the year.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m.consumed, wrong: [r2(m.consumed - 1320)], stem: "Calculate the cost of raw materials consumed.", explanation: `7,240 + 64,780 + 1,320 − 8,110 = ${fmt(m.consumed)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: m.prime, stem: "Calculate the prime cost.", explanation: `${fmt(m.consumed)} + 43,600 = ${fmt(m.prime)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: m.totOH, wrong: [r2(m.totOH - r2(540 * 0.75))], stem: "Calculate the total factory overheads.", explanation: `Supervisor 10,400 + rent ${fmt(rent[0])} + electricity (8,460 + 540) × 3/4 = ${fmt(elec[0])} + depreciation ${fmt(depM)} = ${fmt(m.totOH)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: m.production, wrong: [r2(m.factoryCost - 4860 + 5240)], stem: "Calculate the production cost of goods completed.", explanation: `${fmt(m.prime)} + ${fmt(m.totOH)} + 4,860 − 5,240 = ${fmt(m.production)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: is.gp, stem: "Calculate the gross profit.", explanation: `Cost of sales 12,350 + ${fmt(m.production)} − 13,970 = ${fmt(is.cos)}; 196,500 − ${fmt(is.cos)} = ${fmt(is.gp)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: is.np, stem: "Calculate the profit for the year.", explanation: `Expenses: office salaries 18,250 + rent ${fmt(rent[1])} + electricity ${fmt(elec[1])} + selling 5,940 + depreciation ${fmt(depO)} = ${fmt(is.totExp)}; ${fmt(is.gp)} − ${fmt(is.totExp)} = ${fmt(is.np)}.` }),
        P.manual({ label: "(g)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare Tatenda's manufacturing account for the year ended 31 December 2025.", points: ["Correct three-line heading", `Raw materials consumed ${fmt(m.consumed)} including carriage inwards`, `Prime cost ${fmt(m.prime)}`, `Rent ${fmt(rent[0])} and electricity ${fmt(elec[0])} (factory shares, accrual included)`, `Supervisor's wages and depreciation ${fmt(depM)}; total overheads ${fmt(m.totOH)}`, `Work in progress adjusted; production cost of goods completed ${fmt(m.production)}`], modelAnswer: m.md, explanation: "Shared costs: factory share only." }),
        P.manual({ label: "(h)", marks: 3, stem: `A supplier in Harare offers to supply identical bags at ${money(offer)} each. Tatenda's production cost per bag is ${money(r2(perUnit))} (to the nearest cent). The supervisor's wages, factory rent and machinery depreciation would continue if he stopped making bags. Advise Tatenda whether to accept the offer.`, points: ["Buying looks cheaper per bag than the full production cost", `But fixed factory costs of ${fmt(fixedOH)} continue, so the cost actually saved per bag is only about ${money(r2(variable))}, less than ${money(offer)}`, "Conclusion: continue to make the bags (also consider quality, reliability of supply, staff)"], modelAnswer: `He should keep making the bags. The offer of ${money(offer)} is below the full cost of ${money(r2(perUnit))}, but supervisor's wages, factory rent and depreciation (${money(fixedOH)}) would still be paid. Only about ${money(r2(variable))} per bag would be saved, so buying in would cost more than it saves. He would also lose control over quality and depend on one supplier.`, explanation: "Compare the buying price with the costs that would actually be saved." }),
      ],
      hints: ["Adjust electricity for the accrual before splitting it.", "Finished goods inventories belong to the statement of profit or loss."],
      explanation: `Model answers:\n\n${m.md}\n\n${is.md}`,
    });
    check("perUnit", r2(perUnit) > offer ? 1 : 0, 1);
  }
});
