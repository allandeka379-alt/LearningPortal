// W2a: Men and women in marriage (her.culture.men-women-marriage).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.culture.men-women-marriage", { file: "culture/men-women-marriage", keyPrefix: "culture.men-women-marriage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an indigenous marriage, which task was usually the husband's?",
    options: [
      ["herding cattle and building huts", "Correct: herding and building were men's tasks."],
      ["grinding grain and cooking meals", "These were mainly women's tasks in the indigenous household."],
      ["caring for newborn babies", "Care of babies was mainly the mother's role."],
      ["teaching girls household skills", "Mothers and aunts taught girls household skills."],
    ],
    answer: "A",
    explanation: "Indigenous roles were divided by sex: men herded, hunted, built and protected; women farmed, processed food and cared for children.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a **shared responsibility** in many contemporary marriages?",
    options: [
      ["making decisions about the family budget", "Correct: many couples now decide on money together."],
      ["representing the family at the dare/inkundla", "This was the indigenous role of the husband alone."],
      ["looking after the wife's own field (tseu)", "The tseu was the wife's own field in indigenous society."],
      ["leading the bride to her husband's home", "This is the aunt's role in marriage practices, not a spouse's shared duty."],
    ],
    answer: "A",
    explanation: "In many contemporary families both spouses earn income and decide together how to spend it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which law made every Zimbabwean, including women under customary law, a legal adult at 18?",
    options: [
      ["the Legal Age of Majority Act (1982)", "Correct: it set 18 as the age of majority for everyone."],
      ["the Domestic Violence Act (2007)", "This Act protects people from domestic violence."],
      ["the Land Apportionment Act (1930)", "This colonial Act divided land by race."],
      ["the Environmental Management Act", "This Act deals with the environment, not legal age."],
    ],
    answer: "A",
    explanation: "Before 1982 many African women were treated as minors under customary law. The Legal Age of Majority Act made everyone a legal adult at 18.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka, a bank clerk, and her husband Sipho, a builder, both work long hours. Sipho now cooks three nights a week. Which cause of changing roles does this show **most clearly**?",
    options: [
      ["employment of both spouses", "Correct: when both work, housework must be shared."],
      ["the decline of the go-between system", "The go-between deals with marriage negotiations, not household tasks."],
      ["the payment of bride wealth in money", "This changes roora/lobola, not who cooks."],
      ["the growth of tourism in Victoria Falls", "Tourism is unrelated to this household's division of tasks."],
    ],
    answer: "A",
    hints: ["Why does Sipho need to cook?"],
    explanation: "When both spouses are in paid work, neither has the whole day for housework, so tasks are shared.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does **equality of spouses** under the Constitution mean?",
    options: [
      ["Husband and wife have equal rights and obligations", "Correct: this is what section 26 aims for."],
      ["Husband and wife must earn exactly the same income", "Equality is about rights and obligations, not identical earnings."],
      ["Husband and wife must do exactly the same tasks", "Equality does not mean sameness of tasks."],
      ["The husband decides and the wife carries out the decisions", "This describes unequal authority, not equality."],
    ],
    answer: "A",
    hints: ["Equality is about rights and duties, not identical tasks."],
    explanation: "The Constitution aims for equal rights and obligations of spouses during marriage and when it ends. Couples may still divide tasks by agreement.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did urbanisation lead many husbands to share childcare?",
    options: [
      ["Relatives who once helped with children often live far away", "Correct: smaller urban households lose the extended family's help."],
      ["Town councils have by-laws that require all fathers to stay at home and care for children", "There is no such council rule; the change is social, not a by-law."],
      ["Children in towns no longer need any adult care", "Children in towns still need care; the question is who provides it."],
      ["Urban families have more cattle that must be herded", "Urban families seldom keep cattle; this would not lead to sharing childcare."],
    ],
    answer: "A",
    hints: ["Who helped with children in a rural extended family?"],
    explanation: "In towns, families live in smaller households, often far from grandparents and aunts, so both parents must share the care of children.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement gives the **most balanced** view of the indigenous division of roles in marriage?",
    options: [
      ["Each role was valued, but men held most of the authority", "Correct: it recognises the value of both roles and the unequal authority."],
      ["Women's roles had no value in indigenous society", "Wrong: women's farming, food and childcare roles were essential."],
      ["Indigenous roles were perfect and should never change", "One-sided: it ignores unequal authority and modern needs."],
      ["Indigenous husbands did no work in the household at all", "Wrong: men herded, built, cleared fields and protected the family."],
    ],
    answer: "A",
    hints: ["A balanced view gives a strength and a weakness."],
    explanation: "The indigenous division gave each spouse respected, essential duties, but authority over cattle, land and big decisions lay mainly with men.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In indigenous society, a wife often had her own field (tseu) whose produce she controlled.",
    answer: true,
    explanation: "True. The tseu was the wife's own field, one of her indigenous entitlements.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Equality of spouses means that husband and wife must do exactly the same household tasks.",
    answer: false,
    explanation: "False. Equality means equal rights and obligations. Couples can still divide tasks by agreement.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of changing roles with its effect on marriage.",
    pairs: [
      ["education of girls", "more wives qualify for professional jobs"],
      ["urbanisation", "smaller households far from relatives who helped with children"],
      ["the Legal Age of Majority Act", "women became legal adults at 18"],
      ["rising cost of living", "many households need two incomes"],
    ],
    explanation: "Each cause changes roles in a different way: qualifications, household size, legal status and economic need.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Section {{blank:a}} of the Constitution aims for equal rights and obligations of spouses. The Legal Age of Majority Act was passed in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["26"], choices: ["26", "81", "162", "6"] },
      { id: "b", accepted: ["1982"], choices: ["1982", "1965", "2007", "2013"] },
    ],
    explanation: "Section 26 (a national objective on marriage) and the Legal Age of Majority Act of 1982. Section 81 is children's rights; section 162 lists the courts; section 6 names the languages.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the description and complete the sentence.",
    template: "A wife who works full time and still does all the cooking, cleaning and childcare carries what is sometimes called a {{blank:a}}. A fair solution is for the couple to {{blank:b}} household tasks.",
    blanks: [
      { id: "a", accepted: ["double burden"], choices: ["double burden", "bride wealth", "tseu", "dare"] },
      { id: "b", accepted: ["share"], choices: ["share", "abandon", "pay for", "ignore"] },
    ],
    hints: ["Two kinds of work at once."],
    explanation: "Paid work plus all the unpaid housework is a 'double burden'. Sharing tasks reduces it.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **two** roles of the husband and **two** roles of the wife in indigenous marriage.",
    points: [
      "Husband: any one of: head of household, herding cattle, hunting, building/repairing huts and granaries, clearing fields, protecting the family, representing the family at the dare",
      "Husband: a second different role",
      "Wife: any one of: planting/weeding/harvesting, processing and storing food, cooking, caring for children, teaching girls, caring for the sick, caring for the tseu",
      "Wife: a second different role",
    ],
    modelAnswer: "Husband: herding cattle and building huts. Wife: processing and storing food and caring for young children.",
    explanation: "One mark per correct role in each column.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the roles of men and women in marriage are changing.",
    points: [
      "Identifies education / employment of women",
      "Explains that women earn income, so both spouses share providing and housework",
      "Identifies the law (Legal Age of Majority Act, Constitution) / urbanisation",
      "Explains the effect, e.g. women have equal legal rights in decisions and property / smaller urban households force sharing",
    ],
    modelAnswer: "Many women are now educated and employed, so they earn income; as a result both spouses provide for the family and share housework. The law has also changed: the Legal Age of Majority Act and the Constitution give women equal rights, so wives now share decisions about money and property.",
    hints: ["Give a cause and its effect on the marriage."],
    explanation: "One mark for each reason and one for the developed effect.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A couple in Kariba often quarrel because the husband expects his working wife to do all the housework. Suggest **two** ways they could resolve the conflict, and explain each.",
    points: [
      "Suggests agreeing a fair division of household tasks / a timetable",
      "Explains that sharing reduces the wife's double burden and resentment",
      "Suggests seeking counselling from aunts and uncles or a religious/marriage counsellor",
      "Explains that trusted counsellors can listen to both sides and help them agree",
    ],
    modelAnswer: "They could sit down and agree a fair division of tasks, for example taking turns to cook, which reduces the wife's double burden and the resentment that causes quarrels. They could also ask their aunt and uncle, or a church marriage counsellor, to help: trusted counsellors listen to both sides and help the couple reach an agreement.",
    hints: ["One practical arrangement and one source of advice."],
    explanation: "Credit sensible suggestions (1 each) with explanations (1 each).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the results of an invented survey of 40 married couples in a fictional Bulawayo suburb (invented for this question).\n\n" +
      table(["Task", "Mainly the wife", "Mainly the husband", "Shared"], [
        ["Cooking", 25, 3, 12],
        ["Childcare", 21, 2, 17],
        ["Paying school fees", 6, 14, 20],
        ["Deciding on major purchases", 4, 9, 27],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.fib({
        label: "(a)",
        stem: "Complete the sentence from the table.",
        template: "The task most often shared is {{blank:a}}, and the task most often done mainly by the wife is {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["deciding on major purchases"], choices: ["deciding on major purchases", "cooking", "childcare", "paying school fees"] },
          { id: "b", accepted: ["cooking"], choices: ["cooking", "deciding on major purchases", "paying school fees", "childcare"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** sign of change and **one** sign of continuity in roles shown by the table.",
        points: ["Change: most couples share decisions on major purchases / many share school fees or childcare", "Continuity: cooking is still mainly done by wives / few husbands do housework alone"],
        modelAnswer: "Change: 27 of the 40 couples share decisions on major purchases. Continuity: cooking is still mainly the wife's task in 25 couples.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** possible reasons why decisions are shared more often than cooking.",
        points: [
          "Wives now earn income, so they expect a say in how money is spent",
          "Law and education support equal rights in decisions and property",
          "Cooking is still seen by many as a woman's task (older expectations)",
          "Husbands may not have learned cooking skills as boys / socialisation",
        ],
        modelAnswer: "Many wives earn income and the law gives spouses equal rights, so they expect and get a say in how money is spent. Cooking, however, is still seen by many families as a woman's task, and many husbands were not taught to cook as boys, so older patterns continue in the kitchen.",
      }),
    ],
    hints: ["Compare the 'Shared' column across the tasks."],
    explanation: "A data-based practice item (8 marks): read the table, identify change and continuity, explain the pattern.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about changing roles in marriage.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** positive effects of shared roles in marriage.",
        points: [
          ["More family income / better provision for children's education and health", 2],
          ["Joint decisions reflect both spouses' views; women's confidence and independence grow; partnership strengthens the marriage", 2],
        ],
        modelAnswer: "When both spouses earn and share costs, the family has more income, so children's school fees and health care are easier to meet. Joint decisions also reflect both spouses' views, which builds trust and partnership and increases women's confidence.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Changing roles have weakened marriage in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: conflict when spouses expect different roles; the double burden on working wives; less time with children", 2],
          ["For: some feel respect for the husband as head has weakened", 2],
          ["Against: more income, joint decisions, partnership and legal equality strengthen many marriages", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. When one spouse expects the old roles and the other expects new ones, quarrels follow. Many working wives still carry a double burden of paid work and housework, and parents who both work long hours may have less time for children. Some people also feel that respect for the husband as head of the family has weakened.\n\nHowever, changing roles have also strengthened many marriages. Two incomes protect families against hardship, joint decisions build trust, and legal equality protects wives from being treated as minors. Many couples describe their marriage as a partnership in which respect is mutual.\n\nI disagree with the statement to a large extent. The problems come mainly from couples who have not agreed how to share roles, not from the changes themselves. Where spouses communicate and share tasks fairly, changing roles strengthen marriage.",
      }),
    ],
    hints: ["In (b), are the problems caused by the change itself or by how couples handle it?"],
    explanation: "A practice evaluative item on the effects of changing roles in marriage.",
  });

  b.card("DEFINITION", "Shared responsibility (in marriage)", "A duty both spouses carry out together or take turns to do, such as earning income, childcare or deciding on money.");
  b.card("DEFINITION", "Equality of spouses", "Husband and wife have equal rights and obligations during marriage and when it ends (section 26 of the Constitution).");
  b.card("FACT", "What did the Legal Age of Majority Act (1982) do?", "Made every person, including women under customary law, a legal adult at 18.");
  b.card("FACT", "Name three indigenous roles of a husband.", "Any three of: head of household, herding cattle, hunting, building huts and granaries, clearing fields, protecting the family.");
  b.card("FACT", "Name three indigenous roles of a wife.", "Any three of: planting and harvesting, processing and storing food, cooking, caring for children, teaching girls, caring for the sick.");
  b.card("CONCEPT", "Give four reasons why roles in marriage are changing.", "Education, employment of women, changes in the law, urbanisation (also religion, the media and economic pressure).");
  b.card("DEFINITION", "Double burden", "When a spouse (usually a working wife) does paid work and still carries all or most of the unpaid housework.");
  b.card("CONCEPT", "Does equality of spouses mean they do identical tasks?", "No. It means equal rights and obligations; couples may divide tasks by agreement.");
});
