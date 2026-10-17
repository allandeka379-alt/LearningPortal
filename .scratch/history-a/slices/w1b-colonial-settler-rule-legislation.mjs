// W1b: ahist.colonial.settler-rule-legislation (ZIMSEC topic 8).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.colonial.settler-rule-legislation", { file: "colonial/settler-rule-legislation", keyPrefix: "colonial.settler-rule-legislation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Act of 1930 divided the land of Southern Rhodesia between the races?",
    options: [
      ["The Land Apportionment Act", "Correct: it created European and African areas."],
      ["The Native Land Husbandry Act", "This Act was passed in 1951."],
      ["The Industrial Conciliation Act", "This Act of 1934 concerned work and unions."],
      ["The Land Tenure Act", "This Act was passed in 1969."],
    ],
    answer: "A",
    explanation: "The Land Apportionment Act of 1930 divided land by race. The Land Tenure Act replaced it in 1969.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the effect of the Industrial Conciliation Act of 1934 on African workers?",
    options: [
      ["Africans were left out of the definition of employee, so they could not join registered unions", "Correct: it protected white workers from competition."],
      ["It gave Africans the same rate of pay as white workers doing the same jobs in factories", "It did not."],
      ["It abolished the pass laws in the towns of Southern Rhodesia", "It did not."],
      ["It guaranteed Africans the vote in all urban areas", "It had nothing to do with the vote."],
    ],
    answer: "A",
    explanation: "Because the Act excluded Africans from the definition of employee, they were shut out from the negotiating machinery and from skilled jobs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the aim of the Native Land Husbandry Act of 1951, according to the government?",
    options: [
      ["To improve farming and prevent overstocking and soil erosion in the reserves", "Correct: it set plots and limited cattle."],
      ["To give Africans the right to buy land in the European area", "The European area remained closed."],
      ["To increase the number of cattle in the reserves", "It limited cattle numbers."],
      ["To end the use of the reserves as African homes", "It dealt with farming inside them."],
    ],
    answer: "A",
    explanation: "The government said it was a conservation measure; Africans resented the destocking and loss of land that followed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the franchise in Southern Rhodesia is correct?",
    options: [
      ["It had no racial bar in law, but high qualifications kept almost all Africans off the roll", "Correct: it was non-racial in words only."],
      ["It excluded Africans by name in the Constitution of 1923, which listed the groups barred from voting", "There was no such law."],
      ["It gave every adult African man and woman the vote from 1923 on a common roll", "The vote was limited by qualifications."],
      ["It gave Africans a majority of seats in Parliament", "Africans had no majority."],
    ],
    answer: "A",
    hints: ["Think of income and property tests."],
    explanation: "Property and income tests meant that very few Africans could vote.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the Land Apportionment Act help to supply labour to white farms, mines and towns?",
    options: [
      ["It crowded Africans into poor reserves, so they sought wages elsewhere", "Correct: land shortage pushed people to work."],
      ["It forbade Africans from leaving the reserves for any purpose, including the search for paid work", "Many left to work."],
      ["It paid Africans high wages to leave their land", "Wages were low."],
      ["It gave the best land to African farmers to produce more food", "The best land went to whites."],
    ],
    answer: "A",
    hints: ["Think of what happened in the reserves."],
    explanation: "Overcrowded and eroded reserves could not support families, so men went to work for wages.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which territories formed the Federation of 1953?",
    options: [
      ["Southern Rhodesia, Northern Rhodesia and Nyasaland", "Correct: three British territories in central Africa."],
      ["Southern Rhodesia, Mozambique, Bechuanaland and the Union of South Africa", "Mozambique was Portuguese."],
      ["Southern Rhodesia and South Africa", "South Africa was not part of the Federation."],
      ["Northern Rhodesia, Tanganyika, Kenya and the Belgian Congo", "These were not part of the Federation."],
    ],
    answer: "A",
    hints: ["Think of what became Zimbabwe, Zambia and Malawi."],
    explanation: "The Federation of Rhodesia and Nyasaland united Southern Rhodesia, Northern Rhodesia and Nyasaland.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Federation collapsed?",
    options: [
      ["Growing African nationalism, especially in Nyasaland and Northern Rhodesia, and a change in British policy", "Correct: African opposition and British policy ended it."],
      ["The copper mines of Northern Rhodesia ran out in 1953, so the union was no longer worth keeping for Britain or the settlers", "The mines continued to operate."],
      ["Southern Rhodesia voted to join South Africa", "No such vote was held."],
      ["The Kariba Dam failed and could not provide electricity", "Kariba was completed."],
    ],
    answer: "A",
    hints: ["Which groups opposed it, and what did Britain do?"],
    explanation: "Opposition from Africans in the north, the Nyasaland emergency of 1959 and the Monckton Commission led Britain to accept its end in 1963.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the segregationist laws of 1923-1953 is best supported?",
    options: [
      ["They protected white interests and created grievances that later fed nationalism", "Correct: the laws protected whites and angered Africans."],
      ["They improved conditions for most Africans in the reserves and ended the shortage of land there", "Conditions generally worsened."],
      ["They were approved by most Africans in the referendum of 1922", "Africans did not vote then."],
      ["They were repealed in 1930 by the British government", "They were not repealed then."],
    ],
    answer: "A",
    hints: ["Who benefited, and what did the others do?"],
    explanation: "The Acts on land, work and movement served white interests, and the resentment they caused became a main theme of African politics.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Federation of Rhodesia and Nyasaland was dissolved on 31 December 1963.",
    answer: true,
    explanation: "True. Zambia and Malawi became independent in 1964.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Land Apportionment Act gave Africans and Europeans equal shares of the best land.",
    answer: false,
    explanation: "False. About half the land went to Europeans, who were a small minority; the reserves were in poorer areas.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "In practice, the slogan of partnership did not change the laws that discriminated against Africans in Southern Rhodesia.",
    answer: true,
    hints: ["Compare the slogan with the laws."],
    explanation: "True. Segregation in land, work and movement continued, so many Africans saw partnership as a slogan.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Act with its subject.",
    pairs: [
      ["Land Apportionment Act (1930)", "Division of land by race"],
      ["Industrial Conciliation Act (1934)", "Exclusion of Africans from registered unions and skilled jobs"],
      ["Native Registration Act (1936)", "Registration and pass requirements"],
      ["Native Land Husbandry Act (1951)", "Reorganisation of farming and limits on cattle in the reserves"],
    ],
    explanation: "These four Acts are the core of the topic.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each person with his role.",
    pairs: [
      ["Charles Coghlan", "First premier of self-governing Southern Rhodesia in 1923"],
      ["Godfrey Huggins", "Prime minister of Southern Rhodesia from 1933 and of the Federation from 1953"],
      ["Roy Welensky", "Federal prime minister from 1956"],
      ["Hastings Banda", "Nyasaland nationalist who opposed the Federation"],
    ],
    hints: ["Two led settler governments, one led the Federation later, one led opposition."],
    explanation: "These leaders appear in answers on settler rule and the Federation.",
  });
  {
    const events = [
      "Responsible government begins",
      "The Land Apportionment Act",
      "The general strike of African workers",
      "The Federation is formed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1923, 1930, 1948 and 1953."],
      explanation: "1923; 1930; 1948; 1953.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Land Apportionment Act was passed in {{blank:a}}, and the Federation of Rhodesia and Nyasaland began in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1930"], choices: ["1923", "1930", "1951", "1965"] },
      { id: "b", accepted: ["1953"], choices: ["1934", "1948", "1953", "1963"] },
    ],
    explanation: "Land Apportionment 1930; the Federation 1953.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In what year was the general strike of African workers in Bulawayo and other towns?",
    accepted: ["1948"],
    wrong: ["1953"],
    explanation: "**1948**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Land Apportionment Act of 1930.",
    points: ["It divided land into areas by race", "Roughly half of the land was for European ownership", "Africans were confined to reserves, mostly in poorer areas, with some Native Purchase Areas", "Africans could not buy land in the European area"],
    modelAnswer: "The Act divided the land by race. Roughly half went to Europeans, who were a small minority. Africans were confined to reserves, mostly in poorer areas, with a few Native Purchase Areas where better-off Africans could buy farms, and they could not buy land in the European area.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Native Land Husbandry Act of 1951 was unpopular.",
    points: [["It limited the number of cattle, and officials enforced destocking", 2], ["It reorganised holdings, so some people lost their land and a landless class grew, and Africans felt officials interfered with their way of life", 2]],
    hints: ["Think of cattle and land."],
    modelAnswer: "The Act limited the number of cattle and officials enforced destocking, which people saw as taking their wealth. It also reorganised holdings, so some people lost their land and a landless class grew, and Africans felt that officials were interfering with their way of life.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Federation of Rhodesia and Nyasaland was formed in 1953.",
    points: [["Economic: the copper of Northern Rhodesia, the labour of Nyasaland and the industry of Southern Rhodesia were expected to complement each other", 2], ["Political: settler leaders wanted a stronger state able to resist African nationalism, and Britain supported partnership", 2]],
    hints: ["Think about economics and politics."],
    modelAnswer: "The Federation was expected to bring economic strength, since the copper of Northern Rhodesia, the labour of Nyasaland and the industry of Southern Rhodesia would complement each other. Settler leaders also wanted a stronger state able to resist African nationalism, and Britain supported partnership.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional settler member of the Legislative Assembly, 1930",
        "This measure will give peace to the country. Each race will know where it may live and farm, and there will be no more disputes over land. The native will have his reserves and may buy land in the purchase areas, while the European will keep what he has made productive."),
      "",
      source("Source B", "a letter from a fictional African headman to a newspaper, 1931",
        "Our reserve is full of people and the soil is tired. The good land is held by the white farmers and we may not buy it. Where shall our children grow food, and how shall we pay the tax?"),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the purpose of the Act?", points: ["To divide land between races and avoid disputes", "To protect European farms / give Africans reserves and purchase areas"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the effects of the land division.", points: [["A presents it as peaceful and fair, B says the reserve is crowded and the soil exhausted", 2], ["Both agree that land is divided between reserves and white farms and that Africans may not buy land in the European area", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of the effects of the Act?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A was a speech by a settler politician, so it shows intentions and may justify the Act", 2], ["B is a headman's letter describing real conditions, but it is one view and aims to win sympathy", 2], ["Own knowledge of overcrowded reserves, erosion and cheap labour supports B on effects, and shows A as a justification", 2]], modelAnswer: "Source A is a speech by a settler politician, so it is useful for what the government said it intended, but it justifies the Act and does not describe its effects. Source B is a headman's letter describing real conditions, but it is one man's view and wished to win sympathy. My own knowledge of crowded reserves, soil erosion and the supply of cheap labour supports B on the effects, and shows A as a justification. B is therefore more reliable on the effects, and A on the aims." }),
    ],
    hints: ["For (c), consider who wrote each source and for whom."],
    explanation: "Both sources are invented: a settler politician's speech and an African headman's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of segregationist legislation on Africans in Southern Rhodesia between 1923 and 1953.",
    levels: levels(8),
    points: [
      ["Land: Land Apportionment Act; overcrowded reserves; erosion; Land Husbandry Act and destocking", 2],
      ["Work and movement: Industrial Conciliation Act, pass laws, low wages and exclusion from skilled jobs", 2],
      ["Political and social: no vote in practice, limited schools; African reactions in strikes and associations", 2],
      ["Judgement on the overall impact", 2],
    ],
    hints: ["Cover land, work and political rights, and weigh the whole."],
    modelAnswer: "The legislation had a severe impact on Africans. The Land Apportionment Act gave about half of the land to Europeans, leaving the reserves overcrowded and eroded, and the Land Husbandry Act brought destocking and the loss of land. The Industrial Conciliation Act kept Africans out of registered unions and skilled jobs, and the pass laws controlled their movement. Africans also had almost no vote and few schools. They reacted with associations, strikes such as that of 1948 and later political parties. I conclude that the impact was largely harmful, and it created the grievances on which nationalism was built.",
    explanation: "Credit explained effects and a supported judgement.",
  });

  b.card("DEFINITION", "What is segregation?", "The policy of keeping racial groups apart by law in land, housing, work and public life, with the best resources reserved for the dominant group.");
  b.card("FACT", "What did the Land Apportionment Act of 1930 do?", "Divided land by race, giving roughly half to Europeans and confining Africans to reserves and a few purchase areas.");
  b.card("FACT", "What did the Industrial Conciliation Act of 1934 do?", "Left Africans out of the definition of employee, shutting them out of registered unions and skilled jobs.");
  b.card("FACT", "When did the Federation of Rhodesia and Nyasaland begin and end?", "1953 to 31 December 1963.");
  b.card("FACT", "What was the Native Land Husbandry Act of 1951?", "An Act reorganising farming in the reserves with fixed plots and cattle limits, widely resented and later suspended.");
  b.card("CONCEPT", "Why was the Federation formed?", "For economic strength (copper, labour, industry) and to resist African nationalism, under the slogan of partnership.");
  b.card("CONCEPT", "Why did the Federation collapse?", "African nationalism in Nyasaland and Northern Rhodesia, the 1959 emergency, the Monckton Commission and a change in British policy.");
  b.card("CONCEPT", "How did the Land Apportionment Act supply labour?", "Crowded, poor reserves pushed men to seek wages on white farms, mines and in towns.");
  b.card("CONCEPT", "How did Africans react to segregationist laws?", "Through voters' associations, trade unions, strikes such as that of 1948, welfare societies and later nationalist parties.");
});
