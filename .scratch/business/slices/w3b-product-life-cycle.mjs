// W3b: product life cycle and extension strategies.
import { concept, P, table, round } from "../lib.mjs";

// Structured: sales of a mobile phone cover (thousand units).
const yrs = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
const covers = [8, 30, 72, 95, 97, 81];
const covTbl = table(["Year", "Sales (thousand units)"], yrs.map((y, i) => [y, covers[i]]));
const fallPct = ((covers[4] - covers[5]) / covers[4]) * 100; // 16.49
// num: growth between Year 2 and Year 3
const growthPct = ((covers[2] - covers[1]) / covers[1]) * 100; // 140

concept("bus.marketing.product-life-cycle", { file: "marketing/product-life-cycle", keyPrefix: "marketing.product-life-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the correct order of the stages of the product life cycle after development?",
    options: [
      ["Introduction, growth, maturity, decline", "Correct."],
      ["Growth, introduction, maturity, decline", "A product is introduced before it grows."],
      ["Introduction, maturity, growth, decline", "Growth comes before maturity."],
      ["Introduction, growth, decline, maturity", "Decline is the final stage."],
    ],
    answer: "A",
    explanation: "Development → introduction → growth → maturity (saturation) → decline.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At which stage of the product life cycle are sales usually highest?",
    options: [
      ["Maturity", "Correct: sales peak and level off in maturity."],
      ["Introduction", "Sales are low just after launch."],
      ["Growth", "Sales are rising fast but have not yet peaked."],
      ["Decline", "Sales are falling in decline."],
    ],
    answer: "A",
    explanation: "Sales reach their peak in **maturity**, where they level off as the market becomes saturated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a product usually make a loss in the introduction stage?",
    options: [
      ["Sales are low while launch and promotion costs are high", "Correct: revenue does not yet cover costs."],
      ["The price is always set below the cost of each unit", "Price may be high (skimming) at introduction."],
      ["Competitors have already taken most of the market", "There are few competitors at introduction."],
      ["The product is about to be withdrawn", "That happens in decline."],
    ],
    answer: "A",
    explanation: "Low sales and heavy launch costs (advertising, setting up distribution) usually mean a loss at introduction.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A product's sales are high but have stopped increasing, and many rival brands are on sale. Which stage is the product in?",
    options: [
      ["Maturity", "Correct: high, flat sales and strong competition."],
      ["Growth", "Sales would still be rising quickly."],
      ["Introduction", "Sales would be low with few rivals."],
      ["Decline", "Sales would be falling."],
    ],
    answer: "A",
    explanation: "High but flat sales with many competitors indicate **maturity** (saturation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of advertising is most typical of the introduction stage?",
    options: [
      ["Informative advertising explaining what the product does", "Correct: customers must learn about the new product."],
      ["Reminder advertising for a product customers already know", "That suits maturity."],
      ["No advertising at all", "A new product needs customers to know about it."],
      ["Advertising a clearance sale", "That fits decline."],
    ],
    answer: "A",
    explanation: "At introduction, customers do not know the product, so promotion **informs** them.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A maker of maize snacks launches a new chilli flavour of its best-known snack, whose sales have levelled off. What is this?",
    options: [
      ["An extension strategy", "Correct: changing the product delays decline."],
      ["A skimming price strategy", "Price has not changed."],
      ["Test marketing", "The new flavour is not being tested in one area."],
      ["Withdrawal of the product", "The product is being refreshed, not withdrawn."],
    ],
    answer: "A",
    hints: ["Sales had levelled off: what is the business trying to do?"],
    explanation: "A new flavour is an **extension strategy**: it renews interest and delays decline.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a business need products at different stages of the life cycle?",
    options: [
      ["Profits from mature products can pay for developing new ones", "Correct: a balanced range keeps cash and profit flowing."],
      ["Products in decline make the highest profits", "Profit is falling in decline."],
      ["Products at introduction need no finance", "Launch is costly."],
      ["It prevents competitors from entering the market", "A product range does not stop rivals."],
    ],
    answer: "A",
    hints: ["Which stage produces the most cash, and which stage needs it?"],
    explanation: "Mature products generate cash that funds the development and launch of new products; this keeps the business going when old products decline.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "For which product would spending heavily on an extension strategy be least sensible?",
    options: [
      ["A film camera whose users have switched to phone cameras", "Correct: demand is disappearing; extension only wastes money."],
      ["A popular soft drink whose sales have been flat for two years", "A new flavour or pack could revive sales."],
      ["A washing powder facing a new rival", "New packaging or promotion could help."],
      ["A school-bag range in maturity facing new designs", "A new design could extend its life."],
    ],
    answer: "A",
    hints: ["Has the need for the product disappeared?"],
    explanation: "Extension strategies only delay decline; when technology has replaced a product, it is usually better to invest in new products.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the decline stage, sales of a product fall.",
    answer: true,
    explanation: "True. Sales fall as customers switch to newer or better products.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An extension strategy guarantees that a product will never decline.",
    answer: false,
    explanation: "False. Extension strategies only **delay** decline; eventually most products are replaced.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the product life cycle with its typical feature.",
    pairs: [
      ["Introduction", "Low sales and usually a loss"],
      ["Growth", "Sales rising quickly and rivals entering"],
      ["Maturity", "Sales at their peak and levelling off"],
      ["Decline", "Sales and profit falling"],
    ],
    explanation: "Sales rise slowly, then quickly, level off and then fall.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "When almost every customer who wants a product already has it, the market is said to be {{blank:a}}. Businesses then use {{blank:b}} strategies to delay decline.",
    blanks: [
      { id: "a", accepted: ["saturated", "saturation"], wrong: "growing" },
      { id: "b", accepted: ["extension"], wrong: "skimming" },
    ],
    explanation: "Saturation occurs in maturity; extension strategies try to keep sales up.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the stage of the product life cycle in which profit is usually highest.",
    accepted: ["maturity", "the maturity stage", "mature stage", "maturity stage", "saturation"],
    wrong: ["growth"],
    explanation: "Profit is usually highest in **maturity**, when sales are at their peak and launch costs have been recovered.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sales of a phone cover rose from ${covers[1]},000 units in Year 2 to ${covers[2]},000 units in Year 3. Calculate the percentage increase.`,
    kind: "pct", dp: 0, value: growthPct, wrong: [round(((covers[2] - covers[1]) / covers[2]) * 100, 0), covers[2] - covers[1]],
    hints: ["Divide the increase by the Year 2 figure."],
    explanation: `(${covers[2]} − ${covers[1]}) ÷ ${covers[1]} × 100 = ${growthPct}%. Such rapid growth is typical of the growth stage.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "A soap manufacturer's best-selling bath soap has reached maturity. Explain **two** extension strategies it could use.",
    points: [
      "Strategy 1, e.g. new scent / version (antibacterial, for children).",
      "Explained: gives customers a reason to buy again / attracts a new segment.",
      "Strategy 2, e.g. new pack size, new markets (export, hotels), new promotion campaign.",
      "Explained: reaches customers not buying now / renews interest, delaying decline.",
    ],
    hints: ["Change the product, the pack, the market or the promotion."],
    modelAnswer: "It could launch an antibacterial version, which attracts families concerned about hygiene and renews interest in the brand. It could also sell a small, cheaper bar in tuck shops, reaching customers who cannot afford the full-size bar.",
    explanation: "Extension strategies change the product, packaging, market, uses, promotion or price.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840, calculator: true,
    stem: `Farai's company makes phone covers in Harare. Sales of its most popular cover are shown below.\n\n${covTbl}`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which stage of the product life cycle was the cover in between Year 2 and Year 3?",
        options: [["Growth", "Correct: sales more than doubled."], ["Introduction", "Introduction was Year 1, with low sales."], ["Maturity", "Sales had not yet levelled off."], ["Decline", "Sales were rising."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage fall in sales from Year 5 to Year 6, to one decimal place.",
        kind: "pct", value: fallPct, wrong: [round(((covers[4] - covers[5]) / covers[5]) * 100, 1)],
        explanation: `(${covers[4]} − ${covers[5]}) ÷ ${covers[4]} × 100 = ${round(fallPct, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain what stage the cover appears to be entering in Year 6 and **one** likely reason.",
        points: ["Decline.", "Sales fell after levelling off in Years 4-5.", "Reason, e.g. new phone models need different covers / rivals' cheaper or better covers."],
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Farai should use an extension strategy for the cover or replace it with a new design. Justify your answer.",
        points: ["Identifies a suitable extension strategy, e.g. new colours/ materials, price cut, new market.", "Benefit: cheaper and less risky than a new design; customers know the brand.", "Limitation: covers fit particular phone models; if those phones are out of date, extension wastes money.", "New design: fits current phones, may restart growth; but development cost and risk.", "Uses the data: fall of about 16% in one year after a peak.", "Justified recommendation."],
        modelAnswer: `Sales peaked at ${covers[4]},000 and fell by ${round(fallPct, 1)}% in Year 6. A new range of colours or a price cut would be cheap and might hold sales for a while. But phone covers fit particular phone models, and if people are replacing those phones, no extension strategy will stop the decline. Farai should design covers for the newest popular phones, using cash from the current cover while it still sells, and let the old cover decline with little extra spending.`,
      }),
    ],
    hints: ["(b) Divide the fall by the Year 5 figure.", "(d) Ask whether the need for the product is disappearing."],
    explanation: `(a) Growth. (b) ${round(fallPct, 1)}%. (c) Decline. (d) A justified choice; a new design is likely better if the phones themselves are changing.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Rudo's company has sold \"Zuva\" orange squash in Zimbabwe for fifteen years. Sales have been flat for three years and several cheaper brands are now on sale. The marketing manager suggests two extension strategies: (1) launch a sugar-free version, or (2) start selling the squash in Zambia and Mozambique.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term *extension strategy*.", points: ["An action to extend the life of a product / stop sales falling.", "Usually used in the maturity stage (e.g. new version, new market)."] }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how the marketing mix for Zuva is likely to differ from the marketing mix used when it was first introduced.",
        points: ["Promotion: reminder rather than informative advertising.", "Price: competitive / lower prices because of cheaper rivals (launch price may have been different).", "Place: sold in many outlets now, few at launch.", "Product: possibly new sizes or flavours added."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate which extension strategy Rudo's company should choose.",
        points: ["Sugar-free: attracts health-conscious customers; uses existing factory and distribution.", "But may take sales from the original (cannibalisation) / development and testing cost.", "Exports: new customers; spreads risk across countries.", "But costs of transport, foreign regulations and currency; little knowledge of those markets.", "Compares risk and cost of each.", "Justified recommendation."],
        modelAnswer: "A sugar-free version uses the same factory, brand and distribution, so it is cheap to introduce and would attract health-conscious buyers who now avoid sugary drinks. It might take some sales from the original, but it also keeps those customers from switching to rivals. Exporting reaches many new customers, but transport, foreign rules and currency risks are high and the company knows little about those markets. Because the sugar-free version is cheaper and less risky and builds on the brand's strength at home, it should be the first choice, with exports considered later after market research.",
      }),
    ],
    hints: ["(b) Compare promotion, price and place at introduction and maturity.", "(c) Compare cost, risk and likely sales of each option."],
    explanation: "In maturity the mix shifts to reminder promotion and competitive prices; the choice of extension strategy depends on cost and risk.",
  });
  b.card("DEFINITION", "What is the **product life cycle**?", "The stages a product passes through from launch to withdrawal: introduction, growth, maturity (saturation), decline.");
  b.card("CONCEPT", "Introduction stage?", "Low sales, usually a loss, informative advertising, few outlets, skimming or penetration price.");
  b.card("CONCEPT", "Growth stage?", "Sales rise quickly, profits begin, rivals enter, persuasive advertising, more outlets.");
  b.card("CONCEPT", "Maturity stage?", "Sales peak and level off, profit highest, strong competition, reminder advertising, extension strategies.");
  b.card("CONCEPT", "Decline stage?", "Sales and profit fall; promotion cut, prices lowered, product may be withdrawn.");
  b.card("DEFINITION", "Extension strategy?", "Action to delay decline and extend a product's life, usually in maturity.");
  b.card("FACT", "Examples of extension strategies?", "New version or flavour, new packaging, new markets, new uses, new promotion, price change.");
  b.card("CONCEPT", "Limitation of extension strategies?", "They cost money and only delay decline; useless if the product is outdated.");
  b.card("FACT", "Axes of a product life cycle diagram?", "Sales on the vertical axis, time on the horizontal axis.");
});
