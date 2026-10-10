// W2b: epidemiology and the global distribution of disease (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, rnd, ZIM } from "../lib.mjs";

concept("abio.disease.global-distribution", { file: "disease/global-distribution", keyPrefix: "disease.global-distribution", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the incidence of a disease measure?",
    options: [
      ["The number of new cases in a population during a stated period", "Correct: incidence counts new cases only."],
      ["The total number of people living with the disease at one time", "This is prevalence."],
      ["The number of deaths caused by the disease each year", "This is the mortality rate."],
      ["The proportion of infected people who show symptoms", "This is not a standard definition of incidence."],
    ],
    answer: "A",
    explanation: "**Incidence** = new cases in a period (usually per 1,000 or 100,000 people per year).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which term describes a disease, such as malaria in the Zambezi valley, that is always present in a region at a fairly steady level?",
    options: [
      ["Endemic", "Correct: constantly present in the population."],
      ["Epidemic", "An epidemic is a sudden rise above the expected level."],
      ["Pandemic", "A pandemic spreads across countries or continents."],
      ["Opportunistic", "This describes infections in people with weakened immunity."],
    ],
    answer: "A",
    explanation: "An **endemic** disease is always present in a population at a fairly constant level.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "After antiretroviral therapy became widely available in a country, the incidence of HIV fell but the prevalence rose. What is the best explanation?",
    options: [
      ["People with HIV lived longer, so more people were living with it at any time", "Correct: longer survival increases prevalence even when new cases fall."],
      ["More new infections occurred each year after treatment became available", "A falling incidence means fewer new infections."],
      ["Antiretroviral therapy causes new HIV infections in people who take it", "ART reduces transmission; it does not cause infection."],
      ["Prevalence counts only deaths, which increased when treatment began", "Prevalence counts people living with the disease, not deaths."],
    ],
    answer: "A",
    explanation: "Prevalence depends on how many new cases appear **and how long people live with the disease**. Treatment extends life, so prevalence rises.",
    hints: ["Prevalence includes everyone currently living with the disease."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How is Ebola virus mainly transmitted from person to person?",
    options: [
      ["Direct contact with the blood or body fluids of a sick person or a body", "Correct: Ebola spreads through body fluids."],
      ["Bites of infected female mosquitoes", "Ebola is not spread by mosquitoes."],
      ["Drinking water contaminated with faeces from a distance", "This describes cholera, not Ebola."],
      ["Breathing air in a room an infected person left hours earlier", "Ebola is not spread through the air over long distances."],
    ],
    answer: "A",
    explanation: "Ebola spreads through **direct contact with blood and body fluids** and contaminated objects; caregivers and unsafe burials are important routes.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is contact tracing an effective way to control an Ebola outbreak?",
    options: [
      ["Contacts who develop symptoms are found and isolated before they infect others", "Correct: early isolation breaks chains of transmission."],
      ["Contacts are given antibiotics that destroy the virus before it multiplies", "Antibiotics do not act on viruses."],
      ["Contacts become immune automatically after meeting an Ebola patient", "Exposure does not give immunity without infection or vaccination."],
      ["It finds the fruit bats that carry the virus so that they can be removed from the forest", "Contact tracing follows people, not animal reservoirs."],
    ],
    answer: "A",
    explanation: "Everyone a patient has touched is followed for 21 days; anyone who becomes ill is isolated quickly, stopping further spread. Contacts may also be offered vaccination.",
    hints: ["What happens to a contact who develops a fever?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the frequency of the sickle cell allele high in regions where malaria has long been common?",
    options: [
      ["Heterozygotes are partly protected against severe malaria, so they survive and reproduce more", "Correct: heterozygote advantage maintains the allele."],
      ["Malaria parasites cause the mutation that produces the sickle cell allele", "Mutations arise randomly; malaria selects, it does not cause them."],
      ["People with two copies of the allele are fully immune to all diseases", "Homozygotes have sickle cell anaemia, a serious disease."],
      ["Mosquitoes avoid biting people who have the sickle cell allele, so they are rarely infected", "Mosquitoes bite regardless of genotype."],
    ],
    answer: "A",
    explanation: "In malarial regions **heterozygotes** ($Hb^A Hb^S$) have a survival advantage, so both alleles are kept in the population.",
    hints: ["Which genotype has the advantage?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A study found that towns with more fast-food outlets had higher rates of coronary heart disease. Which is the most valid conclusion?",
    options: [
      ["There is a correlation, but other factors linked to town life may also explain it", "Correct: correlation does not prove causation."],
      ["Eating fast food is proved to be the cause of coronary heart disease", "One correlation cannot prove cause; other variables are not controlled."],
      ["Fast food has no effect on heart disease because some people in the towns are healthy", "Individual exceptions do not disprove a population trend."],
      ["Closing all fast-food outlets would remove coronary heart disease from the towns", "Many other risk factors, such as smoking and age, contribute."],
    ],
    answer: "A",
    explanation: "The data show a **correlation**. Towns with many outlets may also have more smoking, less activity or older populations; a cause needs controlled evidence and a mechanism.",
    hints: ["Could a third factor explain both?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair are both major risk factors for coronary heart disease?",
    options: [
      ["Smoking and hypertension", "Correct: both damage artery walls and promote atherosclerosis."],
      ["Mosquito bites and low altitude", "These relate to malaria, not heart disease."],
      ["Drinking unboiled water and crowding", "These relate to infectious diseases such as cholera and TB."],
      ["Low blood cholesterol and regular exercise", "These reduce the risk of heart disease."],
    ],
    answer: "A",
    explanation: "Smoking, high blood pressure, high blood cholesterol, inactivity, obesity and diabetes are major risk factors.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A pandemic is an epidemic that has spread across several countries or continents.",
    answer: true,
    explanation: "True. COVID-19 (2020 onwards) is a recent example.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Coronary heart disease is an infectious disease caused by a pathogen.",
    answer: false,
    explanation: "False. It is a **non-communicable** disease caused by atherosclerosis; its distribution follows risk factors such as diet, smoking and age.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each disease with the main cause of its distribution.",
    pairs: [
      ["Ebola virus disease", "Contact with wildlife reservoirs and with body fluids where health systems are weak"],
      ["Coronary heart disease", "Diet, smoking, inactivity and hypertension, increasing with urban lifestyles"],
      ["Sickle cell anaemia", "Selection for heterozygotes where malaria has been common"],
      ["Cholera", "Lack of safe water and sanitation"],
    ],
    explanation: "Distribution reflects the cause: reservoirs and contact (Ebola), lifestyle (CHD), selection (sickle cell), water (cholera).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "The number of new cases in a year is the {{blank:a}}; the number of people living with the disease at one time is the {{blank:b}}. A sudden rise of cases well above normal in one area is an {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["incidence"], choices: ["incidence", "prevalence", "mortality"] },
      { id: "b", accepted: ["prevalence"], choices: ["prevalence", "incidence", "mortality"] },
      { id: "c", accepted: ["epidemic"], choices: ["epidemic", "endemic", "pandemic"] },
    ],
    explanation: "Incidence (new), prevalence (all current), epidemic (sudden local rise).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the build-up of fatty deposits in the walls of arteries that leads to coronary heart disease.",
    accepted: ["atherosclerosis", "atheroma", "atheroma formation"],
    wrong: ["arteriosclerosis", "thrombosis"],
    explanation: "**Atherosclerosis**: fatty deposits (atheroma) narrow the coronary arteries.",
  });

  // Numerical: incidence per 100 000 (different numbers from the lesson)
  const pop2 = 72000, cases2 = 198;
  const inc2 = (cases2 / pop2) * 100000;
  chk(inc2, 275);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In a hypothetical district of 72,000 people, 198 new cases of tuberculosis were diagnosed in one year. Calculate the incidence per 100,000 people per year.",
    value: inc2,
    wrong: [rnd((cases2 / pop2) * 1000, 2), rnd((pop2 / cases2), 1)],
    explanation: t`Incidence $= \dfrac{198}{72\,000} \times 100\,000 = ${inc2}$ per 100,000 per year. Multiplying by 1,000 gives the rate per 1,000 (2.75), not per 100,000.`,
  });

  const towns = [["Town P", 25000, 40], ["Town Q", 160000, 120]];
  const rates = towns.map(([, n, d]) => (d / n) * 100000);
  chk(rates[0], 160);
  chk(rates[1], 75);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Hypothetical data for deaths from coronary heart disease in one year:\n\n${table(["Town", "Population", "Deaths from coronary heart disease"], towns.map(([a, n, d]) => [a, String(n), String(d)]))}\n\nTown Q had more deaths. Calculate the mortality rate per 100,000 for Town P, and use it to say which town had the higher risk.`,
    value: rates[0],
    wrong: [rates[1], 40],
    explanation: t`1. Town P: $\dfrac{40}{25\,000} \times 100\,000 = ${rates[0]}$ per 100,000.
2. Town Q: $\dfrac{120}{160\,000} \times 100\,000 = ${rates[1]}$ per 100,000.
3. Town P has the higher mortality **rate** (${rates[0]} against ${rates[1]}), even though Town Q had more deaths, because Town Q's population is much larger. Rates allow a fair comparison.`,
    hints: ["Convert both to rates per 100,000 before comparing."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the largest Ebola epidemic so far, in Guinea, Liberia and Sierra Leone, spread so widely.",
    points: [
      "Virus spread by direct contact with body fluids; caregivers / health workers without protective equipment infected",
      "Burial practices involving washing / touching the body spread the virus",
      "Weak health systems (few staff, isolation units) or mobile populations / movement across borders and into towns, or mistrust delayed reporting",
    ],
    modelAnswer: "Ebola spreads through body fluids, so family members caring for the sick and health workers without proper protection were infected. Traditional burials that involved washing the body spread it further. Health services had too few staff and isolation beds, and people moved between towns and across borders, carrying the virus to new places before cases were reported.",
    explanation: "Link the route of transmission to social and health-system factors.",
    hints: ["Who touches a sick person or a body?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain how heterozygote advantage maintains the sickle cell allele in a population where malaria is common.",
    points: [
      "Homozygous $Hb^A Hb^A$ individuals are more likely to die of (severe) malaria",
      "Homozygous $Hb^S Hb^S$ individuals have sickle cell anaemia and are less likely to survive / reproduce",
      "Heterozygotes $Hb^A Hb^S$ are partly protected against malaria and usually healthy",
      "Heterozygotes survive and reproduce more, passing on both alleles, so neither allele is lost (balanced polymorphism)",
    ],
    modelAnswer: "In a malarial area, people who are $Hb^A Hb^A$ are more likely to die of severe malaria, and people who are $Hb^S Hb^S$ suffer sickle cell anaemia and often die young. Heterozygotes are usually healthy and are partly protected against malaria, so they are the most likely to survive and have children. Because they carry both alleles, both are passed on and the $Hb^S$ allele stays at a high frequency.",
    explanation: "Compare all three genotypes.",
    hints: ["Consider the fate of each of the three genotypes."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "The number of reported cases of a disease in a country doubled between two years. Suggest three reasons, other than a real increase in the disease, why the reported number might rise.",
    points: [
      "Better or more widely available testing / diagnosis",
      "Improved reporting / surveillance systems or more people able to reach clinics",
      "Population growth (raw numbers rather than rates) or a change in the case definition",
    ],
    modelAnswer: "More clinics may have started testing for the disease, so more cases were found; the reporting system may have improved so more cases were recorded; and the population may have grown, so raw numbers rose even if the rate did not. A change in how a case is defined could also increase the count.",
    explanation: "Reported numbers depend on testing, reporting, population size and definitions.",
    hints: ["Think about how cases are found and counted."],
  });

  // Practice structured: CHD risk data (hypothetical)
  const groups = [["Non-smokers, normal blood pressure", 4000, 12], ["Smokers, normal blood pressure", 2500, 20], ["Non-smokers, hypertension", 1500, 15], ["Smokers, hypertension", 760, 19]];
  const per1000 = groups.map(([, n, c]) => (c / n) * 1000);
  chk(per1000[0], 3);
  chk(per1000[1], 8);
  chk(per1000[2], 10);
  chk(per1000[3], 25);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A hypothetical ten-year study followed men aged 40-60 in a city and recorded the number who had a heart attack.\n\n${table(["Group", "Number of men", "Heart attacks in 10 years"], groups.map(([g, n, c]) => [g, String(n), String(c)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the number of heart attacks per 1,000 men for smokers with hypertension. Give your answer to three significant figures.",
        value: per1000[3], sf: 3, wrong: [19],
        explanation: t`$\dfrac{19}{760} \times 1000 = ${dpStr(per1000[3], 1)}$ per 1,000 men (three significant figures).`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "The rates for the other groups are 3.0, 8.0 and 10.0 per 1,000. Describe what the data show about smoking and hypertension as risk factors.",
        points: [
          "Both smoking and hypertension increase the rate compared with neither (3.0 per 1,000)",
          "Hypertension alone (10.0) has a slightly larger effect than smoking alone (8.0)",
          "Together the risk is highest, 25 per 1,000, greater than either alone / about eight times the rate with neither",
        ],
        modelAnswer: "Men with neither risk factor had 3.0 heart attacks per 1,000. Smoking raised this to 8.0 and hypertension to 10.0. Men with both had 25 per 1,000, roughly eight times the rate of men with neither and more than either factor alone.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the study gives rates per 1,000 rather than numbers of heart attacks.",
        points: ["The groups are different sizes", "Rates allow a fair comparison of risk between groups"],
        modelAnswer: "The groups contain different numbers of men, so raw numbers would be misleading; rates per 1,000 compare the risk fairly.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest one other variable the researchers should take into account.",
        points: ["Any valid confounding factor, e.g. age, diet / blood cholesterol, physical activity, body mass, diabetes, family history"],
        modelAnswer: "Blood cholesterol (diet), because it also affects the risk of a heart attack.",
      }),
    ],
    explanation: "Rates show that smoking and hypertension each raise risk, and together raise it most.",
    hints: ["Compare each group with the group that has neither risk factor."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Health officials in a district record weekly suspected measles cases. Over the past five years the district has averaged about 2 cases per week. In the last three weeks there were 9, 17 and 31 cases, all in one ward where vaccination coverage is low.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which term best describes the situation in the ward?",
        options: [
          ["An epidemic", "Correct: a sudden rise well above the expected level in one area."],
          ["An endemic disease at its normal level", "The cases are far above the usual 2 per week."],
          ["A pandemic", "It is confined to one ward, not several countries."],
          ["A decrease in incidence", "Cases are rising, not falling."],
        ],
        answer: "A",
        explanation: "A sudden local rise well above normal is an **epidemic** (outbreak).",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the trend in the last three weeks.",
        points: ["Cases rose rapidly each week from 9 to 31", "The number roughly doubled each week / is far above the usual 2 per week"],
        modelAnswer: "Cases rose quickly from 9 to 17 to 31, roughly doubling each week and far above the usual 2 per week.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest two actions the health officials should take.",
        points: ["Vaccinate children in the ward (and surrounding area) / catch-up vaccination campaign", "Isolate cases / trace contacts / inform health workers and the public / improve surveillance"],
        modelAnswer: "Run a vaccination campaign in and around the ward, and isolate cases and trace their contacts.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: if measles cases in the district stayed at about 2 per week for many years, measles would be described as endemic there.",
        answer: true,
        explanation: "True. A disease constantly present at a steady level is endemic.",
      }),
    ],
    explanation: "A sudden rise above the expected level is an epidemic; vaccination and isolation control measles.",
    hints: ["Compare the recent numbers with the usual level."],
  });

  b.card("DEFINITION", "Incidence versus prevalence", "Incidence: new cases in a period. Prevalence: all people with the disease at one time.");
  b.card("DEFINITION", "Endemic, epidemic, pandemic", "Endemic: always present. Epidemic: sudden local rise. Pandemic: spread across countries or continents.");
  b.card("FORMULA", "Rate per 100,000", t`$\dfrac{\text{cases or deaths}}{\text{population}} \times 100\,000$`);
  b.card("FACT", "How is Ebola transmitted?", "Direct contact with blood and body fluids of sick people or bodies; fruit bats are the likely reservoir.");
  b.card("FACT", "Ebola control measures", "Isolation, contact tracing for 21 days, protective equipment, safe burials, vaccination of contacts.");
  b.card("FACT", "Risk factors for coronary heart disease", "Smoking, hypertension, high cholesterol, saturated-fat diet, inactivity, obesity, diabetes, age.");
  b.card("CONCEPT", "Why is the sickle cell allele common where malaria is common?", "Heterozygote advantage: carriers are partly protected against severe malaria.");
  b.card("CONCEPT", "Why can prevalence rise while incidence falls?", "Treatment keeps people alive longer, so more people live with the disease.");
  b.card("CONCEPT", "Evaluating epidemiological data", "Use rates; check sample size, reporting and testing; correlation is not causation.");
});
