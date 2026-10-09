// W1a: hire purchase, credit sales and other forms of credit (COM).
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.trade.credit", { file: "trade/credit", keyPrefix: "trade.credit" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under a hire purchase agreement, when does the buyer become the owner of the goods?",
    options: [
      ["When the last instalment is paid", "Correct: until then the seller or finance house owns them."],
      ["When the deposit is paid", "Paying the deposit gives possession, not ownership."],
      ["When the agreement is signed", "That is when ownership passes under a credit sale."],
      ["When half the instalments are paid", "Ownership does not pass part-way through."],
    ],
    answer: "A",
    explanation: "Under HP the buyer has possession and use of the goods but owns them only after the final instalment.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of credit passes ownership of the goods to the buyer immediately?",
    options: [
      ["Deferred payment (credit sale)", "Correct: ownership passes when the agreement is made."],
      ["A hire purchase (HP) agreement", "Under HP ownership passes after the last instalment."],
      ["Leasing", "Under leasing the goods are never owned by the user."],
      ["Renting", "Renting gives use of the goods, not ownership."],
    ],
    answer: "A",
    explanation: "Under a credit sale the buyer owns the goods at once; the seller cannot repossess them but can sue for the debt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A buyer stops paying the instalments on a sofa bought under hire purchase. What can the seller normally do?",
    options: [
      ["Repossess the sofa", "Correct: the seller still owns the sofa, so it can take it back under the agreement."],
      ["Nothing, because the buyer owns the sofa", "Under HP the buyer does not yet own it."],
      ["Ask the buyer's bank to pay instead", "The bank is not a party to the agreement."],
      ["Increase the cash price of the sofa", "The cash price is fixed when the agreement is made."],
    ],
    answer: "A",
    explanation: "Because ownership stays with the seller until the end, HP allows repossession if the buyer defaults (within the protection the law gives buyers).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the total hire purchase price higher than the cash price?",
    options: [
      ["It includes interest charged for the credit", "Correct: the seller or finance house charges for waiting for its money."],
      ["The goods are of higher quality on HP", "The goods are the same; only the payment method differs."],
      ["The deposit is added to the cash price", "The deposit is part of the price, not an extra on top of it."],
      ["VAT is charged only on HP sales", "Tax is not the reason for the difference."],
    ],
    answer: "A",
    explanation: "Extra cost of HP = total HP price − cash price: this is the interest (charge for credit).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who often pays the retailer the cash price straight away in a hire purchase deal?",
    options: [
      ["A finance house", "Correct: the finance house then collects the instalments and earns the interest."],
      ["An insurance company", "Insurers cover risk; they do not finance HP."],
      ["The manufacturer of the goods", "Manufacturers do not normally finance consumer HP."],
      ["The Consumer Council", "Consumer bodies protect buyers; they do not lend."],
    ],
    answer: "A",
    explanation: "Finance houses (finance companies) fund HP so retailers get their money immediately.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage of hire purchase **to the seller**?",
    options: [
      ["Repossessed goods may be damaged and hard to resell", "Correct: second-hand goods lose value."],
      ["The buyer pays more than the cash price", "This is a disadvantage to the buyer."],
      ["Sales increase because goods are more affordable", "This is an advantage to the seller."],
      ["The seller earns interest on the agreement", "This is an advantage to the seller."],
    ],
    answer: "A",
    explanation: "Sellers face bad debts, repossession costs, damaged goods and extra administration.",
    hints: ["Two options are advantages; one concerns the buyer."],
  });
  // Calculations (figures differ from the lesson).
  const c1 = 1800, d1 = r2(c1 * 0.25), i1 = 90, n1 = 18;
  const hp1 = r2(d1 + i1 * n1);
  const extra1 = r2(hp1 - c1);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: hp1, calculator: true,
    stem: `A motorcycle has a cash price of ${money(c1)}. On hire purchase the buyer pays a 25% deposit and ${n1} monthly instalments of ${money(i1)}. Calculate the total hire purchase price.`,
    wrong: [r2(i1 * n1), r2(c1 + i1 * n1)],
    explanation: `Deposit = 25% × ${fmt(c1)} = ${money(d1)}. Instalments = ${n1} × ${fmt(i1)} = ${money(i1 * n1)}. Total = ${money(hp1)}.`,
    workedSolution: `1. Deposit = 25% of ${fmt(c1)} = ${fmt(d1)}.\n2. Instalments = ${n1} × ${fmt(i1)} = ${fmt(i1 * n1)}.\n3. Total HP price = ${fmt(d1)} + ${fmt(i1 * n1)} = ${money(hp1)}.`,
    hints: ["Work out the deposit on the cash price first.", "Add the deposit to the total of all instalments."],
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: extra1, daily: true,
    stem: `A motorcycle with a cash price of ${money(c1)} costs ${money(hp1)} in total on hire purchase. How much extra does the buyer pay by using hire purchase?`,
    wrong: [hp1, c1],
    explanation: `Extra cost = ${fmt(hp1)} − ${fmt(c1)} = ${money(extra1)}.`,
  });
  const c2 = 800, d2 = r2(c2 * 0.25), i2 = 60, n2 = 12;
  const hp2 = r2(d2 + i2 * n2);
  const pct2 = ((hp2 - c2) / c2) * 100;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: pct2, calculator: true,
    stem: `A sewing machine costs ${money(c2)} cash. On hire purchase there is a deposit of 25% of the cash price and ${n2} monthly instalments of ${money(i2)}. Calculate the extra cost of hire purchase as a percentage of the cash price, to one decimal place.`,
    wrong: [r2(((hp2 - c2) / hp2) * 100), r2((hp2 / c2) * 100)],
    explanation: `Total HP price = ${fmt(d2)} + ${n2} × ${fmt(i2)} = ${money(hp2)}. Extra = ${money(r2(hp2 - c2))}. Percentage = ${fmt(r2(hp2 - c2))} ÷ ${fmt(c2)} × 100 = ${pct2.toFixed(1)}%.`,
    workedSolution: `1. Deposit = 25% × ${fmt(c2)} = ${fmt(d2)}.\n2. Instalments = ${n2} × ${fmt(i2)} = ${fmt(i2 * n2)}.\n3. Total HP price = ${fmt(hp2)}; extra cost = ${fmt(hp2)} − ${fmt(c2)} = ${fmt(r2(hp2 - c2))}.\n4. Percentage of cash price = ${fmt(r2(hp2 - c2))} ÷ ${fmt(c2)} × 100 = ${pct2.toFixed(1)}%.`,
    hints: ["Find the total HP price first.", "Divide the extra cost by the cash price, not the HP price."],
  });
  const d4 = 160, hp4 = 1240, n4 = 10;
  const inst4 = r2((hp4 - d4) / n4);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: inst4,
    stem: `The total hire purchase price of a solar power kit is ${money(hp4)}. The deposit is ${money(d4)} and the rest is paid in ${n4} equal monthly instalments. Calculate each instalment.`,
    wrong: [r2(hp4 / n4), r2((hp4 + d4) / n4)],
    explanation: `(${fmt(hp4)} − ${fmt(d4)}) ÷ ${n4} = ${money(inst4)}.`,
    workedSolution: `1. Amount paid by instalments = ${fmt(hp4)} − ${fmt(d4)} = ${fmt(hp4 - d4)}.\n2. Each instalment = ${fmt(hp4 - d4)} ÷ ${n4} = ${money(inst4)}.`,
    hints: ["Take the deposit off the total first."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under a credit sale, the seller can repossess the goods if the buyer stops paying.",
    answer: false,
    explanation: "False. Ownership has already passed to the buyer, so the seller must sue for the money owed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Credit card holders who pay the full balance by the due date are normally not charged interest.",
    answer: true,
    explanation: "True. Interest is charged on any balance left unpaid after the due date.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of credit with its feature.",
    pairs: [
      ["Hire purchase", "Seller owns the goods until the last instalment"],
      ["Deferred payment", "Ownership passes when the agreement is made"],
      ["Credit card", "Buy up to a limit and settle a monthly statement"],
      ["Informal credit", "Shopkeeper lets regular customers pay at month end"],
    ],
    explanation: "Ownership and the way payment is arranged distinguish the forms of credit.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulae.",
    template: "Total HP price = {{blank:a}} plus all instalments. Extra cost of HP = total HP price − {{blank:b}} price.",
    blanks: [
      { id: "a", accepted: ["deposit"], choices: ["deposit", "interest", "profit", "discount"] },
      { id: "b", accepted: ["cash"], choices: ["cash", "selling", "cost", "list"] },
    ],
    explanation: "Deposit plus instalments gives the total HP price; subtracting the cash price gives the charge for credit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** differences between hire purchase and deferred payment.",
    points: [
      "Ownership: HP after the last instalment; credit sale immediately (1)",
      "Explained/contrasted clearly (1)",
      "Default: HP seller can repossess; credit sale seller must sue for the debt (1)",
      "Explained/contrasted clearly, or resale: HP buyer cannot sell goods before paying in full (1)",
    ],
    modelAnswer: "Under hire purchase the buyer owns the goods only after paying the last instalment, but under deferred payment ownership passes as soon as the agreement is signed. As a result, if an HP buyer stops paying the seller can repossess the goods, whereas a credit-sale seller can only sue the buyer for the money owed.",
    explanation: "Each difference must compare both agreements.",
    hints: ["Who owns the goods during the agreement?", "What can the seller do if payments stop?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage to a small tuck shop of giving informal credit to regular customers.",
    points: [
      "Advantage identified, e.g. customer loyalty / more sales (1)",
      "Explained, e.g. customers short of cash before payday still buy from her rather than a supermarket (1)",
      "Disadvantage identified, e.g. bad debts / cash-flow problems (1)",
      "Explained, e.g. no written agreement or security, so unpaid debts are hard to recover (1)",
    ],
    modelAnswer: "Informal credit keeps regular customers loyal, because they can buy bread and milk before payday, which supermarkets will not allow. However, with no written agreement some customers may never pay, and money owed is money the shop cannot use to restock.",
    explanation: "Credit wins customers but risks bad debts and cash-flow problems.",
    hints: ["Why do customers like credit?", "What happens if they do not pay?"],
  });
  const tvCash = 980, tvDep = r2(tvCash * 0.1), tvInst = 85, tvN = 12, csInst = 175, csN = 6;
  const tvHp = r2(tvDep + tvInst * tvN);
  const tvCs = r2(csInst * csN);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Chipo wants a deep freezer for her ice-cream business in Masvingo. The cash price is ${money(tvCash)}. The shop offers:\n\n- **Hire purchase:** deposit of 10% of the cash price and ${tvN} monthly instalments of ${money(tvInst)}.\n- **Credit sale:** ${csN} monthly instalments of ${money(csInst)} and no deposit.\n\nChipo's profit from ice-cream is about ${money(150)} a month, but less in the cold season.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: tvHp,
        stem: "Calculate the total hire purchase price.",
        wrong: [r2(tvInst * tvN), r2(tvCash + tvInst * tvN)],
        explanation: `Deposit ${fmt(tvDep)} + ${tvN} × ${fmt(tvInst)} = ${money(tvHp)}.`,
      }),
      P.num({
        label: "(b)", marks: 1, kind: "money", value: tvCs,
        stem: "Calculate the total price under the credit sale.",
        wrong: [csInst, r2(tvCash + csInst)],
        explanation: `${csN} × ${fmt(csInst)} = ${money(tvCs)}.`,
      }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Under which agreement would Chipo own the freezer immediately?",
        options: [["The credit sale", "Correct: ownership passes when the agreement is made."], ["Hire purchase", "Under HP she owns it after the last instalment."], ["Both agreements", "Only the credit sale passes ownership at once."], ["Neither agreement", "The credit sale does."]],
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend which agreement Chipo should choose. Justify your answer using your calculations.",
        points: [
          `Credit sale is cheaper overall (${money(tvCs)} against ${money(tvHp)}) (1)`,
          "Credit sale gives ownership at once (1)",
          `Credit-sale instalment (${money(csInst)}) is more than her monthly profit (${money(150)}) (1)`,
          `HP instalment (${money(tvInst)}) is affordable from profit, even in the cold season, but she may lose the freezer if she defaults (1)`,
          "Recommendation (1)",
          "Justified by weighing total cost against affordability (1)",
        ],
        modelAnswer: `The credit sale costs ${money(tvCs)}, ${money(r2(tvHp - tvCs))} less than hire purchase at ${money(tvHp)}, and Chipo would own the freezer immediately. However, each credit-sale instalment of ${money(csInst)} is more than her usual monthly profit of ${money(150)}, and profit falls in the cold season, so she would struggle to pay. The HP instalment of ${money(tvInst)} plus a deposit of ${money(tvDep)} is affordable from her profit. I recommend hire purchase: it costs more, but missing credit-sale payments could lead to legal action, while the freezer will earn the money to pay the smaller instalments.`,
      }),
    ],
    explanation: `HP total ${money(tvHp)}; credit sale total ${money(tvCs)}. The cheaper option is not affordable each month, so the decision depends on cash flow, not just total cost.`,
    hints: ["Deposit = 10% of the cash price.", "Compare each monthly payment with Chipo's monthly profit."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "A furniture shop in Harare sells lounge suites on hire purchase. Some customers have stopped paying their instalments.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** advantages to the shop of selling on hire purchase.",
        points: ["More sales / more customers can afford goods (1)", "Interest income / can repossess if unpaid (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **one** problem the shop faces when customers stop paying.",
        points: ["Identifies, e.g. bad debts / cost of repossession (1)", "Explains, e.g. repossessed suites are used and must be sold cheaply (1)", "Effect on the shop, e.g. lower profit / cash-flow problems (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the shop could reduce the number of customers who stop paying.",
        points: ["Suggestion, e.g. check customers' income / references before agreeing (1)", "Second measure, e.g. higher deposit / shorter period (1)", "Explains how it reduces default (1)"],
      }),
    ],
    explanation: "HP raises sales and earns interest, but defaults cause bad debts and losses on repossessed goods; careful credit checks reduce the risk.",
    hints: ["What does the shop do with repossessed suites?", "How could the shop check that a customer can pay?"],
  });
  b.card("DEFINITION", "Hire purchase", "Deposit, then instalments; the seller owns the goods until the last instalment and may repossess on default.");
  b.card("DEFINITION", "Deferred payment (credit sale)", "Payment in instalments; ownership passes immediately; seller must sue for unpaid debt.");
  b.card("FORMULA", "Total hire purchase price", "Total HP price = deposit + (instalment × number of instalments).");
  b.card("FORMULA", "Extra cost of hire purchase", "Extra cost (interest) = total HP price − cash price.");
  b.card("CONCEPT", "HP: advantages and disadvantages to the buyer", "Use goods now and spread payments; but pay more, risk repossession and may overspend.");
  b.card("CONCEPT", "HP: advantages and disadvantages to the seller", "More sales and interest income; but bad debts, damaged repossessed goods and administration.");
  b.card("DEFINITION", "Finance house", "A finance company that pays the retailer the cash price and collects the HP instalments with interest.");
  b.card("DEFINITION", "Credit card", "Card for buying up to a limit; monthly statement; interest on any balance not paid by the due date.");
  b.card("DEFINITION", "Informal credit", "Credit without a written agreement, such as a shopkeeper's month-end account for regular customers.");
});
