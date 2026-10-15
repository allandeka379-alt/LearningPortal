// W4a: the money supply and the demand for money (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, chk, table, fmt, roundTo, pctChange } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV5 = [
  [3, 4, 5, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.money-demand-supply", { file: "money/money-demand-supply", keyPrefix: "money.money-demand-supply" }, (b) => {
  mc(b, [2, "RECALL"], "Narrow money normally consists of",
    ["notes, coins and deposits that can be withdrawn on demand", "Correct: the most liquid forms of money."],
    [["all the savings deposits and time deposits held in all banks", "These are part of broad money but are less liquid."],
     ["only the gold and foreign currency held by the central bank itself", "These are reserves, not the money supply."],
     ["the total value of all assets owned by households and firms together", "Wealth is much larger than the money supply."]],
    "Narrow money is notes and coins plus sight deposits; broad money adds less liquid deposits.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Broad money is always at least as large as narrow money because broad money",
    ["includes narrow money together with less liquid deposits", "Correct: it adds savings and time deposits to narrow money."],
    [["excludes notes and coins, which are not counted as money", "Notes and coins are counted as money."],
     ["is measured only in foreign currency terms by the central bank", "It is measured in the domestic currency."],
     ["is made up only of deposits held by foreign residents", "Residence of the holder is not the test."]],
    "Broad money = narrow money + savings and time deposits (and other liquid assets).");

  mc(b, [2, "APPLICATION"], "Which action by a central bank is most likely to increase the money supply?",
    ["Buying government securities from banks", "Correct: banks' reserves and lending capacity rise."],
    [["Selling government securities to commercial banks and the public", "This reduces banks' reserves."],
     ["Raising the reserve requirement on all bank deposits", "Banks can then lend less."],
     ["Raising the policy interest rate by a substantial amount", "This reduces borrowing and tends to reduce the money supply."]],
    "Open-market purchases raise banks' reserves and the money supply.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A government finances a budget deficit by borrowing from the central bank. Compared with borrowing from the public, this is more likely to",
    ["increase the money supply and raise the risk of inflation", "Correct: the central bank creates new reserves."],
    [["reduce the money supply and lower the risk of inflation", "Central bank credit creates money."],
     ["leave the money supply unchanged because the deficit is the same", "The source of finance matters."],
     ["reduce the national debt immediately by the amount borrowed", "Borrowing adds to the debt."]],
    "Borrowing from the central bank creates new money; borrowing from the public transfers existing money.", { hints: ["Does the lender have to give up existing money, or is new money created?"] });

  mc(b, [3, "ANALYSIS"], "In an open economy with a balance of payments surplus, the central bank buys the foreign currency that comes in, paying with domestic money. The money supply will",
    ["rise, unless the central bank takes offsetting action", "Correct: domestic money is created to buy the foreign currency."],
    [["fall, because foreign currency is a part of the money supply", "The central bank pays out domestic money."],
     ["stay the same, because exports are not part of the money supply", "The purchase of foreign currency adds domestic money."],
     ["rise, but only when the government is running a budget deficit", "The deficit is not required."]],
    "The central bank creates domestic money to buy foreign currency; it can sterilise the effect by selling securities.", { hints: ["How does the central bank pay for the foreign currency?"] });

  mc(b, [3, "UNDERSTANDING"], "According to the liquidity preference theory, the speculative demand for money is likely to fall when",
    ["the interest rate rises, because holding money costs more", "Correct: holding money gives up more interest."],
    [["the interest rate falls, because bonds then become less attractive", "A fall in rates raises the demand for money."],
     ["the price level rises, because people then need to make fewer payments", "This affects transactions demand."],
     ["national income rises, because people then need less money for emergencies", "Income affects the transactions and precautionary motives."]],
    "A higher interest rate raises the opportunity cost of holding money, so people hold less.", { hints: ["What is the cost of holding money instead of an asset that pays interest?"] });

  mc(b, [4, "EVALUATION"], "Which is the best reason why a central bank cannot completely control the money supply?",
    ["Credit creation depends on banks and borrowers, and capital flows affect it", "Correct: other parties help determine the supply."],
    [["The money supply depends only on the amount of notes that the bank prints", "Most money is bank deposits."],
     ["The central bank does not have any influence at all over bank reserves", "It controls reserves through its operations."],
     ["The money supply is determined entirely by the demand for money itself", "Supply and demand are different, though interacting."]],
    "The central bank controls reserves, but banks and borrowers decide how much to lend, and capital flows can add or remove money.", { hints: ["Who decides how much banks lend?"] });

  {
    const n = 55 + 245; chk(n, 300);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: n, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Narrow money = notes and coins + current account deposits."],
      stem: "In an economy, notes and coins in circulation are US\\$55 million, current account deposits are US\\$245 million and savings deposits are US\\$380 million. Calculate narrow money, in US\\$ million.",
      wrong: [680, 625, 245], explanation: "Narrow money = 55 + 245 = US\\$300 million. Savings deposits belong to broad money only." });
    const g = pctChange(480, 516); chk(g, 7.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: g, dp: 1, unit: "%", calculator: true, hints: ["Percentage growth = change ÷ original × 100."],
      stem: "Broad money rises from US\\$480 million to US\\$516 million in a year. Calculate the percentage growth of the money supply, as a percentage.",
      wrong: [7, 36, 6.98], explanation: "Increase = 36; 36 ÷ 480 × 100 = 7.5%. Dividing by the new level gives 7.0%." });
    const m = 80 * 10; chk(m, 800);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: m, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Reserves rise by the value of the securities bought; apply the credit multiplier."],
      stem: "A central bank buys government bonds worth US\\$80 million from commercial banks. The reserve ratio is 10%. Calculate the maximum rise in bank deposits, in US\\$ million.",
      wrong: [80, 8, 720], explanation: "1. Banks' reserves rise by US\\$80 million.\n2. Credit multiplier = 1 ÷ 0.10 = 10.\n3. Maximum rise in deposits = 80 × 10 = US\\$800 million." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true,
    stem: "True or false: in quantitative easing the central bank buys financial assets using newly created money.",
    feedbackTrue: "The purchases raise banks' reserves.",
    explanation: "Quantitative easing is the creation of money to buy assets such as government bonds." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each reason for holding money with the motive it illustrates.",
    pairs: ["Keeping cash to buy groceries and pay bus fares this week", "Keeping savings in case a family member falls ill", "Holding money rather than bonds because bond prices are expected to fall"],
    right: ["Transactions motive", "Precautionary motive", "Speculative motive"], rightIndex: [0, 1, 2],
    explanation: "Everyday payments are transactions; emergencies are precautionary; waiting for better asset prices is speculative." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "{{blank:a}} money includes savings and time deposits as well as notes, coins and current accounts. The motive for holding money to pay for everyday purchases is the {{blank:b}} motive.",
    blanks: [{ id: "a", accepted: ["Broad"], choices: ["Broad", "Narrow", "Foreign"] }, { id: "b", accepted: ["transactions"], choices: ["transactions", "precautionary", "speculative"] }],
    explanation: "Broad money adds less liquid deposits; everyday payments are the transactions motive." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the motive for holding money to meet unexpected expenses.",
    accepted: ["precautionary", "precautionary motive", "the precautionary motive", "precautionary demand"], wrong: ["speculative"],
    explanation: "Money held for emergencies is held for the precautionary motive." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Use 'liquid' in the answer."],
    stem: "Distinguish between narrow money and broad money.",
    points: ["Narrow money is notes and coins plus the most liquid deposits (such as current accounts).", "Broad money is narrow money plus less liquid deposits such as savings and time deposits."],
    modelAnswer: "Narrow money is notes and coins together with the most liquid deposits, such as current accounts. Broad money is narrow money plus less liquid deposits such as savings and time deposits.",
    explanation: "Liquidity is the difference." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Say where the new money comes from."],
    stem: "Explain how financing a government deficit by borrowing from the central bank increases the money supply.",
    points: ["The central bank lends to the government by creating new money (or buying bonds with new reserves).", "The government spends the money, and the recipients deposit it in banks.", "Banks' reserves and deposits rise.", "Banks can then lend more, so the money supply rises further through credit creation."],
    modelAnswer: "The central bank lends to the government by creating new money, or by buying government bonds with new reserves. The government spends the money and the recipients deposit it in banks, so banks' reserves and deposits rise. Banks can then lend more, so the money supply rises further through credit creation.",
    explanation: "New money; spending and deposits; reserves; credit creation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Link the motive to the interest rate."],
    stem: "Explain why the speculative demand for money falls when the interest rate rises.",
    points: ["Holding money earns little or no interest.", "A higher interest rate raises the opportunity cost of holding money rather than interest-bearing assets.", "So people hold less money and more bonds or other assets."],
    modelAnswer: "Money earns little or no interest. A higher interest rate raises the opportunity cost of holding money rather than interest-bearing assets, so people hold less money and more bonds or other assets.",
    explanation: "Opportunity cost rises." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Describe what the central bank buys and how banks respond."],
    stem: "Analyse how quantitative easing could increase aggregate demand.",
    points: ["The central bank buys financial assets from banks and others with newly created money.", "Banks' reserves rise, so they can lend more.", "Bond prices rise and long-term interest rates fall.", "Lower interest rates and more credit encourage investment and consumption.", "Aggregate demand rises, although the effect depends on banks' willingness to lend and borrowers' willingness to borrow."],
    modelAnswer: "The central bank buys financial assets from banks and others with newly created money, so banks' reserves rise and they can lend more. The purchases raise bond prices and lower long-term interest rates, which encourages investment and consumption. Aggregate demand therefore rises, although the effect depends on whether banks are willing to lend and borrowers are willing to borrow.",
    explanation: "New money, reserves, lower rates, spending, AD with limits." });

  {
    const comp = [["Notes and coins in circulation", 35], ["Current account deposits", 205], ["Savings deposits", 410], ["Time deposits", 250]];
    const narrow = 35 + 205, broad = narrow + 410 + 250; chk(narrow, 240); chk(broad, 900);
    const share = (35 / broad) * 100; chk(Math.round(share * 10) / 10, 3.9);
    const t1 = table(["Component of the money supply", "US\\$ million"], comp);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Narrow money: notes, coins and current accounts.", "Broad money: all four components."],
      stem: `**The money supply in Zandia (fictional, illustrative)**\n\nThe central bank of Zandia publishes the following data.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: narrow, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate narrow money, in US\\$ million.", wrong: [900, 35, 650], explanation: "35 + 205 = US\\$240 million." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: broad, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate broad money, in US\\$ million.", wrong: [240, 660, 1000], explanation: "35 + 205 + 410 + 250 = US\\$900 million." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: share, dp: 1, unit: "%", stem: "Calculate notes and coins as a percentage of broad money, to one decimal place.", wrong: [14.6, 35, 0.4], explanation: "35 ÷ 900 × 100 = 3.9%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how a balance of payments surplus could increase the money supply in Zandia.",
          points: ["A surplus means that more foreign currency flows into the country than out.", "Exporters sell the foreign currency to the banking system or central bank for domestic currency.", "If the central bank buys the foreign currency, it pays with newly created domestic money, which raises banks' reserves.", "Banks can lend more, so the money supply rises, unless the central bank offsets (sterilises) the inflow."],
          modelAnswer: "A balance of payments surplus means that more foreign currency flows into the country than out. Exporters sell the foreign currency for domestic currency, and if the central bank buys it, it pays with newly created domestic money, which raises banks' reserves. Banks can then lend more, so the money supply rises, unless the central bank offsets the inflow by selling securities." }),
      ],
      explanation: "Narrow money 240; broad money 900; notes and coins 3.9%; the balance of payments surplus adds domestic money." });
  }
  {
    const k = 1 / 0.2; chk(k, 5);
    const dD = 120 * k; chk(dD, 600);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Multiplier = 1 ÷ reserve ratio.", "In (d) compare borrowing from the central bank with other ways of financing a deficit."],
      stem: "**Financing a deficit in Mbira (a fictional economy, illustrative)**\n\nThe government of Mbira has a budget deficit of US\\$120 million. Lenders in the capital market are unwilling to lend more at reasonable interest rates, so the government asks the central bank to buy its bonds with newly created money. The commercial banks have a reserve ratio of 20%. Critics argue that this will raise prices; supporters argue that the government has no better way of paying teachers and nurses.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "elasticity", value: k, dp: 2, stem: "Calculate the credit multiplier.", wrong: [0.2, 20, 0.5], explanation: "1 ÷ 0.2 = 5." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: dD, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the maximum rise in bank deposits caused by the government's spending of the money, in US\\$ million.", wrong: [120, 24, 480], explanation: "The central bank's purchase raises banks' reserves by US\\$120 million; deposits can rise by up to 120 × 5 = US\\$600 million." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain how financing the deficit in this way could lead to inflation.",
          points: ["The money supply rises because the central bank creates new money.", "The spending and the extra bank lending raise aggregate demand.", "If output cannot rise as quickly (little spare capacity), the extra demand raises the price level.", "More money chasing the same goods raises prices; expectations of inflation may make it worse."],
          modelAnswer: "The central bank creates new money, so the money supply rises. The government's spending and the extra bank lending that follows raise aggregate demand. If output cannot rise as quickly because there is little spare capacity, the extra demand raises the price level. More money chasing the same goods raises prices, and expectations of inflation may make the problem worse." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 90, max: 250 }, levels: LV5,
          stem: "Assess whether the government of Mbira should finance its deficit by borrowing from the central bank.",
          points: ["It provides immediate finance when other lenders are unwilling, so essential spending on teachers and nurses can continue.", "It has no interest cost to the private sector in the short run and avoids crowding out.", "But it creates money, which can raise inflation, reduce the value of savings and wages, and erode confidence in the currency.", "Inflation can be damaging, as an unreliable currency harms investment and trade.", "Judgement: acceptable only in small amounts or in emergencies, with a credible plan to reduce the deficit."],
          modelAnswer: "Borrowing from the central bank provides immediate finance when other lenders are unwilling, so essential spending on teachers and nurses can continue, and it avoids pushing up interest rates and crowding out private borrowing. However, it creates new money, which can raise inflation, reduce the real value of savings and wages and weaken confidence in the currency, and a currency that is unreliable harms investment and trade. It is therefore acceptable only in small amounts or in emergencies, with a credible plan to reduce the deficit." }),
      ],
      explanation: "Multiplier 5; maximum rise US\\$600 million; creation of money raises AD and prices; assess finance from the central bank." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the tools, banks' decisions, capital flows and the use of other currencies."],
    stem: "Assess whether a central bank can control the money supply.",
    points: ["It controls the note issue and banks' reserves through open-market operations.", "It can set the reserve requirement and the interest rate.", "Banks and borrowers decide how much to lend (credit creation).", "Capital flows and the balance of payments change the money supply in an open economy.", "Government deficit financing may force the central bank to create money.", "In economies using foreign currencies or mobile money outside banks, control is weaker.", "Measures are imperfect and the demand for money is unstable.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A central bank controls the note issue and, through open-market operations and reserve requirements, the reserves of the banks, and it can influence lending through the interest rate. However, the actual money supply also depends on the decisions of commercial banks to lend and of households and firms to borrow, so the credit multiplier is unstable. In an open economy capital flows and the balance of payments can add or remove money independently of the central bank, and if the government forces the central bank to finance its deficit it may be obliged to create money. Where foreign currencies and mobile money are widely used outside the banking system, control is weaker still. Overall a central bank can influence the money supply but cannot control it exactly, and it can restrain it more easily than it can expand it.",
    explanation: "Tools of control against credit decisions, capital flows, deficit financing and structure of the economy." });

  b.card("DEFINITION", "Define **narrow money**.", "Notes and coins in circulation plus deposits that can be withdrawn on demand, such as current accounts.");
  b.card("DEFINITION", "Define **broad money**.", "Narrow money plus less liquid deposits such as savings and time deposits.");
  b.card("CONCEPT", "List five causes of changes in the money supply.", "Credit creation, central bank actions, government deficit financing, quantitative easing and the balance of payments.");
  b.card("CONCEPT", "Borrowing from the central bank or from the public: which creates money?", "Borrowing from the central bank; borrowing from the public transfers existing money.");
  b.card("DEFINITION", "What is quantitative easing?", "The central bank creates money to buy financial assets such as government bonds, raising banks' reserves and lowering long-term interest rates.");
  b.card("CONCEPT", "Three motives for holding money?", "Transactions, precautionary and speculative.");
  b.card("CONCEPT", "Which motive depends mainly on the interest rate?", "The speculative motive: a higher rate lowers the demand for money.");
  b.card("CONCEPT", "How can a balance of payments surplus raise the money supply?", "The central bank buys foreign currency with newly created domestic money.");
  b.card("CONCEPT", "What is sterilisation?", "Action by the central bank (such as selling securities) to offset the effect of an inflow of foreign currency on the money supply.");
});
