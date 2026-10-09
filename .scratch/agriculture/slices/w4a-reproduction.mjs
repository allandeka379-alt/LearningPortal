// Slice W4a: reproductive systems of farm mammals, oestrous cycle, mating, fertilisation and gestation.
import { concept, P, pct, round, check, table } from "../lib.mjs";

const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const longDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
/** Accepted spellings of a date: "5 June 2026", "5 June", "05/06/2026", "5/6/2026", "June 5 2026". */
function dateAnswers(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", timeZone: "UTC" });
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return [`${d} ${month} ${y}`, `${d} ${month}`, `${dd}/${mm}/${y}`, `${d}/${m}/${y}`, `${month} ${d} ${y}`, `${month} ${d}`, `${d}th ${month} ${y}`, `${d}th ${month}`];
}

// Short: cow served 20 February 2026.
const COW_SERVED = "2026-02-20";
const cowCalves = addDays(COW_SERVED, 283);
check(cowCalves === "2026-11-30", `cow ${cowCalves}`);
// Num: heifer next heat, days.
// Struct: dairy breeding records.
const RECORDS = [["Tag 101", "2026-01-04", "2026-01-25"], ["Tag 102", "2026-01-09", null], ["Tag 103", "2026-01-15", "2026-02-05"], ["Tag 104", "2026-01-23", null]];
const returned = RECORDS.filter((r) => r[2]).length;
const conceptionPct = pct(RECORDS.length - returned, RECORDS.length);
check(conceptionPct === 50, "conception");
const cow104Calves = addDays("2026-01-23", 283);
check(cow104Calves === "2026-11-02", `cow104 ${cow104Calves}`);
const REC_TABLE = table(["Cow", "Date served (AI)", "Seen on heat again"], RECORDS.map(([c, s, h]) => [c, longDate(s), h ? longDate(h) : "Not seen"]));
const gap103 = (new Date("2026-02-05") - new Date("2026-01-15")) / 86400000;
check(gap103 === 21, "gap");
// Num: calving interval.
const CI_SERVICE_AFTER = 95;
const ci = 283 + CI_SERVICE_AFTER;
check(ci === 378, "ci");
// Struct 2: sow and ewe.
const SOW_SERVED = "2026-08-10";
const sowFarrows = addDays(SOW_SERVED, 114);
check(sowFarrows === "2026-12-02", `sow ${sowFarrows}`);

concept("agri.livestock.reproduction", { file: "livestock/reproduction", keyPrefix: "livestock.reproduction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which part of the cow's reproductive system does fertilisation normally take place?",
    options: [
      ["Oviduct", "Correct: sperm meet the egg in the oviduct (Fallopian tube)."],
      ["Uterus", "The embryo implants and develops in the uterus after fertilisation."],
      ["Cervix", "The cervix is the neck of the uterus; sperm pass through it."],
      ["Vagina", "Semen is deposited in the vagina during natural service; fertilisation is further up."],
    ],
    answer: "A",
    explanation: "Fertilisation occurs in the oviduct; the zygote then moves down to the uterus.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which part of the bull stores sperm and allows them to mature?",
    options: [
      ["Epididymis", "Correct: a coiled tube on each testis."],
      ["Vas deferens", "The vas deferens carries sperm to the urethra."],
      ["Prostate gland", "The prostate adds fluid to semen."],
      ["Scrotum", "The scrotum is the skin bag that holds and cools the testes."],
    ],
    answer: "A",
    explanation: "Sperm made in the testes mature and are stored in the epididymis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are a bull's testes held in the scrotum outside the body cavity?",
    options: [
      ["Sperm production needs a temperature below body temperature", "Correct: the scrotum keeps the testes a few degrees cooler."],
      ["So that the testes can be seen easily when a bull is bought", "This is not the biological reason."],
      ["To protect the testes from injury", "Outside the body they are, if anything, more exposed."],
      ["Because there is no space for them inside the abdomen next to the rumen", "The reason is temperature, not space."],
    ],
    answer: "A",
    explanation: "Sperm develop best a few degrees below body temperature; a bull with a fever or heat stress may be temporarily less fertile.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is the most reliable sign that a cow is on heat?",
    options: [
      ["She stands still when other cows mount her", "Correct: standing heat is the surest sign."],
      ["She eats more than usual", "Cows on heat often eat less."],
      ["Her milk yield rises sharply", "Milk yield usually drops at heat."],
      ["She lies down quietly for most of the day and does not move about much", "Cows on heat are restless and walk more."],
    ],
    answer: "A",
    explanation: "Mounting others, mucus and restlessness also occur, but standing to be mounted is the best sign.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Use the morning-afternoon rule."],
    stem: "A herdsman first sees a cow in standing heat at 6 a.m. When should she be inseminated?",
    options: [
      ["That afternoon", "Correct: seen in the morning, served in the afternoon."],
      ["Immediately, at 6 a.m.", "This is too early; ovulation comes after the end of heat."],
      ["Three days later", "Heat will be over and the egg will no longer be fertile."],
      ["At her next heat, about 21 days later, so that she can rest first", "This wastes a whole cycle."],
    ],
    answer: "A",
    explanation: "Ovulation comes shortly after standing heat ends, so service in the second half of heat gives the best chance of conception.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What keeps the uterus closed during pregnancy?"],
    stem: "Which part of the cow is closed by a mucus plug during pregnancy, protecting the foetus from infection?",
    options: [
      ["Cervix", "Correct: the muscular neck of the uterus."],
      ["Vulva", "The vulva is the external opening."],
      ["Oviduct", "The oviducts lie beyond the uterus."],
      ["Ovary, which also produces the hormone progesterone during pregnancy", "The ovary makes hormones but does not seal the uterus."],
    ],
    answer: "A",
    explanation: "The cervix stays tightly closed with a mucus plug until birth.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Think about genetics, cost and skill."],
    stem: "Which is the main advantage of artificial insemination over keeping a bull on a small dairy farm?",
    options: [
      ["Cows can be served by proven high-merit bulls without keeping one", "Correct: semen from top sires is available."],
      ["Heat detection is no longer needed", "AI needs more careful heat detection than a bull, which finds cows on heat himself."],
      ["Every insemination is certain to give a pregnancy", "Conception rates by AI are not 100%."],
      ["The calves from AI are always heifers that can be kept as replacements", "Ordinary semen gives about equal numbers of bull and heifer calves."],
    ],
    answer: "A",
    explanation: "AI gives access to superior genetics, avoids the cost and danger of a bull and reduces venereal disease, but needs good heat detection and a trained inseminator.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The gestation period of a sow is about 114 days.",
    answer: true,
    explanation: "True: about 3 months, 3 weeks and 3 days.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The oestrous cycle of the ewe is about 21 days, the same as that of the cow.",
    answer: false,
    explanation: "False. The ewe's cycle is about 17 days; the cow, sow and doe have cycles of about 21 days.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part with its function.",
    pairs: [
      ["Ovary", "Produces eggs and the hormones oestrogen and progesterone"],
      ["Testis", "Produces sperm and testosterone"],
      ["Uterus", "Holds the developing foetus"],
      ["Vas deferens", "Carries sperm towards the urethra"],
      ["Seminal vesicle", "Adds fluid to the sperm to form semen"],
    ],
    explanation: "Know one clear function for each part.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The gestation period of a cow is about {{blank:a}} days and that of a ewe or a doe is about {{blank:b}} days.",
    blanks: [
      { id: "a", accepted: ["283", "280", "285"] },
      { id: "b", accepted: ["150", "147", "148", "149", "151", "152"] },
    ],
    explanation: "Cow about 283 days; ewe and doe about 150 days.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Add 283 days to the date of service."],
    stem: `A beef cow is served on ${longDate(COW_SERVED)}. Using a gestation period of 283 days, state the expected calving date.`,
    accepted: dateAnswers(cowCalves),
    explanation: `${longDate(COW_SERVED)} + 283 days = **${longDate(cowCalves)}**.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Calving interval = gestation + days from calving to conception."],
    stem: `A dairy cow conceives ${CI_SERVICE_AFTER} days after calving. Using a gestation period of 283 days, calculate her calving interval in days.`,
    value: ci, unit: "days", tol: 0, wrong: [283 - CI_SERVICE_AFTER, 365 + CI_SERVICE_AFTER],
    explanation: `Calving interval = 283 + ${CI_SERVICE_AFTER} = ${ci} days, which is ${ci - 365} days longer than the target of one calf a year.`,
    workedSolution: `1. Calving to conception = ${CI_SERVICE_AFTER} days.\n2. Conception to next calving = 283 days.\n3. Calving interval = ${CI_SERVICE_AFTER} + 283 = ${ci} days.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of behaviour, the vulva and milk yield."],
    stem: "State **four** signs that a cow is on heat.",
    points: [
      "Stands still to be mounted by other cows or the bull.",
      "Mounts other cows / restless, bellowing, walking more.",
      "Swollen, red vulva with clear, stringy mucus.",
      "Reduced appetite or a sudden fall in milk yield.",
    ],
    modelAnswer: "She stands to be mounted, mounts other cows and is restless and bellowing; her vulva is swollen and red with clear mucus; and her milk yield drops.",
    explanation: "Any four signs.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Follow the sperm and the egg, then the embryo."],
    stem: "Describe how fertilisation and the start of pregnancy take place in a cow after natural service.",
    points: [
      "Semen is deposited in the vagina; sperm swim through the cervix and uterus into the oviducts.",
      "The egg released from the ovary at ovulation is caught by the funnel of the oviduct.",
      "One sperm nucleus fuses with the egg nucleus in the oviduct to form a zygote.",
      "The zygote divides into an embryo that moves to the uterus, implants and forms a placenta.",
    ],
    modelAnswer: "Sperm deposited in the vagina swim through the cervix and uterus into the oviducts. There a sperm fuses with the egg released at ovulation to form a zygote. The zygote divides as it passes to the uterus, where the embryo implants and a placenta develops.",
    explanation: "Sperm transport, ovulation, fusion, implantation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `A dairy farmer near Marondera inseminated four cows and recorded whether each was seen on heat again.\n\n${REC_TABLE}`,
    hints: ["A cow not seen on heat again about 21 days after service is probably pregnant.", "Percentage = cows probably pregnant ÷ cows served × 100."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage of the cows that probably conceived to this insemination.",
        value: conceptionPct, unit: "%", tol: 0, wrong: [returned, 25],
        explanation: `Two cows (tags 102 and 104) were not seen on heat again: 2 ÷ 4 × 100 = ${conceptionPct}%.`,
      }),
      P.num({
        label: "(b)", stem: "How many days after service was cow 103 seen on heat again?",
        value: gap103, unit: "days", tol: 0, wrong: [20, 17],
        explanation: "15 January to 5 February is 21 days, one full oestrous cycle.",
      }),
      P.short({
        label: "(c)", marks: 2, stem: "State the expected calving date of cow 104, using a gestation period of 283 days.",
        accepted: dateAnswers(cow104Calves),
        explanation: `23 January 2026 + 283 days = ${longDate(cow104Calves)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why some cows did not conceive to AI.",
        points: [
          "Heat detected late or wrongly, so insemination was badly timed in relation to ovulation.",
          "Poor semen handling (thawing, temperature) or poor insemination technique.",
          "The cow was in poor condition / underfed / had a uterine infection or another disease.",
        ],
        explanation: "Timing, technique and cow factors.",
      }),
    ],
    explanation: "Interpret AI records, count the cycle and predict a calving date.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: `Thandeka keeps sows and ewes. Her best sow was served on ${longDate(SOW_SERVED)}.`,
    hints: ["Sow gestation is 114 days.", "Compare the cycle lengths of the species."],
    parts: [
      P.short({
        label: "(a)", marks: 2, stem: "State the date on which the sow is expected to farrow.",
        accepted: dateAnswers(sowFarrows),
        explanation: `${longDate(SOW_SERVED)} + 114 days = ${longDate(sowFarrows)}.`,
      }),
      P.mcq({
        label: "(b)", stem: "If a ewe is served and does not conceive, after about how many days will she next come on heat?",
        options: [
          ["17", "Correct: the ewe's cycle is about 17 days."],
          ["21", "21 days is the cycle of the cow, sow and doe."],
          ["31", "About 31 days is the gestation of a rabbit."],
          ["150", "About 150 days is the ewe's gestation period."],
        ],
        answer: "A",
        explanation: "Ewes cycle about every 17 days.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why accurate records of service dates are important to Thandeka.",
        points: [
          "She can predict the farrowing/lambing date and prepare pens, bedding and care in time.",
          "She can check for return to heat about one cycle later and re-serve animals that did not conceive.",
          "She can identify and cull animals that repeatedly fail to conceive / plan feeding for pregnant animals.",
        ],
        explanation: "Planning, checking and culling.",
      }),
    ],
    explanation: "Gestation and cycle lengths applied to breeding records.",
  });

  b.card("DEFINITION", "Oestrous cycle", "The cycle from one heat to the next: about 21 days in the cow, sow and doe; about 17 days in the ewe.");
  b.card("DEFINITION", "Oestrus (heat)", "The short period when the female will stand to be mated; ovulation follows soon after it ends.");
  b.card("FACT", "Gestation periods (about)", "Cow 283 days; sow 114 days (3 months, 3 weeks, 3 days); ewe and doe 150 days; rabbit 31 days.");
  b.card("FACT", "Site of fertilisation", "The oviduct (Fallopian tube); the embryo then implants in the uterus.");
  b.card("CONCEPT", "Why the testes are in the scrotum", "Sperm production needs a temperature a few degrees below body temperature.");
  b.card("FACT", "Surest sign of heat in a cow", "Standing still when mounted by other cows or the bull (standing heat).");
  b.card("CONCEPT", "Morning-afternoon rule", "Cow seen on heat in the morning: serve that afternoon; seen in the afternoon: serve next morning.");
  b.card("CONCEPT", "AI: advantages and needs", "Proven sires, no bull to keep, less venereal disease; needs accurate heat detection, a trained inseminator and stored semen.");
  b.card("FORMULA", "Calving interval", "Days from calving to conception + 283 days of gestation; for one calf a year a cow must conceive within about 82 days of calving.");
});
