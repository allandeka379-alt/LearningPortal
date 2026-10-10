// W4b: Children's rights and responsibilities (Topic 14.2).
// Reviewer notes: Constitution section 81 (including 81(2) best interests) and section 78 (marriage at 18) cited in outline;
// UNCRC 1989 and ACRWC 1990 (which lists duties of the child); Exodus 20:12, Deuteronomy 6:7, Ephesians 6:1-4,
// Mark 10:13-16 and Qur'an 17:23-24 are paraphrased. Sensitive content: no graphic detail; help channels are Childline 116, the
// police Victim Friendly Unit, a clinic and a trusted adult. The 116 number should be confirmed as current by the reviewer.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.rights.children", { file: "rights/children", keyPrefix: "rights.children" }, (b) => {
  mc(b, 1, "RECALL", "In the Constitution of Zimbabwe, a child is a person under what age?",
    ["18 years", "Correct: a child is a person under 18."],
    [["16 years", "16 is not the age used in the Constitution."],
     ["21 years", "21 was an older age of majority and is not used here."],
     ["14 years", "14 is not the age used in the Constitution."]],
    "A child is a person **under 18 years**.");
  mc(b, 1, "RECALL", "Which number can a child call to reach Childline Zimbabwe?",
    ["116", "Correct: Childline Zimbabwe is 116."],
    [["100", "This is not the Childline number."],
     ["150", "This is not the Childline number."],
     ["130", "This is not the Childline number."]],
    "Childline Zimbabwe is reached on **116**.");
  mc(b, 2, "UNDERSTANDING", "Which group of children's rights includes education and play?",
    ["Development", "Correct: education, play and rest support a child's development."],
    [["Survival", "Survival rights include life, health care and nutrition."],
     ["Protection", "Protection rights concern abuse, neglect and exploitation."],
     ["Participation", "Participation rights concern being heard in matters that affect the child."]],
    "Education, play and rest belong to the **development** rights.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which scripture reference commands Jews to honour their father and mother?",
    ["Exodus 20:12", "Correct: one of the Ten Commandments."],
    [["Exodus 20:8", "This is the commandment about the Sabbath."],
     ["Genesis 1:27", "This concerns humans made in God's image."],
     ["Deuteronomy 6:4", "This is the opening of the Shema."]],
    "**Exodus 20:12** commands honour for father and mother.");
  mc(b, 2, "UNDERSTANDING", "Which reference speaks mainly of the duty of fathers and parents towards their children?",
    ["Ephesians 6:4", "Correct: fathers are asked not to provoke their children but to bring them up with care."],
    [["Ephesians 6:1", "This verse asks children to obey their parents."],
     ["Exodus 20:12", "This commandment asks children to honour their parents."],
     ["Qur'an 17:23-24", "These verses command kindness to parents."]],
    "**Ephesians 6:4** speaks to fathers and parents about caring for their children.", { daily: true });
  mc(b, 3, "APPLICATION", "Rudo hears a friend say that she is afraid to go home because an adult hurts her. What should Rudo do?",
    ["Listen, tell her it is not her fault, and tell a trusted adult such as a teacher", "Correct: a trusted adult can contact Childline or the Victim Friendly Unit."],
    [["Promise to keep the secret and do nothing further about it", "Keeping the secret leaves the friend in danger."],
     ["Tell her that she must be at fault and should try to behave better", "Abuse is never the child's fault."],
     ["Laugh about it with other pupils so that the problem will be forgotten", "This would hurt the friend and not protect her."]],
    "The right response is to **listen, believe and tell a trusted adult**, who can contact Childline or the Victim Friendly Unit.",
    { hints: ["Think about who can protect the friend."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "a poster on a school wall, described in words; invented for this question",
    "The poster has two columns. The left column is headed \"My rights\" and lists the right to learn, the right to be safe and the right to be heard. The right column is headed \"My responsibilities\" and lists attending school, respecting teachers and respecting the property of others.", { described: true }) + "\n\nWhich statement is best supported by Source A?",
    ["The school teaches that rights come together with responsibilities", "Correct: the poster has a column for each."],
    [["The school teaches that children have rights but no responsibilities", "The poster lists responsibilities."],
     ["The school teaches that children have duties but no rights", "The poster lists rights."],
     ["The school teaches that rights are given only to the best pupils", "The poster does not say this."]],
    "The poster shows that **rights and responsibilities go together**.",
    { hints: ["Look at the two column headings."] });
  mc(b, 4, "EVALUATION", "Which conclusion about religion and children's rights is best supported?",
    ["Teachings support care and respect, but harmful customs must be changed", "Correct: religions teach care for children, while some customs defended as tradition harm them."],
    [["Religions have never said anything at all about how to treat children", "Religions have teachings on children and parents."],
     ["Every custom defended as religious is good for the children involved", "Child marriage and pledging are harmful."],
     ["Children's rights apply only to the children of one religious group", "Children's rights apply to every child."]],
    "Religious teachings **support care and respect**, and harmful customs such as child marriage must be changed to protect children.",
    { hints: ["Choose the answer that recognises both the support and the problem."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The African Charter on the Rights and Welfare of the Child also lists the duties of the child.",
    answer: true,
    explanation: "True. The African Charter (1990) is unusual in listing duties of the child as well as rights.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Religious teachings speak only about children's duties to parents and never about parents' duties to children.",
    answer: false,
    explanation: "False. Religions also teach parents to care for, teach and protect their children (for example Ephesians 6:4; Deuteronomy 6:7).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its description.",
    pairs: [
      ["Section 81 of the Constitution", "Rights of children, with their best interests paramount"],
      ["UN Convention on the Rights of the Child (1989)", "International treaty on survival, development, protection and participation"],
      ["African Charter on the Rights and Welfare of the Child (1990)", "African treaty that also lists duties of the child"],
      ["Childline Zimbabwe (116)", "A helpline where children can ask for help"],
    ],
    explanation: "Each item protects children in a different way.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Section {{blank:a}} of the Constitution sets out the rights of children, and children can call Childline on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["81"], choices: ["81", "78", "60", "56"] },
      { id: "b", accepted: ["116"], choices: ["116", "100", "150", "130"] },
    ],
    hints: ["Remember the key fact box."],
    explanation: "Section **81**; Childline **116**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the minimum age of marriage in Zimbabwe?",
    accepted: ["18", "eighteen", "18 years", "eighteen years"],
    wrong: ["16"],
    explanation: "The minimum age of marriage is **18** (Constitution, section 78).",
  });

  ms(b, 1, "RECALL", 3, "State **three** responsibilities of children.",
    ["To respect and obey parents and elders", "To attend school and respect teachers", "To help in the home and community, or to respect their religion and the beliefs of others"],
    "Children should respect and obey parents and elders, attend school and respect teachers, and help in the home and community.",
    "One mark for each responsibility.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe how religions teach respect between children and parents.",
    ["Children are told to honour or show kindness to their parents (Exodus 20:12; Qur'an 17:23-24; Ephesians 6:1)", "In Indigenous Religion children are taught respect for elders and ancestors",
     "Parents have a duty to care for, teach and protect their children (Ephesians 6:4; Deuteronomy 6:7)", "Jesus welcomed children (Mark 10:13-16), or Islam teaches parents to educate their children"],
    "Children are told to honour or show kindness to their parents, for example Exodus 20:12 and Qur'an 17:23-24, and in Indigenous Religion they are taught respect for elders and ancestors. Parents also have a duty to care for, teach and protect their children, as in Ephesians 6:4 and Deuteronomy 6:7.",
    "One mark for each point.",
    ["Cover the duty of children and the duty of parents."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** ways in which religious leaders can help to protect children from abuse.",
    [["They can teach that violence and abuse against children are wrong", 1], ["Developed: religious teaching has great influence, so members learn to respect and protect children", 2],
     ["They can tell children and families where to find help", 1], ["Developed: knowing about Childline (116) and the Victim Friendly Unit makes it easier to report abuse and get protection", 2]],
    "Religious leaders can teach that violence and abuse against children are wrong, and because religious teaching has great influence, members learn to respect and protect children. They can also tell children and families where to find help, and knowing about Childline (116) and the Victim Friendly Unit makes it easier to report abuse and get protection.",
    "Two ways, each stated and developed.",
    ["Think of teaching and of directing people to help."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice at a fictional church hall, Gweru, 2026",
      "Every Saturday the children's club meets at the hall. We teach reading and craft, and we remind every child of their right to be safe. Any child who is worried about something can speak to a club leader or call Childline on 116. Parents are asked to make sure that children arrive on time and respect the leaders.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which number does Source A give for a child who is worried?",
        ["116", "Correct: Childline."],
        [["100", "This number is not given in the notice."],
         ["150", "This number is not given in the notice."],
         ["130", "This number is not given in the notice."]],
        "The notice gives Childline's number, 116."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** ways in which the club helps children.",
        points: ["It teaches reading and craft", "It reminds every child of their right to be safe", "It tells children that they can speak to a leader or call Childline on 116"],
        modelAnswer: "It teaches reading and craft, it reminds every child of their right to be safe, and it tells children that they can speak to a leader or call Childline on 116.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the notice also asks parents to make sure that children arrive on time and respect the leaders.",
        points: [["Children have responsibilities as well as rights, such as respect and punctuality", 2], ["Parents have a duty to guide their children, and good conduct helps the club to run safely for all the children", 2]],
        modelAnswer: "Children have responsibilities as well as rights, such as respect and punctuality. Parents have a duty to guide their children, and good conduct helps the club to run safely for all the children.",
      }),
    ],
    hints: ["In (c) link the request to responsibilities."],
    explanation: "The notice shows rights and responsibilities in a religious setting.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Nyasha says: \"Religious teachings are the best protection for children.\" Themba says: \"Religious teachings can protect children, but customs defended as religion sometimes harm them, so the law is also needed.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** rights that children have in Zimbabwe.",
        points: [["Rights to family or parental care, education and health care (section 81)", 2], ["Protection from abuse, neglect and exploitation, and the principle that their best interests are paramount", 2]],
        modelAnswer: "Children have rights to family or parental care, education and health care under section 81. They are protected from abuse, neglect and exploitation, and their best interests are paramount.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which a religious teaching protects children.",
        points: [["Ephesians 6:4 asks parents not to provoke their children but to bring them up with care, or Deuteronomy 6:7 asks parents to teach them", 1], ["Developed: parents are reminded that they must care for children and not misuse their authority", 1], ["Jesus welcomed children (Mark 10:13-16), or Islam teaches that parents must care for and educate their children", 1], ["Developed: believers learn that children have worth and deserve protection", 1]],
        modelAnswer: "Ephesians 6:4 asks parents not to provoke their children but to bring them up with care, so parents are reminded that they must care for children and not misuse their authority. Jesus also welcomed children (Mark 10:13-16), so believers learn that children have worth and deserve protection.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess how far religious teachings protect the rights of children.",
        points: [["For: teachings on care, respect, education and protection in several religions", 2], ["For: religious leaders, schools, clubs and relief bodies that care for children and teach against abuse", 2], ["Against or limits: harmful customs defended as religion or tradition, such as child marriage and pledging; the law (sections 78 and 81) and agencies such as Childline are also needed", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious teachings protect children in many ways. Several religions teach parents to care for, teach and protect their children, and religious leaders, schools and clubs care for children and teach against abuse. However, some harmful customs, such as child marriage and pledging, are defended as religion or tradition, so the law (sections 78 and 81) and agencies such as Childline are also needed. I conclude that religious teachings give strong support for children's protection, but they work best together with the law and with agencies that can act quickly.",
      }),
    ],
    hints: ["Consider religion, the law and harmful customs in (c)."],
    explanation: "A strong answer weighs religious protection against harmful customs and the need for the law.",
  });

  b.card("DEFINITION", "Who is a **child** in the Constitution?", "A person under 18 years.");
  b.card("DEFINITION", "What is the **best interests of the child**?", "The principle that the child's welfare is the first consideration in every matter that concerns the child (section 81(2)).");
  b.card("FACT", "Which section of the Constitution of Zimbabwe sets out the rights of children?", "Section 81.");
  b.card("FACT", "Which four groups of rights are used to summarise the UN Convention on the Rights of the Child?", "Survival, development, protection and participation.");
  b.card("FACT", "Where can a child find help?", "A trusted adult, a clinic, the police Victim Friendly Unit, or Childline Zimbabwe (116).");
  b.card("FACT", "Which Qur'an verses command kindness to parents?", "Qur'an 17:23-24.");
  b.card("CONCEPT", "What are children's responsibilities?", "To the family (respect, help), to school (attend, respect teachers), to the community and to their religion.");
  b.card("CONCEPT", "Why do religious teachings on children speak to both children and parents?", "Children are to respect parents, and parents are to care for, teach and protect children (for example Ephesians 6:1-4).");
  b.card("CONCEPT", "Which harmful customs affect children, and what is the law?", "Child marriage and pledging; the minimum age of marriage is 18 and children are protected from exploitation.");
});
