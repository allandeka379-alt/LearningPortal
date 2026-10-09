// W4b: Pandemics and infectious diseases (her.global.pandemics). General public health information only.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.global.pandemics", { file: "global/pandemics", keyPrefix: "global.pandemics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A disease that spreads across many countries and continents is described as",
    options: [
      ["a pandemic", "Correct: pan means all or across."],
      ["endemic", "Endemic means always present in one area."],
      ["chronic", "Chronic means long-lasting, usually not infectious."],
      ["hereditary", "Hereditary means passed on through genes."],
    ],
    answer: "A",
    explanation: "A pandemic is an epidemic that spreads across many countries and continents.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Cholera is mainly spread through",
    options: [
      ["water or food contaminated with faeces", "Correct: cholera bacteria come from human waste."],
      ["mosquito bites at night", "Mosquitoes spread malaria, not cholera."],
      ["shaking hands with a healthy person", "A healthy person cannot pass on cholera."],
      ["eating too much sugar and salt", "Diet causes chronic illnesses, not cholera."],
    ],
    answer: "A",
    explanation: "Cholera spreads through drinking water or eating food contaminated with human waste.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Malaria is always present at a steady level in some low-lying parts of Zimbabwe. This means malaria is ___ there.",
    options: [
      ["endemic", "Correct: always present in an area."],
      ["a pandemic", "A pandemic spreads across many countries at once."],
      ["eradicated", "Eradicated would mean it no longer exists."],
      ["an epidemic everywhere", "An epidemic is a sudden rise above the normal level."],
    ],
    answer: "A",
    explanation: "Endemic diseases are constantly present in a particular area.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a way that HIV can be passed on?",
    options: [
      ["sharing razor blades or needles", "Correct: infected blood can pass on HIV."],
      ["hugging a person living with HIV", "HIV is not spread by hugging."],
      ["sharing a plate of food", "HIV is not spread by sharing plates."],
      ["being bitten by a mosquito", "Mosquitoes do not spread HIV."],
    ],
    answer: "A",
    explanation: "HIV spreads through unprotected sex, infected blood (shared sharp instruments) and from mother to child, not by everyday contact.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year did Zimbabwe record its first case of COVID-19?",
    options: [
      ["2020", "Correct: the first case was recorded in March 2020."],
      ["2019", "Cyclone Idai struck in 2019."],
      ["2008", "2008 is remembered for the start of a major cholera outbreak."],
      ["2016", "2016 is not linked to COVID-19."],
    ],
    answer: "A",
    explanation: "COVID-19 reached Zimbabwe in March 2020, the same month WHO declared a pandemic.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During a cholera outbreak, a council trucks safe water into a suburb and repairs burst sewers. Why are these actions more important than medicine alone?",
    options: [
      ["They remove the source of infection, so new cases stop", "Correct: cholera spreads through unsafe water and sanitation."],
      ["Cholera cannot be treated by any medicine", "Cholera can be treated, e.g. with oral rehydration."],
      ["Safe water cures people who are already sick", "Treatment at a clinic is still needed for the sick."],
      ["Sewers spread the disease through the air", "Cholera is not airborne."],
    ],
    answer: "A",
    hints: ["Medicine treats the sick; what prevents new infections?"],
    explanation: "Treatment saves the sick, but only safe water and sanitation stop new infections.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda fears being rejected and so refuses to be tested for HIV. Which problem does this show?",
    options: [
      ["stigma discourages testing and treatment", "Correct: fear of rejection keeps people from testing."],
      ["testing for HIV is banned in Zimbabwe", "Testing is widely available."],
      ["HIV cannot be detected by any test", "HIV tests are reliable."],
      ["treatment works only for people who never test", "Treatment depends on knowing one's status."],
    ],
    answer: "A",
    hints: ["Why might a person hide or avoid finding out?"],
    explanation: "Stigma makes people hide symptoms and avoid testing, which harms them and helps disease spread.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** evaluates the COVID-19 lockdowns in Zimbabwe?",
    options: [
      ["They slowed the spread but caused hardship for informal traders", "Correct: a balanced judgement of benefit and cost."],
      ["They had no effect on the spread of the disease at all", "Restricting contact does slow spread."],
      ["They benefited every family equally and caused no hardship to anyone at all", "Many families lost income."],
      ["They ended the pandemic in Zimbabwe within one week", "The pandemic lasted much longer."],
    ],
    answer: "A",
    hints: ["An evaluation gives both a benefit and a cost."],
    explanation: "Lockdowns reduced contact and slowed spread, but families who depend on daily informal trade lost income.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "There is a cure for HIV.",
    answer: false,
    explanation: "False. There is no cure, but antiretroviral therapy taken as prescribed lets people living with HIV lead long, healthy lives.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Washing hands with soap helps prevent the spread of cholera, dysentery and COVID-19.",
    answer: true,
    explanation: "True. Hand washing removes germs that spread through contaminated hands.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each disease with its main way of spreading.",
    pairs: [
      ["cholera", "water or food contaminated with faeces"],
      ["COVID-19", "droplets and particles in the air"],
      ["Ebola", "contact with the body fluids of a sick person"],
      ["HIV", "unprotected sex, infected blood, mother to child"],
    ],
    explanation: "Each disease spreads in a different way, so each needs different prevention.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The treatment that allows people living with HIV to live long, healthy lives is called {{blank:a}}. A sudden large outbreak in one country is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["antiretroviral therapy"], choices: ["antiretroviral therapy", "oral rehydration", "an antibiotic", "a vaccine"] },
      { id: "b", accepted: ["an epidemic"], choices: ["an epidemic", "an endemic disease", "a pandemic"] },
    ],
    explanation: "ART controls HIV; a sudden large outbreak in one area is an epidemic.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between endemic, epidemic and pandemic.",
    points: [
      "Endemic: always present in an area at a steady level",
      "Epidemic: a sudden rise in cases in one community, country or region",
      "Pandemic: spreads across many countries and continents",
    ],
    modelAnswer: "An endemic disease is always present in an area, such as malaria in some low-lying parts of Zimbabwe. An epidemic is a sudden rise in cases in one area, such as the cholera outbreak of 2008-2009. A pandemic spreads across many countries and continents, such as COVID-19.",
    explanation: "One mark for each correct meaning.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** economic effects of a pandemic such as COVID-19 on Zimbabwe.",
    points: [
      "Identifies loss of income for informal traders/workers",
      "Develops: lockdowns stopped trading, so families could not buy food",
      "Identifies business closures / job losses / fall in tourism",
      "Develops: businesses lost customers and laid off workers; tourists stopped coming",
      "Identifies higher government spending on health / less for development",
      "Develops: money went to testing, treatment and vaccines instead of roads or schools",
    ],
    modelAnswer: "Informal traders could not trade during lockdowns, so many families lost their daily income and struggled to buy food. Businesses lost customers and some closed or laid off workers, and tourism collapsed when borders closed. The government had to spend heavily on testing, treatment and vaccines, leaving less money for other development.",
    hints: ["Think of households, businesses and the government."],
    explanation: "One mark for each effect and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could reduce the spread of infectious diseases among its learners, and explain how each would help.",
    points: [
      "Suggests hand-washing points with soap and water / clean toilets",
      "Explains that germs from hands or faeces are removed, reducing cholera, dysentery and respiratory infections",
      "Suggests health education / sick learners stay home / ventilated classrooms / supporting vaccination campaigns",
      "Explains how it reduces contact with germs or builds knowledge",
    ],
    modelAnswer: "The school could put hand-washing points with soap outside the toilets and dining hall, which removes germs and reduces diarrhoeal diseases. It could also keep classroom windows open and ask learners with a cough or fever to stay home, which reduces the spread of diseases through the air.",
    hints: ["Hygiene and contact."],
    explanation: "One mark for each suitable measure and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: source("Source A", "a poster of the kind used in a public health campaign (described in words)",
      "The poster shows a tap with a bar of soap beside it, a covered water container and a clean toilet. Large words read: \"Clean hands, safe water, clean toilets: stop cholera.\" Underneath, smaller words say: \"Diarrhoea? Drink oral rehydration solution and go to the clinic at once.\"", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which disease is the poster mainly about?",
        options: [
          ["cholera", "Correct: the poster names cholera."],
          ["HIV", "HIV is not spread by dirty water."],
          ["diabetes", "Diabetes is not infectious."],
          ["COVID-19", "The poster's focus is water and sanitation."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** prevention measures shown on the poster.",
        points: ["Hand washing with soap", "Safe (covered) water / using clean toilets"],
        modelAnswer: "Washing hands with soap and keeping drinking water covered and safe (also clean toilets).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the poster tells people with diarrhoea to go to the clinic at once.",
        points: [
          "Cholera causes severe watery diarrhoea",
          "The body loses water quickly (dehydration), which can kill within hours",
          "Trained health workers can give rehydration and treatment / record and contain the outbreak",
        ],
        modelAnswer: "Cholera causes severe watery diarrhoea, so the body loses water very quickly and a person can die from dehydration within hours. At the clinic, trained health workers can give rehydration and treatment and report the case so the outbreak can be contained.",
      }),
    ],
    hints: ["In (c), think about how fast cholera can harm the body."],
    explanation: "A source-based practice item on preventing and responding to cholera.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about HIV and AIDS.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** social effects of HIV and AIDS on families and communities.",
        points: [
          "Effect 1, e.g. orphans / child-headed households",
          "Described: e.g. children care for siblings and may leave school",
          "Effect 2, e.g. stigma / burden of care / loss of breadwinners",
          "Described: e.g. people rejected or hide status; relatives spend time and money caring for the sick",
        ],
        modelAnswer: "Many children lost parents to AIDS, and some households came to be headed by children, who cared for younger siblings and sometimes left school. Stigma led some people living with HIV to be rejected, so others hid their status and avoided testing.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Evaluate the measures used to fight HIV and AIDS in Zimbabwe.",
        points: [
          ["Testing and ART: people live long, healthy lives; treatment also reduces transmission; limits: daily lifelong treatment, supply, stigma", 2],
          ["Prevention education and condoms/prevention of mother-to-child transmission: strengths and limits (behaviour change is slow)", 2],
          ["Funding and coordination (AIDS levy, National AIDS Council, partners): strengths and limits (dependence on donors)", 2],
          ["Supported overall judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Testing and antiretroviral therapy have been the most important measures. People who know their status and take ART every day can lead long, healthy lives, and effective treatment also greatly reduces the chance of passing HIV on. However, treatment must be taken for life, supplies must never run out, and stigma still keeps some people from testing.\n\nPrevention education in schools, churches and the media, condoms, and programmes to prevent mother-to-child transmission have helped many people protect themselves and their babies. Changing behaviour is slow, though, and myths still circulate.\n\nThe response is funded partly through the AIDS levy and coordinated by the National AIDS Council with partners such as the Global Fund. This shows national commitment, but much of the money still comes from outside partners, which is a risk if support falls.\n\nOverall, these measures have been largely successful in turning HIV from a death sentence into a manageable condition, but the fight is not over while stigma remains and new infections continue.",
      }),
    ],
    hints: ["In (b), give a strength and a limit of each measure, then judge."],
    explanation: "A practice evaluative item on the response to HIV and AIDS.",
  });

  b.card("DEFINITION", "Endemic", "A disease always present in an area at a steady level (e.g. malaria in some low-lying areas).");
  b.card("DEFINITION", "Epidemic", "A sudden rise in cases of a disease in one community or region, well above normal.");
  b.card("DEFINITION", "Pandemic", "An epidemic that spreads across many countries and continents (e.g. COVID-19).");
  b.card("FACT", "When did Zimbabwe record its first COVID-19 case?", "March 2020.");
  b.card("FACT", "When was Zimbabwe's major cholera outbreak?", "2008-2009.");
  b.card("CONCEPT", "How is cholera spread and prevented?", "Through water or food contaminated with faeces; prevented by safe water, toilets, hand washing and food hygiene.");
  b.card("CONCEPT", "Name three ways HIV is NOT spread.", "Hugging or shaking hands, sharing plates or cups, mosquito bites.");
  b.card("CONCEPT", "Why does stigma make epidemics worse?", "People who fear rejection hide symptoms and avoid testing and treatment, so disease spreads.");
  b.card("CONCEPT", "Give one strength and one weakness of COVID-19 lockdowns.", "Strength: slowed spread. Weakness: informal traders lost income and learners lost schooling.");
});
