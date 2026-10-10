// W4b: Christianity, Islam and the liberation struggle (Topic 13.3).
// Reviewer notes: CCJP founded 1972; Bishop Donal Lamont convicted 1976 and deported 1977; Muzorewa (ANC chair 1971,
// prime minister of Zimbabwe Rhodesia 1979); Sithole (ZANU, 1963); Banana (first President 1980, ceremonial); WCC Programme
// to Combat Racism (1970) with the controversial 1978 grants, outline only. Muslims' role is documented too thinly to describe,
// so questions only ask about the limits of the evidence. All churches and people in the sources are fictional.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.liberation.churches", { file: "liberation/churches", keyPrefix: "liberation.churches" }, (b) => {
  mc(b, 1, "RECALL", "Which Catholic bishop of Umtali was convicted for failing to report guerrillas and later deported?",
    ["Donal Lamont", "Correct: Bishop Donal Lamont."],
    [["Abel Muzorewa", "Muzorewa was a United Methodist bishop who led the African National Council."],
     ["Ndabaningi Sithole", "Sithole was a Congregational minister who led ZANU in 1963."],
     ["Canaan Banana", "Banana was a Methodist minister and later the first President."]],
    "**Bishop Donal Lamont** of Umtali was convicted for failing to report guerrillas and later deported.");
  mc(b, 2, "UNDERSTANDING", "Which church minister became the first President of Zimbabwe in 1980?",
    ["Rev. Canaan Banana", "Correct: a Methodist minister; the presidency was ceremonial."],
    [["Bishop Donal Lamont", "Lamont was a Catholic bishop who was deported in 1977."],
     ["Bishop Abel Muzorewa", "Muzorewa was prime minister of Zimbabwe Rhodesia in 1979."],
     ["Rev. Ndabaningi Sithole", "Sithole led ZANU in 1963 and was not the first President."]],
    "**Rev. Canaan Banana**, a Methodist minister, became the first President of Zimbabwe in 1980.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In what way can mission schools be said to have helped nationalism indirectly?",
    ["They educated Africans who later used ideas of justice and equality", "Correct: many nationalists were educated in mission schools."],
    [["They taught pupils that settler rule was the will of the ancestors", "Mission schools did not teach this."],
     ["They closed all schools so that pupils joined the army at once", "Mission schools continued teaching during most of the period."],
     ["They refused to teach reading in order to protect the settlers", "Mission schools taught reading and writing."]],
    "Mission schools **educated Africans** who later used ideas of justice and equality in their case against discrimination.");
  mc(b, 2, "UNDERSTANDING", "What was the World Council of Churches' Programme to Combat Racism, begun in 1970?",
    ["A programme of grants for humanitarian work by groups fighting racism", "Correct: grants went to groups including some liberation movements, and caused controversy."],
    [["A plan to build new mission schools for the children of settlers", "It was about fighting racism, not building settler schools."],
     ["A military alliance of churches in the countries of southern Africa", "It was not a military alliance."],
     ["An agreement among churches to sell mission land to the state", "It was not about land sales."]],
    "The Programme to Combat Racism gave **humanitarian grants** to groups fighting racism, including some liberation movements, and it caused controversy.");
  mc(b, 3, "APPLICATION", "In 1977 a fictional mission headteacher is asked for food by guerrillas at night and questioned by soldiers the next morning. How is the mission station best described?",
    ["Caught between the two sides", "Correct: each side placed demands on the mission and its staff."],
    [["Fully allied with the guerrillas and secure from the soldiers", "The soldiers questioned the staff, so the station was not secure."],
     ["Entirely unaffected because it was run by a church", "The example shows it was affected."],
     ["Working with the soldiers and the guerrillas as one unit", "The two sides were in conflict."]],
    "Many mission stations were **caught in the middle**, with demands and dangers from both sides.",
    { daily: true, hints: ["Think of who visited at night and who visited in the morning."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a fictional parish newsletter, Gweru, 1975",
    "At our meeting on Sunday the council could not agree. Some members said the church must stay out of politics and keep the peace. Others said that the church must speak against unjust laws and care for families in the villages. We pray that we may stay united.") + "\n\nWhich statement is best supported by Source A?",
    ["Members of one church held different views on the church's role", "Correct: the council could not agree."],
    [["Every member of the council wished the church to avoid all comment", "Some members wanted the church to speak against unjust laws."],
     ["The parish had voted to support the guerrillas in the war", "No such vote is mentioned."],
     ["The newsletter proves that all churches in Gweru agreed with each other", "The source concerns one parish and shows disagreement."]],
    "The source shows **disagreement within one church** about its role.",
    { hints: ["Look for what the council could not agree on."] });
  mc(b, 3, "ANALYSIS", "Why is it difficult to describe the role of Muslim communities in the struggle in detail?",
    ["The documentation is limited, so only well-established points should be given", "Correct: the lesson gives the role in outline only."],
    [["Muslims took no part in the life of the country during these years", "Muslims, like others, lived through the war."],
     ["All records about Muslims were removed from every library in the world", "No such removal is recorded."],
     ["Islam teaches that its followers must not live in a country at war", "This is not a teaching of Islam."]],
    "Documentation is **limited**, so a student should state only what is well established.",
    { hints: ["Think about the evidence available."] });
  mc(b, 4, "EVALUATION", "Which conclusion about the role of the churches in the liberation struggle is best supported?",
    ["The record was mixed, with links to settler rule and also opposition and relief", "Correct: it recognises evidence on both sides."],
    [["All the churches opposed settler rule from the first day of its start", "Some church members and leaders supported the government."],
     ["All the churches supported settler rule and none criticised its laws", "The CCJP and Bishop Lamont criticised abuses."],
     ["The churches took no part in the life of the country in these years", "Churches ran schools, clinics and relief."]],
    "The record was **mixed**: some links with colonial rule, but also education, witness, relief and opposition.",
    { hints: ["Choose the answer that includes evidence on both sides."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Catholic Commission for Justice and Peace was formed in 1972 and collected evidence about abuses during the war.",
    answer: true,
    explanation: "True. The CCJP documented abuses and in 1976 joined with a Catholic institute in London to publish a report.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All church leaders in Rhodesia opposed the government.",
    answer: false,
    explanation: "False. Some church members and leaders supported the government, while others, such as Bishop Lamont and the CCJP, criticised it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with the correct description.",
    pairs: [
      ["Bishop Donal Lamont", "Catholic bishop convicted in 1976 and deported in 1977"],
      ["Bishop Abel Muzorewa", "United Methodist bishop who led the African National Council from 1971"],
      ["Rev. Ndabaningi Sithole", "Congregational minister and first leader of ZANU in 1963"],
      ["Rev. Canaan Banana", "Methodist minister who became the first President in 1980"],
    ],
    explanation: "Each description is a well-established fact about one of the church leaders.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Commission for Justice and Peace was formed in {{blank:b}} and documented abuses.",
    blanks: [
      { id: "a", accepted: ["Catholic"], choices: ["Catholic", "Muslim", "Jewish", "Traditional"] },
      { id: "b", accepted: ["1972"], choices: ["1972", "1896", "1980", "1999"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "The **Catholic** Commission for Justice and Peace was formed in **1972**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which year did the World Council of Churches begin its Programme to Combat Racism?",
    accepted: ["1970"],
    wrong: ["1990"],
    explanation: "The programme began in **1970**.",
  });

  ms(b, 1, "RECALL", 3, "State **three** ways in which churches helped the cause of the nationalists, directly or indirectly.",
    ["They educated many Africans in mission schools", "The CCJP and some bishops documented and criticised abuses", "Church bodies offered relief and the World Council of Churches gave humanitarian grants, or clergy entered politics"],
    "Mission schools educated many Africans; the CCJP and some bishops documented and criticised abuses; and church bodies offered relief while the WCC gave humanitarian grants.",
    "One mark for each way.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe the work of the Catholic Commission for Justice and Peace and of Bishop Donal Lamont.",
    ["The CCJP was formed in 1972", "It collected evidence of abuses against civilians", "Bishop Lamont, Catholic Bishop of Umtali, criticised racial laws and the treatment of villagers", "He was convicted in 1976 for failing to report guerrillas and deported in 1977"],
    "The CCJP was formed in 1972 and collected evidence of abuses against civilians. Bishop Lamont of Umtali criticised racial laws and the treatment of villagers, and he was convicted in 1976 for failing to report guerrillas and deported in 1977.",
    "One mark for each point.",
    ["Give the name, the date and the action for each."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why the churches were divided over the liberation struggle.",
    [["Some members believed in keeping law and order and feared the war", 1], ["Developed: they thought the church should support the government and avoid politics, so they stayed loyal to it", 2],
     ["Others believed the Church must work for justice", 1], ["Developed: they pointed to unjust laws and abuses and said that the prophets spoke out against injustice, so they criticised the government", 2]],
    "Some members believed in keeping law and order and feared the war, so they thought the church should avoid politics and stayed loyal to the government. Others believed the Church must work for justice, so they pointed to unjust laws and abuses, said that the prophets spoke out against injustice, and criticised the government.",
    "Two reasons, each stated and developed.",
    ["Think of the view that the church should keep out of politics and the view that it should speak for justice."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional church magazine, Mutare, 1976",
      "Our school at the mission has been open since the early years of the century. Many of our old pupils are now teachers, nurses and pastors, and some have entered public life. This week soldiers asked the headmaster for the names of visitors, and at night families came to ask for food. We have kept the school open for the children, and we pray for peace.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "According to Source A, which groups did the mission school produce?",
        ["Teachers, nurses and pastors", "Correct: the source lists these and others who entered public life."],
        [["Soldiers, police officers and tax collectors", "The source does not list these."],
         ["Chiefs, spirit mediums and traditional healers", "The source does not list these."],
         ["Engineers, pilots and members of the foreign press", "The source does not list these."]],
        "The source says that old pupils are now teachers, nurses and pastors, and some are in public life."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** difficulties or tasks of the mission during the war.",
        points: ["Soldiers asked the headmaster for the names of visitors", "Families came at night to ask for food", "It kept the school open for the children while praying for peace"],
        modelAnswer: "Soldiers asked the headmaster for the names of visitors, families came at night to ask for food, and the mission kept the school open for the children while praying for peace.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how mission schools helped the nationalist cause even though the missions were linked with colonial rule.",
        points: [["Mission schools educated many Africans who became teachers, nurses, clergy and leaders", 2], ["Educated Africans used ideas of justice and equality to argue against discrimination and for political rights", 2]],
        modelAnswer: "Mission schools educated many Africans who became teachers, nurses, clergy and leaders. These educated Africans used ideas of justice and equality to argue against discrimination and for political rights.",
      }),
    ],
    hints: ["In (c) link education to the leadership of the nationalists."],
    explanation: "The source shows the mission as both a school and a place under pressure in the war.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Nyasha says: \"The churches helped the liberation struggle more than they hindered it.\" Mthulisi says: \"The churches were part of the colonial system and did more harm than good.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which churches helped the nationalists.",
        points: [["Mission schools educated many nationalist leaders", 2], ["The CCJP and church leaders such as Bishop Lamont documented and criticised abuses", 2]],
        modelAnswer: "Mission schools educated many nationalist leaders. The CCJP and church leaders such as Bishop Lamont documented and criticised abuses.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which the churches can be said to have been linked with colonial rule.",
        points: [["Some missionaries travelled with settlers or received land from the settler administration", 1], ["Developed: mission farms and stations occupied land that African families had used", 1], ["Some church members and leaders supported the government", 1], ["Developed: they argued for law and order, so they did not challenge unjust laws", 1]],
        modelAnswer: "Some missionaries travelled with settlers or received land from the settler administration, and mission farms and stations occupied land that African families had used. Some church members and leaders also supported the government, arguing for law and order, so they did not challenge unjust laws.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far the churches helped rather than hindered the liberation struggle.",
        points: [["Helped: mission education produced leaders; the CCJP and Bishop Lamont documented abuses; relief and the WCC's humanitarian grants", 2], ["Helped: clergy such as Muzorewa, Sithole and Banana entered politics", 2], ["Hindered or limited: links with colonial rule and mission land; support for the government among some Christians; criticism of African customs", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The churches helped in several ways. Mission schools educated many nationalist leaders, the CCJP and Bishop Lamont documented and criticised abuses, church bodies gave relief and the WCC gave humanitarian grants, and clergy such as Muzorewa, Sithole and Banana entered politics. However, missions were linked with colonial rule and occupied land, some Christians supported the government, and the churches criticised African customs. I conclude that the churches' record was mixed: they were part of the colonial system but also produced the education and the witness that helped to challenge it.",
      }),
    ],
    hints: ["Give evidence on both sides in (c) and avoid generalising about all churches."],
    explanation: "A strong answer weighs the helping and hindering evidence and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is a **mission station**?", "A settlement set up by a church or mission society, with a church, a school and often a clinic.");
  b.card("DEFINITION", "What was the WCC's **Programme to Combat Racism**?", "A programme begun in 1970 that gave grants for humanitarian work to groups fighting racism, including some liberation movements; it was controversial.");
  b.card("FACT", "When was the Catholic Commission for Justice and Peace (CCJP) formed?", "1972.");
  b.card("FACT", "What happened to Bishop Donal Lamont?", "He was convicted in 1976 for failing to report guerrillas and deported in 1977.");
  b.card("FACT", "Which church leader became the first President of Zimbabwe in 1980?", "Rev. Canaan Banana, a Methodist minister.");
  b.card("FACT", "Which bishop led the African National Council from 1971?", "Bishop Abel Muzorewa (United Methodist Church).");
  b.card("CONCEPT", "How did mission schools help nationalism indirectly?", "They educated many Africans who later used ideas of justice and equality against discrimination.");
  b.card("CONCEPT", "Why were many mission stations in a difficult position in the war?", "They were caught between guerrillas who asked for help and soldiers who questioned or punished them.");
  b.card("CONCEPT", "Why is the record of the churches called mixed?", "Some church members supported the government and missions were linked to colonial rule, while others criticised abuses, educated nationalists and gave relief.");
});
