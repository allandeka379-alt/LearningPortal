// W4a: Enterprise skills and employment creation (her.production.enterprise-skills).
// Reviewer note: copyright mentioned generally (no Act named). All people, projects and figures are fictional.
import { concept, P, table, levels } from "../lib.mjs";

concept("her.production.enterprise-skills", { file: "production/enterprise-skills", keyPrefix: "production.enterprise-skills" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is an **enterprise skill**?",
    options: [
      ["financial literacy", "Correct: managing money is a key enterprise skill."],
      ["voter registration", "This is part of the electoral process."],
      ["soil erosion", "This is an environmental problem."],
      ["delimitation", "This is about electoral boundaries."],
    ],
    answer: "A",
    explanation: "Enterprise skills include creativity, risk-taking, planning, financial literacy and marketing.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **creative industry**?",
    options: [
      ["film-making", "Correct: film depends on creativity and talent."],
      ["coal mining", "Mining is a primary industry."],
      ["maize milling", "Milling is a processing industry."],
      ["cement manufacturing", "This is heavy manufacturing."],
    ],
    answer: "A",
    explanation: "Creative industries include music, art, sport, dance, crafts, poetry, theatre and film.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Chipo keeps a notebook of every dollar she spends on feed and every egg she sells. Which enterprise skill is she using?",
    options: [
      ["financial literacy", "Correct: record-keeping is part of managing money."],
      ["creativity", "Creativity is about new ideas, not record-keeping."],
      ["marketing", "Marketing is about customers and promotion."],
      ["perseverance", "Perseverance is continuing after setbacks."],
    ],
    answer: "A",
    explanation: "Keeping records of income and spending is financial literacy; it shows whether the project makes a profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **self-reliance project**?",
    options: [
      ["a project that produces goods or services to meet one's own needs and earn income", "Correct: it reduces dependence on others."],
      ["a project that is paid for entirely by foreign donors and run by outside experts for the community", "Self-reliance means depending on one's own efforts."],
      ["a project in which a person relies on relatives for money", "This is dependence, not self-reliance."],
      ["a government programme for building roads", "This is public infrastructure."],
    ],
    answer: "A",
    explanation: "Self-reliance projects, such as gardens, poultry or sewing, help people meet their own needs and earn income.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Sipho shows his music on social media and sells tickets for a concert at a school hall. Which enterprise skill is this **mainly**?",
    options: [
      ["marketing", "Correct: he is telling customers about his product."],
      ["financial literacy", "This is about managing money, not promotion."],
      ["risk-taking", "Promotion is mainly marketing."],
      ["record-keeping", "Record-keeping is part of financial literacy."],
    ],
    answer: "A",
    hints: ["Which skill is about reaching customers?"],
    explanation: "Marketing means finding out what customers want and telling them about the product.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does **planning** reduce the risk of a project failing?",
    options: [
      ["Costs, steps and problems are worked out before money is spent", "Correct: planning helps avoid costly mistakes."],
      ["Planning guarantees that every project makes a profit", "Planning reduces risk but cannot remove it."],
      ["Planning means no money is needed", "Projects still need resources."],
      ["Planning removes the need for customers", "Every project needs customers."],
    ],
    answer: "A",
    hints: ["What does a plan help you to foresee?"],
    explanation: "A plan sets out goals, costs, steps and possible problems, so the entrepreneur can prepare and avoid mistakes.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "How do copyright laws help creative industries create employment?",
    options: [
      ["Creators can earn from their work because others cannot copy and sell it freely", "Correct: rights protect creators' income."],
      ["They make all music, films and books free for everyone to copy, share and sell as they wish", "Copyright does the opposite."],
      ["They stop artists from performing in public", "Copyright protects work; it does not ban performance."],
      ["They require artists to work for the government", "Copyright does not decide employers."],
    ],
    answer: "A",
    hints: ["What happens to an artist's income if anyone can copy their work?"],
    explanation: "Copyright protects creators' rights, so they can earn from their work and invest in more creative projects.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence **best** shows that a craft project contributes to economic growth?",
    options: [
      ["It employs five people and sells crafts to tourists for foreign currency", "Correct: jobs and export earnings add to growth."],
      ["The crafters enjoy working together on Saturdays and singing traditional songs while they weave", "Enjoyment is valuable but is not evidence of growth."],
      ["The project has a colourful name", "A name says nothing about growth."],
      ["The crafters learnt their skills from grandparents", "This shows heritage, not economic growth."],
    ],
    answer: "A",
    hints: ["Look for jobs and income."],
    explanation: "Employment and foreign currency earnings are direct contributions to economic growth.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sport can be a creative industry that creates employment.",
    answer: true,
    explanation: "True. Players, coaches, referees, journalists and kit makers earn incomes from sport.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Enterprise only refers to large businesses with many employees.",
    answer: false,
    explanation: "False. Small self-reliance projects such as a garden or a dance group also show enterprise.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each enterprise skill with an example.",
    pairs: [
      ["creativity", "designing bags from recycled material"],
      ["risk-taking", "using savings to buy the first chicks"],
      ["marketing", "advertising eggs on social media"],
      ["planning", "writing a simple business plan"],
    ],
    explanation: "Each skill shows itself in particular actions.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Thinking of new products is {{blank:a}}. Working out a budget and keeping records is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["creativity"], choices: ["creativity", "marketing", "perseverance", "teamwork"] },
      { id: "b", accepted: ["financial literacy"], choices: ["financial literacy", "creativity", "marketing", "leadership"] },
    ],
    explanation: "Creativity produces ideas; financial literacy manages money.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Classify each project.",
    template: "A school poultry run is an {{blank:a}} self-reliance project. A drama group performing for paying audiences is part of the {{blank:b}} industries.",
    blanks: [
      { id: "a", accepted: ["agricultural"], choices: ["agricultural", "service", "creative", "mining"] },
      { id: "b", accepted: ["creative"], choices: ["creative", "primary", "mining", "extractive"] },
    ],
    hints: ["Poultry is farming; theatre is based on talent."],
    explanation: "Poultry is an agricultural project; theatre belongs to the creative industries.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What type of law gives creators rights over their work so that others cannot copy and sell it without permission?",
    accepted: ["copyright", "copyright law"],
    wrong: ["by-law"],
    explanation: "Copyright protects the work of musicians, writers, artists and film-makers.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** enterprise skills.",
    points: [
      "Any one of: creativity / innovation; risk-taking; planning; financial literacy; marketing; communication / negotiation; problem-solving / decision-making; teamwork / leadership; perseverance",
      "A second different skill",
      "A third different skill",
    ],
    modelAnswer: "Creativity, planning and marketing.",
    explanation: "One mark per correct skill.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways the creative industries create employment in Zimbabwe.",
    points: [
      "Identifies an industry (e.g. music)",
      "Explains the jobs it creates (musicians, producers, sound engineers, promoters earn from shows and recordings)",
      "Identifies a second industry (e.g. crafts / film / sport / theatre)",
      "Explains the jobs it creates (e.g. crafters sell to tourists; film employs actors, camera operators, editors)",
    ],
    modelAnswer: "Music creates jobs for musicians, producers, sound engineers and promoters, who earn from concerts, recordings and online platforms. Crafts such as pottery, basketry and stone sculpture give work to crafters who sell to households and tourists, and to traders who transport and sell their products.",
    hints: ["For each industry, name the jobs it creates."],
    explanation: "One mark for each industry and one for explaining the employment it creates.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "A group of school leavers in Lupane wants to start a project to earn a living. Suggest a suitable project and explain **two** enterprise skills it would need and **one** way to reduce its risk.",
    points: [
      "Suggests a suitable project for the area (e.g. poultry, beekeeping, crafts, a garden)",
      "Names a first skill relevant to the project",
      "Explains how the skill is used in the project",
      "Names a second skill",
      "Explains how it is used",
      "Suggests a way to reduce risk (start small / plan / keep records / research the market / join a savings club) with a reason",
    ],
    modelAnswer: "They could start a broiler poultry project. They would need planning, to decide when to buy chicks, how much feed is needed and when to sell. They would need marketing, to find buyers such as local shops and schools before the birds are ready. To reduce risk, they could start with a small batch and keep careful records, so a loss would be small and they could learn before expanding.",
    hints: ["Choose a project that fits the area, then link each skill to a task."],
    explanation: "One mark for the project, two for each explained skill, and one for a sensible way to reduce risk.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "The table shows the first three months of a fictional school soap-making project in Marondera (invented for this question).\n\n" +
      table(["Month", "Costs (US\\$)", "Sales (US\\$)"], [
        ["March", 60, 40],
        ["April", 45, 70],
        ["May", 45, 95],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "In which month did the project make a **loss**?",
        options: [
          ["March", "Correct: costs of US\\$60 were more than sales of US\\$40."],
          ["April", "Sales of US\\$70 were more than costs of US\\$45."],
          ["May", "Sales of US\\$95 were more than costs of US\\$45."],
          ["both April and May", "Both months made a profit."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Calculate the profit in May and state **one** enterprise skill needed to keep such records.",
        points: ["Profit in May: US\\$95 − US\\$45 = US\\$50", "Financial literacy (record-keeping)"],
        modelAnswer: "Profit in May was US\\$50 (US\\$95 − US\\$45). Keeping these records needs financial literacy.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest **one** reason why sales rose from March to May, and explain how the project could grow further.",
        points: [
          "Reason: more customers knew about the soap (marketing) / better quality / word of mouth",
          "Suggests a way to grow (sell to shops or parents, new scents or sizes, reinvest profit)",
          "Explains how it raises sales or income",
        ],
        modelAnswer: "Sales probably rose because more parents and teachers heard about the soap and liked it. The project could grow by selling to local shops and offering new scents, reinvesting its profit in more materials, so it reaches more customers and earns more.",
      }),
    ],
    hints: ["In (b), profit = sales − costs."],
    explanation: "A data-based practice item on enterprise and financial literacy.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about enterprise and the economy.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** self-reliance projects that a school could run.",
        points: [
          "Names a project (e.g. a vegetable garden)",
          "Describes it (learners grow vegetables for the school kitchen and sell the surplus)",
          "Names a second project (e.g. poultry / sewing / soap making / beekeeping)",
          "Describes it (e.g. learners rear chickens and sell eggs to the community)",
        ],
        modelAnswer: "A school could run a vegetable garden, where learners grow vegetables for the school kitchen and sell the surplus to parents. It could also run a poultry project, where learners rear layers and sell eggs to the community, raising funds and learning business skills.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Enterprise and creative industries can solve unemployment among young people in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: self-employment and jobs for others; low cost to start many projects; creative talent widespread", 2],
          ["For: earn foreign currency (crafts, music, tourism); preserve heritage; growth into larger businesses", 2],
          ["Against: lack of capital and markets; copying of creative work; risk of failure; many projects small with low incomes; need wider economic growth", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Enterprise and creative industries can do much to reduce youth unemployment. Young people can start projects such as poultry, sewing and phone repairs with little capital, employing themselves and sometimes others. Zimbabwe's musicians, sculptors, crafters, dancers and film-makers show that creative talent can earn incomes and foreign currency, while preserving heritage.\n\nHowever, many young entrepreneurs lack capital and markets, and creative work is often copied without payment. Many projects stay small and earn little, and some fail. Enterprise alone cannot replace the jobs that come from wider economic growth in manufacturing, mining and agriculture.\n\nI partly agree. Enterprise and creative industries are an important part of the solution, especially with training, finance and copyright protection, but they cannot solve youth unemployment on their own.",
      }),
    ],
    hints: ["In (b), consider both the opportunities and the obstacles."],
    explanation: "A practice evaluative item on enterprise and youth employment.",
  });

  b.card("DEFINITION", "Enterprise", "The willingness and ability to start and run a project or business, seeing opportunities and taking risks.");
  b.card("DEFINITION", "Self-reliance project", "A project that produces goods or services to meet one's own needs and earn income.");
  b.card("DEFINITION", "Creative industries", "Industries based on creativity and talent: music, art, sport, dance, crafts, poetry, theatre, film, fashion.");
  b.card("DEFINITION", "Financial literacy", "Managing money well: budgeting, record-keeping, pricing, saving and understanding loans.");
  b.card("FACT", "Name five enterprise skills.", "Creativity, risk-taking, planning, financial literacy, marketing.");
  b.card("FACT", "Name six creative industries.", "Music, art, sport, dance, theatre and film (also pottery, poetry, basketry, weaving).");
  b.card("CONCEPT", "How does copyright help creators?", "Others cannot copy and sell their work without permission, so creators can earn from it.");
  b.card("CONCEPT", "How does enterprise contribute to economic growth?", "Creates jobs and incomes, local production instead of imports, exports and tourism earnings, taxes and innovation.");
  b.card("CONCEPT", "How can an entrepreneur reduce risk?", "Plan, research the market, start small, keep records and save part of the profit.");
});
