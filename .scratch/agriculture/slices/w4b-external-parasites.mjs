// Slice W4b: external parasites.
import { concept, P, dilution, pctChange, mean, round, check, table } from "../lib.mjs";

const dipL = dilution({ mlPerL: 1.5, tankL: 12000 }).concentrateMl / 1000;
check(dipL === 18, "dipL");
const knap = dilution({ mlPerL: 2.5, tankL: 20 }).concentrateMl;
check(knap === 50, "knap");
const fall = -pctChange(150, 30);
check(fall === 80, "fall");
// Struct 8: tick counts per animal by month in two herds.
const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb"];
const A = [22, 35, 41, 38, 30];
const B = [25, 64, 118, 152, 140];
const TT = table(["Month", "Herd A: dipped weekly", "Herd B: dipped monthly"], MONTHS.map((m, i) => [m, A[i], B[i]]));
const meanA = mean(A), meanB = mean(B);
check(meanA === 33.2 && meanB === 99.8, "means");
const bRise = round(pctChange(B[0], B[3]), 1);
check(bRise === 508, "bRise");

concept("agri.health.external-parasites", { file: "health/external-parasites", keyPrefix: "health.external-parasites" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an external parasite of cattle?",
    options: [
      ["The blue tick", "Correct: lives on the skin and sucks blood."],
      ["The wireworm", "A roundworm living in the gut."],
      ["The liver fluke", "Lives in the liver."],
      ["The tapeworm", "Lives in the intestine."],
    ],
    answer: "A",
    explanation: "Ticks live on the outside of the host; the others are internal parasites.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which disease is spread by the blue tick?",
    options: [
      ["Redwater", "Correct: and gallsickness."],
      ["Heartwater", "Spread by the bont tick."],
      ["Theileriosis (January disease)", "Spread by the brown ear tick."],
      ["Trypanosomiasis", "Spread by tsetse flies."],
    ],
    answer: "A",
    explanation: "The blue tick, a one-host tick, transmits redwater (babesiosis) and gallsickness (anaplasmosis).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by a one-host tick?",
    options: [
      ["All feeding stages stay on one animal", "Correct."],
      ["It feeds only on one species of animal", "One-host refers to individuals, not species."],
      ["It needs only one blood meal in its life", "Each stage feeds."],
      ["Only the adult female feeds on blood", "Larvae and nymphs feed too."],
    ],
    answer: "A",
    explanation: "Larva, nymph and adult all feed on the same individual animal; only the engorged female drops off.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many legs does the larva of a tick have?",
    options: [
      ["Six", "Correct: nymphs and adults have eight."],
      ["Eight", "That is the nymph and adult."],
      ["Four", "No tick stage has four legs."],
      ["Ten", "No tick stage has ten legs."],
    ],
    answer: "A",
    explanation: "Tick larvae have six legs; after moulting the nymph and adult have eight.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are three-host ticks harder to control by dipping than one-host ticks?",
    options: [
      ["Much of their life is spent off the host", "Correct: dipping reaches only stages on the animal."],
      ["They are too large for acaricides to kill", "Size is not the reason."],
      ["They feed only in winter when dipping stops", "They are most active in the wet season."],
      ["They live inside the animal's gut", "They are external parasites."],
    ],
    answer: "A",
    hints: ["Where does each stage moult?"],
    explanation: "Each stage drops off to moult on the ground and can survive a long time on the veld, out of reach of dip.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A pig has thick, crusty, hairless patches of skin and scratches constantly. Which parasite is most likely?",
    options: [
      ["Mange mites", "Correct: they burrow in the skin."],
      ["Brown ear ticks", "These attach inside cattle ears."],
      ["Tsetse flies", "They bite and spread trypanosomes."],
      ["Liver flukes", "Internal parasites of the liver."],
    ],
    answer: "A",
    hints: ["Which parasite causes mange?"],
    explanation: "Mites cause mange: intense itching and thick, crusty skin.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "To save money, a farmer halves the amount of acaricide concentrate in his dip wash. What is the most serious long-term result?",
    options: [
      ["Ticks may become resistant to the acaricide", "Correct: survivors breed resistant ticks."],
      ["The cattle will gain weight faster", "More ticks means poorer growth."],
      ["The wash will become stronger over time", "It stays weak."],
      ["Ticks will move from the cattle to the goats only", "Not a result of weak dip."],
    ],
    answer: "A",
    hints: ["Which ticks survive a weak dip?"],
    explanation: "A weak wash lets the toughest ticks survive and breed, so resistance spreads and the acaricide stops working.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is tick grease applied to the ears and under the tail of cattle?",
    options: [
      ["Ticks hide there where dip may not reach", "Correct: hand dressing covers missed sites."],
      ["Grease helps cattle hear better", "Not a purpose of tick grease."],
      ["It stops the cattle from drinking dip wash in the tank", "Grease has no effect on drinking."],
      ["It makes the cattle grow longer hair", "Not a purpose of tick grease."],
    ],
    answer: "A",
    hints: ["Where do brown ear ticks attach?"],
    explanation: "Brown ear ticks and others attach in places that dip or spray may not wet thoroughly.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Ticks are insects.",
    answer: false,
    explanation: "False. Ticks are arachnids: nymphs and adults have eight legs. Insects such as lice and fleas have six.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each tick with a disease it transmits.",
    pairs: [
      ["Blue tick", "Gallsickness (anaplasmosis)"],
      ["Brown ear tick", "Theileriosis (January disease)"],
      ["Bont tick", "Heartwater"],
    ],
    explanation: "Blue tick: redwater and gallsickness. Brown ear tick: theileriosis. Bont tick: heartwater.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the stages of a tick's life cycle.",
    template: "egg → {{blank:a}} → {{blank:b}} → adult",
    blanks: [{ id: "a", accepted: ["larva", "larvae", "seed tick"] }, { id: "b", accepted: ["nymph", "nymphs"] }],
    explanation: "Egg, larva (six legs), nymph (eight legs), adult.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the general term for a chemical that kills ticks.",
    accepted: ["acaricide", "acaricides", "tickicide", "dip", "dip chemical"],
    keywords: { any: ["acaricid", "tickicid"] },
    explanation: "An **acaricide**.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A dip tank holds 12,000 L. Assume the acaricide is used at 1.5 mL of concentrate per litre. How many litres of concentrate are needed to charge the tank?",
    value: dipL, unit: "L", tol: 0, wrong: [18000, 12000 / 1.5 / 1000],
    explanation: `1.5 × 12,000 = 18,000 mL = ${dipL} L. Forgetting to convert mL to L gives 18,000.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A goat keeper mixes an acaricide spray at 2.5 mL per litre (assume) in a 20 L knapsack sprayer. How many mL of concentrate are needed?",
    value: knap, unit: "mL", tol: 0, wrong: [8, 22.5],
    explanation: `2.5 × 20 = ${knap} mL.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Average tick counts fall from 150 to 30 per animal after a month of regular dipping. Calculate the percentage reduction.",
    value: fall, unit: "%", tol: 0, wrong: [20, 120],
    hints: ["Reduction ÷ starting count × 100."],
    explanation: `(150 − 30) ÷ 150 × 100 = ${fall}%. 20% is what remains, not the reduction.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which ticks reduce the profits of a beef farmer.",
    hints: ["Think of blood, disease and hides."],
    points: [
      "Ticks suck blood, causing anaemia and irritation.",
      "So cattle grow more slowly and reach market weight later / lose condition.",
      "Ticks transmit diseases such as redwater, gallsickness and heartwater.",
      "Which kill cattle or need costly treatment / bites damage hides, lowering their value.",
    ],
    modelAnswer: "Ticks suck blood and irritate cattle, so they grow slowly and fetch less. They also spread redwater and heartwater, which kill animals or need expensive treatment, and their bites leave holes that lower the value of hides.",
    explanation: "Problem plus effect on profit.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "State **three** precautions to take when dipping cattle in a plunge dip.",
    hints: ["Think of the animals, the wash and the people."],
    points: [
      "Do not dip animals that are hot, tired or thirsty (water them first) / handle young calves so they do not swallow wash.",
      "Keep the wash at the correct strength, replenished as instructed.",
      "Wear protective clothing when handling concentrate / keep wash out of rivers and dams.",
    ],
    modelAnswer: "Water and rest the cattle before dipping so they do not drink the wash, keep the wash at the correct strength, and wear protective clothing when handling the concentrate and never let wash drain into a river.",
    explanation: "Animals, wash, people and environment.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Two herds near Masvingo graze similar veld. Herd A is dipped weekly and herd B monthly. Average ticks counted per animal on one side are shown.\n\n${TT}`,
    hints: ["Mean = total ÷ number of months.", "When are ticks most numerous?"],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mean tick count for herd B over the five months.",
        value: meanB, tol: 0.05, answer: "99.8", wrong: [round(B.reduce((s, x) => s + x, 0), 0), meanA],
        explanation: `(25 + 64 + 118 + 152 + 140) ÷ 5 = 499 ÷ 5 = ${meanB}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in herd B's tick count from October to January.",
        value: bRise, unit: "%", tol: 0.5, answer: "508", wrong: [152 - 25, round(pctChange(25, 152) / 100, 2)],
        explanation: `(152 − 25) ÷ 25 × 100 = ${bRise}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why tick numbers rise in both herds from October to January.",
        points: ["The hot, wet season (summer rains) favours egg hatching and survival of larvae.", "Long, moist grass gives larvae places to wait for hosts / more ticks complete their life cycle."],
        explanation: "Climate drives tick numbers.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why weekly dipping keeps blue tick numbers much lower than monthly dipping.",
        points: ["The blue tick stays on one host for about three weeks from larva to engorged female.", "Weekly dipping kills ticks before the females drop off to lay eggs; with monthly dipping many females complete feeding and lay thousands of eggs."],
        explanation: "Dip interval shorter than the time on the host.",
      }),
    ],
    explanation: "Interpret tick counts and link dipping interval to the one-host life cycle.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Rudo's goats near Hwange have dull coats, rub against fences and have small, pale eggs glued to their hairs. One kid has a wound full of maggots.",
    hints: ["Which parasites glue their eggs to hairs?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the parasite whose eggs are glued to the hairs.",
        accepted: ["lice", "louse", "goat lice", "biting lice", "sucking lice"],
        keywords: { any: ["lice", "louse"] },
        explanation: "**Lice**; their eggs (nits) are glued to hairs.",
      }),
      P.mcq({
        label: "(b)", stem: "Which insect causes the maggots in the wound?",
        options: [
          ["A blowfly", "Correct: blowflies lay eggs in wounds (fly strike)."],
          ["A tsetse fly", "Tsetse suck blood; they do not cause maggots in wounds."],
          ["A flea", "Fleas do not produce maggots in wounds."],
          ["A mosquito", "Mosquito larvae live in water."],
        ],
        answer: "A",
        explanation: "Blowflies lay eggs on wounds and the maggots feed on the flesh.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how Rudo should treat the wounded kid.",
        points: ["Restrain the kid calmly, remove the maggots and clean the wound (wearing gloves).", "Apply an insecticidal wound dressing and keep checking until it heals."],
        explanation: "Clean, dress, monitor.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** ways of controlling the lice in the whole herd.",
        points: ["Treat (spray, dip or dust) all the goats in the herd, repeating the treatment to kill lice that hatch later.", "Clean the housing and bedding / improve feeding (lice are worse on animals in poor condition) / isolate and treat new goats."],
        explanation: "Treat all, repeat, hygiene.",
      }),
    ],
    explanation: "Identify external parasites from signs and plan treatment.",
  });

  b.card("DEFINITION", "External parasite (ectoparasite)", "A parasite living on the outside of its host, e.g. ticks, lice, mites, fleas, biting flies.");
  b.card("DEFINITION", "One-host tick", "A tick whose larva, nymph and adult all feed on the same animal (e.g. blue tick).");
  b.card("DEFINITION", "Three-host tick", "A tick whose larva, nymph and adult each feed on a different host, moulting on the ground (e.g. brown ear tick, bont tick).");
  b.card("FACT", "Diseases spread by the blue tick", "Redwater (babesiosis) and gallsickness (anaplasmosis).");
  b.card("FACT", "Diseases spread by the brown ear tick and the bont tick", "Brown ear tick: theileriosis (January disease). Bont tick: heartwater.");
  b.card("CONCEPT", "Life cycle of the blue tick", "Engorged female drops and lays eggs → larvae climb grass → attach to host → moult to nymph and adult on the same host → female engorges (about 3 weeks) and drops.");
  b.card("CONCEPT", "Six damages caused by external parasites", "Blood loss, irritation, damaged hides, damaged teats, disease transmission, lower production.");
  b.card("CONCEPT", "Methods of tick control", "Plunge dip, spray race, hand spraying, pour-ons, tick grease, pasture spelling, tick-resistant breeds.");
  b.card("FACT", "Why keep dip wash at full strength?", "A weak wash leaves survivors and leads to acaricide resistance.");
});
