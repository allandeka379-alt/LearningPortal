// W1a: enterprise.business-activity
import { concept, P, check, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.enterprise.business-activity", { file: "enterprise/business-activity", keyPrefix: "enterprise.business-activity" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which factor of production is rewarded with **rent**?",
    ok: ["Land", "Correct: rent is the payment for the use of land and natural resources."],
    bad: [["Labour", "Labour is rewarded with wages and salaries."], ["Capital", "Capital is rewarded with interest."], ["Enterprise", "Enterprise is rewarded with profit."]],
    explanation: "Land earns rent, labour earns wages, capital earns interest and enterprise earns profit.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by the **opportunity cost** of a decision?",
    ok: ["The next best alternative that has to be given up", "Correct: it measures what is sacrificed by choosing one option."],
    bad: [["The money spent on the option that was chosen", "That is the financial cost of the chosen option, not the cost of what was given up."], ["The total of all the alternatives not chosen", "Only the single next best alternative counts."], ["The profit earned from the option that was chosen", "Profit measures the gain from the choice, not what was lost."]],
    explanation: "Opportunity cost is the next best alternative forgone.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is an example of the factor of production called **capital**?",
    ok: ["A delivery truck owned by a bakery", "Correct: capital is man-made assets used to produce goods and services."],
    bad: [["A baker's skill in making bread", "Skill is part of labour."], ["The owner's decision to start the bakery", "Organising and risk-taking is enterprise."], ["The plot of land on which the bakery stands", "The plot is land."]],
    explanation: "As a factor of production, capital is equipment, vehicles and buildings, not skills or land.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do businesses have to make choices?",
    ok: ["Resources are scarce but wants are unlimited", "Correct: scarcity means not everything can be produced or bought."],
    bad: [["All businesses in a country sell in the same market", "Businesses operate in many different markets, and this does not explain choice."], ["Customers never change what they like to buy", "Tastes do change; that is not the source of choice."], ["Profit is always the only aim of every owner", "Aims vary, and choice would still be needed if profit was the only aim."]],
    explanation: "Because resources are scarce, using them for one purpose means not using them for another.",
  });
  const apv = r2(3.2 - 1.85);
  chk(apv, 1.35);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A poultry farm in Chinhoyi sells a tray of 30 eggs for US\\$3.20. Bought-in feed, packaging and fuel cost US\\$1.85 per tray. The farmer's wages and rent are not included. What is the added value per tray?",
    ok: ["US\\$1.35", "Correct: 3.20 − 1.85 = 1.35."],
    bad: [["US\\$5.05", "Adding the cost to the price is the wrong operation."], ["US\\$1.85", "This is the cost of bought-in inputs, not the added value."], ["US\\$3.20", "This is the selling price; the inputs must be subtracted."]],
    hints: ["Added value = selling price − cost of bought-in inputs."],
    explanation: "Added value per tray is 3.20 − 1.85 = US\\$1.35. Wages and rent are paid out of this added value.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A clothing maker in Bulawayo has US\\$6,000. She can buy a new sewing machine that would earn an extra US\\$1,500 a year, rent a stall in the market that would earn US\\$1,100 a year, or leave the money in a savings account earning US\\$250 a year. She buys the machine. What is the opportunity cost of her decision, per year?",
    ok: ["US\\$1,100", "Correct: the next best alternative is the stall, worth US\\$1,100 a year."],
    bad: [["US\\$1,500", "This is the gain from the machine she chose."], ["US\\$1,350", "This adds up both alternatives not chosen; only the next best counts."], ["US\\$250", "This is the least valuable alternative, not the next best."]],
    hints: ["Which was the best option she did not take?"],
    explanation: "The opportunity cost is the next best alternative given up, the stall at US\\$1,100 a year.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A bakery raises its selling price from US\\$1.00 to US\\$1.30 after adding branded packaging that raises bought-in costs from US\\$0.60 to US\\$0.70 per loaf. What happens to added value per loaf?",
    ok: ["It rises from US\\$0.40 to US\\$0.60", "Correct: 1.00 − 0.60 = 0.40 before; 1.30 − 0.70 = 0.60 after."],
    bad: [["It rises from US\\$0.40 to US\\$0.50", "The new cost is US\\$0.70, so the new added value is US\\$0.60, not US\\$0.50."], ["It falls because bought-in costs are higher", "The price rise is larger than the cost rise, so added value increases."], ["It stays the same because profit has not been calculated", "Added value can be calculated without profit and it has changed."]],
    hints: ["Work out added value before and after."],
    explanation: "Before: 1.00 − 0.60 = 0.40. After: 1.30 − 0.70 = 0.60. The extra US\\$0.20 is the extra value created by the packaging.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might a business with a high added value per unit still make a loss?",
    ok: ["Overheads may be greater than total added value", "Correct: added value does not take away overheads."],
    bad: [["Added value is the same thing as profit", "It is not: profit is what remains after all costs."], ["Bought-in inputs are always supplied free of charge", "They are a cost, and are already deducted in added value."], ["High added value means prices are too low", "A high added value suggests prices are high compared with input costs."]],
    hints: ["What costs are paid out of the added value?"],
    explanation: "Added value is a gross contribution of the business; labour, rent and other overheads must be covered out of it before any profit remains.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "As a factor of production, enterprise is rewarded with profit.",
    answer: true,
    explanation: "True. The enterprise factor organises the others and bears the risk, and its reward is profit (or a loss if the business fails).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Added value is the same as the profit of a business.",
    answer: false,
    explanation: "False. Added value is selling price minus bought-in inputs; profit is what is left after wages, rent and all other costs are also paid.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each factor of production to its usual reward.",
    pairs: [["Land", "Rent"], ["Labour", "Wages"], ["Capital", "Interest"], ["Enterprise", "Profit"]],
    explanation: "Each factor has its own reward: rent, wages, interest and profit.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence by choosing the correct term for each gap.",
    template: "Human wants are {{blank:a}} but resources are limited. This problem is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["unlimited"], choices: ["unlimited", "limited"] },
      { id: "b", accepted: ["scarcity"], choices: ["scarcity", "enterprise", "added value"] },
    ],
    explanation: "Unlimited wants set against limited resources is the problem of scarcity.",
  });

  const av1 = r2(2.5 - 1.4);
  const avt = r2(av1 * 320);
  chk(avt, 352);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: avt, calculator: true, daily: true, wrong: [r2(2.5 * 320), r2(1.4 * 320)],
    stem: "A peanut-butter maker in Masvingo sells a jar for US\\$2.50. Bought-in groundnuts, jars and labels cost US\\$1.40 per jar. She sells 320 jars in a week. Calculate the total added value for the week.",
    hints: ["Find the added value per jar first."],
    explanation: "Added value per jar = 2.50 − 1.40 = 1.10. Total = 1.10 × 320 = US\\$352. Using the selling price alone gives US\\$800 (sales revenue), and using the cost alone gives US\\$448.",
  });
  const av2 = r2(2.0 * 1.15 - 1.2);
  const av1b = r2(2.0 - 1.2);
  chk(av2, 1.1);
  const pctUp = ((av2 - av1b) / av1b) * 100;
  chk(pctUp, 37.5, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: pctUp, calculator: true, wrong: [15, r2(((av2 - av1b) / av2) * 100)],
    stem: "A soap maker in Mutare sells a bar for US\$2.00. Bought-in oils, moulds and wrappers cost US\$1.20 per bar. After improving the packaging she raises the price by 15%, with no change in bought-in cost. Calculate the percentage increase in added value per bar, to one decimal place.",
    hints: ["A 15% rise in price is not a 15% rise in added value because the cost stays the same."],
    explanation: "New price = 2.00 × 1.15 = 2.30. New added value = 2.30 − 1.20 = 1.10 (old 0.80). Increase = 0.30 ÷ 0.80 × 100 = 37.5%. Taking the 15% price rise as the added value rise ignores that the cost does not change; dividing by the new value gives 27.3%.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the factor of production that consists of man-made assets such as machines and vehicles used to produce goods.",
    accepted: ["capital"],
    explanation: "Capital means man-made assets used in production; its reward is interest.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain what is meant by **scarcity**.",
    points: ["Scarcity is a shortage of resources (limited land, labour, capital) relative to wants", "Human wants are unlimited so choices must be made about how resources are used"],
    modelAnswer: "Scarcity means that resources are limited while people's wants are unlimited. Because of this, a business or a country cannot produce everything and must choose.",
    explanation: "A definition plus the consequence for choice.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A bakery owner in Gweru wants to raise the added value of her loaves. Explain **two** ways she could do this.",
    points: ["Raise the selling price by improving quality, packaging or branding", "Application: customers pay more for a branded wrapped loaf if they see more value", "Reduce the cost of bought-in inputs, for example by buying flour in bulk", "Application: a lower flour cost per loaf widens the gap between price and inputs"],
    modelAnswer: "She could improve the packaging and brand of her bread so that customers accept a higher price. Added value rises when price increases faster than input cost. She could also buy flour in bulk from a supplier at a lower price, which lowers bought-in cost per loaf and increases the difference between price and cost.",
    hints: ["Added value depends on selling price and bought-in costs."],
    explanation: "Two ways, each with a development linked to the bakery.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A change in the business environment can be both an opportunity and a threat. Analyse how a rise in the price of imported flour might affect a bakery in Harare.",
    points: ["Threat: bought-in costs rise and added value per loaf falls if the price is kept the same", "Analysis: if the bakery raises prices, customers may buy less or switch to rivals", "Opportunity: a bakery that finds local suppliers or cheaper recipes may gain a cost advantage over rivals", "Judgement: the effect depends on whether competitors face the same cost and how willing customers are to pay"],
    modelAnswer: "A dearer flour supply lowers added value per loaf unless the price is raised. A price rise could lose customers to rivals. On the other hand, the bakery could turn the change into an opportunity by finding a cheaper local supplier. The outcome depends on whether competitors face the same cost rise and on how loyal the bakery's customers are.",
    hints: ["Consider both sides of the change, then say what the outcome depends on."],
    explanation: "A threat, an opportunity, and a conditional judgement.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a business that serves a wider market (national or international) faces more difficulties than a purely local one.",
    points: ["Larger markets mean more competitors", "Different laws, languages, currencies or customer tastes in other areas or countries", "More complex management and communication over distance"],
    modelAnswer: "A wider market brings more rivals, so the business must compete harder. In other countries there are different laws, currencies and customer tastes. Managing sites that are far apart is also harder because communication takes longer and control is weaker.",
    hints: ["Think of competition, differences between places, and management."],
    explanation: "One point per mark; any three well-explained difficulties.",
  });

  // Practice structured items
  const rows = { inputs: 0.9, price: 1.8, units: 400 };
  const avu = r2(rows.price - rows.inputs);
  const avTot = r2(avu * rows.units);
  chk(avTot, 360);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: false, calculator: true,
    stem: `A fictional business, Nyasha's Juice, in Chinhoyi, sells bottles of fruit juice for ${money(rows.price)} each. Bought-in fruit, bottles and labels cost ${money(rows.inputs)} per bottle. Nyasha sells ${rows.units} bottles a week. Her weekly wages and rent come to US\\$250.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: avu, stem: "Calculate the added value per bottle.", wrong: [rows.inputs], explanation: "1.80 − 0.90 = US\\$0.90." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: avTot, stem: "Calculate the total added value for the week.", wrong: [r2(rows.price * rows.units)], explanation: "0.90 × 400 = US\\$360." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the business still has only a small profit although added value looks high.", points: ["Added value is not profit: wages and rent must be paid from it", "US\\$360 − US\\$250 leaves only US\\$110 a week"], modelAnswer: "Wages and rent of US\\$250 are paid out of the added value of US\\$360, leaving a profit of only US\\$110 a week before other costs.", explanation: "Added value minus 250 gives 110 (a check against the weekly figures)." }),
    ],
    hints: ["Subtract bought-in inputs from the price first."],
    explanation: "Added value per bottle is US\\$0.90, weekly US\\$360; after US\\$250 of wages and rent, US\\$110 remains.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: false,
    stem: "A fictional business, Chipo's Crafts in Victoria Falls, makes wood carvings from local timber for tourists. Chipo's best alternative to running the shop would be a paid job as a tour guide earning US\\$6,000 a year. The shop earns her US\\$7,200 a year. A friend suggests that Chipo should open a second shop in Bulawayo, but this would need all of her savings, which are now earning interest at a small rate.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain the opportunity cost to Chipo of running her own shop.", points: ["Opportunity cost is the next best alternative given up", "Her next best alternative is the guide job worth US\\$6,000 a year", "Her gain from the shop is only US\\$1,200 above that figure"], modelAnswer: "Opportunity cost is the next best alternative she gives up. By running the shop she gives up the guide job paying US\\$6,000 a year, so the shop's extra reward is US\\$7,200 − US\\$6,000 = US\\$1,200.", explanation: "7,200 − 6,000 = 1,200." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether Chipo should open the second shop in Bulawayo.", points: ["Benefit: a second shop could raise sales and added value", "Cost: using all savings means a large opportunity cost (interest and any other use)", "Risk: a new market is less well known; tourists are mainly in Victoria Falls", "Counter-argument: she could test demand with a stall or online sales first", "Judgement or recommendation", "Reason supporting the judgement, linked to risk or return"], modelAnswer: "A second shop could add sales, but it would use all of Chipo's savings, so the opportunity cost is high, and Bulawayo has fewer tourists than Victoria Falls, so the risk is greater. A cheaper way would be to test demand with a market stall first. On balance she should not commit all her savings now, but test the Bulawayo market cheaply and expand only if sales prove strong.", hints: ["Compare the possible gain with the risk and the opportunity cost of using her savings."], explanation: "One point per mark; credit a justified judgement either way." }),
    ],
    hints: ["Weigh gain, risk and opportunity cost."],
    explanation: "Opportunity cost is the guide job; the second-shop decision requires weighing return against risk and use of savings.",
  });

  b.card("DEFINITION", "Added value", "Selling price minus the cost of bought-in inputs. It is the value the business itself adds, not its profit.");
  b.card("FORMULA", "Added value per unit", "Selling price per unit − cost of bought-in inputs per unit.");
  b.card("DEFINITION", "Opportunity cost", "The value of the next best alternative given up when a choice is made.");
  b.card("DEFINITION", "Scarcity", "Limited resources set against unlimited wants, which forces choice.");
  b.card("FACT", "The four factors of production and their rewards", "Land: rent. Labour: wages. Capital: interest. Enterprise: profit.");
  b.card("CONCEPT", "Needs and wants", "Needs are essential for survival (food, shelter); wants are things people desire beyond that. Businesses meet both.");
  b.card("CONCEPT", "Ways to increase added value", "Raise the selling price through quality, design or branding; cut the cost of bought-in inputs; process the product further; add convenience.");
  b.card("CONCEPT", "Change in the business environment", "Change in tastes, technology, laws or competitors can be an opportunity or a threat; businesses must scan and adapt.");
  b.card("FACT", "Local to multinational business", "Local: one area. National: whole country. International: trades across borders. Multinational: owns operations in more than one country.");
});
