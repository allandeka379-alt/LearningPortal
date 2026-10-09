// W1a: hist.colonisation.occupation (ZIMSEC 7.2).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonisation.occupation", { file: "colonisation/occupation", keyPrefix: "colonisation.occupation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Rudd Concession signed?",
    options: [
      ["30 October 1888", "Correct."],
      ["29 October 1889", "That is the date of the Royal Charter."],
      ["12 September 1890", "That is the date the flag was raised at Fort Salisbury."],
      ["11 February 1888", "February 1888 is the month of the Moffat Treaty."],
    ],
    answer: "A",
    explanation: "Rudd Concession: 30 October 1888. Royal Charter: 29 October 1889. Fort Salisbury: 12 September 1890.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who were Rhodes's three agents who obtained the Rudd Concession?",
    options: [
      ["Rudd, Maguire and Thompson", "Correct: Charles Rudd, Rochfort Maguire and Francis Thompson."],
      ["Moffat, Helm and Selous", "Moffat negotiated an earlier treaty, Helm interpreted, Selous was a hunter."],
      ["Johnson, Pennefather and Selous", "These men organised, commanded and guided the Pioneer Column in 1890."],
      ["Grobler, Lippert and Mauch", "Grobler was a Transvaal agent, Lippert sought a land concession, Mauch was a geologist."],
    ],
    answer: "A",
    explanation: "Charles Rudd, Rochfort Maguire and Francis 'Matabele' Thompson obtained the concession for Rhodes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Lobengula promise in the **Moffat Treaty**?",
    options: [
      ["Not to deal with other powers without British approval", "Correct: it placed his kingdom in the British sphere of influence."],
      ["To give all the minerals in his kingdom to Rhodes", "That was the Rudd Concession, later the same year."],
      ["To allow the Pioneer Column to pass through Matabeleland", "The column avoided Matabeleland in 1890."],
      ["To pay a yearly tribute of cattle to the Transvaal", "There was no such promise."],
    ],
    answer: "A",
    explanation: "Under the Moffat Treaty (February 1888) Lobengula promised not to make treaties with other foreign powers or give away land without the British High Commissioner's approval.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these did the **written** Rudd Concession promise Lobengula?",
    options: [
      ["1,000 rifles, ammunition and £100 a month", "Correct: plus a steamboat on the Zambezi or £500."],
      ["That no more than ten white men would come to dig", "This was a verbal promise, not in the written document."],
      ["That the Company would never occupy Mashonaland", "There was no such promise in the document."],
      ["That the miners would obey Ndebele law", "This was a verbal promise left out of the written text."],
    ],
    answer: "A",
    explanation: "The written terms: £100 a month, 1,000 Martini-Henry rifles, 100,000 rounds of ammunition, and a steamboat or £500. The verbal promises were not written down.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Company send the Pioneer Column into **Mashonaland** rather than Matabeleland?",
    options: [
      ["To avoid a direct clash with the Ndebele regiments", "Correct: the route went east of Matabeleland, and the hope of gold also pointed to Mashonaland."],
      ["Because Lobengula had sold Mashonaland to the Company in the Moffat Treaty", "The Moffat Treaty did not sell any land."],
      ["Because the Portuguese had already occupied Matabeleland", "Portugal never occupied Matabeleland."],
      ["Because Mashonaland had no African inhabitants", "Mashonaland was home to many Shona communities."],
    ],
    answer: "A",
    hints: ["Where were the Ndebele regiments based?"],
    explanation: "Avoiding the Ndebele heartland reduced the risk of war, and the Company hoped Mashonaland held rich goldfields.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the British government grant a Royal Charter to Rhodes's company instead of ruling the territory itself?",
    options: [
      ["The Company would pay for occupation, not British taxpayers", "Correct: the Charter gave Britain empire 'on the cheap'."],
      ["Lobengula asked Queen Victoria to give his kingdom to Rhodes", "Lobengula protested against the concession."],
      ["The Berlin Conference ordered Britain to use companies", "The conference set no such rule."],
      ["Britain wanted to hand the territory to Portugal later", "Britain forced Portugal to give up its claims in 1890."],
    ],
    answer: "A",
    hints: ["Who would pay for police, forts and government?"],
    explanation: "Chartered company rule let Britain block its rivals without paying for occupation and government.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which point **best** supports the view that Lobengula was deceived over the Rudd Concession?",
    options: [
      ["Verbal promises were left out of the written text", "Correct: the king agreed on terms that the written document did not contain."],
      ["Lobengula received rifles and ammunition under the concession", "This was part of the agreed payment, not evidence of deception."],
      ["Lobengula later granted a land concession to Lippert", "This was a later decision, not evidence about the Rudd Concession."],
      ["The concession was signed at the king's own capital", "Where it was signed does not show deception."],
    ],
    answer: "A",
    hints: ["What did Lobengula think he had agreed to, and what did the document say?"],
    explanation: "The gap between the verbal promises (reported by Helm) and the written text is the main evidence of deception.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about Lobengula's response to the Rudd Concession is **best** supported?",
    options: [
      ["He resisted by diplomacy but avoided open war", "Correct: envoys to London, a public notice and playing rivals off, while holding back his regiments."],
      ["He welcomed the concession and invited more settlers", "He protested and tried to undo it."],
      ["He attacked the Pioneer Column as soon as it crossed into his lands", "The column was not attacked."],
      ["He handed the whole kingdom to Portugal to spite Britain", "He made no such agreement."],
    ],
    answer: "A",
    hints: ["Think about what he did in 1889 and what he did NOT do in 1890."],
    explanation: "Lobengula sent Babayane and Mshete to London, issued a notice suspending the concession and played concession seekers off, while avoiding a war he knew he could not win.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Pioneer Column raised the British flag at Fort Salisbury on 12 September 1890.",
    answer: true,
    explanation: "True. The site later became Salisbury and is now Harare.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The written Rudd Concession gave Rhodes's agents the right to all the land in Lobengula's kingdom.",
    answer: false,
    explanation: "False. It gave rights to metals and minerals, not land. Land rights were later claimed through the Lippert Concession and conquest.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in the colonisation of Zimbabwe.",
    pairs: [
      ["Pieter Grobler", "Transvaal agent who obtained a treaty in 1887"],
      ["John Smith Moffat", "Negotiated the treaty that placed the kingdom in the British sphere"],
      ["Charles Helm", "Missionary who interpreted the Rudd Concession"],
      ["Frank Johnson", "Contractor who organised the Pioneer Column"],
    ],
    explanation: "Grobler (Transvaal treaty), Moffat (British sphere), Helm (interpreter), Johnson (organiser of the column, guided by Selous and commanded by Pennefather).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each power with its interest in the land north of the Limpopo.",
    pairs: [
      ["Britain", "Rhodes's Cape-to-Cairo route and the hope of a 'second Rand'"],
      ["Transvaal", "Land for Boer expansion to the north"],
      ["Portugal", "Linking Mozambique with Angola"],
      ["Germany", "A possible link between its colonies across Africa"],
    ],
    hints: ["Each power had a different reason to want the territory."],
    explanation: "Four powers competed; Britain's Moffat Treaty and Rudd Concession shut the others out.",
  });
  {
    const t = timeline([
      ["1887", "Grobler Treaty"],
      ["February 1888", "Moffat Treaty"],
      ["October 1888", "Rudd Concession"],
      ["October 1889", "Royal Charter granted to the British South Africa Company"],
    ]);
    const order = [2, 3, 1, 0];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The Transvaal moved first and alarmed the British.", "The Charter was won using the concession."],
      explanation: "Grobler (1887), Moffat (February 1888), Rudd (30 October 1888), Royal Charter (29 October 1889).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Pioneer Column was guided by the hunter {{blank:a}}, and each pioneer was promised a farm of about {{blank:b}} acres.",
    blanks: [
      { id: "a", accepted: ["Selous"], choices: ["Selous", "Helm", "Lippert", "Rudd"] },
      { id: "b", accepted: ["3,000"], choices: ["300", "3,000", "30,000", "100"] },
    ],
    explanation: "Frederick Selous guided the column; each pioneer was promised a farm of about 3,000 acres and 15 gold claims.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name **one** of the two izinduna whom Lobengula sent to London in 1889 to protest to Queen Victoria.",
    accepted: ["Babayane", "Mshete", "Babayana", "Umshete", "Mtshete"],
    wrong: ["Lotshe", "Gundwane"],
    explanation: "**Babayane** and **Mshete** went to London with a message from Lobengula. Lotshe, who had advised signing, was put to death in 1889.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 5,
    stem: "State **five** reasons why Zimbabwe was colonised.",
    points: [
      "The 'second Rand' gold myth",
      "Rhodes's Cape-to-Cairo ambition",
      "Land for white settlers",
      "Strategic rivalry: to block the Transvaal, Portugal and Germany",
      "Missionary pressure / labour and markets",
    ],
    modelAnswer: "Zimbabwe was colonised because of the belief in a 'second Rand' of gold north of the Limpopo, Rhodes's ambition of British territory from the Cape to Cairo, the wish for land for white settlers, rivalry with the Transvaal, Portugal and Germany, and pressure from missionaries who wanted British protection.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the powers given to the British South Africa Company by the Royal Charter.",
    points: [
      "To make treaties and laws and keep order",
      "To maintain its own police force",
      "To grant land and mining rights / trade",
      "To build roads, railways and other works / govern the territory north of Bechuanaland and the Transvaal",
    ],
    hints: ["Think of government, security and economic powers."],
    modelAnswer: "The Charter allowed the Company to make treaties and laws and keep order, to maintain its own police force, to grant land and mining rights and trade, and to build roads and railways and govern the territory north of Bechuanaland and the Transvaal.",
    explanation: "One mark per power.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how Lobengula tried to resist colonisation in the two years after the Rudd Concession.",
    points: [
      ["Diplomacy: he sent Babayane and Mshete to London to protest to Queen Victoria", 2],
      ["He issued a public notice suspending the concession, and put to death Lotshe, who had advised signing", 2],
      ["He played rival concession seekers against each other and held back his regiments to avoid a war he could not win", 2],
    ],
    hints: ["Lobengula used words and politics rather than war."],
    modelAnswer: "Lobengula resisted mainly by diplomacy. In 1889 he sent the izinduna Babayane and Mshete to London to protest to Queen Victoria. He published a notice saying the Rudd Concession was suspended, and he had Lotshe, who had advised him to sign, put to death. He tried to play rival concession seekers against each other, and he held back his young warriors from attacking the Pioneer Column because he knew the Company's guns would destroy his army and bring British troops.",
    explanation: "Each method is explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a diary entry by a fictional member of the Pioneer Column, written on the march, 1890",
          "Today we passed another empty kraal; the people had fled at the sound of our wagons. The Colonel will not let us leave the road. We are told the king's warriors are watching but will not strike, for the king has given his word."),
        source("Source B", "an account recorded in the 1930s from a fictional Shona elder in Mashonaland",
          "When the white men came with their wagons, our fathers thought they were traders who would pass on. Only later, when they marked out farms and demanded workers, did we understand they had come to stay."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "What does Source A tell us about the Pioneer Column's march?", points: ["Africans fled from villages as the column approached", "The column kept strictly to its road (discipline)", "The Ndebele watched but did not attack, because of the king's word"] }),
      P.manual({ label: "(b)", marks: 3, stem: "What can be inferred from Source B about Shona attitudes to the occupation at first?", points: ["The Shona did not at first see the column as a threat / thought they were traders", "They did not expect permanent settlement", "Their attitude changed when land was taken and labour demanded"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of African reactions to the occupation of 1890?", type: "EXTENDED_RESPONSE", points: [["A: an eyewitness at the time, but a pioneer who saw Africans only from the outside and relied on what he was told about the king", 2], ["B: preserves the Shona view, but recorded about forty years later, so memory may have changed details", 2], ["Judgement with own knowledge (Lobengula held back his regiments; the column was not attacked; land and labour demands followed)", 2]], levels: levels(6), modelAnswer: "Source A was written at the time by someone on the march, so it is reliable about what he saw, such as empty villages, but he saw Africans only from the outside and his claim about the king's word is second-hand. Source B gives an African view, which is rare in the written record, but it was recorded about forty years later, when memories may have been shaped by later experience of land loss. Own knowledge supports both: Lobengula did hold back his regiments, the column was not attacked, and land seizures and labour demands came soon after 1890. Together they are fairly reliable, each covering what the other cannot." }),
    ],
    hints: ["Which source is closer in time, and which is closer to African experience?"],
    explanation: "One source is close in time but an outsider's view; the other is an insider's view recorded later. Own knowledge confirms the main points of both.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the colonisation of Zimbabwe.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the terms of the written Rudd Concession.", points: ["Sole right to all metals and minerals in Lobengula's kingdom", "Power to do all things necessary to win the minerals and to exclude others", "In return: £100 a month", "1,000 Martini-Henry rifles, 100,000 rounds of ammunition, and a steamboat on the Zambezi or £500"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why the Rudd Concession was important to Cecil Rhodes.", points: [["It gave him a legal claim to the minerals, shutting out rival concession seekers", 2], ["He used it to win the Royal Charter (1889), which allowed the Company to occupy and govern the territory", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Lobengula lost his kingdom because he was deceived.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: verbal promises left out; interpreted by Helm; Lobengula could not read the English text; Rhodes used it to win the Charter", 2], ["Against: overwhelming pressure from Britain and rivals; the Moffat Treaty; Company military power; the war of 1893 was the real cause of loss", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Deception played a big part. Lobengula was given verbal promises that only ten white men would dig and that they would obey his laws, but these were not in the written concession, which he could not read and which Helm interpreted. Rhodes then used the document to win the Royal Charter. However, Lobengula was also under huge pressure: four powers wanted his land, the Moffat Treaty had already tied him to Britain, and the Company had machine guns he could not match. In the end his kingdom was taken by force in 1893. Deception gave Rhodes the legal excuse, but military power and imperial rivalry explain why Lobengula lost his kingdom, so I only partly agree." }),
    ],
    hints: ["In (c), separate how Rhodes got a legal claim from how the kingdom was actually taken."],
    explanation: "A strong answer weighs deception against pressure and military power, and reaches a judgement.",
  });

  b.card("FACT", "When was the Grobler Treaty?", "1887 (July), between Lobengula and the South African Republic (Transvaal).");
  b.card("FACT", "What did the Moffat Treaty (February 1888) do?", "Lobengula promised not to deal with other powers or give away land without British approval: the British sphere of influence.");
  b.card("FACT", "When was the Rudd Concession signed, and by whose agents?", "30 October 1888; Rudd, Maguire and Thompson, for Rhodes.");
  b.card("FACT", "What did the written Rudd Concession promise Lobengula?", "£100 a month, 1,000 rifles, 100,000 rounds, and a steamboat on the Zambezi or £500.");
  b.card("CONCEPT", "What verbal promises were left out of the Rudd Concession?", "That no more than ten white men would come to dig and that they would obey his laws.");
  b.card("FACT", "When was the Royal Charter granted to the BSAC?", "29 October 1889.");
  b.card("FACT", "When did the Pioneer Column raise the flag at Fort Salisbury?", "12 September 1890.");
  b.card("CONCEPT", "How did Lobengula respond to the Rudd Concession?", "Sent Babayane and Mshete to London, published a notice suspending it, executed Lotshe, played rivals off, avoided war.");
  b.card("FACT", "Who organised, guided and commanded the Pioneer Column?", "Frank Johnson (organiser), Frederick Selous (guide), Edward Pennefather (commander).");
  b.card("CONCEPT", "Why did Britain use a chartered company?", "Empire on the cheap: the Company, not British taxpayers, paid for occupation and government.");
});
