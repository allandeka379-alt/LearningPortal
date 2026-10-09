// W3a: government as a social service provider (her.governance.social-services).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.social-services", { file: "governance/social-services", keyPrefix: "governance.social-services" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **BEAM** provide?",
    options: [
      ["School fees assistance for vulnerable children", "Correct: the Basic Education Assistance Module."],
      ["Electricity connections for rural homes and schools", "This is rural electrification."],
      ["Loans for farmers to buy seed and fertiliser", "BEAM is about school fees."],
      ["Boreholes for villages that are far from rivers", "Boreholes come from councils, ZINWA and partners."],
    ],
    answer: "A",
    explanation: "BEAM pays school fees for vulnerable children so that they can stay in school.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body collects **national taxes** in Zimbabwe?",
    options: [
      ["ZIMRA", "Correct: the Zimbabwe Revenue Authority."],
      ["ZINWA", "ZINWA manages water resources."],
      ["The Grain Marketing Board", "The GMB buys and stores grain."],
      ["The Registrar General", "The Registrar General issues birth certificates, IDs and passports."],
    ],
    answer: "A",
    explanation: "ZIMRA collects income tax, VAT, customs duty and other national taxes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **main** source of money for government social services?",
    options: [
      ["Taxes", "Correct."],
      ["Fines imposed by courts", "Fines are a small source."],
      ["Donations from pupils", "Pupils do not fund national services."],
      ["Sales of national flags", "This is not a source of funding."],
    ],
    answer: "A",
    explanation: "Taxes, allocated through the national budget, are the main source.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which department helps orphans, older people and families in poverty?",
    options: [
      ["The Department of Social Welfare", "Correct."],
      ["The Department of Immigration at the border", "Immigration controls entry and exit."],
      ["The Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["The Environmental Management Agency", "EMA protects the environment."],
    ],
    answer: "A",
    explanation: "Social welfare supports vulnerable people with fees assistance, food aid and care.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does government provide **clean water and sanitation**?",
    options: [
      ["To prevent diseases such as cholera that can spread to everyone", "Correct."],
      ["To earn profits that pay for the national army", "Water services are not run to fund the army."],
      ["Because private businesses are banned from selling water", "That is not the reason."],
      ["To encourage people to move from towns to rural areas", "That is not a reason for sanitation."],
    ],
    answer: "A",
    explanation: "Sanitation protects public health: disease spreads beyond the area where services fail.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai's parents have died, and his grandmother cannot pay his school fees in Hwange. Which government programme could help him?",
    options: [
      ["BEAM", "Correct: it pays fees for vulnerable children."],
      ["ESAP", "ESAP was an economic programme of the 1990s."],
      ["The AIDS levy", "The levy funds the HIV response, not school fees directly."],
      ["Devolution funds", "These go to provinces and councils, not to individual pupils."],
    ],
    hints: ["Which programme pays school fees?"],
    answer: "A",
    explanation: "BEAM supports orphans and vulnerable children with school fees.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might private businesses **not** build clinics in remote rural areas?",
    options: [
      ["Profits would be low because people are few and poor", "Correct: so government must step in."],
      ["The Constitution forbids private clinics", "Private clinics are allowed."],
      ["Rural people do not fall ill", "Rural people need health care too."],
      ["Clinics are cheaper to run in rural areas", "This would encourage, not prevent, building."],
    ],
    hints: ["Think about profit."],
    answer: "A",
    explanation: "Where profits are low, the market under-provides, so government provides the service.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure would **most directly** reduce the loss of nurses from public hospitals?",
    options: [
      ["Improving nurses' pay and working conditions", "Correct: this tackles the main reason they leave."],
      ["Building more schools in rural areas", "This helps education, not nurse retention."],
      ["Raising council rates for property owners", "Rates fund council services, not national nurses' pay."],
      ["Holding more Independence Day celebrations", "This would not keep nurses."],
    ],
    hints: ["Why do nurses leave?"],
    answer: "A",
    explanation: "Brain drain is driven mainly by pay and conditions.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The AIDS levy is a charge on income tax used to fund the national response to HIV.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Services that are free at the point of use cost nothing to provide.",
    answer: false,
    explanation: "False. They are paid for, mainly through taxes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each social service with a provider.",
    pairs: [
      ["Primary and secondary schools", "Ministry of Primary and Secondary Education"],
      ["District hospitals", "Ministry of Health and Child Care"],
      ["Refuse collection in towns", "Urban councils"],
      ["Fees assistance for orphans", "Department of Social Welfare"],
    ],
    explanation: "Different ministries, departments and councils share the work.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Many mission schools and hospitals are run by {{blank:a}}. The UN agency that works for children is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["churches"], choices: ["churches", "councils", "courts", "political parties"] },
      { id: "b", accepted: ["UNICEF"], choices: ["UNICEF", "UNESCO", "WFP", "WHO"] },
    ],
    explanation: "Churches run many mission schools and hospitals; UNICEF works for children.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** social services provided by government.",
    points: ["Education", "Health care", "Water and sanitation / housing", "Social welfare (e.g. BEAM) / transport / electricity"],
    modelAnswer: "Education, health care, water and sanitation, and social welfare.",
    explanation: "One mark per service.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why government provides education.",
    points: [
      "Builds a productive nation",
      "Developed: educated people find work, earn and contribute to development",
      "Protects a constitutional right / reduces inequality",
      "Developed: poor children get the same chance as others",
    ],
    modelAnswer: "Educated people can find work, earn money and contribute to the country's development, so education builds a productive nation. Education is also a right protected by the Constitution, and providing it publicly gives poor children the same chance as others.",
    hints: ["Think about the economy and fairness."],
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** challenges that government faces in providing health services.",
    points: [
      "Limited funds", "Developed: not enough money for medicines, equipment and staff",
      "Brain drain", "Developed: doctors and nurses leave, so clinics are short-staffed",
      "Disease and disasters / population growth / distance in rural areas", "Developed: demand rises suddenly or people cannot reach care",
    ],
    modelAnswer: "Government has limited funds, so hospitals may run short of medicines and equipment. Many doctors and nurses leave for better pay abroad, leaving clinics short-staffed. Outbreaks such as cholera or COVID-19 suddenly increase demand, and people in remote rural areas must travel far to reach a clinic.",
    hints: ["Money, staff and demand."],
    explanation: "Two marks per developed challenge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a notice (described in words) of the kind posted at a rural clinic", `The notice is headed "Our clinic, our responsibility". It thanks a church for a new maternity waiting home, the district council for a borehole, and villagers who moulded 20,000 bricks. It reminds patients that services for children under five and pregnant women are provided without charge, and asks the community to report broken taps and missing medicines to the health committee.`, { described: true }),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which **partner** in Source A provided the maternity waiting home?",
        options: [
          ["A church", "Correct."],
          ["The district council", "The council provided the borehole."],
          ["The villagers", "The villagers moulded bricks."],
          ["The health committee", "The committee receives reports."],
        ],
        answer: "A",
        explanation: "The notice thanks a church for the maternity waiting home.",
      }),
      P.tf({
        label: "(b)",
        stem: "According to Source A, the community has a role in protecting the clinic's services.",
        answer: true,
        explanation: "True: villagers moulded bricks and are asked to report broken taps and missing medicines.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain **two** ways in which citizens help to provide social services.",
        points: [
          "Contribute labour or materials (bricks)",
          "Developed: lowers costs so projects can be completed",
          "Report problems / serve on health committees",
          "Developed: faults and theft are dealt with quickly, so services keep running",
        ],
        modelAnswer: "Villagers contributed labour by moulding bricks, which lowered the cost of building so the project could be completed. They are also asked to report broken taps and missing medicines to the health committee, so faults and theft are dealt with quickly and the clinic keeps running.",
      }),
    ],
    hints: ["Quote the notice."],
    explanation: "Reading a described notice about partners in health services.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on funding social services.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **four** ways in which social services are funded.",
        points: ["Taxes collected by ZIMRA (income tax, VAT, customs duty)", "Levies such as the AIDS levy", "Council rates and service charges / user fees", "Loans, grants and partners (NGOs, churches, UN agencies)"],
        modelAnswer: "Social services are funded mainly by taxes such as income tax and VAT collected by ZIMRA; by special levies such as the AIDS levy; by council rates, service charges and some user fees; and by loans, grants and partners such as churches and UN agencies.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Social services should be provided by government alone.\" How far do you agree?",
        points: [
          ["For: government has a constitutional duty; can reach everyone fairly; partners may withdraw", 2],
          ["Against: government funds are limited; churches, NGOs and UN agencies fill gaps (mission hospitals, UNICEF, WFP)", 2],
          ["Against: citizens contribute labour, committees and payments; shared responsibility makes services sustainable", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Government has a duty under the Constitution to work towards rights such as education and health care, and it can plan services so that every region is reached fairly. Partners may also leave when their funding ends.\n\nHowever, government funds are limited, and partners fill important gaps. Churches run many mission schools and hospitals, and UN agencies such as UNICEF and WFP support child health and food aid. Citizens also contribute labour, serve on committees and pay rates and fees, which keeps services running.\n\nI disagree with the statement: government should lead and be responsible, but services are best provided through partnership.",
      }),
    ],
    hints: ["Consider government's duty and its limits."],
    explanation: "Describing funding and evaluating who should provide services.",
  });

  b.card("DEFINITION", "Social services", "Services provided or supported by government for citizens' welfare: education, health, housing, water, social welfare.");
  b.card("DEFINITION", "Social welfare", "Help for people who cannot meet their basic needs, such as orphans and older people.");
  b.card("FACT", "What is BEAM?", "The Basic Education Assistance Module: school fees assistance for vulnerable children.");
  b.card("FACT", "What is the AIDS levy?", "A charge on income tax that funds the national HIV response.");
  b.card("FACT", "Which body collects national taxes?", "ZIMRA, the Zimbabwe Revenue Authority.");
  b.card("CONCEPT", "Three reasons government provides social services?", "To protect rights, reduce poverty and inequality, and build a healthy, productive nation.");
  b.card("CONCEPT", "Four challenges in providing social services?", "Limited funds, population growth, brain drain, disasters and disease.");
  b.card("CONCEPT", "Two roles of citizens in social services?", "Pay taxes and rates; use services responsibly and report problems.");
  b.card("FACT", "Which UN agencies support health, children and food?", "WHO (health), UNICEF (children), WFP (food).");
});
