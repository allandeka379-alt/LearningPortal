// W3b: operations.location-scale
import { concept, P, chk, money, table, sum, pctChange, invest, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.location-scale", { file: "operations/location-scale", keyPrefix: "operations.location-scale" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Moving production of a product to another country, usually to cut costs, is called",
    ok: ["offshoring", "Correct: work is moved abroad."],
    bad: [["reshoring", "Reshoring brings work back to the home country."], ["outsourcing to a local firm", "Local outsourcing does not move work to another country."], ["rationalisation", "Rationalisation means reducing capacity."]],
    explanation: "Offshoring means moving work to another country; reshoring is bringing it back.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal economy of scale**?",
    ok: ["Buying materials in bulk at a discount", "Correct: a cost saving that comes from the firm's own size."],
    bad: [["A skilled labour force available in the town", "That is an external economy."], ["Better roads built by the government", "That is an external economy."], ["Slower decisions in a large organisation", "That is a diseconomy of scale."]],
    explanation: "Bulk-buying discounts are an internal purchasing economy.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **qualitative** factor in choosing a location?",
    ok: ["The skills of the local workforce", "Correct: it is a matter of judgement, not a cost figure."],
    bad: [["The monthly rent paid for the factory building", "Rent is a cost that can be measured."], ["The cost of transporting goods to customers", "Transport cost can be measured."], ["The price of electricity for each unit used", "Utility costs can be measured."]],
    explanation: "Qualitative factors cannot easily be costed; skills and attitudes are an example.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a firm decide to **reshore** production?",
    ok: ["Rising overseas costs and a wish for better control", "Correct: reshoring is often driven by cost changes and control."],
    bad: [["Wages overseas have fallen sharply this year", "Falling overseas wages would encourage offshoring, not reshoring."], ["Longer supply chains are cheaper and more reliable", "Long supply chains are a reason to bring work back."], ["The firm wishes to employ fewer people at home", "Reshoring normally creates jobs at home."]],
    explanation: "Reshoring is driven by rising overseas costs, delays and the wish for control over quality.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery chain moves its head office to a town where many other food firms are based and finds it easy to hire trained bakers. This is an example of",
    ok: ["an external economy of scale", "Correct: the benefit comes from the size of the local industry."],
    bad: [["an internal economy of scale", "The benefit comes from outside the firm, not its own size."], ["a diseconomy of scale", "The firm gains a lower cost, not a higher cost."], ["offshoring", "The head office has not moved abroad."]],
    hints: ["Does the benefit come from the firm's own size or from the local industry?"],
    explanation: "A pool of trained labour built up by the local industry is an external economy.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional firm doubles its workforce and finds that decisions take longer and workers feel less involved. What has most likely happened?",
    ok: ["Internal diseconomies have appeared", "Correct: poor communication and morale raise unit costs."],
    bad: [["External economies of scale have appeared", "The problem lies inside the firm, not in the local industry."], ["The firm has reshored all of its production", "No change of country is described."], ["The firm's unit costs must have fallen sharply", "Slower decisions and low morale tend to raise cost."]],
    hints: ["The problems are inside the firm, caused by its size."],
    explanation: "Communication and motivation problems from size are internal diseconomies.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a firm should relocate to a town with lower rent?",
    ok: ["It depends on whether the saving outweighs the moving costs and staff loss", "Correct: it names the conditions on which the decision rests."],
    bad: [["Yes, because lower rent always means lower total cost", "Labour, transport and moving costs may outweigh rent."], ["No, because firms should never change their location", "Relocation can be beneficial."], ["Yes, because location has no effect on the firm's revenue", "Closeness to customers can affect revenue."]],
    hints: ["Think about the cost of the move and the effect on staff and customers."],
    explanation: "A strong judgement balances savings with moving costs, staff loss and market access.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Economies of scale reduce the average cost of each unit as output rises.",
    answer: true,
    explanation: "True. Economies of scale are falls in unit cost as the scale of operations increases.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Once a firm begins to experience diseconomies of scale, its average cost per unit falls.",
    answer: false,
    explanation: "False. Diseconomies of scale raise the average cost per unit, for example through slow communication and poor coordination.",
    hints: ["Diseconomies are the opposite of economies."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example to the correct type.",
    pairs: [["Cheaper loans for a large firm", "Internal economy of scale"], ["A supplier opening nearby", "External economy of scale"], ["Slow communication between many departments", "Internal diseconomy of scale"], ["Traffic jams around a crowded industrial area", "External diseconomy of scale"]],
    explanation: "Internal factors depend on the firm's size; external ones on the size of the area or industry.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Moving work to another country is {{blank:a}}, and bringing it back home is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["offshoring"], choices: ["offshoring", "reshoring", "rationalisation"] },
      { id: "b", accepted: ["reshoring"], choices: ["offshoring", "reshoring", "rationalisation"] },
    ],
    explanation: "Offshoring moves work abroad; reshoring brings it home.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** factor a business should consider when choosing a location.",
    accepted: ["cost of land", "rent", "labour cost", "cost of labour", "transport costs", "closeness to customers", "closeness to suppliers", "availability of skilled labour", "infrastructure", "roads", "power supply", "government grants", "taxes", "law", "political stability", "room to expand", "skilled labour"],
    explanation: "Costs of land, labour and transport, closeness to the market, skills, infrastructure and law are location factors.",
  });

  {
    const rent = 28000, lab = 96000, tr = 21500;
    const tot = sum([rent, lab, tr]);
    chk(tot, 145500);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional furniture maker's yearly costs at a possible new site are rent ${money(rent)}, labour ${money(lab)} and transport ${money(tr)}. Calculate the total yearly cost of this site.`,
      kind: "money", value: tot, wrong: [rent + lab, lab + tr],
      explanation: "Total = 28,000 + 96,000 + 21,500 = US\\$145,500. Leaving out transport gives US\\$124,000.",
    });
  }
  {
    const cost = 255000, q = 42500;
    const u = cost / q;
    chk(u, 6);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional bottler's total costs for a year were ${money(cost)} for an output of ${q.toLocaleString("en-GB")} units. Calculate the average cost per unit.`,
      kind: "money", value: u, wrong: [q / cost, cost - q],
      explanation: "Average cost = 255,000 ÷ 42,500 = US\\$6.00 a unit.",
    });
  }
  {
    const a = 7.2, c = 6.3;
    const ch = pctChange(a, c);
    chk(ch, -12.5, 1e-9);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: `After doubling its output a fictional firm's average cost per unit fell from ${money(a)} to ${money(c)}. Calculate the percentage change in average cost to one decimal place. Give a fall as a negative number.`,
      kind: "pct", value: ch, wrong: [pctChange(c, a), (c / a) * 100],
      hints: ["Divide the change in cost by the original cost."],
      explanation: "Change = 6.30 − 7.20 = −0.90. −0.90 ÷ 7.20 × 100 = −12.5%. Using the new cost as the base gives +14.3%.",
    });
  }
  {
    const move = 36000, saving = 9000;
    const pb = invest.payback(move, [saving, saving, saving, saving, saving]);
    chk(pb, 4, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional firm will spend ${money(move)} on moving to a cheaper site. The move is expected to save ${money(saving)} a year. How many years will it take for the savings to repay the cost of moving? Give your answer to two decimal places.`,
      kind: "years", value: pb, wrong: [saving / move, move - saving],
      hints: ["Divide the cost of moving by the yearly saving."],
      workedSolution: "1. Cost of moving = US\\$36,000.\n2. Saving each year = US\\$9,000.\n3. Years to repay = 36,000 ÷ 9,000 = 4.00 years.",
      explanation: "Payback = 36,000 ÷ 9,000 = 4.00 years. Dividing the other way gives 0.25.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** reason why a firm might choose to locate near its customers.",
    points: ["Transport costs and delivery times to customers are lower", "Customers can find the business easily, which raises sales (or goods stay fresh)"],
    modelAnswer: "Locating near customers lowers transport costs and delivery times. It also makes it easier for customers to find the business, which can raise sales.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tatenda runs a fictional mushroom farm in Chinhoyi and is thinking of moving to Harare. Explain **two** factors she should consider.",
    points: ["Cost of land and rent compared with Chinhoyi", "Application: land in Harare costs more, so rent could reduce the profit of a small farm", "Closeness to customers", "Application: restaurants and shops in Harare would be nearer, cutting transport costs and delay for a perishable product"],
    modelAnswer: "Land and rent in Harare cost more than in Chinhoyi, which could reduce the profit of a small farm. On the other hand, being near restaurants and shops in Harare would cut transport costs and delay for a perishable product like mushrooms.",
    hints: ["Think about costs and about the market."],
    explanation: "Two factors, each applied to the farm.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a growing firm may experience diseconomies of scale.",
    points: ["More layers of management slow communication and decisions", "Workers feel less involved and motivation falls", "Coordination between departments and sites becomes harder", "Mistakes, waste and wages per unit rise, so unit cost increases"],
    modelAnswer: "More layers of management slow communication and decisions, and workers feel less involved so their motivation falls. Coordination between departments becomes harder, so mistakes and waste rise and the cost of each unit increases.",
    hints: ["Think about management and morale in a large organisation."],
    explanation: "A chain from size to communication problems and higher unit cost.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional manufacturer in Bulawayo is considering offshoring its assembly to a country with lower wages. Assess whether it should do so.",
    points: ["Labour costs abroad are lower, so unit costs may fall", "Transport, duties and longer supply chains add costs and delay", "Quality control is harder at a distance", "Job losses at home may damage the firm's image and morale", "Judgement with a condition, for example: offshore only if the total saving, after transport and quality costs, is clear"],
    modelAnswer: "Lower wages abroad may reduce unit costs, but transport, duties and a longer supply chain add costs and delay, and quality is harder to control. Job losses at home may also harm the firm's image. It should offshore only if the saving after transport and quality costs is clear.",
    hints: ["Compare the wage saving with the extra costs of distance."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const sites = [["Site A", 41000, 99000, 27500], ["Site B", 36000, 104000, 32000], ["Site C", 33500, 108500, 29000]];
    const tots = sites.map(([, a, bb, c]) => sum([a, bb, c]));
    chk(tots[0], 167500); chk(tots[1], 172000); chk(tots[2], 171000);
    const tbl = table(["Site", "Rent (US\\$)", "Labour (US\\$)", "Transport (US\\$)"], sites, ["l", "r", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional bakery chain in Masvingo is choosing a site for a new central bakery. The yearly costs of three sites are shown. Site C is 40 km from the main market, while Site A is in the town centre.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total yearly cost of Site B.", kind: "money", value: tots[1], wrong: [tots[0], tots[2]], explanation: "36,000 + 104,000 + 32,000 = US\\$172,000." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which site has the lowest total yearly cost?", options: [["Site A", "Correct: US\\$167,500."], ["Site B", "Site B costs US\\$172,000, the highest."], ["Site C", "Site C costs US\\$171,000."], ["All three cost the same", "The totals differ."]], answer: "A", explanation: "Totals: A US\\$167,500, B US\\$172,000, C US\\$171,000." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** qualitative factor the bakery should consider before choosing a site.", points: ["Closeness to customers and the main market", "Application: Site C is 40 km from the market, so bread would take longer to deliver and be less fresh", "Delivery time and freshness affect sales, which the cost figures do not show"], modelAnswer: "Closeness to customers matters for bread. Site C is 40 km from the main market, so bread would take longer to deliver and be less fresh, and sales could fall. The cost figures do not show this effect.", hints: ["Use the distance given in the case."], explanation: "Factor, application and effect." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the bakery should choose the site with the lowest total cost.", points: ["Site A has the lowest cost (US\\$167,500) and is in the town centre", "The difference from Site C is only US\\$3,500, so qualitative factors matter more", "Judgement with a condition, for example: choose Site A unless a larger site or growth plans favour another site"], modelAnswer: "Site A has the lowest total cost, US\\$167,500, and is in the town centre. Site C is only US\\$3,500 more expensive, so qualitative factors matter more than cost. Site A is best unless the bakery needs room for growth that only another site can offer.", hints: ["Compare the cost differences with the importance of the market."], explanation: "Cost, size of the difference, and a conditional judgement." }),
      ],
      hints: ["Add rent, labour and transport for each site."],
      explanation: "Site A is cheapest at US\\$167,500; the differences are small, so qualitative factors such as closeness to customers matter.",
    });
  }
  {
    const units = 120000, home = 3.4, abroad = 2.1, ship = 0.55, duty = 0.3, defHome = 0.01, defAb = 0.04, defCost = 3, stock = 12000, setup = 90000;
    const unitAb = abroad + ship + duty;
    chk(unitAb, 2.95);
    const save = (home - unitAb) * units;
    chk(save, 54000);
    const defExtra = (defAb - defHome) * units * defCost;
    chk(defExtra, 10800);
    const net = save - defExtra - stock;
    chk(net, 31200);
    const pb = setup / net;
    chk(pb, 2.8846, 1e-3);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Gokwe Covers is a fictional maker of phone covers in Harare. It makes ${units.toLocaleString("en-GB")} covers a year at home with a labour and overhead cost of ${money(home)} a cover. It is considering offshoring production to a country where the cost is ${money(abroad)} a cover, plus ${money(ship)} for shipping and ${money(duty)} for import duty. Overseas, 4% of covers would be defective instead of 1%, and each defective cover costs ${money(defCost)} to replace. The longer supply chain means holding extra stock costing ${money(stock)} a year. Setting up the arrangement costs ${money(setup)}. The owner worries that 12 workers would lose their jobs and that deliveries would take six weeks instead of one.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the yearly saving from offshoring before allowing for defects, extra stock and the set-up cost.", kind: "money", value: save, calculator: true, wrong: [(home - abroad) * units, (home - unitAb)], explanation: "Overseas cost per cover = 2.10 + 0.55 + 0.30 = US\\$2.95. Saving = (3.40 − 2.95) × 120,000 = US\\$54,000." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** problem Gokwe Covers might face if it offshores production.", points: ["Quality control is harder at a distance, and defects rise from 1% to 4%", "Application: the extra 3% defective covers would cost US\\$10,800 a year to replace", "Longer delivery times (six weeks instead of one) may mean lost sales or the need for extra stock", "Job losses for 12 workers could damage morale and the firm's image"], modelAnswer: "Quality control is harder at a distance and defects would rise from 1% to 4%. The extra 3% of covers would cost 3% × 120,000 × US\\$3 = US\\$10,800 a year to replace, which reduces the saving from lower costs.", hints: ["Use the defect rates from the case."], explanation: "A chain from distance to defects and cost." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Gokwe Covers should offshore production.", points: ["Gross saving of US\\$54,000 a year", "Less extra defect cost of US\\$10,800 and extra stock cost of US\\$12,000, the net saving is US\\$31,200 a year", "Payback of the US\\$90,000 set-up cost is about 2.9 years (90,000 ÷ 31,200)", "Six-week delivery reduces flexibility and may lose sales", "Twelve jobs would be lost, harming morale and the firm's image locally", "Exchange rates, duties or shipping costs could change and reduce the saving", ["Judgement with a reason, for example: offshore only if the saving is dependable for at least three years", 1], ["Condition or time-frame, for example: begin with part of the output while keeping the home plant", 1]], levels: [[1, 1, 3, "General points on offshoring with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the net saving and payback, with a justified judgement and a condition."]], modelAnswer: "The gross saving is US\\$54,000 a year, but defects add US\\$10,800 and extra stock US\\$12,000, so the net saving is US\\$31,200. The set-up cost of US\\$90,000 would take about 2.9 years to repay. Against this, delivery would take six weeks instead of one, 12 workers would lose their jobs, and changes in exchange rates or shipping costs could remove the saving. Gokwe Covers should offshore only part of its output at first, keeping the home plant to protect delivery and flexibility, and expand overseas only if the saving proves reliable for at least three years.", hints: ["Subtract the extra costs from the gross saving, then compare with the set-up cost."], explanation: "Net saving US\\$31,200; payback 2.9 years. The judgement should recognise risk and the effect on flexibility and jobs." }),
      ],
      hints: ["Add the shipping and duty to the overseas production cost."],
      explanation: "Overseas cost per cover is US\\$2.95, giving a gross saving of US\\$54,000. After defects and stock the net saving is US\\$31,200.",
    });
  }

  b.card("DEFINITION", "Offshoring", "Moving business processes or production to another country, usually to cut costs.");
  b.card("DEFINITION", "Reshoring", "Bringing production or business processes back to the home country after offshoring.");
  b.card("FACT", "Quantitative location factors", "Rent and land cost, labour cost, transport cost, utilities, taxes and grants, and the cost of relocation.");
  b.card("FACT", "Qualitative location factors", "Labour skills, closeness to customers and suppliers, infrastructure, law and stability, room to expand, image.");
  b.card("DEFINITION", "Economies of scale", "Falls in average unit cost as the scale of operations increases.");
  b.card("CONCEPT", "Internal economies of scale", "Technical, purchasing (bulk buying), financial, managerial and marketing economies from the firm's own size.");
  b.card("CONCEPT", "External economies of scale", "Cost savings from the size of the industry or area: skilled labour, nearby suppliers, better infrastructure.");
  b.card("CONCEPT", "Diseconomies of scale", "Rises in unit cost when a firm is too large: slow communication, poor coordination, low morale; externally, congestion and rising prices of land and labour.");
  b.card("FACT", "Why firms reshore", "Rising overseas costs, long and unreliable supply chains, quality and control, customers' preference for local goods.");
});
