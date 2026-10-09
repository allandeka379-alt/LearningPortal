// W4a: money, barter and inflation (COM, Form 1).
import { concept, P, money, fmt, r2, round, table } from "../lib.mjs";

concept("bus.finance.money", { file: "finance/money", keyPrefix: "finance.money" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is barter?",
    options: [
      ["Exchanging goods directly for other goods", "Correct: no money is used in the exchange."],
      ["Buying goods on credit from a shop", "Credit still uses money, paid later."],
      ["Paying for goods by mobile money", "Mobile money is a form of money."],
      ["Selling goods by auction to the highest bidder", "An auction sets a money price."],
    ],
    answer: "A",
    explanation: "Barter is the direct exchange of goods or services for other goods or services without money.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the **main** function of money?",
    options: [
      ["Medium of exchange", "Correct: money is accepted in payment, removing the need for a double coincidence of wants."],
      ["Store of value", "A function, but money must first be accepted in exchange."],
      ["Standard of deferred payment", "A function, but it depends on money being accepted."],
      ["Measure of durability", "Durability is a quality of money, not a function."],
    ],
    answer: "A",
    explanation: "Money's main function is to act as a medium of exchange; the other functions follow from it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A farmer with goats wants salt, but one goat is worth far more than the salt he needs. Which problem of barter does this show?",
    options: [
      ["Indivisibility of goods", "Correct: a goat cannot be split into small parts without losing its value."],
      ["Lack of a store of value", "The problem here is the size of the unit, not saving."],
      ["Lack of a standard of deferred payment", "No future payment is involved."],
      ["Lack of durability of salt", "Salt keeps well; this is about dividing the goat."],
    ],
    answer: "A",
    explanation: "Many goods cannot be divided into smaller units to buy low-value items: the problem of indivisibility.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which quality of money means that every note of the same value is identical?",
    options: [
      ["Homogeneity", "Correct: uniform units avoid arguments over quality."],
      ["Portability", "Portability means being easy to carry."],
      ["Durability", "Durability means lasting a long time."],
      ["Divisibility", "Divisibility means splitting into smaller units."],
    ],
    answer: "A",
    explanation: "Homogeneity (uniformity): each unit of the same value is exactly the same.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A loan agreement states that a trader will repay US\\$500 in twelve months' time. Which function of money is shown?",
    options: [
      ["Standard of deferred payment", "Correct: a future payment is stated in money."],
      ["Medium of exchange", "No goods are being bought now."],
      ["Measure of value", "This compares the values of goods today."],
      ["Store of value", "Storing value means keeping savings, not stating a debt."],
    ],
    answer: "A",
    explanation: "Money allows debts and future payments to be stated exactly: the standard of deferred payment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Workers win large wage increases, firms raise prices to cover the higher wage bill, and prices rise across the economy. What type of inflation is this?",
    options: [
      ["Cost-push inflation", "Correct: rising costs of production are passed on as higher prices."],
      ["Demand-pull inflation", "Demand-pull starts with spending growing faster than output."],
      ["Imported inflation", "The cause here is local wages, not import prices."],
      ["Deflation", "Deflation is a fall in the general price level."],
    ],
    answer: "A",
    explanation: "Higher wages raise firms' costs; passing them on in prices is cost-push inflation.",
    hints: ["Did the rise start with costs or with spending?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which group is most likely to **gain** from inflation?",
    options: [
      ["People who borrowed money at a fixed interest rate", "Correct: they repay with money that buys less."],
      ["Pensioners living on a fixed pension", "Their purchasing power falls."],
      ["Savers earning interest below the inflation rate", "The real value of their savings falls."],
      ["Banks that lent money at a fixed interest rate", "Lenders are repaid with money worth less."],
    ],
    answer: "A",
    explanation: "Inflation transfers purchasing power from lenders and savers to borrowers.",
    hints: ["Think about who repays money that is worth less than when it was borrowed."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did cattle make poor money for everyday trade?",
    options: [
      ["They were not portable or divisible", "Correct: hard to carry and impossible to split for small purchases."],
      ["Nobody was willing to accept them", "Cattle were widely accepted; that was their strength."],
      ["Their supply was too strictly limited", "Limited supply is a good quality of money."],
      ["They could be forged too easily", "Forgery was not the problem with cattle."],
    ],
    answer: "A",
    explanation: "Cattle were acceptable but lacked portability, divisibility, uniformity and durability.",
  });
  // Calculations: figures differ from the lesson.
  const old1 = 120, new1 = 129;
  const inf1 = ((new1 - old1) / old1) * 100;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: inf1, calculator: true,
    stem: `A basket of household goods cost ${money(old1)} last year and costs ${money(new1)} this year. Calculate the rate of inflation, to one decimal place.`,
    wrong: [round(((new1 - old1) / new1) * 100, 1), new1 - old1],
    explanation: `Increase = ${fmt(new1)} − ${fmt(old1)} = ${money(new1 - old1)}. Rate = ${new1 - old1} ÷ ${old1} × 100 = ${round(inf1, 1)}%.`,
    workedSolution: `1. Increase in cost = ${fmt(new1)} − ${fmt(old1)} = ${fmt(new1 - old1)}.\n2. Rate of inflation = ${new1 - old1} ÷ ${old1} × 100 = ${round(inf1, 1)}%.`,
    hints: ["Find the increase first.", "Divide by last year's cost, not this year's."],
  });
  const old2 = 64, rate2 = 15;
  const new2 = r2(old2 * (1 + rate2 / 100));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: new2, daily: true,
    stem: `A pair of school shoes costs ${money(old2)}. If its price rises in line with inflation of ${rate2}%, what will it cost next year?`,
    wrong: [r2(old2 * rate2 / 100), old2 + rate2],
    explanation: `${rate2}% of ${fmt(old2)} = ${fmt(r2(old2 * rate2 / 100))}; new price = ${money(new2)}.`,
  });
  const wage3 = 360, rise3 = 20;
  const real3 = r2(wage3 / (1 + rise3 / 100));
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: real3, calculator: true,
    stem: `Tatenda's wage stays at ${money(wage3)} a month while prices rise by ${rise3}%. At last year's prices, how much is his wage now worth?`,
    wrong: [r2(wage3 * (1 - rise3 / 100)), r2(wage3 * (1 + rise3 / 100))],
    explanation: `Goods that cost US\\$1.00 now cost US\\$1.20, so ${fmt(wage3)} ÷ 1.2 = ${money(real3)} at last year's prices.`,
    workedSolution: `1. Each US\\$1.00 of goods now costs US\\$1.${rise3}.\n2. Real value = ${fmt(wage3)} ÷ 1.${rise3} = ${money(real3)}.`,
    hints: ["Divide by 1.2, do not subtract 20%.", "Ask: what does his money buy at old prices?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Acceptability is the most important quality of money.",
    answer: true,
    explanation: "True. If people will not accept it in payment, it cannot work as money at all.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A rise in the price of bread alone is an example of inflation.",
    answer: false,
    explanation: "False. Inflation is a continuing rise in the general level of prices, not in one price.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each quality of money with its meaning.",
    pairs: [
      ["Portability", "Easy to carry, even in large values"],
      ["Durability", "Does not wear out quickly with use"],
      ["Divisibility", "Can be split into smaller units for small purchases"],
      ["Scarcity", "Supply is limited so that money keeps its value"],
    ],
    explanation: "Each quality solves a practical problem of using money.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences about the functions of money.",
    template: "When a shop prices sugar at US\\$1.50 a kilogram, money acts as a {{blank:a}} of value. When Chipo keeps money to spend next year, money acts as a {{blank:b}} of value.",
    blanks: [
      { id: "a", accepted: ["measure"], choices: ["measure", "store", "medium", "standard"] },
      { id: "b", accepted: ["store"], choices: ["measure", "store", "medium", "standard"] },
    ],
    explanation: "Prices measure value; savings store value for later use.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the situation barter requires, in which each trader has exactly what the other wants.",
    accepted: ["double coincidence of wants", "a double coincidence of wants", "coincidence of wants"],
    wrong: ["barter"],
    explanation: "Barter requires a double coincidence of wants.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** problems of barter.",
    points: [
      "Problem identified, e.g. double coincidence of wants (1)",
      "Explained, e.g. finding someone who has what you want and wants what you have wastes time (1)",
      "Second problem identified, e.g. no common measure of value / indivisibility / storing wealth / deferred payment (1)",
      "Explained, e.g. no agreed rate between a goat and bags of maize causes disputes (1)",
    ],
    modelAnswer: "Barter needs a double coincidence of wants: a farmer with groundnuts who wants a hoe must find a blacksmith who wants groundnuts, which wastes time. There is also no common measure of value, so traders argue about how many chickens equal one goat.",
    explanation: "Each problem needs to be named and then explained with its effect on trade.",
    hints: ["Think of a farmer trying to swap a goat for a few small items."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** causes of inflation.",
    points: [
      "Demand-pull: total demand rises faster than output (1)",
      "Explained, e.g. printing money / higher spending with no more goods pushes prices up (1)",
      "Cost-push: higher costs of fuel, power, wages or imported materials (1)",
      "Explained: firms pass higher costs on to customers as higher prices (1)",
    ],
    modelAnswer: "Demand-pull inflation happens when people have more money to spend but output does not increase, for example when the government prints money, so traders raise prices. Cost-push inflation happens when costs such as fuel and wages rise and firms pass the higher costs on in their prices.",
    explanation: "Any two of demand-pull, cost-push, imported inflation and expectations, each explained.",
    hints: ["One cause starts with spending, another with costs."],
  });
  const basket = [["Maize meal (10 kg)", 9, 11], ["Cooking oil (2 litres)", 5, 6], ["Sugar (2 kg)", 3, 3], ["Bread (8 loaves)", 8, 9], ["Soap (4 bars)", 3, 4]];
  const tA = basket.reduce((s, r) => s + r[1], 0), tB = basket.reduce((s, r) => s + r[2], 0);
  const infB = ((tB - tA) / tA) * 100;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Nyasha keeps a record of the cost of the same weekly shopping basket for her family in Kwekwe.\n\n${table(["Item", "Last year US\\$", "This year US\\$"], [...basket, ["Total", tA, tB]])}\n\nNyasha is a pensioner. Her pension has stayed the same, and she keeps her savings in cash at home.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "pct", value: infB, type: "CALCULATION",
        stem: "Calculate the percentage rise in the cost of the basket, to one decimal place.",
        wrong: [round(((tB - tA) / tB) * 100, 1)],
        explanation: `(${tB} − ${tA}) ÷ ${tA} × 100 = ${round(infB, 1)}%.`,
        workedSolution: `1. Increase = ${tB} − ${tA} = ${tB - tA}.\n2. ${tB - tA} ÷ ${tA} × 100 = ${round(infB, 1)}%.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which item's price did **not** change?",
        options: [["Sugar", "Correct: US\\$3 in both years."], ["Maize meal", "It rose from US\\$9 to US\\$11."], ["Bread", "It rose from US\\$8 to US\\$9."], ["Cooking oil", "It rose from US\\$5 to US\\$6."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways in which inflation affects Nyasha.",
        points: [
          "Fixed pension buys less / real income falls (1)",
          "Applied: the same basket costs more each week, so she must cut back (1)",
          "Cash savings lose value / no interest to offset rising prices (1)",
          "Applied: her savings will buy fewer goods next year (1)",
        ],
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Suggest **one** thing Nyasha could do to protect her savings from inflation. Justify your suggestion.",
        points: ["Suggestion, e.g. a savings account / fixed deposit earning interest, or buying assets such as livestock (1)", "Explains how it keeps value, e.g. interest or the asset's value rises with prices (1)", "Justified with a drawback considered, e.g. interest may still be below inflation / safety compared with cash at home (1)"],
      }),
    ],
    explanation: `The basket rose from ${money(tA)} to ${money(tB)}, ${round(infB, 1)}%. A fixed pension and idle cash both lose purchasing power when prices rise.`,
    hints: ["Use the totals for the calculation.", "Think about her pension and her savings separately."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, secs: 600,
    stem: "In a remote village, people still exchange goods by barter. A new trader proposes that everyone uses coins and notes instead.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** qualities that the new money must have.",
        points: ["Acceptability / durability / portability (1)", "Divisibility / homogeneity / scarcity / stability / hard to forge (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how using money would solve **two** problems the villagers face with barter.",
        points: ["Medium of exchange removes the need for a double coincidence of wants (1)", "So trade is faster: sell to anyone, buy from anyone (1)", "Measure of value: all goods priced in money (1)", "So no arguments about rates such as goats for maize (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain **one** reason why some villagers may continue to keep cattle as a store of wealth.",
        points: ["Reason, e.g. cattle may rise in value / produce calves and milk / social status (1)", "Explained, e.g. money may lose value through inflation while cattle keep theirs (1)"],
      }),
    ],
    explanation: "Money solves barter's problems through its functions; cattle remain a store of wealth because they can keep or grow in value.",
    hints: ["Link each problem of barter to a function of money."],
  });
  b.card("DEFINITION", "Barter", "The direct exchange of goods or services for other goods or services without money.");
  b.card("CONCEPT", "Problems of barter", "Double coincidence of wants; no common measure of value; indivisibility; difficulty of storing wealth; no standard for deferred payment.");
  b.card("CONCEPT", "Qualities of good money", "Acceptable, durable, portable, divisible, homogeneous, scarce (limited supply), stable in value, hard to forge.");
  b.card("CONCEPT", "Functions of money", "Medium of exchange, measure of value, store of value, standard of deferred payment.");
  b.card("DEFINITION", "Inflation", "A continuing rise in the general level of prices, so each unit of money buys less.");
  b.card("FORMULA", "Rate of inflation (basket method)", "(Cost this year − cost last year) ÷ cost last year × 100.");
  b.card("CONCEPT", "Demand-pull and cost-push inflation", "Demand-pull: spending grows faster than output. Cost-push: higher costs (fuel, wages, imports) passed on in prices.");
  b.card("FACT", "Winners and losers from inflation", "Losers: fixed-income earners, savers, lenders. Gainers: borrowers (repay with money worth less).");
  b.card("DEFINITION", "Purchasing power", "The amount of goods and services a given sum of money can buy; it falls when prices rise.");
});
