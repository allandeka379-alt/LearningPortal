// W4a: trends in banking (COM Form 4). Services are described generically: no operator or brand names.
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.finance.banking-trends", { file: "finance/banking-trends", keyPrefix: "finance.banking-trends" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is telebanking?",
    options: [
      ["Banking transactions carried out by telephone", "Correct: by call centre or automated phone menu."],
      ["Banking through a shop acting as an agent", "That is agency banking."],
      ["Watching a bank's adverts on television", "Advertising is not banking."],
      ["Sending money across borders through an agent", "That describes money transfer agents."],
    ],
    answer: "A",
    explanation: "Telebanking uses the telephone to reach the bank.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who usually provides mobile money wallets?",
    options: [
      ["Mobile network operators", "Correct: the wallet is linked to a phone number."],
      ["The central bank", "The central bank regulates but does not run wallets."],
      ["The tax authority", "It collects taxes."],
      ["Building societies", "They provide mortgages and savings."],
    ],
    answer: "A",
    explanation: "Mobile money is offered by mobile network operators, often in partnership with banks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the key difference between mobile money and mobile banking?",
    options: [
      ["Mobile money needs no bank account", "Correct: it is an electronic wallet on the phone number."],
      ["Mobile banking needs no mobile phone", "Mobile banking uses a phone by definition."],
      ["Mobile money cannot be used to pay bills", "Bills can be paid with mobile money."],
      ["Mobile banking works only inside a branch", "It is used away from branches."],
    ],
    answer: "A",
    explanation: "Mobile banking reaches a bank account; mobile money is a separate wallet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank lets customers deposit and withdraw cash at a rural supermarket, which earns commission. What is this called?",
    options: [
      ["Agency banking", "Correct: the supermarket acts as the bank's agent."],
      ["Telebanking", "Telebanking is by telephone."],
      ["Internet banking", "Internet banking is through a website or app."],
      ["Merchant banking", "Merchant banks serve large companies."],
    ],
    answer: "A",
    explanation: "Agents extend bank services without the cost of a branch.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do USSD short-code menus help customers in rural areas?",
    options: [
      ["They work on basic phones without internet", "Correct: no smartphone or data bundle is needed."],
      ["They remove all transaction charges", "Charges may still apply."],
      ["They let customers withdraw cash without an agent", "Cash still has to come from an agent or ATM."],
      ["They are run by the tax authority", "They are run by banks and operators."],
    ],
    answer: "A",
    explanation: "USSD menus reach users with simple phones and weak networks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a likely effect of the growth of mobile and internet banking **on banks**?",
    options: [
      ["Fewer branches and tellers are needed", "Correct: transactions move to phones and the internet."],
      ["Banks no longer need to invest in technology", "They must invest heavily in systems and security."],
      ["Bank fraud disappears completely", "New kinds of fraud appear online."],
      ["Banks lose the right to charge fees", "Banks earn fees on electronic transactions."],
    ],
    answer: "A",
    explanation: "Digital channels cut branch costs but need investment and security.",
    hints: ["What happens to queues in banking halls?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "How does mobile money promote financial inclusion?",
    options: [
      ["People without bank accounts can save and make payments", "Correct: only a phone and an identity document are needed."],
      ["It makes bank loans available to everyone automatically", "Loans still need assessment."],
      ["It removes the need for any identity documents", "Registration needs identity."],
      ["It replaces all cash immediately", "Cash in and out through agents continues."],
    ],
    answer: "A",
    explanation: "Mobile money reaches people far from banks, giving them payment and savings services.",
    hints: ["Who was excluded from banking before?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which precaution best protects a mobile money user from fraud?",
    options: [
      ["Never sharing the PIN with anyone", "Correct: the PIN protects the wallet."],
      ["Keeping the phone switched off", "The service could not then be used."],
      ["Sending money only at night", "Timing does not protect against fraud."],
      ["Using the same PIN as the bank card", "Repeating PINs increases risk."],
    ],
    answer: "A",
    explanation: "Fraudsters often trick users into revealing PINs or one-time passwords.",
  });
  const amt = 250, feeR = 3;
  const fee = r2((amt * feeR) / 100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2(amt + fee),
    stem: `Rudo sends ${money(amt)} to her mother through a money transfer agent. Assume the agent charges a fee of ${feeR}% of the amount sent. How much does Rudo pay in total?`,
    wrong: [fee, amt],
    explanation: `Fee = ${feeR}% × ${fmt(amt)} = ${money(fee)}; total = ${money(r2(amt + fee))}.`,
  });
  const n = 18, flat = 0.6, bank = 9;
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: r2(n * flat - bank), calculator: true,
    stem: `A shop makes ${n} small mobile money payments to suppliers in a month. Assume each costs a flat fee of ${money(flat)}. Its bank would charge ${money(bank)} a month for unlimited internet transfers. How much more does the shop pay in mobile money fees than it would pay the bank?`,
    wrong: [r2(n * flat), r2(n * flat + bank)],
    explanation: `Mobile fees = ${n} × ${fmt(flat)} = ${money(r2(n * flat))}; difference = ${fmt(r2(n * flat))} − ${fmt(bank)} = ${money(r2(n * flat - bank))}.`,
    workedSolution: `1. Mobile money fees = ${n} × ${fmt(flat)} = ${fmt(r2(n * flat))}.\n2. Extra cost = ${fmt(r2(n * flat))} − ${fmt(bank)} = ${money(r2(n * flat - bank))}.`,
    hints: ["Multiply the number of payments by the fee."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Internet banking lets customers transfer money and pay bills without visiting a branch.",
    answer: true,
    explanation: "True. Customers log in to the bank's secure website or app.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Electronic banking has no disadvantages for customers.",
    answer: false,
    explanation: "False. Customers face charges, fraud, network failures and the need for a phone and some skills.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each banking trend with its description.",
    pairs: [
      ["Telebanking", "Using a call centre or phone menu"],
      ["Internet banking", "Using a bank's secure website or app"],
      ["Mobile money", "Electronic wallet linked to a phone number"],
      ["Agency banking", "Shops offering basic bank services for commission"],
    ],
    explanation: "Each trend uses a different channel to reach customers.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Paying cash into a mobile money wallet at an agent is called cash {{blank:a}}. Money sent home by people working in another country is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["in"], choices: ["in", "out", "back", "over"] },
      { id: "b", accepted: ["remittance"], choices: ["remittance", "dividend", "premium", "debenture"] },
    ],
    explanation: "Cash in adds money to the wallet; remittances are transfers sent home.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes giving people and small businesses access to affordable payments, savings, credit and insurance?",
    accepted: ["financial inclusion", "inclusion"],
    wrong: ["financial exclusion"],
    explanation: "Financial inclusion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages to a market trader of accepting mobile money payments.",
    points: [
      "Safety: less cash kept at the stall (1)",
      "Developed: lower risk of theft or loss (1)",
      "More sales: customers without cash can still buy / instant payment and record (1)",
      "Developed: trader does not lose sales; record of takings helps bookkeeping (1)",
    ],
    modelAnswer: "With mobile money the trader keeps less cash at the stall, so there is less risk of theft. Customers who have no cash can still pay, so sales are not lost, and every payment is recorded on the phone, which helps with records.",
    explanation: "Safety, sales and records are the main benefits.",
    hints: ["Think about cash at the stall."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways in which the growth of electronic banking may harm some people.",
    points: [
      "Job losses for bank tellers as branches close (1)",
      "Developed: fewer counter staff needed (1)",
      "Exclusion of people without phones, network or skills / fraud / charges (1)",
      "Developed, e.g. elderly rural customers find branches closed and cannot use apps (1)",
    ],
    modelAnswer: "As more customers bank by phone, banks close branches and employ fewer tellers, so jobs are lost. Elderly people or those in areas with poor networks may be left without easy access to banking once branches close.",
    explanation: "Digital banking creates winners and losers.",
    hints: ["Who worked in banking halls?", "Who cannot use a smartphone?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Thandeka runs a grocery shop at a rural growth point. A bank has invited her to become an agent, offering commission on every deposit and withdrawal. She already accepts mobile money payments. The nearest bank branch is 60 km away.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** services Thandeka could offer as a bank agent.",
        points: ["Cash deposits / withdrawals (1)", "Bill payments / account opening / balance enquiries (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how villagers would benefit from agency banking at Thandeka's shop.",
        points: ["No 60 km journey to a branch (1)", "Saves transport costs and time (1)", "Safer than keeping cash at home / access to savings (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain **one** risk to Thandeka of becoming an agent.",
        points: ["Risk, e.g. theft of extra cash / running out of cash or float / fraud (1)", "Developed: needs security or careful cash management (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend whether Thandeka should accept the bank's offer. Justify your answer.",
        points: ["Commission income (1)", "More customers come into the shop and buy groceries (1)", "Against: security risk and cash management (1)", "Justified recommendation (1)"],
      }),
    ],
    explanation: "Agency banking brings services close to villagers and earns Thandeka commission and extra trade, but she must manage cash and security.",
    hints: ["What does the bank pay her?", "Why would more people visit her shop?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Farai works in a neighbouring country and sends money home to his family in Chipinge every month.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** ways Farai could send the money.",
        points: ["Money transfer agent (1)", "Mobile money / bank transfer (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a money transfer agent works.",
        points: ["Farai pays the amount plus a fee at an outlet (1)", "Receives a reference number (1)", "Family collects the money at another outlet with the reference and identity document (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how these remittances help economic activity in Farai's home area.",
        points: ["Family spends on food, school fees and goods (1)", "Local shops' sales and incomes rise (1)", "Some money is saved or invested, e.g. in a small business (1)"],
      }),
    ],
    explanation: "Remittances are sent through agents, mobile money or banks and support spending, sales and investment at home.",
    hints: ["What does the family do with the money?"],
  });
  b.card("DEFINITION", "Telebanking", "Banking by telephone through a call centre or automated menu.");
  b.card("DEFINITION", "Internet banking", "Using a bank's secure website or app to view statements, transfer money and pay bills.");
  b.card("DEFINITION", "Mobile banking", "Reaching a bank account through a phone app or USSD short code.");
  b.card("DEFINITION", "Mobile money", "Electronic wallet linked to a phone number, run by a mobile network operator; no bank account needed.");
  b.card("DEFINITION", "Agency banking", "Shops and other outlets offering basic bank services (deposits, withdrawals) for commission.");
  b.card("DEFINITION", "Money transfer agent", "Sends money locally or across borders: sender pays amount plus fee; receiver collects with a reference.");
  b.card("CONCEPT", "Impact of banking trends", "Customers: convenience, safety, charges, fraud. Banks: lower costs, new customers, security investment. Economy: inclusion, faster trade, job losses.");
  b.card("DEFINITION", "Financial inclusion", "Access for individuals and small businesses to affordable payments, savings, credit and insurance.");
});
