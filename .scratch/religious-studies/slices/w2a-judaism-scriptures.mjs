// W2a: Jewish scriptures: Tanakh and Talmud.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.scriptures", { file: "judaism/scriptures", keyPrefix: "judaism.scriptures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Tanakh?",
    options: [
      ["The Hebrew Bible, the Jewish scriptures", "Correct: it has three parts, Torah, Nevi'im and Ketuvim."],
      ["The first five books of Moses, and nothing else", "That describes the Torah in its narrow sense."],
      ["The collection of rabbis' discussions", "That describes the Talmud."],
      ["The prayer book used on Friday evening", "The prayer book is the siddur."],
    ],
    answer: "A",
    explanation: "The **Tanakh** is the Hebrew Bible: **T**orah, **N**evi'im, **K**etuvim.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these books belongs to the Torah?",
    options: [
      ["Deuteronomy", "Correct: it is the fifth book of Moses."],
      ["Isaiah", "Isaiah belongs to the Nevi'im (Prophets)."],
      ["Lamentations", "Lamentations belongs to the Ketuvim (Writings)."],
      ["Esther", "Esther belongs to the Ketuvim (Writings)."],
    ],
    answer: "A",
    explanation: "The Torah has five books: Genesis, Exodus, Leviticus, Numbers and **Deuteronomy**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does the reader of the Torah use a pointer called a yad?",
    options: [
      ["To follow the words without touching the sacred writing", "Correct: it shows respect for the scroll."],
      ["To show the congregation which prayer comes next in the service", "The yad is for the reader's use at the scroll."],
      ["To turn the pages of the scroll as it is a book with pages", "The scroll is rolled; it does not have pages."],
      ["To mark the end of the reading for the rabbi who is following it", "The yad is not a signal to the rabbi."],
    ],
    answer: "A",
    explanation: "The **yad** keeps hands from touching the parchment, which shows respect for the Torah.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the Mishnah?",
    options: [
      ["The collected laws of the oral Torah, compiled about 200 CE", "Correct: it is the earliest part of the Talmud."],
      ["The five books of Moses written on a scroll by a scribe", "That is the written Torah."],
      ["A collection of the sayings of the prophets such as Isaiah", "That describes the Nevi'im."],
      ["A hymn that sums up the thirteen principles of faith", "That describes the Yigdal."],
    ],
    answer: "A",
    explanation: "The **Mishnah** was compiled about 200 CE. The Gemara, a discussion of it, together with the Mishnah makes the **Talmud**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do Jews believe that an oral Torah was needed as well as the written Torah?",
    options: [
      ["The written Torah is short and does not explain how every law is kept", "Correct: the oral tradition explains and applies it."],
      ["The written Torah was lost and had to be replaced from memory", "Jews do not teach that the written Torah was lost."],
      ["The Talmud was written before the Torah and gave it its authority", "The Talmud is later than the Torah."],
      ["The oral Torah is a translation of the Torah into the language of Babylon", "It is not a translation; it is an explanation and application."],
    ],
    answer: "A",
    explanation: "The written Torah gives laws but not every detail. The **oral Torah** explains how they are applied, and was later written down in the Mishnah and Talmud.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka sees Jewish worshippers dancing with the Torah scrolls in the synagogue as the yearly cycle of readings ends and begins again. Which festival is this?",
    options: [
      ["Simchat Torah", "Correct: it means Rejoicing in the Torah."],
      ["Rosh Hashanah", "Rosh Hashanah is the new year, not a day of dancing with the scrolls."],
      ["Purim", "At Purim the book of Esther is read."],
      ["Tisha B'Av", "Tisha B'Av is a day of mourning for the destruction of the Temples."],
    ],
    answer: "A",
    hints: ["Which festival has the Torah in its name?"],
    explanation: "On **Simchat Torah** the cycle of weekly readings is finished and begun again, and people dance with the scrolls.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the relationship between the Tanakh and the Christian Old Testament is accurate?",
    options: [
      ["They share most books, in a different order, but Jews do not accept the New Testament", "Correct: it states the overlap and the difference without ranking."],
      ["They share no books at all because the two traditions developed in completely different parts of the world", "Most books are shared."],
      ["Jews regard the Tanakh as an incomplete book that needs the New Testament", "Jews do not regard it as incomplete."],
      ["Christians do not use the Old Testament in their worship or teaching", "Christians read the Old Testament in worship, for example the Psalms."],
    ],
    answer: "A",
    hints: ["Think about both the shared books and the added New Testament."],
    explanation: "The Tanakh and the Old Testament share most content. Christians add the **New Testament**; Jews do not accept it as scripture.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What does the Talmud's practice of recording rabbis' differing opinions show about Judaism?",
    options: [
      ["Debate and questioning are valued in understanding the Torah", "Correct: opposing views are preserved, not hidden."],
      ["The rabbis could not agree about any matter of Jewish law", "They agreed on many matters; the recording of differences shows how study works."],
      ["Only one opinion in the Talmud is accepted and the others are forgotten", "The other opinions are preserved."],
      ["The Torah has been replaced by whichever opinion is the newest", "The Talmud explains the Torah and does not replace it."],
    ],
    answer: "A",
    hints: ["The Talmud is a record of discussion."],
    explanation: "The Talmud preserves arguments and minority views, which shows the Jewish value of **study and debate**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Torah scroll is written by hand by a trained scribe.",
    answer: true,
    explanation: "True. A scribe (sofer) writes it on parchment with care, following strict rules.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The word Torah always means only the five books of Moses.",
    answer: false,
    explanation: "False. In a narrow sense it means the five books, but in a wider sense it can mean all Jewish teaching, so a good answer says which sense is meant.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the Tanakh with an example.",
    pairs: [["Torah", "Genesis and Exodus"], ["Nevi'im", "Isaiah and Amos"], ["Ketuvim", "Psalms and Proverbs"], ["Talmud", "Mishnah and Gemara"]],
    explanation: "Torah: five books of Moses. Nevi'im: prophets. Ketuvim: writings. The Talmud is not a part of the Tanakh but rabbinic teaching.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The three parts of the Tanakh are the {{blank:a}}, the Nevi'im and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Torah"], choices: ["Torah", "Talmud", "Mishnah", "Haggadah"] },
      { id: "b", accepted: ["Ketuvim"], choices: ["Ketuvim", "Gemara", "Siddur", "Kaddish"] },
    ],
    explanation: "Torah, Nevi'im, Ketuvim: the initials give the word Tanakh.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The Talmud is made up of the {{blank:a}} and the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Mishnah"], choices: ["Mishnah", "Tanakh", "Siddur", "Parashah"] },
      { id: "b", accepted: ["Gemara"], choices: ["Gemara", "Ketuvim", "Haftarah", "Yad"] },
    ],
    hints: ["One is the law code and the other is the later discussion."],
    explanation: "The Talmud = **Mishnah** (law code) + **Gemara** (discussion).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the pointer used by a reader to follow the words on the Torah scroll.",
    accepted: ["yad", "Yad", "the yad"],
    wrong: ["mezuzah", "kippah"],
    explanation: "The reader follows the text with a **yad**, so the parchment is not touched.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which the Torah scroll is treated with respect.",
    points: ["It is written by hand by a trained scribe", "It is kept in the ark and carried in procession while people stand", "The reader uses a yad and does not touch the text"],
    modelAnswer: "It is handwritten by a trained scribe; it is kept in the ark and carried in procession while people stand; and the reader uses a yad so that the text is not touched.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the oral Torah and how it came to be written down.",
    points: [
      ["Jews believe that it was given to Moses at Sinai with the written Torah", 1],
      ["It explains how the commandments are to be applied", 1],
      ["It was handed down by teachers by word of mouth", 1],
      ["After the Second Temple was destroyed it was written in the Mishnah (about 200 CE) and the Talmud", 1],
    ],
    modelAnswer: "Jews believe that the oral Torah was given to Moses at Sinai with the written Torah and explains how the commandments are to be applied. It was handed down by teachers by word of mouth, and after the Second Temple was destroyed it was written down in the Mishnah and the Talmud.",
    hints: ["Say what it is, how it passed on and when it was written."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the Torah is important in the life of Jews today.",
    points: [
      ["It is read in the synagogue each week, in a cycle that lasts a year", 1],
      ["Developed: it shapes worship and brings the community together, as at Simchat Torah", 2],
      ["It contains the commandments that guide daily life", 1],
      ["Developed: Jews use it to guide the Sabbath, the food laws and the way they treat others", 2],
    ],
    modelAnswer: "The Torah is read in the synagogue each week in a cycle that lasts a year, which shapes worship and brings the community together, as at Simchat Torah. It also contains the commandments that guide daily life, and Jews use it to guide how they keep the Sabbath, eat and treat other people.",
    hints: ["Choose one reason about worship and one about daily life; develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, David (Jewish) and Chipo (Christian), in Harare, 2026",
      "Chipo: I saw the Torah scroll at your synagogue. The reader did not touch it with his hand.\nDavid: He used a yad. The scroll is handwritten and kept in the ark. We read a portion each week, and the Talmud explains how to apply the laws.\nChipo: Is the Tanakh the same as my Old Testament?\nDavid: Most of the books are the same, but in a different order. We do not use the New Testament."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "In Source A, what does David say the Talmud does?",
        options: [
          ["It explains how to apply the laws", "Correct: David says the Talmud explains the application of the laws."],
          ["It replaces the Torah with a newer text", "The Talmud does not replace the Torah."],
          ["It is the same as the New Testament", "David says Jews do not use the New Testament."],
          ["It is read only by the rabbi in the synagogue", "The source does not say this."],
        ],
        answer: "A", explanation: "According to David, the Talmud explains how to apply the laws.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, give **three** facts about the Torah scroll or the Tanakh.",
        points: ["The scroll is handwritten", "It is kept in the ark and read with a yad", "A portion is read each week; the Tanakh has most of the same books as the Old Testament"],
        modelAnswer: "The scroll is handwritten, kept in the ark and read with a yad; a portion is read each week; the Tanakh has most of the same books as the Old Testament, in a different order.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Jews do not use the New Testament.",
        points: [["It is the scripture of Christianity, not of Judaism", 1], ["Jews regard the Tanakh together with the oral Torah as their complete body of teaching", 1], ["Christians and Jews each follow their own scriptures, and each tradition is respected", 1]],
        modelAnswer: "The New Testament is the scripture of Christianity, not of Judaism. Jews regard the Tanakh together with the oral Torah as their complete body of teaching, and each tradition follows its own scriptures.",
      }),
    ],
    hints: ["In (c) describe the Jewish view without criticising the Christian one."],
    explanation: "The source shows the treatment of the scroll, the role of the Talmud and the relationship with the Old Testament.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"The written Torah is enough; the Talmud is only people's opinions.\" Miriam replies: \"Without the oral Torah and the Talmud we could not know how to keep the commandments.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the three parts of the Tanakh.",
        points: [["Torah: the five books of Moses", 1], ["Nevi'im: the prophets and historical books", 1], ["Ketuvim: the writings, such as Psalms and Proverbs", 1], ["The word Tanakh is made from the first letters of the three parts", 1]],
        modelAnswer: "The Torah is the five books of Moses. The Nevi'im are the historical books and the prophets. The Ketuvim are the writings, such as Psalms and Proverbs. The word Tanakh is made from the first letters of the three parts.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how the Talmud helps Jews to understand the Torah.",
        points: [["It records the rabbis' explanations of how the laws are applied", 2], ["It preserves different opinions and shows how to reason about the Torah", 2]],
        modelAnswer: "The Talmud records the rabbis' explanations of how the commandments are applied, for example how to keep the Sabbath. It also preserves different opinions, which shows Jews how to reason about the Torah and apply it to new situations.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Jews could not follow the Torah without the Talmud.",
        points: [["For: the Torah is short and does not explain every detail, for example what counts as work on the Sabbath", 2], ["For: the Talmud and the rabbis' commentary guide Jewish law over the centuries", 2], ["Against or limits: the Torah is read and loved on its own, and Jews differ in how much authority they give the Talmud", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The view has strong support. The Torah is short and does not explain every detail, such as exactly what counts as work on the Sabbath, so Jews rely on the Talmud and rabbis' commentary to apply it. However, the Torah is also read, loved and studied on its own, and Jews differ in how much authority they give the Talmud: Orthodox Jews treat it as binding, while many Reform Jews treat it as guidance. On balance most Jews could not apply the Torah in detail without the tradition of interpretation, although the Torah remains the foundation.",
      }),
    ],
    hints: ["Give reasons for the view, then the limits, then your judgement."],
    explanation: "A strong answer shows why interpretation is needed and notes the differences among Jews.",
  });

  b.card("DEFINITION", "What is the **Tanakh**?", "The Hebrew Bible: Torah (5 books), Nevi'im (Prophets), Ketuvim (Writings).");
  b.card("DEFINITION", "What is a **Sefer Torah**?", "A handwritten scroll of the five books of Moses, written by a scribe on parchment and read in the synagogue.");
  b.card("FACT", "What is a **yad**?", "A pointer used to follow the words on the Torah scroll without touching it.");
  b.card("DEFINITION", "What is the **oral Torah**?", "Teaching that Jews believe was given to Moses with the written Torah and handed down by word of mouth.");
  b.card("FACT", "What is the **Mishnah**?", "The collected laws of the oral Torah, compiled about 200 CE.");
  b.card("DEFINITION", "What is the **Talmud**?", "The Mishnah together with the Gemara, the rabbis' discussion of it.");
  b.card("FACT", "What happens at Simchat Torah?", "The yearly cycle of Torah readings ends and begins again, and people dance with the scrolls.");
  b.card("FACT", "Where is the Torah scroll kept in a synagogue?", "In the ark, the cabinet that faces Jerusalem.", "Worn scrolls are buried with respect.");
  b.card("CONCEPT", "How does the Tanakh relate to the Christian Old Testament?", "They share most books, arranged differently; Christians add the New Testament, which Jews do not use.");
});
