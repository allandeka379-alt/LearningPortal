// Slice W4a: donkey rearing (ZIMSEC only).
import { concept, P, pct, round, check, table } from "../lib.mjs";

// Num: ploughing days.
const plDays = 2.4 / 0.2;
check(Math.abs(plDays - 12) < 1e-9, "plDays");
// Num: water trips.
const trips = Math.ceil(1400 / 200 - 1e-9);
check(trips === 7, "trips");
// Struct: welfare survey at a market.
const SURVEY = [["Harness sores", 9], ["Overgrown hooves or lameness", 6], ["Very thin (poor body condition)", 5], ["No problem seen", 12]];
const inspected = 30;
const soresPct = pct(9, inspected);
check(soresPct === 30, "sores");
const SURVEY_TABLE = table(["Finding (a donkey may have more than one)", "Number of donkeys"], SURVEY);
const problemPct = pct(inspected - 12, inspected);
check(problemPct === 60, "problem");

concept("agri.livestock.donkeys", { file: "livestock/donkeys", keyPrefix: "livestock.donkeys" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a female donkey called?",
    options: [
      ["Jenny", "Correct (also called a jennet)."],
      ["Jack", "A jack is a male donkey."],
      ["Mare", "A mare is a female horse."],
      ["Hinny", "A hinny is the offspring of a stallion and a jenny."],
    ],
    answer: "A",
    explanation: "Jack = male, jenny = female, foal = young.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "A mule is the offspring of which cross?",
    options: [
      ["A jack (male donkey) and a mare (female horse)", "Correct."],
      ["A stallion and a jenny", "This cross gives a hinny."],
      ["Two donkeys of different breeds", "That gives a crossbred donkey, not a mule."],
      ["A donkey and a zebra living together in the same game park", "This is not a mule."],
    ],
    answer: "A",
    explanation: "Mules (jack × mare) are strong and hardy but almost always sterile.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do donkeys need a shelter from rain?",
    options: [
      ["Their coats are not very waterproof", "Correct: wet, cold donkeys lose condition and can fall ill."],
      ["Rain makes their hooves grow faster", "This is not the reason for shelter."],
      ["Donkeys cannot drink rainwater safely", "Rainwater is safe to drink."],
      ["Rain washes the dip chemicals off their skin, so ticks attack them immediately", "This is not the main reason."],
    ],
    answer: "A",
    explanation: "Unlike horses, donkeys have a coat that does not shed rain well, so they need shelter as well as shade.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the usual gestation period of a jenny?",
    options: [
      ["About 12 months", "Correct (often a little longer)."],
      ["About 9 months", "About 9 months is the gestation of a cow."],
      ["About 5 months", "About 5 months is the gestation of a ewe or doe goat."],
      ["About 31 days", "About 31 days is the gestation of a rabbit."],
    ],
    answer: "A",
    explanation: "Donkey pregnancy is long, about a year.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Where does a harness press on the skin?"],
    stem: "A donkey has an open wound where a thin rope rubs across its chest when it pulls a cart. What is the best action?",
    options: [
      ["Rest it until healed and replace the rope with a broad, padded strap", "Correct: removes the cause and lets the sore heal."],
      ["Keep working it but tie the rope tighter so it cannot move", "A tighter rope makes the sore worse."],
      ["Cover the wound with sand so flies cannot reach it, and continue work", "Sand contaminates the wound; work must stop."],
      ["Sell the donkey because such sores never heal", "Harness sores heal if the cause is removed."],
    ],
    answer: "A",
    explanation: "Harness sores come from hard, narrow or badly fitting harness; rest, treat and fit a padded, well-fitting harness.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens if hooves are never trimmed?"],
    stem: "Why should a working donkey's hooves be trimmed regularly?",
    options: [
      ["Overgrown, misshapen hooves cause lameness", "Correct."],
      ["Trimming makes the donkey run faster", "The purpose is soundness, not speed."],
      ["Trimmed hooves do not need to be kept dry", "Dry standing is still needed."],
      ["Trimming hooves prevents harness sores on the chest and back", "Harness sores are caused by the harness."],
    ],
    answer: "A",
    explanation: "Hooves grow continuously; trimming about every two to three months keeps them the right shape and prevents lameness.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Weigh cost, feed, water and strength."],
    stem: "For a family in a dry area with poor grazing, which is the main advantage of donkeys over oxen for draught?",
    options: [
      ["They need less feed and water and survive drought better", "Correct."],
      ["They are stronger, so fewer animals are needed in a span", "Donkeys are weaker than oxen."],
      ["They plough faster than a span of oxen", "Donkey spans usually plough more slowly."],
      ["They provide more milk and meat for the family than cattle do", "Cattle are the main source of milk and meat."],
    ],
    answer: "A",
    explanation: "Donkeys are cheaper, hardier and use less feed and water, though they are weaker and slower.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mules are usually sterile.",
    answer: true,
    explanation: "True. Mules almost never produce offspring.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A donkey should start full, heavy work at about one year old so that it gets used to it early.",
    answer: false,
    explanation: "False. Train gently from an early age, start light work at about two to three years and full work at about four years.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each welfare problem with a way of preventing it.",
    pairs: [
      ["Harness sores", "Well-fitting, padded harness"],
      ["Lameness from long hooves", "Regular hoof trimming"],
      ["Exhaustion and heat stress", "Work in cool hours with rests and water"],
      ["Poor condition from worms", "Regular deworming"],
      ["Hoof rot and thrush", "Dry, clean standing area"],
    ],
    explanation: "Link each welfare action to the problem it prevents.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A male donkey is called a {{blank:a}}, and a young donkey is called a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["jack", "jackass"] },
      { id: "b", accepted: ["foal"] },
    ],
    explanation: "Jack and foal.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the painful hoof condition that donkeys can develop when they are given too much rich feed or grain.",
    accepted: ["laminitis", "founder"],
    explanation: "**Laminitis** is inflammation inside the hoof, linked to over-feeding rich feed.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Assume a span of donkeys ploughs 0.2 ha a day. How many days will it take to plough 2.4 ha?",
    value: plDays, unit: "days", tol: 0, answer: "12", wrong: [0.48, 2.6],
    explanation: "Days = 2.4 ÷ 0.2 = 12. Multiplying (0.48) is the wrong operation.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Divide and round UP: a part-trip is still a trip."],
    stem: "A donkey cart carries 200 L of water per trip. A family needs 1,400 L for a building project. How many trips are needed?",
    value: trips, tol: 0, wrong: [6, 1200],
    explanation: "1,400 ÷ 200 = 7 trips.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["Feed, water, shelter, health."],
    stem: "Describe how Sipho should feed and house his two working donkeys during the dry season.",
    points: [
      "Allow grazing/browsing time and give hay or crop residues such as maize stover or groundnut haulms.",
      "Give some grain or concentrate on days of hard work, plus a salt lick.",
      "Provide clean water at least twice a day, especially after work.",
      "Keep them in a dry, well-drained shelter with a roof, protected from wind, predators and theft.",
    ],
    modelAnswer: "Sipho should let them graze and give hay or stover, add a little grain on hard working days, supply a salt lick and clean water at least twice a day, and keep them in a dry, roofed shelter that is secure from predators.",
    explanation: "Roughage, extra energy for work, water and salt, shelter.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Think of the animal, the owner and the community."],
    stem: "Explain why good welfare of working donkeys benefits their owners as well as the animals.",
    points: [
      "Healthy, well-fed donkeys without sores or lameness can work more days and pull more.",
      "They live and work for more years, so the owner does not need to replace them often (saves money).",
      "Well-treated donkeys are calmer and easier to handle and train, reducing accidents.",
      "Fewer veterinary costs and days lost to injury or illness / better value if sold or hired out.",
    ],
    modelAnswer: "A donkey without sores or lameness that is well fed works more days and for more years, so the owner earns more and spends less on replacements and treatment; it is also calmer and safer to work with.",
    explanation: "Productivity, longevity, safety, costs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A welfare group inspected ${inspected} working donkeys at a market near Gwanda.\n\n${SURVEY_TABLE}`,
    hints: ["Percentage = number ÷ donkeys inspected × 100.", "Donkeys with no problem are listed separately."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of the donkeys inspected that had harness sores.",
        value: soresPct, unit: "%", tol: 0, wrong: [9, round(pct(9, 32), 1)],
        explanation: `9 ÷ ${inspected} × 100 = ${soresPct}%.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the percentage of donkeys inspected that had at least one problem.",
        value: problemPct, unit: "%", tol: 0, wrong: [40, 66.7],
        explanation: `${inspected} − 12 = ${inspected - 12} donkeys had a problem; ${inspected - 12} ÷ ${inspected} × 100 = ${problemPct}%. Adding 9 + 6 + 5 counts some donkeys twice.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** causes of harness sores.",
        points: ["Hard, narrow or badly fitting harness, rope or wire rubbing the skin.", "Dirty harness pads / overloading / working long hours without checking the skin."],
        explanation: "Equipment and workload.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** actions owners could take to improve the welfare of these donkeys.",
        points: ["Fit broad, padded, well-fitting harnesses and rest donkeys with sores until healed.", "Trim hooves regularly and keep standing areas dry.", "Give enough feed (hay, residues, extra feed for work), water and deworming; avoid overloading and long hours."],
        explanation: "Harness, hooves, feeding and workload.",
      }),
    ],
    explanation: "Interpret a welfare survey and suggest improvements.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Chipo's jenny gave birth to a healthy foal yesterday on a farm near Beitbridge.",
    hints: ["Think of the first days, then the first months."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State **two** things Chipo should do for the foal in its first day.",
        points: ["Make sure it suckles colostrum soon after birth.", "Dip the navel in iodine / keep it in a clean, sheltered place."],
        explanation: "Colostrum and navel.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the foal should be handled gently every day.",
        points: ["It becomes used to people, a head collar and having its feet lifted.", "So it is easier and safer to train, groom, trim hooves and treat later."],
        explanation: "Early handling.",
      }),
      P.mcq({
        label: "(c)", stem: "At about what age should the foal be weaned?",
        options: [
          ["About six months or later", "Correct."],
          ["About one week", "Far too early; it depends on milk."],
          ["About three weeks", "Still far too early."],
          ["About four years, when it is ready for full work", "Foals are weaned long before this."],
        ],
        answer: "A",
        explanation: "Wean when the foal eats grass and hay well, at about six months or later.",
      }),
      P.short({
        label: "(d)", stem: "At about what age (in years) should the donkey begin full work?",
        accepted: ["4", "four", "4 years", "four years", "about 4 years", "about four years"],
        explanation: "Full work at about four years; light work from about two to three.",
      }),
    ],
    explanation: "Care and training of a donkey foal.",
  });

  b.card("DEFINITION", "Jack, jenny, foal", "Male donkey, female donkey, young donkey.");
  b.card("DEFINITION", "Mule and hinny", "Mule = jack × mare; hinny = stallion × jenny; both usually sterile.");
  b.card("FACT", "Donkey gestation", "About 12 months (often a little more); usually one foal.");
  b.card("CONCEPT", "Donkeys vs oxen for draught", "Donkeys: cheaper, less feed and water, drought hardy, easy to handle. But weaker and slower; a span is needed.");
  b.card("FACT", "Why donkeys need shelter", "Their coats are not very waterproof; they need protection from rain and cold as well as shade.");
  b.card("CONCEPT", "Preventing harness sores", "Broad, padded, well-fitting, clean harness; check skin after work; rest until healed; avoid overloading.");
  b.card("FACT", "Hoof care", "Pick out hooves; trim about every 2-3 months or when overgrown; keep standing areas dry.");
  b.card("FACT", "Training timetable", "Handle foals early; wean about 6 months; light work about 2-3 years; full work about 4 years.");
});
