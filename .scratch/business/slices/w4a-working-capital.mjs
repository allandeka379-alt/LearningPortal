// W4a: working capital (COM Form 4; BES Form 3; CAM 5.1.1). Formula as printed by Cambridge.
import { concept, P, f, money, fmt, sum, statement, table, COM } from "../lib.mjs";

concept("bus.finance.working-capital", { file: "finance/working-capital", keyPrefix: "finance.working-capital" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is working capital calculated?",
    options: [
      ["Current assets − current liabilities", "Correct: the formula printed in the syllabus."],
      ["Total assets − total liabilities", "That gives the owner's capital (net assets)."],
      ["Revenue − cost of sales", "That is gross profit."],
      ["Current assets ÷ current liabilities", "That is the current ratio."],
    ],
    answer: "A",
    explanation: "Working capital = current assets − current liabilities.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a current liability?",
    options: [
      ["Bank overdraft", "Correct: repayable on demand, within one year."],
      ["Inventory", "Inventory is a current asset."],
      ["Delivery van", "A van is a non-current asset."],
      ["Ten-year bank loan", "A long-term loan is a non-current liability."],
    ],
    answer: "A",
    explanation: "Current liabilities are debts due within a year: trade payables, overdrafts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does a negative working capital figure show?",
    options: [
      ["It may be unable to pay its short-term debts", "Correct: current liabilities exceed current assets."],
      ["The business made a loss in the financial year", "Working capital measures liquidity, not profit."],
      ["The business has too much stock", "Too much stock would raise current assets."],
      ["The business owns no buildings or machinery", "Non-current assets are not in the calculation."],
    ],
    answer: "A",
    explanation: "Negative working capital signals a liquidity problem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the correct order of the working capital cycle?",
    options: [
      ["Cash → inventory → debtors → cash", "Correct: buy stock, sell on credit, collect cash."],
      ["Debtors → cash → creditors → inventory", "This does not follow the flow of goods."],
      ["Inventory → cash → debtors → creditors", "Inventory becomes debtors before cash."],
      ["Creditors → debtors → inventory → cash", "Not the order of the cycle."],
    ],
    answer: "A",
    explanation: "Cash buys inventory, which is sold to debtors, who pay cash.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: COM,
    stem: "A business pays a supplier US\\$800 in cash. What happens to its working capital?",
    options: [
      ["It stays the same", "Correct: cash and trade payables both fall by US\\$800."],
      ["It falls by US\\$800", "Current liabilities fall by the same amount as cash."],
      ["It rises by US\\$800", "Nothing increases current assets."],
      ["It falls by US\\$1,600", "Only one side changes by US\\$800 each."],
    ],
    answer: "A",
    explanation: "Equal falls in current assets and current liabilities leave working capital unchanged.",
    hints: ["Which current asset and which current liability change?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why is holding too much inventory a problem for working capital?",
    options: [
      ["Cash is tied up in goods that may spoil or go out of date", "Correct: idle stock earns nothing and costs money to store."],
      ["Inventory is a current liability", "Inventory is a current asset."],
      ["It reduces the value of non-current assets", "It does not affect non-current assets."],
      ["It increases the interest on long-term loans", "Long-term loan interest is unaffected."],
    ],
    answer: "A",
    explanation: "Excess stock locks up cash and risks loss, damage and storage costs.",
    hints: ["Can you pay wages with boxes on a shelf?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action would improve a shop's working capital position **most** directly?",
    options: [
      ["Asking debtors to pay in 30 days, not 60", "Correct: debtors turn into cash faster."],
      ["Buying a new delivery van for cash", "This uses up cash on a non-current asset."],
      ["Using the overdraft to buy shop fittings", "This raises current liabilities for a long-term asset."],
      ["Ordering a large extra stock of goods on credit", "Stock and creditors rise together; liquidity worsens."],
    ],
    answer: "A",
    explanation: "Faster collection of debts shortens the cycle and increases cash.",
    hints: ["Which option brings cash in sooner?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can too much working capital be wasteful?",
    options: [
      ["Money lies idle instead of earning a return", "Correct: it could be invested or used to repay debt."],
      ["The business cannot pay its creditors", "That is a problem of too little working capital."],
      ["Current liabilities become non-current", "Classification does not change."],
      ["It always causes a loss", "It does not necessarily cause a loss."],
    ],
    answer: "A",
    explanation: "Excess cash, stock or debtors could be put to better use.",
  });
  const ca = [["Inventory", 8400], ["Trade receivables", 2900], ["Cash at bank", 1150]];
  const cl = [["Trade payables", 5300], ["Bank overdraft", 2350]];
  const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
  const wc = f.workingCapital(tca, tcl);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: wc, daily: true,
    stem: `Extract from the statement of financial position of Tendai's Electrical:\n\n${table(["Item", "US\\$"], [...ca, ...cl])}\n\nCalculate the working capital.`,
    wrong: [tca, tca + tcl],
    explanation: `Current assets ${fmt(tca)} − current liabilities ${fmt(tcl)} = ${money(wc)}.`,
    workedSolution: `1. Current assets = ${ca.map((x) => fmt(x[1])).join(" + ")} = ${fmt(tca)}.\n2. Current liabilities = ${cl.map((x) => fmt(x[1])).join(" + ")} = ${fmt(tcl)}.\n3. Working capital = ${fmt(tca)} − ${fmt(tcl)} = ${money(wc)}.`,
  });
  const ca2 = 9600, cl2 = 11250, loan2 = 3000;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: f.workingCapital(ca2 + loan2, cl2), calculator: true,
    stem: `A business has current assets of ${money(ca2)} and current liabilities of ${money(cl2)}. It receives a five-year bank loan of ${money(loan2)}, which is paid into its bank account. Calculate the working capital after the loan.`,
    wrong: [ca2 - cl2, ca2 + loan2],
    explanation: `Before: ${fmt(ca2)} − ${fmt(cl2)} = (${fmt(cl2 - ca2)}). Cash rises by ${fmt(loan2)}; the loan is non-current. After: ${fmt(ca2 + loan2)} − ${fmt(cl2)} = ${money(f.workingCapital(ca2 + loan2, cl2))}.`,
    workedSolution: `1. Working capital before = ${fmt(ca2)} − ${fmt(cl2)} = (${fmt(cl2 - ca2)}).\n2. The loan adds ${fmt(loan2)} to cash (a current asset); a five-year loan is not a current liability.\n3. After = ${fmt(ca2 + loan2)} − ${fmt(cl2)} = ${money(f.workingCapital(ca2 + loan2, cl2))}.`,
    hints: ["Is a five-year loan a current liability?", "Only the current assets change."],
  });
  const wcT = 4700, clT = 3850;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: wcT + clT,
    stem: `A shop's working capital is ${money(wcT)} and its current liabilities are ${money(clT)}. What are its current assets?`,
    wrong: [wcT - clT],
    explanation: `Current assets = working capital + current liabilities = ${fmt(wcT)} + ${fmt(clT)} = ${money(wcT + clT)}.`,
    hints: ["Rearrange the working capital formula."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trade receivables (debtors) are a current asset.",
    answer: true,
    explanation: "True. They are expected to be turned into cash within a year.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A profitable business can never have a working capital problem.",
    answer: false,
    explanation: "False. Profit may be tied up in stock and debtors, leaving too little cash to pay bills.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with how it is classified.",
    pairs: [
      ["Inventory", "Current asset"],
      ["Trade payables", "Current liability"],
      ["Factory building", "Non-current asset"],
      ["Six-year bank loan", "Non-current liability"],
    ],
    explanation: "Only current assets and current liabilities enter the working capital calculation.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Working capital = current assets − current {{blank:a}}. The ability to pay short-term debts as they fall due is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["liabilities"], choices: ["liabilities", "assets", "expenses", "profits"] },
      { id: "b", accepted: ["liquidity"], choices: ["liquidity", "profitability", "productivity", "solvency of shares"] },
    ],
    explanation: "Working capital measures liquidity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the current asset made up of goods held for resale.",
    accepted: ["inventory", "stock", "inventories", "stock of goods", "inventory (stock)"],
    wrong: ["cash"],
    explanation: "Inventory (stock).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** problems a business may face if it has too little working capital.",
    points: [
      "Cannot pay suppliers on time (1)",
      "So loses credit facilities / discounts / supplies stop (1)",
      "Cannot pay wages or bills / cannot buy stock (1)",
      "So staff demotivated / sales lost / may be forced to close (1)",
    ],
    modelAnswer: "With too little working capital the business may not pay suppliers on time, so they stop giving credit and may refuse deliveries. It may also be unable to buy enough stock, so it loses sales to competitors.",
    explanation: "Shortage of working capital threatens day-to-day operations and survival.",
    hints: ["Who must the business pay each month?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways a business could improve its working capital.",
    points: [
      "Way, e.g. reduce inventory / sell slow-moving stock (1)",
      "Explained: releases cash tied up in goods (1)",
      "Way, e.g. collect debts faster / negotiate longer credit from suppliers / long-term loan for assets (1)",
      "Explained, e.g. cash arrives before supplier payments fall due (1)",
    ],
    modelAnswer: "The business could reduce its inventory by selling slow-moving stock at a discount, which turns idle goods into cash. It could also ask credit customers to pay sooner, perhaps by offering a small cash discount, so that cash arrives before suppliers must be paid.",
    explanation: "Speed up cash in, slow down cash out, and avoid locking cash in idle assets.",
    hints: ["Think about stock, debtors and creditors."],
  });
  const caS = [["Inventory", 14200], ["Trade receivables", 6800], ["Cash", 450]];
  const clS = [["Trade payables", 9700], ["Bank overdraft", 4100]];
  const tcaS = sum(caS.map((x) => x[1])), tclS = sum(clS.map((x) => x[1]));
  const wcS = f.workingCapital(tcaS, tclS);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Rudo owns a furniture shop in Gweru. Most customers buy on credit and pay after 90 days. Several sofas have been in stock for over a year. Last month she could not pay her timber supplier on time.\n\n${statement("Extract from the statement of financial position at 30 June", [["**Current assets**"], ...caS, ["**Current liabilities**"], ...clS])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: wcS, type: "CALCULATION",
        stem: "Calculate Rudo's working capital.",
        wrong: [tcaS, tcaS + tclS],
        explanation: `${fmt(tcaS)} − ${fmt(tclS)} = ${money(wcS)}.`,
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why Rudo could not pay her supplier even though her working capital is positive.",
        points: ["Only a small amount is cash (1)", "Most working capital is tied up in slow-moving stock and debtors (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate **two** ways Rudo could improve her cash position. Recommend which she should use first.",
        points: [
          "Way 1: sell old sofas at a discount (1)",
          "Effect: turns idle stock into cash quickly; but lower profit margin (1)",
          "Way 2: shorten credit to 30-60 days / cash discount for early payment (1)",
          "Effect: cash arrives sooner; but some customers may go to rivals (1)",
          "Recommendation (1)",
          "Justified, e.g. stock sale first because it is under her control and the sofas are already old (1)",
        ],
        levels: [[3, 5, 6, "Both ways evaluated with advantages and drawbacks applied to Rudo; justified recommendation."], [2, 3, 4, "Two ways explained with some application; weak judgement."], [1, 1, 2, "Ways listed with little explanation."]],
        modelAnswer: `Rudo has ${money(wcS)} of working capital but only ${money(caS[2][1])} in cash. She could sell the sofas that have been in stock for over a year at a discount: this turns idle stock into cash quickly, although she earns a lower margin. She could also shorten her credit period from 90 days, perhaps offering a small discount for early payment; cash would arrive sooner, but some customers might buy from competitors who give longer credit. I recommend the stock sale first, because the sofas are already old and may lose more value, and it brings in cash within weeks without upsetting her regular credit customers.`,
      }),
    ],
    explanation: `Working capital is ${money(wcS)}, but cash is only ${money(caS[2][1])}; slow stock and long credit periods cause the problem.`,
    hints: ["Add the current assets and the current liabilities first.", "Look at how much is actually cash."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "Farai runs a small engineering workshop in Kwekwe. He buys steel on 30 days' credit, takes about 20 days to make gates and burglar bars, and gives customers 45 days to pay.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Describe the working capital cycle of Farai's business.",
        points: ["Steel bought on credit becomes inventory (1)", "Made into gates and sold on credit, creating debtors (1)", "Customers pay cash, which pays the supplier and wages (1)"],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain why Farai needs working capital even though he receives credit from his supplier.",
        points: ["Supplier must be paid after 30 days (1)", "But customers pay only after 20 + 45 days, so there is a gap to finance (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how Farai could reduce the amount of working capital he needs.",
        points: ["Ask for deposits from customers / shorten credit period (1)", "Negotiate longer credit from the supplier (1)", "Explains: shorter cycle means less cash tied up (1)"],
      }),
    ],
    explanation: "Farai pays for steel before customers pay for gates, so he must finance the gap; shortening the cycle reduces the need.",
    hints: ["Compare when cash goes out with when it comes in."],
  });
  b.card("FORMULA", "Working capital", "Working capital = current assets − current liabilities.");
  b.card("DEFINITION", "Current assets", "Assets turned into cash within a year: inventory, trade receivables, cash.");
  b.card("DEFINITION", "Current liabilities", "Debts due within a year: trade payables, overdraft, short-term loans.");
  b.card("CONCEPT", "Working capital cycle", "Cash → inventory → sales on credit (debtors) → cash.");
  b.card("CONCEPT", "Too little working capital", "Cannot pay suppliers, wages or bills; lose credit and sales; may be forced to close.");
  b.card("CONCEPT", "Too much working capital", "Idle cash, excess stock (spoilage, storage costs), large debtors (bad debts).");
  b.card("CONCEPT", "Managing working capital", "Control stock, collect debts faster, negotiate longer supplier credit, forecast cash, use long-term finance for assets.");
  b.card("CONCEPT", "Transactions that do not change working capital", "Paying creditors in cash; buying stock on credit; receiving cash from debtors.", undefined, { applies: COM });
  b.card("DEFINITION", "Liquidity", "The ability to pay short-term debts as they fall due.");
});
