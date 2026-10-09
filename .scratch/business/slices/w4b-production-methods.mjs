// W4b: methods of production (CAM 4.1.2): job, batch, flow.
import { concept, P, money, fmt, round, table, f } from "../lib.mjs";

concept("bus.operations.production-methods", { file: "operations/production-methods", keyPrefix: "operations.production-methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **job production**?",
    options: [
      ["Making single products to meet each customer's own needs", "Correct: each job is different."],
      ["Making identical products continuously on a production line", "That describes flow production."],
      ["Making a limited quantity of one product, then switching", "That describes batch production."],
      ["Buying finished goods and reselling them to customers", "That is trading, not production."],
    ],
    answer: "A",
    explanation: "Job production makes one-off items to individual requirements.",
  });
  b.mcq({
    d: 1, skill: "RECALL", daily: false,
    stem: "Which product is **most** likely to be made by flow production?",
    options: [
      ["Bottled soft drinks", "Correct: a standardised product in very large quantities."],
      ["A made-to-measure wedding dress", "Made to one customer's measurements: job production."],
      ["A carved wooden door for one house", "A one-off item: job production."],
      ["Three types of cake in a small bakery", "Small quantities of several products: batch production."],
    ],
    answer: "A",
    explanation: "Flow production suits standardised products with high, steady demand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A clothing factory makes 600 school shirts in size 30, then resets its machines to make 600 in size 32. Which method is this?",
    options: [
      ["Batch production", "Correct: a limited quantity of one product, then a change."],
      ["Job production", "Job production makes individual items to order."],
      ["Flow production", "Flow production makes one product continuously without stopping."],
      ["Division of labour", "This is specialisation of workers, not a production method."],
    ],
    answer: "A",
    explanation: "Making a batch and then switching to another product is batch production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of flow production?",
    options: [
      ["A breakdown at one stage can stop the whole line", "Correct: each stage depends on the one before."],
      ["The cost per unit is higher than in job production", "Flow has the lowest cost per unit."],
      ["Each product can be changed to suit one customer", "Flow products are standardised; this is not a disadvantage of flow."],
      ["Raw materials cannot be bought in bulk", "Flow production buys in bulk."],
    ],
    answer: "A",
    explanation: "Flow production lines are interdependent; one fault halts everything.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of job production?",
    options: [
      ["Varied, skilled work often motivates the workers", "Correct: each job is different and challenging."],
      ["It has the lowest cost per unit of any method", "Job production has the highest cost per unit."],
      ["It produces very large quantities of goods quickly", "Job production is slow."],
      ["It needs no skilled or experienced workers at all", "Job production usually needs highly skilled workers."],
    ],
    answer: "A",
    explanation: "Job production gives unique products, high prices and varied work, but at high cost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does batch production often lead to higher inventory costs than flow production?",
    options: [
      ["Finished goods and materials are stored between batches", "Correct: stock is held until the next batch or sale."],
      ["Batch production uses no machinery at all", "Batch production uses machines that can be reset."],
      ["Each batch is made for a single named customer", "That would be job production."],
      ["Batch production makes only one product forever", "Batch production switches between products."],
    ],
    answer: "A",
    explanation: "Each product is made only some of the time, so stocks must be held to meet demand in between.",
    hints: ["What happens to demand for a product while a different batch is being made?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION", daily: true,
    stem: "A new business makes steel security gates to fit each customer's doorway. Which method should it use?",
    options: [
      ["Job production", "Correct: every gate is made to different measurements."],
      ["Flow production", "Flow production needs a standardised product and high demand."],
      ["Batch production", "Each gate is different, so identical batches are not possible."],
      ["Mass production", "Mass production is another name for flow, unsuitable here."],
    ],
    answer: "A",
    explanation: "Made-to-measure items with small demand suit job production.",
    hints: ["Are the gates identical?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A soap maker plans to change from batch to flow production. Which condition is **most** important for this to succeed?",
    options: [
      ["High and steady demand for one standard type of soap", "Correct: a line must run continuously to cover its cost."],
      ["Customers wanting soap made to their own recipe", "That would suit job production."],
      ["A shortage of money to spend on new machinery", "Flow production needs a lot of capital."],
      ["Frequent changes in the shape and colour of soap", "Flow production suits standardised products."],
    ],
    answer: "A",
    explanation: "Flow production's high set-up cost is only covered by large, continuous sales.",
    hints: ["What does a production line need in order to keep running?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Flow production usually has the lowest cost per unit of the three methods.",
    answer: true,
    explanation: "True. Specialist machines, bulk buying and huge output spread costs thinly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A large business can only use one method of production.",
    answer: false,
    explanation: "False. Many businesses use flow for best-sellers and batch or job for other products.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each product with the method most likely used to make it.",
    right: ["Job production", "Batch production", "Flow production"],
    pairs: ["A website designed for one client", "Bread rolls and cakes in a local bakery", "Maize meal in a large mill", "A portrait painted to order", "Cement in a large factory", "Furniture made 50 chairs at a time"],
    rightIndex: [0, 1, 2, 0, 2, 1],
    explanation: "One-off items: job; limited runs of different products: batch; continuous standard products: flow.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "{{blank:a}} production makes standardised products continuously. {{blank:b}} production makes limited quantities of identical items and then changes to another product.",
    blanks: [
      { id: "a", accepted: ["Flow"], choices: ["Flow", "Job", "Batch", "Custom"] },
      { id: "b", accepted: ["Batch"], choices: ["Batch", "Flow", "Job", "Continuous"] },
    ],
    explanation: "Flow is continuous; batch makes limited runs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State another name for flow production.",
    accepted: ["mass production", "line production", "continuous production", "production line", "assembly line production", "assembly line"],
    wrong: ["batch production"],
    explanation: "Flow production is also called mass, line or continuous production.",
  });
  // Calculation linking method and cost per unit (Cambridge average cost formula).
  const fcB = 4800, vcB = 3.2, qB = 1500;
  const acB = f.averageCost(f.totalCost(fcB, f.totalVariableCost(vcB, qB)), qB);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: acB, calculator: true,
    stem: `A furniture workshop changes to batch production of stools. Each month fixed costs are ${money(fcB)}, the variable cost is ${money(vcB)} per stool and it makes ${fmt(qB)} stools. Calculate the average cost per stool.`,
    wrong: [vcB, round(fcB / qB, 2)],
    explanation: `Total cost = ${fmt(fcB)} + ${vcB.toFixed(2)} × ${fmt(qB)} = ${fmt(f.totalCost(fcB, vcB * qB))}; average cost = ${money(acB)}.`,
    workedSolution: `1. Total variable cost = ${vcB.toFixed(2)} × ${fmt(qB)} = ${fmt(vcB * qB)}.\n2. Total cost = ${fmt(fcB)} + ${fmt(vcB * qB)} = ${fmt(f.totalCost(fcB, vcB * qB))}.\n3. Average cost = ${fmt(f.totalCost(fcB, vcB * qB))} ÷ ${fmt(qB)} = ${money(acB)}.`,
    hints: ["Total cost = fixed + variable costs.", "Average cost = total cost ÷ output."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of batch production for a bakery.",
    points: [
      "Advantage, e.g. variety of breads and cakes / flexible to demand (1)",
      "Explained: bakery can switch to more cakes before holidays / customers have choice (1)",
      "Disadvantage, e.g. time lost cleaning and resetting mixers and ovens between batches (1)",
      "Explained: no output while changing over, raising cost per loaf / stock of each product held (1)",
    ],
    modelAnswer: "Batch production lets the bakery make several types of bread and cake, so customers have a choice and it can bake more cakes before holidays. However, mixers and ovens must be cleaned and reset between batches, and nothing is produced during this time, so the cost of each loaf rises.",
    explanation: "Batch gives variety and flexibility but loses time between batches.",
    hints: ["Think about changing from one product to another."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A Mutare dressmaker who makes clothes to order has been asked by a chain store to supply 3,000 identical school dresses each term. Recommend whether she should change from job production to batch production. Justify your answer.",
    points: [
      "Batch: lower cost per dress, so she can offer the chain store a competitive price (1)",
      "Large regular order makes batch production worthwhile (1)",
      "Problems: needs machines, cutting tables, semi-skilled staff and storage; finance needed (1)",
      "May lose her made-to-order customers / work becomes repetitive (1)",
      "Could combine: batch for school dresses, job for private customers (1)",
      "Justified recommendation (1)",
    ],
    modelAnswer: "Batch production would allow her to cut and sew dresses in sizes, many at a time, so the cost per dress falls and she can offer the chain store a low price. A regular order of 3,000 dresses a term is large enough to justify buying extra machines and hiring machinists. However, she would need finance, space to store fabric and finished dresses, and staff, and the work is repetitive. I recommend she uses batch production for the school dresses while keeping a small job-production section for her private customers, so she does not lose her existing income.",
    explanation: "Volume and standardisation favour batch; finance, space and existing customers must be considered.",
    hints: ["Consider the size and nature of the new order."],
  });
  // Structured 1.
  const job = { out: 12, cost: 85 }, bat = { out: 200, cost: 41 };
  const tbl = table(["Method", "Pairs of shoes a week", "Cost per pair (US\\$)"], [["Job (made to measure)", job.out, job.cost.toFixed(2)], ["Batch (standard sizes)", bat.out, bat.cost.toFixed(2)]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Tatenda makes leather shoes in Bulawayo by job production. He is thinking of changing to batch production of school shoes in standard sizes. He has estimated the figures below. School shoes would sell for ${money(55)} a pair; made-to-measure shoes sell for ${money(120)}.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: job.out * (120 - job.cost), stem: "Calculate the weekly profit from job production.", wrong: [job.out * 120], explanation: `${job.out} × (${fmt(120)} − ${fmt(job.cost)}) = ${money(job.out * (120 - job.cost))}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: bat.out * (55 - bat.cost), stem: "Calculate the weekly profit from batch production, assuming all pairs are sold.", wrong: [bat.out * 55], explanation: `${bat.out} × (${fmt(55)} − ${fmt(bat.cost)}) = ${money(bat.out * (55 - bat.cost))}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the cost per pair is lower in batch production.", points: ["Machines/templates used for many identical pairs; less skilled time per pair (1)", "Materials bought in bulk / costs spread over more output (1)"] }),
      P.manual({ label: "(d)", marks: 6, stem: "Recommend whether Tatenda should change to batch production. Justify your answer.", points: [`Profit rises from ${money(job.out * (120 - job.cost))} to ${money(bat.out * (55 - bat.cost))} a week if all are sold (1)`, "But demand for 200 pairs a week is uncertain; school demand is seasonal (1)", "Needs finance for machines, storage of stock (1)", "Loses unique, high-price product and skilled job satisfaction (1)", "Could keep job production alongside (1)", "Justified recommendation (1)"] }),
    ],
    explanation: `Job: ${money(job.out * (120 - job.cost))} a week; batch: ${money(bat.out * (55 - bat.cost))} a week if all sold.`,
    hints: ["Profit per pair = price − cost per pair."],
  });
  // Structured 2.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "Masvingo Mills Ltd grinds maize meal using batch production, making 10 kg bags and 25 kg bags on the same machines. Demand for the 10 kg bag is high and steady across the year. The directors are considering a new flow production line just for 10 kg bags.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** features of flow production.", points: ["Continuous production of a standardised product (1)", "Specialist machinery / production line / large output (1)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** benefits to the company of flow production for 10 kg bags.", points: ["Lower cost per bag (1)", "Explained: no time lost changing batches; bulk buying of maize (1)", "Consistent quality / higher output (1)", "Explained: meets high, steady demand; easier quality checks (1)"] }),
      P.manual({ label: "(c)", marks: 4, stem: "Discuss whether the directors should invest in the flow production line.", points: ["Demand for 10 kg bags is high and steady: suits flow (1)", "High capital cost; risk if demand falls / maize harvest poor (1)", "Breakdowns stop the line; workers' motivation (1)", "Justified conclusion (1)"] }),
    ],
    explanation: "Flow suits the high, steady demand for one standard bag, but the set-up cost and risk must be weighed.",
    hints: ["Link each point to the 10 kg bag."],
  });
  b.card("DEFINITION", "Job production", "Making one-off products to meet each customer's individual needs.");
  b.card("DEFINITION", "Batch production", "Making a limited quantity of one identical product, then switching to another.");
  b.card("DEFINITION", "Flow production", "Continuous production of large quantities of a standardised product along a line.");
  b.card("CONCEPT", "Job: pros and cons", "Unique product, high price, motivated skilled staff; but high cost per unit, slow, few economies of scale.");
  b.card("CONCEPT", "Batch: pros and cons", "Variety, flexibility, lower unit cost than job; but time lost between batches, stock to store, repetitive work.");
  b.card("CONCEPT", "Flow: pros and cons", "Lowest unit cost, high output, consistent quality, bulk buying; but high set-up cost, no variety, boring work, breakdowns stop the line.");
  b.card("CONCEPT", "Choosing a method", "Size and steadiness of demand, type of product, finance, labour skills, competition.");
  b.card("FACT", "Examples", "Job: wedding cake, built-to-order house. Batch: bakery, clothing sizes. Flow: soft drinks, cement, maize meal.");
});
