// W3b: Environmental problems and religious responses (Topic 11.3).
// Reviewer notes: AZTREC and the AAEC are described in outline only (no founders or dates); check the name and scope of the
// Environmental Management Act and the role of EMA against current law.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.environment.issues-responses", { file: "environment/issues-responses", keyPrefix: "environment.issues-responses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is deforestation?",
    options: [
      ["Clearing forests faster than trees grow back", "Correct: for fuelwood, farmland, building or mining."],
      ["Planting new trees along the banks of a river", "That is afforestation or tree planting."],
      ["Burning grass to prepare a field for the new season", "That is a veld fire or burning."],
      ["Digging a well to supply water for a village school", "That is a water supply project."],
    ],
    answer: "A",
    explanation: "**Deforestation** is clearing forests faster than they regrow.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body enforces the Environmental Management Act in Zimbabwe?",
    options: [
      ["The Environmental Management Agency (EMA)", "Correct: EMA enforces the Act with communities and councils."],
      ["The National Peace and Reconciliation Commission", "That body deals with peace and healing."],
      ["The Zimbabwe Schools Examinations Council", "That body runs examinations."],
      ["The Zimbabwe Football Association", "That body runs football."],
    ],
    answer: "A",
    explanation: "**EMA** enforces the Environmental Management Act.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a main effect of gold panning on river banks?",
    options: [
      ["Silting and pollution of the water", "Correct: digging and chemicals harm the river."],
      ["Increased supply of clean drinking water", "Panning harms water quality."],
      ["Stronger river banks and fewer floods", "Digging weakens the banks."],
      ["Growth of new forests along the river", "Panning damages plants on the banks."],
    ],
    answer: "A",
    hints: ["Think about what digging and chemicals do to water."],
    explanation: "Gold panning causes **siltation and pollution**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which religious teaching could motivate a church to start a tree nursery?",
    options: [
      ["Genesis 2:15, on cultivating and looking after the garden", "Correct: it is read as a call to stewardship."],
      ["Exodus 12, which tells of the first Passover night in Egypt", "That passage concerns the Passover."],
      ["Acts 2, which describes the day of Pentecost", "That passage concerns Pentecost."],
      ["Luke 2, which tells the story of the birth of Jesus in Bethlehem", "That passage concerns the nativity."],
    ],
    answer: "A",
    explanation: "**Genesis 2:15** is read as a call to care for the earth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is Tu BiShvat?",
    options: [
      ["The Jewish new year for trees, a time for planting", "Correct: it links Jewish practice and the environment."],
      ["The Muslim feast that follows a month of fasting", "That is Eid al-Fitr."],
      ["The Christian festival celebrating the birth of Jesus", "That is Christmas."],
      ["The Shona ceremony to bring back a dead person's spirit", "That is kurova guva."],
    ],
    answer: "A",
    explanation: "**Tu BiShvat** is the Jewish new year for trees.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A church, a mosque and a chief's council hold a joint clean-up of a blocked stream and plant trees. Which idea does this best show?",
    options: [
      ["Interfaith cooperation on an environmental problem", "Correct: different groups act together."],
      ["Competition between religious groups for new members", "The example shows cooperation."],
      ["Government control of all religious activity", "The groups act on their own."],
      ["The end of all environmental problems in the area", "A clean-up does not end every problem."],
    ],
    answer: "A",
    hints: ["Look at who is working together."],
    explanation: "Different groups acting together is **interfaith cooperation**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might poverty lead to deforestation?",
    options: [
      ["Poor families may cut trees for fuel or farmland", "Correct: they need fuel and food."],
      ["Poor families have no need of fuel or land for farming", "Poor families depend heavily on both."],
      ["Poor families are forbidden by law from owning any tools", "No such law exists."],
      ["Poor families are the owners of the largest timber companies", "Large companies are not owned by poor families."],
    ],
    answer: "A",
    hints: ["Think about daily needs."],
    explanation: "Poverty can push people to **cut trees for fuel or farmland**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the role of religious groups in responding to environmental problems is best supported?",
    options: [
      ["They mobilise people, but work best with law and science", "Correct: they are strong partners, not the only solution."],
      ["They can solve every environmental problem by themselves", "They need law and science too."],
      ["They have no part to play in protecting the environment", "They do take action."],
      ["They should be replaced by the government for all environmental work", "Cooperation works better than replacement."],
    ],
    answer: "A",
    hints: ["Choose the answer that recognises both strength and limits."],
    explanation: "Religious groups are **strong partners** that work best with law and science.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Climate change can increase droughts and floods in Zimbabwe.",
    answer: true,
    explanation: "True. Extreme weather such as droughts and cyclones is linked to climate change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Religious groups work on environmental problems only on their own, without councils or the Environmental Management Agency.",
    answer: false,
    explanation: "False. Religious groups often work with councils, schools, scientists and EMA.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem with a main cause.",
    pairs: [
      ["Deforestation", "Cutting trees for fuelwood and farmland"],
      ["Veld fires", "Careless burning of grass"],
      ["Siltation of rivers", "Digging on river banks and soil erosion"],
      ["Pollution and waste", "Plastics, litter and sewage not properly disposed of"],
    ],
    explanation: "Each problem has a typical cause.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Association of {{blank:a}} Earthkeeping Churches is a network of African Independent churches that plant {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["African"], choices: ["African", "Asian", "Roman", "Anglican"] },
      { id: "b", accepted: ["trees"], choices: ["trees", "tobacco", "maize", "bricks"] },
    ],
    hints: ["Think of the name of the association in the key facts."],
    explanation: "The **African** Earthkeeping Churches plant **trees** (in outline).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What do the letters EMA stand for? (Give the full name.)",
    accepted: ["Environmental Management Agency", "the Environmental Management Agency"],
    wrong: ["Education Ministry Authority", "Energy Mining Association"],
    explanation: "EMA stands for the **Environmental Management Agency**.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** environmental problems in Zimbabwe.",
    points: ["Deforestation", "Land degradation or soil erosion, or veld fires", "Gold panning damage, pollution and waste, poaching or climate change"],
    modelAnswer: "Three environmental problems are deforestation, soil erosion and veld fires. Others include gold panning damage, pollution, poaching and climate change.",
    explanation: "One mark for each problem.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how churches can help to respond to environmental problems.",
    points: [
      ["Hold tree-planting days and run nurseries", 1],
      ["Organise clean-up campaigns for streets, rivers and school grounds", 1],
      ["Teach stewardship in sermons and youth groups", 1],
      ["Work with councils, schools and EMA, or with other faiths", 1],
    ],
    modelAnswer: "Churches can hold tree-planting days and run nurseries, organise clean-up campaigns for streets, rivers and school grounds, and teach stewardship in sermons and youth groups. They can also work with councils, schools and EMA, or with other faiths.",
    hints: ["Think of action, teaching and cooperation."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** causes of environmental problems in Zimbabwe and how each leads to harm.",
    points: [
      ["Poverty and reliance on fuelwood", 1],
      ["Developed: families cut trees for fuel, which causes deforestation, soil erosion and silting of rivers", 2],
      ["Weak enforcement of laws and careless practices such as unplanned fires or dumping", 1],
      ["Developed: veld fires destroy grazing and trees, and waste blocks drains and pollutes water, harming health and livelihoods", 2],
    ],
    modelAnswer: "Poverty and reliance on fuelwood are one cause. Families cut trees for fuel, which causes deforestation, soil erosion and silting of rivers. Weak enforcement of laws and careless practices such as unplanned fires or dumping are another. Veld fires destroy grazing and trees, and waste blocks drains and pollutes water, harming health and livelihoods.",
    hints: ["Choose two causes and trace the effects."],
    explanation: "Two causes, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional news report from Marondera, 2026",
      "A church, a mosque and the local chief have joined forces to plant 2 000 indigenous trees along a gully that has been washing soil into the river. Volunteers from the youth group also collected plastic waste from the market. The minister said that caring for the earth is part of serving God. The imam said that Muslims are trustees of the earth. The chief said that the land is held for the ancestors and for the children yet to be born."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which environmental problem were the trees planted to address?",
        options: [
          ["Soil erosion in a gully", "Correct: the gully was washing soil into the river."],
          ["Veld fires at the school", "The source does not mention veld fires."],
          ["Poaching of elephants", "The source does not mention poaching."],
          ["Gold panning in the river", "The source does not mention gold panning."],
        ],
        answer: "A", explanation: "The trees were planted to stop soil being washed from the gully.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** actions taken by the community.",
        points: ["Planting 2 000 indigenous trees along the gully", "Collecting plastic waste from the market", "Church, mosque and chief working together"],
        modelAnswer: "They planted 2 000 indigenous trees along the gully, collected plastic waste from the market, and the church, mosque and chief worked together.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the religious beliefs of the minister, imam and chief support the work.",
        points: [["The minister: caring for the earth is part of serving God (stewardship)", 1], ["The imam: Muslims are trustees of the earth and accountable to God", 1], ["The chief: the land is held for the ancestors and for future generations", 1]],
        modelAnswer: "The minister teaches that caring for the earth is part of serving God. The imam says Muslims are trustees of the earth who are accountable to God. The chief says the land is held for the ancestors and for future generations.",
      }),
    ],
    hints: ["In (c) link each speaker to the belief they state."],
    explanation: "The source shows three beliefs supporting one shared action.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "At a youth forum, Chipo says: \"Religious groups are the best hope for solving environmental problems.\" Sipho says: \"They help, but laws, science and government action are also needed.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religious groups respond to environmental problems.",
        points: [["Tree planting and nurseries", 1], ["Clean-up campaigns", 1], ["Teaching on stewardship in sermons and youth groups", 1], ["Interfaith work and cooperation with EMA and councils", 1]],
        modelAnswer: "Religious groups run tree-planting days and nurseries, and they organise clean-up campaigns.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** reason why religious groups can be effective in protecting the environment.",
        points: [["They have large numbers of followers who meet regularly", 1], ["Developed: messages and projects reach many people quickly", 1], ["They have moral authority", 1], ["Developed: believers see care for the earth as a religious duty, so they are more likely to act", 1]],
        modelAnswer: "Religious groups have large numbers of followers who meet regularly, so messages and projects reach many people quickly. They also have moral authority, so believers see care for the earth as a religious duty and are more likely to act.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the effectiveness of religious responses to environmental problems in Zimbabwe.",
        points: [["Strengths: numbers, regular meetings, moral authority, community trust; examples such as tree planting, AAEC and AZTREC", 2], ["Strengths: interfaith cooperation and links with EMA, schools and councils", 2], ["Limits: limited funds, uneven commitment among believers, large problems such as climate change and mining need laws and science", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious groups are effective in motivating people: they have large numbers of followers, regular meetings, moral authority and community trust, and they have organised tree planting, clean-ups and networks such as the AAEC and AZTREC. They also cooperate with EMA, schools and councils. However, they have limited funds, not all believers act on the teachings, and large problems such as climate change and mining damage need laws and science. I conclude that religious responses are valuable and effective at community level, but they work best as partners with law, science and government.",
      }),
    ],
    hints: ["Weigh religious strengths against the size of the problems."],
    explanation: "A strong answer evaluates strengths and limits with examples and concludes that cooperation works best.",
  });

  b.card("DEFINITION", "What is **deforestation**?", "Clearing forests or woodland faster than trees grow back.");
  b.card("DEFINITION", "What is **land degradation**?", "Loss of the quality of soil and land through erosion, over-grazing and over-cultivation.");
  b.card("DEFINITION", "What is **climate change**?", "Long-term change in weather patterns, largely driven by greenhouse gases; effects include droughts and floods.");
  b.card("FACT", "Name seven environmental problems.", "Deforestation, land degradation, veld fires, gold panning and siltation, pollution and waste, poaching, climate change.");
  b.card("FACT", "Which agency enforces the Environmental Management Act?", "The Environmental Management Agency (EMA).");
  b.card("FACT", "What are AZTREC and the AAEC (in outline)?", "AZTREC: a network of traditional leaders and mediums protecting sacred forests. AAEC: a network of African Independent churches that plant trees.");
  b.card("FACT", "What is Tu BiShvat?", "The Jewish new year for trees, when many Jews plant trees.");
  b.card("CONCEPT", "How does poverty contribute to environmental damage?", "Poor families may cut trees for fuelwood, clear land or pan for gold in order to survive.");
  b.card("CONCEPT", "Why do religious groups work best with law and science?", "Religion motivates people, but large problems also need laws, enforcement and scientific knowledge.");
});
