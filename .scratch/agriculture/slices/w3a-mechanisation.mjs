// Slice W3a: farm mechanisation (Cambridge only; tagged automatically).
import { concept, P, agricultureLevels, money, round, check, table, pct } from "../lib.mjs";

// Q: days to plough 12 ha.
const oxD = 12 / 0.3;
const trD = 12 / 4;
check(Math.abs(oxD - 40) < 1e-9 && trD === 3, "days");
// Q: depreciation.
const dep = (30000 - 6000) / 12;
check(dep === 2000, "dep");
// Q: break-even area.
const fixed = dep + 1200;
const be = fixed / (68 - 28);
check(fixed === 3200 && be === 80, "be");
// Q: cost per ha owning on 50 ha.
const ownPerHa = (3600 + 30 * 60) / 60;
check(ownPerHa === 90, "own");

// Struct: operations table.
const OPS = [["Ploughing", 6, 0.5], ["Planting", 4, 0.4], ["Weeding and cultivating", 25, 2], ["Harvesting and shelling", 30, 3]];
const OPS_TABLE = table(["Operation", "Person-days per ha by hand or with oxen", "Person-days per ha with a tractor and machines"], OPS);
const totHand = OPS.reduce((s, r) => s + r[1], 0);
const totMach = OPS.reduce((s, r) => s + r[2], 0);
const saved4 = (totHand - totMach) * 4;
check(totHand === 65 && Math.abs(totMach - 5.9) < 1e-9 && Math.abs(saved4 - 236.4) < 1e-9, "ops");

// Struct: co-operative tractor.
const COOP = { price: 36000, life: 10, salvage: 6000, other: 1500, varPerHa: 32, hire: 65, memberHa: 60 };
const cDep = (COOP.price - COOP.salvage) / COOP.life;
const cFixed = cDep + COOP.other;
const cBE = cFixed / (COOP.hire - COOP.varPerHa);
const cOwnCost = cFixed + COOP.varPerHa * COOP.memberHa;
const cHireCost = COOP.hire * COOP.memberHa;
check(cDep === 3000 && cFixed === 4500 && Math.abs(cBE - 136.36) < 0.01 && cOwnCost === 6420 && cHireCost === 3900, "coop");

// Struct: compaction trial.
const CMP = [["No wheel traffic", 1.30, 62], ["Tractor wheel tracks", 1.62, 28]];
const CMP_TABLE = table(["Soil", "Bulk density (g/cm³)", "Water entering the soil in one hour (mm)"], CMP.map(([a, d, w]) => [a, d.toFixed(2), w]));
const infDrop = pct(CMP[0][2] - CMP[1][2], CMP[0][2]);
check(Math.abs(infDrop - 54.84) < 0.01, "cmp");

concept("agri.machinery.mechanisation", { file: "machinery/mechanisation", keyPrefix: "machinery.mechanisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does timeliness mean in farm mechanisation?",
    options: [
      ["Carrying out each operation at the best time for the crop", "Correct."],
      ["Keeping a written daily timetable for the tractor driver to follow", "That is not the meaning."],
      ["Buying machinery when prices are lowest", "That is about purchasing, not timeliness."],
      ["Working the tractor for as many hours as possible", "Long hours are not the definition."],
    ],
    answer: "A",
    explanation: "Timely operations (planting with the first rains, weeding early, harvesting promptly) raise yields.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of using heavy tractors on wet soil?",
    options: [
      ["Soil compaction that reduces drainage and root growth", "Correct: wheels squeeze pore spaces."],
      ["The soil becomes more fertile and better drained", "Compaction does the opposite."],
      ["Weeds are controlled more effectively", "This is not a disadvantage."],
      ["The crop is planted on time", "Timeliness is an advantage."],
    ],
    answer: "A",
    explanation: "Heavy wheels on wet soil compact it, reducing aeration, infiltration and rooting.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does mechanisation help a farmer to obtain higher maize yields in a short rainy season?",
    options: [
      ["Land is prepared and planted quickly after the first rains", "Correct: the crop uses the whole season."],
      ["Tractors add nitrogen to the soil as they plough", "Tractors add no nutrients."],
      ["Machines make the first effective rains fall earlier in the season", "Machines cannot change rainfall."],
      ["Mechanised fields need no weeding", "Weeds still have to be controlled."],
    ],
    answer: "A",
    explanation: "Timely planting avoids yield losses from late planting.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer has 2 ha on a steep, rocky hillside. Which source of power is most suitable?",
    options: [
      ["Hand tools or a small span of draught animals", "Correct: small, steep, rocky fields do not suit tractors."],
      ["A large four-wheel-drive tractor", "Costly, risky on steep slopes and causes erosion."],
      ["A combine harvester", "A combine harvests large fields of grain."],
      ["A fleet of large tractors hired from a contractor", "The area is too small and steep."],
    ],
    answer: "A",
    hints: ["Think of field size, slope and cost."],
    explanation: "Tractors are uneconomic and unsafe on small, steep, rocky fields.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why can mechanisation increase unemployment in rural areas?",
    options: [
      ["Machines do work that many farm workers used to do", "Correct: fewer workers are needed."],
      ["Machines make crops fail, so workers leave", "Mechanisation usually raises output."],
      ["Tractor drivers are not allowed to live on the farms where they work", "There is no such rule."],
      ["Workers must pay to use the machines", "This is not why jobs are lost."],
    ],
    answer: "A",
    hints: ["Who did the work before the machine arrived?"],
    explanation: "Labour-saving machines reduce the number of jobs, which can lead to migration to towns.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which operation is easiest and cheapest for a smallholder to mechanise without owning a tractor?",
    options: [
      ["Shelling maize with a hired or shared sheller", "Correct: a small machine saves much hand labour."],
      ["Combine harvesting of 1 ha of maize", "Combines are uneconomic on tiny fields."],
      ["Deep subsoiling with a large tractor", "Needs a heavy tractor."],
      ["Aerial spraying of a small plot", "Uneconomic and unsuitable."],
    ],
    answer: "A",
    hints: ["Selective mechanisation."],
    explanation: "Selective mechanisation targets laborious operations that small machines can do cheaply.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A farmer with 15 ha can hire a tractor at a lower cost per hectare than owning one, but contractors are always late. What is the best advice?",
    options: [
      ["Weigh the yield lost from late planting against the extra cost of owning", "Correct: timeliness has a value."],
      ["Always buy a tractor, whatever its cost", "Ignores the cost evidence."],
      ["Always hire, because the cost per hectare is lower than the cost of owning", "Ignores the cost of lateness."],
      ["Stop growing crops that need ploughing", "Not a realistic answer."],
    ],
    answer: "A",
    hints: ["Cost per hectare is not the only factor."],
    explanation: "If late hiring costs more in lost yield than the extra cost of owning, owning (or sharing) may pay.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is an advantage of animal draught power over tractors?",
    options: [
      ["Animals provide manure and can breed replacements", "Correct."],
      ["Animals work much faster than tractors", "Tractors are far faster."],
      ["Animals can plough deeper than tractors", "Tractors plough deeper."],
      ["Animals never need feed or care", "Animals need grazing, feed and veterinary care."],
    ],
    answer: "A",
    explanation: "Draught animals are cheap, produce manure, calves, milk and meat, and cause little compaction.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Tractors cost money every year even when they are not being used.",
    answer: true,
    explanation: "True. Depreciation, interest, insurance and housing are fixed costs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mechanisation always suits small farms better than large farms.",
    answer: false,
    explanation: "False. Large, level fields spread the high fixed costs of machines over more hectares.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each level of mechanisation with a typical tool or machine.",
    pairs: [
      ["Hand tool technology", "Hoe and knapsack sprayer"],
      ["Animal draught technology", "Ox-drawn plough and cart"],
      ["Motorised technology", "Tractor and combine harvester"],
    ],
    extraRight: ["Irrigation dam"],
    explanation: "The three levels of farm power.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Mechanising only the operations where it helps most is called {{blank:a}} mechanisation; pressing of soil by heavy wheels is called soil {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["selective", "partial"] },
      { id: "b", accepted: ["compaction"] },
    ],
    explanation: "Selective mechanisation; soil compaction.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Assume a span of oxen ploughs 0.3 ha a day. How many days will it take to plough 12 ha?",
    value: oxD, unit: "days", tol: 0, wrong: [3.6, 4],
    explanation: `12 ÷ 0.3 = ${oxD} days. Multiplying (12 × 0.3 = 3.6) is the wrong operation.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Assume a tractor costs US\\$30,000, lasts 12 years and then has a value of US\\$6,000. Calculate its depreciation per year (straight-line), in US dollars.",
    value: dep, prefix: "US$", wrong: [2500, 3000],
    hints: ["(Cost − final value) ÷ years."],
    explanation: `(30,000 − 6,000) ÷ 12 = ${money(dep)} a year. Ignoring the final value gives US\\$2,500.`,
    workedSolution: `1. Loss of value = US\\$30,000 − US\\$6,000 = US\\$24,000.\n2. Per year = US\\$24,000 ÷ 12 = ${money(dep)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Assume owning a tractor has fixed costs of US\\$3,200 a year and variable costs of US\\$28 per hectare. A contractor charges US\\$68 per hectare. Calculate the break-even area, in ha, above which owning is cheaper than hiring.",
    value: be, unit: "ha", tol: 0, wrong: [round(3200 / 68, 1), round(3200 / 28, 1)],
    hints: ["Each hectare worked with your own tractor saves (hire charge − variable cost)."],
    explanation: `Saving per ha = 68 − 28 = US\\$40; 3,200 ÷ 40 = ${be} ha. Dividing by the hire charge alone (47.1 ha) ignores the variable costs of owning.`,
    workedSolution: `1. Saving per hectare = US\\$68 − US\\$28 = US\\$40.\n2. Break-even area = fixed costs ÷ saving = US\\$3,200 ÷ US\\$40 = ${be} ha.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Assume a tractor has fixed costs of US\\$3,600 a year and variable costs of US\\$30 per hectare. Calculate the cost per hectare of owning it on a 60 ha farm, in US dollars.",
    value: ownPerHa, prefix: "US$", wrong: [60, 30],
    hints: ["Total cost ÷ hectares."],
    explanation: `Total = 3,600 + 30 × 60 = US\\$5,400; ÷ 60 = ${money(ownPerHa)} per ha. Dividing only the fixed costs by the area (US\\$60) leaves out the variable costs.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hard, compacted layer that can form below the surface when land is ploughed to the same depth every year.",
    accepted: ["plough pan", "hardpan", "hard pan", "plow pan", "pan"],
    keywords: { any: ["pan"] },
    explanation: "A **plough pan** (hardpan).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of farm mechanisation.",
    hints: ["Give the advantage and its effect."],
    points: [
      "Timeliness: operations such as planting are done quickly at the right time.",
      "So crops use the whole season and yields are higher.",
      "Larger areas can be farmed / less drudgery / labour shortages overcome.",
      "So output per worker rises / farming is more attractive / peak work is completed.",
    ],
    modelAnswer: "Machines let the farmer plant quickly after the first rains, so the crop uses the whole season and yields more. They also let fewer people farm a larger area, so output per worker rises and peak-season labour shortages are overcome.",
    explanation: "Advantage plus effect.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss **two** disadvantages of mechanisation for a country with many unemployed rural people.",
    hints: ["Think socially and environmentally as well as financially."],
    points: [
      "Machines replace farm workers, increasing unemployment.",
      "Which may cause migration to towns and rural poverty.",
      "Machines, fuel and spare parts are often imported and paid for in foreign currency / high costs.",
      "Heavy machines compact the soil and over-cultivation increases erosion.",
    ],
    modelAnswer: "Mechanisation replaces workers, so rural unemployment rises and people move to towns. Machines, fuel and spares are mostly imported, using scarce foreign currency, and heavy machines can compact and erode the soil.",
    explanation: "Social, economic and environmental costs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farm study compared the labour needed to grow maize by hand and with oxen, and with a tractor and machines.\n\n${OPS_TABLE}`,
    hints: ["Add each column.", "Labour saved = difference × hectares."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total person-days per hectare needed with a tractor and machines.",
        value: totMach, tol: 0.05, answer: "5.9", wrong: [65, 59],
        explanation: `0.5 + 0.4 + 2 + 3 = ${totMach} person-days.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the person-days saved by mechanising a 4 ha maize crop, to one decimal place.",
        value: saved4, tol: 0.05, answer: "236.4", wrong: [59.1, 260],
        explanation: `(65 − 5.9) × 4 = 59.1 × 4 = ${saved4} person-days.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which operation needs the most labour without machines?",
        options: [
          ["Harvesting and shelling", "Correct: 30 person-days per ha."],
          ["Weeding and cultivating", "25 person-days per ha."],
          ["Ploughing", "6 person-days per ha."],
          ["Planting", "4 person-days per ha."],
        ],
        answer: "A",
        explanation: "Harvesting and shelling (30) is the largest figure.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest why a smallholder might mechanise shelling but keep weeding by hand.",
        points: ["Shelling machines are small and cheap to hire or share, and save a great deal of labour.", "Mechanical weeding needs a tractor or ox cultivator and wide rows / herbicides are costly.", "Family labour is available for weeding and the field is small, so hand weeding is affordable."],
        explanation: "Selective mechanisation.",
      }),
    ],
    explanation: "Labour saving by mechanisation and selective mechanisation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 12, calculator: true,
    stem: `A co-operative near Gweru is thinking of buying a tractor. Assume: price US\\$${COOP.price.toLocaleString("en-GB")}, life ${COOP.life} years, final value US\\$${COOP.salvage.toLocaleString("en-GB")}, other fixed costs US\\$${COOP.other.toLocaleString("en-GB")} a year, variable costs US\\$${COOP.varPerHa} per ha. A contractor charges US\\$${COOP.hire} per ha. Members farm ${COOP.memberHa} ha in total.`,
    hints: ["Depreciation = (price − final value) ÷ life.", "Break-even = fixed costs ÷ (hire − variable)."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total fixed costs per year, in US dollars.",
        value: cFixed, prefix: "US$", wrong: [cDep, 5100],
        explanation: `Depreciation = (36,000 − 6,000) ÷ 10 = ${money(cDep)}; + ${money(COOP.other)} = ${money(cFixed)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the break-even area in hectares, to one decimal place.",
        value: cBE, unit: "ha", tol: 0.05, answer: "136.4", wrong: [round(cFixed / 65, 1), round(cFixed / 32, 1)],
        explanation: `${money(cFixed)} ÷ (65 − 32) = ${money(cFixed)} ÷ 33 = ${round(cBE, 1)} ha.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the yearly cost of owning the tractor for the members' 60 ha, in US dollars.",
        value: cOwnCost, prefix: "US$", wrong: [cHireCost, COOP.varPerHa * 60],
        explanation: `${money(cFixed)} + 32 × 60 = ${money(cOwnCost)} (hiring would cost ${money(cHireCost)}).`,
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Discuss whether the co-operative should buy the tractor. Use your answers and other factors.",
        points: [
          "On cost alone hiring is cheaper: 60 ha is well below the break-even area of about 136 ha.",
          "Hiring out the tractor to non-members could raise the area worked towards break-even and earn income.",
          "Owning gives timeliness: members' land is ploughed and planted with the first rains, raising yields.",
          "Owning brings risks: breakdowns, spares, fuel costs, the need for a trained driver and fair sharing among members.",
          "Environmental and social effects: compaction, erosion, fewer jobs for ox-ploughing.",
          "Judgement supported by the figures, e.g. keep hiring unless enough outside work is certain, or buy only if hire services are unreliable.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh costs, timeliness and risks and decide.",
      }),
    ],
    explanation: "Owning or hiring: fixed costs, break-even area and a reasoned decision.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: `Pupils measured the soil in a field where tractors had worked.\n\n${CMP_TABLE}`,
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage decrease in water entering the soil in the wheel tracks, to one decimal place.",
        value: infDrop, unit: "%", tol: 0.05, answer: "54.8", wrong: [34, round(pct(34, 28), 1)],
        explanation: `(62 − 28) ÷ 62 × 100 = ${round(infDrop, 1)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why less water entered the soil in the wheel tracks.",
        points: ["The weight of the wheels pressed soil particles together (higher bulk density).", "So there are fewer and smaller pore spaces for water to enter."],
        explanation: "Compaction.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways of reducing compaction on a mechanised farm.",
        points: ["Avoid working wet soil / use lighter tractors or wider tyres with lower pressure.", "Keep wheels to fixed tracks / rip or subsoil compacted layers / vary ploughing depth."],
        explanation: "Reducing compaction.",
      }),
    ],
    explanation: "Effect of tractor traffic on soil and how to limit it.",
  });

  b.card("DEFINITION", "Farm mechanisation", "Using machines and power other than human muscle (animals, tractors, engines) for farm operations.");
  b.card("FACT", "Levels of farm power", "Hand tools; animal draught; motorised (tractors, engines).");
  b.card("CONCEPT", "Advantages of mechanisation", "Timeliness, larger areas, less drudgery, labour shortages overcome, better quality and new operations.");
  b.card("CONCEPT", "Disadvantages of mechanisation", "Capital and running costs, skills and spares, compaction, erosion, unemployment, unsuited to small/steep fields, pollution.");
  b.card("CONCEPT", "Animal draught vs tractor", "Animals: cheap, manure, breed, slow, shallow. Tractor: fast, deep, costly, compaction, fuel and spares.");
  b.card("FORMULA", "Break-even area for owning a tractor", "Fixed costs ÷ (hire charge per ha − variable cost per ha).");
  b.card("DEFINITION", "Selective mechanisation", "Mechanising only the operations where it helps most, e.g. ploughing or shelling.");
  b.card("CONCEPT", "Choosing a level of mechanisation", "Farm size and fields, capital and credit, labour, crops, hire services, fuel and spares, skills, environment.");
  b.card("DEFINITION", "Timeliness", "Doing each operation at the best time for the crop, e.g. planting with the first rains.");
});
