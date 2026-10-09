// Slice W3b: weeds: effects, classification, named weeds and spread.
import { concept, P, mean, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: quadrat 0.5 m x 0.5 m (0.25 m²), counts.
const Q = [6, 9, 4, 8, 3];
const qMean = mean(Q);
const perM2 = qMean / 0.25;
check(qMean === 6 && perM2 === 24, "quadrat");
// Structured: weeding-time trial.
const TRIAL = [["Kept weed-free all season", 5.0], ["Weeded once, 2 weeks after emergence", 4.8], ["Weeded once, 6 weeks after emergence", 3.8], ["Never weeded", 2.0]];
const T_TABLE = table(["Treatment", "Maize grain yield (t/ha)"], TRIAL.map(([n, y]) => [n, y.toFixed(1)]));
const lossNever = round(pct(TRIAL[0][1] - TRIAL[3][1], TRIAL[0][1]), 2);
const loss6 = round(pct(TRIAL[0][1] - TRIAL[2][1], TRIAL[0][1]), 2);
check(Math.abs(lossNever - 60) < 1e-9 && Math.abs(loss6 - 24) < 1e-9, "trial");

concept("agri.protection.weeds", { file: "protection/weeds", keyPrefix: "protection.weeds" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of a **weed**?",
    options: [
      ["A plant growing where it is not wanted", "Correct: even a maize plant in a bean field is a weed."],
      ["Any wild plant that has small flowers", "Many wild plants are not weeds, and flower size is irrelevant."],
      ["A plant that is poisonous to all livestock", "Only some weeds are poisonous."],
      ["A plant that grows only in the dry season", "Most weeds grow in the rainy season with the crop."],
    ],
    answer: "A",
    explanation: "A weed is defined by where it grows: a plant growing where it is not wanted.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **perennial** weed?",
    options: [
      ["Couch grass", "Correct: it survives and spreads by rhizomes and stolons."],
      ["Blackjack", "Blackjack is an annual that survives as seed."],
      ["Pigweed", "Pigweed is an annual."],
      ["Mexican marigold", "Mexican marigold is an annual."],
    ],
    answer: "A",
    explanation: "Perennials such as couch grass and nut grass regrow from underground organs; blackjack, pigweed and Mexican marigold are annuals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How are the seeds of **blackjack** mainly spread?",
    options: [
      ["Their barbed spines stick to clothes and fur", "Correct: people and animals carry them."],
      ["They float on rivers to new fields", "Blackjack seeds are adapted to cling, not to float."],
      ["They are blown on silky parachutes of hair", "That is wind dispersal, as in some other weeds."],
      ["They grow from pieces of root cut by the plough", "That is vegetative spread, as in couch grass."],
    ],
    answer: "A",
    explanation: "Blackjack seeds carry barbed spines that cling to clothing and animal hair.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Nut grass is classified as a **sedge** rather than a grass. Which feature shows this?",
    options: [
      ["A solid stem that is triangular in cross-section", "Correct: sedges have solid triangular stems."],
      ["A round hollow stem with swollen nodes", "This describes a true grass."],
      ["Broad leaves with a network of veins", "This describes a broad-leaved weed."],
      ["Long narrow leaves with veins that run parallel to each other", "Grasses have these too, so it does not separate sedges from grasses."],
    ],
    answer: "A",
    explanation: "Sedges have solid, triangular stems and leaves in three rows; grasses have round, usually hollow stems with nodes.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Witchweed (Striga) is a serious parasite of which crops?",
    options: [
      ["Maize, sorghum and millets", "Correct: cereals and wild grasses are its hosts."],
      ["Groundnuts, cowpeas and soya beans", "These legumes are not its hosts; they can act as trap crops."],
      ["Tomatoes, potatoes and peppers", "These are not hosts of the common witchweed."],
      ["Cabbages, rape and covo", "Brassicas are not its hosts."],
    ],
    answer: "A",
    explanation: "Witchweed attacks maize, sorghum, millets and other grasses; legumes stimulate its seeds to germinate without being attacked.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A field ploughed and harrowed several times has more couch grass than before. What is the best explanation?",
    options: [
      ["The implements cut and spread rhizome pieces that regrew", "Correct: each piece with a node can grow a new plant."],
      ["Ploughing buried the couch grass seed too deep to germinate", "That would reduce, not increase, the weed."],
      ["Harrowing added nitrogen that couch grass needs", "Harrowing does not add nitrogen."],
      ["The soil became too compact for any crop", "This does not explain more couch grass."],
    ],
    answer: "A",
    hints: ["How does couch grass reproduce besides seed?"],
    explanation: "Couch grass spreads by rhizomes and stolons; cultivation chops them into pieces that are dragged across the field and regrow.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these is a **beneficial** effect of weeds?",
    options: [
      ["Covering bare soil so that erosion is reduced", "Correct."],
      ["Competing with the crop for nitrogen and water", "This is harmful."],
      ["Harbouring leafhoppers that carry maize streak", "This is harmful."],
      ["Contaminating harvested grain with poisonous seeds", "This is harmful."],
    ],
    answer: "A",
    hints: ["Which effect helps the farmer or the land?"],
    explanation: "Weeds can protect the soil, add organic matter, provide food, medicine and fodder, and shelter natural enemies.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "On a sandy field where maize has been grown for many years, plants are stunted, yellow and wilted in December although the soil is moist and no weeds are yet visible. What is the most likely cause?",
    options: [
      ["Witchweed attached to the roots below ground", "Correct: it damages the crop before it emerges."],
      ["Couch grass growing among the maize rows", "Couch grass would be visible above ground."],
      ["Blackjack seeds stuck to the maize stems", "Seeds on stems do not stunt maize."],
      ["Too much rain washing the maize seed away", "The crop has emerged; this does not fit."],
    ],
    answer: "A",
    hints: ["Which weed does its damage while still underground?"],
    explanation: "Witchweed feeds on cereal roots for weeks before it emerges, causing drought-like symptoms; it is worst on poor soils under continuous cereals.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Black nightshade weeds grow thickly around a tomato field. Why do they increase the risk of crop losses even if they are not competing with the tomatoes?",
    options: [
      ["They host pests and diseases of tomatoes", "Correct: they belong to the same plant family."],
      ["They add nitrogen to the soil around the field", "This would not cause crop losses."],
      ["They shade the tomatoes from the field margins", "The question says they are not competing."],
      ["They stop bees from visiting the field", "This is not the main risk."],
    ],
    answer: "A",
    hints: ["Think of plant families and alternative hosts."],
    explanation: "Weeds related to the crop act as alternative hosts, keeping pests and diseases alive near the field.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Annual weeds survive the dry season as seeds in the soil.",
    answer: true,
    explanation: "True. They complete their life cycle in one season.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each weed with its main way of spreading.",
    pairs: [
      ["Blackjack", "Barbed seeds carried on clothes and animals"],
      ["Couch grass", "Rhizomes and stolons, cut pieces regrowing"],
      ["Nut grass", "Underground tubers"],
      ["Witchweed", "Huge numbers of dust-like seeds"],
    ],
    explanation: "Know how each named weed spreads.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Grasses have leaves with {{blank:a}} veins and round stems, while broad-leaved weeds have leaves with a {{blank:b}} of veins.",
    blanks: [
      { id: "a", accepted: ["parallel"] },
      { id: "b", accepted: ["network", "net", "net-like network", "mesh"] },
    ],
    explanation: "Parallel; network.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the parasitic weed that attaches to the roots of maize and sorghum.",
    accepted: ["witchweed", "witch weed", "striga", "Striga asiatica", "witchweed (Striga)"],
    keywords: { any: ["witch", "striga"] },
    explanation: "**Witchweed** (*Striga*).",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Farai throws a 0.5 m × 0.5 m quadrat five times in a wheat field and counts 6, 9, 4, 8 and 3 weeds. Calculate the mean number of weeds per square metre.",
    value: perM2, tol: 0, wrong: [qMean, qMean / 4],
    hints: ["Find the mean count per quadrat first.", "What is the area of one quadrat in m²?"],
    explanation: `Mean = (6 + 9 + 4 + 8 + 3) ÷ 5 = ${qMean} weeds per quadrat. Quadrat area = 0.5 × 0.5 = 0.25 m², so ${qMean} ÷ 0.25 = ${perM2} weeds per m². Giving ${qMean} forgets that the quadrat is only a quarter of a square metre.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Discuss the effects of weeds by giving **two** harmful and **two** beneficial effects.",
    hints: ["Harmful: think of yield, pests and quality. Beneficial: think of soil and people."],
    points: [
      "Harmful: compete with the crop for water, nutrients, light and space, lowering yield.",
      "Harmful: host pests and diseases / parasitise crops / contaminate produce / poison livestock / raise labour costs.",
      "Beneficial: cover the soil and reduce erosion / add organic matter when ploughed in.",
      "Beneficial: food (relish), medicine, fodder or habitat for natural enemies.",
    ],
    modelAnswer: "Weeds compete with crops for water, nutrients and light, lowering yields, and they can harbour pests and diseases. On the other hand they cover bare soil against erosion and add organic matter, and some, such as blackjack leaves, are eaten as relish.",
    explanation: "Two of each, with the effect explained.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why perennial weeds such as nut grass are harder to control than annual weeds.",
    hints: ["Where does a perennial store food?"],
    points: [
      "Perennials store food in underground organs (tubers, rhizomes).",
      "When the tops are cut or hoed off they regrow from these organs.",
      "Cultivation can cut and spread the organs, and many contact herbicides do not reach them (they need repeated or systemic treatment).",
    ],
    modelAnswer: "Nut grass stores food in underground tubers, so when the shoots are hoed off it simply regrows. Cultivation spreads the tubers, and only repeated or systemic treatment that reaches the underground parts kills it, whereas an annual dies once it is cut before it seeds.",
    explanation: "Underground storage organs allow regrowth.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Form 4 pupils at a school near Bulawayo compared maize plots weeded at different times. All other treatments were the same.\n\n${T_TABLE}`,
    hints: ["% loss = (weed-free yield − yield) ÷ weed-free yield × 100.", "Compare early and late weeding."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage yield loss in the never-weeded plot compared with the weed-free plot.",
        value: lossNever, unit: "%", tol: 0, wrong: [round(pct(TRIAL[3][1], TRIAL[0][1]), 1), 3],
        explanation: `(5.0 − 2.0) ÷ 5.0 × 100 = ${lossNever}%. Giving 40% is the yield kept, not the loss.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage yield loss when weeding was delayed until 6 weeks.",
        value: loss6, unit: "%", tol: 0, wrong: [round(pct(TRIAL[2][1], TRIAL[0][1]), 1), 1.2],
        explanation: `(5.0 − 3.8) ÷ 5.0 × 100 = ${loss6}%.`,
      }),
      P.mcq({
        label: "(c)", stem: "What do the results show about the timing of weeding?",
        options: [
          ["Early weeding protects yield much better than late weeding", "Correct: 4.8 t/ha against 3.8 t/ha."],
          ["Weeding time makes no difference to maize yield", "Yields differ by a whole tonne per hectare."],
          ["Late weeding gives a higher yield than early weeding does", "The opposite is shown."],
          ["Weeds only harm maize after it has tasselled", "The early weeding result shows harm in the first weeks."],
        ],
        answer: "A",
        explanation: "Weeds do most damage in the first weeks after crop emergence, so early weeding matters most.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the weeds reduced the yield of the never-weeded plot.",
        points: [
          "Weeds competed with the maize for water, especially in dry spells.",
          "They took nutrients, particularly nitrogen, so the maize was pale and stunted.",
          "Tall weeds shaded the maize, reducing photosynthesis, so cobs were small.",
        ],
        explanation: "Competition for water, nutrients and light.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** ways the pupils could make the results more reliable.",
        points: ["Repeat each treatment in several plots (replicates) and take a mean.", "Keep plot size, soil, variety, fertiliser and planting date the same / repeat over more than one season."],
        explanation: "Replication and control of variables.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Apart from lower yield, describe **three** other ways weeds left in the plot could harm the farm in later seasons.",
        points: [
          "Weeds set seed, adding to the seed store in the soil (seeds stay dormant for years).",
          "Perennial weeds spread their rhizomes or tubers, becoming harder to control.",
          "Weeds host pests and diseases / harbour leafhoppers that carry maize streak virus.",
        ],
        explanation: "Seed bank, perennials, hosts.",
      }),
    ],
    explanation: "Interpret a weeding-time trial, calculate yield losses and explain the harm weeds do.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A farmer near Gokwe has grown sorghum on the same sandy field for many years without fertiliser. Each February plants with bright red flowers appear among the sorghum, which is short and yellow.",
    hints: ["Think of where the seed of this weed comes from each year."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the weed.",
        accepted: ["witchweed", "witch weed", "striga", "Striga asiatica"],
        keywords: { any: ["witch", "striga"] },
        explanation: "Witchweed (*Striga*).",
      }),
      P.short({
        label: "(b)", stem: "State whether this weed is an annual or a perennial.",
        accepted: ["annual", "an annual"],
        rejected: ["perennial"],
        explanation: "It is an **annual**, surviving as seed.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the sorghum was damaged before the weed appeared.",
        points: ["The weed attaches to the sorghum roots underground and takes water and nutrients.", "It grows for weeks below ground, so the crop is stunted and yellow before the weed emerges."],
        explanation: "Underground parasitism.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Discuss why the problem has become worse year after year on this field.",
        points: [
          "Sorghum (a host) has been grown every year, so the weed has a host every season.",
          "Each plant sets thousands of tiny seeds, which are added to the soil each year.",
          "The seeds stay dormant and alive in the soil for many years, so the seed store builds up.",
          "Poor sandy soil with no fertiliser or manure weakens the crop and favours the weed.",
        ],
        levels: agricultureLevels(4),
        explanation: "Continuous host, seed production, dormancy, low fertility.",
      }),
    ],
    explanation: "Identify witchweed and explain why it becomes worse under continuous cereals.",
  });

  b.card("DEFINITION", "Weed", "A plant growing where it is not wanted.");
  b.card("CONCEPT", "Harmful effects of weeds", "Compete for water, nutrients, light, space; parasitise; host pests and diseases; contaminate produce; poison livestock; raise costs.");
  b.card("CONCEPT", "Beneficial effects of weeds", "Soil cover against erosion, organic matter, food and medicine, fodder, habitat for natural enemies.");
  b.card("DEFINITION", "Annual and perennial weeds", "Annual: one season, survives as seed (blackjack). Perennial: more than two years, regrows from rhizomes or tubers (couch grass, nut grass).");
  b.card("FACT", "Grasses, sedges, broad-leaved weeds", "Grasses: round hollow stems, parallel veins. Sedges: solid triangular stems (nut grass). Broad-leaved: net veins (blackjack).");
  b.card("FACT", "Which crops does witchweed attack?", "Maize, sorghum, millets and wild grasses; it parasitises roots and damages the crop before emerging.");
  b.card("FACT", "How does couch grass spread?", "By rhizomes and stolons; ploughing and hoeing cut and spread pieces that regrow.");
  b.card("CONCEPT", "Ways weeds spread", "Wind, water, animals (barbed seeds, manure), people and tools, contaminated seed, vegetative parts.");
  b.card("FORMULA", "Weed density from a quadrat", "Mean count per quadrat ÷ quadrat area (m²) = weeds per m².");
});
