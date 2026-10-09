// W2a: Gender equity and equality in contemporary Zimbabwe (her.rights.gender-equality).
// Reviewer note: sections cited are 3 (founding values incl. gender equality), 17 (gender balance), 56 (equality and
// non-discrimination), 80 (rights of women); no statistics on women's representation are given.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.rights.gender-equality", { file: "rights/gender-equality", keyPrefix: "rights.gender-equality" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the difference between **sex** and **gender**?",
    options: [
      ["Sex is biological; gender is social and learned", "Correct: gender roles and expectations are learned."],
      ["Sex is learned; gender is biological", "This reverses the two terms."],
      ["They mean exactly the same thing", "They are different: one is biological, the other social."],
      ["Sex changes with fashion, while gender never changes at all", "Gender expectations change over time; sex is biological."],
    ],
    answer: "A",
    explanation: "Sex refers to biological differences; gender refers to the roles and expectations a society attaches to men and women.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement is a **gender stereotype**?",
    options: [
      ["Girls are not good at mathematics", "Correct: a fixed, over-simplified belief about girls."],
      ["Only women can give birth to children", "This is a biological fact about sex, not a stereotype."],
      ["Both boys and girls have a right to education", "This is a right, not a stereotype."],
      ["Some pupils in the class are taller than others", "This is not about gender at all."],
    ],
    answer: "A",
    explanation: "A stereotype is a fixed belief about what a group can do. Many girls excel at mathematics.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which body is an independent commission that monitors gender equality in Zimbabwe?",
    options: [
      ["the Zimbabwe Gender Commission", "Correct: it monitors gender equality and investigates complaints."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Zimbabwe Media Commission", "This commission deals with the media."],
      ["the National Peace and Reconciliation Commission", "This commission deals with peace and reconciliation."],
    ],
    answer: "A",
    explanation: "The Zimbabwe Gender Commission is one of the independent commissions in Chapter 12 of the Constitution.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which year was CEDAW, the UN convention on ending discrimination against women, adopted?",
    options: [
      ["1979", "Correct: CEDAW was adopted in 1979."],
      ["1989", "1989 is the UN Convention on the Rights of the Child."],
      ["2003", "2003 is the Maputo Protocol."],
      ["2008", "2008 is the SADC Protocol on Gender and Development."],
    ],
    answer: "A",
    explanation: "CEDAW 1979; Maputo Protocol 2003; SADC Protocol on Gender and Development 2008.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A college offers a free bridging course in technical drawing to girls who never studied it at school, so they can meet the same entry standard for engineering. This is an example of …",
    options: [
      ["gender equity", "Correct: extra support to reach equal opportunity."],
      ["gender discrimination", "Discrimination treats people unfairly; this removes a barrier."],
      ["a gender stereotype", "A stereotype is a fixed belief, not a support measure."],
      ["biological sex", "Sex is biological and unrelated to a course."],
    ],
    answer: "A",
    hints: ["Is the college giving extra support to reach a fair outcome?"],
    explanation: "Equity means fair measures, sometimes extra support, so that both sexes can reach equal opportunities.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A company pays Rudo less than Farai for exactly the same job because she is a woman. This is …",
    options: [
      ["gender discrimination", "Correct: unfair treatment because of sex."],
      ["gender equity", "Equity is fair treatment; this is unfair."],
      ["a gender role", "A gender role is an expected task, not unequal pay."],
      ["a reserved seat in Parliament", "Reserved seats are about representation in Parliament."],
    ],
    answer: "A",
    hints: ["Is the treatment fair?"],
    explanation: "Paying a woman less for the same work because of her sex is gender discrimination, contrary to section 56.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why can **unpaid care work** be a barrier to gender equality?",
    options: [
      ["It leaves many women less time for paid work, study or leadership", "Correct: time spent on care limits other opportunities."],
      ["It is illegal for women to do unpaid work", "There is no such law."],
      ["It increases the wages that women earn in formal employment", "It tends to reduce, not increase, time for paid work."],
      ["It is done equally by men and women in every household", "In many households women still do most of it."],
    ],
    answer: "A",
    hints: ["Think about how many hours are left in the day."],
    explanation: "Women often carry most of the cooking, caring and fetching water, which reduces the time available for paid work, study and leadership.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **most balanced** assessment of gender equality in Zimbabwe today?",
    options: [
      ["The law is strong, but attitudes and daily practice lag behind", "Correct: it weighs progress against barriers."],
      ["Full gender equality has been achieved in every area of life", "Overstated: barriers remain."],
      ["No progress has been made since independence", "Wrong: there has been progress in education, law and representation."],
      ["Gender equality is a matter that concerns women and girls only, not men", "Wrong: it concerns men and boys too."],
    ],
    answer: "A",
    hints: ["A balanced statement gives both progress and barriers."],
    explanation: "Zimbabwe has strong legal provisions and real progress, but stereotypes, violence, poverty and unpaid care work remain barriers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gender equality is one of the founding values of the Constitution of Zimbabwe.",
    answer: true,
    explanation: "True. Section 3 lists gender equality among the founding values and principles.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Gender equity and gender equality mean exactly the same thing.",
    answer: false,
    explanation: "False. Equality is the goal of equal rights and opportunities; equity is fair treatment, sometimes with extra support, to reach it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each provision or agreement with what it does.",
    pairs: [
      ["section 17 of the Constitution", "promotes gender balance in government institutions"],
      ["section 56 of the Constitution", "equality before the law and non-discrimination"],
      ["CEDAW", "UN convention to end discrimination against women"],
      ["Maputo Protocol", "African protocol on the rights of women in Africa"],
    ],
    explanation: "Section 17 (gender balance), section 56 (equality and non-discrimination), CEDAW (1979) and the Maputo Protocol (2003).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The SADC Protocol on Gender and Development was adopted in {{blank:a}}. The Maputo Protocol was adopted in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["2008"], choices: ["2008", "1979", "1992", "2013"] },
      { id: "b", accepted: ["2003"], choices: ["2003", "1963", "1989", "2008"] },
    ],
    explanation: "SADC Protocol on Gender and Development 2008; Maputo Protocol 2003; CEDAW 1979.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Reserving seats for women in the National Assembly is a measure of gender {{blank:a}} that aims at gender {{blank:b}} in representation.",
    blanks: [
      { id: "a", accepted: ["equity"], choices: ["equity", "equality", "stereotyping", "discrimination"] },
      { id: "b", accepted: ["equality"], choices: ["equality", "equity", "stereotyping", "discrimination"] },
    ],
    hints: ["Which is the means and which is the goal?"],
    explanation: "Reserved seats are an equity measure (special support) aimed at equality (equal representation).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the short name (abbreviation) of the 1979 UN Convention on the Elimination of All Forms of Discrimination against Women.",
    accepted: ["CEDAW"],
    wrong: ["SADC", "UNCRC"],
    explanation: "**CEDAW**: the Convention on the Elimination of All Forms of Discrimination against Women (1979).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** barriers to gender equality in Zimbabwe.",
    points: [
      "Any one of: cultural attitudes/stereotypes, gender-based violence, poverty, child marriage, unpaid care work, unequal access to land/credit/senior jobs, weak enforcement of laws, lack of awareness of rights",
      "A second barrier",
      "A third barrier",
      "A fourth barrier",
    ],
    modelAnswer: "Stereotypes, gender-based violence, poverty and unpaid care work.",
    explanation: "One mark per correct barrier.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which the Constitution promotes gender equality.",
    points: [
      "Identifies section 17 gender balance / reserved seats for women",
      "Explains that it increases women's representation in government and decision-making",
      "Identifies section 56 non-discrimination / section 80 / the Zimbabwe Gender Commission",
      "Explains the effect, e.g. unfair treatment because of sex is unlawful; customs that infringe women's rights are void; complaints can be investigated",
    ],
    modelAnswer: "Section 17 requires the state to promote gender balance, and seats in the National Assembly are reserved for women, which increases women's representation in decision-making. Section 56 forbids unfair discrimination on the grounds of sex or gender, so a woman paid less for the same work can challenge it, and the Zimbabwe Gender Commission can investigate complaints.",
    hints: ["Name the provision and say what it achieves."],
    explanation: "One mark for each provision and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a secondary school could promote gender equality, and explain each.",
    points: [
      "Suggests a practical measure, e.g. encouraging girls into science and technical subjects / boys into home economics",
      "Explains that this breaks stereotypes and widens career choices",
      "Suggests a second measure, e.g. sharing chores and leadership posts equally / gender clubs / careers days with role models of both sexes",
      "Explains that pupils learn that both sexes can lead and do any task",
    ],
    modelAnswer: "The school could encourage girls to take sciences and technical subjects and boys to take home economics, which breaks stereotypes and widens career choices. It could also share prefect posts and classroom duties equally and invite role models of both sexes to a careers day, so pupils learn that men and women can lead and do any job.",
    hints: ["Think of subjects, duties and role models."],
    explanation: "Credit sensible measures (1 each) with explanations (1 each).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the leadership of clubs at a fictional secondary school in Gweru in two years (invented for this question).\n\n" +
      table(["Year", "Clubs led by a girl", "Clubs led by a boy", "Total clubs"], [
        [2022, 3, 9, 12],
        [2026, 7, 7, 14],
      ]) + "\n\nIn 2023 the school began a mentoring scheme for girls and a rule that each club elects a chair and a vice-chair of different sexes.\n\nStudy the information and answer the questions.",
    parts: [
      P.fib({
        label: "(a)",
        stem: "Complete the sentence from the table.",
        template: "In 2022 girls led {{blank:a}} of the 12 clubs; by 2026 the number of clubs led by girls had risen to {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["3"], choices: ["3", "7", "9", "12"] },
          { id: "b", accepted: ["7"], choices: ["7", "3", "9", "14"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** equity measure described and the gender equality goal it supports.",
        points: ["Equity measure: mentoring scheme for girls / rule on chair and vice-chair of different sexes", "Goal: equal representation of girls and boys in leadership"],
        modelAnswer: "The mentoring scheme for girls, which supports equal representation of girls and boys in leadership.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** possible reasons, other than the school's measures, why girls may still be less likely to stand for leadership in some schools.",
        points: [
          "Stereotypes that leaders should be male",
          "so girls lack confidence or are discouraged by peers",
          "Heavier household chores / unpaid care work at home",
          "so girls have less time for clubs and meetings",
        ],
        modelAnswer: "Stereotypes that leaders should be boys may make girls less confident or lead peers to discourage them. Girls often have more household chores at home, so they have less time to attend club meetings and take on leadership roles.",
      }),
    ],
    hints: ["Read the table row by row before you explain."],
    explanation: "A data-based practice item (8 marks) on equity measures and leadership.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about gender and the law.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** international agreements that commit Zimbabwe to gender equality.",
        points: [
          ["CEDAW (1979): UN convention requiring states to end discrimination against women in law, politics, education, work and family life", 2],
          ["Maputo Protocol (2003) or SADC Protocol on Gender and Development (2008), with its main purpose", 2],
        ],
        modelAnswer: "CEDAW, adopted by the United Nations in 1979, requires states to end discrimination against women in law, politics, education, work, health and family life. The SADC Protocol on Gender and Development (2008) commits southern African states to gender equality in governance, education and the economy and to ending gender-based violence.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Laws alone cannot bring gender equality.\" How far do you agree?",
        points: [
          ["For: attitudes, stereotypes and customs change slowly; laws are not always known or enforced", 2],
          ["For: poverty and unpaid care work limit women regardless of the law", 2],
          ["Against: laws have made real changes (Legal Age of Majority Act, reserved seats, Domestic Violence Act, equal property rights) and set standards", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is strong support for the statement. Attitudes and stereotypes about what men and women should do change slowly, and many people do not know their rights or cannot afford to enforce them. Poverty and the burden of unpaid care work hold many women back whatever the law says.\n\nHowever, laws have made a real difference. The Legal Age of Majority Act made women legal adults, the Constitution reserves seats for women and forbids discrimination, the Domestic Violence Act protects victims, and women can own property and land. Laws also set a standard that shapes attitudes over time.\n\nI agree to a large extent. Laws are essential but not enough on their own; they must be combined with education, awareness, economic empowerment and changes in attitudes at home, at school and in communities.",
      }),
    ],
    hints: ["In (b), consider what laws have achieved and what they cannot change alone."],
    explanation: "A practice evaluative item on the role of law in gender equality.",
  });

  b.card("DEFINITION", "Gender", "The roles, behaviours and expectations a society considers suitable for men and women; learned and changeable.");
  b.card("DEFINITION", "Gender equality", "Women and men have the same rights, opportunities and dignity.");
  b.card("DEFINITION", "Gender equity", "Fair treatment of women and men, sometimes with extra support for the disadvantaged group, to reach equal outcomes.");
  b.card("DEFINITION", "Gender stereotype", "A fixed, over-simplified belief about what men or women are like or can do.");
  b.card("FACT", "Which sections of the Constitution deal with gender balance and with equality and non-discrimination?", "Section 17 (gender balance) and section 56 (equality and non-discrimination); section 80 covers women's rights.");
  b.card("FACT", "Give the years of CEDAW, the Maputo Protocol and the SADC Protocol on Gender and Development.", "CEDAW 1979, Maputo Protocol 2003, SADC Protocol 2008.");
  b.card("FACT", "What does the Zimbabwe Gender Commission do?", "Monitors gender equality, investigates complaints of gender discrimination and recommends action.");
  b.card("CONCEPT", "Name four barriers to gender equality.", "Stereotypes and attitudes, gender-based violence, poverty, unpaid care work (also unequal access to land and credit, weak enforcement).");
  b.card("CONCEPT", "Why is gender equality not only a women's issue?", "Stereotypes also limit men and boys, for example discouraging caring roles; equality benefits families and society.");
});
