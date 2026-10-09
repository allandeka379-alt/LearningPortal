// W3b: National symbols (her.heritage.national-symbols).
// Reviewer notes: flag meanings are the ones commonly taught in Zimbabwean schools (BRIEF reference list). Coat of arms
// described from the arms adopted in the early 1980s (kudu supporters, Great Zimbabwe in the shield, hoe and rifle,
// wheat/cotton/maize, motto "Unity, Freedom, Work"): reviewer to confirm. Anthem not quoted; adoption year not stated.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.heritage.national-symbols", { file: "heritage/national-symbols", keyPrefix: "heritage.national-symbols" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On the national flag of Zimbabwe, what does the **yellow** stripe commonly stand for?",
    options: [
      ["mineral wealth", "Correct: yellow stands for the country's minerals, such as gold."],
      ["peace among the people", "Peace is shown by the white triangle."],
      ["vegetation and agriculture", "Agriculture and vegetation are shown by green."],
      ["the blood shed in the struggle", "This is the meaning of red."],
    ],
    answer: "A",
    explanation: "Yellow stands for mineral wealth. Green is agriculture, red the blood shed in the liberation struggle, black the majority, white peace.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which date was the national flag of Zimbabwe first officially raised as the flag of the new nation?",
    options: [
      ["18 April 1980", "Correct: the flag was adopted on Independence Day."],
      ["22 December 1987", "This is the date of the Unity Accord."],
      ["11 November 1965", "This is the date of UDI, before independence."],
      ["22 May 2013", "This is when the new Constitution was signed into law."],
    ],
    answer: "A",
    explanation: "The flag was adopted at independence on 18 April 1980.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Zimbabwe Bird on the flag and coat of arms is modelled on carvings found at which site?",
    options: [
      ["Great Zimbabwe", "Correct: several soapstone birds were found at Great Zimbabwe."],
      ["Chinhoyi Caves", "Chinhoyi Caves are a natural monument with a pool, not the source of the birds."],
      ["Domboshava", "Domboshava is known for its rock paintings."],
      ["the National Heroes Acre", "The Heroes Acre is a modern shrine, built after independence."],
    ],
    answer: "A",
    explanation: "The soapstone birds carved at Great Zimbabwe link the modern nation to the pre-colonial state.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which section of the Constitution of Zimbabwe names the national flag, national anthem, public seal and coat of arms?",
    options: [
      ["section 4", "Correct: section 4 deals with the national symbols."],
      ["section 6", "Section 6 lists the officially recognised languages."],
      ["section 81", "Section 81 sets out the rights of children."],
      ["section 162", "Section 162 lists the courts."],
    ],
    answer: "A",
    explanation: "Section 4, in Chapter 1 (founding provisions), names the national symbols.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **main** purpose of the public seal of Zimbabwe?",
    options: [
      ["to show that an official state document is genuine", "Correct: the seal authenticates state documents."],
      ["to mark the opening of a national sporting event", "Sporting events open with the anthem and flag."],
      ["to honour heroes buried at the Heroes Acre", "Heroes are honoured at shrines, not with the seal."],
      ["to show which province a citizen comes from", "The seal is not used to mark a citizen's province."],
    ],
    answer: "A",
    explanation: "The public seal is stamped on official state documents to show that they are genuine.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement **best** explains why the coat of arms shows a hoe crossed with a rifle?",
    options: [
      ["The nation moved from armed struggle to peaceful work but must still be ready to defend itself", "Correct: the hoe stands for work on the land, the rifle for defence."],
      ["The country's main exports are farming tools and weapons made in local factories", "The symbols are not about exports."],
      ["Farmers in Zimbabwe are required by law to keep a rifle at home for hunting wild animals on their land", "There is no such law; the symbol is about history and values."],
      ["The coat of arms was designed by a farmer who had fought in the First Chimurenga", "There is no basis for this claim."],
    ],
    answer: "A",
    hints: ["Think of how independence was won and how most people earn a living."],
    explanation: "The hoe stands for farming and peaceful work; the rifle recalls the armed struggle and the need to defend independence.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At a school prize-giving in Mutare, a pupil uses an old national flag as a tablecloth. Which principle of respect for national symbols has been broken?",
    options: [
      ["The flag must not be used as an ordinary cloth or decoration", "Correct: the flag represents the nation and must not be used as a household cloth."],
      ["The flag may be flown only on Heroes Day", "The flag is flown on many days, not only these."],
      ["Only soldiers and police officers may ever touch the flag", "Ordinary citizens, including pupils, may raise and lower the flag."],
      ["The flag may be shown only inside government offices", "The flag is flown outside schools, offices and at public events."],
    ],
    answer: "A",
    hints: ["What does the flag stand for, and how should it be treated?"],
    explanation: "Because the flag stands for the whole nation, it must not be used as a tablecloth, costume or rag.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Zimbabwe has sixteen officially recognised languages. Which statement **best** explains why a shared national anthem and flag matter in such a country?",
    options: [
      ["They give people of different languages and backgrounds a common identity", "Correct: shared symbols help a diverse people see themselves as one nation."],
      ["They make it unnecessary to teach local languages and cultures at school any more", "Symbols do not replace languages; the Constitution protects all sixteen."],
      ["They allow the government to choose one official language for everyone", "The Constitution recognises sixteen languages, not one."],
      ["They show that all citizens share exactly the same customs and beliefs", "Citizens have different customs; symbols unite them despite that."],
    ],
    answer: "A",
    hints: ["What do people who speak different languages still share?"],
    explanation: "National symbols are shared by everyone, whatever their language, faith or region, so they promote unity in diversity.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The flame lily is the national flower of Zimbabwe.",
    answer: true,
    explanation: "True. The flame lily, a red and yellow wild flower, is the national flower.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Flying the national flag at half-mast is a sign of national celebration.",
    answer: false,
    explanation: "False. A flag at half-mast is a sign of national mourning, for example after the death of a national hero.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of the national flag with the meaning commonly taught.",
    pairs: [
      ["green", "vegetation and agriculture"],
      ["red", "blood shed in the liberation struggle"],
      ["white triangle", "peace"],
      ["red star", "hopes and aspirations of the nation"],
    ],
    extraRight: ["mineral wealth"],
    explanation: "Green: agriculture; red: blood shed; white triangle: peace; red star: hopes. Mineral wealth is yellow, which is not listed.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about the national symbols.",
    template: "The motto on the coat of arms is \"Unity, Freedom, {{blank:a}}\". The animals holding the shield on the coat of arms are two {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Work"], choices: ["Work", "Peace", "Land", "Justice"] },
      { id: "b", accepted: ["kudu"], choices: ["kudu", "lions", "elephants", "eagles"] },
    ],
    explanation: "The motto is \"Unity, Freedom, Work\" and the shield is supported by two kudu.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the hymn that served as Zimbabwe's first national anthem at independence.",
    accepted: ["Ishe Komborera Africa", "Nkosi Sikelel' iAfrika", "Nkosi Sikelel iAfrika", "Nkosi Sikelela iAfrika", "Ishe Komborera Afrika", "God bless Africa"],
    wrong: ["Simudzai Mureza", "Kalibusiswe Ilizwe leZimbabwe"],
    explanation: "The first anthem was *Ishe Komborera Africa* (God bless Africa), a hymn sung across southern Africa. It was later replaced by *Simudzai Mureza weZimbabwe / Kalibusiswe Ilizwe leZimbabwe*.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** national symbols of Zimbabwe.",
    points: [
      "Any one of: the national flag, the national anthem, the coat of arms, the public seal, the Zimbabwe Bird, the national flower (flame lily)",
      "A second different symbol",
      "A third different symbol",
      "A fourth different symbol",
    ],
    modelAnswer: "The national flag, the national anthem, the coat of arms and the Zimbabwe Bird.",
    explanation: "One mark per correct symbol. Section 4 of the Constitution names the flag, anthem, public seal and coat of arms.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which national symbols promote national unity.",
    points: [
      "Identifies shared identity: everyone, whatever their language or region, shares one flag and anthem",
      "Develops: so people see themselves as Zimbabweans first, which reduces tribalism and regionalism",
      "Identifies shared occasions: symbols are used at national events, sports matches and schools",
      "Develops: people gather and sing or salute together, which builds a sense of belonging",
    ],
    modelAnswer: "All citizens, whatever their language, faith or region, share the same flag and anthem, so they see themselves as Zimbabweans first and divisions such as tribalism matter less. Symbols are also used at national events, sports matches and school assemblies, where people sing and stand together, which builds a sense of belonging to one nation.",
    hints: ["Think of what everyone shares, and when they use it together."],
    explanation: "One mark for each way and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A survey at a fictional school in Hwange finds that many Form 1 pupils cannot say what the parts of the national flag stand for. Suggest **two** things the school could do, and explain how each would help.",
    points: [
      "Suggests a lesson, poster or quiz explaining the colours, triangle, star and bird",
      "Explains that pupils would learn and remember the meanings, so they understand the flag they salute",
      "Suggests linking assemblies or national days to the flag (e.g. a pupil explains one part each week, flag-raising duty)",
      "Explains that regular, active involvement builds respect and pride, not just memory",
    ],
    modelAnswer: "The school could put up a poster beside the flagpole and run a quiz explaining each colour, the triangle, the star and the bird, so pupils learn the meanings and understand the flag they salute. It could also ask a different class each week to raise the flag and explain one part of it at assembly, so pupils take part actively and develop respect and pride in the symbol.",
    hints: ["One idea about teaching the meanings, one about taking part."],
    explanation: "One mark for each sensible suggestion and one for explaining how it helps.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a notice on a fictional community noticeboard in Chinhoyi, 2026",
      "Independence Day preparations: the ward committee asks all businesses to fly clean, undamaged national flags. Last year three shops displayed faded flags, and one flag was left lying on the ground after the celebrations. Flags must be raised in the morning and taken down respectfully. Faded flags will be collected at the council offices and replaced.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which national event is the committee preparing for?",
        options: [
          ["the celebration of 18 April", "Correct: Independence Day is on 18 April."],
          ["the celebration of 22 December", "This is Unity Day, not Independence Day."],
          ["the celebration of 25 May", "This is Africa Day."],
          ["the second Monday of August", "This is Heroes Day."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** examples of disrespect for the flag mentioned in the source.",
        points: ["Displaying faded flags", "Leaving a flag lying on the ground"],
        modelAnswer: "Shops displayed faded flags, and a flag was left lying on the ground after the celebrations.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the committee wants the flag to be treated with respect.",
        points: [
          "The flag represents the whole nation and its history",
          "Disrespecting it shows disrespect for the country and for those who died for independence",
          "Respectful use on national days builds pride, patriotism and unity among residents",
        ],
        modelAnswer: "The flag stands for the whole nation and its history, so damaging or dropping it shows disrespect for the country and for those who died to win independence. When residents see clean flags handled with care on national days, it builds pride, patriotism and unity in the community.",
      }),
    ],
    hints: ["In (c), think of what the flag stands for and what the committee hopes residents will feel."],
    explanation: "A source-based practice item on correct use of the national flag.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the significance of national symbols.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** national symbols of Zimbabwe.",
        points: [
          ["The national flag: seven stripes of green, yellow, red and black; a white triangle with a red star and the Zimbabwe Bird; adopted 18 April 1980", 2],
          ["Another symbol described accurately, e.g. the coat of arms (shield with Great Zimbabwe, kudu, hoe and rifle, motto) or the anthem or the Zimbabwe Bird (soapstone carvings from Great Zimbabwe)", 2],
        ],
        modelAnswer: "The national flag has seven horizontal stripes of green, yellow, red and black, with a white triangle containing a red star and the yellow Zimbabwe Bird; it was adopted on 18 April 1980. The Zimbabwe Bird is based on the soapstone birds carved at Great Zimbabwe and appears on the flag, the coat of arms and coins.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"National symbols are only decorations; they do little to unite Zimbabweans.\" How far do you agree?",
        points: [
          ["Against the statement: symbols give a shared identity across languages and regions; used at national events and international sport", 2],
          ["Against: they teach history and remembrance (red, star, Zimbabwe Bird) and build patriotism in schools", 2],
          ["For: symbols alone cannot remove poverty, inequality or political division; some citizens treat them carelessly or do not know their meanings", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "National symbols are more than decorations. Every citizen, whatever his or her language or region, shares the same flag and anthem, and at international sporting events Zimbabweans of all backgrounds cheer under one flag. The symbols also teach history: the red stripe recalls those who died in the liberation struggle, and the Zimbabwe Bird links the nation to Great Zimbabwe. Singing the anthem at school builds patriotism from an early age.\n\nOn the other hand, symbols cannot by themselves solve the problems that divide people, such as poverty, inequality or political differences. Some citizens do not know what the parts of the flag mean, and some treat the flag carelessly.\n\nI largely disagree with the statement. Symbols are not just decorations, because they give people a shared identity and memory. However, unity also depends on fairness and respect in daily life, so symbols are a help to unity rather than a guarantee of it.",
      }),
    ],
    hints: ["In (b), give the ways symbols unite and the limits of what symbols can do."],
    explanation: "A practice evaluative item on how far national symbols unite Zimbabweans.",
  });

  b.card("DEFINITION", "National symbol", "An object, design, song or emblem chosen to represent a country and its people, such as a flag, coat of arms or anthem.");
  b.card("FACT", "Which national symbols does section 4 of the Constitution name?", "The national flag, the national anthem, the public seal and the coat of arms.");
  b.card("FACT", "What do the colours of the national flag commonly stand for?", "Green: agriculture and vegetation. Yellow: mineral wealth. Red: blood shed in the liberation struggle. Black: the heritage of the majority.", "The white triangle stands for peace.");
  b.card("FACT", "What do the red star and the Zimbabwe Bird on the flag stand for?", "Red star: the nation's hopes and aspirations. Zimbabwe Bird: national identity and history.");
  b.card("FACT", "On what date was the national flag adopted?", "18 April 1980 (Independence Day).");
  b.card("FACT", "Where were the soapstone birds that inspired the Zimbabwe Bird found?", "At Great Zimbabwe.");
  b.card("FACT", "What is the motto on the coat of arms?", "Unity, Freedom, Work.");
  b.card("FACT", "What is Zimbabwe's national flower?", "The flame lily.");
  b.card("CONCEPT", "Why do national symbols matter?", "They give a shared identity, promote unity and patriotism, remind people of history and heroes, and show that official documents are genuine.");
});
