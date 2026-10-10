// W4a: Moral decision-making and contemporary moral issues.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.moral-decision", { file: "ethics/moral-decision", keyPrefix: "ethics.moral-decision" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is conscience?",
    options: [
      ["A person's inner sense of right and wrong", "Correct: it guides decisions."],
      ["A written list of laws kept by the community", "That describes law or scripture, not conscience."],
      ["A rule made by a school headmaster", "That is a school rule, not conscience."],
      ["The payment made for a bride by her husband's family", "That is roora or lobola."],
    ],
    answer: "A",
    explanation: "**Conscience** is a person's inner sense of right and wrong. Many religions teach that it should be informed by teaching and reflection.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is corruption?",
    options: [
      ["Misusing a position of trust for personal gain", "Correct: the definition."],
      ["Giving a gift to a friend on a special occasion", "A gift is not corruption."],
      ["Working hard to earn an honest wage", "That is honest work."],
      ["Helping a neighbour whose house has been damaged", "That is service to others."],
    ],
    answer: "A",
    explanation: "**Corruption** is misusing a position of trust for personal gain, for example by taking or giving a bribe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible passage says that a bribe blinds those who see clearly?",
    options: [
      [ref("Exodus", 23, 8), "Correct: bribes pervert justice."],
      [ref("Genesis", 2, 24), "This verse is about marriage."],
      [ref("Psalm", 23), "This is the psalm of the shepherd."],
      [ref("Luke", 15), "This chapter contains the parable of the lost son."],
    ],
    answer: "A",
    explanation: `**${ref("Exodus", 23, 8)}** warns that a bribe blinds officials and perverts justice.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which religion forbids gambling clearly in Qur'an 5:90?",
    options: [
      ["Islam", "Correct: the verse tells Muslims to avoid gambling and intoxicants."],
      ["Judaism", "The verse is in the Qur'an, not the Torah."],
      ["Indigenous Religion", "The verse is in the Qur'an."],
      ["Christianity", "The verse is in the Qur'an."],
    ],
    answer: "A",
    explanation: "**Qur'an 5:90** tells Muslims to avoid gambling and intoxicants.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which source of moral guidance is shown when a learner returns a found purse because it feels wrong to keep it?",
    options: [
      ["Conscience", "Correct: an inner sense of right and wrong."],
      ["Consequences", "This would involve weighing the results, which is not described."],
      ["Religious authority", "No leader is mentioned."],
      ["Situation ethics", "No rule is set aside."],
    ],
    answer: "A",
    explanation: "The learner is guided by **conscience**, an inner sense of right and wrong (Romans 2:15).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A learner receives a message with a damaging story about a classmate and, remembering Qur'an 49:6, decides to check whether it is true before sharing. Which principle is shown?",
    options: [
      ["Verifying news before passing it on", "Correct: the verse teaches verification."],
      ["Spreading news quickly so that others are warned", "The verse teaches the opposite."],
      ["Ignoring the news because it is too hard to understand", "The learner acts, not ignores."],
      ["Passing the story on only to close friends", "That still spreads an unverified story."],
    ],
    answer: "A",
    hints: ["Recall what Qur'an 49:6 says about news that comes from an unreliable source."],
    explanation: "**Qur'an 49:6** teaches believers to verify news before acting on it, which applies to rumours on social media.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement best describes situation ethics?",
    options: [
      ["The loving action in the situation is right, even if a rule is set aside", "Correct: love is the guide."],
      ["Every moral rule must be applied in exactly the same way in every situation", "That is a rule-based view."],
      ["The right action is whichever one the group chooses by voting at the end of a meeting", "This is not situation ethics."],
      ["Moral decisions should be based only on what the law allows", "Situation ethics looks to love, not law alone."],
    ],
    answer: "A",
    hints: ["Think of the word 'love' in Joseph Fletcher's view."],
    explanation: "**Situation ethics** says that the loving action in the particular situation is right, even if this means setting a rule aside.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason best explains why religions condemn corruption?",
    options: [
      ["It betrays trust, harms the poor and goes against teaching on justice", "Correct: moral and social reasons."],
      ["It helps officials to work faster, but is not allowed by religious leaders", "It does not help people fairly."],
      ["It is a matter only for government and not for religious teaching", "Religions teach about justice."],
      ["It is only condemned in countries where the law forbids it", "Religions condemn it whatever the law."],
    ],
    answer: "A",
    hints: ["Look for the answer that gives both the harm and the teaching."],
    explanation: "Religions condemn **corruption** because it betrays trust, harms the poor, and breaks teaching on justice and honesty (Exodus 23:8; Qur'an 2:188).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most people use only one source of guidance when making a moral decision.",
    answer: false,
    explanation: "False. Most people use several sources together, such as scripture, conscience, advice and the likely results.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Many Christian churches discourage gambling because it can promote greed and lead to poverty.",
    answer: true,
    explanation: "True. Many churches discourage gambling, citing teaching such as 1 Timothy 6:10 on the love of money.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reference with its teaching.",
    pairs: [["Exodus 20:15", "Do not steal"], ["Exodus 23:8", "A bribe blinds officials"], ["Qur'an 2:188", "Do not take others' wealth wrongly or bribe judges"], ["Qur'an 49:12", "Avoid backbiting and spying"]],
    explanation: "Each reference is explained in the lesson.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Christian writer Joseph Fletcher is associated with {{blank:a}} ethics; the Shona and Ndebele values of respect and community are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["situation"], choices: ["situation", "ancestral", "military", "financial"] },
      { id: "b", accepted: ["unhu/ubuntu"], choices: ["unhu/ubuntu", "roora/lobola", "bira/umbuyiso", "mutupo/isibongo"] },
    ],
    explanation: "**Situation** ethics; **unhu/ubuntu** is the value of respect and community.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Shona word names the values of respect, sharing and responsibility in the community? (one word)",
    accepted: ["Unhu", "Hunhu"],
    wrong: ["Roora", "Mutupo"],
    explanation: "**Unhu** (also hunhu) is the Shona word; the Ndebele word is ubuntu.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** sources of guidance that people use when making a moral decision.",
    points: ["Scripture", "Conscience or reason", "Advice from religious leaders or elders, unhu, or the likely consequences"],
    modelAnswer: "People use scripture, conscience or reason, and advice from religious leaders or elders and the likely consequences.",
    explanation: "One mark for each source.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why bullying is wrong according to religious teaching.",
    points: [
      ["It breaks the command to love one's neighbour (Leviticus 19:18)", 1],
      ["Developed: it hurts the victim, who is a person made in the image of God or deserving respect", 1],
      ["It goes against respect and the dignity of others (Qur'an 49:11; unhu)", 1],
      ["Developed: mockery and cruelty damage the community and the bully's own character", 1],
    ],
    modelAnswer: "Bullying breaks the command to love one's neighbour (Leviticus 19:18), because it hurts the victim, who deserves respect. It also goes against the respect and dignity of others taught by Qur'an 49:11 and unhu, and mockery and cruelty damage the community and the bully's own character.",
    hints: ["Give a teaching and say what harm it prevents."],
    explanation: "One mark for each reason and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which a believer could use religious teaching to decide how to behave on social media.",
    points: [
      ["Truthfulness", 1],
      ["Developed: Exodus 20:16 forbids false testimony, so a believer should not post lies or rumours", 2],
      ["Verifying news and respecting others", 1],
      ["Developed: Qur'an 49:6 and 49:12 teach checking news and avoiding backbiting, so a believer should not forward unverified stories or insult others", 2],
    ],
    modelAnswer: "A believer should be truthful. Exodus 20:16 forbids false testimony, so the believer should not post lies or rumours. A believer should also verify news and respect others. Qur'an 49:6 and 49:12 teach checking news and avoiding backbiting, so the believer should not forward unverified stories or insult others.",
    hints: ["Give one teaching about truth and one about respect or verification."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students at a school in Gwanda, 2026",
      "Nyasha: \"A police officer at the roadblock told my uncle that he could avoid a fine if he paid the officer some money quietly. My uncle said no. He said that his church teaches honesty and that a bribe harms everyone.\"\nSipho: \"But he was in a hurry and the fine would have cost more. Would it not have been easier to pay?\"\nNyasha: \"Maybe, but my uncle said that if everyone paid bribes, nothing would be fair.\""
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, why did Nyasha's uncle refuse to pay?",
        options: [
          ["His church teaches honesty, and a bribe harms everyone", "Correct: this is the reason given."],
          ["He did not have enough money with him", "The source does not say this."],
          ["He wanted to argue with the police officer about the fine", "The source does not say this."],
          ["He was afraid of what his family would say", "The source does not say this."],
        ],
        answer: "A", explanation: "Nyasha says that her uncle's church teaches honesty and that a bribe harms everyone.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** points made in the conversation.",
        points: ["The officer suggested a quiet payment to avoid a fine", "The uncle refused because his church teaches honesty", "Sipho said it would have been easier to pay, but Nyasha said that if everyone paid bribes nothing would be fair"],
        modelAnswer: "The officer suggested a quiet payment to avoid a fine, and the uncle refused because his church teaches honesty. Sipho said it would have been easier to pay, but Nyasha said that if everyone paid bribes, nothing would be fair.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the uncle's decision uses more than one source of moral guidance.",
        points: [["Religious teaching: his church teaches honesty, as in Exodus 23:8", 1], ["Conscience: he felt that paying would be wrong", 1], ["Consequences: he thought about the harm if everyone paid bribes", 1], ["Unhu or fairness to the whole community", 1]],
        modelAnswer: "His church teaches honesty, and Exodus 23:8 warns against bribes. His conscience told him paying would be wrong. He thought about the consequences, that nothing would be fair if everyone paid bribes, which also shows concern for the community and unhu.",
      }),
    ],
    hints: ["In (c) name at least three sources of guidance."],
    explanation: "The uncle's decision combines teaching, conscience and consequences.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"Conscience is the best guide to a moral decision.\" Fatima says: \"Scripture and religious teaching are more reliable than conscience.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** sources of moral guidance that believers use.",
        points: [["A first source, with a brief explanation", 2, ["Scripture, such as the Ten Commandments or the Qur'an", "Conscience, an inner sense of right and wrong", "Elders or religious leaders", "Unhu/ubuntu, the community's values"]], ["A second source, with a brief explanation", 2]],
        modelAnswer: "Believers use scripture, such as the Ten Commandments or the Qur'an, which gives commands and examples. They also use conscience, an inner sense of right and wrong that helps them decide in a particular situation.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Farai and Fatima.",
        points: [
          ["Farai: conscience is personal and immediate, and Romans 2:15 suggests that people have an inner moral sense", 2],
          ["Limit: conscience can be wrong, uninformed or influenced by selfish desires or by a bad upbringing", 1],
          ["Fatima: scripture and teaching give clear, shared standards, tested over time", 2],
          ["Limit: texts need interpretation, and believers may apply them differently to new issues such as social media", 1],
          ["A supported conclusion, for example that the two work best together", 2],
        ],
        levels: levels(8),
        modelAnswer: "Farai is right that conscience is personal and immediate, and Romans 2:15 suggests that people have an inner moral sense. However, conscience can be wrong or uninformed, or influenced by selfish desires.\n\nFatima is right that scripture and teaching give clear, shared standards that have been tested over time. But texts need interpretation, and believers may apply them differently to new issues such as social media. I think the two work best together: scripture and teaching inform the conscience, and conscience applies them to the situation.",
        explanation: "Level marking: both views developed, with strengths and limits, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give a strength and a limit for each view."],
    explanation: "Practice question on sources of moral guidance.",
  });

  b.card("DEFINITION", "What is conscience?", "A person's inner sense of right and wrong, which guides decisions.");
  b.card("DEFINITION", "What is situation ethics?", "The view that the loving action in the particular situation is right, even if a rule is set aside.");
  b.card("DEFINITION", "What is corruption?", "Misusing a position of trust for personal gain, for example by taking or giving a bribe.");
  b.card("FACT", "Which verse says that a bribe blinds officials?", "Exodus 23:8.", "Qur'an 2:188 also forbids bribing judges.");
  b.card("FACT", "Which Qur'an verses teach verifying news and avoiding backbiting?", "Qur'an 49:6 and 49:12.");
  b.card("FACT", "Which religion forbids gambling in Qur'an 5:90?", "Islam.");
  b.card("CONCEPT", "Name four sources of guidance for a moral decision.", "Scripture, religious authority, conscience, reason (also consequences, situation ethics, unhu).");
  b.card("CONCEPT", "What questions can a believer ask before posting on social media?", "Is it true? Is it kind? Is it necessary? Could it harm someone?");
});
