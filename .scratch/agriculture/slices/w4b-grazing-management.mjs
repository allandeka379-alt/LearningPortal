// Slice W4b: grazing systems, stocking rate, veld management (Cambridge only).
import { concept, P, stockingRate, carryingCapacity, round, check, table } from "../lib.mjs";

const sr1 = stockingRate({ lu: 60 * 1 + 40 * 0.5, areaHa: 400 });
check(sr1.luPerHa === 0.2 && sr1.haPerLu === 5, "sr1");
const cc1 = carryingCapacity({ areaHa: 900, haPerLu: 6 });
check(cc1.lu === 150, "cc1");
const rest = 4 * (8 - 1);
check(rest === 28, "rest");
const luMix = round(25 * 1 + 60 * 0.15, 3);
const sr2 = stockingRate({ lu: luMix, areaHa: 170 });
check(luMix === 34 && sr2.haPerLu === 5, "sr2");
const cc2 = carryingCapacity({ areaHa: 1200, haPerLu: 8 });
const over = 185 - cc2.lu;
check(cc2.lu === 150 && over === 35, "over");
// Struct 8: ranch stock list.
const STOCK = [["Cows", 120, 1.0], ["Bulls", 5, 1.2], ["Weaners", 70, 0.5], ["Goats", 100, 0.15]];
const ST = table(["Class", "Number", "LU per animal (assume)"], STOCK.map(([c, n, f]) => [c, n, f.toFixed(2)]));
const ranchLu = round(STOCK.reduce((s, [, n, f]) => s + n * f, 0), 3);
const ranchArea = 1500;
const ranchCc = carryingCapacity({ areaHa: ranchArea, haPerLu: 7.5 });
const ranchSr = stockingRate({ lu: ranchLu, areaHa: ranchArea });
check(ranchLu === 176 && ranchCc.lu === 200 && round(ranchSr.haPerLu, 2) === 8.52, "ranch");

concept("agri.pasture.grazing-management", { file: "pasture/grazing-management", keyPrefix: "pasture.grazing-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which grazing system is fodder cut and carried to animals kept in pens?",
    options: [
      ["Zero grazing", "Correct: animals do not graze the pasture."],
      ["Paddock grazing", "Animals graze fenced paddocks in turn."],
      ["Continuous grazing", "Animals graze the same area all the time."],
      ["Strip grazing", "Animals graze a fresh strip behind a moved fence."],
    ],
    answer: "A",
    explanation: "Zero grazing (cut and carry) brings fodder to penned animals.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is carrying capacity?",
    options: [
      ["The number of LU land can support without damage", "Correct."],
      ["The number of animals that are actually kept on the land", "That is the stocking rate."],
      ["The mass of grass cut from one hectare", "That is a yield."],
      ["The amount of water a dam can store", "Not a grazing term."],
    ],
    answer: "A",
    explanation: "Carrying capacity is what the land can support long-term; stocking rate is what is actually on it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does rotational grazing improve veld?",
    options: [
      ["Each area is rested so grasses recover", "Correct: they rebuild reserves and set seed."],
      ["Animals eat more of every plant each day", "The aim is even grazing, not overgrazing."],
      ["No fencing or herding is ever needed", "Rotation needs fencing or herding."],
      ["It removes the need for any water points", "Water is needed in each area."],
    ],
    answer: "A",
    explanation: "Rest lets grasses regrow, rebuild root reserves and set seed, so good perennial grasses survive.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a consequence of long-term overstocking of veld?",
    options: [
      ["Bush encroachment and soil erosion", "Correct: weak grass cover lets bush in and soil wash away."],
      ["Taller, denser palatable perennial grasses", "These are grazed out."],
      ["Fewer worms because grass is short", "Worm burdens increase."],
      ["More fuel for controlled burns", "Less grass means less fuel."],
    ],
    answer: "A",
    hints: ["What happens to grass cover?"],
    explanation: "Overgrazing kills good grasses, leaves bare soil that erodes, and lets bush seedlings grow without competition.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A stocking rate of 0.2 LU/ha is the same as:",
    options: [
      ["5 ha per LU", "Correct: 1 ÷ 0.2 = 5."],
      ["0.2 ha per LU", "That inverts the units incorrectly."],
      ["2 ha per LU", "1 ÷ 0.2 is not 2."],
      ["20 ha per LU", "1 ÷ 0.2 is not 20."],
    ],
    answer: "A",
    hints: ["LU/ha and ha/LU are reciprocals."],
    explanation: "ha/LU = 1 ÷ (LU/ha) = 1 ÷ 0.2 = 5.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "When is a controlled burn of veld most likely to be useful?",
    options: [
      ["Where much old, dead grass has built up", "Correct: removes moribund grass and checks bush."],
      ["Every year on every part of the farm", "Too-frequent burning degrades veld."],
      ["In windy weather in the middle of the dry season", "Fires become uncontrollable."],
      ["Where the grass is short and sparse", "Too little fuel; exposes soil."],
    ],
    answer: "A",
    hints: ["Think of fuel and the purpose of burning."],
    explanation: "Burn only where there is plenty of old grass, in calm conditions, with fireguards, then rest the area.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A rancher's veld has thick thorn bush and poor grass. Which combination is most likely to improve it over several years?",
    options: [
      ["Clear bush, keep goats and stock at capacity", "Correct: removes bush and lets grass recover."],
      ["Add more cattle so that they trample down the bush", "Overstocking makes encroachment worse."],
      ["Burn the whole ranch every year", "Frequent fires weaken grasses and expose soil."],
      ["Stop all grazing for good", "Wastes feed; a short rest is enough."],
    ],
    answer: "A",
    hints: ["Why did the bush thicken in the first place?"],
    explanation: "Bush encroachment follows overgrazing; clearing bush, using browsers and correct stocking let grass compete again.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which system gives the highest output per hectare but needs the most inputs?",
    options: [
      ["Intensive grazing of improved pasture", "Correct: fertilised, often irrigated, high stocking."],
      ["Extensive grazing of natural veld", "Low input and low output per hectare."],
      ["Unenclosed communal grazing", "Usually low output per hectare."],
      ["Continuous grazing of veld", "Low input, often degraded."],
    ],
    answer: "A",
    explanation: "Intensive systems use improved, fertilised pasture with high stocking rates.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Burnt veld should be grazed immediately so animals can eat the new shoots.",
    answer: false,
    explanation: "False. Rest the burnt area until grass regrows; grazing at once damages the new shoots.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each grazing system with its description.",
    pairs: [
      ["Paddock grazing", "Fenced camps grazed in turn and rested"],
      ["Strip grazing", "Movable electric fence gives a fresh strip daily"],
      ["Zero grazing", "Fodder cut and carried to penned animals"],
      ["Continuous grazing", "Animals graze the whole area all year"],
      ["Extensive grazing", "Large areas of veld at a low stocking rate"],
    ],
    explanation: "Learn each system and an advantage and disadvantage of each.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula for paddock grazing.",
    template: "Rest period = days grazed in each paddock × (number of paddocks − {{blank:a}})",
    blanks: [{ id: "a", accepted: ["1", "one"] }],
    explanation: "Each paddock rests while the other n − 1 are grazed.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the strip of land cleared or burnt in advance to stop a controlled fire spreading.",
    accepted: ["fireguard", "fire guard", "firebreak", "fire break", "fire belt", "fire line"],
    keywords: { any: ["fireguard", "fire guard", "firebreak", "fire break", "fire belt", "fire line"] },
    explanation: "A **fireguard** (firebreak).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A herd is moved around 8 paddocks, spending 4 days in each. For how many days is each paddock rested?",
    value: rest, unit: "days", tol: 0, wrong: [32, 4 * 8 + 4],
    explanation: `4 × (8 − 1) = ${rest} days. 32 days is the whole cycle, not the rest.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A farm of 400 ha carries 60 cows and 40 weaned calves. Assume a cow is 1 LU and a weaned calf 0.5 LU. Calculate the stocking rate in hectares per LU.",
    value: sr1.haPerLu, unit: "ha/LU", tol: 0, wrong: [sr1.luPerHa, 4],
    hints: ["Total LU first, then area ÷ LU."],
    explanation: `LU = 60 + 40 × 0.5 = 80; 400 ÷ 80 = ${sr1.haPerLu} ha/LU (= ${sr1.luPerHa} LU/ha). Counting every animal as 1 LU gives 4 ha/LU.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Veld on a 900 ha ranch needs about 6 ha per LU (assume). Calculate its carrying capacity in LU.",
    value: cc1.lu, unit: "LU", tol: 0, wrong: [900 * 6, round(6 / 900, 4)],
    explanation: `900 ÷ 6 = ${cc1.lu} LU.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "A farmer keeps 25 cows (1 LU each) and 60 goats (assume 0.15 LU each) on 170 ha. Calculate the stocking rate in ha per LU.",
    value: sr2.haPerLu, unit: "ha/LU", tol: 0, wrong: [round(170 / 85, 1), round(luMix / 170, 2)],
    hints: ["Convert goats to LU before adding."],
    explanation: `LU = 25 × 1 + 60 × 0.15 = 25 + 9 = ${luMix}; 170 ÷ ${luMix} = ${sr2.haPerLu} ha/LU.`,
    workedSolution: `1. Cows = 25 × 1 = 25 LU.\n2. Goats = 60 × 0.15 = 9 LU.\n3. Total = ${luMix} LU.\n4. Stocking rate = 170 ÷ ${luMix} = ${sr2.haPerLu} ha per LU.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A ranch of 1,200 ha needs about 8 ha per LU (assume) and carries 185 LU. By how many LU is it overstocked?",
    value: over, unit: "LU", tol: 0, wrong: [cc2.lu, 185 - 1200 / 6],
    hints: ["Carrying capacity = area ÷ ha per LU."],
    explanation: `Carrying capacity = 1,200 ÷ 8 = ${cc2.lu} LU; 185 − ${cc2.lu} = ${over} LU too many.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which fencing a farm into paddocks improves the use of pasture.",
    hints: ["Think of grazing pressure and rest."],
    points: [
      "Grazing can be controlled so each paddock is grazed evenly for a short time.",
      "Then rested so grasses regrow, rebuild reserves and set seed (better grasses survive).",
      "Different classes of stock can be separated / grazing reserved for the dry season.",
      "So the best feed goes to animals with the highest needs / feed is available when veld is short / rested paddocks lose worm larvae.",
    ],
    modelAnswer: "Paddocks let the farmer graze each area evenly for a few days and then rest it, so the grasses recover and good species survive. They also allow young stock to be given the best grazing and some paddocks to be kept as a reserve for the dry season.",
    explanation: "Two developed ways.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the advantages and disadvantages of zero grazing for a smallholder dairy farmer.",
    hints: ["Labour, manure, land, feed quality."],
    points: [
      "Advantage: high output from a small area; pasture is not trampled or wasted.",
      "Advantage: manure is collected for crops; cows can be observed closely; fewer ticks and worms from pasture.",
      "Disadvantage: high labour to cut, carry and feed fodder daily and to clean pens.",
      "Disadvantage: fodder crops must be grown all year (costs, irrigation); housing needed; judgement that it suits small, high-value dairy units with family labour.",
    ],
    modelAnswer: "Zero grazing gets a lot of milk from a small area, avoids trampling and lets manure be collected and cows watched closely. But fodder must be cut and carried every day, pens cleaned and fodder grown all year, so it suits a small dairy with plenty of family labour.",
    explanation: "Balanced discussion with a judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A ranch of ${ranchArea.toLocaleString("en-GB")} ha near Hwange has the stock below. The veld needs about 7.5 ha per LU (assume).\n\n${ST}`,
    hints: ["LU = number × LU factor, added for all classes.", "Carrying capacity = area ÷ ha per LU."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total livestock units on the ranch.",
        value: ranchLu, unit: "LU", tol: 0, wrong: [295, round(120 + 6 + 35, 0)],
        explanation: `120 × 1 + 5 × 1.2 + 70 × 0.5 + 100 × 0.15 = 120 + 6 + 35 + 15 = ${ranchLu} LU. Counting animals instead of LU gives 295.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the carrying capacity of the ranch in LU.",
        value: ranchCc.lu, unit: "LU", tol: 0, wrong: [ranchArea * 7.5],
        explanation: `${ranchArea.toLocaleString("en-GB")} ÷ 7.5 = ${ranchCc.lu} LU.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the stocking rate in ha per LU, to one decimal place.",
        value: round(ranchSr.haPerLu, 1), unit: "ha/LU", tol: 0.05, answer: "8.5", wrong: [round(ranchSr.luPerHa, 2), 7.5],
        explanation: `${ranchArea.toLocaleString("en-GB")} ÷ ${ranchLu} = ${round(ranchSr.haPerLu, 2)}, about 8.5 ha per LU.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "A drought is forecast and the veld may support only about half its usual stock. Suggest and explain what the rancher should do.",
        points: ["Reduce stock numbers early (sell weaners, old or unproductive animals) to roughly half the usual carrying capacity (about 100 LU).", "Selling early gets better prices and condition than selling starving animals later / prevents deaths.", "Protects the veld from overgrazing so it recovers after the drought; keep reserve grazing or buy supplements for the core breeding herd."],
        explanation: "Destock early and protect the veld.",
      }),
    ],
    explanation: "Calculate livestock units, carrying capacity and stocking rate, and plan for drought.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 6,
    stem: "On a farm near Gweru, one camp has thick, grey, old grass that cattle avoid and young thorn bushes are spreading. A neighbour burns his whole farm every year in windy weather in August.",
    hints: ["Compare a planned burn with the neighbour's practice."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** benefits of a controlled burn in the camp with old grass.",
        points: ["Removes old, unpalatable grass so cattle eat the fresh regrowth.", "Kills young thorn bushes / helps control bush encroachment (and some ticks)."],
        explanation: "Grazing quality and bush control.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe **two** precautions for the controlled burn.",
        points: ["Prepare fireguards around the camp and warn neighbours; burn in calm weather with people ready to control it.", "Rest the camp from grazing afterwards until the grass has regrown."],
        explanation: "Containment and rest.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the neighbour's practice is a misuse of fire.",
        points: ["Burning every year weakens perennial grasses and leaves soil bare for long periods, causing erosion.", "Windy conditions make fires uncontrollable, destroying dry-season grazing, fences, trees and property."],
        explanation: "Frequency and conditions.",
      }),
    ],
    explanation: "Evaluate the use and misuse of fire in veld management.",
  });

  b.card("DEFINITION", "Livestock unit (LU)", "A standard for comparing grazing needs; commonly one mature cow of about 450 kg; other animals count as fractions.");
  b.card("DEFINITION", "Stocking rate", "The number of LU actually kept on an area: LU/ha or ha/LU.");
  b.card("DEFINITION", "Carrying capacity", "The number of LU an area can support long-term without damaging vegetation or soil.");
  b.card("FORMULA", "Carrying capacity", "Carrying capacity (LU) = area (ha) ÷ hectares needed per LU.");
  b.card("FORMULA", "Rest period in paddock grazing", "Rest = days per paddock × (number of paddocks − 1).");
  b.card("CONCEPT", "Dangers of overstocking", "Good grasses die out, erosion, bush encroachment, underfed animals, more worms, long-term land degradation.");
  b.card("CONCEPT", "Methods of bush control", "Mechanical clearing, chemical (arboricides), browsers such as goats, fire, correct stocking.");
  b.card("CONCEPT", "Correct use of fire", "Burn only where old grass has built up, in calm weather, with fireguards; rest the area afterwards.");
  b.card("CONCEPT", "Zero grazing", "Cut-and-carry feeding of penned animals: high output per hectare and manure collected, but high labour.");
});
