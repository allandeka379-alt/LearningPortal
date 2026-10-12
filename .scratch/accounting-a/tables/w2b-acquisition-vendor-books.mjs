// Lesson: acquisition.vendor-books
import { money, fmt, chk, r2, sum } from "../lib.mjs";
import { writeLesson, U, vendorBooks } from "./w2b-lib.mjs";

const e1 = vendorBooks({
  date: "31 Mar 2026", buyer: "Zambezi Bakeries Ltd",
  partners: [{ name: "Nyasha Moyo", share: 1, capital: 90500 }],
  assets: [{ name: "Premises", book: 58000 }, { name: "Equipment", book: 21500 }, { name: "Inventory", book: 9200 }, { name: "Trade receivables", book: 6300 }],
  liabilities: [{ name: "Trade payables", book: 7800 }], bank0: 3300,
  consideration: { cash: 30000, shares: { n: 40000, price: 1.25 }, notes: 20000 },
});
chk(e1.netBook, 87200); chk(e1.consid, 100000); chk(e1.result, 12800); chk(e1.cashPay[0], 33300);

const e2 = vendorBooks({
  date: "30 Jun 2026", buyer: "Gweru Foods Ltd",
  partners: [{ name: "Rudo", share: 3, capital: 70000 }, { name: "Farai", share: 2, capital: 42000 }],
  assets: [{ name: "Premises", book: 72000 }, { name: "Equipment", book: 28000 }, { name: "Inventory", book: 14000 }, { name: "Trade receivables", book: 11000 }],
  liabilities: [{ name: "Trade payables", book: 15000 }, { name: "Accrued expenses", book: 2000 }], bank0: 4000,
  consideration: { cash: 35000, shares: { n: 50000, price: 1.4 }, notes: 25000 },
});
chk(e2.netBook, 108000); chk(e2.consid, 130000); chk(e2.result, 22000); chk(e2.cashPay[0], 26200); chk(e2.cashPay[1], 12800);

const body = `
## Introduction

When a company buys a business, there are two sets of books to close. The buyer records what it has acquired (the next lesson). The **seller**, called the **vendor**, must close the old business: its assets and liabilities pass to the buyer, and in return the vendor receives cash, shares or loan notes. Nyasha Moyo, who has run a bakery in Gweru for fifteen years, sells it to a limited company and wants to know how much profit she made on the sale and what she finally holds.

Closing the books of a business taken over is a ZIMSEC Form 5 topic and, for Cambridge, A Level only (Paper 3). You should know the purchase consideration (previous lesson) and how a realisation account works from dissolution.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **realisation account**, **debtors**, **creditors**, **purchasing company**. Cambridge: **realisation account**, **trade receivables**, **trade payables**, **purchasing company**. The method is identical. The vendor may be a sole trader or a partnership.
:::

## Key definitions

:::definition{term="Vendor"}
The owner or owners of the business being sold. For a partnership the vendors are the partners.
:::

:::definition{term="Realisation account (on a takeover)"}
The account in which the vendor collects the assets and liabilities transferred to the buyer and sets against them the purchase consideration. Its balance is the profit or loss on the sale of the business.
:::

:::definition{term="Investment in the purchasing company"}
The shares and loan notes of the buyer that the vendor receives as part of the price. They are recorded in the vendor's books at their value on the date of the sale.
:::

## The method

1. **Transfer the assets** that the buyer takes over to the realisation account at their book values (credit each asset account, debit realisation). The bank balance is not transferred if the buyer does not take it.
2. **Transfer the liabilities** that the buyer takes over (debit each liability, credit realisation).
3. **Record the purchase consideration:** debit the **purchasing company's account** and credit realisation with the total price.
4. **Record what is received:** debit bank with any cash, debit "investment in the buyer's shares" and "loan notes" with their values, and credit the purchasing company's account.
5. **Find the profit or loss:** the balance on realisation is profit when the price is above the book value of the net assets taken over. It is credited to the capital account of a sole trader or shared among partners in the profit-sharing ratio.
6. **Close the capital accounts:** the owner's capital (plus profit) is settled by transferring the shares and loan notes to the owner, and paying the balance in cash from the bank.

:::keyfact
Profit on takeover = purchase consideration − book value of the net assets taken over. The vendor's bank account, when it stays with the vendor, is used to pay out the final cash.
:::

:::worked-solution[Example 1: a sole trader sells a bakery]
Nyasha Moyo sells her bakery to Zambezi Bakeries Ltd on 31 March 2026. The buyer takes over premises (${money(58000)}), equipment (${money(21500)}), inventory (${money(9200)}) and trade receivables (${money(6300)}) at book value, and the trade payables of ${money(7800)}. The bank balance of ${money(3300)} stays with Nyasha. Her capital is ${money(90500)}. The purchase consideration is ${money(30000)} in cash, 40,000 ordinary shares of US\\$1 valued at US\\$1.25 and ${money(20000)} of loan notes.

1. Net assets taken over at book value: 95,000 − 7,800 = 87,200.
2. Consideration: 30,000 + 40,000 × 1.25 + 20,000 = 100,000.
3. Profit on sale: 100,000 − 87,200 = 12,800.
4. Closing capital: 90,500 + 12,800 = 103,300. She receives shares 50,000, loan notes 20,000 and cash 33,300 (the 30,000 from the buyer and her own bank 3,300).

${e1.realMd}

${e1.buyerMd}

${e1.capMd}

${e1.bankMd}
:::

## A partnership as vendor

When the vendor is a partnership, the profit on realisation is shared in the **profit-sharing ratio** and credited to the partners' capital accounts. The shares and loan notes are transferred to the partners in the way the agreement states; in this lesson they are shared in the profit-sharing ratio and the cash paid to each partner is the balancing amount, so that each partner's capital account closes at nil.

:::worked-solution[Example 2: a partnership sells to a company]
Rudo and Farai share profits 3 : 2. On 30 June 2026 they sell their firm to Gweru Foods Ltd. Capital balances are Rudo ${money(70000)} and Farai ${money(42000)}. The buyer takes premises (${money(72000)}), equipment (${money(28000)}), inventory (${money(14000)}) and trade receivables (${money(11000)}), and trade payables (${money(15000)}) and accrued expenses (${money(2000)}). The bank balance of ${money(4000)} stays with the partners. The consideration is ${money(35000)} in cash, 50,000 ordinary shares of US\\$1 valued at US\\$1.40 and ${money(25000)} of loan notes.

1. Net assets at book value: 125,000 − 17,000 = 108,000.
2. Consideration: 35,000 + 70,000 + 25,000 = 130,000. Profit 130,000 − 108,000 = 22,000, shared 3 : 2: Rudo 13,200; Farai 8,800.
3. Closing capitals: Rudo 83,200; Farai 50,800.
4. Shares (70,000) and loan notes (25,000) are shared 3 : 2. Cash to Rudo: 83,200 − 42,000 − 15,000 = 26,200; to Farai: 50,800 − 28,000 − 10,000 = 12,800.

${e2.realMd}

${e2.buyerMd}

${e2.capMd}

${e2.bankMd}

The cash paid out (39,000) equals the partners' own bank balance of 4,000 plus the 35,000 cash from the buyer.
:::

## Where the shares and loan notes go

The vendor now holds an investment in the purchasing company. In the vendor's books the shares and loan notes are assets until they are handed to the owners. After the capital accounts are closed, nothing remains: the old business no longer exists in its own books.

## Common mistakes

:::mistake{title="Transferring the bank balance when the buyer does not take it"}
Only assets and liabilities that pass to the buyer are transferred. The bank balance that stays is used to pay the owners their cash.
:::

:::mistake{title="Valuing the shares at par"}
The price paid in shares is the number of shares multiplied by the agreed value per share, which is above par when the shares are issued at a premium.
:::

:::mistake{title="Sharing a partnership profit by capital"}
The profit on realisation is shared in the profit-sharing ratio unless the question says otherwise.
:::

:::mistake{title="Putting the purchase consideration on the debit side of realisation"}
The price received is a credit in the realisation account, set against the debit of the assets transferred.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic, usually alongside the purchaser's journal entries. With **prepare**, show realisation, the purchaser's account, the capital accounts and bank, and finish with the bank at nil. With **calculate**, show the net book value, the consideration and their difference. With **explain**, say why the profit is not trading profit: it comes from selling the business as a whole.
:::

## Summary

:::summary
- The vendor transfers the assets and liabilities taken over to a realisation account at book value.
- The purchase consideration is credited to realisation and debited to the purchasing company's account.
- Cash, shares and loan notes received are debited to bank and to investment accounts and credited to the purchasing company.
- The balance on realisation is the profit or loss, credited to a sole trader's capital or shared in the profit ratio.
- The capital accounts are closed by transferring the shares and loan notes and paying the remaining cash.
- The vendor's bank account ends at nil.
:::
`;

writeLesson("acquisition/vendor-books", {
  key: "acquisition.vendor-books",
  title: "Closing the books of a business taken over",
  summary: "Close the seller's books when a business is taken over by a company: realisation account, the purchasing company's account, the capital accounts and the final payment.",
  concepts: ["aacc.acquisition.vendor-books"],
  estimatedMinutes: 45,
}, body);
