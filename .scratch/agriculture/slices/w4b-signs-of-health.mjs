// Slice W4b: signs of health and ill-health.
import { concept, P, pct, mean, round, check, table } from "../lib.mjs";

const pulse = 19 * 4;
const resp = 9 * 3;
check(pulse === 76 && resp === 27, "pulse resp");
const flockPct = pct(18, 240);
check(flockPct === 7.5, "flockPct");
const pigMean = round(mean([39.1, 38.9, 39.0, 39.4]), 2);
check(pigMean === 39.1, "pigMean");
// Struct 8: four steers.
const STEERS = [
  ["P", "38.3", "Grazing with herd; chewing cud", "Firm pats", "Smooth, glossy"],
  ["Q", "40.8", "Standing apart, head low; not eating", "Watery, foul-smelling", "Rough, dull"],
  ["R", "38.2", "Grazing with herd; chewing cud", "Firm pats", "Smooth, glossy"],
  ["S", "38.9", "Lame on right foreleg; eating", "Firm pats", "Smooth"],
];
const STEER_TABLE = table(["Steer", "Rectal temperature (°C)", "Behaviour", "Dung", "Coat"], STEERS);
const steerMean = round(mean(STEERS.map((r) => Number(r[1]))), 3);
const healthyMean = round(mean([38.3, 38.2, 38.9]), 3);
check(steerMean === 39.05 && healthyMean === 38.467, "steer means");
// Struct 6: layer egg record.
const EGGS = [[1, 452], [2, 448], [3, 455], [4, 401], [5, 338]];
const EGG_TABLE = table(["Day", "Eggs collected (500 hens)"], EGGS);
const day5Pct = round(pct(338, 500), 2);
const dropPct = round(pct(455 - 338, 455), 1);
check(day5Pct === 67.6 && dropPct === 25.7, "eggs");

concept("agri.health.signs-of-health", { file: "health/signs-of-health", keyPrefix: "health.signs-of-health" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a sign of good health in a cow?",
    options: [
      ["Chewing the cud while resting", "Correct: normal rumination."],
      ["A dry, cracked muzzle", "A dry muzzle often accompanies fever."],
      ["Standing apart from the herd", "Isolation is a sign of ill-health."],
      ["A rough, dull, staring coat", "A healthy coat is smooth and glossy."],
    ],
    answer: "A",
    explanation: "A healthy ruminant spends long periods chewing the cud.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the approximate normal rectal temperature of an adult cow?",
    options: [
      ["38.5 °C", "Correct (approximate)."],
      ["36.0 °C", "Too low; this would suggest shock or collapse."],
      ["41.5 °C", "About normal for a chicken, a fever in a cow."],
      ["44.0 °C", "Far too high for any farm animal."],
    ],
    answer: "A",
    explanation: "Cattle are about 38.5 °C; sheep and goats about 39-40 °C; chickens about 41-42 °C.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Pale gums and pale inner eyelids in a goat most likely indicate:",
    options: [
      ["anaemia (loss of blood or iron)", "Correct: membranes should be pink."],
      ["a high fever", "Fever is measured with a thermometer."],
      ["a healthy goat", "Healthy membranes are pink."],
      ["overfeeding on concentrates", "Overfeeding does not cause pale membranes."],
    ],
    answer: "A",
    explanation: "Pale membranes show anaemia, for example from blood-sucking worms or ticks.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Where is the pulse of a cow usually taken?",
    options: [
      ["Under the base of the tail", "Correct: the artery runs under the tail bones."],
      ["On the side of the neck", "The jugular is a vein; not the usual site."],
      ["In the middle of the back", "No suitable artery lies there."],
      ["On the top of the head", "No suitable artery lies there."],
    ],
    answer: "A",
    explanation: "In cattle the pulse is felt in the artery under the tail; in sheep, goats and pigs inside the thigh.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why should an animal be allowed to rest and be handled calmly before its temperature is taken?",
    options: [
      ["Excitement raises temperature and pulse", "Correct: readings would look abnormal."],
      ["A thermometer only works on sleeping animals", "Not true."],
      ["Resting animals have no pulse to disturb", "Resting animals have a normal pulse."],
      ["Calm animals cannot pass on diseases", "Handling calmly is about accurate readings and safety."],
    ],
    answer: "A",
    hints: ["What happens to your own pulse after running?"],
    explanation: "Exercise and fear raise temperature, pulse and breathing, giving a false sign of illness.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A dairy cow suddenly gives much less milk, stops chewing the cud and has a temperature of about 40.8 °C. What should the farmer do first?",
    options: [
      ["Isolate her and call a veterinary officer", "Correct: fever and other signs suggest infection."],
      ["Increase her dairy meal to bring her milk back up", "Feeding does not treat an infection."],
      ["Wait a week to see if she recovers", "Delay lets the disease worsen or spread."],
      ["Sell her milk at once to recover costs", "Milk from a sick cow must be withheld."],
    ],
    answer: "A",
    hints: ["Several signs together point to disease."],
    explanation: "Several signs at once (fever, no rumination, drop in milk) point to disease: isolate and seek help early.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change in a flock of laying hens is a sign of ill-health?",
    options: [
      ["A sudden fall in egg numbers", "Correct: production drops early in disease."],
      ["Hens scratching and dust bathing", "Normal active behaviour."],
      ["Bright red combs", "A red comb is typical of a laying hen."],
      ["Hens eating eagerly when fed", "A good appetite is a sign of health."],
    ],
    answer: "A",
    explanation: "A sudden drop in production is one of the first signs of disease in a flock.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Two pigs have rectal temperatures of 39.2 °C and 40.6 °C. Only the second is off its feed and lies hunched in a corner. Which conclusion is best supported?",
    options: [
      ["The second pig is probably ill", "Correct: fever plus other signs."],
      ["Both pigs are ill because both are above 39 °C", "About 39 °C is normal for pigs."],
      ["The first pig is ill, the second is normal", "The signs point the other way."],
      ["Neither pig can be judged without a pulse rate", "Several signs already agree."],
    ],
    answer: "A",
    hints: ["What is the approximate normal temperature of a pig?"],
    explanation: "About 39 °C is normal; 40.6 °C with loss of appetite and a hunched posture is a pattern of ill-health.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "One abnormal sign on its own always proves that an animal has an infectious disease.",
    answer: false,
    explanation: "False. A single sign can have other causes (heat, exercise); look for a pattern and compare with healthy animals.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each observation with what it is most likely to indicate.",
    pairs: [
      ["Yellow inner eyelids and gums", "Jaundice (often liver damage)"],
      ["Watery dung", "Diarrhoea (scours)"],
      ["Hunched back, kicking at the belly", "Abdominal pain"],
      ["Limping on one leg", "Injury or foot problem (lameness)"],
      ["Rough, staring coat and thin body", "Poor condition from parasites or poor feeding"],
    ],
    explanation: "Each sign points the stockman towards a likely cause to investigate.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A body temperature well above normal is called a {{blank:a}}. Temperature in farm animals is normally taken in the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["fever", "pyrexia"] }, { id: "b", accepted: ["rectum", "anus"] }],
    explanation: "Fever; rectal temperature.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the instrument used to measure an animal's body temperature.",
    accepted: ["clinical thermometer", "thermometer", "digital thermometer", "rectal thermometer", "veterinary thermometer"],
    keywords: { any: ["thermometer"] },
    explanation: "A **clinical (veterinary) thermometer**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Farai counts 19 pulse beats in 15 seconds under a cow's tail. Calculate her pulse rate in beats per minute.",
    value: pulse, tol: 0, wrong: [19 * 15, 19],
    explanation: `60 ÷ 15 = 4, so 19 × 4 = ${pulse} beats per minute.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A steer's flank rises and falls 9 times in 20 seconds. Calculate its respiration rate in breaths per minute.",
    value: resp, tol: 0, wrong: [9 * 20, 9 * 2],
    hints: ["How many 20-second periods are there in a minute?"],
    explanation: `60 ÷ 20 = 3, so 9 × 3 = ${resp} breaths per minute.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "In a flock of 240 broilers, 18 birds are dull and off their feed. Calculate the percentage of the flock showing signs of ill-health.",
    value: flockPct, unit: "%", tol: 0.05, answer: "7.5", wrong: [18, round((240 / 18), 1)],
    explanation: `18 ÷ 240 × 100 = ${flockPct}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Four pigs in a pen have rectal temperatures of 39.1, 38.9, 39.0 and 39.4 °C. Calculate their mean temperature, in °C, to one decimal place.",
    value: pigMean, unit: "°C", tol: 0.05, answer: "39.1", wrong: [round(39.1 + 38.9 + 39.0 + 39.4, 1)],
    hints: ["Add the four values and divide by 4."],
    explanation: `(39.1 + 38.9 + 39.0 + 39.4) ÷ 4 = 156.4 ÷ 4 = ${pigMean} °C, close to the approximate normal of 39 °C.`,
    workedSolution: `1. Sum = 39.1 + 38.9 + 39.0 + 39.4 = 156.4 °C.\n2. Mean = 156.4 ÷ 4 = ${pigMean} °C.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** signs, other than body temperature, that would show a farmer that a goat is unhealthy.",
    hints: ["Think of behaviour, appetite, coat, eyes and droppings."],
    points: [
      "Dull / isolated from the herd / lies down a lot.",
      "Loss of appetite / stops chewing the cud.",
      "Rough, dull coat / thin body / pale or discharging eyes or nose.",
      "Diarrhoea or abnormal droppings / lameness / fall in milk or growth.",
    ],
    modelAnswer: "The goat stands apart and looks dull, stops eating and chewing the cud, has a rough coat and runny eyes, and passes diarrhoea.",
    explanation: "Any four distinct signs.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why a farmer should observe livestock every day and keep records of what is seen.",
    hints: ["Early detection and comparison."],
    points: [
      "Illness is noticed early, when treatment is most successful and cheapest.",
      "Sick animals can be isolated before an infectious disease spreads.",
      "Records allow comparison with earlier readings and healthy animals and help the vet diagnose / show trends in production.",
    ],
    modelAnswer: "Daily observation finds sick animals early, when they are easier and cheaper to treat, and lets them be isolated before infection spreads. Records show changes from normal and help the vet decide what is wrong.",
    explanation: "Early detection, prevention of spread, comparison.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Thandeka records four steers in a feedlot near Bulawayo one morning.\n\n${STEER_TABLE}`,
    hints: ["Compare each steer with the approximate normal of 38.5 °C.", "Look for a pattern of several signs."],
    parts: [
      P.short({
        label: "(a)", stem: "Which steer has a fever? Give its letter.",
        accepted: ["Q", "steer Q"], normalise: ["trim", "lowercase", "strip_punctuation"],
        explanation: "**Q** (40.8 °C).",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mean temperature of the three steers without fever, to one decimal place.",
        value: round(healthyMean, 1), unit: "°C", tol: 0.05, answer: "38.5", wrong: [round(steerMean, 1)],
        explanation: `(38.3 + 38.2 + 38.9) ÷ 3 = ${healthyMean}, about 38.5 °C. Including Q gives ${round(steerMean, 2)} °C.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** signs, other than temperature, that steer Q is ill.",
        points: ["Standing apart with head low / not eating.", "Watery, foul-smelling dung (diarrhoea) / rough, dull coat."],
        explanation: "Behaviour, appetite, dung and coat.",
      }),
      P.mcq({
        label: "(d)", stem: "Steer S has a normal temperature but is lame. What is the most likely cause?",
        options: [
          ["An injury or infection of the foot", "Correct: a local problem without fever."],
          ["A serious infectious fever", "His temperature is normal."],
          ["Lack of water", "Would not cause lameness in one leg."],
          ["Too much roughage in the diet", "Diet does not cause lameness in one leg."],
        ],
        answer: "A",
        explanation: "Lameness in one leg with normal temperature suggests a local injury or foot infection.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest what Thandeka should do about steer Q, and why.",
        points: ["Separate (isolate) Q from the other steers and give it water and shade.", "Call the veterinary or extension officer, because the signs may be an infectious disease that could spread."],
        explanation: "Isolate and report.",
      }),
    ],
    explanation: "Interpret observations of temperature, behaviour, dung and coat to identify ill-health.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: true,
    stem: `Sipho keeps 500 laying hens near Chinhoyi. His egg record for five days is shown.\n\n${EGG_TABLE}`,
    hints: ["Laying % = eggs ÷ hens × 100.", "Percentage fall = fall ÷ starting value × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the laying percentage on day 5.",
        value: day5Pct, unit: "%", tol: 0.05, answer: "67.6", wrong: [338, round(500 / 338 * 100, 1)],
        explanation: `338 ÷ 500 × 100 = ${day5Pct}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage fall in eggs collected from day 3 to day 5, to one decimal place.",
        value: dropPct, unit: "%", tol: 0.05, answer: "25.7", wrong: [455 - 338, round(pct(455 - 338, 338), 1)],
        explanation: `Fall = 455 − 338 = 117; 117 ÷ 455 × 100 = ${dropPct}%.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest **three** other signs Sipho should look for in the hens to decide whether they are ill.",
        points: ["Dull, hunched birds with ruffled feathers / closed eyes.", "Reduced feed and water intake.", "Abnormal (watery, green or bloody) droppings / gasping, coughing or nasal discharge / pale combs / deaths."],
        explanation: "Behaviour, appetite, droppings, breathing.",
      }),
    ],
    explanation: "Use production records as an early sign of ill-health.",
  });

  b.card("DEFINITION", "Animal health", "A state in which an animal's body and behaviour work normally, free from disease, injury and parasites, with normal growth and production.");
  b.card("FACT", "Approximate normal rectal temperatures", "Cattle about 38.5 °C; sheep and goats about 39-40 °C; pigs about 39 °C; chickens about 41-42 °C.");
  b.card("CONCEPT", "Five signs of a healthy ruminant", "Alert, with the herd; eats and chews the cud; smooth glossy coat; bright eyes, moist muzzle; normal dung and production.");
  b.card("CONCEPT", "Five signs of ill-health", "Dullness and isolation; loss of appetite; rough coat; discharges or diarrhoea; lameness or fall in production.");
  b.card("FACT", "Where is a cow's pulse taken?", "In the artery under the base of the tail.");
  b.card("FORMULA", "Pulse rate from a short count", "Beats per minute = beats counted × (60 ÷ seconds counted).");
  b.card("FACT", "What do pale mucous membranes indicate?", "Anaemia, for example from blood-sucking worms or ticks.");
  b.card("CONCEPT", "Why handle animals calmly before taking vital signs?", "Excitement and exercise raise temperature, pulse and breathing and give false readings.");
});
