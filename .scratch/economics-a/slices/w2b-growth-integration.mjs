// W2b: growth of firms (organic growth, mergers and takeovers, types of integration).
import { concept, P, chk, fmt, concentrationRatio } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.firms.growth-integration", { file: "firms/growth-integration", keyPrefix: "firms.growth-integration" }, (b) => {
  mc(b, [1, "RECALL"], "Two bakery chains agree to combine into one business. This is",
    ["horizontal integration", "Correct: same industry and same stage of production."],
    [["backward vertical integration", "Backward means joining with a supplier."],
     ["forward vertical integration", "Forward means joining with a customer or retailer."],
     ["conglomerate integration", "That joins firms in unrelated industries."]],
    "Firms at the same stage in the same industry combine horizontally.");

  mc(b, [2, "UNDERSTANDING"], "A cooperative of tobacco growers buys a chain of shops that sells its products. This is an example of",
    ["forward vertical integration", "Correct: it moves towards its customers."],
    [["backward vertical integration", "That would be buying a supplier of seed or fertiliser."],
     ["horizontal integration", "Shops are at a later stage of production, not the same stage."],
     ["organic growth", "Buying another business is external growth."]],
    "Combining with a firm further along the chain towards the consumer is forward integration.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an example of organic growth?",
    ["A shop opens a second branch using its own profit", "Correct: growth from the firm's own resources."],
    [["A clothing firm buys a rival that makes shirts", "That is external growth by takeover."],
     ["Two transport firms agree to form a single company", "That is external growth by merger."],
     ["A miller buys a farm that grows its maize", "That is external, vertical growth."]],
    "Organic growth comes from reinvestment and expansion rather than from buying another firm.", { daily: true });

  mc(b, [2, "RECALL"], "A bus company takes over a chain of hotels. This is",
    ["conglomerate integration", "Correct: the industries are unrelated."],
    [["horizontal integration", "Buses and hotels are not the same industry."],
     ["backward vertical integration", "Hotels do not supply the bus company."],
     ["forward integration", "Hotels are not the bus company's customers in the production chain."]],
    "Combining firms in unrelated industries is conglomerate integration; its main aim is to spread risk.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Which reason best explains why a merged firm may have higher average costs than before?",
    ["Poorer communication in a larger organisation", "Correct: these are internal diseconomies of scale."],
    [["Bulk buying of materials at lower prices", "That would lower costs."],
     ["Spreading fixed costs over a much bigger output", "That is an economy of scale."],
     ["A single head office replacing two", "That is a saving, not a cost."]],
    "Larger firms can suffer diseconomies of scale from poor communication, slow decisions and clashes of culture.", { hints: ["Which option raises costs rather than lowering them?"] });

  mc(b, [3, "APPLICATION"], "A grain miller buys a large farm that supplies most of its wheat. The main motive is probably to",
    ["secure supplies and control the cost of inputs", "Correct: backward integration."],
    [["reduce risk by entering an unrelated market", "That is the motive for conglomerate integration."],
     ["remove a direct competitor from the milling market", "That is horizontal integration."],
     ["gain control of the shops that sell its flour", "That would be forward integration."]],
    "Buying a supplier is backward vertical integration, aimed at securing inputs.", { hints: ["Is the farm a supplier or a customer?"] });

  mc(b, [4, "EVALUATION"], "A competition authority is most likely to challenge a merger when the merging firms would together",
    ["hold most of a market that new firms struggle to enter", "Correct: the risk of higher prices is greatest."],
    [["be less than 5% of a market with hundreds of rivals", "Rivals would discipline the firm's prices."],
     ["operate in two unrelated industries in different regions", "There is no loss of competition."],
     ["promise to employ more workers than before", "Jobs are not the main test of harm to competition."]],
    "Concern is greatest when a high market share combines with barriers to entry.", { hints: ["Which option removes the most competition?"] });

  mc(b, [3, "ANALYSIS"], "Consumers are most likely to gain from a horizontal merger if",
    ["the cost savings are passed on in lower prices", "Correct: savings reach consumers only if competition forces it."],
    [["the merged firm raises prices to increase profit", "Consumers lose."],
     ["the merged firm cuts the range of products", "Choice falls."],
     ["rivals leave the market after the merger", "Less competition usually raises prices."]],
    "Cost savings help consumers only if competition or regulation makes the firm pass them on.", { hints: ["What must happen to prices?"] });

  {
    const after = concentrationRatio([30, 26, 20 + 14, 10], 2);
    chk(after, 64, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: after, dp: 0, hints: ["Add the shares of the two merging firms first, then find the two largest."],
      stem: "The fictional sugar market of Zandia has five firms with market shares of 30%, 26%, 20%, 14% and 10%. The firms with 20% and 14% merge. Calculate the two-firm concentration ratio after the merger, in %.",
      wrong: [56, 34, 74],
      explanation: "The merged firm has 20 + 14 = 34%. The market is now 34%, 30%, 26% and 10%. Two-firm concentration ratio = 34 + 30 = 64%. Before the merger it was 30 + 26 = 56%." });
  }
  {
    const prem = 8 * 1.5 * 0.4;
    chk(prem, 4.8, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", calculator: true, kind: "plain", value: prem, sf: 2, unit: "US$ million", hints: ["Market value first, then the premium."],
      stem: "A fictional retailer bids for all 8 million shares of a rival whose shares trade at US\\$1.50. It offers a 40% premium. Calculate the total premium it pays over the market value, in US\\$ million.",
      wrong: [12, 16.8, 0.6],
      explanation: "1. Market value = 8 million × 1.50 = US\\$12 million.\n2. Premium = 40% × 12 = US\\$4.8 million.\n3. (The total price is US\\$16.8 million.)" });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A takeover always takes place with the agreement of the managers of the target firm.", answer: false,
    explanation: "False. In a hostile takeover the acquirer buys control against the wishes of the target's managers." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Conglomerate integration can reduce a firm's risk because it does not rely on a single industry.", answer: true,
    explanation: "True. Losses in one industry can be offset by profits in another." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each example with the type of integration.",
    pairs: [["Two cement producers merge", "Horizontal"], ["A brewer buys a barley farm", "Backward vertical"], ["A clothing maker buys a group of retail shops", "Forward vertical"], ["A mining company buys a television station", "Conglomerate"]],
    explanation: "Same stage: horizontal; supplier: backward; customer: forward; unrelated: conglomerate." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct terms.",
    template: "Integration between firms at different stages of production of the same product is called {{blank:a}} integration, while integration between firms in unrelated industries is called {{blank:b}} integration.",
    blanks: [{ id: "a", accepted: ["vertical"], choices: ["horizontal", "vertical", "conglomerate"] }, { id: "b", accepted: ["conglomerate"], choices: ["horizontal", "vertical", "conglomerate"] }],
    explanation: "Vertical joins different stages; conglomerate joins unrelated industries." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of integration when a firm takes over one of its suppliers.",
    accepted: ["backward vertical integration", "vertical backward integration", "backward integration", "backward vertical", "vertical integration (backward)"], wrong: ["horizontal integration"],
    explanation: "Joining with a supplier is backward vertical integration." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "Distinguish between a merger and a takeover.",
    points: ["A merger is an agreement between two firms to combine into one business.", "A takeover occurs when one firm buys enough shares to gain control of another.", "A takeover may be hostile (against the target's management), whereas a merger is by agreement."],
    modelAnswer: "A merger is an agreement between two firms to join into one business. In a takeover one firm buys enough of another's shares to control it, and this may be hostile, against the wishes of the target's managers.",
    explanation: "One mark for each of the three distinguishing ideas." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each reason and say how it helps the firm."],
    stem: "Explain **two** reasons why a firm might choose to grow by merger or takeover rather than organically.",
    points: ["Reason 1 identified (for example speed of growth or immediate market share).", "Reason 1 explained: the firm gains customers and output at once instead of waiting for years of reinvestment.", "Reason 2 identified (for example removing a competitor or gaining economies of scale).", "Reason 2 explained: fewer rivals give more power over price, or combined output lowers unit cost."],
    modelAnswer: "A merger gives growth at once: the firm acquires the customers and output of the other firm, whereas organic growth may take years of reinvestment. A merger with a rival also removes a competitor, giving the firm more power over price, and combining production can lower unit costs through economies of scale.",
    explanation: "Identify and explain two reasons." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about costs after the merger, not just before."],
    stem: "Analyse why a merger might fail to reduce a firm's average costs.",
    points: ["The larger firm may suffer diseconomies of scale.", "Communication and coordination become harder, so decisions are slower.", "Different management styles and cultures clash, lowering productivity.", "There are costs of combining systems and the premium paid for the target must be recovered, so average cost may rise."],
    modelAnswer: "A larger firm may suffer diseconomies of scale because communication and coordination become harder and decisions slow down. The two firms may have different cultures, so staff are less productive, and combining IT and production systems is costly. The premium paid for the target also has to be recovered, so average costs may rise rather than fall.",
    explanation: "Credit diseconomies, communication, culture clash and integration costs." });

  {
    const before = (120000 * 9.5 + 80000 * 10.5) / 1000, after = (200000 * 8.8) / 1000;
    chk(before, 1980, 1e-9); chk(before - after, 220, 1e-9);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Total cost = output × average cost.", "Compare total cost before and after the merger."],
      stem: "**A merger of two clothing makers (illustrative data)**\n\nTwo fictional clothing makers in Bulawayo agree to merge. Before the merger, Maker P makes 120,000 shirts a year at an average cost of US\\$9.50 a shirt and Maker Q makes 80,000 shirts a year at an average cost of US\\$10.50 a shirt. After the merger the combined firm makes 200,000 shirts a year at an average cost of US\\$8.80 a shirt.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: before, unit: "US$ thousand", stem: "Calculate the total annual cost of the two makers before the merger, in US\\$ thousand.", wrong: [1760, 20, 1000], explanation: "P: 120,000 × 9.50 = 1,140,000. Q: 80,000 × 10.50 = 840,000. Total = US\\$1,980 thousand." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: before - after, unit: "US$ thousand", stem: "Calculate the annual saving in total cost after the merger, in US\\$ thousand.", wrong: [1760, 1980, 1.7], explanation: "After the merger: 200,000 × 8.80 = US\\$1,760 thousand. Saving = 1,980 − 1,760 = US\\$220 thousand." }),
        P.mcq({ label: "(c)", marks: 1, stem: "What type of integration is this?", options: [["Conglomerate integration", "The firms are in the same industry."], ["Backward vertical integration", "Neither firm supplies the other."], ["Forward vertical integration", "Neither firm is the other's customer."], ["Horizontal integration", "Correct: same industry and stage."]], answer: "D", explanation: "Both firms make shirts: horizontal integration." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** reason why consumers might not benefit from the cost saving.",
          points: ["The merged firm has fewer rivals and more market power.", "It may keep the saving as extra profit rather than cutting prices.", "Consumers then pay the same or a higher price, so they do not gain."],
          modelAnswer: "After the merger there is one fewer competitor, so the firm has more power over price. It may keep the US\\$220 thousand saving as extra profit instead of lowering prices, so consumers pay as much as before or more." }),
      ],
      explanation: "Total cost before US\\$1,980 thousand; saving US\\$220 thousand; horizontal integration; savings are not always passed on." });
  }
  {
    const margin = (1.1 - 0.8) * 2000000 / 1000;
    chk(margin, 600, 1e-6);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Margin per litre × litres sold.", "Think about rivals who still depend on the dairy."],
      stem: "**A dairy buys its shops (illustrative data)**\n\nA fictional dairy in Mutare processes milk and sells it to independent shops at US\\$0.80 a litre. The shops sell it to the public at US\\$1.10 a litre. The dairy buys a chain of shops that sells 2 million litres a year, so it now sells that milk to the public itself.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "This is an example of", options: [["horizontal integration", "The dairy and the shops are at different stages."], ["forward vertical integration", "Correct: the dairy has moved towards its customers."], ["backward vertical integration", "The shops are not suppliers."], ["organic growth", "Buying another business is external."]], answer: "B", explanation: "Buying retail outlets is forward vertical integration." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: margin, unit: "US$ thousand", stem: "Calculate the retail margin per year that the dairy now keeps on the 2 million litres, in US\\$ thousand.", wrong: [2200, 1600, 0.6], explanation: "Margin = 1.10 − 0.80 = US\\$0.30 a litre. 0.30 × 2,000,000 = US\\$600,000 = US\\$600 thousand." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** benefit of the purchase to the dairy.",
          points: ["The dairy secures an outlet for its milk.", "It keeps the retail margin that the shops earned.", "This raises profit or lets it control the price and quality at the point of sale."],
          modelAnswer: "The dairy secures a guaranteed outlet for its milk and keeps the retailers' margin of US\\$0.30 a litre, which raises its profit. It also controls how its milk is displayed, priced and stored." }),
        P.manual({ label: "(d)", marks: 3, stem: "Analyse the possible effect on independent shops that still buy from the dairy.",
          points: ["The dairy now competes with its own customers.", "It might raise the price it charges them or favour its own shops in supply.", "Their costs rise or they lose customers, so some may close."],
          modelAnswer: "The dairy now competes with the independent shops it supplies. It could raise the wholesale price or supply its own shops first, which raises the independents' costs or leaves them short of milk. Some may lose customers and close." }),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether consumers are likely to gain from the purchase.",
          points: ["Gain: cutting out a middleman can lower prices if the saving is passed on.", "Loss: fewer independent retailers means less competition and choice, and a higher price.", "The outcome depends on the strength of remaining competition and regulation."],
          modelAnswer: "Consumers could gain if the dairy cuts out a middleman and passes on part of the margin as a lower price. But if independent shops close, competition and choice fall and the dairy may raise prices. The outcome depends on how many rival retailers and dairies remain and on whether regulators step in." }),
      ],
      explanation: "Forward vertical integration; margin US\\$600 thousand; effects on the firm, rivals and consumers." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both consumers' gains and losses.", "Reach a judgement."],
    stem: "Assess whether mergers between large firms benefit consumers.",
    points: ["Economies of scale may lower unit costs.", "Lower costs can be passed on in lower prices if competition remains strong.", "Larger firms can spend more on research, bringing better products.", "Fewer competitors give the merged firm more market power and may mean higher prices.", "Choice may fall if brands are closed.", "The effect depends on the market share of the merged firm and the barriers to entry.", "Regulation and the threat of imports can limit abuse of power.", "A justified judgement about when consumers gain."],
    levels: LV8,
    modelAnswer: "A merger can lower costs through economies of scale, and if competition remains strong the firm must pass some of the saving on in lower prices. A bigger firm may also spend more on research and develop better products. But a merger reduces the number of competitors, giving the merged firm more power to raise prices, and it may withdraw brands, reducing choice. The outcome depends on how large the market share becomes, on barriers to entry and on whether regulators or imports limit the firm's power. Overall, consumers are likely to gain where the market stays competitive and the savings are large, but lose where the merger creates a dominant firm protected by high barriers.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh cost savings and innovation against market power, then judge on market conditions." });

  b.card("DEFINITION", "Define **organic growth**.", "Growth of a firm from its own resources, such as reinvested profit and expansion of existing activities, without taking over another firm.");
  b.card("DEFINITION", "Distinguish a **merger** from a **takeover**.", "A merger is agreed between two firms; in a takeover one firm buys control of another, sometimes against the target's wishes (hostile).");
  b.card("CONCEPT", "What is **horizontal integration**?", "Combination of firms at the same stage of production in the same industry, for example two bakery chains.");
  b.card("CONCEPT", "What is **backward vertical integration**?", "A firm joins with a supplier, for example a bakery buying a flour mill, to secure inputs and control costs.");
  b.card("CONCEPT", "What is **forward vertical integration**?", "A firm joins with a customer or retailer further along the chain, to secure outlets and capture the retail margin.");
  b.card("CONCEPT", "What is **conglomerate integration**, and why is it done?", "Combination of firms in unrelated industries, to spread risk and enter new markets.");
  b.card("CONCEPT", "Give **three** motives for a horizontal merger.", "Economies of scale, greater market share and market power, and removing a competitor.");
  b.card("CONCEPT", "Why might a merger raise rather than lower average costs?", "Diseconomies of scale, clashes of culture, communication problems and the cost of the premium and of combining systems.");
  b.card("FORMULA", "How is the **n-firm concentration ratio** found?", "Add the market shares of the n largest firms; after a merger, add the shares of the merging firms first.");
});

