// Slice W1b: Responsible Government, 1923-1953 (ZIMSEC topic 8.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonial.responsible-government", { file: "colonial/responsible-government", keyPrefix: "colonial.responsible-government" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Land Apportionment Act passed?",
    options: [
      ["1930", "Correct: it divided the land of Southern Rhodesia by race."],
      ["1923", "1923 is when Responsible Government began."],
      ["1951", "1951 is the Native Land Husbandry Act."],
      ["1969", "1969 is the Land Tenure Act, which replaced it."],
    ],
    answer: "A",
    explanation: "The **Land Apportionment Act (1930)** gave Europeans about half of the land, including the best land and the towns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Responsible Government mean for Southern Rhodesia in 1923?",
    options: [
      ["Settler self-rule, with some British reserved powers", "Correct: it was self-government inside the British Empire."],
      ["Full independence from Britain with a seat at the League of Nations", "Southern Rhodesia was not independent."],
      ["Direct rule from London by the Colonial Office and a Governor", "Responsible Government replaced direct control with settler self-rule."],
      ["Majority rule with one person, one vote", "The vote was limited by qualifications; almost all voters were white."],
    ],
    answer: "A",
    explanation: "A Premier and cabinet answered to an elected Legislative Assembly; Britain kept reserved powers over discriminatory laws but never used them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the Industrial Conciliation Act of 1934 affect African workers?",
    options: [
      ["It kept them out of registered trade unions", "Correct: Africans were shut out of legal collective bargaining."],
      ["It gave them equal pay with white skilled workers", "It protected white workers from African competition."],
      ["It allowed them to buy land and houses freely in the towns", "Land in towns was European under the Land Apportionment Act."],
      ["It created the Rhodesia Native Labour Bureau", "That Bureau dates from 1903, under Company rule."],
    ],
    answer: "A",
    explanation: "By excluding Africans from the definition of employee, the Act kept them out of registered unions, industrial agreements and most apprenticeships.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who gained most from the Maize Control Act of 1931?",
    options: [
      ["White maize farmers, who received the better local price", "Correct: the pricing system protected them during the Depression."],
      ["African farmers in the reserves, who received higher prices", "African maize mostly received the lower price."],
      ["Mine workers, who received free maize rations", "The Act was about marketing and prices, not rations."],
      ["Portuguese traders in Mozambique", "The Act controlled marketing inside Southern Rhodesia."],
    ],
    answer: "A",
    explanation: "The Act's two-level pricing gave a better price in the local market, dominated by white farmers, and a lower price for most African maize.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was Prime Minister of Southern Rhodesia from 1933 to 1953?",
    options: [
      ["Godfrey Huggins", "Correct: he later became the first Prime Minister of the Federation."],
      ["Charles Coghlan", "Coghlan was the first Premier (1923-27)."],
      ["Ian Smith", "Smith became Prime Minister in 1964."],
      ["Roy Welensky", "Welensky was Federal Prime Minister from 1956."],
    ],
    answer: "A",
    explanation: "**Godfrey Huggins** led Southern Rhodesia for twenty years and promoted a \"two-pyramid\" policy of separate development.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Native Land Husbandry Act of 1951 help to unite rural and urban Africans against the government?",
    options: [
      ["It threatened families' cattle and land rights", "Correct: urban workers could lose land rights, and rural families lost cattle."],
      ["It closed all mission schools in the reserves", "The Act was about land and cattle, not schools."],
      ["It gave Africans the vote in the towns but not in the reserves", "The Act did not deal with the vote."],
      ["It moved the capital from Salisbury to Bulawayo", "No such move happened."],
    ],
    answer: "A",
    hints: ["Think about men working in towns whose families farmed in the reserves."],
    explanation: "Destocking, compulsory conservation works and individual land rights angered rural people, and men working in towns could lose their land at home, so the Act gave nationalists a cause in both town and countryside.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these was an early form of African protest in the 1920s-1940s?",
    options: [
      ["The general strike of 1948", "Correct: it showed the growing power of urban workers."],
      ["The Chinhoyi battle fought by ZANLA guerrillas in 1966", "Chinhoyi belongs to the armed struggle."],
      ["The formation of ZANU in 1963", "ZANU was formed in 1963, after this period."],
      ["The Unity Accord of 1987", "The Unity Accord came after independence."],
    ],
    answer: "A",
    hints: ["Check that the event falls between 1923 and 1953."],
    explanation: "Protest under Responsible Government included associations (Bantu Voters Association, 1923; Bantu Congress, 1934), the ICU, the 1945 railway strike and the 1948 general strike.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement about the British reserved powers after 1923?",
    options: [
      ["They gave no real protection, as Britain never used them", "Correct: no discriminatory law was ever vetoed."],
      ["They were used often to stop the Land Apportionment Act", "The Act was passed and came into force."],
      ["They gave Africans half of the seats in parliament", "Africans had almost no representation."],
      ["They allowed Britain to appoint the Prime Minister directly", "The Prime Minister came from the elected parliament."],
    ],
    answer: "A",
    hints: ["Ask whether the powers were ever actually used."],
    explanation: "Britain kept the right to refuse discriminatory laws but never did so, so laws such as the Land Apportionment Act and Industrial Conciliation Act went ahead.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Land Apportionment Act, Africans could not own land in the towns.",
    answer: true,
    explanation: "True. Towns were in the European area, so urban Africans were treated as temporary workers living in townships.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The vote under Responsible Government was openly restricted to white people by law.",
    answer: false,
    explanation: "False. The qualifications (income, property, education) were not racial in wording, but in practice they excluded almost all Africans.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each law with what it did.",
    pairs: [
      ["Land Apportionment Act (1930)", "Divided land into European and African areas"],
      ["Maize Control Act (1931)", "Controlled maize marketing with prices favouring white farmers"],
      ["Industrial Conciliation Act (1934)", "Kept Africans out of registered trade unions"],
      ["Native Land Husbandry Act (1951)", "Enforced destocking and individual land rights in the reserves"],
    ],
    explanation: "Land (1930), maize (1931), labour (1934) and conservation and control in the reserves (1951).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Industrial Conciliation Act",
      "The Rhodesia Bantu Voters Association is formed",
      "The Native Land Husbandry Act",
      "The African railway workers' strike",
    ],
    right: POS,
    rightIndex: [1, 0, 3, 2],
    hints: ["One event happened in the first year of Responsible Government."],
    explanation: "Bantu Voters Association 1923; Industrial Conciliation Act 1934; railway strike 1945; Native Land Husbandry Act 1951.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The first Premier under Responsible Government was {{blank:a}}. Africans were allowed to buy farms only in the Native {{blank:b}} Areas.",
    blanks: [
      { id: "a", accepted: ["Charles Coghlan"], choices: ["Charles Coghlan", "Godfrey Huggins", "Cecil Rhodes", "Joshua Nkomo"] },
      { id: "b", accepted: ["Purchase"], choices: ["Purchase", "Reserve", "Trust", "Husbandry"] },
    ],
    explanation: "Coghlan was Premier from 1923 to 1927. The Land Apportionment Act created Native Purchase Areas where a few Africans could buy farms.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the compulsory reduction of African-owned cattle in the reserves.",
    accepted: ["destocking", "de-stocking", "cattle destocking", "forced destocking"],
    wrong: ["culling"],
    explanation: "**Destocking**, enforced especially under the Native Land Husbandry Act (1951), was deeply resented.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** features of Responsible Government in Southern Rhodesia.",
    points: [
      "A Governor represented the British Crown.",
      "An elected Legislative Assembly made laws.",
      "A Premier/Prime Minister and cabinet answered to the Assembly.",
      "Qualified franchise, so almost all voters were white / Britain kept reserved powers.",
    ],
    modelAnswer: "A Governor represented the Crown; an elected Legislative Assembly made laws; a Premier and cabinet ran the government; the vote depended on income and property, so almost all voters were white, and Britain kept reserved powers.",
    explanation: "One mark per feature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the impact of the Land Apportionment Act (1930) on Africans.",
    points: [
      "Africans on land classed as European were moved.",
      "They were crowded into reserves, often on poorer land.",
      "Crowding caused overgrazing and soil erosion.",
      "Africans could not own land in towns, so urban Africans were treated as temporary.",
      "Only a few could buy land, in the Native Purchase Areas.",
      "The Act laid the base of land inequality that later fuelled nationalism and the land question.",
    ],
    hints: ["Think about rural people, town workers and the long term."],
    modelAnswer: "The Act gave Europeans about half the land, including the best areas, so many Africans living there were moved into the reserves. The reserves became crowded and overgrazed, and soil erosion followed. Africans could not own land in the towns, so urban workers had no security. Only a few could buy farms in the Native Purchase Areas. In the long term the Act created the land inequality that nationalists and the armed struggle fought against.",
    explanation: "One mark per developed point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** forms of African protest under Responsible Government.",
    points: [
      "Identifies associations (Bantu Voters Association / Bantu Congress).",
      "Explains: petitions and representations against discriminatory laws by educated leaders.",
      "Identifies strikes (1945 railway strike / 1948 general strike) or the ICU / Burombo.",
      "Explains: workers used their economic power to demand better pay and conditions.",
    ],
    hints: ["Give an organisation or event and say what it did."],
    modelAnswer: "Educated Africans formed associations such as the Southern Rhodesia Bantu Congress (1934), which sent petitions against discriminatory laws. Workers organised strikes: the railway workers' strike of 1945 and the general strike of 1948 used their economic importance to demand better wages and conditions.",
    explanation: "Two marks per form of protest.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "a letter by a fictional African teacher to a mission newspaper, 1953", "In my grandfather's time our family had forty head of cattle on the Nyanga side. Last year the officer came with his book and told my father he may keep six. My brother, who works in Bulawayo, has been told he has no land now, because he was not at home when the plots were measured. They say this is to save the soil. The soil was not tired when our cattle grazed the whole valley.")}`,
    hints: ["Identify the law the letter is describing before you judge the source."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the law whose effects are described in Source A, and give one detail that shows this.", points: [
        "The Native Land Husbandry Act (1951).",
        "Detail: cattle limited to six / brother lost land because he was away when plots were measured.",
      ], explanation: "Name the Act and support it from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "What can you infer from Source A about African attitudes to the law? Support your answer from the source.", points: [
        "Anger at the loss of cattle (from forty head to six).",
        "Resentment that town workers lost land rights.",
        "Distrust of the official explanation of soil conservation.",
        "Blames crowding/land loss rather than African farming for the soil problem.",
      ], explanation: "One mark per supported inference." }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence of the impact of the Native Land Husbandry Act? Use the source and your own knowledge.", points: [
        "Provenance: written by an African affected by the Act, close to the time.",
        "Provenance: a personal letter for publication, so it may be emotional or selective.",
        "Content supported: the Act did enforce destocking.",
        "Content supported: individual rights meant absent workers could lose land.",
        "Limitation: one family's experience; does not show the government's case about erosion in crowded reserves.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A was written in 1953 by an African teacher whose family was directly affected, so it shows how the Act was experienced at the time. What it describes is supported by own knowledge: the Native Land Husbandry Act did enforce destocking, and giving land rights only to those present when plots were allocated meant that men working in towns could lose their land. However, the letter describes one family and was written to persuade readers, so it is emotional and does not explain the government's argument that crowded reserves were suffering erosion. It is reliable on the impact on African families but not a full picture of the Act.", explanation: "Use provenance and content checked against own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider land, farming, labour and social policy, and decide which mattered most."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "State **four** reasons why Responsible Government was granted in 1923.", points: [
        "Settlers demanded self-government.",
        "The Company wanted to give up the costs of governing.",
        "Britain did not want to govern the colony directly.",
        "Settlers voted for it in the 1922 referendum (rejecting union with South Africa).",
      ], explanation: "Four reasons." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Land Apportionment Act was the most harmful policy for Africans under Responsible Government.\" How far do you agree?", points: [
        ["Agree: the Act gave Europeans about half the land including the best and the towns.", 2],
        ["Agree: removals, crowding and erosion in reserves; no land rights in towns.", 2],
        ["Other policy: Maize Control Act cut African farm incomes.", 2],
        ["Other policy: Industrial Conciliation Act kept Africans in low-paid jobs without unions.", 2],
        ["Other policy: Native Land Husbandry Act destocking and loss of land rights; segregation in education and health.", 2],
        ["Supported judgement (e.g. land was the base on which other policies rested).", 2],
      ], levels: levels(12), modelAnswer: "The Land Apportionment Act of 1930 did great harm. It gave Europeans, a small minority, about half of the land, including the best-watered areas and every town. Africans on land now classed as European were moved into reserves that became crowded and eroded, and Africans in towns could not own land and were treated as temporary.\n\nOther policies were also very damaging. The Maize Control Act of 1931 paid most African producers lower prices and so cut their income. The Industrial Conciliation Act of 1934 kept African workers out of registered unions and skilled trades. The Native Land Husbandry Act of 1951 forced destocking and took land rights from absent workers, and segregation meant poorer schools and hospitals.\n\nOn balance the Land Apportionment Act was the most harmful because the others built on it: crowded reserves were the reason given for destocking, and lack of land pushed Africans into the low-paid jobs controlled by the labour laws. But the harm came from the policies working together.", explanation: "Top level weighs several policies with a judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did Responsible Government begin?", "1 October 1923.");
  b.card("DEFINITION", "Responsible Government", "Self-government by ministers responsible to an elected colonial parliament, with Britain keeping some reserved powers.");
  b.card("FACT", "What did the Land Apportionment Act (1930) do?", "Divided land by race: about half (the best land and all towns) for Europeans; reserves and Native Purchase Areas for Africans.");
  b.card("FACT", "What did the Industrial Conciliation Act (1934) do?", "Excluded Africans from the definition of employee, keeping them out of registered unions and most apprenticeships.");
  b.card("FACT", "What did the Native Land Husbandry Act (1951) do?", "Enforced destocking, conservation works and individual land rights in the reserves.");
  b.card("DEFINITION", "Destocking", "The compulsory reduction of the number of cattle kept by African farmers.");
  b.card("CONCEPT", "Why did the reserved powers not protect Africans?", "Britain never used its right to veto discriminatory laws.");
  b.card("FACT", "Name two strikes by African workers under Responsible Government.", "The railway workers' strike of 1945 and the general strike of 1948.");
  b.card("CONCEPT", "Who benefited from the Maize Control Act (1931)?", "White farmers, who received the better local-market price; most African maize got the lower price.");
});
