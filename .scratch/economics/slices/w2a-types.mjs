// W2a: econ.unemployment.types — frictional, structural, cyclical, seasonal (both); regional, technological (ZIMSEC).
// Figures differ from the lesson's worked examples.
import { concept, P, table, unemploymentRate, pct, fmt, check, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.unemployment.types", { file: "unemployment/types", keyPrefix: "unemployment.types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Workers who are unemployed for a short time while they move between jobs are an example of",
    options: [
      ["frictional unemployment.", "Correct: short-term unemployment while searching and matching."],
      ["structural unemployment.", "Structural unemployment is long-term and follows the decline of an industry."],
      ["cyclical unemployment.", "Cyclical unemployment is caused by a fall in total demand."],
      ["seasonal unemployment.", "Seasonal unemployment depends on the time of year."],
    ],
    answer: "A",
    explanation: "Frictional unemployment is the time spent searching between jobs; it exists even at full employment.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Cyclical unemployment is caused by",
    options: [
      ["a fall in aggregate demand during a downturn.", "Correct: firms in many industries need fewer workers."],
      ["the time taken to search for a job.", "That causes frictional unemployment."],
      ["the decline of one industry for good.", "That causes structural unemployment."],
      ["changes in the weather and seasons during the year.", "That causes seasonal unemployment."],
    ],
    answer: "A",
    explanation: "Cyclical (demand-deficient) unemployment follows the business cycle: it rises when total spending falls.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Guides and boat crews at Kariba are out of work every year during the months when few tourists visit. This is",
    options: [
      ["seasonal unemployment.", "Correct: the demand for their labour depends on the time of year."],
      ["cyclical unemployment.", "Cyclical unemployment follows the business cycle, not the calendar."],
      ["structural unemployment.", "Tourism has not declined for good; the jobs return each season."],
      ["frictional unemployment.", "They are not between jobs by choice; demand for their work falls every year."],
    ],
    answer: "A",
    explanation: "Unemployment that repeats at the same time every year is seasonal.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A gold mine in a small town closes after its ore runs out. Hundreds of miners cannot find work nearby. This is best described as",
    options: [
      ["structural unemployment, concentrated in one region.", "Correct: the industry has gone for good and the jobless are in one area."],
      ["frictional unemployment, because the miners will soon find new jobs.", "There are few vacancies nearby, so it is unlikely to be short-term."],
      ["cyclical unemployment, because the economy is in recession.", "The cause is the mine running out of ore, not a fall in total demand."],
      ["seasonal unemployment, because mining stops in the dry season.", "The closure is permanent, not seasonal."],
    ],
    answer: "A",
    explanation: "The permanent closure of the town's main industry causes structural (regional) unemployment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, unemployment rises at the same time in manufacturing, retail, construction and transport, while total output falls. The most likely type of unemployment is",
    options: [
      ["cyclical unemployment.", "Correct: a widespread rise with falling output points to low aggregate demand."],
      ["structural unemployment.", "Structural unemployment usually hits particular industries, not all at once."],
      ["seasonal unemployment.", "Nothing suggests a regular yearly pattern."],
      ["technological unemployment.", "New machines would not cut jobs in all sectors at the same time while output falls."],
    ],
    answer: "A",
    hints: ["Is the problem in one industry or across the whole economy?"],
    explanation: "Job losses across many industries together with falling output are the sign of cyclical unemployment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which policy is most likely to reduce **structural** unemployment?",
    options: [
      ["Retraining workers from declining industries in new skills", "Correct: it reduces the mismatch between skills and vacancies."],
      ["Cutting interest rates to raise consumer spending", "This targets cyclical unemployment; extra demand does not reopen a declining industry."],
      ["Building irrigation so farmers can grow crops all year", "This targets seasonal unemployment."],
      ["Publishing vacancies online so job seekers find them faster", "This mainly reduces frictional unemployment."],
    ],
    answer: "A",
    hints: ["Structural unemployment is a mismatch of skills or location."],
    explanation: "Structural unemployment needs supply-side measures such as retraining or help to move to where jobs are.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A government cuts taxes to raise spending, but unemployment in a town whose clothing factories closed because of cheaper imports hardly changes. The best explanation is that the town's unemployment is",
    options: [
      ["structural, so higher total demand does not recreate the lost jobs", "Correct: extra spending goes to other goods and imports, not the closed industry."],
      ["cyclical, so tax cuts always take several years to have any effect", "If it were cyclical, more demand would help; the cause here is the factories' permanent closure."],
      ["frictional, so the workers are choosing not to take new jobs yet", "There is no sign the workers are choosing to search."],
      ["seasonal, so it will disappear by itself at the next harvest", "Clothing factory closures are not seasonal."],
    ],
    answer: "A",
    hints: ["What caused the factories to close?"],
    explanation: "Demand-side policies work on cyclical unemployment; structural unemployment needs retraining, mobility or new industries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Supermarkets in Gweru install self-service tills and employ fewer cashiers. The cashiers who lose their jobs experience",
    options: [
      ["technological unemployment.", "Correct: machines have replaced their labour."],
      ["seasonal unemployment.", "The change is permanent, not linked to the time of year."],
      ["cyclical unemployment.", "The cause is new technology, not a fall in total demand."],
      ["frictional unemployment.", "They did not leave voluntarily to search for better jobs."],
    ],
    answer: "A",
    explanation: "Technological unemployment, a form of structural unemployment, occurs when machines replace workers.",
  });

  // Numericals.
  const lf = 6000, before = 420, cyc = 270;
  const rB = unemploymentRate({ unemployed: before, labourForce: lf }), rA = unemploymentRate({ unemployed: before + cyc, labourForce: lf });
  check("rB", rB, 7); check("rA", rA, 11.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: rA, daily: true, calculator: true,
    stem: `A fictional country has a labour force of ${fmt(lf)} thousand. Before a recession, ${before} thousand people are unemployed. The recession adds ${cyc} thousand cyclically unemployed. What is the unemployment rate during the recession? Give your answer to one decimal place.`,
    wrong: [(cyc / lf) * 100, rB],
    explanation: `Unemployed = ${before} + ${cyc} = ${before + cyc} thousand; ${before + cyc} ÷ ${fmt(lf)} × 100 = **${pct(rA, 1)}**. ${pct((cyc / lf) * 100, 1)} is the cyclical part only.`,
  });
  const comp = [["Frictional", 85], ["Structural", 310], ["Cyclical", 140], ["Seasonal", 65]];
  const totC = comp.reduce((s, c) => s + c[1], 0);
  const shareS = (comp[1][1] / totC) * 100;
  check("totC", totC, 600);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: shareS, calculator: true,
    stem: `Estimates of unemployment by type in a fictional country (thousands): frictional ${comp[0][1]}, structural ${comp[1][1]}, cyclical ${comp[2][1]}, seasonal ${comp[3][1]}. What percentage of total unemployment is structural? Give your answer to one decimal place.`,
    wrong: [(comp[1][1] / (totC - comp[1][1])) * 100],
    hints: ["Add all four types to find total unemployment."],
    explanation: `Total = ${comp.map((c) => c[1]).join(" + ")} = ${totC} thousand; ${comp[1][1]} ÷ ${totC} × 100 = **${pct(shareS, 1)}**. Dividing by the other types only (${pct((comp[1][1] / (totC - comp[1][1])) * 100, 1)}) is the wrong base.`,
  });
  const lf2 = 4800, nonSeasonal = 528, peakSeasonal = 216;
  const rPeak = unemploymentRate({ unemployed: nonSeasonal + peakSeasonal, labourForce: lf2 });
  const rLow = unemploymentRate({ unemployed: nonSeasonal, labourForce: lf2 });
  check("rPeak", rPeak, 15.5); check("rLow", rLow, 11);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: rPeak - rLow, dp: 1, calculator: true,
    stem: `In a fictional farming province with a labour force of ${fmt(lf2)} thousand, ${nonSeasonal} thousand people are unemployed all year. In the dry season a further ${peakSeasonal} thousand farm workers become unemployed. By how many percentage points does the unemployment rate rise in the dry season? Give your answer to one decimal place.`,
    wrong: [((rPeak - rLow) / rLow) * 100],
    hints: ["Work out the rate with and without the seasonal workers."],
    explanation: `1. Rest of the year: ${nonSeasonal} ÷ ${fmt(lf2)} × 100 = ${pct(rLow, 1)}.\n2. Dry season: (${nonSeasonal} + ${peakSeasonal}) ÷ ${fmt(lf2)} × 100 = ${pct(rPeak, 1)}.\n3. Rise = ${fmt(rPeak, 1)} − ${fmt(rLow, 1)} = **${fmt(rPeak - rLow, 1)} percentage points**. (${fmt(((rPeak - rLow) / rLow) * 100, 1)} is the percentage increase in the rate, not the change in percentage points.)`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Some frictional unemployment exists even when an economy is at full employment.",
    answer: true,
    explanation: "True. People are always moving between jobs or searching for their first job.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Seasonal unemployment and cyclical unemployment are the same thing, because both rise and fall over time.",
    answer: false,
    explanation: "False. Seasonal unemployment follows the calendar every year; cyclical unemployment follows the business cycle of booms and recessions.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause with the type of unemployment it creates.",
    pairs: [
      ["Time taken to find a suitable vacancy", "Frictional"],
      ["Decline of an industry facing cheaper imports", "Structural"],
      ["Fall in total spending in a recession", "Cyclical"],
      ["End of the harvest", "Seasonal"],
    ],
    explanation: "Each type has its own cause: search, permanent change in industry, low aggregate demand, time of year.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Structural unemployment is caused by a {{blank:a}} between the skills of the unemployed and the jobs available. It is usually {{blank:b}}-term, and the best policy to reduce it is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["mismatch"], choices: ["mismatch", "shortage of demand"] },
      { id: "b", accepted: ["long"], choices: ["long", "short"] },
      { id: "c", accepted: ["retraining"], choices: ["retraining", "lower interest rates"] },
    ],
    wrong: [["shortage of demand", "short", "lower interest rates"]],
    hints: ["Think about why the jobs disappeared."],
    explanation: "Structural unemployment is a long-term mismatch of skills or location, so it needs retraining or help to move rather than extra demand.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between structural and cyclical unemployment, using an example of each.",
    points: [
      "Structural: caused by a permanent change in the economy / decline of an industry; skills or location mismatch.",
      "Example of structural (e.g. factory closed by cheap imports, mine closure, technology).",
      "Cyclical: caused by a fall in aggregate demand in a downturn / recession; temporary.",
      "Example of cyclical (e.g. car sales and building fall across the country in a recession).",
    ],
    modelAnswer: "Structural unemployment comes from a permanent change in the structure of the economy, so that workers' skills or location no longer match the jobs available, for example textile workers whose factory closed because of cheap imported cloth. Cyclical unemployment comes from a fall in total demand during a recession, so firms in many industries need fewer workers, for example builders and car salespeople laid off when spending falls across the country. Cyclical unemployment falls when demand recovers; structural unemployment does not.",
    hints: ["Ask whether the jobs will come back when the economy recovers."],
    explanation: "One mark for each cause and one for each example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Explain **two** reasons why regional unemployment may persist in a town after its main factory closes.",
    points: [
      "Identifies geographical immobility of labour (housing costs, family ties, cost of moving).",
      "Explains that workers cannot easily move to areas with jobs.",
      "Identifies a downward multiplier / loss of local spending (or occupational immobility).",
      "Explains that shops and services lose customers and cut jobs too (or workers lack skills for other jobs).",
    ],
    modelAnswer: "First, workers may be geographically immobile: they own houses that are hard to sell, have family ties, or cannot afford to move to cities where there are jobs. Second, when the factory's wages stop, local shops, kombi operators and other services lose customers and cut jobs as well, so unemployment spreads through the town instead of falling.",
    hints: ["Why can't the workers just move? What happens to local shops?"],
    explanation: "Identify (1) + explain (1) for each reason.",
  });

  // Structured 1: a fictional economy's unemployment by industry.
  const rows = [["Agriculture", 30, 34], ["Mining", 12, 13], ["Manufacturing", 44, 66], ["Construction", 18, 26], ["Services", 56, 81]];
  const T = table(["Sector of last job", "2024 (thousands unemployed)", "2025 (thousands unemployed)"], rows);
  const t24 = rows.reduce((s, r) => s + r[1], 0), t25 = rows.reduce((s, r) => s + r[2], 0);
  const pc = ((t25 - t24) / t24) * 100;
  const manuPc = ((rows[2][2] - rows[2][1]) / rows[2][1]) * 100;
  check("t24", t24, 160); check("t25", t25, 220); check("manuPc", manuPc, 50);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `In 2025 a fictional economy in southern Africa entered a recession: household spending, construction and exports all fell. The table shows the number of unemployed people by the sector of their last job.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: t25 - t24, stem: "Calculate the increase in total unemployment between 2024 and 2025, in thousands.", wrong: [t25], explanation: `Totals: ${t24} thousand (2024) and ${t25} thousand (2025); increase = ${t25 - t24} thousand.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, stem: "Calculate the percentage increase in total unemployment. Give your answer to one decimal place.", wrong: [((t25 - t24) / t25) * 100], explanation: `${t25 - t24} ÷ ${t24} × 100 = ${pct(pc, 1)}. Using 2025 as the base gives ${pct(((t25 - t24) / t25) * 100, 1)}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which sector had the largest percentage increase in unemployment?",
        options: [
          ["Manufacturing", `Correct: +${pct(manuPc, 0)}.`],
          ["Services", `Services rose by the most people (${rows[4][2] - rows[4][1]} thousand) but by ${pct(((rows[4][2] - rows[4][1]) / rows[4][1]) * 100, 1)}.`],
          ["Construction", `Construction rose by ${pct(((rows[3][2] - rows[3][1]) / rows[3][1]) * 100, 1)}.`],
          ["Agriculture", `Agriculture rose by ${pct(((rows[0][2] - rows[0][1]) / rows[0][1]) * 100, 1)}.`],
        ],
        answer: "A",
        explanation: "Percentage change = change ÷ 2024 value × 100.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Using the information, explain why most of the increase in unemployment is likely to be cyclical.",
        points: [
          "Unemployment rose in every sector at the same time.",
          "This coincided with a recession: falling household spending, construction and exports (fall in aggregate demand).",
          "Firms cut output and workers because they could sell less.",
          "Sectors selling to consumers and exporters (manufacturing, construction, services) rose most; agriculture and mining, less dependent on local demand, changed little.",
        ],
        modelAnswer: "Unemployment rose in all five sectors at the same time as spending, construction and exports fell, which is the pattern of a fall in aggregate demand. With fewer sales, firms cut output and laid off workers. The biggest rises were in manufacturing, construction and services, which depend on household and business spending, while agriculture and mining changed little. This points to cyclical rather than structural unemployment.",
        explanation: "Use the spread across sectors and the link to the recession.",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether all of the rise in unemployment will disappear when the recession ends.",
        points: [
          "Yes for cyclical: when demand recovers firms rehire, so much of the rise falls.",
          "No: some firms close permanently during the recession, so their workers become structurally unemployed.",
          "No: long-term unemployed lose skills and confidence (hysteresis), and some unemployment (frictional, seasonal) always remains.",
          "Justified conclusion.",
        ],
        modelAnswer: "Much of the rise is cyclical, so when spending and exports recover, firms will need more workers and unemployment should fall. However, some firms will have closed for good during the recession, leaving workers whose skills are not in demand, and people who stay unemployed for a long time lose skills and confidence, making them harder to employ. So most, but not all, of the rise is likely to disappear, and some will remain as structural unemployment.",
        explanation: "Cyclical recovery versus lasting damage; conclude.",
      }),
    ],
    hints: ["Total each column first.", "Is the rise spread across all sectors?"],
    explanation: `Total unemployment rose by ${t25 - t24} thousand (${pct(pc, 1)}), across every sector, which points to cyclical unemployment.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country has high unemployment among former workers in its declining clothing industry, among new graduates who take several months to find jobs, and among farm workers during the dry season. The government has money for only one programme.",
    parts: [
      P.match({
        label: "(a)", marks: 3,
        stem: "Match each group with its type of unemployment.",
        pairs: [["Former clothing workers", "Structural"], ["New graduates searching for jobs", "Frictional"], ["Farm workers in the dry season", "Seasonal"]],
        explanation: "Declining industry = structural; searching = frictional; time of year = seasonal.",
      }),
      P.manual({
        label: "(b)", marks: 5, levels: LV(5),
        stem: "Discuss which group the government should spend its money on helping.",
        points: [
          "Structural is long-term and hardest to cure on its own; retraining for growing industries would help.",
          "Frictional is short-term and usually solves itself; better job information is cheap.",
          "Seasonal is temporary and returns each year; irrigation or off-season work could help but may be costly.",
          "Considers numbers affected, cost, and the hardship of each group.",
          "Justified conclusion (e.g. structural, because it lasts longest and causes most hardship).",
        ],
        modelAnswer: "Frictional unemployment among graduates is short-term and most of them will find jobs anyway, so it needs little spending beyond better vacancy information. Seasonal unemployment returns every year, and irrigation schemes could provide dry-season work, but they are costly and farm workers expect the work to return. The former clothing workers face structural unemployment: their industry is not coming back, and without retraining many will stay unemployed for years, losing skills and income. The money should go to retraining them for growing industries, because this unemployment lasts longest and causes the most hardship, unless the seasonal group is much larger.",
        explanation: "Compare length, hardship and the cost of a cure for each type; conclude.",
      }),
    ],
    hints: ["Which type is long-term and will not cure itself?"],
    explanation: "Identifying the type shows how long the unemployment will last and which policy will work.",
  });

  b.card("DEFINITION", "Define **frictional unemployment**.", "Short-term unemployment of people between jobs or searching for their first job.");
  b.card("DEFINITION", "Define **structural unemployment**.", "Long-term unemployment caused by a change in the structure of the economy, leaving a mismatch of skills or location.");
  b.card("DEFINITION", "Define **cyclical unemployment**.", "Unemployment caused by a fall in aggregate demand in a downturn (also called demand-deficient unemployment).");
  b.card("DEFINITION", "Define **seasonal unemployment**.", "Unemployment at certain times of the year because demand for some workers depends on the season.");
  b.card("DEFINITION", "What is **regional unemployment**?", "Structural unemployment concentrated in one area, often after its main industry declines.", undefined, { applies: ZIM });
  b.card("DEFINITION", "What is **technological unemployment**?", "Unemployment caused when machines or new methods replace workers; a form of structural unemployment.", undefined, { applies: ZIM });
  b.card("CONCEPT", "How can you tell cyclical unemployment in data?", "It rises in many industries and regions at the same time as output falls.");
  b.card("CONCEPT", "Which policy fits each type?", "Frictional: job information. Structural: retraining, mobility. Cyclical: raise aggregate demand. Seasonal: off-season work, irrigation.");
  b.card("FACT", "Which type of unemployment exists even at full employment?", "Frictional (and some seasonal) unemployment.");
});
