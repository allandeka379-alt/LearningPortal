// W2b exam-format items: ZIMSEC Paper 2 (ZIM_P2_STRUCT, 25 marks): (1) club subscriptions and income and expenditure; (2) manufacturing account.
import { concept, P, EXAM, checkExam, ZIM, money, fmt, chk, r2, sum, table, statement } from "../lib.mjs";
import { U, mfg, subs } from "../tables/w2b-lib.mjs";

concept("aacc.club.income-expenditure", { file: "exam/w2b-zimp2", keyPrefix: "exam.w2b-zimp2", applies: ZIM }, (b) => {
  const Z = EXAM.ZIM_P2_STRUCT;

  // =====================================================================================================
  // Item 1: Zambezi Tennis Club (Harare), year ended 31 December 2025
  {
    const o = { club: 38000, eq: 5700, inv: 710, arr: 290, bank: 3260, cash: 95, adv: 130, sup: 430, acc: 205 };
    const fund0 = chk(o.club + o.eq + o.inv + o.arr + o.bank + o.cash - o.adv - o.sup - o.acc, 47290);
    const r = { subs: 9570, bar: 14360, ent: 470, don: 620, comp: 1230 };
    const p = { sup: 9140, gr: 4330, stew: 2640, ut: 1790, prizes: 810, eq: 1460, adm: 970 };
    const c = { arr: 345, adv: 170, sup: 575, gr: 255, inv: 730, wo: 70 };
    const sa = subs({ date0: "1 Jan 2025", date1: "31 Dec 2025", o: { arrears: o.arr, advance: o.adv }, c: { arrears: c.arr, advance: c.adv }, received: r.subs, writeOff: c.wo, title: "Subscriptions account for the year ended 31 December 2025" });
    const purch = r2(p.sup + c.sup - o.sup);
    const cos = r2(o.inv + purch - c.inv);
    const gp = r2(r.bar - cos);
    const barProfit = r2(gp - p.stew);
    const grExp = r2(p.gr - o.acc + c.gr);
    const depEq = r2((o.eq + p.eq) * 0.1), depCl = r2(o.club * 0.02);
    const income = r2(sa.income + r.ent + r.don + r.comp + barProfit);
    const expd = r2(grExp + p.ut + p.prizes + p.adm + c.wo + depEq + depCl);
    const surplus = r2(income - expd);
    const totR = r.subs + r.bar + r.ent + r.don + r.comp;
    const totP = Object.values(p).reduce((a, x) => a + x, 0);
    const bankC = r2(o.bank + o.cash + totR - totP);
    const fundC = r2(fund0 + surplus);
    chk((o.club - depCl) + (o.eq + p.eq - depEq) + c.inv + c.arr + bankC - c.adv - c.sup - c.gr, fundC);
    const ieMd = statement("Zambezi Tennis Club: income and expenditure account for the year ended 31 December 2025", [
      ["Income", null, null], ["Subscriptions", sa.income, null], ["Entrance fees", r.ent, null], ["Competition entry fees", r.comp, null], ["Donations", r.don, null], ["Profit on the bar", barProfit, null], ["Total income", null, income],
      ["Expenditure", null, null], ["Groundsman's wages", grExp, null], ["Utilities", p.ut, null], ["Prizes", p.prizes, null], ["Administration", p.adm, null], ["Irrecoverable subscriptions", c.wo, null], ["Depreciation of equipment", depEq, null], ["Depreciation of clubhouse", depCl, null], ["Total expenditure", null, -expd], ["**Surplus for the year**", null, surplus],
    ], { cols: [U, U], checks: [["surplus", surplus, income - expd]] });
    const stemTable = table(["Receipts for 2025", U, "Payments for 2025", U], [
      ["Subscriptions", r.subs, "Bar suppliers", p.sup], ["Bar takings", r.bar, "Groundsman's wages", p.gr], ["Entrance fees", r.ent, "Bar steward's wages", p.stew], ["Donations (general)", r.don, "Utilities", p.ut], ["Competition entry fees", r.comp, "Prizes", p.prizes], ["", null, "New equipment", p.eq], ["", null, "Administration", p.adm],
    ], ["l", "r", "l", "r"]);
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.club.subscriptions", "aacc.club.income-expenditure", "aacc.club.income-generating", "aacc.club.receipts-payments-fund"],
      stem: `Zambezi Tennis Club in Harare keeps only a cash book. At 1 January 2025 its assets were the clubhouse ${money(o.club)}, equipment ${money(o.eq)}, bar inventory ${money(o.inv)}, subscriptions in arrears ${money(o.arr)}, bank ${money(o.bank)} and cash ${money(o.cash)}. Its liabilities were subscriptions received in advance ${money(o.adv)}, bar suppliers ${money(o.sup)} and the groundsman's wages owing ${money(o.acc)}.\n\n${stemTable}\n\nAt 31 December 2025: subscriptions in arrears ${money(c.arr)} (after writing off ${money(c.wo)} as irrecoverable) and in advance ${money(c.adv)}; bar suppliers owed ${money(c.sup)}; groundsman owed ${money(c.gr)}; bar inventory ${money(c.inv)}. Equipment is depreciated at 10% on cost including additions and the clubhouse at 2% of its value at the start of the year.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: fund0, wrong: [fund0 + o.adv + o.sup + o.acc, o.bank + o.cash], stem: "Calculate the accumulated fund at 1 January 2025.", explanation: `Assets ${fmt(fund0 + o.adv + o.sup + o.acc)} less liabilities ${fmt(o.adv + o.sup + o.acc)} = ${fmt(fund0)}.` }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 3, kind: "money", value: sa.income, wrong: [r.subs, r.subs + c.arr - o.arr + o.adv - c.adv], stem: "the subscriptions income for the year", explanation: `Income = ${fmt(r.subs)} + ${fmt(c.wo)} written off + ${fmt(c.arr)} + ${fmt(o.adv)} − ${fmt(o.arr)} − ${fmt(c.adv)} = ${fmt(sa.income)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: purch, wrong: [p.sup, p.sup + o.sup - c.sup], stem: "the bar purchases for the year", explanation: `${fmt(p.sup)} + ${fmt(c.sup)} − ${fmt(o.sup)} = ${fmt(purch)}.` }),
        ] }),
        P.group({ label: "(c)", stem: "Bar trading account:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: gp, wrong: [r.bar - purch], stem: "calculate the gross profit on the bar", explanation: `Cost of sales ${fmt(o.inv)} + ${fmt(purch)} − ${fmt(c.inv)} = ${fmt(cos)}; ${fmt(r.bar)} − ${fmt(cos)} = ${fmt(gp)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: barProfit, wrong: [gp], stem: "calculate the profit on the bar after the bar steward's wages", explanation: `${fmt(gp)} − ${fmt(p.stew)} = ${fmt(barProfit)}.` }),
        ] }),
        P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year ended 31 December 2025.", points: ["Heading with the name of the club and the period", `Subscriptions ${fmt(sa.income)} (own figure) and entrance fees`, `Competition entry fees ${fmt(r.comp)} and donations ${fmt(r.don)}`, `Profit on the bar ${fmt(barProfit)} (own figure) and total income ${fmt(income)}`, `Groundsman's wages ${fmt(grExp)}`, `Irrecoverable subscriptions ${fmt(c.wo)} as an expense`, `Depreciation ${fmt(depEq)} and ${fmt(depCl)}; no charge for the equipment bought`, `Total expenditure ${fmt(expd)} and surplus ${fmt(surplus)}`], modelAnswer: ieMd, explanation: "Each cash figure is adjusted to the amount that belongs to the year." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: fundC, wrong: [fund0 - surplus, fund0 + income], stem: "Calculate the accumulated fund at 31 December 2025.", explanation: `${fmt(fund0)} + ${fmt(surplus)} = ${fmt(fundC)}.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain why the club's cash book summary (receipts and payments) is not enough to show the club's performance for the year.", points: ["It shows cash only and ignores accruals, prepayments and arrears", "It includes capital payments such as equipment and does not show depreciation", "It does not show a surplus or deficit or the assets and liabilities"], modelAnswer: "A cash summary shows cash only, so it ignores accruals, prepayments and arrears. It mixes capital items like new equipment with revenue items and has no depreciation, so it shows neither a surplus or deficit nor the assets and liabilities.", explanation: "One mark each for cash only, capital items and missing results." }),
      ]),
      hints: ["Convert each cash figure using the opening and closing balances.", "The write-off is on the credit side of the subscriptions account.", "The equipment bought is not an expense."],
      explanation: "This ZIMSEC Paper 2 style question combines the accumulated fund, subscriptions, the bar and the income and expenditure account of a club.",
    });
  }

  // =====================================================================================================
  // Item 2: Nyasha Furniture Works, manufacturing account for the year ended 31 October 2025
  {
    const d = { o: 18700, p: 112300, ci: 3300, ro: 2900, c: 20100, lab: 74100, roy: 4900, ind: 16100, wo: 9300, wc: 10600, units: 3000 };
    const sh = [["Rent and rates", 23600, 0.65], ["Power", 12900, 0.85], ["Insurance", 5700, 0.55]];
    const f = sh.map(([l, t, x]) => [l, t, r2(t * x)]);
    const depM = r2(98000 * 0.125), depO = r2(17000 * 0.1);
    const m = mfg({
      rmOpen: d.o, rmPurch: d.p, carriageIn: d.ci, rmReturns: d.ro, rmClose: d.c, labour: d.lab, directExp: [["Royalties", d.roy]],
      overheads: [["Indirect factory wages", d.ind], ["Rent and rates (factory share)", f[0][2]], ["Power (factory share)", f[1][2]], ["Insurance (factory share)", f[2][2]], ["Depreciation of machinery", depM]],
      wipOpen: d.wo, wipClose: d.wc,
    }, { title: "Nyasha Furniture Works: manufacturing account for the year ended 31 October 2025" });
    chk(m.rmUsed, 111300); chk(m.foh, 57790);
    const unit = m.cop / d.units;
    const unitTxt = (Math.round(unit * 100) / 100).toFixed(2);
    const quote = 78;
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.manufacturing.account"],
      stem: `Nyasha Furniture Works in Gweru makes wooden tables. The following information is for the year ended 31 October 2025.\n\n${table(["Item", U], [["Raw materials: inventory at 1 November 2024", d.o], ["Purchases of raw materials", d.p], ["Carriage inwards", d.ci], ["Returns outwards (raw materials)", d.ro], ["Raw materials: inventory at 31 October 2025", d.c], ["Manufacturing wages", d.lab], ["Royalties on tables made", d.roy], ["Indirect factory wages", d.ind], ["Work in progress at 1 November 2024", d.wo], ["Work in progress at 31 October 2025", d.wc]])}\n\nShared expenses for the year: rent and rates ${money(23600)} (65% factory), power ${money(12900)} (85% factory) and insurance ${money(5700)} (55% factory). Machinery is depreciated at 12.5% on cost of ${money(98000)}; office equipment at 10% on cost of ${money(17000)}. The factory completed ${fmt(d.units)} tables.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: m.rmUsed, wrong: [d.o + d.p - d.c, d.o + d.p + d.ci + d.ro - d.c], stem: "Calculate the cost of raw materials consumed.", explanation: `${fmt(d.o)} + ${fmt(d.p)} + ${fmt(d.ci)} − ${fmt(d.ro)} − ${fmt(d.c)} = ${fmt(m.rmUsed)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.prime, wrong: [m.rmUsed + d.lab], stem: "Calculate the prime cost.", explanation: `${fmt(m.rmUsed)} + ${fmt(d.lab)} + ${fmt(d.roy)} = ${fmt(m.prime)}.` }),
        P.group({ label: "(c)", stem: "Calculate the amount of each shared expense that is a factory overhead:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: f[0][2], wrong: [r2(23600 * 0.35)], stem: "rent and rates", explanation: `65% × 23,600 = ${fmt(f[0][2])}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: f[1][2], wrong: [r2(12900 * 0.15)], stem: "power", explanation: `85% × 12,900 = ${fmt(f[1][2])}.` }),
          P.num({ label: "(iii)", marks: 1, kind: "money", value: f[2][2], wrong: [r2(5700 * 0.45)], stem: "insurance", explanation: `55% × 5,700 = ${fmt(f[2][2])}.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: m.foh, wrong: [m.foh + depO, m.foh - depM], stem: "Calculate the total factory overheads, including the depreciation of machinery.", explanation: `${fmt(d.ind)} + ${fmt(f[0][2])} + ${fmt(f[1][2])} + ${fmt(f[2][2])} + ${fmt(depM)} = ${fmt(m.foh)}. Office equipment depreciation is not a factory cost.` }),
        P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare the manufacturing account for the year ended 31 October 2025.", points: ["Heading with the business name and period", `Raw materials consumed ${fmt(m.rmUsed)}, with carriage inwards and returns outwards in the right place`, `Direct wages and royalties; prime cost ${fmt(m.prime)} (own figure)`, "Factory overheads listed: indirect wages and the four apportioned or depreciation items", `Total factory overheads ${fmt(m.foh)} and factory cost ${fmt(m.factoryCost)}`, "Opening work in progress added", "Closing work in progress deducted", `Cost of production ${fmt(m.cop)} with brackets for deductions`], modelAnswer: m.md, explanation: "Selling and administration costs, and office equipment depreciation, are excluded." }),
        P.num({ label: "(f)", marks: 2, kind: "money", dp: 2, value: unit, wrong: [m.factoryCost / d.units, m.cop / 2800], stem: "Calculate the cost of production per table, to the nearest cent.", explanation: `${fmt(m.cop)} ÷ 3,000 = ${unitTxt}.` }),
        P.manual({ label: "(g)", marks: 5, stem: `A supplier offers to supply the same tables for ${money(quote)} each. Evaluate whether Nyasha Furniture Works should stop making them and advise the owner.`, points: [`The supplier's price of ${quote} is lower than the full cost of ${unitTxt} per table`, "Some overheads (rent, insurance, machinery depreciation) would continue if production stopped, so the real saving is smaller", `Only avoidable costs (materials, wages, power) should be compared with the ${quote}`, "Non-financial factors: quality, reliability of delivery, loss of skilled workers", "Advice: do not stop on the full-cost comparison alone; compare avoidable costs and test the supplier's quality first"], modelAnswer: `The supplier's price of ${money(quote)} is below the full cost of ${money(Math.round(unit * 100) / 100)} per table, but rent, insurance and depreciation would continue if production stopped, so the saving is smaller. Only avoidable costs should be compared. Quality and reliability also matter, so the owner should not stop making tables until avoidable costs and the supplier's quality are checked.`, explanation: "One mark for each point in a balanced judgement." }),
      ]),
      hints: ["Carriage inwards is added to the cost of materials.", "Only the factory share of shared expenses is a factory overhead.", "Add opening and deduct closing work in progress."],
      explanation: "This ZIMSEC Paper 2 style question combines the manufacturing account, apportionment of shared expenses, cost per unit and a make-or-buy evaluation.",
    });
  }
});
