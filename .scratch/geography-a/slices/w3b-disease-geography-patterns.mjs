// W3b: disease.geography-patterns (Cambridge only, A Level Paper 4 option 14). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, per1000, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const dRate = chk(per1000(2100, 150000), 14, 1e-9);
const imr = chk(per1000(1150, 25000), 46, 1e-9);
const prev = chk((4800 / 60000) * 100, 8, 1e-9);
const inc = chk(per1000(1020, 85000), 12, 1e-9);
const cfr = chk((45 / 1500) * 100, 3, 1e-9);
const CT = [["A", 57, 61, 48, 0.2, 66], ["B", 71, 20, 310, 1.2, 28], ["C", 81, 5, 3500, 3.1, 8]];
const imrRatio = chk(Math.round((61 / 5) * 10) / 10, 12.2, 1e-9);
const CTAB = tbl(["Country", "Life expectancy (years)", "Infant mortality rate (per 1 000 live births)", "Health spending per person (US\\$ per year)", "Doctors per 1 000 people", "Deaths from communicable disease (%)"],
  CT.map((r) => [r[0], r[1], r[2], String(r[3]).replace(/(\d)(\d{3})$/, "$1 $2"), r[4].toFixed(1), r[5]]));
// Struct B: outbreak
const WK = [12, 30, 75, 160, 240, 190];
const cum = chk(sum(WK), 707);
const cfrO = rnd((21 / cum) * 100, 1, 3.0, "cfrO");
const attack = rnd((cum / 40000) * 100, 2, 1.77, "attack");
const growth = chk(((240 - 160) / 160) * 100, 50, 1e-9);
const OB = tbl(["Week", 1, 2, 3, 4, 5, 6], [["New cases", ...WK]]);

concept("ageo.disease.geography-patterns", { file: "disease/geography-patterns", keyPrefix: "disease.geography-patterns", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "What is an endemic disease?", [
    ["One that is constantly present at a fairly stable level in an area", "Correct: malaria in much of tropical Africa is an example."],
    ["One that spreads across several continents at the same time", "That is a pandemic."],
    ["One that suddenly rises above the expected level in a whole region or country", "That is an epidemic."],
    ["One that cannot be passed from one person to another", "That is a non-communicable disease."],
  ], "**Endemic** = constantly present in a place.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the difference between incidence and prevalence?", [
    ["Incidence counts new cases in a period; prevalence counts all existing cases", "Correct: prevalence includes new and old cases at a given time."],
    ["Incidence counts all existing cases at a time; prevalence counts only new cases", "This reverses the two terms."],
    ["Incidence is measured for children; prevalence for adults", "Both can be measured for any age group."],
    ["Incidence is used for deaths; prevalence is used for births", "Neither is a birth or death measure."],
  ], "**Incidence** = new cases; **prevalence** = all cases at a time.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which type of disease needs an insect or other carrier to be transmitted?", [
    ["A vector-borne disease such as malaria", "Correct: the Anopheles mosquito carries the parasite."],
    ["An airborne disease such as influenza", "Influenza spreads in droplets and aerosols."],
    ["A waterborne disease such as cholera", "Cholera spreads in contaminated water and food."],
    ["A non-communicable disease such as diabetes", "It does not spread from person to person."],
  ], "**Vector-borne** diseases depend on a carrier such as a mosquito.");
  mc(b, 3, "ANALYSIS", "Why is the infant mortality rate often a more useful indicator of a country's health than its overall death rate?", [
    ["It is less affected by the age structure of the population", "Correct: a country with many old people has a high death rate even with good care."],
    ["It includes the deaths of people of all ages in the whole country", "It counts only deaths under one year old."],
    ["It is always higher in rich countries than in poor ones", "It is usually much lower in rich countries."],
    ["It is measured per 100 people rather than per 1 000", "It is measured per 1 000 live births."],
  ], "The IMR is sensitive to **sanitation, nutrition and care** and is not affected by the age structure.", { hints: ["Think about how an older population affects the death rate."] });
  mc(b, 3, "ANALYSIS", "A middle-income country has high rates of both tuberculosis and heart disease. How is this best described?", [
    ["A double burden of communicable and non-communicable disease", "Correct: both kinds of disease are common at the same time."],
    ["The full completion of the epidemiological transition process", "Completion would mean mainly non-communicable disease."],
    ["An epidemic of heart disease", "An epidemic is a rapid rise above expected levels."],
    ["An endemic pandemic", "A pandemic is not endemic."],
  ], "Many middle-income countries have a **double burden**.", { hints: ["Both kinds of disease are common."] });
  mc(b, 3, "EVALUATION", "Why can national health statistics be misleading?", [
    ["They hide large differences between rich and poor groups", "Correct: some groups may have much worse health than the average suggests."],
    ["They are always calculated from small samples of children", "National data come from censuses, registers and surveys of various sizes."],
    ["They measure only the health of wealthy people in each country", "They aim to cover the whole population."],
    ["They are not related to any health outcomes in a country", "They are related to health outcomes but hide variation."],
  ], "**Averages hide inequality** within countries.", { hints: ["Think about averages."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A pandemic is a disease that is always more dangerous than an epidemic.", answer: false,
    feedbackTrue: "Not so: the word describes geographic spread, not severity.", feedbackFalse: "Correct: pandemic refers to spread across several continents, not to how deadly the disease is.",
    explanation: "Pandemic describes **spread**, not severity." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each disease to its usual route of transmission.",
    pairs: [
      ["Cholera", "Contaminated water or food"],
      ["Malaria", "Bite of an infected mosquito"],
      ["Influenza", "Droplets and aerosols from the respiratory tract"],
      ["HIV", "Blood, sexual contact and from mother to child"],
      ["Ebola", "Direct contact with infected body fluids"],
    ], explanation: "Transmission routes decide how a disease spreads and how it can be controlled." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The number of new cases in a period is called {{blank:a}}, whereas {{blank:b}} counts all the existing cases at a time. The change from mainly infectious to mainly non-communicable causes of death is called the {{blank:c}} transition.",
    blanks: [
      { id: "a", accepted: ["incidence"], choices: ["incidence", "prevalence", "mortality"] },
      { id: "b", accepted: ["prevalence"], choices: ["prevalence", "incidence", "morbidity"] },
      { id: "c", accepted: ["epidemiological"], choices: ["epidemiological", "demographic", "industrial"] },
    ], explanation: "Incidence = new cases; prevalence = all cases." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the term for a disease outbreak that spreads across several continents.",
    accepted: ["pandemic", "a pandemic"],
    explanation: "A **pandemic** is an epidemic that spreads across several continents." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "per 1000",
    stem: "In a district of 150 000 people there were 2 100 deaths in one year. Calculate the death rate per 1 000 people.",
    hints: ["Deaths ÷ population × 1 000."],
    value: dRate, wrong: [1.4, 140, 71.4],
    explanation: "2 100 ÷ 150 000 × 1 000 = **14 per 1 000**. The value 1.4 is per 100." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "per 1000",
    stem: "In a region there were 25 000 live births in a year and 1 150 infants died before their first birthday. Calculate the infant mortality rate per 1 000 live births.",
    hints: ["Infant deaths ÷ live births × 1 000."],
    value: imr, wrong: [4.6, 0.046, 21.7],
    explanation: "1 150 ÷ 25 000 × 1 000 = **46 per 1 000** live births. The value 4.6 is per 100." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A health outbreak has 1 500 confirmed cases and 45 deaths among them. Calculate the case fatality rate as a percentage.",
    hints: ["Deaths among cases ÷ cases × 100."],
    value: cfr, wrong: [33.3, 0.03, 30],
    explanation: "45 ÷ 1 500 × 100 = **3%**. The value 33.3 inverts the ratio (1 500 ÷ 45)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "per 1000",
    stem: "In a survey of 85 000 residents, 1 020 people were newly diagnosed with a disease during the past year. Calculate the incidence per 1 000 people.",
    hints: ["New cases ÷ population × 1 000."],
    value: inc, wrong: [1.2, 83.3, 120],
    explanation: "1 020 ÷ 85 000 × 1 000 = **12 per 1 000**. The value 1.2 is per 100." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how the main causes of death differ between a low-income country and a high-income country.",
    points: [
      "In low-income countries communicable, maternal and neonatal diseases (such as diarrhoeal diseases, malaria and respiratory infections) cause a large share of deaths, around half or more.",
      "In high-income countries non-communicable diseases such as heart disease and cancer cause the large majority of deaths.",
      "Deaths in low-income countries occur at younger ages (including many children), and in high-income countries mostly at older ages.",
    ],
    modelAnswer: "In low-income countries communicable and maternal and neonatal diseases, such as diarrhoeal diseases, malaria and respiratory infections, cause a large share of deaths, around half or more. In high-income countries non-communicable diseases such as heart disease and cancer cause the large majority. Deaths in low-income countries are at younger ages, including children, and in high-income countries mostly at older ages.",
    explanation: "Compare the main causes and the ages at death." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why vector-borne diseases such as malaria are limited to certain parts of the world.",
    hints: ["Think of the mosquito's needs."],
    points: [
      "The vector needs warm temperatures to breed and for the parasite to develop inside it.",
      "It needs standing water for breeding, so it is found where there is enough rainfall or wetlands.",
      "Altitude and cold limit the vector, so highlands are often free of malaria.",
      "Human factors such as housing, nets and health services also determine where transmission occurs.",
    ],
    modelAnswer: "The mosquito needs warm temperatures to breed and for the parasite to develop inside it, and standing water for breeding. Altitude and cold limit it, so highlands are often free of malaria. Housing, nets and health services also affect where transmission occurs.",
    explanation: "Climate and habitat limit the vector, and human factors add to this." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Suggest social and economic reasons why a poor urban slum may have higher rates of infectious disease than a wealthy suburb of the same city.",
    hints: ["Think of crowding, water, income and services."],
    points: [
      "Overcrowded housing helps airborne diseases to spread.",
      "Lack of safe water and sanitation allows waterborne diseases such as cholera to spread.",
      "Poverty causes malnutrition, which weakens immunity, and people may not afford care or medicines.",
      "Clinics are fewer and further away, and residents may have less education about prevention.",
    ],
    modelAnswer: "Overcrowded housing helps airborne diseases spread. Lack of safe water and sanitation allows waterborne diseases to spread. Poverty causes malnutrition, which weakens immunity, and people may not afford care. Clinics are fewer and further away, and there may be less education about prevention.",
    explanation: "Crowding, water, nutrition and services." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the death rate of a country with excellent healthcare can be higher than that of a poorer country.",
    hints: ["Think of the age structure."],
    points: [
      "A country with excellent health care has a long life expectancy and an ageing population.",
      "Older people have a higher risk of dying, so a larger share of the population dies each year.",
      "A poorer country may have a young population with few old people, so the crude death rate can be lower despite poorer health care.",
    ],
    modelAnswer: "A country with excellent health care has a long life expectancy and an ageing population. Older people have a higher risk of dying, so a larger share of the population dies each year. A poorer country with a young population may have a lower crude death rate despite poorer health care.",
    explanation: "Age structure influences the crude death rate." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table gives data for three countries (illustrative data, invented for this exercise).\n\n${CTAB}`,
    hints: ["Ratio = A ÷ C.", "Describe the link between spending and outcomes."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times greater is the infant mortality rate of country A than that of country C?", value: imrRatio, dp: 1, unit: "times", wrong: [56, 0.08, 12],
        explanation: "61 ÷ 5 = 12.2 times." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the relationship between doctors per 1 000 people and the infant mortality rate shown in the table.",
        points: ["As the number of doctors per 1 000 rises, the infant mortality rate falls.", "Country A has 0.2 doctors and an IMR of 61, and country C has 3.1 doctors and an IMR of 5.", "The relationship does not prove cause, because wealth, sanitation and education also differ."],
        modelAnswer: "As doctors per 1 000 people rise, the infant mortality rate falls. Country A has 0.2 doctors and an IMR of 61, whereas country C has 3.1 doctors and an IMR of 5. This does not prove cause, as wealth, sanitation and education also differ.",
        explanation: "Quote data pairs and comment on cause." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which change in the table is an example of the epidemiological transition?", options: [
        ["The share of deaths from communicable disease falls from 66% to 8%", "Correct: communicable diseases are replaced by non-communicable ones as the main cause."],
        ["Health spending rises from US\\$ 48 to US\\$ 3 500", "This is a difference in resources, not a change in causes of death."],
        ["The number of doctors per 1 000 people rises from 0.2 in A to 3.1 in C", "This is a difference in services."],
        ["Life expectancy falls from 81 to 57", "Life expectancy rises with development."],
      ], answer: "A", explanation: "The transition is a shift in the main causes of death." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why country A has a high share of deaths from communicable disease.",
        points: ["Poor sanitation and unsafe water, and crowded housing, favour the spread of infections.", "Low health spending and few doctors mean that infections are not prevented or treated, and malnutrition lowers immunity."],
        modelAnswer: "Poor sanitation, unsafe water and crowded housing favour the spread of infection. Low health spending and few doctors mean that infections are not prevented or treated, and malnutrition lowers immunity.",
        explanation: "Environmental conditions and weak services." }),
    ], explanation: "Compare indicators, describe a relationship and explain the pattern of deaths." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A district with 40 000 people recorded the following new cases of an infectious disease over six weeks (illustrative data, invented for this exercise). In total 21 patients died.\n\n${OB}`,
    hints: ["Cumulative cases = the sum of the weeks.", "Case fatality rate = deaths ÷ cases × 100."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total number of cases over the six weeks.", value: cum, unit: "people", wrong: [240, 190, 117],
        explanation: "12 + 30 + 75 + 160 + 240 + 190 = 707." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the case fatality rate, as a percentage to one decimal place.", value: cfrO, dp: 1, unit: "%", wrong: [21, 33.7, 0.3],
        explanation: "21 ÷ 707 × 100 = 3.0%." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage of the district's population who became cases (attack rate), to two decimal places.", value: attack, dp: 2, unit: "%", wrong: [707, 17.7, 0.05],
        explanation: "707 ÷ 40 000 × 100 = 1.77%." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the pattern of new cases over the six weeks.",
        points: ["Cases rise rapidly from 12 in week 1 to a peak of 240 in week 5.", "The growth is fastest between weeks 2 and 4 (for example from 30 to 160, more than five times).", "Cases then fall to 190 in week 6."],
        modelAnswer: "Cases rise rapidly from 12 in week 1 to a peak of 240 in week 5. Growth is fastest between weeks 2 and 4, when cases rise from 30 to 160, more than five times. Cases then fall to 190 in week 6.",
        explanation: "Describe the shape with figures." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far the fall in cases in week 6 shows that the outbreak is over.",
        points: ["Cases fell from 240 to 190, which suggests that control measures may be having an effect.", "But 190 cases is still high, more than the figure for week 4, so the outbreak is continuing.", "A single week is not enough evidence, as reporting delays can reduce numbers, and cases may rise again.", "Several weeks of falling numbers, and the cause of the outbreak being dealt with (water, vaccination), are needed to show control."],
        modelAnswer: "Cases fell from 240 to 190, which suggests control measures may be working. But 190 is still higher than in week 4, so the outbreak continues. One week is not enough, as reporting delays can reduce the numbers and cases can rise again. Several weeks of falling numbers are needed to show it is under control.",
        explanation: "Use the data, but judge the limits of one week." }),
    ], explanation: "Calculate cumulative cases, a fatality rate and an attack rate, describe an epidemic curve and evaluate evidence." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of economic and environmental factors in explaining differences in the incidence of infectious disease between countries.",
    hints: ["Give both sets of factors, and then a judgement."],
    points: [
      "Environmental factors set the range of some diseases: warmth and standing water for mosquito-borne diseases such as malaria; floods and lack of safe water for cholera.",
      "Highland and cooler areas often have little malaria, showing the effect of the environment.",
      "Economic factors determine how well people cope: poverty brings malnutrition, crowded housing and poor sanitation.",
      "Health spending, the number of doctors and the ability to buy vaccines, nets and medicines differ widely between countries.",
      "Rich countries in warm climates have eliminated malaria through drainage, screening and health care (for example parts of southern Europe and the southern United States in the past), showing that economics can overcome the environment.",
      "Political and social factors (conflict, governance, education) interact with the economy and environment.",
      "Global factors such as travel, climate change and international aid affect spread and response.",
      "Judgement: the environment sets the potential for some diseases, but economic resources largely decide whether the potential becomes high incidence, so economic factors are usually more important.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Environmental factors set the range of some diseases: malaria needs warmth and standing water for mosquitoes, and cholera spreads where floods and a lack of safe water mix sewage with drinking water. Highland areas often have little malaria. However, economic factors decide how well people cope. Poverty brings malnutrition, crowded housing and poor sanitation, and countries differ widely in health spending, doctors and the ability to buy vaccines, nets and medicines. Wealthy countries in warm climates eliminated malaria by drainage, screening and health care, showing that economics can overcome the environment. Political and global factors also matter. I conclude that the environment sets the potential, but economic resources mostly decide whether the potential becomes high incidence.",
    wordLimit: { max: 300 }, explanation: "Weigh economic against environmental factors and judge." });

  b.card("DEFINITION", "Epidemic, pandemic and endemic", "Epidemic: rapid rise in cases above the expected level in a region. Pandemic: epidemic spread across several continents. Endemic: constantly present in an area.");
  b.card("DEFINITION", "Incidence and prevalence", "Incidence: new cases in a period (e.g. per 1 000 people). Prevalence: all existing cases at a time, as a share of the population.");
  b.card("FORMULA", "Death rate and infant mortality rate", "Death rate = deaths ÷ population × 1 000. IMR = infant deaths (under 1 year) ÷ live births × 1 000.");
  b.card("FORMULA", "Case fatality rate", "Deaths among cases ÷ number of cases × 100.");
  b.card("CONCEPT", "Routes of transmission", "Airborne (influenza, TB), waterborne and food-borne (cholera), vector-borne (malaria), contact, blood and sexual (HIV), zoonotic (Ebola).");
  b.card("CONCEPT", "Epidemiological transition", "Shift in the main causes of death from communicable, maternal and neonatal diseases to non-communicable diseases as incomes, sanitation and health care improve; many countries have a double burden.");
  b.card("CONCEPT", "Factors in spatial variation of disease", "Environmental, social, economic, political and global factors; a good answer links at least two.");
  b.card("CONCEPT", "Why averages mislead", "National statistics hide differences between rich and poor, urban and rural, and between social groups.");
});
