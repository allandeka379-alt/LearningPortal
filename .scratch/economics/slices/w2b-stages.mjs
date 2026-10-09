// W2b: econ.production.stages — primary/secondary/tertiary, interdependence, value addition, direct/indirect production.
import { concept, P, table, money, check, fmt, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.production.stages", { file: "production/stages", keyPrefix: "production.stages" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which activity is an example of **primary** production?",
    options: [
      ["Mining chrome ore", "Correct: extracting a natural resource."],
      ["Smelting chrome ore into ferrochrome", "Processing: secondary."],
      ["Transporting ferrochrome to a port", "A service: tertiary."],
      ["Insuring a cargo of ferrochrome", "A service: tertiary."],
    ],
    answer: "A",
    explanation: "Primary production extracts or grows natural resources (mining, farming, fishing, forestry).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which activity belongs to the **secondary** sector?",
    options: [
      ["Building a block of flats", "Correct: construction turns materials into a product."],
      ["Catching kapenta on Lake Kariba", "Fishing: primary."],
      ["Running a kombi service", "Transport: tertiary."],
      ["Teaching at a secondary school", "Teaching is a service: tertiary, despite the school's name."],
    ],
    answer: "A",
    explanation: "Construction, manufacturing and processing are secondary. The word 'secondary' in a school's name does not make teaching secondary production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A drought sharply reduces the maize harvest. Which effect shows the **interdependence** of the stages of production?",
    options: [
      ["Millers have less maize to process and transporters have fewer loads to carry", "Correct: a primary shock spreads to secondary and tertiary."],
      ["Farmers' land becomes more fertile for the next season", "Drought does not raise fertility."],
      ["The price of maize falls because the supply of maize on the market is now lower", "Lower supply raises the price."],
      ["Banks stop lending to all firms in every sector", "This overstates the effect and is not the link between stages."],
    ],
    answer: "A",
    explanation: "Secondary and tertiary firms depend on primary output, so a poor harvest reduces work and incomes along the chain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **value addition**?",
    options: [
      ["Processing a product further so that it sells for more than its inputs cost", "Correct: value added = output value − cost of inputs."],
      ["Adding VAT to the price of a product at the till", "VAT is a tax, not value addition."],
      ["Raising the price of a product without changing the product in any way", "A price rise alone is not processing."],
      ["Selling more units of a raw material abroad", "Exporting more raw material adds no processing."],
    ],
    answer: "A",
    explanation: "Value addition means processing a product further, for example turning hides into leather shoes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which is an example of **direct** production?",
    options: [
      ["A family grows vegetables only to feed itself", "Correct: production for own use."],
      ["A farmer grows vegetables to sell at Mbare market", "Production for sale: indirect."],
      ["A factory makes school shoes for shops", "Production for sale: indirect."],
      ["A vendor buys tomatoes to resell in town", "Trading for income: indirect."],
    ],
    answer: "A",
    explanation: "Direct production is for one's own use; indirect production is for sale or exchange.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the total value added at all stages of a production chain equal to the final price paid by consumers?",
    options: [
      ["Each firm's inputs are the previous firm's output, so only new value is counted", "Correct: intermediate purchases cancel out."],
      ["Every firm in the chain charges exactly the same price for its own output to buyers", "Prices differ at each stage."],
      ["The government fixes the value added at each stage", "Value added is set by market prices and costs."],
      ["Only the retailer adds value to the product", "Every stage adds value."],
    ],
    answer: "A",
    hints: ["What does each firm pay for its inputs, and to whom?"],
    explanation: "Value added excludes inputs bought from other firms, so adding value added along the chain counts each dollar once and sums to the final price.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A fictional country exports raw hides. Which is the strongest **economic** argument for tanning the hides and making leather goods at home?",
    options: [
      ["More jobs and higher export earnings from selling higher-value products", "Correct: the key benefits of value addition."],
      ["Raw hides cannot be sold abroad at any price", "Raw hides do sell abroad, at a lower value."],
      ["Leather production needs no capital or power", "Tanning needs capital, water and power."],
      ["Processing at home removes all the risk from changes in world leather prices", "It reduces, not removes, exposure."],
    ],
    answer: "A",
    hints: ["Who gains from processing at home?"],
    explanation: "Value addition at home creates jobs and raises export earnings, though it needs investment and skills.",
  });
  // Value-added chain (different from the lesson): maize → mealie-meal → shop.
  const chain = [["Farmer", "Primary", 0, 150], ["Miller", "Secondary", 150, 260], ["Wholesaler", "Tertiary", 260, 300], ["Retailer", "Tertiary", 300, 345]];
  const va = chain.map((r) => r[3] - r[2]);
  const tot = va.reduce((a, x) => a + x, 0);
  check("tot", tot, 345);
  const tC = table(["Firm", "Sector", "Cost of inputs bought (US\\$)", "Value of output sold (US\\$)"], chain, { align: ["l", "l", "r", "r"] });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: va[1], daily: true,
    stem: `The table follows a batch of maize in a fictional district.\n\n${tC}\n\nCalculate the value added by the miller.`,
    wrong: [chain[1][3]],
    explanation: `Value added = output − inputs bought = 260 − 150 = **${money(va[1])}**. US\\$260 is the miller's sales, which include the maize bought from the farmer.`,
  });
  const hide = [["Cattle farmer", "Primary", 0, 40], ["Tannery", "Secondary", 40, 95], ["Shoe factory", "Secondary", 95, 230], ["Shoe shop", "Tertiary", 230, 310]];
  const vaH = hide.map((r) => r[3] - r[2]);
  const totH = vaH.reduce((a, x) => a + x, 0);
  check("totH", totH, 310);
  const salesH = hide.reduce((s, r) => s + r[3], 0);
  const tH = table(["Firm", "Sector", "Cost of inputs bought (US\\$)", "Value of output sold (US\\$)"], hide, { align: ["l", "l", "r", "r"] });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: totH,
    stem: `The table follows a batch of cattle hides in a fictional economy.\n\n${tH}\n\nCalculate the **total** value added by all four firms.`,
    wrong: [salesH],
    hints: ["Find each firm's value added, then add them.", "Check: the total should equal the shop's sales."],
    explanation: `1. Value added: farmer ${vaH[0]}, tannery ${vaH[1]}, shoe factory ${vaH[2]}, shop ${vaH[3]}.\n2. Total: ${vaH.join(" + ")} = **${money(totH)}**, the same as the final price paid by consumers.\n3. Adding all sales (${money(salesH)}) double-counts the inputs passed from firm to firm.`,
  });
  const vaF = 156, totF = 480, salesF = 290;
  const share = (vaF / totF) * 100;
  check("share", share, 32.5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: share, calculator: true,
    stem: `In a fictional production chain for school desks, total value added is US\\$${totF}. The furniture factory sells its desks for US\\$${salesF} and adds US\\$${vaF} of value. What percentage of the total value added is created by the factory? Give your answer to one decimal place.`,
    wrong: [(vaF / salesF) * 100],
    hints: ["Factory's value added ÷ total value added × 100."],
    explanation: `${vaF} ÷ ${totF} × 100 = **${fmt(share, 1)}%**. Dividing by the factory's sales (${salesF}) gives ${fmt((vaF / salesF) * 100, 1)}%, which is the wrong base.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Banking and insurance are examples of tertiary production.",
    answer: true,
    explanation: "True. They are commercial services, part of the tertiary sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Generating electricity at a power station is tertiary production because consumers do not see a physical product.",
    answer: false,
    explanation: "False. Electricity generation converts fuel or water power into a product; it is classed as secondary production.",
  });
  b.match({
    d: 1, skill: "RECALL",
    stem: "Match each activity with its stage of production.",
    pairs: ["Growing tobacco", "Making cooking oil from soya beans", "Guiding tourists at Victoria Falls", "Felling trees for timber"],
    right: ["Primary", "Secondary", "Tertiary"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Growing and felling are primary; processing soya into oil is secondary; tourism services are tertiary.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Choose the correct words.",
    template: "A household that grows maize only for its own meals is engaged in {{blank:a}} production. A commercial farmer who sells maize to a mill is engaged in {{blank:b}} production, which depends on specialisation and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["direct"], choices: ["direct", "indirect"] },
      { id: "b", accepted: ["indirect"], choices: ["indirect", "direct"] },
      { id: "c", accepted: ["exchange"], choices: ["exchange", "self-sufficiency"] },
    ],
    wrong: [["indirect", "direct", "self-sufficiency"]],
    explanation: "Production for one's own use is direct; production for sale is indirect and depends on exchange.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the tertiary sector supports primary and secondary production.",
    points: [
      "Transport moves raw materials to factories and goods to markets.",
      "Banks provide loans / payment services so firms can buy inputs and equipment.",
      "Insurance reduces risk / warehousing stores goods.",
      "Retailing and advertising sell the goods to consumers, so producers earn revenue.",
    ],
    modelAnswer: "Transport firms move maize from farms to mills and mealie-meal from mills to shops. Banks lend money for seed, fertiliser and machinery and handle payments. Insurance protects crops and stock against loss, and warehouses store goods until they are needed. Finally, wholesalers, retailers and advertisers sell the goods to consumers, so farmers and factories earn revenue.",
    hints: ["Think of transport, finance, insurance and selling."],
    explanation: "One mark for each service clearly linked to primary or secondary producers.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Explain **two** problems Zimbabwe may face in adding value to its minerals before export.",
    points: [
      "Identifies high capital cost of refineries / smelters.",
      "Explains: finance is scarce or expensive, so few plants are built.",
      "Identifies unreliable or costly electricity (or lack of skills, or foreign competition).",
      "Explains: processing needs large amounts of power / skilled staff, so costs rise and plants cannot compete.",
    ],
    modelAnswer: "First, refineries and smelters cost a great deal to build, and finance is scarce and expensive, so few firms can afford them. Second, processing minerals uses large amounts of electricity; if power supply is unreliable or costly, production is interrupted and costs rise, making it hard to compete with established foreign processors.",
    hints: ["What does a refinery need to operate?"],
    explanation: "One mark for each problem and one for explaining its effect.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12, applies: ZIM,
    stem: "A fictional country in southern Africa exports most of its cotton as lint. The government is considering a grant to help firms spin and weave the lint into cloth before export.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "To which stage of production does spinning and weaving belong?",
        options: [["Secondary", "Correct: processing a raw material."], ["Primary", "Growing cotton is primary."], ["Tertiary", "Services such as transport are tertiary."], ["Direct", "Direct production is production for own use, not a stage."]],
        answer: "A",
        explanation: "Spinning and weaving process lint into cloth: secondary production.",
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** benefits to the country of adding value to its cotton.", points: ["More jobs in mills and in supporting services.", "Higher incomes / lower unemployment.", "Cloth sells for more than lint, raising export earnings.", "More foreign currency / less vulnerability to the world price of lint."], modelAnswer: "Spinning and weaving would create jobs in the mills and in transport and other services, raising incomes and reducing unemployment. Cloth also sells for much more than lint, so export earnings and foreign currency inflows would rise and the country would depend less on the world price of raw lint." }),
      P.manual({
        label: "(c)", marks: 7, levels: LV(7),
        stem: "Discuss whether the government should give the grant.",
        points: [
          "For: value addition creates jobs and raises export earnings.",
          "For: develops skills and industry / linkages with farmers and services.",
          "Against: the grant has an opportunity cost (health, education, roads).",
          "Against: mills may be unable to compete with established foreign producers.",
          "Against: power, skills and finance problems may raise costs whatever the grant.",
          "Considers conditions: time-limited, linked to performance, with improvements to power supply.",
          "Justified conclusion.",
        ],
        hints: ["Compare the benefits with the cost and the chance of success."],
        modelAnswer: "The grant could help firms start spinning and weaving, creating jobs, raising export earnings and building skills, with more business for cotton farmers and transporters. However, the money has an opportunity cost, such as spending on health or roads, and the mills may still be unable to compete with established foreign producers if electricity is unreliable and skills are scarce. The grant is justified if it is temporary, linked to output and exports, and accompanied by better power supply, because then the industry can become competitive and the long-term gains outweigh the cost.",
      }),
    ],
    explanation: "(a) Secondary. (b) Jobs and export earnings. (c) Benefits of value addition against the opportunity cost and the risk of failure.",
    hints: ["Use the idea of value addition."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "In a fictional town, a dairy farm sells milk to a processing plant that makes yoghurt and cheese. A delivery company carries the products to supermarkets.",
    parts: [
      P.match({
        label: "(a)", marks: 3,
        stem: "Match each firm with its sector.",
        pairs: [["Dairy farm", "Primary"], ["Processing plant", "Secondary"], ["Delivery company", "Tertiary"]],
        explanation: "Farm: primary; processing: secondary; delivery: tertiary.",
      }),
      P.manual({ label: "(b)", marks: 5, stem: "Analyse how a disease that reduces the dairy farm's milk output would affect the other firms.", points: ["Less milk is supplied to the processing plant.", "So the plant produces less yoghurt and cheese / may cut shifts or workers.", "Its costs per unit may rise / it may have to buy milk from further away at a higher price.", "The delivery company has fewer loads to carry, reducing its revenue.", "Shows interdependence: a shock at the primary stage spreads to the secondary and tertiary stages."], modelAnswer: "With less milk, the processing plant has less raw material, so it makes less yoghurt and cheese and may cut shifts. It may have to buy milk from more distant farms at a higher price, raising its costs. The delivery company then has fewer loads to carry, so its revenue falls. This shows interdependence: a problem at the primary stage spreads to the secondary and tertiary stages." }),
    ],
    explanation: "(a) Primary, secondary, tertiary. (b) The fall in milk spreads to processing and delivery.",
    hints: ["Follow the milk along the chain."],
  });

  b.card("DEFINITION", "Primary production", "Extracting or growing natural resources: farming, fishing, forestry, mining.");
  b.card("DEFINITION", "Secondary production", "Turning raw materials into goods: manufacturing, processing, construction, electricity generation.");
  b.card("DEFINITION", "Tertiary production", "Providing services: commercial services (transport, banking, insurance, retail) and direct services (teaching, health).");
  b.card("FORMULA", "Value added", "Value of output sold − cost of inputs bought from other firms. Total value added along a chain = final price.");
  b.card("CONCEPT", "Why value addition matters to Zimbabwe", "More jobs, higher export earnings and foreign currency, skills, and less dependence on raw-material prices.");
  b.card("CONCEPT", "Interdependence of the stages", "Secondary needs primary raw materials; primary needs secondary equipment; both need tertiary services to finance, move and sell output.");
  b.card("DEFINITION", "Direct production", "Producing goods for one's own use, without exchange (for example subsistence farming).", null, { applies: ZIM });
  b.card("DEFINITION", "Indirect production", "Producing goods or services for sale or exchange and using the income to buy other goods.", null, { applies: ZIM });
  b.card("FACT", "Which sector is construction in?", "Secondary: it turns materials into a finished product.");
});
