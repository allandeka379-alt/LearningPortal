// Slice W4b: agricultural marketing (ZIMSEC only). All prices are assumed.
import { concept, P, round, check, table } from "../lib.mjs";

const netCab = round(0.8 - 0.15 - 0.05, 2);
check(netCab === 0.6, "netCab");
const extraCab = round((netCab - 0.45) * 400, 2);
check(extraCab === 60, "extraCab");
const gradeVal = round(2.2 * 300 + 0.8 * 240, 2);
check(gradeVal === 852, "gradeVal");
const tobGross = 1850 * 3;
const tobNet = tobGross - 1900;
check(tobGross === 5550 && tobNet === 3650, "tob");
// Struct 8: selling 4 steers.
const OPTIONS = [["Village sale", 420, 0, 0], ["Auction", 520, 25, 0.05], ["Abattoir (carcass basis)", 560, 40, 0]];
const OT = table(["Option", "Price per steer (US\\$)", "Transport per steer (US\\$)", "Commission (share of price)"], OPTIONS.map(([o, p, tr, c]) => [o, p, tr, c ? `${c * 100}%` : "none"]));
const nets = OPTIONS.map(([, p, tr, c]) => round(p - tr - p * c, 2));
check(nets.join() === "420,469,520", "nets");
const best4 = nets[2] * 4;
check(best4 === 2080, "best4");

concept("agri.business.marketing", { file: "business/marketing", keyPrefix: "business.marketing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which marketing function involves sorting produce into classes of quality and size?",
    options: [
      ["Grading", "Correct."],
      ["Assembling", "Collecting small lots into large ones."],
      ["Financing", "Providing money or credit."],
      ["Storage", "Keeping produce until needed."],
    ],
    answer: "A",
    explanation: "Grading (standardisation) sorts produce into quality classes that earn different prices.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Milling maize into maize meal is an example of which marketing function?",
    options: [
      ["Processing (value addition)", "Correct: changes the form of the produce."],
      ["Transport to the consumer's town", "Moving produce, not changing it."],
      ["Assembling", "Collecting produce together."],
      ["Risk bearing", "Carrying the risk of loss."],
    ],
    answer: "A",
    explanation: "Processing changes produce into a more useful or durable form and adds value.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an informal market for vegetables?",
    options: [
      ["A roadside stall", "Correct: cash sales, unregistered."],
      ["A supermarket supply contract", "A formal market."],
      ["A hotel with a written order", "A formal market."],
      ["A canning factory", "A formal market."],
    ],
    answer: "A",
    explanation: "Informal markets are unregistered cash sales such as roadside stalls and vendors.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statutory body regulates the sale of tobacco in Zimbabwe?",
    options: [
      ["The Tobacco Industry and Marketing Board", "Correct (TIMB)."],
      ["The Grain Marketing Board (GMB)", "The GMB deals with grain."],
      ["The Environmental Management Agency (EMA)", "EMA deals with the environment."],
      ["The Zimbabwe National Water Authority (ZINWA)", "ZINWA manages water."],
    ],
    answer: "A",
    explanation: "The TIMB registers growers, buyers and auction floors and regulates tobacco sales.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do tomato prices often fall sharply at the peak of the harvest season?",
    options: [
      ["Supply is high and the crop is perishable", "Correct: sellers cannot wait."],
      ["Consumers stop eating tomatoes in that season", "Demand does not usually collapse."],
      ["Government fixes tomato prices then", "Tomatoes are sold on a free market."],
      ["Tomatoes are graded more strictly then", "Grading is not the main cause."],
    ],
    answer: "A",
    hints: ["Think of supply, demand and how long tomatoes keep."],
    explanation: "Many growers sell at once and tomatoes cannot be stored long, so supply exceeds demand and prices fall.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main feature of a controlled market?",
    options: [
      ["Government controls the price or the buyer", "Correct."],
      ["Prices are set freely by supply and demand alone", "That is an uncontrolled market."],
      ["Sales happen only at roadsides", "That describes informal markets."],
      ["Only processed goods may be sold", "Not a feature of control."],
    ],
    answer: "A",
    hints: ["Who sets the rules?"],
    explanation: "In a controlled market the law or a statutory body fixes prices, buyers or selling channels.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A smallholder far from any town grows cotton under contract. Which is the most likely **benefit** of the contract to her?",
    options: [
      ["Inputs on credit and an assured buyer", "Correct: paid back from the crop sale."],
      ["She can sell to any buyer without repaying inputs", "That is side-marketing, which breaks the contract."],
      ["She is certain to get the highest market price", "Contract prices are agreed, not always highest."],
      ["She needs to keep no records at all", "Records are still needed."],
    ],
    answer: "A",
    hints: ["What does the company provide before planting?"],
    explanation: "Contract farming gives access to inputs, credit, advice and a guaranteed market, repaid from the crop.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which marketing function most helps a farmer sell potatoes at a better price several months after harvest?",
    options: [
      ["Storage", "Correct: spreads supply over time."],
      ["Assembling", "Not about timing of sales."],
      ["Grading", "Affects price by quality, not timing."],
      ["Packaging", "Protects produce but does not delay sale."],
    ],
    answer: "A",
    hints: ["When are prices usually higher?"],
    explanation: "Good storage lets the farmer sell after the harvest glut, when prices are usually higher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A supermarket that buys graded vegetables under a written contract is an example of a formal market.",
    answer: true,
    explanation: "True. It is organised, registered and uses contracts and grading.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each activity with its marketing function.",
    pairs: [
      ["Collecting milk from many smallholders at a cooling centre", "Assembling"],
      ["Putting eggs into trays", "Packaging"],
      ["Keeping grain in a silo", "Storage"],
      ["Making yoghurt from milk", "Processing"],
      ["Advancing seed and fertiliser before planting", "Financing"],
    ],
    explanation: "Each activity is one of the functions of marketing.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Selling a contracted crop to another buyer without repaying the inputs is called {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["side-marketing", "side marketing", "side-selling", "side selling"] }],
    explanation: "**Side-marketing** (side-selling).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the statutory body in Zimbabwe that buys, stores and sells grain and keeps strategic grain reserves.",
    accepted: ["Grain Marketing Board", "GMB", "the Grain Marketing Board"],
    keywords: { any: ["grain marketing", "gmb"] },
    explanation: "The **Grain Marketing Board (GMB)**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Assume a farmer sells cabbages in town at US\\$0.80 each. Transport costs US\\$0.15 and the market fee US\\$0.05 per cabbage. Calculate her net price per cabbage.",
    value: netCab, prefix: "US$", answer: "0.60", wrong: [0.8, round(0.8 - 0.15, 2)],
    explanation: `0.80 − 0.15 − 0.05 = US\\$${netCab.toFixed(2)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The same farmer has 400 cabbages. A trader offers US\\$0.45 each at the farm gate. Using her net town price of US\\$0.60, calculate how much more she earns by selling in town.",
    value: extraCab, prefix: "US$", wrong: [round(0.6 * 400, 2), round((0.8 - 0.45) * 400, 2)],
    hints: ["Difference per cabbage × number of cabbages."],
    explanation: `(0.60 − 0.45) × 400 = 0.15 × 400 = US\\$${extraCab}. Using the gross town price (0.80) forgets the marketing costs.`,
    workedSolution: `1. Extra per cabbage = 0.60 − 0.45 = US\\$0.15.\n2. Extra for 400 = 0.15 × 400 = US\\$${extraCab}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume grade A maize earns US\\$300 per tonne and grade B US\\$240 per tonne. After grading, a farmer has 2.2 t of grade A and 0.8 t of grade B. Calculate the total value.",
    value: gradeVal, prefix: "US$", wrong: [3 * 300, 3 * 240],
    hints: ["Value each grade separately and add."],
    explanation: `2.2 × 300 = US\\$660; 0.8 × 240 = US\\$192; total US\\$${gradeVal}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A contract tobacco grower sells 1,850 kg at an assumed average of US\\$3.00 per kg. The company deducts US\\$1,900 for inputs supplied on credit. Calculate the amount paid to the grower.",
    value: tobNet, prefix: "US$", wrong: [tobGross, 1850 * 3 + 1900],
    hints: ["Gross sale value minus the input loan."],
    explanation: `1,850 × 3.00 = US\\$5,550; 5,550 − 1,900 = US\\$${tobNet.toLocaleString("en-GB")}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors that make the marketing of fresh milk difficult for a smallholder.",
    hints: ["Perishability and distance."],
    points: [
      "Milk is highly perishable / sours quickly in heat.",
      "So it must be cooled or processed, or delivered within hours.",
      "Smallholders are often far from processors on poor roads / produce small amounts.",
      "So transport per litre is costly, unless milk is assembled at a collection or cooling centre (co-operative).",
    ],
    modelAnswer: "Milk spoils within hours in hot weather, so it must be cooled or processed quickly. Smallholders produce small amounts far from processors on poor roads, so transport per litre is expensive unless milk is collected at a shared cooling centre.",
    explanation: "Factor plus effect.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss **one** advantage and **one** disadvantage to a farmer of selling grain through a controlled market with a fixed price, compared with a free market.",
    hints: ["Certainty versus price and payment."],
    points: [
      "Advantage: a guaranteed buyer and a known price at planting time.",
      "So the farmer can plan and is protected from price crashes or dishonest traders.",
      "Disadvantage: the fixed price may be lower than the open market price / payment may be late / depots may be far away.",
      "So the farmer's income or cash flow suffers; judgement depends on how reliable the buyer and price are.",
    ],
    modelAnswer: "A controlled market guarantees a buyer and a known price, so the farmer can plan and is protected from collapses in price. However, the fixed price may be below what a free market would pay and payment may be late, which hurts cash flow.",
    explanation: "Balanced points with effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Tendai, near Masvingo, wants to sell 4 steers. He has three options (assumed figures).\n\n${OT}`,
    hints: ["Net = price − transport − commission.", "Commission = share × price."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the net amount per steer at the auction.",
        value: nets[1], prefix: "US$", wrong: [520 - 25, 520 - 0.05],
        explanation: `Commission = 0.05 × 520 = US\\$26; net = 520 − 25 − 26 = US\\$${nets[1]}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the total net amount for all 4 steers if he sells to the abattoir.",
        value: best4, prefix: "US$", wrong: [560 * 4, nets[2]],
        explanation: `Net per steer = 560 − 40 = US\\$${nets[2]}; × 4 = US\\$${best4.toLocaleString("en-GB")}.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which option gives the highest net return per steer?",
        options: [
          ["Abattoir", "Correct: US\\$520 net."],
          ["Auction", "US\\$469 net."],
          ["Village sale", "US\\$420 net."],
          ["All three give the same return", "The net returns differ."],
        ],
        answer: "A",
        explanation: "Abattoir 520 > auction 469 > village 420.",
      }),
      P.short({
        label: "(d)", stem: "Name the document Tendai needs from the veterinary services before moving the cattle to the auction or abattoir.",
        accepted: ["movement permit", "a movement permit", "permit", "livestock movement permit", "cattle movement permit", "veterinary movement permit"],
        keywords: { any: ["permit"] },
        explanation: "A **movement permit**, which helps control the spread of disease.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** reasons why Tendai might still choose the village sale.",
        points: ["No transport or commission costs and payment in cash at once.", "No travel time or risk to the animals on the road / steers in poor condition might be graded low at the abattoir / he can sell one at a time when cash is needed."],
        explanation: "Convenience, cash and risk.",
      }),
    ],
    explanation: "Compare net returns from different livestock markets.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 6,
    stem: "Chipo, near Gokwe, is offered a cotton contract: the company will supply seed, fertiliser and chemicals on credit and send an extension adviser; she must sell all her cotton to the company, which deducts the input costs from her payment.",
    hints: ["Think of both sides of the contract."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** benefits of the contract to Chipo.",
        points: ["Inputs on credit when she has no cash at planting.", "A guaranteed buyer / technical advice / higher yields from correct inputs."],
        explanation: "Inputs, market, advice.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "State **two** possible problems for Chipo.",
        points: ["Input costs (and interest) are deducted, so the net payment may be small, especially after a poor season.", "She cannot sell to a buyer offering a better price / she depends on the company paying on time and fairly."],
        explanation: "Debt and dependence.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why companies discourage side-marketing.",
        points: ["If the crop is sold to another buyer, the company cannot recover the inputs it supplied on credit.", "This causes losses and makes companies reluctant to offer contracts to other farmers in future."],
        explanation: "Recovering the credit.",
      }),
    ],
    explanation: "Evaluate contract farming for a smallholder.",
  });

  b.card("DEFINITION", "Agricultural marketing", "All activities that move farm produce from the producer to the consumer.");
  b.card("CONCEPT", "Ten functions of marketing", "Assembling, grading, processing, packaging, storage, transport, financing, risk bearing, market information, selling.");
  b.card("CONCEPT", "Controlled versus uncontrolled market", "Controlled: government sets the price or the buyer. Uncontrolled: price set by supply and demand.");
  b.card("CONCEPT", "Formal versus informal market", "Formal: registered, contracts, grading, records (GMB, auctions, abattoirs, supermarkets). Informal: cash sales at roadsides and villages.");
  b.card("CONCEPT", "Factors affecting marketing", "Perishability, bulk, seasonality, quality, distance and roads, supply and demand, information, storage, government policy, number of buyers.");
  b.card("FACT", "Roles of the GMB and TIMB", "GMB: buys, stores and sells grain; strategic reserves. TIMB: registers and regulates tobacco growers, buyers and sales.");
  b.card("DEFINITION", "Contract farming", "A buyer agrees in advance to buy the crop and often supplies inputs and credit repaid from the sale.");
  b.card("FORMULA", "Net price", "Net price = selling price − marketing costs (transport, fees, commission).");
});
