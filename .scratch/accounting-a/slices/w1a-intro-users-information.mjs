// W1a: intro.users-information
import { concept, P, table, check, r2, fmt, money, ratios, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.intro.users-information", { file: "intro/users-information", keyPrefix: "intro.users-information" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** user of accounting information?",
    ok: ["The manager of the business", "Correct: managers work inside the business and use detailed internal reports."],
    bad: [["The bank that lent money to the business", "A lender is outside the business: an external user."], ["The tax authority", "The tax authority is an external user."], ["A supplier of materials", "Suppliers are external users."]],
    explanation: "Internal users work inside the business; lenders, suppliers, customers and government are external.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which user is **most** interested in whether the business can repay a loan and its interest?",
    ok: ["A bank considering a loan", "Correct: its main concern is repayment and security."],
    bad: [["A customer buying a small item", "A small customer has little interest in the lender's position."], ["An employee in the stores", "Employees are interested in job security and pay."], ["A potential competitor", "A competitor is not a recognised user with a decision to make about this business."]],
    explanation: "Lenders need to know that interest and capital can be repaid when due.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Information that is free from material error and supported by evidence has which qualitative characteristic?",
    ok: ["Reliability", "Correct: the information can be depended on."],
    bad: [["Comparability", "This concerns comparison between years or businesses."], ["Understandability", "This concerns clear presentation."], ["Timeliness", "This concerns being available when decisions are made."]],
    explanation: "Reliability (faithful representation) means information is accurate enough to be depended on.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Employees of a business are **most** likely to use accounting information to assess:",
    ok: ["the security of their jobs and the ability of the business to pay wages and bonuses", "Correct: this is their main interest."],
    bad: [["the price at which the owner could sell the business", "This concerns the owner or a buyer."], ["the tax due on the profit", "This concerns the tax authority."], ["the creditworthiness of customers", "This concerns managers and lenders."]],
    explanation: "Employees want to know whether the business will survive and reward them fairly.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A supplier is deciding whether to give Tatenda's shop 60 days' credit. Which information is **most** useful?",
    ok: ["Current assets and current liabilities in the statement of financial position", "Correct: they show whether the shop can pay short-term debts."],
    bad: [["The owner's personal drawings for the year", "Drawings are not the main indicator of the ability to pay."], ["The profit forecast for ten years ahead", "A long forecast is less relevant to a 60-day decision."], ["The number of employees", "This does not show the ability to pay."]],
    hints: ["Credit is repaid from current assets."],
    explanation: "A supplier cares about liquidity: whether current assets cover current liabilities.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly distinguishes management reports from published financial statements?",
    ok: ["Management reports are detailed, can be prepared as often as needed and have no required format", "Correct: they are designed for internal decisions."],
    bad: [["Management reports must follow a format set by law", "It is the published statements that follow required formats."], ["Management reports are prepared only once a year", "They are frequent, often monthly or weekly."], ["Management reports are mainly for the tax authority", "Their main readers are managers."]],
    hints: ["Who reads each type, and how often?"],
    explanation: "Published statements follow set formats for external users; management reports are flexible and detailed.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A business uses straight line depreciation every year and gives the method in its notes. Which characteristic does this **mainly** support?",
    ok: ["Comparability", "Correct: users can compare years because the method is unchanged."],
    bad: [["Timeliness", "Timeliness concerns speed of reporting."], ["Relevance", "Relevance concerns whether information helps a decision."], ["Reliability only", "A consistent method helps comparison more directly."]],
    hints: ["What can a user do with figures prepared on the same basis each year?"],
    explanation: "A consistent policy lets users compare performance between periods.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best** reason why published financial statements do not fully meet a manager's needs?",
    ok: ["They are summarised and historic, whereas managers need detail and forecasts to make decisions", "Correct: managers need frequent, detailed and forward-looking information."],
    bad: [["They are always inaccurate", "Statements are prepared to be reliable."], ["They are only available to the owner", "They are available to a range of external users."], ["They contain no figures", "Statements are made up of figures."]],
    hints: ["Compare the level of detail and the time period."],
    explanation: "Published statements summarise past results; managers need detail by product, department and period, and forecasts.",
  });

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The government (tax authority) is an internal user of a business's accounting information.",
    answer: false,
    explanation: "False. The tax authority is an external user that needs profit figures to calculate tax.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Published financial statements are mainly forward-looking reports of what the business expects to earn.",
    answer: false,
    explanation: "False. Statements record what has already happened (historic). Forecasts are in budgets and management reports.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each user to its main interest.",
    pairs: ["Lender", "Owner or investor", "Employee", "Supplier", "Tax authority"],
    right: ["Ability to repay interest and capital", "Profit and return on the money invested", "Job security and pay", "Ability to pay on the due date", "Profit on which tax is calculated"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each group asks a different question of the same accounts.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct characteristic.",
    template: "Information that can be compared with earlier years is {{blank:a}}; information that is clearly presented for users with reasonable knowledge is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["comparable"], choices: ["comparable", "reliable", "understandable"] },
      { id: "b", accepted: ["understandable"], choices: ["comparable", "reliable", "understandable"] },
    ],
    explanation: "Comparability allows comparison over time; understandability concerns clear presentation.",
  });

  const pm = ratios.profitMargin(10140, 84500);
  chk(pm, 12, 0.0001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: pm, daily: true, calculator: true, wrong: [r2((10140 / (84500 - 10140)) * 100)],
    stem: "An investor in Rudo's shop is told that revenue for the year was US\\$84,500 and profit for the year was US\\$10,140. Calculate the profit margin, as a percentage to one decimal place.",
    explanation: "Profit margin = profit for the year ÷ revenue × 100 = 10,140 ÷ 84,500 × 100 = 12.0%. Dividing by revenue less profit gives 13.6%.",
  });
  const cr = ratios.current(26300, 14900);
  b.num({
    d: 3, skill: "APPLICATION", kind: "ratio", value: cr, calculator: true, wrong: [r2(14900 / 26300)],
    stem: "A supplier is told that a customer has current assets of US\\$26,300 and current liabilities of US\\$14,900. Calculate the current ratio as x : 1 to two decimal places.",
    hints: ["Current ratio = current assets ÷ current liabilities."],
    explanation: `26,300 ÷ 14,900 = ${fmt(r2(cr))}. Turning the ratio upside down gives ${fmt(r2(14900 / 26300))}.`,
  });
  const gr = ratios.gearing(18000, 30000, 22000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: gr, calculator: true, wrong: [r2((18000 / (30000 + 22000)) * 100)],
    stem: "A bank looks at a company with ordinary share capital of US\\$30,000, reserves of US\\$22,000 and a non-current loan of US\\$18,000. Calculate the gearing ratio (non-current liabilities ÷ (share capital + reserves + non-current liabilities)) as a percentage to one decimal place.",
    hints: ["The denominator includes the loan."],
    explanation: `18,000 ÷ (30,000 + 22,000 + 18,000) × 100 = ${fmt(r2(gr))}% (to one decimal place 25.7%). Leaving the loan out of the denominator gives 34.6%.`,
  });
  const ic = 24600 / 4100;
  chk(ic, 6, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "times", value: ic, calculator: true, wrong: [r2(4100 / 24600)],
    stem: "A bank is deciding whether a business can afford the interest on a new loan. The business has profit from operations of US\\$24,600 and interest payable of US\\$4,100. Calculate the interest cover (profit from operations ÷ interest payable), to one decimal place.",
    hints: ["How many times could the interest be paid from profit?"],
    explanation: "24,600 ÷ 4,100 = 6.0 times. Interest is covered six times.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the external user group that supplies goods on credit and wants to know if the business can pay on time.",
    accepted: ["suppliers", "supplier", "trade payables", "creditors", "creditor", "trade creditors"],
    explanation: "Suppliers (trade payables) assess liquidity before giving credit.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** differences between published financial statements and management reports.",
    points: ["Published statements follow a set format for external users; management reports have no required format", "Management reports are more detailed and frequent and may be forward-looking; published statements are annual and historic"],
    modelAnswer: "Published statements follow a required format and are annual and historic. Management reports are detailed, frequent and can include forecasts.",
    explanation: "One mark for each difference.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why employees are interested in the financial statements of their employer.",
    points: ["They want to know whether the business will survive, so their jobs are secure", "They want to judge whether it can afford pay rises, bonuses or pension contributions"],
    modelAnswer: "Employees depend on the business for their jobs, so they want to know it will continue. They also use the profit and cash position to judge whether it can afford rises and bonuses.",
    hints: ["Think about jobs and pay."],
    explanation: "Link the user's interest to a decision.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Evaluate whether the statement of profit or loss alone gives a bank enough information to decide on a loan.",
    points: ["It shows profit and so the ability to pay interest from earnings", "It does not show assets, liabilities, gearing or cash, so it cannot show security or liquidity", "The bank also needs the statement of financial position and cash flow forecast, and non-financial information such as management quality"],
    modelAnswer: "The statement of profit or loss shows whether the business earns enough to pay interest. But it does not show assets, the existing borrowing or the cash position, so the bank also needs the statement of financial position, a cash forecast and information about the managers.",
    hints: ["What does the bank need that profit alone does not show?"],
    explanation: "A reasoned judgement says what the statement shows, what it omits and what else is needed.",
  });

  // Structured 1: 10 marks
  const ca = 33600;
  const cl = 21000;
  const rev = 128000;
  const prof = 11520;
  const crS = ratios.current(ca, cl);
  const pmS = ratios.profitMargin(prof, rev);
  chk(crS, 1.6, 0.0001);
  chk(pmS, 9, 0.0001);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gokwe Motors is a garage. For the year ended 31 December 2025 it reported revenue of ${money(rev)}, profit for the year of ${money(prof)}, current assets of ${money(ca)} and current liabilities of ${money(cl)}.`,
    parts: [
      P.match({ label: "(a)", stem: "Match each question to the user most likely to ask it.", pairs: ["Can I be paid within 30 days?", "How much tax is due?", "Will my job be safe next year?", "What return will I get on my investment?"], right: ["Supplier", "Tax authority", "Employee", "Owner or investor"], rightIndex: [0, 1, 2, 3], explanation: "Suppliers ask about payment, the tax authority about profit and tax, employees about security, and owners about return." }),
      P.num({ label: "(b)", marks: 2, kind: "ratio", value: crS, wrong: [r2(cl / ca)], stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: "33,600 ÷ 21,000 = 1.60." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: pmS, wrong: [r2((prof / ca) * 100)], stem: "Calculate the profit margin, as a percentage to one decimal place.", explanation: "11,520 ÷ 128,000 × 100 = 9.0%." }),
      P.manual({ label: "(d)", marks: 2, stem: "State which of the two ratios a supplier is more interested in, giving a reason.", points: ["The current ratio", "Because it shows whether current assets are enough to pay current liabilities as they fall due"], modelAnswer: "The current ratio, because it shows whether the garage can pay its short-term debts, including the supplier.", explanation: "A supplier cares about liquidity." }),
    ],
    hints: ["Current ratio = current assets ÷ current liabilities.", "Profit margin = profit ÷ revenue."],
    explanation: "This item tests users' needs and two measures.",
  });

  // Structured 2: 12 marks
  const r24 = 120000;
  const p24 = 15600;
  const r25 = 150000;
  const p25 = 13500;
  const m24 = ratios.profitMargin(p24, r24);
  const m25 = ratios.profitMargin(p25, r25);
  const g25 = ratios.gearing(25000, 20000, 35000);
  chk(m24, 13, 0.0001);
  chk(m25, 9, 0.0001);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Nyasha Printers, Harare, has applied to a bank for a loan of ${money(10000)}. The bank is given these figures.\n\n` + table(["", "2024 (US\\$)", "2025 (US\\$)"], [["Revenue", r24, r25], ["Profit for the year", p24, p25]]) + `\n\nAt 31 December 2025 the business had ordinary share capital of ${money(20000)}, reserves of ${money(35000)} and a non-current loan of ${money(25000)}. In 2025 it changed its method of depreciation without explanation.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: m24, wrong: [r2((p24 / r25) * 100)], stem: "Calculate the profit margin for 2024, as a percentage to one decimal place.", explanation: "15,600 ÷ 120,000 × 100 = 13.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: m25, wrong: [r2((p25 / r24) * 100)], stem: "Calculate the profit margin for 2025, as a percentage to one decimal place.", explanation: "13,500 ÷ 150,000 × 100 = 9.0%." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: g25, tol: 0.06, wrong: [r2((25000 / (20000 + 35000)) * 100)], stem: "Calculate the gearing ratio at 31 December 2025 (non-current liabilities ÷ (share capital + reserves + non-current liabilities)), as a percentage to one decimal place.", explanation: "25,000 ÷ (20,000 + 35,000 + 25,000) × 100 = 31.25%, which is 31.3% to one decimal place." }),
      P.mcq({ label: "(d)", marks: 2, stem: "Which qualitative characteristic is weakened by the unexplained change in the depreciation method?", options: [["Comparability", "Correct: the profit of 2025 can no longer be compared reliably with that of 2024."], ["Timeliness", "The problem is not lateness."], ["Understandability", "The statements may be clear, but a change in policy is unexplained."], ["Relevance", "The figures are still relevant to the bank's decision."]], answer: "A", explanation: "A change in policy without explanation prevents users comparing years." }),
      P.manual({ label: "(e)", marks: 4, stem: "Evaluate whether the bank should lend the money, using the information given.", points: ["Revenue rose 25% but the profit margin fell from 13.0% to 9.0% and profit fell, a concern about costs", "Gearing of 31.3% is moderate, so there is some room for further borrowing", "The unexplained change in depreciation means comparison is unreliable; the bank should ask for an explanation", "Conclusion: lend only after more information such as cash flow forecasts and security, not on these figures alone"], modelAnswer: "Revenue grew by 25% but profit fell and the margin dropped from 13.0% to 9.0%, which suggests rising costs. Gearing of 31.3% is moderate. The unexplained change in depreciation makes the comparison unreliable, so the bank should ask for an explanation, a cash forecast and security before lending.", explanation: "Use figures, a balanced view and a conclusion." }),
    ],
    hints: ["Profit margin = profit ÷ revenue × 100.", "Gearing includes the loan in the denominator."],
    explanation: "This item tests a lender's use of ratios and the qualitative characteristics.",
  });

  b.card("DEFINITION", "Who are **internal** users of accounting information?", "Managers and owners who manage, and employees; they use detailed internal reports.");
  b.card("FACT", "External users and their main interests", "Lenders: repayment. Suppliers: payment on time. Customers: survival. Tax authority: profit and tax. Investors: return. Public: effect on community.");
  b.card("DEFINITION", "What are the four qualitative characteristics?", "Relevance, reliability, comparability and understandability (plus timeliness in practice).");
  b.card("DEFINITION", "What is **reliability**?", "Information free from material error and bias, and supported by evidence.");
  b.card("DEFINITION", "What is **comparability**?", "Information prepared on a consistent basis so it can be compared between years and with other businesses.");
  b.card("CONCEPT", "Published statements against management reports", "Published: set format, annual, historic, external users. Management: detailed, frequent, flexible, may be forward-looking.");
  b.card("CONCEPT", "Conflicting needs of users", "Employees want high pay, owners high profit, banks security: statements must be fair to all.");
  b.card("FACT", "Which measure suits a supplier?", "The current ratio (liquidity): current assets ÷ current liabilities.");
  b.card("FACT", "Which measure suits a lender?", "Gearing and interest cover: how much is borrowed and whether profit covers interest.");
});
