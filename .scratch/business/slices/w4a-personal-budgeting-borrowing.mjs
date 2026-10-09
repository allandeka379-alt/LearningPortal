// W4a: personal budgets, borrowing and financial advice (COM Form 2).
import { concept, P, money, fmt, r2, sum, table } from "../lib.mjs";

concept("bus.finance.personal-budgeting-borrowing", { file: "finance/personal-budgeting-borrowing", keyPrefix: "finance.personal-budgeting-borrowing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a personal budget?",
    options: [
      ["A plan of expected income and spending for a period", "Correct: it plans money coming in and going out."],
      ["A record of a bank's charges to a customer", "That is part of a bank statement."],
      ["A loan agreement between a person and a bank", "A loan is borrowing, not a plan of spending."],
      ["A list of goods bought on hire purchase", "HP purchases are only one possible budget item."],
    ],
    answer: "A",
    explanation: "A personal budget is a forward plan of income and expenditure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A household's planned spending is greater than its expected income. What does its budget show?",
    options: [
      ["A deficit", "Correct: expenditure exceeds income."],
      ["A surplus", "A surplus is income greater than spending."],
      ["A profit", "Households do not make a profit on a budget."],
      ["A balanced budget", "Balanced means income equals spending."],
    ],
    answer: "A",
    explanation: "When expenditure is greater than income the budget is in deficit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **best** reason for a person to borrow money?",
    options: [
      ["To buy a sewing machine that will earn income", "Correct: the asset helps pay back the loan."],
      ["To pay for groceries every month", "Borrowing for everyday consumption builds up debt."],
      ["To repay another loan that is overdue at the bank", "This leads into a debt trap."],
      ["To buy luxuries on impulse", "Impulse borrowing is poor financial management."],
    ],
    answer: "A",
    explanation: "Borrowing is most sensible for productive assets whose income can cover the repayments.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which borrowing option lets a current-account holder spend more than the balance, up to an agreed limit?",
    options: [
      ["An overdraft", "Correct: interest is paid only on the amount overdrawn."],
      ["A fixed deposit", "A fixed deposit is a form of saving."],
      ["A standing order", "A standing order is a regular payment instruction."],
      ["A personal loan", "A loan is a fixed sum repaid in instalments."],
    ],
    answer: "A",
    explanation: "An overdraft allows the account to go below zero up to an agreed limit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do banks usually ask for collateral before giving a large personal loan?",
    options: [
      ["To have an asset to sell if the loan is not repaid", "Correct: collateral reduces the bank's risk."],
      ["To calculate the borrower's monthly budget", "A budget is calculated from income and spending."],
      ["Because the law forbids loans without it", "Unsecured loans are possible but riskier."],
      ["To pay the interest on the borrower's behalf", "Collateral is security, not a payment."],
    ],
    answer: "A",
    explanation: "Collateral is security the lender can sell to recover the debt if the borrower defaults.",
    hints: ["What happens if the borrower cannot pay?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A vendor has no collateral and needs a small loan to buy stock. Which source is most likely to lend to her?",
    options: [
      ["A microfinance institution", "Correct: microfinance serves small borrowers with little security."],
      ["A merchant bank", "Merchant banks serve large companies."],
      ["The Zimbabwe Stock Exchange", "The stock exchange is for companies issuing shares."],
      ["The Reserve Bank", "The central bank does not lend to individuals."],
    ],
    answer: "A",
    explanation: "Microfinance institutions give small loans, often to groups, without traditional collateral.",
    hints: ["Which institution specialises in very small loans?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a likely consequence of repeatedly failing to repay loans?",
    options: [
      ["A poor credit record, so future loans are refused", "Correct: lenders check repayment history."],
      ["Lower interest rates on future loans", "Riskier borrowers pay higher rates, not lower."],
      ["A larger overdraft limit from the bank", "The bank would reduce or cancel the limit."],
      ["Automatic cancellation of the unpaid debt by the lender", "Debts remain and creditors can take legal action."],
    ],
    answer: "A",
    explanation: "Defaulting damages a borrower's credit record and can lead to legal action and repossession.",
    hints: ["How do lenders decide whom to trust?"],
  });
  // Budget calculation (figures differ from the lesson).
  const inc = [["Salary", 610], ["Rent from a room", 90]];
  const exp = [["Food", 210], ["Rent", 180], ["Transport", 75], ["School fees", 95], ["Utilities", 48], ["Clothing", 55]];
  const tInc = sum(inc.map((x) => x[1])), tExp = sum(exp.map((x) => x[1]));
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money", value: tInc - tExp,
    stem: `Farai's monthly budget:\n\n${table(["Item", "US\\$"], [["**Income**", null], ...inc, ["**Expenditure**", null], ...exp])}\n\nCalculate his planned surplus.`,
    wrong: [inc[0][1] - tExp, tInc],
    explanation: `Income ${fmt(tInc)} − expenditure ${fmt(tExp)} = surplus ${money(tInc - tExp)}.`,
    workedSolution: `1. Total income = ${inc.map((x) => x[1]).join(" + ")} = ${fmt(tInc)}.\n2. Total expenditure = ${exp.map((x) => x[1]).join(" + ")} = ${fmt(tExp)}.\n3. Surplus = ${fmt(tInc)} − ${fmt(tExp)} = ${money(tInc - tExp)}.`,
  });
  const L2 = 900, r2pct = 18;
  const int2 = r2((L2 * r2pct) / 100), inst2 = r2((L2 + int2) / 12);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: inst2, calculator: true,
    stem: `Rudo borrows ${money(L2)} for one year. Assume flat interest of ${r2pct}% on the amount borrowed, with the total repaid in 12 equal monthly instalments. Calculate the monthly instalment.`,
    wrong: [r2(L2 / 12), r2(int2 / 12)],
    explanation: `Interest = ${money(int2)}; total = ${money(r2(L2 + int2))}; ÷ 12 = ${money(inst2)}.`,
    workedSolution: `1. Interest = ${r2pct}% × ${fmt(L2)} = ${fmt(int2)}.\n2. Total repayment = ${fmt(L2)} + ${fmt(int2)} = ${fmt(r2(L2 + int2))}.\n3. Monthly instalment = ${fmt(r2(L2 + int2))} ÷ 12 = ${money(inst2)}.`,
    hints: ["Add the interest to the amount borrowed first.", "Then divide by the number of months."],
  });
  const L3 = 400, back3 = 560;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: back3 - L3, daily: true,
    stem: `An informal lender gives Sipho ${money(L3)} and demands ${money(back3)} back after three months. How much interest does Sipho pay?`,
    wrong: [back3],
    explanation: `Interest = ${fmt(back3)} − ${fmt(L3)} = ${money(back3 - L3)}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A surplus in a personal budget can be saved.",
    answer: true,
    explanation: "True. A surplus is income left after planned spending, available for saving.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Advice from a salesperson who earns commission on the product is always impartial.",
    answer: false,
    explanation: "False. Commission gives an incentive to sell; check advice with an independent source.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each need with the most suitable source of financial advice.",
    pairs: [
      ["Which shares to buy on the stock exchange", "Stockbroker"],
      ["Whether a hire purchase agreement is fair", "Consumer organisation"],
      ["Which life assurance policy to take out", "Insurance broker"],
      ["Whether to apply for a personal loan", "Bank loans officer"],
    ],
    explanation: "Each adviser specialises in one area of personal finance.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Expenditure greater than income gives a {{blank:a}}. An asset pledged to a lender as security for a loan is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["deficit"], choices: ["deficit", "surplus", "dividend", "premium"] },
      { id: "b", accepted: ["collateral"], choices: ["collateral", "interest", "a deposit", "a premium"] },
    ],
    explanation: "A deficit must be covered by savings, borrowing or cuts; collateral protects the lender.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the bank facility that lets an account holder spend more than is in a current account, up to a limit.",
    accepted: ["overdraft", "an overdraft", "bank overdraft", "overdraft facility"],
    wrong: ["loan"],
    explanation: "An overdraft.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits to a family of preparing a monthly budget.",
    points: [
      "Benefit, e.g. essential needs are paid first (1)",
      "Explained, e.g. rent and school fees are covered before wants (1)",
      "Benefit, e.g. shows a deficit in advance / allows saving / avoids unnecessary borrowing (1)",
      "Explained, e.g. the family can cut spending before running out of money (1)",
    ],
    modelAnswer: "A budget makes sure essentials such as rent, food and school fees are planned first, so they are paid before money is spent on wants. It also shows a deficit before it happens, so the family can cut spending or save instead of borrowing at high interest.",
    explanation: "Budgets plan, control and reveal shortages early.",
    hints: ["Think about needs and wants.", "What does a budget show before the month starts?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** consequences for a family of poor management of its money.",
    points: [
      "Consequence, e.g. growing debt / high interest charges (1)",
      "Explained, e.g. more income goes on repayments, leaving less for food and fees (1)",
      "Consequence, e.g. repossession / legal action / poor credit record / no emergency savings (1)",
      "Explained, e.g. loss of household goods, or future loans refused (1)",
    ],
    modelAnswer: "Poor money management leads to growing debts, and more of the family's income goes on interest, leaving less for food and school fees. If repayments are missed, goods bought on hire purchase may be repossessed and the family's credit record is damaged, so future loans are refused.",
    explanation: "Mismanagement causes debt, repossession, poor credit and hardship.",
    hints: ["What happens when repayments are missed?"],
  });
  const incS = [["Wages", 380], ["Weekend vegetable sales", 135]];
  const expS = [["Rent", 160], ["Food", 155], ["Transport", 65], ["School fees", 85], ["Utilities and airtime", 32]];
  const tIS = sum(incS.map((x) => x[1])), tES = sum(expS.map((x) => x[1]));
  const loan = 600, loanI = 15, months = 12;
  const instS = r2((loan * (1 + loanI / 100)) / months);
  const surplusS = tIS - tES;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Thandeka lives in Masvingo. Her monthly budget is:\n\n${table(["Item", "US\\$"], [["**Income**", null], ...incS, ["**Expenditure**", null], ...expS])}\n\nShe wants a refrigerator so that she can also sell cold drinks. A bank would lend her ${money(loan)}; assume flat interest of ${loanI}% for one year, repaid in ${months} equal monthly instalments.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: surplusS, type: "CALCULATION",
        stem: "Calculate Thandeka's monthly surplus before taking the loan.",
        wrong: [incS[0][1] - tES],
        explanation: `${fmt(tIS)} − ${fmt(tES)} = ${money(surplusS)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: instS, type: "CALCULATION",
        stem: "Calculate the monthly loan instalment.",
        wrong: [r2(loan / months)],
        explanation: `Total = ${fmt(loan)} + ${loanI}% = ${fmt(r2(loan * 1.15))}; ÷ ${months} = ${money(instS)}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "State **two** other borrowing options Thandeka could use.",
        points: ["Hire purchase on the fridge (1)", "Microfinance loan / trade credit / family and friends (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Advise Thandeka whether she should take the bank loan. Justify your answer using your calculations.",
        points: [
          `Instalment (${money(instS)}) is greater than her surplus (${money(surplusS)}) (1)`,
          "So she can repay only if drinks sales add enough profit (1)",
          "Fridge is a productive asset that can earn income to repay the loan (1)",
          "Justified advice, e.g. borrow only if expected drink profit covers the gap, or cut wants / choose a smaller fridge (1)",
        ],
      }),
    ],
    explanation: `Surplus ${money(surplusS)}; instalment ${money(instS)}. The loan is affordable only if the fridge earns at least the difference.`,
    hints: ["Total income minus total expenditure.", "Interest is on the whole amount borrowed.", "Compare the instalment with the surplus."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Tatenda, a young worker in Harare, often borrows from an informal lender in the third week of the month to buy groceries. He has no budget and no savings.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** reasons why Tatenda should **not** borrow in this way.",
        points: ["Borrowing for everyday consumption / no asset to repay it (1)", "Very high interest from informal lenders / risk of a debt trap (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a personal budget could help Tatenda.",
        points: ["Plans income against spending for the month (1)", "Shows the shortfall in advance so he can cut wants (1)", "Allows him to save a small surplus for emergencies instead of borrowing (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Identify **one** source of financial advice for Tatenda and explain how it could help him.",
        points: ["Source, e.g. a bank / consumer organisation / financial adviser (1)", "Help, e.g. a savings plan or a cheaper form of credit (1)", "Developed: lower interest / discipline breaks the cycle of borrowing (1)"],
      }),
    ],
    explanation: "Borrowing for consumption at high interest traps Tatenda in debt; a budget and advice help him plan, save and use cheaper credit.",
    hints: ["Why does he run out of money?"],
  });
  b.card("DEFINITION", "Personal budget", "A plan of expected income and expenditure for a future period, showing a surplus or deficit.");
  b.card("CONCEPT", "Steps in a personal budget", "List income; list expenditure (needs first); total each; find surplus or deficit; act; compare with actual spending.");
  b.card("DEFINITION", "Surplus and deficit", "Surplus: income > expenditure (can be saved). Deficit: expenditure > income (cut spending, use savings or borrow).");
  b.card("CONCEPT", "When not to borrow", "For everyday consumption, when repayments are unaffordable, to repay other loans, at very high interest, for impulse luxuries.");
  b.card("CONCEPT", "Personal borrowing options", "Overdraft, bank loan, trade credit (store account), hire purchase, microfinance, informal lenders, family and friends.");
  b.card("DEFINITION", "Collateral", "An asset pledged to a lender as security, which can be sold if the loan is not repaid.");
  b.card("FACT", "Sources of financial advice", "Banks, microfinance institutions, insurers and brokers, accountants and advisers, stockbrokers, consumer organisations.");
  b.card("CONCEPT", "Consequences of financial mismanagement", "Debt and interest, repossession, legal action, poor credit record, no savings, family hardship.");
});
