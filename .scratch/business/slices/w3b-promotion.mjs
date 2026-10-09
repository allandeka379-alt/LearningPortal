// W3b: promotion, advertising and sales promotion.
import { concept, P, COM, BES, CAM, money, table, r2, round } from "../lib.mjs";

// Cost per person reached.
const radioCost = 480, radioReach = 12000;
const perPerson = radioCost / radioReach; // 0.04
// Promotion worth it? extra units × profit per unit vs cost.
const extraUnits = 650, gpPerUnit = 1.2, promoCost = 600;
const extraProfit = r2(extraUnits * gpPerUnit - promoCost); // 180
// Structured: compare two media.
const media = [["Local radio (4 weeks)", 900, 30000], ["Leaflets delivered to homes", 350, 5000], ["Paid social media adverts (4 weeks)", 400, 16000]];
const mTbl = table(["Method", "Cost US\\$", "People expected to see it"], media);
const costPer = media.map(([, c, n]) => c / n); // 0.03, 0.07, 0.025
const discountPct = 15, normal = 12;
const offerPrice = r2(normal * (1 - discountPct / 100)); // 10.20

concept("bus.marketing.promotion", { file: "marketing/promotion", keyPrefix: "marketing.promotion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a method of sales promotion?",
    options: [
      ["A free sample of a new shampoo", "Correct: a short-term incentive to try the product."],
      ["A television advertisement", "That is advertising through a medium."],
      ["A billboard beside a main road", "That is advertising."],
      ["A newspaper advertisement", "That is advertising."],
    ],
    answer: "A",
    explanation: "Sales promotion = short-term incentives: samples, offers, coupons, competitions, loyalty schemes.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main aim of informative advertising?",
    options: [
      ["To give customers facts about a product", "Correct: what it is, what it does, price, where to buy."],
      ["To link a product to an attractive lifestyle", "That is persuasive advertising."],
      ["To reduce the price of a product for a short time", "That is a sales promotion."],
      ["To compare the product unfavourably with rivals", "Comparison is competitive advertising."],
    ],
    answer: "A",
    explanation: "Informative advertising gives **facts**; persuasive advertising creates desire.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A supermarket gives customers one point for every US\\$1 spent, which can later be exchanged for groceries. Which promotion method is this?",
    options: [
      ["A loyalty scheme", "Correct: it rewards repeat purchases."],
      ["A free sample", "No product is given to try."],
      ["Persuasive advertising", "This is an incentive, not an advert."],
      ["A competition", "There is no prize to win by chance or skill."],
    ],
    answer: "A",
    explanation: "Loyalty and reward schemes encourage customers to keep returning.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A seed company wants to reach small-scale farmers in rural areas, many of whom have no internet access. Which advertising medium is most suitable?",
    options: [
      ["Radio", "Correct: radio reaches rural listeners cheaply."],
      ["Paid adverts on a social media site", "Many target farmers have no internet access."],
      ["A billboard in a city centre", "Rural farmers will rarely see it."],
      ["A website with an online shop", "Many target customers have no internet."],
    ],
    answer: "A",
    explanation: "Choose a medium the target customers actually use; radio has wide rural reach.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of television advertising for a small business?",
    options: [
      ["It is very expensive to make and broadcast", "Correct: most small firms cannot afford it."],
      ["It cannot show pictures of the product", "Television shows pictures and movement."],
      ["It reaches only a few people", "It reaches a large audience."],
      ["Its messages cannot include sound", "Television has sound."],
    ],
    answer: "A",
    explanation: "Television is powerful but costly; small businesses usually choose cheaper media.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the main risk of using price offers too often?",
    options: [
      ["Customers wait for offers and the brand may look cheap", "Correct: regular offers lower the value customers place on the brand."],
      ["Sales rise permanently and stock runs out", "Sales from offers are usually temporary."],
      ["Advertising becomes completely unnecessary for the brand", "Offers still need to be communicated."],
      ["The business is forced to raise its prices", "Offers lower prices; they do not force a rise."],
    ],
    answer: "A",
    hints: ["What do customers learn if a product is always on offer?"],
    explanation: "Sales promotion works quickly but temporarily; constant offers damage profit and brand image.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "What is the main advantage of targeted online advertising compared with a newspaper advert?",
    options: [
      ["It reaches mainly people likely to buy, and results can be measured", "Correct: less money wasted on people outside the target market."],
      ["It reaches every adult in the whole country at exactly the same time", "It is aimed at chosen groups, not everyone."],
      ["It needs no information about the people who see it", "Targeting uses data about users."],
      ["Customers cannot ignore it or switch it off", "Online adverts are often ignored or blocked."],
    ],
    answer: "A",
    hints: ["Think about who sees the advert and what the business can count."],
    explanation: "Targeted adverts are shown to chosen groups, and clicks or responses can be counted.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Beef producers jointly pay for adverts encouraging people to eat more beef. What type of advertising is this?",
    options: [
      ["Generic (collective) advertising", "Correct: a whole industry promotes its product, not one brand."],
      ["Competitive advertising", "No brand is compared with a rival brand."],
      ["Sales promotion by one butcher", "It is advertising by the whole industry."],
      ["Informative advertising by a retailer", "It is paid for by producers jointly."],
    ],
    answer: "A",
    explanation: "**Generic / collective** advertising promotes a whole product type; competitive advertising promotes one brand against rivals.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sales promotion usually increases sales only for a short time.",
    answer: true,
    explanation: "True. Sales often fall back when the offer ends.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Persuasive advertising mainly gives customers facts such as the price and opening hours.",
    answer: false,
    explanation: "False. That is informative advertising. Persuasive advertising tries to create a desire to buy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each promotion method with its main purpose.",
    pairs: [
      ["Free tasting of a new biscuit in a supermarket", "Encourage customers to try a new product"],
      ["Points card exchanged for discounts", "Encourage repeat purchases"],
      ["\"Buy two, get one free\" on old stock", "Clear stock quickly"],
      ["Eye-catching display next to the till", "Encourage impulse buying"],
      ["Reminder adverts on billboards for a well-known drink", "Keep an established brand in customers' minds"],
    ],
    explanation: "Each method suits a different promotional aim.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the AIDA model for designing an advertisement.",
    template: "Attention, {{blank:a}}, Desire, {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["interest"], wrong: "information" },
      { id: "b", accepted: ["action"], wrong: "advertising" },
    ],
    explanation: "AIDA: Attention, Interest, Desire, Action.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `A shop sells a school bag for ${money(normal)}. It offers ${discountPct}% off for one week. Calculate the offer price.`,
    kind: "money", value: offerPrice, wrong: [r2(normal * discountPct / 100), r2(normal * (1 + discountPct / 100))],
    explanation: `${money(normal)} × (1 − 0.${discountPct}) = ${money(offerPrice)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A radio advert costs ${money(radioCost)} and is expected to reach ${radioReach.toLocaleString("en-GB")} listeners. Calculate the cost per listener reached, in US dollars.`,
    kind: "money", value: perPerson, wrong: [radioReach / radioCost, r2(radioCost / 1200)],
    hints: ["Divide the cost by the number of listeners."],
    explanation: `${money(radioCost)} ÷ ${radioReach.toLocaleString("en-GB")} = ${money(perPerson)} per listener (4 cents).`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A bakery spends ${money(promoCost)} on a promotion. It sells ${extraUnits} extra cakes as a result, each giving a gross profit of ${money(gpPerUnit)}. Calculate the extra profit the promotion made, after paying for it.`,
    kind: "money", value: extraProfit, wrong: [r2(extraUnits * gpPerUnit), r2(extraUnits * gpPerUnit + promoCost)],
    hints: ["Extra gross profit from the extra sales, minus the cost of the promotion."],
    explanation: `Extra gross profit = ${extraUnits} × ${money(gpPerUnit)} = ${money(r2(extraUnits * gpPerUnit))}. Less cost ${money(promoCost)} = ${money(extraProfit)}.`,
    workedSolution: `1. Extra gross profit = ${extraUnits} × ${gpPerUnit.toFixed(2)} = ${r2(extraUnits * gpPerUnit).toLocaleString("en-GB")}.\n2. Extra profit after the cost = ${r2(extraUnits * gpPerUnit).toLocaleString("en-GB")} − ${promoCost} = ${money(extraProfit)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION", applies: BES,
    stem: "Nyasha is opening a juice bar near a college in Masvingo. Describe the content of a leaflet advertising the opening, using the AIDA model.",
    points: [
      "Attention: headline or picture, e.g. \"Grand opening! Fresh juice from US\\$0.50\".",
      "Interest: what is sold / fresh, healthy, made in front of you.",
      "Desire: a reason to come now, e.g. opening offer / student discount / free tasting.",
      "Action: address near the college, opening hours, contact or how to order.",
    ],
    hints: ["One point for each letter of AIDA, applied to the juice bar."],
    modelAnswer: "A bold headline \"Grand opening: fresh juice near the college\" with a colourful picture of juices gets attention. The text explains that juices are made fresh from local fruit (interest). A free juice for the first 50 students and a student discount create desire. The address, opening hours and WhatsApp number tell students how to act.",
    explanation: "AIDA: attention, interest, desire, action, applied to the business.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Farai has opened a new driving school in Kwekwe. His target customers are young adults and workers in the town. He has a promotion budget of US\\$800 for the next month and is considering the options below.\n\n${mTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the cost per person expected to see the leaflets, in US dollars.",
        kind: "money", value: costPer[1], wrong: [r2(media[1][2] / media[1][1]), r2(media[1][1] / 1000)],
        explanation: `${money(media[1][1])} ÷ ${media[1][2].toLocaleString("en-GB")} = ${money(costPer[1])}.`,
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Which method has the lowest cost per person expected to see it?",
        options: [["Paid social media adverts", "Correct: US\\$0.025 per person."], ["Local radio", "US\\$0.03 per person."], ["Leaflets delivered to homes", "US\\$0.07 per person."], ["All three cost the same per person", "The costs per person differ."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain **one** disadvantage of choosing a method only because it reaches many people cheaply.",
        points: ["Many of those reached may not be in the target market.", "e.g. radio listeners outside Kwekwe or people who already drive.", "So the cost per actual customer may be high / message ignored."],
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Recommend how Farai should spend his US\\$800 budget. Justify your answer.",
        points: ["Uses the data: social media cheapest per person and reaches young adults.", "Can target by age and town / two-way contact / measurable.", "Radio reaches workers but costs US\\$900, over budget alone.", "Leaflets local but expensive per person and often thrown away.", "Combination within budget, e.g. social media US\\$400 + leaflets near workplaces or an opening offer.", "Justified recommendation."],
        modelAnswer: "Paid social media adverts cost only US\\$0.025 per person and can be aimed at young adults in Kwekwe, the people most likely to need driving lessons; Farai can also count responses. Radio would reach workers, but at US\\$900 it is over budget on its own. Leaflets cost US\\$0.07 per person and are often thrown away, although they target the local area. Farai should spend US\\$400 on social media adverts and use about US\\$350 on leaflets handed out at large workplaces, with an opening discount to make people act, keeping US\\$50 spare. This fits his budget and his two target groups.",
      }),
    ],
    hints: ["(a) Cost ÷ number of people.", "(d) Match the methods to the two target groups and the budget."],
    explanation: `(a) ${money(costPer[1])}. (b) Social media. (c) Reach is not the same as reaching the target market. (d) A justified mix within US\\$800.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 780, applies: COM,
    stem: "Advertising is used by producers and retailers of many goods, from soap to cars. Some people argue that consumers would be better off without it.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between informative and persuasive advertising.", points: ["Informative: gives facts (price, features, where to buy).", "Persuasive: tries to create a desire / convince people to buy (lifestyle, emotions)."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** advantages of advertising to consumers.",
        points: ["Gives information about products, prices and where to buy.", "So consumers can compare and choose well.", "Mass sales from advertising can lower costs per unit / encourages competition.", "So prices may be lower / quality improved."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether consumers would be better off without advertising.",
        points: ["Advantages to consumers lost: information, choice, competition, new products known.", "Disadvantage: persuades people to buy things they do not need / encourages debt.", "Disadvantage: cost of advertising is added to prices.", "Disadvantage: may mislead (false claims) though laws and consumer bodies control this.", "Weighs the two sides, e.g. informative adverts helpful, misleading ones harmful.", "Justified conclusion."],
        modelAnswer: "Without advertising, consumers would know less about new products, prices and where to buy, and firms would face less competition, so prices might be higher. On the other hand, persuasive adverts can make people buy things they do not need, the cost of advertising is included in prices, and some adverts mislead. Consumer protection laws and consumer bodies reduce, but do not remove, the problem of misleading adverts. Overall consumers would not be better off without advertising: informative advertising helps them choose, and the answer is to control misleading advertising rather than remove advertising altogether.",
      }),
    ],
    hints: ["(b) Think about information and prices.", "(c) Weigh information and competition against cost and persuasion."],
    explanation: "Advertising informs and supports competition, but adds cost and may persuade or mislead.",
  });
  b.card("DEFINITION", "What is **promotion**?", "Communicating with customers to inform them about a product and persuade them to buy it.");
  b.card("CONCEPT", "Aims of promotion?", "Inform, persuade, remind, build brand image, increase sales and market share.");
  b.card("CONCEPT", "Informative vs persuasive advertising?", "Informative gives facts (price, features, where to buy); persuasive creates a desire to buy.");
  b.card("FACT", "Advertising media?", "Radio, television, newspapers and magazines, billboards, leaflets, social media, targeted digital messages, vehicles and sponsorship.");
  b.card("FACT", "Sales promotion methods?", "Price offers, coupons and vouchers, free samples, competitions, loyalty schemes, gifts, point-of-sale displays.");
  b.card("CONCEPT", "Choosing promotion?", "Consider budget, target market and the media they use, product, life-cycle stage, competitors and size of market.");
  b.card("FACT", "AIDA?", "Attention, Interest, Desire, Action: a checklist for designing an advertisement.");
  b.card("CONCEPT", "Drawback of sales promotion?", "Effects are usually short-term; frequent offers cut profit and can make the brand look cheap.");
  b.card("DEFINITION", "Generic (collective) advertising?", "Advertising by a whole industry for a type of product (e.g. \"eat more beef\") rather than one brand.", "ZIMSEC Commerce.", { applies: COM });
});
