// W3b exam rows (Cambridge): topic 9 (Hazardous environments, Paper 3): CAM_STRUCT10 x 2 (earthquakes; tropical cyclone surge) and CAM_ESSAY20 x 2 (earthquake impacts and vulnerability;
// management of tropical cyclones); topic 14 (Geography of disease, Paper 4): CAM_STRUCT10 x 2 (cholera; malaria) and CAM_ESSAY20 x 2 (pandemic responses and wealth; polio eradication).
// Resource data are invented for this exercise (labelled in the stems); every number is computed in code. Real facts in the essays are rounded, dated and attributed.
import { concept, P, chk, rnd, checkExam, EXAM, geographyLevels, magnitudeRatios, CAM } from "../lib.mjs";
import { tbl } from "../tables/w3b-_q.mjs";

const BASE = (plan, paper) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper, applies: plan.applies });

// ---- Struct 10 #1: three earthquakes (topic 9)
const eRatio = rnd(magnitudeRatios(8.1 - 6.9).energy, 1, 63.1, "eRatio");
const EQ = tbl(["Earthquake", "Magnitude (Mw)", "Focal depth (km)", "Distance to nearest city (km)", "Deaths", "Building code enforced?"], [
  ["A", "6.9", 10, 15, "2 900", "Rarely"], ["B", "8.1", 35, 80, 220, "Yes"], ["C", "6.1", 8, 5, 40, "Yes"],
]);

// ---- Struct 10 #2: storm surge (topic 9)
const S = [["S1", 0, 4.8], ["S2", 40, 3.1], ["S3", 100, 1.2]];
const surgeFall = chk(((4.8 - 1.2) / 4.8) * 100, 75, 1e-9);
const SGT = tbl(["Station", "Distance along the coast from the landfall point (km)", "Maximum storm surge (m)"], S.map((s) => [s[0], s[1], s[2].toFixed(1)]));

// ---- Struct 10 #3: cholera (topic 14)
const D = [["D1", 50000, 600, 12], ["D2", 40000, 1200, 60], ["D3", 60000, 300, 3]];
const cfrD2 = chk((60 / 1200) * 100, 5, 1e-9);
const arD2 = chk((1200 / 40000) * 100, 3, 1e-9);
chk((600 / 50000) * 100, 1.2, 1e-9);
chk((300 / 60000) * 100, 0.5, 1e-9);
const CHT = tbl(["District", "Population", "Cholera cases", "Deaths"], D.map((d) => [d[0], String(d[1]).replace(/^(\d+)(\d{3})$/, "$1 $2"), String(d[2]).replace(/^(\d+)(\d{3})$/, "$1 $2"), d[3]]));

// ---- Struct 10 #4: malaria and nets (topic 14)
const M = [[2018, 28, 240], [2019, 41, 205], [2020, 55, 164], [2021, 63, 130], [2022, 61, 138]];
const fall = rnd(((240 - 130) / 240) * 100, 1, 45.8, "fall");
const MT = tbl(["Year", "Households with at least one net (%)", "Malaria cases per 1 000 people"], M.map((m) => [m[0], m[1], m[2]]));

concept("ageo.hazard.earthquakes", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_STRUCT10 #1: earthquakes
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10, "Paper 3"),
    concepts: ["ageo.hazard.earthquakes", "ageo.hazard.eq-volcano-management"],
    hints: ["Each magnitude unit is a factor of about 31.6 in energy.", "In (c) think of buildings, warning, planning and the emergency response."],
    stem: `Insert, Table 1 shows three earthquakes in different countries (data invented for this exercise).\n\n${EQ}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Earthquake B has a magnitude 1.2 higher than earthquake A. About how many times more energy does it release? Give your answer to one decimal place (energy increases by a factor of 10^(1.5 × the magnitude difference)).", value: eRatio, dp: 1, unit: "times", wrong: [15.8, 12, 1.2],
            explanation: "Energy ratio = 10^(1.5 × 1.2) = 10^1.8 = 63.1. The value 15.8 is the amplitude ratio 10^1.2." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which earthquake killed the most people?", options: [
            ["Earthquake A", "Correct: 2 900 deaths, although it was not the largest."],
            ["Earthquake B", "It had the highest magnitude but only 220 deaths."],
            ["Earthquake C", "It had the lowest magnitude and 40 deaths."],
            ["The three earthquakes killed equal numbers of people", "The numbers differ."],
          ], answer: "A", explanation: "Earthquake A had the highest number of deaths." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the pattern of deaths.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which feature of earthquake A best explains its high number of deaths compared with C?", options: [
            ["Building codes were rarely enforced", "Correct: C was also shallow and close to a city, but its buildings met the code."],
            ["It had a lower magnitude than C", "Its magnitude (6.9) was higher than C's (6.1)."],
            ["It was deeper than C", "A (10 km) was slightly deeper than C (8 km), but the depths are similar."],
            ["It was further from the nearest city than C", "A was 15 km from a city and C 5 km; being nearer would increase the risk for C."],
          ], answer: "A", explanation: "The main difference between A and C is the enforcement of codes." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why earthquake B killed far fewer people than earthquake A although it was much larger.",
            points: ["B was deeper (35 km) and further from the nearest city (80 km), so the waves lost more energy before reaching people.", "Buildings in B's area were built to an enforced code, so they withstood the shaking."],
            modelAnswer: "B was deeper, at 35 km, and 80 km from the nearest city, so the waves lost much energy before reaching people. Its buildings were built to an enforced code, so most withstood the shaking.",
            explanation: "Depth, distance and vulnerability." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, type: "SHORT_ANSWER", stem: "Suggest how the country affected by earthquake A could reduce deaths in future earthquakes.",
        points: [
          "Enforce a building code and retrofit older buildings and schools so that they do not collapse.",
          "Plan land use: move housing off steep slopes, soft sediment and fault lines, and keep critical buildings such as hospitals in safer places.",
          "Educate the public and run drills (drop, cover and hold on) and set up early warning where possible.",
          "Train and equip emergency services for search and rescue, and plan for medical care, water and shelter.",
        ],
        modelAnswer: "The country could enforce a building code and retrofit older buildings and schools so that they do not collapse. It could plan land use so that housing is not built on steep slopes or soft ground and hospitals are in safer places. Public education and regular drills would teach people what to do, and trained and equipped emergency services would improve rescue and medical care.",
        explanation: "Reduce vulnerability by codes, planning, education and response." }),
    ]),
    explanation: "Interpret a table, apply the magnitude scale and explain the effect of vulnerability.",
  });

  // ============================================================ CAM_STRUCT10 #2: storm surge
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10, "Paper 3"),
    concepts: ["ageo.hazard.tropical-cyclones"],
    hints: ["Percentage fall = (largest − smallest) ÷ largest × 100.", "In (c) combine warning, shelter and defences."],
    stem: `Insert, Table 2 shows the maximum storm surge measured at three coastal stations after a tropical cyclone made landfall with sustained winds of 215 km/h (data invented for this exercise).\n\n${SGT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 2 and the Saffir-Simpson scale (Category 1: 119–153 km/h; 2: 154–177; 3: 178–208; 4: 209–251; 5: 252 km/h or more).",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What was the category of the cyclone at landfall?", options: [
            ["Category 4", "Correct: 215 km/h lies in the range 209–251 km/h."],
            ["Category 3", "Category 3 is 178–208 km/h."],
            ["Category 5", "Category 5 is 252 km/h or more."],
            ["Category 2", "Category 2 is 154–177 km/h."],
          ], answer: "A", explanation: "215 km/h is Category 4." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage fall in the maximum surge between station S1 and station S3.", value: surgeFall, unit: "%", wrong: [3.6, 25, 4],
            explanation: "(4.8 − 1.2) ÷ 4.8 × 100 = 75%. The value 3.6 is the fall in metres." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the surge.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What causes a storm surge?", options: [
            ["Strong onshore winds and low pressure raising sea level", "Correct: winds pile water against the coast and low pressure allows the sea to rise."],
            ["The gravitational pull of the Moon and the Sun on the cyclone", "The Moon causes tides, not storm surges."],
            ["An earthquake under the sea floor near the coast", "That causes a tsunami."],
            ["Heavy rain that runs off the land into rivers", "That causes river flooding, not the surge."],
          ], answer: "A", explanation: "Winds and low pressure raise the sea level." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Suggest why the surge is highest at S1.",
            points: ["S1 is at the landfall point, close to the eyewall, where winds are strongest and pressure lowest.", "The surge decreases along the coast as the distance from the strongest winds increases; coastal shape and shallow water may funnel water at S1."],
            modelAnswer: "S1 is at the landfall point, close to the eyewall, where winds are strongest and pressure is lowest. The surge falls along the coast as the distance from the strongest winds increases, and the shape of the coast and shallow water may funnel water at S1.",
            explanation: "Wind strength, pressure and coastal shape." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, type: "SHORT_ANSWER", stem: "Suggest how the people living near station S1 could be protected from a storm surge in the future.",
        points: [
          "Early warning with clear information on the expected height of the surge, and organised evacuation to high ground.",
          "Raised cyclone shelters strong enough to resist wind and water, within reach of the community.",
          "Coastal defences such as sea walls and embankments, and mangrove belts to reduce wave energy.",
          "Land-use planning and building design: keep new housing out of the surge zone and raise foundations, together with community education and drills.",
        ],
        modelAnswer: "People could be protected by an early warning system that gives the expected surge height with organised evacuation to high ground. Raised cyclone shelters that resist wind and water would shelter those who cannot leave. Sea walls, embankments and mangrove belts would reduce the force of the water, and planning rules would keep new housing out of the surge zone, with education and drills for the community.",
        explanation: "Warning, shelter, defences and planning." }),
    ]),
    explanation: "Classify a cyclone, calculate a change in surge and suggest protection.",
  });

  // ============================================================ CAM_STRUCT10 #3: cholera
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10, "Paper 4"),
    concepts: ["ageo.disease.cholera"],
    hints: ["Attack rate = cases ÷ population × 100.", "Think about what a high fatality rate suggests about treatment."],
    stem: `Insert, Table 3 shows cholera cases in three districts during an outbreak (data invented for this exercise).\n\n${CHT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 3.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the case fatality rate in district D2, as a percentage.", value: cfrD2, unit: "%", wrong: [60, 20, 0.05],
            explanation: "60 ÷ 1 200 × 100 = 5%." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which district had the highest percentage of its population infected (attack rate)?", options: [
            ["D2", "Correct: 1 200 ÷ 40 000 = 3%, compared with 1.2% in D1 and 0.5% in D3."],
            ["D1", "Its attack rate is 1.2%."],
            ["D3", "Its attack rate is 0.5%, the lowest."],
            ["All districts are equal", "The rates differ."],
          ], answer: "A", explanation: "D2 had an attack rate of 3%." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the pattern in D2.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What does the high case fatality rate in D2 suggest?", options: [
            ["Many patients did not receive treatment early enough", "Correct: with prompt oral rehydration the rate should be under 1%."],
            ["The bacterium is stronger in D2 than anywhere else", "The same bacterium causes cholera everywhere; the difference lies in treatment."],
            ["Cholera is always fatal in 5% of cases", "With treatment the rate can be under 1%."],
            ["Deaths from other diseases were counted as cholera deaths", "There is no evidence for this in the table."],
          ], answer: "A", explanation: "Delayed treatment raises the fatality rate." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Suggest two reasons why many people in D2 could not reach treatment early.",
            points: ["Few clinics or oral rehydration points, or long distances and poor roads or transport", "Shortage of staff, salts or drips, or fear and lack of knowledge so that people delayed seeking care"],
            modelAnswer: "There may have been few clinics or oral rehydration points, with long distances and poor roads. There may also have been shortages of staff and supplies, or people may have delayed seeking care through fear or lack of knowledge.",
            explanation: "Access, supplies and knowledge." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, type: "SHORT_ANSWER", stem: "Suggest how the authorities could reduce the number of new cases in D2.",
        points: [
          "Provide safe water: chlorinate supplies and wells and distribute chlorine tablets, and repair broken pipes.",
          "Improve sanitation: build latrines, repair sewers and collect refuse to stop faeces reaching water.",
          "Promote hand-washing and food hygiene through health education by community workers.",
          "Offer oral cholera vaccine to people in the district and set up treatment centres and surveillance to find cases early.",
        ],
        modelAnswer: "The authorities could chlorinate water supplies and wells, distribute chlorine tablets and repair broken pipes. They could build latrines, repair sewers and collect refuse to stop faeces reaching water. Health education would promote hand-washing and food hygiene. They could also offer oral cholera vaccine and set up treatment centres and surveillance to find cases early.",
        explanation: "Water, sanitation, hygiene and vaccination." }),
    ]),
    explanation: "Calculate rates, interpret a pattern and suggest controls for cholera.",
  });

  // ============================================================ CAM_STRUCT10 #4: malaria
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10, "Paper 4"),
    concepts: ["ageo.disease.malaria", "ageo.disease.monitoring-response"],
    hints: ["Percentage fall = (old − new) ÷ old × 100.", "Think about other factors that change malaria between years."],
    stem: `Insert, Table 4 shows net ownership and malaria cases in a district over five years (data invented for this exercise).\n\n${MT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 4.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in malaria cases per 1 000 people between 2018 and 2021, to one decimal place.", value: fall, dp: 1, unit: "%", wrong: [110, 84.6, 54.2],
            explanation: "(240 − 130) ÷ 240 × 100 = 45.8%. The value 110 is the fall in cases per 1 000." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What happened to net ownership and malaria cases between 2021 and 2022?", options: [
            ["Net ownership fell slightly and cases rose slightly", "Correct: ownership fell from 63% to 61% and cases rose from 130 to 138."],
            ["Net ownership rose and cases fell by a small amount again", "Ownership fell and cases rose."],
            ["Both stayed the same", "Both changed."],
            ["Net ownership fell and cases fell", "Cases rose."],
          ], answer: "A", explanation: "Nets fell by two points and cases rose by eight." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Interpret the relationship.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which statement about the data is correct?", options: [
            ["There is a negative association, but it does not prove that nets caused it", "Correct: other factors such as rainfall, spraying and treatment also changed."],
            ["Nets definitely caused every single part of the fall in malaria cases in the district", "The table shows association, not proof of cause."],
            ["There is no relationship between nets and cases", "Cases fell as net ownership rose."],
            ["Net ownership rose in every year of the table", "It fell in 2022."],
          ], answer: "A", explanation: "Association is not proof of cause." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Suggest two other factors that could explain the fall in malaria cases between 2018 and 2021.",
            points: ["Indoor residual spraying, better diagnosis and treatment, or drainage of breeding sites", "A drier or cooler period reducing mosquito numbers, or improved housing and living conditions"],
            modelAnswer: "Indoor residual spraying or better diagnosis and treatment may have reduced cases. A drier or cooler period may have reduced the number of mosquitoes.",
            explanation: "Other control measures or weather." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, type: "SHORT_ANSWER", stem: "Assess whether a programme of free net distribution alone is enough to control malaria in the district.",
        points: [
          "Nets are cost-effective and, with 55–63% ownership, cases fell, which suggests they work.",
          "But nets wear out, may not be used correctly, and mosquitoes may become resistant to the insecticide.",
          "Other measures such as spraying, rapid diagnosis and treatment, and environmental management are needed to reduce transmission further.",
          "Funding and use must be sustained, because the 2022 figures show that gains can be reversed if coverage falls.",
        ],
        modelAnswer: "Nets are cost-effective, and cases fell as ownership rose from 28% to 63%. But nets wear out, are not always used and mosquitoes may become resistant. Spraying, rapid diagnosis and treatment, and environmental management are needed as well. Funding must be sustained, because the 2022 figures show that gains can be reversed when coverage falls.",
        explanation: "Weigh the benefits of nets against their limits." }),
    ]),
    explanation: "Calculate a change, interpret an association and assess a control programme.",
  });

  // ============================================================ CAM_ESSAY20 #1: earthquakes and vulnerability
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20, "Paper 3"), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.hazard.earthquakes", "ageo.hazard.eq-volcano-management"],
    hints: ["Use two or three contrasting earthquakes with dates and rounded facts.", "Weigh hazard (magnitude, depth, secondary hazards) against vulnerability."],
    stem: "Using detailed specific examples, assess the extent to which the impacts of earthquakes depend on the vulnerability of the population rather than on the magnitude of the earthquake.",
    points: [
      "Defines impacts (deaths, injuries, damage, disruption) and vulnerability (the degree to which a population is exposed and unable to cope); states the thesis that vulnerability is the main control, with magnitude and secondary hazards setting the upper limit.",
      "Haiti, 12 January 2010: magnitude 7.0 with a shallow focus a short distance from Port-au-Prince.",
      "Haiti: estimates of deaths range from over 100 000 to over 300 000, and over a million people were made homeless.",
      "Haiti's vulnerability: the poorest country in the Americas, weak unreinforced buildings with no enforced code, and dense informal housing on slopes.",
      "Haiti's weak governance and services: government buildings and hospitals were destroyed, response was slow, and a cholera outbreak followed in October 2010.",
      "Chile, 27 February 2010: magnitude 8.8, which released about 500 times as much energy as the Haiti earthquake.",
      "Chile had about 500 deaths, a share of them from the tsunami, and most modern buildings stayed standing.",
      "Chile's low vulnerability: strict, enforced building codes updated after earlier earthquakes, higher income, trained emergency services and public education.",
      "Chile's weakness: confusion over the tsunami warning cost lives, so even prepared countries suffer from secondary hazards.",
      "Japan, 11 March 2011: magnitude 9.0 to 9.1; strong buildings resisted the shaking, but around 18 000 people died or are missing, mostly drowned by the tsunami.",
      "Japan's sea walls were overtopped and the Fukushima nuclear accident followed, showing that a very large hazard can overwhelm even good protection.",
      "Christchurch, 22 February 2011: magnitude about 6.2 and shallow, close to the city, killing 185 people, with liquefaction and the collapse of some older and poorly designed buildings, even in a rich country.",
      "Hazard factors that matter: magnitude, focal depth, distance, local ground (liquefaction) and secondary hazards such as tsunami and landslides.",
      "Sumatra–Andaman, 26 December 2004: magnitude 9.1, and about 230 000 deaths, mostly from the tsunami across the Indian Ocean, a case where magnitude and a secondary hazard combined with low warning capacity.",
      "Exposure: the density of people and the time of day affect deaths regardless of building quality.",
      "Economic impact: losses in dollars are higher in rich countries (Japan, New Zealand), but deaths are fewer; for poorer countries losses are larger as a share of national income.",
      "Recovery: wealthy countries rebuilt with insurance and state funds, whereas Haiti depended on aid and recovery was slow.",
      "Risk is hazard × vulnerability, ÷ capacity to cope, so neither factor acts alone.",
      "Vulnerability can be reduced over time by codes, planning and education, whereas the hazard cannot, which makes vulnerability the key variable for management.",
      "Conclusion: for deaths and long-term impacts vulnerability is generally the stronger control, but magnitude and secondary hazards such as tsunami set the scale of the hazard, so the answer is largely, but not wholly, vulnerability.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "The impacts of an earthquake are its deaths, injuries, damage and disruption. Vulnerability is the degree to which a population is exposed to the hazard and unable to cope with it. I argue that vulnerability is the main control on impacts, but that magnitude and secondary hazards set the scale of the hazard.\n\nThe contrast between Haiti and Chile in 2010 is the strongest evidence for vulnerability. On 12 January 2010 a magnitude 7.0 earthquake with a shallow focus struck close to Port-au-Prince. Estimates of the death toll range from over 100 000 to over 300 000, and more than a million people lost their homes. Haiti is the poorest country in the Americas; many buildings were unreinforced and there was no enforced code, and people lived at high density in informal housing on slopes. Hospitals and government buildings were destroyed, the response was slow, and a cholera outbreak followed in October. On 27 February 2010 Chile suffered a magnitude 8.8 earthquake, which released about 500 times as much energy, yet about 500 people died, some in the tsunami, and most modern buildings stayed standing. Chile has strict building codes that are enforced and updated after earlier disasters, a higher income, trained emergency services and public education. Magnitude was much greater in Chile, but vulnerability was much lower.\n\nJapan in March 2011 shows the limits of this argument. The magnitude 9.0 to 9.1 earthquake was resisted by strong buildings, but a tsunami overtopped sea walls and about 18 000 people died or are missing, most by drowning, and the Fukushima nuclear accident followed. The Sumatra–Andaman earthquake of December 2004, magnitude 9.1, caused around 230 000 deaths, mostly from a tsunami in countries with no regional warning system. In these cases the sheer magnitude and the secondary hazard of a tsunami produced the disaster, and vulnerability was important because warnings were lacking. Christchurch in February 2011 also shows that a shallow magnitude 6.2 earthquake close to a city can kill 185 people even in a wealthy country, because of liquefaction and the collapse of some older buildings. So the hazard characteristics of depth, distance, ground and secondary effects matter greatly.\n\nExposure also affects deaths: the density of population and the time of day decide how many are in dangerous buildings. Economic losses in dollars are larger in rich countries, but their deaths are fewer, and wealth lets them recover faster through insurance and state funds, whereas Haiti depended on aid and recovered slowly.\n\nRisk can be seen as the hazard multiplied by vulnerability and divided by the capacity to cope, so neither acts alone. However, vulnerability is the factor that societies can change, through codes, land-use planning, warnings and education, whereas the hazard cannot be changed. This explains why a magnitude 8.8 earthquake in Chile killed far fewer people than a magnitude 7.0 earthquake in Haiti.\n\nThe record of management also supports this view. Chile's rules for the design of buildings were tightened after earlier earthquakes and again after 2010, and tsunami evacuation maps and drills are common in coastal towns. In Haiti the cost of rebuilding to a safe standard was far beyond the means of most households, so many families had little choice but to rebuild with similar materials. This shows that vulnerability is not fixed: it is created by poverty, governance and past decisions, and it can be reduced by investment over time, whereas no investment can remove the hazard itself.\n\nIn conclusion, the impacts of earthquakes depend largely on vulnerability, as the contrast between Haiti and Chile shows, but magnitude, depth and secondary hazards such as tsunami set the scale of the hazard and can overwhelm even well-prepared societies, as in Japan. The extent is therefore large but not complete.",
    explanation: "Contrast real earthquakes, weigh hazard against vulnerability and judge the extent.",
  });

  // ============================================================ CAM_ESSAY20 #2: management of tropical cyclones
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20, "Paper 3"), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.hazard.tropical-cyclones"],
    hints: ["Use Bangladesh and Mozambique (Cyclone Idai, 2019) with dated facts.", "Judge strategies by effectiveness, cost, equity and sustainability."],
    stem: "Using detailed specific examples of at least two countries, evaluate the success of strategies for managing the hazards from tropical cyclones.",
    points: [
      "Defines management strategies (forecasting and warning, evacuation and shelters, defences, land-use and building design, education, recovery) and names the countries: Bangladesh and Mozambique (with a reference to the Philippines).",
      "Bangladesh is highly vulnerable: a low-lying delta, a funnel-shaped Bay of Bengal that raises surges, and a dense population.",
      "The Bhola cyclone of November 1970 killed an estimated 300 000 people, and a cyclone in April 1991 killed about 140 000.",
      "The Cyclone Preparedness Programme, started in the early 1970s, uses trained volunteers who spread warnings by flags, megaphones and radio to the villages.",
      "Thousands of raised multipurpose cyclone shelters have been built, together with coastal embankments and mangrove planting to reduce surge and wave energy.",
      "Cyclone Sidr in November 2007 killed about 3 400 people, far fewer than in 1970 or 1991, which shows large progress.",
      "In Cyclone Amphan in May 2020 more than two million people were evacuated in Bangladesh and deaths were low compared with earlier storms.",
      "Limits in Bangladesh: shelters do not hold everyone, some people refuse to leave homes and livestock, embankments erode, maintenance is costly, and sea-level rise and salinisation threaten livelihoods.",
      "Mozambique, Cyclone Idai, March 2019: landfall near Beira on the night of 14 March with strong winds, a storm surge and heavy rain that flooded the Buzi and Pungwe plains.",
      "More than a thousand deaths occurred across Mozambique, Zimbabwe and Malawi, and tens of thousands were displaced.",
      "Idai's management failures: warnings were issued but did not reach everyone or explain the flood risk, and there were few raised shelters and weak, low-lying housing in a poor country.",
      "Roads and bridges were destroyed, delaying rescue, and a cholera outbreak followed in Beira, showing weak water and sanitation.",
      "Response: national and international aid agencies carried out rescue, and Cyclone Kenneth struck northern Mozambique six weeks later, in April 2019, showing the repeated burden on recovery.",
      "Success factors in Bangladesh: decades of sustained investment, community volunteers, shelters and political commitment, supported by donors.",
      "Early warning systems and education are low-cost and save the most lives per dollar, whereas structural defences are costly and may fail if overtopped.",
      "Equity: the poorest and those living on remote islands or in flood plains benefit least from shelters and defences.",
      "Sustainability: strategies need maintenance and funding, which in Mozambique relies heavily on donors.",
      "Climate change is expected to raise rainfall rates, surge heights and the share of the strongest storms, so existing strategies may become less effective.",
      "Haiyan (Philippines, 2013) with over 6 000 deaths showed that warnings fail if people do not understand the danger of a storm surge.",
      "Conclusion: management has been very successful in Bangladesh but less so in Mozambique, so success depends on long-term investment, community involvement and resources; strategies work best when combined.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Strategies for managing tropical cyclones include forecasting and warning, evacuation and shelters, coastal defences, land-use and building design, education and recovery. I evaluate them using Bangladesh and Mozambique, and I argue that success depends mainly on long-term investment and community involvement.\n\nBangladesh is highly vulnerable. It is a low-lying delta, the funnel shape of the Bay of Bengal raises storm surges, and the population is dense. The Bhola cyclone of November 1970 killed an estimated 300 000 people, and a cyclone in April 1991 killed about 140 000. After 1970 the country started the Cyclone Preparedness Programme, in which trained volunteers pass warnings to villages by flags, megaphones and radio. Thousands of raised multipurpose cyclone shelters have been built, along with coastal embankments and mangrove belts that reduce the energy of the surge and waves. The results are striking. Cyclone Sidr in November 2007 killed about 3 400 people, far fewer than in 1970 or 1991, and in May 2020 more than two million people were evacuated before Cyclone Amphan, with deaths low compared with earlier storms. This shows that warnings, shelters and community organisation can save very large numbers of lives. There are limits: shelters do not hold everyone, some people will not leave their homes and livestock, embankments erode and need costly maintenance, and sea-level rise and salinisation threaten livelihoods.\n\nMozambique shows the problems of a poorer country. Cyclone Idai made landfall near Beira on the night of 14 March 2019, bringing strong winds, a storm surge and heavy rain that flooded the Buzi and Pungwe plains. More than a thousand people died across Mozambique, Zimbabwe and Malawi, and tens of thousands were displaced. Warnings were issued, but they did not reach everyone or explain the flood risk, there were few raised shelters, and much of the housing was weak and low-lying. Roads and bridges were destroyed, which delayed rescue, and cholera broke out in Beira, showing poor water and sanitation. Cyclone Kenneth struck the north of the country only six weeks later, in April 2019, so recovery was repeatedly interrupted. Aid agencies assisted, but Mozambique depends heavily on donor funding, which is hard to sustain.\n\nComparing the two, Bangladesh succeeded because of decades of investment, a network of volunteers, shelters and political commitment, supported by donors. Early warning and education are relatively cheap and save the most lives per dollar, whereas structural defences are expensive and fail if they are overtopped. The poorest people, such as those on remote islands or flood plains, benefit least from shelters and defences, so equity is a problem. Haiyan in the Philippines in 2013, with over 6 000 deaths, showed that a warning fails if people do not understand the danger of a storm surge. Climate change is expected to increase rainfall rates, surge heights and the share of the strongest storms, so strategies that work now may become less effective.\n\nThe costs and benefits of the strategies also differ. Early warning and community education are cheap relative to their benefits, whereas sea walls and shelters need large amounts of capital and regular repair. Mangrove planting is relatively inexpensive and brings other benefits such as fish nursery areas and protection from erosion, although mangroves cannot stop a very large surge. Strategies are most effective when they are combined with land-use rules that keep new housing out of the most exposed areas, which is difficult where land is scarce and people have few choices.\n\nIn conclusion, management has been very successful in Bangladesh, but much less so in Mozambique. Success depends on sustained investment, community involvement and resources, and the strategies work best when combined. Even in Bangladesh success is conditional on maintenance and adaptation to a changing climate.",
    explanation: "Evaluate real strategies in two countries and judge the conditions for success.",
  });

  // ============================================================ CAM_ESSAY20 #3: pandemic responses and wealth
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20, "Paper 4"), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.disease.pandemic-eradication", "ageo.disease.monitoring-response"],
    hints: ["Use two contrasting countries, for example New Zealand and Zimbabwe, with dates.", "Weigh wealth against geography, trust, demography and timing."],
    stem: "Using detailed specific examples of two contrasting countries, assess the extent to which the success of a country's response to a pandemic depends on its wealth.",
    points: [
      "Defines a pandemic response (borders, testing and tracing, lockdowns, treatment, vaccination, communication) and success (limiting deaths and economic damage), and names New Zealand and Zimbabwe with COVID-19.",
      "New Zealand: the first case was on 28 February 2020; entry for most non-residents was barred from 19 March and a Level 4 national lockdown began on 25 March 2020.",
      "New Zealand's elimination strategy included managed isolation of all returning travellers from April 2020, testing and contact tracing, and community transmission was declared over in June 2020.",
      "New Zealand's wealth allowed a wage subsidy scheme and business support, so people could afford to stay at home.",
      "Its health system and public health agencies could expand testing, tracing and intensive care capacity.",
      "Outcome in New Zealand: very few deaths in 2020 and 2021; vaccination began in February 2021 and the elimination strategy was relaxed in late 2021 as vaccination rose and the Delta and Omicron variants arrived.",
      "New Zealand's success also depended on geography: an island with few entry points and a small population made border control and tracing possible.",
      "Trust and leadership: clear public communication and strong public compliance in New Zealand.",
      "Zimbabwe: the first case was on 20 March 2020 and a national lockdown began on 30 March, with schools and borders closed, showing early action in a poorer country.",
      "Zimbabwe's limits: limited testing and tracing capacity, shortages of protective equipment and intensive care beds, and concerns from health workers about conditions.",
      "A large informal economy: most workers depend on daily income, so lockdowns caused hardship, there was little state support, and restrictions were eased in phases.",
      "Water shortages and crowded housing in high-density suburbs made hand-washing and distancing difficult.",
      "Vaccination in Zimbabwe began in February 2021 with doses donated by China, and later supplies came from donations and COVAX, in phases and in smaller amounts than in rich countries.",
      "Zimbabwe reported over 5 000 deaths (WHO, rounded), probably an underestimate because of limited testing.",
      "Other factors in Zimbabwe: a much younger population, which tends to reduce deaths, and land borders with returning workers, which made border control difficult.",
      "Similarities show that wealth is not the only factor: both closed borders and locked down within weeks, and began vaccination in the same month.",
      "Wealth also did not guarantee success elsewhere: some wealthy countries recorded high death tolls, owing to delays, low trust or health system pressure.",
      "Global inequality in vaccine supply, because rich countries bought early, is itself an effect of wealth.",
      "Data are uncertain: reported deaths depend on testing and registration, so comparisons must be made with care.",
      "Conclusion: wealth gave New Zealand options such as elimination, income support and testing capacity, so it was a major factor, but geography, size, trust, timing and demography were also essential, so the success depended on wealth to a large but not complete extent.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "A pandemic response consists of border controls, testing and tracing, lockdowns, treatment, vaccination and communication. I define success as limiting deaths and economic damage. Using New Zealand and Zimbabwe in the COVID-19 pandemic, I argue that wealth was a major factor, but not the only one.\n\nNew Zealand recorded its first case on 28 February 2020. Entry for most non-residents was barred from 19 March and a Level 4 national lockdown began on 25 March 2020. Its strategy was elimination: all returning travellers were placed in managed isolation from April, and testing and contact tracing were extensive, so community transmission was declared over in June 2020. Wealth helped in several ways. The government paid a wage subsidy and supported businesses, so people could afford to stay at home, and the health system and public agencies could expand testing, tracing and intensive care. Deaths were very few in 2020 and 2021. Vaccination began in February 2021, and the elimination strategy was relaxed in late 2021 as vaccination rose and the Delta and Omicron variants arrived. However, New Zealand's success also reflected geography, since an island with few entry points and a small population is easier to control, and trust in clear leadership produced high compliance.\n\nZimbabwe recorded its first case on 20 March 2020 and began a national lockdown on 30 March, with schools and borders closed. That is early action in a poorer country. But its limits were severe. Testing and tracing capacity were limited, protective equipment and intensive care beds were short, and health workers raised concerns about conditions. Most workers are in the informal economy and depend on daily income, so lockdown caused hardship, there was little state support to replace incomes, and restrictions were eased in phases. Water shortages and crowded housing in high-density suburbs made hand-washing and distancing difficult. Vaccination began in February 2021 with doses donated by China, and later supplies came from donations and COVAX, in smaller amounts than in rich countries. Zimbabwe reported over 5 000 deaths, according to rounded WHO figures, probably an underestimate because of limited testing. Zimbabwe's younger population probably reduced deaths, while its land borders and the movement of workers made border control hard.\n\nThe similarities show that wealth is not the only factor. Both countries closed borders and imposed lockdowns within weeks of the first case, and both began vaccination in the same month. Wealth also did not guarantee success elsewhere, because some wealthy countries recorded high death tolls owing to delay, low trust or pressure on hospitals. Yet wealth did shape the options: it allowed New Zealand to pursue elimination, support incomes and buy vaccines early, while global inequality in vaccine supply was itself an effect of wealth. Comparisons must be made with care, as reported deaths depend on testing and registration.\n\nPublic trust also mattered in both countries: where people believe official advice they are more likely to follow restrictions, but where incomes are very low trust alone cannot make staying at home affordable, so wealth and trust work together.\n\nThe effects of timing and information should not be overlooked. Both governments acted while the number of recorded cases was still small, which is the most effective time to act. But the quality of information differed: New Zealand's testing and tracing gave early evidence of where the virus was, whereas in Zimbabwe limited testing meant that decisions had to be made with incomplete data. Wealth therefore also worked by improving the information on which policy depended.\n\nIn conclusion, wealth was a major factor in the success of New Zealand's response, since it gave the country options and the means to support people, but geography, size, trust, timing and demography were also essential. The success of a response therefore depends on wealth to a large but not complete extent.",
    explanation: "Compare two real responses, weigh wealth against other factors and judge the extent.",
  });

  // ============================================================ CAM_ESSAY20 #4: polio eradication
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20, "Paper 4"), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.disease.pandemic-eradication"],
    hints: ["Use the Global Polio Eradication Initiative with dates and rounded figures.", "Cover achievements, obstacles, benefits and costs, and the risk of re-emergence."],
    stem: "Using a detailed specific example of a global programme to eradicate a pathogenic disease, evaluate its success and assess the likelihood that the disease could re-emerge.",
    points: [
      "Defines eradication (permanent zero incidence worldwide) and names the Global Polio Eradication Initiative, launched in 1988 by the WHO, Rotary International, UNICEF and the US Centers for Disease Control, later joined by Gavi and the Gates Foundation.",
      "Methods: routine immunisation and mass campaigns with oral polio vaccine, house-to-house and mop-up vaccination, and surveillance of paralysis cases and sewage.",
      "Achievement: cases have fallen by more than 99% from an estimated 350 000 a year in 125 countries in 1988.",
      "Wild poliovirus type 2 was declared eradicated in 2015 and type 3 in 2019.",
      "The WHO African region, including Nigeria, the last endemic country in Africa, was certified free of wild polio in August 2020, a success in a poor and conflict-affected region.",
      "The oral vaccine is cheap, easy to give, and spreads immunity in communities, which suits mass campaigns in poor countries.",
      "Benefits beyond polio: the surveillance networks, laboratories and trained staff have been used for Ebola, measles and COVID-19.",
      "Obstacles: wild poliovirus type 1 remains in Afghanistan and Pakistan, where insecurity, attacks on vaccinators, mistrust and mobile populations make access hard.",
      "Silent infections: only about one in 200 infections causes paralysis, so many carriers go unnoticed and surveillance needs sewage testing.",
      "Vaccine-derived polioviruses: the weakened live virus in the oral vaccine can mutate and spread where immunity is low, causing outbreaks in countries such as Nigeria and the Democratic Republic of the Congo.",
      "A new oral vaccine for type 2 (introduced 2021) was developed to reduce this risk.",
      "Funding and deadlines: the original target date of 2000 was missed repeatedly, and costs have been billions of US dollars over decades.",
      "Disruption: the COVID-19 pandemic interrupted vaccination campaigns in 2020, leaving more children unprotected.",
      "Critics argue that money would be better spent strengthening routine immunisation and primary health care; supporters reply that polio work builds those systems.",
      "Contrast with smallpox, eradicated in 1980: it had visible symptoms and no animal reservoir, and its vaccine gave lasting immunity, so it was easier than polio.",
      "Re-emergence risk 1: if vaccination coverage falls through conflict, displacement or distrust, unprotected children allow the virus to spread again.",
      "Re-emergence risk 2: imported cases, such as the wild poliovirus type 1 case in Malawi in 2022 linked to Pakistan, and vaccine-derived virus found in sewage in London and New York in 2022 with one paralytic case in New York.",
      "Risk 3: weak surveillance in some regions may hide transmission for months.",
      "Likelihood depends on coverage, surveillance, security and funding, and is higher in places with low coverage and conflict, and low where coverage is maintained.",
      "Conclusion: the programme has been a major but incomplete success, with the last step the hardest; the disease could re-emerge in under-vaccinated areas, so gains are fragile until global eradication is certified and vaccination continues.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Eradication means the permanent reduction of the worldwide incidence of a disease to zero. The Global Polio Eradication Initiative was launched in 1988 by the WHO, Rotary International, UNICEF and the US Centers for Disease Control, later joined by Gavi and the Gates Foundation. I argue that it has been a major but incomplete success, and that polio could re-emerge where immunity falls.\n\nThe programme uses routine immunisation and mass campaigns with oral polio vaccine, house-to-house and mop-up vaccination around cases, and surveillance of children with sudden paralysis and of sewage. The achievements are large. Cases have fallen by more than 99 per cent from an estimated 350 000 a year in 125 countries in 1988. Wild poliovirus type 2 was declared eradicated in 2015 and type 3 in 2019. In August 2020 the WHO African region, including Nigeria, the last endemic country in Africa, was certified free of wild polio, a success in a poor and conflict-affected region. The oral vaccine is cheap, easy to give and spreads immunity in communities, which suits mass campaigns. The programme has also built surveillance networks, laboratories and trained staff that have been used for Ebola, measles and COVID-19.\n\nHowever, there are major obstacles. Wild poliovirus type 1 remains in Afghanistan and Pakistan, where insecurity, attacks on vaccinators, mistrust of campaigns and mobile populations make access difficult. Only about one infection in 200 causes paralysis, so many carriers go unnoticed and sewage testing is needed. The weakened live virus in the oral vaccine can mutate and spread where immunity is low, causing outbreaks of vaccine-derived polio in countries such as Nigeria and the Democratic Republic of the Congo, and a new oral vaccine for type 2 was introduced in 2021 to reduce this risk. The original target date of 2000 was missed repeatedly and the cost has been billions of dollars. The COVID-19 pandemic interrupted campaigns in 2020, leaving more children unprotected. Critics argue that the money would be better spent on routine immunisation and primary health care, but supporters answer that polio work builds those systems. Compared with smallpox, eradicated in 1980, polio is harder, because smallpox had visible symptoms and no animal reservoir and its vaccine gave lasting immunity.\n\nThe disease could re-emerge in three ways. If vaccination coverage falls because of conflict, displacement or distrust, unprotected children allow the virus to spread again. Cases can be imported: a case of wild poliovirus type 1 in Malawi in 2022 was linked to Pakistan, and vaccine-derived virus was found in sewage in London and New York in 2022, with one paralytic case in New York. Weak surveillance in some regions may also hide transmission for months. The likelihood depends on coverage, surveillance, security and funding; it is high where coverage is low and conflict continues, and low where high coverage is maintained.\n\nThe cost has been justified by the paralysis prevented in children each year, but funding shortfalls have repeatedly forced the programme to reduce its campaigns, which shows how dependent it is on sustained donor commitment.\n\nThe methods of the programme also offer lessons for other diseases. Using local vaccinators and community and religious leaders has been the most successful way of reaching families who are suspicious of campaigns, and mapping settlements with geographic information systems has helped to find communities that earlier campaigns missed. The programme has also shown that eradication depends on the weakest area: a few under-vaccinated districts can keep the virus alive, however high the coverage elsewhere.\n\nIn conclusion, the programme has been a major but incomplete success. Its last step is the hardest, and polio could return to under-vaccinated areas, so the gains are fragile until global eradication is certified and vaccination continues.",
    explanation: "Balance achievements, obstacles, costs and benefits and judge the risk of re-emergence.",
  });
});
