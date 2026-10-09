// Slice W3b: the law of diminishing returns.
import { concept, P, productTable, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: MP of the 4th worker.
const mp4 = 2520 - 2250;
check(mp4 === 270, "mp4");
// Num: AP with 5 workers.
const ap5 = 2700 / 5;
check(ap5 === 540, "ap5");
// Calc: dairy meal step, value of MP minus cost.
const extraMilk = round(15.2 - 14.0, 2);
const gain = round(extraMilk * 0.45 - 0.42, 2);
check(Math.abs(extraMilk - 1.2) < 1e-9 && Math.abs(gain - 0.12) < 1e-9, "dairy");

// Structured 12: nitrogen on wheat, steps of 40 kg N.
const N = [0, 40, 80, 120, 160, 200];
const Y = [2400, 3600, 4500, 5000, 5100, 5050];
const PT = productTable(N, Y);
const step = PT.slice(1).map((r, i) => Y[i + 1] - Y[i]);
check(step.join() === "1200,900,500,100,-50", "steps");
const WHEAT = 0.35, NCOST = 1.2;
const stepCost = 40 * NCOST;
const stepValue = step.map((s) => round(s * WHEAT, 2));
check(stepCost === 48 && stepValue[2] === 175 && stepValue[3] === 35, "values");
const N_TABLE = table(["Nitrogen applied (kg N/ha)", "Wheat yield (kg/ha)"], N.map((n, i) => [n, Y[i].toLocaleString("en-GB")]));
// Structured 8: maize plant population.
const POP = [20000, 30000, 40000, 50000, 60000, 70000];
const PY = [3.2, 4.4, 5.2, 5.5, 5.4, 5.0];
const P_TABLE = table(["Plant population (plants/ha)", "Grain yield (t/ha)"], POP.map((p, i) => [p.toLocaleString("en-GB"), PY[i].toFixed(1)]));
const mpPop = round(PY[3] - PY[2], 2);
check(Math.abs(mpPop - 0.3) < 1e-9, "mpPop");

concept("agri.business.diminishing-returns", { file: "business/diminishing-returns", keyPrefix: "business.diminishing-returns" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a fertiliser trial on a one-hectare field, which input is held **fixed**?",
    options: [
      ["The area of land", "Correct: the hectare does not change."],
      ["The amount of fertiliser", "Fertiliser is the variable input being changed."],
      ["The yield of the crop", "Yield is the output, not an input."],
      ["The price of the crop", "Price is not an input."],
    ],
    answer: "A",
    explanation: "The law applies when a variable input (fertiliser) is added to a fixed input (land).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the **marginal product** of an input?",
    options: [
      ["The extra output from one more unit of the input", "Correct."],
      ["The total output divided by all the units of input used", "That is average product."],
      ["The total output from all the units of input", "That is total product."],
      ["The cost of one more unit of the input", "That is the marginal cost."],
    ],
    answer: "A",
    explanation: "MP = change in total product ÷ change in input.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Once diminishing returns have set in, what happens to **total** product as more input is added?",
    options: [
      ["It still rises, but by smaller amounts", "Correct: MP is falling but still positive."],
      ["It falls straight away", "TP falls only when MP becomes negative."],
      ["It rises by larger and larger amounts", "That is increasing returns."],
      ["It stays exactly the same", "TP still rises while MP is positive."],
    ],
    answer: "A",
    explanation: "Diminishing returns means each extra unit adds less, not that total output falls.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "At what point is **total** product at its maximum?",
    options: [
      ["Where marginal product is zero", "Correct: after this MP turns negative and TP falls."],
      ["Where marginal product is at its peak", "TP is still rising steeply then."],
      ["Where average product is at its peak", "TP keeps rising after AP peaks."],
      ["Where the first unit of input is added", "TP is low then."],
    ],
    answer: "A",
    hints: ["When does an extra unit add nothing at all?"],
    explanation: "TP rises while MP is positive and falls when MP is negative, so it peaks where MP = 0.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "In which stage of production should a farmer **never** operate?",
    options: [
      ["Where marginal product is negative", "Correct: extra input lowers total output."],
      ["Where marginal product is rising", "Here extra input is very productive."],
      ["Where marginal product is falling but positive", "The best level lies in this stage."],
      ["Where average product is rising", "Extra input still raises output efficiently."],
    ],
    answer: "A",
    hints: ["Which stage wastes money and lowers output?"],
    explanation: "In stage III (negative returns) adding input reduces output, so it is never rational.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer should keep adding bags of fertiliser up to the point where:",
    options: [
      ["extra yield is worth just the cost of a bag", "Correct: beyond this each bag loses money."],
      ["the crop gives the highest yield the field can give", "Maximum yield is beyond the most profitable rate."],
      ["the first bag has been applied to the whole field", "Further bags may still pay."],
      ["average product per bag is at its very highest", "Extra bags can still pay after AP peaks."],
    ],
    answer: "A",
    hints: ["Compare what an extra bag earns with what it costs."],
    explanation: "Add input while MP × output price exceeds the input's cost; stop where they are about equal.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The price of fertiliser rises sharply while the price of maize stays the same. How should the most profitable fertiliser rate change?",
    options: [
      ["It should fall", "Correct: fewer bags now earn more than they cost."],
      ["It should rise", "A dearer input makes the last bags unprofitable."],
      ["It should stay the same", "The balance of value and cost has changed."],
      ["Fertiliser should be stopped completely", "The first bags usually still pay well."],
    ],
    answer: "A",
    hints: ["Each bag now costs more, but adds the same yield."],
    explanation: "With a higher cost per bag, the value of MP falls below cost at a lower rate, so the profitable rate falls.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the law of diminishing returns occur in farming?",
    options: [
      ["At least one input, such as land, is fixed", "Correct: more variable input shares the same fixed input."],
      ["Farm prices always fall over time", "The law is about physical output, not prices."],
      ["Farmers always buy poor-quality inputs", "Input quality is not the cause."],
      ["Crops and animals stop growing after one season", "This is not the reason."],
    ],
    answer: "A",
    hints: ["What is held constant in every example?"],
    explanation: "Each extra unit of variable input has less of the fixed input to work with, so its extra output falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When diminishing returns set in, total output begins to fall.",
    answer: false,
    explanation: "False. Total output still rises; the extra output from each additional unit (MP) falls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Total product", "All the output from a given amount of input"],
      ["Average product", "Output per unit of variable input"],
      ["Marginal product", "Extra output from one more unit of input"],
      ["Fixed input", "Input that cannot be changed in the short run"],
      ["Variable input", "Input the farmer can increase or decrease"],
    ],
    explanation: "Learn the terms used with input-output tables.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula.",
    template: "Average product = total product ÷ number of units of {{blank:a}} input",
    blanks: [{ id: "a", accepted: ["variable", "the variable"] }],
    explanation: "AP = TP ÷ units of variable input.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the stage of production in which marginal product is negative and total product falls.",
    accepted: ["stage III", "stage 3", "stage three", "negative returns", "stage of negative returns", "third stage"],
    keywords: { any: ["negative", "iii", "3", "three", "third"] },
    hints: ["It comes after diminishing returns."],
    explanation: "**Stage III**, negative returns.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "On a fixed area, 3 workers harvest 2,250 kg of produce and 4 workers harvest 2,520 kg. Calculate the marginal product of the fourth worker, in kg.",
    value: mp4, unit: "kg", tol: 0, wrong: [2520 / 4, 2520],
    explanation: `MP = 2,520 − 2,250 = ${mp4} kg.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Five workers on a garden produce a total of 2,700 kg of vegetables. Calculate the average product per worker, in kg.",
    value: ap5, unit: "kg", tol: 0, wrong: [2700 * 5, 2700],
    explanation: `AP = 2,700 ÷ 5 = ${ap5} kg per worker.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Raising a cow's dairy meal by 1 kg a day increases her milk from 14.0 L to 15.2 L a day. Assume milk sells at US\\$0.45 per litre and dairy meal costs US\\$0.42 per kg. Calculate the extra profit (value of the extra milk minus the cost of the extra meal) per cow per day.",
    value: gain, prefix: "US$", answer: "0.12", wrong: [round(15.2 * 0.45 - 0.42, 2), round(extraMilk * 0.45, 2)],
    hints: ["Extra milk = new − old.", "Value = extra litres × price."],
    explanation: `Extra milk = 15.2 − 14.0 = ${extraMilk} L; value = ${extraMilk} × 0.45 = US\\$0.54; minus meal US\\$0.42 = US\\$${gain.toFixed(2)} per day, so this step pays. Valuing all 15.2 L instead of the extra milk is a common error.`,
    workedSolution: `1. Marginal product = 15.2 − 14.0 = ${extraMilk} L of milk.\n2. Value of marginal product = ${extraMilk} × US\\$0.45 = US\\$0.54.\n3. Cost of extra meal = 1 kg × US\\$0.42 = US\\$0.42.\n4. Extra profit = 0.54 − 0.42 = US\\$${gain.toFixed(2)} per cow per day.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the highest yield is usually **not** the most profitable yield.",
    hints: ["What do the last units of input add, and what do they cost?"],
    points: [
      "Because of diminishing returns, each extra unit of input adds less and less output.",
      "Near the maximum yield the extra output is worth less than the cost of the extra input.",
      "So profit is greatest at a lower input level, where the value of MP equals the input cost (maximum yield is where MP = 0).",
    ],
    modelAnswer: "With diminishing returns, the last units of input add very little yield. Close to maximum yield the value of that small extra yield is less than the cost of the input, so profit is highest at a lower rate, where the value of the marginal product just equals the cost of the input.",
    explanation: "Marginal value against marginal cost.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **two** implications of the law of diminishing returns for a livestock farmer.",
    hints: ["Think of feed and of stocking a fixed area."],
    points: [
      "Feed: extra feed gives less and less extra growth or milk.",
      "So feed only up to the point where extra output pays for the extra feed; overfeeding wastes money and makes animals fat.",
      "Stocking: adding more animals to a fixed pasture or house gives less output per extra animal.",
      "Overstocking causes overgrazing, crowding, disease and lower performance, so stock at the best rate.",
    ],
    modelAnswer: "Each extra kilogram of feed produces less extra milk or meat, so the farmer should feed only up to the point where the extra output pays for the feed. Likewise, adding more animals to a fixed pasture or house gives less output per animal and leads to overgrazing and disease, so the stocking rate must be limited.",
    explanation: "Feeding level and stocking rate.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Results of a nitrogen trial on irrigated wheat on one farm near Masvingo (example figures). Assume wheat sells at US\\$${WHEAT.toFixed(2)} per kg and nitrogen costs US\\$${NCOST.toFixed(2)} per kg of N.\n\n${N_TABLE}`,
    hints: ["Extra yield for each 40 kg step = difference between successive yields.", "Cost of each step = 40 × cost per kg of N."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the extra yield (kg/ha) from increasing nitrogen from 80 to 120 kg N/ha.",
        value: step[2], unit: "kg/ha", tol: 0, wrong: [Y[3], step[1]],
        explanation: `5,000 − 4,500 = ${step[2]} kg/ha.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the cost of one extra 40 kg of nitrogen.",
        value: stepCost, prefix: "US$", wrong: [NCOST, 40],
        explanation: `40 × 1.20 = US\\$${stepCost}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the value of the extra yield from increasing nitrogen from 120 to 160 kg N/ha.",
        value: stepValue[3], prefix: "US$", wrong: [round(Y[4] * WHEAT, 2), step[3]],
        explanation: `Extra yield = 5,100 − 5,000 = 100 kg; 100 × 0.35 = US\\$${stepValue[3]}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which nitrogen rate is the most profitable?",
        options: [
          ["120 kg N/ha", "Correct: the next step earns US\\$35 but costs US\\$48."],
          ["160 kg N/ha", "This gives the highest yield, but its last step loses US\\$13."],
          ["200 kg N/ha", "Yield falls at this rate."],
          ["80 kg N/ha", "The step to 120 earns US\\$175 for a cost of US\\$48, so it pays."],
        ],
        answer: "A",
        explanation: "Each step pays while its value exceeds US\\$48: 80→120 earns US\\$175; 120→160 earns only US\\$35.",
      }),
      P.short({
        label: "(e)", stem: "Between which two nitrogen rates is the marginal product negative? Give your answer as two numbers, e.g. 40 and 80.",
        accepted: ["160 and 200", "160 to 200", "160-200", "160, 200", "160 200"],
        keywords: { all: ["160", "200"] },
        explanation: "From 160 to 200 kg N/ha the yield falls by 50 kg/ha.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Describe the shape of the graph of yield against nitrogen applied.",
        points: ["Yield rises steeply at first, then more and more gently (levelling off).", "It reaches a maximum at about 160 kg N/ha and then falls slightly."],
        explanation: "Rising, levelling, peak, falling.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest **three** harmful effects of applying more than 160 kg N/ha.",
        points: ["Wasted money: extra nitrogen gives no extra yield (yield even falls).", "Nitrate leaches and pollutes rivers, dams and groundwater.", "A lush, soft crop lodges or is more prone to disease / the money could earn more on another field."],
        explanation: "Waste, leaching, lodging.",
      }),
    ],
    explanation: "Calculate extra yields and their value from a fertiliser trial and find the most profitable rate.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A plant-population trial with maize on one farm near Gweru gave these results (example figures).\n\n${P_TABLE}`,
    hints: ["Look at the change in yield between neighbouring rows."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the extra yield, in t/ha, from raising the population from 40,000 to 50,000 plants/ha.",
        value: mpPop, unit: "t/ha", tol: 0.05, answer: "0.3", wrong: [PY[3], 0.8],
        explanation: `5.5 − 5.2 = ${mpPop} t/ha.`,
      }),
      P.mcq({
        label: "(b)", stem: "At which population is the total yield greatest?",
        options: [
          ["50,000 plants/ha", "Correct: 5.5 t/ha."],
          ["70,000 plants/ha", "Yield has fallen to 5.0 t/ha."],
          ["40,000 plants/ha", "5.2 t/ha, below the peak."],
          ["60,000 plants/ha", "5.4 t/ha, just past the peak."],
        ],
        answer: "A",
        explanation: "The highest yield is 5.5 t/ha at 50,000 plants/ha.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Use the results to explain the law of diminishing returns.",
        points: ["Each extra 10,000 plants added to the fixed hectare gave a smaller increase in yield (1.2, 0.8, 0.3 t/ha).", "Beyond 50,000 plants/ha the extra yield became negative (yield fell)."],
        explanation: "Falling increments, then negative.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why yield falls when the population is raised above 50,000 plants/ha.",
        points: ["Plants compete for water, nutrients and light.", "Each plant is thinner and weaker, with smaller cobs or barren plants.", "Weak stalks lodge / crowded plants suffer more disease and drought stress."],
        explanation: "Competition at high density.",
      }),
    ],
    explanation: "Interpret a plant population trial using diminishing returns.",
  });

  b.card("DEFINITION", "Law of diminishing returns", "Adding more units of a variable input to a fixed input eventually gives smaller extra output per unit.");
  b.card("FORMULA", "Average product", "AP = total product ÷ units of variable input.");
  b.card("FORMULA", "Marginal product", "MP = change in total product ÷ change in input.");
  b.card("CONCEPT", "Three stages of production", "I: MP rising (increasing returns). II: MP falling but positive (best level here). III: MP negative, TP falling (never).");
  b.card("FACT", "Where is total product greatest?", "Where marginal product is zero.");
  b.card("CONCEPT", "Most profitable level of an input", "Keep adding while MP × output price > cost of the extra unit; stop where they are about equal.");
  b.card("CONCEPT", "Effect of input and output prices", "Dearer input or cheaper output: use less. Cheaper input or dearer output: use more.");
  b.card("CONCEPT", "Implications in farming", "Fertiliser, feed, labour, seed rate, water and chemicals all have a most profitable level below the maximum-yield level.");
});
