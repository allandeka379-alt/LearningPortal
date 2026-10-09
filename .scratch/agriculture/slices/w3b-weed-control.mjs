// Slice W3b: weed control methods and herbicides.
import { concept, P, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: product per tank: 2.5 L/ha in 200 L/ha, 15 L tank.
const perTankMl = (2.5 * 1000 * 15) / 200;
check(Math.abs(perTankMl - 187.5) < 1e-9, "per tank");
// Calc: saving for 2 ha, labour US$5/day.
const WAGE = 5;
const handHa = 2 * 22 * WAGE;
const herbHa = 2 * 14 + 1.5 * WAGE + 12 * WAGE;
const save2 = 2 * (handHa - herbHa);
check(handHa === 220 && Math.abs(herbHa - 95.5) < 1e-9 && Math.abs(save2 - 249) < 1e-9, "calc");
// Structured: three programmes per ha.
const PROG = [["A: hand hoeing twice", 0, 50], ["B: ox-drawn cultivator twice plus one hand weeding in the row", 15, 20], ["C: pre-emergence herbicide plus one hand weeding", 48, 12]];
const PROG_TABLE = table(["Programme", "Cash cost per ha (US\\$)", "Labour (person-days per ha)"], PROG.map(([n, c, d]) => [n, c, d]));
const total = PROG.map(([, c, d]) => c + d * WAGE);
check(total[0] === 250 && total[1] === 115 && total[2] === 108, "prog");
const c4 = 4 * total[2];
check(c4 === 432, "4 ha");

concept("agri.protection.weed-control", { file: "protection/weed-control", keyPrefix: "protection.weed-control" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A herbicide kills broad-leaved weeds in a maize crop without harming the maize. How is it described?",
    options: [
      ["Selective", "Correct: it kills some plants but spares the crop."],
      ["Non-selective", "A non-selective herbicide would kill the maize too."],
      ["Pre-plant", "This describes timing, not which plants are killed."],
      ["Fumigant", "Fumigants are gases used against storage pests."],
    ],
    answer: "A",
    explanation: "Selective herbicides kill certain plants (here broad-leaved weeds) and not the crop.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When is a **pre-emergence** herbicide applied?",
    options: [
      ["After sowing, before the crop and weeds emerge", "Correct."],
      ["After the crop and weeds have emerged", "That is post-emergence."],
      ["Before ploughing, sprayed onto last season's stubble", "This is a pre-plant (burn-down) use."],
      ["Just before harvest to dry the crop", "This is not weed control timing."],
    ],
    answer: "A",
    explanation: "Pre-emergence herbicides are applied to moist soil after sowing and kill weeds as they germinate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of herbicide is most likely to kill couch grass, including its rhizomes?",
    options: [
      ["A systemic (translocated) herbicide", "Correct: it is carried down to the rhizomes."],
      ["A contact herbicide", "Contact kills only the leaves it touches; rhizomes regrow."],
      ["A selective broad-leaf herbicide", "Couch grass is a grass, so it is not killed."],
      ["A protectant copper fungicide", "Fungicides do not kill weeds."],
    ],
    answer: "A",
    explanation: "Perennials need a systemic herbicide that moves to their underground organs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **cultural** method of weed control?",
    options: [
      ["Covering the soil with a thick mulch", "Correct: it blocks light from weed seeds."],
      ["Hoeing between the rows", "This is mechanical control."],
      ["Spraying a post-emergence herbicide", "This is chemical control."],
      ["Releasing weevils that eat water hyacinth", "This is biological control."],
    ],
    answer: "A",
    explanation: "Cultural methods (mulching, spacing, rotation, smother crops) help the crop compete.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which crop could be grown as a **trap crop** to reduce witchweed in a maize field?",
    options: [
      ["Cowpeas", "Correct: they trigger witchweed seeds to germinate but are not attacked."],
      ["Sorghum", "Sorghum is a host and would increase witchweed."],
      ["Pearl millet", "Millets are hosts of witchweed."],
      ["Maize", "Maize is the host being protected."],
    ],
    answer: "A",
    hints: ["The crop must make witchweed seeds germinate but not feed them."],
    explanation: "Legumes such as cowpeas, groundnuts and soya beans, and cotton, cause suicidal germination of witchweed seeds.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is a disadvantage of an ox-drawn cultivator for weeding maize?",
    options: [
      ["It leaves the weeds within the row", "Correct: the tines work only between rows."],
      ["It is slower than weeding with a hand hoe", "A cultivator is much faster."],
      ["It leaves chemical residues in the soil", "It uses no chemicals."],
      ["It can only be used before planting", "It is used between rows of a growing crop."],
    ],
    answer: "A",
    hints: ["Where can the tines not reach?"],
    explanation: "Inter-row cultivators cannot reach weeds close to the plants, so hand weeding in the row is still needed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Nut grass was sprayed with a contact herbicide. The leaves died within days, but three weeks later the nut grass was growing again. Why?",
    options: [
      ["The tubers underground were not reached", "Correct: they regrew new shoots."],
      ["The herbicide was a selective broad-leaf type", "The leaves died, so it acted; the problem is regrowth."],
      ["Nut grass is an annual that set fresh seed", "Nut grass is a perennial sedge."],
      ["Rain made the herbicide systemic", "Rain does not change how a herbicide acts."],
    ],
    answer: "A",
    hints: ["Contact herbicides kill only what they touch."],
    explanation: "A contact herbicide kills leaves only; nut grass regrows from its tubers. A systemic herbicide or repeated treatment is needed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Herbicide sprayed on a farmer's maize damaged his neighbour's tomatoes 50 m away. Which practice would best have prevented this?",
    options: [
      ["Spraying on a calm day with the nozzle kept low", "Correct: drift is carried by wind and fine droplets."],
      ["Using twice the label dose to finish quickly", "A higher dose increases damage and is unsafe."],
      ["Spraying at midday when the wind is strongest", "Wind carries spray drift further."],
      ["Using the finest mist that the nozzle is able to make", "Very fine droplets drift most."],
    ],
    answer: "A",
    hints: ["How did the herbicide travel 50 m?"],
    explanation: "Spray drift is reduced by spraying in calm weather, with the nozzle low and coarse droplets at the correct pressure.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does mulching reduce weed growth?",
    options: [
      ["It stops light reaching the weed seedlings", "Correct: seedlings cannot grow without light."],
      ["It poisons the weed seeds in the soil", "Most mulches are not poisonous."],
      ["It makes the soil too wet for seeds", "Mulch conserves moisture but this is not why weeds are fewer."],
      ["It adds nitrogen that weeds cannot use", "Weeds use nitrogen as well as crops."],
    ],
    answer: "A",
    hints: ["What do germinating weeds need to grow up through the mulch?"],
    explanation: "A thick mulch shades the soil surface, so weed seedlings cannot reach light and die.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Glyphosate is a selective herbicide that kills only broad-leaved weeds.",
    answer: false,
    explanation: "False. Glyphosate is non-selective and systemic: it kills grasses and broad-leaved plants alike.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Non-selective herbicide", "Kills all green plants it reaches"],
      ["Contact herbicide", "Kills only the plant parts it touches"],
      ["Systemic herbicide", "Is carried to the roots and rhizomes"],
      ["Post-emergence herbicide", "Is sprayed after crop and weeds have emerged"],
      ["Smother crop", "Covers the ground and shades weeds out"],
    ],
    explanation: "Know the terms used to classify herbicides and methods.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Herbicides are classified by timing as pre-plant, {{blank:a}} (applied after sowing but before emergence) and {{blank:b}} (applied to emerged weeds).",
    blanks: [
      { id: "a", accepted: ["pre-emergence", "preemergence", "pre emergence"] },
      { id: "b", accepted: ["post-emergence", "postemergence", "post emergence"] },
    ],
    explanation: "Pre-emergence; post-emergence.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "What name is given to the germination of witchweed seeds in response to a trap crop, after which the seedlings die because they cannot attach?",
    accepted: ["suicidal germination", "suicide germination", "false germination"],
    keywords: { any: ["suicid"] },
    hints: ["The seedlings germinate but have nothing to feed on."],
    explanation: "**Suicidal germination.**",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A herbicide is applied at 2.5 L of product in 200 L of spray mixture per hectare. Calculate the volume of product, in mL, needed for one 15 L knapsack tank of mixture. Give your answer to one decimal place.",
    value: perTankMl, unit: "mL", tol: 0.05, answer: "187.5", wrong: [2.5 * 15, round((2.5 * 15) / 200, 4)],
    hints: ["Find the product per litre of mixture first."],
    explanation: `2.5 L ÷ 200 L = 0.0125 L per litre = 12.5 mL per litre; 12.5 × 15 = ${perTankMl} mL. Leaving the answer in litres (0.1875 L) is the same amount, but the question asks for mL.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Assume labour costs US\\$5 per person-day. Hand weeding maize twice needs 22 person-days per hectare each time. A herbicide programme needs 2 L of herbicide per hectare at US\\$14 per litre, 1.5 person-days of spraying and one later hand weeding of 12 person-days per hectare. Calculate how much a farmer saves on 2 ha by using the herbicide programme instead of hand weeding twice.",
    value: save2, prefix: "US$", wrong: [handHa - herbHa, 2 * handHa],
    hints: ["Work out the cost per hectare of each programme.", "Then multiply the difference by the area."],
    explanation: `Hand: 2 × 22 × 5 = US\\$${handHa} per ha. Herbicide: 2 × 14 = US\\$28; spraying 1.5 × 5 = US\\$7.50; hand weeding 12 × 5 = US\\$60; total US\\$${herbHa} per ha. Saving = (${handHa} − ${herbHa}) × 2 = US\\$${save2}. US\\$${handHa - herbHa} is the saving for one hectare only.`,
    workedSolution: `1. Hand weeding: 2 weedings × 22 days × US\\$5 = US\\$${handHa} per ha.\n2. Herbicide: 2 L × US\\$14 = US\\$28.\n3. Spraying labour: 1.5 × US\\$5 = US\\$7.50; later hand weeding: 12 × US\\$5 = US\\$60.\n4. Herbicide programme = 28 + 7.50 + 60 = US\\$${herbHa} per ha.\n5. Saving on 2 ha = 2 × (${handHa} − ${herbHa}) = US\\$${save2}.`,
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Compare hand weeding with the use of herbicides by giving **two** advantages of each.",
    hints: ["Think of cash, labour, timeliness, skills and risks."],
    points: [
      "Hand weeding: no cash needed for chemicals / uses family labour.",
      "Hand weeding: no risk of poisoning, pollution, residues or crop damage from chemicals.",
      "Herbicides: fast, saving labour on large areas.",
      "Herbicides: control weeds in the row and in wet weather when hoeing is impossible / pre-emergence keeps the crop clean early.",
    ],
    modelAnswer: "Hand weeding needs no cash for chemicals and carries no risk of poisoning or crop damage. Herbicides are much faster on large areas and can be used in wet weather and within the rows, and a pre-emergence herbicide keeps the crop clean in its first weeks.",
    explanation: "Two advantages of each.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** measures a farmer can combine to control witchweed in a maize field.",
    hints: ["Witchweed seeds live in the soil for many years."],
    points: [
      "Grow trap crops (cowpeas, groundnuts, soya beans, cotton) that cause suicidal germination.",
      "Rotate maize with these non-host crops.",
      "Hand-pull witchweed before it flowers and sets seed, and destroy it.",
      "Improve fertility with manure / nitrogen fertiliser, and use tolerant varieties and clean seed.",
    ],
    modelAnswer: "Rotate the maize with trap crops such as cowpeas or groundnuts, which make witchweed seeds germinate and die; pull up and burn any witchweed before it seeds; add manure and nitrogen fertiliser, which reduces attack; and plant tolerant varieties from clean seed.",
    explanation: "Combine methods because of the long-lived seed store.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `A farmer near Masvingo compares three weed control programmes for 4 ha of maize. Assume labour costs US\\$${WAGE} per person-day.\n\n${PROG_TABLE}`,
    hints: ["Total cost per ha = cash cost + labour days × wage.", "Labour may not be available when it is needed."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total cost per hectare (cash plus labour) of programme B.",
        value: total[1], prefix: "US$", wrong: [15, 20 * WAGE],
        explanation: `15 + 20 × 5 = US\\$${total[1]}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the total cost of programme C for the whole 4 ha.",
        value: c4, prefix: "US$", wrong: [total[2], 4 * 48],
        explanation: `Per ha: 48 + 12 × 5 = US\\$${total[2]}; × 4 = US\\$${c4}.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which programme needs the most labour per hectare?",
        options: [
          ["Hand hoeing twice", "Correct: 50 person-days."],
          ["The ox-drawn cultivator programme", "20 person-days."],
          ["The pre-emergence herbicide programme", "12 person-days."],
          ["The cultivator and herbicide programmes equally", "They differ: 20 and 12."],
        ],
        answer: "A",
        explanation: "Hand hoeing twice needs 50 person-days per hectare.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why programme B still includes one hand weeding.",
        points: ["The cultivator tines work only between the rows.", "Weeds within the row, close to the maize plants, must be removed by hand."],
        explanation: "In-row weeds.",
      }),
      P.manual({
        label: "(e)", marks: 5, stem: "Evaluate which programme the farmer should choose.",
        points: [
          "C is cheapest per hectare (US\\$108) and needs least labour, and the pre-emergence herbicide keeps the crop clean in its critical early weeks.",
          "But C needs cash at planting, a sprayer, protective clothing and skill; risk of crop damage, drift and pollution.",
          "B is almost as cheap (US\\$115), uses no chemicals and is fast if oxen are available, but misses in-row weeds and needs oxen in good condition.",
          "A needs no cash but 50 person-days per ha (200 for 4 ha); weeding is likely to be late in wet weather, so yield is lost.",
          "Judgement: C (or B if cash or skills are lacking), with the choice depending on cash, labour and equipment available.",
        ],
        levels: agricultureLevels(5),
        explanation: "Weigh cost, labour, timeliness and risk and decide.",
      }),
    ],
    explanation: "Compare the costs and suitability of weed control programmes.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: "Chipo wants to clear a garden plot near Harare that is covered with couch grass and blackjack before planting vegetables. A shop offers her a contact herbicide and a systemic, non-selective herbicide.",
    hints: ["Which weed is perennial?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which herbicide should she use to clear the plot?",
        options: [
          ["The systemic, non-selective herbicide", "Correct: it kills both weeds, including couch grass rhizomes."],
          ["The contact herbicide", "Couch grass would regrow from its rhizomes."],
          ["Neither: herbicides cannot kill grasses", "Many herbicides kill grasses."],
          ["Both mixed together at double strength", "Never mix products or exceed label rates without guidance."],
        ],
        answer: "A",
        explanation: "A systemic, non-selective herbicide moves to the rhizomes and kills all the weeds before planting.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the weeds should be sprayed while they are growing actively.",
        points: ["Actively growing leaves absorb the herbicide well.", "The sap is moving, so the herbicide is carried down to roots and rhizomes."],
        explanation: "Absorption and translocation.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** reasons why Chipo must not hoe the couch grass before spraying.",
        points: ["Hoeing cuts the rhizomes into pieces that regrow / spreads them.", "It removes the leaves that would absorb the systemic herbicide."],
        explanation: "Hoeing spreads and removes leaf area.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "After the vegetables are planted, describe **three** non-chemical ways she can keep the plot free of weeds.",
        points: ["Mulch the soil to shade out weed seedlings.", "Hand-pull or hoe young weeds before they set seed.", "Use close spacing / healthy, well-fed crops that cover the ground / use clean compost and seed."],
        explanation: "Cultural and mechanical follow-up.",
      }),
    ],
    explanation: "Choose a herbicide for perennial weeds and plan follow-up weed control.",
  });

  b.card("DEFINITION", "Selective herbicide", "Kills certain plants (e.g. broad-leaved weeds in maize) without seriously harming the crop.");
  b.card("DEFINITION", "Non-selective herbicide", "Kills all green plants it reaches; used before planting or as a directed spray.");
  b.card("DEFINITION", "Systemic (translocated) herbicide", "Absorbed and carried to all parts including roots and rhizomes; can kill perennials.");
  b.card("DEFINITION", "Contact herbicide", "Kills only the parts it touches; perennials regrow from underground organs.");
  b.card("CONCEPT", "Herbicide timing", "Pre-plant (before sowing), pre-emergence (after sowing, before emergence), post-emergence (on emerged weeds).");
  b.card("CONCEPT", "Cultural weed control", "Rotation, correct spacing and timely planting, mulch and soil cover, smother crops, intercropping, good fertility.");
  b.card("CONCEPT", "Controlling witchweed", "Trap crops (legumes, cotton), rotation, hand-pull before seeding, manure and nitrogen, resistant varieties, clean seed.");
  b.card("FORMULA", "Herbicide per tank", "(Product per ha ÷ spray volume per ha) × tank volume.");
  b.card("CONCEPT", "Comparing weed control methods", "Compare cash cost, labour, timeliness, effectiveness on the weeds present, skills and equipment, and risks.");
});
