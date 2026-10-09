// Slice W1a: natural disasters and disaster risk management (ZIMSEC only). No casualty or damage statistics.
import { concept, P, field, pct, money, fmtNum, table, agricultureLevels } from "../lib.mjs";

const prem = { ha: 3, perHa: 2000, rate: 5 };
const premSum = prem.ha * prem.perHa;
const premValue = (premSum * prem.rate) / 100;

const guard = field(500, 300);
const guardHa = (guard.perimeterM * 8) / 10000;

const pay = { sum: 8000, damage: 35 };
const payValue = (pay.sum * pay.damage) / 100;

const SEASONS = [
  ["1", "Normal", 4.2, "None"],
  ["2", "Severe drought", 0.9, "Crop failure"],
  ["3", "Normal", 4.0, "None"],
  ["4", "Hailstorm in January", 2.6, "Leaves shredded"],
];
const droughtDrop = pct(4.2 - 0.9, 4.2);

const FARM = "Sipho farms near a river in eastern Zimbabwe. His homestead, grain store and goat pens are on the flood plain close to the river. His 2 ha of maize are on a steep slope that has been cleared of trees, and his paddocks of dry grass border a busy road where travellers often light fires.";

concept("agri.environment.disasters", { file: "environment/disasters", keyPrefix: "environment.disasters" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **fire guard**?",
    options: [
      ["A cleared strip of land that stops a veld fire spreading", "Correct: with nothing to burn, the fire cannot cross the strip."],
      ["A person employed to watch for fires on a farm", "This is a fire watcher, not a fire guard."],
      ["A metal screen placed around a cooking fire", "This is a domestic fire screen."],
      ["A chemical sprayed on crops and grass to make them fire-proof", "Fire guards are cleared strips, not chemicals."],
    ],
    answer: "A",
    explanation: "Fire guards are cleared, ploughed or burnt strips made before the dry season around boundaries, buildings, woodlots and paddocks.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which natural disaster struck eastern Zimbabwe in March 2019, causing floods and landslides in Chimanimani and Chipinge?",
    options: [
      ["Cyclone Idai", "Correct: Cyclone Idai brought strong winds and torrential rain in March 2019."],
      ["A severe drought", "A drought is a lack of rain; the 2019 disaster in the east brought far too much rain."],
      ["A whirlwind", "Whirlwinds are small and local; they do not cause regional floods and landslides."],
      ["A heat wave", "A heat wave does not cause floods or landslides."],
    ],
    answer: "A",
    explanation: "Cyclone Idai (March 2019) caused flooding, landslides and destruction of crops, livestock, homes and roads in eastern Zimbabwe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which crop is most likely to be ruined by a short hailstorm?",
    options: [
      ["Tobacco, because its large leaves are shredded", "Correct: tobacco's value is in its leaves, which hail tears."],
      ["Groundnuts, because the pods form under the ground", "The pods are protected underground; the leaves may be damaged but the crop usually recovers."],
      ["Cassava, because its roots store water", "Cassava roots are underground and protected from hail."],
      ["Sweet potatoes, because the tubers are large", "The storage roots are underground and protected."],
    ],
    answer: "A",
    explanation: "Hail shreds leaves and bruises fruit. Leaf crops such as tobacco and leafy vegetables suffer most; tobacco is often insured against hail.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a veld fire increase soil erosion on grazing land?",
    options: [
      ["It removes plant cover, leaving soil bare to rain and wind", "Correct: without cover, raindrops and runoff wash soil away."],
      ["It adds organic matter that makes soil slippery", "Fire destroys organic matter on the surface."],
      ["It makes the soil too wet to hold together", "Fire dries the surface rather than wetting it."],
      ["It increases the number of grass roots", "Fire does not increase root numbers in the short term."],
    ],
    answer: "A",
    explanation: "Fire burns the grass and litter that protect the soil, so the next rains cause runoff and erosion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of crop insurance?",
    options: [
      ["To compensate the farmer for losses from named risks", "Correct: the insurer pays out when the insured crop is damaged."],
      ["To stop hail from falling on the crop", "Insurance cannot prevent hail."],
      ["To increase the yield of the crop", "Insurance does not change yield."],
      ["To replace the need for weather forecasts and early warnings", "Forecasts and insurance are both useful; one does not replace the other."],
    ],
    answer: "A",
    explanation: "Farmers pay a premium; if the insured crop is damaged by a named risk such as hail or fire, the insurer compensates them so they can recover.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A weather forecast warns of very heavy rain and possible floods. What should a farmer with cattle on a river flood plain do first?",
    options: [
      ["Move the cattle to higher ground", "Correct: moving animals out of the flood path saves lives."],
      ["Make fire guards around the paddock", "Fire guards protect against fire, not floods."],
      ["Plant drought-tolerant crops on the flood plain", "This does not protect animals from an imminent flood."],
      ["Apply top-dressing fertiliser to the pasture", "Fertiliser would be washed away and does not help animals escape."],
    ],
    answer: "A",
    explanation: "Early warning is useful only if acted on: animals, seed and equipment should be moved away from flood-prone land before the rain arrives.",
    hints: ["What is the immediate danger to the animals?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "During a heat wave, many birds in a closed broiler house die. Which precaution would have been most effective?",
    options: [
      ["Improving ventilation and supplying plenty of cool water", "Correct: moving air and water help birds lose heat."],
      ["Closing all the curtains and doors to keep out hot air", "Closing the house traps heat and makes it worse."],
      ["Adding more birds so they keep each other company", "Overcrowding increases heat production and stress."],
      ["Feeding the birds more at midday", "Digestion produces heat; feeding is better in the cooler hours."],
    ],
    answer: "A",
    explanation: "Heat stress is reduced by ventilation, shade, cool water, lower stocking density and feeding in the cool hours.",
    hints: ["How do birds get rid of heat?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which plan best reduces a farm's risk from drought?",
    options: [
      ["Small grains, water harvesting, stored feed and destocking", "Correct: this combines crops, water, feed and herd decisions."],
      ["Planting only late-maturing maize on all the land", "Late-maturing maize is very vulnerable to drought."],
      ["Keeping as many cattle as possible on the grazing", "Large herds suffer most when grazing and water run out."],
      ["Burning all crop residues to clear the fields early in winter", "Burning removes residues that could feed animals or mulch the soil."],
    ],
    answer: "A",
    explanation: "Drought risk is reduced by drought-tolerant crops, conserving water in the soil, storing feed and reducing herd size before animals lose condition.",
    hints: ["Look for the plan that protects both crops and livestock."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Fire guards should be prepared before the grass dries out at the start of the dry season.",
    answer: true,
    explanation: "True. Fire guards are made early so they are in place when fires become likely.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Insurance prevents hailstorms from damaging a tobacco crop.",
    answer: false,
    explanation: "False. Insurance cannot prevent damage; it compensates the farmer for the loss.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each disaster with a precaution that reduces its effects.",
    pairs: [
      ["Veld fire", "Fire guards around boundaries and paddocks"],
      ["Drought", "Growing sorghum and millets"],
      ["Flood", "Keeping stores and pens off the flood plain"],
      ["Hailstorm", "Insuring high-value crops"],
      ["Heat wave", "Shade and ventilation for livestock"],
    ],
    explanation: "Each precaution targets the way a particular disaster causes damage.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "The regular payment a farmer makes to an insurer is called the {{blank:a}}. Advance information about a coming storm is called early {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["premium"], choices: ["premium", "dividend", "subsidy", "loan"] },
      { id: "b", accepted: ["warning"], choices: ["warning", "planting", "harvest", "maturity"] },
    ],
    explanation: "The premium buys insurance cover; early warning gives time to act.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the natural disaster in which a long period of below-normal rainfall causes crop failure and shortages of grazing and water.",
    accepted: ["drought", "a drought"],
    wrong: ["flood"],
    explanation: "A drought is a long period of below-normal rainfall.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A farmer insures ${prem.ha} ha of tobacco at US\\$${fmtNum(prem.perHa)} per hectare. The premium is ${prem.rate}% of the sum insured. Calculate the premium in US\\$.`,
    value: premValue, prefix: "US$", wrong: [premSum, (prem.perHa * prem.rate) / 100],
    explanation: `Sum insured = ${prem.ha} × ${fmtNum(prem.perHa)} = ${money(premSum)}. Premium = ${prem.rate}% × ${money(premSum)} = ${money(premValue)}. (US\\$100 is the premium for one hectare only.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `A crop is insured for US\\$${fmtNum(pay.sum)}. A hailstorm destroys ${pay.damage}% of it. Assuming the insurer pays the same percentage of the sum insured, calculate the compensation in US\\$.`,
    value: payValue, prefix: "US$", wrong: [pay.sum - payValue],
    explanation: `Compensation = ${pay.damage}% × ${money(pay.sum)} = ${money(payValue)}. (${money(pay.sum - payValue)} is the value of the undamaged part.)`,
    workedSolution: `1. Compensation = ${pay.damage} ÷ 100 × ${fmtNum(pay.sum)}.\n2. = ${money(payValue)}.`,
    hints: ["Find the damaged percentage of the sum insured."],
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "A farmer makes a fire guard 8 m wide along all four sides of a paddock measuring 500 m by 300 m. Ignoring the overlaps at the corners, calculate the area cleared, in hectares.",
    value: guardHa, unit: "ha", wrong: [guard.perimeterM * 8, (guard.perimeterM * 8) / 1000, guard.ha],
    explanation: `Perimeter = 2 × (500 + 300) = ${fmtNum(guard.perimeterM)} m. Area = ${fmtNum(guard.perimeterM)} × 8 = ${fmtNum(guard.perimeterM * 8)} m² = ${guardHa} ha. (${guard.ha} ha is the area of the whole paddock.)`,
    workedSolution: `1. Length of the guard = perimeter = 2 × (500 + 300) = ${fmtNum(guard.perimeterM)} m.\n2. Area = ${fmtNum(guard.perimeterM)} × 8 = ${fmtNum(guard.perimeterM * 8)} m².\n3. In ha: ${fmtNum(guard.perimeterM * 8)} ÷ 10,000 = ${guardHa} ha.`,
    hints: ["The guard runs along the perimeter.", "1 ha = 10,000 m²."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of floods on livestock farming.",
    points: [
      "Animals may drown or be swept away.",
      "Causing direct loss of the herd and income.",
      "Fences, pens, water points or stored feed are destroyed / water-borne diseases and parasites spread.",
      "So animals stray, go short of feed or fall sick (e.g. foot rot, diarrhoea).",
    ],
    modelAnswer: "Floods can drown animals or sweep them away, so the farmer loses part of the herd. They also destroy fences, pens and stored feed, so animals stray and go hungry, and wet conditions spread diseases such as foot rot.",
    explanation: "Each effect earns a mark and its consequence another.",
    hints: ["Think about the animals themselves and the things they depend on."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain how weather forecasts can help a farmer reduce losses from natural disasters. Give **two** examples.",
    points: [
      "Forecasts give advance warning of a hazard (storm, flood, frost, dry season).",
      "Example: moving animals, seed and equipment away from flood-prone land before heavy rain.",
      "Example: seasonal forecast of a dry season → planting drought-tolerant or early-maturing crops / reducing herd size.",
      "Example: harvesting a mature crop early / covering crops before hail or frost / delaying spraying or fertiliser before heavy rain.",
    ],
    modelAnswer: "Forecasts tell farmers in advance what weather is coming, so they can act before damage happens. If heavy rain is forecast, cattle and stored grain can be moved to higher ground. If a seasonal forecast predicts below-normal rain, the farmer can plant sorghum and early-maturing varieties instead of late maize.",
    explanation: "One mark for the principle and up to three for examples of action.",
    hints: ["What can a farmer do with a few days' or a few months' warning?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 shows maize yields on a fictional farm over four seasons.\n\n**Table 1**\n\n${table(["Season", "Weather", "Yield (t/ha)", "Damage"], SEASONS)}`,
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in yield from season 1 to season 2. Give your answer to the nearest whole number.", value: droughtDrop, tol: 0.5, answer: String(Math.round(droughtDrop)), unit: "%", wrong: [21, 367], explanation: `(4.2 − 0.9) ÷ 4.2 × 100 = 3.3 ÷ 4.2 × 100 = ${Math.round(droughtDrop)}%.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the hailstorm in season 4 reduced the yield.", points: [
        "Hail shredded the leaves / broke stems.",
        "So the leaf area for photosynthesis fell and less grain was filled.",
      ], explanation: "Hail reduces leaf area and damages plants." }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest **two** precautions the farmer could take against the disasters shown, and explain each.", points: [
        "Drought: plant drought-tolerant crops (sorghum, millets) / early-maturing varieties / water harvesting.",
        "These yield something even in dry seasons / conserve soil water.",
        "Hail: take out crop insurance (or diversify crops).",
        "Compensation allows the farm to recover after a hail loss.",
      ], explanation: "Match each precaution to the disaster." }),
    ],
    explanation: "Drought caused the largest loss; hail caused a partial loss.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2",
    stem: FARM,
    hints: ["Look for each hazard in the description: flood, landslide or erosion, fire.", "For (b), give measures for each hazard and say which is most urgent."],
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Identify **three** natural disaster risks on Sipho's farm and explain why each is a risk.", points: [
        "Flood risk to the homestead, grain store and goat pens.",
        "Because they are on the flood plain close to the river.",
        "Landslide / severe erosion risk to the maize field during heavy rain or a cyclone.",
        "Because the steep slope has been cleared of trees, so nothing holds the soil.",
        "Veld fire risk to the paddocks.",
        "Because the grass is dry and travellers light fires along the road.",
      ], explanation: "Each risk is linked to a feature in the description." }),
      P.manual({ label: "(b)", marks: 6, stem: "Discuss the precautionary measures Sipho should take, and suggest which is most urgent.", points: [
        "Move the homestead, grain store and pens to higher ground off the flood plain / follow early warnings and move animals before floods.",
        "Replant trees or grass on the steep slope / build contour ridges and storm drains, or use the slope for a woodlot rather than maize.",
        "Make fire guards between the road and the paddocks before the dry season; keep firefighting tools ready.",
        "Insure crops and buildings / keep seed and documents in a safe, raised store.",
        "Follow weather forecasts and have a family disaster plan.",
        "Reasoned judgement on the most urgent measure (e.g. moving the store and pens off the flood plain, because a flood could destroy food, animals and the home at once).",
      ], levels: agricultureLevels(6), explanation: "Credit measures matched to each risk and a justified priority." }),
    ],
    explanation: "Sipho's farm faces flood, slope failure and fire risks; each has practical precautions.",
  });

  b.card("DEFINITION", "Natural disaster", "A natural event (flood, cyclone, drought, fire) causing serious loss of life, property, crops, livestock or livelihoods.");
  b.card("DEFINITION", "Fire guard", "A strip cleared of burnable material (slashed, ploughed or burnt) to stop a veld fire spreading.");
  b.card("DEFINITION", "Insurance premium", "The regular payment made to an insurer in return for compensation if an insured loss occurs.");
  b.card("FACT", "Cyclone Idai", "March 2019: floods and landslides in eastern Zimbabwe, especially Chimanimani and Chipinge.");
  b.card("CONCEPT", "Effects of hail", "Shreds leaves, breaks stems, bruises fruit; leaf crops such as tobacco suffer most.");
  b.card("CONCEPT", "Effects of veld fire", "Destroys grazing, crops, fences, buildings and wildlife; leaves soil bare to erosion.");
  b.card("CONCEPT", "Drought precautions", "Drought-tolerant crops, water harvesting, feed reserves, early destocking, insurance, forecasts.");
  b.card("CONCEPT", "Flood precautions", "Early warning, moving animals and stores off flood plains, contour ridges and storm drains, vegetation on banks.");
  b.card("FORMULA", "Insurance premium", "Premium = sum insured × premium rate (%) ÷ 100.");
});
