// Slice W4a: digestion in ruminants and non-ruminants.
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Num: rumen share of a goat's stomach (fictional).
const GOAT = [["Rumen", 17], ["Reticulum", 1.5], ["Omasum", 0.5], ["Abomasum", 1]];
const goatTotal = GOAT.reduce((s, [, v]) => s + v, 0);
const goatRumen = pct(17, goatTotal);
check(goatTotal === 20 && goatRumen === 85, "goat");

// Struct: calf stomach development (fictional measurements).
const CALF = [["At birth", 0.75, 2], ["8 weeks", 6, 3], ["Adult (2 years)", 120, 12]];
const calfShares = CALF.map(([, r, a]) => pct(r, r + a));
check(Math.abs(calfShares[0] - 27.2727) < 1e-3 && Math.abs(calfShares[1] - 66.6667) < 1e-3 && Math.abs(calfShares[2] - 90.9091) < 1e-3, "calf");
const CALF_TABLE = table(["Age of the animal", "Rumen and reticulum (L)", "Abomasum (L)"], CALF);

concept("agri.livestock.digestion", { file: "livestock/digestion", keyPrefix: "livestock.digestion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which compartment of a cow's stomach is called the true stomach?",
    options: [
      ["Abomasum", "Correct: it has glands that secrete acid gastric juice."],
      ["Rumen", "The rumen is the fermentation chamber, with no gastric glands."],
      ["Reticulum", "The reticulum has a honeycomb lining and traps heavy objects."],
      ["Omasum", "The omasum has many folded leaves and absorbs water."],
    ],
    answer: "A",
    explanation: "The abomasum works like the stomach of a pig, digesting protein with acid gastric juice.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the main function of the gizzard in a fowl?",
    options: [
      ["Grinding food with the help of grit", "Correct: its thick muscular walls crush the food."],
      ["Storing and softening food", "This is the crop."],
      ["Secreting acid gastric juice", "This is the proventriculus (glandular stomach)."],
      ["Absorbing the digested food into the blood through villi", "Absorption takes place mainly in the small intestine."],
    ],
    answer: "A",
    explanation: "Poultry have no teeth, so the muscular gizzard, helped by grit, grinds the food.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which compartment of the ruminant stomach has a honeycomb lining and traps heavy objects such as nails?",
    options: [
      ["Reticulum", "Correct: wire and nails collect here (hardware disease)."],
      ["Omasum", "The omasum has leaf-like folds that absorb water."],
      ["Abomasum", "The abomasum is the glandular true stomach."],
      ["Rumen", "The rumen is the large fermentation chamber with a lining of small papillae."],
    ],
    answer: "A",
    explanation: "The reticulum lies against the rumen; its honeycomb lining and strong contractions mean swallowed metal collects and may pierce it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main source of energy that a cow absorbs from the rumen?",
    options: [
      ["Volatile fatty acids made by microbes", "Correct: they are absorbed through the rumen wall."],
      ["Glucose released from cellulose by the cow's own enzymes", "The cow makes no cellulose-digesting enzyme."],
      ["Methane gas produced by fermentation in the rumen", "Methane is belched out and wasted."],
      ["Amino acids from the saliva", "Saliva supplies buffer and water, not energy."],
    ],
    answer: "A",
    explanation: "Rumen microbes ferment cellulose and starch to volatile fatty acids, which supply most of a ruminant's energy.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Where does milk need to go to be digested?"],
    stem: "What is the function of the oesophageal groove in a young calf?",
    options: [
      ["It carries milk straight to the abomasum", "Correct: the milk bypasses the undeveloped rumen."],
      ["It stores milk until the calf ruminates it", "Milk is not ruminated."],
      ["It grinds solid food before it reaches the rumen", "No part of the oesophagus grinds food."],
      ["It returns cud from the rumen to the mouth for re-chewing in the young calf", "Calves do not ruminate milk; the groove does the opposite job."],
    ],
    answer: "A",
    explanation: "When the calf sucks, the groove closes into a tube so milk goes directly to the abomasum, where it is digested.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which animal can make use of fibre?"],
    stem: "A farmer has plenty of maize stover and veld hay but little grain. Which animal can make the best use of these feeds?",
    options: [
      ["Steers being grown on for beef", "Correct: rumen microbes digest the fibre in stover and hay."],
      ["Broilers in a deep-litter house", "Broilers digest fibre poorly and need concentrates."],
      ["Pigs being fattened for bacon", "Pigs digest little fibre and need starch and protein feeds."],
      ["Layers in cages that are fed only on a mash of maize grain and soya meal", "Layers also need concentrates, not stover."],
    ],
    answer: "A",
    explanation: "Ruminants turn roughage into meat and milk; pigs and poultry need concentrates.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What does saliva do to the acidity of the rumen?"],
    stem: "Cattle fed mainly on grain and very little roughage chew the cud less and may suffer an over-acid rumen. Which explanation is best?",
    options: [
      ["Less chewing gives less saliva to buffer the acids made by fermentation", "Correct: saliva neutralises acid; roughage stimulates chewing and saliva."],
      ["Grain contains acid that is released as soon as it is swallowed", "The acid is produced by fermentation in the rumen, not carried in the grain."],
      ["The abomasum stops working, so its acid leaks back into the rumen", "Acid from the abomasum does not flow back into the rumen."],
      ["Without roughage the microbes die and release their acid", "Fermentation of starch speeds up; it is the products of fermentation that are acid."],
    ],
    answer: "A",
    explanation: "Roughage makes cattle chew and ruminate, producing large volumes of buffering saliva. Grain ferments quickly to acids, so rations need enough fibre.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the fowl, the crop stores and softens food before it reaches the gizzard.",
    answer: true,
    explanation: "True. The crop is a pouch of the oesophagus that stores and moistens food.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a new-born calf the rumen is the largest compartment of the stomach.",
    answer: false,
    explanation: "False. At birth the abomasum is the largest; the rumen develops as the calf eats solid food.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the digestive system with its function.",
    pairs: [
      ["Rumen", "Microbial fermentation of cellulose"],
      ["Omasum", "Absorbs water from the food"],
      ["Proventriculus", "Glandular stomach of the fowl"],
      ["Small intestine", "Main site of absorption through villi"],
      ["Crop", "Stores and softens food in the fowl"],
    ],
    explanation: "Learn each part with one clear function.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Ruminants have no upper incisors; they cut grass against the {{blank:a}}. Gases such as {{blank:b}} produced in the rumen are removed by belching.",
    blanks: [
      { id: "a", accepted: ["dental pad", "pad"] },
      { id: "b", accepted: ["methane", "carbon dioxide", "CH4", "CO2"] },
    ],
    explanation: "Dental pad; methane and carbon dioxide are belched out (eructation).",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["The folds look like the pages of a book."],
    stem: "A pupil dissecting a sheep's stomach finds a compartment packed with thin folds like the pages of a book. Name this compartment.",
    accepted: ["omasum", "manyplies", "the omasum", "psalterium"],
    keywords: { any: ["omasum", "manyplies", "psalterium"] },
    explanation: "The **omasum** (manyplies) has many leaves that squeeze food and absorb water.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Add the four capacities to get the total."],
    stem: `The stomach compartments of an adult goat held these volumes: rumen ${GOAT[0][1]} L, reticulum ${GOAT[1][1]} L, omasum ${GOAT[2][1]} L, abomasum ${GOAT[3][1]} L. Calculate the rumen's share of the total stomach volume as a percentage.`,
    value: goatRumen, unit: "%", tol: 0, wrong: [round(pct(17, 3), 1), 17],
    explanation: `Total = 17 + 1.5 + 0.5 + 1 = ${goatTotal} L. Rumen share = 17 ÷ ${goatTotal} × 100 = ${goatRumen}%. Dividing by the other three compartments only (3 L) is a common error.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think of the mouth, the rumen and the absorption of water."],
    stem: "Describe what happens during rumination.",
    points: [
      "A soft ball of partly fermented food (the cud) is regurgitated from the rumen/reticulum up the oesophagus to the mouth.",
      "It is chewed again thoroughly with much saliva, breaking fibre into smaller pieces.",
      "It is swallowed again, so microbes can act on a larger surface area (and saliva buffers the rumen).",
    ],
    modelAnswer: "The cud is brought back up from the rumen to the mouth, re-chewed thoroughly with saliva and swallowed again, which breaks the fibre into small pieces that microbes digest faster.",
    explanation: "Regurgitate, re-chew, re-swallow, with the purpose.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Compare the stomach, the teeth and the use of fibre."],
    stem: "State **four** differences between the digestive system of a cow and that of a pig.",
    points: [
      "Cow has a four-compartment stomach; pig has a single simple stomach.",
      "Cow has no upper incisors (dental pad); pig has a full set of teeth.",
      "Cow ruminates (chews the cud); pig does not.",
      "Cow digests cellulose by microbes in the rumen; pig digests little fibre (only a little in the colon) / cow absorbs volatile fatty acids from the rumen.",
    ],
    modelAnswer: "The cow has four stomach compartments, the pig one. The cow has a dental pad instead of upper incisors; the pig has upper incisors. The cow chews the cud; the pig does not. Microbes in the cow's rumen digest cellulose, but the pig digests very little fibre.",
    explanation: "Each difference must state both animals.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A veterinary student measured the stomach compartments of calves and an adult animal (fictional data).\n\n${CALF_TABLE}`,
    hints: ["Share = rumen and reticulum ÷ (rumen and reticulum + abomasum) × 100.", "What does the calf eat at each age?"],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the rumen and reticulum as a percentage of the total of the two values for the calf at 8 weeks, to one decimal place.",
        value: calfShares[1], unit: "%", tol: 0.05, answer: "66.7", wrong: [200, 50],
        explanation: `6 ÷ (6 + 3) × 100 = ${round(calfShares[1], 1)}%. Dividing 6 by 3 gives 200%, a ratio, not a share.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which compartment is largest at birth?",
        options: [
          ["The abomasum", "Correct: 2 L compared with 0.75 L."],
          ["The rumen and reticulum", "They hold only 0.75 L at birth."],
          ["They are both exactly the same size at birth", "The figures differ."],
          ["The omasum, which is not listed in the table", "The table gives no data for it; the abomasum is clearly larger."],
        ],
        answer: "A",
        explanation: "At birth the abomasum is the largest compartment because the calf lives on milk.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the abomasum is the most important compartment for a new-born calf.",
        points: ["The calf lives on milk, which is digested in the abomasum (true stomach).", "The oesophageal groove carries the milk directly to the abomasum, bypassing the rumen."],
        explanation: "Milk digestion and the oesophageal groove.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the rumen grows so much between birth and adulthood, and how a farmer can encourage this.",
        points: [
          "As the calf eats solid food (hay, starter), microbes colonise the rumen and fermentation begins.",
          "The products of fermentation stimulate the rumen wall and its papillae to grow, and its volume increases to hold bulky roughage.",
          "The farmer offers good hay, calf starter and clean water from the first week or two.",
        ],
        explanation: "Solid feed drives rumen development.",
      }),
    ],
    explanation: "Interpret data on rumen development and explain the role of milk, the oesophageal groove and solid feed.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: "A described diagram of the digestive system of a fowl lists, in order from the mouth: P, a beak; Q, a pouch in the neck; R, a small glandular organ; S, a thick muscular organ containing small stones; T, a long coiled tube; U, two blind-ended tubes; V, a short tube ending at the vent.",
    hints: ["Work through the parts in order: beak, crop, proventriculus, gizzard, small intestine, caeca, large intestine."],
    parts: [
      P.short({
        label: "(a)", stem: "Name part Q.",
        accepted: ["crop", "the crop"],
        explanation: "Q is the crop.",
      }),
      P.short({
        label: "(b)", stem: "Name part S.",
        accepted: ["gizzard", "the gizzard", "ventriculus"],
        keywords: { any: ["gizzard", "ventriculus"] },
        explanation: "S is the gizzard.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State the function of part R and of part U.",
        points: ["R (proventriculus): secretes acid gastric juice / begins protein digestion.", "U (caeca): some microbial fermentation of fibre / water absorption."],
        explanation: "Proventriculus and caeca.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why birds kept in a house and fed whole grain should be given grit.",
        points: ["Birds have no teeth, so the gizzard grinds food.", "Grit (small hard stones) in the gizzard helps crush whole grain; housed birds cannot find stones for themselves."],
        explanation: "Gizzard and grit.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why poultry need a diet lower in fibre than cattle.",
        points: ["Poultry are non-ruminants with no rumen, so they ferment very little fibre (only a little in the caeca).", "Fibre would fill the gut without supplying energy, so growth or laying would fall."],
        explanation: "Link structure to diet.",
      }),
    ],
    explanation: "Identify the parts of the fowl's gut from a description and link them to function and diet.",
  });

  b.card("DEFINITION", "Rumination", "Regurgitating the cud from the rumen, chewing it again with saliva and swallowing it again.");
  b.card("CONCEPT", "Rumen", "Largest compartment (left side); bacteria and protozoa ferment cellulose to volatile fatty acids (absorbed), make microbial protein and B vitamins; gases belched.");
  b.card("FACT", "Reticulum", "Honeycomb lining; moves food on or back for rumination; traps heavy objects (hardware disease).");
  b.card("FACT", "Omasum", "Many folded leaves (manyplies); squeezes food and absorbs water.");
  b.card("FACT", "Abomasum", "The true stomach: glands secrete acid gastric juice; digests protein, including microbes from the rumen.");
  b.card("CONCEPT", "Oesophageal groove", "In the sucking calf it closes into a tube that carries milk straight to the abomasum, bypassing the undeveloped rumen.");
  b.card("FACT", "Crop, proventriculus, gizzard", "Crop stores and softens food; proventriculus secretes gastric juice; gizzard grinds food with grit.");
  b.card("CONCEPT", "Why pigs and poultry need concentrates", "Their single stomach cannot ferment much fibre, so they need feeds rich in starch and protein.");
});
