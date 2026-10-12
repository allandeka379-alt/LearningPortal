// W2b: club.income-expenditure
import { concept, P, money, fmt, chk, r2, sum, statement } from "../lib.mjs";
import { mc, U, subs } from "../tables/w2b-lib.mjs";

concept("aacc.club.income-expenditure", { file: "club/income-expenditure", keyPrefix: "club.income-expenditure" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a surplus in the accounts of a club?",
    right: ["The excess of income over expenditure for the period", "Correct: it is the club's equivalent of a profit."],
    wrong: [["The excess of expenditure over income", "That is a deficit."], ["The balance of the bank account at the year end", "A bank balance is a cash figure, not a surplus."], ["The total subscriptions received in the year", "Subscriptions are only one source of income."]],
    explanation: "A surplus is income exceeding expenditure; it is added to the accumulated fund.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is a surplus for the year dealt with at the end of the year?",
    right: ["It is added to the accumulated fund", "Correct: the fund grows by the surplus."],
    wrong: [["It is shared among the members in cash", "A club does not distribute its surplus as profit."], ["It is deducted from the accumulated fund", "A deficit is deducted, not a surplus."], ["It is shown as a liability", "A surplus is not owed to anyone."]],
    explanation: "A surplus increases the accumulated fund; a deficit reduces it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A supporter gives a club US\\$500 to use as it wishes. How is the donation treated?",
    right: ["As income in the income and expenditure account", "Correct: a general donation is income of the year."],
    wrong: [["As a liability until it is spent", "A general donation has no condition."], ["As a deduction from the accumulated fund", "A gift does not reduce the fund."], ["As capital expenditure", "A donation received is not an expenditure."]],
    explanation: "A donation that may be used freely is income in the income and expenditure account.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A donor gives US\\$4,000 for the purchase of new floodlights. How should the club treat it?",
    right: ["Credit a specific fund in the statement of financial position", "Correct: the gift is for a capital purpose and is not income of the year."],
    wrong: [["Credit it to the income and expenditure account as income", "The money can only be used for floodlights, so it is not general income."], ["Deduct it from the cost of the floodlights in the expenditure", "The gift is recorded in its own fund."], ["Ignore it until the floodlights are bought", "It is received and must be recorded."]],
    hints: ["Can the club spend the money on anything it chooses?"],
    explanation: "A capital donation for a stated purpose is recorded in a separate fund, not as income.",
  });
  const q5 = { fee: 2400, years: 8 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club receives life membership fees of ${money(q5.fee)} in the year. The policy is to credit the fees to income in equal amounts over ${q5.years} years, starting with the year of receipt. How much is deferred income at the end of the first year?`,
    right: [money(q5.fee - q5.fee / q5.years), "Correct: 2,400 less one eighth (300)."],
    wrong: [[money(q5.fee / q5.years), "This is the amount taken to income this year."], [money(q5.fee), "One eighth has already been credited to income."], [money(q5.fee - 2 * q5.fee / q5.years), "Only one year's instalment has been credited so far."]],
    hints: ["Deferred = total less the part credited to income."],
    explanation: "Income this year 2,400 ÷ 8 = 300. Deferred income 2,100.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A club buys new equipment for US\\$1,500. How does this affect the income and expenditure account?",
    right: ["Only depreciation on the equipment is charged", "Correct: the purchase is capital expenditure."],
    wrong: [["The whole US\\$1,500 is charged as expenditure", "The equipment will be used for several years."], ["The US\\$1,500 is added to income", "A purchase is not income."], ["There is no effect because the equipment is paid for", "Depreciation is charged in each year of use."]],
    hints: ["Capital or revenue?"],
    explanation: "Capital expenditure is shown as an asset; its depreciation is an expense of each year.",
  });
  const q7 = { fund: 36500, deficit: 2250 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A club's accumulated fund was ${money(q7.fund)} at the start of the year. The income and expenditure account showed a deficit of ${money(q7.deficit)}. What is the accumulated fund at the end of the year?`,
    right: [money(q7.fund - q7.deficit), "Correct: a deficit reduces the fund."],
    wrong: [[money(q7.fund + q7.deficit), "A deficit is deducted."], [money(q7.deficit), "This is only the deficit."], [money(q7.fund), "The result of the year changes the fund."]],
    hints: ["Deficit = expenditure above income."],
    explanation: "36,500 − 2,250 = 34,250.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A club has US\\$6,000 in the bank, of which US\\$4,000 was donated for a new pavilion. How should the statement of financial position show this?",
    right: ["The US\\$6,000 is shown as bank, and US\\$4,000 as a pavilion fund", "Correct: the donation is cash held for a purpose, matched by a specific fund."],
    wrong: [["Only US\\$2,000 is shown as bank, since the rest is not the club's", "The whole balance is a club asset."], ["The US\\$4,000 is added to the accumulated fund as part of the surplus", "It is restricted, so it is shown separately."], ["The US\\$4,000 is shown as a current liability owed to the donor", "It is a fund, not a debt."]],
    hints: ["Think of both sides of the statement."],
    explanation: "The asset side shows all the cash; the funds side shows the restricted part separately.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Depreciation of the club's equipment is an item of expenditure in the income and expenditure account.",
    answer: true,
    explanation: "True. Depreciation is the part of the cost of equipment used up in the year.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A donation received for a stated capital purpose is credited to the income and expenditure account as income of the year.",
    answer: false,
    hints: ["Can it be spent on running costs?"],
    explanation: "False. It is credited to a specific fund; it is not income of the year.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item with its treatment in a club's final accounts.",
    pairs: [["General donation", "Income in the income and expenditure account"], ["Donation for a new pavilion", "Specific fund in the statement of financial position"], ["Unspent part of a life membership fee spread over years", "Deferred income (liability)"], ["Purchase of new equipment", "Non-current asset; depreciation is expenditure"]],
    explanation: "The treatment depends on the nature and purpose of each item.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about a club's accounts.",
    template: "The income and expenditure account is prepared on the {{blank:a}} basis. An excess of expenditure over income is a {{blank:b}}. A deficit is {{blank:c}} from the accumulated fund.",
    blanks: [
      { id: "a", accepted: ["accruals"], choices: ["accruals", "cash", "break-even"] },
      { id: "b", accepted: ["deficit"], choices: ["deficit", "surplus", "reserve"] },
      { id: "c", accepted: ["deducted"], choices: ["deducted", "added"] },
    ],
    explanation: "Accruals basis, deficit, deducted from the fund.",
  });

  // --- Numerical / calculations
  const n1 = subs({ date0: "1 Apr 2025", date1: "31 Mar 2026", o: { arrears: 260, advance: 90 }, c: { arrears: 310, advance: 100 }, received: 6450 });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n1.income, wrong: [6450, 6450 + 260 - 310 + 90 - 100],
    stem: `A club received ${money(6450)} in subscriptions. Arrears were ${money(260)} at the start and ${money(310)} at the end; advances were ${money(90)} at the start and ${money(100)} at the end. Calculate the subscriptions income.`,
    hints: ["Closing arrears and opening advance are added."],
    explanation: "6,450 + 310 + 90 − 260 − 100 = 6,490.",
  });
  const n2 = { cost: 9200, rate: 0.1, add: 1800 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk((n2.cost + n2.add) * n2.rate, 1100), wrong: [n2.cost * n2.rate, n2.add * n2.rate],
    stem: `A club depreciates equipment at 10% per annum on cost. The equipment cost ${money(n2.cost)} at the start of the year and new equipment costing ${money(n2.add)} was bought during the year (a full year's charge is made). Calculate the depreciation for the year.`,
    explanation: "10% × (9,200 + 1,800) = 1,100.",
  });
  const n3 = { inc: 21400, exp: 24650 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.exp - n3.inc, 3250), wrong: [n3.inc - n3.exp, n3.inc + n3.exp],
    stem: `A club's total income for the year was ${money(n3.inc)} and total expenditure ${money(n3.exp)}. Calculate the deficit.`,
    hints: ["Which is larger?"],
    explanation: "24,650 − 21,400 = 3,250 deficit.",
  });
  const n4 = { fund0: 41200, inc: 18900, exp: 17350 };
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n4.fund0 + n4.inc - n4.exp, 42750), wrong: [n4.fund0 - n4.inc + n4.exp, n4.fund0 + n4.inc],
    stem: `A club's accumulated fund was ${money(n4.fund0)} at the start of the year. Income was ${money(n4.inc)} and expenditure ${money(n4.exp)}. Calculate the accumulated fund at the end of the year.`,
    hints: ["Find the surplus or deficit first."],
    explanation: "Surplus 18,900 − 17,350 = 1,550. Fund 41,200 + 1,550 = 42,750.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account that a club prepares to show whether its income covered its expenditure.",
    accepted: ["income and expenditure account", "income and expenditure", "income & expenditure account"],
    explanation: "The income and expenditure account is the club's equivalent of the statement of profit or loss.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a donation for a specific capital purpose is not treated as income in the year it is received.",
    points: ["The money can only be used for the stated purpose, not for running costs", "It does not measure how well the club covered its running costs in the year", "It is recorded in a separate fund until the money is spent on the asset"],
    modelAnswer: "The money can only be used for the stated capital purpose, so it is not available for running costs and does not show how well the year's income covered expenditure. It is held in a separate fund until it is spent.",
    hints: ["Can the club use the money freely?"],
    explanation: "One mark each for restriction, measurement and the fund.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe two ways in which a club can treat life membership fees.",
    points: ["Spread the fee over a number of years, crediting one instalment to income each year", "The unspent part is shown as deferred income (a liability)", "Alternatively credit the whole fee to the accumulated fund immediately"],
    modelAnswer: "The fee can be spread over a number of years, with one instalment credited to income each year and the unspent part shown as deferred income. Alternatively, the whole fee can be credited to the accumulated fund at once.",
    hints: ["One method spreads, one does not."],
    explanation: "One mark for each method and one for the deferred income.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A club reports a surplus of US\\$1,350 but US\\$1,650 of its income came from a fete. Evaluate the club's financial position.",
    points: ["Without the fete the club would have had a deficit of US\\$300", "Fete income is not certain every year, so the position is fragile", "The club should review subscriptions and costs", "Conclusion: the position is weaker than the surplus suggests"],
    modelAnswer: "Without the fete the club would have a deficit of US\\$300. Fete income may not be repeated, so the position is fragile. The club should review its subscriptions and costs, and its position is weaker than the surplus suggests.",
    hints: ["What if the fete had not been held?"],
    explanation: "A balanced answer notes dependence on one-off income and recommends a step.",
  });

  // --- Practice structured 1 (12 marks)
  const y = { sub: 5150, ent: 360, don: 420, con: 680, hall: 1950, coach: 1370, eq: 760, pr: 310, ae0: 3300, ac: 230, ao: 180, po: 110, pc: 75, hc: 265, bus: 1650 };
  const ys = subs({ date0: "1 Apr 2025", date1: "31 Mar 2026", o: { arrears: y.ao, advance: y.po }, c: { arrears: y.ac, advance: y.pc }, received: y.sub });
  const yHall = chk(y.hall + y.hc, 2215);
  const yDep = chk((y.ae0 + y.eq) * 0.1, 406);
  const yInc = chk(ys.income + y.ent + y.don + y.con, 6695);
  const yExp = chk(yHall + y.coach + y.pr + yDep, 4301);
  const yS = chk(yInc - yExp, 2394);
  const yMd = statement("Mutare Youth Club: income and expenditure account for the year ended 31 March 2026", [
    ["Income", null, null], ["Subscriptions", ys.income, null], ["Entrance fees", y.ent, null], ["Donations", y.don, null], ["Profit on the concert", y.con, null], ["Total income", null, yInc],
    ["Expenditure", null, null], ["Hall hire", yHall, null], ["Coach", y.coach, null], ["Printing", y.pr, null], ["Depreciation of equipment", yDep, null], ["Total expenditure", null, -yExp], ["**Surplus for the year**", null, yS],
  ], { cols: [U, U] });
  chk(ys.income, 5235);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mutare Youth Club's year ends on 31 March 2026. Receipts: subscriptions ${money(y.sub)}, entrance fees ${money(y.ent)}, general donations ${money(y.don)} and profit on a concert ${money(y.con)}. Payments: hall hire ${money(y.hall)}, coach ${money(y.coach)}, new sports equipment ${money(y.eq)} and printing ${money(y.pr)}. Equipment at the start of the year cost ${money(y.ae0)}; it is depreciated at 10% on cost, including additions. Subscriptions in arrears: ${money(y.ao)} at the start, ${money(y.ac)} at the end. Subscriptions in advance: ${money(y.po)} at the start, ${money(y.pc)} at the end. ${money(y.hc)} was owing for hall hire at the end of the year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: ys.income, wrong: [y.sub], stem: "Calculate the subscriptions income for the year.", explanation: `${fmt(y.sub)} + ${fmt(y.ac)} + ${fmt(y.po)} − ${fmt(y.ao)} − ${fmt(y.pc)} = ${fmt(ys.income)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: yHall, wrong: [y.hall - y.hc], stem: "Calculate the hall hire expense.", explanation: `${fmt(y.hall)} + ${fmt(y.hc)} = ${fmt(yHall)} (nothing owing at the start).` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: yDep, wrong: [y.ae0 * 0.1], stem: "Calculate the depreciation of equipment.", explanation: `10% × (${fmt(y.ae0)} + ${fmt(y.eq)}) = ${fmt(yDep)}.` }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year.", points: ["Heading with the name of the club and the period", `Subscriptions ${fmt(ys.income)} and other income (entrance fees, donations, concert profit)`, `Total income ${fmt(yInc)}`, `Hall hire ${fmt(yHall)}, coach, printing and depreciation ${fmt(yDep)} (no charge for the equipment bought)`, `Total expenditure ${fmt(yExp)} and surplus ${fmt(yS)}`], modelAnswer: yMd, explanation: "The equipment is not an expense; only depreciation is." }),
      P.manual({ label: "(e)", marks: 3, stem: `A supporter gives the club ${money(y.bus)} for a new minibus. Explain how this is shown in the club's accounts.`, points: ["It is not income in the income and expenditure account", "It is credited to a minibus fund in the statement of financial position", "The money is held until the minibus is bought"], modelAnswer: `The ${money(y.bus)} is not income. It is credited to a minibus fund in the statement of financial position and is held until the minibus is bought.`, explanation: "One mark each for the three points." }),
    ],
    hints: ["Use opening and closing balances for each adjustment.", "New equipment is not an expense."],
    explanation: "This item practises the income and expenditure account and the treatment of a specific donation.",
  });

  // --- Practice structured 2 (18 marks)
  const o = { hall: 33000, eq: 6600, bank: 2150, arr: 360, adv: 160, acc: 230 };
  const fund0 = chk(o.hall + o.eq + o.bank + o.arr - o.adv - o.acc, 41720);
  const r = { sub: 8300, don: 540, stage: 1380, life: 960, con: 870 };
  const p = { cr: 3800, el: 1240, eq: 1700, ins: 650, adm: 920 };
  const c = { arr: 410, adv: 205, acc: 340, pre: 90 };
  const bankC = chk(o.bank + Object.values(r).reduce((a, x) => a + x, 0) - Object.values(p).reduce((a, x) => a + x, 0), 5890);
  const ss = subs({ date0: "1 Oct 2025", date1: "30 Sep 2026", o: { arrears: o.arr, advance: o.adv }, c: { arrears: c.arr, advance: c.adv }, received: r.sub });
  chk(ss.income, 8305);
  const care = chk(p.cr - o.acc + c.acc, 3910);
  const ins = chk(p.ins - c.pre, 560);
  const dep = chk((o.eq + p.eq) * 0.1, 830);
  const lifeI = chk(r.life / 8, 120);
  const lifeD = r.life - lifeI;
  const inc = chk(ss.income + r.don + r.con + lifeI, 9835);
  const exp = chk(care + p.el + ins + p.adm + dep, 7460);
  const sur = chk(inc - exp, 2375);
  const eqC = o.eq + p.eq - dep;
  const nca = o.hall + eqC;
  const ca = c.arr + c.pre + bankC;
  const cl = c.adv + c.acc;
  const net = chk(nca + ca - cl - lifeD, 45475);
  chk(fund0 + sur + r.stage, net);
  const ie2 = statement("Chinhoyi Cultural Society: income and expenditure account for the year ended 30 September 2026", [
    ["Income", null, null], ["Subscriptions", ss.income, null], ["General donations", r.don, null], ["Profit on the concert", r.con, null], ["Life membership fees (1/8 of 960)", lifeI, null], ["Total income", null, inc],
    ["Expenditure", null, null], ["Caretaker's wages", care, null], ["Electricity", p.el, null], ["Insurance", ins, null], ["Administration", p.adm, null], ["Depreciation of equipment", dep, null], ["Total expenditure", null, -exp], ["**Surplus for the year**", null, sur],
  ], { cols: [U, U] });
  const sofp2 = statement("Chinhoyi Cultural Society: statement of financial position at 30 September 2026", [
    ["Hall", o.hall, null], ["Equipment", eqC, null], ["", null, nca], ["Subscriptions in arrears", c.arr, null], ["Insurance prepaid", c.pre, null], ["Bank", bankC, null], ["", null, ca],
    ["Subscriptions in advance", -c.adv, null], ["Caretaker's wages owing", -c.acc, null], ["", null, -cl], ["Life membership (deferred income)", null, -lifeD], ["**Net assets**", null, net],
    ["Accumulated fund at 1 October 2025", null, fund0], ["Add surplus", null, sur], ["Accumulated fund at 30 September 2026", null, fund0 + sur], ["Stage fund", null, r.stage], ["**Total funds**", null, fund0 + sur + r.stage],
  ], { cols: [U, U], checks: [["net", net, fund0 + sur + r.stage]] });
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Chinhoyi Cultural Society's year ends on 30 September 2026. At 1 October 2025: hall ${money(o.hall)}, equipment ${money(o.eq)}, bank ${money(o.bank)}, subscriptions in arrears ${money(o.arr)}; subscriptions in advance ${money(o.adv)}, caretaker owed ${money(o.acc)}. Receipts: subscriptions ${money(r.sub)}, general donations ${money(r.don)}, a donation of ${money(r.stage)} for a new stage (specific purpose), life membership fees ${money(r.life)} (credited to income over 8 years, one eighth this year) and profit on a concert ${money(r.con)}. Payments: caretaker ${money(p.cr)}, electricity ${money(p.el)}, new equipment ${money(p.eq)}, insurance ${money(p.ins)}, administration ${money(p.adm)}. At 30 September 2026: subscriptions in arrears ${money(c.arr)}, in advance ${money(c.adv)}, caretaker owed ${money(c.acc)}, insurance prepaid ${money(c.pre)}. Equipment is depreciated at 10% on cost including additions.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: fund0, wrong: [fund0 + o.adv + o.acc], stem: "Calculate the accumulated fund at 1 October 2025.", explanation: `Assets ${fmt(o.hall + o.eq + o.bank + o.arr)} less liabilities ${fmt(o.adv + o.acc)} = ${fmt(fund0)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: ss.income, wrong: [r.sub], stem: "Calculate the subscriptions income for the year.", explanation: `${fmt(r.sub)} + ${fmt(c.arr)} + ${fmt(o.adv)} − ${fmt(o.arr)} − ${fmt(c.adv)} = ${fmt(ss.income)}.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year.", points: [`Subscriptions ${fmt(ss.income)}, general donations ${fmt(r.don)} and concert profit ${fmt(r.con)}`, `Life membership ${fmt(lifeI)} (one eighth of ${fmt(r.life)}); the stage donation is not income`, `Caretaker ${fmt(care)} and insurance ${fmt(ins)}`, "Electricity and administration unadjusted", `Depreciation ${fmt(dep)} (not the equipment purchase)`, `Total income ${fmt(inc)}, total expenditure ${fmt(exp)} and surplus ${fmt(sur)}`], modelAnswer: ie2, explanation: "The stage donation is held in a fund." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: bankC, wrong: [bankC - r.stage], stem: "Calculate the closing balance of the bank.", explanation: `${fmt(o.bank)} + ${fmt(Object.values(r).reduce((a, x) => a + x, 0))} − ${fmt(Object.values(p).reduce((a, x) => a + x, 0))} = ${fmt(bankC)}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of financial position at 30 September 2026.", points: [`Non-current assets: hall ${fmt(o.hall)} and equipment ${fmt(eqC)}`, `Current assets: arrears ${fmt(c.arr)}, prepayment ${fmt(c.pre)} and bank ${fmt(bankC)}`, `Current liabilities ${fmt(cl)} and deferred life membership income ${fmt(lifeD)}`, `Accumulated fund ${fmt(fund0 + sur)} and stage fund ${fmt(r.stage)}, total ${fmt(net)} agreeing with net assets`], modelAnswer: sofp2, explanation: "Net assets equal the total of the funds." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the donation for the new stage is not included in the income and expenditure account.", points: ["It was given for a stated capital purpose, not for running costs", "It does not measure how well the year's income covered the year's expenditure", "It is credited to a stage fund until the stage is built"], modelAnswer: "The donation was given for a stated capital purpose, so it is not available for running costs and does not measure the year's performance. It is credited to a stage fund until the stage is built.", explanation: "One mark each." }),
    ],
    hints: ["Convert each cash figure to the amount for the year.", "Show all funds in the statement of financial position."],
    explanation: "This item practises a full set of club accounts with a specific donation and life membership fees.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Income and expenditure account", "A statement of the income and expenditure of a club for the period on the accruals basis; the result is a surplus or deficit.");
  b.card("FORMULA", "Closing accumulated fund", "Opening accumulated fund + surplus (or − deficit) of the year.");
  b.card("FACT", "General donation", "Income in the income and expenditure account.");
  b.card("FACT", "Donation for a capital purpose", "Credited to a specific fund in the statement of financial position, not to income.");
  b.card("FACT", "Donated asset", "Recorded as an asset at its value, with a matching credit to a capital fund.");
  b.card("CONCEPT", "Life membership fees", "Spread over a stated number of years (the rest is deferred income) or credited to the accumulated fund.");
  b.card("FACT", "Capital payments", "Equipment bought is an asset; only depreciation is expenditure.");
  b.card("CONCEPT", "Balance check", "Net assets = accumulated fund + other funds.");
  b.card("CONCEPT", "Reliability of income", "A surplus that depends on fundraising events may not be repeated.");
});
