// Slice W3a: cash crops: cotton and flue-cured tobacco (Cambridge only; tagged automatically).
import { concept, P, agricultureLevels, plantPopulation, pct, round, money, check, table, fmtNum } from "../lib.mjs";

// Q: tobacco population 120 x 50 cm.
const tPop = plantPopulation({ rowCm: 120, inRowCm: 50 });
check(Math.abs(tPop.perHa - 16666.667) < 0.01, "tPop");
// Q: seedlings for 0.9 ha at 120 x 50 with 10% extra for gapping.
const seedlings = tPop.perHa * 0.9 * 1.1;
check(Math.abs(seedlings - 16500) < 1e-6, "seedlings");
// Q: lint at 38% out-turn from 2,500 kg.
const lint = (2500 * 38) / 100;
check(lint === 950, "lint");
// Q: cured leaf mass.
const cured = (4000 * 15) / 100;
check(cured === 600, "cured");

// Struct: cotton contract payment.
const GRADES = [["A (clean white)", 900, 0.4], ["B (slightly stained)", 250, 0.3], ["C (stained, trashy)", 100, 0.18]];
const G_TABLE = table(["Grade", "Seed cotton delivered (kg)", "Price per kg (US\\$, assume)"], GRADES.map(([g, kg, p]) => [g, fmtNum(kg), p.toFixed(2)]));
const gross = GRADES.reduce((s, [, kg, p]) => s + kg * p, 0);
const INPUTS = 185;
const net = gross - INPUTS;
const pctA = pct(GRADES[0][1], GRADES.reduce((s, [, kg]) => s + kg, 0));
check(Math.abs(gross - 453) < 1e-9 && Math.abs(net - 268) < 1e-9 && Math.abs(pctA - 72) < 1e-9, "contract");

// Struct: scouting table for bollworm.
const SC = [["Week 1", 24, 1], ["Week 2", 24, 3], ["Week 3", 24, 9]];
const SC_TABLE = table(["Week", "Plants checked", "Plants with bollworm eggs or young larvae"], SC);
const scPct = SC.map(([, n, d]) => pct(d, n));
check(Math.abs(scPct[2] - 37.5) < 1e-9, "scPct");

concept("agri.crops.cotton-tobacco", { file: "crops/cotton-tobacco", keyPrefix: "crops.cotton-tobacco" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is removed from a tobacco plant when it is topped?",
    options: [
      ["The flower head", "Correct: food then goes to the leaves."],
      ["The lowest leaves", "Lower leaves are reaped when ripe, not topped."],
      ["The side shoots in the leaf axils", "That is suckering."],
      ["Part of the root system", "Roots are never removed."],
    ],
    answer: "A",
    explanation: "Topping removes the flower head so that food goes into the leaves instead of flowers and seed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is potassium for tobacco supplied as potassium sulfate rather than muriate of potash?",
    options: [
      ["Chloride spoils the burning quality of the leaf", "Correct: muriate of potash is potassium chloride."],
      ["Potassium sulfate contains more nitrogen", "Neither supplies nitrogen."],
      ["Muriate of potash kills the seedlings at once", "It is not instantly toxic; the problem is leaf quality."],
      ["Sulfate makes the leaves turn green during curing", "Curing turns leaves yellow, not green."],
    ],
    answer: "A",
    explanation: "Tobacco fertilisers are kept low in chloride because chloride makes cured leaf burn poorly.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pest bores into cotton squares and bolls and also attacks tomatoes?",
    options: [
      ["American bollworm", "Correct: *Helicoverpa armigera* has many host crops."],
      ["Red spider mite", "Mites suck sap from leaves; they do not bore into bolls."],
      ["Jassid", "Jassids suck sap from leaves, causing red leaf edges."],
      ["Maize stalk borer", "Stalk borer attacks maize and sorghum stems."],
    ],
    answer: "A",
    explanation: "American bollworm larvae bore into squares, flowers and bolls of cotton and into tomato fruit.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why must cotton stalks be uprooted and destroyed after harvest?",
    options: [
      ["To break the life cycle of pests that survive in old plants", "Correct: a closed season leaves bollworms with no host."],
      ["To add nitrogen to the soil", "Destroying stalks is about pest control, not nitrogen."],
      ["To stop the plants flowering a second time", "The main aim is to remove pest hosts."],
      ["To provide firewood for the barns used to cure tobacco leaf", "This is not the purpose."],
    ],
    answer: "A",
    hints: ["Where do bollworms survive the dry season?"],
    explanation: "Stalk destruction creates a closed season without living cotton, which breaks pest cycles.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why should cotton never be picked into polypropylene sacks?",
    options: [
      ["Fibres from the sacks contaminate the lint", "Correct: plastic fibres spoil spinning and dyeing and lower the grade."],
      ["Polypropylene makes the seed germinate", "Sacks do not cause germination."],
      ["The sacks are too small to hold a full day of picking", "Size is not the problem."],
      ["Polypropylene attracts aphids", "Sacks do not attract aphids."],
    ],
    answer: "A",
    hints: ["Think of what buyers want in the lint."],
    explanation: "Contamination with plastic fibres, hair or string lowers the value of cotton lint.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which order do the stages of flue-curing tobacco take place?",
    options: [
      ["Yellowing, leaf drying, midrib drying", "Correct: the leaf yellows first, then the blade and then the midrib dry."],
      ["Leaf drying, yellowing, midrib drying", "Yellowing must come first while the leaf is alive."],
      ["Midrib drying, yellowing, leaf drying", "The midrib is dried last at the highest temperature."],
      ["Yellowing, midrib drying, leaf drying", "The thin blade dries before the thick midrib."],
    ],
    answer: "A",
    explanation: "Yellowing at about 35 °C, then leaf drying (colour fixing), then midrib drying up to about 70 °C.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are tobacco workers told to wash their hands with soap and not to use tobacco products while handling seedlings?",
    options: [
      ["To avoid spreading tobacco mosaic virus", "Correct: the virus is spread by touch from infected material."],
      ["To stop aphids laying eggs on the seedlings", "Hand washing does not affect aphids."],
      ["To prevent root-knot nematodes", "Nematodes live in soil."],
      ["To make the seedlings harden off faster", "Hardening off is done by reducing water."],
    ],
    answer: "A",
    hints: ["Which disease spreads on hands and tools?"],
    explanation: "Tobacco mosaic virus spreads mechanically on hands and tools and from infected tobacco products.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Flue-cured tobacco is grown on light, sandy soils of low natural fertility. What is the main reason?",
    options: [
      ["The farmer can control nitrogen supply and so leaf quality", "Correct: too much nitrogen gives dark, poor-curing leaf."],
      ["Tobacco needs no fertiliser at all", "Tobacco is fertilised, but carefully."],
      ["Sandy soils are naturally free of root-knot nematodes and other pests", "Nematodes thrive in sandy soils; rotation is needed."],
      ["Tobacco roots cannot grow in loams", "Tobacco can grow in loams; quality is the issue."],
    ],
    answer: "A",
    hints: ["What happens to leaf quality with excess nitrogen?"],
    explanation: "On infertile sands the nitrogen the crop receives comes mostly from fertiliser, so the grower controls it and the leaf ripens and cures well.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ginning separates cotton lint from cotton seed.",
    answer: true,
    explanation: "True. Lint goes to textiles; seed is used for oil and stock-feed cake.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tobacco leaves are reaped from the top of the plant downwards.",
    answer: false,
    explanation: "False. Leaves ripen from the bottom up, so the lowest ripe leaves are reaped first.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cotton pest with the damage it causes.",
    pairs: [
      ["American bollworm", "Holes bored in squares and bolls; squares drop"],
      ["Aphids", "Sticky lint from honeydew and sooty mould"],
      ["Jassids", "Leaf edges curl and turn red or brown"],
      ["Red spider mite", "Bronzed leaves with fine webbing in hot, dry weather"],
    ],
    explanation: "Each pest leaves typical signs that help with scouting.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "After topping, side shoots called {{blank:a}} grow from the leaf axils; leaves are then {{blank:b}} in a barn to dry them and fix their colour.",
    blanks: [
      { id: "a", accepted: ["suckers"] },
      { id: "b", accepted: ["cured", "flue-cured", "flue cured"] },
    ],
    explanation: "Suckers are removed; reaped leaves are cured.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Tobacco is transplanted at 120 cm × 50 cm. Calculate the number of plants per hectare, to the nearest whole plant.",
    value: tPop.perHa, unit: "plants/ha", tol: 0.5, answer: "16667", wrong: [6000, round(tPop.perHa / 10, 0)],
    explanation: `1.2 × 0.5 = 0.6 m² per plant; 10,000 ÷ 0.6 = ${fmtNum(tPop.perHa)} plants/ha. Multiplying 120 × 50 = 6,000 forgets to work in metres.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Chipo will transplant 0.9 ha of tobacco at 120 cm × 50 cm and wants 10% extra seedlings for gapping (replacing plants that die). Calculate the number of seedlings she should raise.",
    value: seedlings, unit: "plants", tol: 0.5, answer: "16500", wrong: [round(tPop.perHa * 0.9, 0), round(tPop.perHa * 1.1, 0)],
    hints: ["Plants for the field first, then add 10%."],
    explanation: `Plants/ha = 10,000 ÷ 0.6 = ${fmtNum(tPop.perHa)}; for 0.9 ha = ${fmtNum(tPop.perHa * 0.9)}; plus 10% = ${fmtNum(seedlings)} seedlings.`,
    workedSolution: `1. Plants/ha = 10,000 ÷ (1.2 × 0.5) = ${fmtNum(tPop.perHa)}.\n2. For 0.9 ha: ${fmtNum(tPop.perHa)} × 0.9 = ${fmtNum(tPop.perHa * 0.9)}.\n3. Add 10%: ${fmtNum(tPop.perHa * 0.9)} × 1.1 = ${fmtNum(seedlings)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume a ginnery's out-turn is 38% lint. Calculate the mass of lint from 2,500 kg of seed cotton, in kg.",
    value: lint, unit: "kg", tol: 0, wrong: [2500 - lint, round(2500 / 0.38, 0)],
    hints: ["Lint = seed cotton × out-turn ÷ 100."],
    explanation: `2,500 × 38 ÷ 100 = ${lint} kg of lint; the other ${fmtNum(2500 - lint)} kg is seed and waste.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume cured tobacco weighs 15% of the green leaf put into the barn. What mass of cured leaf comes from 4,000 kg of green leaf, in kg?",
    value: cured, unit: "kg", tol: 0, wrong: [4000 - cured, round(4000 / 0.15, 0)],
    hints: ["Most of the mass lost is water."],
    explanation: `4,000 × 15 ÷ 100 = ${cured} kg; the rest is water driven off during curing.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the illness caused by nicotine absorbed through the skin when workers handle wet green tobacco leaf.",
    accepted: ["green tobacco sickness", "GTS", "nicotine poisoning"],
    keywords: { any: ["green tobacco", "nicotine"] },
    explanation: "**Green tobacco sickness**; long sleeves and gloves reduce the risk.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why tobacco is topped and suckered.",
    hints: ["Where does the food go after topping?"],
    points: [
      "Topping removes the flower head so food is not used for flowers and seed.",
      "Food is diverted to the leaves, which become larger, thicker and heavier (higher yield and nicotine).",
      "Suckers that grow after topping are removed because they would use the food saved and reduce leaf yield and quality.",
    ],
    modelAnswer: "Topping removes the flower head, so the food made by the plant goes to the leaves, which grow bigger and heavier. Topping makes suckers grow; they are removed because they would take that food and lower yield and quality.",
    explanation: "Diverting assimilates to the leaves.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss **two** advantages and **two** disadvantages of contract farming for a smallholder cotton grower.",
    hints: ["Think of inputs, credit, market, prices and deductions."],
    points: [
      "Advantage: inputs (seed, fertiliser, chemicals) are supplied on credit, so a farmer without cash can grow the crop.",
      "Advantage: a guaranteed buyer / extension advice from the company.",
      "Disadvantage: input costs (and interest) are deducted, so the net payment may be small.",
      "Disadvantage: the farmer must sell to the contractor at its price and cannot side-sell if prices elsewhere are higher.",
    ],
    modelAnswer: "Contract farming gives the farmer seed, fertiliser and chemicals on credit and a sure buyer, often with advice. However, the input costs are deducted from the payment, which can leave little profit, and he must sell to that company at its price.",
    explanation: "Weigh benefits against costs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Sipho scouts his cotton weekly near Sanyati by checking plants at several points in the field.\n\n${SC_TABLE}\n\nAssume his extension officer advises spraying when more than a quarter of the plants checked carry eggs or young larvae.`,
    hints: ["Percentage = plants with eggs ÷ plants checked × 100.", "A quarter is 25%."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of plants with eggs or young larvae in week 3, to one decimal place.",
        value: scPct[2], unit: "%", tol: 0.05, answer: "37.5", wrong: [9, round(pct(24, 9), 1)],
        explanation: `9 ÷ 24 × 100 = ${scPct[2]}%.`,
      }),
      P.mcq({
        label: "(b)", stem: "In which week should Sipho first spray?",
        options: [
          ["Week 3", "Correct: 37.5% is above 25%."],
          ["Week 1", "1 of 24 is about 4%."],
          ["Week 2", "3 of 24 is 12.5%."],
          ["He should not spray at all", "Week 3 exceeds the threshold."],
        ],
        answer: "A",
        explanation: "Only week 3 exceeds the threshold of 25%.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why young larvae are easier to control than older ones.",
        points: ["Young larvae feed on the outside of growing points and leaves, where sprays reach them.", "Older larvae are inside squares and bolls, protected from sprays (and are more tolerant of insecticide)."],
        explanation: "Exposure of young larvae.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** practices, other than spraying, that reduce bollworm damage in cotton.",
        points: ["Plant early/on time so bolls form before pest numbers peak.", "Destroy stalks after harvest (closed season).", "Encourage natural enemies by avoiding unnecessary sprays / hand-pick larvae / use trap crops."],
        explanation: "Cultural and biological methods.",
      }),
    ],
    explanation: "Use scouting data and a threshold; explain timing and non-chemical control of bollworm.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `Tatenda delivered his seed cotton to a contract company near Gokwe.\n\n${G_TABLE}\n\nThe company supplied him with seed, fertiliser and chemicals on credit worth US\\$${INPUTS}, which it deducts from his payment.`,
    hints: ["Value of each grade = mass × price.", "Net payment = total value − inputs."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total value of the cotton delivered, in US dollars.",
        value: gross, prefix: "US$", wrong: [900 * 0.4, round(1250 * 0.4, 0)],
        explanation: `900 × 0.40 = 360; 250 × 0.30 = 75; 100 × 0.18 = 18; total ${money(gross)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate Tatenda's net payment after the input credit is deducted, in US dollars.",
        value: net, prefix: "US$", wrong: [gross, gross + INPUTS],
        explanation: `${money(gross)} − ${money(INPUTS)} = ${money(net)}.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "What percentage of the cotton delivered was grade A?",
        value: pctA, unit: "%", tol: 0, wrong: [90, 900],
        explanation: `900 ÷ 1,250 × 100 = ${pctA}%.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** ways Tatenda could increase the proportion of grade A cotton next season.",
        points: ["Pick only fully open bolls after the dew has dried, so the lint is dry and clean.", "Pick into cotton bags (not polypropylene) and keep cotton off the soil, away from dust and leaves.", "Control aphids (sticky lint) and pick promptly before rain stains open bolls; sort grades as he picks."],
        explanation: "Clean, dry, sorted, pest-free cotton.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Discuss whether Tatenda should continue to grow cotton under contract or buy his own inputs and sell independently.",
        points: ["Contract: no cash needed at planting; inputs and advice supplied; guaranteed buyer.", "Contract: costs are deducted (possibly with interest) and he must accept the contractor's price.", "Independent: he can sell to the buyer offering the best price and avoid credit charges, but needs savings for inputs and carries more risk.", "Judgement linked to his situation, e.g. stay on contract until he has savings, then compare prices."],
        levels: agricultureLevels(4),
        explanation: "Weigh both marketing routes and decide.",
      }),
    ],
    explanation: "Contract payment by grade, and how quality and marketing choices affect the farmer's income.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Rudo is transplanting tobacco seedlings raised in float trays on her farm near Karoi.",
    hints: ["Think of seedling size, hardening and planting care."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the seedlings that are ready for transplanting.",
        points: ["About pencil-thick stems and about 15-20 cm tall (about eight to ten weeks old).", "Hardened off (watering reduced), healthy and free of disease."],
        explanation: "Ready seedlings.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why seedlings are hardened off before transplanting.",
        points: ["Reducing water toughens the tissues and slows soft growth.", "So the seedlings survive the shock of transplanting into the field with less wilting."],
        explanation: "Hardening off.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** precautions Rudo should take on the day of transplanting.",
        points: ["Water the trays before pulling seedlings / transplant into moist soil and water in.", "Transplant in the cool of the day / handle seedlings by the leaves, not the stem; wash hands (TMV)."],
        explanation: "Transplanting care.",
      }),
    ],
    explanation: "Seedling readiness, hardening off and transplanting of tobacco.",
  });

  b.card("DEFINITION", "Cash crop", "A crop grown mainly for sale, e.g. cotton and flue-cured tobacco.");
  b.card("DEFINITION", "Topping (tobacco)", "Removing the flower head so food goes to the leaves, which become larger and heavier.");
  b.card("DEFINITION", "Suckering", "Removing side shoots that grow in leaf axils after topping, by hand or with a sucker-control chemical.");
  b.card("FACT", "Stages of flue-curing", "Yellowing (about 35 °C, humid), leaf drying (colour fixing), midrib drying (up to about 70 °C).");
  b.card("FACT", "Main cotton pests", "American bollworm, red bollworm, aphids (sticky lint), jassids, red spider mite.");
  b.card("CONCEPT", "Closed season for cotton", "Stalks uprooted and destroyed after harvest so bollworms have no host; required by regulation in Zimbabwe.");
  b.card("CONCEPT", "Keeping cotton grade high", "Pick fully open bolls when dry, into cotton bags, keep clean, sort grades, control aphids.");
  b.card("FACT", "Why chloride-free fertiliser for tobacco?", "Chloride spoils the burning quality of the leaf; use potassium sulfate, not muriate of potash.");
  b.card("DEFINITION", "Contract farming", "A company supplies inputs on credit and buys the crop, deducting input costs from the payment.");
});
