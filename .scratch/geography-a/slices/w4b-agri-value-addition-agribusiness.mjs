// W4b: agri.value-addition-agribusiness (ZIMSEC only). All money values are illustrative.
// Computed: groundnuts 1 000 kg x 1.20 = 1 200; butter 900 x 3.60 = 3 240; value added 2 040; profit 940; price rise per kg 200%;
// cotton 2 ha x 1 200 kg x 0.45 = 1 080, inputs 400, net 680 (37.0% deducted); tomato sauce: 150, 600, 450, 160, 290.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const rawCost = chk(1000 * 1.2, 1200, 1e-9);
const sales = chk(900 * 3.6, 3240, 1e-9);
const va = chk(sales - rawCost, 2040, 1e-9);
const profit = chk(va - 1100, 940, 1e-9);
const pricePct = chk(((3.6 - 1.2) / 1.2) * 100, 200, 1e-9);
const gross = chk(2 * 1200 * 0.45, 1080, 1e-9);
const ded = chk(2 * 200, 400, 1e-9);
const net = chk(gross - ded, 680, 1e-9);
const dedPct = rnd((ded / gross) * 100, 1, 37.0, "dedPct");
const tomCost = chk(500 * 0.3, 150, 1e-9);
const sauceSales = chk(400 * 1.5, 600, 1e-9);
const sauceVA = chk(sauceSales - tomCost, 450, 1e-9);
const procCost = chk(400 * 0.4, 160, 1e-9);
const sauceProfit = chk(sauceVA - procCost, 290, 1e-9);
const CT = tbl(["Item", "Value"], [["Area under contract", "2 ha"], ["Yield of seed cotton", "1 200 kg per hectare"], ["Price paid by the company", "US\\$0.45 per kg"], ["Inputs supplied on credit", "US\\$200 per hectare"]]);

concept("ageo.agri.value-addition-agribusiness", { file: "agri/value-addition-agribusiness", keyPrefix: "agri.value-addition-agribusiness" }, (b) => {
  mc(b, 1, "RECALL", "What is meant by value addition in agriculture?", [
    ["Increasing the value of a farm product by processing or presenting it better", "Correct: processing, packaging and branding raise the selling price."],
    ["Growing more tonnes of the same crop on the same area of land each year", "That is an increase in output or yield."],
    ["Buying more land so that the farm can grow in size", "That is farm expansion."],
    ["Selling all produce straight after harvest to get cash", "That does not change the product."],
  ], "**Value addition** raises the value of each unit through processing, packaging or branding.");
  mc(b, 2, "RECALL", "Which is an example of value addition to milk?", [
    ["Turning it into cheese and yoghurt", "Correct: processing makes a more valuable product."],
    ["Selling it at the farm gate in open buckets", "No processing or presentation."],
    ["Feeding it to calves on the same farm", "This is an input to the farm, not value addition."],
    ["Pouring surplus milk away in the rainy season", "This is waste."],
  ], "Processing milk into cheese and yoghurt is **value addition**.");
  mc(b, 2, "UNDERSTANDING", "What is a benefit of contract farming to a smallholder?", [
    ["A guaranteed buyer and access to inputs on credit", "Correct: the company agrees to buy and often supplies inputs."],
    ["The price is always higher than on the open market", "The fixed price can be lower."],
    ["There are no deductions at harvest time", "Input costs are normally deducted."],
    ["The farmer may sell to any buyer without conflict", "Selling outside the contract can cause disputes."],
  ], "Contract farming gives a **market and inputs**, with some risk.");
  mc(b, 3, "APPLICATION", "A cooperative packs and labels dried mango under its own brand. Which benefit is most directly linked to branding?", [
    ["Buyers trust the product and may pay a higher price", "Correct: a brand builds trust and recognition."],
    ["The mangoes grow faster on the trees", "Branding does not change growing."],
    ["The cost of drying equipment and packaging falls to zero for the group", "Branding does not remove costs."],
    ["The need for hygiene standards disappears", "Standards still apply."],
  ], "A brand helps buyers **recognise and trust** a product.", { hints: ["Think about why shoppers choose one jar over another."] });
  mc(b, 3, "ANALYSIS", "Which is the most serious constraint on a village group that wants to start processing fruit into juice?", [
    ["Lack of capital, clean water and a regular market", "Correct: processing needs money, hygiene and buyers."],
    ["Too many consumers who want fruit juice", "Strong demand is an advantage."],
    ["Fruit that is too cheap to be worth buying", "Cheap fruit lowers input cost."],
    ["Fruit trees that produce flowers before they fruit", "Normal tree biology is not a business constraint."],
  ], "Capital, water, standards and markets are the main **constraints**.", { hints: ["List what a small processing business needs before it can sell."] });
  mc(b, 4, "EVALUATION", "A processor makes US\\$2 040 of value added but US\\$1 100 of processing costs. Which conclusion is best supported?", [
    ["The business makes a profit of US\\$940 before other overheads", "Correct: 2 040 − 1 100 = 940."],
    ["The business makes a loss because costs are large", "Value added exceeds costs."],
    ["The business must be earning US\\$3 140 profit", "That adds the two figures instead of subtracting."],
    ["Nothing can be said without knowing the number of customers served", "Profit follows from the figures given."],
  ], "Profit = value added − processing costs = **US\\$940**.", { hints: ["Subtract the processing cost from the value added."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Agribusiness includes input suppliers, processors and retailers as well as farmers.", answer: true,
    feedbackTrue: "Correct: it covers the whole chain from inputs to the consumer.",
    feedbackFalse: "Not so: agribusiness is the whole chain, not only farming.",
    explanation: "Agribusiness includes every business in the chain from farm inputs to the consumer." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In contract farming the farmer always receives the full sale value with no deductions.", answer: false,
    feedbackFalse: "Correct: the cost of inputs supplied on credit is usually deducted.",
    feedbackTrue: "Not so: deductions for inputs are common.",
    explanation: "Companies usually deduct the cost of inputs supplied on credit." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Separating produce by size and quality is called {{blank:a}}. A name and logo that identify a product is its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["grading"], choices: ["grading", "ginning", "grafting"] },
      { id: "b", accepted: ["brand"], choices: ["brand", "yield", "quota"] },
    ], explanation: "**Grading** sorts produce; a **brand** identifies it." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each raw product to a value-added product.",
    pairs: [
      ["Groundnuts", "Peanut butter"],
      ["Tomatoes", "Sauce or paste"],
      ["Seed cotton", "Lint, yarn and cloth"],
      ["Milk", "Cheese and yoghurt"],
    ], explanation: "Each raw product can be processed into a more valuable one." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "A processor sells 900 kg of peanut butter at US\\$3.60 per kg. The groundnuts used cost US\\$1 200. Calculate the value added, in US\\$.",
    hints: ["Value added = sales − cost of raw materials."],
    value: va, wrong: [3240, 4440],
    explanation: "Sales = 900 × 3.60 = 3 240. Value added = 3 240 − 1 200 = **US\\$2 040**. The value 3 240 is the sales only." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Raw groundnuts cost US\\$1.20 per kg and peanut butter sells for US\\$3.60 per kg. Calculate the percentage increase in price per kg after processing.",
    hints: ["Change ÷ original × 100."],
    value: pricePct, wrong: [66.7, 300],
    explanation: "(3.60 − 1.20) ÷ 1.20 × 100 = **200%**. The value 66.7 divides by the new price." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "A farmer grows 2 ha of cotton under contract and obtains 1 200 kg of seed cotton per hectare. The company pays US\\$0.45 per kg and deducts US\\$200 per hectare for inputs supplied. Calculate the net payment, in US\\$.",
    hints: ["Find the gross payment first.", "Deduct the inputs for 2 ha."],
    value: net, wrong: [1080, 880],
    explanation: "1. Output = 2 × 1 200 = 2 400 kg.\n2. Gross payment = 2 400 × 0.45 = US\\$1 080.\n3. Deductions = 2 × 200 = US\\$400.\n4. Net = 1 080 − 400 = **US\\$680**. The value 880 deducts the inputs for 1 ha only." });
  b.short({ d: 1, skill: "RECALL", stem: "What term describes a farmer growing a crop for a buyer who agrees in advance to purchase it?",
    accepted: ["contract farming", "contract growing", "out-grower scheme", "outgrower scheme", "contract farming scheme"], wrong: ["ranching"],
    explanation: "**Contract farming**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name one annual exhibition in Zimbabwe at which farmers and agribusinesses can display products and meet buyers.",
    accepted: ["Zimbabwe International Trade Fair", "ZITF", "Harare Agricultural Show", "Harare Show", "Bulawayo Trade Fair", "agricultural show", "Mashonaland Show", "Zimbabwe Agricultural Show"], wrong: ["Kimberley Process"],
    explanation: "For example the **Zimbabwe International Trade Fair** (Bulawayo) or the **Harare Agricultural Show**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe four forms of value addition in agriculture.",
    hints: ["Think of processing, grading, packaging and branding."],
    points: [
      "Processing raw produce into another product, such as tomatoes into sauce.",
      "Grading and sorting by size and quality.",
      "Packaging to protect and preserve produce and to sell it in convenient sizes.",
      "Branding and labelling to build recognition and trust.",
    ],
    modelAnswer: "Processing raw produce into another product, for example tomatoes into sauce, grading and sorting by size and quality, packaging to protect produce and sell it in convenient sizes, and branding and labelling to build recognition and trust.",
    explanation: "Name each form and give an example." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two benefits and two risks of contract farming for a smallholder.",
    hints: ["Think about market, inputs, price and the buyer."],
    points: [
      "Benefit: a guaranteed buyer reduces the risk of not selling the crop.",
      "Benefit: inputs and advice supplied on credit help a farmer who cannot afford them.",
      "Risk: the price is fixed in advance and may be lower than the market price.",
      "Risk: deductions for inputs and dependence on one buyer can leave the farmer with little income.",
    ],
    modelAnswer: "A guaranteed buyer reduces the risk of not selling the crop, and inputs and advice on credit help a farmer who cannot afford them. However, the price is fixed in advance and may be lower than the market price, and deductions for inputs and dependence on one buyer can leave the farmer with little income.",
    explanation: "Two benefits and two risks, each explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why smallholders find it difficult to add value to their produce.",
    hints: ["Think of capital, power, standards and markets."],
    points: [
      "Lack of money to buy processing equipment, packaging and premises.",
      "Unreliable electricity and water supply for processing.",
      "Difficulty in meeting health, quality and export standards and certification.",
      "Weak marketing skills, poor roads and storage, and competition from established brands.",
    ],
    modelAnswer: "They lack money for processing equipment, packaging and premises, and electricity and water supplies are unreliable. It is difficult to meet health, quality and export standards, and marketing skills are weak, roads and storage are poor, and established brands provide competition.",
    explanation: "Capital, utilities, standards and market access." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A women's group in a rural district buys 500 kg of tomatoes at US\\$0.30 per kg and makes 400 bottles of sauce. Each bottle sells for US\\$1.50, and the bottle, label and energy cost US\\$0.40 per bottle (illustrative data).",
    hints: ["Value added = sales − cost of raw materials.", "Profit = value added − processing costs."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the value added by processing, in US\\$.", value: sauceVA, unit: "US$", wrong: [600, 150],
        explanation: "Sales = 400 × 1.50 = 600. Cost of tomatoes = 500 × 0.30 = 150. Value added = 600 − 150 = US\\$450." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the profit after processing costs, in US\\$.", value: sauceProfit, unit: "US$", wrong: [450, 160],
        explanation: "Processing costs = 400 × 0.40 = 160. Profit = 450 − 160 = US\\$290." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways in which the group could raise its profit.",
        points: [
          "Reduce losses and costs, for example by bulk buying bottles or using solar drying and cheaper energy.",
          "Raise the price or sell more through branding, labelling and new markets such as shops and shows.",
        ],
        modelAnswer: "Reduce costs by buying bottles in bulk and using cheaper energy, and raise income through branding and new markets such as shops and shows.",
        explanation: "Cut costs or raise revenue." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how branding can help the group to sell its sauce.",
        points: [
          "A recognisable name and label builds trust in quality and hygiene.",
          "Repeat customers and shops can find the product, which supports a higher and more stable price.",
        ],
        modelAnswer: "A recognisable name and label builds trust in quality and hygiene, so customers buy again and shops can find the product, which supports a stable price.",
        explanation: "Branding builds trust and repeat sales." }),
    ], explanation: "Calculate value added and profit for a small processor and suggest improvements." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A smallholder grows cotton under a contract with a buying company (illustrative data).\n\n${CT}`,
    hints: ["Gross payment = output × price.", "Include the benefits and the risks in your assessment."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the farmer's net payment after the input deduction, in US\\$.", value: net, unit: "US$", wrong: [1080, 880],
        explanation: "Gross = 2 × 1 200 × 0.45 = 1 080; deductions = 2 × 200 = 400; net = US\\$680." }),
      P.num({ label: "(b)", marks: 2, stem: "Express the deduction as a percentage of the gross payment, to 1 decimal place.", value: dedPct, dp: 1, unit: "%", wrong: [58.8, 400],
        explanation: "400 ÷ 1 080 × 100 = 37.0%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why many smallholders accept contracts even when deductions are large.",
        points: [
          "They have no cash to buy seed, fertiliser and chemicals, so credit for inputs is the only way to grow the crop.",
          "A guaranteed buyer removes the risk of having no market or being paid late.",
          "They receive advice on growing the crop, which raises yield.",
        ],
        modelAnswer: "They have no cash for seed, fertiliser and chemicals, so credit for inputs is the only way to grow the crop. A guaranteed buyer removes the risk of having no market, and the company gives advice on growing the crop.",
        explanation: "Credit, market and advice outweigh deductions for many farmers." }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Assess the benefits and risks of contract farming for smallholders in Zimbabwe.",
        points: [
          "Benefit: guaranteed market and a known buyer.",
          "Benefit: inputs and technical advice supplied on credit.",
          "Risk: fixed price may be below the market price in a good year.",
          "Risk: deductions and weak farmers' bargaining power may leave little income.",
          "Judgement: contracts widen access to inputs and markets, but they work best with fair terms, clear records and the freedom to compare buyers.",
        ],
        wordLimit: { max: 180 },
        modelAnswer: "Contracts give a guaranteed market and a known buyer, and inputs and advice on credit. However, the fixed price may be below the market price in a good year, and deductions and weak bargaining power may leave the farmer little income. I conclude that contracts widen access to inputs and markets, but they work best with fair terms, clear records and the freedom to compare buyers.",
        explanation: "Weigh benefits and risks and judge." }),
    ], explanation: "Calculate payments and assess contract farming." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the importance of value addition to the development of agribusiness in Zimbabwe.",
    hints: ["Give benefits to farmers, processors and the economy, then constraints.", "Reach a judgement."],
    points: [
      "Processing raises the value of each unit of produce, so farmers and firms earn more from the same harvest.",
      "Processing, packing and marketing create jobs in rural areas and towns.",
      "Preserved and packaged products reduce post-harvest losses and last through the year.",
      "Processed exports earn more foreign currency than raw produce.",
      "Branding and standards open supermarket and export markets.",
      "Constraints include lack of capital, unreliable power and water, and weak roads and storage.",
      "Competition from imported goods and established brands, and the cost of meeting standards, limit small firms.",
      "Judgement: value addition is important for growth, but depends on power, finance, skills and markets being in place.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Processing raises the value of each unit of produce, so farmers and firms earn more from the same harvest, and processing, packing and marketing create jobs in rural areas and towns. Preserving and packaging products reduces post-harvest losses, and processed exports earn more foreign currency than raw produce. Branding and standards open supermarket and export markets. However, small firms face a lack of capital, unreliable power and water, weak roads and storage, competition from imports and established brands, and the cost of meeting standards. I conclude that value addition is important for growth, but depends on power, finance, skills and markets being in place.",
    wordLimit: { max: 300 }, explanation: "Weigh benefits against constraints and judge." });

  b.card("DEFINITION", "Agribusiness", "All businesses in the chain from farm inputs to the consumer: input supply, farming, processing, marketing and retail.");
  b.card("DEFINITION", "Value addition", "Raising the value of a farm product by processing, grading, packaging or branding so that it sells for more.");
  b.card("FORMULA", "Value added", "Value added = sales − cost of raw materials. Profit = value added − processing costs.");
  b.card("CONCEPT", "Contract farming", "A buyer agrees in advance to purchase the crop, often supplying inputs on credit that are deducted at harvest.");
  b.card("CONCEPT", "Benefits of contract farming", "Guaranteed market, inputs on credit, technical advice and less price risk.");
  b.card("CONCEPT", "Risks of contract farming", "Low fixed prices, deductions, dependence on one buyer and side-selling disputes.");
  b.card("FACT", "Examples of value addition", "Groundnuts to peanut butter, tomatoes to sauce, maize to mealie meal, milk to cheese and yoghurt, cotton to lint and cloth.");
  b.card("FACT", "Exhibitions in Zimbabwe", "The Zimbabwe International Trade Fair in Bulawayo and agricultural shows let producers display products and meet buyers.");
  b.card("CONCEPT", "Constraints on value addition", "Capital, electricity and water, standards, roads and storage, marketing skills and competition.");
});
