// Slice W1b: the Federation of Rhodesia and Nyasaland, 1953-1963 (ZIMSEC topic 8.3).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonial.federation", { file: "colonial/federation", keyPrefix: "colonial.federation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Federation of Rhodesia and Nyasaland dissolved?",
    options: [
      ["31 December 1963", "Correct: the Federation ended at the close of 1963."],
      ["11 November 1965", "That is the date of UDI."],
      ["1 October 1923", "That is when Responsible Government began."],
      ["18 April 1980", "That is Zimbabwe's independence."],
    ],
    answer: "A",
    explanation: "The Federation lasted from 1953 to **31 December 1963**. Malawi and Zambia became independent in 1964.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three territories formed the Federation?",
    options: [
      ["Southern Rhodesia, Northern Rhodesia and Nyasaland", "Correct: today Zimbabwe, Zambia and Malawi."],
      ["Southern Rhodesia, Bechuanaland and Mozambique", "Bechuanaland and Mozambique were never in the Federation."],
      ["Northern Rhodesia, Tanganyika and Nyasaland", "Tanganyika was never in the Federation."],
      ["Southern Rhodesia, South Africa and Nyasaland", "South Africa was a separate independent state."],
    ],
    answer: "A",
    explanation: "The Federation joined **Southern Rhodesia, Northern Rhodesia and Nyasaland**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which economic argument was made for federation?",
    options: [
      ["Combining copper, industry and labour", "Correct: each territory was said to bring a strength."],
      ["Ending all trade with South Africa and Britain at once", "No such aim existed; trade with both continued."],
      ["Handing the copper mines to African cooperatives", "The mines stayed in the hands of foreign companies."],
      ["Abolishing the railways to save money on transport", "Railways were improved, not abolished."],
    ],
    answer: "A",
    explanation: "Northern Rhodesian copper, Southern Rhodesian industry and farming and Nyasaland's labour were said to make a stronger economy together, attracting investment for projects such as Kariba.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did most Africans in Nyasaland and Northern Rhodesia oppose federation?",
    options: [
      ["They feared Southern Rhodesian racial laws would spread north", "Correct: they also feared it would block majority rule."],
      ["They wanted to join the Union of South Africa instead", "Africans strongly opposed links with apartheid South Africa."],
      ["They wanted Portuguese rule to be extended to them", "No African movement sought Portuguese rule."],
      ["They objected to the building of a university college", "The university was not the reason for their opposition."],
    ],
    answer: "A",
    explanation: "Africans feared settler domination from Salisbury and the spread of Southern Rhodesia's land and pass laws, and saw federation as a barrier to independence under majority rule.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was Prime Minister of the Federation from 1956 until its end?",
    options: [
      ["Roy Welensky", "Correct: he succeeded Godfrey Huggins in 1956."],
      ["Ian Smith", "Smith became Prime Minister of Southern Rhodesia in 1964."],
      ["Hastings Banda", "Banda led the Nyasaland nationalists against federation."],
      ["Harold Macmillan", "Macmillan was British Prime Minister."],
    ],
    answer: "A",
    explanation: "Godfrey Huggins (1953-1956) and **Roy Welensky** (1956-1963) were the two Federal Prime Ministers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What did the Monckton Commission recommend in 1960?",
    options: [
      ["That territories should be able to leave", "Correct: it recognised strong African opposition."],
      ["That Southern Rhodesia should declare independence at once", "UDI came in 1965 and was illegal."],
      ["That the Federation should join South Africa", "No such recommendation was made."],
      ["That African nationalist parties should be banned", "The Commission did not recommend bans."],
    ],
    answer: "A",
    hints: ["The Commission found that Africans strongly opposed the Federation."],
    explanation: "The Monckton Commission's report showed the depth of African opposition and recommended that territories should have the right to secede, which helped bring the Federation's end.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which group was displaced to make way for Lake Kariba?",
    options: [
      ["The Tonga of the Zambezi valley", "Correct: about 57,000 people is the widely cited estimate."],
      ["The Ndebele of the Matopo hills", "The Matopos are far from the Zambezi valley."],
      ["The Manyika of the Eastern Highlands", "The Eastern Highlands were not flooded by Kariba."],
      ["The Ndau of the south-eastern lowveld", "The lowveld is far from Kariba."],
    ],
    answer: "A",
    hints: ["The lake filled part of the middle Zambezi valley."],
    explanation: "Building the dam (1955-1959) flooded the middle Zambezi valley; many Tonga families were moved, often against their will, to drier land.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why \"partnership\" failed to win African support?",
    options: [
      ["Land laws and colour bars stayed while Europeans held power", "Correct: partnership changed little that mattered."],
      ["Africans were given most federal seats but refused them", "Africans had only a handful of federal seats."],
      ["Partnership ended all segregation in Southern Rhodesia", "Major segregation laws remained in force."],
      ["The university college was closed to African students", "It was open to students of all races."],
    ],
    answer: "A",
    hints: ["Compare the promise of partnership with what stayed the same."],
    explanation: "Some petty segregation was relaxed, but land, pass and job laws stayed, and Europeans controlled the federal parliament, so Africans saw partnership as empty words.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The federal capital of the Federation of Rhodesia and Nyasaland was Salisbury.",
    answer: true,
    explanation: "True. The federal government and parliament were in Salisbury, which helped Southern Rhodesia gain most from federal spending.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When the Federation ended, its armed forces were shared equally between the three territories.",
    answer: false,
    explanation: "False. Southern Rhodesia kept most of the federal armed forces, including the air force, which strengthened the settler government before UDI.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Godfrey Huggins", "First Prime Minister of the Federation"],
      ["Hastings Kamuzu Banda", "Nyasaland nationalist leader arrested in 1959"],
      ["Kenneth Kaunda", "Northern Rhodesian nationalist leader"],
      ["Harold Macmillan", "British Prime Minister of the \"wind of change\" speech"],
    ],
    explanation: "Huggins and Welensky led the Federation; Banda and Kaunda led opposition in the north; Macmillan's change of policy helped end it.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Monckton Commission reports",
      "The referendum in Southern Rhodesia approves federation",
      "The Federation is dissolved",
      "States of emergency in Southern Rhodesia and Nyasaland",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The emergencies came the year before the Commission reported."],
    explanation: "Referendum April 1953; emergencies February-March 1959; Monckton Commission 1960; dissolution 31 December 1963.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Dam was built across the Zambezi between 1955 and 1959. In 1964 Nyasaland became independent as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Kariba"], choices: ["Kariba", "Kyle", "Cahora Bassa", "Mazowe"] },
      { id: "b", accepted: ["Malawi"], choices: ["Malawi", "Zambia", "Botswana", "Tanzania"] },
    ],
    explanation: "Kariba was the Federation's great project. Nyasaland became Malawi (July 1964) and Northern Rhodesia became Zambia (October 1964).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the one-word name of the Federation's official racial policy, which claimed that Europeans and Africans would advance together.",
    accepted: ["partnership", "racial partnership"],
    wrong: ["apartheid"],
    explanation: "**Partnership** was the official policy; Africans saw it as a cover for continued European control.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** reasons why settlers and the British government supported federation.",
    points: [
      "Economic: combine copper, industry and labour / larger market and investment.",
      "To strengthen settler control and move towards dominion status.",
      "To build a British-led bloc against Afrikaner nationalism in South Africa.",
      "To hold back African nationalism / Britain hoped to cut costs and promote \"partnership\".",
    ],
    modelAnswer: "A larger economy combining Northern Rhodesian copper, Southern Rhodesian industry and Nyasaland labour; stronger settler control; a British bloc against Afrikaner nationalism; and holding back African nationalism while cutting Britain's costs.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the successes and failures of the Federation.",
    points: [
      "Success: economic growth and investment in the 1950s.",
      "Success: Kariba Dam supplied hydro-electric power to industry and the Copperbelt.",
      "Success: multiracial university college / improved railways and roads.",
      "Failure: never won African consent; opposed from the start.",
      "Failure: partnership was hollow; land laws and colour bars remained.",
      "Failure: benefits concentrated in Southern Rhodesia / Tonga displaced by Kariba.",
    ],
    hints: ["Give three of each, with a fact for each."],
    modelAnswer: "The Federation brought economic growth and investment in the 1950s. Kariba Dam supplied power to the Copperbelt and Southern Rhodesian industry, and a multiracial university college opened in Salisbury. However, it never won African consent: Africans opposed it from the beginning. Partnership was largely words, since land laws and colour bars remained. Most benefits went to Southern Rhodesia, while copper revenue came from the north, and tens of thousands of Tonga were displaced for Kariba.",
    explanation: "One mark per supported success or failure.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the events of 1959 contributed to the collapse of the Federation.",
    points: [
      "Identifies the emergencies / arrests of nationalists in Southern Rhodesia and Nyasaland.",
      "Explains: deaths and detentions increased African anger and support for nationalism.",
      "Identifies the Devlin Report's criticism of the Nyasaland government.",
      "Explains: it embarrassed Britain and led towards the Monckton Commission and a change in policy.",
    ],
    hints: ["Think about the effect on Africans and the effect on Britain."],
    modelAnswer: "The emergencies of February and March 1959 led to bans, mass detentions and the deaths of dozens of Africans in Nyasaland, which increased support for nationalists such as Banda. The Devlin Report criticised the Nyasaland government severely, embarrassing Britain and leading it to set up the Monckton Commission and to rethink its support for the Federation.",
    explanation: "Two marks per way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a speech by a fictional European member of the federal parliament, 1956", "Look at what federation has given us in three short years. Investment pours in, the factories of Salisbury and Bulawayo are working day and night, and soon Kariba will give us power enough for the whole of central Africa. Partnership is not a slogan; it is the road on which all races will travel to prosperity."),
      source("Source B", "a pamphlet by a fictional group of African students in Nyasaland, 1959", "They speak of partnership while our leaders sit in prison. The factories are in Salisbury, the copper money goes south, and our people still need passes to look for work. We did not ask for this federation and we will not stay in it."),
    ])}`,
    hints: ["Compare what each source says about the economy and about partnership."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give **two** achievements of the Federation claimed in Source A.", points: [
        "Investment and industrial growth (factories working day and night).",
        "Kariba would provide power for central Africa.",
      ], explanation: "Two points from Source A." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B disagree with Source A? Explain your answer.", points: [
        "B accepts there are factories but says they are in Salisbury, so not everyone benefits.",
        "B says copper money goes south, challenging A's picture of shared prosperity.",
        "A says partnership is real; B says leaders are in prison and passes remain.",
        "Conclusion: they disagree strongly on partnership and on who gains.",
      ], explanation: "Credit specific comparison." }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more reliable about the effects of the Federation? Use both sources and your own knowledge.", points: [
        "A: a supporter speaking in parliament in 1956, before the troubles; aims to defend federation.",
        "A's claims of growth and Kariba are supported by own knowledge.",
        "B: written in 1959 during the emergency by opponents; aims to rally resistance.",
        "B's claims are supported: industry concentrated in Southern Rhodesia, copper revenue, pass laws, detentions.",
        "Both one-sided; each reliable on part of the picture.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A was spoken by a European federal politician in 1956, when the economy was booming, to defend the Federation. Its claims about investment and Kariba are supported by what we know, but it ignores African opposition and presents partnership as real. Source B was written by African students in 1959, during the Nyasaland emergency, to rally opposition, so it is equally one-sided. Its points are also supported: industry and the capital were in Southern Rhodesia, Northern Rhodesian copper revenue helped pay for development in the south, pass laws continued and leaders such as Banda were detained. Source B is more reliable about the effects on Africans, while Source A is accurate about economic growth; together they show a Federation that grew economically but failed politically.", explanation: "Credit provenance, purpose and checking content." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare African nationalism with British policy and other factors."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the steps that led to the formation of the Federation.", points: [
        "Victoria Falls conference of settler leaders (1949).",
        "Officials' conference in London and second Victoria Falls conference (1951).",
        "London conferences drafted the constitution (1952-1953).",
        "Southern Rhodesian referendum approved it (April 1953); Federation established 1953.",
      ], explanation: "Four steps in order." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "To what extent was African nationalism responsible for the collapse of the Federation?", points: [
        ["Nationalism: opposition from the start; Banda and the Nyasaland Congress; Kaunda in Northern Rhodesia.", 2],
        ["Nationalism: 1959 disturbances and emergencies showed the Federation lacked consent.", 2],
        ["British policy: Devlin Report, Monckton Commission, \"wind of change\" and decolonisation.", 2],
        ["Other: African majority governments in the north demanded secession; Rhodesian Front victory 1962 / failure of partnership.", 2],
        ["Supported judgement on relative importance.", 2],
      ], levels: levels(10), modelAnswer: "African nationalism was the main force behind the collapse. Africans opposed federation from the start, and from 1958 Hastings Banda's Nyasaland African Congress and Kenneth Kaunda's movement in Northern Rhodesia demanded secession and majority rule. The disturbances and emergencies of 1959 showed that the Federation could be held together only by force.\n\nBritish policy was also important. The Devlin Report criticised the Nyasaland government, the Monckton Commission recommended a right to secede, and after Macmillan's \"wind of change\" speech Britain moved towards decolonisation. When new constitutions gave Africans majorities in the north, their governments demanded to leave, and Britain accepted this in 1962-1963. Meanwhile partnership had failed and the Rhodesian Front's victory in 1962 showed Southern Rhodesian settlers rejecting it.\n\nOverall African nationalism was the most important factor, because British policy changed in response to it; but the Federation ended when it did because Britain was no longer willing to resist.", explanation: "Top level weighs nationalism against British policy with a judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did the Federation of Rhodesia and Nyasaland exist?", "From 1953 until it was dissolved on 31 December 1963.");
  b.card("DEFINITION", "Federation", "A union of territories under a central government for shared matters, with each territory keeping its own government for local matters.");
  b.card("DEFINITION", "Partnership (Federation)", "The official policy that Europeans and Africans would advance together; in practice Europeans kept control.");
  b.card("FACT", "Who were the two Federal Prime Ministers?", "Godfrey Huggins (1953-1956) and Roy Welensky (1956-1963).");
  b.card("FACT", "What did the Monckton Commission (1960) recommend?", "That the territories should have the right to leave (secede from) the Federation.");
  b.card("CONCEPT", "Why did the Federation collapse?", "African nationalism, the 1959 emergencies, the Devlin Report and Monckton Commission, Britain's turn to decolonisation, and African majority governments in the north demanding secession.");
  b.card("FACT", "What was the Federation's biggest development project?", "The Kariba Dam on the Zambezi (built 1955-1959), which displaced about 57,000 Tonga (a widely cited estimate).");
  b.card("CONCEPT", "Which territory gained most from the Federation?", "Southern Rhodesia: the capital, most new industry and the university were there, while much revenue came from Northern Rhodesian copper.");
  b.card("FACT", "What did Nyasaland and Northern Rhodesia become in 1964?", "Malawi (July 1964) and Zambia (October 1964).");
});
