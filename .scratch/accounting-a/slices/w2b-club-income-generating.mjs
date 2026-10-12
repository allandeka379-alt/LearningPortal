// W2b: club.income-generating
import { concept, P, money, fmt, chk, r2, sum, statement } from "../lib.mjs";
import { mc, U } from "../tables/w2b-lib.mjs";

concept("aacc.club.income-generating", { file: "club/income-generating", keyPrefix: "club.income-generating" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Where is the profit on a club's bar shown in the club's final accounts?",
    right: ["As income in the income and expenditure account", "Correct: the profit supports the club's other activities."],
    wrong: [["As a deduction from the accumulated fund", "A profit increases, never reduces, the fund."], ["In the statement of financial position as a liability", "A profit is income, not a liability."], ["In the receipts and payments account as a payment", "It is not a cash payment."]],
    explanation: "The bar's profit or loss is transferred to the income and expenditure account.",
  });
  const q2 = { paid: 7400, o: 600, c: 450 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A club paid ${money(q2.paid)} to its bar suppliers. It owed them ${money(q2.o)} at the start of the year and ${money(q2.c)} at the end. What were the bar purchases for the year?`,
    right: [money(q2.paid + q2.c - q2.o), "Correct: 7,400 + 450 − 600."],
    wrong: [[money(q2.paid + q2.o - q2.c), "The amounts owing have been adjusted the wrong way."], [money(q2.paid), "Payments must be adjusted for amounts owing."], [money(q2.paid + q2.o + q2.c), "Opening creditors are deducted, not added."]],
    hints: ["Closing creditors are goods received but not yet paid for."],
    explanation: "Purchases = payments + creditors at the end − creditors at the start = 7,250.",
  });
  const q3 = { o: 900, p: 6300, c: 1100 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Bar inventory was ${money(q3.o)} at the start of the year and ${money(q3.c)} at the end. Bar purchases were ${money(q3.p)}. What was the cost of sales?`,
    right: [money(q3.o + q3.p - q3.c), "Correct: 900 + 6,300 − 1,100."],
    wrong: [[money(q3.p), "Inventories must be taken into account."], [money(q3.o + q3.p + q3.c), "Closing inventory must be deducted."], [money(q3.p - q3.o + q3.c), "The opening and closing inventories are reversed."]],
    hints: ["Goods available for sale less what is left."],
    explanation: "Cost of sales = 900 + 6,300 − 1,100 = 6,100.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A club's dinner dance makes a loss. How is the loss shown in the income and expenditure account?",
    right: ["As an expense in the expenditure section", "Correct: a loss on an activity is an expense."],
    wrong: [["As income in the income section", "A loss is not income."], ["It is deducted from the cost of sales of the bar", "Activities are accounted for separately."], ["It is not shown, because clubs do not make losses", "A club can make a loss on an activity."]],
    hints: ["Is it a gain or a cost?"],
    explanation: "A loss on an activity is a cost of the club, so it is shown with expenditure.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Which of the following is a direct cost of the club's bar and should be charged in the bar trading account?",
    right: ["Wages of the bar steward", "Correct: it is a cost of running the bar."],
    wrong: [["Insurance of the clubhouse", "This is a general expense of the club."], ["Depreciation of the pavilion", "This relates to the whole club."], ["The secretary's stationery", "This is an administration expense."]],
    hints: ["Which cost exists only because there is a bar?"],
    explanation: "Only costs of the bar itself are charged to the bar account.",
  });
  const q6 = { paid: 2400, o: 120, c: 200 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Bar wages paid in the year were ${money(q6.paid)}. ${money(q6.o)} was owing at the start of the year and ${money(q6.c)} is owing at the end. What bar wages are charged to the bar account?`,
    right: [money(q6.paid - q6.o + q6.c), "Correct: 2,400 − 120 + 200."],
    wrong: [[money(q6.paid + q6.o - q6.c), "The accruals have been adjusted the wrong way."], [money(q6.paid), "The wages must be adjusted for the amounts owing."], [money(q6.paid + q6.o + q6.c), "Opening accrued wages are deducted."]],
    hints: ["Remove last year's cost and add this year's accrual."],
    explanation: "Wages for the year = 2,400 − 120 + 200 = 2,480.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which one of the following is correct about the account of a fundraising event?",
    right: ["It shows the event's income less the event's own costs", "Correct: general club expenses are not charged to it."],
    wrong: [["It includes a share of all the general expenses of the club", "Only the event's own costs are charged."], ["It shows the receipts only, with no costs deducted", "The costs must be deducted to find the result."], ["It is part of the accumulated fund of the club", "The event's result goes to the income and expenditure account."]],
    hints: ["What is the purpose of the account?"],
    explanation: "Event income less event costs gives the profit or loss.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A bar has a gross profit of US\\$6,000 and bar wages of US\\$6,400. What should the committee conclude, and what is the result?",
    right: ["The bar made a loss of US\\$400, and the wages should be reviewed against takings", "Correct: gross profit less wages is a negative figure."],
    wrong: [["The bar made a profit of US\\$400 because wages are a revenue item", "Wages reduce profit."], ["The bar made a profit of US\\$12,400", "Gross profit and wages cannot be added."], ["The bar made a loss of US\\$6,000", "The loss is the difference between the two figures."]],
    hints: ["Profit on the bar = gross profit − bar wages."],
    explanation: "6,000 − 6,400 = loss of 400; the committee should compare opening hours, prices and wages.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Bar purchases can be found from payments to suppliers by adjusting for the amounts owing at the start and at the end of the year.",
    answer: true,
    explanation: "True. Purchases = payments + closing creditors − opening creditors.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The general expenses of the club, such as insurance of the clubhouse, are charged in the bar trading account.",
    answer: false,
    explanation: "False. Only the direct costs of the bar are charged; general expenses are in the income and expenditure account.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item with its place in the accounts of a club.",
    pairs: [["Bar takings", "Income in the bar trading account"], ["Bar wages", "Direct expense of the bar"], ["Profit on a dinner dance", "Income in the income and expenditure account"], ["Loss on a stall", "Expense in the income and expenditure account"]],
    explanation: "Activity accounts feed their net result to the income and expenditure account.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about club activities.",
    template: "Cost of sales equals opening inventory plus {{blank:a}} less closing inventory. Gross profit is takings less {{blank:b}}. The net result is transferred to the income and {{blank:c}} account.",
    blanks: [
      { id: "a", accepted: ["purchases"], choices: ["purchases", "sales", "wages"] },
      { id: "b", accepted: ["cost of sales"], choices: ["cost of sales", "expenses", "wages"] },
      { id: "c", accepted: ["expenditure"], choices: ["expenditure", "appropriation", "capital"] },
    ],
    explanation: "Purchases, cost of sales and the income and expenditure account.",
  });

  // --- Numerical / calculations
  const n1 = { paid: 11800, o: 950, c: 1250, io: 1800, ic: 2200 };
  const n1p = chk(n1.paid + n1.c - n1.o, 12100);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.io + n1p - n1.ic, 11700), wrong: [n1p, n1.io + n1.paid - n1.ic],
    stem: `A club paid ${money(n1.paid)} to bar suppliers. It owed ${money(n1.o)} at the start and ${money(n1.c)} at the end. Bar inventory was ${money(n1.io)} at the start and ${money(n1.ic)} at the end. Calculate the cost of sales of the bar.`,
    hints: ["First find the purchases."],
    explanation: "Purchases 11,800 + 1,250 − 950 = 12,100. Cost of sales 1,800 + 12,100 − 2,200 = 11,700.",
  });
  const n2 = { tickets: 90, price: 12, costs: 910 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n2.tickets * n2.price - n2.costs, 170), wrong: [n2.tickets * n2.price, n2.costs - n2.tickets * n2.price],
    stem: `A club sold ${n2.tickets} tickets at ${money(n2.price)} for a social evening. The costs of the evening were ${money(n2.costs)}. Calculate the profit on the evening.`,
    explanation: "90 × 12 = 1,080. Profit 1,080 − 910 = 170.",
  });
  const n3 = { sales: 18600, cos: 12450, wages: 3300, acc0: 150, acc1: 250 };
  const n3w = chk(n3.wages - n3.acc0 + n3.acc1, 3400);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.sales - n3.cos - n3w, 2750), wrong: [n3.sales - n3.cos - n3.wages, n3.sales - n3.cos],
    stem: `A club bar had takings of ${money(n3.sales)} and a cost of sales of ${money(n3.cos)}. Bar wages paid were ${money(n3.wages)}; wages owing were ${money(n3.acc0)} at the start and ${money(n3.acc1)} at the end. Calculate the profit on the bar.`,
    hints: ["Adjust the wages first."],
    explanation: "Wages 3,300 − 150 + 250 = 3,400. Gross profit 6,150. Profit 6,150 − 3,400 = 2,750.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", dp: 1, calculator: true,
    value: (6150 / 18600) * 100, wrong: [(2750 / 18600) * 100, (6150 / 12450) * 100],
    stem: "A bar had takings of US\\$18,600 and a gross profit of US\\$6,150. Calculate the gross profit margin on the bar, to one decimal place.",
    hints: ["Gross profit ÷ takings × 100."],
    explanation: "6,150 ÷ 18,600 × 100 = 33.06%, which is 33.1%.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account in which a club calculates the profit on its bar.",
    accepted: ["bar trading account", "bar account", "trading account", "bar trading"],
    explanation: "A bar trading account finds the gross profit and profit on the bar.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a club prepares a separate account for its bar instead of putting all bar income and costs in the income and expenditure account.",
    points: ["The separate account shows the profit or loss made on the bar", "It keeps the income and expenditure account simple by showing only the net result", "The committee can judge whether the bar is worth running"],
    modelAnswer: "A separate bar account shows the profit or loss on the bar. It keeps the income and expenditure account simpler by showing only the net result, and lets the committee judge whether the bar is worth running.",
    hints: ["What does the committee want to know?"],
    explanation: "One mark each for showing the result, simplicity and judging the activity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why purchases of bar supplies cannot be taken directly from the payments to suppliers.",
    points: ["Some goods bought this year are not yet paid for (creditors at the end)", "Some payments are for goods bought last year (creditors at the start)", "Purchases must be adjusted for both: payments + closing creditors − opening creditors"],
    modelAnswer: "Some goods bought this year are not yet paid for, and some payments are for goods bought last year. Purchases are therefore payments plus closing creditors less opening creditors.",
    hints: ["Think about timing of payment."],
    explanation: "One mark each for each timing difference and the adjustment.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A club's dinner dance makes a loss of US\\$150. The chairperson says the event should be stopped. Evaluate this view.",
    points: ["A loss means the event's income was less than its costs, so it drains funds", "The event may bring non-financial benefits: members socialise, new members join, the club's name is promoted", "Prices or costs could be changed to avoid a loss", "Conclusion: continue only if the benefits justify the cost or the event can be made to break even"],
    modelAnswer: "A loss drains funds, but a dinner dance may bring members together and attract new ones. The committee could raise the ticket price or cut costs. The event should continue only if the benefits justify the cost or it can break even.",
    hints: ["Are there benefits that are not in the figures?"],
    explanation: "A balanced answer weighs financial and non-financial factors and reaches a judgement.",
  });

  // --- Practice structured 1 (10 marks): bar
  const s1 = { sales: 21500, io: 2100, ic: 2350, paid: 14200, so: 1300, sc: 900, w: 3600, wo: 200, wc: 300 };
  const s1p = chk(s1.paid + s1.sc - s1.so, 13800);
  const s1cos = chk(s1.io + s1p - s1.ic, 13550);
  const s1gp = chk(s1.sales - s1cos, 7950);
  const s1w = chk(s1.w - s1.wo + s1.wc, 3700);
  const s1pr = chk(s1gp - s1w, 4250);
  const s1md = statement("Bar trading account for the year ended 30 June 2026", [
    ["Bar takings", null, s1.sales], ["Opening inventory", s1.io, null], ["Purchases", s1p, null], ["Less closing inventory", -s1.ic, null], ["Cost of sales", null, -s1cos], ["**Gross profit**", null, s1gp], ["Bar steward's wages", null, -s1w], ["**Profit on the bar**", null, s1pr],
  ], { cols: [U, U] });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Masvingo Sports Club runs a bar. For the year ended 30 June 2026: takings ${money(s1.sales)}; bar inventory ${money(s1.io)} at the start and ${money(s1.ic)} at the end; payments to bar suppliers ${money(s1.paid)}; amounts owing to suppliers ${money(s1.so)} at the start and ${money(s1.sc)} at the end; bar steward's wages paid ${money(s1.w)}, with ${money(s1.wo)} owing at the start and ${money(s1.wc)} owing at the end.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1p, wrong: [s1.paid, s1.paid + s1.so - s1.sc], stem: "Calculate the bar purchases for the year.", explanation: "14,200 + 900 − 1,300 = 13,800." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1cos, wrong: [s1p], stem: "Calculate the cost of sales.", explanation: "2,100 + 13,800 − 2,350 = 13,550." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: s1pr, wrong: [s1gp, s1gp - s1.w], stem: "Calculate the profit on the bar after deducting the wages for the year.", explanation: "Gross profit 21,500 − 13,550 = 7,950. Wages 3,600 − 200 + 300 = 3,700. Profit 4,250." }),
      P.manual({ label: "(d)", marks: 2, stem: "State where the profit on the bar is shown in the club's final accounts and in which section.", points: ["In the income and expenditure account", "In the income section (added to the other income)"], modelAnswer: "The profit on the bar of US\\$4,250 is shown in the income and expenditure account, in the income section.", explanation: "One mark each." }),
    ],
    hints: ["Adjust payments for the suppliers owing.", "Adjust wages for the accruals."],
    explanation: "This item practises a bar trading account with purchases from payments.",
  });
  chk(s1pr, 4250);
  void s1md;

  // --- Practice structured 2 (14 marks): dinner dance and raffle
  const d = { adult: 80, adultP: 20, child: 30, childP: 8, heads: 110, perHead: 12, venue: 260, dj: 180, rafT: 420, rafP: 1, prizes: 160 };
  const inc = chk(d.adult * d.adultP + d.child * d.childP, 1840);
  const cost = chk(d.heads * d.perHead + d.venue + d.dj, 1760);
  const dp = chk(inc - cost, 80);
  const rp = chk(d.rafT * d.rafP - d.prizes, 260);
  const dm = statement("Annual dinner dance and raffle", [
    ["Ticket income: adults (80 × 20)", d.adult * d.adultP, null], ["Ticket income: children (30 × 8)", d.child * d.childP, null], ["Total ticket income", null, inc],
    ["Catering (110 × 12)", d.heads * d.perHead, null], ["Venue hire", d.venue, null], ["Disc jockey", d.dj, null], ["Total costs", null, -cost], ["**Profit on the dinner dance**", null, dp],
    ["Raffle ticket sales", d.rafT * d.rafP, null], ["Prizes", -d.prizes, null], ["**Profit on the raffle**", null, rp], ["**Total profit from the event**", null, dp + rp],
  ], { cols: [U, U] });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Bulawayo Arts Society held an annual dinner dance. It sold ${d.adult} adult tickets at ${money(d.adultP)} and ${d.child} child tickets at ${money(d.childP)}. Catering cost ${money(d.perHead)} per person for all ${d.heads} guests; the venue cost ${money(d.venue)} and the disc jockey ${money(d.dj)}. At the dance a raffle sold ${d.rafT} tickets at ${money(d.rafP)} each and the prizes cost ${money(d.prizes)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: inc, wrong: [d.adult * d.adultP], stem: "Calculate the total ticket income.", explanation: "80 × 20 + 30 × 8 = 1,600 + 240 = 1,840." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: dp, wrong: [cost, inc], stem: "Calculate the profit on the dinner dance.", explanation: "Costs 1,320 + 260 + 180 = 1,760. Profit 1,840 − 1,760 = 80." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rp, wrong: [d.rafT, d.prizes], stem: "Calculate the profit on the raffle.", explanation: "420 − 160 = 260." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: dp + rp, wrong: [dp, rp], stem: "Calculate the total profit from the event.", explanation: "80 + 260 = 340." }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare a statement showing the profit on the dinner dance and on the raffle.", points: ["Ticket income 1,840 and costs 1,760 shown", "Profit on the dinner dance 80", "Raffle: income 420, prizes 160 and profit 260, total profit 340"], modelAnswer: dm, explanation: "Each activity is shown with its own income and costs." }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate whether the society should hold the dinner dance again, and suggest how to improve the result.", points: ["The dinner dance itself made only 80 on takings of 1,840 (about 4%), a thin margin", "The raffle contributed more (260), so the event's total profit is 340", "Improve by raising ticket prices, reducing the cost per head or selling more raffle tickets; consider benefits such as member involvement"], modelAnswer: "The dance made only US\\$80 on takings of US\\$1,840, and the raffle added US\\$260 for a total of US\\$340. The society could raise the ticket price or lower the cost per head. It is worth holding again if it brings members together and the margin improves.", explanation: "One mark each for the thin margin, the raffle contribution and a suggestion." }),
    ],
    hints: ["Charge only the costs of the event.", "Add the two profits for the total."],
    explanation: "This item practises the profit on a fundraising event and an evaluation of its worth.",
  });

  // --- Flashcards
  b.card("FORMULA", "Bar purchases", "Payments to suppliers + suppliers owing at the end − suppliers owing at the start.");
  b.card("FORMULA", "Cost of sales (club)", "Opening inventory + purchases − closing inventory.");
  b.card("FORMULA", "Profit on the bar", "Takings − cost of sales − direct bar expenses (such as wages adjusted for accruals).");
  b.card("FACT", "Where the result goes", "The profit or loss of an activity is transferred to the income and expenditure account.");
  b.card("FACT", "Loss on an activity", "Shown as an expense in the income and expenditure account.");
  b.card("FACT", "Fundraising event", "Profit = income of the event − costs of the event only.");
  b.card("CONCEPT", "Direct costs only", "General expenses of the club are not charged to a bar or an event.");
  b.card("CONCEPT", "Judging activities", "Compare the financial result with non-financial benefits such as recruiting members.");
  b.card("DEFINITION", "Income-generating activity", "An activity such as a bar, canteen, dinner dance or raffle that raises money for the club.");
});
