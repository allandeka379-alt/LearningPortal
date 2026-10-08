// W2a: the general journal (journal proper).
import { concept, P, money, journal, tAccount, check, sum, r2, ZIM, CAM } from "../lib.mjs";
import { table } from "../tables/w2a-lib.mjs";

const U = String.raw`US\$`;

concept("acc.books.general-journal", { file: "books/general-journal", keyPrefix: "books.general-journal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which transaction is recorded in the **general journal**?",
    options: [
      ["A delivery van bought on credit", "Correct: credit purchases of non-current assets go in the general journal."],
      ["Goods for resale bought on credit", "These go in the purchases journal."],
      ["Wages paid in cash", "Cash payments go in the cash book."],
      ["Goods returned by a customer", "These go in the sales returns journal."],
    ],
    answer: "A",
    explanation: "The general journal records transactions that do not fit any other book of prime entry, such as credit purchases of non-current assets.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **narrative** in a journal entry?",
    options: [
      ["A brief explanation written under the entry", "Correct: it says why the entry was made."],
      ["The total of the debit column for the entry", "Totals are not narratives."],
      ["The name of the person who made the entry", "The narrative explains the transaction, not who wrote it."],
      ["The page number of the ledger account posted to", "That is a folio reference."],
    ],
    answer: "A",
    explanation: "Each journal entry ends with a narrative, for example \"Shelving bought on credit from Gweru Shopfitters\".",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rudo takes goods costing US\\$260 from her shop for her own use. Which journal entry records this?",
    options: [
      ["Debit drawings, credit purchases", "Correct: drawings increase and the goods available for sale (purchases) decrease."],
      ["Debit purchases, credit drawings", "This is the reverse of the correct entry."],
      ["Debit drawings, credit sales", "The goods were not sold; purchases are reduced at cost."],
      ["Debit capital, credit inventory", "Drawings are recorded in the drawings account, and purchases rather than inventory are reduced."],
    ],
    answer: "A",
    explanation: "Goods taken for private use: **debit drawings, credit purchases**, at cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A customer, Chipo Gumbo, owes US\\$410 and has left the country with no chance of payment. Which entry writes off the debt?",
    options: [
      ["Debit irrecoverable debts, credit Chipo Gumbo", "Correct: the loss is an expense and her account is closed."],
      ["Debit Chipo Gumbo, credit irrecoverable debts", "This would increase what she owes."],
      ["Debit sales, credit Chipo Gumbo", "The sale did happen; the loss is recorded as an expense."],
      ["Debit irrecoverable debts, credit bank", "No money leaves the bank when a debt is written off."],
    ],
    answer: "A",
    explanation: "An irrecoverable (bad) debt is an expense: debit irrecoverable debts; credit the customer to remove the asset.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In opening entries, how is the **capital** figure found?",
    options: [
      ["Total assets minus total liabilities", "Correct: capital is the balancing figure, from the accounting equation."],
      ["Total assets plus total liabilities", "Liabilities are owed to outsiders, so they are deducted."],
      ["The bank balance at the start", "Capital includes all assets, not just the bank."],
      ["Total liabilities minus total assets", "This gives a negative of the correct figure."],
    ],
    answer: "A",
    explanation: "Assets = capital + liabilities, so capital = assets − liabilities. It is credited in the opening entry.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A journal entry reads: *Debit motor vehicles US\\$9,500; credit Kwekwe Motors US\\$9,500.* What does it record?",
    options: [
      ["A vehicle bought on credit from Kwekwe Motors", "Correct: an asset increases and a liability to the supplier is created."],
      ["A vehicle sold on credit to Kwekwe Motors", "A sale would credit motor vehicles and debit the buyer."],
      ["A vehicle paid for by bank transfer", "A bank payment would be credited to bank in the cash book."],
      ["Repairs to a vehicle owed to Kwekwe Motors", "Repairs would be debited to an expense account, not motor vehicles."],
    ],
    answer: "A",
    hints: ["Read the entry as a sentence: what increased, and who is now owed?"],
    explanation: "Debiting the asset account and crediting a named business means the asset was bought on credit from that business.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai brings his own lorry, valued at US\\$14,000, into his transport business. Which entry records this?",
    options: [
      ["Debit motor vehicles, credit capital", "Correct: a non-current asset is introduced as capital."],
      ["Debit capital, credit motor vehicles", "This would reduce both the asset and the owner's capital."],
      ["Debit motor vehicles, credit bank", "No money was paid; the owner contributed the lorry."],
      ["Debit drawings, credit motor vehicles", "Drawings are things taken out of the business, not brought in."],
    ],
    answer: "A",
    hints: ["The owner is investing more in the business."],
    explanation: "Assets brought in by the owner increase capital: debit the asset, credit capital.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Goods costing US\\$300 (selling price US\\$420) taken by the owner were recorded as *debit drawings US\\$420, credit sales US\\$420*. Compared with the correct entry, what is the effect on gross profit?",
    options: [
      ["Gross profit is overstated by US\\$120", "Correct: the wrong entry adds 420 to sales; the correct entry would have cut cost of sales by 300. The difference is 120."],
      ["Gross profit is overstated by US\\$420", "This forgets that the correct entry (credit purchases 300) also raises gross profit, by 300."],
      ["Gross profit is understated by US\\$300", "Recording extra sales raises gross profit; it does not lower it."],
      ["There is no effect on gross profit", "Sales are higher than they should be, so gross profit changes."],
    ],
    answer: "A",
    hints: ["Work out how each entry changes gross profit, then compare."],
    explanation: "Correct entry: credit purchases 300, so cost of sales falls by 300 and gross profit rises by 300. Wrong entry: credit sales 420, so gross profit rises by 420. Gross profit is therefore $420 - 300 = 120$ too high (and drawings are overstated by 120).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every entry in the general journal must have equal debit and credit totals.",
    answer: true,
    explanation: "True. A journal entry is an instruction for double entry, so total debits equal total credits.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Credit sales of goods to customers are normally recorded in the general journal.",
    answer: false,
    explanation: "False. Credit sales of goods go in the sales journal. The general journal is for transactions that do not fit any other book.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each transaction with the account **debited** in the general journal.",
    pairs: ["Computer bought on credit for office use", "Debt of a bankrupt customer written off", "Goods taken by the owner for his family", "Old shop counter sold on credit to Tendai", "Owner brings her own car into the business"],
    right: ["Office equipment", "Irrecoverable debts", "Drawings", "Tendai", "Motor vehicles"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "The account receiving value is debited: the asset bought, the expense, drawings, the buyer who now owes, the asset brought in.",
  });

  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the journal entry for shop fittings costing US\\$1,950 bought on credit from Mutare Joinery.",
    template: "Debit {{blank:a}} US\\$1,950; credit {{blank:b}} US\\$1,950.",
    blanks: [
      { id: "a", accepted: ["Fixtures and fittings"], choices: ["Fixtures and fittings", "Purchases", "Mutare Joinery", "Bank"] },
      { id: "b", accepted: ["Mutare Joinery"], choices: ["Mutare Joinery", "Fixtures and fittings", "Purchases", "Capital"] },
    ],
    explanation: "A non-current asset bought on credit: debit the asset account, credit the supplier.",
  });

  // Capital in opening entries
  const oa = { premises: 38000, equipment: 7400, inventory: 5150, receivables: 2380, bank: 1960, cash: 240 };
  const ol = { payables: 3420, loan: 8000 };
  const ocap = r2(sum(Object.values(oa)) - sum(Object.values(ol)));
  check("ocap", ocap, 43710);
  b.calc({
    d: 3, kind: "money", value: ocap, calculator: true, wrong: [sum(Object.values(oa)), r2(sum(Object.values(oa)) + sum(Object.values(ol)))],
    stem: "Thandeka is opening a new set of books for her Kariba fishing supplies business on 1 January 2025:\n\n" +
      table(["Item", U], [["Premises", oa.premises], ["Equipment", oa.equipment], ["Inventory", oa.inventory], ["Trade receivables", oa.receivables], ["Bank", oa.bank], ["Cash", oa.cash], ["Trade payables", ol.payables], ["Loan from Mutapa Finance", ol.loan]]) +
      "\n\nCalculate the capital figure to be credited in her opening journal entry.",
    hints: ["Separate the assets from the liabilities.", "Capital = assets − liabilities."],
    explanation: `Assets $38,000 + 7,400 + 5,150 + 2,380 + 1,960 + 240 = ${sum(Object.values(oa)).toLocaleString("en-GB")}$. Liabilities $3,420 + 8,000 = 11,420$. Capital $${sum(Object.values(oa)).toLocaleString("en-GB")} - 11,420 = ${ocap.toLocaleString("en-GB")}$. Forgetting to deduct the liabilities gives ${money(sum(Object.values(oa)))}.`,
  });
  // Customer balance after write-off of part
  const owed = 1275;
  const recvd = 480;
  b.num({
    d: 3, kind: "money", value: r2(owed - recvd), wrong: [owed],
    stem: "Sipho Mpofu owed Tendai US\\$1,275. Sipho's trustee paid US\\$480 by bank transfer as a final settlement, and Tendai wrote off the rest as irrecoverable. What amount is debited to the irrecoverable debts account?",
    hints: ["Only the part that will never be received is written off."],
    explanation: `$1,275 - 480 = ${r2(owed - recvd)}$. The US\\$480 received is recorded in the cash book; only the remaining ${money(r2(owed - recvd))} is written off.`,
  });

  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State **two** reasons why a business uses the general journal.",
    points: ["To record transactions that do not belong in any other book of prime entry (e.g. opening entries, non-current assets on credit, bad debts, drawings of goods, corrections)", "To provide a written explanation (narrative) / authority for unusual entries and reduce errors or fraud"],
    modelAnswer: "It gives a book of prime entry for unusual transactions such as opening entries and credit purchases of non-current assets, and its narratives explain each entry so it can be checked later.",
    explanation: "Without the journal, unusual entries would go straight to the ledger with no record of why they were made.",
  });

  // Practice structured 1: journal entries for several transactions
  const e1 = [
    { date: "3 Mar", lines: [["Office equipment", 2650, null], ["Bulawayo Computers", null, 2650]], narrative: "Laptop and printer bought on credit" },
    { date: "11 Mar", lines: [["Irrecoverable debts", 515, null], ["Nyasha Banda", null, 515]], narrative: "Debt written off: customer cannot pay" },
    { date: "19 Mar", lines: [["Drawings", 145, null], ["Purchases", null, 145]], narrative: "Goods taken by the owner for private use" },
    { date: "26 Mar", lines: [["Rudo Sibanda", 1800, null], ["Fixtures and fittings", null, 1800]], narrative: "Old display cabinet sold on credit at its book value" },
  ];
  const e1md = journal(e1);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION",
    stem: "Chipo owns a pharmacy in Chinhoyi. In March 2025:\n\n" +
      table(["Date", "Transaction"], [["3 Mar", "Bought a laptop and printer for the office on credit from Bulawayo Computers, US\\$2,650"], ["11 Mar", "Wrote off the debt of US\\$515 owed by Nyasha Banda, who cannot pay"], ["19 Mar", "Chipo took goods costing US\\$145 (selling price US\\$210) for her family"], ["26 Mar", "Sold an old display cabinet on credit to Rudo Sibanda for US\\$1,800, its book value"]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "At what value is the transaction on 19 March recorded?",
        options: [["US\\$145, the cost", "Correct: purchases are recorded at cost, so they are reduced at cost."], ["US\\$210, the selling price", "The goods were not sold; no profit is made on them."], ["US\\$65, the profit", "No profit is recorded on drawings."], ["US\\$355, cost plus selling price", "Only the cost is recorded."]],
        answer: "A", explanation: "Drawings of goods are at cost.",
      }),
      P.manual({ label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to record the four transactions. Narratives are required.", points: ["3 Mar: Dr Office equipment 2,650", "Cr Bulawayo Computers 2,650", "11 Mar: Dr Irrecoverable debts 515, Cr Nyasha Banda 515", "19 Mar: Dr Drawings 145", "Cr Purchases 145", "26 Mar: Dr Rudo Sibanda 1,800", "Cr Fixtures and fittings 1,800", "Suitable narratives and dates for all four"], modelAnswer: e1md, explanation: "Debit the account receiving value; credit the account giving it." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the effect of the 11 March entry on Chipo's profit and on her assets.", points: ["Profit falls by 515 (irrecoverable debts is an expense)", "Trade receivables (assets) fall by 515"], modelAnswer: "Irrecoverable debts of US\\$515 are an expense, so profit falls by US\\$515; trade receivables fall by the same amount.", explanation: "Writing off a debt moves it from asset to expense." }),
    ],
    hints: ["Ask which account gains value and which gives it.", "Every entry needs a narrative."],
    explanation: "This item tests the main uses of the general journal.",
  });

  // Practice structured 2: opening entries and posting
  const oe = { assets: [["Premises", 52000], ["Motor van", 9800], ["Inventory", 4730], ["Trade receivable: T. Ncube", 1265], ["Bank", 2905]], liabs: [["Trade payable: Masvingo Wholesalers", 1840], ["Loan: Mutapa Finance", 12000]] };
  const oeCap = r2(sum(oe.assets.map((a) => a[1])) - sum(oe.liabs.map((l) => l[1])));
  check("oeCap", oeCap, 56860);
  const oeMd = journal([{ date: "1 Jan", lines: [...oe.assets.map(([a, v]) => [a, v, null]), ...oe.liabs.map(([a, v]) => [a, null, v]), ["Capital", null, oeCap]], narrative: "Opening entries: assets, liabilities and capital at 1 January 2025" }]);
  const tnModel = tAccount("T. Ncube account", [["1 Jan", "Balance", 1265]], [["14 Jan", "Bank", 900], ["14 Jan", "Irrecoverable debts", 365]]);
  b.struct({
    d: 5, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai runs a bakery in Masvingo. On 1 January 2025 he opened a new set of books. His position was:\n\n" +
      table(["Item", U], [...oe.assets, ...oe.liabs]) +
      "\n\nOn 14 January T. Ncube paid US\\$900 by bank transfer and told Farai he could pay nothing more. Farai wrote off the balance.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: oeCap, wrong: [sum(oe.assets.map((a) => a[1]))], stem: "Calculate Farai's capital at 1 January 2025.", explanation: `Assets ${money(sum(oe.assets.map((a) => a[1])))} less liabilities ${money(sum(oe.liabs.map((l) => l[1])))} = ${money(oeCap)}.` }),
      P.manual({ label: "(b)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the opening journal entry.", points: ["Date and the five assets on the debit side with correct amounts", "Trade payable 1,840 and loan 12,000 on the credit side", "Capital 56,860 credited", "Totals equal (70,700)", "Narrative"], modelAnswer: oeMd, explanation: "Capital is the balancing figure." }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: 365, wrong: [1265], stem: "Calculate the amount written off on 14 January.", explanation: "$1,265 - 900 = 365$." }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entry for the write-off and T. Ncube's account for January.", points: ["Journal: Dr Irrecoverable debts 365, Cr T. Ncube 365, with narrative", "T. Ncube: opening balance 1,265 debit; Bank 900 credit", "Irrecoverable debts 365 credit; account closed with totals 1,265"], modelAnswer: `${journal([{ date: "14 Jan", lines: [["Irrecoverable debts", 365, null], ["T. Ncube", null, 365]], narrative: "Balance of T. Ncube's debt written off as irrecoverable" }])}\n\n${tnModel}`, explanation: "The receipt is recorded in the cash book; the write-off in the journal." }),
    ],
    hints: ["Capital = assets − liabilities.", "Only the unpaid part of the debt is written off."],
    explanation: "This item tests opening entries and writing off a debt through the journal.",
  });
  check("oe total", sum(oe.assets.map((a) => a[1])), 70700);
  check("tn", 1265 - 900, 365);

  b.card("DEFINITION", "What is the **general journal**?", "The book of prime entry for transactions that do not fit any other book (also called the journal proper).");
  b.card("DEFINITION", "What is a **narrative**?", "A short explanation written under a journal entry.");
  b.card("FACT", "Opening entries", "Debit each asset; credit each liability and capital. Capital = assets − liabilities.");
  b.card("FACT", "Non-current asset bought on credit", "Debit the asset account; credit the supplier.");
  b.card("FACT", "Writing off an irrecoverable (bad) debt", "Debit irrecoverable debts; credit the customer.");
  b.card("FACT", "Goods taken by the owner", "Debit drawings; credit purchases, at cost.");
  b.card("FACT", "Asset brought in by the owner", "Debit the asset account; credit capital.");
  b.card("CONCEPT", "How do you interpret a journal entry?", "Read it as a sentence: which account gained value (debit), which gave it (credit), and why (narrative).");
  b.card("FACT", "Terms for a debt that will never be paid", "ZIMSEC: bad debt. Cambridge: irrecoverable debt.", undefined, { applies: undefined });
});
