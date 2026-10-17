// W1b: ahist.risings.causes (ZIMSEC topic 7).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.risings.causes", { file: "risings/causes", keyPrefix: "risings.causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which month of 1896 did the Ndebele rising (Umvukela) begin?",
    options: [
      ["March", "Correct: the Ndebele rose in March 1896."],
      ["June, when the Shona rose in the north of the country", "June was when the Shona rising began."],
      ["October, at the time of the talks at the Matopos", "This was the time of the indabas."],
      ["December", "December 1895 was the month of the Jameson Raid."],
    ],
    answer: "A",
    explanation: "The Umvukela began in March 1896; the Shona rose in June.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Company's response to rinderpest increase African anger?",
    options: [
      ["It shot cattle, including healthy herds, to stop the disease spreading", "Correct: this was seen as another seizure of cattle."],
      ["It sold the cattle of Africans to the settlers at low prices", "It destroyed cattle rather than selling them."],
      ["It refused to allow any Africans to keep cattle in the reserves", "It did not forbid cattle in the reserves."],
      ["It brought a vaccine which killed many cattle in Mashonaland", "No such vaccine caused the losses."],
    ],
    answer: "A",
    explanation: "Shooting cattle to make a barrier against rinderpest seemed to Africans a further theft of their wealth, and the disease itself killed many herds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which body of men was widely resented for cruelty and for taking cattle?",
    options: [
      ["The Native Police", "Correct: they were backed by the Company's authority."],
      ["The Pioneer Column, which had been disbanded in 1890", "The column was disbanded."],
      ["Christian missionaries at Inyati and Hope Fountain", "Missionaries were not the object of this complaint."],
      ["The chiefs of the Shona, who had been appointed by the Ndebele", "The chiefs were not the enforcing police."],
    ],
    answer: "A",
    explanation: "The Native Police, recruited by the Company, were accused of cruelty, theft and abuse, and the people had little means of complaint.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did the Jameson Raid (December 1895 - January 1896) help to make the rising possible?",
    options: [
      ["It took many Company police out of the country", "Correct: the Company was weak when the Ndebele rose."],
      ["It destroyed the Mwari shrines in the Matopos", "The shrines remained."],
      ["It gave the Company control of Mashonaland for the first time", "The Company already held Mashonaland."],
      ["It persuaded Lobengula's sons to lead the rising", "No such event took place."],
    ],
    answer: "A",
    hints: ["Think of who normally kept order."],
    explanation: "Jameson took most of the Company's armed police on the raid into the Transvaal, which gave the Ndebele an opportunity.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which religious leaders are associated with the Shona rising in Mashonaland?",
    options: [
      ["Kaguvi and Nehanda", "Correct: mediums of Chaminuka and Nehanda."],
      ["Mzilikazi and Lobengula, the kings of the Ndebele", "These were kings, not mediums."],
      ["Cecil Rhodes and Leander Starr Jameson", "These were Company leaders."],
      ["Robert Moffat and John Smith Moffat, the missionaries who knew the Ndebele well", "These were missionaries."],
    ],
    answer: "A",
    hints: ["Think of the spirit mediums."],
    explanation: "Kaguvi, linked with Chaminuka, and Nehanda (Nyakasikana) of Mazowe were the main mediums in Mashonaland.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a short-term cause of the rising, rather than a long-term grievance?",
    options: [
      ["The rinderpest epidemic and the shooting of cattle in 1896", "Correct: it came in 1896."],
      ["The loss of Ndebele independence after the war of 1893-94 and the death of their king", "This was a long-term grievance."],
      ["The seizure of land for settler farms from 1894", "This was a long-term grievance."],
      ["The use of forced labour on mines and farms", "This was a long-term grievance."],
    ],
    answer: "A",
    hints: ["Which event took place just before the rising?"],
    explanation: "Rinderpest and the drought and locusts of 1895-96 were immediate triggers that made existing grievances unbearable.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best describes the debate on whether the risings were coordinated?",
    options: [
      ["Some historians see a linked movement led by religious leaders, others stress local causes and separate decisions", "Correct: this reflects the Ranger and Cobbing debate."],
      ["All historians agree that a single plan was made by Mkwati and carried out by every group in Matabeleland and Mashonaland", "Historians do not agree on this."],
      ["All historians agree that the risings were unconnected", "Many see some links."],
      ["Historians have never studied the question", "It is a long-standing debate."],
    ],
    answer: "A",
    hints: ["Think of the different views of Ranger and Cobbing."],
    explanation: "Ranger argued for linked, religiously led resistance; Cobbing questioned the evidence. Many now accept a middle view.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that the risings had common causes in Company rule?",
    options: [
      ["Both Ndebele and Shona complained of lost land, forced labour and the Native Police", "Correct: the same grievances appear in both regions."],
      ["Both risings began on exactly the same day in March 1896", "They began in March and June."],
      ["Both peoples had the same king before 1890", "They had different rulers."],
      ["Both peoples had fought together against the Pioneer Column in 1890", "They did not do so."],
    ],
    answer: "A",
    hints: ["Which evidence shows what the two groups complained of?"],
    explanation: "Shared grievances under Company rule explain why the risings came close together, even though there were differences between them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Shona rising began in Mashonaland in June 1896.",
    answer: true,
    explanation: "True. The Ndebele rose in March and the Shona in June.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The hut tax encouraged Africans to work for settlers in order to earn money to pay it.",
    answer: true,
    explanation: "True. The tax was a way of raising revenue and recruiting labour.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Religion was the only cause of the risings; land, cattle and labour did not matter.",
    answer: false,
    hints: ["Religion gave leadership; what drove people to follow?"],
    explanation: "False. Religion gave leadership and unity, but the grievances over land, cattle, labour, taxes and independence were the basic causes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Umvukela", "The Ndebele word for the rising of 1896"],
      ["Chimurenga", "A Shona word for a struggle or war of resistance"],
      ["Rinderpest", "A cattle disease that killed large numbers of herds"],
      ["Native Police", "African police recruited by the Company"],
    ],
    explanation: "These four terms are needed for answers on the risings.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each religious leader with the region or shrine.",
    pairs: [
      ["Kaguvi", "Medium linked with Chaminuka in Mashonaland"],
      ["Nehanda", "Medium of the Mazowe region"],
      ["Mkwati", "Mwari priest who later helped spread the rising to Mashonaland"],
      ["The Mwari cult", "Centred on the shrines in the Matopo Hills"],
    ],
    hints: ["Two belong to Mashonaland and two to the Matopos."],
    explanation: "Kaguvi and Nehanda were mediums in Mashonaland; Mkwati and the Mwari cult belonged to the Matopos and Matabeleland.",
  });
  {
    const events = [
      "The Anglo-Ndebele War ends in the fall of Bulawayo",
      "The Jameson Raid",
      "The Umvukela begins in Matabeleland",
      "The Shona rise in Mashonaland",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates run from 1893 to June 1896."],
      explanation: "1893-94; December 1895 - January 1896; March 1896; June 1896.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Raid of 1895-96 took many Company police out of the country, and the Ndebele rose in the month of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Jameson"], choices: ["Jameson", "Pioneer", "Shangani", "Rudd"] },
      { id: "b", accepted: ["March"], choices: ["March", "June", "September", "December"] },
    ],
    explanation: "The Jameson Raid left the Company weak; the Ndebele rose in March 1896.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which cattle disease spread through southern Africa in the 1890s and killed large numbers of herds?",
    accepted: ["rinderpest", "the rinderpest", "cattle plague"],
    wrong: ["smallpox"],
    explanation: "**Rinderpest**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the grievances of the Ndebele and Shona against Company rule before 1896.",
    points: ["Loss of land to settlers and removal into reserves", "Loss of cattle through seizure and fines", "Forced labour and harsh conditions of work", "Taxes and the conduct of the Native Police"],
    modelAnswer: "Africans lost land to settler farms and were moved into reserves. They lost cattle through seizure and fines. They were forced to work for the settlers in harsh conditions, and they had to pay taxes and suffered from the conduct of the Native Police.",
    explanation: "One mark for each grievance described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the disasters of 1895-96 helped to bring about the rising.",
    points: [["Drought, locusts and rinderpest destroyed crops and cattle, so food and wealth were lost", 2], ["The Company shot cattle, and religious leaders said the settlers had caused the disasters, so the anger turned to resistance", 2]],
    hints: ["Think of what people lost and who they blamed."],
    modelAnswer: "Drought, locusts and rinderpest destroyed crops and cattle, so people lost food and wealth. The Company shot cattle to stop the disease, and religious leaders said that the settlers had caused the disasters. Anger therefore turned into resistance.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain the part played by religious leaders in the risings.",
    points: [["They linked the grievances with ancestral authority and said the whites had caused the disasters", 2], ["They called chiefs and followers to resist and gave confidence that the whites could be driven out; Mkwati helped to spread the rising", 2]],
    hints: ["Think of what religious leaders said and did."],
    modelAnswer: "Religious leaders linked the people's grievances to the authority of the ancestors and said that the whites had caused the disasters. They called chiefs and followers to resist and gave confidence that the whites could be driven out, and Mkwati helped to spread the rising to Mashonaland.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an official report by a fictional Native Commissioner to the Company, 1895",
        "The people are quiet, but they complain of the labour demanded and of the tax. The police sent to collect have not always acted with restraint. Cattle are dying in many districts, and the people say that the whites have brought the sickness."),
      "",
      source("Source B", "a recollection told by a fictional Shona elder in the 1950s",
        "In those days the chiefs were no longer chiefs. The white men took our land and our cattle, and our young men were taken to work. When the rains failed and the cattle died, the mediums told us that the ancestors were angry and that the strangers must leave."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the causes of unrest?", points: ["Labour demands and the tax", "The conduct of the police / the death of cattle blamed on the whites"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the causes of the rising.", points: [["Agree: both mention forced labour, cattle deaths and blaming the whites", 2], ["Differ: B adds loss of chiefs' status and the role of mediums, while A is more cautious and describes the people as quiet", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources as evidence of the causes of the 1896 rising?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and from an official, who would know conditions, but he may play down the discontent to avoid blame", 2], ["B gives an African view of causes, including religion, but was told decades later and may have been shaped by later events", 2], ["Own knowledge: land, labour, tax, rinderpest and religion are all supported by other evidence", 2]], modelAnswer: "Source A is useful because it was written in 1895 by an official who knew conditions, and its mention of labour, the tax, the police and cattle deaths fits other evidence. But the writer may have wished to play down the unrest to avoid blame. Source B gives the African view, including the role of mediums and the loss of chiefs' status, but it was told decades later and may have been shaped by later events. My own knowledge supports both, since land, labour, taxes, rinderpest and religion are all recorded in other evidence. Together the sources give a fuller picture than either alone." }),
    ],
    hints: ["For (c), consider who wrote each source and when."],
    explanation: "Both sources are invented: an official report and an elder's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent was Company rule the main cause of the 1896-97 risings?",
    levels: levels(8),
    points: [
      ["Company policies: land alienation, cattle seizure, forced labour, taxes, the Native Police, loss of independence", 2],
      ["Other factors: rinderpest, drought and locusts, which were natural events, and the Jameson Raid as opportunity", 2],
      ["The part of religious leaders in organising and giving purpose", 2],
      ["Judgement on which was the main cause and how they were linked", 2],
    ],
    hints: ["Weigh Company policies against disasters and leadership."],
    modelAnswer: "Company rule was the main cause of the risings. The Company took land and cattle, forced Africans to work, imposed taxes, used the Native Police and ended Ndebele independence, so grievances were deep and widespread. Other factors mattered: drought, locusts and rinderpest in 1895-96 made life unbearable, and the Jameson Raid took away many police. Religious leaders such as Mkwati, Kaguvi and Nehanda gave organisation and purpose. But the disasters were natural, and religious leaders could only act because the grievances existed. I conclude that Company rule was the main cause, with the disasters and the Raid as the triggers and opportunity.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What does Umvukela mean?", "An Ndebele word for \"the rising\"; the Ndebele rebellion of 1896.");
  b.card("DEFINITION", "What is rinderpest?", "A deadly cattle disease that reached the country in 1896 and killed large numbers of herds.");
  b.card("FACT", "When did the Ndebele rising begin, and when did the Shona rise?", "Ndebele in March 1896; Shona in June 1896.");
  b.card("FACT", "What effect did the Jameson Raid have on the risings?", "It took many Company police out of the country and gave an opportunity.");
  b.card("FACT", "Who were the main religious leaders in Mashonaland?", "Kaguvi and Nehanda (Nyakasikana).");
  b.card("FACT", "Which priest of the Mwari cult helped to spread the rising to Mashonaland?", "Mkwati.");
  b.card("CONCEPT", "Name five causes of the 1896 risings.", "Loss of land, loss of cattle, forced labour, taxes and the Native Police, plus loss of independence and the disasters of 1895-96.");
  b.card("CONCEPT", "What did the Native Police do to cause resentment?", "They collected taxes and enforced labour, and were accused of cruelty and cattle theft.");
  b.card("CONCEPT", "How did historians disagree about coordination?", "Ranger saw linked religious leadership; Cobbing stressed local causes; many now accept some links but separate risings.");
});
