// W3b: disease.zimbabwe-health (ZIMSEC only, Form 5). Data are illustrative (invented for this exercise); every number is computed in code.
// Real figures used (West Africa Ebola 2014-16: about 28 600 cases, 11 300 deaths) are rounded and attributed.
import { concept, P, geographyLevels, chk, rnd, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";

const know = chk((15200 / 16000) * 100, 95, 1e-9);
const overall = chk((16200 / 25000) * 100, 64.8, 1e-9);
const ebola = chk((8 / 20) * 100, 40, 1e-9);
// Struct A
const HT = [[1990, 60, 14, 60], [2000, 46, 25, 780], [2010, 51, 15, 1000], [2020, 61, 12, 800]];
const leFall = rnd(((60 - 46) / 60) * 100, 1, 23.3, "leFall");
const HTAB = tbl(["Year", "Life expectancy at birth (years)", "Adults living with HIV (%)", "Orphans due to AIDS (thousands)"], HT.map((r) => [r[0], r[1], r[2], String(r[3]).replace(/^(\d)(\d{3})$/, "$1 $2")]));
// Struct B
const PL = 20000, KN = 17000, ART = 14960, SUP = 13000;
const pKnow = chk((KN / PL) * 100, 85, 1e-9);
const pArt = chk((ART / KN) * 100, 88, 1e-9);
const pSup = rnd((SUP / ART) * 100, 1, 86.9, "pSup");
const pAll = chk((SUP / PL) * 100, 65, 1e-9);
const CT = tbl(["Stage of the treatment cascade", "People"], [["People living with HIV in the district (estimated)", "20 000"], ["Know their HIV status", "17 000"], ["On antiretroviral therapy", "14 960"], ["Virally suppressed", "13 000"]]);
const dep = rnd(((42 + 3) / 55) * 100, 1, 81.8, "dep");

concept("ageo.disease.zimbabwe-health", { file: "disease/zimbabwe-health", keyPrefix: "disease.zimbabwe-health", applies: ZIM }, (b) => {
  mc(b, 2, "RECALL", "Which of these is a way in which HIV is transmitted?", [
    ["From mother to child during pregnancy, birth or breastfeeding", "Correct: treatment of pregnant women greatly reduces this risk."],
    ["Sharing a cup or a plate with a person living with HIV", "HIV is not spread by sharing food or utensils."],
    ["Hugging or shaking hands with a person living with HIV", "HIV is not spread by casual contact."],
    ["The bite of a mosquito that has just fed on an infected person", "Mosquitoes do not transmit HIV."],
  ], "HIV spreads through **sex, blood and from mother to child**, not through casual contact.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is tuberculosis (TB) more common among people living with HIV?", [
    ["HIV weakens immunity, so the body cannot control TB", "Correct: HIV is the strongest risk factor for active TB."],
    ["HIV is a bacterium that turns into the TB bacterium in the lungs", "HIV is a virus and does not change into the TB bacterium."],
    ["TB is only spread by sexual contact, as HIV is in most cases", "TB spreads in the air."],
    ["People with HIV never take TB drugs because of the HIV drugs", "TB can be treated in people living with HIV."],
  ], "**Weakened immunity** makes TB infection more likely to become active disease.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "How is Ebola spread?", [
    ["By direct contact with the blood or fluids of a case", "Correct: this includes contact during care and burial."],
    ["By drinking water contaminated with human faeces and waste", "That describes cholera."],
    ["By the bite of an infected Anopheles mosquito at night", "That describes malaria."],
    ["By breathing air near a person walking in a busy street", "Ebola is not spread through ordinary airborne contact."],
  ], "Ebola spreads through **contact with body fluids**.");
  mc(b, 3, "ANALYSIS", "Which statement about cervical cancer is correct?", [
    ["It is caused by HPV and is prevented by vaccine and screening", "Correct: vaccination before infection and treatment of early changes prevent cancer."],
    ["It is spread through casual contact between women who live together", "Cancer is not spread by casual contact."],
    ["It cannot be prevented, as it is caused by diet alone in most women", "HPV infection is the cause, and prevention is possible."],
    ["It only affects women who have never been screened by a clinic", "Screening reduces risk but does not give immunity."],
  ], "**HPV vaccination and screening** can prevent cervical cancer.", { hints: ["What infection causes it?"] });
  mc(b, 3, "ANALYSIS", "Which is the best criterion for assessing a traditional remedy for a serious disease?", [
    ["Evidence that it is safe and effective, and does not delay proper treatment", "Correct: safety, effectiveness and delay of care are the key questions."],
    ["Whether it has been used by many people for a long time", "Long use alone does not prove effectiveness or safety."],
    ["Whether it is more expensive than medicines from a clinic", "Cost does not show that it works."],
    ["Whether the person who is selling the remedy is well respected in the local community", "Respect does not show that a remedy works."],
  ], "Assess with **evidence of safety and effectiveness** and the risk of delay.", { hints: ["Think of evidence."] });
  mc(b, 3, "EVALUATION", "Why do treatment programmes need to focus on the proportion of people who know their HIV status?", [
    ["Treatment cannot start until people know their status", "Correct: testing is the first step of the treatment cascade."],
    ["Testing cures HIV in many people who are found to have it", "Testing does not cure HIV."],
    ["Knowing their status prevents infection by itself, without treatment", "Prevention and treatment follow testing."],
    ["It reduces the number of people who need to visit any clinics", "It leads people to services."],
  ], "Testing is the **first step** in the cascade.", { hints: ["What happens after a positive test?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A person who is on effective antiretroviral therapy and has an undetectable viral load does not pass HIV on through sex.", answer: true,
    feedbackTrue: "Correct: this is known as undetectable equals untransmittable.", feedbackFalse: "Not so: with a suppressed viral load the risk of sexual transmission is effectively zero.",
    explanation: "Effective **ART** suppresses the virus so that it is not passed on through sex." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each disease to the best description.",
    pairs: [
      ["HIV", "A virus that attacks the immune system"],
      ["Tuberculosis", "A bacterial disease of the lungs that spreads in the air"],
      ["Ebola", "A viral disease spread by contact with body fluids"],
      ["Cervical cancer", "A cancer caused by long-lasting HPV infection"],
      ["MDR-TB", "TB that resists the main drugs, often after incomplete treatment"],
    ], explanation: "Each description gives the cause or route of the disease." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "HIV is a {{blank:a}} that attacks the immune system. Daily medicines that reduce the virus to very low levels are called {{blank:b}} therapy, and TB is treated with a course of about {{blank:c}} months.",
    blanks: [
      { id: "a", accepted: ["virus"], choices: ["virus", "bacterium", "parasite"] },
      { id: "b", accepted: ["antiretroviral"], choices: ["antiretroviral", "antibiotic", "rehydration"] },
      { id: "c", accepted: ["six"], choices: ["six", "one", "twenty-four"] },
    ], explanation: "HIV is a virus, treated with antiretroviral therapy; TB drugs are taken for six months." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What do the letters ART stand for in HIV care? Give the full name of the treatment.",
    accepted: ["antiretroviral therapy", "antiretroviral treatment", "anti-retroviral therapy", "antiretroviral"],
    explanation: "**Antiretroviral therapy** reduces the amount of HIV in the blood." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "In a district an estimated 16 000 people are living with HIV and 15 200 of them know their status. Calculate the percentage who know their status.",
    hints: ["Part ÷ whole × 100."],
    value: know, wrong: [5, 15.2, 105],
    explanation: "15 200 ÷ 16 000 × 100 = **95%**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "In another district (illustrative data) 25 000 people are living with HIV, 22 500 know their status, 20 250 of them are on ART and 16 200 of those on ART are virally suppressed. Calculate the percentage of all 25 000 people living with HIV who are virally suppressed, to one decimal place.",
    hints: ["Divide by the total number of people living with HIV, not by the number on ART."],
    value: overall, dp: 1, wrong: [80, 90, 16200],
    explanation: "16 200 ÷ 25 000 × 100 = **64.8%**. Dividing by 20 250 would give 80%, but that is only the share of people on ART who are suppressed." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "In the Ebola outbreak in Nigeria in 2014 there were 20 confirmed cases and 8 deaths. Calculate the case fatality rate as a percentage.",
    hints: ["Deaths ÷ cases × 100."],
    value: ebola, wrong: [2.5, 8, 28],
    explanation: "8 ÷ 20 × 100 = **40%**. The value 2.5 is cases per death." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe three ways of preventing the spread of HIV.",
    points: [
      "Using condoms correctly and having fewer sexual partners.",
      "Voluntary testing and counselling, with immediate treatment (ART) for those with HIV, and treatment of pregnant women to prevent mother-to-child transmission.",
      "Safe blood supplies and sterile needles, voluntary medical male circumcision and PrEP for people at high risk.",
    ],
    modelAnswer: "Using condoms and having fewer partners reduces the risk. Voluntary testing with immediate ART, and treatment of pregnant women, prevent transmission. Safe blood, sterile needles, male circumcision and PrEP for people at high risk also reduce spread.",
    explanation: "Behaviour, treatment and biomedical measures." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how HIV/AIDS has affected the development of Zimbabwe.",
    hints: ["Think of the workforce, households, health spending and children."],
    points: [
      "Many adults in the working years became ill or died, which reduced the workforce in farming, mining, teaching and health.",
      "Households lost income and spent on care and funerals, and many children were orphaned and cared for by older relatives.",
      "Government health spending rose, taking funds away from other needs, and life expectancy fell.",
      "Children left school to work or care for relatives, which reduced future skills.",
    ],
    modelAnswer: "Many adults in their working years became ill or died, which reduced the workforce in farming, mining, teaching and health. Households lost income and spent on care and funerals, and many orphans were cared for by older relatives. Government health spending rose, taking funds from other needs, and life expectancy fell. Some children left school to work or care for relatives, reducing future skills.",
    explanation: "Workforce, households, public spending and education." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why TB is difficult to control among people who live in overcrowded housing and work in mines.",
    hints: ["Think of airborne spread, ventilation, HIV and dust."],
    points: [
      "TB spreads in the air from coughs, so crowded and poorly ventilated rooms increase the number of exposures.",
      "Dust in mines damages the lungs, which raises the risk of TB, and workers live in shared quarters.",
      "A high share of workers are living with HIV, which weakens immunity and increases TB.",
      "Treatment lasts six months, and workers who move or miss doses may stop early, which causes drug-resistant TB and continued spread.",
    ],
    modelAnswer: "TB spreads in the air, so crowded, poorly ventilated rooms increase exposure. Dust in mines damages the lungs, raising the risk, and workers live in shared quarters. HIV in the workforce weakens immunity. Treatment lasts six months, and workers who move or miss doses may stop early, which causes drug-resistant TB and continued spread.",
    explanation: "Crowding, lung damage, HIV and treatment adherence." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Assess one advantage and one disadvantage of consulting a traditional healer for a long-term illness.",
    hints: ["Think of access, trust and evidence."],
    points: [
      "Advantage: healers are respected, nearby and affordable, offer personal and community support, and can encourage people to attend clinics.",
      "Disadvantage: some remedies have not been tested and may be unsafe or interact with medicines, and people may delay diagnosis and treatment.",
      "Judgement: traditional and scientific care can work together when practices are safe and linked to clinics.",
    ],
    modelAnswer: "An advantage is that healers are respected, nearby and affordable and can encourage people to attend clinics. A disadvantage is that some remedies are untested and may be unsafe or interact with medicines, and people may delay treatment. They can work together when practices are safe and linked to clinics.",
    explanation: "Balance access and trust against safety and delay." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows illustrative data for a country affected by a severe HIV epidemic (invented for this exercise).\n\n${HTAB}`,
    hints: ["Percentage fall = (60 − 46) ÷ 60 × 100.", "Compare the trends in HIV prevalence and life expectancy."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage fall in life expectancy between 1990 and 2000, to one decimal place.", value: leFall, dp: 1, unit: "%", wrong: [14, 30.4, 76.7],
        explanation: "(60 − 46) ÷ 60 × 100 = 23.3%. The value 14 is the fall in years; 30.4 divides by the new value." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the relationship between the percentage of adults living with HIV and life expectancy.",
        points: ["As HIV prevalence rose from 14% to 25% (1990–2000), life expectancy fell from 60 to 46 years.", "As prevalence fell to 15% in 2010 and 12% in 2020, life expectancy rose again, to 51 and 61 years.", "The relationship is therefore negative: higher prevalence is linked to lower life expectancy."],
        modelAnswer: "As HIV prevalence rose from 14% to 25% between 1990 and 2000, life expectancy fell from 60 to 46 years. As prevalence fell to 15% in 2010 and 12% in 2020, life expectancy rose to 51 and 61 years. The relationship is negative: higher prevalence goes with lower life expectancy.",
        explanation: "Quote paired values and state the direction of the relationship." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how a rise in the number of orphans affects development.",
        points: ["Orphans may leave school to work or care for siblings, which lowers education and skills.", "Families and grandparents have to spend limited income on more children, and some children live in child-headed households or on the street.", "The government and charities must spend more on support, and the loss of parents' knowledge and income affects future productivity."],
        modelAnswer: "Orphans may leave school to work or care for siblings, which lowers education and skills. Families and grandparents must spend limited incomes on more children, and some children live in child-headed households. The government and charities must spend more, and the loss of parents' knowledge and income affects future productivity.",
        explanation: "Education, household budgets and public spending." }),
    ], explanation: "Calculate a change, describe a relationship and explain a social effect." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows the treatment cascade for HIV in a district (illustrative data, invented for this exercise).\n\n${CT}`,
    hints: ["Each step's percentage uses the number at the previous step as the base.", "The weakest step is the one with the lowest percentage."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the percentage of people living with HIV who know their status.", value: pKnow, unit: "%", wrong: [15, 17, 118],
        explanation: "17 000 ÷ 20 000 × 100 = 85%." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of those who know their status who are on ART.", value: pArt, unit: "%", wrong: [74.8, 14960, 12],
        explanation: "14 960 ÷ 17 000 × 100 = 88%." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage of all people living with HIV in the district who are virally suppressed.", value: pAll, unit: "%", wrong: [86.9, 76.5, 13000],
        explanation: "13 000 ÷ 20 000 × 100 = 65%." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which step of the cascade has the lowest percentage (calculated from the previous step)?", options: [
        ["Knowing one's status (85%)", "Correct: it is lower than the ART step (88%) and the suppression step (86.9%)."],
        ["Being on ART (88%)", "This is the highest of the three."],
        ["Being virally suppressed (86.9%)", "This is higher than the first step."],
        ["All three steps are equal", "The percentages differ."],
      ], answer: "A", explanation: "Knowing status is the weakest step: 85%." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three ways of increasing the percentage of people who know their status.",
        points: ["Offering testing in communities, workplaces and clinics (including self-testing kits) so that it is easy to reach.", "Reducing stigma through education and counselling and keeping results confidential.", "Providing testing for every pregnant woman, TB patient and partner of a person with HIV."],
        modelAnswer: "Offer testing in communities, workplaces and clinics, including self-testing kits. Reduce stigma through education and counselling, and keep results confidential. Test every pregnant woman, TB patient and partner of a person with HIV.",
        explanation: "Access, stigma and targeted testing." }),
      P.manual({ label: "(f)", marks: 4, stem: "Assess how far medical services alone can end the HIV epidemic.",
        points: ["Medicines are very effective: ART keeps people healthy and prevents transmission, and PrEP and prevention in pregnancy cut new infections.", "But services depend on people choosing to be tested and to take medicines every day, which is affected by stigma, distance, cost and education.", "Poverty, gender inequality and migration for work affect risk and access, and cannot be solved by clinics alone.", "Funding, supplies and health workers must be sustained, so medical services are necessary but not enough without social change."],
        modelAnswer: "ART keeps people healthy and prevents transmission, and PrEP and treatment in pregnancy cut new infections. But success depends on people being tested and taking medicines every day, which is affected by stigma, distance, cost and education. Poverty, gender inequality and migration for work affect risk and access, and clinics cannot solve them alone. Funding and supplies must be sustained, so medical services are necessary but not enough.",
        explanation: "Weigh the power of medicine against social limits." }),
    ], explanation: "Calculate percentages in the cascade, identify the weakest step and assess the limits of medical services." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the role of indigenous (traditional) ways of preventing and treating disease alongside scientific medicine in Zimbabwe.",
    hints: ["Give strengths and limits, with criteria, and then a judgement."],
    points: [
      "Many people use traditional healers and herbal medicines: they are respected, nearby and affordable, and give personal and cultural support.",
      "Traditional leaders and healers can spread health messages and encourage testing and vaccination.",
      "Some herbal remedies have given modern medicines, so some traditional knowledge has value if tested.",
      "Many remedies have not been tested for safety or effectiveness, and some claim to cure HIV or cancer without evidence.",
      "Herbal products may interact with medicines such as ART, or harm the liver or kidneys.",
      "Consulting a healer first can delay diagnosis of TB, cancer or HIV, which reduces the chance of cure.",
      "Registration and regulation (for example by the Traditional Medical Practitioners Council), training and referral links with clinics can reduce risks.",
      "Judgement: traditional approaches have an important role in access and trust, but they should supplement and not replace tested medicine, so their value depends on evidence and cooperation with clinics.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Many people in Zimbabwe use traditional healers and herbal medicines because they are respected, nearby and affordable and offer personal and cultural support. Traditional leaders and healers can spread health messages and encourage testing. Some herbal remedies have given modern medicines. However, many remedies have not been tested for safety and effectiveness, and some claim to cure HIV or cancer without evidence. Herbs may interact with medicines such as ART, and visiting a healer first can delay diagnosis of TB, cancer or HIV. Registration, training and referral links with clinics reduce these risks. I conclude that traditional approaches have an important role in access and trust, but should supplement tested medicine, not replace it.",
    wordLimit: { max: 300 }, explanation: "Weigh strengths against limits using evidence criteria, and judge." });

  b.card("DEFINITION", "HIV and AIDS", "HIV is a virus that attacks the immune system; AIDS is the late stage of untreated infection. HIV spreads through sex, blood and from mother to child, not by casual contact.");
  b.card("CONCEPT", "HIV prevention and care", "Testing and counselling, antiretroviral therapy, prevention of mother-to-child transmission, condoms, male circumcision, PrEP and safe blood; funding through the AIDS levy and donors.");
  b.card("CONCEPT", "Effects of HIV/AIDS on development", "Loss of working-age adults, orphans, higher spending on health care, lower school attendance, lower life expectancy and stigma.");
  b.card("CONCEPT", "Tuberculosis", "An airborne bacterial lung disease; HIV is the strongest risk factor; cured by six months of drugs taken regularly; BCG vaccine for babies; incomplete treatment causes MDR-TB.");
  b.card("CONCEPT", "Ebola", "A viral disease spread by contact with body fluids; control by isolation, contact tracing, protective equipment, safe burial and vaccine; West Africa 2014–16 had about 28 600 cases and 11 300 deaths (rounded).");
  b.card("CONCEPT", "Cervical cancer", "Caused by long-lasting HPV infection; prevented by HPV vaccination of girls and screening with treatment of early changes; risk is higher with HIV.");
  b.card("CONCEPT", "Assessing indigenous medicine", "Ask: is it safe and effective (evidence)? Is it accessible and affordable? Does it delay proper care? Is the practitioner registered and linked to clinics?");
  b.card("FORMULA", "Treatment cascade", "Percentage at each step = number at that step ÷ number at the previous step × 100; overall = number virally suppressed ÷ all people living with HIV × 100.");
});
