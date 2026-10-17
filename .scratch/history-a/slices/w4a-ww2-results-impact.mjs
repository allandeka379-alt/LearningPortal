// W4a: ahist.ww2.results-impact (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { mc, chrono } from "../tables/w4a-util.mjs";

concept("ahist.ww2.results-impact", { file: "ww2/results-impact", keyPrefix: "ww2.results-impact" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In which German city were the leading Nazis tried in 1945-46?",
    ok: ["Nuremberg", "Correct: the International Military Tribunal sat there."],
    no: [
      ["Berlin", "Berlin was divided among the four powers but was not the site of the trial."],
      ["Munich", "Munich was the city of the Putsch and the 1938 conference."],
      ["Versailles", "Versailles is in France and was the site of the 1919 treaty."],
    ],
    explanation: "The International Military Tribunal met at Nuremberg from 20 November 1945 to 1 October 1946.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature gave the UN Security Council's five permanent members special power?",
    ok: ["Each of them could veto a decision", "Correct: no decision could pass against a permanent member."],
    no: [
      ["Each of them could command its own UN army", "The UN did not have a standing army."],
      ["Each of them could expel other states from the UN", "The veto applies to decisions of the Council, not to expulsion by one state."],
      ["Each of them could appoint the Secretary-General alone", "The Secretary-General is appointed by the Assembly on the Council's recommendation."],
    ],
    explanation: "The veto was meant to keep the great powers inside the UN, but it also blocked action when they disagreed in the Cold War.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "How was Germany governed immediately after the surrender in 1945?",
    ok: ["It was occupied in four zones by the four victors", "Correct: Berlin was also divided into four sectors."],
    no: [
      ["It was ruled by a new German government chosen at Nuremberg", "No German government existed until 1949."],
      ["It was ruled by the League of Nations from Geneva", "The League played no part."],
      ["It was ruled by the Soviet Union alone as the main victor", "The Soviet Union ran only its own zone."],
    ],
    explanation: "The four powers each ran a zone. In 1949 the Western zones became West Germany, and the Soviet zone became East Germany.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the purpose of the Marshall Plan?",
    ok: ["To give American aid to rebuild Western Europe", "Correct: it also aimed to check the spread of communism."],
    no: [
      ["To pay reparations from Germany to the Soviet Union", "It was American aid, not German reparations."],
      ["To create a joint army of the United States and Britain", "NATO of 1949 was a military alliance."],
      ["To set up the International Military Tribunal at Nuremberg", "The tribunal was set up by the London Agreement of 1945."],
    ],
    hints: ["It was announced in 1947 by the American Secretary of State."],
    explanation: "Marshall aid, over US\\$13 billion between 1948 and 1952, helped recovery and was intended to make communism less attractive.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the Fifth Pan-African Congress of 1945 significant?",
    ok: ["African leaders there called for an end to colonial rule", "Correct: Nkrumah and Kenyatta attended in Manchester."],
    no: [
      ["European leaders there agreed to grant independence to all colonies", "No such agreement was made."],
      ["African states there formed the United Nations Security Council", "The Security Council was set up by the UN Charter."],
      ["African soldiers there decided to join the war against Japan", "The war was ending in 1945."],
    ],
    hints: ["Think of who attended and what they demanded."],
    explanation: "The Congress in Manchester in October 1945 demanded independence and was attended by future leaders such as Nkrumah and Kenyatta.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which criticism was made of the Nuremberg trials?",
    ok: ["They were called victors' justice by some critics", "Correct: critics noted the one-sided choice of defendants."],
    no: [
      ["They let all the defendants go free because of lack of evidence", "Three were acquitted but twelve were sentenced to death."],
      ["They tried only Japanese leaders and ignored Germany", "Germany's leaders were the defendants."],
      ["They were secret and held without any lawyers for the accused", "They were public and defendants had counsel."],
    ],
    hints: ["Think about who sat as judges."],
    explanation: "Critics objected that the judges were from the victorious powers and that Allied bombing and Soviet actions were not examined. Supporters replied that the evidence was documentary and the principle was needed.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the claim that the war accelerated decolonisation rather than caused it?",
    ok: ["African nationalist movements already existed in 1939", "Correct: the war speeded up a process already under way."],
    no: [
      ["The Atlantic Charter of 1941 spoke of self-government", "This shows a wartime influence on ideas."],
      ["Britain and France were weakened financially by the war", "This is a wartime effect that favoured independence."],
      ["African soldiers returned in 1945 expecting more change", "This is also a wartime effect."],
    ],
    hints: ["Which fact comes from before the war?"],
    explanation: "Movements such as the Nigerian and Gold Coast nationalists and the South African ANC pre-dated 1939. The war created new conditions that sped them up.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The United Nations Charter was signed at San Francisco in June 1945.",
    answer: true,
    explanation: "True. It was signed on 26 June 1945 and came into force on 24 October 1945.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Historians agree on a single exact figure for the number of people who died in the Second World War.",
    answer: false,
    explanation: "False. Estimates range from about 70 to 85 million because many deaths were unrecorded, especially among civilians in the Soviet Union and China.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "West Germany and East Germany were created as separate states in 1949.",
    answer: true,
    hints: ["Think of May and October 1949."],
    explanation: "True. The Federal Republic was founded in May 1949 and the German Democratic Republic in October 1949.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation or event with its description.",
    pairs: [
      ["Nuremberg trials", "Trial of leading Nazis for crimes against peace and humanity"],
      ["Marshall Plan", "American aid for Western European recovery"],
      ["United Nations", "World organisation founded in 1945 with a Security Council"],
      ["Fifth Pan-African Congress", "1945 meeting in Manchester calling for African independence"],
    ],
    explanation: "Nuremberg (1945-46), the Marshall Plan (1947-52), the UN (1945) and the Fifth Pan-African Congress (October 1945).",
  });
  chrono(b, [
    "The UN Charter is signed",
    "The Nuremberg trial begins",
    "The Marshall Plan is announced",
    "West Germany is founded",
  ], {
    d: 3, skill: "UNDERSTANDING",
    hints: ["They run from June 1945 to 1949."],
    explanation: "June 1945; November 1945; June 1947; May 1949.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Germany was divided into {{blank:a}} zones of occupation in 1945, and the Soviet zone became the German {{blank:b}} Republic in 1949.",
    blanks: [
      { id: "a", accepted: ["four"], choices: ["two", "three", "four", "five"] },
      { id: "b", accepted: ["Democratic"], choices: ["Democratic", "Federal", "Weimar", "Imperial"] },
    ],
    explanation: "There were four zones; East Germany was the German Democratic Republic, West Germany the Federal Republic.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the country that suffered the largest number of deaths in the Second World War, by most estimates.",
    accepted: ["Soviet Union", "USSR", "the Soviet Union", "Russia"],
    wrong: ["Britain"],
    explanation: "The **Soviet Union**, with an estimated 24 to 27 million deaths.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main results of the Second World War in Europe.",
    points: ["Tens of millions died and cities, industry and farmland were destroyed", "Germany was occupied in four zones and later divided into two states", "Leading Nazis were tried at Nuremberg", "The USA and USSR emerged as superpowers and the Cold War began"],
    modelAnswer: "Tens of millions died and cities, industry and farmland were destroyed. Germany was occupied in four zones and later divided into two states. Leading Nazis were tried at Nuremberg. The USA and the USSR emerged as superpowers and the Cold War began.",
    explanation: "One mark for each result described with a detail.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the United Nations was set up in 1945.",
    points: [["The League of Nations had failed to stop aggression, and leaders wanted a stronger body to keep peace after the destruction of the war", 2], ["The great powers wanted a body in which they would have a veto, and it was also meant to deal with economic and social problems that cause war", 2]],
    hints: ["Think about the League's failure and the new world situation."],
    modelAnswer: "The League of Nations had failed to stop aggression, and leaders wanted a stronger body to keep peace after the destruction of the war. The great powers wanted a body in which they would hold a veto, and it was also meant to deal with economic and social problems that cause war.",
    explanation: "Credit explained reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Second World War encouraged African nationalism.",
    points: [["African soldiers served overseas, saw Europeans defeated and returned expecting rewards and change", 2], ["The Atlantic Charter's talk of self-government and the weakening of Britain and France made independence seem possible", 2]],
    hints: ["Think of soldiers and of the Atlantic Charter."],
    modelAnswer: "African soldiers served overseas, saw Europeans defeated and returned expecting rewards and change. The Atlantic Charter's talk of self-government and the weakening of Britain and France made independence seem possible.",
    explanation: "Credit explained links.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional African trade union organiser to a newspaper in Southern Rhodesia, 1948",
        "Our men worked through the war to keep the railways running and the mines producing, and many of our sons fought in Burma. We were told that the war was fought for freedom. Yet our wages stay low, and we are told to wait. We shall not wait for ever, and the strike shows how many of us there are."),
      "",
      source("Source B", "an editorial in a fictional British newspaper, 1946",
        "Britain has won the war but is bankrupt. We cannot afford to maintain garrisons across the globe, and the peoples of the colonies are asking for a say. It would be wise to prepare for gradual change in good time, rather than be forced to it."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the African contribution to the war?", points: ["Men kept the railways and mines working", "Many sons fought in Burma"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the effects of the war on colonial rule.", points: [["Agree: both suggest that the war has made change likely and that colonial peoples are asking for a say or will not wait", 2], ["Differ: A is a protest from Africans demanding reward and showing strength through the strike, whereas B is a British view stressing Britain's financial weakness and advising gradual preparation", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying decolonisation?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is useful as an African voice linking wartime service to demands, but it is a protest letter intended to persuade and speaks for one organiser", 2], ["B is useful for how British opinion saw the cost of empire, but it is an editorial reflecting one newspaper's view, with its own interests", 2], ["Own knowledge: the strikes of 1945 and 1948 in Southern Rhodesia, Britain's financial weakness and India's independence in 1947 fit both; together they show pressure from below and from the imperial centre", 2]], modelAnswer: "Source A is useful because it links wartime service to post-war demands and mentions the strike, which fits the Southern Rhodesian general strike of 1948. It is a protest letter meant to persuade and speaks for one organiser. Source B is useful for British opinion about the cost of empire after the war, which fits Britain's financial weakness, but it is one newspaper's view. Together they show pressure from African workers and from British weakness, though neither shows how fast independence would come." }),
    ],
    hints: ["For (c), consider the purpose of a protest letter and of an editorial."],
    explanation: "Both sources are invented: a union organiser's letter and a newspaper editorial.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 250, max: 500 },
    stem: "How far was the end of European empires in Africa the most important result of the Second World War?",
    levels: levels(12),
    points: [
      ["Decolonisation: weakened Britain and France, the Atlantic Charter, returning soldiers, the Pan-African Congress, superpower opposition to empire", 3],
      ["Other results: the human cost, Nuremberg, the division of Germany, the United Nations, the Marshall Plan", 3],
      ["The Cold War and the superpowers as a result with global effect on Europe and also on Africa", 3],
      ["Judgement that compares importance by scale and duration and considers that African nationalism pre-dated the war", 3],
    ],
    hints: ["Compare the scale and duration of decolonisation with the Cold War and the human cost."],
    modelAnswer: "The end of European empires was among the most important results of the war, but the Cold War had a strong claim to be more important. The war weakened Britain and France, spread the idea of self-government through the Atlantic Charter, brought home African soldiers who expected change, and left two superpowers opposed to old empires. Within twenty years most African states were independent, which transformed a continent. Yet the war's other results were also great: tens of millions died, Nuremberg set new principles of international law, Germany was divided, and the United Nations was created. The emergence of the superpowers and the Cold War shaped world politics for forty-five years, and also shaped Africa, since both sides competed for African allies. Moreover, African nationalism existed before 1939, so the war accelerated decolonisation rather than caused it. I conclude that decolonisation was one of the two most important results, alongside the Cold War, because of its scale and its lasting effect on the world map.",
    explanation: "Credit explained results and a judgement that compares them.",
  });

  b.card("DEFINITION", "What are crimes against humanity?", "Murder, extermination, enslavement, deportation and other inhuman acts against civilians, defined at Nuremberg.");
  b.card("FACT", "What were the Nuremberg trials?", "The 1945-46 trial of 22 leading Nazis by the International Military Tribunal: 12 death sentences, 7 prison terms, 3 acquittals.");
  b.card("FACT", "How was Germany divided after 1945?", "Four zones of occupation (US, UK, France, USSR); West Germany and East Germany created in 1949.");
  b.card("FACT", "When was the UN founded?", "Charter signed 26 June 1945; in force 24 October 1945; Security Council with five permanent members holding a veto.");
  b.card("FACT", "What was the Marshall Plan?", "American aid of over US\\$13 billion (1948-52) for Western European recovery, announced in June 1947.");
  b.card("FACT", "What was the Fifth Pan-African Congress?", "The Manchester meeting of October 1945 that demanded African independence, attended by Nkrumah and Kenyatta.");
  b.card("CONCEPT", "How many people died in the Second World War?", "About 70 to 85 million (estimates), with the Soviet Union and China suffering most.");
  b.card("CONCEPT", "How did the war help decolonisation in Africa?", "It weakened Britain and France, spread ideas of self-government, and gave African soldiers new expectations; nationalism existed before 1939.");
  b.card("CONCEPT", "Why was Nuremberg criticised?", "As 'victors' justice': the judges were from the winning powers and Allied actions were not judged.");
});
