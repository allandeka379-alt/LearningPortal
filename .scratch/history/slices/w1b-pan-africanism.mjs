// Slice W1b: Pan-Africanism and the rise of mass nationalism in Africa (ZIMSEC topic 9).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.nationalism.pan-africanism", { file: "nationalism/pan-africanism", keyPrefix: "nationalism.pan-africanism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which leader founded the Universal Negro Improvement Association (UNIA) in 1914?",
    options: [
      ["Marcus Garvey", "Correct: the Jamaican leader of a mass movement."],
      ["W. E. B. Du Bois", "Du Bois organised the Pan-African Congresses."],
      ["Kwame Nkrumah", "Nkrumah led Ghana to independence in 1957."],
      ["George Padmore", "Padmore helped organise the 1945 Manchester Congress."],
    ],
    answer: "A",
    explanation: "**Marcus Garvey** founded the UNIA in 1914 and preached \"Africa for the Africans\".",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which city was the fifth Pan-African Congress held in 1945?",
    options: [
      ["Manchester", "Correct: October 1945."],
      ["Paris", "Paris hosted the first Congress in 1919."],
      ["Accra", "Accra hosted Pan-African meetings in 1958."],
      ["Addis Ababa", "The OAU was founded in Addis Ababa in 1963."],
    ],
    answer: "A",
    explanation: "The **Manchester** Congress of 1945 demanded independence for Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best defines Pan-Africanism?",
    options: [
      ["Unity of people of African descent to end racism and colonial rule", "Correct: it links Africans in Africa and the diaspora."],
      ["The demand of one colony for its own independence only", "That describes nationalism in a single country."],
      ["A plan to divide Africa between the European powers", "That describes the Scramble for Africa."],
      ["The policy of separate development in white-ruled states", "That describes segregation or apartheid."],
    ],
    answer: "A",
    explanation: "Pan-Africanism is about the shared destiny and unity of all people of African descent and the freedom of Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did the 1945 Manchester Congress differ from earlier Pan-African Congresses?",
    options: [
      ["It demanded independence and was led by Africans", "Correct: earlier congresses sought reforms and were led from the diaspora."],
      ["It was the first congress Du Bois ever attended", "Du Bois had led the earlier congresses."],
      ["It asked colonial powers to stay for another fifty years", "It demanded independence."],
      ["It was held in Africa for the first time in its history", "It was held in England."],
    ],
    answer: "A",
    explanation: "Manchester demanded independence, called for mass action, and was dominated by Africans from the continent such as Nkrumah and Kenyatta.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the Atlantic Charter (1941) encourage African nationalists?",
    options: [
      ["It spoke of peoples' right to choose their government", "Correct: nationalists applied this to Africa."],
      ["It promised independence to every African colony by 1950", "No such promise was made."],
      ["It was signed by African leaders in London", "It was agreed by Roosevelt and Churchill."],
      ["It ended the Second World War in Europe", "The war in Europe ended in May 1945."],
    ],
    answer: "A",
    explanation: "The Charter's words on self-determination, and later the UN Charter, gave nationalists an argument that colonial powers found hard to answer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Ghana's independence in 1957 encourage nationalists in other colonies?",
    options: [
      ["It proved a mass party could win independence", "Correct: Ghana became an example and a supporter."],
      ["It ended colonial rule everywhere in Africa", "Many colonies remained until the 1960s and later."],
      ["It made Britain give up all its colonies within a year", "Decolonisation took many years."],
      ["It led to the immediate end of the Federation", "The Federation lasted until 1963."],
    ],
    answer: "A",
    hints: ["Think about example and support."],
    explanation: "Nkrumah's Convention People's Party showed what mass nationalism could achieve, and Ghana then supported other movements, for example through the Accra conferences of 1958.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change after 1945 most clearly weakened the colonial powers' ability to hold their empires?",
    options: [
      ["War debts and US and Soviet criticism of empire", "Correct: Britain and France were weaker and under pressure."],
      ["The return of the gold standard in Europe", "This was not a post-1945 cause of decolonisation."],
      ["The discovery of large new oil fields in Britain and France", "No such discovery happened in the 1940s; North Sea oil came much later."],
      ["A rapid fall in the number of educated Africans", "The number of educated Africans grew."],
    ],
    answer: "A",
    hints: ["Think about the economic and international position of Britain and France."],
    explanation: "The war left Britain and France in debt, while the USA and USSR, the new superpowers, both opposed colonial empires.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best compares the methods of Du Bois and Garvey?",
    options: [
      ["Du Bois used congresses; Garvey built a mass movement", "Correct: different methods, shared goals."],
      ["Both men refused to have anything to do with Africa", "Both were deeply concerned with Africa."],
      ["Garvey organised the 1945 Congress; Du Bois led the UNIA", "This reverses their roles."],
      ["Both men led armed struggles against colonial rule", "Neither led an armed struggle."],
    ],
    answer: "A",
    hints: ["Think about how each man tried to reach people."],
    explanation: "Du Bois worked through congresses, research and writing; Garvey built the UNIA, a mass organisation with businesses and a newspaper, appealing to ordinary people.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ghana became independent on 6 March 1957 under Kwame Nkrumah.",
    answer: true,
    explanation: "True. Ghana (formerly the Gold Coast) became an example for nationalists across Africa.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mass nationalism means nationalism led and supported only by a small group of educated Africans.",
    answer: false,
    explanation: "False. Mass nationalism drew in large numbers of ordinary people (workers, peasants, women and youth) through mass parties; earlier protest had been led by small elites.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their contribution.",
    pairs: [
      ["W. E. B. Du Bois", "Organised the Pan-African Congresses from 1919"],
      ["Marcus Garvey", "Founded the UNIA and the Black Star Line"],
      ["Kwame Nkrumah", "Led Ghana to independence in 1957"],
      ["Henry Sylvester Williams", "Organised the 1900 Pan-African Conference in London"],
    ],
    explanation: "Williams (1900), Du Bois (congresses), Garvey (UNIA) and Nkrumah (Ghana) were key figures in Pan-Africanism.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Manchester Pan-African Congress",
      "Garvey founds the UNIA",
      "Ghana becomes independent",
      "The first Pan-African Congress in Paris",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The UNIA was founded during the First World War."],
    explanation: "UNIA 1914; Paris Congress 1919; Manchester 1945; Ghana 1957.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Garvey's slogan was \"Africa for the {{blank:a}}\". India's independence in {{blank:b}} showed that empires could be forced to leave.",
    blanks: [
      { id: "a", accepted: ["Africans"], choices: ["Africans", "Europeans", "Workers", "Colonies"] },
      { id: "b", accepted: ["1947"], choices: ["1947", "1957", "1935", "1963"] },
    ],
    explanation: "\"Africa for the Africans\" was Garvey's slogan. India became independent in 1947; Ghana in 1957; Italy invaded Ethiopia in 1935; the OAU was founded in 1963.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which African country, one of only two independent states in Africa at the time, was invaded by Italy in 1935, angering Pan-Africanists everywhere?",
    accepted: ["Ethiopia", "Abyssinia"],
    wrong: ["Liberia"],
    explanation: "**Ethiopia** (then often called Abyssinia) was invaded by Mussolini's Italy in 1935.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe **four** reasons for the rise of Pan-Africanism.",
    points: [
      "Slavery and its legacy for people of African descent.",
      "Racism and segregation / theories of African inferiority.",
      "Colonialism and the partition of Africa.",
      "Education abroad / events such as the Italian invasion of Ethiopia (1935).",
    ],
    modelAnswer: "The legacy of the slave trade left people of African descent facing racism and segregation; theories of African inferiority were used to justify this; the partition of Africa brought colonial rule; and Africans educated abroad met each other and organised, while events such as Italy's invasion of Ethiopia united them.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the role of Marcus Garvey in the Pan-African movement.",
    points: [
      "Founded the UNIA (1914), which became a mass organisation.",
      "Spread Black pride and self-respect.",
      "Slogan \"Africa for the Africans\" encouraged demands for African self-rule.",
      "Back to Africa movement / Black Star Line promoted economic self-help.",
      "Newspaper Negro World spread his ideas, including in colonial Africa.",
      "Inspired later African nationalists despite the failure of his businesses.",
    ],
    hints: ["Say what he did and why it mattered."],
    modelAnswer: "Garvey founded the UNIA in 1914 and built it into a mass organisation, reaching ordinary people rather than a small elite. He preached pride in being Black and in Africa, and his slogan \"Africa for the Africans\" encouraged demands for African self-rule. His Back to Africa movement and the Black Star Line promoted economic self-help. His newspaper Negro World carried these ideas into colonial Africa, where it was often banned. Although his businesses failed and he was deported from the USA, he inspired later nationalists.",
    explanation: "One mark per developed point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Second World War encouraged mass nationalism in Africa.",
    points: [
      "Identifies African soldiers' experience abroad.",
      "Explains: they saw Europeans defeated and returned expecting rights, and were disappointed.",
      "Identifies the weakening of Britain and France / Allied ideas of freedom (Atlantic Charter).",
      "Explains: colonial powers could not easily resist demands, and nationalists used the language of freedom against them.",
    ],
    hints: ["Consider soldiers and the colonial powers."],
    modelAnswer: "Many Africans served in the Allied armies; they saw that Europeans could be defeated and returned expecting rewards and rights, but found the same colour bars, so many supported nationalist parties. The war also weakened Britain and France, which ended it in debt, while the Allies' talk of freedom in the Atlantic Charter gave nationalists an argument against colonial rule.",
    explanation: "Two marks per way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a letter from a fictional African ex-serviceman to a newspaper in the Gold Coast, 1947", "I carried a rifle in Burma for the King. I saw white men afraid and white men die, as other men do. Now I am home and I may not enter the hotel where my officer drinks. We were told we fought for freedom. Whose freedom?"),
      source("Source B", "a report by a fictional colonial district officer, 1948", "The returned soldiers are restless and talk much politics. Most of the population remains loyal and content. The agitation is the work of a few clerks and teachers in the towns who have read too much and gained too little."),
    ])}`,
    hints: ["Think about why each writer wrote and what each could know."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the effect of the war on African soldiers?", points: [
        "They lost their fear/respect of Europeans (saw them afraid and dying).",
        "They expected freedom and were angered by continued discrimination.",
      ], explanation: "Two inferences." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the causes of nationalism? Explain your answer.", points: [
        "Agree: both show returned soldiers were discontented/political.",
        "Disagree: B says most people are content; A shows deep grievance.",
        "Disagree: B blames a few town clerks and teachers; A shows ordinary soldiers' grievances.",
        "Supported conclusion.",
      ], explanation: "Specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more useful for explaining the rise of mass nationalism after 1945? Use both sources and your own knowledge.", points: [
        "A: a participant's view; shows war experience and colour bar as causes.",
        "A: one man's letter for publication, so possibly emotional/unrepresentative.",
        "B: an official's report; may underplay discontent to reassure superiors.",
        "B is contradicted by own knowledge: mass parties (e.g. CPP) won wide support.",
        "Own knowledge: other causes (Atlantic Charter, urbanisation, Indian independence).",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A comes from an ex-serviceman writing in 1947, so it shows from the inside how war experience and the colour bar turned soldiers against colonial rule, matching what we know about veterans across Africa. But it is one man's letter, written for publication, and may not speak for everyone. Source B comes from a colonial officer who may have wanted to reassure his superiors; its claim that most people were content is contradicted by the rapid growth of mass parties such as Nkrumah's Convention People's Party from 1949. Its point that returned soldiers were restless supports Source A. Neither mentions other causes such as the Atlantic Charter, urbanisation or Indian independence. Source A is more useful because its explanation is supported by later events, while Source B is most useful as evidence of how officials misjudged nationalism.", explanation: "Weigh provenance and content against own knowledge." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare the Second World War with other causes."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the main features of the Manchester Pan-African Congress of 1945.", points: [
        "Held in October 1945 in Manchester; the fifth Congress.",
        "Organised by George Padmore and Kwame Nkrumah; Du Bois took part.",
        "Delegates included Jomo Kenyatta, trade unionists and students from Africa.",
        "Demanded independence and called for mass action.",
      ], explanation: "Four features." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far was the Second World War the main cause of the rise of mass nationalism in Africa?", points: [
        ["War experience of African soldiers; disappointment on return.", 2],
        ["War weakened Britain and France; Atlantic Charter and UN ideals.", 2],
        ["Other cause: colonial grievances (land, wages, taxes, discrimination).", 2],
        ["Other cause: education, urbanisation and trade unions.", 2],
        ["Other cause: Pan-Africanism and examples of India (1947) and Ghana (1957).", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Second World War was very important. Thousands of African soldiers served abroad, saw Europeans defeated and returned to colour bars and low wages, so many supported nationalist parties. The war left Britain and France in debt, while the Atlantic Charter and the United Nations Charter spoke of self-determination, an argument nationalists used.\n\nHowever, other causes were also important. Colonial grievances over land, taxes, low wages and racial discrimination existed long before 1939 and gave parties mass support. Education produced leaders, and growing towns and trade unions brought people together. Pan-Africanism, especially the Manchester Congress of 1945, gave a programme, and the independence of India in 1947 and Ghana in 1957 showed that freedom could be won.\n\nOverall the war was the trigger that turned long-standing grievances into mass movements, but without those grievances and the ideas of Pan-Africanism it would not have produced mass nationalism.", explanation: "Top level weighs the war against other causes with a judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Pan-Africanism", "The belief that people of African descent share a common destiny and should unite to end racism and colonial rule.");
  b.card("DEFINITION", "Mass nationalism", "Nationalism supported by large numbers of ordinary people through mass parties demanding immediate independence.");
  b.card("FACT", "What did W. E. B. Du Bois do for Pan-Africanism?", "Organised Pan-African Congresses (1919-1945), wrote against racism and helped found the NAACP.");
  b.card("FACT", "What did Marcus Garvey found?", "The Universal Negro Improvement Association (1914) and the Black Star Line; his slogan was \"Africa for the Africans\".");
  b.card("FACT", "Why was the 1945 Manchester Congress important?", "It demanded independence, called for mass action and was led by Africans such as Nkrumah and Kenyatta.");
  b.card("FACT", "When did Ghana become independent?", "6 March 1957, under Kwame Nkrumah.");
  b.card("CONCEPT", "Give five causes of mass nationalism after 1945.", "War experience; Atlantic Charter and UN; weakened colonial powers; Indian independence (1947); education, urbanisation and colonial grievances.");
  b.card("DEFINITION", "Diaspora", "People of African descent living outside Africa, mainly because of the Atlantic slave trade.");
  b.card("FACT", "Who organised the 1900 Pan-African Conference in London?", "Henry Sylvester Williams of Trinidad.");
});
