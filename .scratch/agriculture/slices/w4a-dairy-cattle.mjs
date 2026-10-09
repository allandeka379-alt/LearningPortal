// Slice W4a: dairy cattle production.
import { concept, P, nutrientKg, pct, pctChange, round, check, table, fmtNum } from "../lib.mjs";

// Num: dairy meal by rule (assume roughage supports 6 kg; 1 kg meal per 3 kg extra milk).
const meal = (21 - 6) / 3;
check(meal === 5, "meal");
// Calc: lactation yield and fat.
const lactY = 22 * 305;
const fatKg = nutrientKg(lactY, 3.6);
check(lactY === 6710 && Math.abs(fatKg - 241.56) < 1e-9, "lact");
// Struct: weekly mean daily yield of a cow after calving.
const WEEKS = [[1, 14.0], [3, 18.5], [5, 21.0], [7, 22.4], [9, 21.8], [11, 15.2], [13, 19.6], [15, 18.9]];
const peak = WEEKS.reduce((a, r) => (r[1] > a[1] ? r : a));
const drop = pctChange(21.8, 15.2);
check(peak[0] === 7 && Math.abs(drop - -30.2752) < 1e-3, "weeks");
const WEEK_TABLE = table(["Week after calving", "Mean daily yield (kg)"], WEEKS.map(([w, y]) => [w, y.toFixed(1)]));
// Struct: monthly milk income for a smallholder (assume prices).
const COWS = [["Cow 1", 12], ["Cow 2", 9], ["Cow 3", 15]];
const dayTotal = COWS.reduce((s, [, y]) => s + y, 0);
const monthL = dayTotal * 30;
const income = monthL * 0.5;
check(dayTotal === 36 && monthL === 1080 && income === 540, "income");
const lostIncome = 9 * 4 * 0.5;
check(lostIncome === 18, "lost");

concept("agri.livestock.dairy-cattle", { file: "livestock/dairy-cattle", keyPrefix: "livestock.dairy-cattle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which dairy breed is known for the highest milk volume?",
    options: [
      ["Holstein-Friesian", "Correct: a large black-and-white breed."],
      ["Jersey", "Jerseys give the richest milk (highest butterfat) but less volume."],
      ["Mashona", "The Mashona is an indigenous beef breed giving little milk."],
      ["Hereford", "The Hereford is a beef breed."],
    ],
    answer: "A",
    explanation: "Friesians give the most milk; Jerseys give milk highest in butterfat.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "About how long before calving should a dairy cow be dried off?",
    options: [
      ["Six to eight weeks", "Correct: about 60 days."],
      ["One to two days", "Far too short for the udder to recover."],
      ["Six to eight months", "That would waste most of the lactation."],
      ["She should not be dried off at all", "Without a dry period the next lactation is lower."],
    ],
    answer: "A",
    explanation: "A dry period of six to eight weeks lets the udder rest and the cow rebuild reserves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of the strip cup in the milking routine?",
    options: [
      ["To check the first milk from each quarter for clots or watery milk", "Correct: early signs of mastitis."],
      ["To measure the total yield of the cow", "Yield is measured by weighing all the milk."],
      ["To cool the milk quickly after milking", "Milk is cooled in the dairy."],
      ["To hold the disinfectant used for teat dipping after each milking is finished", "That is a teat-dip cup."],
    ],
    answer: "A",
    explanation: "Squirting foremilk onto the dark plate of a strip cup shows clots and flakes of clinical mastitis.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What stays open for a while after milking?"],
    stem: "Why are a cow's teats dipped in disinfectant after milking?",
    options: [
      ["To kill bacteria at the teat opening while the teat canal is still open", "Correct: this prevents mastitis."],
      ["To make the milk let down faster at the next milking", "Let-down is stimulated before milking."],
      ["To soften the teats so that milking is easier", "That is not the purpose of a disinfectant dip."],
      ["To increase the butterfat content of the milk that she will produce next", "Teat dip has no effect on milk composition."],
    ],
    answer: "A",
    explanation: "The teat canal stays open for some time after milking; the dip kills bacteria that would otherwise enter.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which hormone controls let-down, and what blocks it?"],
    stem: "A new milker shouts at the cows and hits them. Milk yields fall. What is the most likely reason?",
    options: [
      ["Fear stops the let-down of milk", "Correct: stress blocks the let-down reflex."],
      ["Shouting changes the butterfat into protein", "Noise does not change milk composition like this."],
      ["The cows produce more colostrum when stressed", "Colostrum is made only after calving."],
      ["The cows eat more and convert all their food into body fat instead of milk", "This is not the cause of a sudden fall."],
    ],
    answer: "A",
    explanation: "Calm, regular handling allows let-down; fear releases adrenaline, which blocks it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens to the yield after calving?"],
    stem: "When does a dairy cow usually reach peak milk yield?",
    options: [
      ["About six to eight weeks after calving", "Correct."],
      ["On the day she calves", "Yield rises for several weeks after calving."],
      ["Just before she is dried off", "Yield is lowest late in lactation."],
      ["During the dry period, when she is not milked", "No milk is taken in the dry period."],
    ],
    answer: "A",
    explanation: "The lactation curve rises to a peak about six to eight weeks after calving and then declines slowly.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which practice deals with infections that are already in the udder at drying off?"],
    stem: "A farmer has many cows with mastitis soon after calving. Which change is most likely to reduce this?",
    options: [
      ["Dry-cow therapy in every quarter at drying off, with good hygiene", "Correct: it clears infections and protects the dry udder."],
      ["Shortening the dry period to one week", "This reduces the next lactation and does not prevent infection."],
      ["Stopping teat dipping to save money", "Teat dipping prevents new infections."],
      ["Milking the infected cows first so they are finished quickly before the rest", "Infected cows should be milked last."],
    ],
    answer: "A",
    explanation: "Dry-cow therapy (on veterinary advice) plus clean, dry housing reduces mastitis at calving.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mastitis is an inflammation of the udder, usually caused by bacteria.",
    answer: true,
    explanation: "True. Bacteria usually enter through the teat canal.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Milk from a cow treated with antibiotics may be sold as soon as the cow looks healthy again.",
    answer: false,
    explanation: "False. It must be discarded for the full withdrawal period to keep drug residues out of the milk supply.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each step in the milking routine with its purpose.",
    pairs: [
      ["Washing and drying teats", "Removes dirt and stimulates let-down"],
      ["Using a strip cup", "Detects clinical mastitis"],
      ["Teat dipping", "Kills bacteria at the teat opening"],
      ["Cooling milk to about 4 °C", "Slows the growth of bacteria"],
      ["Washing utensils at once", "Removes milk residues where bacteria grow"],
    ],
    explanation: "Each step of the routine has a hygiene or yield purpose.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A standard lactation is taken as {{blank:a}} days, and feeding extra concentrate in the last weeks before calving is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["305"] },
      { id: "b", accepted: ["steaming up", "steaming-up", "steam up"] },
    ],
    explanation: "305 days; steaming up.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the small, fawn-to-brown dairy breed whose milk has the highest butterfat content.",
    accepted: ["Jersey", "Jerseys", "the Jersey"],
    explanation: "The **Jersey** gives rich milk with a high butterfat content and tolerates heat better than the Friesian.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Subtract the milk the roughage supports, then divide."],
    stem: "Assume a farm rule: roughage supports 6 kg of milk a day, and each extra 3 kg of milk needs 1 kg of dairy meal. A cow gives 21 kg of milk a day. Calculate her daily dairy meal, in kg.",
    value: meal, unit: "kg", tol: 0, wrong: [7, 15],
    explanation: "Extra milk = 21 − 6 = 15 kg; 15 ÷ 3 = 5 kg of meal. Forgetting to subtract the roughage milk gives 7 kg.",
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    hints: ["Lactation yield = daily average × 305.", "Fat = yield × % ÷ 100."],
    stem: "A Friesian cow averages 22 kg of milk a day over a 305-day lactation, with 3.6% butterfat. Calculate the mass of butterfat produced in the lactation, in kg, to two decimal places.",
    value: fatKg, unit: "kg", tol: 0.005, answer: "241.56", wrong: [round(22 * 3.6 / 100, 3), lactY],
    explanation: `Yield = 22 × 305 = ${fmtNum(lactY)} kg; fat = ${fmtNum(lactY)} × 3.6 ÷ 100 = ${fatKg.toFixed(2)} kg.`,
    workedSolution: `1. Lactation yield = 22 × 305 = ${fmtNum(lactY)} kg.\n2. Butterfat = ${fmtNum(lactY)} × 3.6 ÷ 100 = ${fatKg.toFixed(2)} kg.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think of the udder, the calf and the cow's body."],
    stem: "Explain **three** reasons for giving a dairy cow a dry period before calving.",
    points: [
      "The udder tissue rests and renews itself, so the next lactation is higher.",
      "Nutrients go to the foetus, which grows fastest in the last months of pregnancy.",
      "The cow rebuilds body reserves (condition) for the next lactation / allows dry-cow therapy.",
    ],
    modelAnswer: "The dry period lets the udder tissue rest and regenerate, lets nutrients go to the fast-growing calf in late pregnancy, and allows the cow to rebuild body condition, so her next lactation is better.",
    explanation: "Udder, foetus, condition.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Milk records for one cow after calving (mean daily yield in sample weeks).\n\n${WEEK_TABLE}`,
    hints: ["Find the highest yield.", "Percentage change = (new − old) ÷ old × 100."],
    parts: [
      P.short({
        label: "(a)", stem: "In which week after calving did the cow reach peak yield?",
        accepted: ["7", "week 7", "seven", "the seventh week"],
        explanation: `Peak yield was ${peak[1]} kg in week ${peak[0]}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage fall in yield from week 9 to week 11, to one decimal place.",
        value: Math.abs(drop), unit: "%", tol: 0.05, answer: "30.3", wrong: [6.6, round(pct(6.6, 15.2), 1)],
        explanation: `Fall = 21.8 − 15.2 = 6.6 kg; 6.6 ÷ 21.8 × 100 = ${round(Math.abs(drop), 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "The yield recovered after week 11. Suggest **two** possible causes of the sudden fall.",
        points: ["Mastitis (or another illness) in week 10-11, treated so yield recovered.", "A shortage of feed or water, heat stress or a disturbance in the milking routine/stress."],
        explanation: "Temporary causes.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain **three** ways the farmer can use records like these.",
        points: ["To feed concentrates according to each cow's yield.", "To detect illness or problems early from sudden falls.", "To select the best cows for breeding and cull low producers / calculate income."],
        explanation: "Feeding, health, selection.",
      }),
    ],
    explanation: "Interpret a lactation record: peak, a sudden fall and the uses of records.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, calculator: true,
    stem: "Tendai keeps three crossbred dairy cows near Marondera and delivers milk to a collection centre that pays US\\$0.50 per kg (assume this price). In June, daily yields were: cow 1, 12 kg; cow 2, 9 kg; cow 3, 15 kg.",
    hints: ["Daily total × 30 days.", "Income = kg × price."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the total milk produced by the three cows in the 30 days of June, in kg.",
        value: monthL, unit: "kg", tol: 0, wrong: [dayTotal, 36 * 31],
        explanation: `Daily = 12 + 9 + 15 = ${dayTotal} kg; × 30 = ${fmtNum(monthL)} kg.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate Tendai's income from milk in June, in US\\$.",
        value: income, prefix: "US$", wrong: [monthL, monthL * 5],
        explanation: `${fmtNum(monthL)} × 0.50 = US\\$${income}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Cow 2 was treated for mastitis, and her milk had to be discarded for 4 days. Calculate the income lost, in US\\$.",
        value: lostIncome, prefix: "US$", wrong: [36, 4.5],
        explanation: `9 kg × 4 days = 36 kg; 36 × 0.50 = US\\$${lostIncome}.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe **three** practices that would help Tendai produce clean milk that the centre accepts.",
        points: ["Healthy cows; wash and dry teats with individual towels; strip cup check before milking.", "Clean milker (washed hands, clean clothes) and clean, seamless utensils washed and sanitised after use.", "Filter and cool milk quickly, keep it covered away from dust and flies, and discard milk from treated cows."],
        explanation: "Cow, milker and utensil hygiene, cooling, residues.",
      }),
    ],
    explanation: "Milk income and clean milk production.",
  });

  b.card("FACT", "Dairy breeds", "Holstein-Friesian (most milk, lower butterfat), Jersey (richest milk, small, heat tolerant), Guernsey (golden milk), Ayrshire (hardy).");
  b.card("CONCEPT", "Dairy type", "Wedge-shaped, lean and angular; deep body, thin neck, large well-attached udder, prominent milk veins.");
  b.card("FACT", "Milking routine", "Regular times; calm; wash and dry teats; strip cup; milk fully and fast; teat dip; record; filter and cool to about 4 °C; clean utensils.");
  b.card("DEFINITION", "Mastitis", "Inflammation of the udder, usually bacterial: hot swollen quarter, clots, watery or bloody milk; subclinical needs a test.");
  b.card("CONCEPT", "Preventing mastitis", "Hygiene, teat dipping, strip cup, good machines, milk infected cows last, dry-cow therapy, cull chronic cases.");
  b.card("FACT", "Dry period", "Six to eight weeks before calving: udder renewal, foetal growth, body reserves; steam up in the last weeks.");
  b.card("FACT", "Lactation curve", "Yield rises to a peak about 6-8 weeks after calving, then falls slowly; standard lactation 305 days.");
  b.card("CONCEPT", "Why discard milk from treated cows?", "Antibiotic residues are a health risk and spoil milk for processing; discard for the whole withdrawal period.");
});
