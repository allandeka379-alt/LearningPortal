// W1a: indigenous languages and cultures of Zimbabwe (her.identity.languages-cultures).
// Reviewer note: language areas are given only "in general"; isitshikitsha (Ndebele dance), tshikona (Venda) and
// ngoma buntibe (Tonga) are used as examples in the lesson only, not in auto-marked items.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.identity.languages-cultures", { file: "identity/languages-cultures", keyPrefix: "identity.languages-cultures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many officially recognised languages are listed in section 6 of the Constitution of Zimbabwe?",
    options: [
      ["16", "Correct: section 6 lists 16 languages, including sign language."],
      ["2", "Shona and Ndebele are the most widely spoken, but many more are recognised."],
      ["3", "Shona, Ndebele and English are not the only recognised languages."],
      ["10", "Ten is the number of provinces, not of recognised languages."],
    ],
    answer: "A",
    explanation: "Section 6 recognises 16 languages: Chewa, Chibarwe, English, Kalanga, Koisan, Nambya, Ndau, Ndebele, Shangani, Shona, sign language, Sotho, Tonga, Tswana, Venda and Xhosa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an officially recognised language of Zimbabwe?",
    options: [
      ["Nambya", "Correct: Nambya, spoken mainly around Hwange, is one of the 16."],
      ["Swahili", "Swahili is widely spoken in East Africa but is not on the list."],
      ["French", "French is not one of Zimbabwe's officially recognised languages."],
      ["Zulu", "Zulu is closely related to Ndebele, but it is not on Zimbabwe's list; Ndebele is."],
    ],
    answer: "A",
    explanation: "Nambya is one of the 16 languages recognised in section 6 of the Constitution.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "With which area is the **Tonga** language mainly associated?",
    options: [
      ["The Zambezi valley, especially Binga", "Correct: the Tonga have long lived along the Zambezi."],
      ["Beitbridge district", "Beitbridge is mainly associated with Venda."],
      ["The Chipinge area of Manicaland", "Chipinge is mainly associated with Ndau."],
      ["The south-eastern lowveld around Chiredzi", "Chiredzi is mainly associated with Shangani."],
    ],
    answer: "A",
    explanation: "Tonga: the Zambezi valley (Binga). Venda: Beitbridge. Ndau: Chipinge. Shangani: the south-east lowveld.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement best defines **culture**?",
    options: [
      ["The whole way of life of a people, passed on through generations", "Correct: language, beliefs, values, customs, food, dress, music and crafts."],
      ["The language used by a government in its official business", "That is an official language, which is only one part of culture."],
      ["The ancient stone buildings left by earlier states", "Monuments are part of heritage, but culture is a whole way of life."],
      ["The music that is played on national radio and television stations", "Music is one part of culture, not the whole of it."],
    ],
    answer: "A",
    explanation: "Culture is the whole way of life of a group: language, beliefs, values, customs, food, dress, music, dance, crafts and ceremonies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which language is used by **Deaf** people across Zimbabwe and is officially recognised?",
    options: [
      ["Sign language", "Correct: sign language is one of the 16 recognised languages."],
      ["Koisan", "Koisan languages are spoken by small San communities in western Zimbabwe."],
      ["Chibarwe", "Chibarwe is spoken by small communities in the east."],
      ["Braille", "Braille is a writing system for blind people, not a spoken or signed language."],
    ],
    answer: "A",
    explanation: "Sign language uses hand shapes, movements and facial expressions. It is officially recognised in section 6.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Many Tonga families were moved from the Zambezi riverbanks in the late 1950s. What caused this move?",
    options: [
      ["The creation of Lake Kariba by the Kariba Dam", "Correct: the dam flooded the valley and families were moved."],
      ["A cyclone that destroyed their villages", "The move was caused by the dam, not by a cyclone."],
      ["The founding of the Great Zimbabwe state", "Great Zimbabwe flourished centuries earlier."],
      ["The construction of the Beitbridge border post", "Beitbridge is on the Limpopo, far from the Tonga."],
    ],
    answer: "A",
    hints: ["What large project on the Zambezi was built in the 1950s?"],
    explanation: "The Kariba Dam created Lake Kariba, flooding land where many Tonga families had lived along the Zambezi.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which reason **best** explains how respecting every language and culture promotes national unity?",
    options: [
      ["All citizens feel that they belong and are valued", "Correct: respect makes every group feel part of the nation."],
      ["It makes everyone speak exactly the same language", "Respecting diversity does not mean everyone speaks the same language."],
      ["It removes the need for any national symbols", "National symbols remain important for unity."],
      ["It allows only the largest groups to take decisions", "This would exclude smaller groups and weaken unity."],
    ],
    answer: "A",
    hints: ["How would speakers of a smaller language feel if their language was respected?"],
    explanation: "Unity in diversity: when every group's language and culture are respected, all citizens feel they belong, which builds peace and unity.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A rural district has three languages but school books only in one. Which step would **best** uphold all three?",
    options: [
      ["Producing books and radio programmes in all three", "Correct: materials and media in each language keep all three in use."],
      ["Teaching only English so that no group is favoured over another", "This would weaken all three indigenous languages."],
      ["Asking the smaller groups to adopt the largest language", "This would lead to the loss of the smaller languages."],
      ["Waiting for the smaller languages to disappear naturally over time", "This accepts the loss of heritage instead of upholding it."],
    ],
    answer: "A",
    hints: ["Which option keeps every language in daily use?"],
    explanation: "Upholding languages requires materials, media and teaching in each language, as section 6 requires the State to promote them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "English is one of the 16 officially recognised languages of Zimbabwe.",
    answer: true,
    explanation: "True. English is on the list in section 6, alongside 15 other languages.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ndau is not recognised in the Constitution because it is a dialect of Shona.",
    answer: false,
    explanation: "False. Ndau is sometimes grouped with Shona, but section 6 recognises it as a language in its own right.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each language with the area it is mainly associated with.",
    pairs: [
      ["Venda", "Beitbridge district"],
      ["Nambya", "Hwange district"],
      ["Kalanga", "The south-west, around Plumtree"],
      ["Shangani", "The south-eastern lowveld, such as Chiredzi"],
    ],
    explanation: "People of every group also live in towns and elsewhere, but these are the areas each language is mainly associated with.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Mopane worms are called madora in Shona and {{blank:a}} in Ndebele. Well-known baskets are made by Tonga communities in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["amacimbi"], choices: ["amacimbi", "amadlozi", "izibongo", "ilima"] },
      { id: "b", accepted: ["Binga"], choices: ["Binga", "Beitbridge", "Chipinge", "Marondera"] },
    ],
    explanation: "Mopane worms: madora (Shona) / amacimbi (Ndebele). Tonga baskets from Binga are well known.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the section of the Constitution of Zimbabwe that lists the officially recognised languages. Give the number only.",
    accepted: ["6", "six", "section 6"],
    wrong: ["4", "81"],
    explanation: "**Section 6** of the Constitution (2013) lists the 16 officially recognised languages.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** officially recognised languages of Zimbabwe other than Shona, Ndebele and English.",
    points: ["One from: Chewa, Chibarwe, Kalanga, Koisan, Nambya, Ndau, Shangani, sign language, Sotho, Tonga, Tswana, Venda, Xhosa", "A second from the list", "A third from the list"],
    modelAnswer: "Tonga, Venda and Kalanga.",
    explanation: "One mark per correct language from section 6.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why indigenous languages and cultures should be upheld.",
    points: [
      "Identifies e.g. identity / self-respect",
      "Develops: people who know their language and culture know who they are and feel proud",
      "Identifies e.g. heritage / unity / equality / tourism",
      "Develops: e.g. folk tales and knowledge are passed on; all groups feel they belong",
    ],
    modelAnswer: "Indigenous languages and cultures give people their identity, so those who know them feel proud of who they are. They also carry heritage such as folk tales, songs and knowledge of plants, which would be lost if the languages died out.",
    hints: ["Give a reason, then explain what would be gained or lost."],
    explanation: "Two marks per reason: identify, then develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which the media could help to uphold Zimbabwe's smaller indigenous languages.",
    points: [
      "Suggests e.g. community radio stations broadcasting in local languages",
      "Explains: speakers hear their language used daily, and young people hear it",
      "Suggests e.g. television programmes, newspapers or online content in smaller languages",
      "Explains: the language gains status and new words; culture (music, stories) reaches a wider audience",
    ],
    modelAnswer: "Community radio stations could broadcast news, music and stories in languages such as Tonga, Venda and Nambya, so speakers, especially young people, hear their language used every day. Television and online channels could also produce programmes in these languages, which raises their status and shares their culture with other Zimbabweans.",
    hints: ["Think of radio, television, print and online media."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "A fictional secondary school in Gwanda asked 60 learners which language they speak at home. The results are invented for this question.\n\n" +
      table(["Home language", "Number of learners"], [["Ndebele", 28], ["Sotho", 12], ["Shona", 9], ["Venda", 6], ["Kalanga", 5]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which home language is spoken by the second-largest number of learners?",
        options: [
          ["Sotho", "Correct: 12 learners, second after Ndebele (28)."],
          ["Ndebele", "Ndebele is the largest group (28)."],
          ["Shona", "Shona has 9 learners, third."],
          ["Venda", "Venda has 6 learners."],
        ],
        answer: "A",
        explanation: "Ndebele 28, Sotho 12, Shona 9, Venda 6, Kalanga 5.",
      }),
      P.fib({
        label: "(b)",
        stem: "Use the table.",
        template: "The number of learners whose home language is **not** Ndebele is {{blank:a}}.",
        blanks: [{ id: "a", accepted: ["32"], wrong: "28" }],
        explanation: "60 - 28 = 32 (12 + 9 + 6 + 5).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the school could make sure that learners from all five language groups feel their culture is respected.",
        points: ["Hold a culture/language day where each group presents songs, food or dances", "Teach greetings or basic phrases in each language / include books in the languages", "Discourage mocking of accents or languages; invite elders from each group"],
        modelAnswer: "The school could hold a culture day where each group presents its songs, food and dances, teach all learners greetings in each language, and make clear that mocking anyone's language or accent is not acceptable.",
      }),
    ],
    hints: ["In (b), subtract the Ndebele learners from the total."],
    explanation: "Invented survey data showing cultural diversity in one school.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the languages and cultures of Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **cultural diversity**.",
        points: ["Many different cultures, languages and ways of life", "existing side by side in one society"],
        modelAnswer: "The existence of many different cultures, languages and ways of life side by side in one society.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** cultural features of the people of Zimbabwe, giving examples.",
        points: ["Names a feature, e.g. music", "Example, e.g. mbira; Tonga ngoma buntibe; drums", "Names a second feature, e.g. food, crafts, dance, ceremonies", "Example, e.g. sadza, mopane worms; Binga baskets; rain-making ceremonies"],
        modelAnswer: "Music is an important feature: the mbira is closely linked with Shona ceremonies, and Tonga communities play ngoma buntibe with drums and horns. Crafts are another: Tonga baskets from Binga, pottery, wood carving and stone sculpture are made in many parts of the country.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "\"Recognising 16 languages in the Constitution is enough to protect Zimbabwe's smaller languages.\" How far do you agree?",
        points: [
          ["For: recognition gives status and requires the State to treat the languages equitably and promote them", 2],
          ["Against: recognition must be backed by teachers, books, media and use at home; many young people still shift to larger languages", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(6),
        modelAnswer: "Recognition in section 6 is an important step. It gives every listed language official status and requires the State to treat them equitably and promote them, which encourages their use in schools and the media.\n\nHowever, recognition alone does not keep a language alive. Smaller languages need trained teachers, books, radio and television programmes, and above all families who speak them at home. Many young people still move to towns and switch to Shona, Ndebele or English.\n\nOverall, recognition is necessary but not enough: it protects smaller languages only when it is backed by resources and by everyday use.",
      }),
    ],
    hints: ["In (c), ask what a language needs in practice to survive."],
    explanation: "Define (a), describe (b) and evaluate (c) the protection of Zimbabwe's languages.",
  });

  b.card("DEFINITION", "Culture", "The whole way of life of a people: language, beliefs, values, customs, food, dress, music, dance, crafts and ceremonies.");
  b.card("DEFINITION", "Cultural diversity", "Many different cultures, languages and ways of life existing side by side in one society.");
  b.card("DEFINITION", "Indigenous language", "A language that developed among, and has long been spoken by, a people of a particular area.");
  b.card("FACT", "List the 16 officially recognised languages (section 6).", "Chewa, Chibarwe, English, Kalanga, Koisan, Nambya, Ndau, Ndebele, Shangani, Shona, sign language, Sotho, Tonga, Tswana, Venda, Xhosa.");
  b.card("FACT", "Venda, Nambya, Tonga: main areas?", "Venda: Beitbridge. Nambya: Hwange. Tonga: Zambezi valley (Binga).");
  b.card("FACT", "Why were many Tonga families moved in the late 1950s?", "Lake Kariba, created by the Kariba Dam, flooded their land along the Zambezi.");
  b.card("CONCEPT", "Give four reasons for upholding indigenous languages and cultures.", "Identity, heritage, unity in diversity, equality and rights, better learning, tourism and creative income.");
  b.card("CONCEPT", "Name four ways of upholding smaller languages.", "Speak them at home; teach them in schools with books; community radio and TV; culture days and festivals; record elders.");
  b.card("CONCEPT", "Is language the same as culture?", "No: language is one part of culture, which also includes beliefs, food, dress, music, dance, crafts and ceremonies.");
});
