// W2a: econ.unemployment.measurement — employment, unemployment, labour force, full employment, labour force survey,
// unemployment rate. Figures differ from the lesson's worked examples.
import { concept, P, table, unemploymentRate, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.unemployment.measurement", { file: "unemployment/measurement", keyPrefix: "unemployment.measurement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which person is **unemployed**?",
    options: [
      ["Farai, who lost his job and is applying for work every week", "Correct: he is without work, available and actively seeking work."],
      ["Chipo, a full-time university student with no job", "Students who are not seeking work are economically inactive."],
      ["Sipho, who sells vegetables at a market for three hours a day", "Informal and part-time work count as employment."],
      ["Rudo, who retired from teaching last year", "Retired people are outside the labour force."],
    ],
    answer: "A",
    explanation: "To be unemployed a person must be without work, available for work and actively looking for it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The labour force of a country is made up of",
    options: [
      ["the employed and the unemployed.", "Correct: everyone working or willing, able and seeking to work."],
      ["the employed only.", "The unemployed are also part of the labour force."],
      ["everyone of working age.", "Working age includes the economically inactive, such as students."],
      ["the whole population.", "Children and the retired are not in the labour force."],
    ],
    answer: "A",
    explanation: "Labour force = employed + unemployed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does **full employment** mean?",
    options: [
      ["Only short-term frictional and seasonal unemployment remains", "Correct: full employment allows for people between jobs."],
      ["Every person in the country, of any age, has a paid job", "Children and retired people are not expected to work."],
      ["The unemployment rate has fallen to exactly zero per cent", "Some frictional unemployment always exists."],
      ["Every worker in the economy is working full-time hours", "Full employment is about jobs, not hours worked."],
    ],
    answer: "A",
    explanation: "At full employment everyone willing and able to work at the going wage has a job, apart from a small amount of short-term unemployment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Nyasha has had no job for two years and has stopped looking because she believes there are no vacancies. In a labour force survey she is counted as",
    options: [
      ["economically inactive (a discouraged worker).", "Correct: she is not actively seeking work."],
      ["unemployed, because she has no job.", "Being without work is not enough: she must also be looking for work."],
      ["employed, because she is of working age.", "Being of working age does not make someone employed."],
      ["underemployed, because she would like more work.", "Underemployment describes people who have some work but want more."],
    ],
    answer: "A",
    explanation: "Discouraged workers who have stopped searching are outside the labour force, so measured unemployment understates joblessness.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage of measuring unemployment with a labour force survey?",
    options: [
      ["It is costly and based on a sample, so it has a margin of error", "Correct: surveys are expensive and sample results are estimates."],
      ["It only counts people who claim unemployment benefits", "That is the claimant count; the survey includes non-claimants."],
      ["It cannot be compared with figures from other countries", "Surveys use international (ILO) definitions, which helps comparison."],
      ["It ignores the age and sex of the people questioned", "Surveys can collect detailed information on age, sex and region."],
    ],
    answer: "A",
    hints: ["Think about how a survey collects its information."],
    explanation: "A labour force survey is comparable and includes non-claimants, but it is costly, slow and subject to sampling error.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, the number of unemployed people rises from 480,000 to 504,000, while the labour force rises from 4.0 million to 4.48 million. What happens to the unemployment rate?",
    options: [
      ["It falls from 12% to 11.25%", "Correct: 480,000 ÷ 4,000,000 = 12%; 504,000 ÷ 4,480,000 = 11.25%."],
      ["It rises from 12% to 12.6%", "This divides the new number unemployed by the old labour force."],
      ["It rises by 5%, in line with the number unemployed", "The number rose by 5%, but the labour force grew faster."],
      ["It stays at 12%, because both figures rose", "The labour force grew by 12% and unemployment by 5%, so the rate changes."],
    ],
    answer: "A",
    hints: ["Work out the rate in each year using its own labour force."],
    explanation: "The number unemployed can rise while the rate falls if the labour force grows faster.",
  });
  check("rate y1", unemploymentRate({ unemployed: 480, labourForce: 4000 }), 12);
  check("rate y2", unemploymentRate({ unemployed: 504, labourForce: 4480 }), 11.25);
  check("wrong y2", (504 / 4000) * 100, 12.6);
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Many workers in a country are informal traders who work only a few hours a day but would like full-time work. What does this suggest about the official unemployment rate?",
    options: [
      ["It understates the under-use of labour, because they count as employed", "Correct: the survey counts them as employed, hiding underemployment."],
      ["It overstates unemployment, because informal traders are counted as unemployed", "Informal workers who did paid work count as employed."],
      ["It is accurate, because everyone with work is counted correctly", "The rate does not show that these workers want more hours."],
      ["It cannot be calculated, because informal work is illegal", "Informal work is not necessarily illegal, and the survey still classifies it."],
    ],
    answer: "A",
    hints: ["How does a survey classify someone who did a few hours of paid work?"],
    explanation: "Underemployed people are counted as employed, so the unemployment rate alone understates how much labour is idle.",
  });

  // Numericals.
  const e1 = 5320, u1 = 1180;
  const r1 = unemploymentRate({ unemployed: u1, employed: e1 });
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: r1, daily: true, calculator: true,
    stem: `A labour force survey in a fictional country estimates that ${fmt(e1)} thousand people are employed and ${fmt(u1)} thousand are unemployed. Calculate the unemployment rate. Give your answer to one decimal place.`,
    wrong: [(u1 / e1) * 100],
    explanation: `Labour force = ${fmt(e1)} + ${fmt(u1)} = ${fmt(e1 + u1)} thousand. Rate = ${fmt(u1)} ÷ ${fmt(e1 + u1)} × 100 = **${pct(r1, 1)}**. Dividing by the employed (${pct((u1 / e1) * 100, 1)}) uses the wrong base.`,
  });
  const lf2 = 3200, rate2 = 12.5, un2 = (lf2 * rate2) / 100;
  check("un2", un2, 400);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: un2,
    stem: `A fictional country has a labour force of ${fmt(lf2)} thousand and an unemployment rate of ${rate2}%. How many people are unemployed, in thousands?`,
    wrong: [lf2 - un2],
    explanation: `Unemployed = ${rate2}% × ${fmt(lf2)} = ${rate2} ÷ 100 × ${fmt(lf2)} = **${fmt(un2)} thousand**. ${fmt(lf2 - un2)} thousand is the number employed.`,
  });
  const wap3 = 9000, inact3 = 2700, un3 = 945;
  const lf3 = wap3 - inact3, r3 = unemploymentRate({ unemployed: un3, labourForce: lf3 });
  check("r3", r3, 15);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: r3, calculator: true,
    stem: `In a fictional country the working-age population is ${fmt(wap3)} thousand. Of these, ${fmt(inact3)} thousand are economically inactive and ${fmt(un3)} thousand are unemployed. Calculate the unemployment rate. Give your answer to one decimal place.`,
    wrong: [(un3 / wap3) * 100, (un3 / (lf3 - un3)) * 100],
    hints: ["Find the labour force first: working-age population minus the inactive."],
    explanation: `1. Labour force = ${fmt(wap3)} − ${fmt(inact3)} = ${fmt(lf3)} thousand.\n2. Rate = ${un3} ÷ ${fmt(lf3)} × 100 = **${pct(r3, 1)}**.\n3. Dividing by the working-age population gives ${pct((un3 / wap3) * 100, 1)}, which wrongly includes the inactive in the base.`,
  });
  const lfA = 2500, uA = 300, newJobs = 120, entrants = 50;
  const rBefore = unemploymentRate({ unemployed: uA, labourForce: lfA });
  const lfB = lfA + entrants, uB = uA + entrants - newJobs;
  const rAfter = unemploymentRate({ unemployed: uB, labourForce: lfB });
  check("rA", rBefore, 12);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: rAfter, calculator: true,
    stem: `A fictional town has a labour force of ${fmt(lfA)} people, of whom ${uA} are unemployed. Over a year, ${entrants} school leavers join the labour force and start looking for work, and ${newJobs} of the unemployed find jobs. No one else changes status. Calculate the new unemployment rate. Give your answer to one decimal place.`,
    wrong: [((uA - newJobs) / lfA) * 100, (uB / lfA) * 100],
    hints: ["School leavers looking for work join both the labour force and the unemployed.", "Those finding jobs stay in the labour force."],
    explanation: `1. New labour force = ${fmt(lfA)} + ${entrants} = ${fmt(lfB)}.\n2. New unemployed = ${uA} + ${entrants} − ${newJobs} = ${uB}.\n3. Rate = ${uB} ÷ ${fmt(lfB)} × 100 = **${pct(rAfter, 1)}** (down from ${pct(rBefore, 0)}).\n4. Forgetting the school leavers gives ${pct(((uA - newJobs) / lfA) * 100, 1)}; keeping the old labour force as the base gives ${pct((uB / lfA) * 100, 1)}.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A full-time student who is not looking for work is part of the labour force.",
    answer: false,
    explanation: "False. A student not seeking work is economically inactive, outside the labour force.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a labour force survey, a person who did a few hours of paid work in the reference week is counted as employed.",
    answer: true,
    explanation: "True. Under international definitions, even one hour of paid work in the reference week counts as employment, which can hide underemployment.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with how a labour force survey classifies them.",
    pairs: [
      ["A cross-border trader who sold goods last week", "Employed"],
      ["A retrenched miner applying for jobs", "Unemployed"],
      ["A homemaker not seeking paid work", "Economically inactive"],
      ["A graduate who has given up looking for work", "Discouraged worker (inactive)"],
    ],
    explanation: "Work for pay or profit = employed; without work, available and seeking = unemployed; not seeking = inactive (discouraged workers are a special case of inactive).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The unemployment rate is the number unemployed divided by the {{blank:a}}, multiplied by 100. If discouraged workers start looking for work again, the measured unemployment rate is likely to {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["labour force"], choices: ["labour force", "working-age population", "total population"] },
      { id: "b", accepted: ["rise"], choices: ["rise", "fall"] },
    ],
    wrong: [["working-age population", "fall"]],
    explanation: "The base is the labour force. Discouraged workers who resume searching become unemployed, so the measured rate rises.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the official unemployment rate may not show the true extent of unemployment in a country with a large informal sector.",
    points: [
      "Identifies underemployment: people with a little informal work count as employed.",
      "Explains that this hides people who want more work / work below their skills.",
      "Identifies discouraged workers: people who have stopped looking are counted as inactive.",
      "Explains that this lowers the measured rate below true joblessness.",
    ],
    modelAnswer: "First, many people do a few hours of informal work, such as vending, and are counted as employed even though they want full-time work; this underemployment is hidden by the rate. Second, people who have given up looking for work because they see no vacancies are counted as economically inactive, not unemployed, so the measured rate is lower than the true level of joblessness.",
    hints: ["Think about people with very little work and people who have stopped looking."],
    explanation: "Each reason: identify (1) and explain its effect on the measured rate (1). Sampling error or misreporting are also creditworthy.",
  });

  // Structured 1: survey by age group.
  const groups = [["15-24", 380, 190, 430], ["25-34", 760, 140, 100], ["35-64", 1240, 104, 250]];
  const T = table(["Age group", "Employed (thousands)", "Unemployed (thousands)", "Economically inactive (thousands)"], groups);
  const lfs = groups.map(([, e, u]) => e + u);
  const rates = groups.map(([, e, u]) => unemploymentRate({ unemployed: u, employed: e }));
  const totU = groups.reduce((s, g) => s + g[2], 0), totLF = lfs.reduce((s, x) => s + x, 0);
  const overall = unemploymentRate({ unemployed: totU, labourForce: totLF });
  check("youth rate", rates[0], (190 / 570) * 100);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the results of a labour force survey in a fictional country, Country X.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: lfs[0], stem: "Calculate the labour force aged 15-24, in thousands.", wrong: [groups[0][1] + groups[0][2] + groups[0][3]], explanation: `${groups[0][1]} + ${groups[0][2]} = ${lfs[0]} thousand (the inactive are not included).` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: rates[0], stem: "Calculate the unemployment rate for people aged 15-24. Give your answer to one decimal place.", wrong: [(groups[0][2] / groups[0][1]) * 100, (groups[0][2] / (groups[0][1] + groups[0][2] + groups[0][3])) * 100], explanation: `${groups[0][2]} ÷ ${lfs[0]} × 100 = ${pct(rates[0], 1)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: overall, stem: "Calculate the overall unemployment rate for ages 15-64. Give your answer to one decimal place.", wrong: [rates.reduce((s, r) => s + r, 0) / 3], explanation: `Unemployed = ${groups.map((g) => g[2]).join(" + ")} = ${totU}; labour force = ${lfs.join(" + ")} = ${fmt(totLF)}; ${totU} ÷ ${fmt(totLF)} × 100 = ${pct(overall, 1)}. Averaging the three rates (${pct(rates.reduce((s, r) => s + r, 0) / 3, 1)}) is wrong because the groups differ in size.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **one** reason why so many people aged 15-24 are economically inactive.",
        points: ["Identifies full-time education / training.", "Explains that students are not seeking work, so they are outside the labour force.", "Develops: or discouraged young people who have stopped looking because of few vacancies."],
        modelAnswer: "Many people aged 15-24 are still at school, college or university. Because they are in full-time education and not looking for work, the survey classes them as economically inactive rather than unemployed. Some may also be discouraged school leavers who have stopped searching because there are few vacancies.",
        explanation: "Education is the main reason; discouraged workers is a development.",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether the overall unemployment rate gives the government enough information to plan policies on unemployment.",
        points: [
          "Yes: it shows the general size of the problem and can be compared over time and with other countries.",
          "No: it hides large differences between groups (the youth rate is far higher than the rate for ages 35-64).",
          "No: it hides underemployment and discouraged workers; it gives no information on region, skills or duration.",
          "Justified conclusion: useful starting point, but the breakdown by group is needed to target policy.",
        ],
        modelAnswer: `The overall rate of ${pct(overall, 1)} shows how large the problem is and can be tracked over time. However, it hides large differences: the rate for 15-24 year-olds (${pct(rates[0], 1)}) is about four times that for 35-64 year-olds (${pct(rates[2], 1)}), which suggests policies aimed at school leavers, such as training and apprenticeships. It also says nothing about underemployment, discouraged workers, regions or how long people have been out of work. The overall rate is a useful headline, but the government needs the detailed breakdown to plan effective policies.`,
        explanation: "Weigh the usefulness of a single figure against what it hides; conclude.",
      }),
    ],
    hints: ["Labour force = employed + unemployed.", "Unemployment rate = unemployed ÷ labour force × 100."],
    explanation: `Youth rate ${pct(rates[0], 1)}, 25-34 ${pct(rates[1], 1)}, 35-64 ${pct(rates[2], 1)}; overall ${pct(overall, 1)}.`,
  });

  // Structured 2: two methods of measurement.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The government of a fictional country measures unemployment by counting the people who register at job centres. Few people register, because the country pays no unemployment benefit. An adviser suggests running a labour force survey instead.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which change in the measured figures is most likely if the country switches to a labour force survey?",
        options: [
          ["Measured unemployment rises, because people who do not register are counted", "Correct: the survey includes non-registered job seekers."],
          ["Measured unemployment falls, because only claimants are counted", "The survey counts non-claimants as well."],
          ["Measured unemployment stays the same, because the definition is identical", "The two methods use different definitions."],
          ["Measured unemployment falls to zero, because there is no benefit", "People without benefits can still be unemployed."],
        ],
        answer: "A",
        explanation: "With no benefit, few register, so a register undercounts; the survey finds the job seekers who do not register.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** advantage of a register (count of people at job centres) over a survey.",
        points: ["Identifies: quick / cheap / available frequently (monthly) / covers everyone who registers.", "Explains: figures come from records that already exist, so no costly sampling is needed."],
        modelAnswer: "A register is cheap and quick, because the numbers come from records that job centres already keep, so figures can be published every month without paying for a large survey.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether the government should replace the register with a labour force survey.",
        points: [
          "For: survey counts everyone without work and seeking work, including those who do not register.",
          "For: uses international definitions, so it can be compared with other countries.",
          "For: gives detail on age, sex, region and informal work.",
          "Against: costly, slow, and subject to sampling error; still hides underemployment and discouraged workers.",
          "Justified conclusion (e.g. survey as the main measure, with the register kept as a quick monthly indicator).",
        ],
        modelAnswer: "A survey would count everyone who is without work and looking for it, not only the few who register, so it would give a far more accurate figure in a country with no unemployment benefit. It also uses international definitions, allowing comparison with other countries, and gives detail by age, sex and region. However, surveys are costly and slow, the results are estimates with a margin of error, and they still count people with a few hours of informal work as employed. On balance the survey should become the main measure, because the register misses most of the unemployed, while the register can be kept as a quick monthly signal.",
        explanation: "Accuracy and comparability versus cost, delay and remaining weaknesses; conclude.",
      }),
    ],
    hints: ["Who is missing from a register when no benefit is paid?"],
    explanation: "A register undercounts where few people claim; a survey is more complete and comparable but costly and approximate.",
  });

  b.card("DEFINITION", "Define **unemployed**.", "People of working age who are without work, available for work and actively seeking work.");
  b.card("DEFINITION", "Define the **labour force**.", "Everyone employed plus everyone unemployed (working or willing, able and seeking to work).");
  b.card("FORMULA", "Unemployment rate = ?", "Number unemployed ÷ labour force × 100.");
  b.card("DEFINITION", "What is **full employment**?", "Everyone willing and able to work at the going wage has a job, apart from a small amount of frictional and seasonal unemployment.");
  b.card("DEFINITION", "Who is **economically inactive**?", "People of working age neither working nor seeking work: students, homemakers, the retired, the long-term sick, discouraged workers.");
  b.card("CONCEPT", "What is a **labour force survey**?", "A survey of a sample of households that classifies each person as employed, unemployed or inactive using international definitions.");
  b.card("CONCEPT", "Give two weaknesses of a labour force survey.", "Costly and slow; sampling error; hides underemployment and discouraged workers; relies on honest answers.");
  b.card("DEFINITION", "What is **underemployment**?", "Having some work but fewer hours than wanted, or work well below one's skills.");
  b.card("FACT", "Can the number unemployed rise while the unemployment rate falls?", "Yes: if the labour force grows by a larger percentage than the number unemployed.");
});
