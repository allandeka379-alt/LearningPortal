// W3b: ahist.skills.source-evaluation (Both boards; Cambridge Paper 1 skill; ZIMSEC interpret historical evidence).
import { concept, P, source, levels } from "../lib.mjs";

const SA = source("Source A", "a report to the British South Africa Company by a fictional magistrate in Mashonaland, 1895",
  "The people are quiet, and the hut tax has been collected without trouble, though the chiefs complain of the demand for labour.");
const SB = source("Source A", "a letter by a fictional merchant in Cologne to his brother, 1845",
  "The new railway brings coal and customers to our town. Business is good, but the weavers in the villages go hungry, and the talk in the taverns is of a parliament and a free press.");
const SC = source("Source A", "a poster issued by a fictional government in 1941 (described in words)",
  "A smiling soldier points at the reader; below him the words say that every citizen who works hard helps to win the war and that rumours help the enemy.", { described: true });
const SD = source("Source A", "an oral account recorded in 1962 from a fictional elder who had been a child during a drought in 1922",
  "The rains failed for two seasons. The chief gave out grain from the royal store, and nobody in our village starved.");

concept("ahist.skills.source-evaluation", { file: "skills/source-evaluation", keyPrefix: "skills.source-evaluation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the term 'provenance' mean when you evaluate a source?",
    options: [
      ["Its origin: who made it, when, for whom and why", "Correct: these questions are the basis of every evaluation."],
      ["Its value in money terms when sold to a museum", "Provenance concerns origin, not price."],
      ["The number of pages or the length of the source in words", "Length is not provenance."],
      ["The place in which the source is kept in an archive today", "Provenance concerns the making of the source, not where it is stored."],
    ],
    answer: "A",
    explanation: "Provenance is the origin of a source: author, date, audience, purpose and form.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: [
      "Read the source.",
      "",
      SA,
      "",
      "Which of the following is a valid inference from the source?",
    ].join("\n"),
    options: [
      ["Demand for labour was causing some resentment among the chiefs", "Correct: the chiefs complained, which implies resentment."],
      ["The Company had abolished all taxes in Mashonaland by the year 1895", "The source says the hut tax had been collected."],
      ["The chiefs had joined the Company's police in very large numbers", "The source says nothing about police."],
      ["The people were planning a great rising for the following year", "The source does not mention any plan."],
    ],
    answer: "A",
    explanation: "The magistrate reports calm, but the chiefs' complaint about labour allows the inference that there was resentment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should a historian be cautious about Source A (the magistrate's report of 1895) as evidence of African attitudes?",
    options: [
      ["The magistrate had reason to show his district was well governed", "Correct: his own position depended on a calm report."],
      ["The magistrate wrote the report in a language that nobody can read", "The report is in English."],
      ["The report was written many years after the events it describes", "It was written in 1895."],
      ["The magistrate was not a member of the Company's administration", "He was an official of the Company."],
    ],
    answer: "A",
    hints: ["Think of the author's purpose."],
    explanation: "An official reporting to superiors had a reason to play down unrest, so his report is better evidence of the official view than of African attitudes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: [
      "Read the source.",
      "",
      SC,
      "",
      "What is the most useful way for a historian to use this source?",
    ].join("\n"),
    options: [
      ["As evidence of what the government wanted citizens to believe", "Correct: a poster shows purpose and intended message."],
      ["As proof that every citizen worked harder because of the poster", "A poster does not prove its effect."],
      ["As a photograph that records exactly how the soldiers looked", "It is a described poster, not a record of fact."],
      ["As a neutral report of the events of the war in 1941", "A poster is propaganda, not a neutral report."],
    ],
    answer: "A",
    hints: ["Ask why the poster was made."],
    explanation: "Propaganda is unreliable as a record of events, but useful as evidence of official aims and the methods used to influence the public.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: [
      "Read the source.",
      "",
      SD,
      "",
      "Which comment on its reliability is the most convincing?",
    ].join("\n"),
    options: [
      ["It is a childhood memory recorded forty years later, so detail may fade", "Correct: the gap in time and the age of the speaker matter."],
      ["It is useless because oral sources can never contain any true information", "Oral sources can be checked and used."],
      ["It is fully reliable because it comes from a person who was alive at the time", "Being present does not guarantee accuracy."],
      ["It is unreliable because the drought could not have happened in 1922", "Nothing in the source is impossible."],
    ],
    answer: "A",
    hints: ["Think of the date of the event and the date of the recording."],
    explanation: "The speaker was a child and spoke forty years later, so memory may be limited; the account can be tested against rainfall records and other accounts.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a value judgement rather than a statement of fact?",
    options: [
      ["The colonial administration was harsh and unjust", "Correct: this expresses an opinion that needs support."],
      ["The hut tax was introduced by the Company in the 1890s", "This is a fact that can be checked."],
      ["The Native Police were recruited by the Company", "This can be checked in the records."],
      ["Rinderpest reached the country in early 1896", "This is a dated fact."],
    ],
    answer: "A",
    hints: ["Which statement uses opinion words?"],
    explanation: "Words such as 'harsh' and 'unjust' express a judgement. Historians ask what evidence supports it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a question 'Compare Sources A and B as evidence about…', which answer would score highest?",
    options: [
      ["One that compares by point and explains differences from provenance", "Correct: comparison needs both content and explanation."],
      ["One that describes Source A in full and then describes Source B in full", "Describing in turn does not compare."],
      ["One that says which source is the more interesting to read aloud", "Interest is not a historical criterion."],
      ["One that lists everything that the two sources do not mention at all", "Omissions matter only where they help the comparison."],
    ],
    answer: "A",
    hints: ["Think of the three stages of a comparison."],
    explanation: "A strong comparison organises by point, explains differences from author, date, audience and purpose, and reaches a judgement.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "In 'How far do the sources support the view that...?', which conclusion shows the highest level of skill?",
    options: [
      ["They support the view in part; some challenge it, and my own knowledge urges some caution", "Correct: it weighs sources against each other and against knowledge."],
      ["The sources all agree with the view, because each of the sources mentions the topic of the question", "Mentioning a topic is not support."],
      ["The sources are all unreliable, so they cannot support any view at all in the answer", "Unreliable sources can still be used for some purposes."],
      ["The first source is the most important, so the others need not be used or mentioned in the answer", "The question asks for all the sources."],
    ],
    answer: "A",
    hints: ["Think of support, challenge, own knowledge and extent."],
    explanation: "A top-level answer uses all sources, weighs those that support against those that challenge, adds own knowledge and gives a supported judgement of extent.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A source that is biased is of no use to a historian.",
    answer: false,
    explanation: "False. A biased source can be very useful for showing attitudes, purposes and what the author wanted others to believe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A source written at the time of the events is always more reliable than one written later.",
    answer: false,
    explanation: "False. A contemporary writer may know only part of events or have a purpose; a later writer may have more information. Each must be judged on its provenance and content.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "In a question on how far sources support a statement, own knowledge should be used only when the sources are silent.",
    answer: false,
    hints: ["Own knowledge can also test the sources."],
    explanation: "False. Own knowledge is used to confirm or challenge what the sources say as well as to fill gaps.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Inference", "A conclusion drawn from what a source implies"],
      ["Provenance", "The origin of a source: author, date, audience and purpose"],
      ["Corroboration", "Agreement between independent sources"],
      ["Value judgement", "A statement of opinion and not a checkable fact"],
    ],
    explanation: "These terms are the vocabulary of source evaluation.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each source with the most likely purpose of its author.",
    pairs: [
      ["A government poster in wartime", "To persuade citizens to support the war effort"],
      ["A private letter to a relative", "To tell the reader news and feelings"],
      ["An official report to superiors", "To inform them and to show the writer's work in a good light"],
      ["A memoir written in old age", "To record and justify the writer's life and actions"],
    ],
    hints: ["Think of the audience of each."],
    explanation: "The audience and form of a source suggest its purpose, which affects what it includes and leaves out.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A conclusion that is not stated but can be drawn from a source is called an {{blank:a}}, and the origin of a source is called its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["inference"], choices: ["inference", "opinion", "quotation", "summary"] },
      { id: "b", accepted: ["provenance"], choices: ["provenance", "tone", "caption", "index"] },
    ],
    explanation: "An inference is drawn from the source; provenance is its origin.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes a source's agreement with other, independent evidence, which increases confidence in it?",
    accepted: ["corroboration", "corroborate", "corroborated", "corroborates"],
    wrong: ["contradiction"],
    explanation: "**Corroboration**: when independent sources agree, the evidence is stronger.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: [
      "Read the source.",
      "",
      SB,
      "",
      "What can you infer from the source about economic and political conditions in Germany in 1845?",
    ].join("\n"),
    points: [["The railway helped trade and business, as it brought coal and customers", 1], ["Some groups, such as weavers, were suffering hardship", 1], ["There was talk of political reform, in the form of a parliament and a free press", 1], ["Prosperity was uneven, and economic hardship may have fed political demands", 1]],
    modelAnswer: "The railway helped trade, since it brought coal and customers. Some groups, such as the weavers, were suffering hardship, so prosperity was uneven. People were talking about a parliament and a free press, which suggests political demands, and these may have been fed by economic hardship.",
    explanation: "One mark for each valid inference supported by the source.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the purpose of a wartime government poster affects its value as evidence.",
    points: [["A poster is made to persuade, so it presents events and the enemy in a way that serves the government's aims, and leaves out unfavourable facts", 2], ["It is therefore unreliable as a record of events, but useful as evidence of official aims, methods of influencing opinion and the attitudes the government wished to create", 2]],
    hints: ["Think of what a poster is for and what it can still show."],
    modelAnswer: "A poster is made to persuade, so it presents events and the enemy in a way that serves the government's aims and leaves out unfavourable facts. It is therefore unreliable as a record of events, but useful as evidence of official aims and of the methods the government used to shape opinion.",
    explanation: "One mark for each point and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a historian can test the reliability of an oral account recorded decades after the events.",
    points: [["Compare it with other sources, such as documents, archaeology or other oral accounts, and look for agreement (corroboration)", 2], ["Consider the speaker's age and position, the gap in time, the purpose of the account and the way the question was asked, which may have shaped memory", 2]],
    hints: ["Think of what the account can be checked against and what might affect memory."],
    modelAnswer: "A historian can compare it with other sources, such as documents, archaeology or other oral accounts, and look for agreement. The historian should also consider the speaker's age and position, the gap in time, the purpose of the account and the way the question was asked, all of which may have shaped memory.",
    explanation: "One mark for each point and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Company inspector, 1895",
        "The chiefs are loyal and the labour is supplied without difficulty. The tax is paid. I see no cause for anxiety in this district."),
      "",
      source("Source B", "a letter by a fictional missionary to his society, 1895",
        "The people are bitter. Men are taken for work by force, cattle are being seized for the tax, and the elders say that the ancestors are angry. I fear that this quiet will not last."),
      "",
      source("Source C", "a recollection told in the 1950s by a fictional Shona elder",
        "We were afraid of the police. When the rains failed and the cattle died, the mediums told us that the strangers had brought the trouble. We listened to them."),
      "",
      source("Source D", "a newspaper article in a fictional settler newspaper, 1896",
        "The Natives have risen in treachery after being treated with great kindness. Nothing but firm measures will restore order."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Compare Sources A and B as evidence of the mood of the people in 1895.", points: [["Differ: A says the chiefs are loyal and there is no cause for anxiety; B says that the people are bitter and warns that the quiet will not last", 2], ["Explain: A is by an inspector who has an interest in showing a calm district and who reports to the Company; B is by a missionary who lived among the people and reported to a society, so he had less reason to flatter the administration", 2]] }),
      P.manual({ label: "(b)", marks: 8, stem: "How far do Sources A to D support the view that the 1896 rising was caused mainly by resentment of Company rule?", type: "EXTENDED_RESPONSE", levels: levels(8), points: [["Support: B (forced labour, cattle seizures, bitterness) and C (fear of the police, blame of strangers) point to grievances against Company rule", 2], ["Challenge: A denies discontent and D blames treachery and not grievances; both are by interested writers; C also gives the part of the mediums and the disasters of drought and cattle disease", 2], ["Own knowledge: land, labour, taxes, the Native Police, rinderpest and religious leaders all played a part, and historians debate the weight of each", 2], ["Judgement: the sources, tested against knowledge, support the view in part; resentment of Company rule was fundamental but religious leadership and the disasters triggered the rising", 2]], modelAnswer: "The sources support the view in part. Source B, from a missionary who lived among the people, reports forced labour, seizure of cattle and bitterness, and Source C recalls fear of the police and blame of the strangers, both of which point to resentment of Company rule. Source A challenges this by claiming that the chiefs were loyal, but its author, an inspector, had a reason to show that his district was calm. Source D blames treachery, but it comes from a settler newspaper that wished to justify firm measures. Source C also shows that mediums and the disasters of drought and cattle death were important. My own knowledge supports the view that grievances over land, labour, taxes and the police lay behind the rising, but the Jameson Raid, rinderpest and the leadership of religious figures such as Mkwati, Kaguvi and Nehanda also mattered. I conclude that resentment of Company rule was the main underlying cause, supported by B and C and by my knowledge, but that the trigger and organisation came from other factors." }),
    ],
    hints: ["For (b), group the sources into those that support and those that challenge, and test each against what you know."],
    explanation: "All four sources are invented. This practice item mirrors the two-part pattern of a Paper 1 question on a smaller scale.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional newspaper in Paris, 1793",
        "The republic is in danger. Foreign armies are on our frontier, and traitors within the country are in touch with them. Only prompt and severe measures can save us."),
      "",
      source("Source B", "a diary entry by a fictional Paris shopkeeper, 1794",
        "Two of my neighbours were arrested last week. One had quarrelled with a man who now sits on the local committee. People say that to be safe it is best to say nothing."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the reason for severe measures?", points: ["The republic was in danger from foreign armies", "There was a fear of traitors within the country"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence about the Terror.", points: [["Differ: A justifies severe measures as a response to war and treason; B suggests that arrests could depend on personal quarrels and led to silence", 2], ["Explain: A is a public editorial written to persuade; B is a private diary written by an ordinary witness, with less reason to justify the measures", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian studying the reasons for and effects of the Terror?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful for the public justification (war and treason) but is propaganda-like and exaggerates", 2], ["B is useful for the effects on ordinary people and for local conditions, but it is one neighbourhood and one witness's perception", 2], ["Own knowledge: war on the frontiers in 1793, revolts and the Law of Suspects support A; the use of denunciation supports B; together they give a fuller picture", 2]], modelAnswer: "Source A is useful because it shows how the government justified severe measures, by war and treason, which fits the situation in 1793. As an editorial written to persuade it exaggerates the danger and says nothing about abuses. Source B is useful because it records the effect of the Terror on ordinary people, including the use of denunciation and the silence that followed. It is the view of one shopkeeper in one neighbourhood and may reflect rumour. My own knowledge supports both: the republic faced foreign armies and revolts in 1793, and the Law of Suspects encouraged denunciation. Together the sources give a fuller picture than either alone." }),
    ],
    hints: ["For (c), consider the purpose of each source and what each leaves out."],
    explanation: "Both sources are invented. The knowledge of the Terror is incidental; the point is the method.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "'A source written by a participant at the time is always more useful to a historian than a source written later.' How far do you agree?",
    levels: levels(8),
    points: [
      ["For: a participant writing at the time knows events directly, has no hindsight and may record details later forgotten", 2],
      ["Against: a participant may know only a small part, write for a purpose or from fear; a later writer may have more evidence, a wider view and the benefit of comparison", 2],
      ["Usefulness depends on the question: a recollection can be more useful for attitudes, a contemporary report for detail; both can be tested by corroboration", 2],
      ["Judgement with a reason", 2],
    ],
    hints: ["Think of examples: an official report and a recollection, and the question they are used to answer."],
    modelAnswer: "I agree only in part. A participant writing at the time has direct knowledge, no hindsight and may record details that are later forgotten, as in a private letter. But a participant may see only a small part of events, may write for a purpose such as justifying his work in an official report, or may be afraid to tell the truth. A later writer may have more evidence, a wider view and the chance to compare accounts, though memory and later events may distort a recollection. Usefulness also depends on the question: a recollection can be more useful for attitudes and experience, and a contemporary report for facts and dates. Both are best tested by corroboration with other sources. I conclude that the date alone does not decide usefulness; provenance, purpose and the question matter more.",
    explanation: "Credit developed arguments on both sides and a supported judgement.",
  });

  b.card("DEFINITION", "What is provenance?", "The origin of a source: who made it, when, for whom, why and in what form.");
  b.card("DEFINITION", "What is the difference between reliability and usefulness?", "Reliability is whether the source can be trusted; usefulness is whether it helps answer a particular question. An unreliable source can still be useful.");
  b.card("DEFINITION", "What is an inference?", "A conclusion that can be reasonably drawn from a source although it is not stated directly.");
  b.card("DEFINITION", "What is corroboration?", "Agreement between independent sources, which increases confidence in the evidence.");
  b.card("CONCEPT", "What are the four provenance questions?", "Author (who?), date (when?), audience (for whom?), purpose (why?).");
  b.card("CONCEPT", "How should you answer 'Compare Sources A and B'?", "Compare by point (similarities and differences), explain the differences from context and provenance, and reach a judgement. Do not describe each source in turn.");
  b.card("CONCEPT", "How should you answer 'How far do the sources support the statement?'", "Sort sources into support and challenge, evaluate each with provenance, add own knowledge, and give a supported judgement about the extent.");
  b.card("CONCEPT", "Why is a biased source still useful?", "It shows attitudes, purposes and what the author wanted others to believe, and can be tested against other evidence.");
  b.card("CONCEPT", "Is a contemporary source always more reliable than a later one?", "No. A contemporary writer may know little or write for a purpose; a later writer may know more but be affected by hindsight. Judge each by provenance and content.");
});
