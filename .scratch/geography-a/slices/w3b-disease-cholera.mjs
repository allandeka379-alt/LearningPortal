// W3b: disease.cholera (both boards: ZIMSEC Form 5; Cambridge A Level Paper 4 option 14). Data are illustrative (invented for this exercise); every number is computed in code.
// Real figures (Zimbabwe 2008-09) are WHO figures, rounded: about 98 600 cases and 4 300 deaths.
import { concept, P, geographyLevels, chk, rnd, spearman, sum, dpStr } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const cfrZ = rnd((4300 / 98600) * 100, 1, 4.4, "cfrZ");
const dbl = chk(40 * 2 ** 4, 640);
const ors = chk(150 * 0.8, 120, 1e-9);
// Struct A
const PRV = [["P1", 24000, 960], ["P2", 9000, 450], ["P3", 6000, 120]];
const cfrP2 = chk((450 / 9000) * 100, 5, 1e-9);
const cfrP3 = chk((120 / 6000) * 100, 2, 1e-9);
chk((960 / 24000) * 100, 4, 1e-9);
const PT = tbl(["Province", "Cholera cases", "Deaths"], PRV.map((r) => [r[0], String(r[1]).replace(/(\d)(\d{3})$/, "$1 $2"), r[2]]));
// Struct B: Spearman
const X = [88, 74, 67, 60, 52, 45, 38, 30, 22, 15];
const Y = [4, 9, 7, 16, 25, 22, 33, 31, 47, 58];
const sp = spearman(X, Y);
chk(sp.sumD2, 324);
const rs = rnd(sp.rs, 3, -0.964, "rs");
const mt = (x) => dpStr(x, 3).replace("−", "-");
const ST = tbl(["District", ...X.map((_, i) => String.fromCharCode(65 + i))], [["Households with a latrine (%)", ...X], ["Cholera cases per 10 000 people", ...Y]]);

concept("ageo.disease.cholera", { file: "disease/cholera", keyPrefix: "disease.cholera" }, (b) => {
  mc(b, 2, "RECALL", "What is the main route of transmission of cholera?", [
    ["Faecal–oral, through contaminated water or food", "Correct: bacteria in faeces reach drinking water or food."],
    ["The bite of an infected mosquito", "That is the route for malaria."],
    ["Droplets spread by coughing in a crowded room or bus", "That describes influenza and tuberculosis."],
    ["Sexual contact and the sharing of needles", "That describes HIV and hepatitis B."],
  ], "Cholera spreads by the **faecal–oral route**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which treatment saves most cholera patients?", [
    ["Oral rehydration solution to replace lost fluids and salts", "Correct: dehydration is the cause of death, so replacing fluid is the key treatment."],
    ["Surgery to remove the infected part of the small intestine of patients", "Surgery is not used for cholera."],
    ["Spraying the patient's home with insecticide", "Insecticide is used against mosquitoes, not cholera."],
    ["A long period of rest in a cool, dry room", "Rest does not replace fluids."],
  ], "**Oral rehydration** replaces fluid and salts and saves most patients.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why does cholera often follow floods?", [
    ["Floodwater spreads sewage into water sources and damages sanitation", "Correct: drinking water becomes contaminated."],
    ["Floods carry mosquitoes into houses that are not protected by screens or nets", "Mosquitoes do not cause cholera."],
    ["Cold floodwater makes the bacteria stronger", "Temperature is not the main factor."],
    ["Floods stop people from eating any food for several days", "Not eating is not the cause."],
  ], "Floods **mix sewage with drinking water**.");
  mc(b, 3, "ANALYSIS", "Why is a case fatality rate of more than 4% in a cholera epidemic a sign of problems?", [
    ["The rate should be under 1% with care, so many lacked treatment", "Correct: deaths show gaps in treatment, not just in the disease."],
    ["Cholera always kills more than 4% of those it infects, even with treatment", "With treatment the case fatality rate can be under 1%."],
    ["The rate counts the deaths of people who did not have cholera", "The rate counts only deaths among cases."],
    ["High rates show that the water has too much chlorine", "Chlorine reduces the risk."],
  ], "Case fatality should be **under 1%** with proper treatment.", { hints: ["What does early rehydration do?"] });
  mc(b, 3, "APPLICATION", "Which measure gives the most lasting protection against cholera in a high-density suburb?", [
    ["Providing safe piped water and a working sewage system", "Correct: it removes the cause, not just the symptoms."],
    ["Treating patients with oral rehydration after they fall ill", "This reduces deaths but does not stop transmission."],
    ["Telling residents to avoid all contact with other people", "This is impractical and does not remove the source."],
    ["Closing the schools in the suburb for a few weeks", "This does not remove the contaminated water."],
  ], "Prevention through **infrastructure** is the most lasting solution.", { hints: ["Which option removes the cause?"] });
  mc(b, 3, "ANALYSIS", "In an epidemic, why are people in informal settlements at higher risk than those in wealthy suburbs?", [
    ["They share water points, with poor sanitation and crowding", "Correct: shared contaminated sources spread infection quickly."],
    ["They have a higher natural resistance to the bacterium", "Poverty and malnutrition lower resistance, not raise it."],
    ["They live too far from rivers for the bacteria to reach them", "Distance from rivers does not protect them."],
    ["They do not travel, so the disease never spreads to them", "People travel for work and trade."],
  ], "**Shared water, poor sanitation and crowding** increase risk.", { hints: ["Think of water and toilets."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Most people infected with the cholera bacterium become severely ill.", answer: false,
    feedbackTrue: "Not so: many infected people have mild or no symptoms.", feedbackFalse: "Correct: many infections are mild or without symptoms, but the severe cases need urgent care.",
    explanation: "Many infections are **mild**, but a minority become severe and need urgent treatment." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each measure to the way it helps to control cholera.",
    pairs: [
      ["Chlorination of water", "Kills bacteria in drinking water"],
      ["Oral rehydration", "Replaces lost fluid and salts"],
      ["Handwashing with soap", "Reduces transfer of bacteria to food and mouths"],
      ["Oral cholera vaccine", "Gives protection for a few years in outbreak areas"],
      ["Latrines and sewers", "Keep faeces away from water supplies"],
    ], explanation: "Each measure interrupts a stage of transmission or reduces deaths." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Cholera is caused by a {{blank:a}} and spreads through the {{blank:b}} route. Patients are treated with oral {{blank:c}} solution.",
    blanks: [
      { id: "a", accepted: ["bacterium"], choices: ["bacterium", "virus", "parasite"] },
      { id: "b", accepted: ["faecal–oral"], choices: ["faecal–oral", "airborne", "vector-borne"] },
      { id: "c", accepted: ["rehydration"], choices: ["rehydration", "vaccination", "chlorination"] },
    ], explanation: "A bacterium, faecal–oral spread and oral rehydration." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of organism that causes cholera: a virus, a bacterium or a parasite.",
    accepted: ["bacterium", "a bacterium", "bacteria", "bacterial"],
    explanation: "Cholera is caused by the **bacterium** *Vibrio cholerae*." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Rounded World Health Organization figures for the Zimbabwe cholera epidemic of 2008–09 are about 98 600 cases and about 4 300 deaths. Calculate the case fatality rate, to one decimal place.",
    hints: ["Deaths ÷ cases × 100."],
    value: cfrZ, dp: 1, wrong: [43, 0.4, 22.9],
    explanation: "4 300 ÷ 98 600 × 100 = **4.4%**. The value 22.9 is cases per death (98 600 ÷ 4 300)." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "At the start of an outbreak a district has 40 cases. The number of cases doubles every 3 days. If nothing is done, how many cases would there be after 12 days?",
    hints: ["How many times does the number double in 12 days?"],
    value: dbl, wrong: [160, 480, 1280],
    explanation: "12 ÷ 3 = 4 doublings, so 40 × 2⁴ = **640** cases. Multiplying 40 by 4 gives only 160." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "A cholera treatment centre has 150 patients. About 80% of them can be treated with oral rehydration alone. How many patients is that?",
    hints: ["80% of 150."],
    value: ors, wrong: [30, 187.5, 80],
    explanation: "0.80 × 150 = **120** patients. The value 30 is the number who need drip treatment (the other 20%)." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how cholera is spread in an informal settlement with no sewers.",
    points: [
      "Faeces from infected people contain the bacteria and enter the ground and shallow water near the houses.",
      "Water from shallow wells or streams, and food washed in it, becomes contaminated and is drunk or eaten.",
      "Crowding, shared water points and unwashed hands pass the bacteria quickly from household to household.",
    ],
    modelAnswer: "Faeces from infected people contain the bacteria and enter the ground and shallow wells near the houses. Water from the wells or streams, and food washed in it, becomes contaminated. Crowding, shared water points and unwashed hands pass the bacteria from household to household.",
    explanation: "Source, route and crowding." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the cholera epidemic in Zimbabwe in 2008–09 began in the high-density suburbs of Harare and Chitungwiza.",
    hints: ["Think of the water and sewage systems, and the rains."],
    points: [
      "Water treatment plants lacked chemicals and equipment, and supplies were interrupted, so people used unprotected wells and streams.",
      "Sewers burst and refuse was not collected, so waste contaminated water sources.",
      "Population density in the suburbs was high, with shared water points and crowded housing.",
      "The health system was weakened, so early cases were not treated quickly, and the rains and gatherings such as funerals helped the spread.",
    ],
    modelAnswer: "Water treatment plants lacked chemicals and equipment, so people used unprotected wells and streams. Sewers burst and refuse was not collected, which contaminated water sources. The suburbs were densely populated with shared water points. The health system was weak so early cases were not treated quickly, and the rains and funerals helped the spread.",
    explanation: "Infrastructure failure, density and weak health care.", applies: ["zimsec"] });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why cholera outbreaks often occur after a tropical cyclone.",
    hints: ["Think of water, shelters and health services."],
    points: [
      "Flooding spreads sewage and contaminates wells and rivers.",
      "Pipes, pumps and treatment plants are damaged, so safe water is cut off.",
      "People are displaced into crowded shelters with few toilets.",
      "Roads and clinics are damaged, so patients are treated late and the disease spreads.",
    ],
    modelAnswer: "Flooding spreads sewage and contaminates wells and rivers. Damaged pipes, pumps and treatment plants cut off safe water. People are displaced into crowded shelters with few toilets, and damaged roads and clinics delay treatment.",
    explanation: "Contamination, damaged supplies, crowding and delayed care." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess whether oral cholera vaccination alone can end cholera outbreaks.",
    hints: ["Think about how long protection lasts and the causes."],
    points: [
      "Vaccination reduces illness quickly and is useful in an outbreak or in high-risk areas.",
      "Protection lasts only a few years and supplies may be limited, so it cannot cover everyone.",
      "It does not remove the causes (unsafe water and poor sanitation), so outbreaks will recur unless infrastructure is improved.",
    ],
    modelAnswer: "Vaccination reduces illness quickly and is useful in an outbreak. But protection lasts only a few years and supplies are limited. It does not remove the causes, which are unsafe water and poor sanitation, so outbreaks will recur unless these are improved.",
    explanation: "Short-term tool, long-term cause." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives cholera data for three provinces (illustrative data, invented for this exercise).\n\n${PT}`,
    hints: ["CFR = deaths ÷ cases × 100.", "Higher CFR suggests less access to early treatment."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the case fatality rate in province P2, as a percentage.", value: cfrP2, unit: "%", wrong: [450, 20, 0.05],
        explanation: "450 ÷ 9 000 × 100 = 5%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which province probably had the best access to early treatment?", options: [
        ["P3", "Correct: it has the lowest case fatality rate (2%)."],
        ["P1", "Its case fatality rate is 4%."],
        ["P2", "It has the highest case fatality rate (5%)."],
        ["None of them, as the rates are equal", "The rates differ."],
      ], answer: "A", explanation: "A lower CFR points to better access to treatment." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest reasons why the case fatality rate was so much higher in P2 than in P3.",
        points: ["Clinics and treatment centres may be far away or few, so patients arrive late.", "Shortages of oral rehydration salts, drips, staff or transport.", "Poor roads or floods that block access, and higher levels of malnutrition and poverty."],
        modelAnswer: "Clinics may be far away or few, so patients arrive late. There may be shortages of oral rehydration salts, drips and staff. Poor roads or floods may block access, and higher levels of malnutrition lower resistance.",
        explanation: "Access, supplies and vulnerability." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two actions to lower the case fatality rate in P2.",
        points: ["Set up oral rehydration points and treatment centres in villages, supplied with salts and trained staff.", "Educate people to seek help at once and improve transport, such as ambulances or community volunteers."],
        modelAnswer: "Set up oral rehydration points and treatment centres in villages, with supplies and trained staff. Educate people to seek help at once and improve transport.",
        explanation: "Bring treatment closer and speed up access." }),
    ], explanation: "Calculate a rate, interpret and suggest how to reduce deaths." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A student investigates whether cholera is less common where more households have latrines. Data for ten districts (illustrative, invented for this exercise).\n\n${ST}\n\nThe student uses Spearman's rank correlation coefficient, $r_s = 1 - \\dfrac{6\\sum d^2}{n^3 - n}$. The critical value at the 0.05 significance level for 10 pairs is 0.648.`,
    hints: ["Rank both rows from the smallest (1) to the largest, then find d and d².", "Compare |r_s| with 0.648."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State a null hypothesis and an alternative hypothesis for the test.",
        points: ["H₀: there is no relationship between latrine coverage and cholera cases per 10 000 people", "H₁: districts with higher latrine coverage have fewer cholera cases (a negative relationship)"],
        modelAnswer: "H₀: there is no relationship between latrine coverage and the number of cholera cases per 10 000. H₁: districts with higher latrine coverage have fewer cases.",
        explanation: "The null hypothesis states no relationship." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Rank both sets of data (smallest = 1) and calculate Σd².", value: sp.sumD2, wrong: [162, 0, 10],
        explanation: `Ranks of latrines (x): ${sp.rows.map((r) => r.rx).join(", ")}; ranks of cases (y): ${sp.rows.map((r) => r.ry).join(", ")}. d²: ${sp.rows.map((r) => r.d2).join(", ")}; the sum is ${sp.sumD2}.` }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "Calculate r_s, to three decimal places (include the sign).", value: rs, dp: 3, wrong: [0.964, 1.964],
        explanation: `r_s = 1 − 6 × 324 ÷ (10³ − 10) = 1 − 1 944 ÷ 990 = ${mt(rs)}. Forgetting the sign gives +0.964.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which conclusion is correct at the 0.05 level?", options: [
        ["There is a significant strong negative relationship", "Correct: |−0.964| exceeds 0.648."],
        ["There is a significant strong positive relationship", "The sign is negative."],
        ["There is no significant relationship", "The value exceeds the critical value."],
        ["The relationship is positive and not significant", "The value is negative and significant."],
      ], answer: "A", explanation: "Reject H₀: more latrines, fewer cases." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far the result shows that building latrines will reduce cholera.",
        points: ["The strong negative correlation fits the explanation that latrines keep faeces away from water, so transmission falls.", "But correlation does not prove cause: richer districts have more latrines and also more piped water, better hygiene and clinics.", "Ten districts is a small sample, and district averages can hide differences within a district.", "A pilot of building latrines with monitoring of cases, together with water and hygiene improvements, would provide stronger evidence."],
        modelAnswer: "The strong negative correlation fits the explanation that latrines keep faeces away from water, so transmission falls. But correlation does not prove cause, because districts with more latrines are probably richer and also have piped water, better hygiene and clinics. Ten districts is a small sample and averages hide differences. A pilot with monitoring of cases would give stronger evidence.",
        explanation: "Use the result, but judge cause and sample." }),
    ], explanation: "Test for a relationship with Spearman's rank correlation and interpret it." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of the response to the cholera epidemic in Zimbabwe in 2008–09 and the measures taken to prevent further outbreaks.",
    hints: ["Separate emergency response from long-term prevention."],
    points: [
      "Scale of the epidemic: nearly 100 000 cases and over 4 000 deaths (WHO, rounded), a case fatality rate above 4%, with spread to every province and to neighbouring countries.",
      "Causes: failure of water treatment and sewage systems, uncollected refuse, a weak health system, rains and crowding.",
      "Emergency response: declaration of an emergency in December 2008, cholera treatment centres, oral rehydration points, chlorine and water purification tablets by UNICEF, WHO, the Red Cross and MSF.",
      "Success: treatment brought the case fatality rate down and the epidemic declined during 2009.",
      "Limits: the response came late; many people died before treatment; and the underlying water and sewage systems could not be fixed quickly.",
      "Prevention: repair of water and sewage systems and boreholes, health clubs and hygiene education, oral cholera vaccine in outbreaks (Harare, 2018).",
      "Recurrence: outbreaks in 2018 and 2023–24 show that the causes remain, since funding for municipal water and sanitation is limited.",
      "Judgement: the emergency response limited the deaths, but long-term prevention has been weaker, so success was partial.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The epidemic was severe: nearly 100 000 cases and over 4 000 deaths, according to rounded WHO figures, with a fatality rate above 4 per cent and spread across the country and to neighbouring states. It was caused by the failure of water treatment and sewage systems, uncollected refuse, a weak health system, rains and crowding. The emergency response was partly successful: an emergency was declared in December 2008, and agencies such as UNICEF, WHO, the Red Cross and MSF set up treatment centres and oral rehydration points and supplied chlorine, so the fatality rate fell and the outbreak declined during 2009. However, help came late, many died before treatment, and the water and sewage systems could not be repaired quickly. Later outbreaks in 2018 and 2023–24 show that the underlying causes remain. I conclude that the response limited deaths, but long-term prevention has been weaker, so success was partial.",
    wordLimit: { max: 300 }, explanation: "Separate emergency response from prevention, with figures, and judge." });

  b.card("DEFINITION", "Cholera", "A diarrhoeal disease caused by the bacterium Vibrio cholerae, spread by the faecal–oral route through contaminated water and food; dehydration can kill within hours if untreated.");
  b.card("CONCEPT", "Treatment of cholera", "Oral rehydration solution for most patients, drips for severe cases and antibiotics for severe cases; case fatality should be under 1% with prompt treatment.");
  b.card("CONCEPT", "Risk factors for cholera", "No safe water or sanitation, poverty, crowding (informal settlements, camps), floods and cyclones, poor hygiene and delayed access to treatment.");
  b.card("FACT", "Global burden of cholera", "WHO estimates about 1.3 to 4 million cases and 21 000 to 143 000 deaths a year; endemic in parts of South Asia and Africa.");
  b.card("FACT", "Zimbabwe cholera epidemic, 2008–09", "Nearly 100 000 cases and over 4 000 deaths (WHO, rounded); began in the high-density suburbs of Harare and Chitungwiza after water and sewage systems failed.");
  b.card("CONCEPT", "Cholera prevention", "Safe water (chlorination, boreholes), sanitation (latrines, sewers), handwashing and food hygiene, education, oral cholera vaccine in outbreaks, surveillance and rapid response.");
  b.card("FORMULA", "Case fatality rate", "Deaths among cases ÷ number of cases × 100.");
  b.card("CONCEPT", "Cholera after disasters", "Floods and cyclones contaminate water, damage pipes and sewers and crowd people into shelters; cases were confirmed in Beira after Cyclone Idai (2019) and in Haiti after the 2010 earthquake.");
});
