// W1b: legal controls and government action to protect consumers; effects on business and marketing.
import { concept, P, COM, CAM } from "../lib.mjs";

concept("bus.consumer.legal-protection", { file: "consumer/legal-protection", keyPrefix: "consumer.legal-protection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a purpose of legal controls on marketing?",
    options: [
      ["To protect customers from misleading promotion", "Correct: laws stop false or misleading claims in advertising and labelling."],
      ["To guarantee every business a profit", "Laws protect customers; they do not guarantee profits."],
      ["To stop businesses from advertising at all", "Advertising is allowed if it is honest."],
      ["To set the same price for every product", "Legal controls do not fix one price for all goods."],
    ],
    answer: "A",
    explanation: "Legal controls protect customers from **misleading promotion** and **faulty goods**, so that they can trust what they are told and get a remedy when products fail.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Inspectors test and stamp the scales used by butcheries. Which method of consumer protection is this?",
    options: [
      ["Weights and measures control", "Correct: laws require accurate scales, and inspectors check them."],
      ["Price control", "Price control sets maximum prices; it does not check scales."],
      ["Labelling law", "Labelling laws concern the information on packages."],
      ["Hire purchase credit regulation", "Credit laws concern hire purchase and loan agreements."],
    ],
    answer: "A",
    explanation: "**Weights and measures** laws make short weight an offence; inspectors test and stamp scales used in trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which information is a packaged food product usually required by law to show?",
    options: [
      ["Its ingredients and a use-by or best-before date", "Correct: labelling laws require contents, quantity, producer and date marks."],
      ["The names of the producer's directors and shareholders", "The names of directors and shareholders are not required on labels."],
      ["The producer's profit on each packet", "Profit margins are not label information."],
      ["The wages paid to factory workers", "Wages are not shown on labels."],
    ],
    answer: "A",
    explanation: "Labels must give information consumers need: ingredients or contents, quantity, the producer's name and address, date marks and any warnings.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A law requires a firm to recall a model of heater that can overheat. What is the most likely **short-term** effect on the firm?",
    options: [
      ["Higher costs for refunds and repairs", "Correct: a recall means refunds, collection and repair costs."],
      ["An immediate rise in sales of the heater", "Sales of a recalled model fall or stop."],
      ["Lower costs because fewer heaters are sold", "Costs rise because of the recall."],
      ["No effect, because recalls are voluntary", "The stem says the law requires the recall."],
    ],
    answer: "A",
    explanation: "Product safety laws protect customers from faulty goods but raise firms' costs (recalls, refunds, redesign) and may harm their reputation in the short term.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How can legal controls on advertising **benefit** an honest business?",
    options: [
      ["Rivals cannot win customers with false claims", "Correct: honest firms are not undercut by misleading competitors."],
      ["The business no longer needs to advertise", "Firms still need to promote their products."],
      ["The business may now exaggerate its own claims", "The controls apply to every business equally."],
      ["The business's costs always fall", "Controls usually add some costs, such as checking claims."],
    ],
    answer: "A",
    hints: ["Think about competitors who cheat."],
    explanation: "When all firms must tell the truth, honest firms compete fairly and consumers trust advertising more, which can raise sales.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A drinks firm may no longer describe its sugary cordial as \"100% natural juice\". Which part of its marketing mix is **most** directly affected?",
    options: [
      ["Promotion", "Correct: the firm must change its advertising and label claims."],
      ["Place", "Where the drink is sold is not affected by the claim."],
      ["Price", "The rule concerns a description, not the price."],
      ["Production quantity", "This is not one of the four Ps and is not directly affected."],
    ],
    answer: "A",
    hints: ["Which P covers advertising and claims on packaging?"],
    explanation: "Laws against misleading claims affect **promotion** most directly (adverts, slogans, label claims); packaging may also need redesigning.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which action is an example of **self-protection** by a consumer?",
    options: [
      ["Checking the expiry date before buying medicine", "Correct: the consumer protects herself by checking the goods."],
      ["A government banning the sale of a dangerous toy", "That is protection by government."],
      ["Inspectors testing a shop's scales", "That is enforcement by the authorities."],
      ["A standards body testing cables", "That is protection by a standards organisation."],
    ],
    answer: "A",
    hints: ["Who is acting in each option?"],
    explanation: "Self-protection is what consumers do themselves: check, compare, read labels and contracts, keep receipts and report offences.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Price controls are a method by which government can protect consumers of essential goods.",
    answer: true,
    explanation: "True. Governments may set maximum prices for essential goods or require prices to be displayed, so that consumers are not overcharged.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Legal controls on marketing have only negative effects on businesses.",
    answer: false,
    explanation: "False. They raise costs and limit promotion, but they also protect honest firms from unfair competition and build consumer trust, which can raise sales.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each consumer problem with the legal control that deals with it.",
    pairs: [
      ["Short weight at a market stall", "Weights and measures laws"],
      ["False claims in an advertisement", "Laws against misleading promotion"],
      ["A toy with sharp, breakable parts", "Product safety laws"],
      ["Hidden charges in a hire purchase deal", "Credit (hire purchase) laws"],
    ],
    explanation: "Each problem has its own control: accurate measures, honest promotion, product safety, and clear credit terms.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Goods sold must be of satisfactory {{blank:a}}, fit for their purpose and as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["quality"], choices: ["quality", "price", "size"] },
      { id: "b", accepted: ["described"], choices: ["described", "advertised cheaply", "imported"] },
    ],
    explanation: "Laws on faulty goods require satisfactory quality, fitness for purpose and goods **as described**; otherwise the consumer can claim a repair, replacement or refund.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a highest price, set by government, that traders may charge for an essential good.",
    accepted: ["maximum price", "a maximum price", "price ceiling", "price control", "controlled price", "ceiling price"],
    wrong: ["minimum price", "recommended price"],
    explanation: "A **maximum price** (price ceiling) is a form of price control used to protect consumers of essential goods.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING", applies: COM,
    stem: "Explain **two** roles of government in protecting consumers.",
    points: [
      "Passes consumer protection laws.",
      "Explains, e.g. makes short measures, false descriptions and unsafe goods offences.",
      "Enforces laws through inspectors, police and courts / funds protection bodies / sets standards / controls prices / educates.",
      "Explains how the second role protects consumers.",
    ],
    hints: ["What does government do: make laws, and then what?"],
    modelAnswer: "Government passes laws that make short measures, false descriptions and unsafe goods offences. It also enforces them through inspectors, the police and courts, who fine or close offenders, so traders are deterred from cheating.",
    explanation: "One mark for each role, one for explaining how it protects consumers.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS", applies: CAM,
    stem: "Explain **two** effects of legal controls on the marketing of a business that makes and sells baby food.",
    points: [
      "Product: must meet strict safety and hygiene standards (testing) .",
      "So production costs rise / prices may rise.",
      "Promotion and packaging: health claims must be true; labels must list ingredients and dates.",
      "So adverts and labels may need to change, adding cost but building parents' trust.",
    ],
    hints: ["Think about the product itself and about what can be said about it."],
    modelAnswer: "The baby food must meet strict safety and hygiene standards, so testing raises production costs and possibly prices. Any health claims in adverts must be true and labels must list ingredients and dates, so the firm may need to change its promotion and packaging, although this builds parents' trust.",
    explanation: "Effects should be linked to the marketing mix and to the business: costs, prices, promotion, packaging and trust.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Tendai's business makes skin creams in Harare. Its adverts claim that one cream \"removes all scars in seven days\". A new law requires every claim in an advert to be provable and every jar to list its ingredients.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which consumer problem is the new law mainly aimed at?",
        options: [["Misleading promotion", "Correct: the law targets false claims and missing information."], ["Short measures", "Short measures concern quantity."], ["Price fixing", "The law is not about prices."], ["Unfair credit terms", "The creams are not sold on credit."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways in which the law will affect Tendai's business.",
        points: [
          "Must change or withdraw the scar advert (unless the claim can be proved).",
          "Loses a strong selling message / costs of new adverts.",
          "Must redesign labels to list ingredients.",
          "Higher packaging costs; possibly fines if it does not comply.",
        ],
        modelAnswer: "Tendai must withdraw or change the scar advert unless he can prove the claim, so he loses his strongest selling message and must pay for new adverts. He must also redesign his jars' labels to list ingredients, which adds to packaging costs.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether the new law will be good or bad for Tendai's business in the long run.",
        points: [
          "Bad: higher costs (testing claims, labels, new adverts).",
          "Bad: sales may fall without the bold claim.",
          "Good: customers trust honest claims and full labels, so loyalty may rise.",
          "Good: rivals cannot make false claims either / avoids fines and reputation damage.",
          "Considers how Tendai could adapt (prove real benefits, promote quality).",
          "Justified conclusion.",
        ],
        modelAnswer: "In the short run the law raises Tendai's costs for new labels and adverts, and sales may fall without his bold claim. In the long run, however, customers are more likely to trust a cream with honest claims and a full list of ingredients, and rivals can no longer win customers with false promises. Tendai also avoids fines and the damage to his reputation that a false claim could cause. If he promotes the real, provable benefits of his creams, the law is likely to be good for his business in the long run.",
      }),
    ],
    hints: ["(c) Separate the short run from the long run."],
    explanation: "Legal controls on promotion and labelling raise costs and restrict claims, but build trust and protect honest firms.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, applies: COM,
    stem: "In a town market, inspectors found that several traders used scales that weighed short, and some sold medicines that had passed their expiry dates.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** legal methods of protecting consumers that apply to these problems.",
        points: [
          "Weights and measures laws: scales must be accurate.",
          "Inspectors test and stamp scales; traders with false scales are fined or prosecuted.",
          "Laws on food and drugs / date marking: expired medicines may not be sold.",
          "Health or medicines inspectors seize expired stock and punish offenders.",
        ],
        modelAnswer: "Weights and measures laws require accurate scales; inspectors test and stamp them and prosecute traders whose scales weigh short. Food and drugs laws forbid the sale of expired medicines; inspectors can seize the stock and fine or close the traders.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss whether laws alone are enough to protect these consumers.",
        points: [
          "Laws make the practices offences and deter traders.",
          "But enforcement needs enough inspectors / funds; markets are many.",
          "Informal traders may move and avoid inspections.",
          "Consumers must protect themselves: check scales, expiry dates, buy medicines from pharmacies.",
          "Consumer bodies educate and receive complaints.",
          "Justified conclusion: laws are necessary but not sufficient.",
        ],
        modelAnswer: "Laws make short weights and expired medicines offences, which deters many traders. But laws work only if they are enforced, and there are too few inspectors to check every market often; informal traders can move to avoid them. Consumers must also protect themselves by watching the scales, checking expiry dates and buying medicines from registered pharmacies, and consumer bodies must educate them and take up complaints. Laws are therefore necessary but not enough on their own.",
      }),
    ],
    hints: ["(b) Who enforces the law, and what can consumers do themselves?"],
    explanation: "Legal controls (weights and measures, food and drugs laws) need enforcement and responsible consumers to work well.",
  });
  b.card("DEFINITION", "What are **legal controls** on business?", "Laws and regulations, enforced by government, that set rules for producing, describing, pricing, promoting and selling goods.");
  b.card("DEFINITION", "What is **misleading promotion**?", "Advertising or promotion that gives a false impression of a product, its price or its benefits.");
  b.card("FACT", "Two purposes of legal controls on marketing (Cambridge)?", "To protect customers from misleading promotion and from faulty goods.");
  b.card("FACT", "Five legal methods of protecting consumers?", "Laws on descriptions and promotion, product safety, weights and measures, labelling, food and drugs, price controls, credit agreements (any five).");
  b.card("FACT", "Roles of government in consumer protection?", "Legislates, enforces (inspectors, police, courts), funds protection bodies, sets standards, controls some prices, educates, licenses businesses.", undefined, { applies: COM });
  b.card("DEFINITION", "What is **self-protection** by consumers?", "Steps consumers take themselves: checking goods and dates, comparing prices, reading labels and contracts, keeping receipts.");
  b.card("CONCEPT", "Negative effects of legal controls on a business?", "Higher costs (testing, labels, refunds, recalls), less freedom in promotion, risk of fines and bad publicity.");
  b.card("CONCEPT", "Positive effects of legal controls on a business?", "Fair competition with honest rivals, consumer trust, reputation for quality, fewer complaints and returns.");
  b.card("CONCEPT", "Faulty goods: consumer remedies?", "Repair, replacement or refund, because goods must be of satisfactory quality, fit for purpose and as described.");
});
