// W1a: acc.fundamentals.users
import { concept, P, money, fmt, check, sum } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const table = (head, rows) => [row(head), row(head.map((_, i) => (i === 0 ? "---" : "---:"))), ...rows.map(row)].join("\n");

concept("acc.fundamentals.users", { file: "fundamentals/users", keyPrefix: "fundamentals.users" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why would ZIMRA be interested in the accounts of a hardware shop?",
    options: [
      ["To assess the tax payable on the profit", "Correct: the tax authority uses profit to calculate income tax."],
      ["To decide whether to supply goods on credit", "This is the interest of a supplier."],
      ["To judge whether jobs at the shop are secure", "This is the interest of employees."],
      ["To decide whether to buy shares in the shop", "This is the interest of investors."],
    ],
    answer: "A",
    explanation: "Government (ZIMRA) uses accounts to assess tax and to collect statistics about the economy.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** user of accounting information?",
    options: [
      ["The manager of the business", "Correct: managers work inside the business and see detailed records."],
      ["The bank that lent the business money", "A bank is outside the business: an external user."],
      ["A supplier of goods on credit", "Suppliers are external users."],
      ["The tax authority", "ZIMRA is an external user."],
    ],
    answer: "A",
    explanation: "Internal users are owners and managers; external users include lenders, suppliers, customers, investors and government.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A supplier is deciding whether to sell goods on credit to a shop. Which information is **most** useful to the supplier?",
    options: [
      ["Whether the shop can pay its short-term debts", "Correct: the supplier wants to be paid when the credit period ends."],
      ["The wages the shop pays to its assistants", "Wages matter to employees, not directly to a supplier."],
      ["The original cost of the shop's premises", "Premises are not used to pay suppliers in the short term."],
      ["The amount of the owner's personal savings", "Personal savings are not shown in the business accounts."],
    ],
    answer: "A",
    explanation: "Suppliers giving credit look at **liquidity**: cash, bank and receivables compared with current liabilities, and the shop's record of paying on time.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The workers at a bakery in Mutare read its accounts before asking for a pay rise. What are they most likely to look at?",
    options: [
      ["Whether profit has risen and the business is secure", "Correct: higher profit supports a pay claim and suggests jobs are safe."],
      ["The tax payable to ZIMRA for the year", "Tax is the government's interest."],
      ["The interest rate charged on the bank loan", "Interest rates matter mainly to the lender and the owner."],
      ["The credit period offered by flour suppliers", "Credit periods concern the bakery and its suppliers."],
    ],
    answer: "A",
    explanation: "Employees and trade unions use accounts to judge job security and whether the business can afford higher wages.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which user is mainly interested in whether the business will still exist to honour guarantees and supply spare parts?",
    options: [
      ["Customers", "Correct: customers rely on continued supply, guarantees and after-sales service."],
      ["The tax authority", "ZIMRA is interested in tax, not guarantees."],
      ["Banks and lenders", "Lenders care about repayment of loans."],
      ["Environmental groups", "They are interested in the business's effect on the environment."],
    ],
    answer: "A",
    explanation: "Customers want the business to continue so that they can keep buying from it and claim on guarantees.",
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Members of a football club read its income and expenditure account. What decision does this help them make?",
    options: [
      ["Whether the subscriptions are being well used", "Correct: members judge how their money is spent and whether fees should change."],
      ["Whether to lend money to the club's suppliers", "Members do not lend to suppliers."],
      ["How much income tax the club must pay", "Tax is assessed by the tax authority, not members."],
      ["Whether to buy shares in the club", "A club has members, not shareholders."],
    ],
    answer: "A",
    explanation: "Club members are users too: they see whether the club has a surplus or deficit and how subscriptions are spent.",
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A bank receives a loan application from a transport operator. Which piece of evidence would **best** support the application?",
    options: [
      ["Profits that have risen steadily for three years", "Correct: a steady profit record suggests the repayments can be met."],
      ["A large bank balance from a recent loan", "Borrowed cash must be repaid; it does not show earning power."],
      ["A plan to double drawings next year", "Higher drawings reduce the profit kept to repay the loan."],
      ["A rise in sales in one month only", "One month is too short to show a reliable trend."],
    ],
    answer: "A",
    explanation: "Lenders look at a trend of profits over several years, the profit kept after drawings, and security.",
    hints: ["What gives a lender confidence that repayments will be made every year?"],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which user is interested in the accounts of a **household** rather than a business, as the ZIMSEC syllabus describes?",
    options: [
      ["A family planning its budget for school fees and food", "Correct: households use records of income and spending to budget."],
      ["A wholesaler deciding on a credit limit", "This is a supplier using a business's accounts."],
      ["An investor choosing which shares to buy", "Investors read company accounts."],
      ["A manager setting next month's selling prices", "Managers use business records."],
    ],
    answer: "A",
    explanation: "ZIMSEC lists households as users: recording income and spending helps a family budget, save and avoid debt.",
    hints: ["Who keeps a household's records?"],
    applies: ["zimsec"],
  });

  {
    const loan = 9000, years = 3, rate = 10;
    const repay = loan / years, interest = (loan * rate) / 100;
    const yearly = repay + interest;
    check("y", yearly, 3900);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: yearly, calculator: true, daily: false,
      stem: `Farai applies for a bank loan of ${money(loan)} to buy a grinding mill. The loan is repayable in ${years} equal yearly instalments, and interest of ${rate}% a year is charged on the full amount in the first year. Calculate the total amount Farai must pay the bank in the **first** year.`,
      wrong: [repay, loan + interest],
      explanation: `1. Instalment: ${fmt(loan)} ÷ ${years} = ${money(repay)}.\n2. Interest in year 1: ${rate}% × ${fmt(loan)} = ${money(interest)}.\n3. Total for year 1: ${fmt(repay)} + ${fmt(interest)} = ${money(yearly)}.\n\nThe bank compares this with the profit Farai keeps after drawings. Forgetting the interest gives ${money(repay)}.`,
      hints: ["Split the loan into equal instalments first.", "Interest is paid in addition to the instalment."],
    });

    const profit = 8640, draw = 4500;
    const kept = profit - draw;
    b.num({
      d: 3, skill: "ANALYSIS", kind: "money", value: kept - yearly, calculator: true,
      stem: `Farai's profit for the year was ${money(profit)} and his drawings were ${money(draw)}. If his results stay the same, by how much would the profit he keeps in the business exceed his first-year loan payment of ${money(yearly)}?`,
      wrong: [profit - yearly, kept],
      explanation: `Profit kept = ${fmt(profit)} − ${fmt(draw)} = ${money(kept)}. Surplus over the payment = ${fmt(kept)} − ${fmt(yearly)} = ${money(kept - yearly)}. A small surplus tells the bank the loan is affordable, but with little margin for a bad year. Ignoring drawings overstates the surplus as ${money(profit - yearly)}.`,
      hints: ["Drawings are taken out of profit before anything is left to repay a loan."],
    });
  }

  {
    const items = [["Inventory", 4720], ["Trade receivables", 1380], ["Cash at bank", 290], ["Trade payables", 3610], ["Bank overdraft", 1450]];
    const liquid = 1380 + 290, cl = 3610 + 1450;
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: cl - liquid, calculator: true,
      stem: `A wholesaler is considering giving credit to Chipo's tuck shop. Chipo's records show:\n\n${table(["Item", "US\\$"], items.map(([a, v]) => [a, fmt(v)]))}\n\nBy how much do the current liabilities exceed the trade receivables and cash at bank together?`,
      wrong: [cl - liquid - 4720, 3610 - liquid],
      explanation: `Receivables + bank = 1,380 + 290 = ${money(liquid)}. Current liabilities = 3,610 + 1,450 = ${money(cl)}. Shortfall = ${fmt(cl)} − ${fmt(liquid)} = ${money(cl - liquid)}. The shop depends on selling its inventory to pay its debts, so the wholesaler may limit credit. Forgetting the overdraft gives ${money(3610 - liquid)}.`,
      hints: ["The overdraft is a current liability too."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Employees may use accounting information to judge whether their jobs are secure.",
    answer: true,
    explanation: "True. A profitable, growing business is more likely to keep its workers and afford pay rises.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "External users, such as banks, usually see every detailed record of a business, just like its managers.",
    answer: false,
    explanation: "False. External users normally see only the financial statements or the figures the business provides. Managers have access to detailed records.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a limited company, the shareholders own the business, but it is run by directors and managers.",
    answer: true,
    explanation: "True. Ownership and control are separated in a company, so shareholders and managers use the accounts for different decisions.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each user with the decision it makes using accounting information.",
    pairs: [
      ["Bank", "Whether to approve a loan"],
      ["Supplier", "How much credit to allow"],
      ["Investor", "Whether to buy or sell shares"],
      ["ZIMRA", "How much tax the business must pay"],
      ["Owner", "How much to take as drawings"],
    ],
    explanation: "Always link the user to a specific decision: lending, credit, investment, tax and drawings.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Owners and managers are {{blank:a}} users of accounting information, while lenders, suppliers and the government are {{blank:b}} users.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "b", accepted: ["external"], choices: ["internal", "external"] },
    ],
    explanation: "Internal users work in the business; external users are outside it and depend on the statements they are given.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how a **bank** uses the accounts of a business.",
    points: [
      "It looks at the profit over several years / liquidity / assets available as security…",
      "…to decide whether to lend, how much, and on what terms (whether repayments can be met).",
    ],
    modelAnswer: "The bank checks that profits have been high and steady enough to cover the repayments and interest, and what assets could be security, before deciding whether to grant the loan.",
    explanation: "One mark for what the bank looks at, one for the decision.",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai owns a brick-making business near Harare that employs twelve workers and sells to builders on credit. Explain how **two** different users, other than Tendai, would use its accounts.",
    points: [
      "First user named (e.g. employees / bank / supplier / ZIMRA / customers)…",
      "…with what they look at and the decision they make.",
      "Second, different user named…",
      "…with what they look at and the decision they make.",
    ],
    modelAnswer: "The twelve employees would look at the profit to judge whether their jobs are secure and whether to ask for higher wages. ZIMRA would use the profit figure to assess the income tax Tendai must pay.",
    explanation: "Two users, each with information and decision. Link to the business described.",
    hints: ["The question mentions workers and credit sales: use them."],
  });

  {
    const yrs = [["2023", 11240, 6100], ["2024", 9870, 6600], ["2025", 8150, 7200]];
    const kept = yrs.map(([, p, d]) => p - d);
    check("kept", sum(kept), 11240 + 9870 + 8150 - 6100 - 6600 - 7200);
    const stim = table(["Year", "Profit US\\$", "Drawings US\\$"], yrs.map(([y, p, d]) => [y, fmt(p), fmt(d)]));
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, calculator: true, secs: 780,
      stem: `Sipho runs a printing business in Gweru. He has applied for a loan with yearly repayments (including interest) of ${money(2800)}. He gives the bank this summary.\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: kept[2], stem: "Calculate the profit Sipho kept in the business in 2025.", wrong: [yrs[2][1]], explanation: `${fmt(yrs[2][1])} − ${fmt(yrs[2][2])} = ${money(kept[2])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: kept[0] - kept[2], stem: "By how much did the profit kept in the business fall between 2023 and 2025?", wrong: [yrs[0][1] - yrs[2][1]], explanation: `2023: ${fmt(yrs[0][1])} − ${fmt(yrs[0][2])} = ${money(kept[0])}. Fall = ${fmt(kept[0])} − ${fmt(kept[2])} = ${money(kept[0] - kept[2])}. Comparing profits only (${money(yrs[0][1] - yrs[2][1])}) ignores the rising drawings.` }),
        P.mcq({ label: "(c)", stem: "Which statement best describes the trend?", options: [["Profit is falling while drawings are rising", "Correct: profit fell each year and drawings rose each year."], ["Profit and drawings are both rising", "Profit fell from 2023 to 2025."], ["Profit is rising while drawings are falling", "Both trends are the other way round."], ["Profit and drawings are both falling", "Drawings rose each year."]], answer: "A", explanation: "Profit: 11,240 → 9,870 → 8,150. Drawings: 6,100 → 6,600 → 7,200." }),
        P.manual({ label: "(d)", marks: 4, stem: "Advise the bank whether to lend to Sipho. Justify your answer using the figures.", points: [`Profit kept in 2025 (${money(kept[2])}) is less than the yearly repayment of ${money(2800)}.`, "Profit has fallen every year, so repayments may become harder.", "Drawings have risen while profit fell, reducing what is available for repayment.", "Justified decision: refuse, or lend only with conditions (security / lower drawings / smaller loan)."].map((p) => p.replace(/US\$/g, "US\\$")), modelAnswer: `In 2025 Sipho kept only ${money(kept[2])} in the business, which is less than the ${money(2800)} he would have to repay each year. Profits have fallen every year while his drawings have risen. I would advise the bank not to lend unless Sipho offers security and agrees to reduce his drawings, or borrows a smaller amount.` }),
      ],
      explanation: `Kept profit fell from ${money(kept[0])} to ${money(kept[2])}, below the yearly repayment: a weak case for a loan.`,
      hints: ["Profit kept = profit − drawings.", "Compare the 2025 figure with the yearly repayment."],
    });
  }

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Nyasha owns a large supermarket in Masvingo. It employs forty people, buys from many suppliers on credit and is close to a river.",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each interested party with what it is most interested in.", pairs: ["Employees", "Suppliers", "Environmental groups", "ZIMRA"], right: ["Job security and wages", "Ability to pay for goods on time", "Pollution and waste disposal", "Profit for tax purposes"], rightIndex: [0, 1, 2, 3], explanation: "Each user has its own question about the business." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the local community might be interested in the supermarket's accounts.", points: ["Its jobs / income for local people / local suppliers depend on it…", "…so they want to know whether it is profitable and likely to continue (or whether it spends on community projects)."], modelAnswer: "Many local people work at or sell to the supermarket, so the community wants to know if it is profitable enough to keep trading and employing people." }),
    ],
    explanation: "Interested parties include people outside the business, such as the community and environmental groups.",
    hints: ["Think about who depends on the supermarket."],
  });

  b.card("DEFINITION", "User of accounting information (interested party)", "Any person or organisation that reads a business's accounts to make a decision about it.");
  b.card("FACT", "What does a bank look at before lending?", "Profit over several years, profit kept after drawings, liquidity and assets available as security.");
  b.card("FACT", "What does a supplier look at before giving credit?", "Liquidity (cash, bank, receivables against current liabilities) and the payment record.");
  b.card("FACT", "Why do employees read the accounts?", "To judge job security and whether the business can afford higher wages.");
  b.card("FACT", "Why does ZIMRA use accounts?", "To assess tax on profit (and VAT on sales) and to collect economic statistics.");
  b.card("CONCEPT", "Internal or external user?", "Internal: owners and managers. External: lenders, suppliers, customers, investors, employees' unions, government, the public.");
  b.card("FACT", "Households as users", "Families record income and spending to budget, save and avoid debt.", undefined, { applies: ["zimsec"] });
  b.card("CONCEPT", "How to answer a 'users' question", "User → what they look at → the decision they make.");
});
