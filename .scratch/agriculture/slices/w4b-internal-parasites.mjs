// Slice W4b: internal parasites.
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Dose: assume 2.5 mL per 10 kg; heaviest sheep 48 kg; 15 sheep.
const doseEach = round((48 / 10) * 2.5, 3);
const doseAll = round(doseEach * 15, 3);
check(doseEach === 12 && doseAll === 180, "dose");
const paleP = pct(9, 36);
check(paleP === 25, "paleP");
// Calc: lambs dosed 160 g/day vs undosed 110 g/day over 90 days.
const extraKg = round(((160 - 110) * 90) / 1000, 3);
check(extraKg === 4.5, "extraKg");
// Struct 8: kid weights in two grazing systems.
const KIDS = [["Same paddock all season", 12, 3.1, 7], ["Rotated through 4 paddocks", 12, 4.6, 1]];
const KT = table(["Grazing system", "Kids", "Mean gain over 12 weeks (kg)", "Kids with bottle jaw"], KIDS);
const gainDiff = round(4.6 - 3.1, 2);
const gainPct = round(pct(4.6 - 3.1, 3.1), 1);
check(gainDiff === 1.5 && gainPct === 48.4, "kids");
const perDay = round((4.6 * 1000) / (12 * 7), 1);
check(perDay === 54.8, "perDay");

concept("agri.health.internal-parasites", { file: "health/internal-parasites", keyPrefix: "health.internal-parasites" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an internal parasite of livestock?",
    options: [
      ["Liver fluke", "Correct: lives in the bile ducts."],
      ["Blue tick", "An external parasite."],
      ["Louse", "An external parasite."],
      ["Mange mite", "An external parasite of the skin."],
    ],
    answer: "A",
    explanation: "Liver fluke lives inside the liver; ticks, lice and mites live on the skin.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which organism is the intermediate host of the liver fluke?",
    options: [
      ["A water snail", "Correct."],
      ["The tsetse fly", "Vector of trypanosomes, not fluke."],
      ["The earthworm", "Not part of the fluke's life cycle."],
      ["A pasture tick", "Ticks are not hosts of liver fluke."],
    ],
    answer: "A",
    explanation: "Fluke larvae multiply inside water snails before forming cysts on grass.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the life cycle of a roundworm of sheep, which stage is swallowed by the sheep?",
    options: [
      ["The infective larva on the grass", "Correct: the third-stage larva."],
      ["The adult worm in the dung", "Adults stay in the gut."],
      ["The egg inside a water snail", "Roundworms do not use snails."],
      ["A cyst in the muscle of a pig", "That relates to pork tapeworm."],
    ],
    answer: "A",
    explanation: "Eggs hatch in dung; larvae moult to the infective stage, climb grass and are eaten.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A goat has pale inner eyelids and a soft swelling under the jaw. Which parasite is most likely responsible?",
    options: [
      ["Wireworm, a blood-sucking roundworm", "Correct: anaemia and bottle jaw."],
      ["Brown ear tick", "Attaches in the ears; not linked to bottle jaw."],
      ["Mange mite", "Causes crusty skin and itching."],
      ["Tapeworm segments in the small intestine", "Tapeworms do not usually cause severe anaemia."],
    ],
    answer: "A",
    hints: ["Bottle jaw follows loss of blood protein."],
    explanation: "Wireworm sucks blood in the abomasum, causing anaemia and fluid under the jaw (bottle jaw).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should a group of animals be dosed according to the weight of the heaviest animal?",
    options: [
      ["To avoid under-dosing that leaves worms alive", "Correct: and slows resistance."],
      ["Because heavier animals always carry the most worms", "Not the reason."],
      ["To use up the drug faster", "Not the reason."],
      ["Light animals need no dewormer", "They also carry worms."],
    ],
    answer: "A",
    hints: ["What happens to worms that receive too little drug?"],
    explanation: "Under-dosed worms survive and their offspring are more likely to be resistant to the drug.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are worm burdens usually highest in the rainy season?",
    options: [
      ["Warm, moist weather helps larvae develop", "Correct: larvae also climb wet grass."],
      ["Animals drink less water when it rains", "Drinking has little effect on worms."],
      ["Dewormers do not work properly in wet, rainy weather", "Drugs work in any weather."],
      ["Worms die in dry dung, so dung is not passed", "Animals pass dung all year."],
    ],
    answer: "A",
    hints: ["What do larvae need to survive and move?"],
    explanation: "Eggs hatch and larvae develop fast in warm, wet weather and move up wet grass, so infection peaks in the rains.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure best breaks the life cycle of the beef tapeworm?",
    options: [
      ["Using toilets so human faeces do not reach grazing", "Correct: cattle cannot swallow eggs."],
      ["Dosing all the cattle with a dewormer every single week", "Cysts in muscle are not the target."],
      ["Draining swamps to kill water snails", "That controls liver fluke."],
      ["Dipping cattle in acaricide", "Dipping controls ticks."],
    ],
    answer: "A",
    hints: ["Where does the adult beef tapeworm live?"],
    explanation: "The adult lives in people; cattle are infected by eggs from human faeces, so sanitation (with meat inspection and thorough cooking) breaks the cycle.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is an anthelmintic?",
    options: [
      ["A drug that kills internal worms", "Correct: a dewormer."],
      ["A chemical that kills ticks", "That is an acaricide."],
      ["A vaccine against worms", "Anthelmintics are drugs, not vaccines."],
      ["A feed that fattens wormy animals", "Not a definition."],
    ],
    answer: "A",
    explanation: "Anthelmintics (dewormers) kill parasitic worms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Roundworms of sheep and goats have a direct life cycle with no intermediate host.",
    answer: true,
    explanation: "True. Larvae develop on pasture and are swallowed by the same kind of host.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each parasite with a feature.",
    pairs: [
      ["Roundworm", "Round, unsegmented; direct life cycle"],
      ["Tapeworm", "Flat and made of segments"],
      ["Liver fluke", "Leaf-shaped; uses water snails"],
      ["Beef tapeworm cysts", "Measles in cattle muscle"],
    ],
    explanation: "Learn the body shape and life cycle feature of each group.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the roundworm life cycle.",
    template: "Adults in gut → eggs passed in {{blank:a}} → larvae develop on pasture → infective larvae climb {{blank:b}} → swallowed by grazing animal.",
    blanks: [{ id: "a", accepted: ["dung", "faeces", "droppings", "manure", "feces"] }, { id: "b", accepted: ["grass", "grass blades", "herbage", "pasture"] }],
    explanation: "Eggs leave in dung; infective larvae move up grass blades.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the swelling under the jaw of sheep and goats caused by fluid collecting when worms cause loss of blood protein.",
    accepted: ["bottle jaw", "bottlejaw", "submandibular oedema", "submandibular edema"],
    keywords: { any: ["bottle"] },
    explanation: "**Bottle jaw**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "Assume a dewormer is given at 2.5 mL per 10 kg body weight. The heaviest sheep in a group weighs 48 kg. Calculate the dose for each sheep, in mL.",
    value: doseEach, unit: "mL", tol: 0, wrong: [4.8, round(48 / 2.5, 1)],
    hints: ["Number of 10 kg units × 2.5 mL."],
    explanation: `48 ÷ 10 = 4.8; 4.8 × 2.5 = ${doseEach} mL.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A farmer checks 36 goats with an eyelid colour chart and finds 9 very pale. Calculate the percentage that are anaemic.",
    value: paleP, unit: "%", tol: 0, wrong: [9, 75],
    explanation: `9 ÷ 36 × 100 = ${paleP}%.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Dosed lambs gain 160 g a day and undosed lambs on the same pasture gain 110 g a day. Calculate the extra live mass, in kg, that each dosed lamb gains over 90 days.",
    value: extraKg, unit: "kg", tol: 0.05, answer: "4.5", wrong: [round((160 * 90) / 1000, 1), 4500],
    hints: ["Extra gain per day × days, then convert g to kg."],
    explanation: `(160 − 110) × 90 = 4,500 g = ${extraKg} kg extra per lamb.`,
    workedSolution: `1. Extra gain per day = 160 − 110 = 50 g.\n2. Over 90 days = 50 × 90 = 4,500 g.\n3. 4,500 ÷ 1,000 = ${extraKg} kg per lamb.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** signs that a herd of young cattle has a heavy burden of internal worms.",
    hints: ["Condition, coat, eyes, dung."],
    points: [
      "Loss of weight / poor growth despite enough feed.",
      "Rough, dull, staring coat.",
      "Pale membranes (anaemia) / bottle jaw.",
      "Diarrhoea and dirty hindquarters / pot belly / worms or segments in dung / coughing.",
    ],
    modelAnswer: "The calves grow poorly and lose condition although feed is good, their coats are rough and dull, their eye membranes are pale, and they have diarrhoea with dirty hindquarters.",
    explanation: "Any four distinct signs.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain how draining a swampy area of a farm helps to control liver fluke.",
    hints: ["What lives in the swamp?"],
    points: [
      "Water snails, the intermediate hosts, live in wet, swampy areas.",
      "Without water the snails die / cannot breed, so fluke larvae cannot multiply.",
      "Fewer cysts form on grass at the water's edge, so fewer are swallowed by grazing animals.",
    ],
    modelAnswer: "The fluke must pass through water snails, which live in swamps. Draining removes the snails' habitat, so the larvae cannot multiply and fewer cysts form on the grass that cattle eat.",
    explanation: "Break the cycle at the intermediate host.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A school near Gweru compared two groups of weaned kids over 12 weeks of the rainy season. Both groups were dewormed at the start.\n\n${KT}`,
    hints: ["Percentage difference = difference ÷ smaller value × 100.", "How does rotation affect larvae on the grass?"],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the difference in mean gain between the two groups, in kg.",
        value: gainDiff, unit: "kg", tol: 0.05, answer: "1.5", wrong: [7.7],
        explanation: `4.6 − 3.1 = ${gainDiff} kg.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the rotated kids' extra gain as a percentage of the gain of the kids kept in one paddock, to one decimal place.",
        value: gainPct, unit: "%", tol: 0.05, answer: "48.4", wrong: [round(pct(1.5, 4.6), 1), 1.5],
        explanation: `1.5 ÷ 3.1 × 100 = ${gainPct}%.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the mean daily gain of the rotated kids, in g/day, to one decimal place.",
        value: perDay, unit: "g/day", tol: 0.05, answer: "54.8", wrong: [round(4.6 / 84, 3), round((4.6 * 1000) / 12, 1)],
        explanation: `12 weeks = 84 days; 4,600 g ÷ 84 = ${perDay} g/day.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the kids kept in one paddock all season grew less and had more bottle jaw.",
        points: ["Dung from the kids built up eggs and larvae on the single paddock all season.", "Warm, wet weather let many larvae reach the infective stage on the grass, so the kids were constantly reinfected (after the first dose).", "Blood-sucking worms caused anaemia and protein loss (bottle jaw), so less feed went to growth; rotation rested paddocks so larvae died."],
        explanation: "Reinfection versus resting paddocks.",
      }),
    ],
    explanation: "Analyse a grazing trial and link worm control to the roundworm life cycle.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Several cattle on a farm near Marondera are thin and anaemic. Leaf-shaped flat worms are found in the bile ducts of a cow slaughtered on the farm. The cattle drink from a marshy stream with many small snails.",
    hints: ["Which parasite is leaf-shaped and lives in the bile ducts?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the parasite.",
        accepted: ["liver fluke", "fluke", "Fasciola", "Fasciola gigantica", "Fasciola hepatica", "liver flukes"],
        keywords: { any: ["fluke", "fasciola"] },
        explanation: "**Liver fluke**.",
      }),
      P.mcq({
        label: "(b)", stem: "What is the role of the snails?",
        options: [
          ["They are the intermediate host", "Correct: the larvae multiply inside them."],
          ["They eat the fluke eggs and destroy them", "They do not control the fluke."],
          ["They are the final host of the adult fluke", "The cattle are the final host."],
          ["They carry ticks to the cattle", "Snails do not carry ticks."],
        ],
        answer: "A",
        explanation: "The snail is the intermediate host in which fluke larvae multiply.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the cattle become infected.",
        points: ["Larvae leaving the snails form cysts on grass at the water's edge.", "Cattle grazing or drinking at the marsh swallow the cysts; young flukes migrate through the liver to the bile ducts."],
        explanation: "Cysts on wet grass.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** ways of controlling the fluke on this farm.",
        points: ["Fence off the marsh and provide water from troughs / drain the marsh.", "Dose the cattle with a drug that kills flukes / control the snails."],
        explanation: "Remove access and treat.",
      }),
    ],
    explanation: "Identify liver fluke and plan control through its life cycle.",
  });

  b.card("DEFINITION", "Internal parasite (endoparasite)", "A parasite living inside the host, e.g. in the gut, liver or lungs.");
  b.card("CONCEPT", "Roundworm life cycle", "Adult in gut → eggs in dung → larvae develop on pasture → infective larvae climb grass → swallowed → adult. Direct (no intermediate host).");
  b.card("DEFINITION", "Intermediate host", "An animal in which a parasite spends part of its life cycle before reaching its final host (e.g. water snail for liver fluke).");
  b.card("FACT", "Signs of wireworm in sheep and goats", "Anaemia (pale eyelids), bottle jaw, weakness, weight loss, sudden deaths.");
  b.card("FACT", "Intermediate host of liver fluke", "A water snail.");
  b.card("CONCEPT", "How is the beef tapeworm cycle broken?", "Use toilets so human faeces do not reach grazing; inspect meat; cook beef thoroughly.");
  b.card("DEFINITION", "Anthelmintic", "A drug (dewormer) that kills internal parasitic worms.");
  b.card("CONCEPT", "Seven ways to control internal parasites", "Correct dosing by weight, rotational grazing, avoid overstocking, avoid wet areas, hygiene, snail control, check and quarantine new stock.");
  b.card("FACT", "Why dose by the heaviest animal's weight?", "Under-dosing leaves worms alive and leads to drug resistance.");
});
