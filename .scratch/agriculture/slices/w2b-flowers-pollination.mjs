// Slice W2b: flowers, pollination, fertilisation, seed formation and dispersal.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Grain set on cobs (numbers differ from the lesson).
const ROWS = 14, PER_ROW = 45;
const OVULES = ROWS * PER_ROW;
const GRAINS = 567;
const setPct = pct(GRAINS, OVULES);
check(OVULES === 630 && setPct === 90, "set pct");

// Cob survey for the structured item: three fields.
const COBS = [
  ["Field A (rain at silking)", 600, 564],
  ["Field B (dry spell at silking)", 600, 378],
  ["Field C (hail damaged the tassels)", 600, 450],
];
const COB_TABLE = table(["Field", "Ovules per cob (mean)", "Grains per cob (mean)"], COBS);
const pctB = pct(378, 600);
const pctA = pct(564, 600);
check(pctB === 63 && pctA === 94, "cob pcts");

// Weed seeds.
const SEEDS = 3000, EST = 6;
const weeds = (SEEDS * EST) / 100;
check(weeds === 180, "weeds");

concept("agri.plants.flowers-pollination", { file: "plants/flowers-pollination", keyPrefix: "plants.flowers-pollination" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the silk of a maize cob?",
    options: [
      ["The style and stigma of a female flower", "Correct: each silk leads to one ovary on the cob."],
      ["The filament of a male flower", "Filaments carry the anthers in the tassel."],
      ["A modified leaf that protects the cob", "The husk leaves protect the cob."],
      ["A group of hairs that disperses the grain", "Maize grain is not dispersed by its silks."],
    ],
    answer: "A",
    explanation: "Silks are long styles with stigmas that catch wind-blown pollen.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is pollination?",
    options: [
      ["Transfer of pollen from an anther to a stigma", "Correct: this is the definition."],
      ["The fusion of a male nucleus with an egg nucleus", "That is fertilisation."],
      ["The growth of a pollen tube down through the style to the ovule", "This follows pollination."],
      ["The spreading of seeds away from the parent", "That is dispersal."],
    ],
    answer: "A",
    explanation: "Pollination is pollen transfer; fertilisation is the fusion of gametes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part of a bean flower encloses the stamens and the pistil?",
    options: [
      ["The keel", "Correct: the two joined lower petals form a boat shape around them."],
      ["The standard", "The standard is the large upright back petal."],
      ["The calyx", "The calyx (sepals) protects the bud."],
      ["The wings", "The wings are the two side petals."],
    ],
    answer: "A",
    explanation: "The keel encloses the stamens and stigma, which is why beans are mainly self-pollinated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "After fertilisation, what does the ovary of a bean flower become?",
    options: [
      ["The pod (fruit)", "Correct: the ovary develops into the fruit."],
      ["The seed", "The ovule becomes the seed."],
      ["The testa (seed coat)", "The testa forms from the outer layers of the ovule."],
      ["The embryo", "The embryo grows from the zygote."],
    ],
    answer: "A",
    explanation: "Ovary → fruit (pod); ovule → seed; zygote → embryo.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature shows that maize is pollinated by wind?",
    options: [
      ["Anthers hang outside the flower on long filaments", "Correct: they release pollen into the wind."],
      ["The flowers have bright petals, scent and plenty of nectar", "These attract insects; maize has neither."],
      ["The pollen is sticky and rough", "Wind-pollinated plants have light, smooth pollen."],
      ["The stigma is small and hidden inside the flower", "Maize stigmas (silks) are long and exposed."],
    ],
    answer: "A",
    explanation: "Wind-pollinated flowers have exposed anthers, light pollen, long exposed stigmas and no petals or nectar.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is maize mainly **cross**-pollinated, although each plant has both male and female flowers?",
    options: [
      ["Its tassel sheds pollen before its own silks are ready", "Correct: this is protandry, so pollen comes from other plants."],
      ["Maize pollen cannot grow a tube on the silks of the same plant", "Maize can self-pollinate; seed producers use this to make inbred lines."],
      ["Insects such as bees carry maize pollen only between different plants in the field", "Maize is pollinated by wind, not insects."],
      ["The tassel and silks are on different plants in the field", "Maize is monoecious: both are on one plant."],
    ],
    answer: "A",
    hints: ["Compare the timing of pollen shedding and silking on one plant."],
    explanation: "Protandry and wind dispersal of pollen mean that most silks receive pollen from neighbouring plants.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does a dry spell at silking often leave maize cobs with many missing grains?",
    options: [
      ["Many silks dry out or appear late and miss the pollen", "Correct: each missing grain is an unfertilised ovule."],
      ["The tassels turn into extra cobs, so much less pollen is made for the silks", "Tassels do not turn into cobs."],
      ["The husks open and the grains fall out of the cob", "Grains are not lost in this way."],
      ["The roots stop producing pollen when the soil is dry", "Pollen is made in the anthers of the tassel, not the roots."],
    ],
    answer: "A",
    hints: ["Each grain needs its own silk to receive pollen."],
    explanation: "Moisture stress delays silking and dries silks, so pollen shed by the tassels misses them.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer saves seed from a field of an open-pollinated maize variety grown next to a field of yellow maize. Next season some cobs carry yellow grains. What is the best explanation?",
    options: [
      ["Wind carried pollen from the yellow maize to his plants", "Correct: maize cross-pollinates readily, so varieties must be isolated."],
      ["The seed was stored too long, so it changed colour", "Storage does not change the genetic colour of the grain."],
      ["Self-pollination in maize always produces a few yellow grains on every cob in the field", "Grain colour comes from the parents; self-pollination does not add yellow."],
      ["The fertiliser in his field contained a yellow dye", "Fertiliser does not alter the grain colour genetically."],
    ],
    answer: "A",
    hints: ["How is maize pollen carried, and how far?"],
    explanation: "Because maize is wind- and cross-pollinated, seed crops and varieties need isolation in distance or time.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In fertilisation, a male nucleus from the pollen fuses with the egg cell nucleus in the ovule.",
    answer: true,
    explanation: "True. The fused nucleus forms a zygote, which grows into the embryo.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Bean flowers are mainly cross-pollinated by wind.",
    answer: false,
    explanation: "False. Beans are mainly self-pollinated because the keel encloses the anthers and stigma; any cross-pollination is by insects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a flower with what it becomes or does after fertilisation.",
    pairs: [
      ["Ovule", "Becomes the seed"],
      ["Ovary", "Becomes the fruit"],
      ["Integuments of the ovule", "Become the testa"],
      ["Zygote", "Grows into the embryo"],
      ["Petals and stamens", "Wither and fall off"],
    ],
    explanation: "Ovule → seed; ovary → fruit; integuments → testa; zygote → embryo.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each seed or fruit with its main method of dispersal.",
    pairs: [
      ["Blackjack fruit with barbs", "Animals (hooking on fur and clothing)"],
      ["Jacaranda seed with a papery wing", "Wind"],
      ["Soya bean pod that splits when dry", "Self (explosive)"],
      ["Guava fruit eaten by birds", "Animals (eaten, seeds pass through the gut)"],
    ],
    explanation: "Each feature suits one agent of dispersal.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of fertilisation.",
    template: "A pollen grain on the stigma grows a pollen {{blank:a}} down the style. It enters the ovule through the {{blank:b}}, and a male nucleus fuses with the egg nucleus to form a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["tube"] },
      { id: "b", accepted: ["micropyle"] },
      { id: "c", accepted: ["zygote"] },
    ],
    explanation: "Pollen tube → micropyle → fusion of nuclei → zygote.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the male inflorescence at the top of a maize plant.",
    accepted: ["tassel", "the tassel", "tassels"],
    explanation: "The **tassel** carries the male flowers.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A maize cob has ${ROWS} rows with room for ${PER_ROW} grains in each row, but only ${GRAINS} grains formed. Calculate the percentage of ovules that formed grains.`,
    value: setPct, unit: "%", wrong: [round(pct(GRAINS, ROWS * 40), 1), OVULES - GRAINS],
    explanation: `Ovules = ${ROWS} × ${PER_ROW} = ${OVULES}. Percentage = ${GRAINS} ÷ ${OVULES} × 100 = ${setPct}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `A weed plant sheds ${SEEDS.toLocaleString("en-GB")} seeds. If ${EST}% of them produce seedlings, how many new weed plants result?`,
    value: weeds, unit: "plants", wrong: [SEEDS * EST, SEEDS / EST],
    hints: [`${EST}% means ${EST} out of every 100.`],
    explanation: `${SEEDS} × ${EST} ÷ 100 = ${weeds} plants. Weeding before seeds are shed prevents this.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** differences between the maize flower and the bean flower that affect how each is pollinated.",
    hints: ["Think of separate or bisexual flowers, petals and the position of anthers and stigmas."],
    points: [
      "Maize has separate male (tassel) and female (silk) flowers; the bean flower is bisexual.",
      "So maize pollen must travel between flowers (mostly to other plants, helped by protandry), while bean pollen falls on its own stigma.",
      "Maize has no petals, with anthers and silks exposed to the wind; the bean has a keel enclosing the anthers and stigma.",
      "So maize is wind- and cross-pollinated while the bean is mainly self-pollinated.",
    ],
    modelAnswer: "Maize has separate male tassels and female silks, and the tassel sheds pollen before the silks are ready, so pollen must reach other plants. The bean flower is bisexual, so its own pollen is available. Maize has exposed anthers and long silks and is wind-pollinated; the bean's keel encloses its anthers and stigma, so it is self-pollinated.",
    explanation: "Each structural difference with its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Suggest **four** practices that reduce the spread of weeds by seeds.",
    hints: ["Think about timing of weeding, seed, manure and implements."],
    points: [
      "Weed before the weeds flower and set seed.",
      "Use clean, certified crop seed free of weed seeds.",
      "Use well-rotted manure or compost (heat kills many weed seeds).",
      "Clean implements, clothing and animals before moving to clean fields (or: control weeds on field edges and irrigation canals).",
    ],
    modelAnswer: "Weed early, before weeds flower; plant certified seed; use well-rotted manure; and clean tools, clothes and animals before entering clean fields.",
    explanation: "Each practice breaks a dispersal route.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `An extension officer near Gokwe counted ovules and grains on cobs from three maize fields of the same variety.\n\n${COB_TABLE}`,
    hints: ["Percentage = grains ÷ ovules × 100.", "Each grain needs pollination of its own silk."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the percentage of ovules that formed grains in Field B.",
        value: pctB, unit: "%", wrong: [600 - 378],
        explanation: `378 ÷ 600 × 100 = ${pctB}%.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage of ovules that formed grains in Field A.",
        value: pctA, unit: "%", wrong: [600 - 564],
        explanation: `564 ÷ 600 × 100 = ${pctA}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the low grain set in Field B.",
        points: ["The dry spell dried out the silks / delayed silking.", "So the silks could not catch pollen or pollen tubes could not grow, and many ovules were not fertilised."],
        explanation: "Drought at silking disrupts pollination.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why hail damage to the tassels reduced grain set in Field C.",
        points: ["Tassels carry the anthers that produce the pollen.", "Less pollen was shed, so fewer silks were pollinated and fewer ovules fertilised."],
        explanation: "Less pollen means fewer grains.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** ways a farmer could reduce the risk of the problem in Field B.",
        points: ["Plant early / at the right time so silking does not coincide with the usual mid-season dry spell.", "Conserve soil moisture (mulch, conservation agriculture) / irrigate at tasselling and silking / choose a drought-tolerant variety."],
        explanation: "Protect water supply at flowering.",
      }),
    ],
    explanation: "Grain set shows pollination success; drought and tassel damage both reduce fertilisation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A bean flower is described part by part: (1) five small green parts at the base; (2) a large upright back petal; (3) two side petals; (4) two lower petals joined like a boat; (5) ten stalked structures carrying yellow powder, nine joined at their base; (6) a long green structure with a row of small round bodies inside, ending in a sticky tip.",
    hints: ["Match each description to the named parts of a bean flower."],
    parts: [
      P.short({ label: "(a)", stem: "Name part (4).", accepted: ["keel", "the keel"], explanation: "Part 4 is the keel." }),
      P.short({ label: "(b)", stem: "Name part (5).", accepted: ["stamens", "stamen", "anthers", "androecium"], explanation: "Part 5 is the stamens." }),
      P.short({ label: "(c)", stem: "Name the small round bodies inside part (6).", accepted: ["ovules", "ovule"], explanation: "They are ovules, which become seeds." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why bean varieties stay true to type when a farmer saves his own seed.",
        points: [
          "The keel (part 4) encloses the stamens and the stigma.",
          "So pollen falls on the stigma of the same flower (self-pollination), often before the flower opens.",
          "So little pollen arrives from other varieties and the offspring resemble the parent.",
        ],
        explanation: "Self-pollination keeps varieties pure.",
      }),
    ],
    explanation: "Identify bean flower parts and link the keel to self-pollination.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss the importance of seed and fruit dispersal to wild plants and to weeds in crop fields, and evaluate the measures a farmer can take against weeds that are spread by seeds.",
    hints: ["Benefits of dispersal to the plant first.", "Then judge which control measures matter most."],
    points: [
      "Dispersal reduces competition between parent and offspring and among seedlings.",
      "It lets plants colonise new areas and survive local disasters.",
      "Weeds produce many seeds, dispersed by wind, animals, water and machinery, and many stay dormant, building a seed bank.",
      "Weeding before seed set stops new seed entering the soil; this is the most effective long-term measure.",
      "Clean seed, clean implements and animals, and well-rotted manure stop new weeds arriving.",
      "Judgement: no single measure works; preventing seed set plus stopping new seed entering, kept up for several seasons, reduces the seed bank.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Dispersal spreads seeds away from the parent so that seedlings do not compete with it or with each other, and it lets a species reach new places. Weeds exploit this: blackjack fruits hook onto clothing and animals, light hairy seeds blow in the wind and others are carried in water, manure and dirty machinery, and many lie dormant in the soil for years. The most effective measure is to weed before weeds flower, so no new seed is added to the soil seed bank. Using certified seed, cleaning implements and animals and using well-rotted manure stop new weeds arriving from outside. Because the seed bank lasts for years, only a combination of these measures kept up over several seasons will reduce weeds.",
    explanation: "Explain the benefits and evaluate the control measures.",
  });

  b.card("DEFINITION", "Pollination", "Transfer of pollen from an anther to a stigma.");
  b.card("DEFINITION", "Fertilisation", "Fusion of a male nucleus from the pollen with the egg nucleus in the ovule, forming a zygote.");
  b.card("CONCEPT", "Maize flowers", "Monoecious: male tassel at the top, female ear with silks (styles and stigmas) halfway up; wind-pollinated.");
  b.card("CONCEPT", "Bean flower parts", "Calyx, standard, two wings, keel enclosing 10 stamens (9 joined + 1 free) and the pistil.");
  b.card("CONCEPT", "Why maize is cross-pollinated", "Separate male and female flowers, tassel sheds pollen before the silks are ready (protandry), wind carries pollen.");
  b.card("CONCEPT", "Why beans are self-pollinated", "Keel encloses anthers and stigma, so pollen falls on the same flower's stigma.");
  b.card("CONCEPT", "What each part becomes", "Ovule → seed; ovary → fruit; integuments → testa; zygote → embryo.");
  b.card("CONCEPT", "Methods of dispersal", "Wind (wings, hairs), animals (hooks, fleshy fruits), self (explosive pods), water (floating).");
  b.card("CONCEPT", "Dispersal and weed control", "Weed before seed set; clean seed, implements and animals; use well-rotted manure.");
});
