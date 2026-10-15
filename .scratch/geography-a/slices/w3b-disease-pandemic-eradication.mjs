// W3b: disease.pandemic-eradication (Cambridge only, A Level Paper 4 option 14). Real, dated facts are limited to those given in the lesson; tables of coverage are illustrative
// (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const redu = rnd(((420000 - 1260) / 420000) * 100, 1, 99.7, "redu");
const thr = rnd((1 - 1 / 6) * 100, 1, 83.3, "thr");
const delayCases = chk(150 * 2 ** (21 / 7), 1200, 1e-9);
const extra = chk(delayCases - 150, 1050, 1e-9);
// Struct A: coverage
const DIST = [["A", 12000, 93], ["B", 8000, 89], ["C", 6000, 71], ["D", 4000, 64], ["E", 10000, 79]];
const vacc = DIST.map(([, n, c]) => (n * c) / 100);
const unvac = DIST.map(([, n], i) => n - vacc[i]);
const totN = chk(sum(DIST.map((d) => d[1])), 40000);
const overall = chk((sum(vacc) / totN) * 100, 82.5, 1e-9);
const below = chk(DIST.filter((d) => d[2] < 85).length, 3);
chk(Math.max(...unvac), 2100, 1e-9);
chk(sum(unvac), 7000, 1e-9);
const DT = tbl(["District", "Children under 5", "Vaccinated (%)"], DIST.map((d) => [d[0], String(d[1]).replace(/^(\d+)(\d{3})$/, "$1 $2"), d[2]]));
// Struct B: timing (real dates from the lesson)
const dNZ = chk(Math.round((Date.UTC(2020, 2, 25) - Date.UTC(2020, 1, 28)) / 86400000), 26);
const dZW = chk(Math.round((Date.UTC(2020, 2, 30) - Date.UTC(2020, 2, 20)) / 86400000), 10);
const TT = tbl(["Event", "New Zealand", "Zimbabwe"], [
  ["First confirmed case", "28 February 2020", "20 March 2020"], ["Start of national lockdown", "25 March 2020", "30 March 2020"], ["Start of vaccination", "February 2021", "February 2021"],
]);

concept("ageo.disease.pandemic-eradication", { file: "disease/pandemic-eradication", keyPrefix: "disease.pandemic-eradication", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "What is the difference between elimination and eradication of a disease?", [
    ["Elimination is zero cases in one area; eradication is zero cases worldwide", "Correct: eradication means control measures are no longer needed anywhere."],
    ["Elimination is zero cases worldwide; eradication is zero cases in one country", "This reverses the two terms."],
    ["Elimination uses vaccines; eradication uses only quarantine", "Both can use vaccines."],
    ["They are two words for the same thing", "They describe different geographic scales."],
  ], "**Elimination** is local; **eradication** is global.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which feature of smallpox made it easier to eradicate than polio?", [
    ["It caused clear symptoms, so cases were easy to find", "Correct: most polio infections are silent."],
    ["It had many animal reservoirs that could be vaccinated", "Smallpox had no animal reservoir."],
    ["It was never spread from person to person", "It did spread between people."],
    ["Its vaccine had to be given every year", "The smallpox vaccine gave long-lasting immunity."],
  ], "Smallpox had **visible symptoms** and no animal reservoir.", { daily: true });
  mc(b, 3, "ANALYSIS", "Why is the geography of New Zealand helpful for an elimination strategy?", [
    ["Being an island makes it easier to control entry", "Correct: borders can be managed at a few airports and ports."],
    ["It has no international airports or seaports at all", "It has international airports."],
    ["It shares a long land border with several countries", "It has no land borders."],
    ["Its population is spread evenly across a huge area", "It has a small population and dense urban areas, which does not by itself help."],
  ], "An **island** with a few entry points makes border control easier.", { hints: ["Think of the entry points."] });
  mc(b, 3, "ANALYSIS", "How can a polio outbreak be caused by the oral polio vaccine?", [
    ["The weakened live virus can mutate and spread in under-vaccinated communities", "Correct: this produces circulating vaccine-derived polioviruses."],
    ["The vaccine contains a large number of fully active wild viruses taken from patients", "The vaccine contains a weakened virus."],
    ["The vaccine is injected, which spreads the virus by needle", "The oral vaccine is swallowed."],
    ["The vaccine cannot cause outbreaks under any conditions", "Rare vaccine-derived outbreaks do occur."],
  ], "In under-vaccinated communities the weakened virus can **mutate and spread**.", { hints: ["Think of a live weakened virus."] });
  mc(b, 3, "EVALUATION", "Which is the best reason for a poorer country to find lockdowns harder to sustain than a wealthy one?", [
    ["Many depend on daily income that the state cannot replace", "Correct: staying at home costs them their livelihood."],
    ["Poorer countries never have any cases of the disease at all", "They do have cases."],
    ["A lockdown has no effect on transmission in poorer countries", "Lockdowns can reduce transmission anywhere, but they have costs."],
    ["Poorer people simply refuse to wash their hands at home", "Lack of water and resources, not refusal, is the main issue."],
  ], "Lockdowns are costly when **incomes depend on daily work** and there is little state support.", { hints: ["Think about incomes."] });
  mc(b, 3, "EVALUATION", "Which statement best evaluates the global polio eradication programme?", [
    ["Cases fell by over 99%, but the last step is hard", "Correct: it combines major success with continuing obstacles."],
    ["The programme has failed completely, because no country is free of polio", "Many countries and the whole African region are free of wild polio."],
    ["The programme has finished, because polio no longer exists anywhere", "Wild polio remains in Afghanistan and Pakistan."],
    ["The programme is easy because polio always causes visible symptoms", "Most infections are silent."],
  ], "A **balanced** judgement states achievements and obstacles.", { hints: ["Look for both success and difficulty."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Smallpox is the only human disease to have been declared eradicated.", answer: true,
    feedbackTrue: "Correct: the WHO declared smallpox eradicated in 1980.", feedbackFalse: "Not so: smallpox is the only human disease eradicated so far.",
    explanation: "**Smallpox** (declared eradicated in 1980) is the only human disease eradicated so far." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Elimination", "Zero cases of a disease in a defined area"],
      ["Eradication", "Permanent zero incidence worldwide"],
      ["Non-pharmaceutical interventions", "Measures such as lockdowns and masks"],
      ["Ring vaccination", "Vaccinating contacts around a case"],
      ["Herd immunity", "Protection when enough people are immune"],
    ], explanation: "Each term describes a concept used in pandemic or eradication programmes." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The Global Polio Eradication Initiative began in {{blank:a}}. Wild poliovirus remains in Afghanistan and {{blank:b}}, and the African region was certified free of wild polio in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["1988"], choices: ["1988", "1958", "2008"] },
      { id: "b", accepted: ["Pakistan"], choices: ["Pakistan", "Brazil", "Zimbabwe"] },
      { id: "c", accepted: ["2020"], choices: ["2020", "2000", "1990"] },
    ], explanation: "1988, Pakistan and 2020." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the only human disease that has been declared eradicated, in 1980.",
    accepted: ["smallpox", "small pox"],
    explanation: "**Smallpox** was declared eradicated by the WHO in 1980." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Suppose annual cases of a disease fall from 420 000 to 1 260. Calculate the percentage reduction, to one decimal place.",
    hints: ["Reduction ÷ original × 100."],
    value: redu, dp: 1, wrong: [0.3, 418740, 99.0],
    explanation: "(420 000 − 1 260) ÷ 420 000 × 100 = **99.7%**. The value 0.3 is the percentage that remains." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A disease has R₀ = 6 (illustrative). Calculate the herd immunity threshold, as a percentage to one decimal place, using 1 − 1/R₀.",
    hints: ["1/6 = 0.1667."],
    value: thr, dp: 1, wrong: [16.7, 6, 60],
    explanation: "1 − 1/6 = 0.833, so **83.3%**. The value 16.7 is 1/R₀." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "Two countries each have 150 cases in the first week of an outbreak, and cases double every 7 days if nothing is done. Country A acts at the end of the first week, but Country B waits for 21 more days. How many more cases does Country B have at the time it acts?",
    hints: ["21 days is three doubling times."],
    value: extra, wrong: [150, 1200, 450],
    explanation: "Country B: 150 × 2³ = 1 200 cases, which is **1 050** more than Country A's 150. The value 1 200 is the total, not the difference." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why polio has been harder to eradicate than smallpox.",
    hints: ["Think about symptoms, conflict and the vaccine."],
    points: [
      "Most polio infections cause no symptoms, so many carriers go unnoticed while smallpox caused visible illness.",
      "Polio persists in places affected by conflict and insecurity, where vaccinators cannot reach children.",
      "The live oral vaccine can mutate and cause new outbreaks where immunity is low.",
      "Distrust and refusals, weak routine immunisation and population movement leave pockets of unvaccinated children.",
    ],
    modelAnswer: "Most polio infections cause no symptoms, so many carriers are not noticed, whereas smallpox caused visible illness. Polio persists in places affected by conflict where vaccinators cannot reach children. The live oral vaccine can mutate and cause outbreaks where immunity is low, and distrust, weak routine immunisation and movement of people leave pockets of unvaccinated children.",
    explanation: "Silent infection, conflict, vaccine-derived strains and gaps in coverage." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why New Zealand was able to adopt an elimination strategy for COVID-19 in 2020.",
    hints: ["Think of geography, resources, trust and speed."],
    points: [
      "Its island position made it possible to close the border and control arrivals.",
      "A wealthy economy with a good health system allowed testing, tracing and income support, so people could stay at home.",
      "Public trust in government messages led to high compliance with the lockdown.",
      "It acted early, when case numbers were still small, and a small population made contact tracing manageable.",
    ],
    modelAnswer: "Its island position made it possible to close the border and control arrivals. A wealthy economy with a good health system allowed testing, tracing and income support, so people could stay at home. Public trust in government messages led to high compliance, and it acted early when cases were few and the small population made tracing manageable.",
    explanation: "Geography, wealth, trust and early action." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why many people in Zimbabwe found it difficult to follow the COVID-19 lockdown.",
    hints: ["Think about incomes, water and housing."],
    points: [
      "Many people work in the informal sector and depend on daily income, so staying at home meant losing food and income.",
      "Households with no running water or crowded housing found hand-washing and distancing hard.",
      "Limited state support for households meant that few could afford to stay away from work.",
    ],
    modelAnswer: "Many people work in the informal sector and depend on daily income, so staying at home meant losing food and income. Households with no running water or in crowded housing found hand-washing and distancing hard. Limited support meant few could afford to stay away from work.",
    explanation: "Income, water and housing." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess why polio could re-emerge in countries that are now free of the wild virus.",
    hints: ["Think of immunity gaps and imported cases."],
    points: [
      "If vaccination coverage falls (because of conflict, displacement, disruption of services or distrust), a growing number of children are unprotected.",
      "The virus can be brought in from the countries where it still circulates, or by vaccine-derived strains in under-vaccinated areas.",
      "Surveillance may miss silent infections for months, so the virus can spread before it is noticed.",
    ],
    modelAnswer: "If vaccination coverage falls because of conflict, displacement, disrupted services or distrust, more children are unprotected. The virus can be imported from countries where it still circulates, or arise as vaccine-derived strains in under-vaccinated areas. Silent infections may escape surveillance for months, so the virus spreads before it is noticed.",
    explanation: "Falling immunity, importation and silent spread." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows polio vaccination coverage among children under five in five districts (illustrative data, invented for this exercise). Assume that coverage of at least 85% is needed to stop the spread of the virus.\n\n${DT}`,
    hints: ["Overall coverage = total vaccinated ÷ total children × 100.", "Vaccinated children = number × coverage ÷ 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the overall percentage of children under five who are vaccinated in the five districts, to one decimal place.", value: overall, dp: 1, unit: "%", wrong: [80.4, 82, 17.5],
        explanation: "Vaccinated: 11 160 + 7 120 + 4 260 + 2 560 + 7 900 = 33 000. 33 000 ÷ 40 000 × 100 = 82.5%." }),
      P.num({ label: "(b)", marks: 1, stem: "How many districts are below the 85% needed?", value: below, wrong: [2, 4, 5],
        explanation: "Districts C (71%), D (64%) and E (79%) are below 85%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which district has the largest number of unvaccinated children?", options: [
        ["District E", "Correct: 21% of 10 000 gives 2 100 children."],
        ["District D", "It has the lowest coverage but only 1 440 unvaccinated children."],
        ["District C", "It has 1 740 unvaccinated children."],
        ["District A", "It has the smallest number (840)."],
      ], answer: "A", explanation: "The number depends on both coverage and population." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why vaccination coverage is lowest in district D.",
        points: ["The district may be remote, with few clinics and poor roads, or affected by conflict, so vaccinators cannot reach children.", "Parents may distrust vaccination campaigns or not know about them, or the population may move often."],
        modelAnswer: "The district may be remote, with few clinics and poor roads, or affected by conflict so vaccinators cannot reach children. Parents may distrust the campaigns or not know about them, or the population may move often.",
        explanation: "Access, conflict, trust and movement." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two actions that would raise coverage in districts C, D and E.",
        points: ["House-to-house or mobile vaccination teams that reach children where they live, with community and religious leaders explaining the campaign.", "Better routine immunisation at clinics, tracking of missed children, and safe access agreed with all sides in conflict areas."],
        modelAnswer: "Mobile teams going from house to house, with community and religious leaders explaining the campaign. Better routine immunisation at clinics, tracking of missed children and safe access agreed in conflict areas.",
        explanation: "Reach children and build trust." }),
    ], explanation: "Calculate coverage, identify districts at risk and suggest improvements." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `The table compares key dates in the responses of New Zealand and Zimbabwe to COVID-19 (from the lesson).\n\n${TT}`,
    hints: ["2020 was a leap year, so February had 29 days.", "Think of similarities as well as differences."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of days between the first confirmed case and the start of the national lockdown in New Zealand.", value: dNZ, unit: "days", wrong: [25, 27, 10],
        explanation: "28 February to 25 March 2020 is 1 day to 29 February plus 25 days = 26 days." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the same period for Zimbabwe.", value: dZW, unit: "days", wrong: [9, 11, 30],
        explanation: "20 March to 30 March 2020 = 10 days." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe two similarities and one difference in the timing of the two responses.",
        points: ["Both imposed a national lockdown within about four weeks of the first case (26 and 10 days).", "Both began vaccination in February 2021.", "Difference: Zimbabwe's lockdown began 10 days after its first case, but New Zealand's 26 days after; or New Zealand's first case was 21 days earlier."],
        modelAnswer: "Both imposed a national lockdown within four weeks of the first case, after 26 days in New Zealand and 10 days in Zimbabwe, and both began vaccination in February 2021. The difference is that Zimbabwe's lockdown started 10 days after its first case, but New Zealand's started 26 days after.",
        explanation: "Quote data and compare." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the economic effects of a lockdown were more severe for many households in Zimbabwe than in New Zealand.",
        points: ["A large share of Zimbabwe's workers are in the informal economy and depend on daily income, so staying at home meant losing earnings.", "New Zealand's government paid wage subsidies and gave support to businesses, but the Zimbabwean state had limited funds to replace incomes.", "Households in Zimbabwe have less savings and limited access to credit and so cannot buy food during a lockdown."],
        modelAnswer: "Many Zimbabweans work in the informal economy and depend on daily income, so staying at home meant losing earnings. New Zealand's government paid wage subsidies, but the Zimbabwean state had limited funds to replace incomes. Households in Zimbabwe have less savings and credit and cannot buy food during a lockdown.",
        explanation: "Informal work, state support and savings." }),
      P.manual({ label: "(e)", marks: 3, stem: "Assess how far wealth explains the difference in the outcomes of the two responses.",
        points: ["Wealth explains testing and tracing capacity, hospital resources and income support, which made elimination possible in New Zealand.", "But geography (island and a small population) and trust in messages were also important, and acting early with limited resources also helped.", "Wealth is therefore a major factor but not the only one."],
        modelAnswer: "Wealth explains New Zealand's testing, tracing and income support, which made elimination possible. But geography, as an island with a small population, and trust in messages were also important, and acting early helped. Wealth is a major factor but not the only one.",
        explanation: "Weigh wealth against other factors." }),
    ], explanation: "Use dates to compare two responses and assess the factors behind the outcomes." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of the global polio eradication programme and assess the likelihood that the disease could re-emerge.",
    hints: ["Give achievements, obstacles and reasons for re-emergence."],
    points: [
      "Launched in 1988, the programme uses routine immunisation, mass campaigns, surveillance of paralysis and sewage sampling, and mop-up vaccination.",
      "Achievements: cases down by over 99% from an estimated 350 000 in 125 countries; wild poliovirus types 2 (2015) and 3 (2019) declared eradicated.",
      "The WHO African region was certified free of wild polio in August 2020, showing success even in poor countries.",
      "Obstacles: most infections are silent, so cases are found late, and conflict and insecurity stop vaccinators reaching children.",
      "Distrust of campaigns, weak routine immunisation and movement of people leave pockets of unvaccinated children.",
      "The oral vaccine can mutate in under-vaccinated areas, creating vaccine-derived outbreaks.",
      "Re-emergence is possible if coverage falls, from imported wild virus (Afghanistan and Pakistan) or from vaccine-derived strains, and funding is not guaranteed.",
      "Judgement: a major but incomplete success; the last step is the hardest, and the gains are fragile until the world is certified polio-free.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The Global Polio Eradication Initiative, begun in 1988, has been a major success. Cases have fallen by over 99 per cent from an estimated 350 000 in 125 countries, wild poliovirus types 2 and 3 have been declared eradicated, and the WHO African region was certified free of wild polio in 2020. However, the last step is hard. Most infections are silent, so cases are found late, and conflict and distrust stop vaccinators reaching children in Afghanistan and Pakistan, where wild type 1 remains. The oral vaccine can mutate in under-vaccinated areas and cause vaccine-derived outbreaks. If coverage falls, the virus could return from imported cases or vaccine-derived strains, and funding is not guaranteed. I conclude that the programme has been a major but incomplete success, and its gains are fragile until the world is certified polio-free.",
    wordLimit: { max: 300 }, explanation: "Balance achievements against obstacles and judge the risk of return." });

  b.card("DEFINITION", "Elimination and eradication", "Elimination: zero cases in a defined area with continuing action. Eradication: permanent zero cases worldwide, so control is no longer needed.");
  b.card("CONCEPT", "COVID-19: New Zealand", "Island country; borders closed from 19 March 2020; Level 4 lockdown from 25 March 2020; elimination strategy until late 2021; wage subsidy; high public trust.");
  b.card("CONCEPT", "COVID-19: Zimbabwe", "First case 20 March 2020; lockdown from 30 March 2020; limited testing and support; large informal economy; vaccination from February 2021 with donated doses.");
  b.card("CONCEPT", "Factors behind differences in responses", "Geography (island or land borders), wealth and health systems, informal economy, governance and trust, access to vaccines.");
  b.card("FACT", "Global Polio Eradication Initiative", "Launched in 1988; cases down by over 99% from an estimated 350 000 in 125 countries; wild types 2 (2015) and 3 (2019) eradicated; Africa certified free of wild polio in 2020; wild type 1 remains in Afghanistan and Pakistan.");
  b.card("CONCEPT", "Why polio is hard to eradicate", "Silent infections, conflict and insecurity, distrust of campaigns, weak routine immunisation, population movement, and vaccine-derived strains from the live oral vaccine.");
  b.card("CONCEPT", "Why smallpox was eradicated", "No animal reservoir, clear visible symptoms, an effective stable vaccine with lasting immunity; declared eradicated in 1980.");
  b.card("FORMULA", "Herd immunity threshold", "Threshold = 1 − 1/R₀; for R₀ = 6 it is about 83%.");
});
