// W1a: hist.intro.history-and-sources (ZIMSEC topic 1.1).
import { concept, P, source, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.intro.history-and-sources", { file: "intro/history-and-sources", keyPrefix: "intro.history-and-sources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **history**?",
    options: [
      ["The study of past human activities and events, based on evidence", "Correct: history is about people in the past and depends on evidence."],
      ["The study of rocks, fossils and how the earth and its mountains were formed", "That describes geology. History studies human activities."],
      ["A list of the dates of famous battles and kings", "Dates are useful, but history explains what happened and why, using evidence."],
      ["The stories people tell to entertain children at night", "Folk tales can be a source, but history is the evidence-based study of the past."],
    ],
    answer: "A",
    explanation: "History is the study of past human activities and events, using evidence to explain what happened, why, and with what results.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "A grandmother tells her grandchildren the praise poetry of their clan, which she learned from her own grandmother. What kind of source is this?",
    options: [
      ["Oral tradition", "Correct: knowledge passed down by word of mouth across generations is oral tradition."],
      ["Archaeology", "Archaeology studies material remains such as tools and pottery, not spoken knowledge."],
      ["A written document", "Nothing has been written down; the poetry is spoken and remembered."],
      ["A secondary written textbook", "A textbook is written; this knowledge is passed on orally."],
    ],
    answer: "A",
    explanation: "Oral tradition includes stories, praise poetry, songs, proverbs and genealogies passed down by word of mouth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **primary** source for the occupation of Mashonaland by the Pioneer Column?",
    options: [
      ["A diary kept by a member of the column during the march", "Correct: it was written at the time by someone who took part."],
      ["A school textbook on Zimbabwean history published in 2010", "Written long afterwards by someone who was not there: a secondary source."],
      ["A television documentary made in 1990 about the column", "Made a century later: a secondary source (though it may quote primary ones)."],
      ["A historian's book that compares several accounts of the march", "A historian's study based on other sources is secondary."],
    ],
    answer: "A",
    explanation: "A primary source comes from the time of the events or from someone who took part in or witnessed them. Later accounts based on these are secondary.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the **main advantage** of archaeology as a source for Zimbabwe's Early Iron Age?",
    options: [
      ["It gives evidence about societies that left no written records", "Correct: Early Iron Age communities did not write, so their tools, pottery and village sites are vital evidence."],
      ["It tells us the exact names and birthdays of the people studied", "Objects rarely give personal names; that is a weakness of archaeology, not a strength."],
      ["It is quick and cheap to carry out in every part of the country", "Excavation is usually slow and expensive."],
      ["It explains people's religious beliefs without any interpretation", "Objects must be interpreted; beliefs are hard to read from them."],
    ],
    answer: "A",
    explanation: "Archaeology is often the only evidence for periods before writing. Its weaknesses are cost, slowness and the need for interpretation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of oral tradition as a source of history?",
    options: [
      ["Details such as dates and names may change as the story is retold", "Correct: memory and retelling over generations can alter details."],
      ["It can only be understood by trained archaeologists", "Anyone who speaks the language can hear oral tradition; archaeology needs specialists."],
      ["It always gives the point of view of European colonial officials", "The opposite: oral tradition usually preserves African points of view."],
      ["It only records events that happened after writing was introduced", "Oral tradition reaches back to times before writing; that is one of its strengths."],
    ],
    answer: "A",
    explanation: "Oral tradition preserves African voices, but details can change, dates are hard to fix, ruling families may be glorified, and knowledge dies with elders who are not recorded.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Nyasha is researching how her school was founded and how it has changed. Which **type** of history is she writing?",
    options: [
      ["Local history", "Correct: the history of one place or institution is local history."],
      ["Political history", "Political history studies governments and power at a wider level."],
      ["Economic history", "Economic history studies production, trade and incomes."],
      ["World history", "World history covers many countries; her topic is one school."],
    ],
    answer: "A",
    explanation: "Local history studies one place, such as a town, district or school. It often uses school records, photographs and interviews.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many early written accounts of Zimbabwe were produced by Portuguese traders, missionaries and colonial officials. Why must historians use them **with care**?",
    options: [
      ["The writers were outsiders who often misunderstood or wrote for their own interests", "Correct: who wrote a source and why affects its reliability."],
      ["They were written in an old form of language that no historian today is able to read", "Portuguese and English documents can be read; the problem is the writers' viewpoint."],
      ["Written documents cannot give dates or names", "Documents are often good on dates and names; the issue is bias and misunderstanding."],
      ["They were all written after Zimbabwe's independence in 1980", "Many were written in the sixteenth to twentieth centuries, close to the events."],
    ],
    answer: "A",
    hints: ["Think about who wrote these documents.", "Did the writers share the culture of the people they described, and what were their aims?"],
    explanation: "Outsiders' documents give dates and details but may contain misunderstanding or bias. Historians check them against oral tradition and archaeology.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A Rhodesian school textbook printed in 1968 is used by a student investigating **how history was taught in Rhodesian schools in the late 1960s**. For this investigation the textbook is…",
    options: [
      ["a primary source, because it was produced at the time being studied", "Correct: for an enquiry into teaching in the late 1960s, the textbook is evidence from that time."],
      ["a secondary source, because every textbook is always a secondary source", "Whether a source is primary or secondary depends on the question being asked."],
      ["not a source at all, because textbooks are only for pupils", "Any surviving material can be historical evidence."],
      ["an archaeological source, because it is an old object", "It is a written document; archaeology studies excavated material remains."],
    ],
    answer: "A",
    hints: ["What period is the student investigating?", "Was the textbook produced during that period?"],
    explanation: "A source is primary or secondary in relation to the topic. A textbook is secondary about the events it describes, but primary evidence for the time when it was written and used.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every primary source is completely reliable because it was produced at the time of the events.",
    answer: false,
    explanation: "False. Primary sources can be biased, mistaken, incomplete or written to persuade. Closeness to the event is useful but does not guarantee accuracy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Societies that did not use writing still have a history that can be studied.",
    answer: true,
    explanation: "True. Archaeology, oral tradition, rock art and buildings provide evidence. Much of Zimbabwe's pre-colonial history is known in this way.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the kind of historical source it is.",
    pairs: [
      ["Iron hoes and pottery dug up at a village site", "Archaeology and artefacts"],
      ["A treaty signed by a king and a European agent", "Written document"],
      ["Clan praise poetry recited by an elder", "Oral tradition"],
      ["San paintings of hunters on a rock shelter wall", "Picture"],
    ],
    explanation: "Excavated objects are archaeology; a treaty is a written document; praise poetry is oral tradition; rock art is a visual (pictorial) source, although archaeologists also study it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each topic with the type of history it belongs to.",
    pairs: [
      ["How a Mutapa king governed through provincial chiefs", "Political history"],
      ["The gold and ivory trade with the coast", "Economic history"],
      ["Marriage customs and village life", "Social history"],
      ["A family tree traced back five generations", "Family history"],
    ],
    explanation: "Political history: government and power. Economic: production and trade. Social: everyday life, customs, religion. Family: one family over generations.",
  });
  {
    const t = timeline([
      ["c. 1100s-1400s", "Great Zimbabwe is built and occupied"],
      ["1871", "Karl Mauch visits the ruins and wrongly links them to the Queen of Sheba"],
      ["1905", "David Randall-MacIver concludes that the builders were African"],
      ["1929", "Gertrude Caton-Thompson's excavations confirm the African origin"],
    ]);
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in the history of research on Great Zimbabwe in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The building of the site must come first.", "The false Sheba theory came before the archaeologists who disproved it."],
      explanation: "The site was built and occupied from about the twelfth to the fifteenth century. Mauch visited in 1871; Randall-MacIver (1905) and Caton-Thompson (1929) showed through excavation that it was African-built.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A source produced at the time of an event is a {{blank:a}} source; a later account based on such sources is a {{blank:b}} source.",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "oral", "biased"] },
      { id: "b", accepted: ["secondary"], choices: ["primary", "secondary", "oral", "biased"] },
    ],
    explanation: "Primary: from the time or from a participant or witness. Secondary: produced later, usually by studying primary sources.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the scientific method, mentioned in the lesson, that archaeologists use to give approximate dates to charcoal and other organic material.",
    accepted: ["radiocarbon dating", "carbon dating", "carbon-14 dating", "carbon 14 dating", "radiocarbon", "c14 dating", "c-14 dating"],
    wrong: ["stratigraphy", "excavation"],
    explanation: "**Radiocarbon (carbon-14) dating** measures the decay of carbon-14 in once-living material such as charcoal, bone or seeds to give an approximate age.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Give **four** reasons why history is studied.",
    points: [
      "To understand the present, because present-day issues have roots in the past",
      "To know our identity, culture and heritage",
      "To learn lessons from past mistakes and successes",
      "To develop skills such as weighing evidence, detecting bias and arguing a case (or: to become responsible citizens)",
    ],
    modelAnswer: "History helps us understand present-day issues such as land, because they began in the past. It teaches us about our ancestors, culture and heritage. It lets us learn from past mistakes such as discrimination and war. It develops skills of weighing evidence and arguing, which are useful in many careers.",
    explanation: "One mark for each distinct reason. Other creditworthy reasons include citizenship and careers (law, journalism, teaching, tourism and heritage work).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** advantages and **two** disadvantages of written documents as sources of history.",
    points: [
      "Advantage: they can give exact dates, names and details",
      "Advantage: they record the views of people at the time / can be cross-checked with other documents",
      "Disadvantage: they may be biased or one-sided (for example, written by outsiders or to serve the writer's interests)",
      "Disadvantage: they do not exist for long periods of Zimbabwe's past, or may be lost, damaged or forged",
    ],
    hints: ["Think about what writing preserves well (dates, names).", "Then think about who did the writing in Zimbabwe before the twentieth century."],
    modelAnswer: "Written documents can give exact dates and names, and they show the views of people at the time, which can be compared with other documents. However, they may be biased: early documents about Zimbabwe were mostly written by Portuguese traders, missionaries or officials who misunderstood African societies. Also, there is no written record for most of Zimbabwe's past before the sixteenth century, and documents can be lost or forged.",
    explanation: "Two marks for advantages and two for disadvantages; each point must be a separate idea.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why historians use several **different kinds** of source together when they study the pre-colonial history of Zimbabwe.",
    points: [
      ["Each kind of source has weaknesses (e.g. oral tradition changes, documents are by outsiders, objects need interpretation)", 2],
      ["Sources fill each other's gaps: archaeology gives dates and material life, oral tradition gives names and beliefs, documents give outsiders' detail", 2],
      ["Agreement between independent kinds of source (cross-checking/corroboration) makes a conclusion more reliable", 2],
    ],
    hints: ["Start with the weaknesses of each kind of source.", "What does it mean if an oral tradition and an excavation point to the same conclusion?"],
    modelAnswer: "Every kind of source has weaknesses. Oral traditions may change as they are retold, Portuguese documents were written by outsiders with their own interests, and archaeological objects do not explain themselves. Using them together fills the gaps: archaeology gives approximate dates and evidence of trade and farming, oral tradition gives the names of rulers and beliefs, and documents add details that outsiders saw. When independent kinds of source agree, for example on a move of power northwards from Great Zimbabwe in the fifteenth century, historians can be much more confident that the conclusion is right.",
    explanation: "Two marks per developed reason: identify the reason, then explain how it helps.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "an account by a fictional schoolteacher who recorded oral traditions in a village near Masvingo in the 1960s",
        "The old men told me that their forefathers lived on the great hill with the walls, and that the king spoke to the ancestors there.\nThey said the people left when the land became tired and the firewood was finished.\nWhen I asked when this happened, they could only say 'in the time of our fathers' fathers' fathers, long ago'."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What kind of source is Source A? Is it primary or secondary for the history of Great Zimbabwe? Give a reason.", points: ["It is (a written record of) oral tradition", "Secondary for Great Zimbabwe: it was recorded centuries after the events by someone who was not there (accept: it preserves an oral tradition passed down)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Identify **two** pieces of information about Great Zimbabwe that Source A gives.", points: [["The ruling family lived on the hill with walls / the king performed religious duties, speaking to the ancestors", 2], ["People left because the land was exhausted and firewood ran out", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence of why Great Zimbabwe declined? Explain your answer.", points: [["Reliable in part: it preserves a local tradition handed down by descendants", 2], ["It agrees with a theory supported by archaeology (environmental exhaustion), so it can be cross-checked", 2], ["Limits: no dates; details may have changed over many generations; the recorder may have selected or misunderstood; one village only", 2]], levels: levels(6) }),
    ],
    hints: ["Who recorded the source, when, and from whom?", "Does the explanation in the source match what archaeologists suggest?"],
    explanation: "Oral traditions recorded long after the event are secondary for the event but valuable. Their reliability improves when archaeology supports them (here the theory of environmental exhaustion), but they lack dates and may have changed in retelling.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the sources of Zimbabwe's history.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Identify **four** kinds of historical source.", points: ["Archaeology / artefacts", "Written documents", "Oral tradition", "Pictures, photographs or buildings and sites"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe **two** disadvantages of archaeology as a source of history.", points: [["Expensive and slow to excavate (needs trained specialists)", 2], ["Objects must be interpreted and do not tell names or beliefs directly / much has decayed or been destroyed", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Oral tradition is the most useful source for the history of pre-colonial Zimbabwe.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: preserves African voices, names of rulers, beliefs, the history of societies without writing", 2], ["Against: details change, no exact dates, may glorify ruling families; archaeology gives dates and evidence of trade and technology", 2], ["Supported judgement: e.g. most useful when combined with archaeology", 2]], levels: levels(6), modelAnswer: "Oral tradition is very useful because it preserves the African point of view and the names of rulers, such as the traditions about Nyatsimba Mutota, which are found in no other source. It also records beliefs and customs that objects cannot show. However, details change as stories are retold, and oral tradition rarely gives exact dates. Archaeology is just as important because it gives approximate dates through radiocarbon dating and shows trade goods, farming and buildings, as at Great Zimbabwe. Overall, oral tradition is one of the most useful sources, but it is most valuable when it is checked against archaeology." }),
    ],
    hints: ["For (c), write one paragraph agreeing, one disagreeing, then a conclusion."],
    explanation: "Strong answers recognise that each source has strengths and weaknesses and that historians combine them.",
  });

  b.card("DEFINITION", "What is **history**?", "The study of past human activities and events, based on evidence.");
  b.card("DEFINITION", "What is a **primary source**?", "A source produced at the time of the events or by a participant or witness.", "Examples: a diary, a treaty, a photograph, a tool from a site.");
  b.card("DEFINITION", "What is a **secondary source**?", "A source produced later by someone who was not there, usually from primary sources.", "Example: a textbook.");
  b.card("DEFINITION", "What is **oral tradition**?", "Knowledge of the past passed down by word of mouth: stories, praise poetry, songs, proverbs and genealogies.");
  b.card("DEFINITION", "What is **archaeology**?", "The study of the human past through material remains such as tools, pottery, bones and buildings, often found by excavation.");
  b.card("FACT", "Name the five main kinds of historical source.", "Archaeology and artefacts; written documents; oral tradition; pictures and photographs; buildings and sites.");
  b.card("CONCEPT", "Give one strength and one weakness of oral tradition.", "Strength: preserves African points of view and the history of societies without writing. Weakness: details and dates may change as it is retold.");
  b.card("CONCEPT", "Why must early written documents about Zimbabwe be used with care?", "Most were written by outsiders (traders, missionaries, officials) who often misunderstood African societies or wrote to serve their own interests.");
  b.card("FACT", "Name five types of history.", "Political, economic, social, local and family history.");
  b.card("CONCEPT", "Why do historians cross-check sources?", "Each source has weaknesses; when independent kinds of source agree, a conclusion is more reliable.");
});
