// W4b: Chronic illnesses (her.global.chronic-illnesses). General health information only; no medical advice.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.global.chronic-illnesses", { file: "global/chronic-illnesses", keyPrefix: "global.chronic-illnesses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **chronic** illness?",
    options: [
      ["an illness that lasts a long time and usually develops slowly", "Correct: chronic means long-lasting."],
      ["an illness that spreads quickly from one person to another through contact", "This describes an infectious disease."],
      ["an illness that lasts only a day or two", "Short illnesses are called acute."],
      ["an illness caused only by an injury", "Injuries are not chronic illnesses."],
    ],
    answer: "A",
    explanation: "Chronic illnesses last months, years or for life, such as diabetes and hypertension.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Hypertension is another name for",
    options: [
      ["high blood pressure", "Correct: hyper = too high; tension = pressure."],
      ["high blood sugar", "High blood sugar is the sign of diabetes."],
      ["a lung infection", "Hypertension affects blood pressure, not the lungs."],
      ["a lack of iron in the blood", "This is a form of anaemia."],
    ],
    answer: "A",
    explanation: "Hypertension is blood pressure that stays too high over a long time.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is hypertension often called a \"silent killer\"?",
    options: [
      ["Many people have no symptoms until serious damage is done", "Correct: it can go unnoticed for years."],
      ["It spreads silently from person to person", "Hypertension is not infectious."],
      ["It affects only people who do not speak much", "It has nothing to do with speech."],
      ["It always kills within a few days of the first symptoms appearing", "It develops slowly over years."],
    ],
    answer: "A",
    explanation: "Hypertension often has no symptoms, so regular blood pressure checks are important.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a risk factor for type 2 diabetes that a person **can change**?",
    options: [
      ["physical inactivity", "Correct: a person can become more active."],
      ["growing older", "Age cannot be changed."],
      ["having a parent with diabetes", "Family history cannot be changed."],
      ["being born in a particular year", "This cannot be changed."],
    ],
    answer: "A",
    explanation: "Diet, activity, weight, tobacco and alcohol can be changed; age and family history cannot.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about chronic illnesses such as diabetes is correct?",
    options: [
      ["They cannot be passed from one person to another", "Correct: they are non-communicable."],
      ["They are caught by sharing cups, plates and towels with a sick person", "Diabetes is not infectious."],
      ["They affect only people living in towns", "Rural people are also affected."],
      ["They can be cured by any herbal remedy", "No herb has been shown to cure diabetes."],
    ],
    answer: "A",
    explanation: "Most chronic illnesses are non-communicable; they affect people everywhere and need care from health workers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Themba's uncle has hypertension. Which change to his diet would **most** help to control it?",
    options: [
      ["eating less salt", "Correct: too much salt raises blood pressure."],
      ["eating more salty snacks", "This would raise blood pressure further."],
      ["drinking more sugary fizzy drinks", "Sugary drinks add weight and raise other risks."],
      ["eating fewer vegetables", "Vegetables are part of a healthy diet."],
    ],
    answer: "A",
    hints: ["Which ingredient is most linked to blood pressure?"],
    explanation: "Cutting salt is one of the most important diet changes for people with high blood pressure, alongside treatment.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A clinic offers free blood pressure and blood sugar checks to adults who feel well. What is this called?",
    options: [
      ["screening", "Correct: testing people who feel well to find disease early."],
      ["vaccination", "Vaccines protect against infectious diseases."],
      ["quarantine", "Quarantine separates people who may be infectious."],
      ["contact tracing", "This finds people exposed to an infectious disease."],
    ],
    answer: "A",
    hints: ["The people tested have no symptoms yet."],
    explanation: "Screening finds illnesses early, when they are easier to control.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which explanation **best** accounts for rising rates of type 2 diabetes in many towns?",
    options: [
      ["Diets with more sugar and fat, combined with less physical activity", "Correct: lifestyle changes raise the risk."],
      ["Diabetes is spread by contaminated water in towns", "Diabetes is not water-borne."],
      ["Town clinics give people diabetes when they test them", "Testing finds diabetes; it does not cause it."],
      ["People in towns eat more vegetables and walk more than people elsewhere", "This would lower the risk."],
    ],
    answer: "A",
    hints: ["Compare town diets and transport with those of earlier generations."],
    explanation: "Processed, sugary and fatty food and less walking increase overweight and diabetes risk.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Diabetes is a condition in which the body cannot control the level of sugar in the blood.",
    answer: true,
    explanation: "True. The body makes too little insulin or cannot use it properly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A person who feels better should stop taking their blood pressure medicine without asking a health worker.",
    answer: false,
    explanation: "False. Medicines must be taken as prescribed; feeling well often means the treatment is working.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each chronic illness with a possible complication if it is not controlled.",
    pairs: [
      ["diabetes", "wounds on the feet that do not heal"],
      ["hypertension", "stroke"],
      ["asthma", "a severe attack of breathlessness"],
    ],
    extraRight: ["cholera"],
    explanation: "Diabetes damages nerves and blood vessels in the feet; hypertension can cause stroke; asthma can cause severe breathing attacks. Cholera is an infectious disease.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Diseases that cannot be passed from person to person are called {{blank:a}} diseases. World Diabetes Day is marked on 14 {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["non-communicable"], choices: ["non-communicable", "infectious", "endemic", "epidemic"] },
      { id: "b", accepted: ["November"], choices: ["November", "April", "December", "May"] },
    ],
    explanation: "Chronic illnesses are usually non-communicable (NCDs); World Diabetes Day is 14 November.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** risk factors for chronic illnesses such as diabetes and hypertension.",
    points: [
      "Any one of: unhealthy diet (salt, sugar, fat), physical inactivity, overweight, tobacco use, harmful alcohol use, stress, age, family history",
      "A second different risk factor",
      "A third different risk factor",
      "A fourth different risk factor",
    ],
    modelAnswer: "Too much salt and sugar in the diet, lack of exercise, smoking and family history.",
    explanation: "One mark per correct risk factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which a chronic illness affects a family.",
    points: [
      "Identifies cost of treatment",
      "Develops: money for transport, tests and medicines every month for years",
      "Identifies burden of care",
      "Develops: relatives (often women and girls) spend time caring, missing work or school",
      "Identifies loss of income if a breadwinner cannot work / dies",
      "Develops: the family's standard of living falls; children may leave school",
    ],
    modelAnswer: "The family must pay for transport to the clinic, tests and medicines every month, often for many years. Relatives, often women and girls, spend time caring for the sick person and may miss work or school. If the sick person is a breadwinner who can no longer work, the family loses income and its standard of living falls.",
    hints: ["Think of money, time and income."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could help its learners reduce their risk of chronic illness later in life, and explain how each would help.",
    points: [
      "Suggests regular physical activity / sport for all learners",
      "Explains that exercise builds lifelong habits and keeps weight healthy",
      "Suggests healthy food in the tuck shop/dining hall / health education / anti-tobacco and alcohol clubs",
      "Explains how it reduces a named risk factor",
    ],
    modelAnswer: "The school could make sure every learner takes part in sport or physical activity several times a week, which builds a habit of exercise and helps keep weight healthy. It could also sell fruit and water in the tuck shop instead of fizzy drinks and salty snacks, so learners eat less sugar and salt.",
    hints: ["Link each suggestion to a risk factor."],
    explanation: "One mark for each suitable suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: source("Source A", "results of a fictional health survey of 200 adults in one ward",
      table(["Habit", "Number of adults (out of 200)"], [["Add salt to food at the table", 120], ["Do less than 30 minutes of exercise a day", 140], ["Smoke tobacco", 30], ["Have had a blood pressure check in the past year", 50]])) +
      "\n\nStudy Source A and answer the questions. (The figures are invented for this question.)",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which risk factor was reported by the **largest** number of adults?",
        options: [
          ["too little exercise", "Correct: 140 adults."],
          ["adding salt at the table", "120 adults, fewer than 140."],
          ["smoking tobacco", "30 adults."],
          ["having a blood pressure check", "This is screening, not a risk factor."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Calculate how many adults had **not** had a blood pressure check in the past year, and state why this is a concern.",
        points: ["150 adults (200 - 50)", "Hypertension often has no symptoms, so many cases may go undetected"],
        modelAnswer: "150 adults had not been checked. This is a concern because hypertension often has no symptoms, so many people may have it without knowing.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the ward could use these results to reduce chronic illness.",
        points: [
          "Targets the biggest risk factors shown (exercise, salt)",
          "Suggests a practical action, e.g. walking or sports clubs, cooking demonstrations with less salt",
          "Suggests increasing screening, e.g. free blood pressure checks at gatherings or the clinic",
        ],
        modelAnswer: "The ward should focus on the most common risks: lack of exercise and salt. It could start community walking and sports groups and hold cooking demonstrations showing tasty meals with less salt. It could also arrange free blood pressure checks at markets, churches and meetings, because most adults have not been checked.",
      }),
    ],
    hints: ["In (c), let the biggest numbers guide your suggestions."],
    explanation: "A data-based practice item on risk factors and screening.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about preventing chronic illnesses.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** ways of preventing hypertension.",
        points: [
          "Way 1, e.g. eating less salt / a balanced diet",
          "Described: how it lowers blood pressure or the risk",
          "Way 2, e.g. regular exercise, healthy weight, no tobacco, no alcohol abuse, screening",
          "Described: how it lowers blood pressure or the risk",
        ],
        modelAnswer: "Eating less salt and more vegetables and fruit helps keep blood pressure normal. Regular exercise such as walking strengthens the heart and helps keep a healthy weight, which lowers blood pressure.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Preventing chronic illness is the responsibility of the individual, not the government.\" Discuss.",
        points: [
          ["Individual responsibility: diet, exercise, tobacco, alcohol, going for screening, taking treatment", 2],
          ["Government role: clinics, screening, medicines, health education, rules on tobacco/alcohol, healthy school food", 2],
          ["Limits on individual choice: cost of healthy food, lack of safe places to exercise, lack of information; others (families, schools, churches) also matter", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Individuals have a large part to play. Most risk factors are about daily choices: what we eat, whether we exercise, whether we smoke or drink too much, and whether we go for check-ups and take treatment.\n\nThe government also has an important role. It runs clinics, offers screening and medicines, educates the public and can make rules, for example on selling alcohol and tobacco to young people.\n\nIndividual choice also has limits. Healthy food can be expensive, some areas have no safe places to exercise, and many people do not know their blood pressure because screening is not near them. Families, schools and churches also shape habits.\n\nI disagree with the statement. Individuals must make healthy choices, but they can only do so when the government and communities make healthy choices possible and affordable.",
      }),
    ],
    hints: ["In (b), ask whether everyone is equally able to make healthy choices."],
    explanation: "A practice evaluative item on responsibility for preventing chronic illness.",
  });

  b.card("DEFINITION", "Chronic illness", "An illness that lasts a long time and usually develops slowly, e.g. diabetes, hypertension.");
  b.card("DEFINITION", "Non-communicable disease (NCD)", "A disease that cannot be passed from one person to another.");
  b.card("DEFINITION", "Diabetes", "A condition in which the body cannot control blood sugar because it makes too little insulin or cannot use it properly.");
  b.card("DEFINITION", "Hypertension", "Blood pressure that stays too high over a long time; a 'silent killer'.");
  b.card("DEFINITION", "Screening", "Testing people who feel well to find a disease early, e.g. a blood pressure check.");
  b.card("CONCEPT", "Name four risk factors we can change.", "Unhealthy diet, physical inactivity, tobacco use, harmful use of alcohol (also overweight, stress).");
  b.card("CONCEPT", "Give two possible complications of uncontrolled diabetes.", "Blindness, kidney damage, foot wounds and amputation, heart disease or stroke.");
  b.card("CONCEPT", "Give three effects of chronic illness on the nation.", "Pressure on hospitals, high spending on medicines, loss of skilled workers and productivity.");
  b.card("FACT", "When is World Diabetes Day?", "14 November.");
});
