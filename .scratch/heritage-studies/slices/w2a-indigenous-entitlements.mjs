// W2a: Entitlements of men and women in indigenous society (her.rights.indigenous-entitlements).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.rights.indigenous-entitlements", { file: "rights/indigenous-entitlements", keyPrefix: "rights.indigenous-entitlements" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the **mother's cow** (mombe yeumai / inkomo yohlanga)?",
    options: [
      ["A beast from a daughter's bride wealth that belonged to her mother", "Correct: it honoured the mother and was her own property."],
      ["A cow paid by the groom to the chief to gain permission to marry", "Bride wealth goes to the bride's family, not to the chief."],
      ["The first cow a young man received when he came of age", "The mother's cow belongs to the mother, not to a young man."],
      ["A cow that was slaughtered for the mourners at the funeral of a woman's husband", "This is not the mother's cow."],
    ],
    answer: "A",
    explanation: "The mother's cow came from her daughter's bride wealth. It and its offspring belonged to the mother.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What was a **tseu**?",
    options: [
      ["a wife's own field whose produce she controlled", "Correct: the tseu was the wife's field."],
      ["the husband's main maize field farmed by everyone", "This was the family's main field, controlled by the husband."],
      ["the chief's field farmed by the whole community", "This is zunde ramambo, the chief's field."],
      ["a grazing area for the village cattle", "Grazing land was shared; the tseu was a woman's field."],
    ],
    answer: "A",
    explanation: "The tseu was a field given to a wife. She grew crops such as groundnuts and round nuts and controlled what she harvested.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was an indigenous entitlement of a **man** as head of the household?",
    options: [
      ["land allocated by the chief or village head", "Correct: men were allocated land for homestead, fields and grazing."],
      ["the mother's cow from his daughter's bride wealth", "The mother's cow belonged to the mother, not the father."],
      ["the produce of his wife's tseu", "The tseu's produce belonged to the wife."],
      ["property his wife earned through pottery (mavoko)", "Mavoko property belonged to the woman who earned it."],
    ],
    answer: "A",
    explanation: "Land was allocated to men as heads of households; the mother's cow, the tseu and mavoko property were women's.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did children in indigenous society take their father's totem?",
    options: [
      ["It gave them a clear identity and place in his clan", "Correct: the totem placed the child in the father's clan."],
      ["It allowed them to inherit their mother's cow and its calves", "The mother's cow passed differently and has nothing to do with the totem."],
      ["It meant they could marry anyone in the same clan", "The opposite: people of the same totem could not marry."],
      ["It made them owners of the family's land at birth", "Land was allocated to adult men, not owned by children at birth."],
    ],
    answer: "A",
    explanation: "Giving the family its name and totem was one of a man's entitlements; it placed children in the father's clan.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo sells clay pots she makes and keeps the money for her children's school uniforms. Under Shona customary practice, this money is …",
    options: [
      ["mavoko property, which belongs to her", "Correct: property earned through a woman's own skills is hers."],
      ["part of her husband's cattle wealth", "It is not cattle, and it belongs to her, not her husband."],
      ["roora that must be paid to her parents", "Roora is bride wealth paid by a groom's family."],
      ["the chief's share for allowing her to trade", "There is no such share; the earnings are hers."],
    ],
    answer: "A",
    hints: ["Whose skill earned the money?"],
    explanation: "Mavoko property is what a woman earns through her own skills, such as pottery or midwifery; it is hers to use.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the mother's cow important for a woman's **security**?",
    options: [
      ["It gave her property of her own that could not simply be taken by others", "Correct: it was hers, protected by custom."],
      ["It allowed her to become the head of the household and replace her husband", "The cow did not change who headed the household."],
      ["It meant she no longer needed to work in the fields", "Women continued to farm; the cow was additional property."],
      ["It made her a member of her husband's clan", "A wife kept her own clan and totem; the cow did not change that."],
    ],
    answer: "A",
    hints: ["What happens to a person who has property of her own in hard times?"],
    explanation: "The mother's cow and its offspring were her own; in hard times she could use them to support herself and her children.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains how indigenous entitlements encouraged cooperation between husband and wife?",
    options: [
      ["Each spouse controlled something the household needed, so they depended on each other", "Correct: mutual dependence encouraged cooperation."],
      ["The husband controlled everything, so the wife simply obeyed", "Wrong: women had entitlements of their own."],
      ["The wife controlled everything, so the husband had no role", "Wrong: men had authority, land and cattle."],
      ["Entitlements were decided by the colonial government, so families had no say in them at all", "Indigenous entitlements came from custom, not government."],
    ],
    answer: "A",
    hints: ["Think about what each spouse controlled."],
    explanation: "Because the husband controlled land and most cattle and the wife controlled her field, her kitchen and her own property, each needed the other.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **most balanced** judgement of women's entitlements in indigenous society?",
    options: [
      ["Women had real property and respect, but depended on men for land and big decisions", "Correct: it weighs strengths and limits."],
      ["Women owned nothing and had no say at all", "Wrong: women had the mother's cow, the tseu, the kitchen and mavoko property."],
      ["Women had exactly the same entitlements as men", "Wrong: men had authority, land and most cattle."],
      ["Women's entitlements were greater than those of the chief, so women ruled the village", "Wrong and exaggerated."],
    ],
    answer: "A",
    hints: ["A balanced judgement gives a strength and a limitation."],
    explanation: "Women had genuine entitlements, but authority, land and most cattle lay with men, so a balanced view gives both.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In indigenous society, the kitchen was regarded as the wife's own domain.",
    answer: true,
    explanation: "True. The kitchen was the wife's hut and space, which gave her authority and respect in the homestead.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Constitution today, only men may own land in their own names.",
    answer: false,
    explanation: "False. Women and men have equal rights to own property, including land, and equal access to land is a national objective.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indigenous entitlement with the person who held it.",
    pairs: [
      ["mombe yeumai / inkomo yohlanga", "the mother of a married daughter"],
      ["speaking for the family at the dare", "the husband as head of household"],
      ["the produce of the tseu", "the wife who farmed it"],
      ["giving children the family totem", "the father"],
    ],
    explanation: "The mother's cow and the tseu were women's entitlements; authority at the dare and passing on the totem were men's.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The Ndebele name for the mother's cow is {{blank:a}}. The mother's cow came from a {{blank:b}}'s bride wealth.",
    blanks: [
      { id: "a", accepted: ["inkomo yohlanga"], choices: ["inkomo yohlanga", "isivulamlomo", "umthimba", "ilima"] },
      { id: "b", accepted: ["daughter"], choices: ["daughter", "son", "chief", "neighbour"] },
    ],
    explanation: "Inkomo yohlanga (mombe yeumai in Shona) comes from a daughter's bride wealth. Isivulamlomo opens marriage talks; umthimba is handing over the bride; ilima is a work party.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the comparison.",
    template: "In indigenous society, land was allocated mainly to {{blank:a}}. Today the Constitution aims for equal access to land for {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["men"], choices: ["men", "children", "women", "foreigners"] },
      { id: "b", accepted: ["women and men"], choices: ["women and men", "chiefs only", "men only", "war veterans only"] },
    ],
    hints: ["Gender balance is a national objective."],
    explanation: "The chief allocated land to men as heads of households; today equal access to land for women and men is a national objective (section 17).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona word for a wife's own field.",
    accepted: ["tseu", "tseu field", "a tseu"],
    wrong: ["zunde", "dare"],
    explanation: "**Tseu** is the wife's field. Zunde ramambo is the chief's field; the dare is the court of elders.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **two** indigenous entitlements of women and **two** of men.",
    points: [
      "Women: any one of: mother's cow (mombe yeumai/inkomo yohlanga), tseu, the kitchen, mavoko property, respect and protection",
      "Women: a second different entitlement",
      "Men: any one of: authority as head, land, cattle, tools/weapons, inheritance/heirship, giving the family name and totem",
      "Men: a second different entitlement",
    ],
    modelAnswer: "Women: the mother's cow and the tseu. Men: land allocated by the chief and authority as head of the household.",
    explanation: "One mark per correct entitlement in each group.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the tseu was important to a woman and her children.",
    points: [
      "Identifies food / income that she controlled",
      "Explains that she could feed her children or sell produce for their needs without asking permission",
      "Identifies independence / security / helping relatives",
      "Explains that in hard times she had resources of her own / could support her own family and earn respect",
    ],
    modelAnswer: "The tseu gave a woman food and income that she controlled, so she could feed her children or sell groundnuts for their needs without asking permission. It also gave her security: in hard times she had resources of her own and could help her relatives, which earned her respect.",
    hints: ["Think about food, money and independence."],
    explanation: "One mark for each reason and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Compare women's property in indigenous society with women's property rights today. Give **two** similarities or differences and a conclusion.",
    points: [
      ["Difference: then, women owned particular items (mother's cow, tseu produce, mavoko); now women may own any property, including land, in their own names", 2],
      ["Difference: then, land and most cattle were under men's control and many women were legal minors; now everyone is an adult at 18 and spouses have equal rights", 2],
      ["Similarity / conclusion: both recognise women's own property; the law today gives fuller and enforceable protection, while many families still honour indigenous entitlements", 2],
    ],
    modelAnswer: "In indigenous society, women owned particular items such as the mother's cow, the produce of the tseu and mavoko property; today women may own any property, including land, in their own names. Then, land and most cattle were controlled by men and many women were treated as minors; now everyone is an adult at 18 and spouses have equal rights. Both systems recognise that women can own property, but the law today gives fuller protection that can be enforced in court, while many families still honour indigenous entitlements such as the mother's cow.",
    hints: ["Use 'then' and 'now' for each point."],
    explanation: "Two marks per developed comparison and two for a supported conclusion.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "an account by a fictional grandmother, recorded for a school heritage project in Bindura, 2026",
      "When my daughter married, her husband's family gave a heifer for me. That heifer has given me five calves. With my groundnuts from my own field I paid for my son's first school uniform. My husband never sold my cattle without asking me, and when he died, my brothers made sure my cattle stayed with me.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.fib({
        label: "(a)",
        stem: "Complete the sentence.",
        template: "The heifer given to the grandmother is called the {{blank:a}}.",
        blanks: [{ id: "a", accepted: ["mombe yeumai / inkomo yohlanga"], choices: ["mombe yeumai / inkomo yohlanga", "vhuramuromo / isivulamlomo", "rutsambo", "zunde ramambo"] }],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** other entitlements of women shown in the source.",
        points: ["Her own field (tseu) and its produce", "Protection by her own family / her husband needing her agreement to sell her cattle"],
        modelAnswer: "Her own field (tseu), and the protection of her cattle by her brothers after her husband's death.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how these entitlements benefited the grandmother and her children.",
        points: [
          "Her own cattle grew into wealth / security she controlled",
          "Income from her field paid for her son's education",
          "After her husband's death her property was protected, so she was not left destitute",
        ],
        modelAnswer: "Her cattle multiplied into wealth that she controlled. The groundnuts from her own field paid for her son's school uniform, helping his education. When her husband died, her brothers protected her cattle, so she was not left with nothing.",
      }),
    ],
    hints: ["In (c), think of wealth, education and widowhood."],
    explanation: "A source-based practice item (6 marks) on women's indigenous entitlements.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous entitlements and contemporary rights.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** indigenous entitlements of men.",
        points: [
          ["Authority as head of household / speaking for the family at the dare", 2],
          ["Land allocated by the chief / most cattle / tools / giving children the totem / heirship", 2],
        ],
        modelAnswer: "As head of the household a man had authority and spoke for the family at the dare. He was allocated land by the chief or village head for his homestead, fields and grazing.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Women were better protected by indigenous entitlements than they are by the law today.\" How far do you agree?",
        points: [
          ["For: mother's cow, tseu, kitchen and mavoko gave real property; families enforced customs; women's families protected them", 2],
          ["Against: land, most cattle and decisions lay with men; many women were legal minors; widows could lose property", 2],
          ["Against: today equal rights to property, land and decisions; adults at 18; enforceable in court; Master of the High Court", 2],
          ["Supported judgement, e.g. the law gives fuller protection, though enforcement and awareness are not perfect", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is some support for the statement. Indigenous entitlements gave women real property: the mother's cow and its calves, the produce of the tseu, the kitchen and mavoko property. These were respected by custom, and a woman's own family would step in if she was mistreated.\n\nHowever, the protection was limited. Land and most cattle were controlled by men, husbands had final authority, and many women were treated as minors under customary law. Widows could be pressured to give up property.\n\nToday the law gives women equal rights to own property and land, everyone is a legal adult at 18, spouses have equal rights, and these rights can be enforced in court. The weakness is that some women do not know their rights or cannot afford to enforce them.\n\nI disagree with the statement. Indigenous entitlements gave important but partial protection; the law today gives fuller protection, although awareness and enforcement must improve.",
      }),
    ],
    hints: ["In (b), compare what was protected then and what is protected now."],
    explanation: "A practice evaluative item comparing indigenous entitlements with contemporary rights.",
  });

  b.card("DEFINITION", "Entitlement", "Something a person has a recognised claim to, by custom or by law, because of their position in society.");
  b.card("FACT", "What is mombe yeumai / inkomo yohlanga?", "The mother's cow: a beast from a daughter's bride wealth that belongs to the mother.");
  b.card("DEFINITION", "Tseu", "A wife's own field, where she grew crops such as groundnuts and round nuts and controlled the produce.");
  b.card("DEFINITION", "Mavoko property", "In Shona customary practice, property a woman earns through her own skills, such as pottery or midwifery.");
  b.card("FACT", "Name four indigenous entitlements of men.", "Authority as head of household, land, cattle, tools and weapons (also inheritance and giving children the totem).");
  b.card("CONCEPT", "Why was the kitchen important to a wife?", "It was her own domain, giving her authority, privacy and respect in the homestead.");
  b.card("CONCEPT", "Name three reasons why indigenous entitlements mattered.", "Security, dignity and respect, order in the family, continuity, and cooperation between spouses.");
  b.card("CONCEPT", "How do women's property rights today differ from indigenous entitlements?", "Today women may own any property, including land, in their own names, and the rights are enforceable in court.");
});
