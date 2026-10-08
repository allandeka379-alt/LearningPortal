// W2a: econ.money.money — barter, forms of money, functions, characteristics, M1/M2/M3 (ZIMSEC).
import { concept, P, table, pct, check, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.money.money", { file: "money/money", keyPrefix: "money.money" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **double coincidence of wants**?",
    options: [
      ["Each trader must want what the other trader has to offer", "Correct: the main problem of barter."],
      ["Two buyers want the same good at the same time", "Competition between buyers is not the double coincidence of wants."],
      ["Consumers want both goods and services", "This is not about the conditions for exchange."],
      ["A good is wanted by both households and firms", "The term is about two traders each wanting the other's goods."],
    ],
    answer: "A",
    explanation: "Barter requires a double coincidence of wants: each party must have what the other wants, at the same time.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which function of money allows the prices of different goods to be compared?",
    options: [
      ["Unit of account (measure of value)", "Correct: all prices are stated in the same unit."],
      ["Store of value", "This lets money be saved for later use."],
      ["Standard of deferred payment", "This allows debts to be settled in the future."],
      ["Medium of exchange", "This means money is accepted in payment."],
    ],
    answer: "A",
    explanation: "As a unit of account, money gives every good a price in one common unit, so values can be compared.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "During very rapid inflation, people spend their money as soon as they receive it. Which function of money has failed most clearly?",
    options: [
      ["Store of value", "Correct: money loses its purchasing power, so it cannot be saved."],
      ["Medium of exchange", "People are still spending money, so it is still being used in exchange."],
      ["Unit of account", "Prices are still quoted, though they change quickly."],
      ["Portability", "Portability is a characteristic, not a function, of money."],
    ],
    answer: "A",
    explanation: "When prices rise very fast, money held for even a few days buys much less, so it no longer stores value.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Cattle were once used as money in parts of southern Africa. Which characteristic of good money do cattle **lack** most clearly?",
    options: [
      ["Divisibility", "Correct: a cow cannot be split to make small payments."],
      ["Acceptability", "Cattle were widely accepted, which is why they were used."],
      ["Scarcity", "Cattle are limited in number."],
      ["Value", "Cattle clearly have value of their own."],
    ],
    answer: "A",
    explanation: "Cattle are valuable and accepted, but they cannot be divided into small units (and are not uniform or easily carried).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A customer pays a vendor using a mobile-money transfer from her phone. What is the money in this transaction?",
    options: [
      ["The balance held in her mobile-money account", "Correct: the phone app only transfers this balance."],
      ["The mobile phone that she uses to pay", "The phone is a device; it is not accepted in payment."],
      ["The text message confirming the payment", "The message is a record of the transfer, not money."],
      ["The PIN number that she types to approve it", "The PIN authorises the transfer; it has no value."],
    ],
    answer: "A",
    explanation: "Electronic and mobile money are balances in accounts; apps, cards and cheques are ways of transferring them.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is it important that the supply of a currency is limited?",
    options: [
      ["So that the currency keeps a stable value and stays acceptable", "Correct: too much money in circulation causes inflation and loss of trust."],
      ["So that the currency is easy to carry around in large amounts", "That is portability, not limited supply."],
      ["So that each note of the same value is identical", "That is homogeneity."],
      ["So that people never need to use bank deposits", "Limited supply of notes has nothing to do with avoiding deposits."],
    ],
    answer: "A",
    hints: ["What happens to the value of money if far more of it is printed?"],
    explanation: "If money is printed without limit, prices rise and money loses value, so it fails as a store of value and may stop being accepted.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A farmer agrees to sell maize now and be paid next month. Which function of money makes this agreement easier than under barter?",
    options: [
      ["Standard of deferred payment", "Correct: a future payment can be fixed as a sum of money."],
      ["Medium of exchange", "This concerns accepting money in payment now, not later."],
      ["Divisibility", "Divisibility is a characteristic, not a function."],
      ["Durability", "Durability is a characteristic, not a function."],
    ],
    answer: "A",
    hints: ["The payment is in the future."],
    explanation: "Money allows debts to be stated in a fixed sum to be paid later: the standard of deferred payment.",
  });
  // Barter ratios.
  const n1 = 15, r1 = (n1 * (n1 - 1)) / 2;
  check("r1", r1, 105);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: r1,
    stem: `In a barter economy every pair of goods needs its own rate of exchange. The number of exchange rates for n goods is n(n − 1) ÷ 2. How many exchange rates are needed in a village that trades ${n1} goods?`,
    wrong: [n1 * (n1 - 1), n1],
    hints: ["Substitute n = 15 into n(n − 1) ÷ 2."],
    explanation: `${n1} × ${n1 - 1} ÷ 2 = **${r1}** exchange rates. With money, only ${n1} prices would be needed, one for each good.`,
  });
  // Money supply (ZIMSEC).
  const ms = { cash: 1240, demand: 2680, savings: 1570, time: 930 };
  const m1 = ms.cash + ms.demand, m2 = m1 + ms.savings, m3 = m2 + ms.time;
  const MT = table(["Item", "Amount (K million)"], [["Notes and coins held by the public", ms.cash], ["Demand (current account) deposits", ms.demand], ["Savings and short-term deposits", ms.savings], ["Long-term (fixed) deposits", ms.time]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: m1, applies: ZIM, daily: true,
    stem: `The table shows money in a fictional country (kora million, K).\n\n${MT}\n\nUsing the definition M1 = notes and coins held by the public + demand deposits, calculate M1 in K million.`,
    wrong: [m2, ms.cash],
    explanation: `M1 = ${ms.cash.toLocaleString("en-GB")} + ${ms.demand.toLocaleString("en-GB")} = **${m1.toLocaleString("en-GB")}** (K million). Savings and long-term deposits belong in M2 and M3.`,
  });
  const ms2 = { cash: 560, demand: 1190, savings: 870, time: 1410 };
  const n3 = ms2.cash + ms2.demand + ms2.savings + ms2.time;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: n3, applies: ZIM,
    stem: `A fictional central bank reports (in K million): notes and coins held by the public ${ms2.cash}; demand deposits ${ms2.demand.toLocaleString("en-GB")}; savings and short-term deposits ${ms2.savings}; long-term deposits ${ms2.time.toLocaleString("en-GB")}. Using M3 = M2 + long-term deposits, where M2 = M1 + savings and short-term deposits, calculate M3 in K million.`,
    wrong: [ms2.cash + ms2.demand + ms2.savings, ms2.time],
    hints: ["Build up: M1 first, then M2, then M3."],
    explanation: `1. M1 = ${ms2.cash} + ${ms2.demand.toLocaleString("en-GB")} = ${(ms2.cash + ms2.demand).toLocaleString("en-GB")}.\n2. M2 = ${(ms2.cash + ms2.demand).toLocaleString("en-GB")} + ${ms2.savings} = ${(ms2.cash + ms2.demand + ms2.savings).toLocaleString("en-GB")}.\n3. M3 = ${(ms2.cash + ms2.demand + ms2.savings).toLocaleString("en-GB")} + ${ms2.time.toLocaleString("en-GB")} = **${n3.toLocaleString("en-GB")}** (K million).`,
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which of the following is the **narrowest** measure of the money supply?",
    options: [
      ["M1", "Correct: cash held by the public plus demand deposits."],
      ["M2", "M2 adds savings and short-term deposits to M1."],
      ["M3", "M3 is the broadest of the three."],
      ["Gross domestic product", "GDP measures output, not money."],
    ],
    answer: "A",
    explanation: "M1 (narrow money) contains the most spendable forms of money; M2 and M3 add less liquid deposits.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Barter is the exchange of goods and services directly for other goods and services, without money.",
    answer: true,
    explanation: "True. That is the definition of barter.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A debit card is a form of money.",
    answer: false,
    explanation: "False. A debit card is a way of transferring money held in a bank account; the deposit is the money.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem of barter with the function of money that solves it.",
    pairs: [
      ["Need for a double coincidence of wants", "Medium of exchange"],
      ["No common measure of the value of goods", "Unit of account"],
      ["Perishable goods cannot be saved for later", "Store of value"],
      ["Disputes over debts to be repaid in goods", "Standard of deferred payment"],
    ],
    explanation: "Each function of money removes one problem of barter.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct characteristic of money.",
    template: "Money that can be split into small units is {{blank:a}}. Money that lasts a long time is {{blank:b}}. Money that is easy to carry is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["divisible"], choices: ["divisible", "durable", "portable", "homogeneous"] },
      { id: "b", accepted: ["durable"], choices: ["divisible", "durable", "portable", "homogeneous"] },
      { id: "c", accepted: ["portable"], choices: ["divisible", "durable", "portable", "homogeneous"] },
    ],
    wrong: [["durable", "portable", "divisible"]],
    explanation: "Divisible = splits into small units; durable = lasts; portable = easy to carry.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of money.",
    points: [
      "Identifies a function (for example medium of exchange).",
      "Explains it (accepted in payment, so no double coincidence of wants is needed).",
      "Identifies a second function (for example store of value / unit of account / standard of deferred payment).",
      "Explains it (money can be saved for future use / gives a common measure / debts fixed in money).",
    ],
    modelAnswer: "Money is a medium of exchange: it is accepted in payment for goods and services, so a seller does not need to find someone who has exactly the goods she wants. Money is also a store of value: income can be saved as money and spent later, provided prices stay fairly stable.",
    hints: ["Name the function, then say what it allows people to do."],
    explanation: "One mark for each function named, one for each explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Assess whether mobile money has the characteristics of good money.",
    points: [
      "Portable: balances move by phone over any distance; very convenient.",
      "Divisible: any amount can be sent, down to small sums.",
      "Acceptable: widely accepted by traders, but depends on network coverage and on everyone having a phone/account.",
      "Durable / hard to forge: electronic balances do not wear out and are protected by PINs, but fraud and system failures can occur.",
      "Its value is only as stable as the currency it is held in; fees may reduce its use.",
      "Judgement: has most characteristics, with limits from technology, fees and the stability of the underlying currency.",
    ],
    modelAnswer: "Mobile money is highly portable, since balances can be sent by phone across the country, and divisible, since any amount can be transferred. It is widely accepted by traders and does not wear out like notes. However, it is accepted only where there is network coverage and both people have accounts, fees discourage small payments, and fraud or system failures can occur. Its value is also only as stable as the currency it is held in. Overall mobile money has most characteristics of good money, but its usefulness depends on technology and on a stable currency.",
    hints: ["Go through acceptability, portability, divisibility, durability, security and stability."],
    explanation: "Apply the characteristics to mobile money, noting both strengths and limits, then judge.",
  });

  // Structured 1: barter village moving to money.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "In a fictional remote village, people trade mainly by barter. A goat is usually exchanged for 6 bags of maize, and a bag of maize for 4 kg of sugar beans. A plough is exchanged for 3 goats. A new trading store opens and accepts only money.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: 6 * 4, stem: "Using the exchange rates, how many kg of sugar beans is one goat worth?", wrong: [6 + 4], explanation: "1 goat = 6 bags of maize, and each bag = 4 kg of beans: 6 × 4 = 24 kg." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: 3 * 6, stem: "How many bags of maize is a plough worth?", wrong: [3 + 6], explanation: "1 plough = 3 goats = 3 × 6 = 18 bags of maize." }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "A villager owns a goat but needs only 4 kg of sugar beans. Explain the problem he faces under barter.",
        points: [
          "Indivisibility: the goat is worth 24 kg of beans and cannot be divided.",
          "He must find a trader who wants a goat and has beans (double coincidence of wants), or accept far more beans than he needs.",
        ],
        modelAnswer: "His goat is worth 24 kg of beans but he needs only 4 kg, and he cannot split the goat. He must find someone who both has beans and wants a goat, and even then he gets far more beans than he needs.",
        explanation: "Indivisibility and the double coincidence of wants.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the village will be better off now that the store accepts only money.",
        points: [
          "For: money as a medium of exchange removes the need for a double coincidence of wants; trade is quicker.",
          "For: money is divisible, so small purchases are possible; prices in money (unit of account) are easy to compare.",
          "For: money can be saved (store of value) and used for credit (deferred payment); encourages specialisation.",
          "Against: villagers with goods but no cash may be unable to buy; they must first sell goods for money.",
          "Against: if the currency's value is unstable (inflation), money is a poor store of value; barter relationships may be lost.",
          "Justified conclusion.",
        ],
        modelAnswer: "The village is likely to gain. With money, a villager can sell his goat to anyone and buy just 4 kg of beans, so he no longer needs a double coincidence of wants and trade is faster. Money is divisible and gives every good a price, so values are easy to compare, and money can be saved or lent. This encourages people to specialise. However, villagers who have goods but no cash cannot buy at the store until they sell something, and if the currency loses value quickly, saving in money is risky and people may prefer goods. On balance, the village is better off, provided the currency keeps a stable value.",
        explanation: "Weigh the functions of money against access to cash and the risk of unstable money.",
      }),
    ],
    hints: ["Multiply the exchange rates to compare goods.", "Which problems of barter does money solve?"],
    explanation: "Barter needs many exchange rates and suffers from indivisibility; money as a medium of exchange, unit of account and store of value removes these problems, as long as its value is stable.",
  });

  // Structured 2: money supply data, ZIMSEC.
  const yrs = ["2024", "2025"];
  const cash = [930, 980], dem = [2150, 2610], sav = [1340, 1450], lt = [760, 790];
  const M1 = cash.map((c, i) => c + dem[i]);
  const M3 = M1.map((m, i) => m + sav[i] + lt[i]);
  const T2 = table(["Item (K million)", ...yrs], [["Notes and coins held by the public", ...cash], ["Demand deposits", ...dem], ["Savings and short-term deposits", ...sav], ["Long-term deposits", ...lt]]);
  const g1 = ((M1[1] - M1[0]) / M1[0]) * 100;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, applies: ZIM, calculator: true,
    stem: `The table shows the money supply of a fictional country.\n\n${T2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: M1[1], stem: "Calculate M1 in 2025 (K million).", wrong: [M3[1]], explanation: `${cash[1]} + ${dem[1].toLocaleString("en-GB")} = ${M1[1].toLocaleString("en-GB")}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: g1, stem: "Calculate the percentage increase in M1 between 2024 and 2025. Give your answer to one decimal place.", wrong: [((M1[1] - M1[0]) / M1[1]) * 100], explanation: `M1 2024 = ${M1[0].toLocaleString("en-GB")}; (${M1[1].toLocaleString("en-GB")} − ${M1[0].toLocaleString("en-GB")}) ÷ ${M1[0].toLocaleString("en-GB")} × 100 = ${pct(g1, 1)}.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why demand deposits may have grown faster than notes and coins.",
        points: [
          "Reason: greater use of electronic payments (cards, mobile money, transfers).",
          "Explained: people and firms keep money in accounts they can pay from, rather than holding cash.",
          "Reason: safety / convenience / shortage of cash / bank lending creating deposits.",
          "Explained: deposits avoid theft and the cost of handling cash; when banks lend, new deposits are created.",
        ],
        modelAnswer: "First, more people now pay by card, transfer or mobile money, so they keep money in accounts rather than as notes. Second, holding cash is risky and inconvenient, and when banks make loans they create new deposits, so deposits can grow faster than cash.",
        explanation: "Electronic payments, safety, bank lending.",
      }),
    ],
    hints: ["M1 = notes and coins + demand deposits.", "Percentage change uses the 2024 figure as the base."],
    explanation: `M1 rose from ${M1[0].toLocaleString("en-GB")} to ${M1[1].toLocaleString("en-GB")} (K million), an increase of ${pct(g1, 1)}, mostly from demand deposits.`,
  });

  b.card("DEFINITION", "Define **barter**.", "The direct exchange of goods and services for other goods and services, without money.");
  b.card("DEFINITION", "What is the **double coincidence of wants**?", "In barter, each trader must want what the other offers, at the same time and in suitable quantities.");
  b.card("DEFINITION", "Define **money**.", "Anything generally accepted as payment for goods and services and in settlement of debts.");
  b.card("CONCEPT", "List the four functions of money.", "Medium of exchange; unit of account (measure of value); store of value; standard of deferred payment.");
  b.card("CONCEPT", "List six characteristics of good money.", "Acceptable, durable, portable, divisible, homogeneous (uniform), limited in supply; also hard to forge and stable in value.");
  b.card("FACT", "Give four forms of money.", "Commodity money; coins and notes; bank deposits; electronic and mobile money.");
  b.card("FORMULA", "M1, M2 and M3 (common textbook definitions)?", "M1 = cash held by public + demand deposits; M2 = M1 + savings/short-term deposits; M3 = M2 + long-term deposits.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Which function of money fails first in hyperinflation?", "Store of value (and then standard of deferred payment and acceptability).");
  b.card("FACT", "Are cheques, cards and mobile-money apps money?", "No: they transfer money held in accounts; the balance is the money.");
});
