// W1a: acc.fundamentals.purpose-of-accounting
import { concept, P, money, fmt, check, sum } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const table = (head, rows) => [row(head), row(head.map((_, i) => (i === 0 ? "---" : "---:"))), ...rows.map(row)].join("\n");

concept("acc.fundamentals.purpose-of-accounting", { file: "fundamentals/purpose-of-accounting", keyPrefix: "fundamentals.purpose-of-accounting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **book-keeping**?",
    options: [
      ["The day-to-day recording of financial transactions", "Correct: book-keeping is the routine recording of each transaction."],
      ["The interpretation of financial statements for owners", "Interpreting statements is part of accounting, which comes after book-keeping."],
      ["The preparation of the year-end financial statements", "Preparing statements from the records is accounting."],
      ["The checking of a business's records by an outsider", "An independent check of the records is an audit, not book-keeping."],
    ],
    answer: "A",
    explanation: "Book-keeping records transactions as they happen. Accounting then summarises, analyses and interprets those records.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which task is part of **accounting** rather than book-keeping?",
    options: [
      ["Explaining to the owner why profit fell this year", "Correct: analysing and interpreting results is accounting."],
      ["Entering a cash sale in the cash book", "Recording a single transaction is book-keeping."],
      ["Filing a copy of each invoice sent to customers", "Keeping source documents in order supports book-keeping."],
      ["Writing a supplier's credit note in the returns journal", "Recording a document in a book of prime entry is book-keeping."],
    ],
    answer: "A",
    explanation: "Accounting turns the records into statements and then asks what the figures mean, for example why profit changed.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sipho counts the cash in his tuck shop every evening and compares it with the cash sales recorded that day. Which purpose of keeping records does this serve?",
    options: [
      ["Control of assets, so that errors or theft are found", "Correct: comparing cash counted with cash recorded protects an asset."],
      ["Calculating the tax that the shop must pay", "Tax is worked out on the profit for a period, not from a daily cash count."],
      ["Providing evidence for a loan application", "A daily cash count is an internal check, not a document for a lender."],
      ["Measuring the profit of the shop for the year", "Profit compares income with expenses over a whole period."],
    ],
    answer: "A",
    explanation: "Records let the owner **control** assets: if the cash counted is less than the cash recorded, something is wrong and can be investigated at once.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the owner of a business need to know the profit before deciding how much to take as drawings?",
    options: [
      ["Taking more than the profit reduces the capital invested", "Correct: drawings above profit run the business down."],
      ["Drawings are an expense that reduces the profit", "Drawings are not an expense; they reduce capital, not profit."],
      ["Drawings must equal the profit by law each year", "No rule says drawings must equal profit; the owner chooses."],
      ["The tax authority sets drawings as a share of profit", "ZIMRA taxes profit; it does not decide the owner's drawings."],
    ],
    answer: "A",
    explanation: "Capital rises by profit and falls by drawings. If drawings exceed profit, the owner's investment shrinks and the business has fewer resources.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about profit and cash is correct?",
    options: [
      ["A business can make a profit and still be short of cash", "Correct: customers may not have paid, or cash may have been spent on assets."],
      ["A rising bank balance always shows the business made a profit", "Cash can rise from a loan or new capital without any profit."],
      ["Profit and the closing bank balance are always equal", "Profit is income less expenses; the bank balance is one asset."],
      ["A business with an overdraft must have made a loss", "An overdraft can follow spending on equipment even in a profitable year."],
    ],
    answer: "A",
    explanation: "Profit measures income less expenses for a period. Cash depends also on loans, capital introduced, drawings, asset purchases and the timing of payments.",
  });

  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha wants to borrow money from a bank to buy a second sewing machine. How do her accounting records help her application?",
    options: [
      ["They show past profits, which suggest she can repay", "Correct: lenders look for profits high enough to cover repayments and interest."],
      ["They prove the machine will earn a profit next year", "Past records give evidence, but they cannot prove future results."],
      ["They let her avoid paying interest on the loan", "Interest is charged whatever records she keeps."],
      ["They replace the need for the bank to ask for security", "The bank may still ask for security; records support the case."],
    ],
    answer: "A",
    explanation: "Records **provide evidence** to outsiders. A bank wants to see that the business has made enough profit, over several periods, to meet the repayments.",
    hints: ["What does a lender worry about most?"],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A transport operator in Mutare compares the fuel cost per trip this year with last year. What is this an example of?",
    options: [
      ["Using accounting information to monitor progress", "Correct: comparing periods reveals trends that guide decisions."],
      ["Book-keeping, because fuel bills are being recorded", "The bills were recorded earlier; the comparison interprets them."],
      ["Preparing a statement of financial position", "That statement lists assets, liabilities and capital at a date."],
      ["Controlling assets, because fuel is a current asset", "Fuel used on trips is an expense, and the task is a comparison."],
    ],
    answer: "A",
    explanation: "Comparing figures over time is **monitoring progress**. A rising cost per trip raises questions (prices, routes, vehicle condition) that lead to decisions.",
    hints: ["Is anything being recorded, or are recorded figures being compared?"],
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a reason for measuring the profit or loss of a business?",
    options: [
      ["To work out the tax payable to ZIMRA", "Correct: business tax is calculated on profit."],
      ["To find out the cash held at the year end", "Cash is found by counting it or from the cash book, not from profit."],
      ["To record each sale as it takes place", "Recording individual sales is book-keeping."],
      ["To list the documents received from suppliers", "Listing documents is part of record keeping, not profit measurement."],
    ],
    answer: "A",
    explanation: "Profit is measured to judge performance, decide safe drawings, plan expansion, support loan applications and calculate tax.",
  });

  {
    const sales = [64, 58, 71, 49, 96, 122];
    const bought = [38, 35, 40, 29, 57, 75];
    const transport = 4 * 6;
    const S = sum(sales), B = sum(bought);
    const profit = S - B - transport;
    check("profit", profit, S - B - transport);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: profit, daily: false, calculator: true,
      stem: `Tatenda sells second-hand clothing at a market in Gweru. He sells all his stock each day. His records for one week show:\n\n${table(["Day", "Sales US\\$", "Bales bought US\\$"], ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d, i) => [d, fmt(sales[i]), fmt(bought[i])]))}\n\nHe also paid ${money(4)} a day for transport on each of the six days. Calculate his profit for the week.`,
      wrong: [S - B, S - B - 4],
      explanation: `1. Sales: ${sales.join(" + ")} = ${money(S)}.\n2. Bales bought: ${bought.join(" + ")} = ${money(B)}.\n3. Transport: 6 × 4 = ${money(transport)}.\n4. Profit = ${fmt(S)} − ${fmt(B)} − ${fmt(transport)} = ${money(profit)}.\n\nLeaving out the transport gives ${money(S - B)}; counting it for one day only gives ${money(S - B - 4)}.`,
      hints: ["Total each column first.", "Transport is an expense for every day the stall is open."],
    });
  }

  {
    const h1 = { sales: 9600, cost: 5280 }, h2 = { sales: 12000, cost: 7200 };
    const p1 = (h1.cost / h1.sales) * 100, p2 = (h2.cost / h2.sales) * 100;
    const diff = p2 - p1;
    check("p1", p1, 55);
    check("p2", p2, 60);
    b.num({
      d: 3, skill: "ANALYSIS", kind: "money", value: diff, calculator: true,
      stem: `A school club's tuck shop had sales of ${money(h1.sales)} and paid ${money(h1.cost)} for the goods sold in Term 1. In Term 2 sales were ${money(h2.sales)} and the goods sold cost ${money(h2.cost)}. By how many US dollars did the cost of goods sold **for every US\\$100 of sales** rise from Term 1 to Term 2?`,
      wrong: [h2.cost - h1.cost, p2],
      explanation: `Term 1: 5,280 ÷ 9,600 × 100 = ${money(p1)} per US\\$100 of sales. Term 2: 7,200 ÷ 12,000 × 100 = ${money(p2)}. The rise is ${money(diff)} for every US\\$100 of sales: the club should check its suppliers' prices or its own selling prices.`,
      hints: ["Divide each term's cost by its sales, then multiply by 100.", "Compare the two results, not the two totals."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Book-keeping must be done before accounting can take place.",
    answer: true,
    explanation: "True. Accounting summarises and interprets the records, so the transactions must first be recorded (book-keeping).",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If a business has more money in the bank at the end of the year than at the start, it must have made a profit.",
    answer: false,
    explanation: "False. The bank balance can rise because of a loan or extra capital from the owner, even in a year when the business made a loss.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Accounting records can help to settle a dispute with a customer about how much the customer owes.",
    answer: true,
    explanation: "True. Copies of invoices, credit notes and the customer's ledger account give evidence of what was sold, returned and paid.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each action by a hardware shop owner in Masvingo with the purpose of keeping records that it serves.",
    pairs: [
      ["Showing three years of statements to a bank", "Providing evidence to outsiders"],
      ["Comparing inventory counted with inventory recorded", "Controlling assets"],
      ["Working out the income less expenses for the year", "Measuring profit or loss"],
      ["Deciding whether to stock solar panels next year", "Planning and decision-making"],
    ],
    explanation: "Each purpose links to a use: evidence for lenders and ZIMRA, control of cash and inventory, measuring profit, and decisions based on facts.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Book-keeping turns transactions into records, while accounting turns records into useful {{blank:a}} for decision-making. Profit is income less {{blank:b}} for a period.",
    blanks: [
      { id: "a", accepted: ["information"], choices: ["information", "transactions", "documents"] },
      { id: "b", accepted: ["expenses"], choices: ["expenses", "drawings", "liabilities"] },
    ],
    explanation: "Accounting turns **data** (the records) into **information**. Profit = income − expenses; drawings and liabilities do not affect the calculation of profit.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** reasons why a market vendor should keep accounting records.",
    points: [
      "Any one valid reason: to know what the business owns and owes / to measure profit or loss / to control cash and stock / to provide evidence for a loan or tax.",
      "A second, different valid reason from the list.",
    ],
    modelAnswer: "To measure her profit so that she knows how much she can safely take as drawings, and to control her cash by comparing cash counted with cash recorded each day.",
    explanation: "Any two of: know assets and liabilities, measure profit or loss, control assets, provide evidence to banks and ZIMRA, support planning and decisions.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Farai, a carpenter in Chinhoyi, says: \"I know my business well. I don't need records because I can remember what I sell.\" Give **three** reasons why he is wrong.",
    points: [
      "He makes too many transactions to remember accurately; small errors add up.",
      "Without records he cannot measure profit accurately, so he cannot judge safe drawings or performance.",
      "He has no evidence for a bank, for ZIMRA or in a dispute with a customer (or: he cannot detect theft or errors).",
    ],
    modelAnswer: "Memory is unreliable when there are many sales and purchases. Without records he cannot calculate his profit, so he does not know if the business is worth continuing or how much he can take out. He also has no evidence to show a bank or ZIMRA, or to settle a dispute with a customer.",
    explanation: "Each reason needs a consequence: what goes wrong for Farai without records.",
    hints: ["Think about accuracy, profit, and outsiders who ask for evidence."],
  });

  {
    const rows = [["Sales", 14200, 15600], ["Cost of goods sold", 8520, 10140], ["Wages", 2400, 2400], ["Transport", 960, 1320], ["Rent", 1200, 1200]];
    const e = (i) => sum(rows.slice(1).map((r) => r[i]));
    const p25 = 14200 - e(1), p26 = 15600 - e(2);
    const cs25 = (8520 / 14200) * 100, cs26 = (10140 / 15600) * 100;
    check("cs25", cs25, 60);
    check("cs26", cs26, 65);
    const stim = table(["", "Year 2024 US\\$", "Year 2025 US\\$"], rows.map(([a, x, y]) => [a, fmt(x), fmt(y)]));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 780,
      stem: `Thandeka owns a hardware shop in Bulawayo. Her accountant gives her this summary.\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: p25, stem: "Calculate the profit for 2024.", wrong: [14200 - 8520], explanation: `14,200 − (8,520 + 2,400 + 960 + 1,200) = 14,200 − ${fmt(e(1))} = ${money(p25)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: p26, stem: "Calculate the profit for 2025.", wrong: [15600 - 10140], explanation: `15,600 − (10,140 + 2,400 + 1,320 + 1,200) = 15,600 − ${fmt(e(2))} = ${money(p26)}.` }),
        P.mcq({
          label: "(c)", stem: "Which cost rose fastest compared with sales?",
          options: [
            ["Cost of goods sold", "Correct: it rose from US\\$60 to US\\$65 for every US\\$100 of sales; transport also rose, but by less in total."],
            ["Wages", "Wages did not change."],
            ["Rent", "Rent did not change."],
            ["Transport", "Transport rose by US\\$360, but cost of goods sold rose by US\\$1,620."],
          ],
          answer: "A",
          explanation: `Cost of goods sold was ${fmt(cs25)}% of sales in 2024 and ${fmt(cs26)}% in 2025, a rise of US\\$1,620 in total.`,
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Thandeka is pleased because sales increased. Using the figures, explain why she should be concerned, and suggest **two** actions she could take.",
          points: [
            `Sales rose by ${money(15600 - 14200)} but profit fell (from ${money(p25)} to ${money(p26)}).`,
            "Cost of goods sold rose faster than sales (60 to 65 for every US\\$100 of sales) / transport rose.",
            "One suitable action, e.g. find cheaper suppliers or buy in bulk / raise selling prices.",
            "A second suitable action, e.g. reduce transport costs by planning deliveries / collect goods in fewer trips.",
          ],
          modelAnswer: `Sales rose by ${money(15600 - 14200)}, yet profit fell from ${money(p25)} to ${money(p26)}. The goods sold cost more for every dollar of sales and transport costs rose by US\\$360. She could compare suppliers or buy in bulk to lower the cost of goods, review her selling prices, and plan deliveries to cut transport costs.`,
        }),
      ],
      explanation: `Profit fell from ${money(p25)} to ${money(p26)} although sales rose. Monitoring the figures shows Thandeka where to act.`,
      hints: ["Profit = sales − all the costs listed.", "Compare each cost with sales, not just with last year."],
    });
  }

  {
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
      stem: "Rudo runs a poultry project in Masvingo. She sells broilers to local restaurants, some on credit. Until now she has kept no records apart from her bank statements.",
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Distinguish between book-keeping and accounting, using Rudo's business as an example.", points: ["Book-keeping: recording each transaction, e.g. writing each sale of broilers to a restaurant.", "Accounting: summarising the records into statements and interpreting them, e.g. calculating and explaining her profit for the year."], modelAnswer: "Book-keeping would be Rudo writing down every sale of broilers and every purchase of feed. Accounting would be using those records to prepare her income statement for the year and decide whether to expand." }),
        P.tf({ label: "(b)", stem: "Rudo's bank statements alone show her the profit of the project.", answer: false, explanation: "False. Bank statements show money in and out, including any loans and drawings; they do not show credit sales not yet paid or feed still owed, so they do not measure profit." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain **two** ways in which keeping full records would help Rudo, given that she sells on credit.", points: ["She would know which restaurants owe her money and how much…", "…so she can chase late payers and avoid bad debts.", "She could measure her profit (including credit sales and costs owed)…", "…so she knows whether the project is worth expanding / how much she can take as drawings."], modelAnswer: "Records of credit sales show which restaurants owe money and how much, so she can send statements and chase late payers. Records of all income and expenses let her measure her profit properly, so she can decide whether to expand the project and how much she can safely draw." }),
      ],
      explanation: "Each benefit needs a link to Rudo's situation: credit customers, profit measurement, and decisions.",
      hints: ["Credit customers create amounts owed to the business.", "Each 'explain' point needs a reason and a result."],
    });
  }

  b.card("DEFINITION", "Book-keeping", "The detailed, day-to-day recording of the financial transactions of a business.");
  b.card("DEFINITION", "Accounting", "Classifying and summarising the records into financial statements, then analysing and interpreting them for decisions.");
  b.card("FACT", "Five reasons for keeping accounting records", "Know what is owned and owed; measure profit or loss; control assets (cash, inventory); provide evidence (banks, ZIMRA, disputes); plan and make decisions.");
  b.card("FACT", "Why measure profit?", "To judge performance, decide safe drawings, finance expansion, support loan applications, calculate tax and compare periods.");
  b.card("CONCEPT", "Is profit the same as cash?", "No. Profit is income less expenses for a period; cash is affected also by loans, capital, drawings, asset purchases and credit timing.");
  b.card("CONCEPT", "Data versus information", "Records are data (what happened); accounting turns them into information (what it means and what to do).");
  b.card("CONCEPT", "How does comparing periods help an owner?", "It reveals trends (rising costs, falling sales) that raise questions and lead to decisions.");
  b.card("FACT", "How do records help control assets?", "Cash or inventory counted can be compared with the amounts recorded, so errors and theft are found quickly.");
  b.card("DEFINITION", "Profit", "The excess of income over expenses for a period; if expenses are greater, the result is a loss.");
});
