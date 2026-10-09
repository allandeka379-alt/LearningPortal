// W3b: marketing strategy, the marketing mix together.
import { concept, P, money, r2, table } from "../lib.mjs";

// Price cut effect on contribution (calc).
const oldP = 2.5, newP = 2.2, vcU = 1.4, oldQ = 3000, newQ = 3900, extraPromo = 300;
const oldCont = r2((oldP - vcU) * oldQ); // 3300
const newCont = r2((newP - vcU) * newQ - extraPromo); // 2820
const change = r2(newCont - oldCont); // -480
// Revenue change (num): a different business.
const tP0 = 0.8, tP1 = 0.7, tQ0 = 1500, tQ1 = 1900;
const oldRev = r2(tP0 * tQ0); // 1200
const newRev = r2(tP1 * tQ1); // 1330
// Structured: two strategies (sandals).
const opts = [["Current", 9, 1200, 0], ["Option 1: cut price", 7.5, 1600, 0], ["Option 2: more promotion", 9, 1450, 1500]];
const sVc = 4;
const sProfitCont = opts.map(([, p, q, extra]) => r2((p - sVc) * q - extra)); // 6000, 5600, 5750
const sTbl = table(["Plan (per month)", "Price US\\$", "Expected sales (pairs)", "Extra promotion cost US\\$"], opts.map(([n, p, q, e]) => [n, p.toFixed(2), q, e]));

concept("bus.marketing.marketing-strategy", { file: "marketing/marketing-strategy", keyPrefix: "marketing.marketing-strategy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the marketing mix?",
    options: [
      ["The combination of product, price, place and promotion", "Correct: the four Ps."],
      ["The mix of goods a shop keeps in stock", "That is a product range."],
      ["The mix of customers in a market segment", "That describes a segment, not the mix."],
      ["The mix of media used in an advertising campaign", "That is only one part of promotion."],
    ],
    answer: "A",
    explanation: "The marketing mix is the **four Ps**: product, price, place and promotion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which element of the marketing mix is the only one that directly earns revenue?",
    options: [
      ["Price", "Correct: the others cost money."],
      ["Promotion", "Promotion costs money."],
      ["Place", "Distribution costs money."],
      ["Product", "Developing and making the product costs money."],
    ],
    answer: "A",
    explanation: "Revenue = price × quantity sold, so **price** is the element that earns revenue.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which marketing mix is most consistent for an expensive, high-quality leather handbag?",
    options: [
      ["High price, exclusive shops, stylish magazine and social media adverts", "Correct: every P supports a premium image."],
      ["High price, sold through market stalls, leaflets handed out at bus stops", "Place and promotion clash with the premium price."],
      ["Low price, exclusive shops, television adverts", "A low price undermines a luxury image."],
      ["Low price, sold through wholesalers, buy-one-get-one-free offers", "This mix suits a budget product."],
    ],
    answer: "A",
    explanation: "A luxury product needs a high price, exclusive outlets and stylish promotion: one consistent message.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What should a business identify first when designing a marketing strategy?",
    options: [
      ["Its marketing objective and target market", "Correct: the mix is built to reach them."],
      ["The colour of its packaging", "Packaging is decided later, to suit the customers."],
      ["The advertising medium it likes best", "Media are chosen to suit the target market."],
      ["The lowest price it could possibly charge", "Price is set to suit customers and costs."],
    ],
    answer: "A",
    explanation: "Objective and target market come first; each P is then designed for those customers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business launches a budget mobile phone for low-income customers but sells it only in an upmarket shopping mall. Which element of the mix is inconsistent?",
    options: [
      ["Place", "Correct: low-income customers rarely shop there."],
      ["Price", "A low price suits the target market."],
      ["Product", "A budget phone suits the target market."],
      ["Target market", "The target market is not an element of the mix."],
    ],
    answer: "A",
    hints: ["Where do low-income customers usually shop?"],
    explanation: "The outlets do not match the target customers, so **place** is inconsistent with the rest of the mix.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A firm plans to cut its price to raise market share. Which is the most important risk to consider?",
    options: [
      ["Competitors may cut their prices too, so profit falls with little gain in share", "Correct: a price war harms everyone's profit."],
      ["Customers will buy fewer units of the product at the lower price", "Lower prices usually increase quantity demanded."],
      ["The product will move straight into the decline stage of its life cycle", "A price cut does not change the stage directly."],
      ["Its promotion costs will automatically fall to zero", "The firm still needs to tell customers about the cut."],
    ],
    answer: "A",
    hints: ["How might rivals react?"],
    explanation: "Price cuts reduce profit per unit and may start a price war, so the expected gain in share may not happen.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A seller of school uniforms runs reminder adverts, offers a small discount to returning customers and sells through many shops. Which stage of the product life cycle does this mix best suit?",
    options: [
      ["Maturity", "Correct: reminder promotion and loyalty offers suit an established product."],
      ["Introduction", "Introduction needs informative promotion."],
      ["Development", "The product is not yet on sale during development."],
      ["Decline with plans to withdraw", "A firm withdrawing would cut promotion."],
    ],
    answer: "A",
    explanation: "Maturity: wide distribution, reminder advertising and offers to keep customers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The four Ps of the marketing mix are product, price, place and promotion.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a product is of very high quality, the other three Ps of the marketing mix do not matter.",
    answer: false,
    explanation: "False. Customers must be able to afford it (price), find it (place) and know about it (promotion).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each marketing decision with the element of the marketing mix it belongs to.",
    pairs: [
      ["Selling through a national chain of supermarkets", "Place"],
      ["Launching a smaller pack size", "Product"],
      ["Charging less than the main rival", "Price"],
      ["Sponsoring a school sports day", "Promotion"],
    ],
    explanation: "Each decision changes one of the four Ps.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A marketing strategy combines the four Ps to meet the needs of the {{blank:a}} market and achieve a marketing {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["target"], wrong: "global" },
      { id: "b", accepted: ["objective", "objectives", "aim", "goal"], wrong: "budget" },
    ],
    explanation: "Strategy = the mix designed for a target market to achieve an objective.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A tuck shop sells ${tQ0.toLocaleString("en-GB")} cold drinks a month at ${money(tP0)}. After cutting the price to ${money(tP1)}, it sells ${tQ1.toLocaleString("en-GB")}. Calculate the increase in monthly sales revenue.`,
    kind: "money", value: r2(newRev - oldRev), wrong: [tQ1 - tQ0, r2((tP0 - tP1) * tQ0)],
    hints: ["Revenue = price × quantity, before and after."],
    explanation: `Before: ${money(tP0)} × ${tQ0.toLocaleString("en-GB")} = ${money(oldRev)}. After: ${money(tP1)} × ${tQ1.toLocaleString("en-GB")} = ${money(newRev)}. Increase = ${money(r2(newRev - oldRev))}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A bakery sold ${oldQ.toLocaleString("en-GB")} loaves a month at ${money(oldP)}. It cut the price to ${money(newP)} and now sells ${newQ.toLocaleString("en-GB")} loaves. Its variable cost is ${money(vcU)} a loaf, and to support the price cut it spends an extra ${money(extraPromo)} a month on promotion. Calculate by how much the bakery's monthly profit falls. (Fixed costs do not change.)`,
    kind: "money", value: -change, wrong: [r2(newP * newQ - oldP * oldQ), r2(oldCont - (newP - vcU) * newQ)],
    hints: ["Find (price − variable cost) × quantity before and after, and subtract the extra promotion after."],
    explanation: `Before: (${money(oldP)} − ${money(vcU)}) × ${oldQ.toLocaleString("en-GB")} = ${money(oldCont)}. After: (${money(newP)} − ${money(vcU)}) × ${newQ.toLocaleString("en-GB")} − ${money(extraPromo)} = ${money(newCont)}. Profit falls by ${money(-change)}, even though revenue rose from ${money(r2(oldP * oldQ))} to ${money(r2(newP * newQ))}.`,
    workedSolution: `1. Contribution before = (${oldP.toFixed(2)} − ${vcU.toFixed(2)}) × ${oldQ.toLocaleString("en-GB")} = ${oldCont.toLocaleString("en-GB")}.\n2. Contribution after = (${newP.toFixed(2)} − ${vcU.toFixed(2)}) × ${newQ.toLocaleString("en-GB")} = ${r2((newP - vcU) * newQ).toLocaleString("en-GB")}.\n3. Less extra promotion ${extraPromo}: ${newCont.toLocaleString("en-GB")}.\n4. Fall in profit = ${oldCont.toLocaleString("en-GB")} − ${newCont.toLocaleString("en-GB")} = ${money(-change)} (fixed costs unchanged).`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain why it is important for the elements of the marketing mix to be consistent with each other. Use an example.",
    points: [
      "The four Ps should send one message / suit the same target market.",
      "Inconsistency confuses customers or fails to reach them.",
      "Example of an inconsistent mix, e.g. luxury product sold cheaply in market stalls.",
      "Effect explained, e.g. damages brand image / target customers do not see or trust it, so sales fall.",
    ],
    hints: ["Think of a premium product sold in the wrong place or at the wrong price."],
    modelAnswer: "All four Ps should suit the same target customers and send the same message. If an expensive perfume were sold at a discount from a market stall, wealthy buyers would doubt its quality and would not see it where they shop, so sales and the brand image would suffer.",
    explanation: "A consistent mix reinforces one image to one target market.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Chipo's workshop in Gweru makes leather sandals with a variable cost of ${money(sVc)} a pair. She wants to increase profit and is considering two plans.\n\n${sTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the monthly contribution (price minus variable cost, times sales) for the current plan.",
        kind: "money", value: sProfitCont[0], wrong: [opts[0][1] * opts[0][2], r2(opts[0][1] - sVc)],
        explanation: `(${money(opts[0][1])} − ${money(sVc)}) × ${opts[0][2].toLocaleString("en-GB")} = ${money(sProfitCont[0])}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the monthly contribution for Option 1.",
        kind: "money", value: sProfitCont[1], wrong: [r2(opts[1][1] * opts[1][2]), sProfitCont[0]],
        explanation: `(${money(opts[1][1])} − ${money(sVc)}) × ${opts[1][2].toLocaleString("en-GB")} = ${money(sProfitCont[1])}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the monthly contribution for Option 2, after the extra promotion cost.",
        kind: "money", value: sProfitCont[2], wrong: [r2((opts[2][1] - sVc) * opts[2][2]), sProfitCont[0]],
        explanation: `(${money(opts[2][1])} − ${money(sVc)}) × ${opts[2][2].toLocaleString("en-GB")} − ${money(opts[2][3])} = ${money(sProfitCont[2])}.`,
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Evaluate whether Chipo should choose Option 1, Option 2 or neither.",
        points: ["Uses results: both options give lower contribution than now in the first month.", "Option 1: more customers but lower margin; risk of price war; may damage quality image.", "Option 2: builds brand awareness; benefit may last beyond the month (long-term sales growth).", "Sales forecasts are estimates / may be wrong.", "Considers other ways, e.g. new products, new outlets, targeted cheaper promotion.", "Justified conclusion."],
        modelAnswer: `On these forecasts neither option raises profit: contribution falls from ${money(sProfitCont[0])} to ${money(sProfitCont[1])} with the price cut and to ${money(sProfitCont[2])} with extra promotion. The price cut also risks a price war and may make her sandals look cheaper. Extra promotion costs money now, but brand awareness may raise sales for several months, so Option 2 could pay back later, unlike a price cut that lowers every future sale's margin. Because the sales figures are only estimates, Chipo should not cut her price; she could try a smaller, targeted promotion and measure the result before spending the full US\\$1,500.`,
      }),
    ],
    hints: ["(a)-(c) (Price − variable cost) × pairs, minus any extra promotion.", "(d) Compare the three results, then think beyond one month."],
    explanation: `(a) ${money(sProfitCont[0])}. (b) ${money(sProfitCont[1])}. (c) ${money(sProfitCont[2])}. (d) A justified judgement; neither option raises contribution in the first month.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Sipho has developed a new range of healthy breakfast cereals made from sorghum and millet, grown by farmers in Matabeleland. Market research shows that health-conscious, working adults in Harare and Bulawayo are interested, but they do not know the brand. Sipho has a limited budget.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify Sipho's target market.", points: ["Health-conscious adults.", "Working, living in Harare and Bulawayo (urban)."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how Sipho could use **two** elements of the marketing mix, other than price, to reach this target market.",
        points: ["Element 1 identified with an action, e.g. product: attractive pack stating health benefits and local grains.", "Explained / applied to health-conscious urban buyers.", "Element 2 identified with an action, e.g. place: supermarkets and health shops in city suburbs / online; or promotion: social media, tastings in supermarkets.", "Explained / applied to working adults (convenience, media they use)."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Recommend a price strategy for the cereals. Justify your answer.",
        points: ["Option: skimming/premium price, fits a health brand and target buyers' incomes.", "Drawback: unknown brand, buyers may not try it at a high price.", "Option: penetration price to encourage trial.", "Drawback: low margin, hard to raise later, may suggest low quality.", "Links to limited budget / costs of local grains / competitors' prices.", "Justified recommendation consistent with the rest of the mix."],
        modelAnswer: "A premium price fits a healthy, locally sourced product sold to working adults with good incomes, and supports a quality image. But the brand is unknown, so few may try it. A penetration price would encourage trial, but would earn little on a limited budget, would be hard to raise later and might suggest low quality. Sipho should set a price slightly above ordinary cereals, consistent with the health image, and use free tastings in supermarkets to encourage trial instead of a low price.",
      }),
    ],
    hints: ["(a) Who and where.", "(c) The price must fit the product, the customers and the rest of the mix."],
    explanation: "The mix must target health-conscious urban adults consistently, with a price that supports the image while encouraging trial.",
  });
  b.card("DEFINITION", "Marketing mix?", "The combination of product, price, place and promotion used to meet the needs of a target market.");
  b.card("DEFINITION", "Marketing strategy?", "A plan combining the four Ps to achieve a marketing objective for a target market.");
  b.card("CONCEPT", "Why must the four Ps be consistent?", "They should send one message to one target market; a mismatch confuses customers or fails to reach them.");
  b.card("CONCEPT", "Mix for a luxury product?", "High price, exclusive outlets, stylish promotion in media wealthy customers use, premium packaging.");
  b.card("CONCEPT", "Mix for a budget product?", "Low price, wide distribution through many outlets, simple or price-based promotion.");
  b.card("FACT", "Steps in building a marketing strategy?", "Set objective → identify target market → design each P → check fit and cost → review results.");
  b.card("CONCEPT", "Evaluating a marketing mix?", "Fit with the target market, consistency, effect on sales, costs and profit, competitors' reactions, affordability.");
  b.card("CONCEPT", "Why can a price cut raise revenue but lower profit?", "Each unit earns less above variable cost; the extra sales may not make up for the lower margin and extra costs.");
});
