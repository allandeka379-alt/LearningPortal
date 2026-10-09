// Slice W1b: UDI and Rhodesia, 1965-1979 (ZIMSEC topic 8.4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonial.udi", { file: "colonial/udi", keyPrefix: "colonial.udi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Ian Smith's government declare UDI?",
    options: [
      ["11 November 1965", "Correct."],
      ["31 December 1963", "That is when the Federation was dissolved."],
      ["2 March 1970", "That is when Rhodesia declared itself a republic."],
      ["28 April 1966", "That is the date of the battle of Chinhoyi."],
    ],
    answer: "A",
    explanation: "The Unilateral Declaration of Independence was made on **11 November 1965**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main aim of UDI?",
    options: [
      ["To keep power in white minority hands", "Correct: it was meant to prevent majority rule."],
      ["To join the Federation with Zambia and Malawi again", "The Federation had already ended and was not revived."],
      ["To hand over power gradually to African nationalist parties", "UDI was meant to block African majority rule."],
      ["To make Rhodesia a province of the Republic of South Africa", "Rhodesia declared itself independent, not part of South Africa."],
    ],
    explanation: "Settlers declared independence because Britain would grant it only with progress to majority rule.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the British government respond to UDI?",
    options: [
      ["It declared UDI illegal and imposed sanctions", "Correct: Wilson ruled out the use of force."],
      ["It sent troops to arrest Smith's cabinet in Salisbury", "Britain ruled out military force."],
      ["It recognised Rhodesia as an independent dominion", "Britain never recognised UDI."],
      ["It handed the problem to the Federation's government", "The Federation no longer existed in 1965."],
    ],
    answer: "A",
    explanation: "Harold Wilson's government declared UDI illegal, refused to use force and relied on sanctions, including an oil embargo.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does the abbreviation NIBMAR stand for?",
    options: [
      ["No Independence Before Majority African Rule", "Correct: British policy from December 1966."],
      ["National Independence By Mutual Agreement in Rhodesia", "This is not the policy; it is an invented phrase."],
      ["New Initiative for Black Majority and Racial equality", "This is not the policy; it is an invented phrase."],
      ["No International Boycott of Minority Administration in Rhodesia", "This reverses the meaning: the world imposed sanctions."],
    ],
    answer: "A",
    explanation: "**NIBMAR** meant Britain would not grant legal independence until there was majority rule.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where did Harold Wilson and Ian Smith hold talks in 1966 and 1968?",
    options: [
      ["On the warships HMS Tiger and HMS Fearless", "Correct: Tiger in December 1966, Fearless in October 1968."],
      ["At Lancaster House in London on both occasions", "Lancaster House was the 1979 conference."],
      ["In a train on the Victoria Falls bridge", "The Victoria Falls bridge talks were in 1975."],
      ["At Geneva under the chairmanship of the UN", "Geneva was the 1976 conference."],
    ],
    answer: "A",
    explanation: "Both sets of talks took place on Royal Navy ships off Gibraltar and failed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Smith-Home proposals of 1971 collapse?",
    options: [
      ["The Pearce Commission found most Africans rejected them", "Correct: the African National Council campaigned against them."],
      ["Smith's party voted against them in the Rhodesian parliament", "Smith's government had agreed to them."],
      ["The UN ordered Britain to withdraw them", "The UN did not order this."],
      ["Mozambique closed its border in protest", "Mozambique closed its border in 1976, years after the proposals had failed."],
    ],
    answer: "A",
    hints: ["The proposals had to be acceptable to the people as a whole."],
    explanation: "The Pearce Commission (1972) tested African opinion and reported that most Africans rejected the proposals, so the settlement failed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Land Tenure Act of 1969 do?",
    options: [
      ["Split land roughly equally between Europeans and Africans", "Correct: despite Africans being over twenty times as many."],
      ["Gave all commercial farms to resettled African families", "Land was not redistributed to Africans."],
      ["Abolished the reserves and allowed free land purchase", "It kept racial division; reserves became Tribal Trust Lands."],
      ["Gave the Company back the land it lost in 1918", "The Company had long ceased to govern."],
    ],
    answer: "A",
    hints: ["Compare the shares of land with the size of the two populations."],
    explanation: "The Land Tenure Act replaced the Land Apportionment Act but kept racial division, giving about half the land to a tiny European minority.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that sanctions did not work quickly?",
    options: [
      ["Manufacturing grew through import substitution", "Correct: the economy adapted and grew for several years."],
      ["Zambia's trade was badly damaged by the crisis", "This shows a cost to Zambia, not that sanctions failed."],
      ["The UN imposed mandatory sanctions in 1966", "This shows sanctions were imposed, not whether they worked."],
      ["No country formally recognised the republic of 1970", "This shows isolation, which supports sanctions' effect."],
    ],
    answer: "A",
    hints: ["Look for evidence that the Rhodesian economy coped."],
    explanation: "Sanctions-busting through South Africa and Mozambique and import substitution allowed the economy to grow in the late 1960s and early 1970s, although sanctions raised costs and later combined with the war to weaken Rhodesia.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rhodesia declared itself a republic in 1970.",
    answer: true,
    explanation: "True. On 2 March 1970 Rhodesia cut its last link with the British Crown; no state formally recognised it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The 1969 constitution allowed African representation in parliament to grow until Africans had a majority.",
    answer: false,
    explanation: "False. African representation could rise only with African income-tax payments and could never go beyond parity, so majority rule was ruled out.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role during UDI.",
    pairs: [
      ["Ian Smith", "Rhodesian Front Prime Minister who declared UDI"],
      ["Harold Wilson", "British Prime Minister who imposed sanctions"],
      ["Abel Muzorewa", "Led the African National Council against the 1971 proposals"],
      ["Lord Pearce", "Led the 1972 commission that tested African opinion"],
    ],
    explanation: "Smith declared UDI; Wilson responded with sanctions and talks; Muzorewa's African National Council campaigned \"No\"; the Pearce Commission reported the rejection.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Pearce Commission reports",
      "Talks on HMS Tiger",
      "Rhodesia declares itself a republic",
      "Talks on HMS Fearless",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["Tiger came before Fearless."],
    explanation: "HMS Tiger 1966; HMS Fearless 1968; republic 1970; Pearce Commission 1972.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Under the Land Tenure Act the African reserves were called {{blank:a}}. Oil reached Rhodesia mainly through {{blank:b}} and Mozambique.",
    blanks: [
      { id: "a", accepted: ["Tribal Trust Lands"], choices: ["Tribal Trust Lands", "Native Purchase Areas", "Protected Villages", "Communal Areas"] },
      { id: "b", accepted: ["South Africa"], choices: ["South Africa", "Zambia", "Tanzania", "Malawi"] },
    ],
    explanation: "Reserves were called Tribal Trust Lands (later Communal Areas after independence). South Africa and Portuguese-ruled Mozambique did not apply sanctions.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the political party, led by Ian Smith, that declared UDI.",
    accepted: ["Rhodesian Front", "the Rhodesian Front", "RF"],
    wrong: ["Rhodesia Party"],
    explanation: "The **Rhodesian Front** (formed 1962) won the 1962 and 1965 elections.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** reasons why the Rhodesian Front declared UDI.",
    points: [
      "Fear of African majority rule.",
      "Britain's refusal of independence without progress to majority rule (five principles).",
      "Zambia and Malawi became independent in 1964 while Southern Rhodesia was refused.",
      "To protect settler land, jobs and privileges.",
      "Belief that Britain would not use force / sanctions would fail / support from South Africa and Portugal / RF election victory 1965.",
    ],
    modelAnswer: "Fear of majority rule; British insistence on progress to majority rule; the independence of Zambia and Malawi in 1964; the wish to protect settler land and jobs; and confidence that Britain would not use force and South Africa and Portugal would help.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how the policies of the UDI government affected Africans.",
    points: [
      "1969 constitution blocked majority rule (parity at most).",
      "Land Tenure Act kept Africans on about half the land, much of it poor.",
      "Tribal Trust Lands became crowded / rural poverty.",
      "Detention of leaders, banned parties and censorship removed political rights.",
      "Protected villages disrupted farming and family life.",
      "Most economic gains (import substitution) went to Europeans; low African wages.",
    ],
    hints: ["Cover political, land, economic and security policies."],
    modelAnswer: "The 1969 constitution meant Africans could never have more than half the seats, so majority rule was blocked. The Land Tenure Act kept Africans on about half the land, often poor, and the Tribal Trust Lands became crowded. Nationalist leaders were detained or restricted, parties banned and the press censored. In war zones people were moved into protected villages, which disrupted farming and family life. Most of the benefits of import substitution went to Europeans while African wages stayed low.",
    explanation: "One mark per developed effect.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which Rhodesia got round international sanctions.",
    points: [
      "Identifies trade through South Africa / Portuguese Mozambique.",
      "Explains: these neighbours did not apply sanctions, so oil and goods came in and exports went out.",
      "Identifies import substitution.",
      "Explains: local factories made goods previously imported, so manufacturing grew.",
    ],
    hints: ["Think about neighbours and about local industry."],
    modelAnswer: "Rhodesia traded through South Africa and Portuguese-ruled Mozambique, which did not apply sanctions, so oil came in and exports such as tobacco were sold secretly. It also built up import substitution: local factories made goods that had been imported, so manufacturing grew.",
    explanation: "Two marks per method.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Read the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in a British newspaper in 1966, described in words", "A small man labelled \"Smith\" sits comfortably in an armchair on top of a pile of crates marked \"Oil - via Beira\", \"Tobacco\" and \"Chrome\". A large, red-faced British gentleman labelled \"Britain\" stands below, wagging a finger and holding a tiny paper sign reading \"Sanctions\". Behind Smith, a figure in a South African hat passes up another crate.", { described: true })}`,
    hints: ["Describe what the cartoonist shows, then explain the message and judge it."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** details in Source A that suggest Rhodesia was not being hurt by sanctions.", points: [
        "Smith sits comfortably on crates of oil, tobacco and chrome.",
        "A South African figure passes up more goods / the sanctions sign is tiny.",
      ], explanation: "Two details from the description." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoonist? Use details of the source.", points: [
        "Message: British sanctions were weak/ineffective.",
        "Detail: Britain only wags a finger and holds a tiny sign.",
        "Message: Rhodesia was supplied through neighbours.",
        "Detail: the South African figure and the \"via Beira\" crates.",
      ], explanation: "Message plus supporting detail." }),
      P.manual({ label: "(c)", marks: 6, stem: "How accurate is the cartoonist's view of sanctions in the years after UDI? Use the source and your own knowledge.", points: [
        "Accurate: oil and goods came through South Africa and Mozambique.",
        "Accurate: Britain refused to use force; sanctions were slow to bite.",
        "Accurate: import substitution and economic growth in the late 1960s.",
        "Less accurate: sanctions raised costs, limited investment and isolated Rhodesia (no recognition).",
        "Less accurate: UN mandatory sanctions from 1966/1968; later, with the war, they weakened the regime.",
        "Supported judgement (accurate for the late 1960s, less so for the 1970s).",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "The cartoon is largely accurate for the years just after UDI. Britain ruled out force and relied on sanctions, which Rhodesia got round because South Africa and Portuguese-ruled Mozambique did not apply them, so oil and other goods came in. The economy even grew in the late 1960s as local factories replaced imports. However, the cartoon exaggerates: sanctions raised costs, cut investment and foreign currency, and kept Rhodesia isolated, since no state recognised it. In the 1970s, with the war and the independence of Mozambique in 1975, these pressures helped to weaken the regime. So the cartoon is fair about the late 1960s but too simple as a view of sanctions over the whole period.", explanation: "Use own knowledge to test the cartoon's message." }),
    ],
    explanation: "Source-based practice question on sanctions (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider British, UN and African actions."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the features of the 1969 constitution.", points: [
        "Approved by referendum of a mainly white electorate.",
        "50 European seats in the House of Assembly.",
        "16 African seats: 8 directly elected, 8 chosen through chiefs.",
        "African seats could rise only with African income-tax payments, never beyond parity.",
      ], explanation: "Four features." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far did Britain's response to UDI between 1965 and 1972 help the African majority?", points: [
        ["Helped: refused to recognise UDI; NIBMAR from 1966 kept majority rule as a condition.", 2],
        ["Helped: sanctions and UN support isolated the regime.", 2],
        ["Helped: the Pearce Commission let Africans reject the 1971 proposals.", 2],
        ["Did not help: ruled out force; sanctions slow to bite; repeated talks (Tiger, Fearless, 1971 proposals) offered settler-friendly terms.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Britain's response helped Africans in some ways. It never recognised UDI, and from December 1966 NIBMAR meant that legal independence depended on majority rule. With UN support, sanctions isolated Rhodesia. When Britain agreed the Smith-Home proposals in 1971, it sent the Pearce Commission to test opinion, which allowed Africans, organised by Muzorewa's African National Council, to reject them.\n\nHowever, Britain ruled out force from the start, so the regime survived. Sanctions were weakly enforced and evaded through South Africa and Mozambique. The Tiger and Fearless talks and the 1971 proposals would have given the settlers independence with only slow progress to majority rule.\n\nOverall Britain's response helped only partly: it refused to accept minority independence, but it did little to end minority rule, which was finally brought down mainly by the armed struggle.", explanation: "Top level gives both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When was UDI declared?", "11 November 1965, by Ian Smith's Rhodesian Front government.");
  b.card("DEFINITION", "UDI", "Unilateral Declaration of Independence: independence declared by the settler government alone, without British consent.");
  b.card("DEFINITION", "NIBMAR", "No Independence Before Majority African Rule: British policy from December 1966.");
  b.card("FACT", "Where were the 1966 and 1968 talks held?", "On HMS Tiger (December 1966) and HMS Fearless (October 1968).");
  b.card("FACT", "What did the Pearce Commission find in 1972?", "That most Africans rejected the Smith-Home proposals.");
  b.card("FACT", "What did the Land Tenure Act (1969) do?", "Replaced the Land Apportionment Act, dividing land roughly equally between Europeans and Africans; reserves became Tribal Trust Lands.");
  b.card("DEFINITION", "Sanctions-busting", "Getting round sanctions, e.g. trading through South Africa and Mozambique, or making goods locally instead of importing them.");
  b.card("CONCEPT", "Give four reasons for UDI.", "Fear of majority rule; British conditions for independence; independence of Zambia and Malawi in 1964; protecting settler privilege (and confidence Britain would not use force).");
  b.card("FACT", "When did Rhodesia declare itself a republic?", "2 March 1970.");
});
