// W3b: disease.monitoring-response (Cambridge only, A Level Paper 4 option 14). Data are illustrative (invented for this exercise); every number is computed in code.
// Real facts used (Ebola 2014-16 totals, Nigeria 2014: 20 cases and 8 deaths) are rounded and attributed in the text.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const hit3 = rnd((1 - 1 / 3) * 100, 1, 66.7, "hit3");
const cov = rnd((100 * (1 - 1 / 2.5)) / 0.9, 1, 66.7, "cov");
const contacts = chk(120 * 8, 960);
const traced = chk(960 * 0.75, 720, 1e-9);
const untraced = chk(960 - 720, 240);
const unc28 = chk(25 * 2 ** (28 / 4), 3200, 1e-9);
const at12 = chk(25 * 2 ** (12 / 4), 200, 1e-9);
const ctl28 = chk(at12 * 2 ** (16 / 8), 800, 1e-9);
const avoided = chk(unc28 - ctl28, 2400, 1e-9);
// Struct A
const pFollow = chk((855 / 900) * 100, 95, 1e-9);
const qPerCase = chk(600 / 240, 2.5, 1e-9);
const qFollow = chk((270 / 600) * 100, 45, 1e-9);
const RT = tbl(["Measure", "Country P", "Country Q"], [
  ["Confirmed cases", 20, 240], ["Days from first case to public alert", 3, 21], ["Contacts identified", 900, 600], ["Contacts followed up each day", 855, 270],
]);

concept("ageo.disease.monitoring-response", { file: "disease/monitoring-response", keyPrefix: "disease.monitoring-response", applies: CAM }, (b) => {
  mc(b, 2, "RECALL", "What is contact tracing?", [
    ["Finding and monitoring people who have been in contact with a case", "Correct: new cases can be found and isolated early."],
    ["Treating every person in a district with a vaccine", "That is mass vaccination."],
    ["Closing the borders of a country to all travellers", "That is a travel restriction."],
    ["Measuring the level of a pathogen in the sewage of a large city each week", "That is wastewater surveillance."],
  ], "**Contact tracing** identifies and monitors people exposed to a case.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is syndromic surveillance?", [
    ["Tracking symptoms such as fever before tests confirm the cause", "Correct: it gives early warning of an outbreak."],
    ["Testing every person in the whole country for one disease each week", "That would be universal screening."],
    ["Counting only deaths after the end of an epidemic is over", "That is a record of outcomes, not early monitoring."],
    ["Recording only cases that are confirmed by a laboratory test", "Syndromic surveillance does not wait for laboratory results."],
  ], "**Syndromic** surveillance tracks symptoms and gives early warning.", { daily: true });
  mc(b, 3, "ANALYSIS", "Why can confidentiality be important for effective disease monitoring?", [
    ["People test and report more when data are kept safe", "Correct: stigma and fear of discrimination reduce testing."],
    ["Confidential data are always more accurate than public data", "Confidentiality affects trust, not accuracy."],
    ["It prevents health workers from sharing any data with the WHO", "Data can be shared in ways that protect identity."],
    ["It makes it unnecessary to record the number of cases", "Cases must still be counted."],
  ], "**Trust** in the system encourages testing and reporting.", { hints: ["Think of stigma."] });
  mc(b, 3, "ANALYSIS", "A region reports ten times more cases of a disease than a neighbouring region. Which is the best question to ask before concluding that it has more disease?", [
    ["Does the region test and report more thoroughly than its neighbour?", "Correct: reported cases depend on testing and reporting."],
    ["Does the region have a much longer coastline than its neighbouring region?", "Coastline is not directly relevant."],
    ["Does the region have more roads than its neighbour?", "Roads may matter, but reporting quality is the key question for comparing data."],
    ["Does the region have more rivers than its neighbour?", "Rivers may matter for some diseases, but reporting quality is the key question."],
  ], "Reported cases reflect **testing and reporting** as well as true disease.", { hints: ["How reliable are the numbers?"] });
  mc(b, 3, "APPLICATION", "Which low-technology solution is most useful for preventing malaria?", [
    ["Insecticide-treated bed nets", "Correct: they prevent mosquito bites at night."],
    ["Chlorine tablets in drinking water", "These help against cholera."],
    ["Oral rehydration salts", "These treat dehydration from diarrhoea."],
    ["Surgical face masks", "These reduce droplets in respiratory disease."],
  ], "**Treated nets** are a proven low-technology tool against malaria.", { hints: ["Match the tool to the transmission route."] });
  mc(b, 3, "EVALUATION", "Which statement best explains why Nigeria controlled Ebola in 2014 more quickly than neighbouring countries?", [
    ["Rapid contact tracing and isolation, using an existing emergency centre", "Correct: speed and organisation limited the number of cases."],
    ["Nigeria had no air travel and so never received an infected person by plane", "An infected traveller flew to Lagos."],
    ["Nigeria had a vaccine for Ebola available in 2014", "No licensed vaccine was available in 2014."],
    ["Ebola does not spread in cities", "It did spread in cities in other countries."],
  ], "**Contact tracing and a ready emergency centre** gave a quick response.", { hints: ["What did the officials do after the first case?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Reported numbers of cases always show the true number of people with a disease.", answer: false,
    feedbackTrue: "Not so: reported cases depend on testing, access and reporting.", feedbackFalse: "Correct: reported cases depend on testing and reporting, and are often an underestimate.",
    explanation: "Reported cases are affected by **testing and reporting**, so they often underestimate the true figure." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each control with a disease it is well suited to.",
    pairs: [
      ["Insecticide-treated nets", "Malaria"],
      ["Chlorine tablets and safe water", "Cholera"],
      ["Surgical face masks and ventilation", "Respiratory infections such as influenza"],
      ["Ring vaccination of contacts", "Ebola"],
      ["Regular treatment with several drugs for six months", "Tuberculosis"],
    ], explanation: "A control works when matched to the route of transmission." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "In {{blank:a}} surveillance selected sites report regularly. The {{blank:b}} reproduction number is the average number of people one case infects in a population with no immunity, and enough immune people produce {{blank:c}} immunity.",
    blanks: [
      { id: "a", accepted: ["sentinel"], choices: ["sentinel", "passive", "random"] },
      { id: "b", accepted: ["basic"], choices: ["basic", "annual", "relative"] },
      { id: "c", accepted: ["herd"], choices: ["herd", "natural", "individual"] },
    ], explanation: "Sentinel surveillance; basic reproduction number R₀; herd immunity." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the United Nations agency that coordinates international health alerts and the International Health Regulations (2005).",
    accepted: ["WHO", "World Health Organization", "World Health Organisation", "the WHO"],
    explanation: "The **World Health Organization (WHO)** coordinates global health alerts." });

  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A disease has a basic reproduction number R₀ = 3. Using herd immunity threshold = 1 − 1/R₀, calculate the percentage of the population that must be immune. Give your answer to one decimal place.",
    hints: ["1/3 = 0.333."],
    value: hit3, dp: 1, wrong: [33.3, 3, 75],
    explanation: "1 − 1/3 = 0.667, so **66.7%**. The value 33.3 is 1/R₀ (the share still susceptible)." });
  b.calc({ d: 4, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A disease has R₀ = 2.5, so the herd immunity threshold is 60%. A vaccine protects 90% of the people who receive it. What percentage of the population must be vaccinated to reach the threshold? Give your answer to one decimal place.",
    hints: ["Coverage × effectiveness = threshold."],
    value: cov, dp: 1, wrong: [60, 54, 150],
    explanation: "Coverage × 0.90 = 60%, so coverage = 60 ÷ 0.90 = **66.7%**. The value 60 ignores the fact that the vaccine does not protect everyone." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "people",
    stem: "In an outbreak 120 cases each named 8 contacts, and health workers followed up 75% of all the contacts. How many contacts were NOT followed up?",
    hints: ["Total contacts = 120 × 8, then 25% are not followed up."],
    value: untraced, wrong: [720, 960, 30],
    explanation: "Total contacts = 120 × 8 = 960. Followed up = 0.75 × 960 = 720. Not followed up = 960 − 720 = **240**." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why international collaboration is important for monitoring infectious disease.",
    hints: ["Think of borders, samples, resources and speed."],
    points: [
      "Diseases cross borders through travel and trade, so one country cannot control them alone.",
      "Sharing data and samples (as with the influenza network) allows early warning and the selection of vaccine strains.",
      "Poorer countries receive funding, laboratory help and experts from organisations such as WHO and Africa CDC.",
      "Agreed rules (the International Health Regulations) require countries to report events quickly.",
    ],
    modelAnswer: "Diseases cross borders through travel and trade, so one country cannot control them alone. Sharing data and samples, as in the influenza network, gives early warning and helps in choosing vaccine strains. Poorer countries receive funding, laboratory help and experts from organisations such as WHO and Africa CDC, and the International Health Regulations require countries to report events quickly.",
    explanation: "Borders, shared data, resources and rules." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a lack of trust between communities and health workers can make an outbreak harder to control.",
    hints: ["Think of burial practices, rumours and testing."],
    points: [
      "People may hide sick relatives or avoid clinics, so cases are found late and the disease spreads.",
      "Rumours about vaccines or treatment centres reduce uptake and may lead to attacks on health workers.",
      "Customs such as washing the dead can spread the disease if health messages are not accepted.",
      "Contacts may refuse to be followed, and fewer people report, so data are incomplete.",
    ],
    modelAnswer: "People may hide sick relatives or avoid clinics, so cases are found late. Rumours reduce uptake of vaccines and may lead to attacks on health workers. Customs such as washing the dead can spread the disease if health messages are not accepted. Contacts may refuse follow-up, so data are incomplete.",
    explanation: "Delay, rumours, customs and incomplete data." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why low-technology solutions are often more appropriate than high-technology ones in poor, rural communities.",
    hints: ["Think of cost, supply and skills."],
    points: [
      "They are cheap and can be produced or repaired locally, so they are affordable.",
      "They do not depend on electricity, cold storage or specialist staff, which are often lacking.",
      "People can use them without long journeys to a clinic, which gives wide coverage if they are taught how.",
    ],
    modelAnswer: "They are cheap and can be made or repaired locally. They do not depend on electricity, cold storage or specialist staff, which are often lacking. People can use them at home without a long journey to a clinic, if they are taught how.",
    explanation: "Cost, infrastructure and access." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess the effectiveness of travel restrictions and border closures in controlling an outbreak.",
    hints: ["Think of delays, costs and unofficial crossings."],
    points: [
      "They can delay the arrival of a disease and give time to prepare.",
      "They are usually not enough on their own, because infected people may cross unofficially and people can be infectious before symptoms.",
      "They have economic costs and can discourage countries from reporting early; health measures at borders such as screening may be more useful.",
    ],
    modelAnswer: "Travel restrictions can delay the arrival of a disease and give time to prepare. They are usually not enough, because people cross unofficially and can be infectious before symptoms. They also have economic costs and can discourage countries from reporting early, so health measures at borders may be more useful.",
    explanation: "Weigh delay against leakage and costs." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table compares the response to an outbreak of the same disease in two countries (illustrative data, invented for this exercise).\n\n${RT}`,
    hints: ["Percentage followed up = followed ÷ identified × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of contacts followed up each day in Country P.", value: pFollow, unit: "%", wrong: [855, 5, 4.2],
        explanation: "855 ÷ 900 × 100 = 95%." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean number of contacts identified per case in Country Q.", value: qPerCase, dp: 1, wrong: [0.4, 2, 600],
        explanation: "600 ÷ 240 = 2.5 contacts per case." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe two differences between the responses of the two countries.",
        points: ["Country P gave a public alert after 3 days and Country Q after 21 days.", "Country P followed up 95% of contacts, but Country Q only 45% (270 of 600), and P identified 45 contacts per case against 2.5 in Q."],
        modelAnswer: "Country P gave its public alert after 3 days, whereas Country Q took 21 days. Country P followed up 95% of the contacts it identified, but Country Q only 45%.",
        explanation: "Compare with figures." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest reasons why Country Q identified fewer contacts per case and responded more slowly.",
        points: ["Fewer trained staff, vehicles or laboratories, so cases were found late.", "Lack of trust, or stigma, so people did not name contacts or hid cases.", "Poor roads or weak communication, or slow decisions to report because of political or economic concerns."],
        modelAnswer: "There may have been fewer trained staff, vehicles and laboratories, so cases were found late. Lack of trust or stigma may have led people to hide cases or not name contacts. Poor roads, weak communication or slow decisions to report may also have delayed the response.",
        explanation: "Resources, trust and communication." }),
    ], explanation: "Compare two responses using calculated rates and suggest reasons for the differences." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `An outbreak begins with 25 cases. Without control, the number of cases doubles every 4 days. With control measures starting on day 12, the doubling time becomes 8 days (illustrative model, invented for this exercise).`,
    hints: ["Number of doublings = days ÷ doubling time.", "Break the controlled case into two periods."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of cases on day 28 if there is no control.", value: unc28, unit: "people", wrong: [175, 800, 700],
        explanation: "28 ÷ 4 = 7 doublings: 25 × 2⁷ = 3 200." }),
      P.num({ label: "(b)", marks: 3, type: "CALCULATION", stem: "Calculate the number of cases on day 28 if control measures start on day 12.", value: ctl28, unit: "people", wrong: [400, 3200, 1600],
        explanation: "By day 12 there are 25 × 2³ = 200 cases (12 ÷ 4 = 3 doublings). From day 12 to 28 is 16 days, which is 2 doublings at 8 days each: 200 × 2² = 800." }),
      P.num({ label: "(c)", marks: 1, stem: "How many cases are avoided by the control measures by day 28?", value: avoided, unit: "people", wrong: [800, 3200, 3000],
        explanation: "3 200 − 800 = 2 400." }),
      P.manual({ label: "(d)", marks: 3, stem: "Assess the limits of using this model to predict the real outbreak.",
        points: ["Real outbreaks do not grow at a constant rate: growth slows as people become immune or change behaviour.", "The model assumes that all cases are detected, but reporting is incomplete and delayed.", "Control measures do not change the doubling time exactly at one date, and the effect depends on how well they are applied."],
        modelAnswer: "Real outbreaks do not grow at a constant rate: growth slows as people become immune or change behaviour. The model assumes that all cases are detected, but reporting is incomplete and delayed. Control measures do not change the doubling time at one exact date, and their effect depends on how well they are applied.",
        explanation: "Models are simplifications." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three ways of detecting an outbreak earlier.",
        points: ["Syndromic surveillance of symptoms at clinics and pharmacies, and reports from community health workers.", "Testing in sentinel sites, wastewater testing and rapid laboratory methods.", "Sharing alerts between countries and rewarding rather than punishing early reporting."],
        modelAnswer: "Monitor symptoms at clinics and pharmacies and use reports from community health workers. Test regularly at sentinel sites and test wastewater. Share alerts between countries and reward early reporting.",
        explanation: "Early detection depends on wide, fast reporting." }),
    ], explanation: "Model exponential growth with and without control, calculate cases avoided and evaluate the model." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of political and social factors, compared with economic factors, in explaining the success of responses to outbreaks of infectious disease.",
    hints: ["Use Ebola in West Africa and Nigeria (2014) as a contrast."],
    points: [
      "Economic factors: funding, staff, laboratories, vehicles and the ability of households to lose work time determine capacity to respond.",
      "West Africa 2014: weak health systems after conflict in Guinea, Liberia and Sierra Leone meant few doctors and laboratories, and the outbreak reached about 28 600 cases.",
      "Political factors: leadership, early reporting and coordination; the WHO declared an emergency in August 2014, many months after the first cases.",
      "Nigeria, 2014: an emergency centre built on the polio programme traced contacts and isolated cases quickly, and there were only 20 cases and 8 deaths, despite limited national wealth per person.",
      "Social factors: trust, rumours and burial customs affected the willingness to report cases and accept isolation and vaccines.",
      "Ring vaccination in the Democratic Republic of the Congo (2018–20) reduced spread, but conflict and distrust delayed it.",
      "Factors interact: wealth makes political leadership easier, and trust depends on past experience with the health system.",
      "Judgement: economic resources are necessary, but speed, organisation, leadership and trust often decide the outcome, so political and social factors are at least as important.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Economic factors matter because funding, staff, laboratories and vehicles decide capacity. In West Africa in 2014, weak health systems in Guinea, Liberia and Sierra Leone meant few doctors and laboratories, and the outbreak reached about 28 600 cases. But political and social factors were also important. The WHO declared an emergency in August 2014, many months after the first cases. Nigeria, with limited national wealth per person, used an emergency centre built on its polio programme to trace contacts and isolate cases quickly, and it had only 20 cases. Social trust, rumours and burial customs affected whether people reported cases or accepted isolation and vaccines, and in the Democratic Republic of the Congo conflict and distrust delayed ring vaccination. The factors interact, but I conclude that speed, organisation, leadership and trust often decide the outcome, so political and social factors are at least as important as economic ones.",
    wordLimit: { max: 300 }, explanation: "Weigh economic against political and social factors with a contrast, and judge." });

  b.card("DEFINITION", "Disease surveillance", "Continuous collection, analysis and sharing of health data: passive (clinic reports), active (searching for cases), sentinel (selected sites) and syndromic (symptom reports before tests).");
  b.card("DEFINITION", "Contact tracing", "Finding, informing and monitoring people who have had contact with a case, so that new cases are found and isolated early.");
  b.card("FORMULA", "Herd immunity threshold", "Threshold = 1 − 1/R₀. Vaccination coverage needed = threshold ÷ vaccine effectiveness.");
  b.card("CONCEPT", "What makes monitoring effective", "Affordable and accessible testing, accurate and complete data, confidentiality and trust, trained staff, and international collaboration.");
  b.card("CONCEPT", "Low-technology controls", "Insecticide-treated nets, face masks, hand-washing, oral rehydration salts and chlorine tablets: cheap, local and effective when used correctly.");
  b.card("CONCEPT", "Factors in outbreak response", "Environmental (terrain, floods, remoteness), social (trust, customs, rumours), economic (funding, staff), political (leadership, transparency, conflict).");
  b.card("FACT", "Ebola, West Africa and Nigeria, 2014", "About 28 600 cases and 11 300 deaths in Guinea, Liberia and Sierra Leone (rounded); Nigeria controlled its outbreak with 20 cases and 8 deaths through rapid contact tracing.");
  b.card("CONCEPT", "Why reported cases mislead", "They depend on testing, access to clinics and reporting systems, and are often an underestimate; compare places only with care.");
});
