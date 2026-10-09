// Slice W1a: timber harvesting, deforestation and reforestation (ZIMSEC only).
import { concept, P, pct, pctChange, plantPopulation, fmtNum, table, agricultureLevels } from "../lib.mjs";

const mc = { fresh: 11.7, dry: 9.0 };
const mcValue = pct(mc.fresh - mc.dry, mc.dry);

const loss = { before: 2400, after: 1800 };
const lossPct = -pctChange(loss.before, loss.after);

const replant = plantPopulation({ rowCm: 250, inRowCm: 200, areaHa: 12 });

const POLES = [
  ["Untreated", 40, 26],
  ["Base charred", 40, 15],
  ["Dipped in preservative", 40, 9],
  ["Pressure treated", 40, 1],
];
const untreatedPct = pct(26, 40);
const pressurePct = pct(1, 40);

const WARD = [["Year 1", 3200, 1500], ["Year 10", 2600, 2100], ["Year 20", 1900, 2900]];
const woodLoss = pct(3200 - 1900, 3200);

concept("agri.forestry.timber-deforestation", { file: "forestry/timber-deforestation", keyPrefix: "forestry.timber-deforestation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **reforestation**?",
    options: [
      ["Replanting trees where forest has recently been cut or destroyed", "Correct: trees are put back where forest was lost."],
      ["Planting trees on land that has not had forest for a very long time", "This is afforestation."],
      ["Cutting down all the trees in an area at once", "This is clear felling."],
      ["Drying timber slowly to reduce its moisture", "This is seasoning."],
    ],
    answer: "A",
    explanation: "Reforestation restores recently lost forest; afforestation creates forest on land without it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which harvesting method is most suitable for an indigenous teak forest?",
    options: [
      ["Selective felling of mature, marked trees", "Correct: the forest keeps its cover and regenerates."],
      ["Clear felling of the whole forest at once", "Indigenous forests regenerate slowly; clear felling would destroy them."],
      ["Burning the forest to clear it", "Burning destroys the forest and soil."],
      ["Ring-barking every tree", "Ring-barking kills trees and is not a harvesting method."],
    ],
    answer: "A",
    explanation: "Selective felling removes only chosen trees, protecting the slow-growing indigenous forest.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is freshly sawn timber seasoned before it is used or treated?",
    options: [
      ["Drying reduces rot, warping and weight", "Correct: lower moisture makes timber stable and receptive to treatment."],
      ["Seasoning adds water so the wood does not crack", "Seasoning removes water."],
      ["It makes the timber heavier and therefore stronger", "Seasoned timber is lighter."],
      ["It kills all termites in the forest", "Seasoning affects the timber, not termites in the forest."],
    ],
    answer: "A",
    explanation: "Seasoned timber is lighter, stronger, shrinks and warps less, rots less and absorbs preservatives better.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method of applying preservative gives the deepest penetration into fence poles?",
    options: [
      ["Pressure treatment in a sealed cylinder", "Correct: vacuum and pressure force preservative deep into the wood."],
      ["Brushing the surface once", "Brushing only treats the surface layer."],
      ["Spraying the poles lightly", "Spraying gives shallow protection."],
      ["Wiping the poles with a damp cloth", "This applies no preservative."],
    ],
    answer: "A",
    explanation: "Effectiveness increases from brushing and spraying, to dipping, to soaking, to pressure treatment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a direct effect of deforestation on a catchment?",
    options: [
      ["More soil erosion and siltation of dams", "Correct: without tree cover, soil washes into rivers and dams."],
      ["More water soaking into the soil", "Infiltration falls when forest cover is lost."],
      ["More wild fruits and honey for local people", "These products decline when woodland is cleared."],
      ["Streams flowing later into the dry season", "Streams dry up earlier when catchments are cleared."],
    ],
    answer: "A",
    explanation: "Deforestation exposes soil to erosion, increases runoff, reduces infiltration and silts rivers and dams.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "When felling a tree, where should the notch (wedge) be cut?",
    options: [
      ["On the side facing the direction in which the tree should fall", "Correct: the tree falls towards the notch."],
      ["On the side away from the direction of fall", "The back cut goes on this side, slightly above the notch."],
      ["High up the trunk, above the first branches", "Cuts are made near the base."],
      ["Anywhere on the trunk, because the wind decides the direction of fall", "The notch is cut to control the direction of fall."],
    ],
    answer: "A",
    explanation: "A notch on the side of the fall plus a back cut slightly above it leaves a hinge that guides the tree as it falls.",
    hints: ["The tree falls towards the opening."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a tobacco-growing ward, woodland has shrunk quickly. Which measure would most directly reduce the cause?",
    options: [
      ["Curing tobacco with wood from planted woodlots", "Correct: it replaces wood cut from natural woodland."],
      ["Building more tobacco barns in the woodland", "More barns would need more wood."],
      ["Growing more tobacco on newly cleared land", "This increases clearing and curing fuel demand."],
      ["Burning the woodland to encourage new grass", "Fire kills young trees and adds to the loss."],
    ],
    answer: "A",
    explanation: "Tobacco curing uses large amounts of wood. Using planted woodlots (or other fuels) relieves pressure on natural woodland.",
    hints: ["What do farmers use the woodland's trees for?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A community has lost much of its woodland to firewood cutting. Which plan is most likely to succeed in the long term?",
    options: [
      ["Woodlots, efficient stoves and community rules on cutting", "Correct: it supplies fuel, cuts demand and controls use."],
      ["A complete ban on all firewood use with no alternative fuel supply", "Without an alternative, people must still cook, so the ban will be broken."],
      ["Planting one tree per household once", "One tree per household cannot meet fuel needs."],
      ["Moving cutting to the next ward's woodland", "This shifts deforestation elsewhere."],
    ],
    answer: "A",
    explanation: "Lasting solutions combine supply (woodlots), lower demand (efficient stoves, alternative energy) and management (community by-laws, enforcement).",
    hints: ["Think about supply, demand and control together."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Afforestation means planting trees on land that has not carried forest for a long time.",
    answer: true,
    explanation: "True. Reforestation, by contrast, replants recently lost forest.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Offcuts of preservative-treated timber are safe to burn on a cooking fire.",
    answer: false,
    explanation: "False. Many preservatives are poisonous and release harmful fumes when burnt; treated offcuts must not be used for cooking.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Clear felling", "Cutting all trees in an area at once"],
      ["Selective felling", "Cutting only chosen mature trees"],
      ["Seasoning", "Drying timber to reduce its moisture content"],
      ["Delimbing", "Removing branches from a felled tree"],
      ["Cross-cutting", "Cutting a felled trunk into logs"],
    ],
    explanation: "These are the main harvesting and processing terms.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Timber is attacked by decay {{blank:a}} in damp conditions and by {{blank:b}}, which eat the wood.",
    blanks: [
      { id: "a", accepted: ["fungi"], choices: ["fungi", "viruses", "nematodes", "bacteria"] },
      { id: "b", accepted: ["termites"], choices: ["termites", "aphids", "ticks", "weevils"] },
    ],
    explanation: "Rot is caused by fungi; termites and wood borers eat untreated timber.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the tar-oil wood preservative traditionally used on fence posts and poles.",
    accepted: ["creosote"],
    wrong: ["paint"],
    explanation: "Creosote is an oil-based (tar oil) preservative for poles and posts in contact with the ground.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A ward's woodland fell from ${fmtNum(loss.before)} ha to ${fmtNum(loss.after)} ha. Calculate the percentage loss.`,
    value: lossPct, unit: "%", wrong: [33.3, 75],
    explanation: `Loss = ${fmtNum(loss.before)} − ${fmtNum(loss.after)} = ${loss.before - loss.after} ha. Percentage = ${loss.before - loss.after} ÷ ${fmtNum(loss.before)} × 100 = ${lossPct}%. (Dividing by the new area gives 33.3%, the wrong base.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A freshly sawn plank has a mass of ${mc.fresh} kg; its oven-dry mass is ${mc.dry} kg. Calculate its moisture content as a percentage of the oven-dry mass.`,
    value: mcValue, unit: "%", wrong: [23.1, 2.7],
    explanation: `Water = ${mc.fresh} − ${mc.dry} = ${(mc.fresh - mc.dry).toFixed(1)} kg. Moisture content = ${(mc.fresh - mc.dry).toFixed(1)} ÷ ${mc.dry} × 100 = ${Math.round(mcValue)}%. (Dividing by the fresh mass gives 23.1%, the wrong base.)`,
    workedSolution: `1. Mass of water = ${mc.fresh} − ${mc.dry} = ${(mc.fresh - mc.dry).toFixed(1)} kg.\n2. Moisture content = water ÷ oven-dry mass × 100 = ${(mc.fresh - mc.dry).toFixed(1)} ÷ ${mc.dry} × 100.\n3. = ${Math.round(mcValue)}%.`,
    hints: ["Find the mass of water first.", "Divide by the OVEN-DRY mass."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A community will replant 12 ha of cleared land at a spacing of 2.5 m × 2 m. Calculate the number of seedlings needed.",
    value: replant.total, unit: "plants", wrong: [replant.perHa, 2400],
    explanation: `Area per tree = 2.5 × 2 = 5 m²; trees per ha = 10,000 ÷ 5 = ${fmtNum(replant.perHa)}; for 12 ha = ${fmtNum(replant.total)}.`,
    workedSolution: `1. Area per tree = 2.5 × 2 = 5 m².\n2. Trees per ha = 10,000 ÷ 5 = ${fmtNum(replant.perHa)}.\n3. Trees for 12 ha = ${fmtNum(replant.perHa)} × 12 = ${fmtNum(replant.total)}.`,
    hints: ["Trees per ha = 10,000 ÷ area per tree.", "Then multiply by 12 ha."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how sawn timber is seasoned by air drying.",
    points: [
      "Stack planks off the ground on level bearers.",
      "Place spacers (stickers) between layers so air moves around every plank.",
      "Cover the stack with a roof to keep off rain and direct sun.",
      "Leave it for weeks or months until the moisture content is low enough / weight the top to prevent warping.",
    ],
    modelAnswer: "The planks are stacked on bearers above the ground with thin spacers between layers so air can flow. The stack is roofed to keep off rain and strong sun, weighted on top, and left until the timber has dried to a low moisture content.",
    explanation: "Credit the steps that allow even, protected drying.",
    hints: ["Think about air flow, protection and time."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how deforestation of a hill above a village can lead to the village's spring drying up earlier in the dry season.",
    points: [
      "Removing trees and litter exposes the soil.",
      "Rain runs off quickly instead of soaking in (less infiltration).",
      "Less water recharges the groundwater that feeds the spring.",
      "So the spring's flow falls and it dries up earlier / eroded soil also silts the spring.",
    ],
    modelAnswer: "Without trees and leaf litter, rain hits bare soil and runs off quickly. Less water soaks into the ground to recharge the groundwater that feeds the spring, so the spring's flow falls and it dries up earlier in the dry season.",
    explanation: "A chain of cause and effect from tree loss to spring flow.",
    hints: ["Follow the rainwater: does it soak in or run off?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `A fictional trial tested gum poles set in the ground for five years.\n\n**Table 1**\n\n${table(["Treatment", "Poles set", "Poles failed (rot or termites)"], POLES)}`,
    hints: ["Percentage failed = failed ÷ set × 100."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the percentage of untreated poles that failed.", value: untreatedPct, unit: "%", wrong: [26], explanation: `26 ÷ 40 × 100 = ${untreatedPct}%.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of pressure-treated poles that failed.", value: pressurePct, unit: "%", wrong: [1], explanation: `1 ÷ 40 × 100 = ${pressurePct}%.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why pressure treatment was the most effective.", points: [
        "Pressure forces the preservative deep into the wood.",
        "So the whole pole, not just the surface, is protected from fungi and termites.",
      ], explanation: "Depth of penetration determines protection." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why charring the base of poles reduced failures compared with no treatment.", points: [
        "Charring forms a hard, carbonised outer layer.",
        "Which resists fungi and termites / reduces moisture uptake at the base.",
      ], explanation: "Charring is a traditional, partial protection." }),
      P.manual({ label: "(e)", marks: 2, stem: "State **two** safety precautions when treating poles with preservative.", points: [
        "Wear gloves, overalls and eye protection.",
        "Work in the open air / store chemicals locked away / never burn treated offcuts.",
      ], explanation: "Preservatives are poisonous." }),
    ],
    explanation: `Failures fell from ${untreatedPct}% untreated to ${pressurePct}% pressure-treated.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 2 shows the area of woodland and of cultivated land in a fictional ward.\n\n**Table 2**\n\n${table(["Survey", "Woodland (ha)", "Cultivated land (ha)"], WARD.map(([y, w, c]) => [y, fmtNum(w), fmtNum(c)]))}`,
    hints: ["Percentage decrease = decrease ÷ original × 100.", "For (c), consider several solutions and which matters most."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in woodland between year 1 and year 20. Give your answer to one decimal place.", value: woodLoss, tol: 0.05, answer: String(Math.round(woodLoss * 10) / 10), unit: "%", wrong: [68.4], explanation: `(3,200 − 1,900) ÷ 3,200 × 100 = 1,300 ÷ 3,200 × 100 = ${Math.round(woodLoss * 10) / 10}%.` }),
      P.manual({ label: "(b)", marks: 4, stem: "Use the data to suggest the main cause of the woodland loss, and describe **two** likely effects on the ward.", points: [
        "Cultivated land rose (1,500 to 2,900 ha) as woodland fell: clearing for farming is the main cause.",
        "Effect: soil erosion / siltation of rivers and dams.",
        "Effect: firewood shortages / loss of wild foods, medicines and habitats.",
        "Effect: streams and springs dry up earlier / local climate warmer and drier.",
      ], explanation: "The rise in cultivated land matches the fall in woodland." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss how the ward could reduce further loss of woodland.", points: [
        "Raise yields on existing fields (conservation agriculture, fertiliser) so less new land is cleared.",
        "Plant woodlots for firewood and poles; reforest degraded land.",
        "Use efficient stoves, solar or biogas to cut fuelwood demand.",
        "Community by-laws, permits and enforcement (EMA, Forestry Commission) against illegal cutting and fires; fire guards.",
        "Agroforestry and education on the value of trees.",
        "Reasoned conclusion on the most effective combination (e.g. intensifying farming plus woodlots, since clearing for fields is the main cause).",
      ], levels: agricultureLevels(6), explanation: "Measures should address the cause shown by the data." }),
    ],
    explanation: "Woodland fell by about 40% as cultivated land nearly doubled; solutions must reduce clearing and fuelwood demand.",
  });

  b.card("DEFINITION", "Clear felling", "Cutting all the trees in an area at once, usually in a plantation that is replanted.");
  b.card("DEFINITION", "Selective felling", "Cutting only chosen mature or marked trees, keeping the forest cover.");
  b.card("DEFINITION", "Seasoning", "Drying timber in air or a kiln to lower its moisture content.");
  b.card("FORMULA", "Moisture content of timber", "Moisture content (%) = (fresh mass − oven-dry mass) ÷ oven-dry mass × 100.");
  b.card("CONCEPT", "Preservative application methods", "Brushing, spraying, dipping, soaking, pressure treatment (deepest penetration).");
  b.card("CONCEPT", "Afforestation versus reforestation", "Afforestation: trees on land without forest. Reforestation: replanting recently lost forest.");
  b.card("CONCEPT", "Causes of deforestation", "Clearing for farming, firewood and tobacco curing, fires, settlement, mining, logging, overgrazing.");
  b.card("CONCEPT", "Effects of deforestation", "Erosion, siltation, springs drying, loss of biodiversity, fuelwood shortages, climate change.");
  b.card("CONCEPT", "Safe felling", "Plan the fall, clear an escape route, notch on the fall side, back cut above it; protective clothing; never alone.");
});
