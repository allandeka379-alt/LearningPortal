// W3b Cambridge Paper 2 items: CAM_P2_Q1 (30 marks: company statements with a share issue) and two CAM_P2_SHORT (15 marks):
// (1) rights issue ledger accounts; (2) profitability and liquidity ratios with evaluation.
import { concept, P, EXAM, checkExam, CAM, fmt, chk, r2, table, tAccount, statement, trialBalance } from "../lib.mjs";
import { coYear, R, F, usd } from "../tables/w3b-lib.mjs";

const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.company.share-issue", { file: "exam/w3b-camp2", keyPrefix: "exam.w3b-camp2", applies: CAM }, (b) => {
  // ===================================================================================================
  // Item 1: CAM_P2_Q1, Kadoma Ceramics Ltd, year ended 30 June 2026
  {
    const Q = EXAM.CAM_P2_Q1;
    const t = { inv0: 43700, purch: 322600, dist: 38900, adm: 75300, intPaid: 3200, intDiv: 12600, land: 248000, equip: 262000, rec: 57400, bank: 64300 };
    const c = { sales: 531000, accDep: 70500, pay: 42300, sc: 310000, sp: 46000, loan: 64000 };
    const dr = t.inv0 + t.purch + t.dist + t.adm + t.intPaid + t.intDiv + t.land + t.equip + t.rec + t.bank;
    const re0 = r2(dr - (c.sales + c.accDep + c.pay + c.sc + c.sp + c.loan));
    chk(re0, 64200);
    const iss = { n: 70000, price: 1.55 };
    const prem = r2(iss.n * (iss.price - 1)), cash = r2(iss.n * iss.price);
    const tb = trialBalance("Kadoma Ceramics Ltd: trial balance at 30 June 2026", [
      ["Inventory at 1 July 2025", t.inv0, null], ["Purchases", t.purch, null], ["Sales", null, c.sales], ["Distribution expenses", t.dist, null], ["Administrative expenses", t.adm, null], ["Loan note interest paid", t.intPaid, null], ["Interim dividend paid", t.intDiv, null],
      ["Land and buildings at cost", t.land, null], ["Equipment at cost", t.equip, null], ["Accumulated depreciation of equipment", null, c.accDep], ["Trade receivables", t.rec, null], ["Bank", t.bank, null], ["Trade payables", null, c.pay],
      ["Ordinary shares of US\\$1 each", null, c.sc], ["Share premium", null, c.sp], ["10% loan notes", null, c.loan], ["Retained earnings at 1 July 2025", null, re0],
    ]);
    const invC = 47900, taxC = 14800, finalDiv = 9500;
    const cos = r2(t.inv0 + t.purch - invC), gp = r2(c.sales - cos);
    const dep = r2(t.equip * 0.15), admin = r2(t.adm + dep);
    const pfo = r2(gp - t.dist - admin), fin = r2(t.intPaid + 3200), pbt = r2(pfo - fin), profit = r2(pbt - taxC);
    const reC = r2(re0 + profit - t.intDiv - finalDiv);
    const equipNbv = r2(t.equip - c.accDep - dep), nca = r2(t.land + equipNbv), ca = r2(invC + t.rec + t.bank);
    const cl = r2(c.pay + 3200 + taxC + finalDiv), eq = r2(c.sc + c.sp + reC), assets = r2(nca + ca);
    chk(assets, eq + c.loan + cl);
    const splMd = statement("Kadoma Ceramics Ltd: statement of profit or loss for the year ended 30 June 2026", [
      ["Revenue", c.sales], ["Cost of sales", -cos], ["**Gross profit**", gp], ["Distribution costs", -t.dist], ["Administrative expenses", -admin], ["**Profit from operations**", pfo], ["Finance costs", -fin], ["**Profit before tax**", pbt], ["Income tax expense", -taxC], ["**Profit for the year**", profit],
    ], { cols: ["US\\$"], checks: [["gp", gp, c.sales - cos], ["profit", profit, gp - t.dist - admin - fin - taxC]] });
    const sofpMd = statement("Kadoma Ceramics Ltd: statement of financial position at 30 June 2026", [
      ["**Non-current assets**", null], ["Land and buildings", t.land], ["Equipment (carrying amount)", equipNbv], ["", nca],
      ["**Current assets**", null], ["Inventory", invC], ["Trade receivables", t.rec], ["Cash and cash equivalents", t.bank], ["", ca], ["**Total assets**", assets],
      ["**Equity**", null], ["Ordinary share capital", c.sc], ["Share premium", c.sp], ["Retained earnings", reC], ["", eq],
      ["**Non-current liabilities**", null], ["10% loan notes", c.loan],
      ["**Current liabilities**", null], ["Trade payables", c.pay], ["Accrued loan note interest", 3200], ["Income tax payable", taxC], ["Dividend payable", finalDiv], ["", cl],
      ["**Total equity and liabilities**", r2(eq + c.loan + cl)],
    ], { cols: ["US\\$"], checks: [["balance", assets, eq + c.loan + cl]] });
    const gear = (c.loan / (c.sc + c.sp + reC + c.loan)) * 100;
    b.struct({
      d: 5, examStyle: true, skill: Q.skill, secs: Q.secs, applies: Q.applies, calculator: true,
      paper: "Cambridge Paper 2", concepts: ["aacc.company.profit-or-loss", "aacc.company.share-issue", "aacc.company.share-capital-reserves", "aacc.company.loan-notes"],
      stem: `Kadoma Ceramics Ltd makes tiles and pottery. On 1 November 2025 it issued ${F(iss.n)} ordinary shares of US\\$1 each at US\\$${iss.price.toFixed(2)}, and all the proceeds were received in cash during the year. The trial balance below was extracted at 30 June 2026, the end of the financial year, after the share issue.\n\n${tb.md}\n\n**Information at 30 June 2026**\n\n| No. | Information |\n| --- | --- |\n| 1 | Inventory at 30 June 2026 was valued at US\\$${F(invC)}. |\n| 2 | Equipment is depreciated at 15% of its cost. Land and buildings are not depreciated. |\n| 3 | Loan note interest for the second half of the year, US\\$3,200, was owing. |\n| 4 | The income tax charge for the year is estimated at US\\$${F(taxC)}. |\n| 5 | A final dividend of US\\$${F(finalDiv)} was declared before the year end and remains unpaid. |\n\nGive percentages to one decimal place.`,
      parts: checkExam(Q, [
        P.group({ label: "(a)", stem: "For the share issue on 1 November 2025, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: prem, wrong: [cash, iss.n], stem: "the amount credited to the share premium account", explanation: `${F(iss.n)} × US\\$0.55 = ${usd(prem)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: cash, wrong: [prem, iss.n], stem: "the cash received", explanation: `${F(iss.n)} × US\\$${iss.price.toFixed(2)} = ${usd(cash)}.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: cos, wrong: [r2(t.purch), r2(t.inv0 + t.purch + invC)], stem: "cost of sales", explanation: `${F(t.inv0)} + ${F(t.purch)} - ${F(invC)} = ${usd(cos)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: dep, wrong: [r2((t.equip - c.accDep) * 0.15), r2((t.equip + t.land) * 0.15)], stem: "the depreciation charge for the year", explanation: `15% × ${F(t.equip)} = ${usd(dep)}.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: pfo, wrong: [pbt, gp], stem: "profit from operations", explanation: `Gross profit ${F(gp)} - distribution ${F(t.dist)} - administrative expenses ${F(admin)} (including depreciation ${F(dep)}) = ${usd(pfo)}.` }),
          P.num({ label: "(iv)", marks: 3, kind: "money", value: profit, wrong: [pbt, r2(pfo - taxC)], stem: "profit for the year", explanation: `${F(pfo)} - finance costs ${F(fin)} - tax ${F(taxC)} = ${usd(profit)}. Finance costs are interest paid ${F(t.intPaid)} plus the accrual ${F(3200)}.` }),
        ] }),
        P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year ended 30 June 2026 in a form suitable for publication.", points: ["Heading with the company name, the statement and the period", `Revenue ${F(c.sales)}, cost of sales ${F(cos)} and gross profit ${F(gp)}`, `Distribution costs ${F(t.dist)} and administrative expenses ${F(admin)}, giving profit from operations ${F(pfo)}`, `Finance costs ${F(fin)}, profit before tax ${F(pbt)}, income tax ${F(taxC)} and profit for the year ${F(profit)}`], modelAnswer: splMd, explanation: "One mark for each group of lines; allow follow-through." }),
        P.group({ label: "(d)", stem: "Calculate at 30 June 2026:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: nca, wrong: [r2(t.land + t.equip), r2(t.land + equipNbv + dep)], stem: "the carrying amount of non-current assets", explanation: `Land ${F(t.land)} + equipment (${F(t.equip)} - ${F(c.accDep + dep)}) ${F(equipNbv)} = ${usd(nca)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: cl, wrong: [r2(cl - finalDiv), r2(cl - 3200)], stem: "total current liabilities", explanation: `Trade payables ${F(c.pay)} + accrued interest ${F(3200)} + tax ${F(taxC)} + dividend payable ${F(finalDiv)} = ${usd(cl)}.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: reC, wrong: [r2(re0 + profit), r2(re0 + profit - t.intDiv)], stem: "retained earnings", explanation: `${F(re0)} + ${F(profit)} - interim dividend ${F(t.intDiv)} - final dividend ${F(finalDiv)} = ${usd(reC)}.` }),
        ] }),
        P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of financial position at 30 June 2026.", points: ["Heading and the grouping into non-current assets, current assets, equity, non-current liabilities and current liabilities", `Assets: non-current ${F(nca)}, current ${F(ca)} and total ${F(assets)}`, `Equity ${F(eq)}, loan notes ${F(c.loan)} and current liabilities ${F(cl)} total ${F(eq + c.loan + cl)}`], modelAnswer: sofpMd, explanation: "One mark each; allow follow-through." }),
        P.num({ label: "(f)", marks: 3, kind: "pct", value: gear, wrong: [(c.loan / (c.sc + c.sp + reC)) * 100, (c.loan / assets) * 100], stem: "Calculate gearing at 30 June 2026, using the Cambridge formula.", hints: ["Capital employed = shares + all reserves + non-current liabilities."], explanation: `${F(c.loan)} ÷ (${F(c.sc)} + ${F(c.sp)} + ${F(reC)} + ${F(c.loan)}) × 100 = ${p1(gear)}%.` }),
        P.manual({ label: "(g)", marks: 2, stem: "State two reasons why the directors may have preferred to issue shares instead of raising the money by borrowing.", points: ["No fixed interest has to be paid and there is no repayment date", "Gearing stays lower, so the financial risk is smaller"], modelAnswer: "A share issue carries no compulsory interest or repayment, and keeps gearing lower than more borrowing would.", explanation: "One mark for each valid reason." }),
      ]),
      hints: ["The trial balance is after the share issue.", "Finance costs include the accrued interest.", "Retained earnings are reduced by both dividends."],
      explanation: "This Cambridge Paper 2 style question asks for the share issue, the statement of profit or loss, the statement of financial position and gearing for a company.",
    });
  }

  // ===================================================================================================
  // Item 2: CAM_P2_SHORT, Bulawayo Textiles Ltd, rights issue ledger accounts
  {
    const S = EXAM.CAM_P2_SHORT;
    const sc = 540000, sp = 62000, re = 238000, price = 1.65;
    const ns = sc / 4, cap = r2(ns * 1), prem = r2(ns * (price - 1)), cash = r2(ns * price);
    const eq0 = r2(sc + sp + re), eq1 = r2(eq0 + cash);
    const bankT = tAccount("Bank account (rights issue)", [["1 Sep", "Ordinary share capital and share premium", cash]], [], { balance: false });
    const scT = tAccount("Ordinary share capital account", [], [["1 Sep", "Bank: rights issue of 135,000 shares at US\\$1", cap]], { balance: false });
    const spT = tAccount("Share premium account", [], [["1 Sep", "Bank: 135,000 shares × US\\$0.65", prem]], { balance: false });
    b.struct({
      d: 4, examStyle: true, skill: S.skill, secs: S.secs, applies: S.applies, calculator: true,
      paper: "Cambridge Paper 2", concepts: ["aacc.company.bonus-rights", "aacc.company.share-issue", "aacc.company.share-capital-reserves"],
      stem: `Bulawayo Textiles Ltd has ${F(sc)} ordinary shares of US\\$1 each, share premium of ${usd(sp)} and retained earnings of ${usd(re)}. On 1 September 2025 it made a rights issue of one new share for every four held at US\\$${price.toFixed(2)} per share. All the rights were taken up and the money was received on the same day.`,
      parts: checkExam(S, [
        P.num({ label: "(a)", marks: 2, kind: "units", value: ns, wrong: [sc / 5, sc * 4], stem: "Calculate the number of new shares issued.", explanation: `${F(sc)} ÷ 4 = ${F(ns)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: cash, wrong: [cap, prem], stem: "Calculate the cash received.", explanation: `${F(ns)} × US\\$${price.toFixed(2)} = ${usd(cash)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: prem, wrong: [cash, cap], stem: "Calculate the amount credited to the share premium account.", explanation: `${F(ns)} × US\\$0.65 = ${usd(prem)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: eq1, wrong: [eq0, r2(eq0 + cap)], stem: "Calculate total equity after the issue.", explanation: `Total equity before = ${F(sc)} + ${F(sp)} + ${F(re)} = ${F(eq0)}; plus the cash raised ${F(cash)} = ${usd(eq1)}.` }),
        P.manual({ label: "(e)", marks: 4, stem: "Prepare the bank account entry and the share capital and share premium accounts for the rights issue.", points: [`Bank: debit ${F(cash)} (rights money received)`, `Ordinary share capital: credit ${F(cap)}`, `Share premium: credit ${F(prem)}`, "Each entry dated, with a clear description and the totals agreeing"], modelAnswer: `${bankT}\n\n${scT}\n\n${spT}`, explanation: "One mark for each account and one for clear descriptions that agree." }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain two benefits to the company of making a rights issue instead of a public issue of shares.", points: ["It is cheaper to arrange, since it is offered to existing shareholders who already know the company", "Control stays with the present shareholders in proportion to their holdings", "The shareholders have the first right to buy, so the shares are likely to be taken up and the cash is raised quickly"], modelAnswer: "A rights issue costs less than a public issue, existing shareholders keep their share of control, and because it is offered to those who know the company it is likely to be taken up.", explanation: "One mark for each benefit, up to three." }),
      ]),
      hints: ["New shares = shares held ÷ 4.", "The premium per share is the issue price less US\\$1."],
      explanation: "This Cambridge Paper 2 style question covers the calculations, ledger entries and benefits of a rights issue.",
    });
  }

  // ===================================================================================================
  // Item 3: CAM_P2_SHORT, Mutoko Mining Supplies Ltd, profitability and liquidity ratios with evaluation
  {
    const S = EXAM.CAM_P2_SHORT;
    const a = coYear({ name: "Mutoko Mining Supplies Ltd", year: 2024, revenue: 438000, cos: 280320, distribution: 21800, admin: 61300, finance: 4200, tax: 12000, nca: 236000, inventory: 41700, receivables: 33900, bank: 19400, payables: 29200, otherCL: 8100, loan: 45000, shareCapital: 140000 });
    const c = coYear({ name: "Mutoko Mining Supplies Ltd", year: 2025, revenue: 489000, cos: 330075, distribution: 24400, admin: 66800, finance: 7300, tax: 8700, nca: 288000, inventory: 63200, receivables: 52300, bank: 3200, payables: 51400, otherCL: 7900, loan: 85000, shareCapital: 140000 });
    b.struct({
      d: 4, examStyle: true, skill: S.skill, secs: S.secs, applies: S.applies, calculator: true,
      paper: "Cambridge Paper 2", concepts: ["aacc.ratios.profitability", "aacc.ratios.liquidity", "aacc.ratios.analysis-limits"],
      stem: `Mutoko Mining Supplies Ltd sells tools and protective clothing to small mines. Extracts from its financial statements for the years 2024 and 2025 are shown. Use year-end figures, give percentages to one decimal place and ratios to two decimal places.\n\n${table(["Item", "2024 US\\$", "2025 US\\$"], [["Revenue", a.revenue, c.revenue], ["Gross profit", a.gp, c.gp], ["Profit from operations", a.pfo, c.pfo], ["Capital employed", a.capitalEmployed, c.capitalEmployed], ["Inventory", a.inventory, c.inventory], ["Trade receivables", a.receivables, c.receivables], ["Cash and cash equivalents", a.bank, c.bank], ["Current liabilities", a.cl, c.cl]])}`,
      parts: checkExam(S, [
        P.group({ label: "(a)", stem: "Calculate the gross profit margin for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "pct", value: R.gpm(a), wrong: [R.markUp(a)], stem: "2024", explanation: `${F(a.gp)} ÷ ${F(a.revenue)} × 100 = ${p1(R.gpm(a))}%.` }),
          P.num({ label: "(ii)", marks: 1, kind: "pct", value: R.gpm(c), wrong: [R.markUp(c)], stem: "2025", explanation: `${F(c.gp)} ÷ ${F(c.revenue)} × 100 = ${p1(R.gpm(c))}%.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate return on capital employed (ROCE) for:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: R.roce(a), wrong: [(a.profit / a.capitalEmployed) * 100], stem: "2024", explanation: `${F(a.pfo)} ÷ ${F(a.capitalEmployed)} × 100 = ${p1(R.roce(a))}%.` }),
          P.num({ label: "(ii)", marks: 2, kind: "pct", value: R.roce(c), wrong: [(c.profit / c.capitalEmployed) * 100], stem: "2025", explanation: `${F(c.pfo)} ÷ ${F(c.capitalEmployed)} × 100 = ${p1(R.roce(c))}%.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate the current ratio for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.current(a), wrong: [R.acid(a)], stem: "2024", explanation: `${F(a.ca)} ÷ ${F(a.cl)} = ${p2(R.current(a))} : 1.` }),
          P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.current(c), wrong: [R.acid(c)], stem: "2025", explanation: `${F(c.ca)} ÷ ${F(c.cl)} = ${p2(R.current(c))} : 1.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate the acid test ratio for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "ratio", value: R.acid(a), wrong: [R.current(a)], stem: "2024", explanation: `(${F(a.ca)} - ${F(a.inventory)}) ÷ ${F(a.cl)} = ${p2(R.acid(a))} : 1.` }),
          P.num({ label: "(ii)", marks: 1, kind: "ratio", value: R.acid(c), wrong: [R.current(c)], stem: "2025", explanation: `(${F(c.ca)} - ${F(c.inventory)}) ÷ ${F(c.cl)} = ${p2(R.acid(c))} : 1.` }),
        ] }),
        P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "A bank has been asked to lend the company a further US\\$40,000. Evaluate the profitability and liquidity of the company and advise the bank.", points: [`Profitability has fallen: gross margin from ${p1(R.gpm(a))}% to ${p1(R.gpm(c))}% and ROCE from ${p1(R.roce(a))}% to ${p1(R.roce(c))}%`, `Revenue grew by ${p1(((c.revenue - a.revenue) / a.revenue) * 100)}%, so growth has not brought more profit`, `Liquidity has weakened: current ratio ${p2(R.current(a))} to ${p2(R.current(c))} and acid test ${p2(R.acid(a))} to ${p2(R.acid(c))}`, `Cash is only ${usd(c.bank)} while inventory and receivables have risen sharply (overtrading)`, "Judgement and recommendation: lend only with security and a plan to improve the margin and collect receivables, or decline"], modelAnswer: `The company is growing but less profitable: the gross margin and ROCE have fallen. Liquidity is weaker, cash is very low and inventory and receivables have grown, which suggests overtrading. The bank should lend only against security and a clear plan to restore the margin and collect receivables.`, explanation: "One mark for each point, up to five; allow follow-through from the calculations." }),
      ]),
      hints: ["ROCE uses profit from operations.", "Remove inventory for the acid test."],
      explanation: "This Cambridge Paper 2 style question asks for profitability and liquidity ratios and an evaluation for a lender.",
    });
  }
});
void table; void statement; void fmt;
