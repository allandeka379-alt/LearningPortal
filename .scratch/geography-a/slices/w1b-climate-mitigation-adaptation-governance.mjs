// W1b: climate.mitigation-adaptation-governance (both boards; Zimbabwe-specific items tagged ZIMSEC). Data are illustrative.
// Computed: 8 500 t x US$18 = 153 000; 120 x (1 - 0.40) = 72 Mt; (100 - 72)/100 = 28%; matrix totals 15, 16, 14;
// struct: 7.8/0.6 = 13; 7.8 x 68 = 530.4 Mt; 0.6 x 170 = 102 Mt.
import { concept, P, geographyLevels, chk, rnd, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const cost = chk(8500 * 18, 153000);
const tgt = chk(120 * (1 - 0.4), 72);
const add = chk(((100 - 72) / 100) * 100, 28);
const tot1 = chk(3 + 4 + 5 + 3, 15);
const tot2 = chk(5 + 3 + 5 + 3, 16);
const ratio = chk(7.8 / 0.6, 13);
const eA = rnd(7.8 * 68, 1, 530.4, "eA");
const eB = chk(0.6 * 170, 102);

concept("ageo.climate.mitigation-adaptation-governance", { file: "climate/mitigation-adaptation-governance", keyPrefix: "climate.mitigation-adaptation-governance" }, (b) => {
  mc(b, 1, "RECALL", "What is the role of the IPCC?", [
    ["To review climate science and report to governments", "Correct: it assesses research but does not do research or set policy."],
    ["To enforce national emission limits with heavy fines", "The IPCC has no powers of enforcement."],
    ["To decide the national climate laws of each country", "National laws are made by governments."],
    ["To collect carbon taxes for the United Nations budget", "The IPCC does not collect taxes."],
  ], "The **IPCC** reviews scientific evidence and produces assessment reports that inform the COPs.");
  mc(b, 1, "RECALL", "What is the temperature aim of the Paris Agreement?", [
    ["Well below 2 °C, aiming for 1.5 °C", "Correct: above pre-industrial levels."],
    ["Return to the global temperature of the year 1850", "The aim is to limit warming, not to reverse it."],
    ["Keep warming below 5 °C by the year 2100", "5 °C is far above the agreed aim."],
    ["Stop all variation in rainfall in every region", "The agreement does not target rainfall."],
  ], "The Paris Agreement aims for **well below 2 °C**, pursuing **1.5 °C**.");
  mc(b, 2, "UNDERSTANDING", "Which of the following is an **adaptation** strategy?", [
    ["Building a flood embankment along a river", "Correct: it reduces the effects of floods and does not cut emissions."],
    ["Replacing a coal power station with a solar farm", "This reduces emissions: mitigation."],
    ["Planting trees to absorb carbon dioxide", "This is a mitigation measure (nature-based)."],
    ["Capturing carbon dioxide and storing it underground", "This is a mitigation measure (CCS)."],
  ], "**Adaptation** copes with effects (protection, accommodation, retreat); **mitigation** reduces the cause.");
  mc(b, 2, "UNDERSTANDING", "Which action is an example of a nature-based solution?", [
    ["Restoring mangrove forests along a coast", "Correct: it stores carbon and protects the coast from storms."],
    ["Building a new sea wall of concrete", "A concrete wall is an engineered protection measure."],
    ["Injecting aerosols into the stratosphere", "This is solar radiation management."],
    ["Burning more natural gas instead of coal", "This is a fuel switch, not a nature-based solution."],
  ], "**Nature-based solutions** use or restore ecosystems to store carbon and build resilience.");
  mc(b, 2, "ANALYSIS", "Which is a common criticism of carbon offsetting?", [
    ["The emission cut might have happened anyway", "Correct: this problem is called additionality."],
    ["It always removes more carbon than it should", "Offsets often fail to deliver the claimed benefit."],
    ["It makes the polluter stop emitting at once", "Offsetting lets the polluter continue emitting."],
    ["It is banned in every country that has signed Paris", "Offsets are allowed and widely used."],
  ], "Offsets may not be **additional**, permanent or free from double counting.");
  mc(b, 2, "UNDERSTANDING", "What does carbon capture and storage (CCS) do?", [
    ["Captures CO2 and stores it underground", "Correct: usually from power stations or industry."],
    ["Stores solar energy in large batteries for the night", "That is energy storage, not CCS."],
    ["Plants trees to absorb carbon dioxide", "That is afforestation, not CCS."],
    ["Moves people away from coastal flood zones and rivers", "That is a retreat adaptation strategy."],
  ], "**CCS** captures carbon dioxide and stores it in rock formations.");
  mc(b, 3, "EVALUATION", "Which is a limitation of solar radiation management (SRM)?", [
    ["It does not reduce CO2 or ocean acidification", "Correct: it only masks warming and may alter rainfall."],
    ["It is already used in most countries", "SRM has not been deployed."],
    ["It removes carbon dioxide from the air quickly", "It does not remove CO2."],
    ["It only works at the poles", "SRM is intended to work globally."],
  ], "SRM leaves **CO2 and acidification** unchanged and may change rainfall; it is controversial.", { hints: ["Think of what the technique targets: carbon, or sunlight?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Accommodation, as an adaptation strategy, means moving people away from a hazardous area.", answer: false, daily: true,
    feedbackFalse: "Correct: moving people away is retreat (withdrawal). Accommodation means living with the hazard.",
    feedbackTrue: "Not so: that is retreat. Accommodation includes stilts, flood-proof buildings and drought-tolerant crops.",
    explanation: "**Retreat** = move away; **accommodation** = adjust to live with the hazard; **protection** = defend." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Each country's climate plan under the Paris Agreement is its {{blank:a}} determined contribution. Action to reduce the causes of climate change is {{blank:b}}. Action to cope with its effects is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["nationally"], choices: ["nationally", "globally", "locally"] },
      { id: "b", accepted: ["mitigation"], choices: ["mitigation", "adaptation", "resilience"] },
      { id: "c", accepted: ["adaptation"], choices: ["adaptation", "mitigation", "offsetting"] },
    ], explanation: "Nationally determined contribution; mitigation; adaptation." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each strategy to its type.",
    pairs: [
      ["Moving a village away from the coast", "Adaptation: withdrawal (retreat)"],
      ["Building houses on stilts", "Adaptation: compromise (accommodation)"],
      ["Constructing a sea wall", "Adaptation: protection"],
      ["Switching from coal to wind power", "Mitigation: sustainable energy"],
      ["Restoring a wetland to store carbon", "Mitigation: nature-based solution"],
    ], explanation: "Withdrawal, compromise and protection are the three adaptation types." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A company emits 8 500 tonnes of CO2e and offsets all of it by buying credits at US\\$18 per tonne. Calculate the cost, in US\\$.",
    value: cost, wrong: [472, 8518],
    explanation: "Cost = 8 500 × 18 = **US\\$153 000**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "A country's baseline emissions are 120 million tonnes (Mt) and its NDC promises a 40% cut by 2030. Calculate its target level of emissions, in Mt.",
    hints: ["Find the cut in Mt first, or multiply by (1 − 0.40)."],
    value: tgt, wrong: [48, 80],
    explanation: "Target = 120 × (1 − 0.40) = 120 × 0.60 = **72 Mt**. The value 48 Mt is the size of the cut, not the target level." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%",
    stem: "The country's emissions are now 100 Mt and its 2030 target is 72 Mt. Calculate the further cut needed as a percentage of current emissions.",
    hints: ["Find the difference between current emissions and the target.", "Divide by the current level."],
    value: add, wrong: [38.9, 28.0001],
    explanation: "1. Cut needed = 100 − 72 = 28 Mt.\n2. As a percentage of current emissions: 28 ÷ 100 × 100 = **28%**. Dividing by the target (72) gives 38.9%, the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the international agreement, reached in Paris, that aims to limit global warming to well below 2 °C.",
    accepted: ["Paris Agreement", "the Paris Agreement", "Paris Accord", "Paris climate agreement", "Paris"], wrong: ["Kyoto Protocol"],
    explanation: "The **Paris Agreement** (COP21, 2015)." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the role of the IPCC in the governance of climate change.",
    hints: ["Think about what it produces and who uses it."],
    points: [
      "The IPCC reviews and assesses the published scientific research on climate change (it does not do its own research).",
      "It publishes assessment reports that governments approve, giving an agreed scientific basis for decisions.",
      "These reports inform the UNFCCC and the COP negotiations, for example on temperature limits, but the IPCC does not make policy.",
    ],
    modelAnswer: "The IPCC reviews the scientific literature and publishes assessment reports that governments approve. These give an agreed scientific basis for the UNFCCC and COP negotiations, but the IPCC does not make policy or do its own research.",
    explanation: "Science assessment feeding the political process." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain two limitations of carbon capture and storage (CCS) as a way of reaching net zero.",
    hints: ["Think of cost, scale, energy use and the risk of leakage."],
    points: [
      "It is very expensive and has been built on only a small scale, so it cannot yet remove large quantities of CO2.",
      "Capture uses a lot of energy, so more fuel may be burned to run it (an energy penalty).",
      "Stored CO2 must stay underground for centuries and a leak could release it or contaminate water.",
      "It may give an excuse to continue using fossil fuels instead of cutting emissions at source.",
    ],
    modelAnswer: "CCS is very expensive and has only been used on a small scale, so it does not yet capture large quantities of CO2. The capture process uses a lot of energy, and stored CO2 has to remain in the ground for centuries, which carries a risk of leaks. It may also delay a switch away from fossil fuels.",
    explanation: "Cost and scale, energy penalty, permanence and moral hazard." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how conservation agriculture, such as Pfumvudza/Intwasa, helps Zimbabwean smallholders to adapt to climate change.",
    hints: ["Think about soil moisture, planting dates and yields in dry seasons."],
    points: [
      "Small planting basins or holes concentrate water and nutrients near the plant, so crops can use limited rainfall well.",
      "Mulch covers the soil, which reduces evaporation and keeps the soil moisture for longer in dry spells.",
      "Minimum tillage and rotations protect soil structure and organic matter, which improves infiltration and reduces erosion.",
      "Land is prepared early so that planting can take place on the first rains, and yields are more stable in poor seasons.",
    ],
    modelAnswer: "Planting basins concentrate water and fertiliser near each plant, and mulch cuts evaporation so moisture lasts through dry spells. Minimum tillage and rotations protect the soil and improve infiltration. Because the land is prepared early, farmers can plant on the first rains, and yields are more stable in poor seasons.",
    explanation: "Water harvesting, mulch and early planting raise resilience.", applies: ZIM });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "A farming community in a drought-prone area compares three adaptation options. Scores are from 1 (poor) to 5 (good) and are illustrative.\n\n" + tbl(["Option", "Cost-effectiveness", "Durability", "Local acceptance", "Co-benefits"], [["Borehole with solar pump", 3, 4, 5, 3], ["Drought-tolerant seed", 5, 3, 5, 3], ["Small dam", 2, 5, 3, 4]]),
    hints: ["Add the four scores for each option."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total score for the borehole with solar pump.", value: tot1, wrong: [12, 16],
        explanation: "3 + 4 + 5 + 3 = 15." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total score for drought-tolerant seed.", value: tot2, wrong: [15, 14],
        explanation: "5 + 3 + 5 + 3 = 16." }),
      P.mcq({ label: "(c)", stem: "Which option has the highest total score?", options: [
        ["Drought-tolerant seed", "Correct: 16 against 15 for the borehole and 14 for the dam."],
        ["Borehole with solar pump", "The borehole scores 15."],
        ["Small dam", "The dam scores 14."],
        ["All three are equal", "The totals differ."],
      ], answer: "A", explanation: "Totals: seed 16, borehole 15, dam 14." }),
      P.manual({ label: "(d)", marks: 3, stem: "Evaluate the usefulness of a scoring matrix like this for choosing an option.",
        points: [
          "It makes the criteria clear and lets different options be compared in a simple, transparent way.",
          "The scores are subjective and the totals are close, so a small change in a score could change the result.",
          "It gives every criterion equal weight; the community may value durability or acceptance more, and the best option may be a combination.",
        ],
        modelAnswer: "The matrix is clear and transparent, but the scores are subjective and the totals are very close, so a small change could alter the ranking. It also gives each criterion equal weight, whereas the community may value some criteria more, and a combination of options may be best.",
        explanation: "Strength: transparent comparison. Limits: subjectivity and equal weighting." }),
    ], explanation: "Total the scores, compare, and evaluate the method." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "Illustrative data for two countries:\n\n" + tbl(["", "Country A (high income)", "Country B (low income)"], [["Population (millions)", 68, 170], ["CO2 emissions per person (tonnes per year)", 7.8, 0.6], ["Exposure to floods and drought", "Moderate", "Very high"]]),
    hints: ["Total emissions = emissions per person × population (in millions) gives millions of tonnes."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how many times greater the emissions per person are in Country A than in Country B.", value: ratio, wrong: [7.2, 0.08],
        explanation: "7.8 ÷ 0.6 = 13 times." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total annual emissions of Country A, in million tonnes, to 1 decimal place.", value: eA, dp: 1, wrong: [530, 5304],
        explanation: "7.8 × 68 = 530.4 million tonnes." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the total annual emissions of Country B, in million tonnes.", value: eB, wrong: [10.2, 1020],
        explanation: "0.6 × 170 = 102 million tonnes." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the climate justice issue shown by these data.",
        points: [
          "Country A, which has the larger emissions per person (and a long history of high emissions), is less exposed.",
          "Country B, which has contributed little to the problem, is very exposed to floods and drought.",
          "Country B has fewer resources to adapt, so it is argued that Country A should pay for mitigation, adaptation and loss and damage.",
        ],
        modelAnswer: "Country A has emissions per person 13 times higher but is less exposed, while Country B has contributed little and faces very high exposure with fewer resources. It is argued that Country A has a responsibility to cut its emissions and to provide finance for adaptation and loss and damage.",
        explanation: "Responsibility and impact are unevenly distributed." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest strategies suited to Country B.",
        points: [
          "Adaptation first: early warning systems, flood defences, drought-tolerant crops and water storage to protect people now.",
          "Low-cost, low-carbon development such as solar power and nature-based solutions that also bring local benefits.",
          "Seek international finance and technology transfer under the Paris Agreement and loss and damage funds.",
        ],
        modelAnswer: "Country B should prioritise adaptation such as early warning, flood defences and drought-tolerant crops, develop with low-carbon sources such as solar power and nature-based solutions, and seek international climate finance and technology.",
        explanation: "Emphasise adaptation and low-carbon development supported by finance." }),
    ], explanation: "Compare emissions and exposure and consider justice and appropriate strategies." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the effectiveness of the Paris Agreement in managing climate change.",
    hints: ["Give strengths and limits, with examples.", "Reach a judgement."],
    points: [
      "Strength: almost all countries joined and agreed a shared temperature aim (well below 2 °C, pursuing 1.5 °C).",
      "Strength: every country submits an NDC, updated every five years, and a global stocktake reviews progress.",
      "Strength: it recognised adaptation, finance and later helped to produce agreements such as the loss and damage fund.",
      "Limit: NDCs are voluntary and there are no penalties, so many countries' plans are not enough to meet the temperature aim.",
      "Limit: promised climate finance has often been late or smaller than needed, which reduces trust.",
      "Limit: fossil fuel use is still high and implementation depends on national politics and cost.",
      "The agreement has encouraged faster growth in renewable energy and net-zero pledges, showing real influence.",
      "Judgement: the Paris Agreement is a successful framework for cooperation and transparency, but it has not yet delivered the cuts needed, so its effectiveness has been partial.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The Paris Agreement has strengths: nearly all countries joined, they agreed a clear temperature aim, and each submits and updates a national plan, with a global stocktake to check progress. It has encouraged net-zero pledges, faster growth of renewables and agreements on adaptation and loss and damage. However, national plans are voluntary with no penalty, and together they fall short of the aim; promised finance for developing countries has often been late; and fossil fuel use remains high. I conclude that the agreement is an effective framework for cooperation and transparency but its effectiveness in cutting emissions has so far been partial.",
    wordLimit: { max: 300 }, explanation: "Weigh the framework's strengths against its weaknesses and judge." });

  b.card("DEFINITION", "Mitigation and adaptation", "Mitigation reduces the causes (emissions, or removes CO2). Adaptation copes with the effects (retreat, accommodation, protection).");
  b.card("FACT", "UNFCCC, COP and IPCC", "UNFCCC: treaty agreed 1992 (in force 1994). COP: its annual decision-making meeting. IPCC: set up 1988; reviews science and informs the COPs.");
  b.card("FACT", "Paris Agreement", "COP21, 2015: limit warming to well below 2 °C and pursue 1.5 °C; each country submits an NDC, updated every five years; global stocktake; no penalties.");
  b.card("FACT", "Later COP agreements", "COP26 (2021): phasing down of unabated coal. COP27 (2022): loss and damage fund. COP28 (2023): first global stocktake, transition away from fossil fuels, triple renewables by 2030. COP29 (2024): finance goal of at least US\\$300 billion a year by 2035.");
  b.card("CONCEPT", "Mitigation strategies", "Sustainable energy targets, carbon offsetting and credits, climate engineering (CCS, solar radiation management), nature-based solutions.");
  b.card("CONCEPT", "Adaptation strategies", "Withdrawal (retreat), compromise (accommodation), protection.");
  b.card("CONCEPT", "Problems with carbon offsets", "Additionality (would the cut have happened anyway?), permanence, double counting and leakage; they should supplement, not replace, cuts.");
  b.card("CONCEPT", "Climate justice", "Countries that emitted least are often most vulnerable; debates cover who pays for mitigation, adaptation and loss and damage.");
  b.card("FACT", "Zimbabwe's measures", "Climate Change Response Strategy (2014), National Climate Policy (2017), conservation agriculture (Pfumvudza/Intwasa), solar and Kariba South hydropower, early warning and tree planting.", undefined, { applies: ZIM });
});
