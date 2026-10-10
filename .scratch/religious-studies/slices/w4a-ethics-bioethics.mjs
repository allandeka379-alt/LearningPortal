// W4a: Religion and life issues. Reviewer notes: (1) the Termination of Pregnancy Act summary (danger to life or health,
// rape or incest, serious foetal abnormality; medical authorisation) is given in outline and should be checked against the
// current text; (2) no item states the current legal position on the death penalty in Zimbabwe, which has changed over time.
// MCQs test what each view says, never which view is right.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.bioethics", { file: "ethics/bioethics", keyPrefix: "ethics.bioethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the sanctity of life?",
    options: [
      ["The belief that human life is sacred and a gift of God", "Correct: so it has special value."],
      ["The belief that life is valuable only when a person is healthy", "That idea stresses quality of life, not sanctity."],
      ["The belief that life begins only when a child is born", "This is a view about when life begins, not the meaning of sanctity."],
      ["The belief that the family may decide any life matter alone", "This is not the meaning of sanctity of life."],
    ],
    answer: "A",
    explanation: "The **sanctity of life** is the belief that life is sacred, a gift of God, and must be protected.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is palliative care?",
    options: [
      ["Care that eases pain and gives comfort to a very ill person", "Correct: it does not aim to end life."],
      ["A medical act that ends a patient's life to stop suffering", "That describes active euthanasia."],
      ["A treatment that helps a couple to have a baby", "That describes treatment for infertility, such as IVF."],
      ["A legal process that allows a patient to refuse medical care", "This is not the meaning of palliative care."],
    ],
    answer: "A",
    explanation: "**Palliative care** eases pain and gives comfort. Religions that oppose active euthanasia usually support it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Qur'an verse teaches that saving one life is like saving all humanity?",
    options: [
      [ref("Qur'an", 5, 32), "Correct: this verse values every life."],
      [ref("Qur'an", 2, 183), "This verse prescribes fasting."],
      [ref("Qur'an", 1), "This is the opening surah, Al-Fatihah."],
      [ref("Qur'an", 112), "This is the surah on God's oneness."],
    ],
    answer: "A",
    explanation: `**${ref("Qur'an", 5, 32)}** says that whoever saves one life is as if he saved all humanity.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about active euthanasia is true of the four religions in the syllabus?",
    options: [
      ["They generally oppose it because life is a gift and killing is wrong", "Correct: all four stress the value of life."],
      ["They all teach that it is a duty when a person is very ill and in pain", "None teaches that."],
      ["They all teach that it is legal and encouraged in Zimbabwe", "It is not legal in Zimbabwe."],
      ["They all say that it is the same as palliative care", "Palliative care eases pain and does not end life."],
    ],
    answer: "A",
    explanation: "All four religions generally **oppose active euthanasia** and support palliative care. It is not legal in Zimbabwe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group refuses blood transfusions because of its understanding of a passage in the book of Acts?",
    options: [
      ["Jehovah's Witnesses", "Correct: members refuse transfusions on religious grounds."],
      ["Reform Jewish groups", "Reform Jews accept transfusions."],
      ["Sunni Muslim groups", "Most Muslims accept transfusions."],
      ["Roman Catholic groups", "The Catholic Church accepts transfusions."],
    ],
    answer: "A",
    explanation: "**Jehovah's Witnesses** understand Acts 15:28-29 to forbid blood. Most other religious groups accept transfusions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka, a Catholic, explains her church's teaching on family planning. Which statement is accurate?",
    options: [
      ["The Catholic Church teaches that couples should use only natural methods", "Correct: the church's teaching."],
      ["The Catholic Church requires every couple to use artificial methods", "The church does not teach this."],
      ["The Catholic Church teaches that family planning is forbidden in every form", "Natural methods are accepted."],
      ["The Catholic Church has no teaching on family planning at all", "It has a clear teaching."],
    ],
    answer: "A",
    hints: ["Recall the difference between natural and artificial methods."],
    explanation: "The Catholic Church teaches that couples should use only **natural** family planning; many Protestant churches accept other methods.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which pair of views on abortion is correctly matched to its religion?",
    options: [
      ["Judaism: permitted if the mother's life is in danger", "Correct: most Jewish teachers agree on this."],
      ["Judaism: forbidden even when the mother's life is in danger", "Most Jewish teachers permit it to save the mother."],
      ["Islam: always permitted for any reason in any stage of pregnancy", "Most scholars permit it only for serious reasons."],
      ["Indigenous Religion: strongly encouraged as a way of limiting the family", "Children are valued as a blessing."],
    ],
    answer: "A",
    hints: ["Think of which view is shared across Judaism's main groups."],
    explanation: "Most Jewish teachers agree that abortion is **permitted if the mother's life is in danger**. Views on other cases differ.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do religions often give different answers about IVF, even though they all value life?",
    options: [
      ["They apply the same value of life differently to creating life outside the body", "Correct: the same principle is applied differently."],
      ["They disagree about whether children are valuable to a family at all", "All value children."],
      ["They have no teaching on families, marriage or the creation of life at all", "They have many teachings."],
      ["They all follow exactly the same law about medicine in every country", "Religions follow their own traditions."],
    ],
    answer: "A",
    hints: ["Look for the answer that shows the same value being applied in different ways."],
    explanation: "Religions agree that life is valuable, but they **apply** that value differently to questions such as IVF, donor cells and surrogacy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Euthanasia is legal in Zimbabwe.",
    answer: false,
    explanation: "False. Euthanasia is not legal in Zimbabwe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Zimbabwean law allows abortion only in limited circumstances.",
    answer: true,
    explanation: "True. The Termination of Pregnancy Act allows abortion in limited circumstances, such as danger to the woman's life or health.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Quality of life", "The kind of life a person has, including pain and dignity"], ["Active euthanasia", "Acting to end the life of a suffering patient"], ["Surrogacy", "Another woman carries a child for a couple"], ["Palliative care", "Care that eases pain and gives comfort"]],
    explanation: "Each term is defined in the lesson.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The belief that life is a gift of God and must be protected is the {{blank:a}} of life; Christians cite {{blank:b}} 20:13, which forbids murder.",
    blanks: [
      { id: "a", accepted: ["sanctity"], choices: ["quality", "sanctity", "length", "cost"] },
      { id: "b", accepted: ["Exodus"], choices: ["Exodus", "Psalm", "Acts", "Matthew"] },
    ],
    explanation: "The **sanctity** of life; **Exodus** 20:13 forbids murder.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Zimbabwean law governs when an abortion is allowed? Give its name in two words after \"Termination of\".",
    accepted: ["Pregnancy Act", "Pregnancy"],
    wrong: ["Marriage Act", "Education Act"],
    explanation: "The **Termination of Pregnancy Act** allows abortion in limited circumstances.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** medical or life issues that raise questions for religions.",
    points: ["Abortion", "Euthanasia", "Organ donation, blood transfusion, IVF or contraception"],
    modelAnswer: "Abortion, euthanasia, and organ donation or blood transfusion all raise questions for religions.",
    explanation: "One mark for each issue.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the views of Islam and Judaism on abortion.",
    points: [["Islam: most scholars permit it only for serious reasons, such as saving the mother's life", 1], ["Islam: it is mainly accepted in early pregnancy, and views differ on when life is considered full", 1], ["Judaism: the unborn child is protected but not treated as a full person until birth in classical teaching", 1], ["Judaism: most teachers permit abortion if the mother's life is in danger, and views differ on other cases", 1]],
    modelAnswer: "In Islam most scholars permit abortion only for serious reasons, such as saving the mother's life, and mainly in early pregnancy, and views differ on when life is considered full. In Judaism the unborn child is protected but is not treated as a full person until birth in classical teaching, and most teachers permit abortion if the mother's life is in danger while views differ on other cases.",
    hints: ["Give a position and a condition for each religion."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why religions generally oppose active euthanasia.",
    points: [
      ["Life is a gift of God", 1],
      ["Developed: only God gives and takes life, so a person or doctor should not end it", 2],
      ["Killing is forbidden", 1],
      ["Developed: Exodus 20:13 and Qur'an 17:33 forbid taking life, and ending a patient's life would break this command", 2],
    ],
    modelAnswer: "Religions teach that life is a gift of God. Only God gives and takes life, so a person or doctor should not end it. Killing is also forbidden. Exodus 20:13 and Qur'an 17:33 forbid taking life, and ending a patient's life would break this command.",
    hints: ["One reason from the sanctity of life, one from the command not to kill."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a letter in a fictional newspaper in Harare, 2026",
      "My neighbour has been ill for a long time and his family are tired and worried. At church we talked about whether it is right to end the suffering of a person who cannot be cured. Our pastor said that we should care for him and ease his pain, but not end his life. A Muslim friend agreed, and a Jewish colleague said that his faith teaches that life has infinite value. I am still thinking about it."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what did the pastor say the family should do?",
        options: [
          ["Care for him and ease his pain, but not end his life", "Correct: this is what the pastor said."],
          ["End his life as soon as the family has agreed to it", "The pastor did not say this."],
          ["Move the neighbour to another country to find treatment", "The source does not say this."],
          ["Stop visiting the neighbour until he is better", "The source does not say this."],
        ],
        answer: "A", explanation: "The pastor said that they should care for him and ease his pain, but not end his life.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** views that were expressed.",
        points: ["The pastor said to care for him and ease his pain but not end his life", "A Muslim friend agreed", "A Jewish colleague said his faith teaches that life has infinite value"],
        modelAnswer: "The pastor said they should care for him and ease his pain but not end his life, a Muslim friend agreed, and a Jewish colleague said his faith teaches that life has infinite value.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the three speakers in Source A reach similar views.",
        points: [["All three religions teach that life is a gift", 1], ["They teach that killing is wrong, as in Exodus 20:13 and Qur'an 17:33", 1], ["They support care and the easing of pain (palliative care)", 1], ["So they distinguish easing suffering from ending life", 1]],
        modelAnswer: "All three religions teach that life is a gift, and that killing is wrong, as in Exodus 20:13 and Qur'an 17:33. They support care and the easing of pain, so they distinguish easing suffering from ending life.",
      }),
    ],
    hints: ["In (c) give the shared teaching and the practical care they support."],
    explanation: "The source shows agreement across religions on active euthanasia.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nokuthula says: \"Religions agree about life issues, because they all value life.\" Yusuf says: \"Religions disagree about many medical questions.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious views on contraception or IVF.",
        points: [["A first view, with the religion", 2, ["Catholic Church: only natural family planning; opposes IVF", "Many Protestant Christians: contraception and IVF accepted", "Islam: contraception allowed with the spouses' agreement; IVF accepted within marriage with the couple's own cells", "Judaism: help for infertile couples is generally supported"]], ["A second view, from a different religion or group", 2]],
        modelAnswer: "The Catholic Church teaches that couples should use only natural methods of family planning and it opposes IVF. Many Muslim scholars accept contraception with the agreement of both spouses and accept IVF within marriage using the couple's own cells.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Nokuthula and Yusuf.",
        points: [
          ["Nokuthula: all four religions value life as a gift and generally oppose active euthanasia", 2],
          ["Developed: they support palliative care and respect for the dying", 1],
          ["Yusuf: they differ on abortion, contraception, IVF, organ donation and blood transfusion", 2],
          ["Developed: views differ within each religion as well as between them (for example Catholic and other Christians)", 1],
          ["A supported conclusion, for example that they agree on principle and differ in application", 2],
        ],
        levels: levels(8),
        modelAnswer: "Nokuthula is right that all four religions value life as a gift. They generally oppose active euthanasia, and they support palliative care and respect for the dying.\n\nYusuf is also right that they differ on questions such as abortion, contraception, IVF and blood transfusion, and views differ within religions as well as between them, for example between Catholic and other Christians. I think both are partly right: the religions agree on the principle that life is valuable but differ in how to apply it to hard cases.",
        explanation: "Level marking: both views developed, with examples, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give where they agree and where they differ before judging."],
    explanation: "Practice question on agreement and disagreement among religions.",
  });

  b.card("DEFINITION", "What is the sanctity of life?", "The belief that human life is sacred, a gift of God, and must be protected.");
  b.card("DEFINITION", "What is the difference between active and passive euthanasia?", "Active: acting to end life. Passive: withholding or withdrawing treatment.");
  b.card("DEFINITION", "What is palliative care?", "Care that eases pain and gives comfort to a person who is very ill.");
  b.card("FACT", "Which Qur'an verse says that saving one life is like saving all humanity?", "Qur'an 5:32.");
  b.card("FACT", "What is the position of the Catholic Church on family planning?", "Couples should use only natural methods.");
  b.card("FACT", "Which group refuses blood transfusions, citing Acts 15:28-29?", "Jehovah's Witnesses.");
  b.card("CONCEPT", "On what circumstances does Zimbabwean law allow abortion?", "Only in limited circumstances, such as danger to the woman's life or health, rape or incest, or serious abnormality in the unborn child.");
  b.card("CONCEPT", "Why do religions with the same value of life give different answers on IVF?", "They apply the value differently to creating life outside the body, donor cells and surrogacy.");
});
