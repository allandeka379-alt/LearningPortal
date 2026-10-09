// W4b: the statement of financial position (BES 7.5.3, CAM 5.4.1). Preparing one is ZIMSEC-only (applies BES).
import { concept, P, BES, money, fmt, sum, table, statement, f } from "../lib.mjs";

concept("bus.finance.financial-position", { file: "finance/financial-position", keyPrefix: "finance.financial-position" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a statement of financial position show?",
    options: [
      ["Assets, liabilities and equity on a particular date", "Correct: it is a snapshot on one date."],
      ["Revenue, costs and profit over a year", "That is the income statement (statement of profit or loss)."],
      ["Expected monthly cash inflows and outflows", "That is a cash flow forecast."],
      ["The planned sales of each product for the next year", "That is a sales budget."],
    ],
    answer: "A",
    explanation: "The statement of financial position lists what a business owns and owes, and the owners' equity, on one date.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of these is a **current** asset?",
    options: [
      ["Trade receivables", "Correct: money owed by customers, expected within a year."],
      ["Delivery vehicle", "A vehicle is kept for several years: a non-current asset."],
      ["Bank overdraft", "An overdraft is a current liability, not an asset."],
      ["Factory building", "Buildings are non-current assets."],
    ],
    answer: "A",
    explanation: "Current assets are inventory, trade receivables (debtors) and cash.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a bank overdraft classified as a **current** liability?",
    options: [
      ["The bank can ask for it to be repaid at short notice", "Correct: it is short-term borrowing."],
      ["It is used only to buy non-current assets", "Overdrafts are used for day-to-day spending."],
      ["It is money owed by credit customers to the business", "Money owed by customers is trade receivables, an asset."],
      ["It never has to be repaid to the bank", "All borrowing must be repaid."],
    ],
    answer: "A",
    explanation: "Debts due within a year, or repayable on demand, are current liabilities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **non-current** liability?",
    options: [
      ["A bank loan repayable in six years", "Correct: due after more than one year."],
      ["Money owed to a supplier for goods bought last month", "Trade payables are due within a year: a current liability."],
      ["Inventory of finished goods", "Inventory is a current asset."],
      ["Share capital", "Share capital is part of equity."],
    ],
    answer: "A",
    explanation: "Long-term loans and debentures are non-current liabilities.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A company's non-current liabilities have doubled in a year. What is the **most** likely effect on its next application for a bank loan?",
    options: [
      ["The bank may refuse or charge a higher rate because borrowing is already high", "Correct: heavy existing borrowing raises the risk to the lender."],
      ["The bank must lend because the company has borrowed before", "Banks judge each application on risk."],
      ["The loan will be cheaper because the company is a regular and well-known borrower", "Higher borrowing usually means higher risk, not lower cost."],
      ["The loan will be shown as a current asset of the company", "A loan received is a liability."],
    ],
    answer: "A",
    explanation: "Lenders look at how much a business already owes; more debt means more interest to pay and more risk.",
    hints: ["Think about the risk the bank takes."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A business has total assets of US\\$85,000 and total liabilities of US\\$32,000. What is its equity?",
    options: [
      ["US\\$53,000", "Correct: 85,000 − 32,000."],
      ["US\\$117,000", "This adds liabilities to assets."],
      ["US\\$32,000", "This is total liabilities, not equity."],
      ["US\\$85,000", "This is total assets."],
    ],
    answer: "A",
    explanation: "Equity = total assets − total liabilities = US\\$53,000.",
    hints: ["Assets − liabilities = equity."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a limitation of a statement of financial position?",
    options: [
      ["It shows the position on only one date", "Correct: the position may change soon after."],
      ["It shows how much the business owes to lenders", "That is useful information, not a limitation."],
      ["It separates current from non-current assets", "This helps users judge liquidity."],
      ["It includes the owners' equity in the business", "This is part of its purpose."],
    ],
    answer: "A",
    explanation: "A snapshot can hide what happens on other days; it also ignores hard-to-value items such as staff skills.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Inventory is a non-current asset.",
    answer: false,
    explanation: "False. Inventory is expected to be sold within a year, so it is a current asset.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Net assets (total assets minus total liabilities) are always equal to equity.",
    answer: true,
    explanation: "True. Everything the business owns is financed either by liabilities or by the owners' equity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each item in a statement of financial position.",
    right: ["Non-current asset", "Current asset", "Current liability", "Non-current liability"],
    pairs: ["Machinery", "Cash at bank", "Trade payables", "Debentures repayable in ten years", "Inventory of raw materials", "Bank overdraft"],
    rightIndex: [0, 1, 2, 3, 1, 2],
    explanation: "Assets kept for years are non-current; items turning into cash within a year are current; debts are current or non-current by when they are due.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulas.",
    template: "Working capital = current assets − {{blank:a}}. Capital employed = equity + {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["current liabilities"], choices: ["current liabilities", "non-current liabilities", "inventory", "equity"] },
      { id: "b", accepted: ["non-current liabilities"], choices: ["non-current liabilities", "current liabilities", "current assets", "retained profit"] },
    ],
    explanation: "Working capital measures short-term liquidity; capital employed is the long-term finance in the business.",
  });
  const nca = [42000, 9500], ca = [7300, 2900, 1800], cl = [5100, 2400], ncl = 18000;
  const tA = sum([...nca, ...ca]), tL = sum([...cl, ncl]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: tA,
    stem: `A business has premises worth ${money(nca[0])}, equipment ${money(nca[1])}, inventory ${money(ca[0])}, trade receivables ${money(ca[1])} and cash ${money(ca[2])}. Calculate its total assets.`,
    wrong: [sum(nca), sum(ca)],
    explanation: `${[...nca, ...ca].map(fmt).join(" + ")} = ${money(tA)}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: tA - tL, calculator: true,
    stem: `Using the business above: trade payables are ${money(cl[0])}, a bank overdraft is ${money(cl[1])} and a bank loan repayable in four years is ${money(ncl)}. Calculate the net assets (equity) of the business. (Total assets are ${money(tA)}.)`,
    wrong: [tA - sum(cl), tA - ncl],
    explanation: `Total liabilities = ${fmt(cl[0])} + ${fmt(cl[1])} + ${fmt(ncl)} = ${fmt(tL)}; net assets = ${fmt(tA)} − ${fmt(tL)} = ${money(tA - tL)}.`,
    workedSolution: `1. Total liabilities = ${fmt(cl[0])} + ${fmt(cl[1])} + ${fmt(ncl)} = ${money(tL)}.\n2. Net assets = total assets − total liabilities = ${fmt(tA)} − ${fmt(tL)} = ${money(tA - tL)}.`,
    hints: ["Include both current and non-current liabilities."],
  });
  const oc = 12500, pr = 5800, dr = 3900;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: oc + pr - dr, applies: BES, daily: false,
    stem: `Tatenda, a sole trader, started the year with capital of ${money(oc)}. During the year he made a net profit of ${money(pr)} and took drawings of ${money(dr)}. Calculate his capital at the end of the year.`,
    wrong: [oc + pr + dr, oc + pr],
    explanation: `${fmt(oc)} + ${fmt(pr)} − ${fmt(dr)} = ${money(oc + pr - dr)}.`,
    workedSolution: `1. Closing capital = opening capital + profit − drawings.\n2. = ${fmt(oc)} + ${fmt(pr)} − ${fmt(dr)} = ${money(oc + pr - dr)}.`,
    hints: ["Profit increases capital; drawings reduce it."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways a bank could use a business's statement of financial position when deciding whether to lend to it.",
    points: [
      "Use 1, e.g. checks existing borrowing / non-current liabilities (1)",
      "Explained: heavy debt means more interest and higher risk of non-repayment (1)",
      "Use 2, e.g. checks non-current assets available as security / liquidity (current assets v current liabilities) (1)",
      "Explained: assets can be sold if the loan is not repaid / shows ability to pay short-term debts (1)",
    ],
    modelAnswer: "The bank would check the business's existing loans; if non-current liabilities are already high, more borrowing increases the risk that interest and repayments cannot be met. It would also look at non-current assets such as premises that could be used as security and sold if the loan were not repaid.",
    explanation: "Lenders look at existing debt, security and liquidity.",
    hints: ["What worries a lender? What protects a lender?"],
  });
  // Structured 1 (BES): prepare a simple statement.
  const it = { nca: [["Shop premises", 30000], ["Fixtures and fittings", 6500]], ca: [["Stock", 8500], ["Debtors", 2100], ["Cash", 1400]], cl: [["Creditors", 4600]], ncl: [["Bank loan (repayable in 4 years)", 10000]] };
  const tN = sum(it.nca.map((x) => x[1])), tC = sum(it.ca.map((x) => x[1])), tCL = sum(it.cl.map((x) => x[1])), tNCL = sum(it.ncl.map((x) => x[1]));
  const capOpen = 28500, prof = 6400, draw = 1000;
  const capClose = capOpen + prof - draw;
  const listTbl = table(["Item at 30 June", "US\\$"], [...it.nca, ...it.ca, ...it.cl, ...it.ncl, ["Capital at 1 July", capOpen], ["Net profit for the year", prof], ["Drawings", draw]]);
  // assert the statement balances
  statement("check", [], { checks: [["balance", tN + tC - tCL - tNCL, capClose]] });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 900, calculator: true, applies: BES,
    stem: `Nyasha owns a pharmacy in Masvingo. The following information relates to her business.\n\n${listTbl}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: tN + tC, stem: "Calculate the total assets.", wrong: [tN], explanation: `${fmt(tN)} + ${fmt(tC)} = ${money(tN + tC)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: tC - tCL, stem: "Calculate the working capital.", wrong: [tC], explanation: `${fmt(tC)} − ${fmt(tCL)} = ${money(tC - tCL)}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: capClose, stem: "Calculate Nyasha's capital at 30 June.", wrong: [capOpen + prof + draw, capOpen + prof], explanation: `${fmt(capOpen)} + ${fmt(prof)} − ${fmt(draw)} = ${money(capClose)}.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Prepare Nyasha's statement of financial position at 30 June.", points: ["Non-current (fixed) assets listed and totalled (1)", "Current assets listed and totalled; total assets shown (1)", "Current and non-current liabilities shown correctly (1)", "Capital section: opening capital + profit − drawings, balancing with net assets (1)"] }),
      P.manual({ label: "(e)", marks: 3, stem: "Nyasha's stock is high compared with her cash. Explain **one** problem this could cause and suggest **one** solution.", points: ["Problem: cash tied up in stock; may not pay creditors on time / medicines may expire (1)", "Developed in context (1)", "Solution, e.g. order smaller quantities more often / promote slow-moving lines (1)"] }),
    ],
    explanation: `Total assets ${money(tN + tC)}; working capital ${money(tC - tCL)}; closing capital ${money(capClose)}, equal to net assets ${money(tN + tC - tCL - tNCL)}.`,
    workedSolution: `1. Non-current assets = ${fmt(tN)}; current assets = ${fmt(tC)}; total assets = ${fmt(tN + tC)}.\n2. Liabilities = ${fmt(tCL)} + ${fmt(tNCL)} = ${fmt(tCL + tNCL)}; net assets = ${fmt(tN + tC - tCL - tNCL)}.\n3. Capital = ${fmt(capOpen)} + ${fmt(prof)} − ${fmt(draw)} = ${fmt(capClose)}: the statement balances.`,
    hints: ["Sort each item into its group first.", "Closing capital = opening capital + profit − drawings."],
  });
  // Structured 2: interpret two companies.
  const A = { nca: 120000, ca: 25000, cl: 30000, ncl: 70000 }, B = { nca: 95000, ca: 42000, cl: 16000, ncl: 22000 };
  const tb = table(["US\\$", "Company A", "Company B"], [["Non-current assets", A.nca, B.nca], ["Current assets", A.ca, B.ca], ["Current liabilities", A.cl, B.cl], ["Non-current liabilities", A.ncl, B.ncl]]);
  const eqA = A.nca + A.ca - A.cl - A.ncl, eqB = B.nca + B.ca - B.cl - B.ncl;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Rudo has savings to invest in one of two fictional transport companies in Harare. Extracts from their statements of financial position are shown below.\n\n${tb}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: eqA, stem: "Calculate the equity (net assets) of Company A.", wrong: [A.nca + A.ca, A.nca + A.ca - A.cl], explanation: `${fmt(A.nca + A.ca)} − ${fmt(A.cl + A.ncl)} = ${money(eqA)}.` }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: A.ca - A.cl, tol: 0, stem: "Calculate the working capital of Company A (a negative answer has a minus sign).", wrong: [A.cl - A.ca], explanation: `${fmt(A.ca)} − ${fmt(A.cl)} = −${fmt(A.cl - A.ca)}.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain what your answer to (b) shows about Company A.", points: ["Current liabilities exceed current assets (negative working capital) (1)", "May be unable to pay short-term debts when due (1)", `Compared with B, whose current assets of ${money(B.ca)} are well above its current liabilities of ${money(B.cl)} (1)`] }),
      P.manual({ label: "(d)", marks: 4, stem: "Recommend which company Rudo should invest in, using only this information. Justify your answer.", points: [`Equity: A ${money(eqA)}, B ${money(eqB)} (1)`, "A has heavy non-current borrowing (US\\$70,000), so more interest and risk (1)", "B is more liquid and less in debt (1)", "Justified recommendation, noting profit data is also needed (1)"] }),
    ],
    explanation: `A: equity ${money(eqA)}, working capital −${fmt(A.cl - A.ca)}. B: equity ${money(eqB)}, working capital ${money(B.ca - B.cl)}. B is more liquid and less in debt.`,
    hints: ["Equity = total assets − total liabilities.", "Working capital = current assets − current liabilities."],
  });
  b.card("DEFINITION", "Statement of financial position", "Shows assets, liabilities and equity of a business on a particular date.");
  b.card("CONCEPT", "Non-current and current assets", "Non-current: kept over a year (premises, machinery, vehicles). Current: turn into cash within a year (inventory, trade receivables, cash).");
  b.card("CONCEPT", "Current and non-current liabilities", "Current: due within a year (trade payables, overdraft). Non-current: due after a year (long-term loans, debentures).");
  b.card("FORMULA", "Accounting equation", "Total assets − total liabilities = net assets = equity.");
  b.card("FORMULA", "Capital employed", "Equity + non-current liabilities (= total assets − current liabilities).");
  b.card("FORMULA", "Sole trader's closing capital", "Opening capital + profit − drawings.", null, { applies: BES });
  b.card("FACT", "Terms", "Inventory = stock; trade receivables = debtors; trade payables = creditors; non-current assets = fixed assets.");
  b.card("CONCEPT", "Uses of the statement", "Judge liquidity, existing borrowing, assets for security, retained profit, and capital employed for ROCE.");
});
