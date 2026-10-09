// W3a: econ.firms.size-mergers — small and large firms, internal and external growth, horizontal, vertical and
// conglomerate mergers (integration), effects on stakeholders.
import { concept, P, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.size-mergers", { file: "firms/size-mergers", keyPrefix: "firms.size-mergers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Two banks join together to form one bank. What type of merger is this?",
    options: [
      ["Horizontal", "Correct: firms at the same stage of production."],
      ["Vertical (backward)", "That joins a firm with its supplier."],
      ["Vertical (forward)", "That joins a firm with a business nearer the consumer."],
      ["Conglomerate", "That joins firms in unrelated industries."],
    ],
    answer: "A",
    explanation: "Both firms provide the same service at the same stage, so it is a horizontal merger (integration).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A chocolate manufacturer buys a cocoa plantation. What type of merger is this?",
    options: [
      ["Backward vertical", "Correct: the firm joins with its supplier of raw materials."],
      ["Forward vertical", "Forward integration moves towards the consumer, e.g. buying shops."],
      ["Horizontal", "The firms are at different stages of production."],
      ["Conglomerate", "Cocoa and chocolate are in the same production chain."],
    ],
    answer: "A",
    explanation: "Moving back down the chain towards raw materials is backward vertical integration.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A brewery takes over a firm that sells life insurance. What is the main reason for this kind of merger?",
    options: [
      ["To spread risk across unrelated markets", "Correct: a conglomerate merger diversifies the business."],
      ["To secure supplies of raw materials", "That is a reason for backward vertical integration."],
      ["To gain a larger share of the beer market", "That would come from a horizontal merger."],
      ["To control the outlets that sell its beer", "That is a reason for forward vertical integration."],
    ],
    answer: "A",
    explanation: "Brewing and insurance are unrelated: this conglomerate merger spreads risk (diversification).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **internal growth** of a firm?",
    options: [
      ["Growing by expanding its own activities, such as opening branches", "Correct: organic growth."],
      ["Growing by buying a controlling share in another firm", "That is a takeover: external growth."],
      ["Growing by joining with another firm to form a new, larger firm", "That is a merger: external growth."],
      ["Growing by receiving a grant from the government", "A grant is a source of finance, not a method of growth."],
    ],
    answer: "A",
    explanation: "Internal (organic) growth comes from the firm's own expansion; mergers and takeovers are external growth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **best** explanation of why many small firms survive alongside large firms?",
    options: [
      ["They serve small or local markets that large firms ignore", "Correct: e.g. village shops, tailors, repairs."],
      ["They always have lower average costs than large firms", "Small firms usually have higher average costs."],
      ["They can borrow from banks more cheaply than large firms", "Small firms usually find finance harder and dearer to get."],
      ["They can benefit from more economies of scale", "Economies of scale favour large firms."],
    ],
    answer: "A",
    explanation: "Small firms survive where markets are small or local, where personal or specialised service is valued, and where little capital is needed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two of the three firms selling fertiliser in a country merge. Which effect on consumers is **most likely** if the merged firm faces little competition?",
    options: [
      ["Higher prices and less choice", "Correct: reduced competition gives market power."],
      ["Lower prices because there are fewer firms", "Fewer firms usually means less pressure to cut prices."],
      ["More choice of brands and suppliers", "The number of suppliers falls."],
      ["No change, because mergers never affect prices", "Mergers can change prices through costs or market power."],
    ],
    answer: "A",
    hints: ["What happens to competition when the number of sellers falls from three to two?"],
    explanation: "With fewer competitors, the merged firm can raise prices and reduce choice. Lower prices are possible only if cost savings are passed on.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A flour mill buys a chain of bakeries and then refuses to sell flour to independent bakeries. Which stakeholder is **most** harmed?",
    options: [
      ["Rival bakeries that relied on the mill for flour", "Correct: they lose a supplier and may be forced out."],
      ["The mill's shareholders, who lose a source of profit", "They gain control of outlets; any loss is uncertain."],
      ["The government, which loses all its tax revenue", "Tax revenue does not disappear."],
      ["The workers in the mill, whose jobs disappear", "The mill still needs workers to make flour."],
    ],
    answer: "A",
    hints: ["This is forward vertical integration. Who depended on the mill?"],
    explanation: "Forward vertical integration can be used to cut off rivals' supplies, reducing competition in the bakery market.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure would make a capital-intensive mining company look **larger** than a labour-intensive supermarket chain with more workers?",
    options: [
      ["Capital employed", "Correct: a mine uses large amounts of machinery and equipment."],
      ["Number of employees", "The supermarket chain has more workers."],
      ["Number of shops or outlets", "A mining company has few outlets."],
      ["Number of products sold", "Not a standard measure of size here."],
    ],
    answer: "A",
    explanation: "Capital employed reflects the value of machinery and buildings, which is high for mining.",
  });

  {
    const s = { A: 52, B: 39, C: 26, D: 13 }, tot = 130, mergedPct = ((s.C + s.D) / tot) * 100;
    check("tot", s.A + s.B + s.C + s.D, tot); check("m", mergedPct, 30);
    const tS = table(["Firm", "Annual sales (US\\$ million)"], Object.entries(s).map(([k, v]) => [`Firm ${k}`, v]));
    {
      const firm = 84, mkt = 240, sh = (firm / mkt) * 100;
      check("sh", sh, 35);
      b.num({
        d: 2, skill: "APPLICATION", kind: "pct", value: sh, daily: true,
        stem: `A fictional tyre retailer has annual sales of US\\$${firm} million in a market where total sales are US\\$${mkt} million. Calculate its market share, to one decimal place.`,
        wrong: [(firm / (mkt - firm)) * 100],
        explanation: `Market share = ${firm} ÷ ${mkt} × 100 = **${fmt(sh, 1)}%**. Dividing by the other firms' sales only (${mkt - firm}) uses the wrong total.`,
      });
    }
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: mergedPct,
      stem: `Use the table.\n\n${tS}\n\nFirms C and D merge. Calculate the market share of the merged firm, to one decimal place.`,
      wrong: [(s.C / tot) * 100 + 0, (s.C + s.D)],
      hints: ["Add the two firms' sales, then divide by the total market."],
      explanation: `1. Total market = ${s.A} + ${s.B} + ${s.C} + ${s.D} = ${tot}.\n2. Merged sales = ${s.C} + ${s.D} = ${s.C + s.D}.\n3. Share = ${s.C + s.D} ÷ ${tot} × 100 = **${fmt(mergedPct, 1)}%**.\n4. The market now has three firms: the merged firm has the same share as B (${fmt((s.B / tot) * 100, 1)}%), behind A (${fmt((s.A / tot) * 100, 1)}%). ${s.C + s.D} is its sales in US\\$ million, not a percentage.`,
    });
  }
  {
    const before = 1450, after = 1240, cut = before - after;
    check("cut", cut, 210);
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: cut, daily: true,
      stem: `Before a horizontal merger, two fictional insurance firms employed ${fmt(before)} people in total. After closing duplicate branches, the merged firm employs ${fmt(after)}. How many jobs were lost?`,
      wrong: [before + after],
      explanation: `${fmt(before)} − ${fmt(after)} = **${cut}** jobs lost. Workers are one stakeholder group that can lose from a horizontal merger.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A merger between a cotton farm and a textile mill is an example of vertical integration.",
    answer: true,
    explanation: "True. They are at different stages (primary and secondary) of the same production chain.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "External growth is usually slower than internal growth.",
    answer: false,
    explanation: "False. A merger or takeover adds a whole firm at once, so external growth is usually faster, though often more expensive and risky.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of merger (integration).",
    pairs: [
      ["A dairy buys another dairy", "Horizontal"],
      ["A cement maker buys a limestone quarry", "Backward vertical"],
      ["A clothing factory buys a chain of clothes shops", "Forward vertical"],
      ["A mining company buys a chain of hotels", "Conglomerate"],
    ],
    explanation: "Same stage: horizontal. Towards the supplier: backward vertical. Towards the consumer: forward vertical. Unrelated: conglomerate.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "When one firm buys enough shares to control another firm, this is called a {{blank:a}}. Opening new branches financed by profits is {{blank:b}} growth. Joining two firms in unrelated industries is a {{blank:c}} merger.",
    blanks: [
      { id: "a", accepted: ["takeover"], choices: ["takeover", "partnership", "co-operative"] },
      { id: "b", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "c", accepted: ["conglomerate"], choices: ["conglomerate", "horizontal", "vertical"] },
    ],
    explanation: "Takeover = gaining control by buying shares; organic growth is internal; unrelated industries = conglomerate.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** advantages to a firm of a horizontal merger.",
    points: [
      "Economies of scale, e.g. bulk buying / closing duplicate offices.",
      "So average costs fall and profits may rise.",
      "Larger market share / less competition.",
      "So the firm has more control over price / more secure sales.",
    ],
    modelAnswer: "First, the merged firm gains economies of scale: it can buy in bulk and close duplicate offices, so its average costs fall. Second, it gains a larger market share and faces less competition, so it has more control over its prices and more secure sales.",
    hints: ["Think about costs and competition."],
    explanation: "Two advantages, each identified and developed.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "A fictional tobacco-processing company in Harare buys tobacco from farmers, processes it and sells it to exporters. It is considering two options: (1) buying a rival processing company, or (2) buying several large tobacco farms.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentence.",
        template: "Option 1 is {{blank:a}} integration and option 2 is {{blank:b}} integration.",
        blanks: [
          { id: "a", accepted: ["horizontal"], choices: ["horizontal", "backward vertical", "forward vertical", "conglomerate"] },
          { id: "b", accepted: ["backward vertical"], choices: ["horizontal", "backward vertical", "forward vertical", "conglomerate"] },
        ],
        wrong: [["backward vertical", "horizontal"]],
        explanation: "A rival processor is at the same stage (horizontal); farms supply the raw material (backward vertical).",
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** advantages of option 2 to the company.", points: ["Secures supplies of tobacco.", "Even when harvests are poor / buyers compete for leaf.", "Control over quality of the leaf.", "Removes the farmers' profit margin, lowering costs."], modelAnswer: "First, owning farms secures a supply of tobacco even in years of poor harvests when processors compete for leaf. Second, the company controls the quality of the leaf and no longer pays the farmers' profit margin, which lowers its costs." }),
      P.manual({ label: "(c)", marks: 6, stem: "Analyse how option 1 could affect **two** different stakeholder groups.", points: ["Identifies a first stakeholder (e.g. tobacco farmers).", "Fewer buyers of leaf, so the merged firm has more buying power.", "So farmers may receive lower prices for their crop.", "Identifies a second stakeholder (e.g. workers / shareholders).", "Duplicate depots / offices are closed …", "… so some workers lose jobs, while shareholders may gain higher profits from cost savings."], modelAnswer: "Tobacco farmers would face fewer buyers for their crop. The merged company would have more buying power and could pay lower prices for leaf, reducing farmers' incomes. Workers could also be affected: the merged firm would close duplicate depots and offices to cut costs, so some jobs would be lost, although shareholders could gain from higher profits." }),
    ],
    explanation: "(a) Horizontal; backward vertical. (b) Secure supplies, quality and lower costs. (c) Farmers face fewer buyers; workers may lose jobs; shareholders may gain.",
    hints: ["Which stage is each option at compared with the company?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The two largest fictional supermarket chains in a southern African country plan to merge. Together they would have about 60% of grocery sales. They say the merger will lower costs through bulk buying and shared distribution.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define a **horizontal merger**.", points: ["Two or more firms join to form one firm.", "The firms are at the same stage of production / in the same industry."], modelAnswer: "A horizontal merger is the joining of two or more firms at the same stage of production in the same industry, here two supermarket chains." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the merger is likely to benefit consumers.",
        points: [
          "Benefit: economies of scale (bulk buying, shared distribution) lower average costs.",
          "Benefit: lower costs may be passed on as lower prices / wider range / investment in stores.",
          "Harm: 60% market share gives market power; less competition so prices may rise and choice fall.",
          "Harm: less incentive to improve service; store closures in some areas.",
          "Depends on competition from other retailers / informal traders and on the competition authority.",
          "Justified conclusion.",
        ],
        modelAnswer: "The merger could lower costs through bulk buying and shared warehouses and lorries, and if these savings are passed on, shoppers would pay less and may get a wider range of goods. However, with about 60% of grocery sales the merged firm would face much less competition, so it might keep the savings as profit, raise prices and reduce choice; some stores in the same areas might close. Whether consumers gain depends on the competition from other retailers and informal traders and on whether the competition authority sets conditions. With such a large market share, the risk of higher prices is greater than the likely cost savings, so consumers are unlikely to benefit unless conditions are imposed.",
      }),
    ],
    explanation: "(a) Joining firms at the same stage. (b) Economies of scale against market power; conclusion depends on competition and regulation.",
    hints: ["Will the cost savings be passed on?"],
  });

  b.card("DEFINITION", "Horizontal merger (integration)", "A merger of firms at the same stage of production in the same industry.");
  b.card("DEFINITION", "Vertical merger (integration)", "A merger of firms at different stages of the same production chain: backward (towards suppliers) or forward (towards consumers).");
  b.card("DEFINITION", "Conglomerate merger", "A merger of firms in unrelated industries, mainly to spread risk.");
  b.card("DEFINITION", "Internal (organic) growth", "Growth by expanding the firm's own activities, e.g. new branches or products.");
  b.card("DEFINITION", "External growth", "Growth by merging with or taking over other firms.");
  b.card("CONCEPT", "Measures of firm size", "Number of employees, capital employed, sales revenue and market share.");
  b.card("CONCEPT", "Why small firms survive", "Small or local markets, personal and specialised services, low capital needs, subcontracting for large firms, owners' wish to stay small.");
  b.card("CONCEPT", "Effects of a horizontal merger on consumers", "Possible lower prices from economies of scale, or higher prices and less choice from reduced competition.");
  b.card("FACT", "What is a takeover?", "One firm buys enough shares in another to gain control of it.");
});
