// Slice W4b: exam-format items. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge P1 Section A), ZIMSEC P2
// Section B animal husbandry (20 marks) and Cambridge P1 Section B (15 marks). Part splits are our convention; a reviewer
// must check them against past papers. All prices, doses and dilutions are assumed figures.
import { concept, P, ZIM, CAM, pearsonSquare, fcr, dilution, pct, pctChange, stockingRate, carryingCapacity, mortalityPct, round, check, table, agricultureLevels } from "../lib.mjs";

// T1: 15% CP dairy meal from cottonseed cake 36% and maize 8%, 400 kg.
const T1 = pearsonSquare({ target: 15, high: { cp: 36 }, low: { cp: 8 }, totalKg: 400 });
check(T1.partsHigh === 7 && T1.partsLow === 21 && T1.pctHigh === 25 && T1.kgLow === 300, "T1");

// T2: three goats.
const T2_TABLE = table(["Goat", "Rectal temperature (°C)", "Observations"], [
  ["A", "39.4", "Browsing with the herd; chewing the cud; droppings firm pellets"],
  ["B", "41.2", "Standing alone, head down; not eating; nasal discharge; coat rough"],
  ["C", "39.6", "Browsing with the herd; bright eyes; smooth coat"],
]);
const T2pulse = 22 * 4;
check(T2pulse === 88, "T2");

// T3: dip tank 9,000 L at 2.5 mL/L.
const T3L = dilution({ mlPerL: 2.5, tankL: 9000 }).concentrateMl / 1000;
check(T3L === 22.5, "T3");

// T4: herd LU on 426 ha, veld needs 7.1 ha/LU.
const T4_STOCK = [["Cows", 48, 1.0], ["Heifers", 20, 0.7], ["Calves", 30, 0.3]];
const T4lu = round(T4_STOCK.reduce((s, [, n, f]) => s + n * f, 0), 3);
const T4sr = stockingRate({ lu: T4lu, areaHa: 426 });
const T4cc = carryingCapacity({ areaHa: 426, haPerLu: 7.1 });
check(T4lu === 71 && T4sr.haPerLu === 6 && round(T4cc.lu, 6) === 60 && T4lu - 60 === 11, "T4");
const T4_TABLE = table(["Class", "Number", "LU per animal (assume)"], T4_STOCK.map(([c, n, f]) => [c, n, f.toFixed(1)]));

// Z1: pig grower ration 18% CP from soya cake 45% and maize 9%, 600 kg; 30 pigs x 2.2 kg x 28 days; FCR.
const Z1 = pearsonSquare({ target: 17, high: { cp: 45 }, low: { cp: 9 }, totalKg: 540 });
check(Z1.kgHigh === 120 && Z1.kgLow === 420, "Z1 square");
const Z1kg = round(30 * 2.2 * 21, 3);
const Z1bags = Math.ceil(Z1kg / 50 - 1e-9);
check(Z1kg === 1386 && Z1bags === 28, "Z1 bags");
const Z1fcr = fcr({ feedKg: 81, gainKg: 65 - 38 });
check(Z1fcr === 3, "Z1 fcr");
const Z1_TABLE = table(["Feed", "Crude protein (%)"], [["Maize meal", 9], ["Soya bean cake", 45]]);

// Z2: vaccination coverage and Newcastle vials.
const Z2cover = pct(1292, 1520);
check(Z2cover === 85, "Z2 cover");
const Z2vials = Math.ceil(2750 / 1000 - 1e-9);
check(Z2vials === 3, "Z2 vials");
const Z2_TABLE = table(["Farm", "Animals", "Signs reported to the veterinary officer"], [
  ["1", "Cattle", "Drooling, lameness, blisters on the tongue and between the hooves; milk yield down"],
  ["2", "Cattle", "One cow found dead with dark, unclotted blood oozing from the nose and anus"],
  ["3", "Chickens", "Gasping, twisted necks, green diarrhoea, egg production down, many deaths"],
]);

// Z3: goats: dose 2 mL per 10 kg, heaviest 45 kg, 36 goats; tick counts 96 -> 12.
const Z3dose = round((45 / 10) * 2, 3);
const Z3total = round(Z3dose * 36, 3);
const Z3fall = round(-pctChange(96, 12), 2);
check(Z3dose === 9 && Z3total === 324 && Z3fall === 87.5, "Z3");

// Z4: piggery: mortality 11 of 160; footbath 1:24 in 20 L.
const Z4mort = round(mortalityPct({ died: 11, started: 160 }), 1);
const Z4foot = dilution({ ratio: 24, tankL: 20 }).concentrateMl;
check(Z4mort === 6.9 && Z4foot === 800, "Z4");

// C2: kid deaths 6 of 40.
const C2mort = mortalityPct({ died: 6, started: 40 });
check(C2mort === 15, "C2");

concept("agri.nutrition.rations", { file: "exam/w4b-theory", keyPrefix: "exam.w4b-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.nutrition.rations", "agri.nutrition.feedstuffs"],
    stem: "Tatenda mixes his own dairy meal near Marondera from cottonseed cake (36% crude protein) and maize meal (8% crude protein). He wants 400 kg of meal containing 15% crude protein. He feeds it to his cows in the milking parlour, more to high-yielding cows than to low-yielding ones.",
    hints: ["In the Pearson square subtract diagonally.", "Percentage = parts of the feed ÷ total parts × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the energy concentrate in Tatenda's mixture.",
        accepted: ["maize meal", "maize", "ground maize"],
        keywords: { any: ["maize"] },
        explanation: "**Maize meal** (8% CP, mostly starch).",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Use a Pearson square to find the number of parts of cottonseed cake.",
        value: T1.partsHigh, tol: 0, wrong: [T1.partsLow, 15],
        explanation: `15 − 8 = ${T1.partsHigh} parts of cottonseed cake (36 − 15 = ${T1.partsLow} parts of maize meal).`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the percentage of cottonseed cake in the mixture.",
        value: T1.pctHigh, unit: "%", tol: 0, wrong: [T1.pctLow, round(pct(7, 21), 1)],
        explanation: `Total parts = 7 + 21 = 28; 7 ÷ 28 × 100 = ${T1.pctHigh}%.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the mass of maize meal needed for 400 kg of mixture, in kg.",
        value: T1.kgLow, unit: "kg", tol: 0, wrong: [T1.kgHigh, 21 * 4],
        explanation: `21 ÷ 28 × 400 = ${T1.kgLow} kg of maize meal (${T1.kgHigh} kg cottonseed cake).`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why cottonseed cake is suitable for cows but is fed only in small amounts, if at all, to pigs.",
        points: ["It contains gossypol, which is harmful to pigs (and poultry) in large amounts.", "Cows (ruminants) tolerate it, and rumen microbes also let them use its protein well."],
        explanation: "Gossypol and ruminant digestion.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest why high-yielding cows receive more dairy meal than low-yielding cows.",
        points: ["The meal is a production ration: extra feed on top of maintenance to make milk.", "Cows producing more milk need more energy and protein; feeding to yield avoids waste on low yielders (and loss of condition in high yielders)."],
        explanation: "Feeding to production.",
      }),
    ],
    explanation: "Mix a dairy meal with the Pearson square and explain feeding to production.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.health.signs-of-health", "agri.health.disease-hygiene"],
    stem: `Thandeka examines three of her goats near Bulawayo after they have rested in the shade for an hour.\n\n${T2_TABLE}`,
    hints: ["Compare each temperature with the approximate normal for goats.", "Pulse per minute = count × (60 ÷ seconds counted)."],
    parts: [
      P.short({
        label: "(a)", stem: "Which goat has a fever? Give its letter.",
        accepted: ["B", "goat B"], normalise: ["trim", "lowercase", "strip_punctuation"],
        explanation: "**B** (41.2 °C).",
      }),
      P.mcq({
        label: "(b)", stem: "What is the approximate normal rectal temperature of a goat?",
        options: [
          ["About 39-40 °C", "Correct (approximate)."],
          ["About 36-37 °C", "Too low for a goat."],
          ["About 41-42 °C", "About normal for a chicken, a fever in a goat."],
          ["About 43-44 °C", "Far too high for any farm animal."],
        ],
        answer: "A",
        explanation: "Sheep and goats are about 39-40 °C.",
      }),
      P.mcq({
        label: "(c)", stem: "Where is the pulse of a goat usually felt?",
        options: [
          ["Inside the thigh", "Correct: the artery on the inner thigh."],
          ["On the top of the head", "No suitable artery lies there."],
          ["In the middle of the back", "No suitable artery lies there."],
          ["On the tip of the tail", "Not the usual site."],
        ],
        answer: "A",
        explanation: "In sheep, goats and pigs the pulse is felt inside the thigh.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Thandeka counts 22 pulse beats in 15 seconds in goat A. Calculate the pulse rate in beats per minute.",
        value: T2pulse, tol: 0, wrong: [22 * 15, 22],
        explanation: `22 × 4 = ${T2pulse} beats per minute.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Give **two** signs from the table, other than temperature, that goat B is ill.",
        points: ["Standing alone with head down / not eating.", "Nasal discharge / rough coat."],
        explanation: "Behaviour, appetite, discharge, coat.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why Thandeka should isolate goat B.",
        points: ["Goat B may have an infectious disease (fever and nasal discharge).", "Isolation stops it passing pathogens to healthy goats by contact, droplets or shared feed and water."],
        explanation: "Prevent spread.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why the goats were rested before their temperatures were taken.",
        points: ["Exercise, heat and excitement raise body temperature (and pulse).", "Readings from a rested goat can be compared fairly with normal values, avoiding a false sign of fever."],
        explanation: "Accurate readings.",
      }),
    ],
    explanation: "Use temperature, pulse and observations to identify ill-health in goats.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.health.external-parasites"],
    stem: "The brown ear tick is a three-host tick that attaches mainly inside the ears of cattle. Each stage feeds on a host for a few days, then drops to the ground to moult or lay eggs. A dip tank at a communal dipping point near Chinhoyi holds 9,000 L of wash.",
    hints: ["List the stages in order.", "Concentrate = mL per litre × litres; 1,000 mL = 1 L."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the disease of cattle spread by the brown ear tick.",
        accepted: ["theileriosis", "January disease", "East Coast fever", "ECF", "theileria", "corridor disease"],
        keywords: { any: ["theileri", "january", "east coast", "ecf"] },
        explanation: "**Theileriosis** (January disease).",
      }),
      P.fib({
        label: "(b)", stem: "Complete the stages of the tick's life cycle in order.",
        template: "egg → {{blank:a}} (six legs) → {{blank:b}} (eight legs) → adult",
        blanks: [{ id: "a", accepted: ["larva", "larvae", "seed tick"] }, { id: "b", accepted: ["nymph", "nymphs"] }],
        explanation: "Egg, larva, nymph, adult.",
      }),
      P.mcq({
        label: "(c)", stem: "On how many different host animals does one brown ear tick feed in its life?",
        options: [
          ["Three", "Correct: larva, nymph and adult each find a new host."],
          ["One", "That is a one-host tick such as the blue tick."],
          ["Two", "That is a two-host tick such as the red-legged tick."],
          ["Four", "Only three feeding stages exist."],
        ],
        answer: "A",
        explanation: "A three-host tick: each feeding stage drops off and finds a new host.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Assume the acaricide is used at 2.5 mL of concentrate per litre of wash. Calculate the volume of concentrate, in litres, needed to charge the 9,000 L tank.",
        value: T3L, unit: "L", tol: 0.05, answer: "22.5", wrong: [22500, round(9000 / 2.5 / 1000, 1)],
        explanation: `2.5 × 9,000 = 22,500 mL = ${T3L} L.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why three-host ticks are more difficult to control by dipping than one-host ticks.",
        points: ["Each stage spends only a few days on the host and much of its life on the ground.", "Dipping kills only the stages on the animal at the time; those on the veld (which can survive long without feeding) escape."],
        explanation: "Time off the host.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest **two** methods, other than dipping, of reducing brown ear ticks on cattle.",
        points: ["Hand dressing: tick grease applied inside the ears.", "Pasture spelling/rotational grazing / keeping grass short around kraals / keeping tick-resistant indigenous breeds / spraying or pour-ons."],
        explanation: "Hand dressing and management.",
      }),
    ],
    explanation: "Describe a three-host tick, its disease and its control, and charge a dip tank.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true, applies: CAM,
    paper: "Cambridge Paper 1 Section A",
    concepts: ["agri.pasture.grazing-management"],
    stem: `A beef farm of 426 ha of natural grazing near Gweru carries the stock below. The grazing is estimated to need about 7.1 ha per livestock unit (assume).\n\n${T4_TABLE}`,
    hints: ["LU = number × LU per animal, added.", "Carrying capacity = area ÷ ha per LU."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total number of livestock units.",
        value: T4lu, unit: "LU", tol: 0, wrong: [98, 48 + 20 * 0.7],
        explanation: `48 × 1.0 + 20 × 0.7 + 30 × 0.3 = 48 + 14 + 9 = ${T4lu} LU. Counting animals gives 98.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the stocking rate in hectares per LU.",
        value: T4sr.haPerLu, unit: "ha/LU", tol: 0, wrong: [round(T4sr.luPerHa, 3), round(426 / 98, 2)],
        explanation: `426 ÷ ${T4lu} = ${T4sr.haPerLu} ha per LU.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the carrying capacity of the farm in LU.",
        value: round(T4cc.lu, 6), unit: "LU", tol: 0, wrong: [426 * 7.1],
        explanation: "426 ÷ 7.1 = 60 LU.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "By how many LU is the farm overstocked?",
        value: T4lu - round(T4cc.lu, 6), unit: "LU", tol: 0, wrong: [60],
        explanation: `${T4lu} − 60 = ${T4lu - 60} LU.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** dangers of continuing to overstock this grazing.",
        points: ["Palatable perennial grasses die out / bare ground and soil erosion.", "Bush encroachment / cattle underfed and lose condition / more parasites / losses in drought."],
        explanation: "Damage to veld and to animals.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain how dividing the farm into paddocks and rotating the herd would improve the grazing.",
        points: ["Each paddock is grazed evenly for a short time, then rested.", "Resting lets grasses regrow, build root reserves and set seed, so carrying capacity is maintained or improved."],
        explanation: "Grazing and rest.",
      }),
    ],
    explanation: "Calculate livestock units, stocking rate and carrying capacity and explain grazing management.",
  });
});

concept("agri.health.notifiable-immunity", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.nutrition.rations", "agri.nutrition.feedstuffs", "agri.nutrition.nutrients"],
    stem: `Thandeka keeps 30 grower pigs near Bulawayo. She mixes her own grower ration from the feeds below and wants 540 kg of a 17% crude protein ration. Each pig eats about 2.2 kg a day. Last month her pigs grew from an average of 38 kg to 65 kg and each ate 81 kg of feed.\n\n${Z1_TABLE}`,
    hints: ["Pearson square: subtract diagonally.", "Bags: round UP.", "FCR = feed ÷ gain."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the protein concentrate in the table.",
        accepted: ["soya bean cake", "soya cake", "soybean cake", "soya bean meal", "soya", "soybean meal"],
        keywords: { any: ["soya", "soy"] },
        explanation: "**Soya bean cake** (45% CP).",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Use the Pearson square to calculate the mass of soya bean cake in 540 kg of the ration, in kg.",
        value: Z1.kgHigh, unit: "kg", tol: 0, wrong: [Z1.kgLow, round((540 * 17) / 45, 0)],
        explanation: `Soya 17 − 9 = 8 parts; maize 45 − 17 = 28 parts; total 36; soya = 8 ÷ 36 × 540 = ${Z1.kgHigh} kg.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the mass of maize meal in the 540 kg, in kg.",
        value: Z1.kgLow, unit: "kg", tol: 0, wrong: [Z1.kgHigh],
        explanation: `540 − ${Z1.kgHigh} = ${Z1.kgLow} kg.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "How many 50 kg bags of ration does Thandeka need to feed all 30 pigs for 21 days? Round UP to whole bags.",
        value: Z1bags, unit: "bags", tol: 0, wrong: [Math.floor(Z1kg / 50), round(Z1kg / 50, 2)],
        explanation: `30 × 2.2 × 21 = ${Z1kg.toLocaleString("en-GB")} kg; ÷ 50 = ${round(Z1kg / 50, 2)}, so ${Z1bags} bags.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the feed conversion ratio of the pigs last month.",
        value: Z1fcr, tol: 0.05, answer: "3", wrong: [round(81 / 65, 2), round(27 / 81, 2)],
        explanation: `Gain = 65 − 38 = 27 kg; FCR = 81 ÷ 27 = ${Z1fcr}.`,
      }),
      P.mcq({
        label: "(f)", stem: "Which mineral is given to young piglets kept on concrete, usually by injection, to prevent anaemia?",
        options: [
          ["Iron", "Correct: for haemoglobin."],
          ["Iodine", "Prevents goitre."],
          ["Sodium", "Salt, for body fluids."],
          ["Calcium", "Calcium shortage causes rickets, not anaemia."],
        ],
        answer: "A",
        explanation: "Iron is needed for haemoglobin; sow milk is low in iron and piglets on concrete cannot get it from soil.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Distinguish between a maintenance ration and a production ration, using Thandeka's pigs as an example of one of them.",
        points: ["Maintenance ration: keeps an animal alive and healthy at constant weight (e.g. a mature boar not working).", "Production ration: feed above maintenance for growth, milk, eggs, work or pregnancy.", "Thandeka's growers need a production ration because they are growing (gaining weight daily)."],
        explanation: "Definitions plus application.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe the feeding practices Thandeka should follow to raise her pigs efficiently and profitably from weaning to slaughter.",
        points: [
          "Feed a balanced ration matched to the stage: creep/weaner ration high in protein, then grower and finisher rations.",
          "Make changes between rations gradually over several days to avoid digestive upsets and checks in growth.",
          "Feed at regular times each day in clean troughs of the right size and height, with enough space for every pig.",
          "Fill feeders only partly / use well-designed feeders to cut spillage, because spilled feed raises the FCR.",
          "Provide clean water at all times; thirsty pigs eat and grow less.",
          "Store feed dry, off the floor and away from rats; never feed mouldy feed.",
          "Weigh pigs and feed regularly and keep records to calculate FCR and costs; adjust if FCR rises.",
          "Use cheaper home-mixed rations (Pearson square) where they meet requirements; deworm and keep pigs healthy so feed is not wasted; sell at the target weight because FCR worsens as pigs get heavier.",
        ],
        levels: agricultureLevels(8),
        explanation: "Balanced, staged feeding with good practice, records and cost control.",
      }),
    ],
    explanation: "Formulate and quantify a pig ration, calculate FCR and describe efficient feeding.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.health.notifiable-immunity", "agri.health.disease-hygiene"],
    stem: `A veterinary officer in a district near Chipinge receives three reports in one week.\n\n${Z2_TABLE}`,
    hints: ["Match the signs to anthrax, foot-and-mouth disease and Newcastle disease.", "Coverage = vaccinated ÷ total × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the disease most likely on farm 1.",
        accepted: ["foot-and-mouth disease", "foot and mouth disease", "foot and mouth", "FMD", "foot-and-mouth"],
        keywords: { any: ["foot", "fmd"] },
        explanation: "**Foot-and-mouth disease**.",
      }),
      P.short({
        label: "(b)", stem: "Name the disease most likely on farm 2.",
        accepted: ["anthrax"],
        keywords: { any: ["anthrax"] },
        explanation: "**Anthrax**.",
      }),
      P.mcq({
        label: "(c)", stem: "What type of organism causes the disease on farm 3?",
        options: [
          ["A virus", "Correct: Newcastle disease is viral."],
          ["A bacterium", "Anthrax is bacterial."],
          ["A protozoan", "Trypanosomiasis is protozoan."],
          ["A roundworm", "Worms do not cause it."],
        ],
        answer: "A",
        explanation: "Newcastle disease is caused by a virus.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "In a vaccination campaign, 1,292 of the 1,520 cattle at the local dip tank were vaccinated. Calculate the percentage vaccinated.",
        value: Z2cover, unit: "%", tol: 0, wrong: [1520 - 1292, round((1520 / 1292) * 100, 1)],
        explanation: `1,292 ÷ 1,520 × 100 = ${Z2cover}%.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Farm 3's neighbour must vaccinate 2,750 chickens. Assume the vaccine is sold in vials of 1,000 doses. How many vials must be bought?",
        value: Z2vials, tol: 0, wrong: [2, 2.75],
        explanation: `2,750 ÷ 1,000 = 2.75, so ${Z2vials} vials.`,
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the carcass on farm 2 must not be opened.",
        points: ["Exposed to air, the bacteria form resistant spores that contaminate the soil for many years.", "Blood and spores can infect people and other animals; the carcass is burned or buried deep with lime as the veterinary officer directs."],
        explanation: "Spores and human danger.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Distinguish between active and passive immunity, giving a natural and an artificial example of each.",
        points: ["Active immunity: the animal makes its own antibodies; slow to develop but long-lasting.", "Examples: natural active by recovering from infection; artificial active by vaccination.", "Passive immunity: ready-made antibodies received from outside; immediate but short-lived.", "Examples: natural passive from colostrum; artificial passive by injection of antiserum / antitoxin."],
        explanation: "Definitions and examples.",
      }),
      P.manual({
        label: "(h)", marks: 7, stem: "Describe the measures the veterinary services would take to control the outbreak on farm 1, and explain why each is needed.",
        points: [
          "The disease is notifiable: the farmer reports it and the veterinary services confirm it by inspection and samples.",
          "Quarantine the farm and declare a control zone around it, because the virus spreads very easily.",
          "Stop movement of cattle and other cloven-hoofed animals, their products and sales/auctions in the zone (permits, roadblocks), so infected animals do not carry the virus elsewhere.",
          "Disinfect vehicles, people and equipment leaving the area (footbaths, wheel dips), since the virus travels on them.",
          "Vaccinate cattle around the outbreak (ring vaccination) to build immunity and stop spread.",
          "Separate cattle from buffalo (repair game fences), as buffalo can carry the virus.",
          "Keep up surveillance and lift restrictions only when no new cases appear; explain to farmers why exports and markets depend on control.",
        ],
        levels: agricultureLevels(7),
        explanation: "Notification, quarantine, movement control, disinfection, vaccination, wildlife separation, surveillance.",
      }),
    ],
    explanation: "Identify notifiable diseases from signs, calculate vaccination figures, explain immunity and describe outbreak control.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.health.internal-parasites", "agri.health.external-parasites"],
    stem: "Nyasha keeps 36 goats near Masvingo on a small, wet paddock beside a stream. In February several goats have pale inner eyelids and swelling under the jaw, and ticks are numerous. After she starts regular spraying, the average tick count per goat falls from 96 to 12. Assume her dewormer is given at 2 mL per 10 kg of body weight; her heaviest goat weighs 45 kg.",
    hints: ["Dose by the weight of the heaviest goat.", "Percentage fall = fall ÷ starting count × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the blood-sucking roundworm of goats that causes pale eyelids and swelling under the jaw.",
        accepted: ["wireworm", "wire worm", "Haemonchus", "Haemonchus contortus", "barber's pole worm", "barbers pole worm"],
        keywords: { any: ["wireworm", "wire worm", "haemonchus", "barber"] },
        explanation: "**Wireworm** (*Haemonchus*).",
      }),
      P.mcq({
        label: "(b)", stem: "Which organism near the stream is the intermediate host of the liver fluke?",
        options: [
          ["The water snail", "Correct."],
          ["The frog", "Not a host of liver fluke."],
          ["The mosquito larva", "Not part of the fluke's cycle."],
          ["The bont tick", "A tick, not a fluke host."],
        ],
        answer: "A",
        explanation: "Liver fluke larvae multiply in water snails.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the dose of dewormer for each goat, in mL.",
        value: Z3dose, unit: "mL", tol: 0, wrong: [4.5, round(45 / 2, 1)],
        explanation: `45 ÷ 10 = 4.5; 4.5 × 2 = ${Z3dose} mL.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Calculate the volume of dewormer needed for all 36 goats, in mL.",
        value: Z3total, unit: "mL", tol: 0, wrong: [36 * 2],
        explanation: `${Z3dose} × 36 = ${Z3total} mL.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the percentage fall in the average tick count.",
        value: Z3fall, unit: "%", tol: 0.05, answer: "87.5", wrong: [12.5, 84],
        explanation: `(96 − 12) ÷ 96 × 100 = ${Z3fall}%.`,
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe the life cycle of a roundworm of goats.",
        points: ["Adult worms in the gut (abomasum) lay eggs that pass out in the dung.", "Eggs hatch on the pasture in warm, moist conditions; larvae feed and moult.", "Third-stage (infective) larvae move out of the dung and up grass blades in moisture/dew.", "Goats swallow them while grazing and they develop into adults in about three weeks (direct life cycle)."],
        explanation: "Direct cycle via pasture.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why Nyasha should dose all the goats by the weight of the heaviest goat rather than guessing.",
        points: ["Guessing often gives too little drug (under-dosing), so some worms survive.", "Survivors breed and pass on resistance, so the dewormer stops working."],
        explanation: "Avoid resistance.",
      }),
      P.manual({
        label: "(h)", marks: 7, stem: "Discuss a year-round programme Nyasha could follow to control both internal and external parasites of her goats.",
        points: [
          "Move the goats off the small wet paddock; use rotational grazing so paddocks rest and larvae die before goats return.",
          "Avoid overstocking and keep kids on the cleanest grazing; do not graze wet, low ground or in early morning dew.",
          "Fence off the stream and marshy ground (snail habitat) and give water from clean troughs, to control liver fluke.",
          "Dose strategically (in the rains when infection peaks) and when signs appear, by weight, using an eyelid colour chart to treat only anaemic goats; change drug group as advised.",
          "Dip or spray regularly against ticks, more often in the hot wet season, at the correct strength; hand-dress ears, udder and tail.",
          "Keep housing clean and dry; treat and quarantine new goats before mixing.",
          "Keep records of doses, counts and weights; judgement: combining grazing management with correct chemical use controls parasites best and slows resistance.",
        ],
        levels: agricultureLevels(7),
        explanation: "Integrated grazing, hygiene and chemical control through the year.",
      }),
    ],
    explanation: "Identify parasites, calculate doses and tick reductions, and plan integrated parasite control.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.health.disease-hygiene", "agri.health.signs-of-health"],
    stem: "A piggery near Mutare weaned 160 piglets last quarter, and 11 of them died of scours and pneumonia. Visitors walk freely into the pig house, pens are cleaned only when dung builds up, new breeding sows are put straight into the pens, and a sick weaner was left with its pen-mates. The manager plans a footbath using a disinfectant mixed at 1 part concentrate to 24 parts water (assume), in a 20 L footbath.",
    hints: ["Mortality = deaths ÷ number at the start × 100.", "Total parts = 1 + 24."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the mortality percentage of the weaners, to one decimal place.",
        value: Z4mort, unit: "%", tol: 0.05, answer: "6.9", wrong: [11, round((160 / 11), 1)],
        explanation: `11 ÷ 160 × 100 = ${round(mortalityPct({ died: 11, started: 160 }), 3)}, about ${Z4mort}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the volume of disinfectant concentrate, in mL, for the 20 L footbath.",
        value: Z4foot, unit: "mL", tol: 0, wrong: [round(20000 / 24, 0), 20 * 24],
        explanation: `20,000 mL ÷ 25 parts = ${Z4foot} mL.`,
      }),
      P.mcq({
        label: "(c)", stem: "Visitors who have been on other pig farms can bring disease in mainly by:",
        options: [
          ["carrying pathogens on boots and clothing", "Correct: equipment and footwear spread."],
          ["breathing near the pigs' feed", "Not the main route from other farms."],
          ["looking at the pigs from the door", "Looking does not spread disease."],
          ["bringing extra bags of feed in for the pigs", "Not the main risk."],
        ],
        answer: "A",
        explanation: "Pathogens travel between farms on boots, clothing and equipment.",
      }),
      P.short({
        label: "(d)", stem: "Give the term for keeping newly bought sows apart from the herd for several weeks before they join it.",
        accepted: ["quarantine", "quarantining", "quarantine period"],
        keywords: { any: ["quarantin"] },
        explanation: "**Quarantine**.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Distinguish between an infectious disease and a contagious disease.",
        points: ["Infectious: caused by a pathogen that invades the body and multiplies.", "Contagious: an infectious disease that spreads by direct or close contact between animals (e.g. tetanus is infectious but not contagious)."],
        explanation: "All contagious diseases are infectious, not all infectious are contagious.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the sick weaner should have been isolated.",
        points: ["It was shedding pathogens in its dung, breath and discharges.", "Its pen-mates were infected by contact and contaminated feed, water and floor; a sick pen with its own equipment stops this."],
        explanation: "Breaking the route of spread.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "State **two** causes of disease in pigs other than pathogens.",
        points: ["Poor nutrition / deficiencies (e.g. iron-deficiency anaemia).", "Injuries / poisoning (mouldy feed, chemicals) / parasites / stress from cold, draughts or overcrowding."],
        explanation: "Non-infectious causes.",
      }),
      P.manual({
        label: "(h)", marks: 8, stem: "Describe a programme of hygiene and management that would reduce disease in this piggery, explaining how each measure works.",
        points: [
          "Restrict visitors and keep a visitors' book; provide footbaths with fresh disinfectant at each door and farm clothing, so pathogens are not carried in.",
          "Clean pens daily, remove dung and wet bedding, and wash before disinfecting, because dung shelters pathogens and weakens disinfectants.",
          "Use all-in, all-out batches with thorough cleaning, disinfection and a rest period between batches, so pathogens do not pass from older to younger pigs.",
          "Quarantine new sows for several weeks, checking and treating them, so they do not introduce disease.",
          "Isolate sick pigs at once in a sick pen with its own equipment, and call the veterinary officer; report notifiable diseases.",
          "Provide dry, draught-free, well-ventilated housing without overcrowding, which reduces stress and airborne spread of pneumonia.",
          "Give clean water, balanced feed, iron to piglets, colostrum soon after birth, and vaccinate and deworm as advised, to build resistance.",
          "Control rats and flies, dispose of dead pigs safely, and keep records of deaths and treatments to spot problems early.",
        ],
        levels: agricultureLevels(8),
        explanation: "Biosecurity, sanitation, isolation, housing, nutrition and records, each with its reason.",
      }),
    ],
    explanation: "Calculate mortality and disinfectant quantities and plan hygiene to prevent disease in a piggery.",
  });
});

concept("agri.pasture.grazing-management", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.pasture.vegetation-establishment", "agri.pasture.grazing-management"],
    stem: "A farmer keeps beef cattle on natural grazing in an area of moderate rainfall and wants to improve the feed available for his herd.",
    hints: ["(b): order the steps from land preparation to first grazing.", "(c): give advantages and disadvantages and finish with a judgement."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the vegetation of natural grazing land and its value to livestock.",
        points: ["Grasses: the main source of energy and fibre; grow fast in the rains.", "Grass quality falls (less protein, more fibre) as it matures and in the dry season.", "Legumes: high in protein and calcium, and fix nitrogen.", "Browse (leaves and pods of trees and shrubs): green, protein-rich feed into the dry season, especially for goats."],
        explanation: "Grasses, legumes and browse with their value.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how an improved grass-legume pasture should be established.",
        points: ["Choose a suitable site, test the soil and lime if acid (legumes need near-neutral soil).", "Clear and plough, then harrow to a fine, firm seedbed because pasture seeds are small.", "Choose species suited to the climate and soil; buy certified seed and inoculate legume seed with Rhizobium so it fixes nitrogen.", "Apply phosphorus at sowing; sow shallowly at the start of the rains and roll to firm the soil around the seed.", "Control weeds while the pasture establishes and graze lightly only when plants are firmly rooted."],
        explanation: "Steps with reasons.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the farmer should use rotational grazing and controlled burning on the rest of the natural grazing.",
        points: [
          "Rotational grazing rests each area so grasses recover, set seed and build reserves; good perennial grasses survive.",
          "It gives more even use, breaks worm cycles and allows dry-season reserves, but needs fencing, water in each camp and planning.",
          "Controlled burning removes old, unpalatable grass, stimulates fresh regrowth and checks bush encroachment.",
          "Burning must be planned: only where old grass has built up, in calm weather, with fireguards, followed by rest.",
          "Burning too often or uncontrolled fires leave soil bare, cause erosion and destroy dry-season feed, fences and property.",
          "Judgement: rotation should be adopted with correct stocking; burning used occasionally and carefully as a tool, not a routine.",
        ],
        levels: agricultureLevels(6),
        explanation: "Balanced discussion of rotation and fire with a judgement.",
      }),
    ],
    explanation: "Describe grazing vegetation, explain pasture establishment and evaluate rotational grazing and burning.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945, calculator: true,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.health.signs-of-health", "agri.health.disease-hygiene", "agri.health.notifiable-immunity"],
    stem: "A smallholder keeps a herd of dairy goats. Last season 6 of the 40 kids born died within their first month, many after diarrhoea.",
    hints: ["Mortality = deaths ÷ kids born × 100.", "(d): weigh up prevention against cost and labour, and give a judgement."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe **four** signs the smallholder could use to recognise ill-health in a goat.",
        points: ["Dull, standing apart from the herd, head low.", "Loss of appetite / stops chewing the cud.", "Abnormal body temperature (fever, above about 39-40 °C) / fast breathing.", "Diarrhoea, discharges from eyes or nose, rough coat, pale membranes or a fall in milk yield."],
        explanation: "Any four distinct signs.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of kids that died.",
        value: C2mort, unit: "%", tol: 0, wrong: [6, round(40 / 6, 1)],
        explanation: `6 ÷ 40 × 100 = ${C2mort}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how infectious diarrhoea can spread among young kids and why colostrum helps protect them.",
        points: ["Pathogens in the dung of sick kids contaminate the floor, bedding, teats, feed and water; other kids swallow them.", "Spread is faster in crowded, wet, dirty pens and on shared equipment.", "Colostrum gives ready-made antibodies (passive immunity) if sucked within the first few hours, protecting the gut until the kid's own immunity develops."],
        explanation: "Faecal-oral spread and passive immunity.",
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Discuss the measures the smallholder could take to reduce kid deaths next season, and whether they are worth the cost.",
        points: [
          "Make sure every kid sucks colostrum within the first few hours (or is fed stored colostrum).",
          "Kid in clean, dry, draught-free pens with fresh bedding; clean and disinfect pens and feeding equipment regularly.",
          "Isolate sick kids at once and seek veterinary advice; give fluids to scouring kids as advised.",
          "Feed does well in late pregnancy and supply clean water, so kids are strong and milk is plentiful.",
          "Vaccinate and deworm does as advised; avoid overcrowding; quarantine new goats.",
          "Judgement: most measures (colostrum, hygiene, isolation) cost little labour and money compared with the value of the kids lost, so they are worth it; housing improvements cost more but repay over several seasons.",
        ],
        levels: agricultureLevels(6),
        explanation: "Measures with reasons and a cost-benefit judgement.",
      }),
    ],
    explanation: "Recognise ill-health, calculate kid mortality, explain spread and immunity, and evaluate prevention.",
  });
});
