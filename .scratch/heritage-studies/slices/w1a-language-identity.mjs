// W1a: language and identity (her.identity.language-identity).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.language-identity", { file: "identity/language-identity", keyPrefix: "identity.language-identity" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a person's **mother tongue**?",
    options: [
      ["The first language they learn at home", "Correct: the mother tongue is learned first, usually from parents or carers."],
      ["The language their mother learned at school", "The mother tongue is the child's own first language, not the mother's school language."],
      ["The official language used in courts and parliament", "That describes a language of government, not a mother tongue."],
      ["Any foreign language that is learned as a teenager", "A language learned later is a second or additional language."],
    ],
    answer: "A",
    explanation: "The mother tongue (first language) is the language a child learns first at home.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **oral tradition**?",
    options: [
      ["Knowledge and stories passed on by word of mouth", "Correct: folk tales, histories, songs and sayings told from one generation to the next."],
      ["A written record kept in a government archive", "Written records are documents, not oral traditions."],
      ["A rule about how to care for one's teeth and mouth", "Oral here means spoken, not about the mouth's health."],
      ["A test in which learners answer questions out loud", "An oral test is an examination, not a tradition."],
    ],
    answer: "A",
    explanation: "Oral traditions are passed on by speaking and listening: folk tales, family histories, praise poetry, proverbs and songs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Ndebele name **Sipho** and the Shona name **Chipo** share which meaning?",
    options: [
      ["Gift", "Correct: both names mean gift."],
      ["Love", "Rudo is the Shona name meaning love."],
      ["Hope", "Themba is an Ndebele name meaning hope."],
      ["Peace", "Nokuthula is an Ndebele name linked to peace."],
    ],
    answer: "A",
    explanation: "Sipho (Ndebele) and Chipo (Shona) both mean gift, showing how names carry meaning in indigenous languages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which greeting is used in **Ndebele** to say hello?",
    options: [
      ["Salibonani", "Correct: salibonani is an Ndebele greeting (literally 'we see you')."],
      ["Mangwanani", "Mangwanani is a Shona greeting meaning good morning."],
      ["Makadii", "Makadii is a Shona greeting meaning how are you."],
      ["Mhoroi", "Mhoroi is a Shona greeting meaning hello."],
    ],
    answer: "A",
    explanation: "Greetings carry identity: salibonani and linjani (Ndebele); mhoroi, mangwanani and makadii (Shona).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which aspect of language links a person **most directly** to their clan and ancestors?",
    options: [
      ["Totem praise poetry", "Correct: praises recite the clan's totem, ancestors and history."],
      ["A school textbook", "A textbook is a learning resource, not a link to one's clan."],
      ["A newspaper headline", "A headline gives news to the public at large."],
      ["A shop's price list", "A price list carries no clan identity."],
    ],
    answer: "A",
    explanation: "Totem praises (detembo/izibongo) are recited in the family's language and name its totem and ancestors.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At a funeral, two strangers discover they speak the same home language and begin to treat each other like relatives. What does this show?",
    options: [
      ["Language creates a sense of shared identity and belonging", "Correct: a shared language quickly builds trust and belonging."],
      ["Language is only useful for passing on information", "The example shows that language does much more than pass on information."],
      ["People can only become friends if they share a totem", "The example is about language, and friendships do not depend on totems."],
      ["Funerals are held only for people of one language group", "Funerals bring together people of many languages."],
    ],
    answer: "A",
    hints: ["What did the shared language do for the two strangers?"],
    explanation: "Language is a marker of identity: sharing it creates a sense of belonging to the same community.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does the loss of an indigenous language threaten a community's **heritage**?",
    options: [
      ["The stories, songs and knowledge carried in it may be lost too", "Correct: much heritage is stored in the language itself."],
      ["The community will no longer be allowed to vote in elections", "Voting rights do not depend on which language a person speaks."],
      ["People will no longer be able to communicate at all", "People can still communicate in other languages."],
      ["The national flag will have to be redesigned without it", "The flag does not change with languages."],
    ],
    answer: "A",
    hints: ["Where are folk tales, praise poetry and plant names kept in an oral culture?"],
    explanation: "In oral cultures, history, values and knowledge live in the language. When a language dies, much of that heritage can be lost.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure would do **most** to strengthen both personal identity and national unity through language?",
    options: [
      ["Teaching learners their own language and greetings in another", "Correct: it builds pride in one's own language and respect for others."],
      ["Using only one language in every school and on all national media", "This could make speakers of other languages feel excluded."],
      ["Discouraging the use of indigenous languages at home", "This would weaken personal identity and heritage."],
      ["Banning all English words from radio and television", "This is impractical and would not by itself build unity."],
    ],
    answer: "A",
    hints: ["Look for a measure that helps both individuals and the whole nation."],
    explanation: "Learning one's own language builds personal identity; learning to greet others in theirs builds respect and unity.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sign language is one of the languages officially recognised by the Constitution of Zimbabwe.",
    answer: true,
    explanation: "True. Section 6 of the Constitution lists 16 officially recognised languages, including sign language.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Language can only unite people; it can never be used to divide them.",
    answer: false,
    explanation: "False. Language can divide when people use it to exclude, mock or look down on others. Respect for every language helps unity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each name with its common meaning.",
    pairs: [
      ["Rudo", "Love"],
      ["Themba", "Hope or trust"],
      ["Tendai", "Be thankful"],
      ["Thandeka", "Loved or lovable"],
    ],
    explanation: "Many Zimbabwean names carry meaning in an indigenous language: Rudo (love), Themba (hope), Tendai (be thankful), Thandeka (loved).",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The idea that a person's humanity is shown through respect and care for others is called unhu in Shona and {{blank:a}} in Ndebele. A shared sense of belonging to a country is {{blank:b}} identity.",
    blanks: [
      { id: "a", accepted: ["ubuntu"], choices: ["ubuntu", "izibongo", "isibongo", "amadlozi"] },
      { id: "b", accepted: ["national"], choices: ["national", "personal", "clan", "family"] },
    ],
    hints: ["The Ndebele word begins with 'ubu'."],
    explanation: "Unhu (Shona) / ubuntu (Ndebele). National identity is a shared sense of belonging to the nation.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "How many languages are officially recognised by section 6 of the Constitution of Zimbabwe? Give the number.",
    accepted: ["16", "sixteen"],
    wrong: ["3", "2"],
    explanation: "Section 6 recognises **16** languages, including Shona, Ndebele, English, Tonga, Venda and sign language.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** aspects of language that carry identity.",
    points: ["Names", "Greetings / forms of address", "Any one of: songs, folk tales, proverbs, totem praises, oral traditions"],
    modelAnswer: "Names, greetings and totem praises.",
    explanation: "One mark per aspect.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which language helps to pass on heritage.",
    points: [
      "Identifies folk tales, proverbs or praise poetry told in the language",
      "Develops: they carry the community's values and history to young people",
      "Identifies songs, ceremonies or names in the language",
      "Develops: they keep customs, beliefs and family history alive",
    ],
    modelAnswer: "Folk tales and proverbs are told in indigenous languages, carrying values such as honesty and the community's history to young people. Songs at ceremonies and meaningful names also keep customs and family history alive.",
    hints: ["Name what is passed on, then say what it keeps alive."],
    explanation: "Two marks per way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which families living in towns can keep their indigenous language alive among their children.",
    points: [
      "Suggests e.g. speaking the language at home",
      "Explains: children learn it as a mother tongue and use it daily",
      "Suggests e.g. visits to the rural home / storytelling / songs / indigenous-language media",
      "Explains: children hear the language used in rich, real situations with elders",
    ],
    modelAnswer: "Parents can speak the indigenous language at home, so children learn it as their first language and use it every day. They can also take children to visit grandparents and listen to folk tales, songs and radio programmes in the language, so the children hear it used richly by elders.",
    hints: ["Think about what children hear at home and on visits."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "a letter written by a fictional grandmother in Hwange to her grandson in Harare, 2026", "My dear grandson, when you phone me you now greet me only in English. I am happy you are doing well at school, but remember that your name was given to you in our language for a reason. When you come in December, I will teach you the songs we sing at the harvest, so that you can teach them to your own children one day.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the grandmother **mainly** worried about?",
        options: [
          ["Her grandson is losing touch with his indigenous language", "Correct: he now greets her only in English."],
          ["Her grandson is doing badly in his school examinations", "She says she is happy he is doing well at school."],
          ["Her grandson has changed the name his family gave him", "She reminds him of his name; she does not say he changed it."],
          ["Her grandson has stopped phoning her from Harare", "He still phones her."],
        ],
        answer: "A",
        explanation: "The grandmother's concern is that her grandson is losing his indigenous language and heritage.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** aspects of language mentioned in the letter that carry identity.",
        points: ["Greetings", "Names / harvest songs"],
        modelAnswer: "Greetings and the songs sung at the harvest.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the grandmother wants to teach her grandson the harvest songs.",
        points: ["Songs carry the family's/community's heritage", "Teaching them passes heritage to the next generation (his children)", "Learning them strengthens his identity and bond with his roots and elders"],
        modelAnswer: "The harvest songs carry the community's heritage. By teaching them to her grandson she makes sure they pass to the next generation, his own children, and learning them strengthens his identity and his link with his elders and roots.",
      }),
    ],
    hints: ["In (c), look at the last sentence of the letter."],
    explanation: "A fictional letter used to explore language, identity and heritage.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on language and identity.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **identity**.",
        points: ["The characteristics that make a person or group who they are", "and set them apart from others (e.g. name, totem, language, nationality)"],
        modelAnswer: "The characteristics, such as name, totem, language and nationality, that make a person or group who they are and set them apart from others.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how language links a person to their **community** and to the **nation**.",
        points: ["Community: local language, dialect, songs and sayings", "make a person feel they belong to the local group / share its customs", "Nation: officially recognised languages, the anthem, national songs", "build a shared national identity and unity"],
        modelAnswer: "At community level, a person shares the local language, songs and sayings, which makes them feel part of the group and its customs. At national level, the officially recognised languages, the national anthem and national songs give citizens a shared identity and help unite people of different backgrounds.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "\"Speaking English is a greater threat to indigenous identity than a benefit to young Zimbabweans.\" How far do you agree?",
        points: [
          ["Threat: English may replace indigenous languages at home and in the media, so stories, songs and respect forms are lost", 2],
          ["Benefit: English is used in education, work, government and international communication; it can coexist with indigenous languages", 2],
          ["Supported judgement, e.g. not a threat if indigenous languages are also used and valued", 2],
        ],
        levels: levels(6),
        modelAnswer: "English can threaten indigenous identity when it replaces home languages. Some young people in towns greet elders only in English and do not learn folk tales, songs or respectful forms of address, so heritage is weakened.\n\nHowever, English also brings benefits. It is widely used in education, work, government and international communication, and it allows Zimbabweans of different language groups to communicate. Many people speak English as well as one or more indigenous languages.\n\nOverall, English is a threat only if it replaces indigenous languages. When families and schools keep using and valuing indigenous languages, English is a benefit that need not weaken identity.",
      }),
    ],
    hints: ["In (c), consider whether a person can speak several languages."],
    explanation: "Define (a), explain (b) and evaluate (c) the link between language and identity.",
  });

  b.card("DEFINITION", "Identity", "The characteristics (name, family, totem, language, culture, religion, nationality) that make a person or group who they are.");
  b.card("DEFINITION", "Mother tongue", "The first language a person learns at home, usually from parents or carers.");
  b.card("DEFINITION", "Oral tradition", "Knowledge, history, stories, songs and sayings passed by word of mouth from one generation to the next.");
  b.card("DEFINITION", "National identity", "A shared sense of belonging to a nation through shared history, symbols, values and languages.");
  b.card("FACT", "How many languages does section 6 of the Constitution recognise?", "16, including sign language.");
  b.card("FACT", "Unhu in Ndebele?", "Ubuntu: a person's humanity shown through respect and care for others.");
  b.card("CONCEPT", "Name five aspects of language that carry identity.", "Names, greetings, songs, oral traditions (folk tales, proverbs), totem praises, respectful forms of address.");
  b.card("CONCEPT", "Why does losing a language threaten heritage?", "Stories, songs, knowledge and values stored in the language may be lost with it.");
  b.card("CONCEPT", "How can language divide people?", "When it is used to exclude, mock or look down on speakers of other languages.");
});
