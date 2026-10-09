// Slice W4a: pig production.
import { concept, P, dailyGain, fcr, dressingPct, round, check, table } from "../lib.mjs";

const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const longDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function dateAnswers(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  return [`${d} ${month} ${y}`, `${d} ${month}`, `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`, `${d}/${m}/${y}`, `${month} ${d} ${y}`, `${month} ${d}`, `${d}th ${month}`];
}

// Short: farrowing date.
const SERVED = "2026-09-18";
const farrow = addDays(SERVED, 114);
check(farrow === "2027-01-10", `farrow ${farrow}`);
// Calc: litters per year.
const cycle = 114 + 28 + 6;
const litters = 365 / cycle;
check(cycle === 148 && Math.abs(litters - 2.4662) < 1e-3, "litters");
// Num: ADG.
const adgP = dailyGain({ startKg: 30, endKg: 100, days: 140 });
check(adgP === 0.5, "adgP");
// Num: dressing %.
const dpP = dressingPct({ carcassKg: 46.8, liveKg: 65 });
check(Math.abs(dpP - 72) < 1e-9, "dpP");
// Struct: fattening trial on two rations.
const TRIAL = [["Pen A (ration 1)", 10, 28, 92, 2048], ["Pen B (ration 2)", 10, 27, 85, 2030]];
const trial = TRIAL.map(([pen, n, s, e, feed]) => ({ pen, gain: n * (e - s), fcr: fcr({ feedKg: feed, gainKg: n * (e - s) }) }));
check(trial[0].gain === 640 && Math.abs(trial[0].fcr - 3.2) < 1e-9 && trial[1].gain === 580 && Math.abs(trial[1].fcr - 3.5) < 1e-9, "trial");
const TRIAL_TABLE = table(["Pen", "Pigs", "Mean start mass (kg)", "Mean end mass (kg)", "Feed eaten by the pen (kg)"], TRIAL);
// Struct: piglet records.
const LITTERS = [["Sow 7", 12, 9, "No"], ["Sow 9", 11, 10, "Yes"], ["Sow 12", 10, 9, "Yes"]];
const LITTER_TABLE = table(["Sow", "Piglets born alive", "Piglets weaned", "Iron injection given"], LITTERS);

concept("agri.livestock.pigs", { file: "livestock/pigs", keyPrefix: "livestock.pigs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a gilt?",
    options: [
      ["A young female pig that has not yet farrowed", "Correct."],
      ["An entire male pig kept for breeding", "That is a boar."],
      ["A castrated male pig", "A castrated male is a barrow (hog)."],
      ["A female pig that has had several litters", "That is a sow."],
    ],
    answer: "A",
    explanation: "After her first litter a gilt becomes a sow.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pig breed is white with long, drooping ears that cover its eyes?",
    options: [
      ["Landrace", "Correct."],
      ["Large White", "The Large White has erect ears."],
      ["Duroc", "The Duroc is red-brown."],
      ["Hampshire", "The Hampshire is black with a white shoulder band."],
    ],
    answer: "A",
    explanation: "The Landrace is a long, white bacon breed with forward-drooping ears.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are piglets given an iron injection a few days after birth?",
    options: [
      ["To prevent anaemia, because sow's milk is low in iron", "Correct."],
      ["To vaccinate them against African swine fever", "There is no such use of iron; iron is a mineral, not a vaccine."],
      ["To make their teeth strong for chewing creep feed", "Iron is needed for haemoglobin, not teeth."],
      ["To kill internal parasites such as roundworms", "Dewormers kill worms; iron does not."],
    ],
    answer: "A",
    explanation: "Piglets are born with small iron stores and grow fast; on concrete they cannot get iron from soil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of a farrowing crate?",
    options: [
      ["To stop the sow lying on and crushing her piglets", "Correct."],
      ["To keep the boar away from the sow", "The boar is housed separately anyway."],
      ["To keep the sow warm during winter", "Warmth for piglets comes from the creep area."],
      ["To allow the sow to move about freely so that she exercises", "A crate restricts movement."],
    ],
    answer: "A",
    explanation: "The crate makes the sow lie down slowly, giving piglets time to move away; the creep area beside it is warm.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["How do pigs show they are ready to be mated?"],
    stem: "A stockman presses firmly on a sow's back and she stands rigid without moving. What does this show?",
    options: [
      ["She is on heat and ready for service", "Correct: the standing reflex."],
      ["She is in pain and needs a veterinarian", "Rigid standing to back pressure is a heat sign, not pain."],
      ["She is about to farrow within hours", "Signs of farrowing include nest building and milk in the teats."],
      ["She is anaemic and too weak to move", "Weak pigs do not show a standing reflex."],
    ],
    answer: "A",
    explanation: "The standing (back pressure) reflex is the clearest sign of heat in a sow.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which diseases can be carried in raw meat?"],
    stem: "Why must kitchen waste (swill) be boiled before it is fed to pigs?",
    options: [
      ["Raw meat scraps can carry diseases such as African swine fever", "Correct."],
      ["Boiling increases the protein content of the waste", "Boiling does not add protein."],
      ["Pigs cannot digest food that has not been cooked", "Pigs digest many raw feeds; the reason is disease."],
      ["Boiling removes the fibre so the pigs grow faster", "The aim is to kill disease organisms."],
    ],
    answer: "A",
    explanation: "Heat kills viruses such as African swine fever and foot-and-mouth disease that may be in meat scraps.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Compare cost, growth and disease control."],
    stem: "Which statement best compares intensive pig housing with keeping pigs extensively outdoors?",
    options: [
      ["Intensive housing gives faster growth and better control, but costs more", "Correct."],
      ["Extensive keeping always gives more piglets per sow per year", "Losses are usually higher outdoors."],
      ["Intensive housing needs no feed to be bought", "Housed pigs depend entirely on bought or mixed feed."],
      ["Extensive pigs never get diseases or parasites because they live outdoors", "Outdoor pigs meet worms, ticks and wild pigs."],
    ],
    answer: "A",
    explanation: "Housing allows control of feed, temperature and disease but needs capital and feed; outdoor systems are cheap but slower and riskier.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The gestation period of a sow is about 3 months, 3 weeks and 3 days.",
    answer: true,
    explanation: "True: about 114 days.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Pregnant sows should be fed as much as they can eat so that they become fat before farrowing.",
    answer: false,
    explanation: "False. Feed is restricted in pregnancy; fat sows farrow with difficulty and crush more piglets. Lactating sows are fed generously.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each piglet practice with the usual age.",
    pairs: [
      ["Clipping needle teeth", "Day 1"],
      ["Iron injection", "About day 3"],
      ["Offering creep feed", "From about 1-2 weeks"],
      ["Castration", "Within the first two weeks"],
      ["Weaning", "About 4-8 weeks"],
    ],
    explanation: "Each practice has a best time; give it with the reason.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Giving birth in pigs is called {{blank:a}}, and the warm area that only piglets can enter is called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["farrowing"] },
      { id: "b", accepted: ["creep", "creep area", "creep box"] },
    ],
    explanation: "Farrowing; the creep area keeps piglets warm and away from the sow.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Add 114 days to the service date."],
    stem: `A sow is served on ${longDate(SERVED)}. Using a gestation period of 114 days, state the expected farrowing date.`,
    accepted: dateAnswers(farrow),
    explanation: `${longDate(SERVED)} + 114 days = **${longDate(farrow)}**.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    hints: ["Cycle = gestation + lactation + days from weaning to service.", "Litters per year = 365 ÷ cycle."],
    stem: "A sow's piglets are weaned at 28 days, and she is served again 6 days after weaning. Using a gestation of 114 days, calculate the number of litters per sow per year, to two decimal places.",
    value: litters, tol: 0.005, answer: "2.47", wrong: [round(365 / 114, 2), round(365 / (114 + 28), 2)],
    explanation: `Cycle = 114 + 28 + 6 = ${cycle} days; 365 ÷ ${cycle} = ${round(litters, 2)} litters. Using gestation alone gives 3.20, which ignores lactation and the return to heat.`,
    workedSolution: `1. Breeding cycle = 114 + 28 + 6 = ${cycle} days.\n2. Litters per year = 365 ÷ ${cycle} = ${round(litters, 4)}.\n3. To two decimal places: ${round(litters, 2)}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A pig grew from 30 kg to 100 kg in 140 days. Calculate its average daily gain in kg/day.",
    value: adgP, unit: "kg/day", tol: 0.005, answer: "0.5", wrong: [round(100 / 140, 2), 70],
    explanation: `Gain = 100 − 30 = 70 kg; 70 ÷ 140 = ${adgP} kg/day.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Dressing % = carcass ÷ live mass × 100."],
    stem: "A porker weighing 65 kg live gave a carcass of 46.8 kg. Calculate the dressing percentage.",
    value: dpP, unit: "%", tol: 0.05, answer: "72", wrong: [round((65 / 46.8) * 100, 1), 28],
    explanation: `46.8 ÷ 65 × 100 = ${dpP}%.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Think of the sow, the pen and the piglets."],
    stem: "Describe how a farmer should prepare for a sow's farrowing.",
    points: [
      "Clean, disinfect and dry the farrowing pen/crate before use.",
      "Wash the sow (and treat for mange/worms) and move her in about a week before the due date.",
      "Provide clean, dry bedding and a heated creep area for the piglets.",
      "Reduce her feed slightly just before farrowing, give plenty of water and watch her closely when signs of farrowing appear.",
    ],
    modelAnswer: "He cleans and disinfects the farrowing pen, washes and deworms the sow and moves her in a week early, puts in dry bedding and a warm creep area, gives plenty of water and checks her often as farrowing approaches.",
    explanation: "Pen, sow, piglets, supervision.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A farmer fed two pens of growing pigs on different rations.\n\n${TRIAL_TABLE}`,
    hints: ["Gain of the pen = pigs × (end mass − start mass).", "FCR = feed ÷ gain; lower is better."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total live-weight gain of the pigs in pen A, in kg.",
        value: trial[0].gain, unit: "kg", tol: 0, wrong: [92 - 28, 920],
        explanation: `10 × (92 − 28) = 10 × 64 = ${trial[0].gain} kg.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the feed conversion ratio of pen B, to one decimal place.",
        value: trial[1].fcr, tol: 0.05, answer: "3.5", wrong: [round(580 / 2030, 2), round(2030 / 85, 1)],
        explanation: `Gain = 10 × (85 − 27) = ${trial[1].gain} kg; FCR = 2,030 ÷ ${trial[1].gain} = ${trial[1].fcr}.`,
      }),
      P.mcq({
        label: "(c)", stem: "Pen A had an FCR of 3.2. Which ration gave the better feed efficiency?",
        options: [
          ["Ration 1, because less feed was needed per kg of gain", "Correct: 3.2 is lower than 3.5."],
          ["Ration 2, because the pigs ate less feed in total", "Total feed is similar; per kg of gain, ration 2 needed more."],
          ["Both rations were equally efficient", "The FCRs differ."],
          ["Ration 2, because a higher FCR always means faster growth", "A higher FCR means worse efficiency."],
        ],
        answer: "A",
        explanation: "FCR 3.2 (ration 1) beats 3.5 (ration 2).",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** factors, apart from the ration, that the farmer must keep the same in both pens for a fair comparison.",
        points: ["Breed, sex and starting mass/age of the pigs.", "Number of pigs and space per pig / housing and temperature.", "Health treatments (deworming), water supply and length of the trial."],
        explanation: "Controlled variables.",
      }),
    ],
    explanation: "Compare two rations using gain and FCR.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Records from three litters on a farm near Chinhoyi. All piglets were kept on a concrete floor.\n\n${LITTER_TABLE}`,
    hints: ["Losses = born alive − weaned.", "Which litter is different?"],
    parts: [
      P.short({
        label: "(a)", stem: "Which sow lost the most piglets before weaning?",
        accepted: ["Sow 7", "7", "sow seven"],
        explanation: "Sow 7 lost 3 piglets (12 born alive, 9 weaned).",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how the missing iron injection may have caused the losses in sow 7's litter.",
        points: ["Piglets are born with small iron reserves and sow's milk contains little iron.", "On concrete they cannot get iron from soil, so they become anaemic (less haemoglobin).", "Anaemic piglets are pale, weak and grow slowly and are more likely to die of disease or be crushed."],
        explanation: "Iron, haemoglobin and weakness.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State **two** other causes of piglet deaths before weaning.",
        points: ["Crushing by the sow.", "Chilling, scours (diarrhoea) or starvation when piglets do not get colostrum/milk."],
        explanation: "Common causes.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the needle teeth of piglets are clipped on the first day.",
        points: ["The sharp eye teeth can injure littermates when they fight for teats.", "They can also damage the sow's teats/udder, making her reluctant to let piglets suck."],
        explanation: "Injury prevention.",
      }),
    ],
    explanation: "Use litter records to link piglet care to survival.",
  });

  b.card("DEFINITION", "Boar, sow, gilt", "Boar = breeding male; sow = female that has farrowed; gilt = young female not yet farrowed.");
  b.card("FACT", "Pig breeds", "Large White (erect ears), Landrace (drooping ears, long), Duroc (red-brown), Hampshire (black, white band), Mukota (indigenous, hardy).");
  b.card("FACT", "Sow breeding facts", "Oestrous cycle about 21 days; heat 2-3 days; standing reflex; gestation about 114 days (3 months, 3 weeks, 3 days).");
  b.card("CONCEPT", "Iron injection for piglets", "Given at about 3 days: piglets have low iron stores, sow's milk is low in iron and concrete floors give no soil iron, so they become anaemic.");
  b.card("CONCEPT", "Farrowing crate and creep", "Crate prevents the sow crushing piglets; the heated creep area keeps piglets warm and lets them eat creep feed.");
  b.card("FORMULA", "Litters per sow per year", "365 ÷ (114 + lactation days + days from weaning to service).");
  b.card("FACT", "Piglet care timetable", "Day 1 teeth clipped; about day 3 iron; castration within 2 weeks; creep from 1-2 weeks; weaning about 4-8 weeks.");
  b.card("CONCEPT", "Why boil swill?", "Raw meat scraps can carry African swine fever and foot-and-mouth disease.");
});
