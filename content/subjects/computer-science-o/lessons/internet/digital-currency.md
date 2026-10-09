---
{
  "key": "internet.digital-currency",
  "title": "Digital currency and blockchain",
  "summary": "What a digital currency is and how it is used, and how a blockchain, a time-stamped digital ledger of records that cannot be altered, tracks digital currency transactions.",
  "concepts": ["comp.internet.digital-currency"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

In Zimbabwe, many people pay for bread, airtime and bus fares without touching notes or coins: they use mobile money, bank cards and online transfers. The money moves as data between accounts. A **digital currency** goes one step further: it exists **only** in electronic form, with no notes or coins at all.

Some digital currencies are run by a single organisation, such as a central bank. Others, called **cryptocurrencies**, have no central authority; instead, every transaction is recorded in a shared ledger called a **blockchain**. Cambridge asks you to explain what a digital currency is, how it is used, and how a blockchain keeps track of transactions in its basic form.

## Key definitions

:::definition{term="Digital currency"}
A currency that exists only electronically. It has no physical notes or coins, and is stored and transferred as data.
:::

:::definition{term="Cryptocurrency"}
A digital currency that uses encryption to secure its transactions and that is not controlled by a central bank or government; its transactions are usually recorded in a blockchain.
:::

:::definition{term="Blockchain"}
In its basic form, a digital ledger: a time-stamped series of records (blocks) that cannot be altered, shared across many computers and used to track transactions.
:::

:::definition{term="Ledger"}
A record of transactions: who paid whom, how much and when.
:::

:::definition{term="Node"}
One of the many computers in a blockchain network that holds a copy of the blockchain and helps to check new transactions.
:::

## How digital currencies are used

- **Paying for goods and services online** or in shops that accept them, by transferring an amount from the buyer's digital wallet to the seller's.
- **Sending money** to another person, including across borders, without visiting a bank.
- **Storing value** in a digital wallet: software, or a device, that holds the keys needed to spend the currency.

Benefits can include fast transfers at any time of day and, for cryptocurrencies, no central authority that can freeze accounts. Drawbacks include values that can rise and fall sharply, the risk of losing everything if the wallet's keys are lost or stolen, use in crime because users can be hard to identify, and the large amount of electricity some blockchains consume.

Mobile-money balances are held and transferred electronically, so they are used much like a digital currency, but they represent ordinary money (such as US dollars) held by the provider.

## How a blockchain works (basic form)

1. A user requests a transaction, for example "Rudo pays Farai 5 units".
2. The transaction is sent to the network of **nodes**.
3. The nodes check (verify) that the transaction is valid, for example that Rudo has 5 units to spend.
4. Verified transactions are grouped into a **block**. The block is **time-stamped** and contains a code calculated from its contents (its **hash**) and the hash of the **previous** block.
5. The new block is added to the end of the chain, and **every node updates its copy**.
6. The transaction is complete and can never be changed or removed.

Because each block contains the previous block's hash, the blocks are **linked**. Changing any old record would change that block's hash, which would no longer match the value stored in the next block, so the change is immediately detected. An attacker would also have to change the copies held on most of the thousands of nodes at once.

:::worked-solution[Why an altered block is detected]
Imagine a very simple "fingerprint" (hash) for each block, calculated from the block's text **and** the previous block's fingerprint. (Real blockchains use much stronger hash functions; this toy one gives a number from 0 to 999.)

| Block | Transaction | Previous fingerprint | This block's fingerprint |
|:-:|:--|:-:|:-:|
| 1 | Rudo pays Farai 5 | 000 | 388 |
| 2 | Farai pays Sipho 2 | 388 | 754 |
| 3 | Sipho pays Chipo 1 | 754 | 680 |

1. Someone changes block 1 to "Rudo pays Farai 9".
2. Block 1's fingerprint is recalculated: it becomes 472, not 388.
3. Block 2 still stores 388 as its "previous fingerprint", so the link from block 2 to block 1 is broken.
4. Even if the attacker also rewrote block 2, its fingerprint would change too (to 735), breaking the link to block 3, and so on along the whole chain.
5. Every other node still holds the original chain, so the altered copy is rejected.
:::

:::example
**A payment recorded on a blockchain.** Tatenda in Gweru sends some cryptocurrency to his sister in Johannesburg. His wallet broadcasts the transaction to the network. Nodes check that his wallet holds enough to cover it, then the transaction is included in the next block, which is time-stamped, linked to the previous block and added to every node's copy. His sister's wallet now shows the amount, and anyone can confirm the transfer happened, but no one can later change or delete it.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Digital currency and blockchain are in the Cambridge 0478 syllabus (topic 5.2) only. Learn them in their basic form: the syllabus does not require detailed knowledge of how hashes or mining work.
:::

## Common mistakes

:::mistake{title="Saying a digital currency is just money in a bank account"}
A digital currency exists **only** electronically. Ordinary bank balances represent money that also exists as notes and coins.
:::

:::mistake{title="Saying blockchain records are kept on one central server"}
The ledger is shared: every node holds a copy, which is what makes tampering easy to detect.
:::

:::mistake{title="Saying blockchain transactions can be edited later"}
Records cannot be altered. A mistake can only be corrected by a new transaction added to the chain.
:::

## Exam tips

:::exam-tip
For "**explain** how blockchain is used to track digital currency transactions", include: each transaction is recorded in a time-stamped block; blocks are linked in a chain; copies are held on many computers; records cannot be altered.
:::

:::exam-tip
For "**what is meant by** a digital currency", the key phrase is that it **only exists electronically**; then add how it is used (transfers and payments as data).
:::

## Summary

:::summary
- A digital currency exists only electronically and is transferred as data.
- It is used for online and in-person payments, transfers and storing value in a digital wallet.
- A blockchain is a digital ledger: a time-stamped series of records that cannot be altered.
- Each block holds transactions, a timestamp, its own hash and the previous block's hash, linking the chain.
- Copies on many nodes make any change detectable, so the transaction history is trusted.
:::
