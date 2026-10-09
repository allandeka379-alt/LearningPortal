// W1b: Zimbabwean and foreign norms and values; threats to indigenous culture (her.culture.foreign-influences).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.foreign-influences", { file: "culture/foreign-influences", keyPrefix: "culture.foreign-influences" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A way of life that puts the rights, wishes and success of the individual first is called …",
    options: [
      ["individualism", "Correct."],
      ["communalism", "Communalism puts the group first."],
      ["urbanisation", "Urbanisation is the growth of towns and movement of people into them."],
      ["acculturation", "Acculturation is taking on features of another culture through contact."],
    ],
    answer: "A",
    explanation: "Individualism stresses the individual; communalism, typical of indigenous Zimbabwean culture, stresses the group and shared duties.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which pair correctly compares an indigenous Zimbabwean tendency with a common Western one?",
    options: [
      ["extended family / nuclear family", "Correct: indigenous culture stresses the extended family; Western culture more often the nuclear family."],
      ["individualism / communalism", "This is the wrong way round: communalism is the indigenous tendency."],
      ["handshake / clapping", "This is the wrong way round: clapping is the indigenous greeting."],
      ["old people's homes / care by family", "This is the wrong way round: care by the family is the indigenous norm."],
    ],
    answer: "A",
    explanation: "Typical contrasts: extended versus nuclear family, communalism versus individualism, clapping or kneeling versus a handshake, care at home versus old people's homes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the loss of an indigenous language a serious threat to culture?",
    options: [
      ["Proverbs, folk tales, totem praises and history are carried in the language", "Correct: losing the language cuts people off from the knowledge it carries."],
      ["Without an indigenous language a person cannot be registered as a citizen of Zimbabwe", "This is not true and is not the main reason."],
      ["English cannot be used to describe Zimbabwean places", "English can describe any place; this misses the point."],
      ["Indigenous languages are needed for using mobile phones", "Phones work in many languages; this is not why language loss matters."],
    ],
    answer: "A",
    explanation: "Language carries wisdom, identity and history. When children cannot understand elders, totem praises or proverbs, much of the culture is lost with the language.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A family moves from a village near Gutu to a flat in Harare. The children rarely see their grandparents or attend ceremonies. Which threat to indigenous culture does this show?",
    options: [
      ["urbanisation", "Correct: moving to towns reduces daily contact with elders and ceremonies."],
      ["commercialisation", "Commercialisation is changing culture to sell it, e.g. to tourists."],
      ["acculturation through religion", "Religion is not mentioned in the story."],
      ["migration abroad", "The family moved within Zimbabwe, not abroad."],
    ],
    answer: "A",
    explanation: "Urbanisation separates families from elders, land and ceremonies, so children learn less of their culture directly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the following is a **benefit** that foreign influence has brought to Zimbabwe?",
    options: [
      ["Modern medicine and formal schooling", "Correct: these came largely through contact with other cultures and are widely valued."],
      ["The loss of indigenous languages in some homes", "This is a threat, not a benefit."],
      ["A decline in respect for elders among some youths", "This is a negative effect."],
      ["Fewer people attending community ceremonies", "This is a sign of cultural erosion."],
    ],
    answer: "A",
    hints: ["The question asks for a positive effect."],
    explanation: "Foreign influence has both benefits (schools, hospitals, technology, the language of human rights) and costs (individualism, language loss).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula shakes hands at a job interview but kneels and claps to greet her grandmother. What does this show?",
    options: [
      ["She uses different norms in different settings to express the same value of respect", "Correct: both greetings express respect in the way each setting expects."],
      ["She has rejected indigenous culture and now prefers foreign ways in every setting of her life", "She still uses the indigenous greeting with her grandmother."],
      ["She does not respect the people who interview her", "A handshake is a respectful greeting in that setting."],
      ["She has lost the ability to speak her home language", "Nothing in the story concerns language."],
    ],
    answer: "A",
    hints: ["What value lies behind both greetings?"],
    explanation: "Moving between cultural norms while keeping the same value is a skill; it is not a loss of identity.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which approach to foreign influence is the **most balanced**?",
    options: [
      ["Adopting helpful foreign ideas while keeping indigenous values that bind communities", "Correct: selective adoption keeps the best of both."],
      ["Banning all foreign music, films, clothing and technology so that only local culture remains", "This is impractical and ignores the benefits of foreign influence."],
      ["Replacing indigenous languages with English in every home", "This would speed up cultural erosion."],
      ["Treating every indigenous practice as beyond criticism", "Some practices harm people and should change."],
    ],
    answer: "A",
    hints: ["Which option avoids both extremes?"],
    explanation: "Selective adoption judges each practice on its merits: keeping technology, medicine and rights, as well as language, Unhu and family ties.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Globalisation is the growing connection of the world's economies and cultures through trade, travel, technology and the media.",
    answer: true,
    explanation: "True. Globalisation spreads goods, ideas and lifestyles quickly across the world.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All foreign norms and values are harmful to Zimbabwean society.",
    answer: false,
    explanation: "False. Foreign influences include schooling, medicine, technology and human rights, which many Zimbabweans value. Each practice should be judged on its merits.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each threat to indigenous culture with the way it affects culture.",
    pairs: [
      ["media and the internet", "spread foreign dress, music and lifestyles among the young"],
      ["urbanisation", "separates families from elders and ceremonies"],
      ["migration abroad", "children grow up outside the country, sometimes without their language"],
      ["commercialisation", "ceremonies and crafts are changed to suit tourists"],
    ],
    explanation: "Each threat weakens culture in a different way; explaining the 'how' earns marks.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The gradual loss of a people's language, customs and values is called cultural {{blank:a}}. Taking on features of another culture through contact is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["erosion"], choices: ["erosion", "heritage", "identity", "communalism"] },
      { id: "b", accepted: ["acculturation"], choices: ["acculturation", "socialisation", "urbanisation", "inheritance"] },
    ],
    explanation: "Cultural erosion is the loss; acculturation is the process of taking on another culture's features.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** threats to indigenous culture in Zimbabwe.",
    points: ["One of: media and the internet, urbanisation", "A second (e.g. migration, globalisation)", "A third (e.g. loss of language, some religious attitudes)", "A fourth (e.g. commercialisation, foreign influence through education)"],
    modelAnswer: "The media and internet, urbanisation, migration abroad, loss of indigenous languages.",
    explanation: "One mark for each different threat.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which indigenous culture can be preserved.",
    points: [
      "Teaching indigenous languages at home and in school",
      "so that proverbs, folk tales and history are understood and passed on",
      "Culture days, festivals and traditional music and dance",
      "so that young people experience their culture and take pride in it",
      "Museums, archives and local-language media",
      "so that culture is recorded and reaches people in towns and abroad",
    ],
    modelAnswer: "Indigenous languages should be taught at home and in school, so that children understand proverbs, folk tales and family history. Culture days and festivals with traditional music, dance and food let young people experience their culture and take pride in it. Museums, archives and radio, television and online content in indigenous languages record culture and carry it to people in towns and abroad.",
    hints: ["Think of families, schools and the media."],
    explanation: "Two marks per way: the measure and how it preserves culture.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways social media could be used to **preserve** rather than threaten indigenous culture.",
    points: [
      "Suggests sharing content in indigenous languages, e.g. folk tales, proverbs or lessons",
      "Explains that young people meet their language where they already spend time",
      "Suggests promoting local artists, e.g. mbira musicians, sculptors, traditional dancers",
      "Explains that culture gains a wider audience and an income, so it is kept alive",
    ],
    modelAnswer: "Families and teachers could post short videos of folk tales, proverbs and totem praises in indigenous languages, so young people meet their language where they already spend time. Social media can also promote mbira musicians, sculptors and dance groups, giving them a wider audience and an income, which keeps these arts alive.",
    hints: ["Turn the threat around: what could be shared instead?"],
    explanation: "Credit any sensible use of media to spread or support culture, with an explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "results of a survey of 120 young people in a fictional Bulawayo suburb, 2026; figures invented for this question",
      "| Statement | Agree | Disagree |\n| --- | --- | --- |\n| I speak an indigenous language at home | 78 | 42 |\n| I know my totem and its praises | 54 | 66 |\n| I have attended a traditional ceremony in the last year | 36 | 84 |\n| I watch foreign music or films every day | 102 | 18 |") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "How many young people said they **know** their totem and its praises?",
        accepted: ["54", "fifty-four", "fifty four"],
        wrong: ["66"],
      }),
      P.mcq({
        label: "(b)",
        stem: "Which conclusion is **best supported** by the survey?",
        options: [
          ["Fewer young people attend ceremonies than speak an indigenous language at home", "Correct: 36 attend ceremonies, 78 speak an indigenous language."],
          ["Most young people do not speak an indigenous language at home", "78 of 120 do speak one, which is most of them."],
          ["Watching foreign films every day has caused young people to forget their totems and praises", "The survey does not show cause and effect."],
          ["Every young person in Zimbabwe watches foreign films each day", "The survey covers 120 people in one suburb only."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain **two** threats to indigenous culture among these young people.",
        points: [
          "Strong foreign media influence: 102 of 120 watch foreign music or films daily",
          "so foreign lifestyles and values reach them more often than indigenous ones",
          "Weak contact with ceremonies and totems: only 36 attended a ceremony and 66 do not know their totem praises",
          "so knowledge of identity and practices may not be passed on",
        ],
        modelAnswer: "Foreign media are a strong influence: 102 of the 120 watch foreign music or films every day, so foreign lifestyles reach them more often than indigenous ones. Contact with indigenous practice is weak: only 36 attended a ceremony in the past year and 66 do not know their totem praises, so this knowledge may not be passed on to the next generation.",
      }),
    ],
    hints: ["In (b), check what the numbers do and do not prove."],
    explanation: "A data-based practice item (6 marks): read invented survey figures and avoid claiming cause and effect without evidence.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about foreign influence on Zimbabwean culture.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Compare Zimbabwean and foreign norms and values in **two** areas of life.",
        points: [
          ["Family: indigenous extended family with shared duties compared with the nuclear family common in Western societies", 2],
          ["Outlook or greetings: communalism compared with individualism, or clapping/kneeling compared with handshakes and first names", 2],
        ],
        modelAnswer: "In family life, indigenous Zimbabwean culture stresses the extended family with shared duties, whereas many Western societies centre on the nuclear family. In outlook, indigenous culture is communal, putting the family and community first, while Western culture tends to be individualist, putting personal rights and choices first.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Foreign influence has done more harm than good to Zimbabwean culture.\" Discuss.",
        points: [
          ["Harm: individualism, materialism and media weaken communal values and respect", 2],
          ["Harm: language loss and declining ceremonies erode identity", 2],
          ["Good: schooling, medicine, technology and human rights, including protection of women and children", 2],
          ["Supported judgement weighing both", 2],
        ],
        levels: levels(8),
        modelAnswer: "Foreign influence has caused some harm. Individualism and materialism spread through the media can weaken communal values and respect for elders, and in some homes indigenous languages are no longer spoken, so children lose touch with proverbs, totems and family history.\n\nHowever, foreign influence has also done much good. Formal schooling, modern medicine and new technology have improved lives, and the language of human rights has strengthened protection for women and children, for example against child marriage. Many Zimbabweans also use foreign technology to spread their own music and languages.\n\nOn balance I do not agree that the harm is greater. The harm is real, especially language loss, but the benefits are large, and the damage can be reduced if families, schools and the media actively keep indigenous values alive.",
      }),
    ],
    hints: ["Give at least two arguments on each side before your judgement."],
    explanation: "A practice evaluative item on the costs and benefits of foreign influence.",
  });

  b.card("DEFINITION", "Globalisation", "The growing connection of the world's economies and cultures through trade, travel, technology and the media.");
  b.card("DEFINITION", "Individualism", "A way of life that puts the individual's rights, wishes and success first.");
  b.card("DEFINITION", "Communalism", "A way of life that stresses the group and shared duties.");
  b.card("DEFINITION", "Cultural erosion", "The gradual loss of a people's language, customs, norms and values.");
  b.card("DEFINITION", "Acculturation", "Taking on features of another culture through contact with it.");
  b.card("FACT", "Name five threats to indigenous culture.", "Media and the internet, urbanisation, migration, globalisation, loss of language (also some religious attitudes, commercialisation).");
  b.card("CONCEPT", "Why is foreign influence not all negative?", "It brought schooling, medicine, technology and human rights, which many Zimbabweans value.");
  b.card("CONCEPT", "Why does language loss threaten culture?", "Proverbs, folk tales, totem praises and history are carried in the language; without it they cannot be passed on.");
  b.card("FACT", "Name four ways of preserving indigenous culture.", "Teaching languages; family practice; festivals and culture days; museums and local-language media (also the arts).");
});
