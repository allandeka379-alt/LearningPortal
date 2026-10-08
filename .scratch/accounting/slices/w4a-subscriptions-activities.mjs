// W4a: club subscriptions and revenue-generating activities.
import { concept, P, money, r2, sum, check } from "../lib.mjs";
import { subscriptions, activity, tClosed, table, fmt, U } from "../tables/w4a-lib.mjs";

const subsIncome = ({ received, oA = 0, oV = 0, cA = 0, cV = 0 }) => r2(received - oA + oV + cA - cV);

concept("acc.clubs.subscriptions-activities", { file: "clubs/subscriptions-activities", keyPrefix: "clubs.subscriptions-activities" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How are subscriptions **in arrears** at the year end shown in a club's statement of financial position?",
    options: [
      ["As a current asset", "Correct: members owe this money to the club."],
      ["As a current liability", "Subscriptions in advance are a liability; arrears are not."],
      ["As part of the accumulated fund", "They are a separate asset; they affect the fund only through the surplus."],
      ["They are not shown at all", "Amounts owed to the club must be shown."],
    ],
    answer: "A",
    explanation: "Arrears are amounts owed to the club by members: a current asset.",
  });
  {
    const d = { received: 7840, oA: 260, oV: 140, cA: 310, cV: 195 };
    const inc = subsIncome(d);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A club received ${money(d.received)} in subscriptions during 2025. At 1 January 2025 arrears were ${money(d.oA)} and advances ${money(d.oV)}; at 31 December 2025 arrears were ${money(d.cA)} and advances ${money(d.cV)}. What is the subscription income for 2025?`,
      options: [
        [money(inc), "Correct: 7,840 − 260 + 140 + 310 − 195."],
        [money(d.received), "This is the cash received, not the income of the year."],
        [money(r2(d.received + d.oA - d.oV - d.cA + d.cV)), "Every adjustment has been made in the wrong direction."],
        [money(r2(d.received + d.cA - d.cV)), "The opening balances have been ignored."],
      ],
      answer: "A",
      hints: ["Remove last year's arrears and next year's advances from the cash; add this year's unpaid amounts and the advances received last year."],
      explanation: `${fmt(d.received)} − ${fmt(d.oA)} + ${fmt(d.oV)} + ${fmt(d.cA)} − ${fmt(d.cV)} = ${fmt(inc)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On which side of the subscriptions account is the **opening** balance of subscriptions paid **in advance** entered?",
    options: [
      ["Credit side, as balance b/d", "Correct: it is a liability brought forward, like income received in advance."],
      ["Debit side, as balance b/d", "Opening arrears go on the debit side, not advances."],
      ["Debit side, as balance c/d", "Balances c/d are closing balances."],
      ["Credit side, as balance c/d", "This is where closing arrears go."],
    ],
    answer: "A",
    explanation: "Opening advances: credit balance b/d. Opening arrears: debit balance b/d.",
  });
  {
    const paid = 8615, oP = 740, cP = 1065;
    const purch = r2(paid - oP + cP);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `A club's tuck shop paid suppliers ${money(paid)} during 2025. It owed suppliers ${money(oP)} at the start of the year and ${money(cP)} at the end. What were the tuck shop purchases for 2025?`,
      options: [
        [money(purch), "Correct: 8,615 − 740 + 1,065."],
        [money(r2(paid + oP - cP)), "The opening and closing payables have been swapped."],
        [money(paid), "This is the cash paid, not the purchases."],
        [money(r2(paid + oP + cP)), "The opening payables were paid this year but bought last year: deduct them."],
      ],
      answer: "A",
      explanation: `Purchases = payments − opening payables + closing payables = ${fmt(purch)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A club's refreshment bar made a profit of US\\$3,280. How is this shown in the income and expenditure account?",
    options: [
      ["As one line of income: profit on refreshment bar", "Correct: the details stay in the bar trading account."],
      ["Bar sales as income and bar purchases as expenditure", "The bar's trading figures belong in its own trading account."],
      ["It is added directly to the accumulated fund", "It is part of the year's income, which gives the surplus."],
      ["As expenditure, because the bar costs money to run", "A profit is income; only a loss would be expenditure."],
    ],
    answer: "A",
    explanation: "Only the net profit (or loss) of the activity is carried to the income and expenditure account.",
  });
  {
    const oI = 940, purch = 11380, cI = 1215;
    const cos = r2(oI + purch - cI);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A sports club's bar had opening inventory ${money(oI)}, purchases ${money(purch)} and closing inventory ${money(cI)}. What was the bar's cost of sales?`,
      options: [
        [money(cos), "Correct: 940 + 11,380 − 1,215."],
        [money(r2(purch - oI + cI)), "The inventories have been used the wrong way round."],
        [money(r2(oI + purch + cI)), "Closing inventory is deducted, not added."],
        [money(purch), "Purchases alone ignore the change in inventory."],
      ],
      answer: "A",
      hints: ["Cost of sales = opening inventory + purchases − closing inventory."],
      explanation: `${fmt(oI)} + ${fmt(purch)} − ${fmt(cI)} = ${fmt(cos)}.`,
    });
  }
  {
    const d = { received: 6480, oA: 0, oV: 210, cA: 360, cV: 150 };
    const withArr = subsIncome(d);
    const prudent = r2(withArr - d.cA);
    b.mcq({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A club's policy is **not** to treat subscriptions as income until they are received. In 2025 it received ${money(d.received)}; advances were ${money(d.oV)} at the start and ${money(d.cV)} at the end of the year; members owed ${money(d.cA)} for 2025 at the year end. There were no arrears at the start. What subscription income is shown for 2025?`,
      options: [
        [money(prudent), "Correct: the unpaid 360 is left out under this policy."],
        [money(withArr), "This includes the arrears, which the policy excludes."],
        [money(r2(d.received - d.cV)), "The opening advances, which belong to 2025, have been left out."],
        [money(d.received), "The advances at both ends still need adjusting."],
      ],
      answer: "A",
      hints: ["Advances are still adjusted; only the closing arrears are left out."],
      explanation: `${fmt(d.received)} + ${fmt(d.oV)} − ${fmt(d.cV)} = ${fmt(prudent)}. Including the arrears would give ${fmt(withArr)}, but the policy (prudence) excludes them.`,
    });
  }
  {
    const inc = 12450, oA = 380, oV = 225, cA = 465, cV = 360;
    const received = r2(inc + oA - oV - cA + cV);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Subscription income for 2025, transferred to the income and expenditure account, was ${money(inc)}. Arrears: ${money(oA)} at the start, ${money(cA)} at the end. Advances: ${money(oV)} at the start, ${money(cV)} at the end. How much cash was received for subscriptions in 2025?`,
      options: [
        [money(received), "Correct: the balancing figure on the credit side of the subscriptions account."],
        [money(r2(inc - oA + oV + cA - cV)), "The adjustments have been applied in the wrong direction."],
        [money(inc), "The income for the year is not the same as the cash received."],
        [money(r2(inc + cA - cV)), "Only the closing balances have been adjusted."],
      ],
      answer: "A",
      hints: ["Write out the subscriptions account and find the bank figure."],
      explanation: `Debits: ${fmt(oA)} + ${fmt(inc)} + ${fmt(cV)} = ${fmt(r2(oA + inc + cV))}. Credits other than bank: ${fmt(oV)} + ${fmt(cA)} = ${fmt(r2(oV + cA))}. Bank = ${fmt(received)}.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Subscriptions received in advance for next year are a liability of the club.",
    answer: true,
    explanation: "True. The club owes those members next year's membership.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The amount transferred from the subscriptions account to the income and expenditure account is always the cash received for subscriptions.",
    answer: false,
    explanation: "False. It is the subscription income belonging to the year, after adjusting for arrears and advances.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each item with where it is entered in the subscriptions account.",
    right: ["Debit side", "Credit side"],
    pairs: ["Arrears at the start of the year (b/d)", "Advances at the start of the year (b/d)", "Cash received", "Transfer to income and expenditure", "Arrears at the end of the year (c/d)", "Advances at the end of the year (c/d)"],
    rightIndex: [0, 1, 1, 0, 1, 0],
    hints: ["Treat arrears like money owed by customers and advances like income received early."],
    explanation: "Debits: opening arrears, income for the year, closing advances. Credits: opening advances, bank, closing arrears.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Bar purchases = payments to suppliers − {{blank:a}} payables + {{blank:b}} payables. The bar's profit is transferred to the {{blank:c}} account.",
    blanks: [
      { id: "a", accepted: ["opening"], choices: ["opening", "closing"] },
      { id: "b", accepted: ["closing"], choices: ["opening", "closing"] },
      { id: "c", accepted: ["income and expenditure"], choices: ["income and expenditure", "receipts and payments", "subscriptions"] },
    ],
    explanation: "Opening payables were bought last year; closing payables were bought this year but not yet paid.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const d = { received: 5390, oA: 150, oV: 95, cA: 205, cV: 120 };
    const inc = subsIncome(d);
    b.num({
      d: 2, kind: "money", value: inc, calculator: true, daily: true, wrong: [d.received, r2(d.received + d.oA - d.oV - d.cA + d.cV)],
      stem: `Cash received for subscriptions ${money(d.received)}. Arrears: start ${money(d.oA)}, end ${money(d.cA)}. Advances: start ${money(d.oV)}, end ${money(d.cV)}. Calculate the subscription income for the year.`,
      explanation: `${fmt(d.received)} − ${fmt(d.oA)} + ${fmt(d.oV)} + ${fmt(d.cA)} − ${fmt(d.cV)} = ${fmt(inc)}.`,
    });
  }
  {
    const a = activity({ name: "x", title: "x", sales: 8460, openInv: 715, purchases: r2(5230 - 410 + 585), closeInv: 830, expenses: [["Helper's wages", 1200]] });
    b.calc({
      d: 3, kind: "money", value: a.profit, calculator: true, wrong: [r2(8460 - (715 + 5230 - 830) - 1200), a.gp],
      stem: `A school club runs a tuck shop. For 2025: sales ${money(8460)}; cash paid to suppliers ${money(5230)}; suppliers owed ${money(410)} at the start and ${money(585)} at the end of the year; inventory ${money(715)} at the start and ${money(830)} at the end; a helper was paid ${money(1200)}. Calculate the tuck shop profit.`,
      hints: ["Find purchases first, then cost of sales."],
      explanation: `Purchases = 5,230 − 410 + 585 = ${fmt(r2(5230 - 410 + 585))}. Cost of sales = 715 + ${fmt(r2(5230 - 410 + 585))} − 830 = ${fmt(a.cos)}. Gross profit ${fmt(a.gp)}; less wages 1,200 = ${fmt(a.profit)}. Using the cash paid as purchases gives ${fmt(r2(8460 - (715 + 5230 - 830) - 1200))}.`,
    });
  }
  {
    // missing opening inventory from a known gross profit
    const sales = 14200, purch = 9640, cI = 1385, gp = 4880;
    const cos = r2(sales - gp);
    const oI = r2(cos + cI - purch);
    b.calc({
      d: 4, kind: "money", value: oI, calculator: true, wrong: [r2(sales + cI - purch)],
      stem: `A rugby club's bar had sales of ${money(sales)} and a gross profit of ${money(gp)} for 2025. Purchases were ${money(purch)} and closing inventory was ${money(cI)}. Calculate the opening inventory.`,
      hints: ["Find the cost of sales from the sales and gross profit first."],
      explanation: `Cost of sales = ${fmt(sales)} − ${fmt(gp)} = ${fmt(cos)}. Opening inventory = cost of sales + closing inventory − purchases = ${fmt(cos)} + ${fmt(cI)} − ${fmt(purch)} = ${fmt(oI)}. Using sales instead of cost of sales gives ${fmt(r2(sales + cI - purch))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why subscriptions received in advance are treated as a liability.",
    points: ["The money has been received for a future period", "The club owes the members that period of membership (services), so it is not this year's income"],
    modelAnswer: "The members have paid for next year's membership, so the club owes them a year of services; the money is not income of this year.",
    explanation: "Matching: income belongs to the period it relates to.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A youth club's poultry project made a loss this year. One committee member wants to close it. State **one** argument for closing it, **one** against, and a conclusion.",
    points: ["For: the loss reduces the club's surplus / uses up funds", "Against: it may be profitable in future (e.g. one-off disease or high feed prices) / it teaches members skills / brings in members", "Justified conclusion, e.g. investigate the cause and set a target before deciding"],
    modelAnswer: "Closing it would stop the loss draining the club's funds. However, the loss may be due to a one-off cause such as high feed prices, and the project gives members useful skills. The committee should find the cause and give the project a year to break even before closing it.",
    hints: ["Consider both money and the club's aims."],
    explanation: "Clubs weigh financial results against their purpose.",
  });

  // ---------------------------------------------------------------- Practice structured 1: subscriptions account
  {
    const s = { openArrears: 690, openAdvance: 315, received: 14280, closeArrears: 840, closeAdvance: 405 };
    const sa = subscriptions(s);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Bulawayo Athletics Club charges an annual subscription. The following information is available:\n\n${table(["", "1 January 2025 " + U, "31 December 2025 " + U], [["Subscriptions in arrears", s.openArrears, s.closeArrears], ["Subscriptions in advance", s.openAdvance, s.closeAdvance]])}\n\nSubscriptions received in cash during 2025 were ${money(s.received)}.`,
      parts: [
        P.manual({ label: "(a)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the subscriptions account for the year ended 31 December 2025, bringing down the balances on 1 January 2026.", points: [`Opening arrears ${fmt(s.openArrears)} debit, opening advances ${fmt(s.openAdvance)} credit`, `Bank ${fmt(s.received)} credit`, `Income and expenditure ${fmt(sa.ie)} debit (own figure)`, `Closing advances ${fmt(s.closeAdvance)} c/d on the debit side`, `Closing arrears ${fmt(s.closeArrears)} c/d on the credit side`, "Totals and both balances b/d on 1 January 2026"], modelAnswer: sa.md, explanation: "The income for the year is the balancing figure." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: sa.ie, wrong: [s.received], stem: "State the subscription income transferred to the income and expenditure account.", explanation: `${fmt(s.received)} − ${fmt(s.openArrears)} + ${fmt(s.openAdvance)} + ${fmt(s.closeArrears)} − ${fmt(s.closeAdvance)} = ${fmt(sa.ie)}.` }),
        P.fib({ label: "(c)", stem: "Complete the statement of financial position entries at 31 December 2025.", template: "Subscriptions in arrears of {{blank:a}} are a current {{blank:b}}; subscriptions in advance of {{blank:c}} are a current {{blank:d}}.", blanks: [{ id: "a", accepted: [String(s.closeArrears), "840"] }, { id: "b", accepted: ["asset"], choices: ["asset", "liability"] }, { id: "c", accepted: [String(s.closeAdvance), "405"] }, { id: "d", accepted: ["liability"], choices: ["asset", "liability"] }], explanation: "Arrears are owed to the club; advances are owed by the club." }),
      ],
      hints: ["Opening arrears are a debit balance; opening advances are a credit balance."],
      explanation: `Model answer:\n\n${sa.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: bar trading account with missing purchases
  {
    const paid = 15960, oP = 1270, cP = 985;
    const purch = r2(paid - oP + cP);
    const a = activity({ name: "Harare Sports Club", title: "Refreshment bar trading account", sales: 24380, openInv: 2140, purchases: purch, closeInv: 1865, expenses: [["Bar staff wages", 3720], ["Bar licence", 450]] });
    const pay = tClosed("Bar payables account", [["31 Dec 2025", "Bank", paid], ["31 Dec 2025", "Balance c/d", cP]], [["1 Jan 2025", "Balance b/d", oP], ["31 Dec 2025", "Bar purchases", purch]], [], [["1 Jan 2026", "Balance b/d", cP]]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `The treasurer of a social and sports club in Harare provides the following information about the refreshment bar for the year ended 31 December 2025:\n\n${table(["", U], [["Bar sales (all cash)", 24380], ["Cash paid to bar suppliers", paid], ["Bar payables at 1 January 2025", oP], ["Bar payables at 31 December 2025", cP], ["Bar inventory at 1 January 2025", 2140], ["Bar inventory at 31 December 2025", 1865], ["Bar staff wages", 3720], ["Bar licence", 450]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: purch, wrong: [paid, r2(paid + oP - cP)], stem: "Calculate the bar purchases for the year.", explanation: `${fmt(paid)} − ${fmt(oP)} + ${fmt(cP)} = ${fmt(purch)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: a.cos, wrong: [r2(purch - 2140 + 1865)], stem: "Calculate the cost of sales of the bar.", explanation: `${fmt(2140)} + ${fmt(purch)} − ${fmt(1865)} = ${fmt(a.cos)}.` }),
        P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the refreshment bar trading account for the year ended 31 December 2025.", points: ["Heading and sales", "Opening inventory, purchases (own figure) and closing inventory", `Cost of sales ${fmt(a.cos)} and gross profit ${fmt(a.gp)}`, "Bar wages and licence deducted", `Profit on bar ${fmt(a.profit)} transferred to income and expenditure`], modelAnswer: a.md, explanation: "Same layout as a trading account, with the bar's own expenses." }),
        P.mcq({ label: "(d)", stem: "Where do the bar payables of US\\$985 at 31 December 2025 appear?", options: [["Current liabilities in the statement of financial position", "Correct: the club owes its suppliers."], ["Expenditure in the income and expenditure account", "Payables are a liability, not an expense."], ["Current assets in the statement of financial position", "The club owes this money; it is not owed to the club."], ["Receipts in the receipts and payments account", "Nothing has been received."]], answer: "A", explanation: "Bar payables are a current liability." }),
      ],
      hints: ["Purchases = payments − opening payables + closing payables."],
      explanation: `Workings:\n\n${pay}\n\nModel answer:\n\n${a.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FORMULA", "Subscription income for the year", "Cash received − opening arrears + opening advances + closing arrears − closing advances.");
  b.card("FACT", "Subscriptions account: debit side", "Opening arrears (b/d), transfer to income and expenditure (balancing figure), closing advances (c/d).");
  b.card("FACT", "Subscriptions account: credit side", "Opening advances (b/d), cash received, closing arrears (c/d).");
  b.card("DEFINITION", "Subscriptions in arrears", "Subscriptions owed by members for a past or current period: a current asset.");
  b.card("DEFINITION", "Subscriptions in advance", "Subscriptions received for a future period: a current liability.");
  b.card("FORMULA", "Purchases from cash paid", "Payments to suppliers − opening payables + closing payables.");
  b.card("FACT", "Where does a club bar's profit go?", "One line, 'profit on bar', in the income and expenditure account (a loss is expenditure).");
  b.card("CONCEPT", "Prudent subscriptions policy", "Some clubs do not count arrears as income until received; follow the stated policy.");
  b.card("DEFINITION", "Revenue-generating activity", "A club activity (bar, tuck shop, project) run to raise funds, with its own trading account.");
});
