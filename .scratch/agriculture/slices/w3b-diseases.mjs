// Slice W3b: plant diseases: fungi, bacteria, viruses; symptoms, spread and control.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: incidence 9 of 120.
const inc = pct(9, 120);
check(Math.abs(inc - 7.5) < 1e-9, "inc");
// Structured: grey leaf spot survey, 250 plants each week.
const WEEKS = [[1, 5], [2, 15], [3, 35], [4, 60]];
const N = 250;
const W_TABLE = table(["Week", "Plants examined", "Plants with grey leaf spot lesions"], WEEKS.map(([w, d]) => [w, N, d]));
const wPct = WEEKS.map(([, d]) => pct(d, N));
check(Math.abs(wPct[3] - 24) < 1e-9 && Math.abs(wPct[1] - 6) < 1e-9, "weeks");
const ppRise = wPct[3] - wPct[1];
check(Math.abs(ppRise - 18) < 1e-9, "rise");

concept("agri.protection.diseases", { file: "protection/diseases", keyPrefix: "protection.diseases" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these crop diseases is caused by a **virus**?",
    options: [
      ["Maize streak", "Correct: maize streak virus, carried by leafhoppers."],
      ["Grey leaf spot", "Grey leaf spot is a fungal disease of maize."],
      ["Early blight", "Early blight of tomato is caused by a fungus."],
      ["Bacterial wilt", "As its name says, it is caused by a bacterium."],
    ],
    answer: "A",
    explanation: "Maize streak and tobacco mosaic are virus diseases; grey leaf spot and early blight are fungal; bacterial wilt is bacterial.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which insects spread maize streak virus from plant to plant?",
    options: [
      ["Leafhoppers", "Correct: they pick up the virus when feeding on infected maize and grasses."],
      ["Grain weevils", "Weevils attack stored grain; they do not carry maize streak."],
      ["Termites", "Termites chew roots and stems; they are not its vector."],
      ["Stalk borer moths", "The moths lay eggs; they do not spread the virus."],
    ],
    answer: "A",
    explanation: "Maize streak virus is transmitted by leafhoppers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which symptom is typical of a **virus** disease of plants?",
    options: [
      ["Light and dark green mottling of the leaves", "Correct: a mosaic is a classic virus symptom."],
      ["Orange powdery pustules on the leaves", "Rust pustules are fungal."],
      ["White fluffy growth on rotting fruit", "Fluffy mould growth is fungal."],
      ["Milky ooze streaming from a cut stem", "Bacterial ooze shows a bacterial wilt."],
    ],
    answer: "A",
    explanation: "Viruses cause mosaics, streaks, leaf curl and stunting; fungi produce visible spores and growth; bacteria ooze.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why must a **protectant** (contact) fungicide be sprayed again after heavy rain?",
    options: [
      ["The rain washes the protective layer off", "Correct: it works only as a surface layer."],
      ["Rain turns the fungicide into a fertiliser", "Rain does not change the chemical in that way."],
      ["The fungicide only works on wet days", "Its activity does not depend on rain."],
      ["Rain carries the fungicide deep into the sap", "Protectants are not absorbed; that is systemic action."],
    ],
    answer: "A",
    explanation: "Protectant fungicides stay on the surface and kill spores before infection, so they must be renewed after rain and on new growth.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are workers in a tomato seedbed told not to smoke or handle tobacco products while working?",
    options: [
      ["Tobacco mosaic virus in tobacco can pass to plants on hands", "Correct: the virus survives in dried tobacco and spreads mechanically."],
      ["Smoke from cigarettes kills the tomato seedlings", "This is not the reason given."],
      ["Nicotine on the fingers attracts leafhoppers to the bed", "Leafhoppers are not the concern here."],
      ["Ash from the cigarettes makes the seedbed soil too acid", "Ash is not the issue."],
    ],
    answer: "A",
    hints: ["How does tobacco mosaic virus usually spread?"],
    explanation: "TMV is very stable and spreads on hands, tools and clothing; it can come from tobacco products. Washing hands with soap helps.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does rotating tomatoes with maize for several seasons help to control bacterial wilt?",
    options: [
      ["The bacteria in the soil die out without a host", "Correct: maize is not a host of the wilt bacteria."],
      ["Maize roots release a fungicide into the soil", "Bacteria are not fungi, and maize does not do this."],
      ["Maize kills the leafhoppers that spread the wilt", "Leafhoppers carry maize streak, not bacterial wilt."],
      ["The bacteria move into the maize and leave the soil", "Maize is not a host."],
    ],
    answer: "A",
    hints: ["Where do the wilt bacteria survive between crops?"],
    explanation: "Bacterial wilt is soil-borne; growing non-host crops starves it of hosts so numbers fall.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Grey leaf spot is most severe in fields where maize follows maize and the old leaves are left on the surface. What is the best explanation?",
    options: [
      ["The fungus survives on the residue and infects the new crop", "Correct: infected residue is the source of spores."],
      ["The old leaves shade the new crop so that it cannot grow well", "Shading is not the cause of the disease."],
      ["Maize residue attracts the leafhoppers that carry it", "Grey leaf spot is fungal, not spread by leafhoppers."],
      ["Residue makes the soil too acid for healthy maize roots", "This does not explain a leaf-spot disease."],
    ],
    answer: "A",
    hints: ["Where does a fungus wait between seasons?"],
    explanation: "Spores from infected residue infect the next maize crop, especially in warm, humid weather; rotation breaks the cycle.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Green tomato plants wilt suddenly although the soil is moist. A cut stem placed in a glass of water releases milky threads. Which conclusion and action are correct?",
    options: [
      ["Bacterial wilt; uproot and destroy the plants", "Correct: there is no chemical cure."],
      ["Water shortage; irrigate the crop more often", "The soil is moist and the ooze shows bacteria."],
      ["A fungal leaf spot; spray a protectant fungicide", "The leaves are not spotted, and fungicides do not cure bacteria."],
      ["Tobacco mosaic virus; spray an insecticide", "TMV causes mottling, not sudden wilt and ooze."],
    ],
    answer: "A",
    hints: ["Which group of organisms produces ooze from a cut stem?"],
    explanation: "Sudden wilt in moist soil and bacterial streaming indicate bacterial wilt. Remove and destroy plants and rotate with non-hosts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer sprays a systemic fungicide on maize showing maize streak, but the streaks keep spreading. Why did the spray fail?",
    options: [
      ["Fungicides do not act on viruses inside cells", "Correct: maize streak is a virus disease."],
      ["Systemic fungicides are washed off by rain", "Systemic fungicides are absorbed, but the disease is not fungal anyway."],
      ["He should have used a protectant fungicide", "No fungicide controls a virus."],
      ["Leafhoppers digest the fungicide before it works", "This is not how the disease works."],
    ],
    answer: "A",
    hints: ["What type of organism causes maize streak?"],
    explanation: "Viruses multiply only inside living cells and are not killed by fungicides; use resistant varieties and control leafhoppers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Fungal spores can be carried long distances by wind.",
    answer: true,
    explanation: "True. Wind spreads the spores of rusts and leaf spots between fields.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A virus disease of a crop can be cured by spraying a copper-based fungicide.",
    answer: false,
    explanation: "False. No chemical cures a plant virus; control is by resistant varieties, hygiene and vector control.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each disease with its cause or means of spread.",
    pairs: [
      ["Grey leaf spot of maize", "Fungus favoured by warm, humid weather"],
      ["Bacterial wilt of tomato", "Soil-borne bacterium entering through roots"],
      ["Maize streak", "Virus carried by leafhoppers"],
      ["Tobacco mosaic", "Virus spread on hands and tools"],
      ["Early blight of tomato", "Fungus making dark ringed spots"],
    ],
    explanation: "Know the organism and spread of each named disease.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Fungi can enter leaves through pores called {{blank:a}}, while viruses enter only through {{blank:b}}, usually made by a feeding insect.",
    blanks: [
      { id: "a", accepted: ["stomata", "stoma", "stomates"] },
      { id: "b", accepted: ["wounds", "wound", "injuries", "damage"] },
    ],
    explanation: "Stomata; wounds.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the group of organisms that causes rust diseases of crops.",
    accepted: ["fungi", "fungus", "fungal", "a fungus"],
    keywords: { any: ["fung"] },
    explanation: "Rusts are **fungal** diseases.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tendai examines 120 cabbage plants and finds black rot on 9 of them. Calculate the disease incidence, as a percentage, to one decimal place.",
    value: inc, unit: "%", tol: 0.05, answer: "7.5", wrong: [round((120 / 9) * 100, 1), 9],
    explanation: `9 ÷ 120 × 100 = ${inc}%.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe **four** ways of preventing or controlling bacterial wilt in tomatoes.",
    hints: ["The bacteria live in soil and travel in water, soil and plant material."],
    points: [
      "Plant clean, disease-free seedlings (and certified seed potatoes).",
      "Rotate with non-host crops such as maize or other cereals for several seasons.",
      "Uproot and destroy wilted plants with the soil around their roots.",
      "Avoid moving infected soil on tools and boots / avoid irrigation water from infected land / improve drainage / use resistant varieties.",
    ],
    modelAnswer: "Use clean seedlings, rotate with maize for several seasons, uproot and destroy wilted plants with their root soil, and avoid carrying soil from infected land on tools or in irrigation water.",
    explanation: "Prevention and hygiene, since there is no chemical cure.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a leaf-spot disease reduces the yield of a maize crop.",
    hints: ["What do leaves do for the plant?"],
    points: [
      "Lesions kill leaf tissue, so the green area is reduced.",
      "Less photosynthesis, so less sugar is made.",
      "Cobs fill poorly / grain is light / weak stalks lodge.",
    ],
    modelAnswer: "The lesions kill leaf tissue, so there is less green leaf for photosynthesis. Less sugar is made, so the cobs fill poorly and stalks may be weak and lodge.",
    explanation: "Leaf area → photosynthesis → grain fill.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Sipho grows maize after maize near Mutare and leaves the old stalks on the surface. After a spell of warm, humid weather he records grey leaf spot each week.\n\n${W_TABLE}`,
    hints: ["Incidence = diseased ÷ examined × 100.", "Think about the weather and the residue."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the disease incidence in week 4, as a percentage.",
        value: wPct[3], unit: "%", tol: 0, wrong: [60, round((N / 60) * 100, 1)],
        explanation: `60 ÷ ${N} × 100 = ${wPct[3]}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "By how many percentage points did the incidence rise from week 2 to week 4?",
        value: ppRise, tol: 0, wrong: [60 - 15, wPct[3]],
        explanation: `Week 2: 15 ÷ ${N} × 100 = ${wPct[1]}%; week 4: ${wPct[3]}%; rise = ${ppRise} percentage points.`,
      }),
      P.short({
        label: "(c)", stem: "Name the group of organism that causes grey leaf spot.",
        accepted: ["fungus", "fungi", "fungal", "a fungus"],
        keywords: { any: ["fung"] },
        explanation: "A **fungus**.",
      }),
      P.mcq({
        label: "(d)", stem: "Which description fits grey leaf spot lesions?",
        options: [
          ["Narrow rectangular grey lesions between the veins", "Correct."],
          ["Broken yellow streaks along the leaf veins", "This describes maize streak virus."],
          ["Light and dark green mosaic on new leaves", "A mosaic suggests a virus."],
          ["Orange powdery pustules on both leaf surfaces", "This describes a rust."],
        ],
        answer: "A",
        explanation: "Grey leaf spot gives rectangular grey to tan lesions bounded by the veins.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** reasons why the disease spread so quickly in Sipho's field.",
        points: ["Infected maize residue left on the surface provided spores (maize after maize, no rotation).", "Warm, humid weather favours spore germination and infection."],
        explanation: "Inoculum and weather.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe how Sipho could reduce grey leaf spot next season.",
        points: [
          "Rotate with a non-host crop such as soya beans or groundnuts.",
          "Manage the infected residue (bury, remove or feed it) so fewer spores survive.",
          "Plant a resistant or tolerant variety.",
          "Scout the lower leaves and apply a suitable fungicide early if the disease appears in a susceptible crop.",
        ],
        explanation: "Rotation, residue, resistance, fungicide.",
      }),
    ],
    explanation: "Calculate disease incidence from survey data and explain the spread and control of a fungal disease.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a tobacco seedbed near Marondera some seedlings show light and dark green mottling and distorted leaves. Workers handle the seedlings daily when pulling weeds and transplanting.",
    hints: ["Mottling suggests a particular group of pathogen.", "How do the workers' hands come into it?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the disease most likely present.",
        accepted: ["tobacco mosaic virus", "tobacco mosaic", "TMV", "mosaic virus", "tobacco mosaic disease"],
        keywords: { any: ["mosaic", "tmv"] },
        explanation: "**Tobacco mosaic virus** (TMV).",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how the workers may be spreading the disease.",
        points: ["The virus is carried on hands, tools and clothing after touching infected plants or tobacco products.", "It enters healthy seedlings through tiny wounds made while handling them."],
        explanation: "Mechanical spread through wounds.",
      }),
      P.manual({
        label: "(c)", marks: 5, stem: "Evaluate the measures the farmer could use to stop the disease spreading, and say which matters most.",
        points: [
          "Remove and destroy the infected seedlings (no chemical cure exists).",
          "Workers wash hands with soap and disinfect tools before handling seedlings.",
          "No smoking or handling of tobacco products in the seedbed.",
          "Handle healthy beds before suspect ones / keep separate tools; use resistant varieties and rotate seedbed sites next season.",
          "Judgement: hygiene of hands and tools matters most, because the virus spreads mechanically and spraying cannot cure it.",
        ],
        levels: agricultureLevels(5),
        explanation: "Weigh hygiene, removal and resistance; justify a priority.",
      }),
    ],
    explanation: "Identify a virus disease from symptoms and evaluate hygiene-based control.",
  });

  b.card("DEFINITION", "Pathogen", "A micro-organism (fungus, bacterium or virus) that causes plant disease.");
  b.card("DEFINITION", "Vector", "An organism, usually an insect, that carries a pathogen from diseased to healthy plants (leafhoppers carry maize streak virus).");
  b.card("CONCEPT", "General symptoms by group", "Fungal: spots, rings, rusts, powdery growth, rots. Bacterial: water-soaked spots, sudden wilt, soft rots, ooze. Viral: mosaic, streaks, curl, stunting.");
  b.card("CONCEPT", "How plant diseases spread", "Wind, water splash and irrigation, insect vectors, seed and planting material, soil and residues, tools and hands.");
  b.card("FACT", "Grey leaf spot of maize", "Fungal; rectangular grey lesions between veins; favoured by humid weather and maize residue; rotation, resistant varieties, fungicide.");
  b.card("FACT", "Bacterial wilt", "Soil-borne bacterium of tomato, potato and relatives; sudden wilt of green plants, ooze from cut stem; no chemical cure: rotation, clean seedlings, hygiene.");
  b.card("FACT", "Tobacco mosaic virus", "Mosaic and distorted leaves; spread on hands, tools and from tobacco products; wash hands, remove plants, resistant varieties.");
  b.card("CONCEPT", "Protectant vs systemic fungicides", "Protectant: surface layer, before infection, renew after rain (copper, sulfur). Systemic: absorbed, can stop early infections.");
  b.card("FORMULA", "Disease incidence", "Diseased plants ÷ plants examined × 100.");
});
