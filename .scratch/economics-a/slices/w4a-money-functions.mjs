// W4a: money, functions and characteristics (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, table, prices, pctChange } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.functions-characteristics", { file: "money/functions-characteristics", keyPrefix: "money.functions-characteristics" }, (b) => {
  mc(b, [2, "RECALL"], "Money can be defined as anything that is",
    ["generally accepted as payment for goods and in settlement of debts", "Correct: this is the key test of money."],
    [["produced by the government and held in the banking system for safe keeping", "Government production and bank storage are not the test."],
     ["valuable in itself, such as gold, silver, cattle or other scarce goods", "This describes commodity money only."],
     ["held as wealth and expected to rise in value as time passes", "Wealth is different from money; many assets are not accepted in payment."]],
    "Money is defined by general acceptability as a medium of exchange and in settlement of debts.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The 'double coincidence of wants' is a problem of barter because",
    ["each trader must have what the other wants", "Correct: trade fails unless both sides want the other's goods."],
    [["traders must agree to pay a tax on each exchange", "Taxes are not the problem of barter."],
     ["goods can never be exchanged for other goods", "Goods can be exchanged; the problem is finding a match."],
     ["only one type of good can be traded at a time", "There is no such limit."]],
    "Without money, a trade needs two people who each want what the other has.", { daily: true });

  mc(b, [2, "APPLICATION"], "A shop quotes the price of maize meal as US\\$3 and bread as US\\$1. Which function of money is being used?",
    ["Unit of account", "Correct: prices are stated in money."],
    [["Medium of exchange", "This function concerns the act of payment."],
     ["Store of value", "This concerns saving for the future."],
     ["Standard of deferred payment", "This concerns debts repayable later."]],
    "Quoting prices in a common unit is the unit-of-account function.");

  mc(b, [2, "UNDERSTANDING"], "Every US\\$10 note is worth exactly the same as any other US\\$10 note. This shows which characteristic of money?",
    ["Uniformity", "Correct: one unit is identical to another."],
    [["Divisibility", "This is about making payments in small amounts."],
     ["Durability", "This is about lasting through repeated use."],
     ["Portability", "This is about being easy to carry."]],
    "Uniformity means that every unit of a given value is the same as every other, so it is accepted without inspection.");

  mc(b, [2, "UNDERSTANDING"], "A farmer keeps part of the income from the tobacco crop in a bank account to pay school fees next year. Which function of money is this?",
    ["Store of value", "Correct: money keeps purchasing power for later use."],
    [["Medium of exchange", "The money is not being exchanged now."],
     ["Unit of account", "No prices are being stated."],
     ["Legal tender", "This is not a function of money."]],
    "Holding money to spend later uses it as a store of value.");

  mc(b, [3, "UNDERSTANDING"], "A balance held in a mobile money wallet and transferred by phone is best described as",
    ["electronic money, normally backed by funds held in banks", "Correct: it is a balance rather than notes or coins."],
    [["commodity money, because the balance has a value in use of its own", "Commodity money is a physical good with value in itself."],
     ["fiat money in the form of notes and coins issued by the central bank", "A wallet balance is not a note or a coin."],
     ["barter, because the transfer does not involve notes and coins at all", "Barter involves no money at all."]],
    "Mobile money balances are electronic money, usually matched by deposits in bank accounts.", { hints: ["Is it a physical good, a note or a balance?"] });

  mc(b, [3, "ANALYSIS"], "When inflation is higher than lenders expected, the function of money that is most directly harmed is",
    ["standard of deferred payment, because repayments buy less", "Correct: lenders lose purchasing power."],
    [["unit of account, because prices can no longer be written down in money", "Prices can still be written; they merely change."],
     ["medium of exchange, because shops stop selling goods to all customers", "This is not the main effect of unexpected inflation on lenders."],
     ["legal tender, because notes are no longer printed by the central bank", "Legal tender is a legal status, not a function."]],
    "Debts fixed in money terms are repaid in money that has lost value.", { hints: ["Who gains and who loses when a debt is repaid in less valuable money?"] });

  mc(b, [4, "EVALUATION"], "During very rapid inflation people prefer to hold a more stable foreign currency mainly because it",
    ["keeps its value better, so it works better as a store of value", "Correct: it protects purchasing power."],
    [["is always cheaper for governments to print than the local currency", "The cost of printing is not the reason."],
     ["can be used only for large international purchases and never in shops", "Foreign currency is often used for everyday payments."],
     ["is a commodity with a value in use, such as maize or gold, for traders", "A foreign currency is not a commodity money."]],
    "In hyperinflation the local currency loses its store of value and unit of account functions, and people switch to a currency that is more stable.", { hints: ["Which function is most urgent for savers?"] });

  {
    const n = 12; const r = (n * (n - 1)) / 2; chk(r, 66);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: r, unit: "units", dp: 0, tol: 0.5, hints: ["Number of exchange rates = n(n − 1) ÷ 2."],
      stem: "In a barter economy there are 12 goods. Calculate the number of different exchange rates (one for each pair of goods) needed.",
      wrong: [12, 132, 144], explanation: "n(n − 1) ÷ 2 = 12 × 11 ÷ 2 = 66. Using 12 × 11 without halving gives 132." });
    const v = prices.realValue(1000, 125); chk(v, 800);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v, calculator: true, hints: ["Real value = nominal value ÷ price index × 100."],
      stem: "A household keeps US\\$1,000 in cash for a year. Over the year the price index rises from 100 to 125. Calculate the value of the savings in the prices of the start of the year, in US\\$.",
      wrong: [1250, 875, 975], explanation: "Real value = 1,000 ÷ 125 × 100 = US\\$800. Multiplying by 1.25 gives 1,250." });
    const loan = prices.realValue(6000, 150); chk(loan, 4000);
    const lost = 6000 - loan; chk(lost, 2000);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: lost, calculator: true, hints: ["Find the real value of the repayment first."],
      stem: "A lender gives a loan of US\\$6,000, repayable in full after two years. Over the two years the price index rises from 100 to 150. Calculate the loss of purchasing power to the lender, in US\\$ at the prices of the date of the loan.",
      wrong: [4000, 3000, 900], explanation: "1. Real value of the repayment = 6,000 ÷ 150 × 100 = US\\$4,000.\n2. Loss = 6,000 − 4,000 = US\\$2,000." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true,
    stem: "True or false: barter works only if each trader has something the other trader wants.",
    feedbackTrue: "This is the double coincidence of wants.",
    explanation: "Barter needs a double coincidence of wants; money removes this need." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation with the function of money it illustrates.",
    pairs: [["A shopper pays for fuel with a mobile money transfer", "Medium of exchange"], ["Wages are agreed as US\\$300 a month", "Unit of account"], ["A family saves for a bicycle next year", "Store of value"], ["A loan is repayable in dollars in twelve months", "Standard of deferred payment"]],
    explanation: "Payment is exchange; stating prices or wages is the unit of account; saving is store of value; a debt is a deferred payment." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Money that the law requires creditors to accept in settlement of debts is called {{blank:a}} tender. A balance held on a phone is a form of {{blank:b}} money.",
    blanks: [{ id: "a", accepted: ["legal"], choices: ["legal", "commodity", "barter"] }, { id: "b", accepted: ["electronic"], choices: ["electronic", "commodity", "barter"] }],
    explanation: "Legal tender must be accepted for debts; a phone balance is electronic money." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the exchange of goods for goods without using money?",
    accepted: ["barter", "barter trade", "barter system"], wrong: ["trade credit"],
    explanation: "Barter is the direct exchange of goods and services without money." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Use the key word 'accepted'."],
    stem: "Define money.",
    points: ["Anything that is generally accepted as a medium of exchange.", "And in settlement of debts."],
    modelAnswer: "Money is anything that is generally accepted as a medium of exchange and in settlement of debts.",
    explanation: "General acceptability in exchange and debt settlement." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each problem and explain it."],
    stem: "Explain two problems of barter that money solves.",
    points: ["Double coincidence of wants: a trader must find someone who has what they want and wants what they have.", "Money is accepted by everyone, so a seller can take money and spend it on anything.", "No common measure of value: with n goods there are many exchange rates (n(n − 1) ÷ 2).", "With money every good has one price in money terms, which makes comparison easy."],
    modelAnswer: "Under barter a trader must find someone who has what they want and wants what they have, which is a double coincidence of wants. Money is accepted by everyone, so a seller can take money and spend it on anything. Barter also has no common measure of value, so with n goods there are n(n − 1) ÷ 2 exchange rates, whereas with money each good has one price, which makes comparison easy.",
    explanation: "Two problems, each with how money solves it." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about purchasing power over time."],
    stem: "Explain how inflation reduces the usefulness of money as a store of value.",
    points: ["Inflation is a sustained rise in the general price level.", "Each unit of money buys fewer goods and services over time.", "So savings kept in money lose purchasing power, and people save in other assets or currencies."],
    modelAnswer: "Inflation is a sustained rise in the general price level, so each unit of money buys fewer goods and services as time passes. Savings kept in money therefore lose purchasing power, and people may prefer to hold other assets or a more stable currency.",
    explanation: "Falling purchasing power; loss of value of savings." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think about sellers' behaviour when prices rise quickly."],
    stem: "Analyse why very rapid inflation weakens money as a medium of exchange.",
    points: ["Money loses value each day, so sellers do not want to hold it.", "Sellers raise prices frequently or ask to be paid at once.", "Sellers may refuse the local currency and ask for foreign currency or goods.", "Time and effort are spent on protecting value and on changing prices.", "So the money is accepted less widely and the economy may return to barter or currency substitution."],
    modelAnswer: "When money loses value each day, sellers do not want to hold it, so they raise prices frequently and ask to be paid at once. Some refuse the local currency and ask for foreign currency or goods instead. People spend time and effort protecting the value of their money and changing prices. The money is therefore accepted less widely, and the economy may move towards barter or the use of a foreign currency.",
    explanation: "Loss of value, seller response, refusal, costs, currency substitution." });

  {
    const n = 8; const r = (n * (n - 1)) / 2; chk(r, 28);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Exchange rates = n(n − 1) ÷ 2.", "With money each good has a single price."],
      stem: "**A barter market in a fictional village (illustrative)**\n\nIn a remote village there is no shop that accepts money. Farmers and craftworkers exchange eight main goods directly: maize, beans, groundnuts, chickens, baskets, clay pots, hoes and cloth. A farmer who wants a hoe often has to visit several households before finding a blacksmith who wants maize.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: r, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the number of exchange rates between pairs of the eight goods that would have to be agreed under barter.", wrong: [8, 56, 64], explanation: "8 × 7 ÷ 2 = 28 exchange rates." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: 8, unit: "units", dp: 0, tol: 0.5, stem: "How many prices would be needed if the goods were priced in money?", wrong: [28, 7, 16], explanation: "One price for each good: 8 prices." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain what is meant by the 'double coincidence of wants'.", points: ["Barter needs two traders who each have something the other wants.", "The farmer must find a blacksmith who wants maize, as the example shows."],
          modelAnswer: "A double coincidence of wants means that each of two traders has something that the other wants. In the village the farmer can obtain a hoe only if he finds a blacksmith who wants maize." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how the use of money would make trade in the village easier.",
          points: ["Money is accepted as payment by everyone, so a seller no longer needs to want the buyer's goods.", "The farmer can sell maize for money and use it to buy a hoe from any blacksmith.", "Prices in money allow easy comparison, so trade is quicker and specialisation increases."],
          modelAnswer: "Money is accepted as payment by everyone, so a seller no longer needs to want the buyer's goods. The farmer can sell his maize for money and then use the money to buy a hoe from any blacksmith. Prices in money make comparison easy, so trade is quicker and people can specialise." }),
      ],
      explanation: "28 exchange rates against 8 prices; money removes the need for a double coincidence of wants." });
  }
  {
    const idx = [100, 118, 150, 196, 270];
    const inf5 = ((idx[4] - idx[3]) / idx[3]) * 100; chk(Math.round(inf5 * 10) / 10, 37.8);
    const rv = prices.realValue(2000, idx[4]); chk(Math.round(rv * 100) / 100, 740.74);
    const t1 = table(["Year", "Price index (year 1 = 100)"], idx.map((x, i) => [String(i + 1), x]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Inflation = (new index − old index) ÷ old index × 100.", "Real value = nominal value ÷ price index × 100."],
      stem: `**Money in Zandia during rapid inflation (a fictional economy, illustrative)**\n\nPrices in Zandia have risen faster each year. Shopkeepers change their prices several times a week, and many traders now ask customers to pay in a foreign currency or by mobile money, which can be converted into foreign currency at once. Mrs Moyo kept Z\\$2,000 (Zandia dollars) in cash at home in year 1 to pay for her daughter's school fees later.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: inf5, dp: 1, unit: "%", stem: "Calculate the rate of inflation in year 5, to one decimal place.", wrong: [270, 27.4, 72.6], explanation: "(270 − 196) ÷ 196 × 100 = 37.8%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: rv, dp: 2, stem: "Calculate the value of Mrs Moyo's Z\\$2,000 in year 5, in the prices of year 1 (in Z\\$ to two decimal places).", wrong: [5400, 540, 2000], explanation: "Real value = 2,000 ÷ 270 × 100 = Z\\$740.74." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain which two functions of money are most affected by the situation in Zandia.",
          points: ["Store of value: Mrs Moyo's savings buy only about 37% of what they bought in year 1.", "Because the price level has risen 2.7 times, cash loses purchasing power.", "Medium of exchange: traders ask for foreign currency or mobile money instead of Zandia dollars.", "Because they do not want to hold a currency that loses value quickly."],
          modelAnswer: "The store of value function is most affected: Mrs Moyo's Z\\$2,000 in year 5 buys only about Z\\$740 of the goods she could have bought in year 1, because the price level has risen 2.7 times. The medium of exchange function is also affected, because traders ask for foreign currency or mobile money instead of Zandia dollars since they do not wish to hold a currency that quickly loses value." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether Zandians are right to hold foreign currency or mobile money rather than Zandia dollars.",
          points: ["Foreign currency keeps its value better, so it protects savings and is accepted by traders.", "Mobile money is convenient and can be converted into foreign currency quickly, but a balance in Zandia dollars still loses value.", "Switching reduces demand for the local currency, which weakens the central bank's control and may make the inflation worse.", "Judgement: sensible for individuals, but it shows the need for the government to restore confidence by reducing inflation."],
          modelAnswer: "Foreign currency keeps its value better than Zandia dollars, so holding it protects savings and is accepted by traders. Mobile money is convenient and can be converted quickly into foreign currency, but a mobile balance in Zandia dollars still loses value. However, if everyone switches, the demand for the local currency falls, which weakens the central bank's control and may make the inflation worse. Switching is a sensible choice for individuals, but the underlying problem is high inflation, which the government must tackle to restore confidence in its own money." }),
      ],
      explanation: "Inflation 37.8%; Z\\$2,000 is worth Z\\$740.74 in year 1 prices; store of value and medium of exchange are weakened." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare mobile money and cash on the characteristics of money."],
    stem: "Assess whether mobile money is better than cash as a form of money.",
    points: ["Mobile money is highly portable, and safer than holding large amounts of cash.", "It is divisible and allows payments across distance quickly and cheaply.", "Cash is widely accepted, needs no network, no charges and no account, and works when networks fail.", "Mobile money needs a phone, network and electricity, and customers pay fees.", "Both lose value in the same way if inflation is high.", "Mobile money needs trust in the provider and regulation; cash is legal tender.", "Many people use both.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Mobile money is highly portable and divisible, it is safer than carrying large amounts of cash and it allows quick payments across long distances at low cost, which is a great advantage in a country where distances are long and many people have no bank accounts. Cash, however, is accepted everywhere, needs no phone, network or electricity, carries no charges and works when networks fail. Mobile money relies on trust in the provider and on good regulation, whereas cash is legal tender. Neither protects against inflation, because both balances lose value if prices rise rapidly. Mobile money is better for convenience, safety and distance payments, but cash remains important for small and local purchases and where access is poor, so most people use both.",
    explanation: "Compare on portability, cost, acceptability, reliability, trust and inflation, with a judgement." });

  b.card("DEFINITION", "Define **money**.", "Anything generally accepted as a medium of exchange and in settlement of debts.");
  b.card("DEFINITION", "What is the **double coincidence of wants**?", "The need in barter for two traders who each have something the other wants.");
  b.card("CONCEPT", "What are the four functions of money?", "Medium of exchange, unit of account, store of value and standard of deferred payment.");
  b.card("CONCEPT", "List the characteristics of good money.", "Acceptability, durability, portability, divisibility, uniformity, limited supply and stability of value.");
  b.card("FORMULA", "Number of exchange rates under barter with n goods?", "n(n − 1) ÷ 2.", "With money there are only n prices.");
  b.card("CONCEPT", "Name four forms of money.", "Commodity money, notes and coins, bank deposits, and electronic or mobile money.");
  b.card("DEFINITION", "What is **legal tender**?", "Money that the law requires a creditor to accept in settlement of a debt, within limits set by law.");
  b.card("CONCEPT", "How does inflation affect the standard of deferred payment?", "Debts are repaid in money that has lost value, so lenders lose and borrowers gain.");
  b.card("CONCEPT", "What is currency substitution?", "Using a foreign currency in place of the local currency when the local currency loses value rapidly.");
});
