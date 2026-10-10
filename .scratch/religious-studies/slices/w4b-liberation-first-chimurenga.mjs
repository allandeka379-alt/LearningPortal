// W4b: Indigenous Religion in the First Chimurenga/Umvukela (Topic 13.1).
// Reviewer notes: Mkwati's movements and death are disputed in the sources and are kept out; the tradition about Nehanda's
// last words is reported as tradition; April 1898 for the executions follows the brief; the historians' debate names
// Terence Ranger only (check against the history-o lesson on the 1890s).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.liberation.first-chimurenga", { file: "liberation/first-chimurenga", keyPrefix: "liberation.first-chimurenga" }, (b) => {
  mc(b, 1, "RECALL", "What is the Ndebele name for the risings of the 1890s?",
    ["Umvukela", "Correct: Umvukela is the Ndebele word for a rising; Chimurenga is the Shona word."],
    [["Umbuyiso", "Umbuyiso is the Ndebele bringing-home ceremony for a dead person's spirit."],
     ["Inkundla", "Inkundla is a meeting place or court, not a rising."],
     ["Isibongo", "Isibongo is a clan name or totem praise name."]],
    "**Umvukela** is the Ndebele word for the risings of the 1890s and **Chimurenga** is the Shona word.");
  mc(b, 1, "RECALL", "In which month and year were the mediums Nehanda and Kaguvi executed?",
    ["April 1898", "Correct: they were captured in late 1897 and executed in April 1898."],
    [["March 1896", "The Ndebele rising began in March 1896; this is not the date of the executions."],
     ["April 1980", "April 1980 is the month of independence, not of the executions."],
     ["June 1893", "No such event is linked to the two mediums here."]],
    "Nehanda and Kaguvi were executed in **April 1898**.");
  mc(b, 2, "UNDERSTANDING", "Which two spirit mediums are remembered as leaders of the Shona rising in Mashonaland?",
    ["Nehanda and Kaguvi", "Correct: the mediums of the spirits Nehanda and Kaguvi."],
    [["Mkwati and Lobengula", "Mkwati was a Mwari priest and Lobengula was the Ndebele king, not a medium."],
     ["Mzilikazi and Nehanda", "Mzilikazi founded the Ndebele state and died in 1868."],
     ["Lobengula and Kaguvi", "Lobengula was the Ndebele king, not a medium in Mashonaland."]],
    "The mediums **Nehanda** (Charwe Nyakasikana) and **Kaguvi** (Gumboreshumba) are remembered as leaders in Mashonaland.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What was the role of the Mwari shrines in the Matopo Hills in this period?",
    ["Places where people sought messages from Mwari about rain and crises", "Correct: people sent messengers to ask for guidance."],
    [["Offices where settlers collected tax and registered African families", "Tax was collected by the company's officials, not at Mwari shrines."],
     ["Mission schools where teachers trained African evangelists", "The shrines were centres of Indigenous Religion, not mission schools."],
     ["Courts where settlers judged disputes between chiefs", "The shrines were religious centres, not settler courts."]],
    "The Matopo shrines (**Njelele and Matonjeni**) were places where messages from Mwari were sought about rain and national crises.");
  mc(b, 2, "UNDERSTANDING", "Why was the loss of land a religious concern as well as an economic one?",
    ["Land was believed to belong to the ancestors and hold their graves", "Correct: guarding the land was a religious duty."],
    [["Land was where the company wished to build churches for converts", "The concern was not about church building."],
     ["Land was the only place on earth where Mwari could ever be worshipped", "Mwari is worshipped in many places, not only on one piece of land."],
     ["Land was a fee paid to the ancestors for each child that was born", "Land is not a fee for births."]],
    "In Indigenous Religion the land belongs to the **ancestors and territorial spirits**, so losing it was also a spiritual loss.", { daily: true });
  mc(b, 3, "APPLICATION", "Nyasha reads that in 1896 a village accepted a medium's message as binding. Which belief best explains why?",
    ["The spirit was believed to speak through the medium", "Correct: the message carried the authority of the spirit."],
    [["The medium held the highest military rank in the village", "The authority came from the spirit, not from military rank."],
     ["The medium was paid a salary by the company's officials", "The mediums opposed company rule and were not paid by it."],
     ["The medium had been trained at a mission school for the work", "Mediums were believed to be chosen by spirits, not trained in schools."]],
    "A spirit medium (**svikiro**) is believed to be chosen by a spirit that speaks through them, so their message carries the authority of the ancestors.",
    { hints: ["Think about where the medium's authority was believed to come from."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "a passage from a fictional village history booklet, Mashonaland, 2026",
    "In the year of the great drought, the elders sent a messenger to the shrine. He returned and told the village that the rains would not come until the land was honoured again. After that, many families agreed to resist the new taxes. Others waited, because they were not sure.") + "\n\nWhich statement is best supported by Source A?",
    ["Many villagers linked the drought to their bond with Mwari", "Correct: the messenger's report connected rain with honouring the land."],
    [["All villagers agreed at once on a single plan of action together", "The source says that others waited because they were not sure."],
     ["The drought was ended by the messenger's visit to the shrine alone", "The source does not say that the drought ended."],
     ["The booklet proves that the shrine was the sole cause of the rising", "One village's story cannot prove a sole cause."]],
    "The source shows people linking the drought to the land and **Mwari**, but it also shows that not everyone agreed.",
    { hints: ["Look for the answer that stays within what the source says."] });
  mc(b, 4, "ANALYSIS", "Why do historians disagree about how far religious leaders coordinated the risings?",
    ["Evidence is limited and local leaders also acted for local reasons", "Correct: the sources are few, often written by outsiders, and show local variety."],
    [["All of the surviving sources agree about every detail of events", "The sources do not agree on many details."],
     ["No religious leaders took any part in the risings in any area", "Nehanda, Kaguvi and Mkwati are linked to the risings."],
     ["The two risings began on the very same day and ended on the very same day", "The risings began at different times, in March and June 1896."]],
    "The evidence is limited and mostly written by outsiders, and many communities acted for **local reasons** as well, so historians reach different judgements.",
    { hints: ["Think about the sources and about differences between areas."] });
  mc(b, 4, "EVALUATION", "Which conclusion about Indigenous Religion in the risings is best supported?",
    ["Religion gave authority and courage alongside land grievances", "Correct: it was one important cause alongside economic and political causes."],
    [["Religion was irrelevant because only economic causes mattered then", "Mediums and shrines clearly shaped the rising."],
     ["Religion was the only cause and no other cause had any influence", "Land, cattle, labour and tax were also causes."],
     ["Religion played a part only in Matabeleland and never in Mashonaland", "Nehanda and Kaguvi were in Mashonaland."]],
    "A balanced judgement is that religion supplied **authority and unity**, while land, cattle, labour and tax were underlying causes.",
    { hints: ["Choose the answer that gives religion a part without making it the only cause."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mkwati was a spirit medium who was executed together with Nehanda and Kaguvi in April 1898.",
    answer: false,
    explanation: "False. Mkwati is associated with the Mwari shrines in the Matopo Hills; the mediums Nehanda and Kaguvi were executed in April 1898.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Some historians argue that the risings were not centrally coordinated by religious leaders but arose from local grievances.",
    answer: true,
    explanation: "True. There is a historians' debate: one view stresses coordination by the Mwari cult and the mediums, another stresses local leaders and local causes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each name with the correct description.",
    pairs: [
      ["Charwe Nyakasikana", "Medium of the spirit Nehanda in Mashonaland"],
      ["Gumboreshumba", "Medium of the spirit Kaguvi in Mashonaland"],
      ["Mkwati", "Mwari priest associated with the Matopo shrines"],
      ["Njelele", "A Mwari shrine in the Matopo Hills"],
    ],
    explanation: "Charwe was the medium of Nehanda, Gumboreshumba the medium of Kaguvi, Mkwati was a Mwari priest, and Njelele is a Mwari shrine.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Shona word for the struggle of the 1890s is {{blank:a}} and the Ndebele word is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Chimurenga"], choices: ["Chimurenga", "Mukwerera", "Roora", "Bira"] },
      { id: "b", accepted: ["Umvukela"], choices: ["Umvukela", "Ukucela", "Lobola", "Inkundla"] },
    ],
    explanation: "**Chimurenga** is Shona and **Umvukela** is Ndebele.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the cattle disease of 1896 that increased the distress of African communities.",
    accepted: ["rinderpest", "cattle plague", "the rinderpest"],
    wrong: ["anthrax"],
    explanation: "The cattle disease was **rinderpest**, which killed many cattle in 1896.",
  });

  ms(b, 1, "RECALL", 3, "State **three** grievances that led many Africans to resist company rule in the 1890s.",
    ["Loss of land", "Loss of cattle, or the cattle disease rinderpest", "Forced labour or tax, or drought and locusts"],
    "Loss of land, loss of cattle through seizure and rinderpest, and forced labour and taxation were three grievances.",
    "One mark for each grievance.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe the part played by the Mwari shrines and the priest Mkwati in the risings of the 1890s.",
    ["The Matopo shrines (Njelele, Matonjeni) were centres where messages from Mwari were sought about rain and crises", "People sent messengers to the shrines for guidance in 1896",
     "Mkwati was a Mwari priest associated with the shrines", "He is remembered as a religious figure who took part in the resistance, travelling into Mashonaland"],
    "The Matopo shrines were centres where messages from Mwari were sought about rain and crises, and in 1896 people sent messengers for guidance. Mkwati was a Mwari priest associated with the shrines, and he is remembered as a religious figure who joined the resistance and travelled into Mashonaland.",
    "One mark for each point.",
    ["Think of the place, the messages, and the priest."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why spirit mediums had great influence over the people at that time.",
    [["The people believed that the spirit spoke through the medium", 1], ["Developed: so the medium's words carried the authority of the ancestors and were obeyed as binding", 2],
     ["Mediums were respected as guardians of the land, rain and justice", 1], ["Developed: when the land and cattle were threatened, people turned to them for leadership and unity", 2]],
    "People believed that the spirit spoke through the medium, so the medium's words carried the authority of the ancestors and were obeyed as binding. Mediums were also respected as guardians of the land, rain and justice, so when the land and cattle were threatened people turned to them for leadership and unity.",
    "Two reasons, each stated and developed.",
    ["Think of belief about the spirit and of the medium's role in the community."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, Harare, 2026",
      "Tendai: Our teacher says Nehanda and Kaguvi were mediums, not soldiers. Why do we honour them?\nNokuthula: My grandmother says the people believed the spirits spoke through them. When the land and the cattle were threatened, they became the voice of resistance. After they were executed in April 1898, people kept their memory alive.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "According to Source A, how do the students describe Nehanda and Kaguvi?",
        ["As mediums who were believed to speak for spirits", "Correct: the source says they were mediums."],
        [["As soldiers who led the settler army in the field", "The source says they were not soldiers."],
         ["As mission teachers who taught reading to converts", "The source does not describe them as teachers."],
         ["As officials who collected tax from the villages", "The source does not describe them as tax collectors."]],
        "The students say they were mediums, not soldiers."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A and your own knowledge, give **three** reasons why Nehanda and Kaguvi are honoured today.",
        points: ["They were believed to speak for the spirits and gave leadership to the resistance", "They defended the land and the cattle when these were threatened", "They were captured and executed in April 1898 and their memory is kept alive as heroes of the resistance"],
        modelAnswer: "They were believed to speak for the spirits and gave leadership to the resistance. They defended the land and the cattle when these were threatened. They were captured and executed in April 1898, and their memory is kept alive as heroes of the resistance.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why many people were willing to follow a spirit medium at that time.",
        points: [["They believed the medium spoke for the spirit, so the message had the authority of the ancestors", 2], ["The land, cattle and shrines were threatened, so they looked to their religious leaders to give direction and unity", 2]],
        modelAnswer: "They believed the medium spoke for the spirit, so the message carried the authority of the ancestors and could not easily be refused. The land, cattle and shrines were threatened, so people looked to their religious leaders to give direction and unity.",
      }),
    ],
    hints: ["In (c) link the belief about the spirit to the grievances of the time."],
    explanation: "The source presents the mediums as religious leaders who became the voice of resistance.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Farai says: \"The risings of the 1890s were mainly a religious movement led by the mediums and the Mwari priests.\" Chipo says: \"The risings were mainly about land, cattle and tax, and religion was only part of the story.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious beliefs that encouraged resistance.",
        points: [["Land belongs to the ancestors and territorial spirits, so defending it was a duty", 2], ["Drought and cattle disease were taken as signs of spiritual disorder that needed the people to act together", 2]],
        modelAnswer: "The land was believed to belong to the ancestors and territorial spirits, so defending it was a duty. Drought and cattle disease were taken as signs of spiritual disorder that needed the people to act together.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** non-religious cause of the risings.",
        points: [["Loss of land and cattle, forced labour or taxation", 1], ["Developed: families lost the means to live, so many were willing to risk resistance", 1], ["Rinderpest, drought and locusts in 1896 caused hunger", 1], ["Developed: hardship made resentment of company rule deeper", 1]],
        modelAnswer: "Loss of land and cattle, together with forced labour and taxation, deprived families of the means to live, so many were willing to risk resistance. Rinderpest, drought and locusts in 1896 also caused hunger and made resentment of company rule deeper.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religion was the main driving force of the First Chimurenga/Umvukela.",
        points: [["For: the Mwari shrines, Mkwati, Nehanda and Kaguvi gave authority and a common message", 2], ["For: beliefs about land and the ancestors made resistance a duty", 2], ["Against: land, cattle, labour, tax and disease were underlying causes, and local leaders acted for local reasons", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religion was an important driving force. The Mwari shrines, Mkwati, Nehanda and Kaguvi gave the resistance authority and a common message, and the belief that the land belonged to the ancestors made defending it a duty. However, land, cattle, labour, tax and disease were the underlying causes, and historians point out that local leaders acted for local reasons and that the risings were not centrally coordinated everywhere. I conclude that religion supplied unity, courage and legitimacy, but it was one driving force among several rather than the only one.",
      }),
    ],
    hints: ["Give both religious and economic causes in (c), and then decide."],
    explanation: "A strong answer weighs religious leadership and belief against economic and local causes and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What do **Chimurenga** and **Umvukela** mean?", "Chimurenga (Shona) and Umvukela (Ndebele) are words for a struggle or rising; the First Chimurenga/Umvukela is the risings of the 1890s.");
  b.card("DEFINITION", "What is a **spirit medium (svikiro)**?", "A person believed to be chosen by a spirit, such as a mhondoro, who speaks for the spirit and guides the community.");
  b.card("FACT", "Who were the two mediums in Mashonaland executed in April 1898?", "Nehanda (Charwe Nyakasikana) and Kaguvi (Gumboreshumba).");
  b.card("FACT", "Who was Mkwati?", "A Mwari priest associated with the Matopo shrines, remembered as a religious figure in the resistance.");
  b.card("FACT", "Where are the Mwari shrines of Njelele and Matonjeni?", "In the Matopo Hills of Matabeleland.");
  b.card("FACT", "Which cattle disease of 1896 added to the distress?", "Rinderpest.");
  b.card("CONCEPT", "Why was land a religious matter in 1896?", "Land was believed to belong to the ancestors and territorial spirits and to hold graves and shrines, so defending it was a duty.");
  b.card("CONCEPT", "Why did people follow the mediums?", "They believed the spirit spoke through the medium, so the message carried the authority of the ancestors.");
  b.card("CONCEPT", "How do historians disagree about the risings?", "Some say the Mwari cult and the mediums coordinated them; others stress local grievances and local leaders; a balanced view gives religion an important but not the only part.");
});

