// W1a: acc.technology.manual-digital-records
import { concept, P, money, fmt, check, sum, r2 } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const table = (head, rows, align) => [row(head), row(head.map((_, i) => (align ? align[i] : i === 0 ? "---" : "---:"))), ...rows.map(row)].join("\n");

concept("acc.technology.manual-digital-records", { file: "technology/manual-digital-records", keyPrefix: "technology.manual-digital-records" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an **advantage** of manual accounting records over digital records?",
    options: [
      ["They can be kept up to date during power cuts", "Correct: paper books need no electricity."],
      ["They calculate column totals automatically", "Automatic totals are a feature of digital methods."],
      ["They produce reports at any time instantly", "Instant reports are a feature of digital methods."],
      ["They post each entry to the ledger by themselves", "Automatic posting is a feature of accounting software."],
    ],
    answer: "A",
    explanation: "Manual methods are cheap and work without power, but they are slow and prone to arithmetic and copying errors.",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **limitation** of digital accounting records?",
    options: [
      ["Data may be lost if there is no back-up", "Correct: a failed device or virus can destroy unsaved records."],
      ["Every posting must be copied by hand", "Copying by hand is a feature of manual records."],
      ["Totals are often added up incorrectly", "Formulas add accurately; arithmetic errors are a manual problem."],
      ["Reports take weeks to prepare by hand", "Digital systems produce reports quickly."],
    ],
    answer: "A",
    explanation: "Digital methods need power, equipment, training, security and regular back-ups.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A clerk keys a sales invoice of US\\$1,480 into accounting software as US\\$1,840. What happens?",
    options: [
      ["The wrong amount appears in every record it updates", "Correct: garbage in, garbage out."],
      ["The software detects the error and corrects it", "Software cannot know the amount on the paper invoice."],
      ["The trial balance fails to agree", "The software makes equal debit and credit entries, so it still agrees."],
      ["Only the sales journal shows the wrong figure", "The error flows on to the ledger and the statements too."],
    ],
    answer: "A",
    explanation: "Digital systems process exactly what is entered. An input error is carried into the customer's account, sales, the trial balance and the statements.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a spreadsheet, what does the formula `=SUM(C2:C9)` do?",
    options: [
      ["Adds the values in cells C2 to C9", "Correct: SUM adds every cell in the range."],
      ["Adds only cells C2 and C9", "The colon means the whole range, not two cells."],
      ["Counts how many cells contain figures", "Counting cells needs a different function."],
      ["Copies cell C2 into cell C9", "SUM calculates a total; it does not copy."],
    ],
    answer: "A",
    explanation: "Formulas such as SUM let a spreadsheet recalculate totals automatically whenever a figure changes.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does accounting software save time compared with manual records?",
    options: [
      ["One entry updates the journal, ledger and trial balance", "Correct: the data are entered once and posted automatically."],
      ["It removes the need for any source documents", "Every transaction still needs evidence."],
      ["It removes the need for double entry", "The software still makes a debit and a credit for each entry."],
      ["It means no one needs book-keeping knowledge", "Users still need to know which account to choose."],
    ],
    answer: "A",
    explanation: "Automatic posting and calculation are the main time-savers. The accounting principles behind the entries do not change.",
  });

  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A market vendor in Masvingo makes about ten cash sales a day and often has no electricity. Which method of recording is most suitable?",
    options: [
      ["A manual cash book and receipt book", "Correct: few transactions and no reliable power favour simple paper records."],
      ["Full accounting software on a desktop computer", "The cost and power needs are too high for ten cash sales a day."],
      ["A spreadsheet stored only on a home computer", "Without power she cannot record sales as they happen."],
      ["No records, as her sales are all for cash", "Cash businesses still need records to measure profit and control cash."],
    ],
    answer: "A",
    explanation: "The best method depends on the business: volume of transactions, cost, skills and power supply.",
    hints: ["Weigh the number of transactions against the cost and the power problem."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which error can **still** occur when a business switches from manual to computerised ledgers?",
    options: [
      ["Posting an invoice to the wrong customer's account", "Correct: the user still chooses the account."],
      ["Adding the sales journal column incorrectly", "The software adds columns automatically."],
      ["Making a debit entry without the matching credit", "Software always completes both sides."],
      ["Bringing down a balance on the wrong side", "Balances are calculated by the software."],
    ],
    answer: "A",
    explanation: "Computers remove arithmetic and one-sided entry errors, but not errors in the choice of account or amount keyed in.",
    hints: ["Which decisions are still made by a person?"],
  });

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which feature is found in accounting software but **not** in a manual system?",
    options: [
      ["Automatic production of the trial balance", "Correct: the software lists the balances itself."],
      ["Use of source documents as evidence", "Both systems use source documents."],
      ["Recording each transaction by double entry", "Both systems use double entry."],
      ["Classifying items as assets or expenses", "Both systems classify items."],
    ],
    answer: "A",
    explanation: "The principles (documents, double entry, classification) are the same; the software automates the processing.",
  });

  {
    const amounts = [415, 1060, 288, 735, 952];
    const tot = sum(amounts);
    const typed = [...amounts];
    typed[1] = 1600;
    const wrongTot = sum(typed);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: r2(wrongTot - tot), daily: true,
      stem: `A spreadsheet sales journal holds five invoices: ${amounts.map((a) => money(a)).join(", ")}. The second invoice is keyed in as ${money(1600)} by mistake. By how much is the total calculated by \`=SUM\` overstated?`,
      wrong: [wrongTot, tot],
      explanation: `Correct total: ${amounts.map(fmt).join(" + ")} = ${money(tot)}. With the error: ${money(wrongTot)}. Overstatement: 1,600 − 1,060 = ${money(wrongTot - tot)}. The formula adds correctly, but it adds the wrong input.`,
    });
  }

  {
    const hoursM = 36, hoursC = 10, rate = 3, sub = 42, laptop = 520;
    const manual = hoursM * rate, comp = hoursC * rate + sub, saving = manual - comp;
    const payback = laptop / saving;
    check("saving", saving, 36);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "plain", value: payback, dp: 1, calculator: true,
      stem: `Tendai's clerk spends ${hoursM} hours a month on manual records and is paid ${money(rate)} an hour. Accounting software would cut this to ${hoursC} hours a month, at a subscription of ${money(sub)} a month, and needs a laptop costing ${money(laptop)}. How many months of savings would pay for the laptop? Give your answer to one decimal place.`,
      wrong: [r2(laptop / (manual - hoursC * rate)), r2(laptop / manual)],
      explanation: `1. Manual cost: ${hoursM} × ${rate} = ${money(manual)} a month.\n2. Software cost: ${hoursC} × ${rate} + ${sub} = ${money(comp)} a month.\n3. Saving: ${fmt(manual)} − ${fmt(comp)} = ${money(saving)} a month.\n4. Months to recover the laptop: ${fmt(laptop)} ÷ ${fmt(saving)} = ${payback.toFixed(1)} months.\n\nForgetting the subscription gives ${(laptop / (manual - hoursC * rate)).toFixed(1)} months.`,
      hints: ["Find the monthly cost of each method first.", "The subscription is part of the software's monthly cost."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Accounting software still uses double entry.",
    answer: true,
    explanation: "True. Every entry still has a debit and a credit; the software makes both automatically.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Using a spreadsheet means a business no longer needs to keep its source documents.",
    answer: false,
    explanation: "False. Source documents are still the evidence for every entry, and they are needed for checks, audits and tax.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Staff may need training before a business can use computerised accounting effectively.",
    answer: true,
    explanation: "True. Training is one of the costs of moving to digital methods.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement with the method it describes.",
    pairs: ["Totals are added with a calculator and written in ink", "One entry updates the ledger and trial balance", "Work continues during a power cut", "Reports on overdue customers can be printed at any time", "Data can be protected with passwords"],
    right: ["Manual", "Digital"],
    rightIndex: [0, 1, 0, 1, 1],
    explanation: "Manual: handwritten, no power needed. Digital: automatic posting, instant reports, password protection.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The phrase \"garbage in, garbage {{blank:a}}\" means that a computer system produces {{blank:b}} results if the data entered are wrong.",
    blanks: [
      { id: "a", accepted: ["out"] },
      { id: "b", accepted: ["wrong", "incorrect", "inaccurate"] },
    ],
    wrong: [["in", "correct"]],
    explanation: "Digital systems process exactly what they are given, so careful original entry still matters.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** advantages of using a spreadsheet to keep a sales journal.",
    points: [
      "Totals are calculated automatically by formulas (fewer arithmetic errors).",
      "A second advantage: totals update when a figure is corrected / quick to sort or filter by customer / easy to store and copy / neat and legible.",
    ],
    modelAnswer: "The SUM formula adds the column automatically, so there are no adding errors, and if an invoice is corrected the total updates by itself.",
    explanation: "Any two valid features of spreadsheets.",
  });

  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Chipo runs a pharmacy in Bulawayo with 300 credit customers and two assistants. She keeps manual books. Evaluate whether she should change to accounting software for the original entry of her transactions.",
    points: [
      "Advantage: with many credit customers, one entry updates the customer accounts and sales automatically (time saved).",
      "Advantage: fewer arithmetic and posting errors / statements and reminders to customers produced quickly.",
      "Limitation: cost of software, hardware and training for the assistants.",
      "Limitation: needs power (power cuts), back-ups and security; input errors still possible.",
      "A conclusion: change / do not change.",
      "The conclusion is justified with reference to her business (e.g. 300 credit customers make the saving worthwhile, with a back-up plan for power cuts).",
    ],
    modelAnswer: "With 300 credit customers, software would save a lot of time: each invoice is entered once and the customer's account, sales and the trial balance are updated, and statements can be sent quickly to chase payment. It also removes adding errors. However, Chipo must pay for the software and a computer, train her assistants, keep back-ups and plan for power cuts, and wrong figures keyed in will still be wrong. Because she has so many credit customers, I recommend she changes, keeping a back-up and a manual receipt book for power cuts.",
    explanation: "Evaluate = both sides plus a justified conclusion.",
    hints: ["Use the number of credit customers in your answer."],
  });

  {
    const days = [["Mon", 186, 92], ["Tue", 214, 105], ["Wed", 158, 77], ["Thu", 243, 118], ["Fri", 305, 149]];
    const s = sum(days.map((d) => d[1])), c = sum(days.map((d) => d[2]));
    const stim = table(["Row", "A: Day", "B: Sales US\\$", "C: Cost of goods sold US\\$", "D: Gross profit US\\$"], [...days.map(([d, x, y], i) => [String(i + 2), d, fmt(x), fmt(y), `=B${i + 2}-C${i + 2}`]), ["7", "**Total**", "?", "?", "?"]], ["---", "---", "---:", "---:", "---"]);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true, secs: 720,
      stem: `Nyasha keeps her tuck shop's daily figures in a spreadsheet. Column D uses a formula in each row.\n\n${stim}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Write the formula that should be entered in cell B7 to total the sales.", accepted: ["=SUM(B2:B6)", "SUM(B2:B6)", "=B2+B3+B4+B5+B6"], normalise: ["trim", "lowercase", "collapse_whitespace"], model: "=SUM(B2:B6)", wrong: ["=SUM(B2:B7)"], explanation: "SUM over rows 2 to 6; including B7 itself would create a circular reference." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: s, stem: "Calculate the total sales for the week.", wrong: [s - 305], explanation: `${days.map((d) => fmt(d[1])).join(" + ")} = ${money(s)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s - c, stem: "Calculate the total gross profit for the week (cell D7).", wrong: [c], explanation: `Cost of goods sold = ${days.map((d) => fmt(d[2])).join(" + ")} = ${money(c)}. Gross profit = ${fmt(s)} − ${fmt(c)} = ${money(s - c)}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Nyasha discovers that Thursday's sales were really US\\$234, not US\\$243. Explain what happens to the spreadsheet when she corrects cell B5, and why this is an advantage over a manual record.", points: ["The formulas recalculate D5, B7 and D7 automatically (each falls by US\\$9).", "In a manual record she would have to correct and re-add every affected figure by hand, risking further errors."], modelAnswer: "When B5 is changed to 234, D5, the sales total and the gross profit total all fall by US\\$9 automatically. In a paper book she would have to cross out and re-add each figure, which takes time and can cause new mistakes." }),
      ],
      explanation: `Total sales ${money(s)}; gross profit ${money(s - c)}. Formulas update totals automatically when an input is corrected.`,
      hints: ["The range for the total is rows 2 to 6.", "Gross profit = sales − cost of goods sold."],
    });
  }

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Sipho owns a transport business in Chinhoyi with six trucks. His book-keeper records fuel, repairs and customer invoices by hand. Last month two invoices were never recorded, and the trial balance took three days to agree.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which problem described would a computerised system **not** prevent on its own?", options: [["Invoices that are never entered", "Correct: software can only process what is keyed in."], ["Columns added incorrectly", "Formulas add accurately."], ["Debits without matching credits", "Software always completes the double entry."], ["A slow trial balance", "Software produces the trial balance instantly."]], answer: "A", explanation: "Missing input (errors of omission) still needs controls such as numbered invoices." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** benefits Sipho would gain from computerised records.", points: ["Speed: one entry updates the ledger and trial balance…", "…so the trial balance is available at once instead of after three days.", "Accuracy / reports: automatic calculations remove adding errors…", "…and reports per truck (fuel and repair costs) help him control costs."], modelAnswer: "Each fuel bill or invoice would be entered once and posted automatically, so the trial balance would be ready immediately rather than after three days. The software also calculates totals without errors and can report costs for each truck, helping Sipho see which trucks are expensive to run." }),
      P.manual({ label: "(c)", marks: 3, stem: "State **three** costs or risks Sipho must consider before changing.", points: ["Cost of software / hardware.", "Training the book-keeper.", "Power cuts / data loss without back-ups / viruses or hacking."], modelAnswer: "He must pay for the software and a computer, train his book-keeper, and protect against power cuts and data loss by keeping back-ups." }),
    ],
    explanation: "Digital records speed up processing and remove arithmetic errors, but do not stop omissions and bring costs and risks.",
    hints: ["Think about which of his problems are arithmetic and which are input."],
  });

  b.card("DEFINITION", "Manual accounting", "Recording and processing transactions by hand in paper books.");
  b.card("DEFINITION", "Digital (electronic) accounting", "Recording transactions on a computer or device; spreadsheets or software calculate and post automatically.");
  b.card("FACT", "Advantages of digital records", "Fast; automatic totals and postings; reports at any time; easy storage; password protection.");
  b.card("FACT", "Limitations of digital records", "Cost of hardware/software; training; needs power; risk of data loss, viruses and hacking; input errors still flow through.");
  b.card("FACT", "Advantages of manual records", "Cheap; simple; no power needed; suitable for very small businesses.");
  b.card("CONCEPT", "Garbage in, garbage out", "A computer processes exactly what is entered: wrong input gives wrong records and statements.");
  b.card("FORMULA", "Spreadsheet total of cells D2 to D6", "=SUM(D2:D6)");
  b.card("CONCEPT", "Does accounting software change the principles of accounting?", "No. Source documents, double entry and classification still apply; only the processing is automated.");
});
