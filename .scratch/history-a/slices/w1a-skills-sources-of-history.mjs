// W1a: ahist.skills.sources-of-history (ZIMSEC topic 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.skills.sources-of-history", { file: "skills/sources-of-history", keyPrefix: "skills.sources-of-history" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **oral tradition**?",
    options: [
      ["Spoken knowledge of the past passed down through generations", "Correct: genealogies, praise poems, songs and stories are examples."],
      ["Information recovered by excavating the remains of old settlements and graves", "That is archaeology, which studies material remains."],
      ["Records written by Portuguese traders and priests about the African interior", "These are written sources, produced by outsiders."],
      ["Pictures painted on cave walls by early hunter-gatherers", "These are rock art, a visual source."],
    ],
    answer: "A",
    explanation: "Oral tradition is spoken knowledge handed down across generations. Archaeology uses material remains, written sources use documents and rock art is a visual source.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which source would be **most useful** for finding the approximate age of a wooden beam found in an old building at Khami?",
    options: [
      ["Radiocarbon dating of the wood", "Correct: organic material such as wood contains carbon-14, which can be measured."],
      ["A Shona clan praise poem", "Praise poems give names and relationships, not scientific dates for objects."],
      ["A drawing made by a traveller in 1871", "This could show what the traveller saw, but not the age of the beam."],
      ["The study of related Bantu words", "Linguistics shows long-term links between languages, not the age of a single object."],
    ],
    answer: "A",
    hints: ["Which method works on organic material?"],
    explanation: "Radiocarbon dating measures the decay of carbon-14 in organic material such as wood, charcoal or bone. The other sources cannot date a single object.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are Portuguese documents valuable but limited as evidence for the Mutapa state?",
    options: [
      ["They are written at the time but reflect narrow views and interests", "Correct: contemporary and dated, yet written by outsiders who saw little and often wanted something."],
      ["They were written centuries later and were copied from African court songs", "The main documents were written in the sixteenth and seventeenth centuries by people on the spot."],
      ["They describe only the Ndebele state of the nineteenth century in detail", "The Ndebele state is of a later period; Portuguese writers described the Mutapa."],
      ["They were written in Shona by court historians", "They were written in Portuguese by traders, soldiers, officials and priests."],
    ],
    answer: "A",
    explanation: "Portuguese writers were contemporary witnesses with dates and names, but they saw only parts of the country, wrote for their own purposes and often misunderstood African customs.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What does it mean to say that an oral tradition has been **telescoped**?",
    options: [
      ["Events from a long period are compressed into a shorter one in the telling", "Correct: telescoping squeezes the time between events or merges several rulers into one."],
      ["The tradition has been translated into the language of the colonial rulers", "Translation is a different problem; telescoping concerns time in the retelling."],
      ["The tradition is recited only by the descendants of the first ruler", "Who recites it is a question of bias; telescoping is about compression of time."],
      ["The tradition has been confirmed by archaeological excavation", "Confirmation is a check on a tradition; it is not what telescoping means."],
    ],
    answer: "A",
    hints: ["Think of how a telescope can make distant things look close together."],
    explanation: "In oral tradition events from many generations can be run together or attributed to one famous ruler, so a tradition rarely gives reliable dates by itself.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which conclusion about Great Zimbabwe is **best supported** by the evidence of Chinese porcelain and glass beads found inside the Great Enclosure?",
    options: [
      ["Its rulers were linked to Indian Ocean trade routes", "Correct: imported goods reached the site, probably through the gold and ivory trade via Sofala."],
      ["The site was built by Chinese merchants who settled inland", "Imported goods show trade, not foreign builders; the walls are African work."],
      ["Great Zimbabwe was abandoned before the thirteenth century", "Radiocarbon dates show that the main stone building belongs to about the thirteenth to fifteenth centuries."],
      ["The state had no cattle and depended entirely on trade", "Cattle bones are found at the site, and cattle were an important form of wealth."],
    ],
    answer: "A",
    hints: ["Objects found far from where they were made point to contact, not necessarily to the makers living there."],
    explanation: "Foreign objects show contact and exchange. They do not show that foreigners built the site, and the other statements contradict the archaeological evidence.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which archaeologist's excavations in **1929** helped to confirm that Great Zimbabwe was built by Africans?",
    options: [
      ["Gertrude Caton-Thompson", "Correct: she confirmed the conclusion reached by Randall-MacIver in 1905."],
      ["Karl Mauch, geologist", "Mauch, a geologist, visited in 1871 and suggested outside builders."],
      ["Theodore Bent, explorer", "Bent excavated in 1891 and argued for non-African builders."],
      ["João dos Santos, friar", "He was a Portuguese friar of the sixteenth century, not an archaeologist."],
    ],
    answer: "A",
    hints: ["She followed an earlier excavation in 1905 that reached the same view."],
    explanation: "Caton-Thompson (1929) agreed with David Randall-MacIver (1905) that the evidence pointed to a medieval African origin. Mauch and Bent had suggested foreign builders.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A historian finds that a praise poem and a Portuguese letter name the same ruler and the same capital, though neither knew of the other. What is the **most reasonable** conclusion?",
    options: [
      ["Independent agreement makes the ruler and capital likely real", "Correct: independent agreement is the basis of triangulation."],
      ["The poem must have been copied from the Portuguese letter", "The scenario says they were independent, so copying is not a reasonable assumption."],
      ["Neither can be used at all, since both sources could be biased", "Bias must be weighed, but independent agreement strengthens a claim; it does not destroy it."],
      ["Only the Portuguese letter should be trusted because it is written", "Writing does not make a source more truthful than an oral tradition."],
    ],
    answer: "A",
    hints: ["Which method does the lesson call triangulation?", "What does independent agreement of different kinds of evidence do to a claim?"],
    explanation: "When different kinds of evidence that do not depend on each other agree, the claim is much stronger. Each source still has its own weaknesses, such as bias or telescoping.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why was the theory that Great Zimbabwe was built by foreigners accepted by many European settlers in the early colony?",
    options: [
      ["It fitted the prejudiced belief that Africans could not build in stone", "Correct: the idea reflected prejudice, not evidence."],
      ["It had been proved by radiocarbon tests carried out in the nineteenth century", "Radiocarbon dating was developed in the 1940s and has supported an African origin."],
      ["It was the agreed conclusion of every excavation carried out at the site", "Excavations by Randall-MacIver and Caton-Thompson rejected foreign builders."],
      ["It was taught by Shona oral tradition at the time", "Shona tradition associated the site with the ancestors of the Shona."],
    ],
    answer: "A",
    hints: ["Think about the attitudes of the time rather than about evidence."],
    explanation: "The theory rested on racial prejudice rather than evidence, and it was useful to settlers who wished to deny African achievement. Archaeology and later dating refuted it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A primary source comes from the time of the events or from someone who witnessed them.",
    answer: true,
    explanation: "True. A primary source is contemporary or comes from a participant or witness. A secondary source is written later using other sources.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Because Portuguese writers were present at the time, their accounts of the Mutapa state can be accepted without checking.",
    answer: false,
    explanation: "False. Being contemporary is an advantage, but Portuguese writers saw only parts of the country, wrote for their own purposes and could misunderstand African customs. Their accounts must be checked against other evidence.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "If a written source does not mention a state, historians can conclude that the state did not exist.",
    answer: false,
    hints: ["Who wrote the sources, and what did they see?"],
    explanation: "False. Silence is weak evidence. Writers recorded only what they saw or cared about, so many African states are missing from documents, which is why oral tradition and archaeology matter.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each source with an example of it from the history of the region.",
    pairs: [
      ["Oral tradition", "Ndebele royal praise poems (izibongo)"],
      ["Written source", "A letter by a Portuguese official at Sofala"],
      ["Archaeology", "Chinese porcelain excavated at Great Zimbabwe"],
      ["Rock art", "San paintings in the Matopo Hills"],
    ],
    explanation: "Each kind of source has typical examples: praise poems (oral), Portuguese letters (written), excavated objects (archaeology) and paintings (rock art).",
  });
  {
    const events = [
      "Karl Mauch visits Great Zimbabwe and suggests foreign builders",
      "Randall-MacIver rejects foreign builders after excavation",
      "Caton-Thompson confirms an African origin",
      "Great Zimbabwe is inscribed as a World Heritage Site",
    ];
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these developments in the study of Great Zimbabwe in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Mauch's visit came in the nineteenth century.", "World Heritage status came last, in the 1980s."],
      explanation: "Mauch (1871), Randall-MacIver (1905), Caton-Thompson (1929), World Heritage status (1986).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Radiocarbon dating measures the decay of {{blank:a}} in organic material, and it was developed in the late {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["carbon-14"], choices: ["carbon-14", "uranium", "iron", "calcium"] },
      { id: "b", accepted: ["1940s"], choices: ["1840s", "1890s", "1940s", "1980s"] },
    ],
    explanation: "Radiocarbon dating uses carbon-14. It was developed in the late 1940s and applied in southern Africa from the 1950s.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the layering of deposits in the ground that archaeologists use to work out the order of events at a site. (One word.)",
    accepted: ["stratigraphy"],
    wrong: ["geology"],
    explanation: "**Stratigraphy**: deeper layers are normally older, so the order of layers gives a relative sequence.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of archaeology as a source for pre-colonial Zimbabwe.",
    points: [
      ["It gives evidence for societies that left no written records, such as the Early Iron Age farmers", 2],
      ["Scientific methods such as radiocarbon dating and stratigraphy give dates and sequences that do not depend on memory or the opinions of writers", 2],
    ],
    modelAnswer: "Archaeology is often the only evidence for people who did not write, so it tells us about farming, houses and trade among communities such as the builders of Great Zimbabwe. Scientific methods such as radiocarbon dating and stratigraphy also give dates and sequences that do not rely on anyone's memory or opinion, so they can test written and oral accounts.",
    explanation: "One mark for each advantage identified and one for developing it with a reason or example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** problems that historians face when they use oral tradition.",
    points: [
      ["Memory changes in retelling and events can be telescoped, so dates and sequences are unreliable", 2],
      ["Traditions may be shaped to flatter the ruling family or support claims to land or office, so they can be biased", 2],
    ],
    hints: ["One problem concerns the passing of time, the other concerns who tells the story and why."],
    modelAnswer: "First, memory changes in the retelling and events of many generations may be compressed into one, so oral traditions rarely give reliable dates. Second, traditions are often kept by ruling families or mediums who may shape them to support their claims to power or land, so the story may be biased.",
    explanation: "One mark for each problem, one for a developed reason.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how oral tradition and archaeology can be used **together** to study the Mutapa state.",
    points: [
      ["Oral tradition provides the names and story of the founders and the movement from Great Zimbabwe, which gives archaeology something to test", 2],
      ["Archaeology and written records can date the movement and show trade and settlement, checking and correcting traditions", 2],
    ],
    hints: ["What does each source supply that the other lacks?"],
    modelAnswer: "Oral tradition preserves the names of Mutota and Matope and the story of their movement north, which gives historians a question to investigate. Archaeology and Portuguese records can then date the settlements and show trade in gold and ivory, so the tradition is tested and the gaps are filled.",
    explanation: "Credit what each source offers and how they check each other.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far do you agree that written sources are more reliable than oral traditions for the history of pre-colonial Zimbabwe?",
    levels: levels(6),
    points: [
      ["Written sources are contemporary, can be dated and compared (support for the view)", 2],
      ["But they were written by outsiders with limited access, prejudice and purposes of their own, and they ignore much of the interior (challenge)", 2],
      ["Judgement: neither is more reliable in general; each should be tested against the other and against archaeology", 2],
    ],
    hints: ["Give the case for written sources first, then the case against, then decide."],
    modelAnswer: "Written sources have real advantages: they are close in time to the events, they give dates and names, and different writers can be compared. However, the writers were outsiders who saw little of the interior, did not understand local customs and often wrote to please a king or justify an attack, so they are far from neutral. Oral traditions, though affected by telescoping and bias, record the African viewpoint that writers missed. I therefore only partly agree: neither is more reliable in general, and the most secure conclusions come from checking each against the other and against archaeology.",
    explanation: "A good answer weighs both kinds of source and ends with a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from the account of a fictional Portuguese priest, written in the early seventeenth century after a journey to the Zambezi",
        "The king of this land is rich in gold and in cattle. I was told by the merchants that his people dig the gold from the hills, and that he sends a share each year to the coast. I did not see the mines myself, for the king does not permit strangers to go there."),
      "",
      source("Source B", "a tradition recorded from a fictional elder in the twentieth century, describing the founding of a chiefdom",
        "Our founder came with his people from the south in search of salt. He fought the people of the valley and built his capital on the hill. Every year the spirit medium brings the rain, and we pay our tribute of grain and cattle to the king."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the king's wealth?", points: ["He is rich in gold and cattle", "A share of gold is sent to the coast / gold was dug from hills (trade)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain one way in which Source B is more useful than Source A and one way in which it is less useful as evidence for how a pre-colonial state was organised.", points: [["More useful: it gives the African viewpoint on the founding, tribute and the role of the spirit medium that an outsider could not see", 2], ["Less useful: it was recorded long after the events and has no dates, so it may be telescoped or shaped to support the ruling family; Source A is contemporary", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far do Sources A and B, together, give a reliable picture of the state?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Agree: both show a ruler who receives tribute or gold and cattle, which supports each other", 2], ["Limits: A is by an outsider who did not see the mines and has his own interests; B is a late tradition with no dates and possible bias", 2], ["Judgement supported by archaeology or other evidence that is needed to check both", 2]], modelAnswer: "The sources support each other on an important point: both show a king who is wealthy and who receives a share of the people's produce, in gold in Source A and in grain and cattle in Source B. Because the writers are independent, this agreement makes the picture of a state with a ruler and tribute more convincing. However, neither source is fully reliable. The priest saw only what the merchants told him and admits he did not see the mines, and he had his own interests as a visitor. The elder's tradition was recorded long afterwards, has no dates and may be shaped to honour the ruling family. The picture is therefore plausible but needs checking against archaeology, such as evidence of gold working and imported goods, before we can rely on it." }),
    ],
    hints: ["For (b), look at who produced each source and when.", "For (c), note what the sources agree on, then what each leaves out."],
    explanation: "The sources are invented, one written by an outsider and one oral. A strong answer uses provenance and content, and combines them.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of archaeology in correcting the myth that Great Zimbabwe was built by foreigners.",
    levels: levels(8),
    points: [
      ["Explains the myth: Mauch (1871) and later writers suggested Phoenicians or the Queen of Sheba because they assumed Africans could not build in stone", 2],
      ["Randall-MacIver (1905) and Caton-Thompson (1929) found African objects, medieval layers and building methods that developed from simpler walls", 2],
      ["Radiocarbon dating later gave dates of about the thirteenth to fifteenth centuries, and imported goods showed trade rather than foreign settlement", 2],
      ["Judgement: archaeology was decisive, but it was supported by oral tradition and written sources and by the change in attitudes", 2],
    ],
    hints: ["Describe the myth, then the archaeological findings, then say whether archaeology alone corrected it."],
    modelAnswer: "Archaeology was the most important force in correcting the myth. When Karl Mauch visited in 1871 he assumed that Africans could not have built the great walls and suggested the Queen of Sheba or Phoenician builders, and the idea was repeated for decades because it suited settlers' claims. Excavations by David Randall-MacIver in 1905 and Gertrude Caton-Thompson in 1929 found African objects, medieval layers and building methods that grew from simpler walls, and no trace of foreign builders. Radiocarbon dating, developed from the late 1940s, later gave dates of about the thirteenth to fifteenth centuries, and imported beads and porcelain showed trade, not foreign settlement. However, archaeology did not work alone. Shona oral tradition had always linked the site to the ancestors of the Shona, and written records of the gold trade fitted the picture. The myth also lasted because of prejudice, not lack of evidence. Overall, archaeology was decisive, but its findings were strongest when combined with other sources.",
    explanation: "Credit the myth, the archaeological evidence, the other sources and a supported judgement.",
  });

  b.card("DEFINITION", "What is oral tradition?", "Knowledge of the past passed from generation to generation by word of mouth: genealogies, praise poems, songs, proverbs and stories.");
  b.card("DEFINITION", "What is the difference between a primary and a secondary source?", "A primary source comes from the time of the events or from a witness or participant; a secondary source is written later using other sources.");
  b.card("DEFINITION", "What is stratigraphy?", "The layering of deposits in the ground: lower layers are normally older, so the order of layers shows a relative sequence of events.");
  b.card("DEFINITION", "What is radiocarbon dating?", "A method that measures the decay of carbon-14 in organic material (wood, charcoal, bone) to estimate its age; developed in the late 1940s.");
  b.card("FACT", "Who excavated Great Zimbabwe in 1905 and 1929 and concluded that it was African?", "David Randall-MacIver (1905) and Gertrude Caton-Thompson (1929).");
  b.card("FACT", "Who visited Great Zimbabwe in 1871 and suggested outside builders?", "The German geologist Karl Mauch, who thought of the Queen of Sheba or Phoenicians.");
  b.card("CONCEPT", "Why must historians be careful with oral tradition?", "Memory changes, events are telescoped, there are few dates, and traditions may be shaped to support the ruling family or land claims; they should be checked against other evidence.");
  b.card("CONCEPT", "Why can silence in a written source not be taken as proof?", "Writers recorded only what they saw or cared about, so many African states and events are missing from documents.");
  b.card("CONCEPT", "What does triangulation mean in history?", "Looking for agreement between independent kinds of evidence (written, oral, archaeological) to make a conclusion more secure.");
});
