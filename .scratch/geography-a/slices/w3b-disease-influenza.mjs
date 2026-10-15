// W3b: disease.influenza (Cambridge only, A Level Paper 4 option 14). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const arV = chk((320 / 8000) * 100, 4, 1e-9);
const arU = chk((800 / 8000) * 100, 10, 1e-9);
const ve = chk(((arU - arV) / arU) * 100, 60, 1e-9);
const uptake = chk((117000 / 150000) * 100, 78, 1e-9);
const unvacc = chk(180000 - 153000, 27000);
const ve2 = rnd(((420 / 6000 - 150 / 6000) / (420 / 6000)) * 100, 1, 64.3, "ve2");
const VT = tbl(["Group", "People in the study", "Cases of influenza"], [["Vaccinated", "8 000", 320], ["Unvaccinated", "8 000", 800]]);
const WK = [22, 51, 78, 95, 83, 60, 38, 21, 11, 6];
const peak = Math.max(...WK);
const peakWk = WK.indexOf(peak) + 1;
chk(peak, 95);
chk(peakWk, 4);
const fall = rnd(((peak - WK[9]) / peak) * 100, 1, 93.7, "fall");
const cumul = chk(sum(WK), 465);
const rise = chk(WK[3] - WK[0], 73);
const WT = tbl(["Week", ...WK.map((_, i) => i + 1)], [["New cases per 100 000 people", ...WK]]);

concept("ageo.disease.influenza", { file: "disease/influenza", keyPrefix: "disease.influenza", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "Which animals are the natural reservoir of influenza A viruses?", [
    ["Wild aquatic birds", "Correct: they carry many subtypes, often without being ill."],
    ["Fish in the open ocean", "Fish are not the reservoir."],
    ["Mosquitoes and ticks", "They are vectors of other diseases (such as malaria), not of influenza."],
    ["Cattle and goats only", "Cattle and goats are not the natural reservoir."],
  ], "**Wild aquatic birds** are the natural reservoir of influenza A.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is the influenza vaccine updated every year?", [
    ["Circulating viruses change through antigenic drift", "Correct: small mutations mean last year's vaccine may not match this year's strains."],
    ["The vaccine loses its effect once it has been used once", "The vaccine's composition is changed because the virus changes, not because it is spent."],
    ["People lose all immunity to every disease after twelve months", "Immunity to many diseases lasts much longer."],
    ["Governments are required to change the brand of vaccine each year", "The reason is scientific, not legal."],
  ], "**Drift** changes the virus gradually, so the vaccine must be updated.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What causes a pandemic strain of influenza to arise?", [
    ["A sudden major change, such as the mixing of viruses from different species", "Correct: antigenic shift produces a subtype to which few people have immunity."],
    ["Small mutations that build up slowly over several seasons of winter epidemics", "That is antigenic drift, which causes seasonal epidemics."],
    ["A failure to wash hands in a school", "Poor hygiene helps spread flu but does not create new strains."],
    ["A rise in temperatures during the winter in the northern hemisphere", "Temperature does not create new strains."],
  ], "**Antigenic shift** gives a new subtype and a risk of pandemic.", { hints: ["Think of pigs as mixing vessels."] });
  mc(b, 3, "ANALYSIS", "Why do flu epidemics peak at opposite times of the year in Europe and southern Africa?", [
    ["Each place has its peak in its own winter", "Correct: the winters occur at opposite times in the two hemispheres."],
    ["Influenza is only spread by air travel in the northern summer", "Spread occurs throughout the year, with local peaks."],
    ["The virus cannot survive south of the equator in July", "Influenza occurs in the southern hemisphere."],
    ["Vaccines are only available in Europe during the winter", "Vaccines are used in both hemispheres."],
  ], "Winter in each hemisphere: **indoor crowding** and better virus survival in cold, dry air.", { hints: ["Think about the seasons."] });
  mc(b, 3, "ANALYSIS", "Which statement best evaluates a national flu vaccination programme?", [
    ["It lowers severe illness in risk groups but does not prevent every epidemic", "Correct: vaccine effectiveness is partial and uptake is not universal."],
    ["It guarantees that no one who is vaccinated will ever catch any influenza at all", "Vaccinated people can still catch flu."],
    ["It is of no value because the virus changes every year", "Even a partial match reduces severe illness."],
    ["It works equally well in every season and age group", "Effectiveness varies by season and by age."],
  ], "Vaccination is **partly effective** and reduces severe disease, especially in risk groups.", { hints: ["Look for the answer that is balanced."] });
  mc(b, 3, "APPLICATION", "Why is the monitoring of avian influenza in poultry and pigs part of influenza control?", [
    ["New human strains may arise from animal viruses", "Correct: early detection allows culling, vaccine preparation and warnings."],
    ["Poultry and pigs are the main sources of seasonal flu every year", "Seasonal flu spreads mainly between people."],
    ["Birds cannot be infected by any influenza virus", "Birds are the natural hosts."],
    ["Pigs cannot carry human influenza strains", "Pigs can carry both avian and human strains."],
  ], "Animals are a **source of new strains**; early detection helps prevention.", { hints: ["Think about where pandemic strains come from."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A person with influenza can pass on the virus before symptoms appear.", answer: true,
    feedbackTrue: "Correct: infectiousness begins about a day before symptoms.", feedbackFalse: "Not so: infected people can spread the virus before they feel ill.",
    explanation: "People are infectious about a **day before symptoms** begin, which makes control harder." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each pandemic to its year.",
    pairs: [
      ["H1N1, the 'Spanish' influenza", "1918–19"],
      ["H2N2, the 'Asian' influenza", "1957"],
      ["H3N2, the 'Hong Kong' influenza", "1968"],
      ["H1N1pdm09, the 'swine' influenza", "2009"],
    ], extraRight: ["1976"], explanation: "Each influenza pandemic involved a new strain." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Small, gradual changes in the influenza virus are called antigenic {{blank:a}}, whereas a sudden major change that can cause a pandemic is antigenic {{blank:b}}. Animals such as {{blank:c}} can be infected by both bird and human strains.",
    blanks: [
      { id: "a", accepted: ["drift"], choices: ["drift", "shift", "decay"] },
      { id: "b", accepted: ["shift"], choices: ["shift", "drift", "growth"] },
      { id: "c", accepted: ["pigs"], choices: ["pigs", "frogs", "sheep"] },
    ], explanation: "Drift for gradual change, shift for sudden change; pigs can host both bird and human viruses." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of influenza virus that can infect animals as well as humans and has caused pandemics.",
    accepted: ["influenza A", "type A", "A", "influenza type A", "flu A"],
    explanation: "**Influenza A** infects birds, pigs and people, and causes pandemics." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: `In another study, 6 000 vaccinated people and 6 000 unvaccinated people were followed for a season. There were 150 cases of influenza among the vaccinated and 420 among the unvaccinated.\n\nCalculate the vaccine effectiveness, using: effectiveness = (attack rate in unvaccinated − attack rate in vaccinated) ÷ attack rate in unvaccinated × 100.`,
    hints: ["Attack rate = cases ÷ people in the group × 100.", "The attack rates are 2.5% and 7%."],
    value: ve2, dp: 1, wrong: [4.5, 35.7, 64],
    explanation: "1. Attack rate (vaccinated) = 150 ÷ 6 000 = 2.5%.\n2. Attack rate (unvaccinated) = 420 ÷ 6 000 = 7%.\n3. Effectiveness = (7 − 2.5) ÷ 7 × 100 = **64.3%**. The value 4.5 is the difference in percentage points." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "In a health district 150 000 people are aged 65 and over, and 117 000 of them had the flu vaccine. Calculate the percentage vaccinated.",
    hints: ["Vaccinated ÷ eligible × 100."],
    value: uptake, wrong: [22, 0.78, 128],
    explanation: "117 000 ÷ 150 000 × 100 = **78%**. The value 22 is the share not vaccinated." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "In another health district 180 000 people are aged 65 and over, and 153 000 of them had the flu vaccine. How many were not vaccinated?",
    hints: ["Eligible − vaccinated."],
    value: unvacc, wrong: [153000, 333000, 15],
    explanation: "180 000 − 153 000 = **27 000** people." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how influenza is spread from person to person.",
    points: [
      "In droplets and aerosols released when an infected person coughs, sneezes or talks.",
      "By touching surfaces contaminated with the virus and then the mouth, nose or eyes.",
      "Crowded places and close contact increase spread, and people can infect others before they feel ill.",
    ],
    modelAnswer: "Influenza spreads in droplets and aerosols released when an infected person coughs, sneezes or talks. It also spreads when people touch contaminated surfaces and then their mouth, nose or eyes. Crowds and close contact increase spread, and people can infect others before they feel ill.",
    explanation: "Droplets, surfaces and crowding." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why influenza epidemics occur mainly in the winter in temperate countries.",
    hints: ["Think of behaviour and of the virus."],
    points: [
      "People spend more time indoors in crowded, poorly ventilated rooms, which helps the virus to pass between people.",
      "Cold, dry air helps the virus to survive for longer and remain infectious in the air.",
      "Cold weather may reduce the body's defences in the nose and throat.",
      "Schools, workplaces and public transport are in full use and bring large numbers of people into contact.",
    ],
    modelAnswer: "People spend more time indoors in crowded, poorly ventilated rooms, so the virus passes more easily. Cold, dry air helps the virus survive in the air for longer, and cold may reduce the body's defences in the nose and throat. Schools, workplaces and transport bring many people into contact.",
    explanation: "Behaviour, virus survival and body defences." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a new influenza pandemic could spread across the world within weeks.",
    hints: ["Think of travel, immunity and incubation."],
    points: [
      "Air travel moves infected people between continents in hours.",
      "A new strain has little immunity in the population, so many people are susceptible.",
      "People can spread the virus before they feel ill, so infected travellers are not stopped.",
      "Large, crowded cities and hubs spread the virus quickly to nearby areas.",
    ],
    modelAnswer: "Air travel moves infected people between continents in hours. A new strain meets little immunity, so many people can be infected. People can spread the virus before they feel ill, so infected travellers are not stopped, and crowded cities and travel hubs spread it to nearby areas.",
    explanation: "Mobility, susceptibility, silent spread and density." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why the impacts of influenza are greater in a poor community than in a rich one.",
    hints: ["Think about health, nutrition and income."],
    points: [
      "Malnutrition and existing illnesses make complications more likely.",
      "There are fewer clinics, vaccines and antiviral medicines, and people may not afford them.",
      "People cannot afford to stay away from work, which helps the spread, and crowded housing increases transmission.",
    ],
    modelAnswer: "Malnutrition and existing illness make complications more likely. There are fewer clinics, vaccines and medicines, and people may not afford them. People cannot afford to stay away from work, and crowded housing increases transmission.",
    explanation: "Health, access and income." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A trial followed 8 000 vaccinated and 8 000 unvaccinated people for one influenza season (illustrative data, invented for this exercise).\n\n${VT}`,
    hints: ["Attack rate = cases ÷ group size × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the attack rate in the unvaccinated group, as a percentage.", value: arU, unit: "%", wrong: [800, 6, 40],
        explanation: "800 ÷ 8 000 × 100 = 10%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the vaccine effectiveness, using: (attack rate unvaccinated − attack rate vaccinated) ÷ attack rate unvaccinated × 100.", value: ve, unit: "%", wrong: [6, 40, 4],
        explanation: "Vaccinated attack rate = 320 ÷ 8 000 × 100 = 4%. Effectiveness = (10 − 4) ÷ 10 × 100 = 60%." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two reasons why a vaccine trial might give a different effectiveness in a different season.",
        points: ["The circulating virus may match the vaccine strains more or less closely, because of drift.", "Different age groups or risk groups, and different levels of circulating virus, can change the result."],
        modelAnswer: "The circulating virus may match the vaccine strains more or less closely because of antigenic drift. Different age groups and different levels of virus in circulation can also change the result.",
        explanation: "Match to strains and population differences." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why people who choose to be vaccinated may not be a fair comparison with those who do not.",
        points: ["People who accept vaccination may be more health-conscious or better able to see a doctor.", "They may also differ in age or risk, so differences in cases might not be caused by the vaccine alone."],
        modelAnswer: "People who accept vaccination may be more health-conscious or have better access to care. They may also differ in age or risk, so the difference in cases may not be due to the vaccine alone.",
        explanation: "Selection bias limits trials that are not randomised." }),
    ], explanation: "Calculate attack rates and effectiveness and evaluate a trial." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows weekly new cases of influenza per 100 000 people in a northern hemisphere country over ten weeks (illustrative data, invented for this exercise).\n\n${WT}`,
    hints: ["Percentage fall = (peak − last value) ÷ peak × 100.", "Add all ten weekly values for the total."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "In which week was the peak of the epidemic?", options: [
        ["Week 4", "Correct: 95 cases per 100 000 was the maximum."],
        ["Week 3", "Week 3 had 78 cases."],
        ["Week 5", "Week 5 had 83 cases."],
        ["Week 10", "Week 10 had the lowest value (6)."],
      ], answer: "A", explanation: "The maximum is 95, in week 4." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage fall in weekly cases from the peak to week 10, to one decimal place.", value: fall, dp: 1, unit: "%", wrong: [89, 6.3, 83],
        explanation: "(95 − 6) ÷ 95 × 100 = 93.7%." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the total number of cases per 100 000 people over the ten weeks.", value: cumul, wrong: [95, 46.5, 73],
        explanation: "22 + 51 + 78 + 95 + 83 + 60 + 38 + 21 + 11 + 6 = 465." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the shape of the epidemic.",
        points: ["Cases rise rapidly, from 22 in week 1 to a peak of 95 in week 4 (a rise of 73).", "After the peak they fall steadily, with 83 in week 5 and 38 in week 7.", "By week 10 cases are only 6 per 100 000, so the epidemic is largely over."],
        modelAnswer: "Cases rise rapidly from 22 in week 1 to a peak of 95 in week 4, a rise of 73. After the peak they fall steadily, to 38 in week 7. By week 10 there are only 6 cases per 100 000, so the epidemic is largely over.",
        explanation: "Describe rise, peak and fall with figures." }),
      P.manual({ label: "(e)", marks: 5, stem: "Suggest how health authorities could use data like this to reduce the impact of influenza in the next season.",
        points: ["Use the timing of the peak to start vaccination before the season, so that protection is in place before cases rise.", "Plan hospital beds, staff and medicines for the weeks around the peak.", "Target messages and vaccination at schools, care homes and risk groups where spread is fastest.", "Monitor cases weekly to detect early rises and issue warnings.", "Compare seasons to judge whether measures are working and whether a new strain has appeared."],
        modelAnswer: "Authorities could use the timing of the peak to start vaccination before the season, so protection is in place before cases rise. They could plan beds, staff and medicines for the weeks around the peak and target vaccination and messages at schools, care homes and risk groups. Weekly monitoring would detect early rises and allow warnings, and comparing seasons would show whether measures work or a new strain has appeared.",
        explanation: "Timing, capacity, targeting, monitoring and review." }),
    ], explanation: "Interpret an epidemic curve, calculate changes and suggest how the data can be used." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of the prevention and control of influenza in the United Kingdom (or another country you have studied).",
    hints: ["Give surveillance, vaccination, antivirals and information, with strengths and limits."],
    points: [
      "Surveillance: sentinel general practices, hospitals and laboratories track cases and strains and share samples with the WHO network.",
      "Vaccination: free annual vaccine for people aged 65 and over, pregnant women, people with long-term conditions, health and social care staff and children (nasal spray in schools).",
      "Uptake among older people has been about three-quarters in recent seasons, which is high, but is lower in some groups.",
      "Effectiveness varies from year to year (often about 40–60%), and the vaccine has to be made months in advance, so a mismatch is possible.",
      "Antivirals and pandemic planning: stockpiles and plans for vaccine supply, hospital capacity and communication.",
      "Public information campaigns (hygiene, stay at home when ill) reduce spread.",
      "Limits: epidemics still occur each winter and put pressure on hospitals; the system depends on funding and public trust.",
      "Judgement: the programme has reduced severe illness among those at highest risk, but because the virus changes and vaccination is only partly effective, it can control but not prevent epidemics.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In the United Kingdom surveillance by sentinel general practices, hospitals and laboratories tracks cases and strains and shares samples with the WHO network. The National Health Service offers free annual vaccination to people aged 65 and over, pregnant women, people with long-term conditions, health and social care staff and children, and uptake among older people has been about three-quarters in recent seasons. Antiviral stockpiles and pandemic plans prepare for a new strain, and campaigns on hygiene reduce spread. However, vaccine effectiveness varies, often about 40 to 60 per cent, and the vaccine must be made months in advance, so mismatches can occur. Epidemics still put pressure on hospitals each winter. I conclude that the programme has reduced severe illness among those at highest risk, but can control, not prevent, epidemics.",
    wordLimit: { max: 300 }, explanation: "Weigh the strategies' strengths and limits and judge." });

  b.card("DEFINITION", "Antigenic drift and shift", "Drift: gradual change from small mutations, causing seasonal epidemics and the need for yearly vaccine updates. Shift: sudden major change, often from mixing of viruses from different species, which can cause a pandemic.");
  b.card("FACT", "Influenza pandemics", "1918–19 (H1N1, at least 50 million deaths), 1957 (H2N2), 1968 (H3N2), 2009 (H1N1, declared a pandemic by the WHO in June).");
  b.card("CONCEPT", "Transmission of influenza", "Droplets and aerosols from coughs, sneezes and speech, and contaminated surfaces; infectious from about a day before symptoms; crowds speed spread.");
  b.card("CONCEPT", "Seasonality of influenza", "Peaks in the local winter in temperate zones (northern: Nov–Mar; southern Africa: about May–Sep); occurs all year in the tropics.");
  b.card("CONCEPT", "Higher-risk groups", "Children under five, adults over 65, pregnant women, people with chronic illness or weak immunity, and health workers.");
  b.card("CONCEPT", "Animal reservoirs", "Wild aquatic birds carry influenza A; pigs can be infected by bird and human strains and act as mixing vessels; H5N1 shows the risk of avian viruses.");
  b.card("FORMULA", "Vaccine effectiveness", "(Attack rate in unvaccinated − attack rate in vaccinated) ÷ attack rate in unvaccinated × 100.");
  b.card("CONCEPT", "UK influenza control", "Sentinel surveillance, free annual vaccine for risk groups and children, antiviral stocks, pandemic plans and hygiene campaigns; limits: partial vaccine effectiveness and winter pressure on hospitals.");
});
