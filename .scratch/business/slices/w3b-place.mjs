// W3b: place, channels of distribution.
import { concept, P, ZIM, COM, CAM, money, r2 } from "../lib.mjs";

// Mark-ups along a chain (ZIMSEC).
const factory = 2.0, wMu = 15, rMu = 20;
const wPrice = r2(factory * (1 + wMu / 100)); // 2.30
const rPrice = r2(wPrice * (1 + rMu / 100)); // 2.76
// Direct vs retailer revenue comparison.
const dPrice = 5, dUnits = 300, rPay = 3.8, rUnits = 900;
const dRev = dPrice * dUnits; // 1500
const rRev = r2(rPay * rUnits); // 3420

concept("bus.marketing.place", { file: "marketing/place", keyPrefix: "marketing.place" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a channel of distribution?",
    options: [
      ["The route a product takes from producer to consumer", "Correct."],
      ["The way a product is advertised to consumers", "That is promotion."],
      ["The method used to set a product's price", "That is pricing."],
      ["The stages of a product's sales over its life", "That is the product life cycle."],
    ],
    answer: "A",
    explanation: "A **channel (chain) of distribution** is the route from producer to consumer, including any intermediaries.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which business buys goods in bulk from producers and sells them in smaller quantities to retailers?",
    options: [
      ["A wholesaler", "Correct: wholesalers break bulk for retailers."],
      ["An agent", "Agents arrange sales for commission without owning the goods."],
      ["A consumer", "Consumers are the final users."],
      ["A manufacturer", "Manufacturers make the goods."],
    ],
    answer: "A",
    explanation: "Wholesalers buy in bulk and **break bulk** for retailers.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer sells vegetables from a stall at her farm gate to people driving past. Which channel is this?",
    options: [
      ["Producer → consumer", "Correct: a direct channel."],
      ["Producer → retailer → consumer", "No retailer is involved."],
      ["Producer → wholesaler → retailer → consumer", "No intermediaries are involved."],
      ["Producer → agent → consumer", "No agent is involved."],
    ],
    answer: "A",
    explanation: "Farm-gate sales go **directly** from producer to consumer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are fresh milk and bread usually sold through short channels of distribution?",
    options: [
      ["They are perishable and must reach consumers quickly", "Correct: every extra step adds time."],
      ["They are too expensive for wholesalers to buy", "They are low-priced goods."],
      ["The law requires them to be sold directly", "There is no such general rule."],
      ["They need technical explanation by the seller", "They are simple products."],
    ],
    explanation: "Perishable goods need **short channels** so that they reach customers fresh.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage to a producer of using a direct channel?",
    options: [
      ["It keeps the profit that intermediaries would take", "Correct: no intermediaries' mark-ups."],
      ["It reaches customers all over the country easily", "Direct channels make wide reach harder."],
      ["It removes the need for transport and storage", "The producer must do these itself."],
      ["It means the producer needs no sales staff", "The producer must sell to consumers itself."],
    ],
    answer: "A",
    explanation: "Selling directly avoids intermediaries' mark-ups and keeps control, but the producer does all the distribution work.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A small soap maker in Gweru wants its soap sold in hundreds of small shops in rural areas. Which channel is most suitable?",
    options: [
      ["Producer → wholesaler → retailer → consumer", "Correct: wholesalers reach many small shops."],
      ["Producer → consumer", "The soap maker cannot sell to every rural household itself."],
      ["Producer → agent → consumer", "Agents are mainly used for selling abroad."],
      ["Producer → retailer → consumer, delivering to each shop itself", "A small firm lacks the vehicles to supply hundreds of shops."],
    ],
    answer: "A",
    hints: ["How could a small producer reach hundreds of scattered shops?"],
    explanation: "Wholesalers buy in bulk and supply many small retailers that a small producer could not reach on its own.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Which is a disadvantage to a business of selling its products online rather than through shops?",
    options: [
      ["Customers cannot see or touch goods before buying", "Correct: this reduces trust for some goods."],
      ["It can reach customers anywhere in the country", "That is an advantage."],
      ["It can sell at any time of day", "That is an advantage."],
      ["It avoids paying rent for a shop in town", "That is an advantage."],
    ],
    answer: "A",
    hints: ["Three options are benefits."],
    explanation: "Online selling has wide reach and low costs, but delivery, trust and the inability to inspect goods are drawbacks.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is an agent in a channel of distribution?",
    options: [
      ["A firm that arranges sales for a producer for commission", "Correct: agents usually do not own the goods."],
      ["A shop that buys goods and sells them to the final consumer", "That is a retailer."],
      ["A firm that buys in bulk and breaks bulk", "That is a wholesaler."],
      ["A customer who buys goods for personal use", "That is a consumer."],
    ],
    answer: "A",
    explanation: "Agents arrange sales on behalf of producers for a commission, especially in foreign markets.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A retailer sells goods to the final consumer.",
    answer: true,
    explanation: "True. Retailers are the last link before the consumer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "If the wholesaler is eliminated from the chain of distribution, the wholesaler's functions no longer need to be performed.",
    answer: false,
    explanation: "False. Someone (the producer or the retailer) must still store, break bulk, transport and finance the goods.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each product with the channel most likely to be used.",
    pairs: [
      ["A tailor's made-to-measure suit", "Producer → consumer"],
      ["New cars", "Producer → retailer (dealer) → consumer"],
      ["Packets of salt sold in rural tuck shops", "Producer → wholesaler → retailer → consumer"],
      ["Zimbabwean crafts sold in a foreign country", "Producer → agent → retailer → consumer"],
    ],
    explanation: "Made-to-order goods go direct; cars go through dealers; cheap groceries through wholesalers; exports often through agents.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A wholesaler buys in large quantities and sells in small quantities to retailers. This is called {{blank:a}} bulk. Any business between the producer and the consumer is called an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["breaking"], wrong: "building" },
      { id: "b", accepted: ["intermediary", "intermediaries", "middleman"], wrong: "agent of production" },
    ],
    explanation: "Wholesalers **break bulk**; wholesalers, retailers and agents are **intermediaries**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
    stem: `A factory sells a bar of soap to a wholesaler for ${money(factory)}. The wholesaler adds a mark-up of ${wMu}% and the retailer then adds a mark-up of ${rMu}%. Calculate the price the consumer pays.`,
    kind: "money", value: rPrice, wrong: [r2(factory * (1 + (wMu + rMu) / 100)), wPrice],
    hints: ["Apply the wholesaler's mark-up first, then the retailer's mark-up to the wholesale price."],
    explanation: `Wholesale price = ${money(factory)} × 1.${wMu} = ${money(wPrice)}. Retail price = ${money(wPrice)} × 1.${rMu} = ${money(rPrice)}.`,
  });
  b.calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A potter can sell ${dUnits} pots a month directly at ${money(dPrice)} each, or ${rUnits} pots a month to retailers at ${money(rPay)} each. Calculate how much more revenue a month she would earn by selling through retailers.`,
    kind: "money", value: rRev - dRev, wrong: [r2(dPrice - rPay), rRev],
    hints: ["Work out the revenue from each channel first."],
    explanation: `Direct: ${dUnits} × ${money(dPrice)} = ${money(dRev)}. Retailers: ${rUnits} × ${money(rPay)} = ${money(rRev)}. Difference = ${money(rRev - dRev)}.`,
    workedSolution: `1. Direct revenue = ${dUnits} × ${dPrice} = ${dRev.toLocaleString("en-GB")}.\n2. Retailer revenue = ${rUnits} × ${rPay.toFixed(2)} = ${rRev.toLocaleString("en-GB")}.\n3. Extra revenue = ${rRev.toLocaleString("en-GB")} − ${dRev.toLocaleString("en-GB")} = ${money(rRev - dRev)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** factors a small business should consider when choosing a channel of distribution.",
    points: [
      "Factor 1, e.g. type of product (perishable / technical).",
      "Explained: perishable goods need a short channel / technical goods need sellers who can explain them.",
      "Factor 2, e.g. number and location of customers / resources of the business / cost of intermediaries.",
      "Explained: scattered customers need wholesalers and retailers / small firm lacks transport / mark-ups raise price.",
    ],
    hints: ["Think about the product, the customers and the business itself."],
    modelAnswer: "If the product is perishable, such as fresh vegetables, it needs a short channel so it reaches customers fresh. If customers are spread across the country, a small business without vehicles will need wholesalers and retailers to reach them, even though they take a mark-up.",
    explanation: "Factors include product type, customers' number and location, the producer's resources, cost, control and competitors' outlets.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Tatenda makes peanut butter in Masvingo. At present he sells jars directly to customers at a market stall for ${money(3.5)} each and sells about 400 jars a month. A national wholesaler has offered to buy 1,500 jars a month at ${money(2.6)} each and to distribute them to shops across southern Zimbabwe.`,
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the name of the channel Tatenda uses at present.",
        accepted: ["direct", "direct channel", "producer to consumer", "producer consumer", "direct selling", "direct distribution"],
        wrong: ["indirect"],
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate Tatenda's monthly revenue if he accepts the wholesaler's offer (and closes his stall).",
        kind: "money", value: r2(1500 * 2.6), wrong: [1500 * 3.5, r2(400 * 2.6)],
        explanation: `1,500 × ${money(2.6)} = ${money(r2(1500 * 2.6))}.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** disadvantage for Tatenda of selling through the wholesaler.",
        points: ["Identifies: lower price per jar / less control / less contact with customers / dependence on one buyer.", "Explains the effect, e.g. lower profit per jar or brand displayed poorly / loses customer feedback.", "Applies: from US\\$3.50 to US\\$2.60 a jar, or risk if the wholesaler stops buying."],
        modelAnswer: "He earns US\\$2.60 a jar instead of US\\$3.50, so each jar makes less profit, and he loses direct contact with his customers. If the wholesaler stops buying, he would have lost his stall customers too.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Tatenda should accept the wholesaler's offer. Justify your answer.",
        points: ["Revenue rises from US\\$1,400 to US\\$3,900 a month.", "Wider market: shops across southern Zimbabwe; brand becomes known.", "But production must almost quadruple: capacity, ingredients, finance, quality.", "Dependence on one large buyer; lower price per jar means costs must be controlled.", "Possible compromise: keep the stall and supply the wholesaler.", "Justified recommendation."],
        modelAnswer: "Accepting the offer would raise monthly revenue from US\\$1,400 (400 × US\\$3.50) to US\\$3,900 and make his brand known across the region, which he could never do from one stall. But he must make almost four times as many jars, needing more equipment, ingredients and cash, and each jar earns US\\$0.90 less. Relying on one buyer is also risky. Tatenda should accept if he can produce 1,500 jars at a cost well below US\\$2.60, but keep his market stall so that he still has his own customers if the wholesaler's orders stop.",
      }),
    ],
    hints: ["(b) Number of jars × price per jar.", "(d) Compare revenue, costs, capacity and risk."],
    explanation: "Selling through a wholesaler widens reach and revenue but lowers the price per unit and reduces control.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Thandeka makes high-quality handmade jewellery from local stone in Bulawayo. She sells about 60 pieces a month to tourists through two gift shops in Victoria Falls. A friend suggests she should also sell online through a social media page with delivery by courier.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the channel of distribution Thandeka uses at present, written as a chain.",
        accepted: ["producer retailer consumer", "producer to retailer to consumer", "producer, retailer, consumer", "producer → retailer → consumer", "manufacturer retailer consumer", "producer retailer customer"],
        normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"],
        wrong: ["producer consumer"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to Thandeka of selling online.",
        points: ["Reaches customers outside Victoria Falls / abroad / all the time.", "So more sales, less dependence on tourist seasons.", "Direct channel: no retailer's mark-up.", "So higher profit per piece / control of brand and price."],
      }),
      P.manual({
        label: "(c)", marks: 7,
        stem: "Discuss whether Thandeka should sell online as well as through the gift shops.",
        points: ["Online advantages as in (b) applied.", "Drawback: customers cannot see or touch the quality of handmade jewellery.", "Drawback: courier costs, risk of loss or fraud, time to manage a page and photographs.", "Gift shops may object to her undercutting them / relationship risk.", "Gift shops give display and trusted location for tourists.", "Suggests ways to reduce risk, e.g. good photographs, reviews, same prices as shops.", "Justified conclusion."],
        modelAnswer: "Selling online would let Thandeka reach customers anywhere, including tourists who have returned home, and she would keep the gift shops' mark-up. However, buyers cannot touch handmade jewellery before buying, courier delivery adds cost and risk, and she must spend time on photographs and messages. The gift shops may also be unhappy if she sells more cheaply online. Because the shops give her a trusted outlet where tourists can see the quality, she should keep them and add online sales at the same prices, using clear photographs and customers' reviews to build trust.",
      }),
    ],
    hints: ["(a) She does not sell directly to tourists.", "(c) Weigh wider reach and higher margin against trust, cost and the shops' reaction."],
    explanation: "Adding an online channel widens reach and margin, but trust, delivery and relationships with retailers must be managed.",
  });
  b.card("DEFINITION", "Channel (chain) of distribution?", "The route a product takes from producer to consumer, including any intermediaries.");
  b.card("FACT", "Four main channels?", "Producer → consumer; producer → retailer → consumer; producer → wholesaler → retailer → consumer; producer → agent → (retailer) → consumer.");
  b.card("CONCEPT", "Advantages of a direct channel?", "No intermediaries' mark-ups, close contact with customers, control over price and display.");
  b.card("CONCEPT", "Why use wholesalers?", "They break bulk, store, transport and reach many small retailers a producer could not reach.");
  b.card("CONCEPT", "Drawback of long channels?", "Each intermediary adds a mark-up and time; producer has less control and less customer contact.");
  b.card("CONCEPT", "Factors in choosing a channel?", "Product type (perishable, technical), number and location of customers, producer's resources, cost, control, competitors, selling abroad.");
  b.card("DEFINITION", "Agent?", "Arranges sales for a producer, usually for commission, without owning the goods; common in foreign markets.");
  b.card("CONCEPT", "Online selling: one advantage and one drawback?", "Advantage: reaches customers anywhere at any time. Drawback: delivery costs and customers cannot inspect goods.");
  b.card("FACT", "Can the wholesaler be eliminated?", "Yes (direct sales, supermarket chains, online), but its functions must still be performed by someone.", "ZIMSEC Commerce.", { applies: COM });
});
