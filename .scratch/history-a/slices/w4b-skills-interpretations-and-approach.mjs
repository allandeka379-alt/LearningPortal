// W4b: ahist.skills.interpretations-and-approach (Cambridge only: A Level skill, Paper 3). Taught with invented extracts on topics outside Paper 3.
import { concept, P, source, extract, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4b-util.mjs";

const E_GZ = `Great Zimbabwe did not fall to an enemy, and no chronicle describes its last day. What the ground tells us is that a town of thousands was living on the edge of what its fields and herds could bear. Cattle in large numbers need pasture; fires need wood; a dense population needs grain. By the fifteenth century the surroundings of the city had been stripped, and the soils, never rich, were tired. At the same time the trade in gold that had enriched its rulers was moving north towards the Zambezi, where new centres took the profits. A state that depended on cattle and gold, and lost the grazing and the gold together, had no reason to keep its capital where it stood. The people did not vanish; they moved, and their descendants founded new capitals. Oral traditions speak of quarrels among rulers, but these stories were written down centuries later and tell us more about memory than about causes. It is the evidence from the soil, the bones and the trade routes that carries most weight.`;

const E_MF = `For generations it was taught that a single African king, Shaka, set the interior of southern Africa ablaze, driving panic-stricken peoples across the highveld in a wave of conquest. The story is neat, and it is suspiciously convenient. It was told most often by European writers who wished to explain why the lands north of the Orange River seemed empty when their wagons arrived, and why African rule had to be replaced by something better. Look instead at the pressures acting on the region: drought in the early years of the century, the growth of the ivory trade at Delagoa Bay, and the demand for captive labour from the Cape frontier. These forces disrupted societies before any Zulu regiment crossed the Drakensberg. Violent Zulu expansion was one thread in this tangle, not the cause of it, and to make it the cause is to repeat the settlers' own explanation of how their farms came to stand on land they had not cleared.`;

const E_DEC = `Textbooks long taught that Britain "granted" independence to its African colonies, as though the empire had decided one morning to leave. This is the view from the Colonial Office, not from the street. In the towns of the Gold Coast, strikes, boycotts and the organisation of ordinary traders, clerks and ex-servicemen made the old system unworkable. The politicians who led the mass parties did not wait for a gift; they built branches in every district and forced the colonial government to negotiate. The history of decolonisation should begin with those who made it, and treat London's decisions as responses.`;

concept("ahist.skills.interpretations-and-approach", { file: "skills/interpretations-and-approach", keyPrefix: "skills.interpretations-and-approach" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In history, what is an interpretation?",
    ok: ["A historian's reasoned explanation or judgement about the past", "Correct: it is an argument based on evidence."],
    no: [
      ["A list of dates and names taken from a reliable textbook", "A list of facts is not an argument."],
      ["A copy of a primary source with the spelling put into modern form", "That is an edited source and not an interpretation."],
      ["A guess about the past made without the use of any evidence", "Interpretations are based on evidence."],
    ],
    explanation: "An interpretation is a historian's argument about what happened, why and how important it was. It is based on evidence but is open to challenge.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the 'approach' of a historian mean?",
    ok: ["The questions asked, the evidence used and the assumptions made", "Correct: it explains how the interpretation was reached."],
    no: [
      ["The number of pages that the historian wrote on the main topic", "Length is not the approach."],
      ["The language in which the historian published the book or the article", "The language of publication is not the approach."],
      ["The year in which the extract was added to the school syllabus list", "This has nothing to do with the historian's method."],
    ],
    explanation: "The approach covers the questions a historian asks, the kind of evidence used, and the assumptions, values and school of thought, such as economic or social history.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a reason why historians reach different interpretations of the same events?",
    ok: ["They select and stress different parts of incomplete evidence", "Correct: selection is unavoidable."],
    no: [
      ["They all read the same documents but some of them are less intelligent", "Differences do not come from intelligence."],
      ["They are required by law to defend a single view of every event", "No law requires a single view."],
      ["They always write for the same audience and in the same year", "Historians write at different times for different audiences."],
    ],
    explanation: "Evidence is incomplete, so historians must select and stress some parts. New evidence, the time and place of writing, ideology and the questions asked also lead to differences.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: `${extract(E_DEC)}\n\nWhich statement best describes the approach of this extract?`,
    ok: ["It writes history from below and stresses the actions of ordinary Africans", "Correct: it begins with those who made the change."],
    no: [
      ["It writes only about the decisions of ministers and officials in London", "It criticises that view."],
      ["It relies on figures for trade and tax collected by the colonial treasuries", "No statistics are used."],
      ["It writes about the military campaigns fought between European armies", "It does not discuss military campaigns."],
    ],
    hints: ["Look at whose actions the historian treats as most important."],
    explanation: "The extract rejects the 'view from the Colonial Office' and places the actions of traders, clerks, ex-servicemen and party organisers at the centre. This is a history-from-below or nationalist approach.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: `${extract(E_DEC)}\n\nWhich statement is best supported by the extract?`,
    ok: ["Independence was won mainly by pressure from within the colony", "Correct: it says that London's decisions were responses."],
    no: [
      ["The historian proves that Britain wished to leave Africa by the year 1950", "The extract does not say this."],
      ["The historian shows that the colonial government had no power in the Gold Coast", "It says the system became unworkable, not powerless."],
      ["The historian thinks that decolonisation is best studied from British records alone", "The extract argues against that view."],
    ],
    hints: ["Find the sentence that states the main claim."],
    explanation: "The main claim is that independence came from the action of Africans and that London was responding. The extract does not claim that the colonial power had no authority at all.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: `${extract(E_DEC)}\n\nWhich fact from your own knowledge best challenges the extract's interpretation?`,
    ok: ["Britain's economic strain after 1945 shaped the timing of decolonisation", "Correct: it adds factors outside the colony."],
    no: [
      ["Strikes and boycotts took place in the towns of the Gold Coast in the 1940s", "This supports the extract."],
      ["Mass parties built branches in many districts and won elections", "This too supports the extract."],
      ["Traders, clerks and ex-servicemen took part in protests against the colonial government", "This also supports the extract."],
    ],
    hints: ["Which fact looks beyond the colony itself?"],
    explanation: "Historians who stress the international setting point to Britain's weakness after the Second World War and its changing priorities. This does not make the extract wrong, but shows that it gives only part of the explanation.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "In a Paper 3 answer, what is the best use of your own knowledge?",
    ok: ["To support or challenge specific points made in the extract", "Correct: it must be linked to the extract."],
    no: [
      ["To write a full narrative of the period, whether or not it is linked to the passage", "Unlinked narrative earns little."],
      ["To replace the extract with your own opinion of what the historian should have written", "The task is to analyse the extract."],
      ["To guess the name of the historian and the title of the book", "The extract is unattributed."],
    ],
    explanation: "Knowledge is credited when it is used to test, explain or add to a claim in the extract. An unlinked summary of the topic earns few marks.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment on bias in a historian's work is the most accurate?",
    ok: ["A one-sided view is not necessarily wrong, but it must be tested against other evidence", "Correct: bias shapes emphasis but is not the same as error."],
    no: [
      ["A historian with a clear viewpoint is always unreliable and should be ignored", "A viewpoint does not make the work worthless."],
      ["A historian with no viewpoint has written the best possible account of the past", "Every historian selects and judges."],
      ["A historian cannot be biased if the account is based on official documents", "Documents are also selected and interpreted."],
    ],
    hints: ["Think of the difference between emphasis and error."],
    explanation: "Every historian has a point of view. The skill is to identify how it shapes the interpretation and to test the claims against other evidence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An interpretation and an approach are the same thing.",
    answer: false,
    explanation: "False. The interpretation is the historian's conclusion; the approach is how the historian studied the topic (the questions, evidence and assumptions). They are linked but different.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The passing of time and the discovery of new evidence can change historians' interpretations.",
    answer: true,
    explanation: "True. New archives, new methods and new questions from later generations often lead to revised interpretations.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "In an unattributed extract, a good answer names the historian who probably wrote it.",
    answer: false,
    hints: ["Think about what the question asks you to use."],
    explanation: "False. The extract is unattributed and invented. The answer should analyse the interpretation and approach shown in the passage, not guess an author.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Interpretation", "A historian's reasoned explanation or judgement about the past"],
      ["Approach", "The questions, methods, assumptions and values behind the work"],
      ["Historiography", "The study of how history has been written and how views have changed"],
      ["Selection", "The choice of which evidence to stress in building an account"],
    ],
    explanation: "Each term is a part of how historians' views differ: the conclusion, the method, the study of the writing of history, and the choice of evidence.",
  });
  chrono(b, [
    "The decline of Great Zimbabwe",
    "The British slave trade is abolished",
    "The Berlin Conference",
    "Ghana becomes independent",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from the fifteenth century to 1957."],
    explanation: "The fifteenth century; 1807; 1884-85; 1957.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A historian's {{blank:a}} is the main argument about the past, while the {{blank:b}} is the way in which the work was done.",
    blanks: [
      { id: "a", accepted: ["interpretation"], choices: ["interpretation", "source", "chronology", "bibliography"] },
      { id: "b", accepted: ["approach"], choices: ["approach", "caption", "footnote", "index"] },
    ],
    explanation: "The interpretation is the argument; the approach is the method, questions and assumptions behind it.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes the study of how history has been written and how interpretations have changed?",
    accepted: ["historiography", "Historiography", "the historiography"],
    wrong: ["geography"],
    explanation: "**Historiography**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between a historian's interpretation and a historian's approach.",
    points: [["An interpretation is the historian's main argument or judgement about what happened and why", 2], ["An approach is how the historian studied it: the questions asked, the evidence chosen and the assumptions or values behind the work, which shape the interpretation", 2]],
    modelAnswer: "An interpretation is the historian's main argument or judgement about what happened and why. The approach is how the historian studied the topic: the questions asked, the evidence chosen and the assumptions or values behind the work. The approach shapes the interpretation, for example an economic approach tends to produce an economic explanation.",
    explanation: "Credit a clear definition of each and a link between them.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain two reasons why historians may disagree about the causes of an event.",
    points: [["Evidence is incomplete and selected: historians stress different parts of the surviving evidence, so reach different conclusions", 2], ["The time and place of writing, or the ideology and the questions asked, influence emphasis: for example a historian writing during decolonisation may ask about African action", 2]],
    hints: ["Think of evidence, time, place and the questions asked."],
    modelAnswer: "Evidence is incomplete and has to be selected, so historians stress different parts of it and reach different conclusions. The time and place in which a historian writes also matter, because the questions asked change, for example a historian writing during decolonisation may ask about African action rather than imperial policy.",
    explanation: "Credit two developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the language of the Great Zimbabwe extract helps to show the historian's approach.",
    points: [["The confident wording ('did not fall to an enemy', 'carries most weight') shows a firm environmental and economic argument built on physical evidence", 2], ["The dismissal of oral traditions as telling 'more about memory than about causes' shows that the historian prefers archaeology and trade evidence to traditions written down later", 2]],
    hints: ["Choose two phrases and say what each reveals."],
    modelAnswer: "The confident wording, such as 'did not fall to an enemy' and 'carries most weight', shows a firm environmental and economic argument built on physical evidence. The dismissal of oral traditions as telling 'more about memory than about causes' shows that the historian prefers archaeology and trade evidence to traditions written down later.",
    explanation: "Credit phrases from the extract explained in relation to the approach.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 16, wordLimit: { min: 300, max: 700 },
    stem: `Study the extract.\n\n${extract(E_GZ)}\n\nWhat can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of Great Zimbabwe and its decline to explain your answer.`,
    levels: levels(16, "interpretation"),
    points: [
      ["Identifies the interpretation: Great Zimbabwe declined mainly through environmental exhaustion and the shift of the gold trade, not through conquest", 3],
      ["Identifies the approach: environmental and economic, relying on archaeology (soil, bones, trade routes) and discounting oral traditions", 3],
      ["Explains how language and structure convey the argument: the confident tone, the move from absence of evidence to physical evidence, and the claim that the people moved rather than vanished", 2],
      ["Uses knowledge to support: large cattle herds and population, the shift of gold trade northwards, the later states such as Khami and Mutapa", 3],
      ["Uses knowledge to challenge or add: other factors such as political quarrels, disease or trade changes, the uncertain dating and the value of oral tradition", 3],
      ["Judges the extract as a whole: persuasive on physical causes, but single-cause and dismissive of other evidence", 2],
    ],
    hints: ["Separate the main claim, the approach and the way you test them with your own knowledge."],
    modelAnswer: "The extract argues that Great Zimbabwe declined mainly because its environment was exhausted and its gold trade moved away, and not because it was conquered. The historian says the town 'was living on the edge of what its fields and herds could bear', that the soils were tired and that gold was moving north to the Zambezi, so the state 'had no reason to keep its capital where it stood'. The approach is environmental and economic. The historian reasons from physical evidence, 'the soil, the bones and the trade routes', and dismisses oral traditions as written down centuries later, which tell 'more about memory than about causes'. The confident tone and the claim that 'the people did not vanish' show a firm argument.\n\nMy own knowledge supports much of this. Great Zimbabwe was a large stone-walled capital whose rulers owned large herds of cattle and drew wealth from the gold trade with the coast, and archaeology suggests a dense population by the fifteenth century. The shift of political power and the gold trade northwards to the Mutapa state in the Zambezi valley and to the Torwa state at Khami fits the extract. It also fits the point that the people moved to found new centres. However, the extract also leaves things out. Oral traditions speak of disputes of succession and the movement of ruling lineages, and a decline from several causes may be more likely than one; the dating of the decline and the relative weight of causes remain debated by archaeologists. The dismissal of oral tradition reflects a particular approach rather than a proven fact.\n\nThe extract is persuasive in its use of environmental and trade evidence, but it is selective: it puts forward a single main explanation and gives little room to political causes. It is best read as one reasoned interpretation within a debate.",
    explanation: "A top answer states the interpretation and approach separately, quotes phrases to show how they appear, tests the claims with specific knowledge and judges the extract as a whole. Half of the marks are for knowledge and half for the analysis of the interpretation.",
  });
  b.ext({
    d: 5, skill: "ANALYSIS", marks: 12, wordLimit: { min: 250, max: 600 },
    stem: `Study the extract.\n\n${extract(E_MF)}\n\nWhat can you learn from this extract about the interpretation and approach of the historian who wrote it? Use the extract and your knowledge of the Mfecane to explain your answer.`,
    levels: levels(12, "interpretation"),
    points: [
      ["Identifies the interpretation: the idea that Shaka caused a Mfecane is a myth or exaggeration; wider forces (drought, the ivory and slave trades) disrupted societies", 3],
      ["Identifies the approach: revisionist, critical of the European writers who told the story, asking whose interests the story served and stressing economic and regional causes", 3],
      ["Uses knowledge to support: drought and famine, the trade at Delagoa Bay, the demand for labour at the Cape, and the disruption of societies before Zulu expansion", 3],
      ["Uses knowledge to challenge or add: Zulu military change and the conflicts among the Ndwandwe, Mthethwa and Zulu, the movements of Mzilikazi, Soshangane and Zwangendaba, and the evidence for Zulu expansion", 3],
    ],
    hints: ["Say what the historian is arguing against, and then test the claim with specific events."],
    modelAnswer: "The extract argues that the traditional story of the Mfecane, in which Shaka's conquests set the whole interior alight, is a misleading myth. The historian says the story was 'neat' and 'suspiciously convenient' because European writers used it to explain why the land seemed 'empty' when settlers arrived. The interpretation is that drought, the ivory trade at Delagoa Bay and the demand for captive labour from the Cape disrupted societies before the Zulu expanded, and that Zulu expansion was 'one thread in this tangle'. The approach is revisionist and critical: the historian questions the sources, asks who benefited from the story and gives weight to economic and regional causes rather than the actions of one king.\n\nMy own knowledge supports parts of this. There was severe drought and famine in the early nineteenth century, the ivory trade at Delagoa Bay grew, and slave and labour demands came from the Cape frontier and the coast. Societies were under pressure before Shaka rose to power. But the extract may understate the role of the Zulu state. Shaka's military reforms, the conflicts between the Ndwandwe, the Mthethwa and the Zulu in the 1810s, and the movements of leaders such as Mzilikazi, Soshangane and Zwangendaba, who left Zululand with their followers and founded new states, are well documented and suggest that Zulu power was an important cause. Historians still debate the scale and causes of the Mfecane.\n\nThe extract is therefore a strong reminder that the older account was shaped by settler interests, but it is itself selective, because it treats the Zulu expansion as a minor thread.",
    explanation: "A top answer states the interpretation and approach, uses phrases from the extract and balances knowledge that supports the claim with knowledge that challenges it.",
  });

  b.card("DEFINITION", "What is an interpretation in history?", "A historian's reasoned explanation or judgement about what happened, why and how important it was; based on evidence but open to challenge.");
  b.card("DEFINITION", "What is a historian's approach?", "The questions asked, the evidence and methods used, and the assumptions and values behind the work (for example economic, social or 'from below').");
  b.card("DEFINITION", "What is historiography?", "The study of how history has been written and how interpretations have changed over time.");
  b.card("FACT", "List the reasons why historians differ.", "Incomplete evidence, selection, new evidence and the passing of time, the time and place of writing, ideology and beliefs, and the questions asked.");
  b.card("FACT", "What is the format of Cambridge Paper 3?", "One 40-mark question on an unattributed extract of up to 600 words: what can you learn about the interpretation and approach; half knowledge, half interpretation.");
  b.card("CONCEPT", "How do you find the interpretation of an extract?", "Read the whole passage and state its main claim about causes, results or importance; look at topic sentences, conclusions and judgement words.");
  b.card("CONCEPT", "How do you find the approach of an extract?", "Ask what questions the writer asks, what evidence and people are treated as important, and what assumptions, tone and silences show.");
  b.card("CONCEPT", "How should own knowledge be used in an extract question?", "To support, challenge or add to specific points in the extract, always linked to the passage.");
  b.card("CONCEPT", "Is a biased historian always wrong?", "No: every historian has a viewpoint. Bias shapes emphasis and must be tested against other evidence.");
});
