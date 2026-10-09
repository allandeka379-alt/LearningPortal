// W1a: hist.skills.source-evaluation (both boards: ZIMSEC 1.2 and the Paper 1 source question; Cambridge AO3 / Paper 2).
import { concept, P, source, sources, levels, timeline, ZIM, CAM } from "../lib.mjs";

concept("hist.skills.source-evaluation", { file: "skills/source-evaluation", keyPrefix: "skills.source-evaluation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In source analysis, what does **provenance** mean?",
    options: [
      ["Who produced the source, when, for whom and why", "Correct: provenance is the origin of the source."],
      ["The main point the source is trying to make", "That is the message of the source."],
      ["Something you can work out that the source does not say directly", "That is an inference."],
      ["Whether the source agrees with another source", "That is comparison or cross-referencing."],
    ],
    answer: "A",
    explanation: "Provenance = nature, origin and purpose: what kind of source, who made it, when, for whom and why. It is usually in the caption.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an **inference** rather than a piece of comprehension?",
    options: [
      ["A complaint that workers keep leaving suggests poor conditions", "Correct: the letter does not say conditions were poor, but we can work it out from the complaint."],
      ["A letter says that the mine employed three hundred workers last year", "This simply repeats what the source states: comprehension."],
      ["A letter is dated and signed by a mine manager", "This describes the provenance, not an inference."],
      ["A letter is written in English on company paper", "This describes the nature of the source."],
    ],
    answer: "A",
    explanation: "An inference is worked out from the source and supported by a detail in it; comprehension repeats what it says directly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about a **biased** source is correct?",
    options: [
      ["It can still be useful as evidence of opinions", "Correct: bias limits reliability about events but can make a source valuable evidence of attitudes."],
      ["It must always be ignored by historians as worthless", "Historians use biased sources all the time, with care."],
      ["It is always a secondary source", "Primary sources can be biased too, for example propaganda produced at the time."],
      ["It always contains invented facts", "Bias often works by selection and emphasis, not only by invention."],
    ],
    answer: "A",
    explanation: "Bias reduces reliability as a record of what happened, but a biased source is good evidence of what its author wanted people to believe.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: [
      "Study the source.",
      "",
      source("Source A", "a notice from a fictional mining company published in a London newspaper",
        "Shares now available! Our company's land north of the Limpopo is rich in gold, the climate is healthy and the country is quiet. Investors can expect large profits within two years."),
      "",
      "What was the most likely **purpose** of Source A?",
    ].join("\n"),
    options: [
      ["To persuade people in Britain to buy shares in the company", "Correct: it is an advertisement aimed at investors, promising profits."],
      ["To warn settlers about the dangers of living north of the Limpopo", "It does the opposite: it says the climate is healthy and the country quiet."],
      ["To report accurately on how much gold had been mined", "It gives no figures; it promises future profits."],
      ["To persuade the local African population to work in the mines", "It was published in London and speaks to investors, not local workers."],
    ],
    answer: "A",
    hints: ["Who would read a London newspaper notice about shares?", "What does it want them to do?"],
    explanation: "Purpose links the audience (British readers with money) and the content (promises of gold and profit): the notice was written to sell shares.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A historian wants to know **how ordinary Ndebele people experienced Company rule in the 1890s**. Which source would probably be the most useful starting point?",
    options: [
      ["Interviews recorded in the 1930s with Ndebele elders who lived through those years", "Correct: these record the experience of the people being studied, though memory must be checked."],
      ["An annual report of the British South Africa Company to its shareholders in London", "This shows the Company's view, written to reassure investors."],
      ["A map of the gold claims registered by settlers", "Useful on land and mining, but it says nothing directly about Ndebele experience."],
      ["A speech by a British politician praising the Company", "A distant outsider with a political purpose; it reveals British attitudes, not Ndebele experience."],
    ],
    answer: "A",
    hints: ["Whose experience is the historian asking about?", "Which source comes from those people?"],
    explanation: "Usefulness depends on the question. For African experience, African testimony is the most direct evidence, checked for the effects of memory and the interviewer.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: [
      "Study the source.",
      "",
      source("Source B", "a diary entry by a fictional missionary at a station near Bulawayo, written on the evening of a public ceremony",
        "Today the king held the great dance. Thousands of warriors in their regiments passed before him, and the cattle of the nation were displayed. I counted twelve regiments before the dust made it impossible to see more."),
      "",
      "Which statement about the **reliability** of Source B is best supported?",
    ].join("\n"),
    options: [
      ["It is a fairly reliable eyewitness record, though he admits he could not count everything", "Correct: it was written the same day by an eyewitness, and he himself states the limit of his evidence."],
      ["It is completely unreliable because missionaries never wrote about African ceremonies at all", "Missionaries often described ceremonies; this assertion is false and ignores the provenance."],
      ["It is reliable about the king's private thoughts because the writer was present", "Being present lets him see the ceremony, not know the king's thoughts."],
      ["It is unreliable because it was written many years after the event", "The caption says it was written the same evening."],
    ],
    answer: "A",
    hints: ["When was the entry written, and by whom?", "Does the writer say anything about the limits of what he could see?"],
    explanation: "Reliability combines provenance (an eyewitness writing the same day, with no obvious motive to invent numbers) and content (he admits he could not count everything). A careful answer gives both the strengths and the limits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a comparison question, which approach earns the most credit?",
    options: [
      ["Matching points of agreement and disagreement from both sources", "Correct: examiners reward matched, supported points on both sides."],
      ["Summarising each source separately in turn without linking them together", "Two summaries are not a comparison."],
      ["Stating that both sources are biased", "This is an assertion, not a comparison of content."],
      ["Quoting the whole of the longer source", "Copying earns little; select details and explain them."],
    ],
    answer: "A",
    explanation: "Compare point by point: what both say, where they differ, with details from each; the best answers also explain why they differ.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: [
      "Study the source.",
      "",
      source("Source C", "a cartoon of the kind published in a British magazine in 1919, described in words",
        "Four well-dressed statesmen sit at a table covered in maps. Outside the window, a small, thin child labelled 'the next generation' is crying. The caption reads: 'The peace that will cause a new war?'", { described: true }),
      "",
      "What is the **message** of Source C?",
    ].join("\n"),
    options: [
      ["The cartoonist fears that this peace settlement will lead to another war", "Correct: the child (the next generation) suffers, and the caption asks whether the peace will cause a new war."],
      ["The cartoonist believes that the statesmen have made a lasting peace", "The crying child and the questioning caption point the other way."],
      ["The cartoonist is complaining that children were not invited to the peace conference", "The child is a symbol of the future, not a literal complaint about who attended."],
      ["The cartoonist thinks that the statesmen should spend more time studying maps", "The maps show what the statesmen are doing; they are not the point being criticised."],
    ],
    answer: "A",
    hints: ["Who does the child represent?", "Read the caption: is it confident or worried?"],
    explanation: "A cartoon's message is its point of view. Here the symbols (statesmen dividing maps, a suffering child labelled 'the next generation') and the caption show fear that the peace will cause a future war.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A source is reliable simply because it is a primary source.",
    answer: false,
    explanation: "False. Reliability depends on who produced the source, why, and whether its content is supported by other evidence. A primary source can be biased or mistaken.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Checking a source's content against your own knowledge of the period is one way of testing its reliability.",
    answer: true,
    explanation: "True. If the source contradicts well-established facts (for example, wrong dates or events), its reliability is in doubt.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each skill with the question that tests it.",
    pairs: [
      ["Comprehension", "What does Source A say about the number of settlers?"],
      ["Inference", "What can you learn from Source A about attitudes to African labour?"],
      ["Purpose", "Why was Source B published?"],
      ["Comparison", "How far do Sources A and B agree?"],
    ],
    explanation: "Comprehension: what the source states. Inference: what it suggests. Purpose: why it was produced. Comparison: agreement and disagreement between sources.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each invented source with the **most likely purpose** of its author.",
    pairs: [
      ["A poster calling on young men to join the army", "To recruit"],
      ["A company report sent to shareholders", "To reassure investors"],
      ["A protest letter from a chief to a colonial governor", "To complain and seek a change"],
      ["A private diary never meant to be published", "To record personal thoughts and experiences"],
    ],
    hints: ["Think about who each source was made for."],
    explanation: "Purpose follows from audience: the public (recruitment), shareholders (reassurance), the governor (complaint), oneself (private record, often franker than public documents).",
  });
  {
    const t = timeline([
      ["1887", "Grobler Treaty with the South African Republic"],
      ["February 1888", "Moffat Treaty"],
      ["October 1888", "Rudd Concession"],
      ["September 1890", "The Pioneer Column raises the flag at Fort Salisbury"],
    ]);
    const order = [3, 1, 0, 2];
    b.match({
      d: 3, skill: "UNDERSTANDING", applies: ZIM,
      stem: "Own knowledge of chronology is a key test of a source's reliability. Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: ["1st (earliest)", "2nd", "3rd", "4th (latest)"],
      rightIndex: order,
      hints: ["The two treaties came before the concession.", "The occupation came last."],
      explanation: "Grobler Treaty (1887), Moffat Treaty (February 1888), Rudd Concession (30 October 1888), Fort Salisbury (12 September 1890). A source dated before 1890 that mentions Fort Salisbury is misdated or not genuine.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The point a cartoonist wants the audience to accept is the cartoon's {{blank:a}}. A one-sided view that favours one group is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["message"], choices: ["message", "provenance", "caption", "utility"] },
      { id: "b", accepted: ["bias"], choices: ["bias", "inference", "chronology", "context"] },
    ],
    explanation: "The **message** is the point being made; **bias** is a one-sided view.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes checking a source against other sources and your own knowledge? (One word, often hyphenated: cross-…)",
    accepted: ["cross-referencing", "cross referencing", "crossreferencing", "cross-reference", "cross reference", "cross-checking", "cross checking", "crosschecking"],
    wrong: ["corroboration only", "comprehension"],
    explanation: "**Cross-referencing** (cross-checking) tests a source against other evidence. Corroboration is the result when they agree.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: [
      source("Source D", "a speech by a fictional settler leader to a meeting of farmers in Salisbury, 1900",
        "The native has no need of more land. He grows only enough to eat and leaves the rest idle. Give the land to men who will farm it properly, and the whole country will grow rich."),
      "",
      "Explain why a historian should be careful about using Source D as evidence of how much land Africans needed.",
    ].join("\n"),
    points: [
      "The speaker was a settler leader who wanted more land for settlers (purpose / self-interest)",
      "His audience were farmers who would gain from the land, so he says what they want to hear",
      "Own knowledge: Africans farmed, kept cattle and used fallow land; 'idle' land was often resting or grazing land",
      "It gives no evidence or figures; it is an opinion, not a survey",
    ],
    hints: ["Who would benefit if Africans were said to need less land?"],
    modelAnswer: "The speaker was a settler leader speaking to farmers, and both would gain if more land went to settlers, so he had a reason to say that Africans did not need it. The claim that land was 'idle' ignores the fact that African farmers rested land (fallow) and used it for grazing. He gives no figures or evidence, only his opinion. The source is better evidence of settler attitudes than of African needs.",
    explanation: "One mark per point; the best answers use both provenance and own knowledge.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between the **reliability** and the **usefulness** of a source, with an example.",
    points: [
      "Reliability: how far the source can be trusted as an accurate account",
      "Usefulness: how much it can tell the historian about a particular question",
      "An unreliable (biased) source can still be useful, e.g. as evidence of attitudes or propaganda",
      "A relevant example (e.g. a company report that hides problems is unreliable about conditions but useful about how the company presented itself)",
    ],
    hints: ["Can a source that you do not trust still tell you something?"],
    modelAnswer: "Reliability is how far a source can be trusted to describe events accurately. Usefulness is how much it can tell a historian about the question being asked. A source can be unreliable but useful: a company report that claims all is calm in 1895 is unreliable about African feelings, but it is useful evidence of how the company wanted investors to see the colony.",
    explanation: "Usefulness always depends on the question; reliability is about accuracy.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: [
      sources([
        source("Source A", "a report by a fictional colonial official to his superiors, 1903",
          "The hut tax has been collected without difficulty in my district. The people understand that it pays for peace and good government."),
        source("Source B", "an account recorded in the 1970s from a fictional elder who grew up in the same district",
          "When the tax collectors came, the young men ran to the mines in the south so that their fathers could pay. Those who could not pay lost goats and cattle."),
      ]),
      "",
      "Which source is **more reliable** as evidence of how people in the district felt about the hut tax? Explain your answer.",
    ].join("\n"),
    points: [
      ["Source A: written at the time by an official who wanted to show success to his superiors, so he had reason to report calm", 2],
      ["Source B: from someone who lived through it, but recorded about seventy years later, so memory may have changed details", 2],
      ["Judgement with support from own knowledge: B fits what is known about hut tax forcing men into migrant labour and about cattle seizures, so B is more reliable on feelings (or a supported alternative)", 2],
    ],
    hints: ["What did each author have to gain?", "What do you know about why colonial governments introduced taxes?"],
    modelAnswer: "Source A was written at the time, but by an official reporting to his superiors, who would want to show that he governed well; he says nothing about how people felt except what suits him. Source B comes from someone who experienced the tax, though it was recorded about seventy years later, so details may have changed. Own knowledge supports B: colonial taxes were meant to force African men into wage labour, and many went to the mines to earn the money. So B is more reliable about people's feelings, while A is useful evidence of the official view.",
    explanation: "Weigh both sources by provenance AND content; reach a judgement supported by own knowledge.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "an advertisement by a fictional land company in a Cape newspaper, 1891",
          "Farms of 3,000 acres north of the Limpopo, on rich red soil, free from fever. The natives are friendly and will gladly work for low wages."),
        source("Source B", "a letter from a fictional settler in Mashonaland to his brother in England, 1892",
          "The soil is good, but I have had fever twice since the rains began. No one from the villages will work for me unless I pay in cloth and salt, and they leave as soon as their own fields need hoeing."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Identify **two** points on which Sources A and B agree and **two** on which they disagree.", points: ["Agree: the soil is good", "Agree: land/farms were available to settlers north of the Limpopo", "Disagree: A says free from fever; B has had fever twice", "Disagree: A says Africans will gladly work for low wages; B says they will not work unless paid in goods and leave for their own fields"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Why do the two sources differ? Explain using their provenance.", points: [["A is an advertisement written to attract buyers, so it exaggerates the good points and hides problems", 2], ["B is a private letter from a settler describing his own experience to family, with no reason to attract settlers", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying early settler farming in Mashonaland? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["Source A is useful as evidence of how settlement was advertised / the promise of 3,000-acre farms, but unreliable on conditions", 2], ["Source B is useful as an eyewitness account of disease and of Africans' refusal of low-paid labour (own knowledge: labour shortages, later taxes to force labour)", 2], ["Supported judgement on overall usefulness, recognising the limits (one settler; one advertisement)", 2]], levels: levels(6), modelAnswer: "Source A is useful as evidence of how land companies advertised settlement, promising large farms and willing labour; it is not reliable about conditions because it was written to sell land. Source B is more reliable on conditions: a private letter from a settler to his brother, with no reason to deceive, describing fever and the refusal of Africans to work cheaply. This fits what is known: settlers complained of labour shortages, and the colonial authorities later used taxes to push Africans into wage labour. Together they are useful because they show both the promise and the reality, but they are limited to one advertisement and one settler." }),
    ],
    hints: ["In (b), think about who each source was written for.", "In (c), usefulness can come from reliable content AND from what a source reveals about attitudes."],
    explanation: "The ZIMSEC source question rewards comparison of content, explanation of differences through provenance, and a supported judgement on usefulness that uses own knowledge.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, applies: CAM,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "an editorial in a fictional French newspaper, 1919",
          "Germany started the war and laid waste to our northern provinces. She must pay for every ruined farm and flooded mine, and her army must never again threaten France."),
        source("Source B", "a letter from a fictional British economist to a London newspaper, 1919",
          "To demand sums that Germany cannot pay will ruin her trade, and ours with it. A starving, bitter Germany will not stay peaceful for long."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "How far do Sources A and B disagree? Support your answer with details from both sources.", points: ["Disagree on whether Germany should be made to pay heavily: A demands payment for all damage; B says the sums cannot be paid", "Disagree on what makes peace safe: A wants Germany's army weakened; B warns that a ruined Germany will become a threat", "Some agreement: both are concerned with future peace/security", "Judgement on the extent (largely disagree)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Why might the author of Source A hold this view? Use the provenance and your knowledge.", points: [["France had suffered fighting on its own soil (northern provinces, farms and mines destroyed)", 2], ["A French newspaper in 1919 reflected public demand for compensation and security against a future German attack", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Source B is more useful than Source A to a historian studying the peace settlement.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["Usefulness of B: an economist's warning about the economic consequences; useful on the debate in Britain", 2], ["Usefulness of A: shows French attitudes and demands that shaped the settlement", 2], ["Judgement: usefulness depends on the question; both are useful as evidence of national attitudes", 2]], levels: levels(6), modelAnswer: "Source B is useful because it shows an argument made in Britain that heavy reparations would damage trade and leave Germany bitter, a concern that later events made important. But it is one person's opinion. Source A is equally useful in a different way: it shows the strength of French feeling after fighting on French soil, which explains why France pressed for reparations and for limits on the German army. Neither is more useful in every case; it depends on what the historian is investigating. Together they show the clash of national attitudes behind the settlement." }),
    ],
    hints: ["Think about where each author lived and what their country had suffered.", "Usefulness depends on the question being asked."],
    explanation: "Cambridge Paper 2 rewards specific comparison, explanation of views through context and provenance, and judgements on usefulness that recognise that it depends on the enquiry.",
  });

  b.card("DEFINITION", "What is the **provenance** of a source?", "Its origin: who produced it, when, where, for whom and why.");
  b.card("DEFINITION", "What is an **inference**?", "Something you can work out from a source that it does not state directly, supported by a detail from it.");
  b.card("DEFINITION", "What is **bias**?", "A one-sided view that favours one person, group or opinion.");
  b.card("CONCEPT", "Reliability or usefulness: which depends on the question asked?", "Usefulness. A biased source can still be useful, e.g. as evidence of attitudes.");
  b.card("CONCEPT", "What does NOP stand for in source analysis?", "Nature, Origin, Purpose.");
  b.card("CONCEPT", "Two ways to test reliability?", "Use the provenance (who, when, why, for whom) and check the content against own knowledge and other sources.");
  b.card("CONCEPT", "What makes a good comparison of two sources?", "Specific points of agreement AND disagreement, supported from both, ideally explaining why they differ.");
  b.card("DEFINITION", "What is the **message** of a cartoon?", "The point the cartoonist wants the audience to accept.");
  b.card("CONCEPT", "How do you answer 'How far do these sources show…?'", "Use sources that support and challenge the claim, weigh their reliability, add own knowledge, and conclude.");
});
