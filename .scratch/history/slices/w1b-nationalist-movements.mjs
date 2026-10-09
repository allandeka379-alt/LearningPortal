// Slice W1b: mass nationalism in Zimbabwe, 1957-1964 (ZIMSEC topic 10.1).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.liberation.nationalist-movements", { file: "liberation/nationalist-movements", keyPrefix: "liberation.nationalist-movements" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was president of the Southern Rhodesia African National Congress formed in 1957?",
    options: [
      ["Joshua Nkomo", "Correct: he later led the NDP and ZAPU."],
      ["Ndabaningi Sithole", "Sithole became ZANU's first president in 1963."],
      ["Abel Muzorewa", "Muzorewa led the African National Council from 1971."],
      ["Herbert Chitepo", "Chitepo was a founder of ZANU and later its national chairman."],
    ],
    answer: "A",
    explanation: "**Joshua Nkomo** led the SRANC (1957), the NDP (from 1960) and ZAPU (1961).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which party was formed on 1 January 1960 after the banning of the SRANC?",
    options: [
      ["The National Democratic Party", "Correct: it was banned in December 1961."],
      ["The Zimbabwe African National Union", "ZANU was formed in 1963."],
      ["The Rhodesian Front", "The Rhodesian Front was a settler party formed in 1962."],
      ["The African National Council", "That was formed in 1971."],
    ],
    answer: "A",
    explanation: "The **NDP** (1960-1961) was followed by ZAPU (1961).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main political aim of the nationalist parties of 1957-1964?",
    options: [
      ["One person, one vote", "Correct: majority rule through universal adult suffrage."],
      ["Union with the Federation", "Nationalists opposed the Federation."],
      ["More seats for chiefs only", "They wanted votes for all adults."],
      ["A return to Company rule", "Company rule had ended in 1923."],
    ],
    answer: "A",
    explanation: "The SRANC, NDP, ZAPU and ZANU all demanded majority rule based on one person, one vote.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the SRANC campaign against the Native Land Husbandry Act?",
    options: [
      ["Destocking and land rules angered rural people", "Correct: this gave Congress mass rural support."],
      ["The Act gave chiefs control of all town housing", "The Act dealt with land and cattle in the reserves."],
      ["The Act banned African parties from holding rallies", "Bans came under other laws, such as the Unlawful Organisations Act."],
      ["The Act created the Federation of Rhodesia and Nyasaland", "The Federation was created by separate British legislation."],
    ],
    answer: "A",
    explanation: "Destocking, compulsory conservation works and new land allocation caused anger in the reserves, linking the Congress with rural people.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was the first president of ZANU in 1963?",
    options: [
      ["Ndabaningi Sithole", "Correct: Robert Mugabe was secretary-general."],
      ["Joshua Nkomo", "Nkomo led ZAPU and the PCC."],
      ["James Chikerema", "Chikerema was a City Youth League and ZAPU leader."],
      ["Michael Mawema", "Mawema was the first president of the NDP."],
    ],
    answer: "A",
    explanation: "ZANU was formed on 8 August 1963 with **Ndabaningi Sithole** as president.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the NDP reject the 1961 constitution after its delegates had attended the conference?",
    options: [
      ["It gave Africans only 15 of 65 seats", "Correct: members saw it as blocking majority rule."],
      ["It handed Southern Rhodesia over to South Africa", "The constitution did not do this."],
      ["It abolished the Federation immediately", "The Federation ended in 1963 for other reasons."],
      ["It made Nkomo Prime Minister without an election", "No such provision existed."],
    ],
    answer: "A",
    hints: ["Think about how many seats Africans would have."],
    explanation: "Fifteen of 65 seats fell far short of majority rule; after members' criticism the NDP rejected the constitution and held its own referendum.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which law, passed in 1960, gave the government wide powers against nationalist activity?",
    options: [
      ["The Law and Order (Maintenance) Act", "Correct: one of several repressive laws of 1959-1960."],
      ["The Industrial Conciliation Act", "That was a labour law of 1934."],
      ["The Land Tenure Act", "That was a land law of 1969."],
      ["The Legal Age of Majority Act", "That was passed after independence, in 1982."],
    ],
    answer: "A",
    hints: ["The law's name refers to keeping public order."],
    explanation: "The **Law and Order (Maintenance) Act (1960)**, with the Unlawful Organisations Act and Preventive Detention Act (1959), was used to ban, detain and punish nationalists.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best explains why bans did not end African nationalism between 1959 and 1964?",
    options: [
      ["Each banned party was replaced by a new one", "Correct: SRANC, NDP, ZAPU, then ZANU and PCC."],
      ["The bans were never actually enforced by police", "Bans were enforced and leaders were detained."],
      ["Britain overturned every ban in the courts", "Britain did not overturn the bans."],
      ["The Rhodesian Front supported majority rule", "The Rhodesian Front opposed majority rule."],
    ],
    answer: "A",
    hints: ["Look at what happened after each ban."],
    explanation: "Supporters re-formed under new names, showing that the grievances behind nationalism remained; but by 1964 detentions and bans had blocked peaceful politics, pushing leaders towards armed struggle.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The City Youth League organised a bus boycott in Salisbury in 1956.",
    answer: true,
    explanation: "True. The boycott against higher fares showed that township residents could be mobilised.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "ZANU was formed before ZAPU.",
    answer: false,
    explanation: "False. ZAPU was formed on 17 December 1961; ZANU on 8 August 1963 by leaders who broke away.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each party with the year it was formed.",
    pairs: [
      ["City Youth League", "1955"],
      ["Southern Rhodesia African National Congress", "1957"],
      ["National Democratic Party", "1960"],
      ["Zimbabwe African National Union", "1963"],
    ],
    explanation: "City Youth League 1955; SRANC 1957; NDP 1960; ZAPU 1961; ZANU 1963.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "ZAPU is banned",
      "The SRANC is banned in a state of emergency",
      "ZANU and the PCC are banned",
      "The NDP holds its own referendum on the 1961 constitution",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Bans came in 1959, 1962 and 1964."],
    explanation: "SRANC banned February 1959; NDP referendum 1961; ZAPU banned September 1962; ZANU and PCC banned August 1964.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "After the 1963 split, Nkomo's supporters formed the People's {{blank:a}} Council. In 1964 ZANU leaders were restricted at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Caretaker"], choices: ["Caretaker", "Democratic", "Liberation", "Unity"] },
      { id: "b", accepted: ["Sikombela"], choices: ["Sikombela", "Chimoio", "Lancaster House", "Altena Farm"] },
    ],
    explanation: "The **People's Caretaker Council (PCC)**; ZANU leaders were held at Sikombela, Nkomo at Gonakudzingwa.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the full name of ZAPU.",
    accepted: ["Zimbabwe African People's Union", "Zimbabwe African Peoples Union", "Zimbabwe African People Union"],
    wrong: ["Zimbabwe African National Union"],
    explanation: "ZAPU = **Zimbabwe African People's Union** (17 December 1961). ZANU = Zimbabwe African National Union.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe **four** activities of the nationalist movements between 1957 and 1964.",
    points: [
      "Mass rallies in towns and rural areas.",
      "Strikes, boycotts and demonstrations (e.g. 1956 bus boycott, 1960 marches).",
      "Petitions to Britain and the United Nations.",
      "Campaigns against the Native Land Husbandry Act / unofficial referendum of 1961 / sabotage in 1962.",
    ],
    modelAnswer: "They held mass rallies; organised boycotts and demonstrations such as the 1956 bus boycott and the 1960 marches; petitioned Britain and the UN; and campaigned in the reserves against destocking, while the NDP held its own referendum against the 1961 constitution.",
    explanation: "One mark per activity, with an example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the challenges faced by the nationalist movements between 1957 and 1964.",
    points: [
      "Bans (1959, 1961, 1962, 1964) forced repeated rebuilding.",
      "Detention and restriction of leaders cut them off from supporters.",
      "Repressive laws (Unlawful Organisations Act, Preventive Detention Act, Law and Order (Maintenance) Act).",
      "Divisions: the 1963 split and clashes between supporters.",
      "Rise of the Rhodesian Front (1962) closed the door to reform.",
      "Little outside help / lack of money and resources.",
    ],
    hints: ["For each challenge, say how it weakened the movement."],
    modelAnswer: "Each party was banned in turn, so leaders had to rebuild organisations repeatedly. Leaders were detained or restricted, cutting them off from supporters. Laws such as the Unlawful Organisations Act, Preventive Detention Act and Law and Order (Maintenance) Act gave the government sweeping powers. In 1963 the movement split into ZANU and the PCC, and rivalry weakened it. The Rhodesian Front's victory in 1962 closed the door to reform, and Britain and the UN offered little practical help.",
    explanation: "One mark per developed challenge.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** effects of the 1963 split in the nationalist movement.",
    points: [
      "Identifies two rival parties/armies (ZANU and ZAPU/PCC).",
      "Explains: divided effort and resources; competition for support and foreign backing.",
      "Identifies clashes between supporters in the townships.",
      "Explains: gave the government an excuse to ban both parties (1964) / weakened unity until the Patriotic Front (1976).",
    ],
    hints: ["Think about short-term and long-term effects."],
    modelAnswer: "The split created two rival parties, later with two armies, so effort and resources were divided and each competed for support at home and abroad. Clashes between supporters in the townships in 1963-64 gave the government a reason to ban both ZANU and the PCC in 1964, and disunity continued until the Patriotic Front of 1976.",
    explanation: "Two marks per effect.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a statement by a fictional government minister in Salisbury, 1959", "The Congress claims to speak for the African people. It does not. The great majority of Africans are peaceful and want only good government. A handful of agitators, many of them unemployed, have stirred up trouble in the reserves. By removing them we protect the ordinary African."),
      source("Source B", "the memories of a fictional woman from Highfield, recorded in 1990", "My father was taken in the night in February 1959. Nobody told us where. The next week my mother went to the meeting at the hall, even though it was forbidden. There were more women there than men, because the men had been taken. They could take people, but they could not take what people wanted."),
    ])}`,
    hints: ["Consider who produced each source, when, and for what purpose."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reason does Source A give for the government's actions against the Congress?", points: [
        "The Congress did not represent most Africans.",
        "A handful of agitators were causing trouble, so removing them protected ordinary Africans.",
      ], explanation: "Two points from Source A." }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B challenge the view given in Source A? Use details from both sources.", points: [
        "A says most Africans did not support Congress; B shows people still met after the ban.",
        "A presents the arrests as protecting Africans; B shows them as frightening and secret (taken in the night).",
        "B shows women taking part, suggesting wide support beyond a handful of agitators.",
        "B's conclusion that they could not take what people wanted contradicts A's claim.",
      ], explanation: "Specific challenges with details." }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are Sources A and B as evidence of support for nationalism in 1959? Use both sources and your own knowledge.", points: [
        "A: government statement intended to justify the emergency, so biased.",
        "A contradicted by own knowledge: SRANC's mass support, the NDP formed soon after.",
        "B: an eyewitness from a family directly affected; personal and emotional.",
        "B recorded in 1990, over 30 years later, after independence: memory may be shaped by later events.",
        "B supported by own knowledge: hundreds detained without trial in February 1959.",
        "Supported judgement on reliability of each.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A is a government statement made to justify the 1959 emergency, so it has a clear purpose to persuade people that the Congress had little support. Own knowledge contradicts it: the SRANC had held large rallies and won support in the reserves against the Native Land Husbandry Act, and within a year the NDP attracted even larger crowds. Source B comes from someone whose family was directly affected, which makes it valuable for showing the experience of the detentions, but it was recorded in 1990, after independence, so memory may have been shaped by later events. Its detail that people were taken in February 1959 without explanation fits what we know of the mass detentions. Source B is more reliable as evidence of support for nationalism, although both must be used with care.", explanation: "Evaluate both sources with own knowledge." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider government repression and the movement's own weaknesses."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the activities of the National Democratic Party (1960-1961).", points: [
        "Mass rallies and recruitment after its formation on 1 January 1960.",
        "Demonstrations and marches after leaders' arrest in July 1960.",
        "Attended the 1961 constitutional conference.",
        "Rejected the 1961 constitution and held its own unofficial referendum; petitions to Britain/UN.",
      ], explanation: "Four activities." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "To what extent was government repression the main reason why the nationalist movements had not won majority rule by 1964?", points: [
        ["Repression: bans of SRANC, NDP, ZAPU, ZANU/PCC.", 2],
        ["Repression: detention/restriction of leaders; laws of 1959-1960.", 2],
        ["Other: divisions after 1963 and clashes between supporters.", 2],
        ["Other: Rhodesian Front victory; Britain unwilling to intervene; lack of resources/weapons.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Government repression was very important. Each party was banned in turn, from the SRANC in 1959 to ZANU and the PCC in 1964, and laws such as the Unlawful Organisations Act, the Preventive Detention Act and the Law and Order (Maintenance) Act allowed leaders to be detained without trial. By 1964 the main leaders of both movements were detained or restricted.\n\nOther factors also mattered. The 1963 split divided the movement and led to clashes that gave the government an excuse for new bans. The settler electorate chose the Rhodesian Front in 1962, which was determined never to accept majority rule, and Britain would not intervene. Nationalists had little money and no weapons with which to challenge the state.\n\nOverall repression was the main reason, because it removed leaders and made peaceful protest impossible; but divisions and the lack of outside support made repression easier to carry out.", explanation: "Top level weighs repression against other factors." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was the Southern Rhodesia African National Congress formed and banned?", "Formed 12 September 1957; banned 26 February 1959.");
  b.card("FACT", "List the nationalist parties 1955-1963 in order.", "City Youth League (1955), SRANC (1957), NDP (1960), ZAPU (1961), ZANU (1963).");
  b.card("FACT", "Who were ZANU's first president and secretary-general (1963)?", "Ndabaningi Sithole (president) and Robert Mugabe (secretary-general).");
  b.card("FACT", "Name three repressive laws of 1959-1960.", "Unlawful Organisations Act (1959), Preventive Detention Act (1959), Law and Order (Maintenance) Act (1960).");
  b.card("DEFINITION", "Majority rule", "Government chosen by all adults voting equally: one person, one vote.");
  b.card("FACT", "What did the 1961 constitution offer Africans?", "15 of the 65 seats in parliament; the NDP rejected it.");
  b.card("FACT", "What was the PCC?", "The People's Caretaker Council, formed by Nkomo's ZAPU supporters in 1963 after the split.");
  b.card("CONCEPT", "Give four challenges nationalists faced in 1957-1964.", "Bans, detention of leaders, repressive laws, divisions after 1963 (also the Rhodesian Front's rise and little outside help).");
  b.card("FACT", "What happened to ZANU and the PCC in August 1964?", "Both were banned and their leaders detained or restricted (e.g. Gonakudzingwa, Sikombela).");
});
