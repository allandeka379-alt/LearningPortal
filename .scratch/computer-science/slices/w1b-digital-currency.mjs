// Slice w1b: digital currency and blockchain (comp.internet.digital-currency, Cambridge only).
import { concept, P } from "../lib.mjs";

const toRewrite = (chainLength, altered) => chainLength - altered + 1; // the altered block and every later block

concept("comp.internet.digital-currency", { file: "internet/digital-currency", keyPrefix: "internet.digital-currency" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **digital currency**?",
    options: [["A currency that exists only electronically", "Correct."], ["Notes and coins kept in a bank vault", "Those are physical money."], ["A bank card used to pay in shops", "A card is a way of paying, not a currency."], ["Money printed with a bar code", "Digital currency has no physical form."]],
    answer: "A",
    explanation: "A digital currency has no notes or coins: it is stored and transferred only as data.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In its basic form, a blockchain is best described as…",
    options: [["an unalterable, time-stamped ledger", "Correct."], ["a central bank's private customer database", "Blockchains are shared across many computers."], ["a cable network that links banks together", "A blockchain is a record, not hardware."], ["a phone app for buying airtime", "That is a mobile-money or shop app."]],
    answer: "A",
    explanation: "A blockchain is a digital ledger: a time-stamped series of records that cannot be altered.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does each block in a blockchain store the hash of the previous block?",
    options: [["To link the blocks, so any change to an earlier block is detected", "Correct: altering a block changes its hash and breaks the link."], ["To encrypt the transactions so that nobody can read them", "Linking hashes are not used to hide data."], ["To record the time at which the block was created", "That is the timestamp."], ["To store the users' passwords safely", "Blocks do not hold passwords."]],
    answer: "A",
    explanation: "Each block carries the previous block's hash. Changing an old block changes its hash, so the next block's stored value no longer matches.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where are copies of a blockchain kept?",
    options: [["On many computers (nodes) in the network", "Correct: the ledger is shared."], ["On a single central server", "There is no single central copy."], ["Only on the buyer's phone", "Every node holds a copy."], ["On the DNS servers of the internet", "DNS servers do not hold blockchains."]],
    answer: "A",
    explanation: "Every node holds its own copy of the blockchain, so no single copy can be secretly changed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Chipo sent cryptocurrency to the wrong wallet by mistake. Why can the transaction not simply be deleted from the blockchain?",
    options: [["Blockchain records cannot be altered once added", "Correct: a correction must be a new transaction."], ["The transaction is encrypted with her private key", "Encryption does not prevent deletion; the design of the ledger does."], ["Only a central bank can delete transactions", "Cryptocurrencies have no central bank."], ["Deleted transactions are restored from bookmarks", "Bookmarks are a browser feature."]],
    answer: "A",
    hints: ["Think about what makes a blockchain trustworthy."],
    explanation: "Records in a blockchain cannot be changed or removed; the receiver would have to send the amount back in a new transaction.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a **drawback** of using a cryptocurrency?",
    options: [["Its value can rise and fall sharply", "Correct: values can be very volatile."], ["Transfers can be made at any time of day", "That is a benefit."], ["Every transaction is recorded permanently", "That is the point of the ledger, usually seen as a benefit."], ["No physical notes need to be printed", "That is a feature, not a drawback."]],
    answer: "A",
    hints: ["Three options are features or benefits."],
    explanation: "Drawbacks include volatile value, loss if wallet keys are lost or stolen, use in crime and, for some, high energy use.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Each block in a blockchain is time-stamped.",
    answer: true,
    explanation: "True. The blockchain is a time-stamped series of records.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A cryptocurrency is controlled by a country's central bank.",
    answer: false,
    explanation: "False. Cryptocurrencies are not controlled by a central bank; their transactions are verified by the network of nodes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [["Digital currency", "Money that exists only electronically"], ["Blockchain", "A time-stamped ledger of records that cannot be altered"], ["Node", "A computer that holds a copy of the blockchain"], ["Digital wallet", "Software or a device that holds the keys to spend digital currency"]],
    explanation: "Know these four terms for topic 5.2.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of how a transaction is recorded.",
    template: "The transaction is checked by the {{blank:a}} in the network. It is then placed in a {{blank:b}}, which is time-stamped and linked to the previous one. Every node updates its {{blank:c}} of the blockchain.",
    blanks: [
      { id: "a", accepted: ["nodes"], choices: ["nodes", "routers", "browsers", "banks"] },
      { id: "b", accepted: ["block"], choices: ["block", "packet", "cookie", "file"] },
      { id: "c", accepted: ["copy"], choices: ["copy", "password", "cookie", "address"] },
    ],
    explanation: "Nodes verify; transactions go into a block; every node updates its copy.",
  });
  b.calc({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A blockchain has 9 blocks, numbered 1 to 9. An attacker changes a transaction in block 6. Each block stores the hash of the previous block. Including block 6, how many blocks would the attacker have to rewrite to make the chain consistent again?",
    value: toRewrite(9, 6),
    wrong: [1],
    hints: ["Changing block 6 changes its hash. Which block stores that hash?", "That block's hash then changes too…"],
    explanation: `Block 6 and every block after it (6, 7, 8, 9): ${toRewrite(9, 6)} blocks, on most of the nodes at once, which is practically impossible.`,
    workedSolution: `1. Changing block 6 changes its hash, so block 7's stored "previous hash" no longer matches.\n2. Rewriting block 7 changes its hash, breaking block 8, and so on to block 9.\n3. Blocks 6 to 9: $9 - 6 + 1 = ${toRewrite(9, 6)}$.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the shared digital ledger used to record cryptocurrency transactions.",
    accepted: ["blockchain", "a blockchain", "block chain", "the blockchain"],
    wrong: ["database"],
    explanation: "Cryptocurrency transactions are recorded in a blockchain.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What is missing compared with ordinary money? How is it moved?"],
    stem: "Explain what is meant by a digital currency and how it is used. [2]",
    points: ["It exists only electronically (no physical notes or coins)", "It is used by transferring amounts as data between digital accounts/wallets, e.g. to pay for goods or send money"],
    modelAnswer: "A digital currency only exists in electronic form. It is used by transferring amounts as data from one digital wallet or account to another to pay for goods or send money.",
    explanation: "Only electronic; transferred as data.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Mention blocks, timestamps, links and copies."],
    stem: "Explain how a blockchain is used to track digital currency transactions. [4]",
    points: ["Each new transaction is verified by the nodes in the network", "Verified transactions are stored in a block that is time-stamped", "Each block holds the previous block's hash, linking the blocks into a chain (so changes are detected)", "Every node holds a copy of the chain and the records cannot be altered"],
    modelAnswer: "When a transaction is made, nodes in the network verify it. It is placed in a time-stamped block that also stores the hash of the previous block, so the blocks form a chain. The new block is added to every node's copy. Because the blocks are linked and copies are everywhere, records cannot be altered, so the full history of transactions can be traced.",
    explanation: "Verify, block, timestamp, link, copies, unalterable.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["What makes changing an old record detectable?", "Benefits and drawbacks for a small business."],
    stem: "A craft co-operative in Masvingo is considering accepting a cryptocurrency for online sales to overseas customers.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which statement about the cryptocurrency is correct?", options: [["It exists only in electronic form", "Correct."], ["It is issued as banknotes", "It has no physical form."], ["It is controlled by one bank", "Cryptocurrencies have no central authority."], ["Its transactions can be edited later", "Records cannot be altered."]], answer: "A", explanation: "Digital currency exists only electronically." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why a customer could not later change the record of a payment to the co-operative.", points: ["The payment is stored in a time-stamped block in the blockchain", "The next block stores this block's hash, so changing it would break the chain / be detected", "Copies are held on many nodes, which would reject an altered copy"], modelAnswer: "The payment is in a time-stamped block. Changing it would change its hash, which no longer matches the value stored in the next block, and the many other copies held by nodes would show the change, so it would be rejected." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **one** benefit and **one** drawback for the co-operative.", points: ["Benefit: fast international payments at any time / no need for the customer to have a local bank account", "Drawback: value can fall sharply / keys can be lost or stolen / not all customers use it"], modelAnswer: "Overseas customers can pay quickly at any time, but the value of the money received could fall sharply before it is spent." }),
    ],
    explanation: "Digital currency exists only electronically; blockchain records are linked, time-stamped and copied, so cannot be altered.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happens to a new transaction **before** it is added to a block in the blockchain?",
    options: [["It is verified by nodes in the network", "Correct: nodes check it is valid, e.g. that the payer has enough to spend."], ["It is printed and signed at a bank", "There is no paper record."], ["It is sent to a DNS server for approval", "DNS servers have no role in blockchains."], ["It is deleted from the payer's wallet", "Only a verified, recorded transaction changes balances."]],
    answer: "A",
    explanation: "Nodes verify a transaction (for example, that the payer has enough to spend) before it is placed in a time-stamped block.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true,
    hints: ["Put the steps in the order a payment goes through."],
    stem: "Sipho pays a supplier in digital currency. The payment is recorded using a blockchain.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Choose the correct words.", template: "The payment is checked by {{blank:a}}. It is stored in a {{blank:b}} block. Every node adds the block to its own {{blank:c}}.", blanks: [{ id: "a", accepted: ["nodes"], choices: ["nodes", "routers", "cookies"] }, { id: "b", accepted: ["time-stamped"], choices: ["time-stamped", "encrypted-only", "temporary"] }, { id: "c", accepted: ["copy of the chain"], choices: ["copy of the chain", "browser history", "cookie file"] }], explanation: "Verified by nodes, stored in a time-stamped block, added to every copy." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the supplier can trust that the record of the payment will not be changed.", points: ["The records in a blockchain cannot be altered (any change breaks the hash links)", "Many nodes hold identical copies, so an altered copy would be rejected"], modelAnswer: "Changing the record would change the block's hash and break the chain, and the many other copies would show it, so the record is permanent." }),
    ],
    explanation: "Nodes verify; time-stamped blocks; shared copies; records cannot be altered.",
  });

  b.card("DEFINITION", "**Digital currency**", "A currency that exists only electronically, stored and transferred as data.");
  b.card("DEFINITION", "**Blockchain** (basic form)", "A digital ledger: a time-stamped series of records that cannot be altered.");
  b.card("DEFINITION", "**Cryptocurrency**", "A digital currency secured by encryption, not controlled by a central bank, recorded in a blockchain.");
  b.card("DEFINITION", "**Node**", "A computer in the network that holds a copy of the blockchain and helps verify transactions.");
  b.card("CONCEPT", "What does each block contain?", "Transactions, a timestamp, its own hash and the hash of the previous block.");
  b.card("CONCEPT", "Why can't a blockchain record be altered unnoticed?", "Its hash would change and no longer match the next block, and other nodes hold unchanged copies.");
  b.card("FACT", "Uses of digital currency", "Online and in-person payments, sending money (even abroad), storing value in a digital wallet.");
  b.card("FACT", "Drawbacks of cryptocurrencies", "Volatile value; lost or stolen keys mean lost money; used in crime; some use a lot of electricity.");
});
