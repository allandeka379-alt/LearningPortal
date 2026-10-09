// Slice W1a: forests and trees in Zimbabwe (ZIMSEC only).
import { concept, P, pct, fmtNum, table, agricultureLevels } from "../lib.mjs";

const plant = { pine: 1800, total: 2400 };
const pinePct = pct(plant.pine, plant.total);

const growth = { height: 21, years: 14 };
const perYear = growth.height / growth.years;

const SAMPLES = [
  ["P", "Needle-like leaves; seeds in cones", "No pores visible on the cut end", "Light, pale"],
  ["Q", "Broad leaves; seeds in pods", "Pores visible on the cut end", "Heavy, reddish-brown"],
  ["R", "Long, narrow leaves; seeds in small woody capsules; tree brought from Australia", "Pores visible on the cut end", "Fairly heavy"],
];

const ESTATE = [["Pine", 1200], ["Eucalyptus", 600], ["Wattle", 200]];
const estateTotal = ESTATE.reduce((s, [, a]) => s + a, 0);
const euPct = pct(600, estateTotal);

concept("agri.forestry.forests-trees", { file: "forestry/forests-trees", keyPrefix: "forestry.forests-trees" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is an **exotic** tree in Zimbabwe?",
    options: [
      ["Eucalyptus", "Correct: eucalyptus (gum) was brought in from Australia."],
      ["Msasa", "Msasa is an indigenous tree of miombo woodland."],
      ["Mopane", "Mopane is indigenous to the hot, low-lying areas."],
      ["Mukwa", "Mukwa is an indigenous hardwood."],
    ],
    answer: "A",
    explanation: "Exotic trees were introduced from other countries: pines, eucalyptus, wattle, jacaranda. Msasa, mopane and mukwa are indigenous.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Softwood timber comes from which kind of tree?",
    options: [
      ["Conifers, which bear cones and have needle-like leaves", "Correct: pines and cypresses give softwood."],
      ["Broad-leaved flowering trees whose seeds are enclosed in fruits", "These give hardwood."],
      ["Any tree that grows in a plantation", "Plantations grow both softwoods (pine) and hardwoods (eucalyptus)."],
      ["Any tree whose wood is easy to cut", "The terms refer to the type of tree, not exactly the hardness."],
    ],
    answer: "A",
    explanation: "Softwoods come from conifers; hardwoods from broad-leaved flowering trees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which part of Zimbabwe are most pine and eucalyptus plantations found?",
    options: [
      ["The Eastern Highlands", "Correct: high rainfall and cool temperatures suit plantation forestry."],
      ["The Lowveld", "The Lowveld is hot and dry; its natural woodland is mopane."],
      ["The Zambezi valley", "The valley is hot and dry, with mopane woodland."],
      ["The Kalahari sands of Matabeleland North", "These carry natural teak forests, not exotic plantations."],
    ],
    answer: "A",
    explanation: "Plantations of pine, eucalyptus and wattle are concentrated in the Eastern Highlands (Nyanga, Chimanimani, Penhalonga), in natural region I.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **ecological** benefit of forests?",
    options: [
      ["Tree roots bind the soil and reduce erosion", "Correct: protecting soil and water is an ecological function."],
      ["Sawmills provide jobs for local people", "This is an economic benefit."],
      ["Sacred groves are used for ancestral ceremonies", "This is a cultural benefit."],
      ["Families collect firewood for cooking", "This is a social (or economic) benefit."],
    ],
    answer: "A",
    explanation: "Ecological importance covers soil protection, water catchments, wildlife habitat, nutrient cycling, windbreaks and carbon dioxide absorption.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which tree forms natural forests on the Kalahari sands of Matabeleland North?",
    options: [
      ["Zambezi teak", "Correct: teak forests with mukwa grow on the Kalahari sands."],
      ["Pine", "Pine is an exotic plantation tree of the Eastern Highlands."],
      ["Black wattle", "Wattle is an exotic tree grown mainly in the Eastern Highlands."],
      ["Jacaranda", "Jacaranda is an exotic ornamental tree in towns."],
    ],
    answer: "A",
    explanation: "Zambezi teak and mukwa form the natural teak forests of Matabeleland North, many of them gazetted state forests.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A timber sample comes from an exotic tree with broad leaves, flowers and small woody seed capsules. How should it be classified?",
    options: [
      ["Hardwood, because it comes from a broad-leaved flowering tree", "Correct: eucalyptus-type trees are hardwoods even though they are exotic."],
      ["Softwood, because all exotic trees are softwoods", "Exotic trees include hardwoods such as eucalyptus and wattle."],
      ["Softwood, because it grows quickly in plantations", "Growth rate does not decide the class."],
      ["Neither, because exotic trees cannot be classified as softwood or hardwood", "Every tree is either a conifer (softwood) or a broad-leaved tree (hardwood)."],
    ],
    answer: "A",
    explanation: "Softwood and hardwood depend on the type of tree: conifers give softwood; broad-leaved flowering trees give hardwood, whatever their origin.",
    hints: ["Does it bear cones or flowers?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are exotic species such as pine widely used in commercial plantations?",
    options: [
      ["They grow fast and give straight, uniform timber", "Correct: quick, uniform growth suits commercial timber production."],
      ["They are the only trees that give hardwood", "Pine gives softwood; indigenous trees such as mukwa give hardwood."],
      ["They need no rainfall at all", "Plantations are placed in high-rainfall areas because the trees need water."],
      ["They are protected by law and cannot be cut", "Plantation trees are grown to be harvested."],
    ],
    answer: "A",
    explanation: "Fast growth and straight, uniform stems make pine and eucalyptus profitable plantation trees, although some exotics use much water or become invasive.",
    hints: ["Think about what a timber company wants from a tree."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A community wants to protect the water supply of a small dam fed by streams from a nearby hill. Which action is most effective?",
    options: [
      ["Keep the hill's catchment under natural forest", "Correct: forest cover reduces runoff and siltation and keeps streams flowing."],
      ["Clear the hill for maize to increase food supply", "Clearing increases erosion and silts the dam."],
      ["Burn the hill each year to remove old grass", "Burning exposes soil to erosion."],
      ["Plant a single row of jacarandas beside the dam", "One row of ornamental trees does little to protect a catchment."],
    ],
    answer: "A",
    explanation: "Forested catchments slow runoff, let water soak in and release it slowly to streams, while preventing erosion and siltation of dams.",
    hints: ["Where does the dam's water come from?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mopane is an indigenous tree found mainly in the hot, low-lying parts of Zimbabwe.",
    answer: true,
    explanation: "True. Mopane woodland covers much of the Lowveld and the Zambezi valley.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All exotic trees grown in Zimbabwe are softwoods.",
    answer: false,
    explanation: "False. Pines are exotic softwoods, but eucalyptus and wattle are exotic hardwoods.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each tree with a main use.",
    pairs: [
      ["Mukwa", "High-quality furniture and carvings"],
      ["Pine", "Building timber, pulp and paper"],
      ["Black wattle", "Tannin from the bark"],
      ["Mopane", "Termite-resistant poles; leaves feed mopane worms"],
      ["Jacaranda", "Ornamental shade in towns"],
    ],
    explanation: "Each tree is valued for particular products or services.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "The natural woodland of much of the central plateau is called {{blank:a}} woodland, dominated by msasa. Trees brought in from other countries are called {{blank:b}} trees.",
    blanks: [
      { id: "a", accepted: ["miombo"], choices: ["miombo", "mopane", "teak", "riverine"] },
      { id: "b", accepted: ["exotic"], choices: ["exotic", "indigenous", "deciduous", "evergreen"] },
    ],
    explanation: "Miombo woodland (msasa, munhondo) covers much of the plateau; introduced trees are exotic.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name **one** indigenous tree whose timber is used for high-quality furniture.",
    accepted: ["mukwa", "zambezi teak", "teak", "kiaat", "bloodwood"],
    wrong: ["pine", "eucalyptus"],
    explanation: "Mukwa and Zambezi teak are prized indigenous hardwoods for furniture.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A plantation of ${fmtNum(plant.total)} ha has ${fmtNum(plant.pine)} ha of pine. Calculate the percentage of the plantation under pine.`,
    value: pinePct, unit: "%", wrong: [133.3, 25],
    explanation: `${fmtNum(plant.pine)} ÷ ${fmtNum(plant.total)} × 100 = ${pinePct}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `A eucalyptus tree reached a height of ${growth.height} m in ${growth.years} years. Calculate its mean height growth, as a number of metres per year.`,
    value: perYear, wrong: [growth.years / growth.height, 294],
    explanation: `Mean growth = ${growth.height} ÷ ${growth.years} = ${perYear} m per year.`,
    workedSolution: `1. Mean growth = total height ÷ number of years.\n2. = ${growth.height} ÷ ${growth.years}.\n3. = ${perYear} m per year.`,
    hints: ["Divide the height by the number of years."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** economic and **two** cultural reasons why forests are important to rural communities in Zimbabwe.",
    points: [
      "Economic: timber, poles or firewood for use or sale.",
      "Economic: non-timber products (honey, fruits, mushrooms, mopane worms, medicines) or jobs/tourism income.",
      "Cultural: sacred forests or trees used for rituals and ancestral ceremonies.",
      "Cultural: trees linked to totems and taboos / wood for carvings and traditional items.",
    ],
    modelAnswer: "Economic: forests supply poles and firewood that families use or sell, and products such as honey and mopane worms that bring income. Cultural: sacred groves are used for rain-making and ancestral ceremonies, and some trees are protected by taboos or linked to totems.",
    explanation: "Two points of each type.",
    hints: ["Economic = income and products; cultural = beliefs and traditions."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Compare softwood and hardwood under **four** headings.",
    points: [
      "Source: softwood from conifers; hardwood from broad-leaved flowering trees.",
      "Leaves: needle- or scale-like (softwood) versus broad (hardwood).",
      "Seeds: in cones (softwood) versus enclosed in fruits (hardwood).",
      "Wood: no vessels/pores (softwood) versus vessels present (hardwood) / growth usually fast versus slower / uses (pulp, building timber versus furniture, flooring).",
    ],
    modelAnswer: "Softwood comes from conifers, hardwood from broad-leaved trees. Conifers have needle-like leaves; hardwood trees have broad leaves. Conifer seeds are in cones; hardwood seeds are in fruits. Softwood has no vessels, while hardwood shows pores (vessels) on the cut end.",
    explanation: "Each heading must give both sides.",
    hints: ["Think of source, leaves, seeds, wood structure, growth and uses."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2",
    stem: `Table 1 describes three timber samples and the trees they came from.\n\n**Table 1**\n\n${table(["Sample", "Tree", "Cut end", "Wood"], SAMPLES)}`,
    hints: ["Cones and needles mean a conifer.", "Pores (vessels) mean a hardwood."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which sample is a softwood?", options: [
        ["Sample P", "Correct: needle-like leaves, cones and no pores."],
        ["Sample Q", "Broad leaves and pores: hardwood."],
        ["Sample R", "Pores and capsules: hardwood."],
        ["None of the samples", "Sample P is a softwood."],
      ], answer: "A", explanation: "Conifers (cones, needles) give softwood without vessels." }),
      P.short({ label: "(b)", marks: 1, stem: "Name a tree that sample R could have come from.", accepted: ["eucalyptus", "gum", "gum tree", "blue gum", "eucalypt"], wrong: ["pine"], explanation: "A broad-leaved tree from Australia with woody capsules: eucalyptus." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why sample R is classed as a hardwood even though the tree is exotic.", points: [
        "It comes from a broad-leaved flowering tree (seeds in capsules, not cones).",
        "Classification depends on the type of tree, not whether it is indigenous or exotic / it has vessels (pores).",
      ], explanation: "Exotic does not mean softwood." }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest **one** suitable use for sample P and **one** for sample Q, giving a reason for each.", points: [
        "P: building timber / boards / boxes / pulp and paper.",
        "Reason: light, easily worked, fast-growing softwood.",
        "Q: furniture / flooring / carvings.",
        "Reason: heavy, dense, attractive and durable hardwood (e.g. mukwa).",
      ], explanation: "Uses follow from the properties of the wood." }),
    ],
    explanation: "P is a softwood (pine); Q and R are hardwoods (an indigenous hardwood and eucalyptus).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 2 shows the area of each species on a fictional timber estate in the Eastern Highlands.\n\n**Table 2**\n\n${table(["Species", "Area (ha)"], ESTATE.map(([s, a]) => [s, fmtNum(a)]))}`,
    hints: ["Percentage = part ÷ total × 100.", "For (c), weigh up the benefits and problems of exotic plantations."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the estate planted to eucalyptus. Give your answer to one decimal place.", value: euPct, tol: 0.05, answer: String(Math.round(euPct * 10) / 10), unit: "%", wrong: [50], explanation: `Total = ${fmtNum(estateTotal)} ha; 600 ÷ ${fmtNum(estateTotal)} × 100 = ${Math.round(euPct * 10) / 10}%.` }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why the estate is located in the Eastern Highlands.", points: [
        "High rainfall (natural region I).",
        "Trees need plenty of water for fast growth.",
        "Steep slopes unsuitable for crops / cool temperatures suit pine.",
        "So forestry is the best use of this land and protects slopes from erosion.",
      ], explanation: "Link climate and slope to forestry." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss the advantages and disadvantages of growing exotic trees in plantations rather than conserving indigenous forest.", points: [
        "Exotic trees grow fast, giving timber, poles and pulp in a short time.",
        "Uniform, straight timber suits sawmills; creates jobs and export income.",
        "Plantations reduce pressure to cut indigenous forests for timber.",
        "But some exotics (eucalyptus) use a lot of water, lowering stream flow.",
        "Some (wattle) spread and become invasive; plantations support fewer wildlife species than indigenous forest (less biodiversity).",
        "Balanced conclusion, e.g. plantations are valuable on suitable land if water use and invasion are controlled and indigenous forests are kept elsewhere.",
      ], levels: agricultureLevels(6), explanation: "A discussion gives both sides and a conclusion." }),
    ],
    explanation: "Exotic plantations are productive but have environmental costs; indigenous forests protect biodiversity.",
  });

  b.card("DEFINITION", "Indigenous tree", "A tree that grows naturally in Zimbabwe, e.g. msasa, mopane, mukwa, muhacha, baobab.");
  b.card("DEFINITION", "Exotic tree", "A tree introduced from another country, e.g. pine, eucalyptus, wattle, jacaranda.");
  b.card("DEFINITION", "Softwood", "Timber from conifers (cones, needle-like leaves, no vessels), e.g. pine.");
  b.card("DEFINITION", "Hardwood", "Timber from broad-leaved flowering trees (seeds in fruits, vessels present), e.g. mukwa, teak, eucalyptus.");
  b.card("FACT", "Where are Zimbabwe's main pine and eucalyptus plantations?", "In the Eastern Highlands (Nyanga, Chimanimani, Penhalonga).");
  b.card("FACT", "Which trees form the natural forests of the Kalahari sands?", "Zambezi teak and mukwa (Matabeleland North).");
  b.card("CONCEPT", "Ecological importance of forests", "Hold soil, protect catchments, provide habitats, act as windbreaks, recycle nutrients, absorb carbon dioxide.");
  b.card("CONCEPT", "Is eucalyptus a softwood?", "No: it is an exotic hardwood (broad-leaved flowering tree).");
  b.card("FACT", "Which woodland covers much of the central plateau?", "Miombo woodland, dominated by msasa and munhondo.");
});
