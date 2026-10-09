// W4b: econ.trade.domestic-trade (ZIMSEC only) — characteristics and importance of domestic trade, wholesalers and
// retailers, formal and informal trade, informal traders in Zimbabwe. Figures differ from the lesson's worked example.
import { concept, P, fmt, pct, pctChange, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.trade.domestic-trade", { file: "trade/domestic-trade", keyPrefix: "trade.domestic-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **domestic trade**?",
    options: [
      ["Buying and selling of goods and services within one country", "Correct."],
      ["Trade in goods between two or more countries", "That is foreign (international) trade."],
      ["Production of goods by households for their own use and not for sale", "That is subsistence production, not trade."],
      ["Exchange of goods without using any money", "That is barter; domestic trade normally uses money."],
    ],
    answer: "A",
    explanation: "Domestic (home) trade takes place within a country's borders, using its own currency and laws.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the usual order of the chain of distribution?",
    options: [
      ["Producer → wholesaler → retailer → consumer", "Correct."],
      ["Producer → retailer → wholesaler → consumer", "The wholesaler sells to the retailer, not the other way round."],
      ["Wholesaler → producer → retailer → consumer", "Goods start with the producer."],
      ["Consumer → retailer → wholesaler → producer", "This is the reverse of the flow of goods."],
    ],
    answer: "A",
    explanation: "Goods flow from the producer to the wholesaler, who sells to retailers, who sell to consumers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A wholesaler buys 500 bags of sugar from a mill and sells them to shops in lots of 10 bags. Which function is the wholesaler performing?",
    options: [
      ["Bulk breaking", "Correct: buying in large quantities and selling in smaller ones."],
      ["Advertising", "Nothing in the example concerns advertising."],
      ["Manufacturing", "The wholesaler does not make the sugar."],
      ["After-sales service", "That is a retailer's service to consumers."],
    ],
    answer: "A",
    explanation: "Breaking bulk means dividing large quantities from producers into smaller quantities that suit retailers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of a **retailer** rather than a wholesaler?",
    options: [
      ["Selling goods in small quantities to final consumers", "Correct."],
      ["Buying goods in very large quantities from manufacturers", "This is mainly a wholesaler's function."],
      ["Storing goods in large warehouses for producers", "This is a wholesaler's function."],
      ["Giving credit to shops that buy stock", "This is a wholesaler's service to retailers."],
    ],
    answer: "A",
    explanation: "Retailers are the last link in the chain: they sell small quantities to consumers, near where they live.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature describes **informal** trade?",
    options: [
      ["The business is not registered and pays little or no tax", "Correct."],
      ["The business keeps full accounts audited every year", "This describes formal businesses."],
      ["The workers have contracts, pensions and safety protection", "This describes formal employment."],
      ["The business always sells goods that are against the law", "Informal trade is mostly in legal goods."],
    ],
    answer: "A",
    explanation: "Informal trade is carried out by unregistered businesses outside most regulation and taxation; most of the goods sold are legal.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can a large supermarket chain often cut out the wholesaler?",
    options: [
      ["It buys in bulk directly and has its own warehouses and transport", "Correct: it performs the wholesaler's functions itself."],
      ["It sells only goods that are produced by wholesalers", "Wholesalers do not usually produce goods."],
      ["It is not allowed by law to buy from wholesalers", "There is no such law."],
      ["It sells goods only in large quantities to other shops and traders", "Supermarkets sell to final consumers."],
    ],
    answer: "A",
    hints: ["Which functions does a wholesaler normally perform?"],
    explanation: "A large retailer can buy direct in bulk, store and transport goods itself, keeping the wholesaler's mark-up and charging lower prices.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a **problem** that informal traders cause for the government?",
    options: [
      ["It collects little tax revenue from them", "Correct: unregistered businesses pay little tax."],
      ["They create many jobs for unemployed people", "This is a benefit."],
      ["They sell goods in small, convenient quantities", "This is a benefit to consumers."],
      ["They distribute goods to areas shops do not reach", "This is a benefit."],
    ],
    answer: "A",
    hints: ["Which option is a cost rather than a benefit?"],
    explanation: "Because informal traders are unregistered, the government collects little tax, even though they provide jobs and convenience.",
  });

  // Numericals.
  {
    const p0 = 40, w = 20, r = 30, pw = p0 * (1 + w / 100), pr = pw * (1 + r / 100);
    check("pw", pw, 48); check("pr", pr, 62.4);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: pr, dp: 2, calculator: true,
      stem: `A fictional cooking-oil factory sells a case of oil to a wholesaler for US\\$${p0}. The wholesaler adds a mark-up of ${w}% and the retailer adds a mark-up of ${r}%. Calculate the price of the case to the consumer, in US\\$ to two decimal places.`,
      wrong: [p0 * (1 + (w + r) / 100), pw],
      hints: ["Apply the wholesaler's mark-up first.", "Then apply the retailer's mark-up to the wholesaler's price."],
      explanation: `1. Wholesaler's price = ${p0} × 1.${w} = US\\$${fmt(pw)}.\n2. Retailer's price = ${fmt(pw)} × 1.${r} = **US\\$${fmt(pr, 2)}**.\n3. Adding the two mark-ups (50%) to US\\$${p0} gives US\\$${fmt(p0 * 1.5, 2)}, which is wrong because the retailer's mark-up is on the wholesaler's price.`,
    });
  }
  {
    const c = 2.5, s = 3.2, mu = pctChange(c, s);
    check("mu", mu, 28);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: mu, daily: true,
      stem: `A tuck-shop owner buys a loaf of bread for US\\$${fmt(c, 2)} and sells it for US\\$${fmt(s, 2)}. Calculate the mark-up as a percentage of the cost price. Give your answer to one decimal place.`,
      wrong: [((s - c) / s) * 100],
      explanation: `Mark-up = (${fmt(s, 2)} − ${fmt(c, 2)}) ÷ ${fmt(c, 2)} × 100 = **${pct(mu, 1)}**. Dividing by the selling price gives ${pct(((s - c) / s) * 100, 1)} (that is the margin, not the mark-up).`,
    });
  }
  {
    const cartonPrice = 18, packs = 24, single = 1, buyCartons = cartonPrice / packs, profit = (single - buyCartons) * packs;
    check("profit", profit, 6);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: profit,
      stem: `An informal vendor buys a carton of ${packs} packets of biscuits for US\\$${cartonPrice} and sells the packets one at a time for US\\$${single} each. If she sells the whole carton, what is her profit, in US\\$?`,
      wrong: [packs * single, cartonPrice - packs],
      hints: ["Total sales − cost of the carton."],
      explanation: `Sales = ${packs} × US\\$${single} = US\\$${packs}; cost = US\\$${cartonPrice}; profit = **US\\$${profit}**. By breaking bulk she earns a return for selling in small, convenient quantities.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Domestic trade does not involve exchanging one currency for another.",
    answer: true,
    explanation: "True. Buyers and sellers in the same country use the same currency.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Wholesalers only add to the price of goods and provide no useful services.",
    answer: false,
    explanation: "False. Their mark-up pays for bulk breaking, storage, transport, credit, risk bearing and information.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each function of the wholesaler with its description.",
    pairs: [
      ["Bulk breaking", "Dividing large quantities into smaller lots"],
      ["Warehousing", "Holding stock until retailers need it"],
      ["Granting credit", "Letting retailers pay for goods later"],
      ["Risk bearing", "Carrying losses if goods spoil or prices fall"],
    ],
    explanation: "These services explain why wholesalers earn a mark-up.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A vendor at a kombi rank who is not registered and pays no income tax is part of the {{blank:a}} sector. A supermarket that charges VAT is part of the {{blank:b}} sector.",
    blanks: [
      { id: "a", accepted: ["informal"], choices: ["formal", "informal"] },
      { id: "b", accepted: ["formal"], choices: ["formal", "informal"] },
    ],
    wrong: [["formal", "informal"]],
    explanation: "Registration and taxation distinguish the formal from the informal sector.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why domestic trade is important to Zimbabwe's economy.",
    points: [
      "It links producers and consumers / makes specialisation possible…",
      "…so people can concentrate on what they do best and obtain other goods by trading.",
      "It creates jobs and incomes (traders, transporters) / provides tax revenue / spreads goods to rural areas…",
      "…developed, e.g. many people earn a living through trading.",
    ],
    modelAnswer: "First, domestic trade links producers with consumers, which makes specialisation possible: a farmer in Mutoko can grow tomatoes and use the money from selling them in Harare to buy maize meal and clothes. Second, it creates jobs and incomes for traders, transporters and shop workers, and formal traders pay taxes that fund government services.",
    hints: ["Think about specialisation, jobs and tax."],
    explanation: "Two marks per reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** ways in which informal traders benefit consumers in Zimbabwe.",
    points: [
      "They sell in small, affordable quantities…",
      "…so low-income households can buy what they can afford each day.",
      "They are convenient (near homes, long hours) / lower prices due to low costs / reach areas without shops…",
      "…saving consumers time and transport costs.",
    ],
    modelAnswer: "First, informal traders sell goods in very small quantities, such as a single egg or a small packet of sugar, so low-income households can buy what they can afford each day. Second, they trade near homes, bus stops and kombi ranks for long hours and often at low prices because their costs are low, saving consumers time and transport costs.",
    hints: ["Think about quantity, price and convenience."],
    explanation: "Two marks per benefit.",
  });

  // Structured 1 (8 marks).
  {
    const p0 = 30, w = 20, r = 25, pw = p0 * (1 + w / 100), pr = pw * (1 + r / 100), unit = pr / 12;
    check("pr", pr, 45); check("unit", unit, 3.75);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `A fictional dairy in Gweru sells a crate of 12 tubs of yoghurt to a wholesaler for US\\$${p0}. The wholesaler adds a ${w}% mark-up and sells to tuck-shops, which add a ${r}% mark-up.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: pw, stem: "Calculate the wholesaler's selling price for a crate, in US\\$.", wrong: [p0 * w / 100], explanation: `${p0} × 1.${w} = US\\$${pw}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: unit, dp: 2, stem: "Calculate the price of one tub to the consumer, in US\\$ to two decimal places.", wrong: [pr, (p0 * 1.45) / 12], explanation: `Crate price = ${pw} × 1.${r} = US\\$${pr}; per tub = ${pr} ÷ 12 = US\\$${fmt(unit, 2)}.` }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "Explain why the tuck-shops buy from the wholesaler rather than directly from the dairy.",
          points: ["Tuck-shops need small quantities and have little storage; the wholesaler breaks bulk and stores the goods.", "The wholesaler may deliver and give credit, which small shops cannot get from the dairy."],
          modelAnswer: "Tuck-shops need only a few crates at a time and have little cold storage, so they rely on the wholesaler to break bulk and keep stock. The wholesaler may also deliver and give credit, which a small shop would not get from the dairy.",
          explanation: "Bulk breaking/storage and delivery/credit.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether the dairy should sell directly to retailers and cut out the wholesaler.",
          points: [
            "For: keeps the wholesaler's mark-up / lower prices to retailers; closer contact with retailers and information about demand.",
            "Against: the dairy must then store, transport, break bulk, give credit and bear risk itself (costs); many small orders are expensive to serve.",
            "Justified conclusion, e.g. sell direct to large supermarkets but use wholesalers for small tuck-shops.",
          ],
          modelAnswer: "Selling direct would let the dairy keep the wholesaler's mark-up or offer lower prices, and it would learn more about what customers want. However, it would then have to take on the wholesaler's functions itself: cold storage, transport, breaking bulk, giving credit and bearing the risk of spoiled yoghurt, and serving many small tuck-shops is costly. The dairy should probably sell directly to large supermarkets, which buy in bulk, while using wholesalers to reach small shops.",
          explanation: "Saved mark-up versus extra costs; conclude.",
        }),
      ],
      hints: ["Apply the mark-ups one after the other.", "Divide the crate price by 12 for one tub."],
      explanation: `Wholesale price US\\$${pw}; retail price US\\$${pr} a crate, US\\$${fmt(unit, 2)} a tub.`,
    });
  }
  // Structured 2 (12 marks).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "In a fictional Zimbabwean town, the council has received complaints from shop owners that street vendors block pavements and sell goods more cheaply because they pay no tax. Many of the vendors are school leavers and former factory workers who have no other source of income.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Distinguish between formal and informal trade.",
        points: ["Formal trade: registered businesses that keep records and pay taxes.", "Informal trade: unregistered businesses (such as vendors) operating outside most regulation and taxation."],
        modelAnswer: "Formal trade is carried out by registered businesses that keep records, pay taxes and follow regulations. Informal trade is carried out by unregistered businesses, such as street vendors, that operate largely outside regulation and pay little or no tax.",
        explanation: "One mark for each.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain why the vendors can sell more cheaply than the shops.",
        points: [
          "Vendors pay no rent for shop premises (or only small council fees)…",
          "…so their overhead costs are much lower.",
          "They pay little or no tax (no VAT or income tax) / employ no paid staff…",
          "…so they can charge lower prices and still earn an income.",
        ],
        modelAnswer: "Vendors do not pay rent for shops, electricity or security, so their overheads are much lower than a shop's. They also pay little or no tax, such as VAT and income tax, and usually work alone or with family members, so they can charge lower prices and still make a living.",
        explanation: "Two developed reasons.",
      }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether the council should remove the vendors from the town centre.",
        points: [
          "For removal: congestion and blocked pavements; unfair competition with tax-paying shops; hygiene and quality concerns; lost council and tax revenue.",
          "Against removal: vendors' only income — removal raises unemployment and poverty; consumers lose cheap, convenient goods; possible crime and hardship.",
          "Against: informal trade develops enterprise skills; some vendors grow into formal businesses.",
          "Alternatives: designated market stalls, licences and simple registration, training, access to credit; gradual formalisation.",
          ["Justified conclusion that weighs both sides and proposes a workable policy.", 2],
        ],
        modelAnswer: "Removing the vendors would clear the pavements, reduce litter and protect shops that pay rent and taxes from competition they see as unfair; it might also improve hygiene. However, the vendors are school leavers and former factory workers with no other income, so removing them would increase unemployment and poverty, and consumers would lose cheap goods sold in small, convenient quantities. Informal trading also builds business skills, and some vendors grow into formal firms. A better policy is to provide designated market stalls near busy areas, charge a small licence fee and offer simple registration and training, so that vendors can keep earning while congestion falls and the council gains some revenue. The council should therefore relocate and support the vendors rather than simply remove them.",
        explanation: "Order and fairness versus livelihoods and consumer benefits; conclude with a policy.",
      }),
    ],
    hints: ["Think about costs, taxes and livelihoods."],
    explanation: "Informal trade brings jobs and cheap goods but also congestion and lost revenue; supported formalisation balances these.",
  });

  b.card("DEFINITION", "Define **domestic (home) trade**.", "Buying and selling of goods and services within one country.");
  b.card("CONCEPT", "What is the chain of distribution?", "Producer → wholesaler → retailer → consumer.");
  b.card("CONCEPT", "List five functions of a wholesaler.", "Bulk breaking, storage, transport, credit, risk bearing, information, some processing (grading, packing).");
  b.card("CONCEPT", "List four functions of a retailer.", "Sells small quantities to consumers; offers variety; provides services (advice, credit, delivery); passes on information about demand.");
  b.card("CONCEPT", "Formal versus informal trade?", "Formal: registered, keeps records, pays tax, regulated. Informal: unregistered, few records, little tax, little regulation.");
  b.card("CONCEPT", "Give three roles of informal traders in Zimbabwe.", "Jobs and incomes; goods in small, affordable quantities; convenient locations and low prices; enterprise skills.");
  b.card("CONCEPT", "Give three problems of informal trade.", "Little tax revenue; poor quality and consumer protection; congestion; insecure incomes without credit or pensions.");
  b.card("FACT", "When can a retailer cut out the wholesaler?", "When it is large enough to buy in bulk directly and has its own storage and transport (e.g. a supermarket chain).");
  b.card("FORMULA", "Mark-up % = ?", "(Selling price − cost price) ÷ cost price × 100");
});
