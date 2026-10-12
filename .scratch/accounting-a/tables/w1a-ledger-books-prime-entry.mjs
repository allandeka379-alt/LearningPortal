// Lesson generator: ledger.books-prime-entry (Cambridge only)
import { journal, table, check, sum, r2, fmt, trialBalance, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const sales = [["3 Mar", "S101", "Mutasa Builders", 1260], ["9 Mar", "S102", "Chipo Contractors", 840], ["17 Mar", "S103", "Mutasa Builders", 615], ["26 Mar", "S104", "Nyasha Stores", 1480]];
const sret = [["12 Mar", "CN11", "Chipo Contractors", 90], ["28 Mar", "CN12", "Nyasha Stores", 135]];
const purch = [["2 Mar", "P201", "Kariba Cement", 2300], ["11 Mar", "P202", "Zambezi Timber", 1450], ["20 Mar", "P203", "Kariba Cement", 980]];
const pret = [["14 Mar", "DN21", "Zambezi Timber", 160]];
const sTot = sum(sales.map((x) => x[3]));
const srTot = sum(sret.map((x) => x[3]));
const pTot = sum(purch.map((x) => x[3]));
const prTot = sum(pret.map((x) => x[3]));
check("sTot", sTot, 4195);
check("srTot", srTot, 225);
check("pTot", pTot, 4730);
check("prTot", prTot, 160);
const mk = (rows, tot, who) => table(["Date", "Document", who, "US\\$"], rows.concat([["", "", "**Total**", `**${fmt(tot)}**`]]), ["l", "l", "l", "r"]);
const salesJ = mk(sales, sTot, "Customer");
const sretJ = mk(sret, srTot, "Customer");
const purchJ = mk(purch, pTot, "Supplier");
const pretJ = mk(pret, prTot, "Supplier");

// personal accounts and control accounts
const bal = (rows, name) => sum(rows.filter((r) => r[2] === name).map((r) => r[3]));
const mutasa = bal(sales, "Mutasa Builders");
const chipo = r2(bal(sales, "Chipo Contractors") - bal(sret, "Chipo Contractors"));
const nyasha = r2(bal(sales, "Nyasha Stores") - bal(sret, "Nyasha Stores"));
check("receivables ctrl", sum([mutasa, chipo, nyasha]), sTot - srTot);
const kariba = bal(purch, "Kariba Cement");
const zambezi = r2(bal(purch, "Zambezi Timber") - bal(pret, "Zambezi Timber"));
check("payables ctrl", sum([kariba, zambezi]), pTot - prTot);
const posting = table(
  ["Book", "Total posted to the general ledger", "Individual items posted to"],
  [
    ["Sales journal", `Credit Sales ${fmt(sTot)}; debit Trade receivables control ${fmt(sTot)}`, "Debit each customer's account in the sales ledger"],
    ["Sales returns journal", `Debit Sales returns ${fmt(srTot)}; credit Trade receivables control ${fmt(srTot)}`, "Credit each customer's account"],
    ["Purchases journal", `Debit Purchases ${fmt(pTot)}; credit Trade payables control ${fmt(pTot)}`, "Credit each supplier's account in the purchases ledger"],
    ["Purchases returns journal", `Credit Purchases returns ${fmt(prTot)}; debit Trade payables control ${fmt(prTot)}`, "Debit each supplier's account"],
  ],
  ["l", "l", "l"],
);
const bals = table(
  ["Ledger", "Account", "Balance US\\$"],
  [
    ["Sales ledger", "Mutasa Builders", mutasa],
    ["Sales ledger", "Chipo Contractors", chipo],
    ["Sales ledger", "Nyasha Stores", nyasha],
    ["Sales ledger", "**Total = control account**", `**${fmt(sTot - srTot)}**`],
    ["Purchases ledger", "Kariba Cement", kariba],
    ["Purchases ledger", "Zambezi Timber", zambezi],
    ["Purchases ledger", "**Total = control account**", `**${fmt(pTot - prTot)}**`],
  ],
  ["l", "l", "r"],
);

// Cash book
const recp = [["1 Mar", "Balance b/d", null, 6200], ["10 Mar", "Mutasa Builders", 63, 1197], ["20 Mar", "Chipo Contractors", 15, 735], ["24 Mar", "Cash sales", null, 2400]];
const paym = [["8 Mar", "Kariba Cement", 69, 2231], ["15 Mar", "Wages", null, 1850], ["22 Mar", "Zambezi Timber", 32.25, 1257.75], ["29 Mar", "Rent", null, 650]];
check("mutasa", 1260 - 63, 1197);
check("chipo", 750 - 15, 735);
check("kariba", 2300 - 69, 2231);
check("zambezi", 1290 - 32.25, 1257.75);
const recDisc = sum(recp.map((x) => x[2]));
const payDisc = sum(paym.map((x) => x[2]));
const recBank = sum(recp.map((x) => x[3]));
const payBank = sum(paym.map((x) => x[3]));
const cd = r2(recBank - payBank);
check("cd", cd, 4543.25);
check("recDisc", recDisc, 78);
check("payDisc", payDisc, 101.25);
const rowsCB = [];
for (let i = 0; i < 5; i += 1) {
  const a = recp[i] ?? ["", "", null, null];
  let c = paym[i] ?? ["", "", null, null];
  if (i === 4) c = ["31 Mar", "Balance c/d", null, cd];
  rowsCB.push([a[0], a[1], a[2], a[3], c[0], c[1], c[2], c[3]]);
}
rowsCB.push(["", "", `**${fmt(recDisc)}**`, `**${fmt(recBank)}**`, "", "", `**${fmt(payDisc)}**`, `**${fmt(r2(payBank + cd))}**`]);
rowsCB.push(["1 Apr", "Balance b/d", null, cd, "", "", null, null]);
check("cb totals", recBank, payBank + cd);
const cashBook = table(["Date", "Details", "Discount allowed", "Bank", "Date", "Details", "Discount received", "Bank"], rowsCB, ["l", "l", "r", "r", "l", "l", "r", "r"]);

// General journal
const ob = [["Premises", 45000], ["Equipment", 8600], ["Inventory", 5150], ["Trade receivables control", 3970], ["Bank", 1230]];
const payOb = 4570;
const assets = sum(ob.map((x) => x[1]));
const capital = r2(assets - payOb);
check("capital", capital, 59380);
const gj = journal([
  { date: "1 Apr", lines: ob.map((x) => [x[0], x[1], null]).concat([["Trade payables control", null, payOb], ["Capital", null, capital]]), narrative: "Opening entries for the business taken over from the previous owner" },
  { date: "3 Apr", lines: [["Computer equipment", 3400, null], ["Tech Zim (supplier)", null, 3400]], narrative: "Computer purchased on credit from Tech Zim" },
  { date: "9 Apr", lines: [["Irrecoverable debts", 480, null], ["Nyasha Stores", null, 480]], narrative: "Debt written off: Nyasha Stores has ceased trading" },
  { date: "30 Apr", lines: [["Rent", 650, null], ["Wages", null, 650]], narrative: "Correction of error: rent paid was debited to the wages account" },
]);

const sources = table(
  ["Book of prime entry", "Source document", "Records"],
  [
    ["Sales journal", "Sales invoice (copy)", "Credit sales"],
    ["Sales returns journal", "Credit note issued", "Goods returned by customers"],
    ["Purchases journal", "Purchase invoice received", "Credit purchases of goods for resale"],
    ["Purchases returns journal", "Credit note received; debit note issued", "Goods returned to suppliers"],
    ["Cash book", "Receipts, cheque stubs, bank statements", "Receipts and payments of cash and bank, with discounts"],
    ["General journal", "Written authority, memo", "Items that fit no other book: opening entries, non-current assets on credit, write-offs, corrections"],
  ],
  ["l", "l", "l"],
);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Books of original entry", "Books of prime entry"],
    ["Debtors ledger; creditors ledger", "Sales ledger; purchases ledger"],
    ["Returns inwards book; returns outwards book", "Sales returns journal; purchases returns journal"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Sipho's hardware shop in Gweru raises dozens of invoices every week. If he recorded each one directly in the ledger he would have thousands of entries and no easy way to find an error. Instead, each transaction is first written in a **book of prime entry**, grouped by type, and then posted to the ledgers. This is a Cambridge AS topic; ZIMSEC students also use books of original entry, and the ledger skills are the same.

You should already know double entry (see the lesson on double entry and ledger accounts). This lesson shows how the books of prime entry feed the personal ledgers and the control accounts, how the cash book handles discounts and how the general journal records the unusual items.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

This topic is Cambridge only in the syllabus; ZIMSEC candidates need the same ledger skills in the control accounts and verification lessons. There are no folio columns in the Cambridge syllabus.
:::

## Key definitions

:::definition{term="Book of prime entry"}
A book in which transactions are first recorded, in date order and grouped by type, before being posted to the ledger accounts.
:::

:::definition{term="Sales ledger and purchases ledger"}
Subsidiary ledgers holding the personal accounts of customers (trade receivables) and suppliers (trade payables).
:::

:::definition{term="Control account"}
A summary account in the general ledger whose balance equals the total of the balances of the individual accounts in a subsidiary ledger.
:::

:::definition{term="General journal"}
The book of prime entry for transactions that do not belong in any other book, each entry with a narrative explaining it.
:::

## Source documents and books

${sources}

## Posting the journals

The total of each journal is posted once to the general ledger, and each item is posted to the personal accounts in the subsidiary ledger.

${posting}

:::worked-solution[Example 1: the four credit journals and the control accounts]
Sipho's credit transactions for March 2025. There were no opening balances.

**Sales journal**

${salesJ}

**Sales returns journal**

${sretJ}

**Purchases journal**

${purchJ}

**Purchases returns journal**

${pretJ}

1. Customers' balances are found from the personal accounts; their total must equal the control account (sales 4,195 less returns 225 = 3,970).
2. Suppliers' balances are found the same way; their total must equal the trade payables control account (purchases 4,730 less returns 160 = 4,570).

${bals}
:::

## The cash book with discounts

The cash book is both a book of prime entry and the ledger account for cash and bank. A two-column discount layout adds a column for **discount allowed** (receipts side) and **discount received** (payments side). The discount columns are **memorandum** columns: the amounts are not part of the bank balance. Their totals are posted once at the end of the month.

:::worked-solution[Example 2: a cash book with discount columns]
The cheques received from customers are net of discount; the cheques paid to suppliers are net of discount received. All receipts and payments go through the bank.

${cashBook}

1. Mutasa Builders owed 1,260 and paid 1,197 after 5% discount (63). The customer account is credited with the full 1,260.
2. Total discount allowed 78 is debited to the discount allowed account; total discount received 101.25 is credited to the discount received account.
3. The balance is found on the bank column only: 10,532 - 5,988.75 = 4,543.25 debit.
:::

## The general journal

:::worked-solution[Example 3: general journal entries]
The shop's records for April include four items that no other book of prime entry fits.

${gj}

1. The opening entry has assets as debits and liabilities and capital as credits; capital is the balancing figure: 63,950 - 4,570 = 59,380.
2. The purchase of non-current assets on credit never goes in the purchases journal, which is only for goods for resale.
3. A narrative is required for each entry, because the general journal is the main route for corrections and for items that need authority.
:::

## Advantages and disadvantages of full records

- **Advantages:** errors are traced quickly because each total can be checked; control accounts and personal accounts are separate, so work can be divided and fraud is harder; customers and suppliers can be given statements; information for management (who owes what, sales trends) is easy to extract.
- **Disadvantages:** time and cost for a small business; more records to keep accurate; a need for trained staff; risks of duplication unless computerised.

A small trader might decide that the cost of full records outweighs the benefit, but legal and tax requirements normally demand adequate records.

## Common mistakes

:::mistake{title="Posting non-current assets bought on credit to the purchases journal"}
The purchases journal is for goods bought for resale only. A computer or vehicle bought on credit is recorded in the general journal.
:::

:::mistake{title="Including discount columns in the bank balance"}
Discount allowed and discount received are separate memorandum columns. Only the bank column forms the bank balance.
:::

:::mistake{title="Posting each item to the general ledger"}
Individual invoices go to the personal accounts in the subsidiary ledger. Only the total of each journal is posted to the general ledger, so the general ledger stays short.
:::

:::mistake{title="Leaving out the narrative"}
A journal entry without a narrative loses marks and, in practice, cannot be checked.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 tests which book of prime entry or document is used and the effect of postings. Paper 2 uses the journals and cash book inside larger questions: *prepare* a journal with narrative, or *post* totals to control accounts. For *state the book of prime entry*, answer with the name; for *explain*, give the type of transaction recorded.
:::

:::exam-tip
In *advantages and disadvantages* questions give each point a reason that mentions the business (time, cost, control), and finish with a judgement if the command word is *evaluate*.
:::

## Summary

:::summary
- Transactions are first recorded in books of prime entry, then posted to the ledgers.
- The sales, purchases and returns journals record credit transactions; the cash book records receipts and payments with discounts.
- The general journal records opening entries, non-current assets on credit, write-offs and corrections, each with a narrative.
- Totals of the journals go to the control accounts; items go to the personal accounts.
- Discount columns in the cash book are memorandum; their totals are posted at the end of the month.
- Full records improve control and information but cost time and money.
:::
`;

writeLesson(
  "ledger/books-prime-entry.md",
  {
    key: "ledger.books-prime-entry",
    title: "Books of prime entry and the general journal",
    summary: "Use the sales, purchases and returns journals, the cash book with discounts and the general journal; post totals and items to the control and personal accounts; and weigh the advantages of full records.",
    concepts: ["aacc.ledger.books-prime-entry"],
    estimatedMinutes: 55,
    level: "core",
  },
  body,
);
