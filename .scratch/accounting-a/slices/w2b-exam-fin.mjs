// W2b exam-format items: FIN25 x3 (25 marks, ANALYSIS, both boards): (1) a company acquires a partnership; (2) manufacturing account with
// unrealised profit; (3) club accounts from incomplete records.
import { concept, P, EXAM, checkExam, money, fmt, chk, r2, sum, table, statement, journal, ratios } from "../lib.mjs";
import { U, mfg, transfer, subs } from "../tables/w2b-lib.mjs";

const f1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const f2 = (v) => (Math.round(v * 100) / 100).toFixed(2);

concept("aacc.acquisition.purchaser-books", { file: "exam/w2b-fin", keyPrefix: "exam.w2b-fin" }, (b) => {
  const F = EXAM.FIN25;

  // =====================================================================================================
  // Item 1: Harare Packaging Ltd buys the partnership of Tanaka and Moyo
  {
    const pb = { prem: 68400, eq: 20300, inv: 12900, rec: 8700, bank: 4350, pay: 10900 };
    const ag = { prem: 77600, eq: 18900, inv: 11700, rec: 8300, pay: 10900 };
    const bookAssets = pb.prem + pb.eq + pb.inv + pb.rec;
    chk(bookAssets + pb.bank - pb.pay, 103750);
    const na = chk(ag.prem + ag.eq + ag.inv + ag.rec - ag.pay, 105600);
    const cash = 20300, n = 46000, price = 1.65, notes = 12800;
    const sh = chk(n * price, 75900);
    const cons = chk(cash + sh + notes, 109000);
    const gw = chk(cons - na, 3400);
    const profit = chk(cons + pb.pay - bookAssets, 9600);
    const tShare = r2((profit * 3) / 5), mShare = r2((profit * 2) / 5);
    const co = { prem: 148000, eq: 63500, inv: 37400, rec: 26800, bank: 43300, sc: 158000, sp: 31000, re: 69500, ln: 26000, pay: 34500 };
    chk(co.prem + co.eq + co.inv + co.rec + co.bank, 319000); chk(co.sc + co.sp + co.re + co.ln + co.pay, 319000);
    const aft = { prem: co.prem + ag.prem, eq: co.eq + ag.eq, inv: co.inv + ag.inv, rec: co.rec + ag.rec, bank: co.bank - cash, sc: co.sc + n, sp: co.sp + n * (price - 1), ln: co.ln + notes, pay: co.pay + ag.pay };
    const totA = aft.prem + aft.eq + gw + aft.inv + aft.rec + aft.bank;
    const totE = aft.sc + aft.sp + co.re + aft.ln + aft.pay;
    chk(totA, 418600); chk(totE, 418600);
    const reserves = aft.sp + co.re;
    const gearAfter = ratios.gearing(aft.ln, aft.sc, reserves);
    const gearBefore = ratios.gearing(co.ln, co.sc, co.sp + co.re);
    const caAfter = aft.inv + aft.rec + aft.bank;
    const crAfter = ratios.current(caAfter, aft.pay);
    const crBefore = ratios.current(co.inv + co.rec + co.bank, co.pay);
    const j = journal([
      { date: "1 Apr", lines: [["Premises", ag.prem, null], ["Equipment", ag.eq, null], ["Inventory", ag.inv, null], ["Trade receivables", ag.rec, null], ["Goodwill", gw, null], ["Trade payables", null, ag.pay], ["Business purchase account", null, cons]], narrative: "Business of Tanaka and Moyo taken over at agreed values" },
      { date: "1 Apr", lines: [["Business purchase account", cons, null], ["Bank", null, cash], ["Ordinary share capital", null, n], ["Share premium", null, n * (price - 1)], ["Loan notes", null, notes]], narrative: "Settlement of the purchase consideration" },
    ], { title: "Journal of Harare Packaging Ltd" });
    b.struct({
      d: 5, examStyle: true, skill: F.skill, secs: F.secs, calculator: true,
      paper: "ZIMSEC/Cambridge Paper 3", concepts: ["aacc.acquisition.purchase-consideration-goodwill", "aacc.acquisition.purchaser-books", "aacc.acquisition.vendor-books"],
      stem: `Harare Packaging Ltd buys the business of the partnership Tanaka and Moyo on 1 April 2026. The partners share profits and losses 3 : 2. The assets and liabilities of the partnership, and the values agreed for the purchase, were:\n\n${table(["", `Book value ${U}`, `Agreed value ${U}`], [["Premises", pb.prem, ag.prem], ["Equipment", pb.eq, ag.eq], ["Inventory", pb.inv, ag.inv], ["Trade receivables", pb.rec, ag.rec], ["Trade payables (taken over)", pb.pay, ag.pay], ["Bank (not taken over)", pb.bank, "not taken"]], ["l", "r", "r"])}\n\nThe purchase consideration is ${money(cash)} in cash, ${fmt(n)} ordinary shares of US\\$1 issued at US\\$1.65 each and ${money(notes)} of loan notes.\n\nThe statement of financial position of Harare Packaging Ltd just before the purchase showed: premises ${money(co.prem)}, equipment ${money(co.eq)}, inventory ${money(co.inv)}, trade receivables ${money(co.rec)} and bank ${money(co.bank)}; ordinary share capital ${money(co.sc)} (US\\$1 shares), share premium ${money(co.sp)}, retained earnings ${money(co.re)}, loan notes ${money(co.ln)} (non-current) and trade payables ${money(co.pay)}.`,
      parts: checkExam(F, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: na, wrong: [ag.prem + ag.eq + ag.inv + ag.rec, bookAssets - pb.pay], stem: "Calculate the net assets acquired, at agreed values.", explanation: `Assets ${fmt(ag.prem)} + ${fmt(ag.eq)} + ${fmt(ag.inv)} + ${fmt(ag.rec)} = ${fmt(ag.prem + ag.eq + ag.inv + ag.rec)}; less payables ${fmt(ag.pay)} = ${fmt(na)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: cons, wrong: [cash + n + notes], stem: "Calculate the purchase consideration.", explanation: `Shares ${fmt(n)} × 1.65 = ${fmt(sh)}. ${fmt(cash)} + ${fmt(sh)} + ${fmt(notes)} = ${fmt(cons)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: gw, wrong: [cons - (bookAssets + pb.bank - pb.pay)], stem: "Calculate the goodwill.", explanation: `${fmt(cons)} − ${fmt(na)} = ${fmt(gw)}.` }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries in the books of Harare Packaging Ltd to record the purchase, with narratives.", points: ["Assets debited at agreed values", `Goodwill ${fmt(gw)} debited (own figure)`, `Trade payables ${fmt(ag.pay)} and business purchase account ${fmt(cons)} credited`, `Second journal: business purchase account debited ${fmt(cons)}`, `Bank ${fmt(cash)} and loan notes ${fmt(notes)} credited`, `Share capital ${fmt(n)} and share premium ${fmt(n * (price - 1))} credited`], modelAnswer: j, explanation: `Journal 1 totals ${fmt(ag.prem + ag.eq + ag.inv + ag.rec + gw)} each side; journal 2 totals ${fmt(cons)} each side.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: profit, wrong: [cons - (bookAssets + pb.bank - pb.pay), cons - bookAssets], stem: "Calculate the profit on realisation in the partnership's books (the bank balance stays with the partners).", explanation: `Assets taken over at book value ${fmt(bookAssets)} less payables ${fmt(pb.pay)} = ${fmt(bookAssets - pb.pay)}. Profit ${fmt(cons)} − ${fmt(bookAssets - pb.pay)} = ${fmt(profit)} (Tanaka ${fmt(tShare)}, Moyo ${fmt(mShare)}).` }),
        P.num({ label: "(f)", marks: 3, kind: "pct", dp: 1, value: gearAfter, wrong: [gearBefore, ratios.gearing(aft.ln, co.sc, co.sp + co.re)], stem: "Calculate the gearing ratio of Harare Packaging Ltd after the purchase (non-current liabilities ÷ (issued share capital + all reserves + non-current liabilities) × 100), to one decimal place.", explanation: `Share capital ${fmt(aft.sc)}; reserves ${fmt(aft.sp)} + ${fmt(co.re)} = ${fmt(reserves)}; loan notes ${fmt(aft.ln)}. ${fmt(aft.ln)} ÷ ${fmt(aft.sc + reserves + aft.ln)} × 100 = ${f1(gearAfter)}%.` }),
        P.num({ label: "(g)", marks: 2, kind: "ratio", value: crAfter, wrong: [crBefore, (aft.inv + aft.rec) / aft.pay], stem: "Calculate the current ratio after the purchase as x : 1, to two decimal places.", explanation: `Current assets ${fmt(aft.inv)} + ${fmt(aft.rec)} + ${fmt(aft.bank)} = ${fmt(caAfter)}; current liabilities ${fmt(aft.pay)}. ${fmt(caAfter)} ÷ ${fmt(aft.pay)} = ${f2(crAfter)} : 1.` }),
        P.manual({ label: "(h)", marks: 3, stem: "Evaluate the effect of the purchase on the financial position of Harare Packaging Ltd, using your answers to (f) and (g).", points: [`Gearing rises from ${f1(gearBefore)}% to ${f1(gearAfter)}% because loan notes of ${fmt(notes)} are added, but it remains low`, `The current ratio falls from ${f2(crBefore)} : 1 to ${f2(crAfter)} : 1 because cash was paid and payables were taken over, but liquidity is still acceptable`, "Judgement: the financial position is weaker but sound; the benefit depends on the profit earned by the acquired business"], modelAnswer: `Gearing rises from ${f1(gearBefore)}% to ${f1(gearAfter)}% as loan notes of ${money(notes)} are added, but remains low. The current ratio falls from ${f2(crBefore)} : 1 to ${f2(crAfter)} : 1 because cash was paid and payables taken over, though liquidity is acceptable. The position is weaker but sound, and the benefit depends on the profit the acquired business earns.`, explanation: "One mark each for gearing, liquidity and a judgement." }),
      ]),
      hints: ["Value the shares at the issue price.", "In (e) the bank balance is not transferred to the realisation account.", "Use the formulas printed in the question for gearing."],
      explanation: "This FIN25 item combines the purchaser's journals, the vendor's profit on realisation and an analysis of gearing and liquidity.",
    });
  }

  // =====================================================================================================
  // Item 2: Mutare Steel Works, manufacturing account and unrealised profit
  {
    const d = { o: 21700, p: 95800, ci: 2400, ro: 1700, c: 23400, lab: 61500, roy: 3700, ind: 14600, power: 8950, dep: 7450, rent: 10400, rentF: 0.6, ins: 2760, wo: 8700, wc: 9700, units: 3980 };
    const rentFac = r2(d.rent * d.rentF);
    const m = mfg({
      rmOpen: d.o, rmPurch: d.p, carriageIn: d.ci, rmReturns: d.ro, rmClose: d.c, labour: d.lab, directExp: [["Royalties", d.roy]],
      overheads: [["Indirect factory wages", d.ind], ["Factory power", d.power], ["Depreciation of machinery", d.dep], ["Rent (factory share)", rentFac], ["Insurance of plant", d.ins]],
      wipOpen: d.wo, wipClose: d.wc,
    }, { title: "Mutare Steel Works: manufacturing account for the year ended 31 December 2025" });
    chk(m.rmUsed, 94800); chk(m.prime, 160000); chk(m.foh, 40000); chk(m.cop, 199000);
    const sales = 343500, fgO = 44200, fgC = 49400, expenses = 51800;
    const t = transfer({ name: "Mutare Steel Works", cop: m.cop, markupPct: 30, sales, fgOpen: fgO, fgClose: fgC, expenses });
    chk(t.profit, 59700); chk(t.transferValue, 258700); chk(t.provOpen, 10200); chk(t.provClose, 11400); chk(t.provChange, 1200); chk(t.gp, 90000); chk(t.net, 96700);
    const unitCost = chk(m.cop / d.units, 50), unitTransfer = chk(t.transferValue / d.units, 65);
    const quote = 56;
    const saving = (unitCost - quote) * -1 * d.units;
    b.struct({
      d: 5, examStyle: true, skill: F.skill, secs: F.secs, calculator: true,
      paper: "ZIMSEC/Cambridge Paper 3", concepts: ["aacc.manufacturing.account", "aacc.manufacturing.profit-unrealised", "aacc.manufacturing.statements"],
      stem: `Mutare Steel Works makes steel doors. The following information is for the year ended 31 December 2025.\n\n${table(["Item", U], [["Raw materials: inventory at 1 January 2025", d.o], ["Purchases of raw materials", d.p], ["Carriage inwards", d.ci], ["Returns outwards (raw materials)", d.ro], ["Raw materials: inventory at 31 December 2025", d.c], ["Manufacturing wages", d.lab], ["Royalties on doors made", d.roy], ["Indirect factory wages", d.ind], ["Factory power", d.power], ["Depreciation of machinery", d.dep], ["Rent (60% relates to the factory)", d.rent], ["Insurance of plant", d.ins], ["Work in progress at 1 January 2025", d.wo], ["Work in progress at 31 December 2025", d.wc], ["Sales", sales], ["Finished goods at 1 January 2025 (at transfer price)", fgO], ["Finished goods at 31 December 2025 (at transfer price)", fgC], ["Selling, distribution and administration expenses", expenses]])}\n\nThe factory completed ${fmt(d.units)} doors. Finished goods are transferred to the trading account at cost of production plus 30% (market value). The opening provision for unrealised profit was based on the same mark-up.`,
      parts: checkExam(F, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: m.prime, wrong: [m.rmUsed, m.rmUsed + d.lab], stem: "Calculate the prime cost.", explanation: `Raw materials consumed ${fmt(d.o)} + ${fmt(d.p)} + ${fmt(d.ci)} − ${fmt(d.ro)} − ${fmt(d.c)} = ${fmt(m.rmUsed)}; prime cost ${fmt(m.rmUsed)} + ${fmt(d.lab)} + ${fmt(d.roy)} = ${fmt(m.prime)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.cop, wrong: [m.factoryCost, m.prime + m.foh + d.wo + d.wc], stem: "Calculate the cost of production.", explanation: `Factory overheads ${fmt(m.foh)}; factory cost ${fmt(m.factoryCost)}; + ${fmt(d.wo)} − ${fmt(d.wc)} = ${fmt(m.cop)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: t.profit, wrong: [t.transferValue, d.units * 13], stem: "Calculate the manufacturing profit.", explanation: `30% × ${fmt(m.cop)} = ${fmt(t.profit)}.` }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the manufacturing account for the year, ending with the value of goods transferred to the trading account.", points: [`Raw materials consumed ${fmt(m.rmUsed)} with carriage inwards and returns outwards correctly placed`, `Direct wages and royalties; prime cost ${fmt(m.prime)}`, `Factory overheads listed with the factory share of rent ${fmt(rentFac)}`, "Opening work in progress added and closing deducted", `Cost of production ${fmt(m.cop)}`, `Manufacturing profit ${fmt(t.profit)} and value transferred ${fmt(t.transferValue)}`], modelAnswer: `${m.md}\n\n${t.mfgMd}`, explanation: "The manufacturing profit is added after the cost of production." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: t.provClose, wrong: [r2(fgC * 0.3), t.provOpen], stem: "Calculate the provision for unrealised profit needed at 31 December 2025.", explanation: `${fmt(fgC)} × 30/130 = ${fmt(t.provClose)}.` }),
        P.num({ label: "(f)", marks: 1, kind: "money", value: t.provChange, wrong: [t.provClose], stem: "Calculate the increase in the provision for the year.", explanation: `${fmt(t.provClose)} − ${fmt(t.provOpen)} = ${fmt(t.provChange)}.` }),
        P.num({ label: "(g)", marks: 3, kind: "money", value: t.net, wrong: [t.gp + t.profit - expenses, t.gp - expenses], stem: "Calculate the profit for the year.", explanation: `Cost of sales ${fmt(fgO)} + ${fmt(t.transferValue)} − ${fmt(fgC)} = ${fmt(t.cos)}; gross profit ${fmt(t.gp)}. ${fmt(t.gp)} + ${fmt(t.profit)} − ${fmt(t.provChange)} − ${fmt(expenses)} = ${fmt(t.net)}.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain what is meant by unrealised profit in closing finished goods.", points: ["The goods are valued at the transfer price, which includes the factory's profit", "That profit has not been earned because the goods have not been sold"], modelAnswer: "Closing finished goods are valued at the transfer price, which includes the factory's profit. The profit is unrealised because the goods have not yet been sold.", explanation: "One mark each." }),
        P.manual({ label: "(i)", marks: 4, stem: `A new supplier offers the same doors at ${money(quote)} each. Evaluate the result for the factory and advise whether the factory should continue to make the doors.`, points: [`The cost of production is ${f2(unitCost)} per door, below the supplier's ${quote}, so making is cheaper by ${f2(quote - unitCost)} per door (${fmt(saving)} for ${fmt(d.units)} doors)`, `The transfer price of ${f2(unitTransfer)} is above the new market price of ${quote}, so the manufacturing profit of ${fmt(t.profit)} is overstated; at ${quote} it would be ${fmt((quote - unitCost) * d.units)}`, "Quality, reliability and jobs are non-financial factors", `Advice: continue to make the doors, but revise the transfer price to ${quote} so the results of the factory and the shop are fairly shown`], modelAnswer: `The factory makes a door for ${money(unitCost)}, which is ${money(quote - unitCost)} less than the supplier's ${money(quote)}, a saving of ${money(saving)} over ${fmt(d.units)} doors, so it should continue to manufacture. The transfer price of ${money(unitTransfer)} is above the new market price, so the factory profit of ${money(t.profit)} is overstated; at ${money(quote)} it would be ${money((quote - unitCost) * d.units)}. The company should revise the transfer price.`, explanation: "One mark each for the cost comparison, the overstated profit, non-financial factors and the advice." }),
      ]),
      hints: ["Carriage inwards is added to purchases.", "Provision = closing inventory at transfer price × 30/130.", "Only the change in the provision goes through the statement of profit or loss."],
      explanation: "This FIN25 item combines the manufacturing account, manufacturing profit, the provision for unrealised profit and an evaluation of the transfer price.",
    });
  }

  // =====================================================================================================
  // Item 3: Bulawayo Golf Society, accounts from incomplete records
  {
    const o = { course: 124000, eq: 14900, inv: 2430, arr: 640, bank: 7150, adv: 360, sup: 1170, acc: 475 };
    const fund0 = chk(o.course + o.eq + o.inv + o.arr + o.bank - o.adv - o.sup - o.acc, 147115);
    const r = { subs: 31300, shop: 11870, ent: 1560, comp: 2740, grant: 5400, life: 2790, don: 990 };
    const p = { sup: 7690, gk: 18960, ut: 4230, eq: 3150, prizes: 1780, adm: 2720, ins: 1570 };
    const c = { arr: 780, adv: 415, wo: 145, sup: 1360, inv: 2710, gk: 520, pre: 225 };
    const totR = Object.values(r).reduce((a, x) => a + x, 0);
    const totP = Object.values(p).reduce((a, x) => a + x, 0);
    const bankC = r2(o.bank + totR - totP);
    const sa = subs({ date0: "1 Jan 2025", date1: "31 Dec 2025", o: { arrears: o.arr, advance: o.adv }, c: { arrears: c.arr, advance: c.adv }, received: r.subs, writeOff: c.wo });
    const purch = r2(p.sup + c.sup - o.sup);
    const cos = r2(o.inv + purch - c.inv);
    const shopProfit = r2(r.shop - cos);
    const compProfit = r2(r.comp - p.prizes);
    const gk = r2(p.gk - o.acc + c.gk);
    const ins = r2(p.ins - c.pre);
    const depEq = r2((o.eq + p.eq) * 0.1), depCr = r2(o.course * 0.01);
    const lifeInc = r2(r.life / 9), lifeDef = r2(r.life - lifeInc);
    const income = r2(sa.income + r.ent + r.don + shopProfit + compProfit + lifeInc);
    const expd = r2(gk + p.ut + p.adm + ins + c.wo + depEq + depCr);
    const surplus = r2(income - expd);
    const fundC = r2(fund0 + surplus);
    const net = r2((o.course - depCr) + (o.eq + p.eq - depEq) + c.inv + c.arr + c.pre + bankC - c.adv - c.sup - c.gk - lifeDef);
    chk(fundC + r.grant, net);
    const pct = f1((surplus / fund0) * 100);
    const ie = statement("Bulawayo Golf Society: income and expenditure account for the year ended 31 December 2025", [
      ["Income", null, null], ["Subscriptions", sa.income, null], ["Entrance fees", r.ent, null], ["Donations", r.don, null], ["Profit on the shop", shopProfit, null], ["Profit on competitions", compProfit, null], ["Life membership fees (1/9 of 2,790)", lifeInc, null], ["Total income", null, income],
      ["Expenditure", null, null], ["Greenkeepers' wages", gk, null], ["Utilities", p.ut, null], ["Administration", p.adm, null], ["Insurance", ins, null], ["Irrecoverable subscriptions", c.wo, null], ["Depreciation: equipment", depEq, null], ["Depreciation: course and clubhouse", depCr, null], ["Total expenditure", null, -expd], ["**Surplus for the year**", null, surplus],
    ], { cols: [U, U], checks: [["surplus", surplus, income - expd]] });
    const rpTable = table(["Receipts for 2025", U, "Payments for 2025", U], [
      ["Subscriptions", r.subs, "Shop suppliers", p.sup], ["Shop sales", r.shop, "Greenkeepers' wages", p.gk], ["Entrance fees", r.ent, "Utilities", p.ut], ["Competition entry fees", r.comp, "New equipment", p.eq], ["Grant for new irrigation (specific purpose)", r.grant, "Competition prizes", p.prizes], ["Life membership fees (3 members at 930)", r.life, "Administration", p.adm], ["Donations (general)", r.don, "Insurance", p.ins],
    ], ["l", "r", "l", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: F.skill, secs: F.secs, calculator: true,
      paper: "ZIMSEC/Cambridge Paper 3", concepts: ["aacc.club.receipts-payments-fund", "aacc.club.subscriptions", "aacc.club.income-generating", "aacc.club.income-expenditure"],
      stem: `Bulawayo Golf Society keeps only a cash book. At 1 January 2025 its assets were the course and clubhouse ${money(o.course)}, equipment ${money(o.eq)}, shop inventory ${money(o.inv)}, subscriptions in arrears ${money(o.arr)} and bank ${money(o.bank)}. Its liabilities were subscriptions received in advance ${money(o.adv)}, shop suppliers ${money(o.sup)} and the greenkeepers' wages owing ${money(o.acc)}.\n\n${rpTable}\n\nAt 31 December 2025: subscriptions in arrears ${money(c.arr)} (after writing off ${money(c.wo)} as irrecoverable) and in advance ${money(c.adv)}; shop suppliers owed ${money(c.sup)}; shop inventory ${money(c.inv)}; greenkeepers owed ${money(c.gk)}; insurance prepaid ${money(c.pre)}. Equipment is depreciated at 10% on cost including additions; the course and clubhouse at 1% of the value at the start of the year. Life membership fees are credited to income in equal amounts over 9 years, starting this year. The irrigation grant is held in a separate fund.`,
      parts: checkExam(F, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: fund0, wrong: [fund0 + o.adv + o.sup + o.acc, o.course + o.eq + o.inv + o.arr + o.bank], stem: "Calculate the accumulated fund at 1 January 2025.", explanation: `Assets ${fmt(fund0 + o.adv + o.sup + o.acc)} less liabilities ${fmt(o.adv + o.sup + o.acc)} = ${fmt(fund0)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: sa.income, wrong: [r.subs, r.subs + c.arr - o.arr + o.adv - c.adv], stem: "Calculate the subscriptions income for the year.", explanation: `${fmt(r.subs)} + ${fmt(c.wo)} + ${fmt(c.arr)} + ${fmt(o.adv)} − ${fmt(o.arr)} − ${fmt(c.adv)} = ${fmt(sa.income)}.` }),
        P.group({ label: "(c)", stem: "Shop:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: purch, wrong: [p.sup, p.sup + o.sup - c.sup], stem: "calculate the shop purchases", explanation: `${fmt(p.sup)} + ${fmt(c.sup)} − ${fmt(o.sup)} = ${fmt(purch)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: shopProfit, wrong: [r.shop - purch, r.shop - p.sup], stem: "calculate the profit on the shop", explanation: `Cost of sales ${fmt(o.inv)} + ${fmt(purch)} − ${fmt(c.inv)} = ${fmt(cos)}; ${fmt(r.shop)} − ${fmt(cos)} = ${fmt(shopProfit)}.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: gk, wrong: [p.gk], stem: "the greenkeepers' wages expense", explanation: `${fmt(p.gk)} − ${fmt(o.acc)} + ${fmt(c.gk)} = ${fmt(gk)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: depEq + depCr, wrong: [depEq], stem: "the total depreciation charge", explanation: `Equipment 10% × ${fmt(o.eq + p.eq)} = ${fmt(depEq)}; course and clubhouse 1% × ${fmt(o.course)} = ${fmt(depCr)}; total ${fmt(depEq + depCr)}.` }),
        ] }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: surplus, wrong: [income - expd + r.grant, income], stem: "Calculate the surplus for the year (use the grant as a fund, not as income).", explanation: `Income ${fmt(income)} − expenditure ${fmt(expd)} = ${fmt(surplus)}.` }),
        P.manual({ label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year ended 31 December 2025.", points: [`Subscriptions ${fmt(sa.income)}, entrance fees ${fmt(r.ent)} and donations ${fmt(r.don)}`, `Profit on the shop ${fmt(shopProfit)} and on competitions ${fmt(compProfit)} (own figures)`, `Life membership income ${fmt(lifeInc)}; the grant is not income`, `Expenditure: greenkeepers ${fmt(gk)}, insurance ${fmt(ins)}, irrecoverable subscriptions ${fmt(c.wo)} and depreciation ${fmt(depEq + depCr)}`, `Totals ${fmt(income)} and ${fmt(expd)} with the surplus`], modelAnswer: ie, explanation: "Capital payments such as equipment are not expenditure." }),
        P.num({ label: "(g)", marks: 2, kind: "money", value: fundC, wrong: [fund0 + surplus + r.grant, fund0 - surplus], stem: "Calculate the accumulated fund at 31 December 2025.", explanation: `${fmt(fund0)} + ${fmt(surplus)} = ${fmt(fundC)}.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain how the irrigation grant and the life membership fees are shown in the statement of financial position at 31 December 2025.", points: [`The grant of ${fmt(r.grant)} is shown as a separate irrigation fund`, `The unspent life membership fees of ${fmt(lifeDef)} are shown as deferred income (a liability)`], modelAnswer: `The grant of ${money(r.grant)} is shown as a separate irrigation fund. The unspent life membership fees of ${money(lifeDef)} are shown as deferred income.`, explanation: "One mark each." }),
        P.manual({ label: "(i)", marks: 2, stem: "Comment on the Society's financial position using the surplus and the accumulated fund.", points: [`The surplus of ${fmt(surplus)} increased the fund by about ${pct}%; the Society covered its running costs`, "Some income (donations, competition profit, life membership) may not recur, so the committee should monitor costs and subscriptions"], modelAnswer: `The surplus of ${money(surplus)} raised the fund by about ${pct}%, so running costs were covered. Some income such as donations may not recur, so costs and subscriptions should be monitored.`, explanation: "One mark each." }),
      ]),
      hints: ["Convert each cash figure to the amount for the year.", "The grant goes to a fund, not to income.", "Equipment bought is not an expense."],
      explanation: "This FIN25 item prepares a club's accumulated fund, subscriptions, shop profit and income and expenditure account from a cash book and notes.",
    });
  }
});
