// W2a: strategy.models
import { concept, P, chk, sum } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.strategy.models", { file: "strategy/models", keyPrefix: "strategy.models" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which Ansoff strategy involves selling **existing products in existing markets**?",
    ok: ["Market penetration", "Correct: more sales of the same product to the same customers."],
    bad: [["Diversification of products", "Diversification means new products in new markets."], ["Product development", "Product development means new products in an existing market."], ["Market development", "Market development means existing products in new markets."]],
    explanation: "Market penetration is the lowest-risk Ansoff strategy: the firm already knows both product and market.",
  });
  mc(b, {
    d: 1, skill: "UNDERSTANDING",
    stem: "Which statement best describes a **blue ocean strategy**?",
    ok: ["Creating new demand in a new space away from rivals", "Correct: the firm moves away from head-on rivalry."],
    bad: [["Cutting prices to beat rivals in a crowded market", "This is competing in a red ocean."], ["Copying the best product of the leading competitor", "Copying keeps the firm in the same crowded market."], ["Selling existing products to existing customers only", "That is market penetration, an Ansoff strategy."]],
    explanation: "Kim and Mauborgne's blue ocean strategy creates an uncontested market space through value innovation.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of the Ansoff strategies carries the **highest risk**?",
    ok: ["Diversification", "Correct: the firm has no experience of either the product or the market."],
    bad: [["Market penetration", "This uses a known product and a known market, so it is the lowest risk."], ["Product development", "The market is known, so the risk is medium."], ["Market development", "The product is known, so the risk is medium."]],
    explanation: "Diversification means a new product in a new market, so both the product and the market are unfamiliar.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In force field analysis, what are **restraining forces**?",
    ok: ["Forces that resist a proposed change", "Correct: they work against the change, for example fear or cost."],
    bad: [["Forces that push for the proposed change", "These are the driving forces."], ["Forces that a business can ignore", "Restraining forces must be managed, not ignored."], ["Forces outside the business only", "Restraining forces can be inside or outside the business."]],
    explanation: "Driving forces push for a change; restraining forces resist it.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional farm shop in Chinhoyi already sells eggs to households. It now starts selling the same eggs to restaurants in Harare. Which Ansoff strategy is this?",
    ok: ["Market development", "Correct: an existing product is sold in a new market."],
    bad: [["Market penetration", "Penetration sells more to existing customers, and the restaurants are new."], ["Product development", "The product is unchanged."], ["Diversification", "The product is not new, so this is not diversification."]],
    hints: ["Is the product new or existing? Is the market new or existing?"],
    explanation: "Existing product, new market: market development.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru launches a new range of cakes for its current customers. Which Ansoff strategy is this?",
    ok: ["Product development", "Correct: a new product is sold to existing customers."],
    bad: [["Market development", "The customers are existing, so the market is not new."], ["Diversification into new markets", "The market is not new, so this is not diversification."], ["Market penetration", "The product is new, so this is not penetration."]],
    hints: ["The customers are the same; what has changed?"],
    explanation: "New product, existing market: product development.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following is one of the tests of a **core competence**?",
    ok: ["It is difficult for rivals to copy", "Correct: if rivals can copy it easily it gives no lasting advantage."],
    bad: [["It is available to every competitor", "A competence open to everyone gives no advantage."], ["It is limited to one product only", "A core competence can be extended to other products and markets."], ["It is not valued by customers", "A core competence must be valuable to customers."]],
    hints: ["Think of the three tests: valuable, hard to copy, extendable."],
    explanation: "A core competence is valuable to customers, hard to copy and extendable to other products or markets.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why is diversification usually riskier than market penetration?",
    ok: ["Both product and market are unfamiliar", "Correct: it faces the unknown in both parts of the matrix."],
    bad: [["It always requires a bank loan to be repaid", "Diversification may or may not be financed by borrowing."], ["It reduces the number of products sold", "Diversification normally adds products."], ["It is allowed only for large firms", "Firms of any size may diversify."]],
    hints: ["Compare how much the firm knows about the product and the customer in each case."],
    explanation: "With a new product and a new market the firm has no track record in either, so there is more that can go wrong.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the best reason for a mining supplier in Bulawayo to use scenario planning rather than a single forecast?",
    ok: ["Several different futures are all plausible", "Correct: planning for more than one future prepares the firm for surprises."],
    bad: [["It gives exact probabilities for each future", "Scenario planning does not give probabilities."], ["It removes all uncertainty about the future", "Uncertainty remains; the plan prepares for it."], ["It costs nothing to prepare the scenarios", "Preparing scenarios takes managers' time and effort."]],
    hints: ["What is scenario planning for if the future cannot be known?"],
    explanation: "Scenario planning is useful where the future is uncertain: it tests a strategy against several plausible futures.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "In force field analysis, a change is usually more likely to succeed if the restraining forces are reduced than if the pressure to change is simply increased.",
    answer: true,
    explanation: "True. Extra pressure tends to increase resistance, while removing a restraint, for example by training, lowers it.",
    hints: ["What happens to resistance when more pressure is applied?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each model to its description.",
    pairs: [["Ansoff matrix", "Four growth routes formed from products and markets"], ["Blue ocean strategy", "Creating new demand in an uncontested market"], ["Scenario planning", "Preparing for several plausible futures"], ["Core competence", "A valuable skill that rivals find hard to copy"], ["Force field analysis", "Weighing driving forces against restraining forces"]],
    explanation: "Each description fits one model.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Selling new products in new markets is called {{blank:a}}, which carries the {{blank:b}} risk of the four Ansoff strategies.",
    blanks: [
      { id: "a", accepted: ["diversification"], choices: ["diversification", "market penetration", "product development"] },
      { id: "b", accepted: ["highest"], choices: ["lowest", "highest", "medium"] },
    ],
    explanation: "Diversification is new product plus new market, the riskiest of the four.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the technique, developed by Kurt Lewin, that weighs driving forces against restraining forces when planning a change.",
    accepted: ["force field analysis", "force field", "lewin's force field analysis", "lewins force field analysis", "force-field analysis"],
    explanation: "Force field analysis is used to plan and manage change.",
  });

  const drive1 = [5, 2, 4];
  const driveTotal = sum(drive1);
  chk(driveTotal, 11);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", unit: "points", value: driveTotal, daily: true, wrong: [5, 4],
    stem: "A fictional bakery in Mutare is planning to introduce a night shift. The managers score three driving forces for the change: higher demand 5, faster delivery 2 and extra profit 4 (scores run from 1 for weak to 5 for strong). What is the total score of the driving forces?",
    hints: ["Add the three scores."],
    explanation: "5 + 2 + 4 = 11 points. Taking the highest single score (5) or the middle score (4) does not give the total.",
  });
  const drive2 = [5, 3, 4];
  const restrain = [4, 3, 2];
  const restrainAfter = [2, 1, 2];
  const before = sum(drive2) - sum(restrain);
  const after = sum(drive2) - sum(restrainAfter);
  chk(sum(drive2), 12); chk(sum(restrain), 9); chk(sum(restrainAfter), 5); chk(after, 7);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "points", value: after, wrong: [before, sum(restrainAfter)],
    stem: "A fictional lodge in Victoria Falls scores a proposed new booking system. Driving forces: guests want online booking 5, saves staff time 3, owner support 4. Restraining forces: staff fear for their jobs 4, set-up cost 3, patchy internet 2. After staff training and a cheaper package, the restraining scores become 2, 1 and 2. What is the balance (driving total minus restraining total) after the actions?",
    hints: ["Find the new restraining total first.", "Balance = driving total minus restraining total."],
    explanation: "Driving total = 5 + 3 + 4 = 12. New restraining total = 2 + 1 + 2 = 5. Balance = 12 − 5 = 7 points in favour of the change (it was 12 − 9 = 3 before). Giving 3 uses the old scores; giving 5 stops at the restraining total.",
    workedSolution: "1. Driving total = 5 + 3 + 4 = 12.\n2. Restraining total after the actions = 2 + 1 + 2 = 5.\n3. Balance = 12 − 5 = 7 points in favour of the change.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by a core competence.",
    points: ["Something a business does particularly well", "It is valuable to customers", "It is difficult for rivals to copy and can be used in other products or markets"],
    modelAnswer: "A core competence is something a business does particularly well. It is valuable to customers, hard for rivals to copy and can be used to enter other products or markets.",
    hints: ["There are three tests."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hardware shop in Masvingo is considering opening a branch in an unfamiliar town selling a range of kitchenware it has never stocked. Explain **two** reasons why this carries more risk than selling more hardware to its present customers.",
    points: ["The shop has no experience of the new town's customers or competitors", "Application: the owner may misjudge what customers there will buy", "The shop has no experience of buying and selling kitchenware", "Application: stock may sell slowly and tie up cash"],
    modelAnswer: "The shop does not know the customers or competitors in the new town, so the owner may misjudge what people there will buy. It also has no experience of kitchenware, so stock may sell slowly and tie up cash. Selling more hardware to present customers uses what the owner already knows.",
    hints: ["Think about what is new about the market and the product."],
    explanation: "Two reasons, each applied to the case.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how scenario planning might help a fictional tourism lodge near Victoria Falls.",
    points: ["The lodge faces uncertain events, such as changes in visitor numbers or exchange rates", "Managers describe several plausible futures, such as a fall in foreign visitors", "For each scenario they prepare a response, such as cutting costs or targeting local guests", "The lodge reacts faster and with less loss because it has already thought through the options"],
    modelAnswer: "A lodge faces uncertain events such as changes in visitor numbers or exchange rates. Managers describe several plausible futures, for example a fall in foreign visitors, and prepare a response to each, such as cutting costs or targeting local guests. If one of the scenarios happens the lodge can react faster and with less loss.",
    hints: ["Describe a scenario, the response and the benefit."],
    explanation: "Scenario, response, benefit.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether a blue ocean strategy is suitable for a small business such as a fictional tuck shop in a rural area.",
    points: ["It can avoid competition by offering something rivals do not, such as airtime, bread and mobile money in one place", "Application: in a village with few shops there may be demand for combined services", "It may allow higher margins than competing on price", "Risk: it is difficult to know what customers will value, so the new service may fail", "Risk: once proven, the idea may be copied and the advantage lost", "Judgement with a reason, for example suitable if tested on a small scale first"],
    modelAnswer: "A blue ocean strategy could suit a rural tuck shop that combines services nobody else offers, such as airtime, bread and mobile money. This avoids price competition and may allow better margins. But it is hard to know what customers will value, and a successful idea may be copied once it is proven. It is suitable if the owner tests it on a small scale first and moves quickly to build loyalty before others copy it.",
    hints: ["Give a benefit, a risk, and a judgement about when it would work."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Rutendo's Mushroom Farm near Mutare sells oyster mushrooms to six supermarkets. She is considering four ways to grow: (1) offering a discount to supermarkets that increase their orders; (2) growing and selling dried mushroom snacks to the same supermarkets; (3) selling oyster mushrooms to hotels in Harare; (4) opening a restaurant.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Match each option to the Ansoff strategy that it illustrates.", pairs: [["Discount for larger orders from supermarkets", "Market penetration"], ["Dried mushroom snacks to the same supermarkets", "Product development"], ["Oyster mushrooms to hotels in Harare", "Market development"]], explanation: "Existing product and market: penetration. New product, same market: product development. Existing product, new market: market development." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Opening a restaurant is an example of", options: [["Diversification", "Correct: a new product (meals) is sold in a new market (restaurant customers)."], ["Market penetration", "Penetration would sell more of the existing product to existing customers."], ["Product development", "The market would also be new."], ["Market development", "The product would also be new."]], answer: "A", explanation: "New product, new market: diversification." }),
      P.manual({ label: "(c)", marks: 5, stem: "Evaluate which option Rutendo should choose first.", points: ["Penetration is lowest risk because both product and customers are known", "Growth from penetration is limited because six supermarkets can only buy so many mushrooms", "Dried snacks use her skills and her existing customers, but the product may not sell", "A restaurant is the highest risk because she has no experience of either", "Judgement with a reason: the snacks or penetration first, delaying the restaurant"], modelAnswer: "Penetration is the lowest-risk option because Rutendo already knows the product and the supermarkets, but growth is limited because they can only buy so many mushrooms. Dried snacks use her skills and her customers, but the new product may not sell. A restaurant would be the highest risk because she has no experience of either the product or the customers. She should start with penetration or the snacks and delay the restaurant until she has built up cash.", hints: ["Put the options in order of risk, then weigh risk against growth."], explanation: "Risk against growth, with a justified choice." }),
    ],
    hints: ["For each option ask: is the product new or existing, and is the market new or existing?"],
    explanation: "Penetration, product development, market development, then diversification; the lowest-risk route comes first.",
  });

  const dr = [4, 4, 3];
  const re = [5, 3, 4];
  const re2 = [3, 3, 2];
  chk(sum(dr), 11); chk(sum(re), 12); chk(sum(re2), 8);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Sipho runs a printing shop in Bulawayo and plans to replace manual typesetting with a computer-based system. Driving forces and their scores (1 weak to 5 strong): faster jobs 4, lower wastage 4, customers' demands 3. Restraining forces and their scores: staff fear of job loss 5, cost of the equipment 3, lack of computer skills 4.",
    parts: [
      P.group({ label: "(a)", stem: "Calculate the total score of:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", unit: "points", value: sum(dr), wrong: [4], stem: "the driving forces;", explanation: "4 + 4 + 3 = 11." }),
        P.num({ label: "(ii)", marks: 1, kind: "plain", unit: "points", value: sum(re), wrong: [5], stem: "the restraining forces.", explanation: "5 + 3 + 4 = 12." }),
      ] }),
      P.num({ label: "(b)", marks: 2, kind: "plain", unit: "points", value: sum(dr) - sum(re2), wrong: [sum(dr) - sum(re), sum(re2)], stem: "After a training programme and a payment plan, the restraining scores become 3, 3 and 2. Calculate the balance (driving total minus restraining total) after these actions.", explanation: "Restraining total = 3 + 3 + 2 = 8. Balance = 11 − 8 = 3 points in favour of the change (before the actions it was 11 − 12 = −1)." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse why reducing the restraining forces may be more effective than increasing the driving forces.", points: ["More pressure on staff may increase fear and resistance", "Application: threatening staff with the new system could raise their fear of job loss", "Training reduces the lack of skills, which removes a cause of resistance", "Application: staff who feel secure are more likely to support the change"], modelAnswer: "More pressure on staff may increase their fear of job loss and make them resist more. Training removes the lack of skills and so reduces a cause of resistance. Staff who feel more secure are more likely to support the change, so it goes ahead with less conflict.", hints: ["What happens to resistance when you push harder?"], explanation: "Pressure raises resistance; reducing restraints lowers it." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate the usefulness of force field analysis to Sipho.", points: ["It sets out the forces for and against, so the owner sees what is stopping the change", "Application: the scores show staff fear and lack of skills as the main restraints", "It suggests where to act, for example on training", "Scores are subjective and chosen by the owner, so the balance may mislead", "It does not show whether the new system is profitable", "Judgement with a reason: useful for planning how to introduce the change, but not for deciding whether to buy"], modelAnswer: "The analysis shows Sipho what is stopping the change: staff fear and lack of skills are the largest restraints, so he knows where to act, for example on training. However, the scores are his own opinions, so the balance may mislead, and the analysis does not tell him whether the system will be profitable. It is useful for planning how to introduce the change, but he needs financial analysis to decide whether to buy it.", hints: ["Say what it shows, what it cannot show, and for which decision it is useful."], explanation: "Strengths and limits of the tool, with a judgement." }),
    ],
    hints: ["Add the scores for each side, then find the difference."],
    explanation: "Driving 11, restraining 12 (balance −1), and after the actions the balance is +3.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Chipo's Cold Chain in Harare transports frozen fish to hotels and restaurants. Its core competence is a fleet of refrigerated vehicles and a reputation for never breaking the cold chain. Competition on price is strong. Chipo is considering (1) supplying frozen vegetables to the same hotels, (2) supplying fish to hotels in Bulawayo, or (3) opening a fish restaurant in Harare.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse how Chipo could use her core competence to grow.", points: ["A core competence is valuable, hard to copy and extendable", "Application: reliable refrigerated transport is valuable to hotels and restaurants", "It is hard for rivals to copy because it takes vehicles and a reputation built over time", "Frozen vegetables use the same vehicles and customers, so the competence extends to a new product", "Fish to Bulawayo extends the competence to a new market", "A restaurant would not use the competence, so it would be a poor fit"], modelAnswer: "Reliable refrigerated transport is valuable to hotels and restaurants and is hard for rivals to copy, because it takes vehicles and a reputation built over time. It extends easily to frozen vegetables, which use the same vehicles and customers, or to Bulawayo, which uses the same service in a new market. A restaurant would not use the competence at all.", hints: ["Test each option against the three features of a competence."], explanation: "Applies the three tests to each option." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate which of the three options Chipo should choose.", points: [["Vegetables: product development in the existing market, medium risk, uses present customers and vehicles", 2], ["Bulawayo: market development, medium risk, but needs new customers and higher transport costs", 2], ["Restaurant: diversification, highest risk, and uses none of the core competence", 2], ["Link to the competence and price competition: the competence is her advantage, so the first two options use it", 1], ["Limits: the competence may be copied or may become less valuable, and the risks depend on demand", 1], ["Judgement with a reason, for example vegetables first, then Bulawayo", 1]], levels: [[3, 7, 9, "All three options classified and compared with risk and the core competence; a justified recommendation with a condition or limitation"], [2, 4, 6, "Applies the Ansoff categories or the competence to some options; judgement weakly supported"], [1, 1, 3, "Describes options with little analysis"]], modelAnswer: "Supplying vegetables is product development in an existing market: the risk is medium because Chipo knows the customers and already has the vehicles. Fish to Bulawayo is market development, also medium risk, but she needs new customers and has higher transport costs. The restaurant is diversification, the highest risk, and does not use her cold-chain competence. Since price competition is strong, her competence in reliable refrigerated delivery is her best advantage, so she should choose vegetables first. If demand in Bulawayo proves strong she could expand there later. She should watch for rivals copying her service.", hints: ["Classify each option using Ansoff, then test it against her core competence."], explanation: "Classifies, compares and recommends with a limitation." }),
    ],
    hints: ["Use Ansoff for the risk and core competence for the fit."],
    explanation: "Vegetables first: lower risk and uses her competence; the restaurant is highest risk and a poor fit.",
  });

  b.card("DEFINITION", "Ansoff matrix", "A framework of four growth strategies from products (existing or new) and markets (existing or new): penetration, product development, market development, diversification.");
  b.card("FACT", "Ansoff risk order", "Market penetration (lowest), product development and market development (medium), diversification (highest).");
  b.card("DEFINITION", "Blue ocean strategy", "Kim and Mauborgne: creating a new, uncontested market through value innovation instead of fighting rivals in a crowded red ocean.");
  b.card("DEFINITION", "Scenario planning", "Developing several plausible accounts of the future to test strategy and prepare responses; not a single forecast.");
  b.card("DEFINITION", "Core competence", "Something the firm does especially well that is valuable to customers, hard for rivals to copy and extendable to other products or markets.");
  b.card("DEFINITION", "Force field analysis", "Lewin's technique: weigh the driving forces for a change against the restraining forces, then strengthen the drivers or, better, weaken the restraints.");
  b.card("CONCEPT", "Why reduce restraints?", "Extra pressure often increases resistance; removing a restraint, such as lack of training, lowers resistance and makes the change easier.");
  b.card("FACT", "Limitations of the models", "Ansoff does not show profitability; blue ocean is hard to predict; scenarios give no probabilities; competences can become less valuable; force field scores are subjective.");
  b.card("FACT", "ZIMSEC detail on Ansoff", "ZIMSEC links the matrix to product portfolio planning: products with room to grow suggest penetration; products near the end of their life suggest developing new ones.", undefined, { applies: ["zimsec"] });
});
