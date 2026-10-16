// W2a: strategy.environment-scanning
import { concept, P } from "../lib.mjs";
import { mc } from "../tables/w2a-lib.mjs";

concept("abus.strategy.environment-scanning", { file: "strategy/environment-scanning", keyPrefix: "strategy.environment-scanning" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a SWOT analysis, which of the following is an **external** factor?",
    ok: ["Threats", "Correct: opportunities and threats come from outside the business."],
    bad: [["Strengths", "Strengths are internal, such as skills, equipment or reputation."], ["Weaknesses", "Weaknesses are internal, such as a lack of cash or poor equipment."], ["Objectives", "Objectives are not an element of a SWOT analysis."]],
    explanation: "Strengths and weaknesses are internal; opportunities and threats are external.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What do the four letters of **PEST** stand for?",
    ok: ["Political, economic, social, technological", "Correct: these are the four external factors in the basic checklist."],
    bad: [["Profit, expenditure, sales and trade figures", "These are financial terms, not the factors of PEST."], ["Planning, evaluation, strategy and tactics", "These are management terms, not the factors of PEST."], ["People, equipment, stock and training", "These are internal resources, not external factors."]],
    explanation: "PEST: political, economic, social and technological. PESTEL adds environmental and legal.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is one of Porter's five forces?",
    ok: ["Threat of substitutes", "Correct: substitute products limit the prices a firm can charge."],
    bad: [["Strength of the workforce", "Workforce strength is an internal factor, not one of Porter's forces."], ["Level of government spending", "Government spending is part of a PEST analysis, not the five forces."], ["Quality of management", "Management quality is an internal strength or weakness."]],
    explanation: "The five forces are rivalry, new entrants, substitutes, buyer power and supplier power.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional bakery in Bulawayo learns that a rival has just cut its bread prices by a fifth. In the bakery's SWOT analysis this is a",
    ok: ["Threat", "Correct: the rival is outside the business and its price cut may take customers."],
    bad: [["Strength", "A strength is an internal advantage of the bakery itself."], ["Weakness", "A weakness is an internal shortcoming, and the rival's action is external."], ["Opportunity", "A rival's price cut does not help the bakery."]],
    hints: ["Is the change inside or outside the business, and does it help or harm?"],
    explanation: "An external change that may harm the business is a threat.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional hardware shop in Masvingo finds that more customers now pay by mobile money. In a PEST analysis this is mainly a",
    ok: ["Technological factor", "Correct: a new payment technology is changing how customers buy."],
    bad: [["Environmental factor", "Nothing in the case concerns pollution, climate or energy."], ["Economic factor", "The case is about how customers pay, not about incomes or prices."], ["Social factor", "Tastes and lifestyles are not the focus here."]],
    hints: ["Which letter of PEST covers new methods and equipment?"],
    explanation: "A change in the technology of payment is a technological factor.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional egg farm in Mutare sells nearly all its output to one supermarket chain, which could buy from other farms. Which of Porter's forces is strongest for the farm?",
    ok: ["Bargaining power of buyers", "Correct: one large customer that can switch has power over price."],
    bad: [["Threat of substitutes", "Nothing in the case concerns other products meeting the same need."], ["Bargaining power of suppliers", "The case is about who buys from the farm, not who supplies it."], ["Threat of new entrants", "No new farms are mentioned."]],
    hints: ["Who has the choice in this relationship?"],
    explanation: "A single large buyer able to switch gives buyers strong bargaining power.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following would make **rivalry among existing firms** stronger?",
    ok: ["Slow growth in market demand overall", "Correct: when the market is not growing, firms can gain sales only by taking them from rivals."],
    bad: [["Strong customer loyalty to each firm", "Loyal customers reduce the need to fight for sales."], ["Highly differentiated products", "Differentiation softens price competition."], ["High costs to customers of switching", "High switching costs lock customers in and reduce rivalry."]],
    hints: ["When is it hardest for each firm to grow without taking customers from others?"],
    explanation: "Slow market growth, similar products and high fixed costs intensify rivalry.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which is the most important reason why a SWOT analysis can mislead a business?",
    ok: ["Entries are opinions that date quickly", "Correct: they depend on managers' opinions and can change quickly."],
    bad: [["It can be used only by large companies", "Small businesses use SWOT widely."], ["It has no place for external factors", "Opportunities and threats are external."], ["It must contain exactly four entries", "There is no fixed number of entries."]],
    hints: ["Think about who decides what goes in and when."],
    explanation: "SWOT is subjective and quickly outdated, so it should be checked against evidence.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional lodge in Victoria Falls lists twelve changes in its external environment. Which is the best next step?",
    ok: ["Rank them by their impact and by timing", "Correct: a list helps only if the important and urgent changes are found."],
    bad: [["Respond to each change at the same time", "This wastes limited resources on small changes."], ["Ignore any change it cannot control", "All macro changes are outside its control; it must still respond."], ["Wait until a rival reacts to them first", "Waiting gives the rival the advantage."]],
    hints: ["Which changes matter most, and which will arrive first?"],
    explanation: "Scanning is useful when it leads to priorities: rank by impact and timing, then plan responses.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A competitor opening a new shop nearby is a weakness in the business's SWOT analysis.",
    answer: false,
    explanation: "False. A competitor is outside the business, so the new shop is a threat. A weakness is an internal shortcoming.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "PESTEL adds environmental and legal factors to the political, economic, social and technological factors of PEST.",
    answer: true,
    explanation: "True. PESTEL (or PESTLE) has six factors.",
  });

  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each situation to the force in Porter's model that it best illustrates.",
    pairs: [["Many bakeries on one street cutting prices to win customers", "Rivalry among existing firms"], ["Cheap equipment lets new vendors start selling at the market", "Threat of new entrants"], ["Customers buy cooked chicken instead of a takeaway meal", "Threat of substitutes"], ["Only one firm sells the specialised flour a bakery needs", "Bargaining power of suppliers"], ["One hotel group buys most of a farm's vegetables", "Bargaining power of buyers"]],
    hints: ["Ask who has the power or the choice in each situation."],
    explanation: "Each situation matches the force named.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Strengths and weaknesses are {{blank:a}} factors, while opportunities and threats are {{blank:b}} factors.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external", "political"] },
      { id: "b", accepted: ["external"], choices: ["internal", "external", "financial"] },
    ],
    explanation: "SWOT separates the business's own position (internal) from its surroundings (external).",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process of continuously collecting and analysing information about the internal and external environment of a business.",
    accepted: ["environmental scanning", "scanning", "environmental analysis", "business environment scanning", "environment scanning"],
    explanation: "Environmental scanning lets managers spot changes early and plan a response.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In Porter's five forces, which force describes the ability of customers to demand lower prices or better service?",
    accepted: ["bargaining power of buyers", "buyer power", "power of buyers", "bargaining power of customers", "buyers bargaining power", "customer power"],
    explanation: "The bargaining power of buyers is strong when customers are few, large or can switch easily.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between the internal and the external environment of a business.",
    points: ["The internal environment is inside the business, such as its staff, finance and equipment", "The external environment is outside the business, such as the economy, the law and competitors", "Managers can control the internal environment but can only respond to the external one"],
    modelAnswer: "The internal environment is made up of factors inside the business, such as its staff, finance and equipment. The external environment is made up of factors outside it, such as the economy, the law and competitors. Managers can control the internal environment but can only respond to the external one.",
    hints: ["Think about what managers can and cannot control."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional tuck shop at a school in Chinhoyi is about to face competition from a new school canteen. Explain **two** ways in which a SWOT analysis could help the owner.",
    points: ["It identifies the shop's strengths, such as regular customers or low prices", "Application: the owner could use loyal pupils to protect sales against the canteen", "It identifies weaknesses, such as limited stock or poor opening hours", "Application: the owner could correct a weakness before the canteen opens"],
    modelAnswer: "A SWOT would identify the shop's strengths, such as its regular customers, and the owner could use these loyal pupils to protect sales when the canteen opens. It would also show weaknesses, such as short opening hours, which the owner could correct before the canteen arrives.",
    hints: ["Use the canteen as the threat and look for a strength and a weakness."],
    explanation: "Two uses, each applied to the tuck shop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a rise in interest rates might threaten a fictional furniture maker in Bulawayo that has a large bank loan.",
    points: ["A rise in interest rates raises the cost of repaying the loan", "Profit falls unless the firm raises prices or cuts other costs", "Customers who borrow to buy furniture may delay purchases, so sales fall", "Lower sales and higher costs together threaten cash flow and the ability to repay the loan"],
    modelAnswer: "Higher interest rates raise the cost of repaying the loan, so profit falls unless the firm can raise prices or cut other costs. Customers who buy furniture on credit may delay their purchases, so sales fall. Lower sales and higher costs together weaken cash flow and may make it hard to repay the loan.",
    hints: ["Think about the effect on costs, on sales and then on cash."],
    explanation: "A chain from interest rates to costs, sales and cash flow.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess the usefulness of Porter's five forces to the owner of a small hardware shop in Gweru.",
    points: ["It shows why profit in the industry may be low or high, for example through rivalry and buyer power", "Application: it highlights the threat from larger hardware chains or from cheap imports", "It can guide action, such as seeking exclusive suppliers or building customer loyalty", "Limitation: it was designed for whole industries and needs information a small owner may not have", "Limitation: it ignores internal strengths and does not give a plan by itself", "Judgement with a reason: useful as a prompt for thinking, if combined with SWOT and local knowledge"],
    modelAnswer: "Porter's model helps the owner see why profit in hardware retailing may be squeezed, for example by larger chains and cheap imports. It can guide action, such as finding exclusive suppliers or building loyalty among builders. However, it was designed for whole industries and needs information that a small owner may not have, and it ignores the shop's own strengths. It is useful as a prompt for thinking, but the owner should combine it with a SWOT and local knowledge before acting.",
    hints: ["Give a benefit, a limitation, and then a judgement about how much weight the tool deserves."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tatenda runs a small fruit juice factory in Mutare. His strengths are a high-quality product and loyal customers; his weaknesses are old equipment and little cash. A national supermarket chain has asked him to supply its stores in Zimbabwe, and a large foreign producer has announced that it will export juice into the country.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "The supermarket request is, in a SWOT analysis, an", options: [["Opportunity", "Correct: it is an external chance for the business to grow."], ["Strength", "A strength is internal, and the request comes from outside."], ["Internal weakness", "It is external and favourable, so it is not a weakness."], ["Threat", "It does not harm the business."]], answer: "A", explanation: "An external favourable chance is an opportunity." }),
      P.fib({ label: "(b)", marks: 2, stem: "Choose the correct word for each gap.", template: "Old equipment is an {{blank:a}} factor, while the foreign producer's entry is an {{blank:b}} factor.", blanks: [{ id: "a", accepted: ["internal"], choices: ["internal", "external"] }, { id: "b", accepted: ["external"], choices: ["internal", "external"] }], explanation: "Equipment belongs to the business (internal). The foreign producer is outside it (external)." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how Tatenda could use a strength to deal with the threat from the foreign producer.", points: ["Tatenda's product is of high quality and the foreign firm may not match it", "Application: loyal customers are less likely to switch to imported juice", "Tatenda can stress quality and local supply in his marketing to keep these customers"], modelAnswer: "Tatenda's juice is of high quality and his customers are loyal, so many may stay with him instead of switching to imported juice. He can strengthen this by stressing quality and local supply in his marketing.", explanation: "A strength applied to the threat." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why Tatenda's weaknesses might make it difficult to accept the supermarket's request.", points: ["Supplying a national chain needs larger output", "Application: old equipment may not produce enough or may break down, so orders could be missed", "Little cash makes it hard to buy new equipment or extra fruit in advance"], modelAnswer: "A national chain needs a much larger and more reliable supply. Tatenda's old equipment may not produce enough or may break down, so orders could be missed, and with little cash he cannot easily buy new machines or extra fruit in advance.", explanation: "A weakness blocking an opportunity." }),
    ],
    hints: ["Decide first whether each factor is inside or outside the business."],
    explanation: "Opportunity; internal and external; strength against threat; weaknesses block the opportunity.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional business: Sipho and Thandeka run a taxi-bus service on the Gaborone to Francistown route. There are eight operators on the route and fares are similar. A used minibus costs little, and a new rail service has been announced. The only fuel depot nearby sets its price each week and the operators have no other source.",
    parts: [
      P.match({ label: "(a)", marks: 4, stem: "Match each part of the case to the force in Porter's model that it best illustrates.", pairs: [["Eight operators with similar fares", "Rivalry among existing firms"], ["A used minibus costs little", "Threat of new entrants"], ["A rail service has been announced", "Threat of substitutes"], ["One fuel depot sets the price", "Bargaining power of suppliers"]], explanation: "Each fact matches one force." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse the effect of the fuel depot on the operators' profit.", points: ["Fuel is a major variable cost for a bus service", "The depot is the only source, so operators have little power to bargain", "The depot can raise the price, which raises the operators' costs", "Rivalry stops operators passing the cost on to passengers, so profit falls"], modelAnswer: "Fuel is a major cost for a bus service, and the depot is the only source, so the operators cannot bargain. If the depot raises its price, costs rise. With eight operators charging similar fares, passengers can switch, so the operators cannot easily pass the cost on and profit falls.", hints: ["Follow the chain from supplier power to cost to profit."], explanation: "Supplier power, cost, rivalry, profit." }),
      P.manual({ label: "(c)", marks: 6, stem: "Evaluate whether Sipho and Thandeka should expand by buying a second minibus.", points: ["More vehicles could win more passengers on the route", "Rivalry is strong with eight operators, so the extra passengers may not appear", "Low start-up costs mean new entrants can copy the move", "The rail service may take some passengers", "Fuel costs are not within the owners' control and will rise with more vehicles", "Judgement with a reason: wait or compete on quality, unless there is evidence of unmet demand"], modelAnswer: "A second minibus could carry more passengers, but with eight operators charging similar fares the extra passengers may not arrive, and cheap vehicles mean that new entrants can easily copy the move. The planned rail service may also take some travellers, and more vehicles would raise their dependence on a single fuel depot. On balance they should not expand until they have evidence of unmet demand, and should compete first on reliability and service.", hints: ["Use at least two of the forces as reasons for and against."], explanation: "Weighs the move against the forces in the case and reaches a justified judgement." }),
    ],
    hints: ["Connect each fact in the case to one force."],
    explanation: "Match the forces, analyse supplier power, and judge expansion using rivalry, entrants and substitutes.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Farai Solar Supplies in Harare sells solar lamps and panels. Its strengths include trained installers and a good reputation; its weaknesses are limited stock and delayed delivery. Reliable electricity supply has fallen, which has raised demand for solar products, and the government has lowered import duty on solar panels. Two new importers have started selling panels in Harare, and the Zimbabwe exchange rate is unstable.",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Classify each factor from the case.", pairs: [["Trained installers and a good reputation", "Strength"], ["Lower import duty on solar panels", "Opportunity"], ["Two new importers selling panels in Harare", "Threat"]], explanation: "Internal helpful: strength. External helpful: opportunity. External harmful: threat." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the lower import duty may be both an opportunity and a threat to Farai Solar Supplies.", points: ["Lower duty reduces the cost of imported panels, so Farai's costs fall or his prices can fall", "Application: the same lower duty makes importing easier for new importers, increasing the competition", "The effect on profit depends on whether the firm can win customers from the new rivals"], modelAnswer: "Lower duty reduces the cost of importing panels, so Farai's costs and prices can fall. But it also makes importing easier for new firms, and two have already started selling in Harare. Whether it is an opportunity or a threat depends on whether he can win customers from them.", explanation: "One change with two effects." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate how Farai Solar Supplies should use environmental analysis to decide its strategy for the next two years.", points: [["Economic and political factors: lower duty and falling electricity supply create opportunities for growth", 2], ["Competitive forces: new importers increase rivalry and may reduce prices", 1], ["Internal strengths (trained installers, reputation) could be used to differentiate on service and installation", 2], ["Weaknesses (limited stock, delayed delivery) could stop the firm from exploiting the opportunity and should be corrected first", 2], ["Limitation of the tools: the exchange rate is unstable, so the forecasts are uncertain and the analysis may date quickly", 1], ["Judgement with a reason, for example build stock and service first, then grow", 1]], levels: [[3, 7, 9, "Uses PEST, competitive forces and SWOT with application to the case; weighs strengths against weaknesses; notes the limits of the analysis; a justified recommendation"], [2, 4, 6, "Applies some factors to the case with some analysis; judgement weakly supported"], [1, 1, 3, "Lists factors or tools with little application"]], modelAnswer: "Lower import duty and falling electricity supply create an opportunity, because demand for solar products is rising. But the two new importers show that rivals will also respond, so rivalry and price pressure are likely to grow. Farai's strengths, trained installers and a good reputation, are a basis for competing on service and installation, which importers selling only panels may not match. His weaknesses, limited stock and delayed delivery, could however waste the opportunity, since customers will go to rivals if they have to wait. The unstable exchange rate also makes any forecast uncertain, so the analysis should be reviewed often. On balance he should first fix stock and delivery, then use his installation skills to grow, which uses his strengths where they are hardest for rivals to copy.", hints: ["Combine PEST, competition and SWOT, then recommend one priority."], explanation: "Combines the tools, tests their limits and reaches a justified recommendation." }),
    ],
    hints: ["First classify, then link strengths and weaknesses to the opportunities and threats."],
    explanation: "Classify factors, explain the dual effect of lower duty, and recommend a priority.",
  });

  b.card("DEFINITION", "Environmental scanning", "The continuous collection and analysis of information about a business's internal and external environment, so that managers can spot changes early and plan a response.");
  b.card("DEFINITION", "SWOT analysis", "Strengths and weaknesses (internal) and opportunities and threats (external) sorted into a framework to support a strategy.");
  b.card("FACT", "PEST and PESTEL", "PEST: political, economic, social, technological. PESTEL adds environmental and legal.");
  b.card("FACT", "Internal and external environment", "Internal: staff, finance, skills, equipment (controllable). External: economy, law, technology, competitors (can only be responded to).");
  b.card("CONCEPT", "Porter's five forces", "Rivalry among firms, threat of new entrants, threat of substitutes, bargaining power of buyers and of suppliers: the stronger the forces, the lower the profit in the industry.");
  b.card("CONCEPT", "From SWOT to strategy", "Match strengths to opportunities, use strengths against threats, fix weaknesses that block opportunities, and avoid weaknesses meeting threats.");
  b.card("FACT", "Forces that raise rivalry", "Many equal-sized firms, slow market growth, similar products and high fixed costs.");
  b.card("FACT", "Limitations of the tools", "SWOT is subjective and dates quickly; PEST is a checklist without priorities; five forces suits established industries and needs industry-wide knowledge.");
  b.card("CONCEPT", "Opportunity or threat?", "The same external change can be both: a rise in fuel prices threatens a transport operator but creates an opportunity for a solar lighting supplier.");
});
