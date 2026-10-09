// W2a: Rights and responsibilities of vulnerable groups (her.rights.vulnerable-groups).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.rights.vulnerable-groups", { file: "rights/vulnerable-groups", keyPrefix: "rights.vulnerable-groups" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which section of the Constitution deals with the rights of **persons with disabilities**?",
    options: [
      ["section 83", "Correct: section 83 covers persons with disabilities."],
      ["section 82", "Section 82 covers the elderly."],
      ["section 84", "Section 84 covers veterans of the liberation struggle."],
      ["section 80", "Section 80 covers women."],
    ],
    answer: "A",
    explanation: "Women 80, children 81, elderly 82, persons with disabilities 83, war veterans 84.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **vulnerable group**?",
    options: [
      ["People more likely than others to suffer harm or neglect", "Correct: vulnerability means a greater risk of harm."],
      ["People who have broken the law and are serving sentences in prison", "Prisoners have rights, but this is not the meaning of a vulnerable group."],
      ["People who hold senior posts in the government of the country", "Government leaders are not a vulnerable group because of their posts."],
      ["People who live in towns rather than in rural areas", "Where people live does not alone make them vulnerable."],
    ],
    answer: "A",
    explanation: "A vulnerable group is more likely to suffer harm, discrimination or neglect because of age, disability, sex, health, poverty or circumstances.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Under section 82, the rights of the elderly apply to people over the age of …",
    options: [
      ["seventy", "Correct: section 82 refers to people over seventy."],
      ["fifty", "Section 82 does not use fifty."],
      ["sixty", "Section 82 does not use sixty."],
      ["eighteen", "Eighteen is the age of adulthood, not old age."],
    ],
    answer: "A",
    explanation: "Section 82 gives people over seventy the right to care and assistance from family and state, health care and financial support.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which programme helps pay school fees for vulnerable children in Zimbabwe?",
    options: [
      ["the Basic Education Assistance Module (BEAM)", "Correct: BEAM assists vulnerable children with fees."],
      ["the Economic Structural Adjustment Programme (ESAP)", "ESAP was an economic reform programme from 1991, not a fees scheme."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Environmental Management Agency", "EMA protects the environment."],
    ],
    answer: "A",
    explanation: "BEAM helps vulnerable children, such as orphans and children from very poor homes, stay in school.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After her husband dies, Thandeka's in-laws order her to leave the family house. Which right is **most clearly** affected?",
    options: [
      ["a woman's right to equal dignity, which voids customs that infringe it", "Correct: section 80 protects women's rights against such customs."],
      ["a child's right to a name and birth certificate", "This is a child's right; the scenario concerns the widow."],
      ["a war veteran's right to a pension", "Nothing suggests Thandeka is a war veteran."],
      ["the right of persons over seventy to health care and medical assistance from the state", "Nothing suggests the issue is health care."],
    ],
    answer: "A",
    hints: ["Who is being treated unfairly, and which section protects her?"],
    explanation: "Property grabbing denies a widow her rights. Section 80 says laws and customs that infringe women's rights are void to that extent; the Master of the High Court supervises estates.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A clinic in Hwange builds a ramp at its entrance. Which group does this **mainly** help?",
    options: [
      ["persons with physical disabilities", "Correct: a ramp lets wheelchair users enter."],
      ["veterans of the liberation struggle", "A ramp is not specific to war veterans."],
      ["children without birth certificates", "A ramp does not address birth registration."],
      ["women in rural areas", "A ramp helps people with mobility needs, not women as such."],
    ],
    answer: "A",
    hints: ["Who cannot use steps?"],
    explanation: "Ramps remove a barrier for wheelchair users and others with mobility impairments, helping them access services.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do many elderly people in rural Zimbabwe face greater hardship today than in the past?",
    options: [
      ["Many younger relatives have migrated, and some elderly people care for orphans", "Correct: migration and orphanhood add burdens and reduce support."],
      ["The law no longer gives the elderly any rights", "Wrong: section 82 gives the elderly rights."],
      ["Elderly people in rural areas are no longer allowed by law to keep their own gardens", "There is no such rule."],
      ["Elderly people must pay higher taxes than others", "There is no such tax."],
    ],
    answer: "A",
    hints: ["Who used to look after the elderly, and where are they now?"],
    explanation: "When younger relatives move to towns or abroad and some die young, grandparents lose support and may have to care for grandchildren.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** evaluates the protection of persons with disabilities in Zimbabwe?",
    options: [
      ["The law protects them, but many buildings, schools and jobs are hard to access", "Correct: it weighs the law against practice."],
      ["Persons with disabilities have no rights under the Constitution", "Wrong: section 83 sets out their rights."],
      ["All barriers facing persons with disabilities have been removed", "Overstated: many barriers remain."],
      ["Only non-governmental organisations, and never the state, are responsible for supporting them", "Wrong: the state has duties under section 83."],
    ],
    answer: "A",
    hints: ["Compare what the law says with daily life."],
    explanation: "Section 83 sets out rights, but within available resources; in practice many barriers remain, so a balanced judgement gives both.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sign language is one of the officially recognised languages of Zimbabwe.",
    answer: true,
    explanation: "True. Section 6 lists sign language among the sixteen officially recognised languages.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Members of vulnerable groups have rights but no responsibilities.",
    answer: false,
    explanation: "False. They are citizens with the same responsibilities as others, as far as they are able, and many make special contributions.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each section of the Constitution with the group whose rights it sets out.",
    pairs: [
      ["section 80", "women"],
      ["section 81", "children"],
      ["section 82", "the elderly"],
      ["section 84", "veterans of the liberation struggle"],
    ],
    explanation: "Sections 80 to 84 deal in turn with women, children, the elderly, persons with disabilities (83) and war veterans.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "The Jairos Jiri Association mainly supports {{blank:a}}. The chief's field used to feed orphans and widows is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["persons with disabilities"], choices: ["persons with disabilities", "war veterans", "tourists", "farmers' unions"] },
      { id: "b", accepted: ["zunde ramambo"], choices: ["zunde ramambo", "tseu", "dare", "nhimbe"] },
    ],
    explanation: "Jairos Jiri Association works with persons with disabilities. Zunde ramambo is the chief's field; a tseu is a wife's field; the dare is the court; nhimbe is a work party.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the scenario and complete the sentence.",
    template: "Farai, 15, heads a household of three younger siblings after his parents died. His family is an example of a {{blank:a}} household, and the government department that can assist them is the Department of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["child-headed"], choices: ["child-headed", "polygamous", "extended", "nuclear"] },
      { id: "b", accepted: ["Social Welfare"], choices: ["Social Welfare", "Mines", "Tourism", "Immigration"] },
    ],
    hints: ["Who is the head of the household?"],
    explanation: "A household led by a child is child-headed; the Department of Social Welfare provides assistance and child protection.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** challenges faced by persons with disabilities.",
    points: [
      "Any one of: buildings/transport without ramps, lack of sign language interpreters, lack of Braille materials, too few special schools/resource units, stigma/discrimination, unemployment, abuse/exploitation, poverty, cost of assistive devices",
      "A second challenge",
      "A third challenge",
      "A fourth challenge",
    ],
    modelAnswer: "Buildings without ramps, lack of sign language interpreters, stigma and unemployment.",
    explanation: "One mark per correct challenge.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which communities support the elderly.",
    points: [
      "Identifies a form of support, e.g. faith groups or neighbours visiting and helping",
      "Explains the effect, e.g. help with water, food or medicine reduces hardship and loneliness",
      "Identifies a second form, e.g. NGOs such as HelpAge Zimbabwe / zunde ramambo / burial societies",
      "Explains the effect, e.g. provides services, food or advocacy, so older people's needs are met",
    ],
    modelAnswer: "Churches and neighbours visit elderly people and help them fetch water, food and medicine, which reduces hardship and loneliness. Organisations such as HelpAge Zimbabwe provide services and speak up for older people, so their needs are noticed and met.",
    hints: ["Name the helper and say what difference it makes."],
    explanation: "One mark for each way and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which pupils at your school could support a classmate who is blind, and explain each.",
    points: [
      "Suggests a practical action, e.g. reading notes aloud / helping her move around safely / keeping paths clear",
      "Explains that this gives her equal access to learning or safety",
      "Suggests including her in games, clubs and group work / asking the school to get Braille or audio materials",
      "Explains that this prevents isolation and upholds her right to take part fully (section 83)",
    ],
    modelAnswer: "Pupils could read notes aloud or record them and keep corridors clear, giving her equal access to lessons and a safe environment. They could also include her in clubs, games and group work and ask the school for Braille or audio materials, which prevents isolation and upholds her right to take part fully in school life.",
    hints: ["Think of learning, safety and inclusion."],
    explanation: "Credit sensible actions (1 each) with explanations (1 each).",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional rural newsletter, Lupane, 2026",
      "Mrs Sibanda, aged 76, cares for four grandchildren. Members of a local church collect water for her twice a week, and the village head has added her name to the list for help from the zunde. Two of the children now receive help with fees through BEAM. Mrs Sibanda says she worries most about the cost of her medicine.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which section of the Constitution sets out the rights of people like Mrs Sibanda?",
        options: [
          ["section 82", "Correct: section 82 deals with the elderly."],
          ["section 83", "Section 83 is about persons with disabilities."],
          ["section 84", "Section 84 is about war veterans."],
          ["section 78", "Section 78 is about marriage."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** sources of support for Mrs Sibanda's household in the source.",
        points: ["Church members collecting water / help from the zunde (village head)", "BEAM paying school fees for two children"],
        modelAnswer: "Church members collect water, and BEAM helps with fees for two of the children.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Suggest how the government and the community could help Mrs Sibanda with the cost of her medicine. Explain each suggestion.",
        points: [
          "Government: health care and medical assistance for the elderly at public clinics (section 82)",
          "so she receives medicine she cannot afford",
          "Social welfare cash transfer or public assistance",
          "Community: church or neighbours raise money / a home-based care group collects medicine for her",
          "so she does not have to choose between medicine and food for the children",
        ],
        modelAnswer: "The government could provide health care and medicine for her at the public clinic, as section 82 promises to the elderly, so she gets treatment she cannot afford. She could also receive a social welfare cash transfer. The church or neighbours could raise money or collect her medicine for her, so that she does not have to choose between medicine and food for the children.",
      }),
    ],
    hints: ["In (c), give at least one government and one community idea."],
    explanation: "A source-based practice item (8 marks) on the elderly and how they are supported.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the protection of vulnerable groups.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** challenges faced by women as a vulnerable group.",
        points: [
          ["Gender-based violence / harmful practices", 2],
          ["Property grabbing after a husband's death / unequal access to land, credit and jobs", 2],
        ],
        modelAnswer: "Some women suffer gender-based violence at home, which harms their health and dignity. Widows sometimes face property grabbing by their late husband's relatives, and many women have less access than men to land, credit and well-paid jobs.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Vulnerable groups in Zimbabwe are well protected.\" How far do you agree?",
        points: [
          ["For: sections 80-84 set out rights; laws against discrimination, domestic violence and property grabbing; sign language recognised", 2],
          ["For: support from social welfare, BEAM, special schools, NGOs, faith groups, zunde ramambo", 2],
          ["Against: rights limited by available resources; poverty, inaccessible buildings, stigma, abuse and property grabbing continue; services uneven in rural areas", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is evidence for the statement. Sections 80 to 84 of the Constitution give women, children, the elderly, persons with disabilities and war veterans clear rights, and laws protect against domestic violence and discrimination. Sign language is an official language. Support comes from social welfare, BEAM, special schools, non-governmental organisations, faith groups and traditional systems such as zunde ramambo.\n\nHowever, protection in practice is incomplete. Many rights depend on the resources available, and these are limited. Poverty, inaccessible buildings, stigma, abuse and property grabbing continue, and services are weaker in remote rural areas.\n\nI agree only partly. Vulnerable groups are well protected in law, and there is real support from government and communities, but in daily life many members of these groups still face serious hardship.",
      }),
    ],
    hints: ["In (b), compare the law with daily life."],
    explanation: "A practice evaluative item on how well vulnerable groups are protected.",
  });

  b.card("DEFINITION", "Vulnerable group", "People more likely than others to suffer harm, discrimination or neglect, who may need extra protection.");
  b.card("FACT", "Which sections cover women, children, the elderly, persons with disabilities and war veterans?", "Women 80, children 81, elderly 82, persons with disabilities 83, war veterans 84.");
  b.card("FACT", "What does section 82 give people over seventy?", "Care and assistance from family and state, health care and medical assistance, and financial support through social security and welfare.");
  b.card("FACT", "What does section 84 give veterans of the liberation struggle?", "Due recognition for their contribution, and suitable welfare such as pensions and access to basic health care.");
  b.card("FACT", "What is BEAM?", "The Basic Education Assistance Module: help with school fees for vulnerable children.");
  b.card("CONCEPT", "Name four challenges faced by the elderly.", "Poverty, ill health and the cost of care, caring for orphaned grandchildren, neglect and abuse.");
  b.card("DEFINITION", "Discrimination", "Treating a person unfairly because of who they are, for example their sex, age or disability.");
  b.card("CONCEPT", "Give three levels at which vulnerable groups are supported.", "Government (social welfare, BEAM, special schools), communities (faith groups, NGOs, zunde ramambo) and individuals (helping, including, speaking up).");
});
