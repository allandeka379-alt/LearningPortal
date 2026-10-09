// W3b: product, branding, packaging and new products.
import { concept, P, CAM, money } from "../lib.mjs";

const unbranded = 1.2, branded = 1.5, extra = Math.round((branded - unbranded) * 100) / 100; // 0.30
const sold = 2000, extraRev = Math.round(extra * sold * 100) / 100; // 600

concept("bus.marketing.product", { file: "marketing/product", keyPrefix: "marketing.product" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is one of the four Ps of the marketing mix?",
    options: [
      ["Product", "Correct: product, price, place and promotion."],
      ["Profit", "Profit is an objective, not part of the mix."],
      ["People", "People is not one of the four Ps in these syllabuses."],
      ["Production", "Production is an operations activity."],
    ],
    answer: "A",
    explanation: "The four Ps are **product, price, place and promotion**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a brand?",
    options: [
      ["A name, symbol or design that identifies a product", "Correct: it makes the product recognisable and different."],
      ["The container and label a product is sold in", "That is packaging."],
      ["The price charged for a product in the shops", "That is price."],
      ["The place where a product is sold", "That is place."],
    ],
    answer: "A",
    explanation: "A **brand** identifies a product and distinguishes it from competitors' products.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the most likely benefit to a business of a strong brand image?",
    options: [
      ["It can charge a higher price than unbranded rivals", "Correct: customers pay more for a brand they trust."],
      ["It no longer needs to control the quality of its products", "Poor quality would damage the brand image."],
      ["Its costs of advertising fall to nothing", "Brands need continuing promotion."],
      ["Competitors are banned from the market", "A brand does not stop competitors entering."],
    ],
    answer: "A",
    explanation: "A trusted brand allows a **premium price** and builds loyalty, but needs consistent quality and promotion.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A dairy prints the expiry date and storage instructions on each carton of milk. Which role of packaging does this show?",
    options: [
      ["Giving information to the customer", "Correct: the dates and instructions inform buyers."],
      ["Protecting the product from damage", "Protection is about the container, not the printing."],
      ["Making the product easy to carry", "Convenience is not shown here."],
      ["Helping sales promotion", "No special offer is printed."],
    ],
    answer: "A",
    explanation: "Labels **inform** customers: ingredients, expiry date, instructions, weight and warnings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is brand loyalty?",
    options: [
      ["Customers repeatedly buying the same brand", "Correct: they do not switch to rivals."],
      ["A business always using the same supplier", "That is about suppliers, not customers."],
      ["Workers staying with one employer", "That is about labour turnover."],
      ["A retailer stocking only one brand", "That is a stocking decision."],
    ],
    answer: "A",
    explanation: "**Brand loyalty** means customers keep choosing the brand, giving steady repeat sales.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "At which stage of new product development are ideas that are too costly or unlikely to be profitable rejected?",
    options: [
      ["Screening", "Correct: screening removes unsuitable ideas."],
      ["Launch", "At launch the product is already on sale."],
      ["Test marketing", "Test marketing comes after a product has been developed."],
      ["Generating ideas", "This stage collects ideas; it does not reject them."],
    ],
    answer: "A",
    hints: ["Which stage filters the ideas?"],
    explanation: "Stages: ideas, **screening**, prototype development and testing, test marketing, launch.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage of developing a new product?",
    options: [
      ["Development costs may be lost if the product fails", "Correct: many new products fail."],
      ["It spreads the business's risk over more products", "That is an advantage."],
      ["It may attract new customers", "That is an advantage."],
      ["It can replace products that are in the decline stage", "That is an advantage."],
    ],
    answer: "A",
    hints: ["Three options are benefits."],
    explanation: "New products bring new revenue and spread risk, but research and development are costly and many fail.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A cosmetics firm sells a hand cream in a heavy glass jar with a gold lid. What is the most likely purpose of this packaging?",
    options: [
      ["To support a luxury brand image", "Correct: expensive-looking packaging suggests high quality."],
      ["To lower the cost of each unit", "Glass and gold lids raise costs."],
      ["To reduce packaging waste", "Heavy glass does not reduce waste."],
      ["To make the cream easier to post", "Glass is heavy and breakable."],
    ],
    answer: "A",
    hints: ["Think about what the jar tells customers."],
    explanation: "Packaging communicates the **brand image**; luxury packaging supports a high price.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Packaging can protect a product from damage during transport.",
    answer: true,
    explanation: "True. Protection is a main role of packaging.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business with a strong brand image never needs to worry about its reputation.",
    answer: false,
    explanation: "False. One quality failure or scandal can quickly damage a brand image built over many years.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each packaging feature with the role it performs.",
    pairs: [
      ["A sealed foil lid on a yoghurt pot", "Protects the product from contamination"],
      ["Cooking instructions printed on a rice bag", "Gives information"],
      ["A bright, eye-catching box design", "Attracts attention on the shelf"],
      ["A plastic handle on a 20-litre container of cooking oil", "Makes the product convenient to carry"],
      ["\"Win a bicycle\" printed on a cereal box", "Supports sales promotion"],
    ],
    explanation: "Packaging protects, informs, attracts, adds convenience and carries promotions.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the stages of new product development.",
    template: "Generating ideas → {{blank:a}} → developing a prototype → {{blank:b}} marketing → launch.",
    blanks: [
      { id: "a", accepted: ["screening", "screening ideas", "screen"], wrong: "advertising" },
      { id: "b", accepted: ["test"], wrong: "mass" },
    ],
    explanation: "Ideas are screened, a prototype is developed and tested, the product is test marketed and then launched.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for the ideas and feelings customers have about a brand.",
    accepted: ["brand image", "image", "the brand image"],
    wrong: ["brand loyalty"],
    explanation: "**Brand image** is how customers see the brand: quality, value, reliability, luxury.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha sells honey. Unbranded jars sell for ${money(unbranded)}. After adding a printed label and brand name, she sells the same jar for ${money(branded)}. Calculate the extra revenue she earns from selling ${sold.toLocaleString("en-GB")} branded jars instead of unbranded jars.`,
    kind: "money", value: extraRev, wrong: [branded * sold, extra],
    hints: ["Find the extra amount per jar first."],
    explanation: `Extra per jar = ${money(branded)} − ${money(unbranded)} = ${money(extra)}. Extra revenue = ${money(extra)} × ${sold.toLocaleString("en-GB")} = ${money(extraRev)}.`,
    workedSolution: `1. Extra per jar = ${branded.toFixed(2)} − ${unbranded.toFixed(2)} = ${extra.toFixed(2)}.\n2. Extra revenue = ${extra.toFixed(2)} × ${sold.toLocaleString("en-GB")} = ${money(extraRev)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** reasons why a manufacturer of fruit juice in Mutare should package its juice carefully.",
    points: [
      "Protection: juice is liquid and perishable.",
      "So sealed cartons prevent leaks, spoiling and contamination / keep juice safe to drink.",
      "Information or attraction: label shows expiry date / ingredients, or attractive design.",
      "So customers trust it and choose it on a crowded shelf / meets legal labelling needs.",
    ],
    hints: ["Think about what could go wrong with juice, and about the shelf."],
    modelAnswer: "Juice is a perishable liquid, so sealed cartons protect it from leaking, spoiling and contamination, keeping it safe to drink. The label also gives the expiry date and ingredients and an attractive design makes it stand out on the shelf, so customers trust and choose it.",
    explanation: "Apply the roles of packaging to the product in the question.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Tendai's company makes a well-known brand of floor polish sold in supermarkets across Zimbabwe. Sales have been steady for years, but a rival has launched a cheaper polish. Tendai is considering spending most of this year's profit on developing a new product: a liquid floor cleaner sold under the same brand name.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define the term *brand loyalty*.", points: ["Customers keep buying the same brand.", "Rather than switching to competitors' products."] }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages of launching the new product under the existing brand name.",
        points: ["Customers already trust the brand / brand loyalty.", "So the cleaner may sell quickly with less promotion.", "Retailers more willing to stock it / shelf space easier to get.", "Spreads risk if the polish faces strong price competition."],
        modelAnswer: "Customers already trust the brand, so they are more likely to try the cleaner, and less money is needed to promote it. Supermarkets that already stock the polish are also more likely to give it shelf space, and the business no longer depends on one product facing a cheaper rival.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Tendai should spend most of this year's profit on developing the new product.",
        points: ["Benefit: new revenue to offset the threat from the cheaper rival.", "Benefit: strong brand reduces the risk of failure.", "Risk: development costs high; many new products fail.", "Risk: spending most of the profit leaves little for promoting the polish / for emergencies.", "Suggests reducing risk, e.g. market research or test marketing first, or a smaller budget.", "Justified conclusion."],
        modelAnswer: "The new cleaner could bring extra revenue just as the cheaper rival threatens polish sales, and the trusted brand makes success more likely. However, new products often fail, and spending most of the year's profit leaves little to defend the polish or to cope with problems. Tendai should go ahead only after market research and a test launch in one city, so that he spends the full budget only if customers buy it. On balance a careful, staged launch is better than spending most of the profit at once.",
      }),
    ],
    hints: ["(b) Think about customers and retailers.", "(c) Weigh the rewards against the risk of failure."],
    explanation: "An existing brand lowers the risk of a new product, but development is costly and should be tested first.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720,
    stem: "Chipo grows tomatoes near Kwekwe. She sells them loose in wooden boxes to vendors. She is thinking of packing some tomatoes in small printed plastic trays with her own brand name, \"Chipo's Choice\", to sell to supermarkets.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which element of the marketing mix is Chipo changing?",
        options: [["Product", "Correct: branding and packaging are part of the product."], ["Place", "She may sell through new outlets, but the change described is branding and packaging."], ["Price", "Price is not mentioned."], ["Promotion", "Promotion is communicating with customers, not the pack itself."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** roles the printed trays would perform for Chipo's tomatoes.",
        points: ["Protection: tomatoes are soft and bruise.", "Trays reduce damage in transport and on the shelf, so less waste.", "Brand/information: name and label make the tomatoes recognisable / show origin and date.", "So customers can choose her tomatoes again (loyalty) / supermarket requirements met."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether branding and packaging her tomatoes is a good idea for Chipo.",
        points: ["Advantage: higher price / access to supermarket customers.", "Advantage: brand builds loyalty and recognition.", "Disadvantage: cost of trays and printing raises cost per kilogram.", "Disadvantage: supermarkets need steady supply and quality; plastic waste may harm image.", "Considers scale: start with part of her crop.", "Justified conclusion."],
        modelAnswer: "Packed and branded tomatoes can be sold to supermarkets at a higher price, and customers who like them can find \"Chipo's Choice\" again, building loyalty. However, trays and printing add to costs, and supermarkets demand a steady supply of consistent quality, which a small farm may struggle with. Plastic trays may also be seen as wasteful. Chipo should try packing part of her crop for one supermarket first; if the higher price covers the extra cost, she can expand.",
      }),
    ],
    hints: ["(b) Tomatoes are soft and perishable.", "(c) Compare extra revenue with extra cost."],
    explanation: "Branding and packaging can add value, but cost and supply requirements must be weighed.",
  });
  b.card("DEFINITION", "What is a **brand**?", "A name, symbol, logo or design that identifies a product and distinguishes it from rivals.");
  b.card("DEFINITION", "Brand image?", "The ideas and feelings customers have about a brand (quality, value, luxury, reliability).");
  b.card("CONCEPT", "Benefits of a strong brand?", "Recognition, brand loyalty and repeat sales, a higher price, easier launch of new products.");
  b.card("CONCEPT", "Roles of packaging?", "Protects, informs, attracts attention, builds the brand, adds convenience, carries promotions.");
  b.card("CONCEPT", "Drawbacks of packaging?", "Adds to costs; too much packaging creates waste and may harm the firm's image.");
  b.card("FACT", "Stages of new product development?", "Ideas → screening → prototype development and testing → test marketing → launch.");
  b.card("CONCEPT", "Why develop new products?", "Replace declining products, attract new customers, keep up with rivals, spread risk.");
  b.card("CONCEPT", "Disadvantages of new product development?", "High research and development costs, risk of failure, time before revenue, new machinery or training needed.");
});
