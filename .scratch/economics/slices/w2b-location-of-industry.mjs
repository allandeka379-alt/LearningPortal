// W2b: econ.production.location-of-industry (ZIMSEC only) — location factors; how and why government influences location.
import { concept, P, table, money, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.production.location-of-industry", { file: "production/location-of-industry", keyPrefix: "production.location-of-industry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which firm is most likely to locate **close to its raw materials**?",
    options: [
      ["A mill that crushes heavy ore into a small amount of metal", "Correct: weight-losing, so it saves transport cost near the mine."],
      ["A bakery selling fresh bread each morning", "Perishable product: near the market."],
      ["A soft-drinks bottler", "Weight-gaining: near the market."],
      ["A bank whose branch serves local businesses and households", "Services locate near customers."],
    ],
    answer: "A",
    explanation: "Weight-losing industries, whose inputs are heavier than their output, locate near their raw materials.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **growth point**?",
    options: [
      ["A selected rural centre where government concentrates investment to attract firms", "Correct: a tool of location policy."],
      ["The level of output at which a firm starts making a profit", "That is break-even."],
      ["The highest point reached by a country's rate of economic growth", "Not the meaning used in location policy."],
      ["A city where all new industry is forbidden", "Restrictions are a different tool."],
    ],
    answer: "A",
    explanation: "Growth points are selected centres given infrastructure and services to spread development away from large cities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do breweries usually locate near large towns?",
    options: [
      ["Their product is bulky and heavy, so it is cheaper to make it near customers", "Correct: weight-gaining industry."],
      ["Their main raw material, grain, is found only in large towns", "Grain is grown in rural areas."],
      ["They need no water", "Breweries use large amounts of water."],
      ["Government forbids breweries in rural areas", "Not a general rule."],
    ],
    answer: "A",
    explanation: "Beer is much heavier and bulkier than its ingredients, so breweries save on transport by locating near the market (with a reliable water supply).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a reason why government influences the location of industry?",
    options: [
      ["To reduce inequality between regions", "Correct: spreading jobs and incomes."],
      ["To raise the transport costs of firms", "Not an aim."],
      ["To concentrate all industry in the capital city", "Policy usually aims to spread industry."],
      ["To increase congestion in urban areas", "Policy aims to reduce congestion."],
    ],
    answer: "A",
    explanation: "Aims include reducing regional inequality, rural-urban migration and urban congestion, and developing resources in remote areas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of a government **incentive** to influence location?",
    options: [
      ["A five-year tax holiday for firms that build factories in a chosen district", "Correct: a carrot."],
      ["A zoning law banning factories in residential areas", "A restriction (stick)."],
      ["A rule that polluting firms must operate far from towns and rivers", "A restriction."],
      ["Refusing planning permission in the city centre", "A restriction."],
    ],
    answer: "A",
    explanation: "Incentives (tax relief, grants, cheap loans, subsidised sites) attract firms; restrictions keep them out of certain areas.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A firm making bricks from local clay sells mostly to builders within 30 km. Which pair of factors most influences where it locates?",
    options: [
      ["Nearness to clay deposits and to its market", "Correct: bulky, low-value product and bulky input."],
      ["Nearness to an airport and to a university", "Not important for a bulky, low-value product."],
      ["Nearness to the coast and to a stock exchange", "Irrelevant to brick making."],
      ["Nearness to a border post and to a tourist resort", "Not the main factors."],
    ],
    answer: "A",
    hints: ["Bricks are heavy and cheap: what does transport do to their cost?"],
    explanation: "Clay and bricks are both heavy and low in value, so brickworks locate near clay deposits within reach of their customers.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A government gives grants to firms that move to a remote growth point. Which is the most likely reason the policy might **fail**?",
    options: [
      ["Firms face higher costs there because of small markets and few skilled workers", "Correct: incentives may not offset the higher costs."],
      ["The grants reduce the firms' costs by far too much to be useful", "Lower costs would help, not cause failure."],
      ["Growth points have too many skilled workers looking for jobs", "Remote areas usually lack skilled workers."],
      ["Firms are not allowed to employ local people", "There is no such rule."],
    ],
    answer: "A",
    hints: ["What does a firm still lack at a remote site after receiving a grant?"],
    explanation: "If costs remain high because of distance from markets, poor services and few skills, firms may not move or may leave when the grants end.",
  });
  // Transport cost comparison (different from the lesson).
  const rate = 0.4, ore = 50, metal = 5, dist = 150;
  const atMine = metal * dist * rate, atTown = ore * dist * rate;
  check("atMine", atMine, 300);
  check("atTown", atTown, 3000);
  const stemT = `A fictional smelter turns ${ore} tonnes of ore into ${metal} tonnes of metal. The mine is ${dist} km from the town where the metal is sold. Transport costs US\\$0.40 per tonne per kilometre for ore and metal alike.`;
  const oreB = 80, metalB = 8, distB = 120, rateB = 0.35;
  const atTownB = oreB * distB * rateB, atMineB = metalB * distB * rateB;
  check("atTownB", atTownB, 3360);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: atTownB, daily: true,
    stem: `A fictional company turns ${oreB} tonnes of chrome ore into ${metalB} tonnes of ferrochrome. The mine is ${distB} km from the town where the ferrochrome is sold, and transport costs US\\$0.35 per tonne per kilometre. If the smelter is built in the town, what is the cost of carrying the ${oreB} tonnes of ore from the mine?`,
    wrong: [atMineB],
    explanation: `${oreB} × ${distB} × 0.35 = **${money(atTownB)}**. ${money(atMineB)} is the cost of carrying the ferrochrome, which applies if the smelter is at the mine.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: atTown - atMine,
    stem: `${stemT}\n\nCalculate how much transport cost is saved by building the smelter at the mine instead of in the town.`,
    wrong: [atTown, atMine],
    hints: ["At the mine only the metal travels; in the town all the ore travels."],
    explanation: `1. Smelter at the mine: carry ${metal} t of metal: ${metal} × ${dist} × 0.40 = ${money(atMine)}.\n2. Smelter in the town: carry ${ore} t of ore: ${ore} × ${dist} × 0.40 = ${money(atTown)}.\n3. Saving: ${money(atTown)} − ${money(atMine)} = **${money(atTown - atMine)}**.\n4. Smelting is weight-losing, so it is pulled towards the raw material.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Industries that use large amounts of water, such as breweries and paper mills, need a reliable water supply when choosing a location.",
    answer: true,
    explanation: "True. Water supply is a location factor for water-intensive industries.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A zoning law that keeps factories out of residential areas is an example of a government incentive.",
    answer: false,
    explanation: "False. It is a restriction. Incentives are rewards such as tax holidays and grants.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each firm with the location factor that most influences it.",
    pairs: [
      ["A dairy processing fresh milk", "Nearness to perishable raw materials"],
      ["A hair salon", "Nearness to customers"],
      ["An aluminium smelter", "Cheap, reliable electricity"],
      ["A textile dyeing works", "A large water supply"],
    ],
    explanation: "Fresh milk is perishable; salons serve local customers; smelting uses huge amounts of power; dyeing uses large amounts of water.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "An industry whose raw materials are heavier than its product is a weight-{{blank:a}} industry and tends to locate near its {{blank:b}}. A weight-gaining industry tends to locate near its {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["losing"], choices: ["losing", "gaining"] },
      { id: "b", accepted: ["raw materials"], choices: ["raw materials", "market"] },
      { id: "c", accepted: ["market"], choices: ["market", "raw materials"] },
    ],
    wrong: [["gaining", "market", "raw materials"]],
    explanation: "Weight-losing industries save transport costs near raw materials; weight-gaining industries near markets.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which government can influence where firms locate.",
    points: [
      "Identifies incentives (tax holidays, grants, cheap loans, subsidised land).",
      "Explains: lower costs in the chosen area attract firms there.",
      "Identifies infrastructure / growth points / restrictions (zoning, planning permission).",
      "Explains its effect (roads and power make the area attractive; restrictions keep firms out of crowded areas).",
    ],
    modelAnswer: "First, government can offer incentives such as tax holidays, grants and cheap factory sites in chosen areas, which lower firms' costs there and attract them. Second, it can build roads, power lines and water supplies at growth points, making those places attractive, or use zoning laws and planning permission to keep factories out of crowded city centres.",
    hints: ["Carrots and sticks."],
    explanation: "One mark for each method and one for explaining how it affects firms' choices.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why a government may want to encourage industry to locate in rural areas.",
    points: [
      "To create jobs and raise incomes in rural areas / reduce regional inequality.",
      "Explains: rural poverty falls and development spreads more evenly.",
      "To reduce rural-urban migration (or congestion/pollution in cities).",
      "Explains: less pressure on urban housing, water and services.",
    ],
    modelAnswer: "First, industry in rural areas creates jobs and raises incomes there, reducing poverty and the gap between rural and urban regions. Second, if people can find work near home, fewer migrate to the cities, which reduces pressure on urban housing, water, transport and other services.",
    hints: ["Think about rural people and about the cities."],
    explanation: "One mark for each reason and one for explaining its benefit.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 14,
    stem: "A fictional government wants a new fruit-canning factory to be built at a rural growth point near orchards, about 250 km from the capital. The canning firm would prefer a site in the capital, where most of its customers and skilled workers are. The government offers a three-year tax holiday and to build a tarred road and a power line to the growth point.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which location factor favours the growth point?",
        options: [["Nearness to perishable raw materials (fruit)", "Correct: fruit spoils quickly."], ["Nearness to the main market for canned fruit", "The market is in the capital."], ["Availability of skilled workers", "Skilled workers are mainly in the capital."], ["Existing good infrastructure", "The road and power line have yet to be built."]],
        answer: "A",
        explanation: "The orchards supply perishable fruit, which favours canning nearby.",
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** reasons why the firm prefers the capital.", points: ["Most customers are in the capital.", "So distribution costs are lower and the firm can serve customers quickly.", "Skilled workers are available in the capital.", "So recruitment and training costs are lower / external economies (suppliers, repair services, banks)."], modelAnswer: "Most of the firm's customers are in the capital, so locating there reduces the cost and time of distribution. The capital also has skilled workers and supporting businesses such as suppliers, repairers and banks, so recruitment and running costs are lower." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how the government's offer could change the firm's decision.", points: ["The tax holiday raises profit after tax in the early years.", "The road reduces transport costs to the capital.", "The power line provides the energy the factory needs, removing a major barrier."], modelAnswer: "The tax holiday raises the firm's profits after tax for three years, the tarred road reduces the cost and time of taking canned fruit to the capital, and the power line provides the electricity the factory needs. Together these reduce the disadvantages of the rural site." }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government's policy is a good use of public money.",
        points: [
          "For: creates rural jobs and incomes; reduces regional inequality and migration.",
          "For: the road and power line benefit other firms and households (lasting infrastructure).",
          "For: fruit processed near orchards reduces waste / adds value for farmers.",
          "Against: opportunity cost of the money (health, education).",
          "Against: the firm may leave after the tax holiday ends / remain less efficient than at the capital.",
          "Justified conclusion (for example worthwhile because the infrastructure is lasting and canning near orchards is efficient).",
        ],
        hints: ["Who else benefits from the road and power line?"],
        modelAnswer: "The policy creates jobs and incomes at the growth point, reduces regional inequality and migration to the capital, and lets fruit be processed before it spoils, adding value for local farmers. The road and power line will also serve other firms and households for many years. However, the money has an opportunity cost, the tax holiday reduces government revenue, and the firm may leave when it ends if costs remain higher than in the capital. Because canning near perishable fruit makes economic sense and the infrastructure is lasting, the policy is a reasonable use of public money, provided the incentives are linked to keeping jobs.",
      }),
    ],
    explanation: "(a) Perishable raw materials. (b) Market and skilled labour. (c) Lower costs from the incentives. (d) Rural development and lasting infrastructure against cost and the risk of the firm leaving.",
    hints: ["Weigh the firm's costs against the wider benefits."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A fictional country's capital city has heavy traffic, air pollution and long queues for housing. Most new factories still choose to locate there.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse why firms continue to locate in the capital despite these problems, and how government could encourage them to locate elsewhere.", points: ["Large market / customers near at hand.", "Skilled labour and supporting firms (external economies) lower costs.", "Good infrastructure: roads, power, airport, communications.", "Government could offer incentives (tax holidays, grants) elsewhere.", "Government could build infrastructure at growth points.", "Government could restrict new factories in the capital (zoning, planning permission)."], modelAnswer: "Firms choose the capital because it has the largest market, skilled workers and supporting firms such as suppliers and banks, and the best roads, power supply and communications, so their costs are lower. Government could offer tax holidays and grants for factories in other towns, build infrastructure at growth points so that those areas become attractive, and refuse planning permission for new factories in the crowded capital." }),
    ],
    explanation: "Market, skills, external economies and infrastructure attract firms; incentives, infrastructure elsewhere and restrictions can redirect them.",
    hints: ["Give three reasons and three policies."],
  });

  b.card("DEFINITION", "Location of industry", "Where a firm or industry sets up production, chosen to keep costs low and reach markets and inputs.");
  b.card("CONCEPT", "Factors affecting location", "Raw materials, markets, labour, power, transport, water, land, external economies, government policy.");
  b.card("DEFINITION", "Weight-losing industry", "Inputs heavier or bulkier than output (sugar milling, smelting): locates near raw materials.");
  b.card("DEFINITION", "Weight-gaining industry", "Output heavier, bulkier or more fragile than inputs (brewing, soft drinks): locates near the market.");
  b.card("DEFINITION", "Growth point", "A selected rural centre where government concentrates infrastructure and services to attract firms and spread development.");
  b.card("CONCEPT", "Why government influences location", "Reduce regional inequality, rural-urban migration and urban congestion; develop resources in remote areas.");
  b.card("CONCEPT", "How government influences location", "Incentives (tax holidays, grants, cheap sites), infrastructure, growth points, restrictions (zoning), siting public-sector activities.");
  b.card("FACT", "Why might location incentives fail?", "Remote areas may still have small markets and few skills, so firms face higher costs and may leave when incentives end.");
});
