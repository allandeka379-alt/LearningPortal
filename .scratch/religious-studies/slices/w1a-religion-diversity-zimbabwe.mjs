// W1a: religious diversity and tolerance in Zimbabwe (frs.religion.diversity-zimbabwe).
// Reviewer note: no population percentages are used; the lesson refers learners to ZIMSTAT census and survey reports.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.religion.diversity-zimbabwe", { file: "religion/diversity-zimbabwe", keyPrefix: "religion.diversity-zimbabwe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of the Constitution of Zimbabwe 2013 protects freedom of conscience, including religion and belief?",
    options: [
      ["Section 60", "Correct: section 60 protects freedom of conscience, including freedom of religion and belief."],
      ["Section 56", "Section 56 deals with equality and non-discrimination."],
      ["Section 78", "Section 78 deals with marriage rights."],
      ["Section 75", "Section 75 deals with the right to education."],
    ],
    answer: "A",
    explanation: "**Section 60** protects freedom of conscience, which includes thought, opinion, religion and belief. Section 56 protects equality and non-discrimination.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is meant by **religious tolerance**?",
    options: [
      ["Respecting the right of others to hold beliefs that differ from yours", "Correct: tolerance means respect for others' freedom, not agreement with their beliefs."],
      ["Agreeing that every religion teaches exactly the same things about God", "Tolerance does not require agreement or the claim that all religions are the same."],
      ["Giving up your own religion so that no differences remain between groups", "Tolerance does not mean abandoning your own beliefs."],
      ["Persuading members of other religions to change to your own religion", "That is proselytising, not tolerance."],
    ],
    answer: "A",
    explanation: "**Religious tolerance** is respect for people's right to different beliefs. You can disagree with a belief and still respect the person's freedom to hold it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which description best fits the way Family and Religious Studies teaches about religions?",
    options: [
      ["Multi-faith and non-confessional: it describes religions without asking for belief", "Correct: the subject describes and understands beliefs fairly."],
      ["Confessional: it teaches one religion as the true one and asks learners to join it", "The subject is not confessional and does not ask learners to join a religion."],
      ["Anti-religious: it teaches that religions are mistaken and should be given up", "The subject respects religions and does not argue against them."],
      ["Limited to Christianity because that is the religion of most Zimbabweans", "The subject covers Indigenous Religion, Judaism, Christianity and Islam."],
    ],
    answer: "A",
    explanation: "The subject is **multi-faith**, **non-confessional** and **non-proselytising**: learners describe and understand beliefs; they are not asked to change their own.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a religion practised by a small community in Zimbabwe's towns?",
    options: [
      ["The Bahá'í faith", "Correct: the Bahá'í faith is among the smaller faiths with communities in Zimbabwe."],
      ["Greek mythology", "That is not a religion practised by communities in Zimbabwe."],
      ["The Roman state cult", "That ancient religion is not practised in Zimbabwe today."],
      ["Ancient Egyptian religion", "That ancient religion is not practised in Zimbabwe today."],
    ],
    answer: "A",
    explanation: "Smaller faiths in Zimbabwe include Hinduism and the Bahá'í faith, alongside Judaism, Islam and the larger Christian and Indigenous traditions.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Aisha is a Muslim, and her classmate Nokuthula is a member of an apostolic church. Nokuthula asks her what Ramadan is, listens carefully and says she will not eat in front of Aisha during the fast. Which idea is **best** shown?",
    options: [
      ["Religious tolerance between learners of different faiths", "Correct: Nokuthula learns and respects without having to share the belief."],
      ["Religious syncretism, the blending of two faiths into a new one", "Syncretism is the blending of practices; neither learner changes her faith."],
      ["Proselytising, in which one learner urges the other to change faith", "Nobody is trying to convert the other."],
      ["Fundamentalism, a refusal to listen to different views at all", "Nokuthula is listening, which is the opposite of fundamentalism."],
    ],
    answer: "A",
    hints: ["Does either learner change her beliefs, or try to change the other's?"],
    explanation: "Showing interest and respect without giving up one's own belief is **tolerance**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The Tonga family of Rudo holds a service at church for a relative who has died and later holds a ceremony for the spirit of the deceased. Which term do scholars use for the blending of practices from different traditions in this way?",
    options: [
      ["Syncretism", "Correct: syncretism is the blending of practices from different religious traditions."],
      ["Pluralism", "Pluralism is respect for several religions side by side."],
      ["Secularism", "Secularism is the separation of religion from public life."],
      ["Monotheism", "Monotheism is belief in one God."],
    ],
    answer: "A",
    hints: ["Which word means mixing or blending?"],
    explanation: "**Syncretism** means the blending of practices from different traditions. Describe it neutrally: some leaders welcome it and others do not.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about freedom of religion under section 60 of the Constitution is best supported?",
    options: [
      ["It protects belief and practice, but not harm to the rights of others", "Correct: rights are exercised with respect for the rights of other people."],
      ["It allows a person to do anything at all, so long as it is done in the name of religion", "Rights are not unlimited; they may not be used to harm others."],
      ["It protects only the largest religion, since the state supports the majority", "Section 60 protects all persons, not only the largest group."],
      ["It obliges every school to teach learners to accept and follow a single religion", "Section 60 protects freedom of conscience; it does not compel belief."],
    ],
    answer: "A",
    hints: ["Think about what happens when one person's religious practice harms another."],
    explanation: "Freedom of religion is a right for everyone, so it cannot be used to harm others. For example, practices that abuse children are not protected.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which is the **strongest** reason why religious tolerance matters in a mixed community such as a school?",
    options: [
      ["It protects every learner's dignity and keeps the peace between groups", "Correct: respect for dignity and peace is a central reason for tolerance."],
      ["It ensures that all learners will in time come to hold the same religious beliefs", "Tolerance does not aim at making everyone the same."],
      ["It allows the largest group to decide the beliefs that everyone must follow", "That would undermine, not protect, freedom of conscience."],
      ["It proves that the beliefs of different religions are in fact all identical", "Religions differ; tolerance is about respect, not sameness."],
    ],
    answer: "A",
    hints: ["Think about how learners feel when their beliefs are mocked."],
    explanation: "Tolerance protects dignity and peace and allows learners to learn from each other without being forced to change.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Judaism, Islam and Christianity are all practised in Zimbabwe today.",
    answer: true,
    explanation: "True. Alongside Indigenous Religion, Christianity (in many denominations), Islam and Judaism all have communities in Zimbabwe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Religious tolerance means that you must agree with the beliefs of other religions.",
    answer: false,
    explanation: "False. Tolerance means respecting the right of others to hold different beliefs. You can respect people without sharing their beliefs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Religious pluralism", "Accepting and valuing several religions side by side"],
      ["Interfaith dialogue", "Respectful conversation between people of different religions"],
      ["Syncretism", "Blending of practices from different traditions"],
      ["Non-confessional", "Teaching about religions without asking learners to hold a belief"],
    ],
    explanation: "Pluralism accepts several religions; interfaith dialogue is conversation across faiths; syncretism is blending; non-confessional teaching describes without asking for belief.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Freedom of conscience and religion is protected in section {{blank:a}} of the Constitution of Zimbabwe 2013, and equality and non-discrimination in section {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["60"], choices: ["60", "56", "75", "81"] },
      { id: "b", accepted: ["56"], choices: ["56", "60", "78", "251"] },
    ],
    explanation: "Section **60** protects freedom of conscience and religion; section **56** protects equality and non-discrimination.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the national agency whose census and survey reports should be used for figures on religious affiliation in Zimbabwe. Give its short name.",
    accepted: ["ZIMSTAT", "Zimstat", "Zimbabwe National Statistics Agency"],
    wrong: ["ZINATHA", "ZIMSEC"],
    explanation: "**ZIMSTAT**, the Zimbabwe National Statistics Agency, publishes census and survey figures. Name the year when quoting them.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "Name **three** religions or religious traditions found in Zimbabwe.",
    points: ["Indigenous Religion", "Christianity (or Islam)", "Any one of: Islam, Judaism, Hinduism, the Bahá'í faith (a third different tradition)"],
    modelAnswer: "Indigenous Religion, Christianity and Islam.",
    explanation: "One mark for each tradition correctly named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why religious tolerance is important in Zimbabwe.",
    points: [
      "Identifies: it protects the right to freedom of conscience and religion in section 60 of the Constitution",
      "Develops: everyone can hold and practise their belief without being forced or punished",
      "Identifies: it keeps peace in families, schools and communities with several faiths",
      "Develops: respect reduces prejudice, discrimination and conflict between groups",
    ],
    modelAnswer: "Tolerance protects the right to freedom of conscience and religion in section 60 of the Constitution, so everyone can hold and practise their belief without being forced to change. It also keeps the peace in families, schools and communities that include several faiths, because respect reduces prejudice and conflict.",
    hints: ["Think of the Constitution and of a mixed family or class."],
    explanation: "Two marks for each reason: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which learners of different religions in a school can show respect for each other.",
    points: [
      "Suggests e.g. learning about each other's festivals or fasting (such as Ramadan)",
      "Explains: understanding reduces misunderstanding and prejudice",
      "Suggests e.g. allowing time and a quiet place for prayer, or not mocking beliefs or dress",
      "Explains: this protects each learner's dignity and right to practise their faith",
    ],
    modelAnswer: "Learners can find out about each other's festivals and practices, such as why a classmate fasts in Ramadan, which reduces misunderstanding and prejudice. They can also avoid mocking beliefs or dress and respect a classmate's need for time and a quiet place for prayer, which protects each learner's dignity and right to practise their faith.",
    hints: ["Think of Ramadan, prayer times and dress."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a fictional school magazine article, Bindura, 2026",
      "Our school has Christian, Muslim and Indigenous Religion families, and one learner whose family is Jewish. During Ramadan the Muslim learners were given a quiet room at lunch time. On Heritage Day, learners explained to one another the ceremonies their families keep. One learner said, \"I learnt that we all teach respect for our elders, even though we pray differently.\" The headmaster said that every learner has the freedom to follow their own belief.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which term best describes the way different religions exist side by side in the school in Source A?",
        options: [
          ["Religious diversity", "Correct: several religions are present in one community."],
          ["Religious conflict", "Nothing in the source describes conflict."],
          ["Confessional teaching", "The source does not describe teaching of a single religion."],
          ["Exploitation", "Nobody is being misused in the source."],
        ],
        answer: "A",
        explanation: "The presence of many religions in one place is **religious diversity**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** actions in Source A that show respect for learners' religions.",
        points: ["Giving Muslim learners a quiet room at lunch during Ramadan", "Learners explaining their family ceremonies to each other (or the headmaster's statement about freedom of belief)"],
        modelAnswer: "Muslim learners were given a quiet room during Ramadan, and learners explained their family ceremonies to each other.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the learner's comment shows the value of learning about other religions.",
        points: [
          "The learner discovered something that different religions share (respect for elders)",
          "Learning about others reduces misunderstanding and prejudice",
          "It shows that people can differ in worship and still share values, which builds respect",
        ],
        modelAnswer: "The learner found out that religions with different prayers still teach respect for elders. Learning about other religions reduces misunderstanding and prejudice, and it shows that people can differ in how they worship yet share values, which builds respect.",
      }),
    ],
    hints: ["In (c), what did the learner learn that the religions have in common?"],
    explanation: "A source on diversity and respect in a school.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on religion and tolerance in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline **two** rights that section 60 of the Constitution of Zimbabwe 2013 gives to every person.",
        points: [
          "Freedom of thought, opinion, religion and belief",
          "Freedom to practise and express that religion or belief in public or private, alone or with others",
          "Freedom from being forced to take an oath that is contrary to one's religion or belief",
          "Any accurate further detail developing one of the rights",
        ],
        modelAnswer: "Everyone has freedom of thought, opinion, religion and belief. They may practise and express their religion in public or in private, alone or with others, and may not be forced to take an oath that is contrary to their belief.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Religious tolerance is more important than religious agreement in a country with many religions.\" Discuss.",
        points: [
          ["For: tolerance protects dignity, peace and constitutional rights without requiring everyone to change; religions differ in core beliefs, so agreement is unrealistic", 2],
          ["For: example from Zimbabwe (mixed families, schools or interfaith projects such as joint relief work)", 2],
          ["Against / limits: some shared values (e.g. care for the needy, respect for elders) help cooperation; tolerance needs knowledge and dialogue to work; tolerance has limits when practices harm others", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I agree that tolerance matters more than agreement. Religions differ in their central beliefs, so expecting agreement is unrealistic, but tolerance lets people of all faiths live together. It protects the dignity of every person and the rights in section 60 of the Constitution, without asking anyone to give up their faith. In Zimbabwe, mixed families and schools, and interfaith projects such as joint relief work after floods, show tolerance working.\n\nOn the other hand, shared values such as care for the needy and respect for elders help religions to cooperate, and tolerance works best when it is built on knowledge and dialogue. Tolerance also has limits: it does not protect practices that harm others.\n\nOverall, tolerance is the more important of the two because it is realistic and protects everyone's rights, while dialogue about shared values makes it stronger.",
      }),
    ],
    hints: ["In (b), give a reason for, a reason against or a limit, then decide."],
    explanation: "Outline the rights in section 60 (a) and discuss tolerance and agreement (b).",
  });

  b.card("DEFINITION", "Religious pluralism", "Accepting and valuing the existence of several religions side by side, with each given respect and equal protection.");
  b.card("DEFINITION", "Religious tolerance", "Respecting the right of others to hold and practise beliefs different from your own, even if you do not share them.");
  b.card("DEFINITION", "Interfaith dialogue", "Respectful conversation and cooperation between people of different religions, aimed at understanding, not converting.");
  b.card("DEFINITION", "Non-confessional (as a school subject)", "Teaching about religions without asking learners to hold, or give up, any belief.");
  b.card("FACT", "Which section of the Constitution of Zimbabwe 2013 protects freedom of conscience and religion?", "Section 60.");
  b.card("FACT", "Which section of the Constitution of Zimbabwe 2013 protects equality and non-discrimination?", "Section 56.");
  b.card("FACT", "Name the main religions and traditions found in Zimbabwe.", "Indigenous Religion, Christianity (many denominations), Islam, Judaism, and smaller faiths such as Hinduism and the Bahá'í faith.");
  b.card("CONCEPT", "Why is religious tolerance important?", "It protects constitutional rights and dignity, keeps peace in mixed families, schools and communities, and reduces prejudice and conflict.");
  b.card("CONCEPT", "Does tolerance mean agreeing with other religions?", "No. It means respecting people's right to hold different beliefs. You can disagree and still respect the person.");
});
