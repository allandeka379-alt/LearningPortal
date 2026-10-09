// Slice W4a: exam-format items for livestock production. Theory structured (10 marks: ZIMSEC P2 Section A / Cambridge
// P1 Section A), ZIMSEC P2 Section B animal husbandry (20 marks) and Cambridge P1 Section B (15 marks). Part splits are
// our convention; a reviewer must check them against past papers.
import { concept, P, ZIM, CAM, fcr, dressingPct, mortalityPct, layingPct, grossMargin, pct, pctChange, round, check, table, fmtNum, agricultureLevels } from "../lib.mjs";

const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const longDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function dateAnswers(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  return [`${d} ${month} ${y}`, `${d} ${month}`, `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`, `${d}/${m}/${y}`, `${month} ${d} ${y}`, `${month} ${d}`, `${d}th ${month} ${y}`, `${d}th ${month}`];
}

// T1: broiler growth and FCR (per bird).
const T1_GROWTH = [[0, 0.045], [1, 0.17], [2, 0.45], [3, 0.88], [4, 1.4], [5, 1.95], [6, 2.445]];
const T1gain = 2.445 - 0.045;
const T1feed = 4.08;
const T1fcr = fcr({ feedKg: T1feed, gainKg: T1gain });
const T1weekGains = T1_GROWTH.slice(1).map(([d, m], i) => [d, m - T1_GROWTH[i][1]]);
const T1best = T1weekGains.reduce((a, r) => (r[1] > a[1] ? r : a));
check(Math.abs(T1gain - 2.4) < 1e-9 && Math.abs(T1fcr - 1.7) < 1e-9 && T1best[0] === 5, "T1");
const T1_TABLE = table(["Age (weeks)", "Mean live mass (kg)"], T1_GROWTH.map(([d, m]) => [d, m.toFixed(3)]));

// T2: rumen share.
const T2share = pct(135, 180);
check(T2share === 75, "T2");

// T3: dressing percentages of a broiler and a rabbit.
const T3b = dressingPct({ carcassKg: 1.512, liveKg: 2.1 });
const T3r = dressingPct({ carcassKg: 1.35, liveKg: 2.5 });
check(Math.abs(T3b - 72) < 1e-9 && Math.abs(T3r - 54) < 1e-9, "T3");
const T3_TABLE = table(["Animal", "Live mass (kg)", "Dressed carcass (kg)"], [["Broiler", "2.10", "1.512"], ["Rabbit", "2.50", "1.35"]]);

// T4: calving date.
const T4served = "2026-04-14";
const T4calf = addDays(T4served, 283);
check(T4calf === "2027-01-22", "T4");

// Z1: broiler batch.
const Z1placed = 600;
const Z1_DEATHS = [18, 6, 3, 2, 2, 1];
const Z1died = Z1_DEATHS.reduce((s, n) => s + n, 0);
const Z1alive = Z1placed - Z1died;
const Z1mort = mortalityPct({ died: Z1died, started: Z1placed });
const Z1gain = Z1alive * 2.3 - Z1placed * 0.04;
const Z1fcr = fcr({ feedKg: 2180, gainKg: Z1gain });
const Z1dress = dressingPct({ carcassKg: 1.702, liveKg: 2.3 });
const Z1gm = grossMargin({ output: [["Live broilers", Z1alive, 4.2]], variable: [["Chicks", 450], ["Feed", 1199], ["Vaccines and medicines", 60], ["Litter, fuel and other", 96]] });
check(Z1died === 32 && Math.abs(Z1mort - 5.3333) < 1e-3 && Math.abs(Z1fcr - 1.69994) < 1e-4 && Math.abs(Z1dress - 74) < 1e-9 && Math.abs(Z1gm.grossMargin - 580.6) < 1e-9, "Z1");
const Z1_TABLE = table(["Week", "1", "2", "3", "4", "5", "6"], [["Deaths", ...Z1_DEATHS]]);

// Z2: layers.
const Z2eggs = 20640;
const Z2pct = layingPct({ eggs: Z2eggs, hens: 800, days: 30 });
const Z2trays = Z2eggs / 30;
const Z2feed = 800 * 0.12 * 30;
const Z2perDozen = Z2feed / (Z2eggs / 12);
check(Z2pct === 86 && Z2trays === 688 && Math.abs(Z2feed - 2880) < 1e-9 && Math.abs(Z2perDozen - 1.6744) < 1e-3, "Z2");
const Z2_TABLE = table(["Age of flock (weeks)", "20", "24", "28", "40", "56", "72"], [["Hen-day laying (%)", 12, 78, 92, 88, 80, 64]]);

// Z3: pigs.
const Z3_SOWS = [["Sow A", "2026-06-02", 11, 10], ["Sow B", "2026-06-20", 12, 9], ["Sow C", "2026-07-09", 10, 9]];
const Z3farrowB = addDays(Z3_SOWS[1][1], 114);
const Z3born = Z3_SOWS.reduce((s, r) => s + r[2], 0);
const Z3weaned = Z3_SOWS.reduce((s, r) => s + r[3], 0);
const Z3mort = mortalityPct({ died: Z3born - Z3weaned, started: Z3born });
const Z3litters = 365 / (114 + 42 + 5);
check(Z3farrowB === "2026-10-12" && Z3born === 33 && Z3weaned === 28 && Math.abs(Z3mort - 15.1515) < 1e-3 && Math.abs(Z3litters - 2.2671) < 1e-3, "Z3");
const Z3_TABLE = table(["Sow", "Date served", "Piglets born alive", "Piglets weaned"], Z3_SOWS.map(([s, d, b, w]) => [s, longDate(d), b, w]));

// Z4: beef herd on veld.
const Z4_MASS = [["November", 380], ["January", 410], ["March", 440], ["May", 445], ["July", 420], ["September", 395]];
const Z4loss = 445 - 395;
const Z4lossPct = -pctChange(445, 395);
const Z4bulls = 150 / 30;
check(Z4loss === 50 && Math.abs(Z4lossPct - 11.236) < 1e-3 && Z4bulls === 5, "Z4");
const Z4_TABLE = table(["Month", ...Z4_MASS.map((r) => r[0])], [["Mean cow mass (kg)", ...Z4_MASS.map((r) => r[1])]]);

concept("agri.livestock.broilers", { file: "exam/w4a-theory", keyPrefix: "exam.w4a-theory" }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.livestock.broilers"],
    stem: `A school near Bulawayo reared a batch of broilers. A sample of birds was weighed each week.\n\n${T1_TABLE}\n\nEach bird ate 4.08 kg of feed from hatching to six weeks.`,
    hints: ["Gain = final mass − starting mass.", "FCR = feed ÷ gain."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the type of feed given to the broilers in their first week.",
        accepted: ["broiler starter", "starter", "starter crumbs", "broiler starter crumbs", "chick starter"],
        keywords: { any: ["starter"] },
        explanation: "Broiler starter (crumbs), high in protein.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the mean live-weight gain per bird from week 0 to week 6, in kg.",
        value: T1gain, unit: "kg", tol: 0.005, answer: "2.4", wrong: [2.445, 2.49],
        explanation: "2.445 − 0.045 = 2.4 kg.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the feed conversion ratio, to one decimal place.",
        value: T1fcr, tol: 0.05, answer: "1.7", wrong: [round(T1gain / T1feed, 2), round(T1feed / 2.445, 2)],
        explanation: `FCR = 4.08 ÷ 2.4 = ${T1fcr}.`,
      }),
      P.mcq({
        label: "(d)", stem: "In which week did the birds gain the most mass?",
        options: [
          ["Week 4 to week 5", "Correct: 0.55 kg."],
          ["Week 5 to week 6", "Gain was 0.495 kg."],
          ["Week 3 to week 4", "Gain was 0.52 kg."],
          ["Week 0 to week 1, when the chicks were growing fastest of all", "Gain was only 0.125 kg."],
        ],
        answer: "A",
        explanation: "Weekly gains: 0.125, 0.28, 0.43, 0.52, 0.55, 0.495 kg; the largest is from week 4 to week 5.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why a low feed conversion ratio is important to a broiler farmer.",
        points: ["Less feed is needed for each kilogram of live-weight gain.", "Feed is the largest cost, so a low FCR reduces costs and increases profit."],
        explanation: "FCR and profit.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Suggest **three** ways of improving the feed conversion ratio of the next batch.",
        points: ["Keep the brooder at the correct temperature, so feed energy is not used to keep warm.", "Set feeders at back height and avoid spillage/wastage; keep rats out.", "Prevent disease (vaccination, dry litter, hygiene) and sell at the right age before FCR worsens."],
        explanation: "Temperature, wastage, health and timing.",
      }),
    ],
    explanation: "Broiler growth data, gain and FCR, and how management affects feed efficiency.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.livestock.digestion"],
    stem: "A described diagram of the stomach of a cow shows four compartments: W, the largest, on the left side of the abdomen; X, a small compartment with a honeycomb lining; Y, a compartment with many leaf-like folds; Z, a compartment with glands in its wall that leads to the small intestine.",
    hints: ["The order is rumen, reticulum, omasum, abomasum."],
    parts: [
      P.short({
        label: "(a)", stem: "Name compartment X.",
        accepted: ["reticulum", "the reticulum", "honeycomb"],
        keywords: { any: ["reticul"] },
        explanation: "X is the reticulum.",
      }),
      P.short({
        label: "(b)", stem: "Name compartment Z.",
        accepted: ["abomasum", "the abomasum", "true stomach"],
        keywords: { any: ["abomas", "true stomach"] },
        explanation: "Z is the abomasum (true stomach).",
      }),
      P.mcq({
        label: "(c)", stem: "In which compartment is most cellulose broken down by microbes?",
        options: [
          ["W", "Correct: the rumen."],
          ["X", "The reticulum is small and mainly moves food and traps heavy objects."],
          ["Y", "The omasum absorbs water."],
          ["Z", "The abomasum digests with gastric juice, not microbes."],
        ],
        answer: "A",
        explanation: "W, the rumen, is the fermentation chamber.",
      }),
      P.num({
        label: "(d)", stem: "In this cow W holds 135 L and the whole stomach holds 180 L. Calculate W as a percentage of the whole stomach.",
        value: T2share, unit: "%", tol: 0, wrong: [round(pct(135, 45), 0), 45],
        explanation: "135 ÷ 180 × 100 = 75%.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** products of microbial fermentation in compartment W.",
        points: ["Volatile fatty acids (absorbed for energy).", "Methane / carbon dioxide / microbial protein / B vitamins."],
        explanation: "Fermentation products.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain how rumination helps the cow digest roughage.",
        points: ["The cud is regurgitated and chewed again, breaking fibre into smaller pieces with a larger surface area for microbes.", "Chewing produces much saliva that buffers (neutralises) the acids in the rumen."],
        explanation: "Particle size and saliva.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why a pig cannot live on grass as a cow can.",
        points: ["The pig has a simple stomach with no rumen, so it has few microbes to digest cellulose.", "So it gets little energy from grass and needs concentrates rich in starch and protein."],
        explanation: "Stomach type and diet.",
      }),
    ],
    explanation: "Identify ruminant stomach compartments and link structure to function and diet.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 720, calculator: true, applies: ZIM,
    paper: "ZIMSEC Paper 2 Section A",
    concepts: ["agri.livestock.broilers", "agri.livestock.rabbits"],
    stem: `Form 4 pupils slaughtered and dressed a broiler and a rabbit and weighed them.\n\n${T3_TABLE}`,
    hints: ["Dressing % = carcass ÷ live mass × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the dressing percentage of the broiler.",
        value: T3b, unit: "%", tol: 0.05, answer: "72", wrong: [round((2.1 / 1.512) * 100, 1), 28],
        explanation: "1.512 ÷ 2.1 × 100 = 72%.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the dressing percentage of the rabbit.",
        value: T3r, unit: "%", tol: 0.05, answer: "54", wrong: [round((2.5 / 1.35) * 100, 1), 46],
        explanation: "1.35 ÷ 2.5 × 100 = 54%.",
      }),
      P.mcq({
        label: "(c)", stem: "Which statement best explains why the rabbit has the lower dressing percentage?",
        options: [
          ["Its pelt and its large digestive tract are removed", "Correct: the skin and a large gut (with the caecum) are a big share of a rabbit's live mass."],
          ["Rabbit meat is heavier than chicken meat", "This would raise, not lower, the percentage."],
          ["The rabbit was not bled after slaughter", "Proper dressing includes bleeding; this is not the explanation."],
          ["Feathers are left on the broiler carcass when it is weighed", "Feathers are removed from a dressed broiler."],
        ],
        answer: "A",
        explanation: "Rabbits lose the pelt, head, feet and a large gut, so a smaller share of live mass remains as carcass.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why feed is withdrawn for some hours before slaughter, but water is not.",
        points: ["An empty gut makes evisceration cleaner and reduces contamination of the carcass.", "Water prevents dehydration / stress and loss of carcass mass and quality."],
        explanation: "Clean evisceration; welfare.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how the rabbit's pelt should be prepared for sale.",
        points: ["Remove the skin whole (cased) by peeling it from the hind legs downwards.", "Scrape off fat and flesh and stretch it flesh-side out on a wire or board stretcher.", "Dry it in the shade (not in hot sun) and store it dry, away from insects."],
        explanation: "Case, clean, stretch, dry, store.",
      }),
    ],
    explanation: "Dressing percentages of a broiler and a rabbit, slaughter preparation and pelts.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    paper: "ZIMSEC P2 / Cambridge P1",
    concepts: ["agri.livestock.reproduction"],
    stem: `A described diagram of the reproductive system of a cow lists, from the inside: P, two oval organs; Q, two narrow tubes with funnel-shaped ends; R, a body with two horns; S, a thick, muscular neck; T, a passage; U, the external opening. The cow was served by a bull on ${longDate(T4served)}.`,
    hints: ["Order: ovaries, oviducts, uterus, cervix, vagina, vulva.", "Gestation of a cow is about 283 days."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the part, by letter or name, in which fertilisation takes place.",
        accepted: ["Q", "oviduct", "oviducts", "Q oviduct", "fallopian tube", "Q (oviduct)"],
        keywords: { any: ["oviduct", "fallopian"] },
        explanation: "Q, the oviduct.",
      }),
      P.short({
        label: "(b)", stem: "Name part S.",
        accepted: ["cervix", "the cervix"],
        explanation: "S is the cervix.",
      }),
      P.short({
        label: "(c)", marks: 2, stem: "State the cow's expected calving date, using a gestation period of 283 days.",
        accepted: dateAnswers(T4calf),
        explanation: `${longDate(T4served)} + 283 days = ${longDate(T4calf)}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Before service, which sign best showed that the cow was on heat?",
        options: [
          ["She stood still when other cows mounted her", "Correct: standing heat."],
          ["Her milk yield rose sharply", "Yield usually drops at heat."],
          ["She lay quietly apart from the herd all day", "Cows on heat are restless."],
          ["Her appetite increased and she grazed for longer than usual", "Appetite usually falls at heat."],
        ],
        answer: "A",
        explanation: "Standing to be mounted is the surest sign of heat.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** functions of part P.",
        points: ["Produces eggs (ova).", "Produces hormones (oestrogen and progesterone) / forms the corpus luteum that maintains pregnancy."],
        explanation: "Ovary functions.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe what happens from fertilisation until the embryo is attached in part R.",
        points: ["A sperm nucleus fuses with the egg nucleus in the oviduct to form a zygote.", "The zygote divides repeatedly into an embryo as it moves down the oviduct to the uterus.", "The embryo implants in the uterus wall and a placenta forms, through which it gets food and oxygen."],
        explanation: "Fertilisation, cleavage, implantation.",
      }),
    ],
    explanation: "Identify parts of the cow's reproductive system, predict calving and describe fertilisation.",
  });
});

concept("agri.livestock.broilers", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.livestock.broilers"],
    stem: `Tatenda placed ${Z1placed} day-old broiler chicks (mean mass 0.04 kg) near Chinhoyi. Deaths each week were:\n\n${Z1_TABLE}\n\nThe survivors were sold live at six weeks with a mean mass of 2.3 kg at US\\$4.20 each (assume this price). The batch ate 2,180 kg of feed. Variable costs were: chicks US\\$450, feed US\\$1,199, vaccines and medicines US\\$60, litter, fuel and other US\\$96. A sample bird of 2.3 kg gave a dressed carcass of 1.702 kg.`,
    hints: ["Mortality = deaths ÷ chicks placed × 100.", "Gain = survivors × final mass − chicks × 0.04 kg.", "For the long part, follow the batch from before the chicks arrive to sale."],
    parts: [
      P.short({
        label: "(a)", stem: "Name **one** viral disease against which broilers are vaccinated.",
        accepted: ["Newcastle disease", "Newcastle", "Gumboro", "Gumboro disease", "infectious bursal disease", "IBD"],
        keywords: { any: ["newcastle", "gumboro", "bursal"] },
        explanation: "Newcastle disease or Gumboro (infectious bursal) disease.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mortality percentage for the batch, to one decimal place.",
        value: Z1mort, unit: "%", tol: 0.05, answer: "5.3", wrong: [Z1died, round(pct(Z1died, Z1alive), 1)],
        explanation: `Deaths = 18 + 6 + 3 + 2 + 2 + 1 = ${Z1died}; ${Z1died} ÷ ${Z1placed} × 100 = ${round(Z1mort, 1)}%.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the feed conversion ratio of the batch, to two decimal places.",
        value: Z1fcr, tol: 0.005, answer: "1.70", wrong: [round(2180 / (Z1alive * 2.3), 2), round(Z1gain / 2180, 2)],
        explanation: `Gain = ${Z1alive} × 2.3 − ${Z1placed} × 0.04 = ${fmtNum(Z1alive * 2.3, 1)} − 24 = ${fmtNum(Z1gain, 1)} kg; FCR = 2,180 ÷ ${fmtNum(Z1gain, 1)} = ${round(Z1fcr, 2).toFixed(2)}. Ignoring the chicks' starting mass gives ${round(2180 / (Z1alive * 2.3), 2)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the dressing percentage of the sample bird.",
        value: Z1dress, unit: "%", tol: 0.05, answer: "74", wrong: [round((2.3 / 1.702) * 100, 1), 26],
        explanation: "1.702 ÷ 2.3 × 100 = 74%.",
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate the gross margin for the batch, in US\\$.",
        value: Z1gm.grossMargin, prefix: "US$", wrong: [round(Z1placed * 4.2 - Z1gm.variableCosts, 2), Z1gm.grossOutput],
        explanation: `Income = ${Z1alive} × 4.20 = US\\$${Z1gm.grossOutput.toFixed(2)}; costs = 450 + 1,199 + 60 + 96 = US\\$${fmtNum(Z1gm.variableCosts)}; gross margin = US\\$${Z1gm.grossMargin.toFixed(2)}. Using all ${Z1placed} chicks for income ignores the deaths.`,
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Most deaths occurred in week 1. Suggest and explain **three** possible causes.",
        points: [
          "Brooder too cold (or draughts), so chicks crowded, chilled or were smothered.",
          "Chicks did not find feed and water quickly (drinkers/feeders too far or empty), so they dehydrated or starved.",
          "Weak or infected chicks from the hatchery / poor hygiene in a house not cleaned and rested.",
        ],
        explanation: "Brooding, feed and water, chick quality and hygiene.",
      }),
      P.manual({
        label: "(g)", marks: 8,
        stem: "Describe and explain how Tatenda should manage his next batch of broilers from before the chicks arrive until they are sold, so that fewer die and they grow well.",
        points: [
          "Clean, disinfect and rest the house for about two weeks; fresh dry litter 5-10 cm; footbath; rat-proofing (breaks disease cycles).",
          "Pre-heat the brooder and set up the chick guard, feeders and drinkers before arrival.",
          "Brood at about 32-35 °C at chick level, reducing about 3 °C a week, adjusting to chick behaviour (crowding = cold, spread and panting = hot).",
          "Ventilate without draughts using curtains; keep litter dry to prevent coccidiosis.",
          "Feed starter, then grower and finisher, with clean water always; raise feeders and drinkers to back height to cut waste.",
          "Vaccinate against Newcastle and Gumboro disease on schedule; remove dead birds; restrict visitors (all-in, all-out).",
          "Keep records of deaths, feed and weekly weights to spot problems and calculate FCR.",
          "Withdraw feed 8-12 h before sale/slaughter; sell at the planned age when demand is high.",
        ],
        levels: agricultureLevels(8),
        explanation: "Ordered management with reasons: preparation, brooding, environment, feeding, health, records, marketing.",
      }),
    ],
    explanation: "Broiler batch performance (mortality, FCR, dressing percentage, gross margin) and a reasoned management plan.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.livestock.layers-indigenous"],
    stem: `Rudo keeps 800 commercial layers in a deep-litter house near Marondera. The table shows how the laying percentage changed with the age of the flock.\n\n${Z2_TABLE}\n\nIn June (30 days) the 800 hens laid ${fmtNum(Z2eggs)} eggs and each hen ate about 0.12 kg of layer mash a day.`,
    hints: ["Hen-day % = eggs ÷ (hens × days) × 100.", "Feed per dozen = total feed ÷ dozens of eggs.", "For the long part, cover housing, feeding, lighting, eggs and health."],
    parts: [
      P.mcq({
        label: "(a)", stem: "From the table, at about what age did the flock reach peak production?",
        options: [
          ["28 weeks", "Correct: 92%."],
          ["20 weeks", "At 20 weeks the flock had only just started laying (12%)."],
          ["40 weeks", "Production had begun to fall (88%)."],
          ["72 weeks, when the hens were oldest and most experienced at laying", "Production was lowest of the laying ages (64%)."],
        ],
        answer: "A",
        explanation: "Production rises steeply after point of lay, peaks at 28 weeks and then falls slowly.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the hen-day laying percentage for June.",
        value: Z2pct, unit: "%", tol: 0, wrong: [round(Z2eggs / 800, 1), round(pct(Z2eggs, 800 * 31), 1)],
        explanation: `${fmtNum(Z2eggs)} ÷ (800 × 30) × 100 = ${fmtNum(Z2eggs)} ÷ 24,000 × 100 = ${Z2pct}%.`,
      }),
      P.num({
        label: "(c)", stem: "How many trays of 30 eggs were filled in June?",
        value: Z2trays, tol: 0, wrong: [Z2eggs / 12, 860],
        explanation: `${fmtNum(Z2eggs)} ÷ 30 = ${Z2trays} trays.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the mass of feed used per dozen eggs in June, in kg, to two decimal places.",
        value: Z2perDozen, unit: "kg", tol: 0.005, answer: "1.67", wrong: [round(Z2feed / Z2eggs, 2), round(Z2feed / Z2trays, 2)],
        explanation: `Feed = 800 × 0.12 × 30 = ${fmtNum(Z2feed)} kg; dozens = ${fmtNum(Z2eggs)} ÷ 12 = 1,720; ${fmtNum(Z2feed)} ÷ 1,720 = ${round(Z2perDozen, 2)} kg.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "State **two** signs Rudo would use to pick out non-laying hens for culling.",
        points: ["Small, pale, shrunken comb and wattles.", "Small, dry, puckered vent / pelvic bones close together (about one finger) / yellow colour returning to shanks."],
        explanation: "Culling signs.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the lights in the layer house are kept on to give about 16 hours of light a day.",
        points: ["Long days stimulate the hen's hormones that control egg production.", "A shorter or falling day length reduces laying, so light is kept long and never reduced during lay."],
        explanation: "Photoperiod.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest why the flock should be replaced at about 72 weeks of age.",
        points: ["Laying has fallen to 64%, so feed per dozen eggs rises and each hen earns less than she costs.", "Off-layers can be sold for meat and the house cleaned and restocked with point-of-lay pullets."],
        explanation: "Economics of the end of lay.",
      }),
      P.manual({
        label: "(h)", marks: 8,
        stem: "Describe and explain how Rudo should manage her layers to keep egg production and egg quality high.",
        points: [
          "House: dry, deep litter; good ventilation without draughts; correct stocking density; nest boxes (about one per 4-5 hens) in a dim area; perches.",
          "Feed layer mash high in calcium (plus shell grit) from point of lay, with clean water always; avoid sudden feed changes.",
          "Light: about 16 hours a day, never reduced during lay.",
          "Collect eggs at least two or three times a day to keep them clean and reduce breakage and egg eating.",
          "Do not wash eggs; candle, grade and pack broad end up; store cool.",
          "Health: vaccinate (e.g. Newcastle disease), control mites and worms, footbath, keep out visitors and wild birds.",
          "Keep daily egg, feed and death records to detect problems early.",
          "Cull non-layers regularly and replace the flock at the end of lay.",
        ],
        levels: agricultureLevels(8),
        explanation: "Housing, feeding, light, egg handling, health, records and culling, each with a reason.",
      }),
    ],
    explanation: "Layer production curve, laying percentage, feed efficiency and a management plan for high egg output.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.livestock.pigs", "agri.livestock.birth-young-stock"],
    stem: `Breeding records from a piggery near Harare.\n\n${Z3_TABLE}`,
    hints: ["Farrowing date = service date + 114 days.", "Litters per year = 365 ÷ (gestation + lactation + days to service).", "For the long part, work from birth to weaning, with ages and reasons."],
    parts: [
      P.short({
        label: "(a)", marks: 2, stem: "State the expected farrowing date of sow B, using a gestation of 114 days.",
        accepted: dateAnswers(Z3farrowB),
        explanation: `${longDate(Z3_SOWS[1][1])} + 114 days = ${longDate(Z3farrowB)}.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the total number of piglets weaned.",
        value: Z3weaned, unit: "animals", tol: 0, wrong: [Z3born, 9],
        explanation: `10 + 9 + 9 = ${Z3weaned}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the percentage of piglets born alive that died before weaning, to one decimal place.",
        value: Z3mort, unit: "%", tol: 0.05, answer: "15.2", wrong: [round(pct(5, 28), 1), 5],
        explanation: `${Z3born} − ${Z3weaned} = 5 died; 5 ÷ ${Z3born} × 100 = ${round(Z3mort, 1)}%.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "The piglets are weaned at 42 days and the sows are served 5 days after weaning. Calculate the number of litters per sow per year, to two decimal places.",
        value: Z3litters, tol: 0.005, answer: "2.27", wrong: [round(365 / 114, 2), round(365 / 156, 2)],
        explanation: `Cycle = 114 + 42 + 5 = 161 days; 365 ÷ 161 = ${round(Z3litters, 2)}.`,
      }),
      P.mcq({
        label: "(e)", stem: "Why are the piglets given an iron injection at about three days old?",
        options: [
          ["Sow's milk is low in iron and piglets on concrete cannot get it from soil", "Correct: prevents piglet anaemia."],
          ["To protect them against African swine fever", "There is no iron 'vaccine'; iron prevents anaemia."],
          ["To strengthen their teeth before they are clipped", "Teeth are clipped on day 1; iron is for blood."],
          ["To make them gain fat quickly so that they can be sold as porkers at weaning", "Iron prevents anaemia; it is not a fattening treatment."],
        ],
        answer: "A",
        explanation: "Iron is needed for haemoglobin; piglets grow fast with small iron stores.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State **two** signs that a sow is about to farrow.",
        points: ["Nest building (biting and arranging bedding) / restlessness.", "Swollen vulva / milk can be squeezed from the teats."],
        explanation: "Signs of farrowing.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain how a farrowing crate with a creep area reduces piglet deaths.",
        points: ["The crate makes the sow lie down slowly, so piglets can move away and are not crushed.", "The heated creep area keeps piglets warm and away from the sow, preventing chilling."],
        explanation: "Crushing and chilling.",
      }),
      P.manual({
        label: "(h)", marks: 8,
        stem: "Describe and explain the care of piglets from birth until weaning.",
        points: [
          "At birth: clear mucus from nose and mouth; dry the piglet; cut and dip the navel in iodine (prevents infection).",
          "Ensure every piglet suckles colostrum within hours (antibodies, energy); help weak piglets to a teat / foster extras.",
          "Day 1: clip needle teeth (prevents injury to littermates and the sow's teats).",
          "About day 3: iron injection (prevents anaemia).",
          "Identify by ear notching/tattoo; castrate males not for breeding within the first two weeks (less stress).",
          "Keep them warm in the creep area and protect from crushing with a farrowing crate or rails; clean, dry pen against scours.",
          "Offer creep feed and clean water from about 1-2 weeks, so they grow and are ready for weaning.",
          "Wean at about 4-8 weeks (here 6 weeks): move the sow out, leave piglets in their pen, change feed gradually; deworm.",
        ],
        levels: agricultureLevels(8),
        explanation: "Ordered piglet care with ages and reasons.",
      }),
    ],
    explanation: "Sow records: farrowing date, piglet losses and litters per year; care of piglets to weaning.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, secs: 1440, calculator: true,
    paper: "ZIMSEC Paper 2 Section B",
    concepts: ["agri.livestock.beef-cattle", "agri.livestock.birth-young-stock"],
    stem: `A rancher near Masvingo weighed a group of beef cows on veld every two months.\n\n${Z4_TABLE}`,
    hints: ["Percentage loss = loss ÷ starting mass × 100.", "Dry-season grass is low in protein and phosphorus.", "For the long part, organise practices through the year with reasons."],
    parts: [
      P.mcq({
        label: "(a)", stem: "During which period did the cows gain mass?",
        options: [
          ["November to May", "Correct: the rainy season, when grazing is green."],
          ["May to September", "The cows lost mass in the dry season."],
          ["July to September only", "Mass fell from 420 to 395 kg."],
          ["The whole year, because the mass at the end was higher than in July", "September (395 kg) is lower than May (445 kg)."],
        ],
        answer: "A",
        explanation: "Mass rose from 380 to 445 kg in the rains, then fell to 395 kg in the dry season.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the mass lost per cow from May to September, in kg.",
        value: Z4loss, unit: "kg", tol: 0, wrong: [25, 65],
        explanation: "445 − 395 = 50 kg.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate this loss as a percentage of the May mass, to one decimal place.",
        value: Z4lossPct, unit: "%", tol: 0.05, answer: "11.2", wrong: [round(pct(50, 395), 1), 50],
        explanation: `50 ÷ 445 × 100 = ${round(Z4lossPct, 1)}%. Dividing by the September mass gives ${round(pct(50, 395), 1)}%.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the cows lost mass between May and September.",
        points: ["In the dry season the veld grass is dry, scarce and low in protein (and phosphorus).", "Rumen microbes digest the poor grass slowly, so the cows eat less and use body reserves."],
        explanation: "Dry-season feed quality.",
      }),
      P.short({
        label: "(e)", stem: "Name the lick that prevents cattle chewing bones and catching botulism.",
        accepted: ["phosphate lick", "phosphorus lick", "phosphate", "phosphorus", "bone meal lick", "dicalcium phosphate lick"],
        keywords: { any: ["phosph"] },
        explanation: "A phosphate (phosphorus) lick.",
      }),
      P.num({
        label: "(f)", stem: "Assume one bull to 30 cows. How many bulls are needed for 150 cows?",
        value: Z4bulls, unit: "animals", tol: 0, wrong: [150 * 30, 4],
        explanation: "150 ÷ 30 = 5 bulls.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Using the data, explain why the rancher plans for calves to be born from October to December.",
        points: ["Calves are born near the start of the rains, when the veld turns green.", "Cows are then gaining mass and have good feed to produce milk, so calves grow well and cows recover condition to conceive again."],
        explanation: "Match calving to the feed supply.",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "State **two** methods of identifying beef cattle.",
        points: ["Branding (hot-iron or freeze).", "Ear tags / ear notches / tattoos."],
        explanation: "Identification.",
      }),
      P.manual({
        label: "(i)", marks: 8,
        stem: "Describe and explain the management practices the rancher should carry out in the herd during one year.",
        points: [
          "Breeding season of about three months with about one bull to 25-30 cows, timed for calving at the start of the rains; pregnancy test and cull open cows.",
          "Supervise calving; ensure colostrum and navel care; identify calves (ear tags, branding).",
          "Disbud and castrate young calves early (less stress, safer handling, docile steers).",
          "Dip or spray against ticks (often weekly in the wet season) to prevent tick-borne diseases.",
          "Dose against worms at strategic times and vaccinate (e.g. anthrax, blackleg, lumpy skin disease, botulism) on veterinary advice.",
          "Dry-season supplements: protein/urea licks, phosphate lick and salt, hay or stover, to limit mass loss.",
          "Wean calves at about 6-8 months so cows regain condition; sell weaners or finish them.",
          "Keep stocking within carrying capacity, rotate paddocks and keep herd records (births, weights, treatments, sales).",
        ],
        levels: agricultureLevels(8),
        explanation: "A year of beef herd management with reasons.",
      }),
    ],
    explanation: "Seasonal mass change of beef cows on veld and the year's management of a beef herd.",
  });
});

concept("agri.livestock.dairy-cattle", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.livestock.dairy-cattle", "agri.livestock.birth-young-stock"],
    stem: "A smallholder keeps four dairy cows on a small farm and sells milk to a local collection centre.",
    hints: ["(a) Think of the parlour, the milk room and the cows' living area.", "(b) Follow the milking routine.", "(c) Weigh land, labour, feed and manure."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe suitable housing for the dairy cows.",
        points: [
          "A milking shed/parlour with a concrete floor sloping to a drain and water for washing.",
          "A separate milk room (dairy) to filter, cool and store milk away from dust, flies and smells.",
          "Shaded, well-ventilated shelter with dry lying areas, feed and water troughs.",
          "Calf pens and a clean calving pen.",
        ],
        explanation: "Parlour, milk room, cow shelter, calf pens.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how the milking routine can prevent mastitis and produce clean milk.",
        points: [
          "Clean, healthy milker with washed hands milks in a clean parlour, so bacteria are not carried to the teats or milk.",
          "Teats are washed and dried with an individual towel, removing dirt without spreading bacteria between cows.",
          "A strip cup detects clots early so infected cows are treated and milked last.",
          "Teats are dipped in disinfectant after milking, killing bacteria while the teat canal is open.",
          "Milk is filtered and cooled quickly and utensils are washed and sanitised, so bacteria cannot multiply; milk from treated cows is discarded.",
        ],
        explanation: "Each step linked to hygiene or mastitis.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the smallholder should keep the cows by zero grazing or by grazing them on pasture.",
        points: [
          "Zero grazing needs little land, so more cows can be kept on a small farm.",
          "Cut forage and concentrates can be fed according to yield; cows use less energy walking, so yields can be higher.",
          "Manure is collected easily for crops or biogas.",
          "But zero grazing needs much labour to cut and carry fodder and clean pens, and a good roofed unit (high cost).",
          "Grazing needs less labour and housing and allows exercise, but needs more land and yields depend on the pasture.",
          "Judgement for this small farm, e.g. zero grazing (or a mixture) if labour and fodder crops are available.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh both systems and decide.",
      }),
    ],
    explanation: "Dairy housing, a hygienic milking routine and a judgement on zero grazing.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 945,
    paper: "Cambridge Paper 1 Section B",
    concepts: ["agri.livestock.pigs", "agri.livestock.digestion", "agri.livestock.birth-young-stock"],
    stem: "A farmer plans to start a pig unit with ten sows.",
    hints: ["(a) Give each practice with its age.", "(b) Compare the pig's gut with a ruminant's.", "(c) Weigh costs, growth, welfare and disease."],
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the care of piglets in their first two weeks of life.",
        points: [
          "Clear the airways, dip the navel in iodine and make sure each piglet suckles colostrum.",
          "Clip the needle teeth on day 1.",
          "Give an iron injection at about 3 days to prevent anaemia.",
          "Keep them warm in a creep area, protect them from crushing (farrowing crate), castrate males not for breeding and offer creep feed.",
        ],
        explanation: "Practices with ages.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain how the digestive system of the pig affects the feeds it must be given.",
        points: [
          "The pig is a non-ruminant with a single simple stomach.",
          "It has no rumen, so few microbes ferment cellulose (only a little in the caecum and colon).",
          "So it gets little energy from fibre/roughage, unlike cattle.",
          "It needs concentrates rich in digestible starch (e.g. maize) and high-quality protein (e.g. soya or fishmeal) with minerals and vitamins.",
          "These feeds are costly and compete with human food, so feed is the main cost; swill must be boiled.",
        ],
        explanation: "Structure to diet.",
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the farmer should keep the pigs intensively indoors or extensively outdoors.",
        points: [
          "Intensive housing allows control of temperature, feeding and hygiene, so growth is faster and FCR better.",
          "Farrowing crates and creep areas reduce piglet losses; records and treatment are easier.",
          "But intensive units cost much to build, need bought feed and good management; welfare concerns about confinement.",
          "Outdoor systems are cheap, allow natural behaviour and use less concentrate where forage is available.",
          "But growth is slower, losses to heat, crushing, predators and parasites are higher, and contact with wild pigs risks African swine fever.",
          "Judgement with a reason, e.g. intensive or semi-intensive housing for a ten-sow commercial unit, if capital and feed supply allow.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh both systems and decide.",
      }),
    ],
    explanation: "Piglet care, the pig's digestion and feeding, and a judgement on the housing system.",
  });
});
