// W2b: club.receipts-payments-fund
import { concept, P, CAM, money, fmt, chk, r2, sum, statement } from "../lib.mjs";
import { mc, U, subs } from "../tables/w2b-lib.mjs";

concept("aacc.club.receipts-payments-fund", { file: "club/receipts-payments-fund", keyPrefix: "club.receipts-payments-fund" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL", applies: CAM,
    stem: "What does a receipts and payments account of a club show?",
    right: ["A summary of the cash received and paid in the period", "Correct: it records cash movements only."],
    wrong: [["The surplus or deficit of the club for the whole year", "That is the income and expenditure account."], ["The assets and liabilities of the club at the year end", "That is the statement of financial position."], ["The profit made on each of the club's separate activities", "Separate trading accounts show activity profits."]],
    explanation: "A receipts and payments account is a summary of cash received and paid with opening and closing balances.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the accumulated fund of a club calculated?",
    right: ["Assets less liabilities", "Correct: it is the net assets of the club."],
    wrong: [["Income less expenditure for the year", "That is the surplus or deficit."], ["Bank and cash less the amounts owing", "All assets are included, not just cash."], ["The total of the subscriptions received in the year", "Subscriptions are only one source of income."]],
    explanation: "Accumulated fund = total assets − total liabilities, the club's equivalent of capital.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true, applies: CAM,
    stem: "Which one of the following does NOT appear in a receipts and payments account?",
    right: ["Depreciation of equipment", "Correct: depreciation is not a cash payment."],
    wrong: [["Subscriptions received", "Cash received is a receipt."], ["Payment for new equipment", "A capital payment is shown with other payments."], ["The opening bank balance", "Opening cash and bank balances are shown."]],
    explanation: "Depreciation is not a movement of cash, so it is not in the cash summary.",
  });
  const q4 = { equip: 7800, bank: 2480, cash: 110, arrears: 260, inv: 350, accrued: 180, advance: 90 };
  const q4a = chk(q4.equip + q4.bank + q4.cash + q4.arrears + q4.inv - q4.accrued - q4.advance, 10730);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club has equipment ${money(q4.equip)}, bank ${money(q4.bank)}, cash ${money(q4.cash)}, subscriptions in arrears ${money(q4.arrears)} and inventory ${money(q4.inv)}. It owes ${money(q4.accrued)} for expenses and has received subscriptions of ${money(q4.advance)} in advance. What is the accumulated fund?`,
    right: [money(q4a), "Correct: assets 11,000 less liabilities 270."],
    wrong: [[money(q4a + q4.accrued + q4.advance), "This ignores the liabilities."], [money(q4.bank + q4.cash), "All the assets, not only cash and bank, are included."], [money(q4a + 2 * (q4.accrued + q4.advance)), "The liabilities are added instead of deducted."]],
    hints: ["Add all the assets, then deduct all the liabilities."],
    explanation: "Assets 7,800 + 2,480 + 110 + 260 + 350 = 11,000; liabilities 180 + 90 = 270; fund 10,730.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A club buys new sports equipment for cash. How is the payment dealt with when the receipts and payments account is converted to an income and expenditure account?",
    right: ["It is not an expense; depreciation is charged instead", "Correct: it is capital expenditure."],
    wrong: [["It is charged in full as an expense of the year of purchase", "Equipment lasts for several years, so it is a capital item."], ["It is added to the subscriptions income of the year", "Payments are not income."], ["It is ignored and no depreciation is charged later", "Depreciation is a charge for using the asset."]],
    hints: ["Capital or revenue expenditure?"],
    explanation: "Equipment is capital expenditure; only the depreciation is an expense.",
  });
  const q6 = { rec: 6840, ao: 230, ac: 370, po: 135, pc: 165 };
  const q6a = chk(q6.rec + q6.ac - q6.ao + q6.po - q6.pc, 6950);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club received subscriptions of ${money(q6.rec)}. Arrears were ${money(q6.ao)} at the start and ${money(q6.ac)} at the end. Subscriptions received in advance were ${money(q6.po)} at the start and ${money(q6.pc)} at the end. What is the subscriptions income for the year?`,
    right: [money(q6a), "Correct: 6,840 + 370 − 230 + 135 − 165."],
    wrong: [[money(q6.rec), "The receipts must be adjusted for arrears and advances."], [money(q6.rec - q6.ac + q6.ao - q6.po + q6.pc), "Every adjustment has the wrong sign."], [money(q6.rec + q6.ac - q6.ao - q6.po + q6.pc), "The advance at the start is added, not deducted."]],
    hints: ["Arrears at the end add to income; advances at the end reduce it."],
    explanation: "Income = 6,840 + 370 − 230 + 135 − 165 = 6,950.",
  });
  const q7 = { paid: 3600, accO: 200, accC: 260 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club paid ${money(q7.paid)} for hall hire in the year. ${money(q7.accO)} was owing at the start of the year and ${money(q7.accC)} is owing at the end. What is the hall hire expense in the income and expenditure account?`,
    right: [money(q7.paid - q7.accO + q7.accC), "Correct: 3,600 − 200 + 260."],
    wrong: [[money(q7.paid + q7.accO - q7.accC), "The accruals have the wrong signs."], [money(q7.paid), "The expense must be adjusted for the amounts owing."], [money(q7.paid + q7.accO + q7.accC), "Neither accrual is simply added."]],
    hints: ["Remove last year's amount and add this year's."],
    explanation: "Expense = cash paid − opening accrual + closing accrual = 3,660.",
  });
  const q8 = { fund0: 24800, surplus: -3200 };
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A club's accumulated fund at the start of the year was ${money(q8.fund0)}. In the year it had a deficit of ${money(-q8.surplus)} and no other changes. What is the accumulated fund at the end?`,
    right: [money(q8.fund0 + q8.surplus), "Correct: a deficit reduces the fund."],
    wrong: [[money(q8.fund0 - q8.surplus), "A deficit must be deducted, not added."], [money(-q8.surplus), "This is only the deficit."], [money(q8.fund0), "The deficit changes the fund."]],
    hints: ["Deficit = expenditure exceeds income."],
    explanation: "24,800 − 3,200 = 21,600.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, applies: CAM,
    stem: "A receipts and payments account shows the surplus or deficit of a club for the year.",
    answer: false,
    explanation: "False. It shows cash received and paid, including capital items, and no accruals or depreciation, so no surplus or deficit is found from it.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The accumulated fund at the end of the year equals the opening accumulated fund plus the surplus of the year (when no other changes occur).",
    answer: true,
    hints: ["Think of capital plus profit."],
    explanation: "True. A surplus increases the fund; a deficit reduces it.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item in a club's records with the way it is treated.",
    pairs: [["Subscriptions in arrears at the start of the year", "Deducted when converting subscriptions received to income"], ["Equipment bought for cash", "Capital item; not an expense"], ["Expenses owing at the end of the year", "Added to the cash paid to find the expense"], ["Assets less liabilities", "Accumulated fund"]],
    explanation: "Each adjustment moves a cash figure towards the figure that belongs to the year.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about club accounts.",
    template: "A club's {{blank:a}} fund is its assets less its liabilities. An excess of income over expenditure is called a {{blank:b}}. The receipts and payments account shows {{blank:c}} items only.",
    blanks: [
      { id: "a", accepted: ["accumulated"], choices: ["accumulated", "capital reserve", "sinking"] },
      { id: "b", accepted: ["surplus"], choices: ["surplus", "profit", "deficit"] },
      { id: "c", accepted: ["cash"], choices: ["cash", "accrued", "credit"] },
    ],
    explanation: "Accumulated fund, surplus and cash items.",
  });

  // --- Numerical / calculations
  const n1 = { eq: 5200, fu: 2700, bank: 1900, cash: 70, arr: 180, inv: 310, acc: 140, adv: 80 };
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.eq + n1.fu + n1.bank + n1.cash + n1.arr + n1.inv - n1.acc - n1.adv, 10140), wrong: [n1.eq + n1.fu + n1.bank + n1.cash + n1.arr + n1.inv, n1.eq + n1.fu + n1.bank + n1.cash],
    stem: `At 1 July a club had equipment ${money(n1.eq)}, furniture ${money(n1.fu)}, bank ${money(n1.bank)}, cash ${money(n1.cash)}, subscriptions in arrears ${money(n1.arr)} and inventory ${money(n1.inv)}. It owed ${money(n1.acc)} for expenses and had received ${money(n1.adv)} of subscriptions in advance. Calculate the accumulated fund.`,
    hints: ["Total assets, then deduct the liabilities."],
    explanation: "Assets 10,360; liabilities 220; accumulated fund 10,140.",
  });
  const n2 = { open: 2300, rec: 14200, pay: 13350 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n2.open + n2.rec - n2.pay, 3150), wrong: [n2.open + n2.pay - n2.rec, n2.rec - n2.pay],
    stem: `A club had bank and cash of ${money(n2.open)} at the start of the year. Receipts for the year totalled ${money(n2.rec)} and payments ${money(n2.pay)}. Calculate the closing balance of bank and cash.`,
    explanation: "2,300 + 14,200 − 13,350 = 3,150.",
  });
  const n3 = { paid: 5100, io: 170, ic: 230 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.paid + n3.io - n3.ic, 5040), wrong: [n3.paid, n3.paid - n3.io + n3.ic],
    stem: `A club paid ${money(n3.paid)} for insurance in the year. It had a prepayment of ${money(n3.io)} at the start of the year and has a prepayment of ${money(n3.ic)} at the end. Calculate the insurance expense for the year.`,
    hints: ["The prepayment at the start is used up this year; the prepayment at the end is carried forward."],
    explanation: "Expense = 5,100 + 170 − 230 = 5,040.",
  });
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(18400 + 2900, 21300), wrong: [18400 - 2900, 2900],
    stem: "A club's accumulated fund was US\\$18,400 at the start of the year. It made a surplus of US\\$2,900. Calculate the accumulated fund at the end of the year.",
    hints: ["A surplus increases the fund."],
    explanation: "18,400 + 2,900 = 21,300.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "What is the club's equivalent of the owner's capital called?",
    accepted: ["accumulated fund", "the accumulated fund"],
    explanation: "A club has an accumulated fund instead of capital.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    stem: "State and explain two limitations of a receipts and payments account.",
    points: ["It shows cash only, so it does not show accruals or prepayments (1 mark)", "It mixes capital and revenue items, so a surplus or deficit cannot be seen (1 mark)", "It does not show the assets and liabilities, such as equipment or amounts owing (1 mark)"],
    modelAnswer: "It shows cash only, ignoring accruals and prepayments. It mixes capital and revenue items so no surplus or deficit is shown. It also does not show assets and liabilities such as equipment or amounts owing.",
    hints: ["What is missing compared with an income and expenditure account?"],
    explanation: "One mark for each limitation explained.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a club has an accumulated fund and not a capital account.",
    points: ["A club is not owned by individuals who invest in it for profit", "Its net assets belong to the members collectively and arise from subscriptions and surpluses", "The fund grows with surpluses and falls with deficits"],
    modelAnswer: "A club has no owners who invest to make a profit. Its net assets belong to the members collectively and arise from subscriptions and surpluses, so the fund grows with surpluses and falls with deficits.",
    hints: ["Who owns a club?"],
    explanation: "One mark each for the absence of owners, the source of the fund and the effect of results.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The treasurer says: \"The club ended the year with US\\$3,200 more in the bank, so it made a surplus of US\\$3,200.\" Evaluate this statement.",
    points: ["The change in the bank balance is a cash movement and includes capital items such as equipment", "Accruals, prepayments, arrears and depreciation are not in the cash movement", "The income and expenditure account is needed to find the true surplus", "Conclusion: the statement is not reliable; the surplus may be higher or lower than the increase in cash"],
    modelAnswer: "The increase in the bank balance includes capital payments and receipts and ignores accruals, prepayments, arrears and depreciation. The true surplus must be found from the income and expenditure account, so the statement is unreliable.",
    hints: ["What does cash leave out?"],
    explanation: "A balanced answer says why cash and surplus differ and concludes.",
  });

  // --- Practice structured 1 (10 marks)
  const s1 = { eq: 4500, bank: 2100, cash: 90, arr: 170, acc: 140, subs: 3600, don: 420, rent: 1800, tour: 900, equip: 650, rentC: 170 };
  const s1fund = chk(s1.eq + s1.bank + s1.cash + s1.arr - s1.acc, 6720);
  const s1close = chk(s1.bank + s1.cash + s1.subs + s1.don - s1.rent - s1.tour - s1.equip, 2860);
  const s1rent = chk(s1.rent - s1.acc + s1.rentC, 1830);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mutare Chess Club began the year with equipment ${money(s1.eq)}, bank ${money(s1.bank)}, cash ${money(s1.cash)} and subscriptions in arrears ${money(s1.arr)}. It owed ${money(s1.acc)} for rent. During the year it received subscriptions of ${money(s1.subs)} and donations of ${money(s1.don)}, and paid rent ${money(s1.rent)}, tournament costs ${money(s1.tour)} and ${money(s1.equip)} for new chess clocks. At the year end rent of ${money(s1.rentC)} was owing.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1fund, wrong: [s1.eq + s1.bank + s1.cash + s1.arr], stem: "Calculate the accumulated fund at the start of the year.", explanation: `Assets ${fmt(s1.eq)} + ${fmt(s1.bank)} + ${fmt(s1.cash)} + ${fmt(s1.arr)} = ${fmt(s1.eq + s1.bank + s1.cash + s1.arr)}; less liability ${fmt(s1.acc)} = ${fmt(s1fund)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1close, wrong: [s1.bank + s1.cash + s1.subs + s1.don - s1.rent - s1.tour], stem: "Calculate the closing balance of bank and cash.", explanation: `${fmt(s1.bank + s1.cash)} + ${fmt(s1.subs + s1.don)} − ${fmt(s1.rent + s1.tour + s1.equip)} = ${fmt(s1close)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1rent, wrong: [s1.rent, s1.rent + s1.acc - s1.rentC], stem: "Calculate the rent expense for the year.", explanation: `${fmt(s1.rent)} − ${fmt(s1.acc)} + ${fmt(s1.rentC)} = ${fmt(s1rent)}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the cost of the new chess clocks is not charged as an expense in the income and expenditure account.", points: ["The clocks are equipment that will be used for several years (capital expenditure)", "Only depreciation is charged each year", "The clocks are shown as an asset in the statement of financial position"], modelAnswer: "The clocks will be used for several years, so they are capital expenditure. Only their depreciation is charged to the income and expenditure account and the clocks are an asset in the statement of financial position.", explanation: "One mark each for capital expenditure, depreciation and the asset." }),
    ],
    hints: ["The fund is assets less liabilities.", "Use opening and closing accruals for the rent."],
    explanation: "This item practises the accumulated fund and conversion of cash items.",
  });

  // --- Practice structured 2 (16 marks)
  const o = { eq: 9000, fit: 4000, bank: 2600, cash: 100, arr: 300, inv: 400, acc: 250, adv: 100 };
  const fund0 = chk(o.eq + o.fit + o.bank + o.cash + o.arr + o.inv - o.acc - o.adv, 16050);
  const r = { subs: 9800, fete: 1640, don: 650, gr: 4800, el: 1100, ref: 1500, eqb: 2000, adm: 700 };
  const c = { arr: 350, adv: 160, acc: 300, inv: 520 };
  const totRec = r.subs + r.fete + r.don;
  const totPay = r.gr + r.el + r.ref + r.eqb + r.adm;
  const closeBC = chk(o.bank + o.cash + totRec - totPay, 4690);
  const sIncome = chk(subs({ o: { arrears: o.arr, advance: o.adv }, c: { arrears: c.arr, advance: c.adv }, received: r.subs }).income, 9790);
  const ground = chk(r.gr - o.acc + c.acc, 4850);
  const refr = chk(o.inv + r.ref - c.inv, 1380);
  const depE = chk((o.eq + r.eqb) * 0.1, 1100), depF = chk(o.fit * 0.1, 400);
  const income = chk(sIncome + r.fete + r.don, 12080);
  const expd = chk(ground + r.el + refr + r.adm + depE + depF, 9530);
  const surplus = chk(income - expd, 2550);
  const fundC = chk(fund0 + surplus, 18600);
  chk((o.eq + r.eqb - depE) + (o.fit - depF) + c.inv + c.arr + closeBC - c.acc - c.adv, fundC);
  const ie = statement("Gweru Rugby Club: income and expenditure account for the year ended 30 June 2026", [
    ["Income", null, null], ["Subscriptions", sIncome, null], ["Proceeds of the fete", r.fete, null], ["Donations", r.don, null], ["Total income", null, income],
    ["Expenditure", null, null], ["Groundsman's wages", ground, null], ["Electricity", r.el, null], ["Refreshments", refr, null], ["Administration", r.adm, null], ["Depreciation: equipment", depE, null], ["Depreciation: fittings", depF, null], ["Total expenditure", null, -expd],
    ["**Surplus for the year**", null, surplus],
  ], { cols: [U, U], checks: [["surplus", surplus, income - expd]] });
  const pctUp = Math.round((surplus / fund0) * 100);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Gweru Rugby Club's year ends on 30 June 2026. At 1 July 2025 it had pitch equipment ${money(o.eq)}, clubhouse fittings ${money(o.fit)}, bank ${money(o.bank)}, cash ${money(o.cash)}, subscriptions in arrears ${money(o.arr)} and refreshment inventory ${money(o.inv)}. It owed the groundsman ${money(o.acc)} and had received ${money(o.adv)} of subscriptions in advance. Receipts for the year: subscriptions ${money(r.subs)}, proceeds of a fete ${money(r.fete)}, donations ${money(r.don)}. Payments: groundsman ${money(r.gr)}, electricity ${money(r.el)}, refreshments ${money(r.ref)}, new equipment ${money(r.eqb)}, administration ${money(r.adm)}. At 30 June 2026: arrears ${money(c.arr)}, subscriptions in advance ${money(c.adv)}, groundsman owed ${money(c.acc)}, refreshment inventory ${money(c.inv)}. Depreciation is 10% on equipment at the year end (before depreciation) and 10% on the fittings.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: fund0, wrong: [fund0 + o.acc + o.adv], stem: "Calculate the accumulated fund at 1 July 2025.", explanation: `Assets ${fmt(o.eq + o.fit + o.bank + o.cash + o.arr + o.inv)} less liabilities ${fmt(o.acc + o.adv)} = ${fmt(fund0)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: closeBC, wrong: [closeBC - r.eqb], stem: "Calculate the closing balance of bank and cash at 30 June 2026.", explanation: `${fmt(o.bank + o.cash)} + ${fmt(totRec)} − ${fmt(totPay)} = ${fmt(closeBC)}.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year ended 30 June 2026.", points: [`Subscriptions ${fmt(sIncome)} (own figure) and other income (fete ${fmt(r.fete)}, donations ${fmt(r.don)})`, `Groundsman's wages ${fmt(ground)}`, `Refreshments ${fmt(refr)}`, "Electricity and administration shown without adjustment", `Depreciation ${fmt(depE)} and ${fmt(depF)}`, `Total income ${fmt(income)}, total expenditure ${fmt(expd)} and surplus of ${fmt(surplus)}`], modelAnswer: ie, explanation: "Each item is adjusted for opening and closing balances." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: fundC, wrong: [fund0 - surplus, fund0], stem: "Calculate the accumulated fund at 30 June 2026.", explanation: `${fmt(fund0)} + ${fmt(surplus)} = ${fmt(fundC)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Comment on the club's financial position using the surplus and the accumulated fund.", points: [`A surplus of ${fmt(surplus)} means income exceeded expenditure and the fund has grown by about ${pctUp}%`, `The surplus relies partly on the fete (${fmt(r.fete)}) and donations (${fmt(r.don)}), which may not repeat`, `The club should continue to monitor subscriptions and costs, and build the bank balance of ${fmt(closeBC)}`], modelAnswer: `The surplus of ${money(surplus)} increased the fund by about ${pctUp}%, but part of the income came from the fete and donations, which may not be repeated. The club should keep subscriptions and costs under review.`, explanation: "One mark each for the surplus, its reliability and a recommendation." }),
    ],
    hints: ["Convert each cash figure to the amount for the year.", "Depreciation on equipment is calculated after adding the new purchases."],
    explanation: "This item practises the accumulated fund and the conversion to an income and expenditure account.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Receipts and payments account", "A summary of the cash book showing cash and bank received and paid, with opening and closing balances.", undefined, { applies: CAM });
  b.card("DEFINITION", "Accumulated fund", "The net assets of a club: assets less liabilities. The club's equivalent of capital.");
  b.card("FORMULA", "Accumulated fund (closing)", "Opening fund + surplus (or − deficit).");
  b.card("FACT", "Limits of the receipts and payments account", "Cash only: no accruals, prepayments, depreciation, inventory, arrears or fixed assets; capital and revenue items are mixed.", undefined, { applies: CAM });
  b.card("FORMULA", "Expense from cash paid", "Cash paid − opening accrual + closing accrual (prepayments the other way).");
  b.card("FORMULA", "Subscription income", "Cash received + closing arrears − opening arrears + opening advance − closing advance.");
  b.card("FACT", "Capital items", "Equipment bought is not an expense; depreciation is charged in the income and expenditure account.");
  b.card("DEFINITION", "Statement of affairs", "A list of assets and liabilities at a date, used to find the accumulated fund.");
  b.card("DEFINITION", "Surplus and deficit", "A surplus is income greater than expenditure; a deficit is expenditure greater than income.");
});
