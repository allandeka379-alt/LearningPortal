// Slice W3a: horticulture and vegetable production (ZIMSEC only; tagged automatically).
import { concept, P, plantPopulation, field, pct, round, money, check, table, fmtNum } from "../lib.mjs";

// Q: rape plants on 9 m x 6 m at 45 x 30 cm.
const rapeF = field(9, 6);
const rape = plantPopulation({ rowCm: 45, inRowCm: 30, areaHa: rapeF.ha });
check(Math.abs(rape.total - 400) < 1e-6, "rape");
// Q: onions on 12 m x 1.5 m at 30 x 10 cm.
const onF = field(12, 1.5);
const onion = plantPopulation({ rowCm: 30, inRowCm: 10, areaHa: onF.ha });
check(Math.abs(onion.total - 600) < 1e-6, "onion");
// Q: potato seed tubers for 0.1 ha at 90 x 30 cm, 50 g each.
const pot = plantPopulation({ rowCm: 90, inRowCm: 30, areaHa: 0.1 });
const potKg = (Math.round(pot.total) * 50) / 1000;
check(Math.round(pot.total) === 3704 && Math.abs(potKg - 185.2) < 1e-9, "pot");

// Struct: damping-off trial.
const DO = [["Not sterilised", 400, 312, 96], ["Burnt with dry grass", 400, 340, 22], ["Solarised under clear plastic", 400, 348, 17]];
const DO_TABLE = table(["Seedbed treatment", "Seeds sown", "Seedlings emerged", "Seedlings that died of damping-off"], DO);
const surv = DO.map(([, , e, d]) => e - d);
const survPct = DO.map(([, s, e, d]) => pct(e - d, s));
check(surv[0] === 216 && Math.abs(survPct[0] - 54) < 1e-9 && Math.abs(survPct[2] - 82.75) < 1e-9, "DO");

// Struct: tomato plot 27 m x 15 m at 90 x 45 cm.
const tomF = field(27, 15);
const tom = plantPopulation({ rowCm: 90, inRowCm: 45, areaHa: tomF.ha });
const stakes = Math.round(tom.total);
const tomSeedlings = stakes * 1.15;
check(Math.abs(tom.total - 1000) < 1e-6 && Math.abs(tomSeedlings - 1150) < 1e-9, "tom");

// Struct: cabbage sales.
const CAB = { heads: 1200, marketablePct: 85, price: 0.6 };
const sold = (CAB.heads * CAB.marketablePct) / 100;
const income = sold * CAB.price;
check(sold === 1020 && Math.abs(income - 612) < 1e-9, "cab");

concept("agri.crops.vegetables", { file: "crops/vegetables", keyPrefix: "crops.vegetables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which branch of horticulture deals with growing vegetables?",
    options: [
      ["Olericulture", "Correct: the growing of vegetables."],
      ["Pomology", "Pomology is fruit growing."],
      ["Floriculture", "Floriculture is flower growing."],
      ["Silviculture", "Silviculture is forestry, not horticulture."],
    ],
    answer: "A",
    explanation: "Olericulture = vegetables; pomology = fruit; floriculture = flowers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is dry grass mulch removed from a nursery bed as soon as the seedlings emerge?",
    options: [
      ["Seedlings growing under it become thin, pale and weak", "Correct: they need light once they emerge."],
      ["The mulch adds far too much nitrogen to the nursery soil", "Dry grass adds very little nitrogen quickly."],
      ["Mulch attracts birds that pull up the seed", "The mulch hides seed from birds rather than attracting them."],
      ["The mulch makes the soil too dry", "Mulch keeps the soil moist."],
    ],
    answer: "A",
    explanation: "Mulch keeps the surface moist for germination; left on, it shades seedlings, which become spindly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which vegetable is normally sown directly in the garden rather than transplanted?",
    options: [
      ["Carrot", "Correct: transplanting damages the taproot, which forks."],
      ["Cabbage", "Cabbage is usually raised in a nursery."],
      ["Tomato", "Tomato is usually raised in a nursery."],
      ["Onion", "Onions are often raised in a nursery and transplanted."],
    ],
    answer: "A",
    explanation: "Root crops such as carrots are sown in rows and thinned.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's tomato fruit have dark, sunken patches at the end opposite the stalk. She waters irregularly. What is the most likely cause?",
    options: [
      ["Blossom-end rot from calcium shortage in the fruit", "Correct: irregular watering limits calcium reaching the fruit."],
      ["Tomato mosaic spread by her hands", "Mosaic causes mottled leaves, not sunken fruit ends."],
      ["Red spider mite feeding on the fruit", "Mites feed on leaves, causing bronzing."],
      ["Too much potassium fertiliser applied as a top dressing", "Excess potassium does not cause these patches."],
    ],
    answer: "A",
    hints: ["Calcium moves to the fruit in water."],
    explanation: "Blossom-end rot follows uneven watering; water evenly and mulch.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cabbage transplants are found cut off at ground level each morning. Which pest is responsible?",
    options: [
      ["Cutworms", "Correct: these caterpillars hide in soil by day and cut stems at night."],
      ["Aphids", "Aphids suck sap from leaves; they do not cut stems."],
      ["Diamondback moth larvae", "They chew holes in leaves."],
      ["Red spider mites", "Mites cause bronzed leaves, not cut stems."],
    ],
    answer: "A",
    hints: ["The damage happens at night at soil level."],
    explanation: "Dig out cutworms near damaged plants and protect transplants with collars round the stems.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are potatoes earthed up during growth?",
    options: [
      ["To keep tubers covered so that they do not turn green", "Correct: green tubers contain a poison."],
      ["To make the plants flower earlier", "Earthing up is about the tubers, not flowering."],
      ["To drain excess water away from the roots after heavy rain", "That is not the main reason."],
      ["To give the plants extra nitrogen", "Soil heaped round the stems adds little nitrogen."],
    ],
    answer: "A",
    hints: ["What happens to tubers exposed to light?"],
    explanation: "Exposed tubers turn green and form a bitter poison; earthing up also protects them from tuber moths.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "When are onions ready to harvest?",
    options: [
      ["When the necks soften and the tops fall over", "Correct: the bulbs have matured."],
      ["As soon as the first flower stalk appears", "Flowering spoils bulbs for storage."],
      ["Two weeks after transplanting", "Bulbs have not formed yet."],
      ["When the leaves are dark green and upright", "This is active growth, before bulbing is finished."],
    ],
    answer: "A",
    explanation: "Lift when most tops have fallen over, then cure in a dry, airy place before storage.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A gardener plants all her cabbage on the same day in October. What is the main marketing problem this causes?",
    options: [
      ["All heads mature together, flooding the market at low prices", "Correct: staggered planting spreads supply."],
      ["The cabbages will not form heads", "Planting date does not stop heading."],
      ["The crop cannot legally be sold at a market such as Mbare Musika", "Any market can take cabbage."],
      ["Cabbage cannot be grown in October", "Cabbage can be grown at this time with water."],
    ],
    answer: "A",
    hints: ["Think about supply over time and perishability."],
    explanation: "Vegetables are perishable: produce that matures all at once must be sold quickly, often at low prices. Staggered sowing gives a steady supply.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Seedlings should be transplanted in the late afternoon or on a cloudy day.",
    answer: true,
    explanation: "True. Less evaporation means less wilting while the roots re-establish.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Fresh manure dug in just before sowing helps carrots to grow long, straight roots.",
    answer: false,
    explanation: "False. Fresh manure causes forked, hairy roots; use well-rotted manure applied for an earlier crop.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each vegetable with its group.",
    pairs: [
      ["Rape (covo)", "Leaf"],
      ["Carrot", "Root"],
      ["Onion", "Bulb"],
      ["Potato", "Tuber"],
      ["Tomato", "Fruit"],
      ["Beans", "Legume"],
    ],
    explanation: "ZIMSEC expects one crop of each group: leaf, root, legume, bulb, tuber and fruit.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Reducing watering and removing shade before transplanting is called {{blank:a}}; replacing transplants that die is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["hardening off", "hardening-off", "hardening"] },
      { id: "b", accepted: ["gapping", "gap filling", "gap-filling", "supplying"] },
    ],
    explanation: "Hardening off prepares seedlings; gapping keeps the full stand.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A plot 9 m × 6 m is planted with rape at 45 cm × 30 cm. How many plants are needed?",
    value: rape.total, unit: "plants", tol: 0.5, answer: "400", wrong: [round(54 / (45 * 30), 3), 1350],
    explanation: `Area = 9 × 6 = 54 m²; area per plant = 0.45 × 0.30 = 0.135 m²; 54 ÷ 0.135 = ${fmtNum(rape.total)} plants.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Onions are transplanted at 30 cm × 10 cm on a bed 12 m long and 1.5 m wide. Calculate the number of seedlings needed.",
    value: onion.total, unit: "plants", tol: 0.5, answer: "600", wrong: [60, 6000],
    hints: ["Bed area ÷ area per plant."],
    explanation: `Bed area = 12 × 1.5 = 18 m²; area per plant = 0.3 × 0.1 = 0.03 m²; 18 ÷ 0.03 = ${fmtNum(onion.total)} seedlings.`,
    workedSolution: `1. Bed area = 12 m × 1.5 m = 18 m².\n2. Area per plant = 0.30 m × 0.10 m = 0.03 m².\n3. Seedlings = 18 ÷ 0.03 = ${fmtNum(onion.total)}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Potatoes are planted at 90 cm × 30 cm on 0.1 ha. Assume each seed tuber has a mass of 50 g. Calculate the mass of seed tubers needed, in kg, to one decimal place. (Round the number of tubers to the nearest whole tuber first.)",
    value: potKg, unit: "kg", tol: 0.05, answer: "185.2", wrong: [round((37037 * 50) / 1000, 1), 3704],
    hints: ["Find the tubers for 0.1 ha, then multiply by the mass of one tuber."],
    explanation: `Tubers per ha = 10,000 ÷ 0.27 = 37,037; for 0.1 ha = 3,704 tubers; 3,704 × 50 g = 185,200 g = ${potKg} kg. Forgetting the 0.1 ha gives the mass for a whole hectare.`,
    workedSolution: `1. Area per tuber = 0.9 × 0.3 = 0.27 m².\n2. 0.1 ha = 1,000 m²; tubers = 1,000 ÷ 0.27 = 3,703.7, about 3,704.\n3. Mass = 3,704 × 50 g = 185,200 g = ${potKg} kg.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the branch of horticulture concerned with growing flowers for sale.",
    accepted: ["floriculture"],
    explanation: "**Floriculture**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons for raising cabbage seedlings in a nursery instead of sowing directly in the garden.",
    hints: ["Think of care, seed and the use of land."],
    points: [
      "Small seedlings can be given close care (watering, shade, pest control) on a small area.",
      "So more seedlings survive and only strong, healthy ones are transplanted.",
      "Small, costly seed is saved because it is sown thinly in drills rather than over the whole garden.",
      "The garden can carry another crop while the seedlings grow, so land is used more intensively.",
    ],
    modelAnswer: "In a nursery the tiny seedlings can be watered, shaded and protected on a small area, so more survive and only the best are planted out. Less seed is wasted, and the garden can be used for another crop for the four to six weeks the seedlings take to grow.",
    explanation: "Reason plus benefit.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how Farai should transplant tomato seedlings so that most of them survive.",
    hints: ["Before, during and after lifting."],
    points: [
      "Harden off the seedlings and water the nursery bed a few hours before lifting.",
      "Lift with a trowel keeping a ball of soil round the roots, holding seedlings by the leaves.",
      "Plant in the late afternoon or on a cloudy day into prepared holes at the correct spacing, firming the soil.",
      "Water immediately, shade if very hot, and replace any that die (gapping).",
    ],
    modelAnswer: "Farai should harden off the seedlings, water the bed before lifting, and lift them with soil on the roots, holding the leaves. He plants them in the late afternoon at the right spacing, firms the soil, waters at once, shades them if it is hot and replaces any that die.",
    explanation: "Steps in order.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Form 1 pupils near Masvingo sowed tomato seed on three nursery beds treated in different ways.\n\n${DO_TABLE}`,
    hints: ["Healthy seedlings = emerged − died.", "Percentage of seeds sown."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of healthy seedlings on the bed that was not sterilised.",
        value: surv[0], unit: "plants", tol: 0, wrong: [312, 96],
        explanation: `312 − 96 = ${surv[0]} seedlings.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the healthy seedlings on the solarised bed as a percentage of seeds sown, to two decimal places.",
        value: survPct[2], unit: "%", tol: 0.005, answer: "82.75", wrong: [87, round(pct(331, 348), 2)],
        explanation: `348 − 17 = ${surv[2]}; ${surv[2]} ÷ 400 × 100 = ${survPct[2]}%.`,
      }),
      P.short({
        label: "(c)", stem: "Name the disease that killed the young seedlings at soil level.",
        accepted: ["damping-off", "damping off", "dampingoff"],
        keywords: { any: ["damping"] },
        explanation: "Damping-off, caused by soil fungi.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the results.",
        points: ["Sterilising (burning or solarisation) killed many of the soil fungi that cause damping-off, so fewer seedlings died.", "Heat also killed weed seeds and pests, and solarisation gave the best result, perhaps because it heated the soil more evenly.", "The unsterilised bed kept its disease organisms, so many seedlings died after emerging."],
        explanation: "Effect of soil sterilisation.",
      }),
    ],
    explanation: "Interpret a nursery sterilisation trial.",
  });
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, marks: 12, calculator: true,
    stem: `Thandeka will grow staked tomatoes on a plot 27 m × 15 m near Mutare, at 90 cm × 45 cm, using one stake per plant. She will raise 15% more seedlings than she needs.`,
    hints: ["Plot area ÷ area per plant.", "Add 15% for spare seedlings."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of stakes she needs.",
        value: stakes, tol: 0, wrong: [round(405 / (90 * 45), 2), 4050],
        explanation: `Area = 27 × 15 = 405 m²; per plant = 0.9 × 0.45 = 0.405 m²; 405 ÷ 0.405 = ${fmtNum(stakes)} plants and stakes.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the number of seedlings she should raise.",
        value: tomSeedlings, unit: "plants", tol: 0.5, answer: "1150", wrong: [1015, 850],
        explanation: `${fmtNum(stakes)} × 1.15 = ${fmtNum(tomSeedlings)} seedlings.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** reasons for staking tomatoes.",
        points: ["Keeps fruit off the soil, reducing rots and soil-borne disease.", "Improves air flow and light, and makes spraying and picking easier."],
        explanation: "Staking.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why tomatoes should not be planted where potatoes grew last season.",
        points: ["Both belong to the same family (Solanaceae).", "So they share soil-borne diseases and pests (bacterial wilt, blights, nematodes) that build up in the soil."],
        explanation: "Rotation by family.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe how Thandeka should look after the tomatoes from transplanting to the first harvest.",
        points: ["Water regularly and evenly (mulch) to avoid blossom-end rot and cracking.", "Weed and top dress with nitrogen/potassium as needed.", "Tie plants to stakes and remove side shoots (prune) as they grow.", "Scout for pests and diseases (red spider mite, bollworm, blights) and control them, observing the waiting period before harvest."],
        explanation: "Management in order.",
      }),
    ],
    explanation: "Plan the planting and management of staked tomatoes.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: `Tatenda harvested ${fmtNum(CAB.heads)} cabbages. Only ${CAB.marketablePct}% were good enough to sell, at an assumed price of US\\$${CAB.price.toFixed(2)} each.`,
    hints: ["Marketable = total × % ÷ 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate his income from the cabbages, in US dollars.",
        value: income, prefix: "US$", wrong: [CAB.heads * CAB.price, sold],
        explanation: `${fmtNum(CAB.heads)} × 85 ÷ 100 = ${fmtNum(sold)} heads; ${fmtNum(sold)} × US\\$0.60 = ${money(income)}.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest **two** reasons why some cabbages could not be sold.",
        points: ["Pest damage (diamondback moth, aphids) or disease (black rot).", "Heads split / were too small / bruised or left too long before harvest."],
        explanation: "Causes of unmarketable heads.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways he could get a better price next season.",
        points: ["Stagger planting so that he sells when prices are higher rather than in a glut.", "Grade and pack attractively / sell directly to schools, supermarkets or Mbare Musika."],
        explanation: "Marketing strategies.",
      }),
    ],
    explanation: "Income from vegetables and how to improve marketing.",
  });

  b.card("DEFINITION", "Branches of horticulture", "Olericulture (vegetables), pomology (fruit), floriculture (flowers and ornamentals).");
  b.card("CONCEPT", "Preparing a nursery bed", "Sheltered site near water; dig, compost, fine tilth, raised 1 m bed; sterilise; drills; mulch; shade; water; thin; harden off.");
  b.card("DEFINITION", "Hardening off", "Reducing water and shade before transplanting so seedlings survive in the field.");
  b.card("FACT", "Directly sown vegetables", "Carrots, beans, peas, potatoes (tubers): large seeds or roots damaged by moving.");
  b.card("FACT", "One vegetable per group", "Leaf: rape/cabbage; root: carrot; legume: beans; bulb: onion; tuber: potato; fruit: tomato.");
  b.card("FACT", "What causes blossom-end rot of tomatoes?", "Calcium shortage in the fruit, made worse by irregular watering.");
  b.card("CONCEPT", "Why earth up potatoes?", "Keeps tubers covered so they do not turn green and poisonous; protects from tuber moth.");
  b.card("CONCEPT", "Marketing perishable vegetables", "Harvest in the cool, grade, pack, transport quickly, stagger planting, keep records.");
  b.card("FACT", "Pest that cuts transplants at ground level", "Cutworms; use stem collars and dig them out.");
});
