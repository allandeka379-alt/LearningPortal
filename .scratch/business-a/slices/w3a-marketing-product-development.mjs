// W3a: marketing.product-development
import { concept, P, ZIM, table, r2, invest, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.product-development", { file: "marketing/product-development", keyPrefix: "marketing.product-development" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following describes **research and development (R&D)**?",
    ok: ["Technical work to invent or improve the firm's products", "Correct: R&D creates and improves products and methods."],
    bad: [["Collecting views from customers on the existing price", "That is market research."], ["Training sales staff to speak to customers politely", "That is training, not R&D."], ["Advertising the products on the radio and in newspapers", "That is promotion."]],
    explanation: "R&D is the scientific and technical work behind new products and processes.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which stage of product development comes immediately after **idea generation**?",
    ok: ["Screening of the ideas", "Correct: weak ideas are removed before money is spent."],
    bad: [["Launch of the product", "Launch comes near the end."], ["Review of sales results", "Review is the last stage."], ["Testing the product with customers", "Testing follows development."]],
    explanation: "The order is idea generation, screening, development, testing, launch and review.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of **screening** new product ideas?",
    ok: ["To drop weak ideas before costly development starts", "Correct: this saves the money that development and testing would cost."],
    bad: [["To launch every idea quickly before the rivals do", "Screening reduces the number of ideas."], ["To patent each idea before it has been tested at all", "A patent is not the aim of screening."], ["To increase the cost of the average product", "Screening aims to cut waste."]],
    explanation: "Screening removes weak ideas early, because development and testing are expensive.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a **source** of new product ideas from within a business?",
    ok: ["Suggestions from sales staff who hear views", "Correct: employees are an internal source of ideas."],
    bad: [["Complaints printed in a national newspaper column", "This is an external source."], ["A rival's new product on sale in the local shops", "This is an external source."], ["An advertisement from a supplier of new materials", "This is an external source."]],
    explanation: "Employees are an internal source; customers, competitors and suppliers are external.",
  });
  const cost = 40000, flow = 16000;
  const pb = invest.payback(cost, [flow, flow, flow, flow, flow]);
  chk(pb, 2.5, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional furniture firm in Gweru spends US\\$24,000 on developing and launching a new chair. It expects a net cash inflow of US\\$9,600 a year. What is the payback period, assuming the inflow arises evenly through each year?",
    ok: ["2.5 years", "Correct: 24,000 ÷ 9,600 = 2.5 years."],
    bad: [["0.4 years", "This divides the inflow by the cost."], ["3.6 years", "This adds the inflow to the cost before dividing."], ["5 years", "This is the life of the product, not the payback."]],
    hints: ["Payback = cost ÷ annual net inflow."],
    explanation: "24,000 ÷ 9,600 = 2.5 years, which is 2 years and 6 months.",
  });
  chk(24000 / 9600, 2.5, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional tuck-shop owner in Mutare invents a sweet with a new recipe but cannot afford a patent. Which risk is MOST likely?",
    ok: ["A larger firm may copy the recipe and sell it more cheaply", "Correct: without protection the idea can be imitated."],
    bad: [["The recipe will be protected for twenty years automatically", "Protection needs a patent."], ["Customers will refuse to buy any new sweet from her", "There is no evidence of this."], ["The recipe will lose its value because it is too cheap", "The cost of the recipe is not the issue."]],
    hints: ["What does a patent prevent?"],
    explanation: "Without a patent, competitors may copy an unprotected invention.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why do most products that reach the **launch** stage still carry a risk of failure?",
    ok: ["Testing cannot fully predict how all customers behave", "Correct: customers' actual behaviour may differ from the test."],
    bad: [["Testing proves that every product will sell very well", "Testing reduces risk, not removes it."], ["Launch is always done before any tests are ever made", "Testing comes before launch."], ["All customers refuse to buy any new product at all", "Customers do buy new products."]],
    hints: ["What are the limits of a test?"],
    explanation: "Tests use small samples and cannot fully predict the behaviour of the whole market or the reaction of competitors.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional small bakery has US\\$8,000 of spare cash. A consultant says it should spend all of it on R&D for a new type of bread. Which statement is the BEST evaluation?",
    ok: ["The risk is high for a small firm, so a cheap trial is wiser", "Correct: the firm is small and the result is uncertain."],
    bad: [["R&D always gives a firm a large profit within a year or two", "R&D is uncertain and slow."], ["R&D is useless for any bakery and never helps it at all", "R&D can help, but scale and risk matter."], ["The spare cash has no other use that the firm could ever try", "Cash has other uses (an opportunity cost)."]],
    hints: ["Think about the size of the firm and the uncertainty of results."],
    explanation: "A small firm could lose all its spare cash, so low-cost testing of ideas is a more cautious approach.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Employees can be a source of ideas for new products.",
    answer: true,
    explanation: "True. Sales and production staff often see problems and opportunities that managers do not.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A patent stops competitors from making any similar product.",
    answer: false,
    explanation: "False. A patent protects a specific invention for a limited time, but competitors may develop a different way to do the same job.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of product development to what happens in it.",
    pairs: [["Idea generation", "Collecting suggestions from many sources"], ["Screening", "Rejecting ideas that are unsuitable or too costly"], ["Development", "Designing the product and making a prototype"], ["Testing", "Trying the product with customers and for quality"]],
    explanation: "Each stage has a different job in reducing risk and cost.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} gives the owner of an invention the legal right to stop others using it for a limited period, and a {{blank:b}} is the first working model of a product.",
    blanks: [
      { id: "a", accepted: ["patent"], choices: ["patent", "prototype", "brand"] },
      { id: "b", accepted: ["prototype"], choices: ["patent", "prototype", "brand"] },
    ],
    explanation: "A patent protects an invention; a prototype is a first working model.",
  });

  const ideas = 150, launched = 6;
  const pctLaunch = (launched / ideas) * 100;
  chk(pctLaunch, 4, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: pctLaunch, calculator: true, daily: true, wrong: [25, r2(ideas / launched)],
    stem: "A fictional cosmetics firm in Bulawayo generates 150 new product ideas in a year. Six are launched. What percentage of ideas reached the launch stage? Give the answer to one decimal place.",
    hints: ["Launched ÷ ideas × 100."],
    explanation: "6 ÷ 150 × 100 = 4.0%. Inverting the fraction gives 25.",
  });
  const rdCost = 90000, lasting = 3;
  const perLasting = rdCost / lasting;
  chk(perLasting, 30000, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: perLasting, calculator: true, wrong: [rdCost, rdCost / 6],
    stem: "The cosmetics firm spends US\\$90,000 a year on developing new products. Six are launched, but only three are still selling after two years. Calculate the development cost for each lasting product.",
    hints: ["Divide by the number of products that last, not the number launched."],
    explanation: "90,000 ÷ 3 = US\\$30,000 per lasting product. Dividing by the six launched gives US\\$15,000, which ignores the failures.",
  });
  const out = 52000, flows = [13000, 13000, 13000, 13000, 13000, 13000];
  const pbk = invest.payback(out, flows);
  chk(pbk, 4, 1e-9);
  const net = flows.reduce((s, x) => s + x, 0) - out;
  chk(net, 26000, 1e-9);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: net, calculator: true, wrong: [flows.reduce((s, x) => s + x, 0), out],
    stem: "A fictional mining-supplies firm in Kadoma spends US\\$52,000 on developing and launching a safety helmet. It expects net cash inflows of US\\$13,000 a year for six years, and nothing after that. Calculate the total net gain over the six years (total inflows minus the cost).",
    hints: ["Total inflows = 13,000 × 6."],
    explanation: "Total inflows = 13,000 × 6 = US\\$78,000. Net gain = 78,000 − 52,000 = US\\$26,000. (Payback is 4 years.) US\\$78,000 is the inflow before taking away the cost.",
    workedSolution: "1. Total inflows = 13,000 × 6 = US\\$78,000.\n2. Net gain = 78,000 − 52,000 = US\\$26,000.\n3. Payback = 52,000 ÷ 13,000 = 4 years.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the legal right that protects an invention from being copied for a limited period.",
    accepted: ["patent", "a patent", "patents"],
    explanation: "A patent.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** reason why a business should develop new products.",
    points: ["Existing products will reach the decline stage", "New products replace falling sales", "So the business can keep revenue and avoid depending on one product"],
    modelAnswer: "Existing products will eventually reach the decline stage and their sales will fall. New products replace this lost revenue, so the business does not depend on a single product.",
    hints: ["Think about the life of a product."],
    explanation: "A reason developed to its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional dairy in Gweru wants ideas for a new type of yoghurt. Explain **two** sources of ideas it could use.",
    points: ["Customer surveys or comments", "Application: customers may ask for lower-sugar or larger packs", "Employees, especially sales staff", "Application: delivery drivers hear shop owners' requests"],
    modelAnswer: "The dairy could survey its customers, who may ask for a lower-sugar yoghurt or larger packs. It could also ask its employees: delivery drivers hear shop owners' requests every day and can pass on ideas.",
    hints: ["Choose two different sources and link each to yoghurt."],
    explanation: "Two sources, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why testing a product before launch can reduce the risk of failure.",
    points: ["Testing shows how real customers react", "Faults in design or safety can be found and corrected", "The firm can adjust price or promotion", "So the firm avoids spending on a full launch of a product that may not sell"],
    modelAnswer: "Testing shows how real customers react and finds faults in design or safety that can be corrected. The firm can also adjust the price or promotion before launch, so it avoids spending a large sum on launching a product that will not sell.",
    hints: ["Link what testing finds to the cost of a full launch."],
    explanation: "A chain from testing to reduced risk.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional farm-equipment maker in Chinhoyi is considering spending a third of its profit each year on R&D. Evaluate this decision.",
    points: ["R&D can produce unique products that sell at higher prices", "Patents could protect the products for a time", "Over time R&D can lower costs through better processes", "It is costly and uncertain; results may take years and may fail", "Less profit is available to pay owners or invest elsewhere", "Judgement with reason, e.g. worthwhile if competitors are innovating and cash is sufficient"],
    modelAnswer: "R&D can produce unique products that sell at higher prices and can lower costs through better processes, and patents could protect them for a time. However, it is costly and uncertain, results may take years, and a third of profit reduces what is available for owners or other investment. It is worthwhile if competitors are innovating and the firm has enough cash to survive a failure; otherwise a smaller budget is wiser.",
    hints: ["Weigh the long-term benefit against the cost and risk."],
    explanation: "A balanced evaluation with a condition.",
  });

  const out2 = 60000;
  const inflows = [15000, 20000, 20000, 20000];
  const pb2 = invest.payback(out2, inflows);
  const years = pb2;
  chk(years, 3.25, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional software start-up in Harare spends US\\$60,000 on developing a payroll app. The expected net cash inflows are:\n\n" + table(["Year", "Net cash inflow (US\\$)"], inflows.map((v, i) => [`Year ${i + 1}`, v])),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "years", value: pb2, stem: "Calculate the payback period in years (assume the inflow arises evenly within each year).", wrong: [4, 3], explanation: "After year 1: 60,000 − 15,000 = 45,000 left; after year 2: 25,000 left; after year 3: 5,000 left. Year 4 inflow is 20,000, so 5,000 ÷ 20,000 = 0.25. Payback = 3.25 years." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: inflows.reduce((s, x) => s + x, 0) - out2, stem: "Calculate the total net gain over four years (total inflows minus the development cost).", wrong: [75000, 60000], explanation: "Total inflows = 15,000 + 20,000 + 20,000 + 20,000 = US\\$75,000. Net gain = 75,000 − 60,000 = US\\$15,000." }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** risks of developing the app.", points: ["Customers may not buy it, so the inflows would be lower than forecast", "A competitor may launch a similar or better app"], modelAnswer: "Customers may not buy it, so the inflows would be lower than forecast, and a competitor may launch a similar or better app.", explanation: "Two risks of a new product." }),
    ],
    hints: ["Subtract each year's inflow from the cost until it is repaid."],
    explanation: "Payback 3.25 years; net gain US\\$15,000; the forecasts and competitors create risk.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Dube Seeds is a fictional company in Gweru that has sold the same maize seed for eight years. Sales have fallen by 10% a year as rivals offer drought-resistant seed. The managing director proposes to spend US\\$120,000 on R&D to develop its own drought-resistant seed, which would take about three years. The finance director says the firm could instead buy the right to sell a rival's seed under licence.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** benefit to Dube Seeds of developing its own seed.", points: ["The firm would own a unique product", "It could patent or protect the new seed", "So it could charge a higher price and avoid paying licence fees"], modelAnswer: "The firm would own a unique drought-resistant seed which it could protect, so it could charge a higher price and avoid paying licence fees to a rival.", explanation: "A benefit of R&D." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess whether Dube Seeds should carry out the R&D or buy the licence.", points: ["R&D gives ownership and potentially higher long-term profit", "R&D costs US\\$120,000 and takes three years, while sales fall", "The result is uncertain and may fail", "A licence gives a product sooner and with less risk", "But the licence costs fees and depends on the rival", "Judgement with reason, e.g. licence now, R&D later if cash allows"], modelAnswer: "Developing its own seed would give Dube Seeds a product it owns and could protect, with higher long-term profit. But it costs US\\$120,000, takes three years while sales keep falling, and might fail. A licence brings a product sooner with less risk, though fees reduce profit and the firm depends on a rival. Dube Seeds should probably take the licence now to stop the fall in sales and start R&D later if it has the cash.", explanation: "Own product against speed and risk." }),
    ],
    hints: ["Compare the time, cost and certainty of each option."],
    explanation: "R&D gives ownership but is slow, costly and risky; a licence is quick but dependent on a rival.",
  });

  b.card("DEFINITION", "Research and development (R&D)", "Scientific and technical work to invent or improve products and processes.");
  b.card("FACT", "Stages of product development", "Idea generation, screening, development, testing, launch and review.");
  b.card("FACT", "Sources of new product ideas", "Customers, employees, competitors, market research, R&D and suppliers.");
  b.card("DEFINITION", "Patent", "A legal right that stops others making, using or selling an invention for a limited period.");
  b.card("CONCEPT", "Benefits of R&D", "Unique products, higher prices and profits, patent protection and lower unit costs.");
  b.card("CONCEPT", "Costs and risks of R&D", "High cost, uncertain and slow results, copying by rivals and an opportunity cost.");
  b.card("CONCEPT", "Purpose of screening", "Remove weak ideas early, before the costly stages of development and testing.");
  b.card("CONCEPT", "Why firms develop new products", "Replace ageing products, keep up with rivals, spread risk, use spare capacity and grow.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Prototype", "A first working model of a product, made to test the design before production.");
});
