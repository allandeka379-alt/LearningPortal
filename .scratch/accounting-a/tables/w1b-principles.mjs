// Lesson: verification.principles (Cambridge only)
import { t, money, fmt, check, chk, r2, sum, table, statement, tAccount } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: supplier statement reconciliation
const ledger = 7240, unrecInv = 2150, creditNote = 780, transit = 1560;
const agreed = chk(ledger + unrecInv, 9390);
const stmt = chk(agreed + creditNote + transit, 11730);
const supp = tAccount("Zambezi Hardware account in Nyasha's purchases ledger",
  [["10 Mar", "Payment", 4300], ["12 Mar", "Returns outwards (credit note)", 780], ["30 Mar", "Bank (cheque)", 1560]],
  [["1 Mar", "Balance b/d", 5100], ["3 Mar", "Purchases", 6400], ["20 Mar", "Purchases", 2380]], { cdDate: "31 Mar", bdDate: "1 Apr" });
// ledger balance check: credits 13,880 - debits 6,640 = 7,240
check("ledger bal", 5100 + 6400 + 2380 - 4300 - 780 - 1560, ledger);
const rec1 = statement("Reconciliation of the supplier's statement at 31 March 2026", [
  ["Balance per supplier's statement", stmt],
  ["Less credit note for returns not yet recorded by the supplier", -creditNote],
  ["Less cheque sent on 30 March, not yet received by the supplier", -transit],
  ["Agreed balance owing to the supplier", agreed],
  [null],
  ["Balance per Nyasha's purchases ledger", ledger],
  ["Add invoice for goods received on 29 March, not yet recorded", unrecInv],
  ["Agreed balance owing to the supplier", ledger + unrecInv],
].map((r) => (r[0] === null ? null : r)), { cols: [U], checks: [["agreed", stmt - creditNote - transit, agreed], ["ledger side", ledger + unrecInv, agreed]] });

// Example 2: three-way match
const poQty = 400, price = 5, grnQty = 380;
const payable = chk(grnQty * price, 1900);
const invoiceAmt = poQty * price;
const t2 = table(["Document", "Prepared by", "Quantity", `Unit price ${U}`, `Amount ${U}`], [
  ["Purchase order", "Buyer (internal)", poQty, "5.00", poQty * price],
  ["Goods received note", "Storekeeper (internal)", grnQty, "-", null],
  ["Supplier's invoice", "Supplier (external)", poQty, "5.00", invoiceAmt],
], ["l", "l", "r", "r", "r"]);

// Example 3: inventory record against count
const rec = 1250, counted = 1190, unitCost = 3.2;
const diff = rec - counted;
const unrecSales = 35, lost = diff - unrecSales;
chk(lost, 25);
const t3 = table(["", "Litres", `Value at ${U}3.20`], [
  ["Quantity per stores record", rec, rec * unitCost],
  ["Quantity counted", counted, counted * unitCost],
  ["Difference to explain", diff, diff * unitCost],
  ["Explained: sales issued but not yet recorded", unrecSales, unrecSales * unitCost],
  ["Unexplained: written off as inventory loss", lost, lost * unitCost],
]).replace(/US\$3\.20/, "US\\$3.20");

const body = t`
## Introduction

Nyasha's hardware shop in Mutare buys from Zambezi Hardware every week. At the end of March the supplier sends a statement showing a balance of US\$11,730, but Nyasha's purchases ledger says she owes only US\$7,240. Neither side is necessarily wrong, but the difference must be explained before anyone pays. Reconciling an account with an outside record, and checking the documents behind the entries, are the main ways that a business finds errors, prevents fraud and builds trust in its figures.

This lesson is for Cambridge Paper 1 and Paper 2 candidates. You should already know the books of prime entry and the purchases ledger.

:::keyfact{title="ZIMSEC and Cambridge terms"}
**Cambridge only (AS Level).** ZIMSEC does not list this topic, although its bank reconciliation and control accounts lessons use the same ideas. Cambridge uses **books of prime entry**, **trade payables** and **trade receivables**; documents include the **goods received note (GRN)** and the **credit note**.
:::

## Key definitions

:::definition{term="Reconciliation"}
Comparing two sets of records of the same thing, such as the business's ledger account and a statement from the other party, and explaining every difference.
:::

:::definition{term="Verification"}
Checking an entry or balance against evidence to confirm that it is complete, correct and properly authorised.
:::

:::definition{term="Internal document"}
A document created inside the business, for example a purchase order, a goods received note or a stores record.
:::

:::definition{term="External document"}
A document received from or sent to someone outside the business, for example a supplier's invoice, a supplier's statement, a delivery note or a bank statement.
:::

## The documents and what each one proves

| Document | Internal or external | What it helps to verify |
| --- | --- | --- |
| Purchase order | Internal | The goods were ordered, at an agreed price and quantity |
| Delivery note | External (from the supplier) | What the supplier says it delivered |
| Goods received note (GRN) | Internal | What the business actually received and accepted |
| Invoice | External | The amount charged by the supplier |
| Credit note | External or internal | A reduction in the amount owed, for returns or errors |
| Supplier's statement | External | The balance the supplier says is owed, for the purchases ledger |
| Bank statement | External | Cash book entries and bank balance |
| Inventory (stores) record | Internal | Quantities held, compared with a physical count |

## Procedures

1. **Three-way matching.** Before an invoice is paid, the purchase order, the GRN and the invoice are compared. Payment is made only for goods that were ordered and received.
2. **Supplier statement reconciliation.** The balance on the supplier's statement is compared with the purchases ledger account. Differences are explained (invoices or credit notes in transit, payments in transit, errors).
3. **Customer statements.** Statements are sent to credit customers; customers who disagree with the balance report differences.
4. **Inventory checking.** The inventory record is compared with a physical count at intervals.
5. **Bank reconciliation.** The cash book is compared with the bank statement (see the lesson on the updated cash book and bank reconciliation).

:::worked-solution[Example 1: reconciling a supplier's statement]
The supplier's statement at 31 March 2026 shows US\$11,730. Nyasha's ledger account is:

${supp}

1. Ledger balance owing: 7,240.
2. The supplier's statement includes an invoice for goods received on 29 March (2,150) that Nyasha has not yet recorded. Her ledger balance should be 7,240 + 2,150 = 9,390.
3. The supplier has not yet recorded Nyasha's credit note (780) or her cheque of 30 March (1,560). The statement balance therefore needs 780 + 1,560 deducting to be comparable: 11,730 − 780 − 1,560 = 9,390.

${rec1}

Both routes give 9,390. Nyasha enters the invoice for 2,150 in her purchases journal and ledger (debit purchases, credit Zambezi Hardware).
:::

:::worked-solution[Example 2: three-way matching]
Farai's shop in Gweru ordered 400 sacks of maize meal at US\$5 each. The supplier delivered 400 sacks but the storekeeper recorded only 380 as accepted because 20 were damaged. The invoice is for 400 sacks.

${t2}

1. Compare: the order and invoice agree (400 at 5 = 2,000), but the GRN shows only 380 accepted.
2. Amount that should be paid: 380 × 5 = 1,900.
3. The invoice overcharges by 2,000 − 1,900 = 100. Farai should ask the supplier for a credit note for 100 before paying.
:::

:::worked-solution[Example 3: inventory record against a physical count]
Chipo's shop in Masvingo has a stores record of 1,250 litres of cooking oil, which cost US\$3.20 a litre. A count finds 1,190 litres.

${t3}

1. Difference: 1,250 − 1,190 = 60 litres.
2. Investigation shows that 35 litres were sold but the issue was not recorded; the record is corrected.
3. The remaining 25 litres cannot be explained. They are written off: 25 × 3.20 = 80 is charged as an expense, and the record is corrected to 1,190.
:::

## Benefits and limitations

**Benefits**

- Errors and omissions are found and corrected, so the ledger and the financial statements are more reliable.
- Fraud and theft are discouraged and may be detected.
- External documents give independent evidence, which is stronger than the business's own records.
- Disputes with suppliers and customers are settled with evidence.

**Limitations**

- Errors can persist if both the business and the other party make the same mistake, or if the document itself is wrong.
- Reliance on third parties: the supplier's statement may be late or incorrect.
- Timing differences mean that records will differ at any date; not every difference is an error.
- Checking costs time and money, and a small business may have few staff to separate the duties.
- Collusion between employees, or forged documents, can defeat the checks.

## Who checks

Documents are normally checked by someone other than the person who prepared them. The purchases clerk, an accounts supervisor and the storekeeper each have a part. Internal auditors review procedures during the year, and external auditors check the financial statements to give an opinion. Separation of duties is the main protection.

## Common mistakes

:::mistake{title="Treating every difference as an error"}
Invoices, credit notes and payments in transit are timing differences. The ledger may still be correct.
:::

:::mistake{title="Paying from the invoice alone"}
The invoice shows what the supplier charges. Compare it with the order and the GRN before paying.
:::

:::mistake{title="Adjusting the supplier's statement for items in the ledger"}
Items the business has not recorded are added to the ledger; items the supplier has not recorded are adjusted on the statement.
:::

:::mistake{title="Saying verification proves that everything is correct"}
It reduces the risk of error. The limitations must be stated in answers on evaluation.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks for the document that verifies a transaction or the purpose of a procedure. Paper 2 asks you to **prepare** a reconciliation, **explain** differences and **evaluate** the benefits and limitations. Show each reconciling item with its sign and an agreed total from both sides.
:::

:::exam-tip
For **evaluate** answers, give a benefit and a limitation of the procedure and reach a conclusion linked to the business in the stem (for example, a small shop with few staff cannot separate duties).
:::

## Summary

:::summary
- Reconciliation compares the ledger with an outside record; verification checks entries against documents.
- Internal documents are created by the business (order, GRN, stores record); external documents come from outside (invoice, statement).
- Three-way matching compares the purchase order, GRN and invoice before payment.
- A supplier statement reconciliation explains differences from invoices, credit notes and payments in transit and errors.
- Benefits: errors and fraud found, independent evidence. Limitations: persistent errors, third-party reliance, timing, cost.
- Different people should prepare and check documents.
:::
`;

writeLesson("verification/principles", {
  key: "verification.principles",
  title: "Reconciliation and verification of ledger accounts",
  summary: "Why ledger accounts are reconciled and verified with internal and external documents, the main procedures, and their benefits and limitations.",
  concepts: ["aacc.verification.principles"],
  estimatedMinutes: 40,
}, body);
