// Slice W4a: types of livestock and their importance (ZIMSEC only).
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Struct: a homestead's livestock.
const HERD = [["Cattle", 6], ["Goats", 14], ["Sheep", 4], ["Pigs", 3], ["Chickens", 35], ["Donkeys", 2]];
const RUMINANTS = ["Cattle", "Goats", "Sheep"];
const nRum = HERD.filter(([a]) => RUMINANTS.includes(a)).reduce((s, [, n]) => s + n, 0);
const nMammals = HERD.filter(([a]) => a !== "Chickens").reduce((s, [, n]) => s + n, 0);
const rumPct = pct(nRum, nMammals);
check(nRum === 24 && nMammals === 29 && Math.abs(rumPct - 82.7586) < 1e-3, "herd");
const HERD_TABLE = table(["Animal", "Number kept"], HERD);

// Num: income share from livestock sales (assume figures).
const SALES = [["Cattle", 1800], ["Goats", 450], ["Chickens", 250]];
const salesTotal = SALES.reduce((s, [, a]) => s + a, 0);
const goatShare = pct(450, salesTotal);
check(salesTotal === 2500 && goatShare === 18, "sales");

concept("agri.livestock.types", { file: "livestock/types", keyPrefix: "livestock.types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these farm animals is a ruminant?",
    options: [
      ["Goat", "Correct: goats chew the cud and have a four-compartment stomach."],
      ["Pig", "The pig has a single, simple stomach and does not chew the cud."],
      ["Rabbit", "The rabbit is a non-ruminant herbivore that ferments fibre in its caecum."],
      ["Donkey", "The donkey is a non-ruminant; it digests fibre in its large caecum and colon."],
    ],
    answer: "A",
    explanation: "Cattle, sheep and goats are the ruminants kept on Zimbabwean farms. Pigs, rabbits, donkeys and poultry are non-ruminants.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature is found in a ruminant but not in a pig?",
    options: [
      ["A stomach with four compartments", "Correct: rumen, reticulum, omasum and abomasum."],
      ["A small intestine where food is absorbed", "Both have a small intestine for digestion and absorption."],
      ["Teeth used for chewing food", "Both chew food; ruminants simply have no upper incisors."],
      ["A liver that produces bile for the digestion of fats", "Both have a liver."],
    ],
    answer: "A",
    explanation: "The four-compartment stomach (and cud chewing) is what makes an animal a ruminant.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is a by-product of a beef cattle enterprise?",
    options: [
      ["Hides", "Correct: hides are obtained at slaughter in addition to the main product, beef."],
      ["Beef", "Beef is the main product of a beef enterprise."],
      ["Eggs", "Eggs come from poultry, not cattle."],
      ["Wool", "Wool comes from sheep such as the Merino."],
    ],
    answer: "A",
    explanation: "By-products of beef cattle include hides, bones, blood, horns, hooves, offal and dung.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can cattle live on veld grass that pigs cannot use well?",
    options: [
      ["Microbes in the rumen break down cellulose", "Correct: rumen bacteria and protozoa ferment the fibre."],
      ["Cattle have upper incisors that cut grass short", "Cattle have no upper incisors; they use a dental pad."],
      ["Cattle produce more stomach acid than pigs do", "Acid does not digest cellulose; microbes do."],
      ["Grass contains more starch than maize grain does, so it suits cattle", "Grass is mostly fibre; maize grain is mostly starch."],
    ],
    answer: "A",
    explanation: "Animals cannot make the enzymes that digest cellulose. Ruminants rely on the microbes living in the rumen.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Ruminants have no upper front teeth. What do the lower incisors cut grass against?",
    options: [
      ["The dental pad", "Correct: a hard, gristly pad on the upper jaw."],
      ["The upper molars", "Molars are at the back of the mouth and grind food."],
      ["The tongue", "The tongue wraps around grass and pulls it in, but the cutting is against the dental pad."],
      ["The hard palate behind the molars at the back of the throat", "This is not where grass is cut."],
    ],
    answer: "A",
    explanation: "Cattle, sheep and goats bite grass between the lower incisors and the dental pad.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which animal can turn dry-land grass and bushes into meat with little bought feed?"],
    stem: "A farmer in natural region V has dry veld with bushes and little reliable rain for crops. Which livestock enterprise best suits the land?",
    options: [
      ["Beef cattle and goats on the veld", "Correct: ruminants use grass and browse on land unsuitable for crops."],
      ["Intensive pigs fed on bought maize meal", "Pigs need concentrate feed and are not linked to using the veld."],
      ["A large dairy herd on irrigated pasture", "Dairy needs high-quality feed and water, which this land lacks."],
      ["Broilers housed in a large shed all year", "Broilers need bought feed and do not use the veld at all."],
    ],
    answer: "A",
    explanation: "Extensive ranching of beef cattle (and goats, which browse bushes) suits natural regions IV and V.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Think about where the fibre is fermented."],
    stem: "Rabbits and donkeys are non-ruminants, yet they live mainly on forage. Which statement explains this?",
    options: [
      ["They ferment fibre in a large caecum and colon", "Correct: microbes in the hindgut digest cellulose."],
      ["They have a four-compartment stomach like cattle", "They have a single simple stomach."],
      ["They chew the cud several times every day", "Rabbits and donkeys do not ruminate."],
      ["They make enzymes in the stomach that digest cellulose directly", "No farm animal makes its own cellulose-digesting enzymes."],
    ],
    answer: "A",
    explanation: "Hindgut fermenters such as rabbits, horses and donkeys digest fibre with microbes in the caecum and colon, less efficiently than ruminants.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Chickens are ruminants because they have a gizzard as well as a stomach.",
    answer: false,
    explanation: "False. Poultry have a crop, a glandular stomach and a gizzard, but they do not chew the cud. They are non-ruminants.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Oxen and donkeys are important on small farms because they provide draught power for ploughing and carting.",
    answer: true,
    explanation: "True. Draught animals let farmers without tractors plough, cultivate and transport goods.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each animal with a by-product obtained from it.",
    pairs: [
      ["Poultry", "Feathers"],
      ["Angora goat", "Mohair"],
      ["Pig", "Lard"],
      ["Beef cattle", "Blood meal"],
      ["Rabbit", "Fur pelt"],
    ],
    explanation: "Feathers come from poultry, mohair from Angora goats, lard (fat) from pigs, blood meal from cattle at the abattoir and pelts from rabbits.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "When a ruminant brings food back up to chew it again, the softened ball of food is called the {{blank:a}} and the process is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cud", "bolus"] },
      { id: "b", accepted: ["rumination", "ruminating", "chewing the cud"] },
    ],
    explanation: "The cud is regurgitated, re-chewed and swallowed again: this is rumination.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the fish most commonly farmed in ponds and dams in Zimbabwe.",
    accepted: ["tilapia", "bream", "tilapia (bream)", "Oreochromis"],
    keywords: { any: ["tilapia", "bream"] },
    explanation: "**Tilapia** (often called bream) grows quickly in warm water and is the usual farmed fish.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Add up the sales, then express the goat sales as a percentage of the total."],
    stem: `A homestead's livestock sales for one year were: cattle US\\$${SALES[0][1].toLocaleString("en-GB")}, goats US\\$${SALES[1][1]} and chickens US\\$${SALES[2][1]} (assume these figures). Calculate the goat sales as a percentage of all livestock sales.`,
    value: goatShare, unit: "%", tol: 0, wrong: [round(pct(450, 1800), 1), round(pct(450, 2050), 1)],
    explanation: `Total = 1,800 + 450 + 250 = US\\$${salesTotal.toLocaleString("en-GB")}. Goats = 450 ÷ ${salesTotal.toLocaleString("en-GB")} × 100 = ${goatShare}%. Dividing by the cattle sales only (25%) or leaving out the chickens (22%) are common slips.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give two different uses and say why each matters to the family."],
    stem: "Explain **two** ways in which cattle are important to a family in a communal area.",
    points: [
      "Identifies a use, e.g. draught power (oxen pull ploughs and carts).",
      "Explains it, e.g. so the family can plough on time without hiring a tractor.",
      "Identifies a second use, e.g. a store of wealth / income from sales / milk and meat / manure / bride wealth.",
      "Explains it, e.g. animals can be sold to pay school fees or buy food in a drought year.",
    ],
    modelAnswer: "Oxen provide draught power, so the family can plough and plant on time without paying for a tractor. Cattle are also a store of wealth: an animal can be sold to pay school fees or buy grain in a drought year.",
    explanation: "One mark for each use and one for each explanation.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    hints: ["Compare the feed each type needs."],
    stem: "Explain why pigs and poultry are said to compete with people for food, while cattle and goats do not.",
    points: [
      "Pigs and poultry are non-ruminants that digest fibre poorly, so they need concentrates made from grain (maize) and oilseed meals.",
      "People also eat this grain, so feeding it to pigs and poultry competes with human food supply.",
      "Ruminants use grass, browse and crop residues that people cannot eat, because rumen microbes digest cellulose.",
    ],
    modelAnswer: "Pigs and poultry cannot digest much fibre, so they are fed maize and soya meal, which people could eat. Cattle and goats live on grass, leaves and stover that people cannot eat, because microbes in the rumen break down cellulose.",
    explanation: "Link stomach type to diet.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8, calculator: true,
    stem: `Rudo lists the animals kept at her family's homestead near Chipinge.\n\n${HERD_TABLE}`,
    hints: ["Ruminants chew the cud.", "Percentage = part ÷ whole × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the animals in the table that are non-ruminant mammals.",
        accepted: ["pigs and donkeys", "pigs, donkeys", "donkeys and pigs", "pig and donkey", "pigs donkeys"],
        keywords: { all: ["pig", "donkey"] },
        rejected: ["chickens"],
        explanation: "Pigs and donkeys are non-ruminant mammals; chickens are birds.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the number of ruminants as a percentage of all the mammals kept, to one decimal place.",
        value: rumPct, unit: "%", tol: 0.05, answer: "82.8", wrong: [round(pct(nRum, nMammals + 35), 1), round(pct(14, nMammals), 1)],
        explanation: `Ruminants = 6 + 14 + 4 = ${nRum}; mammals = ${nMammals} (all except the chickens). ${nRum} ÷ ${nMammals} × 100 = ${round(rumPct, 1)}%. Including the chickens in the total gives ${round(pct(nRum, nMammals + 35), 1)}%, which is wrong because chickens are birds.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which animal in the table would give the family a by-product called mohair if it were of the right breed?",
        options: [
          ["Goats", "Correct: Angora goats grow mohair."],
          ["Sheep", "Sheep give wool, not mohair."],
          ["Donkeys", "Donkeys are kept for work."],
          ["Cattle, when they are kept for their hides at slaughter", "Cattle give hides, not mohair."],
        ],
        answer: "A",
        explanation: "Mohair is the long, lustrous fibre of the Angora goat.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** by-products the family could obtain from the chickens.",
        points: ["Feathers.", "Manure (droppings or litter) for the garden / feather meal."],
        explanation: "Poultry by-products.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why the family keeps more goats than cattle.",
        points: ["Goats are cheaper to buy and need less feed and space / browse bushes on poor land.", "They breed faster (often twins, short gestation) and can be sold for quick cash when needed."],
        explanation: "Advantages of small ruminants for smallholders.",
      }),
    ],
    explanation: "Classify the animals, calculate a percentage and explain the value of goats and poultry.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 6,
    stem: "A school near Bulawayo has a small grant to start one livestock project. The choices are broilers, goats or a small fish pond. The school has a borehole, a fenced area of veld with bushes, and pupils who are present only during school terms.",
    hints: ["Consider feed, water, labour and the school calendar for each option."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** main products the school could sell from these projects.",
        points: ["Meat (broiler meat or goat meat).", "Fish / live goats / kids."],
        explanation: "Products of each enterprise.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Discuss which project would best suit the school.",
        points: [
          "Goats can browse the fenced veld and bushes, so feed costs are low.",
          "But goats need daily herding or care during holidays as well, and take months to produce saleable animals.",
          "Broilers give quick returns (about six weeks) and can be timed to fit within a school term, but need bought feed and careful daily care.",
          "Judgement with a reason, e.g. broilers timed within each term suit the calendar best, or goats if staff can care for them in holidays.",
        ],
        explanation: "Weigh feed, time to market and labour, then decide.",
      }),
    ],
    explanation: "Compare livestock enterprises against the resources available.",
  });

  b.card("DEFINITION", "Ruminant", "A cud-chewing animal with a four-compartment stomach (rumen, reticulum, omasum, abomasum) whose microbes digest fibre: cattle, sheep, goats.");
  b.card("DEFINITION", "Non-ruminant (monogastric)", "An animal with one simple stomach that does not chew the cud: pigs, poultry, rabbits, horses, donkeys.");
  b.card("DEFINITION", "By-product", "A useful material obtained in addition to the main product, e.g. hides, bones, blood, feathers, horns, hooves, manure.");
  b.card("CONCEPT", "Why ruminants can live on grass", "Microbes in the rumen ferment cellulose, which the animal cannot digest itself, so roughage is turned into meat and milk.");
  b.card("FACT", "What do ruminants have instead of upper incisors?", "A hard dental pad; the lower incisors cut grass against it.");
  b.card("FACT", "Which non-ruminants ferment fibre in the caecum?", "Rabbits, horses and donkeys (hindgut fermenters).");
  b.card("CONCEPT", "Importance of livestock", "Food (meat, milk, eggs), income, draught power, manure, savings, cultural uses (bride wealth), use of dry land, raw materials (hides, wool).");
  b.card("FACT", "By-products of beef cattle", "Hides, bones (bone meal), blood (blood meal), horns, hooves, offal and dung.");
});
