// W3a: changing markets and market share (Cambridge 0264 only).
import { concept, P, f, money, fmt, round, table } from "../lib.mjs";

concept("bus.marketing.market-changes", { file: "marketing/market-changes", keyPrefix: "marketing.market-changes" }, (b) => {
  // Figures differ from the lesson's worked examples.
  const sQ = 26000, mQ = 160000;
  const sA = 31500, mA = 180000, msA = f.marketShare(sA, mA);
  const unitsB = 4900, mktUnits = 35000, msB = f.marketShare(unitsB, mktUnits);
  const sC = 52000, mC = 650000, msC = f.marketShare(sC, mC);
  // Data for structured item.
  const y = { b1: 64000, m1: 400000, b2: 70000, m2: 560000 };
  const msY1 = f.marketShare(y.b1, y.m1), msY2 = f.marketShare(y.b2, y.m2);

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is market share?",
    options: [
      ["The percentage of total market sales achieved by one business", "Correct: it compares the business with the whole market."],
      ["The total value of sales made by all businesses in the market", "That is market size."],
      ["The number of shareholders in a company", "That has nothing to do with market share."],
      ["The profit a business makes on each sale", "That is a profit margin idea."],
    ],
    answer: "A",
    explanation: "**Market share** = sales of the business ÷ total market sales × 100.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a reason why consumer spending patterns change?",
    options: [
      ["Changes in consumers' incomes", "Correct: income changes what people can afford."],
      ["A change in the business's opening hours only", "This affects one business, not spending patterns generally."],
      ["The colour of a firm's delivery vans", "This is unlikely to change spending patterns."],
      ["The number of directors of a company", "This does not affect what consumers buy."],
    ],
    answer: "A",
    explanation: "Income, tastes, technology, population and prices change spending patterns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the most likely reason for a market becoming more competitive?",
    options: [
      ["New businesses enter the market", "Correct: more sellers compete for customers."],
      ["A business closes down", "Fewer sellers mean less competition."],
      ["Customers become less informed about prices", "Less information reduces competition."],
      ["Import restrictions are increased", "Restrictions keep foreign rivals out."],
    ],
    answer: "A",
    explanation: "New entrants, imports, e-commerce and better-informed customers increase competition.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A clothing shop's sales rose by 10% last year, but the total market grew by 25%. What happened to its market share?",
    options: [
      ["It fell", "Correct: the market grew faster than the shop's sales."],
      ["It rose", "Its sales grew more slowly than the market."],
      ["It stayed the same", "Shares change when growth rates differ."],
      ["It cannot have changed because sales rose", "Rising sales do not guarantee a higher share."],
    ],
    answer: "A",
    explanation: "When the market grows faster than a business's sales, its market share falls.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "More customers are buying groceries through mobile apps. Which response by a supermarket is most suitable?",
    options: [
      ["Offering online ordering with delivery", "Correct: it adapts the channel of distribution."],
      ["Closing its tills earlier each day", "This reduces service."],
      ["Raising prices in its shops", "This does not respond to the change."],
      ["Stopping all advertising", "This makes the business less visible."],
    ],
    answer: "A",
    explanation: "Changing how products reach customers is a key response to changing spending patterns.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `A business sells ${fmt(sQ)} US dollars' worth of cooking oil in a market worth ${fmt(mQ)} US dollars. A student calculates its market share as ${round((mQ / sQ) * 100, 1)}%. What mistake has the student made?`,
    options: [
      ["Dividing the market sales by the business's sales", "Correct: the division is the wrong way round."],
      ["Forgetting to multiply the answer by 100 at the end", "The answer was multiplied by 100."],
      ["Using profit instead of sales", "No profit figure was given."],
      ["Using units instead of value", "Both figures are values."],
    ],
    answer: "A",
    hints: ["Can a market share be more than 100%?"],
    explanation: `Correct share = ${fmt(sQ)} ÷ ${fmt(mQ)} × 100 = ${round(f.marketShare(sQ, mQ), 1)}%. A share above 100% shows the division was reversed.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business with a high market share find it easier to persuade supermarkets to stock its products?",
    options: [
      ["Its brand is well known, so supermarkets expect it to sell", "Correct: retailers want products that sell quickly."],
      ["It always charges the highest prices", "High share does not mean high prices."],
      ["It has no competitors at all", "A high share still allows competitors."],
      ["Supermarkets are legally required to stock the market leader", "No such requirement exists."],
    ],
    answer: "A",
    hints: ["What does a supermarket want from the products on its shelves?"],
    explanation: "Market leaders have recognised brands that sell well, which helps them win shelf space.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business's sales can rise while its market share falls.",
    answer: true,
    explanation: "True. If the market grows faster than the business's sales, its share falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Growing use of e-commerce usually makes markets less competitive.",
    answer: false,
    explanation: "False. E-commerce lets customers compare prices and buy from distant sellers, so competition increases.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", kind: "pct", value: msA, calculator: true,
    stem: `A fictional cooking-oil producer had sales of ${money(sA)} last year. Total sales of cooking oil in the market were ${money(mA)}. Calculate its market share (to one decimal place).`,
    wrong: [round((mA / sA) * 100, 1)],
    explanation: `Market share = ${fmt(sA)} ÷ ${fmt(mA)} × 100 = ${round(msA, 1)}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: msB, calculator: true,
    stem: `A bicycle importer in Bulawayo sold ${fmt(unitsB)} bicycles last year. A total of ${fmt(mktUnits)} bicycles were sold in Zimbabwe by all sellers (assume these figures). Calculate the importer's market share by volume (to one decimal place).`,
    wrong: [round(unitsB / mktUnits, 1), round((mktUnits / unitsB) * 100, 1)],
    hints: ["Use units for both figures."],
    explanation: `Market share = ${fmt(unitsB)} ÷ ${fmt(mktUnits)} × 100 = ${round(msB, 1)}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: mC, calculator: true,
    stem: `A paint manufacturer has a market share of ${round(msC, 1)}% and sales of ${money(sC)}. Calculate the total value of the paint market.`,
    wrong: [round((sC * msC) / 100, 2)],
    hints: ["Rearrange: total market = sales ÷ market share × 100."],
    explanation: `Total market = ${fmt(sC)} ÷ ${round(msC, 1)} × 100 = ${money(mC)}.`,
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each change with the most suitable business response.",
    pairs: [
      ["Customers want healthier food", "Develop low-sugar and wholegrain products"],
      ["Cheaper imports arrive in the market", "Cut costs to compete on price"],
      ["More customers shop online", "Sell through a website or app"],
      ["Rivals offer better service", "Train staff in customer care"],
    ],
    explanation: "Responses should match the change: new products, lower costs, new channels or better service.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula.",
    template: "Market share (%) = sales of the {{blank:a}} ÷ total {{blank:b}} sales × 100",
    blanks: [
      { id: "a", accepted: ["business"], choices: ["business", "market"] },
      { id: "b", accepted: ["market"], choices: ["market", "business"] },
    ],
    explanation: "Divide the business's sales by the total sales in the market.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why consumer spending patterns may change.",
    points: [
      "Reason 1, e.g. change in income.",
      "Explained: e.g. lower incomes lead to smaller packs / cheaper brands.",
      "Reason 2, e.g. new technology / tastes / population.",
      "Explained: e.g. smartphones increase online buying.",
    ],
    hints: ["Think about money, fashion and technology."],
    modelAnswer: "If incomes fall, consumers buy smaller packs and cheaper brands instead of branded goods. New technology such as smartphones also changes how people buy, with more paying by mobile money and shopping online.",
    explanation: "Income, tastes, technology, population, prices and social concerns.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900, calculator: true,
    stem: `Rudo owns Mapepa Juices, which sells fruit juice in Harare. Two new juice brands and several imported brands have entered the market in the past year.\n\n${table(["", "2024", "2025"], [["Mapepa Juices sales US\\$", y.b1, y.b2], ["Total market sales US\\$", y.m1, y.m2]], { title: "Juice market data" })}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "pct", value: msY1, type: "CALCULATION",
        stem: "Calculate Mapepa Juices' market share in 2024 (to one decimal place).",
        wrong: [round((y.m1 / y.b1) * 100, 1)],
        explanation: `${fmt(y.b1)} ÷ ${fmt(y.m1)} × 100 = ${round(msY1, 1)}%.`,
        workedSolution: `1. Market share = sales ÷ market sales × 100.\n2. ${fmt(y.b1)} ÷ ${fmt(y.m1)} × 100 = ${round(msY1, 1)}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "pct", value: msY2, type: "CALCULATION",
        stem: "Calculate Mapepa Juices' market share in 2025 (to one decimal place).",
        wrong: [round(msY1, 1)],
        explanation: `${fmt(y.b2)} ÷ ${fmt(y.m2)} × 100 = ${round(msY2, 1)}%.`,
        workedSolution: `1. ${fmt(y.b2)} ÷ ${fmt(y.m2)} × 100 = ${round(msY2, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain what the results show about Mapepa Juices' performance.",
        points: ["Sales rose but market share fell.", "The market / competitors grew faster than Mapepa."],
        modelAnswer: `Sales rose from ${money(y.b1)} to ${money(y.b2)}, but market share fell from ${round(msY1, 1)}% to ${round(msY2, 1)}% because the market and competitors grew faster.`,
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend **one** way Rudo should respond to the increased competition. Justify your answer.",
        points: [
          "Option, e.g. new flavours / healthier juice from research.",
          "Option, e.g. lower costs and prices / promotion on social media / new outlets (schools, offices).",
          "Links to case: new local and imported brands; growing market.",
          "Advantage of chosen option.",
          "Drawback / cost of chosen option.",
          "Justified recommendation.",
        ],
        modelAnswer: "The juice market is growing fast, but new local and imported brands are taking most of the growth. Rudo could cut prices, but imported brands may have lower costs, so a price war could cut her profit. A better response is market research into what customers want, followed by new products such as low-sugar juices in small packs sold through schools and offices. This costs money for research and development, but it gives Mapepa a point of difference from imports. I recommend this, because it lets Rudo share in the market's growth without relying on lower prices.",
      }),
    ],
    hints: ["Market share = sales ÷ market × 100.", "(c) Compare sales growth with market growth."],
    explanation: `Market share fell from ${round(msY1, 1)}% to ${round(msY2, 1)}% even though sales rose; the response should help the business compete in a growing, crowded market.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai owns a chain of three stationery shops in Mutare. Over five years, customers have started to buy more school supplies online and from supermarkets, and fewer people buy printed greeting cards. His sales have fallen each year.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** changes in spending patterns in the case.",
        points: ["More buying online / from supermarkets.", "Fewer printed greeting cards bought."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** reasons why the market for school supplies may have become more competitive.",
        points: [
          "Supermarkets now sell school supplies.",
          "More sellers competing for the same customers.",
          "Online sellers / e-commerce let customers compare prices.",
          "Customers switch to the cheapest or most convenient seller.",
        ],
        modelAnswer: "Supermarkets now sell school supplies, so there are more sellers competing for the same customers. Online sellers let customers compare prices easily and buy from home, so they switch to the cheapest or most convenient seller.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate how Farai should respond to these changes.",
        points: [
          "Sell online / take orders by phone or messaging with delivery.",
          "Change product range (e.g. printing, school book lists, office supplies) away from cards.",
          "Better service / specialist advice supermarkets cannot give.",
          "Close one shop to cut costs.",
          "Costs and risks of each response.",
          "Justified conclusion.",
        ],
        modelAnswer: "Farai could take school-list orders by messaging and deliver, matching the convenience of online sellers. He could replace greeting cards with services supermarkets do not offer, such as printing and photocopying, and give specialist advice. Closing one shop would cut costs but might lose customers in that area. Selling online requires time and delivery costs, but customers are clearly moving that way. The best response is to combine online ordering with new services in his best two shops, closing the weakest shop if sales do not recover.",
      }),
    ],
    hints: ["(c) Match each response to a change in the case."],
    explanation: "Businesses respond to changing markets with new channels, new products and cost control.",
  });
  b.card("DEFINITION", "What is **market share**?", "The percentage of total market sales achieved by one business or brand.");
  b.card("FORMULA", "Market share formula?", "Market share (%) = sales of the business ÷ total market sales × 100.");
  b.card("FACT", "Why do spending patterns change?", "Income, tastes and fashion, technology, population, prices of other goods, social and environmental concerns.");
  b.card("FACT", "Why do markets become more competitive?", "New entrants, imports and globalisation, e-commerce, lower start-up barriers, better-informed customers.");
  b.card("CONCEPT", "How can businesses respond to changing markets?", "Research, new products, better quality and service, lower costs, new promotion, new channels, new markets.");
  b.card("CONCEPT", "Can sales rise while market share falls?", "Yes, if the total market grows faster than the business's sales.");
  b.card("CONCEPT", "Why does market share matter?", "Shows performance against rivals; leaders gain brand recognition, shelf space and economies of scale.");
  b.card("DEFINITION", "What is **market size**?", "Total sales of all businesses in a market over a period, by value or volume.");
});
