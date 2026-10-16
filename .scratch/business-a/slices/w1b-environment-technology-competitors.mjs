// W1b: environment.technology-competitors
import { concept, P, chk, money, invest } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.environment.technology-competitors", { file: "environment/technology-competitors", keyPrefix: "environment.technology-competitors" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "**Automation** in a factory means",
    ok: ["machines doing work that people used to do", "Correct: machines or computer-controlled systems replace routine labour."],
    bad: [["workers choosing their own hours of work", "That is flexible working, not automation."], ["the owner buying shares in a supplier", "That is vertical integration or investment, not automation."], ["customers paying for goods by mobile phone", "That is a payment technology; it is not automation of production."]],
    explanation: "Automation uses machines or computer systems to carry out work formerly done by hand.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **non-price competition**?",
    ok: ["Offering faster delivery, better aftercare", "Correct: it competes on service rather than on price."],
    bad: [["Cutting the price of every item by a quarter", "That is price competition."], ["Running a half-price sale at the end of the month", "A sale is price competition."], ["Matching a rival's lower price on a popular product", "Price matching is price competition."]],
    explanation: "Competing on service, quality, design or branding is non-price competition.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which situation gives a supplier the **most** bargaining power?",
    ok: ["It is the only supplier of an input the buyer needs", "Correct: the buyer has no alternative."],
    bad: [["There are many other suppliers selling the same input", "Many alternatives reduce a supplier's power."], ["The buyer can switch supplier at very little cost", "Easy switching weakens the supplier."], ["The input is a common item that any shop sells", "A common item gives the supplier little power."]],
    explanation: "Few or no alternatives, unique inputs and costly switching increase supplier power.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru finds that a new rival has bought larger ovens and lowered the price of bread. Which response is an example of **non-price** competition?",
    ok: ["Launching a loyalty card and new bread recipes", "Correct: it improves the offer without cutting price."],
    bad: [["Cutting prices to match the rival's bread", "Price matching is price competition."], ["Cutting prices by a further 5% below the rival", "Undercutting is price competition."], ["Announcing a temporary half-price offer on bread", "A temporary discount is price competition."]],
    explanation: "Loyalty schemes and improved products compete on features rather than price.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional workshop installs computer-controlled cutting machines. Which of these is the most likely **disadvantage** in the short term?",
    ok: ["High cost of the machines and need to train staff", "Correct: capital cost and retraining are immediate."],
    bad: [["Output per hour will fall significantly", "Output normally rises with automation."], ["Quality will become less consistent than before", "Automation usually makes quality more consistent."], ["The workshop will have to pay less for electricity", "Machines normally use more electricity, not less."]],
    hints: ["Think about the first-year costs of new equipment."],
    explanation: "The immediate costs of automation are purchase and training; benefits come later.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional supermarket chain in Bulawayo cuts the price of maize meal. Why might this **not** bring it lasting gains?",
    ok: ["Rivals may copy the cut, so everyone earns less profit", "Correct: competitive reactions remove the advantage."],
    bad: [["Customers will never buy maize meal at a lower price", "Lower prices normally raise the quantity demanded."], ["Suppliers will give the chain an unlimited supply for nothing", "Suppliers do not supply goods free of charge."], ["The government will automatically take over the shops", "Nothing in the case suggests nationalisation."]],
    hints: ["Think about what rival chains will do."],
    explanation: "A price cut that rivals copy leaves market shares unchanged and profit margins lower for all.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which action would **best** reduce a small manufacturer's dependence on one powerful supplier?",
    ok: ["Finding and using a second supplier for the key inputs", "Correct: alternatives reduce the supplier's power."],
    bad: [["Buying all supplies from the same firm to get to know it better", "Dependence on one firm keeps its power high."], ["Stopping production until the supplier lowers its prices", "Stopping production would harm the manufacturer more than the supplier."], ["Telling customers to buy from the supplier directly", "This would cause the manufacturer to lose its customers."]],
    hints: ["What would give the buyer a choice?"],
    explanation: "Using several suppliers weakens any one supplier's power.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on whether a small retailer should start selling online?",
    ok: ["It depends on set-up cost, delivery and customers' internet access", "Correct: it names the conditions on which the decision depends."],
    bad: [["Yes, because online selling always doubles sales within a month", "No such guarantee exists; sales depend on many factors."], ["No, because the internet is not used by any customers at all", "Many customers use the internet; the claim is false."], ["Yes, because online shops have no costs of any kind to the firm", "Online selling has costs such as website, delivery and payment fees."]],
    hints: ["Choose the answer that says what the choice depends on."],
    explanation: "A reasoned judgement weighs the costs and benefits and states the conditions.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm that does not keep up with technological change in its industry may lose customers to rivals.",
    answer: true,
    explanation: "True. Rivals that adopt better technology may lower costs, improve quality or offer faster service, which attracts customers.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A supplier always has less bargaining power than the business that buys from it.",
    answer: false,
    explanation: "False. A sole or key supplier of a hard-to-replace input can have more power than a small buyer, especially when switching is costly.",
    hints: ["Think of a firm with only one local supplier."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor to its likely effect on a business.",
    pairs: [["Introduction of automation", "Lower unit costs but redundancies"], ["A rival's price cut", "Pressure on prices and profit margins"], ["A sole supplier raising its prices", "Higher input costs and lower margin"], ["E-commerce", "Wider market at a lower cost of reaching customers"]],
    explanation: "Each factor influences costs, prices or markets in a different way.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A supplier has more power when there are {{blank:a}} suppliers and when switching to another supplier is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["few"], choices: ["few", "many", "no"] },
      { id: "b", accepted: ["costly"], choices: ["costly", "free", "easy"] },
    ],
    explanation: "Few alternatives and costly switching increase supplier power.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** benefit to a firm of using e-commerce.",
    accepted: ["wider market", "reach more customers", "lower costs", "open 24 hours", "access to a wider market", "lower overheads", "convenience", "global reach", "no need for a shop"],
    explanation: "E-commerce widens the market, lowers costs of premises and allows round-the-clock sales.",
  });

  {
    const price = 40, cut = 10;
    const np = (price * (100 - cut)) / 100;
    chk(np, 36, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A rival cuts the price of a ${money(price)} product by ${cut}% to win customers. What is the new price?`,
      kind: "money", value: np, wrong: [price - cut, price * cut / 100],
      explanation: `10% of 40 = 4. New price = 40 − 4 = US\\$36. Subtracting 10 as if it were dollars gives US\\$30.`,
    });
  }
  {
    const paper = 18000, rise = 12;
    const extra = (paper * rise) / 100;
    chk(extra, 2160, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A fictional printer spends ${money(paper)} a year on paper. Its only supplier raises the price by ${rise}% and the printer buys the same quantity. By how much do the printer's yearly paper costs rise?`,
      kind: "money", value: extra, wrong: [paper + extra, paper * rise],
      hints: ["Find 12% of the original spending."],
      explanation: `12% of 18,000 = 2,160, so costs rise by US\\$2,160. The new total (US\\$20,160) is a common wrong answer because it is not the increase.`,
    });
  }
  {
    const cost = 45000, workersOld = 8, workersNew = 2, wage = 250;
    const saving = (workersOld - workersNew) * wage * 12;
    chk(saving, 18000, 1e-9);
    const pb = invest.payback(cost, [saving, saving, saving, saving]);
    chk(pb, 2.5, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional garment maker in Bulawayo installs a cutting machine costing ${money(cost)}. It reduces the workforce in the cutting room from ${workersOld} to ${workersNew} workers, each paid ${money(wage)} a month. Ignoring other costs, how many years does it take for the wage savings to repay the machine? Give your answer to two decimal places.`,
      kind: "years", value: pb, wrong: [cost / ((workersOld * wage) * 12), saving / cost],
      hints: ["Work out the yearly wage saving first."],
      explanation: `Workers no longer needed = 8 − 2 = 6. Yearly saving = 6 × 250 × 12 = US\\$18,000. Payback = 45,000 ÷ 18,000 = 2.50 years. Using the whole old wage bill (US\\$24,000) gives 1.88.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a firm may find it difficult to keep up with technological change.",
    points: ["New equipment and systems are expensive to buy", "Staff need training, and change is fast so equipment soon becomes out of date"],
    modelAnswer: "New equipment is expensive to buy and install, and staff must be trained to use it. Change is fast, so equipment can soon become out of date.",
    explanation: "Two reasons: cost and training or speed of change.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tatenda runs a fictional bakery in Mutare and learns that a larger rival is about to open next door. Explain **two** ways in which he could respond using non-price competition.",
    points: ["Improve quality or offer new products, such as special breads", "Application: customers who value freshness may prefer his bread to cheaper rival loaves", "Improve service or delivery, for example home delivery to offices", "Application: convenience attracts customers who would otherwise go to the rival"],
    modelAnswer: "He could improve quality and offer new breads, so customers who value freshness choose his shop rather than the cheaper rival. He could also offer home delivery to offices, which gives convenience that the rival does not.",
    hints: ["Think of quality, service and branding rather than price."],
    explanation: "Two non-price responses, each applied to the bakery.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the introduction of automation could affect a fictional manufacturer's workforce.",
    points: ["Routine jobs are replaced, so some workers lose their jobs", "Remaining workers need new skills, so training is needed", "Morale may fall because of fear of redundancy", "New jobs may be created in maintenance or programming"],
    modelAnswer: "Routine jobs are replaced by machines, so some workers lose their jobs. Remaining workers need training for new tasks, and morale may fall because of fear of redundancy. New jobs may appear in maintenance and programming.",
    hints: ["Consider jobs lost, jobs changed and jobs created."],
    explanation: "Effects on jobs, skills and morale.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a small retailer should match a larger competitor's price cut.",
    points: ["Matching keeps customers who compare prices", "A small firm has higher unit costs, so margins may disappear", "Non-price competition (service, local knowledge) may be better", "A price war could threaten survival", "Judgement with a reason or condition"],
    modelAnswer: "Matching keeps price-conscious customers, but a small retailer has higher unit costs than a large rival, so its margin may disappear and a price war could threaten its survival. It may do better to compete on service and local knowledge. It should match the price only on a few key items, and only if its costs allow.",
    hints: ["Think about costs and about survival."],
    explanation: "Both options weighed, with a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Chinhoyi Cement Works buys limestone from one supplier, which has raised its price from US\\$30 to US\\$36 a tonne. The works uses 5,000 tonnes a year. A competitor has bought a new kiln that lowers its costs. The works is considering a kiln costing US\\$60,000 that would save US\\$20,000 a year.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the yearly rise in the cost of limestone.", kind: "money", value: (36 - 30) * 5000, wrong: [36 * 5000, 6], explanation: "Rise per tonne = US\\$6. Yearly rise = 6 × 5,000 = US\\$30,000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the payback period of the kiln in years, assuming equal savings each year.", kind: "years", value: 60000 / 20000, wrong: [20000 / 60000, 60000 - 20000], explanation: "60,000 ÷ 20,000 = 3.00 years." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the supplier may be able to raise its price.", points: ["The works has only one supplier, so it has few alternatives", "Switching to another source may be costly or slow", "So the supplier has strong bargaining power"], modelAnswer: "The works has only one supplier, so it has no easy alternatives. Switching would be slow and costly, which gives the supplier strong bargaining power to raise its price.", explanation: "Few alternatives and costly switching." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** other responses the works could make to the competitor's new kiln.", points: ["Compete on quality or service rather than price", "Find a second supplier or negotiate a long-term contract to hold input costs"], modelAnswer: "It could compete on quality and service, and it could find a second supplier or negotiate a long-term contract to hold input costs.", explanation: "One mark for each response." }),
    ],
    hints: ["The rise per tonne is the difference between the new and old price."],
    explanation: "The cost rise and payback are calculated and supplier power and responses are explained.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Mutasa Mobile Money (Harare) offers payments through a mobile phone application and has 40,000 customers. A bigger rival has launched an app with lower fees. The only company that supplies the secure servers Mutasa uses has said it will double its fees next year. Mutasa's directors can invest US\\$50,000 in its own servers, keep paying the supplier, or reduce its fees to match the rival.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the supplier has strong power over Mutasa.", points: ["It is the only supplier of the secure servers", "Mutasa has no alternative supplier", "Moving its service to another system would be costly and risky"], modelAnswer: "The supplier is the only company providing the servers, so Mutasa has no alternative. Moving the service to another system would be costly and risky, so the supplier can set its price.", explanation: "Sole supplier, no alternatives, costly switching." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse the likely effect of the rival's lower fees on Mutasa.", points: ["Customers may switch to the cheaper app", "Mutasa's revenue falls", "Other customers may expect lower fees, reducing margins"], modelAnswer: "Customers may switch to the rival's cheaper app, so Mutasa's revenue falls. Customers who stay may also expect lower fees, which reduces its margin.", hints: ["Think about customers and revenue."], explanation: "Competitor reaction and its effect on revenue." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate which of the three options Mutasa's directors should choose.", points: ["Own servers: removes dependence, but costs US\\$50,000 and needs skills", "Keep paying the supplier: no capital cost, but fees double and the supplier keeps its power", "Cut fees: may keep customers but reduces revenue further", "The options can be combined: own servers lower costs and allow lower fees later", "Depends on the cash available and how many customers will leave", ["A reasoned recommendation", 2], ["A condition or time-frame", 1]], modelAnswer: "Buying its own servers costs US\\$50,000 and needs skills, but it removes the supplier's power and lowers costs in the long run. Keeping the supplier avoids a capital cost but the fees double, which squeezes profit while the rival cuts fees. Cutting fees alone would keep customers but reduce revenue even more. The best course is to invest in its own servers, because this lowers costs and allows Mutasa to match the rival's fees later, provided it has the cash and the skills and can keep its customers during the transition.", hints: ["Compare the options on cost, risk and customers, then recommend with a condition."], explanation: "The three options are weighed and a conditional recommendation made.", levels: [[1, 1, 3, "States the options with little analysis."], [2, 4, 6, "Weighs the options using the case."], [3, 7, 8, "A justified recommendation with a condition."]] }),
    ],
    hints: ["Use supplier power, competitor reaction and cost in your answer."],
    explanation: "Supplier power and competitor action are analysed, and the options are evaluated.",
  });

  b.card("DEFINITION", "Automation", "The use of machines or computer-controlled systems to do work formerly done by people. Raises output and consistency; may reduce jobs.");
  b.card("CONCEPT", "Benefits and costs of new technology", "Benefits: lower unit costs, quality, wider markets. Costs: purchase, training, redundancy, obsolescence and dependence on power or the internet.");
  b.card("DEFINITION", "Price competition", "Competing by lower prices or discounts.");
  b.card("DEFINITION", "Non-price competition", "Competing through quality, branding, service, design, convenience and promotion.");
  b.card("CONCEPT", "Competitive reaction", "If one firm cuts prices or launches a product, rivals may copy it, so the gain may be short-lived and a price war may lower profits for all.");
  b.card("FACT", "When supplier power is high", "Few suppliers, unique inputs, costly switching, and a buyer that is small or unimportant to the supplier.");
  b.card("FACT", "Ways to reduce dependence on a supplier", "Use several suppliers, hold inventory, make long-term contracts, build relationships, or integrate backward.");
  b.card("CONCEPT", "E-commerce", "Selling goods and services over the internet: it widens the market and lowers premises costs but needs delivery, payment and security systems.");
});
