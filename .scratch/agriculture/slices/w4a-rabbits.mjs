// Slice W4a: rabbit production (ZIMSEC only).
import { concept, P, dressingPct, mortalityPct, grossMargin, round, check, table } from "../lib.mjs";

const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const longDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function dateAnswers(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  return [`${d} ${month} ${y}`, `${d} ${month}`, `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`, `${d}/${m}/${y}`, `${month} ${d} ${y}`, `${month} ${d}`, `${d}th ${month}`];
}

// Short: kindling date.
const MATED = "2026-07-15";
const kindle = addDays(MATED, 31);
check(kindle === "2026-08-15", `kindle ${kindle}`);
// Num: dressing %.
const dpR = dressingPct({ carcassKg: 1.17, liveKg: 2.25 });
check(Math.abs(dpR - 52) < 1e-9, "dpR");
// Calc: kits weaned per year from 8 does.
const perYear = 6 * 4 * 8;
check(perYear === 192, "perYear");
// Struct: hutch cards for four does.
const DOES = [["Doe 1", 9, 8], ["Doe 2", 7, 7], ["Doe 3", 10, 6], ["Doe 4", 8, 7]];
const born = DOES.reduce((s, [, b]) => s + b, 0);
const weaned = DOES.reduce((s, [, , w]) => s + w, 0);
const preWean = mortalityPct({ died: born - weaned, started: born });
check(born === 34 && weaned === 28 && Math.abs(preWean - 17.647) < 1e-3, "does");
const DOE_TABLE = table(["Doe", "Kits born alive", "Kits weaned"], DOES);
// Struct: rabbit unit gross margin (assume prices).
const RGM = grossMargin({
  output: [["Dressed rabbits", 48, 6.5], ["Dried pelts", 40, 0.5]],
  variable: [["Rabbit pellets", 140], ["Hay and greens", 25], ["Medicines and disinfectant", 12], ["Packaging", 10]],
});
check(RGM.grossOutput === 332 && RGM.variableCosts === 187 && RGM.grossMargin === 145, "rgm");

concept("agri.livestock.rabbits", { file: "livestock/rabbits", keyPrefix: "livestock.rabbits" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which rabbit breed is kept mainly for its long wool?",
    options: [
      ["Angora", "Correct: its long, fine hair is clipped or plucked."],
      ["New Zealand White", "A meat breed."],
      ["Californian", "A meat breed with dark points."],
      ["Flemish Giant", "A very large meat breed."],
    ],
    answer: "A",
    explanation: "Angora rabbits produce wool; Rex and Chinchilla are valued for fur pelts.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the gestation period of a rabbit?",
    options: [
      ["About 31 days", "Correct."],
      ["About 21 days", "21 days is the incubation period of hen eggs."],
      ["About 114 days", "114 days is the gestation of a sow."],
      ["About 150 days", "About 150 days is the gestation of a ewe or doe goat."],
    ],
    answer: "A",
    explanation: "Rabbits kindle about 31 days after mating.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the doe taken to the buck's hutch for mating rather than the buck to the doe's?",
    options: [
      ["The doe defends her own hutch and may attack the buck", "Correct."],
      ["The buck's hutch is always bigger", "Hutch size is not the reason."],
      ["The buck cannot mate outside his own hutch because of stress", "The usual reason is the doe's behaviour."],
      ["The doe ovulates only when she smells the buck's droppings in his hutch", "Ovulation is induced by mating itself."],
    ],
    answer: "A",
    explanation: "Does are territorial; in the buck's hutch she is more likely to accept mating.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How should a rabbit be lifted?",
    options: [
      ["By the loose skin over the shoulders, supporting the rump", "Correct."],
      ["By the ears", "This hurts and can injure the rabbit."],
      ["By the hind legs, with the head hanging down", "This frightens the rabbit and can injure its back."],
      ["By the tail and the scruff of the neck together, quickly", "Rabbits must not be lifted by the tail."],
    ],
    answer: "A",
    explanation: "Hold the scruff and support the weight under the hindquarters.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What does the doe need a few days before she kindles?"],
    stem: "A doe was mated 27 days ago and is pulling fur from her chest. What should the farmer do?",
    options: [
      ["Put a nest box with dry grass in her hutch", "Correct: she is preparing to kindle in a few days."],
      ["Take her back to the buck to be mated again", "She is pregnant and close to kindling."],
      ["Treat her for mange because she is losing fur", "Fur-pulling at this stage is normal nest building."],
      ["Move her to a new hutch so the kits are born in a clean place far away from other rabbits", "Moving her now causes stress; give a nest box in her hutch."],
    ],
    answer: "A",
    explanation: "Does line the nest with fur just before kindling, about day 27-31.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Where are fibre-digesting microbes found in a rabbit?"],
    stem: "Why do rabbits eat some of their own soft droppings at night?",
    options: [
      ["To obtain protein and B vitamins made by microbes in the caecum", "Correct: this is caecotrophy."],
      ["Because they are short of salt", "Salt shortage is not the reason."],
      ["Because their diet contains too much fibre to digest", "Caecotrophy is normal, not a sign of a poor diet."],
      ["To clean the hutch floor of droppings that would otherwise smell", "It is a nutritional behaviour."],
    ],
    answer: "A",
    explanation: "Soft night droppings come from the caecum and are rich in microbial protein and B vitamins.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which disease is linked to wet, dirty hutches and causes diarrhoea in young rabbits?"],
    stem: "Several weaned rabbits in damp, dirty hutches have diarrhoea and swollen bellies, and some have died. Which disease is most likely?",
    options: [
      ["Coccidiosis", "Correct: a protozoan disease spread through droppings in dirty, damp hutches."],
      ["Ear canker", "Ear canker causes crusts in the ears and head shaking."],
      ["Sore hocks", "Sore hocks are sores on the hind feet."],
      ["Snuffles, which spreads in poorly ventilated hutches", "Snuffles gives sneezing and nasal discharge, not swollen bellies."],
    ],
    answer: "A",
    explanation: "Coccidiosis is common in young rabbits kept in dirty conditions; clean, dry hutches prevent it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A rabbit hutch should be raised off the ground on legs.",
    answer: true,
    explanation: "True. Raising it keeps the rabbits dry and away from predators and makes cleaning easier.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Rabbits have a regular 21-day oestrous cycle like cows.",
    answer: false,
    explanation: "False. Rabbits are induced ovulators: mating triggers the release of eggs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each hutch feature with its purpose.",
    pairs: [
      ["Raised legs", "Keep rabbits dry and safe from predators"],
      ["Wire-mesh floor", "Droppings fall through"],
      ["Overhanging roof", "Protects from rain and direct sun"],
      ["Mesh front", "Ventilation"],
      ["Separate compartments", "Prevent adults fighting"],
    ],
    explanation: "Every feature of a good hutch has a reason; give it in your answer.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A female rabbit is called a {{blank:a}}, and giving birth in rabbits is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["doe"] },
      { id: "b", accepted: ["kindling"] },
    ],
    explanation: "Buck = male, doe = female, kit = young; birth is kindling.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Add 31 days to the mating date."],
    stem: `A doe is mated on ${longDate(MATED)}. Using a gestation period of 31 days, state the expected kindling date.`,
    accepted: dateAnswers(kindle),
    explanation: `${longDate(MATED)} + 31 days = **${longDate(kindle)}**.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Dressing % = carcass ÷ live mass × 100."],
    stem: "A rabbit weighing 2.25 kg live gives a carcass of 1.17 kg. Calculate the dressing percentage.",
    value: dpR, unit: "%", tol: 0.05, answer: "52", wrong: [round((2.25 / 1.17) * 100, 1), 48],
    explanation: `1.17 ÷ 2.25 × 100 = ${dpR}%. 48% is the mass lost, not the dressing percentage.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Multiply kits per litter by litters per year, then by the number of does."],
    stem: "Assume each of Rudo's 8 does weans 6 kits a litter and has 4 litters a year. Calculate the number of young rabbits weaned in a year.",
    value: perYear, unit: "animals", tol: 0, wrong: [6 * 4, 6 * 8],
    explanation: `6 × 4 = 24 per doe per year; 24 × 8 = ${perYear}.`,
    workedSolution: `1. Kits weaned per doe per year = 6 × 4 = 24.\n2. For 8 does = 24 × 8 = ${perYear}.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Think of fat, stretching, drying and storage."],
    stem: "Describe how a rabbit pelt should be prepared for sale.",
    points: [
      "Remove the skin whole (cased) by peeling it off from the hind legs downwards.",
      "Scrape off fat and flesh.",
      "Stretch it flesh-side out on a wire or board stretcher.",
      "Dry it in the shade (not hot sun) and store it dry, away from insects.",
    ],
    modelAnswer: "Peel the skin off whole from the hind legs, scrape off fat and flesh, pull it flesh-side out over a stretcher, dry it in the shade and keep it dry and free of insects until sold.",
    explanation: "Case, clean, stretch, dry in shade, store.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Hutch cards for four New Zealand White does at a school near Mutare.\n\n${DOE_TABLE}`,
    hints: ["Losses = born − weaned.", "Mortality = losses ÷ born × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the total number of kits weaned.",
        value: weaned, unit: "animals", tol: 0, wrong: [born, 7],
        explanation: `8 + 7 + 6 + 7 = ${weaned}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of kits born alive that died before weaning, to one decimal place.",
        value: preWean, unit: "%", tol: 0.05, answer: "17.6", wrong: [round((6 / 28) * 100, 1), 6],
        explanation: `Born ${born}, weaned ${weaned}, died ${born - weaned}; ${born - weaned} ÷ ${born} × 100 = ${round(preWean, 1)}%.`,
      }),
      P.short({
        label: "(c)", stem: "Which doe lost the most kits before weaning?",
        accepted: ["Doe 3", "3", "doe three"],
        explanation: "Doe 3 lost 4 kits (10 born, 6 weaned).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why a doe with a large litter may wean fewer kits.",
        points: ["She may not have enough milk/teats for all the kits, so weak ones starve.", "Kits may be crushed or chilled in a crowded nest / the doe may have mastitis."],
        explanation: "Milk supply and nest problems.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** ways the school could reduce kit losses.",
        points: ["Provide a clean nest box with dry grass a few days before kindling and keep the doe undisturbed.", "Foster extra kits to a doe with a small litter / feed the nursing doe well with plenty of water."],
        explanation: "Nesting and fostering.",
      }),
    ],
    explanation: "Analyse hutch-card records to find kit losses and suggest improvements.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, calculator: true,
    stem: "In one term a school rabbit club sold 48 dressed rabbits at US\\$6.50 each and 40 dried pelts at US\\$0.50 each (assume these prices). Variable costs were: pellets US\\$140, hay and greens US\\$25, medicines and disinfectant US\\$12 and packaging US\\$10.",
    hints: ["Gross output = sum of sales.", "Gross margin = gross output − variable costs."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the gross output, in US\\$.",
        value: RGM.grossOutput, prefix: "US$", wrong: [48 * 6.5, 40 * 0.5],
        explanation: `48 × 6.50 = 312; 40 × 0.50 = 20; total US\\$${RGM.grossOutput}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the gross margin, in US\\$.",
        value: RGM.grossMargin, prefix: "US$", wrong: [RGM.variableCosts, 312 - RGM.variableCosts],
        explanation: `Variable costs = 140 + 25 + 12 + 10 = US\\$${RGM.variableCosts}; ${RGM.grossOutput} − ${RGM.variableCosts} = US\\$${RGM.grossMargin}.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** other ways the club could earn income from its rabbits.",
        points: ["Sell breeding stock or pets.", "Sell rabbit manure for gardens / sell Angora wool or more pelts to craft makers."],
        explanation: "By-products and stock sales.",
      }),
    ],
    explanation: "Gross margin for a rabbit unit.",
  });

  b.card("DEFINITION", "Buck, doe, kit, kindling", "Male, female, young rabbit; kindling = giving birth.");
  b.card("FACT", "Rabbit breeds", "Meat: New Zealand White, Californian, Flemish Giant. Fur: Chinchilla, Rex. Wool: Angora.");
  b.card("FACT", "Rabbit gestation and weaning", "Gestation about 31 days; nest box about day 27; eyes open about day 10; wean at 6-8 weeks.");
  b.card("CONCEPT", "Induced ovulation", "Rabbits have no regular heat cycle; mating triggers ovulation.");
  b.card("CONCEPT", "Why the doe goes to the buck", "Does defend their own hutch and may attack a buck placed there.");
  b.card("DEFINITION", "Caecotrophy", "Rabbits eat soft night droppings from the caecum, rich in microbial protein and B vitamins.");
  b.card("FACT", "Features of a good hutch", "Raised legs, wire or slatted floor, overhanging sloping roof, mesh front, one adult per compartment, predator-proof.");
  b.card("FACT", "Preparing a pelt", "Remove cased, scrape fat and flesh, stretch flesh-side out, dry in the shade, store dry.");
});
