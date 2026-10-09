// Slice W4a: beef cattle production.
import { concept, P, dailyGain, fcr, dressingPct, pct, round, check, table } from "../lib.mjs";

// Num: bulls needed.
const bulls = Math.ceil(175 / 25 - 1e-9);
check(bulls === 7, "bulls");
// Num: ADG.
const adgB = dailyGain({ startKg: 320, endKg: 446, days: 90 });
check(Math.abs(adgB - 1.4) < 1e-9, "adgB");
// Calc: dressing %.
const dpB = dressingPct({ carcassKg: 243.6, liveKg: 420 });
check(Math.abs(dpB - 58) < 1e-9, "dpB");
// Struct: pen-fattening batch.
const PEN = { steers: 20, inKg: 280, outKg: 412, days: 110, feedKg: 21120 };
const penGain = PEN.steers * (PEN.outKg - PEN.inKg);
const penFcr = fcr({ feedKg: PEN.feedKg, gainKg: penGain });
const penAdg = dailyGain({ startKg: PEN.inKg, endKg: PEN.outKg, days: PEN.days });
check(penGain === 2640 && Math.abs(penFcr - 8) < 1e-9 && Math.abs(penAdg - 1.2) < 1e-9, "pen");
// Struct: calving by month on two farms.
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const FARM_X = [3, 4, 5, 4, 3, 4, 3, 3, 4, 3, 2, 2];
const FARM_Y = [0, 0, 14, 18, 10, 2, 0, 0, 0, 0, 0, 0];
const sumX = FARM_X.reduce((s, n) => s + n, 0);
const sumY = FARM_Y.reduce((s, n) => s + n, 0);
const yOctNov = pct(14 + 18, sumY);
check(sumX === 40 && sumY === 44 && Math.abs(yOctNov - 72.7273) < 1e-3, "calving");
const CALVING_TABLE = table(["Month", ...MONTHS], [["Farm X", ...FARM_X], ["Farm Y", ...FARM_Y]]);

concept("agri.livestock.beef-cattle", { file: "livestock/beef-cattle", keyPrefix: "livestock.beef-cattle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an indigenous beef breed of Zimbabwe?",
    options: [
      ["Mashona", "Correct: a hardy, fertile Sanga breed."],
      ["Hereford", "An exotic British breed."],
      ["Brahman", "An exotic zebu breed developed in the USA."],
      ["Simmental", "An exotic Swiss breed."],
    ],
    answer: "A",
    explanation: "Indigenous breeds include the Mashona, Nkone and Tuli.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which beef breed has a red body and a white face?",
    options: [
      ["Hereford", "Correct."],
      ["Tuli", "The Tuli is yellow to golden-brown."],
      ["Brahman", "The Brahman is usually grey or red with a large hump."],
      ["Mashona", "Mashona cattle vary in colour, often black or red, without a white face pattern."],
    ],
    answer: "A",
    explanation: "The Hereford is an early-maturing British breed with a white face.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature makes the Brahman well suited to hot, tick-infested areas?",
    options: [
      ["Loose skin and many sweat glands that help it lose heat", "Correct: zebu cattle tolerate heat and resist ticks well."],
      ["A thick, woolly coat", "A thick coat would make heat stress worse."],
      ["A white face that reflects sunlight", "That describes the Hereford, which is less heat tolerant."],
      ["Very short legs and a small body that needs only a little feed every day", "The Brahman is a large breed."],
    ],
    answer: "A",
    explanation: "Brahmans have loose skin, a large dewlap and good sweating ability, and are used to add heat and tick tolerance in crosses.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What is dry-season grass short of?"],
    stem: "Why do beef cattle on veld often receive a protein or urea lick in the dry season?",
    options: [
      ["Dry grass is low in protein, so cattle lose mass", "Correct: the lick feeds rumen microbes so more fibre is digested."],
      ["Licks stop the cattle from drinking too much water", "This is not their purpose."],
      ["Protein licks kill ticks on the skin", "Ticks are controlled by dipping."],
      ["Dry grass contains too much protein, which the lick neutralises", "Dry grass contains too little protein."],
    ],
    explanation: "Protein and urea licks correct the protein shortage of dry veld grass and help cattle hold their condition.",
    answer: "A",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What does a phosphorus-deficient animal do?"],
    stem: "Cattle on a ranch are seen chewing old bones, and some have died of botulism. Which supplement should the rancher provide?",
    options: [
      ["A phosphate lick", "Correct: bone chewing is a sign of phosphorus deficiency."],
      ["A urea lick only", "Urea supplies nitrogen for protein, not phosphorus."],
      ["Extra water", "Water does not correct the deficiency."],
      ["Maize grain mixed with molasses to give them more energy for grazing", "Energy feeds do not correct phosphorus shortage."],
    ],
    answer: "A",
    explanation: "Phosphorus-deficient cattle chew bones and may pick up botulism toxin; phosphate licks (and vaccination) prevent it.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about managing calves as a group."],
    stem: "What is the main advantage of a controlled breeding season in a beef herd?",
    options: [
      ["Calves are of similar age and can be managed and sold as a group", "Correct."],
      ["Cows produce two calves a year", "Cows still have at most one calf a year."],
      ["Bulls can be sold because they are not needed", "Bulls are still needed during the breeding season."],
      ["Calves are all born in the dry season when the veld grass is short and dry", "The season is timed so calves come near the start of the rains."],
    ],
    answer: "A",
    explanation: "A short calving season gives uniform calves for branding, dosing, weaning and sale, and matches feed needs to the grazing.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What happens in the rumen if a lot of grain is eaten suddenly?"],
    stem: "Why are steers introduced to a high-grain pen-fattening ration gradually over about two weeks?",
    options: [
      ["To let the rumen microbes adjust and avoid bloat and an over-acid rumen", "Correct."],
      ["Because grain is too expensive to feed in large amounts at first", "Cost is not the reason for the gradual start."],
      ["So the steers lose weight first and then gain it back", "The aim is steady gain."],
      ["Because cattle cannot taste grain until they have eaten it for two weeks", "This is not true."],
    ],
    answer: "A",
    explanation: "A sudden change to grain causes rapid fermentation, acid build-up and bloat; a gradual change lets the microbes adapt.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Branding cattle with the owner's brand helps to prove ownership and deter stock theft.",
    answer: true,
    explanation: "True. Brands are permanent marks of ownership; ear tags identify individuals for records.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Indigenous breeds such as the Mashona usually grow faster than exotic breeds such as the Simmental when both are well fed.",
    answer: false,
    explanation: "False. Exotic breeds grow faster with good feeding; indigenous breeds are hardier and survive drought, ticks and poor grazing better.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each management practice with its main purpose.",
    pairs: [
      ["Dipping", "Controls ticks and tick-borne diseases"],
      ["Dosing", "Controls internal parasites"],
      ["Castration", "Prevents unwanted mating and gives docile steers"],
      ["Disbudding", "Prevents horns and the injuries they cause"],
      ["Weaning", "Lets the cow regain condition before the next calf"],
    ],
    explanation: "Each routine practice has a clear reason.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The {{blank:a}} is an indigenous breed developed in Zimbabwe, yellow to golden-brown in colour, while the Brahman is an exotic {{blank:b}} breed with a large hump.",
    blanks: [
      { id: "a", accepted: ["Tuli"] },
      { id: "b", accepted: ["zebu", "Bos indicus", "humped"] },
    ],
    explanation: "Tuli; the Brahman is a zebu (Bos indicus).",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a ratio of one bull to 25 cows. How many bulls are needed for 175 cows?",
    value: bulls, unit: "animals", tol: 0, wrong: [175 * 25, 6],
    explanation: "175 ÷ 25 = 7 bulls.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["ADG = gain ÷ days."],
    stem: "A steer grew from 320 kg to 446 kg in 90 days in a feedlot. Calculate its average daily gain in kg/day.",
    value: adgB, unit: "kg/day", tol: 0.005, answer: "1.4", wrong: [round(446 / 90, 2), 126],
    explanation: `Gain = 446 − 320 = 126 kg; 126 ÷ 90 = ${adgB} kg/day.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Dressing % = carcass ÷ live mass × 100."],
    stem: "A steer weighing 420 kg live produced a carcass of 243.6 kg. Calculate the dressing percentage.",
    value: dpB, unit: "%", tol: 0.05, answer: "58", wrong: [round((420 / 243.6) * 100, 1), 42],
    explanation: `243.6 ÷ 420 × 100 = ${dpB}%. Dividing live mass by carcass mass gives over 100%, which is impossible.`,
    workedSolution: "1. Dressing % = carcass mass ÷ live mass × 100.\n2. = 243.6 ÷ 420 × 100 = 58%.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give a breed, then a feature and why it helps."],
    stem: "Explain why indigenous cattle such as the Mashona are well suited to communal areas in natural regions IV and V.",
    points: [
      "They are hardy and survive on poor, dry veld with little supplementary feed.",
      "They tolerate heat and resist ticks and tick-borne diseases better than exotic breeds.",
      "They are fertile and good mothers, producing calves regularly even in poor conditions.",
      "They survive droughts and recover condition quickly / are also used for draught.",
    ],
    modelAnswer: "Mashona cattle are hardy and live on poor dry veld, tolerate heat and resist ticks, keep calving regularly as fertile, good mothers, and recover quickly after drought, so they suit dry communal areas.",
    explanation: "Adaptation to feed, climate, disease and fertility.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A feedlot near Chinhoyi fattened ${PEN.steers} steers for ${PEN.days} days. Their mean mass was ${PEN.inKg} kg on entry and ${PEN.outKg} kg at sale, and the group ate ${PEN.feedKg.toLocaleString("en-GB")} kg of ration.`,
    hints: ["Total gain = steers × (out − in).", "FCR = feed ÷ total gain."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the average daily gain of a steer, in kg/day.",
        value: penAdg, unit: "kg/day", tol: 0.005, answer: "1.2", wrong: [round(PEN.outKg / PEN.days, 2), 132],
        explanation: `(${PEN.outKg} − ${PEN.inKg}) ÷ ${PEN.days} = 132 ÷ ${PEN.days} = ${penAdg} kg/day.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the feed conversion ratio of the group.",
        value: penFcr, tol: 0.05, answer: "8", wrong: [round(PEN.feedKg / 132, 0), round(penGain / PEN.feedKg, 3)],
        explanation: `Total gain = ${PEN.steers} × 132 = ${penGain.toLocaleString("en-GB")} kg; FCR = ${PEN.feedKg.toLocaleString("en-GB")} ÷ ${penGain.toLocaleString("en-GB")} = ${penFcr}. Using one steer's gain gives 160, which forgets there are 20 steers.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** things done to the steers when they arrive at the feedlot.",
        points: ["Dosed against worms and dipped/sprayed against ticks.", "Vaccinated / weighed and identified / introduced gradually to the grain ration."],
        explanation: "Entry procedures.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain **one** advantage and **one** disadvantage of pen fattening compared with finishing the steers on veld.",
        points: ["Advantage: faster gain and a higher slaughter grade in a short time / relieves dry-season grazing pressure.", "Disadvantage: high cost of feed, pens and labour; risk of bloat/acidosis."],
        explanation: "Speed and grade against cost.",
      }),
    ],
    explanation: "Calculate feedlot performance and evaluate pen fattening.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `The number of calves born each month on two beef farms in one year.\n\n${CALVING_TABLE}`,
    hints: ["Which farm uses a breeding season?", "Percentage = calves in October and November ÷ all calves × 100."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which farm runs its bulls with the cows only during a short breeding season?",
        options: [
          ["Farm Y", "Correct: its calves are born within about four months."],
          ["Farm X", "Farm X has calves in every month, so its bulls run with the cows all year."],
          ["Both farms", "Farm X's calving is spread through the year."],
          ["Neither farm, because both have calves in December", "Farm Y's calves are concentrated in October to January."],
        ],
        answer: "A",
        explanation: "Farm Y's calving is concentrated from October to January.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of Farm Y's calves born in October and November, to one decimal place.",
        value: yOctNov, unit: "%", tol: 0.05, answer: "72.7", wrong: [32, round(pct(32, sumX), 1)],
        explanation: `14 + 18 = 32; total = ${sumY}; 32 ÷ ${sumY} × 100 = ${round(yOctNov, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why Farm Y times its calving for October to December.",
        points: ["Calves are born near the start of the rains.", "So the cows have new, green grazing when they need most feed for milk, and calves grow well."],
        explanation: "Match feed supply to needs.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain **three** management advantages Farm Y gains from its calving pattern.",
        points: ["Calves are of similar age, so branding, dosing, vaccination and weaning are done in groups.", "Calving can be supervised in a short period, reducing losses.", "Weaners are uniform and sold together; cows that did not calve are easily identified and culled."],
        explanation: "Group management, supervision, culling.",
      }),
    ],
    explanation: "Interpret calving patterns and explain the value of a breeding season.",
  });

  b.card("FACT", "Indigenous beef breeds of Zimbabwe", "Mashona, Nkone, Tuli: hardy, fertile, tolerant of heat, ticks and poor veld.");
  b.card("FACT", "Exotic beef breeds", "Brahman (zebu, hump, heat and tick tolerant), Hereford (red, white face, early maturing), Simmental (large, fast growth).");
  b.card("CONCEPT", "Beef type", "Deep, wide, blocky body; well-muscled hindquarters and loin; short thick neck; short legs.");
  b.card("FACT", "Bull to cow ratio", "About one mature bull to 25-30 cows during a breeding season of about three months.");
  b.card("CONCEPT", "Breeding season benefits", "Uniform calves managed in groups, supervised calving, feed matched to grazing, easy culling of open cows.");
  b.card("FACT", "Dry-season supplements on veld", "Protein or urea licks for low-protein grass; phosphate lick (with salt) against bone chewing and botulism.");
  b.card("DEFINITION", "Pen fattening", "Feeding cattle in pens for a few months on a high-energy ration to finish them quickly to a high grade.");
  b.card("FACT", "Typical dressing percentage of cattle", "About 50-60%.");
});
