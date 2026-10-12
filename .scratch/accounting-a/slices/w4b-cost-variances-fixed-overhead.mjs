// W4b: cost.variances-fixed-overhead (Cambridge A Level only: tagged automatically)
import { concept, P, chk, r2, variances } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.cost.variances-fixed-overhead", { file: "cost/variances-fixed-overhead", keyPrefix: "cost.variances-fixed-overhead" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the fixed overhead volume variance?",
    ok: ["(Actual output - budgeted output) × standard fixed overhead rate per unit", "Correct: absorbed overhead less budgeted overhead."],
    bad: [["Budgeted fixed overhead - actual fixed overhead incurred in the same period", "That is the expenditure variance."], ["(Actual hours - budgeted hours) × rate per hour", "That is the capacity sub-variance."], ["Actual fixed overhead ÷ actual output", "That is an actual cost per unit, not a variance."]],
    explanation: "Volume variance = overhead absorbed - budgeted overhead = (actual output - budgeted output) × rate per unit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Budgeted fixed overhead was US\\$14,000 but actual fixed overhead was US\\$14,900. What is the expenditure variance?",
    ok: ["US\\$900 adverse", "Correct: 14,000 - 14,900 = -900."],
    bad: [["US\\$900 favourable", "Spending more than budgeted is adverse."], ["US\\$14,900 adverse", "That is the actual overhead, not the variance."], ["US\\$1,400 adverse", "The percentage rise has been used instead of the difference."]],
    explanation: "Expenditure variance = budgeted - actual = -US\\$900, adverse.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The fixed overhead capacity variance compares:",
    ok: ["actual hours worked with budgeted hours, at the standard rate per hour", "Correct: it measures the use of the capacity planned."],
    bad: [["standard hours for actual output with actual hours, at the standard rate per hour", "That is the efficiency variance."], ["actual overhead with budgeted overhead", "That is the expenditure variance."], ["actual units with budgeted units, at the selling price", "That is not a fixed overhead variance."]],
    explanation: "Capacity: (actual hours - budgeted hours) × standard fixed overhead rate per hour.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which pair of sub-variances makes up the fixed overhead volume variance?",
    ok: ["Capacity and efficiency", "Correct: volume = capacity + efficiency."],
    bad: [["Expenditure and capacity", "Expenditure is a separate variance, not part of volume."], ["Price and usage", "These are material variances."], ["Rate and efficiency", "Rate is a labour variance."]],
    hints: ["Volume is split by hours worked and hours allowed."],
    explanation: "Capacity (hours worked v budgeted) plus efficiency (standard hours allowed v hours worked) equals volume.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A brickworks lost two weeks of production because a kiln failed, so it worked far fewer hours than budgeted. Which fixed overhead variance mainly records this?",
    ok: ["Adverse capacity variance", "Correct: fewer hours than budgeted."],
    bad: [["Adverse expenditure variance", "Expenditure compares spending with budget, not hours."], ["Favourable efficiency variance", "Efficiency compares hours allowed for the output made with hours worked."], ["Favourable volume variance", "Less production than budget is adverse."]],
    hints: ["Think of idle time."],
    explanation: "Working fewer hours than budgeted leaves capacity unused: an adverse capacity variance.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A firm budgeted fixed overhead of US\\$48,000 for 4,000 units (US\\$12 a unit) and made 3,700 units. What is the fixed overhead volume variance?",
    ok: ["US\\$3,600 adverse", "Correct: 300 fewer units × 12."],
    bad: [["US\\$3,600 favourable", "Fewer units than budget under-absorbs overhead: adverse."], ["US\\$44,400 adverse", "That is the overhead absorbed by the 3,700 units."], ["US\\$300 adverse", "The unit shortfall must be valued at the rate per unit."]],
    hints: ["Use the unit rate."],
    explanation: "(3,700 - 4,000) × 12 = -US\\$3,600, adverse.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A factory reports a favourable capacity variance and an adverse efficiency variance of similar size. What is the most likely explanation?",
    ok: ["More hours than budgeted were worked, but the output took longer than standard", "Correct: extra hours were not used productively."],
    bad: [["Fewer hours than budgeted were worked, but they were worked at a very high speed", "Fewer hours gives an adverse capacity variance."], ["The overhead cost less than budgeted", "That affects expenditure, not these two."], ["Output was exactly the budgeted amount", "The two would then both be explained differently, and volume would be nil."]],
    hints: ["Capacity is hours worked v budget; efficiency is hours allowed v worked."],
    explanation: "The workers worked many hours (favourable capacity) but needed more hours than the standard for the output (adverse efficiency).",
  });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The fixed overhead efficiency variance is valued at the actual overhead rate per hour.", answer: false, hints: ["Which rate does an absorbed overhead use?"], explanation: "False. It is valued at the standard (budgeted) rate per hour, because the absorption rate is set in advance." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each fixed overhead variance to its formula.",
    pairs: ["Expenditure", "Volume", "Capacity", "Efficiency"],
    right: ["Budgeted overhead - actual overhead", "(Actual output - budgeted output) × rate per unit", "(Actual hours - budgeted hours) × rate per hour", "(Standard hours for actual output - actual hours) × rate per hour"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each variance measures a different cause of under- or over-absorption.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "The capacity variance plus the {{blank:a}} variance equals the {{blank:b}} variance.",
    blanks: [{ id: "a", accepted: ["efficiency"], choices: ["efficiency", "expenditure", "price"] }, { id: "b", accepted: ["volume"], choices: ["volume", "expenditure", "usage"] }],
    explanation: "The volume variance is split into capacity and efficiency.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the formula for the standard fixed overhead absorption rate per hour.", accepted: ["budgeted fixed overhead divided by budgeted hours", "budgeted fixed overhead / budgeted hours", "budgeted overhead ÷ budgeted hours", "budgeted fixed overhead ÷ budgeted hours"], explanation: "Budgeted fixed overhead ÷ budgeted hours." });

  {
    const oh = 21000, h = 7500, r = oh / h;
    chk(r, 2.8, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: r, dp: 2, calculator: true, wrong: [oh / 7000, h / oh],
      stem: `A Bulawayo foundry budgets fixed overhead of ${usd(oh)} for ${F(h)} labour hours. Calculate the standard fixed overhead absorption rate per hour.`,
      hints: ["Budgeted overhead ÷ budgeted hours."],
      explanation: `${F(oh)} ÷ ${F(h)} = ${usd(r)} per hour. The rate is set from the budget, not the actual results.` });
  }
  {
    const bud = 36400, act = 38150;
    const v = variances.fixedOverheadExpenditure({ budgetedOverhead: bud, actualOverhead: act });
    chk(v.value, -1750);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [act, r2(act / bud)],
      stem: `A Masvingo workshop budgeted fixed overhead of ${usd(bud)} and actual fixed overhead was ${usd(act)}. Calculate the fixed overhead expenditure variance (the amount only).`,
      hints: ["Budgeted less actual."],
      explanation: `${F(bud)} - ${F(act)} = -${F(v.amount)}, so ${usd(v.amount)} adverse.` });
  }
  {
    const bu = 3200, au = 3050, rate = 5.6;
    const v = variances.fixedOverheadVolume({ budgetedUnits: bu, actualUnits: au, ratePerUnit: rate });
    chk(v.value, -840);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2(au * rate), r2(bu * rate)],
      stem: `A bakery in Mutare budgeted to make ${F(bu)} batches with a standard fixed overhead rate of US\\$5.60 a batch. It made ${F(au)} batches. Calculate the fixed overhead volume variance (the amount only).`,
      hints: ["The unit difference times the rate per unit."],
      explanation: `(${F(au)} - ${F(bu)}) × 5.60 = -${F(v.amount)}, so ${usd(v.amount)} adverse. Overhead absorbed is ${F(au * rate)} against a budget of ${F(bu * rate)}.` });
  }
  {
    const bh = 9600, ah = 9950, rate = 1.2;
    const v = variances.fixedOverheadCapacity({ budgetedHours: bh, actualHours: ah, ratePerHour: rate });
    chk(v.value, 420);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2(ah * rate), 350],
      stem: `A Chinhoyi garment factory budgeted ${F(bh)} machine hours with a standard fixed overhead rate of US\\$1.20 an hour. Machines were actually run for ${F(ah)} hours. Calculate the capacity variance (the amount only).`,
      hints: ["Actual hours less budgeted hours, at the rate per hour."],
      explanation: `(${F(ah)} - ${F(bh)}) × 1.20 = ${usd(v.amount)} favourable, because more hours were used than budgeted. Valuing the 350 hours alone is not enough.` });
  }
  {
    const sh = 8820, ah = 9100, rate = 2.5;
    const v = variances.fixedOverheadEfficiency({ stdHoursForActualOutput: sh, actualHours: ah, ratePerHour: rate });
    chk(v.value, -700);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2((ah - 9000) * rate), 280],
      stem: `A joinery in Harare absorbs fixed overhead at US\\$2.50 an hour. The output made in a month should have taken ${F(sh)} standard hours, but ${F(ah)} hours were worked. Calculate the fixed overhead efficiency variance (the amount only).`,
      hints: ["Standard hours allowed less actual hours."],
      explanation: `(${F(sh)} - ${F(ah)}) × 2.50 = -${F(v.amount)}, so ${usd(v.amount)} adverse. The 280 hours over standard are valued at the overhead rate.` });
  }
  {
    const total = -2300, exp = -900;
    const vol = r2(total - exp);
    chk(vol, -1400);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(vol), calculator: true, wrong: [3200, 900],
      stem: `A company under-absorbed fixed overhead by US\\$2,300 in total. The expenditure variance was US\\$900 adverse. Calculate the fixed overhead volume variance (the amount only).`,
      hints: ["Expenditure + volume = total under-absorption."],
      explanation: `Total 2,300 A = expenditure 900 A + volume. Volume = 2,300 - 900 = ${usd(Math.abs(vol))} adverse. Adding the two (US\\$3,200) would double count.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between the fixed overhead capacity variance and the fixed overhead efficiency variance.",
    points: ["Capacity compares the hours actually worked with the hours budgeted", "Efficiency compares the hours worked with the standard hours allowed for the output made", "Capacity shows use of the planned capacity; efficiency shows how productively the hours were used"],
    modelAnswer: "The capacity variance compares hours worked with hours budgeted, so it shows whether the factory was busy enough. The efficiency variance compares the hours worked with the standard hours for the output, so it shows how productive the hours were.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a manager responsible for production may not be able to control the fixed overhead expenditure variance.",
    points: ["Fixed overheads such as rent and depreciation are set by decisions taken at a higher level", "They do not change with the activity the production manager controls", "A senior manager or the budget holder for the cost should be held accountable instead", "Comparing the production manager with a cost he cannot influence would demotivate him"],
    modelAnswer: "Rent and depreciation are decided by senior managers and do not vary with production. The expenditure variance should be reported to the person who authorised the cost, not to the production manager.",
    hints: ["Controllable and uncontrollable costs."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A factory reports a favourable fixed overhead volume variance. Evaluate whether this is good news.",
    points: ["It means more output than budgeted, so more overhead was absorbed than budgeted", "The gain is only an accounting effect: the actual fixed overhead did not change", "The extra output must be sold, or inventory and costs rise", "A judgement: it is good only if the extra output earns more margin or the hours were used productively (check the efficiency variance)"],
    modelAnswer: "More output absorbed more overhead, but actual fixed cost was unchanged, so the gain is only an accounting effect. It is good only if the extra output is sold at a margin and the hours were productive.",
    hints: ["Does actual cost change when the volume changes?"],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const bu = 2500, hp = 4, boh = 45000, au = 2380, ah = 9800, aoh = 46200;
    const bh = bu * hp, rh = boh / bh, ru = boh / bu, sh = au * hp;
    chk(rh, 4.5); chk(ru, 18);
    const ex = variances.fixedOverheadExpenditure({ budgetedOverhead: boh, actualOverhead: aoh });
    const vo = variances.fixedOverheadVolume({ budgetedUnits: bu, actualUnits: au, ratePerUnit: ru });
    const ca = variances.fixedOverheadCapacity({ budgetedHours: bh, actualHours: ah, ratePerHour: rh });
    const ef = variances.fixedOverheadEfficiency({ stdHoursForActualOutput: sh, actualHours: ah, ratePerHour: rh });
    chk(ex.value, -1200); chk(vo.value, -2160); chk(ca.value, -900); chk(ef.value, -1260);
    chk(ca.value + ef.value, vo.value); chk(ex.value + vo.value, r2(au * ru - aoh));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Rudo Bricks in Chinhoyi budgeted to make ${F(bu)} batches of bricks at 4 standard labour hours a batch, with fixed overhead of ${usd(boh)}. In the year the business made ${F(au)} batches, worked ${F(ah)} hours and incurred fixed overhead of ${usd(aoh)}. Overhead is absorbed per labour hour.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: rh, dp: 2, wrong: [ru, boh / ah], stem: "Calculate the standard fixed overhead rate per labour hour.", explanation: `${F(boh)} ÷ ${F(bh)} hours = ${usd(rh)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: ex.amount, wrong: [vo.amount, ca.amount], stem: "Calculate the fixed overhead expenditure variance (amount only).", explanation: `${F(boh)} - ${F(aoh)} = -${F(ex.amount)}: ${usd(ex.amount)} adverse.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: vo.amount, wrong: [r2(120 * rh), ex.amount], stem: "Calculate the fixed overhead volume variance (amount only).", explanation: `Rate per batch = ${F(boh)} ÷ ${F(bu)} = US\\$18. (${F(au)} - ${F(bu)}) × 18 = -${F(vo.amount)}: ${usd(vo.amount)} adverse.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: ca.amount, wrong: [ef.amount, r2((ah - sh) * rh)], stem: "Calculate the capacity variance (amount only).", explanation: `(${F(ah)} - ${F(bh)}) × 4.50 = -${F(ca.amount)}: ${usd(ca.amount)} adverse.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: ef.amount, wrong: [ca.amount, r2((sh - bh) * rh)], stem: "Calculate the efficiency variance (amount only).", explanation: `Standard hours = ${F(au)} × 4 = ${F(sh)}. (${F(sh)} - ${F(ah)}) × 4.50 = -${F(ef.amount)}: ${usd(ef.amount)} adverse.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Comment on what the capacity and efficiency variances suggest about the year.", points: ["Fewer hours were worked than budgeted, so capacity was not fully used", "More hours were taken than the standard allowed for the batches made, so the work was slow", "Both reduce overhead absorbed and should be investigated (orders, machine breakdowns, labour skills)"], modelAnswer: "The factory worked 200 fewer hours than budgeted, so some capacity was idle. The batches also needed 280 more hours than the standard allows, so the work was less efficient than planned.", explanation: "One mark for each point." }),
      ],
      hints: ["Budgeted hours = 2,500 × 4.", "Capacity + efficiency should equal volume."],
      explanation: "This item calculates all four fixed overhead variances.",
    });
  }

  // Struct 2 (10 marks, d5)
  {
    const bu = 8000, hp = 1.5, boh = 60000, au = 8600, ah = 12500, aoh = 60900;
    const bh = bu * hp, rh = boh / bh, ru = boh / bu, sh = au * hp;
    chk(rh, 5); chk(ru, 7.5); chk(sh, 12900);
    const absorbed = r2(au * ru);
    const tot = r2(absorbed - aoh);
    chk(absorbed, 64500); chk(tot, 3600);
    const ex = variances.fixedOverheadExpenditure({ budgetedOverhead: boh, actualOverhead: aoh });
    const ca = variances.fixedOverheadCapacity({ budgetedHours: bh, actualHours: ah, ratePerHour: rh });
    const ef = variances.fixedOverheadEfficiency({ stdHoursForActualOutput: sh, actualHours: ah, ratePerHour: rh });
    chk(ex.value, -900); chk(ca.value, 2500); chk(ef.value, 400 * 5);
    chk(ex.value + ca.value + ef.value, tot);
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: `Gweru Plastics budgeted to make ${F(bu)} units at 1.5 standard hours each, with budgeted fixed overhead of ${usd(boh)}. It actually made ${F(au)} units, worked ${F(ah)} hours and incurred fixed overhead of ${usd(aoh)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: absorbed, wrong: [boh, r2(ah * rh)], stem: "Calculate the fixed overhead absorbed by the actual output.", explanation: `Rate per unit = ${F(boh)} ÷ ${F(bu)} = US\\$7.50. ${F(au)} × 7.50 = ${usd(absorbed)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: tot, wrong: [ex.amount, r2(absorbed - boh)], stem: "Calculate the total over-absorption of fixed overhead.", explanation: `Absorbed ${F(absorbed)} - actual ${F(aoh)} = ${usd(tot)} over-absorbed (favourable).` }),
        P.group({ label: "(c)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: ca.amount, wrong: [ef.amount, r2((sh - bh) * rh)], stem: "the capacity variance (amount only)", explanation: `(${F(ah)} - ${F(bh)}) × 5.00 = ${usd(ca.amount)} favourable (hours worked above budget).` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: ef.amount, wrong: [ca.amount, r2((ah - sh) * rh)], stem: "the efficiency variance (amount only)", explanation: `Standard hours = ${F(au)} × 1.5 = ${F(sh)}. (${F(sh)} - ${F(ah)}) × 5.00 = ${usd(ef.amount)} favourable (output took fewer hours than the standard).` }),
        ] }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the over-absorption does not mean that fixed costs were controlled well.", points: ["The expenditure variance is adverse (US\\$900): actual fixed overhead exceeded the budget", "The favourable total comes from higher output, which absorbed more overhead, not from lower costs"], modelAnswer: "Actual fixed overhead was US\\$900 above budget (adverse expenditure). The over-absorption comes from making more than budgeted, which absorbed extra overhead.", explanation: "One mark for each point." }),
      ],
      hints: ["Rate per unit = budgeted overhead ÷ budgeted units.", "Expenditure + capacity + efficiency should equal the total."],
      explanation: "This item analyses an over-absorption into its causes.",
    });
  }

  b.card("FORMULA", "Fixed overhead expenditure variance", "Budgeted fixed overhead - actual fixed overhead. Positive = favourable.");
  b.card("FORMULA", "Fixed overhead volume variance", "(Actual output - budgeted output) × standard fixed overhead rate per unit = overhead absorbed - budgeted overhead.");
  b.card("FORMULA", "Fixed overhead capacity variance", "(Actual hours - budgeted hours) × standard fixed overhead rate per hour.");
  b.card("FORMULA", "Fixed overhead efficiency variance", "(Standard hours for actual output - actual hours) × standard fixed overhead rate per hour.");
  b.card("FACT", "Fixed overhead relationships", "Capacity + efficiency = volume. Expenditure + volume = overhead absorbed - actual overhead.");
  b.card("FORMULA", "Standard fixed overhead rate", "Budgeted fixed overhead ÷ budgeted hours (per hour) or ÷ budgeted units (per unit).");
  b.card("CONCEPT", "Meaning of an adverse capacity variance", "Fewer hours were worked than budgeted: idle capacity from low orders, breakdowns or strikes.");
  b.card("CONCEPT", "Meaning of an adverse efficiency variance", "The output took more hours than the standard allows, so less overhead was absorbed.");
  b.card("FACT", "Board coverage", "Fixed overhead variances: Cambridge A Level only. ZIMSEC states that overhead variances will not be set.");
});
